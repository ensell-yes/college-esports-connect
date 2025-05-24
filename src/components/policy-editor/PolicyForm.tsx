
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AppRole, Tenant, PolicyDefinition } from "@/types/roles";

const roles: AppRole[] = [
  'Player', 'Parent', 'PrivateCoach', 'ProgramStaff', 'ProgramAdmin', 
  'ProgramDeveloper', 'PartnerStaff', 'PartnerAdmin', 'PartnerDeveloper',
  'YesStaff', 'YesAdmin', 'YesDeveloper'
];

const actions = ['SELECT', 'INSERT', 'UPDATE', 'DELETE', 'ALL'];

const tables = [
  'players', 'coaches', 'programs', 'partners', 'user_management',
  'subscriptions', 'invoices', 'api_keys', 'policy_definitions'
];

const policyFormSchema = z.object({
  policy_name: z.string().min(1, "Policy name is required"),
  description: z.string().optional(),
  role: z.string().min(1, "Role is required"),
  table_name: z.string().min(1, "Table name is required"),
  action: z.string().min(1, "Action is required"),
  condition: z.string().optional(),
  tenant_scope: z.string().optional(),
});

type PolicyFormValues = z.infer<typeof policyFormSchema>;

interface PolicyFormProps {
  tenants: Tenant[];
  isGlobalAdmin: boolean;
  initialData?: PolicyDefinition | null;
  onSubmit: (data: Omit<PolicyDefinition, 'id' | 'created_by' | 'created_at' | 'updated_at'>) => void;
  onCancel: () => void;
}

export const PolicyForm: React.FC<PolicyFormProps> = ({
  tenants,
  isGlobalAdmin,
  initialData,
  onSubmit,
  onCancel
}) => {
  const form = useForm<PolicyFormValues>({
    resolver: zodResolver(policyFormSchema),
    defaultValues: {
      policy_name: initialData?.policy_name || "",
      description: initialData?.description || "",
      role: initialData?.role || "",
      table_name: initialData?.table_name || "",
      action: initialData?.action || "",
      condition: initialData?.condition || "",
      tenant_scope: initialData?.tenant_scope || "",
    },
  });

  const handleSubmit = (values: PolicyFormValues) => {
    onSubmit({
      policy_name: values.policy_name,
      description: values.description,
      role: values.role as AppRole,
      table_name: values.table_name,
      action: values.action,
      condition: values.condition,
      tenant_scope: values.tenant_scope || undefined,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="policy_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Policy Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter policy name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Optional description of the policy"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {roles.map((role) => (
                      <SelectItem key={role} value={role}>
                        {role}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="table_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Table</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a table" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {tables.map((table) => (
                      <SelectItem key={table} value={table}>
                        {table}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="action"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Action</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an action" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {actions.map((action) => (
                      <SelectItem key={action} value={action}>
                        {action}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tenant_scope"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tenant Scope</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select tenant scope" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="">Global (All Tenants)</SelectItem>
                    {tenants.map((tenant) => (
                      <SelectItem key={tenant.id} value={tenant.id}>
                        {tenant.name} ({tenant.type})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  {isGlobalAdmin 
                    ? "Select specific tenant or leave blank for global access"
                    : "Limited to your tenant scope"
                  }
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="condition"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Condition (SQL)</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="e.g., auth.uid() = user_id AND published = true"
                  className="font-mono text-sm"
                  {...field} 
                />
              </FormControl>
              <FormDescription>
                Optional SQL condition for the policy. Use PostgreSQL RLS syntax.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-2 pt-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">
            {initialData ? 'Update Policy' : 'Create Policy'}
          </Button>
        </div>
      </form>
    </Form>
  );
};
