export interface PROPS_ALL_CHEMICALS {
  id: string;
  name: number;
  used_amount: number;
  used_date: number;
  used_user: string;
  is_registerd: boolean;
  shipped_for: number;
  created_at: string;
  updated_at: string;
}

export interface PROPS_POST_CHEMICAL {
  name: number;
  used_amount: number;
  used_user: string;
  used_date: number;
  shipped_for: number;
}
