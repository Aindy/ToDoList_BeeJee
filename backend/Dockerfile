# Используем официальный образ Python
FROM python:3.9-slim

# Устанавливаем рабочую директорию для бэкенда
WORKDIR /app

# Копируем файлы проекта в контейнер
COPY . /app

RUN pip install --upgrade pip
# Устанавливаем зависимости
RUN pip install --no-cache-dir -r requirements.txt

# Открываем порт 5000 для Flask приложения
EXPOSE 5000

# Запускаем приложение
CMD ["python", "run.py"]
