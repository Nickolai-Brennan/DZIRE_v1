/**
 * frontend/src/hooks/usePermissions.ts
 * Hook for checking the current user's role and permissions.
 *
 * Permission → Role mapping mirrors the backend ROLE_PERMISSIONS map.
 */
import { useAuth } from "../context/AuthContext";

export type Permission =
  | "create_post"
  | "edit_post"
  | "delete_post"
  | "publish_post"
  | "view_admin"
  | "view_analytics"
  | "manage_affiliates"
  | "manage_sponsors"
  | "manage_users"
  | "manage_roles"
  | "manage_payments"
  | "view_vip_content";

const ROLE_PERMISSIONS: Record<string, Permission[]> = {
  admin: [
    "create_post",
    "edit_post",
    "delete_post",
    "publish_post",
    "view_admin",
    "view_analytics",
    "manage_affiliates",
    "manage_sponsors",
    "manage_users",
    "manage_roles",
    "manage_payments",
    "view_vip_content",
  ],
  editor: ["create_post", "edit_post", "publish_post"],
  marketing: ["view_analytics", "manage_affiliates", "manage_sponsors"],
  sponsor_manager: ["manage_affiliates", "manage_sponsors"],
  analyst: ["view_analytics"],
  vip: ["view_vip_content"],
  member: [],
  guest: [],
};

export interface UsePermissionsReturn {
  role: string;
  permissions: Permission[];
  hasPermission: (permission: Permission) => boolean;
  hasRole: (role: string) => boolean;
  isAdmin: boolean;
  isVip: boolean;
}

export function usePermissions(): UsePermissionsReturn {
  const { user, isVip } = useAuth();
  const role = user?.role ?? "guest";
  const permissions = ROLE_PERMISSIONS[role] ?? [];

  return {
    role,
    permissions,
    hasPermission: (permission: Permission) => permissions.includes(permission),
    hasRole: (r: string) => role === r,
    isAdmin: role === "admin",
    isVip,
  };
}
