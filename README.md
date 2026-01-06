# react template

```
git switch name-branch
rm -rf .git
git init
git remote add origin https://github.com/username/my-new-project.git
git add .
git commit -m "init"
git push -u origin main

```

### NEED ADD

- createAsyncThunk ✔
- extraReducers ✔
- createActions ✔

----
Фільтрація

- filteredTodos — це derived state

````
export const selectFilteredTodos = createSelector(
  [
    (state: RootState) => state.todos.todos,
    (state: RootState) => state.todos.search,
  ],
  (todos, search) =>
    todos.filter(todo =>
      todo.title.toLowerCase().includes(search.toLowerCase())
    )
);
````

- Як зробити debounce (саме той case)
- git push
