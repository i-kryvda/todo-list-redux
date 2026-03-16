import { useId, useRef, useState } from "react";
import { useInput } from "@shared/hooks/useInput";

// import { SearchInput } from "./search-input";
import { FiSearch, FiX } from "react-icons/fi";
import { RiCheckboxLine, RiStarLine } from "react-icons/ri";
import { RiCheckboxBlankLine } from "react-icons/ri";
import s from "./search.module.scss";
import { useAppDispatch, useAppSelector } from "@app/store/store";
import { selectSuggestions } from "@app/store/todos/todos-selectors";
import { setSearchQuery } from "@app/store/todos/todos-slice";
import { useDebounce } from "@shared/hooks/useDebounce";
import { useClickOutside } from "../model/hooks/useClickOutside";
import { useKeyboardNavigation } from "../model/hooks/useKeyboardNavigation";
import type { TodoType } from "@app/store/todos/todos-types";

export function Search() {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const search = useInput("");

  const debounced = useDebounce(search.value, 200);
  const suggestions = useAppSelector(selectSuggestions(debounced)); //or search.value

  const inputRef = useRef<HTMLInputElement | null>(null);
  const containerRef = useRef<HTMLFormElement | null>(null);
  const suggestionsRef = useRef<HTMLUListElement | null>(null);

  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const id = useId();
  const ids = {
    input: `${id}-input`,
    list: `${id}-list`,
    option: (i: number) => `${id}-option-${i}`,
  };

  const setSuggestionsOpen = () => {
    setIsOpen(false);
    setHighlightedIndex(-1);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const hasValue = value.trim().length > 0;
    search.onChange(e);
    setIsOpen(hasValue);
    setHighlightedIndex(-1);
    if (!hasValue) dispatch(setSearchQuery(""));
  };

  const handleSelect = (title: string) => {
    search.setValue(title);
    dispatch(setSearchQuery(title));
    setSuggestionsOpen();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setSearchQuery(search.value));
    setIsOpen(false);
  };

  const clearSearch = () => {
    search.onReset();
    dispatch(setSearchQuery(""));
    setIsOpen(false);
  };

  const onHighlight = (i: number) => setHighlightedIndex(i);

  const onKeyDown = useKeyboardNavigation({
    suggestions,
    suggestionsRef,
    highlightedIndex,
    onSelect: handleSelect,
    onEscape: setSuggestionsOpen,
    onHighlight,
  });

  const focusInput = () => inputRef.current?.focus();
  const open = isOpen && suggestions.length > 0;

  useClickOutside(containerRef, setSuggestionsOpen);

  const getItemIcon = ({ completed, pinned }: TodoType) => {
    if (completed) return <RiCheckboxLine size={15} />;
    if (pinned) return <RiStarLine size={15} />;
    return <RiCheckboxBlankLine size={15} />;
  };

  return (
    <form className={s.search} onSubmit={handleSubmit} ref={containerRef}>
      <label htmlFor={ids.input} className="visually-hidden">
        Search todo
      </label>

      <div className={s.searchField}>
        <FiSearch className={s.searchIcon} onClick={focusInput} size={18} />

        <input
          role="combobox"
          type="text"
          id={ids.input}
          aria-controls={ids.list}
          aria-autocomplete="list"
          aria-labelledby="Search todo"
          autoComplete="off"
          ref={inputRef}
          disabled={false}
          className={s.input}
          placeholder="Search todo..."
          value={search.value}
          onChange={handleChange}
          onKeyDown={onKeyDown}
        />

        {search.value && (
          <button type="button" className={s.clear} onClick={clearSearch}>
            <FiX size={18} />
          </button>
        )}
      </div>

      {/* {suggestions.length === 0 && <p>Not found</p>} */}

      <ul
        className={`${s.suggestions} ${open ? s.open : ""}`}
        id={ids.list}
        ref={suggestionsRef}
        // tabIndex={-1}
      >
        {suggestions.map((item, index) => (
          <li
            key={item.id}
            role="option"
            aria-selected={highlightedIndex === index}
            id={ids.option(index)}
            className={s.suggestion}
            onMouseDown={() => handleSelect(item.title)}
            data-highlighted={highlightedIndex === index}
          >
            <span className={s.icon}>{getItemIcon(item)}</span>
            <span>{item.title}</span>
            <span className={s.tooltip}>Enter</span>
          </li>
        ))}
      </ul>
    </form>
  );
}
