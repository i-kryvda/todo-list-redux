import { FiSearch, FiX } from "react-icons/fi";
import s from "./search.module.scss";

type SearchInputProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus: () => void;
  onClear: () => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
};

export function SearchInput({
  value,
  onChange,
  onFocus,
  onClear,
  inputRef,
}: SearchInputProps) {
  return (
    <div className={s.searchField}>
      <FiSearch className={s.searchIcon} onClick={onFocus} size={18} />

      <input
        role="combobox"
        type="search"
        id="todo-search"
        aria-controls="id-listbox"
        aria-autocomplete="list"
        aria-labelledby="Search todo"
        autoComplete="off"
        ref={inputRef}
        disabled={false}
        className={s.input}
        placeholder="Search todo..."
        value={value}
        onChange={onChange}
      />

      {value && (
        <button type="button" className={s.clear} onClick={onClear}>
          <FiX size={18} />
        </button>
      )}
    </div>
  );
}
