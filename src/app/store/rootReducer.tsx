import { combineReducers } from "@reduxjs/toolkit";
import { counterReducer } from "./counter/counter.slice";
import { todosReducer } from "./todos/todos-slice";
import { todosPersistConfig } from "./todos/todos-persist-config";
import { persistReducer } from "redux-persist";
import { counterPersistConfig } from "./counter/counter.persist-config";

const persistedTodosReducer = persistReducer(todosPersistConfig, todosReducer);

const persistedCounterReducer = persistReducer(
  counterPersistConfig,
  counterReducer,
);

export const rootReducer = combineReducers({
  counter: persistedCounterReducer,
  todos: persistedTodosReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
