import { ButtonFilled, ButtonUnfilled } from "../../component/Buttons/Buttons";
import Header from "../../component/Header/Header";
import style from "./Home.module.scss";
import stethoscope_icon from "@/assets/stethoscope_icon.svg";
import hearth_icon from "@/assets/hearth_icon.svg";
import diagnostic_icon from "@/assets/diagnostic_icon.svg";
import { Card } from "./components/Card/Card";
import { useNavigate } from "react-router-dom";
import { setModalAuth } from "../../features/Modals_effector";
import { useUnit } from "effector-react";

import { $storeAuth } from "../../features/Auth_effector";

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [storeAuth] = useUnit([$storeAuth]);
  return (
    <>
      <Header></Header>
      <div className={style.homePage}>
        <div className={style.container}>
          <div>
            <div className={style.title}>
              <span className="alignText">
                Место для получения медицинской помощи
              </span>
            </div>
            <div className={style.buttons}>
              {storeAuth.auth ? (
                <ButtonFilled
                  name="Профиль"
                  onClick={() => navigate("/Profile")}
                ></ButtonFilled>
              ) : (
                <ButtonFilled
                  name="Войти"
                  onClick={() => setModalAuth()}
                ></ButtonFilled>
              )}
              <ButtonUnfilled
                name="Контакты"
                onClick={() => navigate("/Contact")}
              ></ButtonUnfilled>
            </div>
          </div>
          <div className={style.cardList}>
            <Card
              title="Онлайн-прием"
              icon={hearth_icon}
              description="Рыба текст"
            ></Card>
            <Card
              title="Экстренный случай"
              icon={stethoscope_icon}
              description="Рыба текст"
            ></Card>
            <Card
              title="Лечение рака"
              icon={diagnostic_icon}
              description="Рыба текст"
            ></Card>
          </div>
        </div>
      </div>
    </>
  );
};
export default HomePage;
