import style from "./Buttons.module.scss";
interface ButtonProps {
  htmlType?: "button" | "submit" | "reset";
  name?: string;
  disabled?: boolean;
  isLoading?: boolean;
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
  disabled,
  htmlType,
  name,
  isLoading,
  onClick,
  className,
}) => {
  return (
    <>
      <button
        disabled={disabled}
        onClick={onClick}
        type={htmlType}
        className={`${style.buttonFilled} ${className ?? ""} ${disabled ? style.disabled : null}`}
      >
        {isLoading ? <div className={style.spinner}></div> : name}
      </button>
    </>
  );
};

export const ButtonUnfilled: React.FC<ButtonProps> = ({
  disabled,
  name,
  onClick,
  isLoading,
  className,
}) => {
  return (
    <>
      <button
        disabled={disabled}
        onClick={onClick}
        className={`${style.buttonUnfilled} ${className ?? ""} ${disabled ? style.disabled : null}`}
      >
        {isLoading ? <div className={style.spinner}></div> : name}
      </button>
    </>
  );
};
