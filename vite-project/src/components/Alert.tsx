import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  onClick: () => void;
}

const Alert = ({ children, onClick }: Props) => {
  return (
    <div className="alert alert-warning alert-dismissible fade show">
      <button
        onClick={onClick}
        type="button"
        className="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
      ></button>
      {children}
    </div>
  );
};

export default Alert;
