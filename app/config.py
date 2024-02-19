from flask import Flask, jsonify, request
import os
from flask_pymongo import PyMongo

# from flask_jwt import JWT
import jwt

""" CONFIG """
app = Flask(__name__)

secret_key = os.getenv("SECRET_KEY")

app.config["SECRET_KEY"] = secret_key
app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY")
app.config["UOLOAD_FOLDER"] = os.getcwd()
app.config['MONGO_URI'] = 'mongodb+srv://uptrustdatabase:MA5SxJuiWIBf1Mef@dictionary.dxa2nfr.mongodb.net/uptrustdatabase?retryWrites=true&w=majority'

mongo = PyMongo(app)

def verify_token():
    token = request.headers.get('Authorization')
    if token:
        print(token)
        token = request.headers.get('Authorization')

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

class Email:
    def __init__(self, email_gen, user_id, user_name, email_address, job_description):
        self.email = email_gen
        self.user_id = user_id
        self.applicant_name = user_name
        self.applicant_email = email_address
        self.job_description = job_description
        self.date_time = datetime.now()

class CVFile:
    def __init__(self, user_id, file_name, file_data, score, email_address):
        self.user_id = user_id
        self.file_name = file_name
        self.file_data = file_data
        self.score = score
        self.email_address = email_address
        self.date_time = datetime.now()

class Jobs:
    def __init__(self, file_name, file_data):
        self.file_name = file_name
        self.file_data = file_data
        self.date_time = datetime.now()


