
import React, { useEffect, useState, type ReactNode } from "react";
import ReactDOM from "react-dom";
import style from "./modal.module.scss";
import { CloseOutlined } from "@ant-design/icons";

interface ModalProps {
  visible: boolean;
  children: ReactNode;
  onCancel?: () => void;
}

const Modale: React.FC<ModalProps> = ({ visible, children, onCancel }) => {
  const [isVisible, setIsVisible] = useState(visible);
  const [animationClass, setAnimationClass] = useState("");
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel?.();
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);
  useEffect(() => {
    if (visible) {
      setIsVisible(true);
      setAnimationClass("modal_show");
    } else {
      setAnimationClass("modal_hide");
      const timer = setTimeout(() => setIsVisible(false), 10);
      return () => clearTimeout(timer);
    }
  }, [visible]);

  if (!isVisible) return null;

  const modalContent = (
    <div
      className={`${style.modal_mask} ${style[animationClass]}`}
      onClick={() => onCancel?.()}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`${style.modal}  ${style[animationClass]}`}
      >
        <div className={style.modalHeader}>
          <button onClick={onCancel} className={style.modalCloseButton}>
            <span className={style.closeIcon}>
              <CloseOutlined />
            </span>
          </button>
        </div>{" "}
        <div className={style.modalBody}>{children}</div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.body);
};

export default Modale;
