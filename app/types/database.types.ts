export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      contact_submissions: {
        Row: {
          created_at: string
          email: string
          id: string
          message: string
          name: string
          phone: string
          status: string
          telegram_notification_error: string | null
          telegram_notified_at: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          message: string
          name: string
          phone?: string
          status?: string
          telegram_notification_error?: string | null
          telegram_notified_at?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          message?: string
          name?: string
          phone?: string
          status?: string
          telegram_notification_error?: string | null
          telegram_notified_at?: string | null
        }
        Relationships: []
      }
      driver_application_documents: {
        Row: {
          application_id: string
          content_type: string
          created_at: string
          document_type: string
          id: string
          object_path: string
          original_filename: string
          size_bytes: number
        }
        Insert: {
          application_id: string
          content_type: string
          created_at?: string
          document_type: string
          id?: string
          object_path: string
          original_filename: string
          size_bytes: number
        }
        Update: {
          application_id?: string
          content_type?: string
          created_at?: string
          document_type?: string
          id?: string
          object_path?: string
          original_filename?: string
          size_bytes?: number
        }
        Relationships: [
          {
            foreignKeyName: "driver_application_documents_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "driver_applications"
            referencedColumns: ["id"]
          },
        ]
      }
      driver_applications: {
        Row: {
          company: string
          created_at: string
          email: string
          id: string
          kvk_number: string
          license_plate: string
          name: string
          phone: string
          status: string
          telegram_notification_error: string | null
          telegram_notified_at: string | null
          terms_accepted_at: string
          tx_certificate: boolean
          vehicle: string
        }
        Insert: {
          company: string
          created_at?: string
          email: string
          id?: string
          kvk_number: string
          license_plate: string
          name: string
          phone: string
          status?: string
          telegram_notification_error?: string | null
          telegram_notified_at?: string | null
          terms_accepted_at?: string
          tx_certificate: boolean
          vehicle: string
        }
        Update: {
          company?: string
          created_at?: string
          email?: string
          id?: string
          kvk_number?: string
          license_plate?: string
          name?: string
          phone?: string
          status?: string
          telegram_notification_error?: string | null
          telegram_notified_at?: string | null
          terms_accepted_at?: string
          tx_certificate?: boolean
          vehicle?: string
        }
        Relationships: []
      }
      partner_requests: {
        Row: {
          appointment_date: string
          appointment_time: string
          created_at: string
          email: string
          id: string
          status: string
          telegram_notification_error: string | null
          telegram_notified_at: string | null
        }
        Insert: {
          appointment_date: string
          appointment_time: string
          created_at?: string
          email: string
          id?: string
          status?: string
          telegram_notification_error?: string | null
          telegram_notified_at?: string | null
        }
        Update: {
          appointment_date?: string
          appointment_time?: string
          created_at?: string
          email?: string
          id?: string
          status?: string
          telegram_notification_error?: string | null
          telegram_notified_at?: string | null
        }
        Relationships: []
      }
      ride_requests: {
        Row: {
          authorisation_number: string | null
          birth_date: string
          contact_consent: boolean
          created_at: string
          email: string
          first_name: string
          has_transport_authorisation: boolean
          id: string
          insurer: string
          last_name: string
          phone: string
          status: string
          telegram_notification_error: string | null
          telegram_notified_at: string | null
        }
        Insert: {
          authorisation_number?: string | null
          birth_date: string
          contact_consent?: boolean
          created_at?: string
          email: string
          first_name: string
          has_transport_authorisation: boolean
          id?: string
          insurer: string
          last_name: string
          phone: string
          status?: string
          telegram_notification_error?: string | null
          telegram_notified_at?: string | null
        }
        Update: {
          authorisation_number?: string | null
          birth_date?: string
          contact_consent?: boolean
          created_at?: string
          email?: string
          first_name?: string
          has_transport_authorisation?: boolean
          id?: string
          insurer?: string
          last_name?: string
          phone?: string
          status?: string
          telegram_notification_error?: string | null
          telegram_notified_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
