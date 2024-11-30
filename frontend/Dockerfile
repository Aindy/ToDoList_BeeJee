# Используем официальный образ Node.js
FROM node:18

# Устанавливаем рабочую директорию для фронтенда
WORKDIR /app

# Копируем package.json и package-lock.json для установки зависимостей
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем весь проект в контейнер
COPY . .

RUN npm run build

RUN chmod -R 755 /app/build 

# Открываем порт 3000, на котором будет работать приложение
EXPOSE 3000

# Запускаем приложение в режиме продакшн
CMD ["npm", "start"]
