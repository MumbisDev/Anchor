FROM python:3.9.18-alpine3.18

RUN apk add build-base

RUN apk add postgresql-dev gcc python3-dev musl-dev

ARG FLASK_APP
ARG FLASK_ENV
ARG DATABASE_URL
ARG SCHEMA
ARG SECRET_KEY

WORKDIR /var/www

COPY requirements.txt .

RUN pip install -r requirements.txt
RUN pip install psycopg2

COPY . .

# Create a script to run our database setup
RUN echo '#!/bin/sh\n\
    psql $DATABASE_URL -c "CREATE SCHEMA IF NOT EXISTS $SCHEMA";\n\
    flask db upgrade;\n\
    flask seed all;\n\
    gunicorn app:app' > /var/www/entrypoint.sh

RUN chmod +x /var/www/entrypoint.sh

CMD ["/var/www/entrypoint.sh"]