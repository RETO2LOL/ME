import type { ReactNode } from "react";
import styles from "./Button.module.css";
interface Props {
  children: ReactNode;
  onClick: () => void;
}

const Button = ({ children, onClick }: Props) => {
  return (
    <div className={styles.button}>
      <button className="btn btn-primary" onClick={onClick}>
        {children}
      </button>
    </div>
  );
};

export default Button;
