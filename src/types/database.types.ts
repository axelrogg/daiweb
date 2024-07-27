export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[];

export type Database = {
    public: {
        Tables: {
            clerk_webhook_event: {
                Row: {
                    created_at: string;
                    event_type: string;
                    id: number;
                    user_id: number | null;
                };
                Insert: {
                    created_at?: string;
                    event_type: string;
                    id?: number;
                    user_id?: number | null;
                };
                Update: {
                    created_at?: string;
                    event_type?: string;
                    id?: number;
                    user_id?: number | null;
                };
                Relationships: [
                    {
                        foreignKeyName: "public_clerk_webhook_event_user_id_fkey";
                        columns: ["user_id"];
                        isOneToOne: false;
                        referencedRelation: "user";
                        referencedColumns: ["id"];
                    },
                ];
            };
            impresiones: {
                Row: {
                    created_at: string;
                    description: string | null;
                    id: number;
                    num_pages: number;
                    user_id: number;
                    user_responsable: number;
                };
                Insert: {
                    created_at?: string;
                    description?: string | null;
                    id?: number;
                    num_pages: number;
                    user_id: number;
                    user_responsable: number;
                };
                Update: {
                    created_at?: string;
                    description?: string | null;
                    id?: number;
                    num_pages?: number;
                    user_id?: number;
                    user_responsable?: number;
                };
                Relationships: [
                    {
                        foreignKeyName: "impresiones_user_id_fkey";
                        columns: ["user_id"];
                        isOneToOne: false;
                        referencedRelation: "user";
                        referencedColumns: ["id"];
                    },
                    {
                        foreignKeyName: "impresiones_user_responsable_fkey";
                        columns: ["user_responsable"];
                        isOneToOne: false;
                        referencedRelation: "user";
                        referencedColumns: ["id"];
                    },
                ];
            };
            prestamos_materiales: {
                Row: {
                    created_at: string;
                    id: number;
                    is_available: boolean;
                    material: string;
                    renewed_count: number;
                    user_id: number;
                    user_responsable_id: number;
                    valid_until: string;
                };
                Insert: {
                    created_at?: string;
                    id?: number;
                    is_available: boolean;
                    material: string;
                    renewed_count?: number;
                    user_id: number;
                    user_responsable_id: number;
                    valid_until: string;
                };
                Update: {
                    created_at?: string;
                    id?: number;
                    is_available?: boolean;
                    material?: string;
                    renewed_count?: number;
                    user_id?: number;
                    user_responsable_id?: number;
                    valid_until?: string;
                };
                Relationships: [
                    {
                        foreignKeyName: "prestamos_user_id_fkey";
                        columns: ["user_id"];
                        isOneToOne: false;
                        referencedRelation: "user";
                        referencedColumns: ["id"];
                    },
                    {
                        foreignKeyName: "prestamos_user_responsable_fkey";
                        columns: ["user_responsable_id"];
                        isOneToOne: false;
                        referencedRelation: "user";
                        referencedColumns: ["id"];
                    },
                ];
            };
            reservas_materiales: {
                Row: {
                    created_at: string;
                    id: number;
                    is_active: boolean;
                    material: string;
                    status: string;
                    user_id: number;
                    valid_until: string;
                };
                Insert: {
                    created_at?: string;
                    id?: number;
                    is_active: boolean;
                    material: string;
                    status: string;
                    user_id: number;
                    valid_until: string;
                };
                Update: {
                    created_at?: string;
                    id?: number;
                    is_active?: boolean;
                    material?: string;
                    status?: string;
                    user_id?: number;
                    valid_until?: string;
                };
                Relationships: [
                    {
                        foreignKeyName: "reservas_materiales_user_id_fkey";
                        columns: ["user_id"];
                        isOneToOne: false;
                        referencedRelation: "user";
                        referencedColumns: ["id"];
                    },
                ];
            };
            user: {
                Row: {
                    clerk_user_id: string;
                    created_at: string;
                    email: string;
                    id: number;
                    is_staff: boolean;
                    is_verified: boolean;
                    last_updated_at: string;
                };
                Insert: {
                    clerk_user_id: string;
                    created_at?: string;
                    email: string;
                    id?: number;
                    is_staff: boolean;
                    is_verified: boolean;
                    last_updated_at?: string;
                };
                Update: {
                    clerk_user_id?: string;
                    created_at?: string;
                    email?: string;
                    id?: number;
                    is_staff?: boolean;
                    is_verified?: boolean;
                    last_updated_at?: string;
                };
                Relationships: [];
            };
        };
        Views: {
            [_ in never]: never;
        };
        Functions: {
            [_ in never]: never;
        };
        Enums: {
            [_ in never]: never;
        };
        CompositeTypes: {
            [_ in never]: never;
        };
    };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
    PublicTableNameOrOptions extends
        | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
        | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends {
        schema: keyof Database;
    }
        ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
              Database[PublicTableNameOrOptions["schema"]]["Views"])
        : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
          Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
          Row: infer R;
      }
        ? R
        : never
    : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
            PublicSchema["Views"])
      ? (PublicSchema["Tables"] &
            PublicSchema["Views"])[PublicTableNameOrOptions] extends {
            Row: infer R;
        }
          ? R
          : never
      : never;

export type TablesInsert<
    PublicTableNameOrOptions extends
        | keyof PublicSchema["Tables"]
        | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends {
        schema: keyof Database;
    }
        ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
        : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
          Insert: infer I;
      }
        ? I
        : never
    : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
      ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
            Insert: infer I;
        }
          ? I
          : never
      : never;

export type TablesUpdate<
    PublicTableNameOrOptions extends
        | keyof PublicSchema["Tables"]
        | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends {
        schema: keyof Database;
    }
        ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
        : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
          Update: infer U;
      }
        ? U
        : never
    : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
      ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
            Update: infer U;
        }
          ? U
          : never
      : never;

export type Enums<
    PublicEnumNameOrOptions extends
        | keyof PublicSchema["Enums"]
        | { schema: keyof Database },
    EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
        ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
        : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
    ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
    : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
      ? PublicSchema["Enums"][PublicEnumNameOrOptions]
      : never;
