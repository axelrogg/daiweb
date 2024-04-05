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
                    user_id: number;
                };
                Insert: {
                    created_at?: string;
                    event_type: string;
                    id?: number;
                    user_id: number;
                };
                Update: {
                    created_at?: string;
                    event_type?: string;
                    id?: number;
                    user_id?: number;
                };
                Relationships: [
                    {
                        foreignKeyName: "public_clerk_webhook_event_user_id_fkey";
                        columns: ["user_id"];
                        isOneToOne: true;
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
            user_oauth2: {
                Row: {
                    created_at: string;
                    id: number;
                    provider: string;
                    provider_id: string;
                    user_id: number;
                };
                Insert: {
                    created_at?: string;
                    id?: number;
                    provider: string;
                    provider_id: string;
                    user_id: number;
                };
                Update: {
                    created_at?: string;
                    id?: number;
                    provider?: string;
                    provider_id?: string;
                    user_id?: number;
                };
                Relationships: [
                    {
                        foreignKeyName: "public_user_oauth2_user_id_fkey";
                        columns: ["user_id"];
                        isOneToOne: true;
                        referencedRelation: "user";
                        referencedColumns: ["id"];
                    },
                ];
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
