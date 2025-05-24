
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useRoleManagement } from "@/hooks/useRoleManagement";
import { PolicyTable } from "./PolicyTable";
import { PolicyForm } from "./PolicyForm";
import { PolicyDefinition } from "@/types/roles";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export const PolicyEditor = () => {
  const {
    tenants,
    policies,
    loading,
    hasGlobalAccess,
    createPolicy,
    updatePolicy,
    deletePolicy
  } = useRoleManagement();

  const [isGlobalAdmin, setIsGlobalAdmin] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingPolicy, setEditingPolicy] = useState<PolicyDefinition | null>(null);

  useEffect(() => {
    const checkGlobalAccess = async () => {
      const global = await hasGlobalAccess();
      setIsGlobalAdmin(global);
    };
    
    checkGlobalAccess();
  }, [hasGlobalAccess]);

  const handleCreatePolicy = async (policyData: Omit<PolicyDefinition, 'id' | 'created_by' | 'created_at' | 'updated_at'>) => {
    const success = await createPolicy(policyData);
    if (success) {
      setShowForm(false);
    }
  };

  const handleUpdatePolicy = async (policyData: Omit<PolicyDefinition, 'id' | 'created_by' | 'created_at' | 'updated_at'>) => {
    if (!editingPolicy) return;
    
    const success = await updatePolicy(editingPolicy.id, policyData);
    if (success) {
      setEditingPolicy(null);
      setShowForm(false);
    }
  };

  const handleEditPolicy = (policy: PolicyDefinition) => {
    setEditingPolicy(policy);
    setShowForm(true);
  };

  const handleDeletePolicy = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this policy?')) {
      await deletePolicy(id);
    }
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingPolicy(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-lg">Loading policies...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Policy Editor</CardTitle>
              <CardDescription>
                Manage Row-Level Security policies for your {isGlobalAdmin ? 'organization' : 'tenant'}
              </CardDescription>
            </div>
            <Button onClick={() => setShowForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Policy
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <PolicyTable
            policies={policies}
            tenants={tenants}
            isGlobalAdmin={isGlobalAdmin}
            onEdit={handleEditPolicy}
            onDelete={handleDeletePolicy}
          />
        </CardContent>
      </Card>

      <Dialog open={showForm} onOpenChange={closeForm}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingPolicy ? 'Edit Policy' : 'Create New Policy'}
            </DialogTitle>
          </DialogHeader>
          <PolicyForm
            tenants={tenants}
            isGlobalAdmin={isGlobalAdmin}
            initialData={editingPolicy}
            onSubmit={editingPolicy ? handleUpdatePolicy : handleCreatePolicy}
            onCancel={closeForm}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};
