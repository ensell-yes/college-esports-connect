
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2 } from "lucide-react";
import { PolicyDefinition, Tenant } from "@/types/roles";

interface PolicyTableProps {
  policies: PolicyDefinition[];
  tenants: Tenant[];
  isGlobalAdmin: boolean;
  onEdit: (policy: PolicyDefinition) => void;
  onDelete: (id: string) => void;
}

export const PolicyTable: React.FC<PolicyTableProps> = ({
  policies,
  tenants,
  isGlobalAdmin,
  onEdit,
  onDelete
}) => {
  const getTenantName = (tenantId?: string) => {
    if (!tenantId) return "Global";
    const tenant = tenants.find(t => t.id === tenantId);
    return tenant ? tenant.name : "Unknown";
  };

  const getRoleColor = (role: string) => {
    if (role.includes('Admin')) return 'destructive';
    if (role.includes('Developer')) return 'secondary';
    if (role.includes('Staff')) return 'outline';
    return 'default';
  };

  const getActionColor = (action: string) => {
    switch (action.toUpperCase()) {
      case 'SELECT': return 'outline';
      case 'INSERT': return 'default';
      case 'UPDATE': return 'secondary';
      case 'DELETE': return 'destructive';
      case 'ALL': return 'destructive';
      default: return 'default';
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Policy Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Table</TableHead>
            <TableHead>Action</TableHead>
            <TableHead>Tenant Scope</TableHead>
            <TableHead>Condition</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {policies.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-4">
                No policies found
              </TableCell>
            </TableRow>
          ) : (
            policies.map((policy) => (
              <TableRow key={policy.id}>
                <TableCell className="font-medium">
                  {policy.policy_name}
                </TableCell>
                <TableCell className="max-w-[200px] truncate">
                  {policy.description || '-'}
                </TableCell>
                <TableCell>
                  <Badge variant={getRoleColor(policy.role)}>
                    {policy.role}
                  </Badge>
                </TableCell>
                <TableCell>
                  <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                    {policy.table_name}
                  </code>
                </TableCell>
                <TableCell>
                  <Badge variant={getActionColor(policy.action)}>
                    {policy.action}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">
                    {getTenantName(policy.tenant_scope)}
                  </Badge>
                </TableCell>
                <TableCell className="max-w-[300px] truncate">
                  {policy.condition ? (
                    <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                      {policy.condition}
                    </code>
                  ) : (
                    '-'
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onEdit(policy)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onDelete(policy.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};
