"""Seed script: users — DZIRE_v1 development fixtures."""
import uuid
from datetime import datetime, timezone


def seed_users() -> list[dict]:
    """Return a list of seed user records for development."""
    now = datetime.now(tz=timezone.utc).isoformat()
    return [
        {
            "id": str(uuid.uuid4()),
            "email": "admin@dzire.dev",
            "username": "admin",
            "hashed_password": "REPLACE_WITH_HASHED_PASSWORD",
            "role": "admin",
            "is_active": True,
            "created_at": now,
            "updated_at": now,
        },
        {
            "id": str(uuid.uuid4()),
            "email": "member@dzire.dev",
            "username": "member1",
            "hashed_password": "REPLACE_WITH_HASHED_PASSWORD",
            "role": "member",
            "is_active": True,
            "created_at": now,
            "updated_at": now,
        },
    ]


if __name__ == "__main__":
    import json
    print(json.dumps(seed_users(), indent=2))
