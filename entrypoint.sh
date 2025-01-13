#!/bin/sh
psql $DATABASE_URL -c "CREATE SCHEMA IF NOT EXISTS $SCHEMA"
flask db upgrade
flask seed all
gunicorn app:app