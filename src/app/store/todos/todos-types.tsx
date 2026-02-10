export type TodoType = {
  id: number;
  title: string;
  description?: string;
  completed?: boolean;
};

export type TodosState = {
  todos: TodoType[];
  loading: boolean;
  error: string | null;
  search: string;
  filteredTodos: TodoType[];
};
