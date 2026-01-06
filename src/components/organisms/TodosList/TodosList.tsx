import type {ChangeEvent} from "react";
import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "@app/store/store.tsx";
import {todosThunks} from "@app/store/todos/todos-thunks.tsx";
import {filterTodos} from "@app/store/todos/todos-slice.tsx";
import s from './TodosList.module.scss';


export function TodosList() {
    const {filteredTodos, loading, error} = useAppSelector(state => state.todos)
    const dispatch = useAppDispatch();
    const [search, setSearch] = useState("");

    const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
        dispatch(filterTodos({search: event.target.value}));
    }

    useEffect(() => {
        dispatch(todosThunks())
    }, [dispatch])

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <input
                className={s.input}
                type="text"
                placeholder="Search todos"
                value={search}
                onChange={handleSearch}
            />
            <ul>
                {filteredTodos.map(todo => (
                    <li key={todo.id}>
                        {todo.title} {todo.completed ? "(done)" : ""}
                    </li>
                ))}
            </ul>
        </div>
    )
}