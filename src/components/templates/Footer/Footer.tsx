import { VscGithub } from "react-icons/vsc";
import style from "./Footer.module.scss";

export function Footer() {
  return (
    <footer className={style.footer}>
      <div className="footer__container">
        <div className={style.title}>
          <p>GITHUB</p>
          <VscGithub size={20} />
        </div>
      </div>
    </footer>
  );
}
