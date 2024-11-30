export interface IUser {
  id: number;
  is_active: boolean;
  is_admin: boolean;
  can_grade: boolean;
  name: string;
  surname: string;
  patronymic: string;
  email: string;
  avatar: Avatar;
  gender: Gender;
  tags: Tag[];
  projects: Project[];
  created_at: string;
  updated_at: string;
}

export interface Avatar {
  id: number;
  original_name: string;
  link: string;
  created_at: string;
  updated_at: string;
}

export interface Gender {
  id: number;
  name: string;
}

export interface Tag {
  id: number;
  tag: string;
  color_bg: string;
  color_fg: string;
}

export interface Project {
  id: number;
  name: string;
  wiki_link: string;
  slug: string;
  perm_manager_is_admin: boolean;
  perm_user_create_task: boolean;
  perm_user_self_assign: boolean;
  capabilities: string[];
  flow: Flow;
  logo: Logo;
  role: Role;
  created_at: string;
  updated_at: string;
  begin: string;
  end: string;
  estimated_end: string;
  project_planning: ProjectPlanning;
  project_cost: ProjectCost;
  project_completion: ProjectCompletion;
}

export interface Flow {
  name: string;
  slug: string;
  visibleTaskFields: string[];
  possibleProjectComponents: PossibleProjectComponent[];
  possibleProjectStages: PossibleProjectStage[];
}

export interface PossibleProjectComponent {
  id: number;
  name: string;
}

export interface PossibleProjectStage {
  id: number;
  name: string;
}

export interface Logo {
  id: number;
  original_name: string;
  link: string;
  created_at: string;
  updated_at: string;
}

export interface Role {
  id: number;
  name: string;
}

export interface ProjectPlanning {
  estimated: number;
  planned: number;
  planned_percent: number;
}

export interface ProjectCost {
  summary: Summary;
  items: Item[];
}

export interface Summary {
  estimated_h: number;
  fact_h: number;
  estimated_total: number;
  fact_total: number;
  profit: number;
  profitability: number;
}

export interface Item {
  role: Role2;
  estimated_h: number;
  fact_h: number;
  rate: number;
  estimated_total: number;
  fact_total: number;
  deviation: number;
  is_overtime: boolean;
  is_warranty: boolean;
}

export interface Role2 {
  id: number;
  name: string;
}

export interface ProjectCompletion {
  estimated: number;
  completed: number;
  completed_percent: number;
}

export interface ILoginData extends Pick<IUser, 'email'> {
  password: string;
}
