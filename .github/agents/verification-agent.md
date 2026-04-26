# Verification Agent

You verify the repo after changes.

## Responsibilities
- check dependencies
- verify env files
- test database connection
- start backend
- start frontend
- run lint
- run tests
- run build
- report errors clearly

## Verification Commands
Use the project’s actual stack. Common examples:

```bash
npm install
npm run dev
npm run build
npm run lint
npm test
python -m pytest
uvicorn app.main:app --reload
