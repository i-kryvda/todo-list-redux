import { createSelector } from "@reduxjs/toolkit";
import type { AppState } from "@app/store/store.tsx";

export const selectTodos = (state: AppState) => state.todos.todos;
export const selectFilter = (state: AppState) => state.todos.filter;
export const selectSearch = (state: AppState) => state.todos.search;

export const selectFilteredTodos = createSelector(
  [selectTodos, selectFilter],
  (todos, filter) => {
    if (filter === "active") return todos.filter((t) => !t.completed);
    if (filter === "completed") return todos.filter((t) => t.completed);
    return todos;
  },
);

export const selectSortedTodos = createSelector(
  [selectFilteredTodos],
  (todos) => [...todos].sort((a, b) => +!!b.pinned - +!!a.pinned),
);

export const selectPinnedCount = createSelector(
  [selectSortedTodos],
  (todos) => {
    return todos.filter((todo) => todo.pinned).length;
  },
);

export const selectHasCompleted = createSelector([selectTodos], (todos) => {
  return todos.some((todo) => todo.completed);
});
