# API Contracts — DZIRE_v1

Pydantic v2 request/response schemas and example payloads for all routes.

---

## Auth

### `POST /auth/login`

**Request**
```json
{
  "email": "user@example.com",
  "password": "secret123"
}
```

**Response 200**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer"
}
```

**Response 401**
```json
{ "detail": "Invalid credentials" }
```

---

### `POST /auth/refresh`
Requires `refresh_token` HttpOnly cookie (set by `/auth/login`).

**Response 200**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer"
}
```

---

### `GET /auth/me`
Requires `Authorization: Bearer <access_token>` header.

**Response 200**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "email": "user@example.com",
  "username": "member1",
  "role": "member",
  "is_active": true,
  "created_at": "2026-04-27T06:00:00Z"
}
```

---

## Positions

### `GET /api/v1/positions`

**Response 200**
```json
[
  {
    "id": "uuid",
    "slug": "the-lotus",
    "title": "The Lotus",
    "category": "flexibility",
    "difficulty": "intermediate",
    "score": 8.5,
    "image_url": "https://cdn.dzire.dev/positions/the-lotus.jpg",
    "is_published": true,
    "created_at": "2026-04-01T00:00:00Z"
  }
]
```

### `GET /api/v1/positions/{slug}`

**Response 200**
```json
{
  "id": "uuid",
  "slug": "the-lotus",
  "title": "The Lotus",
  "description": "A deeply intimate position...",
  "category": "flexibility",
  "difficulty": "intermediate",
  "score": 8.5,
  "image_url": "https://cdn.dzire.dev/positions/the-lotus.jpg",
  "is_published": true,
  "created_at": "2026-04-01T00:00:00Z",
  "updated_at": "2026-04-15T00:00:00Z"
}
```

---

## Reviews

### `GET /api/v1/reviews`

**Response 200**
```json
[
  {
    "id": "uuid",
    "slug": "review-the-lotus",
    "title": "Review: The Lotus",
    "score": 9.0,
    "is_published": true,
    "created_at": "2026-04-10T00:00:00Z"
  }
]
```

---

## Error Shape

All errors follow this shape:
```json
{
  "detail": "Human-readable error message",
  "code": "OPTIONAL_ERROR_CODE"
}
```

## Reference
- [`api/routes.md`](./routes.md)
- [`backend/app/schemas/`](../backend/app/schemas/)
