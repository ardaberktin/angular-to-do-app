export interface Tasks {
  items: Task[];
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
}

export interface Task {
  name: string;
  body: string;
  // image: string;
  // rating: number;
}
