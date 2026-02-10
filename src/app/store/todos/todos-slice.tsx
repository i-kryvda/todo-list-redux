import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { TodosState, TodoType } from "@app/store/todos/todos-types.tsx";
// import { todosThunks } from "@app/store/todos/todos-thunks.tsx";
// import { setSearchAndFilter } from "@app/store/todos/todos-actions.tsx";

const initialState: TodosState = {
  todos: [],
  loading: false,
  error: "",
  filteredTodos: [],
  search: "",
};

const TodosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    createTodo: {
      reducer(state, action: PayloadAction<TodoType>) {
        state.todos.unshift(action.payload);
      },
      prepare(title: string, description?: string) {
        return {
          payload: {
            id: Date.now(),
            title,
            description,
            completed: false,
          },
        };
      },
    },

    deleteTodo(state, action: PayloadAction<{ id: number }>) {
      state.todos = state.todos.filter((todo) => todo.id != action.payload.id);
    },

    updateTodo(
      state,
      action: PayloadAction<{
        id: number;
        title: string;
        description?: string;
      }>,
    ) {
      const todo = state.todos.find((todo) => todo.id === action.payload.id);
      if (!todo) return;
      todo.title = action.payload.title;
      todo.description = action.payload.description;
    },

    toggleTodo(state, action: PayloadAction<{ id: number }>) {
      const todo = state.todos.find((todo) => todo.id === action.payload.id);
      if (!todo) return;
      todo.completed = !todo.completed;
    },
  },
});

export const todosReducer = TodosSlice.reducer;
export const { deleteTodo, createTodo, updateTodo, toggleTodo } =
  TodosSlice.actions;
