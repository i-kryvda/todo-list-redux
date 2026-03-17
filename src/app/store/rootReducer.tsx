import { combineReducers } from "@reduxjs/toolkit";
import { counterReducer } from "./counter/counter.slice";
import { todosReducer } from "./todos/todos-slice";

export const rootReducer = combineReducers({
  counter: counterReducer,
  todos: todosReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
