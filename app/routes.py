from flask import Flask,render_template
from app.nessa_model.py import main
from email import AI_assistant
app = Flask(__name__)

@app.route('/')
def home():
    return render_template('dex.html')

""" MODEL ROUTES"""

@app.route('/cv-analyser', methods=['POST', 'GET'])
def cv_analyser():
    """
    Using CV model over here
    PARAMETERS: CV document
                Job requirements
    """
    user_cv = request.file('file')
    cv_rating = main.Cv_analyser(cv)
    return jsonify({'Rate': cv_rating,
                    'status_code': 200})

@app.route('/email-writer')
def email_writer():
    # Check if user.id of student has a CV stored in the database
    # Else Cv is necessary
    user_cv = request.file('CV')
    job_desc = request.file('Job description')
    main = main()
    cv = main.Cv_analyser(cv)

    _email = AI_assistant(Cv=cv, job_description=job_desc)
    return jsonify({'email': _email,
                    'status_code': 200})



@app.route('/followback_email')
def followback_email():
    pass

@app.route('/job-recommendation')
def job_recommendation():
    pass

""" Notifications """


if __name__ == "__ma__":
    app.run()