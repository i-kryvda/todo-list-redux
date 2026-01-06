export type TodoType = {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
}
export type TodosState = {
    todos: TodoType[];
    loading: boolean;
    error: string | null;
    search: string;
    filteredTodos: TodoType[];
}

