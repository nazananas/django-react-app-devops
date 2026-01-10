#!/bin/sh
set -e

if [ "$DATABASE" = "postgres" ]; then
    echo "Waiting for PostgreSQL..."
    for i in $(seq 1 50); do
        if python - << END
import socket, os
s = socket.socket()
s.settimeout(1)
try:
    s.connect((os.environ["DB_HOST"], int(os.environ["DB_PORT"])))
    s.close()
    exit(0)
except Exception:
    exit(1)
END
        then
            echo "PostgreSQL is available"
            break
        fi
        sleep 0.2
    done
fi

python manage.py migrate --noinput
python manage.py collectstatic --noinput

exec "$@"