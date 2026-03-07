import { useInput } from "@shared/hooks/useInput";
import { useDebounceDispatch } from "./model/useDebouncedDispatch";
import style from "./Header.module.scss";

export function Header() {
  const search = useInput("");
  useDebounceDispatch(search.value, 400);

  return (
    <header className="header">
      <div className="header__container">
        <div>USA</div>

        <input
          type="text"
          {...search}
          placeholder="Search todo..."
          className={style.search}
        />
      </div>
    </header>
  );
}
