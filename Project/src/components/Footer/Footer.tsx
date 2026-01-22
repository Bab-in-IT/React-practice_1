import { memo } from "react";
import { Social } from "../Social/Social";
import styles from "./Footer.module.scss";

export const Footer = memo(() => {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles["footer__wrapper"]}>
          <Social />
        </div>
      </div>
    </footer>
  );
});
