
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

export interface UserRole {
  id: string;
  user_id: string;
  role: AppRole;
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
  created_by: string;
  created_at: string;
  updated_at: string;
}
