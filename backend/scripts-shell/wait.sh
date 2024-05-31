#!/bin/sh

# Waiting for DB
while ! nc -z db 3306; do
  echo "local -> Waiting for the MySQL Server"
  sleep 3
done

python /app/manage.py migrate
python /app/manage.py makemigrations
python /app/manage.py migrate

python /app/manage.py runserver 0.0.0.0:8000