import { VscGithub } from "react-icons/vsc";
import style from "./Footer.module.scss";

export function Footer() {
  return (
    <footer className={style.footer}>
      <div className="footer__container">
        <a
          href="https://github.com/i-kryvda"
          className={style.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          <p>GITHUB</p>
          <VscGithub size={20} />
        </a>
      </div>
    </footer>
  );
}
