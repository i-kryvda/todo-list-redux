```tsx
const TodosList = () => {
  const filter = useSelector((state: RootState) => state.todos.filter);
  const todos = useSelector(selectSearchTodos);
  const view = useSelector((state: RootState) => state.ui.view);
  const visibleCount = useSelector(
    (state: RootState) => state.ui.visibleCount[filter],
  );

  const dispatch = useDispatch();

  const visibleTodos = todos.slice(0, visibleCount);

  return (
    <div className={view === "list" ? "list-view" : "cards-view"}>
      {visibleTodos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}

      {visibleCount < todos.length && (
        <button onClick={() => dispatch(increaseVisibleCount(filter))}>
          Load more
        </button>
      )}
    </div>
  );
};
```
