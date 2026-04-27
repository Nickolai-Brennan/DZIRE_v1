# [Resource] API

> Replace `[Resource]` with the actual resource name (e.g., Users, Positions, Reviews).

## Routes

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| `GET` | `/api/v1/[resource]` | required | List all [resource]s |
| `GET` | `/api/v1/[resource]/{id}` | required | Get [resource] by ID |
| `POST` | `/api/v1/[resource]` | required | Create new [resource] |
| `PUT` | `/api/v1/[resource]/{id}` | required | Update [resource] |
| `DELETE` | `/api/v1/[resource]/{id}` | required | Delete [resource] |

## Schemas

### Request: `[Resource]Create`
```python
class [Resource]Create(BaseModel):
    field_one: str
    field_two: Optional[str] = None
```

### Request: `[Resource]Update`
```python
class [Resource]Update(BaseModel):
    field_one: Optional[str] = None
    field_two: Optional[str] = None
```

### Response: `[Resource]Response`
```python
class [Resource]Response(BaseModel):
    id: UUID
    field_one: str
    field_two: Optional[str]
    created_at: datetime
    updated_at: datetime
```

## Example Payloads

### POST `/api/v1/[resource]`

**Request:**
```json
{
  "field_one": "example value",
  "field_two": "optional value"
}
```

**Response (201):**
```json
{
  "data": {
    "id": "a1b2c3d4-...",
    "field_one": "example value",
    "field_two": "optional value",
    "created_at": "2025-01-01T00:00:00Z",
    "updated_at": "2025-01-01T00:00:00Z"
  }
}
```

### GET `/api/v1/[resource]/{id}`

**Response (200):**
```json
{
  "data": {
    "id": "a1b2c3d4-...",
    "field_one": "example value",
    "field_two": "optional value",
    "created_at": "2025-01-01T00:00:00Z",
    "updated_at": "2025-01-01T00:00:00Z"
  }
}
```

## Notes
- All timestamps in ISO 8601 UTC format
- IDs are UUIDs
- See [api-conventions.md](../references/api-conventions.md) for full standards
