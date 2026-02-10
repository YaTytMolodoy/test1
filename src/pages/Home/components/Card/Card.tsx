interface CardProps {
  title: string;
  icon: string;
  description: string;
}
import style from "../../Home.module.scss";
export const Card: React.FC<CardProps> = ({ title, icon, description }) => {
  return (
    <div className={style.Card}>
      <div className={style.iconCard}>
        <img src={icon} alt="icon" />
      </div>
      <span className="bodyText">{title}</span>
      <div className={style.underline}></div>
      <span className="paragraphText">{description}</span>
    </div>
  );
};
