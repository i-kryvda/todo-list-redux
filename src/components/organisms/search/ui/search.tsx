import { useRef, useState } from "react";
import { useDebounceDispatch } from "../model/hooks/useDebouncedDispatch";
import { useInput } from "@shared/hooks/useInput";

import { SearchInput } from "./search-input";

import s from "./search.module.scss";
import { useAppDispatch, useAppSelector } from "@app/store/store";
import {
  selectSuggestions,
  selectSearchQuery,
} from "@app/store/todos/todos-selectors";
import { setSearchQuery } from "@app/store/todos/todos-slice";
import { useDebounce } from "@shared/hooks/useDebounce";

export function Search() {
  // const debounced = useDebounce(search.value, 300)
  // const suggestions = useAppSelector(selectSuggestions(debounced))

  const dispatch = useAppDispatch();
  // const searchQuery = useAppSelector(selectSearchQuery);
  const [isOpen, setIsOpen] = useState(false);
  const search = useInput("");

  const debounced = useDebounce(search.value, 300);
  const suggestions = useAppSelector(selectSuggestions(debounced));

  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    search.onChange(e);
    setIsOpen(Boolean(v));
    // setHighlightedIndex(-1);

    if (!v.trim()) {
      dispatch(setSearchQuery(""));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    dispatch(setSearchQuery(search.value));
    setIsOpen(false);
  };

  const clearSearch = () => {
    search.onReset();
    dispatch(setSearchQuery(""));
  };
  const focusInput = () => inputRef.current?.focus();

  const open = isOpen && suggestions.length > 0;

  return (
    <form className={s.search} onSubmit={handleSubmit}>
      <label htmlFor="todo-search" className="visually-hidden">
        Search todo
      </label>

      <SearchInput
        value={search.value}
        onChange={handleChange}
        onFocus={focusInput}
        onClear={clearSearch}
        inputRef={inputRef}
      />

      {suggestions.length === 0 && <p>Not found</p>}

      {open && (
        <ul className={s.suggestions} id="id-listbox">
          {suggestions.map((item) => (
            <li key={item.id} role="option">
              {item.title}
            </li>
          ))}
        </ul>
      )}
    </form>
  );
}
