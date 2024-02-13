from flask import Flask
import os
from flask_sqlalchemy import SQLAlchemy

""" CONFIG """
app = Flask(__name__)

secret_key = os.getenv("SECRET_KEY")
app.config["SECRET_KEY"] = secret_key
app.config["UOLOAD_FOLDER"] = os.path.abspath("uploaded_file")
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///upthrust.db"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

""" MODEL """
class Email(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(255*50), nullable=False)
    user_id = db.Column(db.Integer, nullable=False)
    applicant_name = db.Column(db.String(100), nullable=False)
    applicant_email = db.Column(db.String(100), nullable=False)
    job_description = db.Column(db.Text, nullable=False)


with app.app_context():
    db.drop_all()
    db.create_all()
