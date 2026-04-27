/**
 * frontend/src/components/auth/RoleGate.tsx
 * Renders children only if the current user has the required role.
 * Optionally renders a fallback for unauthorised users.
 *
 * Usage:
 *   <RoleGate role="admin">
 *     <AdminPanel />
 *   </RoleGate>
 *
 *   <RoleGate role="vip" fallback={<Paywall />}>
 *     <VIPContent />
 *   </RoleGate>
 */
import React from "react";
import { usePermissions } from "../../hooks/usePermissions";

interface RoleGateProps {
  role: string;
  fallback?: React.ReactNode;
  children: React.ReactNode;
}

export const RoleGate: React.FC<RoleGateProps> = ({
  role,
  fallback = null,
  children,
}) => {
  const { hasRole, isAdmin } = usePermissions();

  // Admin can always see everything
  if (isAdmin || hasRole(role)) {
    return <>{children}</>;
  }

  return <>{fallback}</>;
};
