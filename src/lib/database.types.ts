export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type WorkerStatus = 'active' | 'inactive' | 'on_leave'
export type TaskStatus = 'pending' | 'in_progress' | 'completed' | 'cancelled'
export type TaskPriority = 'low' | 'medium' | 'high'

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          username: string
          full_name: string | null
          email: string | null
          created_at: string
        }
        Insert: {
          id: string
          username: string
          full_name?: string | null
          email?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          username?: string
          full_name?: string | null
          email?: string | null
          created_at?: string
        }
      }
      workers: {
        Row: {
          id: string
          user_id: string
          name: string
          phone: string | null
          hourly_rate: number
          skills: string[]
          status: WorkerStatus
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          phone?: string | null
          hourly_rate: number
          skills?: string[]
          status?: WorkerStatus
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          phone?: string | null
          hourly_rate?: number
          skills?: string[]
          status?: WorkerStatus
          created_at?: string
          updated_at?: string
        }
      }
      tasks: {
        Row: {
          id: string
          user_id: string
          worker_id: string | null
          title: string
          description: string | null
          status: TaskStatus
          priority: TaskPriority
          estimated_hours: number | null
          actual_hours: number | null
          start_date: string | null
          end_date: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          worker_id?: string | null
          title: string
          description?: string | null
          status?: TaskStatus
          priority?: TaskPriority
          estimated_hours?: number | null
          actual_hours?: number | null
          start_date?: string | null
          end_date?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          worker_id?: string | null
          title?: string
          description?: string | null
          status?: TaskStatus
          priority?: TaskPriority
          estimated_hours?: number | null
          actual_hours?: number | null
          start_date?: string | null
          end_date?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      time_entries: {
        Row: {
          id: string
          task_id: string
          worker_id: string
          start_time: string
          end_time: string | null
          hours_worked: number | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          task_id: string
          worker_id: string
          start_time: string
          end_time?: string | null
          hours_worked?: number | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          task_id?: string
          worker_id?: string
          start_time?: string
          end_time?: string | null
          hours_worked?: number | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      expenses: {
        Row: {
          id: string
          task_id: string
          worker_id: string
          amount: number
          description: string
          date: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          task_id: string
          worker_id: string
          amount: number
          description: string
          date: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          task_id?: string
          worker_id?: string
          amount?: number
          description?: string
          date?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
    Functions: {
      calculate_task_cost: {
        Args: { task_uuid: string }
        Returns: number
      }
    }
  }
}
