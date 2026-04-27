# Roles & Permissions

DZIRE uses **Role-Based Access Control (RBAC)**. Every user has a single role, and each role maps to a fixed set of permissions.

---

## Roles

| Role | Description |
|---|---|
| `admin` | Full system access |
| `editor` | Content creation and editing |
| `marketing` | Campaigns, SEO, newsletter |
| `sponsor_manager` | Sponsors and affiliates |
| `analyst` | Dashboards only |
| `member` | Registered user |
| `vip` | Premium subscriber |
| `guest` | Not logged in |

---

## Permissions

| Permission | Description |
|---|---|
| `create_post` | Create new content posts |
| `edit_post` | Edit existing posts |
| `delete_post` | Delete posts |
| `publish_post` | Publish posts publicly |
| `view_admin` | Access the admin dashboard |
| `view_analytics` | View analytics and reports |
| `manage_affiliates` | Manage affiliate links |
| `manage_sponsors` | Manage sponsors |
| `manage_users` | List and edit users |
| `manage_roles` | Change user roles |
| `manage_payments` | Access payment and billing data |
| `view_vip_content` | View VIP-only content |

---

## Role → Permission Map

| Role | Permissions |
|---|---|
| `admin` | **All permissions** |
| `editor` | `create_post`, `edit_post`, `publish_post` |
| `marketing` | `view_analytics`, `manage_affiliates`, `manage_sponsors` |
| `sponsor_manager` | `manage_affiliates`, `manage_sponsors` |
| `analyst` | `view_analytics` |
| `vip` | `view_vip_content` |
| `member` | *(none — basic access only)* |
| `guest` | *(none — unauthenticated)* |

---

## Backend Guards

### Check a role

```python
from backend.app.permissions.roles import Role

if user.role == Role.admin:
    ...
```

### Check a permission

```python
from backend.app.permissions.permissions import Permission, has_permission

if has_permission(user.role, Permission.create_post):
    ...
```

### FastAPI dependency guards

```python
from backend.app.permissions.guards import require_admin, require_vip, require_permission
from backend.app.permissions.permissions import Permission

# Require admin
@router.delete("/posts/{id}")
async def delete_post(user: User = Depends(get_current_user)):
    require_admin(user)
    ...

# Require VIP
@router.get("/vip/content")
async def vip_content(user: User = Depends(get_current_user)):
    require_vip(user)
    ...

# Require specific permission
@router.post("/posts")
async def create_post(
    user: User = Depends(get_current_user),
    _=Depends(require_permission(Permission.create_post)),
):
    ...
```

---

## Frontend — Role-Based Rendering

```tsx
import { RoleGate } from './components/auth/RoleGate';

// Only admins see this
<RoleGate role="admin">
  <AdminPanel />
</RoleGate>

// VIP content with paywall fallback
<RoleGate role="vip" fallback={<Paywall />}>
  <VIPContent />
</RoleGate>
```

### `usePermissions` hook

```tsx
import { usePermissions } from './hooks/usePermissions';

const { hasPermission, isAdmin, isVip } = usePermissions();

if (hasPermission('create_post')) {
  // Show create button
}
```

---

## Adding a New Role

1. **Backend** — Add the role to `backend/app/permissions/roles.py`:
   ```python
   class Role(str, Enum):
       my_new_role = "my_new_role"
   ```
2. **Backend** — Add the permission mapping in `backend/app/permissions/permissions.py`:
   ```python
   ROLE_PERMISSIONS["my_new_role"] = frozenset({Permission.view_analytics})
   ```
3. **Frontend** — Add to `ROLE_PERMISSIONS` in `frontend/src/hooks/usePermissions.ts`.
4. Run a new Alembic migration if the role needs to be written to the DB as an enum.

---

## Adding a New Permission

1. Add to the `Permission` enum in `backend/app/permissions/permissions.py`.
2. Assign the permission to relevant roles in `ROLE_PERMISSIONS`.
3. Mirror in `frontend/src/hooks/usePermissions.ts` `Permission` type.
4. Use the new permission in route guards as needed.
