# ToDoList BeeJee

ToDoList BeeJee — это веб-приложение для управления задачами, с разделением на фронтенд и бэкенд части, использующее стек технологий Flask, React и PostgreSQL, PGadmin. В проекте реализованы основные функции для создания, а также для администратора редактирования и изменения статус.

## Стек технологий

- **Frontend**: React, React Router
- **Backend**: Flask, Flask-SQLAlchemy
- **Database**: PostgreSQL, PGadmin
- **Deployment**: Docker, Docker Compose

## Установка и запуск

### 1. Клонируйте репозиторий

```bash
git clone https://github.com/Aindy/ToDoList_BeeJee.git
cd ToDoList_BeeJee

### 2. Настройка окружения
2.1 Создание и активация виртуального окружения
Для работы с Python-проектом, вам нужно создать виртуальное окружение:

```bash
python -m venv .venv
source .venv/bin/activate  # Для Linux/Mac
.venv\Scripts\activate  # Для Windows

### 2.2 Установка зависимостей для бэкенда
Перейдите в папку с бэкендом и установите зависимости:

```bash
cd backend
pip install -r requirements.txt
2.3 Настройка базы данных
Убедитесь, что у вас установлен и запущен PostgreSQL. Затем создайте базу данных:

```bash
psql -U postgres
CREATE DATABASE todo_db;
После этого выполните миграции для базы данных:

```bash
flask db init
flask db migrate -m "Initial migration"
flask db upgrade

### 2.4 Настройка и запуск фронтенда
Перейдите в директорию с фронтендом и установите все необходимые зависимости:

```bash
cd frontend
npm install
2.5 Запуск приложения
Для разработки вы можете запустить как сервер бэкенда, так и фронтенда:

### Запустите бэкенд:
```bash
cd backend
flask run

### Запустите фронтенд:
```bash
cd frontend
npm start
Теперь ваше приложение будет доступно по адресу http://localhost:3000 (для фронтенда) и http://localhost:5000 (для бэкенда).

### 3. Docker
Для удобства деплоя вы можете использовать Docker.

### 3.1 Запуск с использованием Docker
Для запуска всего проекта с помощью Docker, вам нужно использовать Docker Compose.
Выполните в корневой директории:

### Запустите докер композ:
```bash
docker compose -f production.yaml up --build


### Проект будет доступен на портах, указанных в файле docker-compose.yml. По умолчанию это:

Главная: http://localhost

#№ Доступные маршруты
Главная: localhost
Админка: localhost/login