from flask import Flask,render_template

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('dex.html')

""" MODEL ROUTES"""

@app.route('/cv-analyser')
def cv_analyser():
    pass

@app.route('/email-writer')
def email_writer():
    pass

@app.route('/followback_email')
def followback_email():
    pass

@app.route('/job-recommendation')
def job_recommendation():
    pass

""" Notifications """


if __name__ == "__ma__":
    app.run()