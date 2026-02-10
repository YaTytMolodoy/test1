import { useUnit } from "effector-react";
import Header from "../../component/Header/Header";
import { $storeAuth, exitUser } from "../../features/Auth_effector";
import { ButtonFilled, ButtonUnfilled } from "../../component/Buttons/Buttons";
import style from "./Profile.module.scss";
import { useNavigate } from "react-router-dom";
const ProfilePage: React.FC = () => {
  const navigation = useNavigate();
  const [storeAuth] = useUnit([$storeAuth]);
  return (
    <div>
      <Header></Header>
      <div className={style.profilePage}>
        <div className={style.container}>
          {!storeAuth.auth ? (
            <div className={style.title}>
              <span className="alignText">Вы не авторизованы </span>
            </div>
          ) : (
            <>
              <div className={style.title}>
                <span className="alignText">Привет, {storeAuth.name} </span>
              </div>
              <div className={style.buttons}>
                <ButtonFilled
                  onClick={() => exitUser()}
                  className={style.buttonFilled}
                  name="Выйти из аккаунта"
                />
                <ButtonUnfilled
                  onClick={() => navigation("/Contact")}
                  className={style.buttonUnfilled}
                  name="Перейти в контакты"
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default ProfilePage;
