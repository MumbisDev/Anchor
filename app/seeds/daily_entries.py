from app.models import db, DailyEntry, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime, timedelta, timezone

def seed_daily_entries():
    entries = [
        DailyEntry(
            user_id=1,
            habit_id=1,
            improvement_note='Great workout today!',
            compound_meter_increment=1.2,
            created_at=datetime.utcnow() - timedelta(days=1)
        ),
        DailyEntry(
            user_id=1,
            habit_id=2,
            improvement_note='Finished a chapter',
            compound_meter_increment=1.0,
            created_at=datetime.utcnow() - timedelta(days=1)
        ),
        DailyEntry(
            user_id=2,
            habit_id=3,
            improvement_note='Peaceful session',
            compound_meter_increment=1.1,
            created_at=datetime.utcnow() - timedelta(days=1)
        )
    ]

    db.session.add_all(entries)
    db.session.commit()

def undo_daily_entries():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.daily_entries RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM daily_entries"))
    db.session.commit()