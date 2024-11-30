from dotenv import load_dotenv
import os

load_dotenv()  # Загружаем переменные из файла .env

class Config:
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URI')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = os.getenv('SECRET_KEY')  # Загружаем из переменной окружения
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY')  # Загружаем из переменной окружения
