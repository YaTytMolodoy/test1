import style from "./Buttons.module.scss";
interface ButtonProps {
   htmlType?: "button" | "submit" | "reset";
  name?: string;
  className?: string;
  onClick?: () => void;
}
export const ButtonContact: React.FC<ButtonProps> = ({ onClick }) => {
  return (
    <>
      <button onClick={onClick} className={style.buttonContact}>
        Контакты
      </button>
    </>
  );
};

export const ButtonFilledHeader: React.FC<ButtonProps> = ({
  name,
  onClick,
}) => {
  return (
    <>
      <button onClick={onClick} className={style.buttonUnfilledHeader}>
        {name}
      </button>
    </>
  );
};
export const ButtonFilled: React.FC<ButtonProps> = ({
  htmlType,
  name,
  onClick,
  className,
}) => {
  return (
    <>
      <button
        onClick={onClick}
        type={htmlType}
        className={`${style.buttonFilled} ${className ?? ""}`}
      >
        {name}
      </button>
    </>
  );
};

export const ButtonUnfilled: React.FC<ButtonProps> = ({
  name,
  onClick,
  className,
}) => {
  return (
    <>
      <button
        onClick={onClick}
        className={`${style.buttonUnfilled} ${className ?? ""}`}
      >
        {name}
      </button>
    </>
  );
};
