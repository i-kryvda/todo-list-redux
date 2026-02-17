import { createSelector } from "@reduxjs/toolkit";
import type { AppState } from "@app/store/store.tsx";

export const selectTodos = (state: AppState) => state.todos.todos;
export const selectFilter = (state: AppState) => state.todos.filter;
export const selectSearch = (state: AppState) => state.todos.search;

export const selectFilteredTodos = createSelector(
  [selectTodos, selectFilter],
  (todos, filter) => {
    return todos.filter((todo) => {
      if (filter === "active") return !todo.completed;
      if (filter === "completed") return todo.completed;
      return true;
    });
  },
);
