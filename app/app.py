from flask import Flask,render_template, request, jsonify, flash
from emails import EmailGenerator
import logging
from flask_wtf import FlaskForm
from wtforms import FileField, SubmitField
import os


app = Flask(__name__)

secret_key = os.getenv("SECRET_KEY")
app.config["SECRET_KEY"] = secret_key
app.config["UOLOAD_FOLDER"] = os.path.abspath("uploaded_file")

@app.route('/')
def home():
    return render_template('dex.html')

""" MODEL ROUTES"""

class Uploade_CV(FlaskForm):
    cv_file = FileField("CV")
    submit = SubmitField("Upload Cv")


@app.route('/cv-analyser', methods=['POST', 'GET'])
def cv_analyser():
    """
    Using CV model over here
    PARAMETERS: CV document
                Job requirements
    """
    file = Uploade_CV()
    cv_file = file.cv_file.get()

    # with open()
    return jsonify({'Rate': cv_file,
                    'status_code': 200})

@app.route('/email-writer', methods=['POST', 'GET'])
def email_writer():
    # Check if user.id of student has a CV stored in the database
    # Else Cv is necessary

    """ Generate the Email
    """
    if request.method == 'POST':
        job_desc = request.get_json("job_description")
        appl_name = request.get_json("applicant_name")
        appl_email = request.get_json("application_email")
        
        try:
            _email = EmailGenerator()
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


if __name__ == "__ma__":
    app.run(host='localhost')