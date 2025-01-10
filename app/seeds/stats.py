from app.models import db, Stats, environment, SCHEMA
from sqlalchemy.sql import text

def seed_stats():
    stats = [
        Stats(
            user_id=1,
            total_habits_completed=15,
            compound_meter=5.5,
            xp=150,
            level=2
        ),
        Stats(
            user_id=2,
            total_habits_completed=10,
            compound_meter=3.2,
            xp=100,
            level=1
        ),
        Stats(
            user_id=3,
            total_habits_completed=5,
            compound_meter=2.0,
            xp=50,
            level=1
        )
    ]

    db.session.add_all(stats)
    db.session.commit()

def undo_stats():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.stats RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM stats"))
    db.session.commit()