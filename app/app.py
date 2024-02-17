from flask import request, jsonify
from emails import EmailGenerator
from nessa import CvAnalyser
import logging, json, requests
from config import app, db, Email, CVFile
from flask_jwt_extended import verify_jwt_in_request, decode_token
# from collections.abc import Mapping


""" ROUTES """

@verify_jwt_in_request
@decode_token(allow_expired=False)
def home():
    return "HEllo World"

@verify_jwt_in_request
@decode_token(allow_expired=False)
@app.route('/cv_analyser', methods=['POST'])
def cv_analyser():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'})
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'})
    if file:
        file_content = file.read()  # Read the file content
        email_address = request.form.get("email_address")
        user_id = request.form.get("user_id")
        # Call CvAnalyser function
        file.save('cv_file.pdf')
        score = CvAnalyser()[0]

        # Save file to the database
        cv_file = CVFile(file_name=file.filename, file_data=file_content, email_address=email_address, score=score, user_id=user_id)
        db.session.add(cv_file)
        db.session.commit()

        return jsonify({'message': 'File uploaded and saved to database successfully',
                        'result': f'{score}'})

@verify_jwt_in_request
@decode_token(allow_expired=False)
@app.route('/email-writer', methods=['POST', 'GET'])
# @verify
def email_writer():
    # Check if user.id of student has a CV stored in the database
    # Else Cv is necessary

    """ Generate the Email
    """
    if request.method == 'POST':
        job_desc = request.get_json()["job_description"]
        appl_name = request.get_json()["applicant_name"]
        appl_email = request.get_json()["applicant_email"]
        user_id = request.get_json()["user_id"]
        
        # #(job_desc)
        # #(appl_email)
        # #(appl_name)
        # # #(os.getenv('API_KEY'))
        try:
            _email = EmailGenerator()
            email = _email.generate_email(job_description=job_desc, applicant_name=appl_name, applicant_email=appl_email)
            with app.app_context():
                new_user = Email(email=email,
                                 user_id=user_id,
                                 applicant_name=appl_name,
                                 applicant_email=appl_email,
                                 job_description=str(json.dumps(job_desc)))
                #(_email)
                db.session.add(new_user)
                db.session.commit()
            return jsonify({'message': _email.generate_email(job_description=job_desc, applicant_name=appl_name, applicant_email=appl_email),
                        'status_code': 200})
        except ValueError as err:
            logging.debug(err)
            return jsonify({
                "message": "failed",
                "status_code": 400
            })
    return jsonify({
        "message": "This api receives a post request. failed",
        "status_code": 400
    })

@app.route('/followback_email')
def followback_email():
    pass

@app.route('/job-recommendation')
def job_recommendation():
    pass

""" Notifications """

if __name__ == "__main__":
    app.run(host='localhost', debug=True)
