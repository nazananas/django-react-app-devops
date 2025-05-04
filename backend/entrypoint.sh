#!/bin/sh

if [ "$DATABASE" = "postgres" ]; then
    while ! nc -z $DB_HOST $DB_PORT; do
        sleep 0.1
    done
fi

python manage.py migrate
python manage.py collectstatic --noinput

exec "$@"