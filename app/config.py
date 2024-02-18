from flask import Flask, jsonify, request
import os
from flask_sqlalchemy import SQLAlchemy
# from flask_jwt import JWT
import jwt

""" CONFIG """
app = Flask(__name__)

secret_key = os.getenv("SECRET_KEY")

app.config["SECRET_KEY"] = secret_key
app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY")

app.config["UOLOAD_FOLDER"] = os.getcwd()
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///upthrust.db"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


db = SQLAlchemy(app)

def verify_token():
    token = request.headers.get('Authorization').split(" ")[1]

    if not token:
        return False, "Token not provided"

    try:
        # Decode the token using the JWT_SECRET_KEY set in your Flask app
        print(os.getenv('JWT_SECRET_KEY'))
        decoded_payload = jwt.decode(token, os.getenv('JWT_SECRET_KEY'), algorithms=['HS256'])

        _id = decoded_payload['_id']
        email = decoded_payload['email']

        return True, [_id, email]
    except jwt.ExpiredSignatureError:
        return False, "Token has expiredddddddddddddddddddddd"
    except jwt.InvalidTokenError:
        return False, "Tnvalid token"

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

with app.app_context():
    db.create_all()
