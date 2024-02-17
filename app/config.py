from flask import Flask, jsonify, request
import os
from flask_sqlalchemy import SQLAlchemy
# from flask_jwt import JWT
from flask_jwt_extended import JWTManager
from functools import wraps

""" CONFIG """
app = Flask(__name__)

secret_key = os.getenv("SECRET_KEY")

app.config["SECRET_KEY"] = secret_key
app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY") # create a .env file to store the secret key

app.config["UOLOAD_FOLDER"] = os.path.abspath("")
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///upthrust.db"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
jwt = JWTManager(app)

""" MODEL """

class Email(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(255*50), nullable=False)
    user_id = db.Column(db.Integer, nullable=False)
    applicant_name = db.Column(db.String(100), nullable=False)
    applicant_email = db.Column(db.String(100), nullable=False)
    job_description = db.Column(db.Text, nullable=False)

class CVFile(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False)
    file_name = db.Column(db.String(100))
    file_data = db.Column(db.LargeBinary)
    score = db.Column(db.Integer)
    email_address = db.Column(db.String(100), nullable=False)

# from flask import Flask, request, jsonify
# from flask_jwt import JWT, jwt_required, current_identity
# from werkzeug.security import safe_str_cmp
# import os


with app.app_context():
    db.create_all()
