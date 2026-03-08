import { useInput } from "@shared/hooks/useInput";
import { useDebounceDispatch } from "./model/useDebouncedDispatch";
import style from "./Header.module.scss";

import { FiSearch, FiX } from "react-icons/fi";
import { useRef } from "react";

export function Header() {
  const search = useInput("");
  useDebounceDispatch(search.value, 400);

  const inputRef = useRef<HTMLInputElement>(null);
  const clearSearch = () => search.onReset();

  const focusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <header className={style.header}>
      <div className="header__container">
        <div className={style.box}>
          <div>UA</div>

          <form className={style.search} onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="todo-search" className="visually-hidden">
              Search todo
            </label>

            <div className={style.searchField}>
              <FiSearch
                className={style.searchIcon}
                onClick={focusInput}
                size={18}
              />

              <input
                type="search"
                id="todo-search"
                ref={inputRef}
                disabled={false}
                className={style.input}
                placeholder="Search todo..."
                {...search}
              />

              {search.value && (
                <button
                  type="button"
                  className={style.clear}
                  onClick={clearSearch}
                >
                  <FiX size={18} />
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </header>
  );
}

// А ти може мені показати як зробити варіант де буде autocomplete dropdown ? Я використовую redux
