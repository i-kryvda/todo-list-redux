import { Search } from "@components/organisms/search/ui/search";
import style from "./Header.module.scss";

export function Header({ toggleMenuOpen }: { toggleMenuOpen: () => void }) {
  return (
    <header className={style.header}>
      <div className="header__container">
        <div className={style.box}>
          <Search />
          <div className={style.language} onClick={toggleMenuOpen}>
            lll
          </div>
        </div>
      </div>
    </header>
  );
}
