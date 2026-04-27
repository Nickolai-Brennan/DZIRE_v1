# Workflow: Frontend Build

**Owner**: `frontend-agent` | **Skill**: `frontend-builder`

---

## Purpose
Build and extend the React + Vite + TypeScript + Tailwind CSS frontend.

## Stack
- React 18 + Vite
- TypeScript (strict)
- Tailwind CSS
- React Router v6
- Axios / fetch for API calls

## Steps

1. **Start dev server**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

2. **Add a new page**
   - Create `frontend/src/pages/PageName.tsx`.
   - Add route in `frontend/src/routes/`.
   - Add navigation link in relevant layout.

3. **Add a new component**
   - Create `frontend/src/components/ComponentName.tsx`.
   - Define TypeScript props interface at top of file.
   - Style with Tailwind utility classes.

4. **Connect to backend API**
   - Add service function in `frontend/src/services/`.
   - Use the `VITE_API_BASE_URL` env var as the base URL.
   - Handle access token expiry by calling `/auth/refresh`.

5. **Run frontend tests**
   ```bash
   npm run test
   ```

6. **Build for production**
   ```bash
   npm run build
   ```

## Outputs
- Working UI components / pages
- Passing frontend tests
- Production build artifact
