export type TodoType = {
  id: string;
  title: string;
  description?: string;
  completed?: boolean;
  pinned?: boolean;
};

export type FilterType = "all" | "active" | "completed";

export type TodosState = {
  todos: TodoType[];
  filter: FilterType;
  searchQuery: string;
};
