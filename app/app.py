import os
from flask import request, jsonify
from emails import EmailGenerator
from nessa import CvAnalyser
import logging, json
from config import app, mongo, Email, CVFile, verify_token


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

        file_content = file.read()  # Read the file content
        # print(os.getcwd)
        path = os.getcwd() + 'cv_file.pdf'
        # print(path)

        with open(path, 'wb') as f:
            f.write(file_content)

        with open(path, 'rb') as f:
            saved_file_content = f.read()
            # print(saved_file_content)

        score = CvAnalyser()

        # Save file to the database
        cv_user = CVFile(file_name=file.filename, file_data=file_content, email_address=email, score=score, user_id=_id)
        mongo.db.emails.insert_one(cv_user.__dict__)

        return jsonify({'message': 'File uploaded and saved to database successfully',
                        'result': f'{score}'})

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
                                 user_id=user_id,
                                 applicant_name=appl_name,
                                 applicant_email=appl_email,
                                 job_description=str(json.dumps(job_desc)))
                #(_email)
                mongo.db.emails.insert_one(email_user.__dict__)

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
