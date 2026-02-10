import { useNavigate } from "react-router-dom";
import { ButtonContact, ButtonFilledHeader } from "../Buttons/Buttons";
import style from "./Header.module.scss";
import logo from "@/assets/logo.svg";
import { $storeModal, setModalAuth } from "../../features/Modals_effector";
import { useUnit } from "effector-react";
import { $storeAuth, exitUser } from "../../features/Auth_effector";
import { AuthModal } from "../Modals/AuthModal";
const Header: React.FC = () => {
  const [storeAuth] = useUnit([$storeAuth]);
  const [storeModal] = useUnit([$storeModal]);
  const navigate = useNavigate();
  return (
    <div className={style.header}>
      <div className={style.logo} onClick={() => navigate("/")}>
        <img src={logo} alt="Logo" />
      </div>{" "}
      {storeModal.openModalAuth ? <AuthModal></AuthModal> : null}
      <div className={style.buttons}>
        <ButtonContact
          onClick={() => {
            navigate("/Contact");
          }}
        />
        {storeAuth.auth ? (
          <ButtonFilledHeader
            name="Выйти"
            onClick={() => {
              exitUser();
            }}
          />
        ) : (
          <ButtonFilledHeader
            name="Войти"
            onClick={() => {
              setModalAuth();
            }}
          />
        )}
      </div>
    </div>
  );
};
export default Header;
