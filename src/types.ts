export interface Tasks {
  items: Task[];
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
}

// types.ts (or wherever your Task model is defined)
export interface Task {
  id: number; // Unique identifier
  name: string;
  body: string;
  completed: boolean;
}
