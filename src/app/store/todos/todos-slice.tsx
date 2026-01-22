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

    // filterTodos(state, action: PayloadAction<{ search: string }>) {
    //   state.search = action.payload.search.toLowerCase();
    //   state.filteredTodos = state.todos.filter((item) =>
    //     item.title.toLowerCase().includes(state.search),
    //   );
    // },
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(todosThunks.pending, (state) => {
  //       state.loading = true;
  //       state.error = null;
  //     })
  //     .addCase(
  //       todosThunks.fulfilled,
  //       (state, action: PayloadAction<TodoType[]>) => {
  //         state.loading = false;
  //         state.todos = action.payload;
  //         state.filteredTodos = action.payload.filter((todo) =>
  //           todo.title.toLowerCase().includes(state.search),
  //         );
  //       },
  //     )
  //     .addCase(todosThunks.rejected, (state, action) => {
  //       state.loading = false;
  //       state.error = action.payload || "Unknown error";
  //     })
  //     // Custom action: filter todos
  //     .addCase(setSearchAndFilter, (state, action) => {
  //       const filterText = action.payload.search.toLowerCase();
  //       state.filteredTodos = state.todos.filter((todo) =>
  //         todo.title.toLowerCase().includes(filterText),
  //       );
  //     });
  // },
});

export const todosReducer = TodosSlice.reducer;
export const { deleteTodo, createTodo } = TodosSlice.actions;
