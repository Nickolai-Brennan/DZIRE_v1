# api/

REST and GraphQL API layer for DZIRE_v1.

## Structure

```
api/
├── rest/         # REST endpoint contracts and docs
├── graphql/      # GraphQL schema definitions
├── contracts/    # Request / response type contracts
├── examples/     # Example requests and responses
└── README.md
```

## Stack
- **REST**: FastAPI routes (`/api/v1/…`)
- **GraphQL**: Strawberry (planned)
- **Contracts**: OpenAPI / Pydantic schemas

## Owner
`api-agent` → `api-designer` skill

See [`config/stack.config.json`](../config/stack.config.json) for locked stack decisions.
