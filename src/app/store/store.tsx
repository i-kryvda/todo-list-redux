import {configureStore} from "@reduxjs/toolkit";
import {counterReducer} from "@app/store/counter/counter.slice";
import {todosReducer} from "@app/store/todos/todos-slice";
import {useDispatch, useSelector} from "react-redux";

const store = configureStore({
    reducer: {
        counter: counterReducer,
        todos: todosReducer,
    },
});

export default store;

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// hooks
export const useAppSelector = useSelector.withTypes<AppState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
