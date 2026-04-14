import { SearchInput } from "@components/organisms/search-todos/ui/SearchInput";
import style from "./Header.module.scss";

type HeaderProps = {
  onMobileMenuOpen: () => void;
};

export function Header({ onMobileMenuOpen }: HeaderProps) {
  return (
    <header className={style.header}>
      <div className="header__container">
        <div className={style.headerBox}>
          <SearchInput />
          <div className={style.headerBurger} onClick={onMobileMenuOpen}>
            lll
          </div>
        </div>
      </div>
    </header>
  );
}
