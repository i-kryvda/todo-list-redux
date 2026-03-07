import { createSelector } from "@reduxjs/toolkit";
import type { AppState } from "@app/store/store.tsx";

export const selectTodos = (state: AppState) => state.todos.todos;
export const selectFilter = (state: AppState) => state.todos.filter;
export const selectSearchQuery = (state: AppState) => state.todos.searchQuery;

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

export const selectSearchTodos = createSelector(
  [selectSortedTodos, selectSearchQuery],
  (todos, search) => {
    const query = search.trim().toLocaleLowerCase();
    if (!query) return todos;

    const starts = todos.filter((todo) =>
      todo.title.toLocaleLowerCase().startsWith(query),
    );
    if (starts.length) return starts;

    return todos.filter((todo) =>
      todo.title.toLocaleLowerCase().includes(query),
    );
  },
);

export const selectTodoLimitExceeded = createSelector(
  [selectSortedTodos],
  (todos) => {
    return todos.filter((todo) => todo.pinned).length >= 3;
  },
);

export const selectHasCompleted = createSelector([selectTodos], (todos) => {
  return todos.some((todo) => todo.completed);
});
