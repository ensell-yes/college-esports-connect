
export type AppRole = 
  | 'Player'
  | 'Parent'
  | 'PrivateCoach'
  | 'ProgramStaff'
  | 'ProgramAdmin'
  | 'ProgramDeveloper'
  | 'PartnerStaff'
  | 'PartnerAdmin'
  | 'PartnerDeveloper'
  | 'YesStaff'
  | 'YesAdmin'
  | 'YesDeveloper';

export type TenantType = 'Program' | 'Partner' | 'YeS';

export interface Tenant {
  id: string;
  name: string;
  type: TenantType;
  created_at: string;
  updated_at: string;
}

export interface UserRole {
  id: string;
  user_id: string;
  role: AppRole;
  tenant_id?: string;
  created_at: string;
}

export interface PolicyDefinition {
  id: string;
  policy_name: string;
  description?: string;
  role: AppRole;
  table_name: string;
  action: string;
  condition?: string;
  tenant_scope?: string;
  created_by: string;
  created_at: string;
  updated_at: string;
}
