
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { AppRole, Tenant, UserRole, PolicyDefinition } from "@/types/roles";
import { toast } from "@/components/ui/use-toast";

export const useRoleManagement = () => {
  const { user } = useAuth();
  const [userRoles, setUserRoles] = useState<UserRole[]>([]);
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [policies, setPolicies] = useState<PolicyDefinition[]>([]);
  const [loading, setLoading] = useState(true);

  // Check if current user has admin privileges
  const hasAdminAccess = async (tenantId?: string): Promise<boolean> => {
    if (!user) return false;
    
    const { data, error } = await supabase.rpc('auth_has_admin_role', {
      _user_id: user.id,
      _tenant_id: tenantId || null
    });
    
    if (error) {
      console.error('Error checking admin access:', error);
      return false;
    }
    
    return data || false;
  };

  // Check if user has global (YeS) admin access
  const hasGlobalAccess = async (): Promise<boolean> => {
    if (!user) return false;
    
    const { data: yesAdminData } = await supabase.rpc('auth_has_role', {
      _user_id: user.id,
      _role: 'YesAdmin'
    });
    
    const { data: yesDeveloperData } = await supabase.rpc('auth_has_role', {
      _user_id: user.id,
      _role: 'YesDeveloper'
    });
    
    return yesAdminData || yesDeveloperData || false;
  };

  // Fetch tenants
  const fetchTenants = async () => {
    const { data, error } = await supabase
      .from('tenants')
      .select('*')
      .order('name');
    
    if (error) {
      console.error('Error fetching tenants:', error);
      toast({
        title: "Error",
        description: "Failed to fetch tenants",
        variant: "destructive",
      });
      return;
    }
    
    setTenants(data || []);
  };

  // Fetch policies based on user permissions
  const fetchPolicies = async () => {
    const { data, error } = await supabase
      .from('policy_definitions')
      .select('*')
      .order('policy_name');
    
    if (error) {
      console.error('Error fetching policies:', error);
      toast({
        title: "Error",
        description: "Failed to fetch policies",
        variant: "destructive",
      });
      return;
    }
    
    setPolicies(data || []);
  };

  // Create a new policy
  const createPolicy = async (policy: Omit<PolicyDefinition, 'id' | 'created_by' | 'created_at' | 'updated_at'>) => {
    if (!user) return false;
    
    const { error } = await supabase
      .from('policy_definitions')
      .insert({
        ...policy,
        created_by: user.id
      });
    
    if (error) {
      console.error('Error creating policy:', error);
      toast({
        title: "Error",
        description: "Failed to create policy",
        variant: "destructive",
      });
      return false;
    }
    
    toast({
      title: "Success",
      description: "Policy created successfully",
    });
    
    await fetchPolicies();
    return true;
  };

  // Update a policy
  const updatePolicy = async (id: string, updates: Partial<PolicyDefinition>) => {
    const { error } = await supabase
      .from('policy_definitions')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', id);
    
    if (error) {
      console.error('Error updating policy:', error);
      toast({
        title: "Error",
        description: "Failed to update policy",
        variant: "destructive",
      });
      return false;
    }
    
    toast({
      title: "Success",
      description: "Policy updated successfully",
    });
    
    await fetchPolicies();
    return true;
  };

  // Delete a policy
  const deletePolicy = async (id: string) => {
    const { error } = await supabase
      .from('policy_definitions')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Error deleting policy:', error);
      toast({
        title: "Error",
        description: "Failed to delete policy",
        variant: "destructive",
      });
      return false;
    }
    
    toast({
      title: "Success",
      description: "Policy deleted successfully",
    });
    
    await fetchPolicies();
    return true;
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([
        fetchTenants(),
        fetchPolicies()
      ]);
      setLoading(false);
    };

    if (user) {
      loadData();
    }
  }, [user]);

  return {
    userRoles,
    tenants,
    policies,
    loading,
    hasAdminAccess,
    hasGlobalAccess,
    createPolicy,
    updatePolicy,
    deletePolicy,
    refreshPolicies: fetchPolicies
  };
};
