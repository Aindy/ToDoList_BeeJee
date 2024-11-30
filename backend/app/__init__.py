from flask import Flask
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from app.models import db, init_db
from dotenv import load_dotenv
from app.routers import tasks_blueprint
from psycopg2 import OperationalError
from sqlalchemy import create_engine
import time
import os
from datetime import timedelta


load_dotenv(override=True)
jwt = JWTManager()

def create_app():
    
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URI')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
    app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')
    app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=1)

    db.init_app(app)
    jwt.init_app(app)

    CORS(app)

    app.register_blueprint(tasks_blueprint)

    init_db(app)

    return app
