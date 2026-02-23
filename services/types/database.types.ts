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
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      blocked: {
        Row: {
          block_id: number
          blocked_id: string
          blocker_id: string
          created_at: string
        }
        Insert: {
          block_id?: number
          blocked_id?: string
          blocker_id?: string
          created_at?: string
        }
        Update: {
          block_id?: number
          blocked_id?: string
          blocker_id?: string
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "blocked_blocked_id_fkey"
            columns: ["blocked_id"]
            isOneToOne: false
            referencedRelation: "user_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "blocked_blocker_id_fkey"
            columns: ["blocker_id"]
            isOneToOne: false
            referencedRelation: "user_profile"
            referencedColumns: ["id"]
          },
        ]
      }
      chat: {
        Row: {
          chat_id: number
          created_at: string
          is_friend: boolean | null
          match_id: number
        }
        Insert: {
          chat_id?: number
          created_at?: string
          is_friend?: boolean | null
          match_id: number
        }
        Update: {
          chat_id?: number
          created_at?: string
          is_friend?: boolean | null
          match_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "chat_match_id_fkey"
            columns: ["match_id"]
            isOneToOne: true
            referencedRelation: "matches"
            referencedColumns: ["match_id"]
          },
        ]
      }
      lifestyles: {
        Row: {
          lifestyle_id: number
          name: string
        }
        Insert: {
          lifestyle_id?: number
          name: string
        }
        Update: {
          lifestyle_id?: number
          name?: string
        }
        Relationships: []
      }
      love_languages: {
        Row: {
          love_language_id: number
          name: string
        }
        Insert: {
          love_language_id?: number
          name: string
        }
        Update: {
          love_language_id?: number
          name?: string
        }
        Relationships: []
      }
      matches: {
        Row: {
          match_id: number
          matched_at: string
          status: string | null
          user1_id: string
          user2_id: string
        }
        Insert: {
          match_id?: number
          matched_at: string
          status?: string | null
          user1_id?: string
          user2_id?: string
        }
        Update: {
          match_id?: number
          matched_at?: string
          status?: string | null
          user1_id?: string
          user2_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "matches_user1_id_fkey"
            columns: ["user1_id"]
            isOneToOne: false
            referencedRelation: "user_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "matches_user2_id_fkey"
            columns: ["user2_id"]
            isOneToOne: false
            referencedRelation: "user_profile"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          chat_id: number
          message_content: string
          message_id: number
          read_at: string | null
          sender_id: string
          timestamp: string
        }
        Insert: {
          chat_id: number
          message_content: string
          message_id?: number
          read_at?: string | null
          sender_id?: string
          timestamp?: string
        }
        Update: {
          chat_id?: number
          message_content?: string
          message_id?: number
          read_at?: string | null
          sender_id?: string
          timestamp?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_chat_id_fkey"
            columns: ["chat_id"]
            isOneToOne: false
            referencedRelation: "chat"
            referencedColumns: ["chat_id"]
          },
          {
            foreignKeyName: "messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "user_profile"
            referencedColumns: ["id"]
          },
        ]
      }
      pictures: {
        Row: {
          order_index: number | null
          picture_type: string
          pictures_id: number
          uploaded_at: string
          user_id: string
        }
        Insert: {
          order_index?: number | null
          picture_type: string
          pictures_id?: number
          uploaded_at?: string
          user_id?: string
        }
        Update: {
          order_index?: number | null
          picture_type?: string
          pictures_id?: number
          uploaded_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "pictures_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profile"
            referencedColumns: ["id"]
          },
        ]
      }
      preferences: {
        Row: {
          gender_attraction: string
          lifestyle: string
          love_language: string
          preferences_id: number
          relationship_type: string
        }
        Insert: {
          gender_attraction: string
          lifestyle: string
          love_language: string
          preferences_id?: number
          relationship_type: string
        }
        Update: {
          gender_attraction?: string
          lifestyle?: string
          love_language?: string
          preferences_id?: number
          relationship_type?: string
        }
        Relationships: []
      }
      relationship_types: {
        Row: {
          name: string
          relationship_type_id: number
        }
        Insert: {
          name: string
          relationship_type_id?: number
        }
        Update: {
          name?: string
          relationship_type_id?: number
        }
        Relationships: []
      }
      reports: {
        Row: {
          created_at: string
          reason: string
          report_id: number
          reported_id: string
          reporter_id: string
          status: string
        }
        Insert: {
          created_at?: string
          reason: string
          report_id?: number
          reported_id?: string
          reporter_id?: string
          status: string
        }
        Update: {
          created_at?: string
          reason?: string
          report_id?: number
          reported_id?: string
          reporter_id?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "reports_reported_id_fkey"
            columns: ["reported_id"]
            isOneToOne: false
            referencedRelation: "user_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reports_reporter_id_fkey"
            columns: ["reporter_id"]
            isOneToOne: false
            referencedRelation: "user_profile"
            referencedColumns: ["id"]
          },
        ]
      }
      swipes: {
        Row: {
          swipe_id: number
          swipe_type: string | null
          swiped_at: string
          swiped_on_id: string
          swiper_id: string
        }
        Insert: {
          swipe_id?: number
          swipe_type?: string | null
          swiped_at?: string
          swiped_on_id?: string
          swiper_id?: string
        }
        Update: {
          swipe_id?: number
          swipe_type?: string | null
          swiped_at?: string
          swiped_on_id?: string
          swiper_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "swipes_swiped_on_id_fkey"
            columns: ["swiped_on_id"]
            isOneToOne: false
            referencedRelation: "user_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "swipes_swiper_id_fkey"
            columns: ["swiper_id"]
            isOneToOne: false
            referencedRelation: "user_profile"
            referencedColumns: ["id"]
          },
        ]
      }
      user_lifestyles: {
        Row: {
          id: number
          lifestyle_id: number
          user_id: string
        }
        Insert: {
          id?: number
          lifestyle_id: number
          user_id?: string
        }
        Update: {
          id?: number
          lifestyle_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_lifestyles_lifestyle_id_fkey"
            columns: ["lifestyle_id"]
            isOneToOne: false
            referencedRelation: "lifestyles"
            referencedColumns: ["lifestyle_id"]
          },
          {
            foreignKeyName: "user_lifestyles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profile"
            referencedColumns: ["id"]
          },
        ]
      }
      user_love_languages: {
        Row: {
          id: number
          love_language_id: number
          user_id: string
        }
        Insert: {
          id?: number
          love_language_id: number
          user_id?: string
        }
        Update: {
          id?: number
          love_language_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_love_languages_love_language_id_fkey"
            columns: ["love_language_id"]
            isOneToOne: false
            referencedRelation: "love_languages"
            referencedColumns: ["love_language_id"]
          },
          {
            foreignKeyName: "user_love_languages_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profile"
            referencedColumns: ["id"]
          },
        ]
      }
      user_profile: {
        Row: {
          account_status: string
          age: string
          bio: string | null
          email: string
          first_name: string
          gender: string | null
          id: string
          last_name: string | null
          pictures_id: number | null
          playlist: string | null
          preferences_id: number | null
          pronounds: string | null
          school_year: string
          verificattion_status: boolean
        }
        Insert: {
          account_status: string
          age: string
          bio?: string | null
          email: string
          first_name: string
          gender?: string | null
          id?: string
          last_name?: string | null
          pictures_id?: number | null
          playlist?: string | null
          preferences_id?: number | null
          pronounds?: string | null
          school_year: string
          verificattion_status?: boolean
        }
        Update: {
          account_status?: string
          age?: string
          bio?: string | null
          email?: string
          first_name?: string
          gender?: string | null
          id?: string
          last_name?: string | null
          pictures_id?: number | null
          playlist?: string | null
          preferences_id?: number | null
          pronounds?: string | null
          school_year?: string
          verificattion_status?: boolean
        }
        Relationships: []
      }
      user_relationship_types: {
        Row: {
          id: number
          relationship_type_id: number
          user_id: string
        }
        Insert: {
          id?: number
          relationship_type_id: number
          user_id?: string
        }
        Update: {
          id?: number
          relationship_type_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_relationship_types_relationship_type_id_fkey"
            columns: ["relationship_type_id"]
            isOneToOne: false
            referencedRelation: "relationship_types"
            referencedColumns: ["relationship_type_id"]
          },
          {
            foreignKeyName: "user_relationship_types_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profile"
            referencedColumns: ["id"]
          },
        ]
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
