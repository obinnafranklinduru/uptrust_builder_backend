from flask import Flask, jsonify, request
import os
from flask_sqlalchemy import SQLAlchemy
# from flask_jwt import JWT
import jwt
from functools import wraps

""" CONFIG """
app = Flask(__name__)

secret_key = os.getenv("SECRET_KEY")

app.config["SECRET_KEY"] = secret_key
# jwt = JWT(app)

app.config["UOLOAD_FOLDER"] = os.path.abspath("uploaded_file")
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///upthrust.db"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

def verify(func):
    @wraps
    def wrapper():
        token = request.headers.get('authorization')
        
        if not token:
            return jsonify({'message': 'Token is missing'}), 401
            
        try:
            payload = jwt.decode(token.split(" ")[1], secret_key, algorithms=["HS256"])
            print(payload)
            return func(*args, **kwargs)  # Call the wrapped function
        
        except jwt.ExpiredSignatureError:
            raise ValueError("token expired")
        except jwt.InvalidTokenError:
            raise ValueError("invalid token")


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
