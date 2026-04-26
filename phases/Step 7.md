# STEP 7 — AUTHENTICATION + USERS + ROLES + PERMISSIONS SYSTEM

Step 7 adds identity, access control, and protected content.

This step defines:
- User accounts
- Authentication (login/signup)
- Session/JWT handling
- Role-based access control (RBAC)
- Permission system
- Admin access control
- VIP membership access
- Protected content rules
- Security practices

---

## STEP 7 OBJECTIVE

Control who can access what across the system.

```text
Public App
→ Users
→ Auth System
→ Roles
→ Permissions
→ Protected Content
→ Admin Access


---

STEP 7 FILE STRUCTURE ADDITIONS

backend/app/auth/
├── models.py
├── schemas.py
├── routes.py
├── services.py
├── dependencies.py
├── security.py
└── tokens.py

backend/app/users/
├── models.py
├── schemas.py
├── routes.py
└── services.py

backend/app/permissions/
├── roles.py
├── permissions.py
├── guards.py
└── services.py

frontend/src/auth/
├── LoginPage.tsx
├── RegisterPage.tsx
├── ForgotPasswordPage.tsx
├── ResetPasswordPage.tsx

frontend/src/context/
├── AuthContext.tsx

frontend/src/hooks/
├── useAuth.ts
├── usePermissions.ts

frontend/src/components/auth/
├── LoginForm.tsx
├── RegisterForm.tsx
├── ProtectedRoute.tsx
├── RoleGate.tsx

docs/authentication.md
docs/roles-permissions.md
docs/security.md

skills/auth-builder/
skills/permission-designer/
skills/rbac-manager/

.github/agents/auth-agent.md
.github/agents/security-agent.md
.github/agents/user-management-agent.md


---

1. USER MODEL

id
email
username
password_hash
first_name
last_name
avatar_url
role
status
is_verified
is_vip
vip_plan_id
created_at
updated_at
last_login


---

2. USER STATUS

active
inactive
suspended
banned


---

3. ROLE SYSTEM

Core Roles

admin
editor
marketing
sponsor_manager
analyst
member
vip
guest


---

Role Descriptions

admin            → full system access
editor           → content creation and editing
marketing        → campaigns, SEO, newsletter
sponsor_manager  → sponsors and affiliates
analyst          → dashboards only
member           → registered user
vip              → premium subscriber
guest            → not logged in


---

4. PERMISSION SYSTEM

Permission Types

create_post
edit_post
delete_post
publish_post
view_admin
view_analytics
manage_affiliates
manage_sponsors
manage_users
manage_roles
manage_payments
view_vip_content


---

Role → Permission Map

admin
→ all permissions

editor
→ create_post
→ edit_post
→ publish_post

marketing
→ view_analytics
→ manage_affiliates
→ manage_sponsors

analyst
→ view_analytics

vip
→ view_vip_content

member
→ basic access only


---

5. AUTHENTICATION METHODS

Options

JWT (recommended)
Session-based auth
OAuth (Google, GitHub, etc.)
Magic link login (optional)


---

JWT STRUCTURE

{
  "user_id": "uuid",
  "email": "user@email.com",
  "role": "admin",
  "is_vip": true,
  "exp": 1712345678
}


---

6. AUTH ROUTES

/api/auth/register
/api/auth/login
/api/auth/logout
/api/auth/refresh
/api/auth/forgot-password
/api/auth/reset-password
/api/auth/verify-email


---

7. USER ROUTES

/api/users/me
/api/users/update
/api/users/{id}
/api/users/list
/api/users/delete


---

8. AUTH WORKFLOW

Registration

User submits form
→ Validate input
→ Hash password
→ Store user
→ Send verification email


---

Login

User submits credentials
→ Validate
→ Generate JWT
→ Return access + refresh token


---

Authenticated Request

Client sends token
→ Backend validates token
→ Extract user + role
→ Check permissions
→ Allow or deny


---

9. FRONTEND AUTH FLOW

AuthContext

Handles:

Current user
JWT token
Login/logout
Token refresh


---

Protected Routes

<ProtectedRoute>
  <AdminDashboard />
</ProtectedRoute>


---

Role-Based Rendering

<RoleGate role="admin">
  <AdminPanel />
</RoleGate>


---

10. VIP ACCESS CONTROL

Rules

VIP content requires:
- Logged in
- Active VIP subscription

Frontend

{user?.is_vip ? <VIPContent /> : <Paywall />}

Backend

def require_vip(user):
    if not user.is_vip:
        raise HTTPException(status_code=403)


---

11. ADMIN ACCESS CONTROL

Rule

Only admin role can access /admin routes

Backend Guard

def require_admin(user):
    if user.role != "admin":
        raise HTTPException(status_code=403)


---

12. PERMISSION GUARDS

Example

def require_permission(permission: str):
    def guard(user):
        if permission not in user.permissions:
            raise HTTPException(status_code=403)
        return True
    return guard


---

13. SECURITY RULES

Passwords

Hash using bcrypt
Never store plain text
Enforce strong passwords


---

Tokens

Short-lived access tokens
Long-lived refresh tokens
Rotate tokens on login
Store securely (HTTP-only cookies preferred)


---

API Protection

Rate limiting
Input validation
CORS control
CSRF protection


---

14. SESSION MANAGEMENT

Login → create session/token
Activity → refresh token
Logout → revoke token
Expired → force login


---

15. AUDIT LOGGING

Track:

Login attempts
Password changes
Role changes
Admin actions
Content deletions
Payment events


---

16. BACKEND AUTH MODULE STRUCTURE

backend/app/auth/
├── models.py        # user + token models
├── schemas.py       # request/response schemas
├── routes.py        # auth endpoints
├── services.py      # business logic
├── security.py      # hashing + validation
├── tokens.py        # JWT logic
└── dependencies.py  # guards and middleware


---

17. FRONTEND AUTH STRUCTURE

frontend/src/auth/
frontend/src/context/
frontend/src/hooks/
frontend/src/components/auth/


---

18. NEW AGENTS FOR STEP 7

auth-agent

Purpose:

Build authentication system

Handle login/register flows


security-agent

Purpose:

Enforce security best practices

Audit vulnerabilities


user-management-agent

Purpose:

Manage users, roles, permissions

Handle admin user tools



---

19. NEW SKILLS FOR STEP 7

skills/auth-builder/
skills/permission-designer/
skills/rbac-manager/


---

20. STEP 7 BUILD ORDER

1. Create user database schema
2. Create role + permission system
3. Build auth backend models
4. Build auth routes
5. Implement JWT/token system
6. Add password hashing
7. Build frontend auth pages
8. Create AuthContext
9. Add protected routes
10. Add role-based rendering
11. Add VIP access rules
12. Add admin guards
13. Add audit logging
14. Add docs


---

21. STEP 7 TASK LIST

T-101 Create user table
T-102 Create roles system
T-103 Create permissions system
T-104 Create auth models
T-105 Create auth schemas
T-106 Create auth routes
T-107 Implement JWT tokens
T-108 Implement password hashing
T-109 Create login page
T-110 Create register page
T-111 Create AuthContext
T-112 Create ProtectedRoute component
T-113 Create RoleGate component
T-114 Add VIP access logic
T-115 Add admin guards
T-116 Add permission guards
T-117 Add audit logging
T-118 Create auth docs
T-119 Run security review
T-120 Run Step 7 review


---

STEP 7 COMPLETION CHECKLIST

[ ] Users can register
[ ] Users can login
[ ] JWT/session auth works
[ ] Roles defined
[ ] Permissions defined
[ ] Admin access restricted
[ ] VIP access restricted
[ ] Protected routes working
[ ] Role-based UI working
[ ] Passwords securely hashed
[ ] Tokens managed properly
[ ] API protected
[ ] Audit logs implemented
[ ] Auth agents added
[ ] Auth skills added
[ ] Docs created


---

STEP 7 COMPLETION STANDARD

Step 7 is complete when the system can:

Authenticate users
Authorize access by role
Restrict content by permission
Protect admin routes
Protect VIP content
Secure API endpoints
Track user activity


---

NEXT STEP

Step 8 should implement payments, billing, subscriptions (Stripe or similar), affiliate tracking, and revenue systems integration.
