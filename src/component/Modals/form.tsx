import { useState } from "react";
import style from "./AuthModal.module.scss";
import { useUnit } from "effector-react";
import { authUser, authUserFx } from "../../features/Auth_effector";
import { ButtonFilled, ButtonUnfilled } from "../Buttons/Buttons";
import { setModalAuth } from "../../features/Modals_effector";
import {
  EyeFilled,
  EyeInvisibleOutlined,
  EyeOutlined,
} from "@ant-design/icons";
export const FormAuth: React.FC = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShow] = useState(false);
  const [checkbox, setCheck] = useState(false);
  const errorLogin =
    login.length > 0 && login.length < 3 ? "Введите минимум 3 символа" : "";
  const [pending] = useUnit([authUserFx.pending]);
  const errorPassword =
    password.length > 0 && password.length < 8
      ? "Введите минимум 8 символов"
      : "";

  const isFormValid = login.length >= 3 && password.length >= 8;
  return (
    <div>
      <span className="bigBodyText">Авторизация </span>
      <form
        className={style.form}
        onSubmit={(e) => {
          e.preventDefault();

          console.log("Форма отправлена без перезагрузки");
        }}
      >
        <div className={style.formItem}>
          <span className="bodyText">Логин</span>
          <input
            className={`${style.input} ${errorLogin ? style.errorInput : null} ${pending ? style.successInput : null}`}
            value={login}
            onChange={(v) => {
              setLogin(v.target.value);
            }}
          ></input>
          <span className={style.errorText}>{errorLogin}</span>
        </div>
        <div className={style.formItem}>
          <span className="bodyText">Пароль</span>
          <div className={style.inputWrapper}>
            <input
              type={showPassword ? "text" : "password"}
              className={`${style.input} ${
                errorPassword ? style.errorInput : ""
              } ${pending ? style.successInput : null}`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="button"
              className={style.iconButton}
              onClick={() => setShow(!showPassword)}
            >
              {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
            </button>
          </div>

          <span className={style.errorText}>{errorPassword}</span>
        </div>
        <div>
          <input
            type="checkbox"
            checked={checkbox}
            onChange={(e) => setCheck(e.target.checked)}
          />
          <span className="paragraphText">Запомнить меня</span>
        </div>
      </form>
      <div className={style.buttons}>
        <ButtonFilled
          isLoading={pending}
          disabled={!isFormValid || pending}
          onClick={() => {
            authUser({
              login: login,
              password: password,
              rememberMe: checkbox,
            });
          }}
          name="Войти"
          className={style.buttonFilled}
        />
        <ButtonUnfilled
          className={style.buttonUnfilled}
          htmlType="submit"
          name="Отмена"
          onClick={() => setModalAuth()}
        />
      </div>
    </div>
  );
};
