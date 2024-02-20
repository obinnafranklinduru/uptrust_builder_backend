from flask import Flask, jsonify, request
import os
# from flask_pymongo import PyMongo
from flask_sqlalchemy import SQLAlchemy


# from flask_jwt import JWT
import jwt

""" CONFIG """
app = Flask(__name__)

secret_key = os.getenv("SECRET_KEY")

app.config["SECRET_KEY"] = secret_key
app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY")
app.config["UOLOAD_FOLDER"] = os.getcwd()
# app.config['MONGO_URI'] = 'mongodb+srv://uptrustdatabase:MA5SxJuiWIBf1Mef@dictionary.dxa2nfr.mongodb.net/uptrustdatabase?retryWrites=true&w=majority'
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://avnadmin:AVNS_LXBhlJ-mBWPrUM6DrKm@mysql-249b0d7d-heim-weildios.a.aivencloud.com:26029/defaultdb'

# mongo = PyMongo(app)
db = SQLAlchemy(app)

def verify_token():
    token = request.headers.get('Authorization')
    if token:
        print(token)
        token = token.split(" ")[1]

    if not token:
        return False, "Token not provided"

    try:
        # Decode the token using the JWT_SECRET_KEY set in your Flask app
        # print(os.getenv('JWT_SECRET_KEY'))
        decoded_payload = jwt.decode(token, os.getenv('JWT_SECRET_KEY'), algorithms=['HS256'])

        _id = decoded_payload['_id']
        email = decoded_payload['email']

        return True, [_id, email]
    except jwt.ExpiredSignatureError:
        return False, "Token has expiredddddddddddddddddddddd"
    except jwt.InvalidTokenError:
        return False, "Tnvalid token"

""" MODEL """

from datetime import datetime
# from bson.objectid import ObjectId

class Email(db.Model):
    __tablename__ = 'emails'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(256))
    user_id = db.Column(db.String(100))
    applicant_name = db.Column(db.String(100))
    applicant_email = db.Column(db.String(100))
    job_description = db.Column(db.String(100))
    date_time = db.Column(db.DateTime, default=datetime.now)

class CVFile(db.Model):
    __tablename__ = 'cv_files'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Text)  # User Id is String because it's receiving the user Id from a mongodb database
    file_name = db.Column(db.String(100))
    file_data = db.Column(db.String(255))  # Change this to the appropriate data type for your file data
    score = db.Column(db.Integer)
    t_score = db.Column(db.Integer)
    email_address = db.Column(db.String(100))
    date_time = db.Column(db.DateTime, default=datetime.now)

class Job(db.Model):
    __tablename__ = 'jobs'

    id = db.Column(db.Integer, primary_key=True)
    file_name = db.Column(db.String(100))
    file_data = db.Column(db.String(256*5))  # Change this to the appropriate data type for your file data
    date_time = db.Column(db.DateTime, default=datetime.now)

with app.app_context():
    db.drop_all()
    db.create_all()