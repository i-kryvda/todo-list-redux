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
          },
        };
      },
    },

    deleteTodo(state, action: PayloadAction<{ id: number }>) {
      state.todos = state.todos.filter((todo) => todo.id != action.payload.id);
    },
  },
});

export const todosReducer = TodosSlice.reducer;
export const { deleteTodo, createTodo } = TodosSlice.actions;
