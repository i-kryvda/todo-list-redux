// src/features/todos/todosActions.js
import {createAction} from "@reduxjs/toolkit";

export const setSearchAndFilter = createAction<{ search: string }>("todos/filterTodos");

// Якщо в нас буде payload ми описуемо його createAction<payload>
