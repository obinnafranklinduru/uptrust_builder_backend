import os
from flask import request, jsonify
from emails import EmailGenerator
from nessa import CvAnalyser
import logging, json
from config import app, db, Email, CVFile, verify_token
import PyPDF2

""" ROUTES """

@app.route('/', methods=['GET'], endpoint='home')
def home():
    verification_result, decoded_payload_or_error = verify_token()
    if verification_result:
        return "HEllo World"
    else:
        return f"Token Verification Failed: {decoded_payload_or_error}", 401

@app.route('/cv_analyser', methods=['POST', 'GET'], endpoint='cv_analyser')
def cv_analyser():
    verification_result, decoded_payload_or_error = verify_token()
    if not verification_result:
        return f"Token Verification Failed: {decoded_payload_or_error}", 401

    if 'file' not in request.files:
        return jsonify({'error': 'No file part'})
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'})
    if file:
        _id = decoded_payload_or_error[0]
        email = decoded_payload_or_error[1]
        print(len(str(_id)))

        file_content = file.read()  # Read the file content
        # print(os.getcwd)
        path = os.getcwd() + 'cv_file.pdf'
        # print(path)

        with open(path, 'wb') as f:
            f.write(file_content)
        
        with open(path, 'rb') as f:
            reader = PyPDF2.PdfReader(f)

        scores = CvAnalyser()
        score, t_score = int(scores[0]), int(scores[1])
        print(type(score))
        print(type(t_score))

        # Save file to the database
        cv_user = CVFile(file_name=file.filename, file_data=reader, email_address=email, score=score, t_score=t_score, user_id=str(_id))
        with app.app_context():
            db.session.add(cv_user)
            db.session.commit()

        return jsonify({'message': 'File uploaded and saved to database successfully',
                        'result': f'{score}/{t_score}'})

@app.route('/email-writer', methods=['POST', 'GET'], endpoint='email_writer')
def email_writer():
    # Check if user.id of student has a CV stored in the database
    # Else Cv is necessary
    verification_result, decoded_payload_or_error = verify_token()
    if not verification_result:
        return f"Token Verification Failed: {decoded_payload_or_error}", 401


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
                email_user = Email(email=email,
                                 user_id=str(user_id),
                                 applicant_name=appl_name,
                                 applicant_email=appl_email,
                                 job_description=str(json.dumps(job_desc)))
                #(_email)
                with app.app_context():
                    db.session.add(email_user)
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
