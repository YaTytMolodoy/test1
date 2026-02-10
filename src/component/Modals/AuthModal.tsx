import { Checkbox, Form, Input, message, Modal } from "antd";
import { useForm } from "antd/es/form/Form";
import { useUnit } from "effector-react";
import { $storeModal, setModalAuth } from "../../features/Modals_effector";
import { authUser, authUserFx } from "../../features/Auth_effector";
import style from "./AuthModal.module.scss";
import { ButtonFilled, ButtonUnfilled } from "../Buttons/Buttons";
import { useEffect } from "react";
export const AuthModal: React.FC = () => {
  const [form] = useForm();
  const [storeModal] = useUnit([$storeModal]);
  useEffect(() => {
    const unsub = authUserFx.failData.watch(() => {
      message.error("Неверный логин или пароль");
    });

    return () => unsub();
  }, []);
  return (
    <Modal
      footer={null}
      open={storeModal.openModalAuth}
      onCancel={() => setModalAuth()}
    >
      <span className="bigBodyText">Авторизация </span>
      <Form
        form={form}
        onFinish={(value) => {
          authUser({
            login: value.login,
            password: value.password,
            rememberMe: value.rememberMe,
          });
          
        }}
      >
        <span className="bodyText">Логин</span>
        <Form.Item
          name={"login"}
          rules={[
            { required: true, message: "Введите логин" },
            { min: 3, message: "Минимум 3 символа" },
          ]}
        >
          <Input></Input>
        </Form.Item>
        <span className="bodyText">Пароль</span>
        <Form.Item
          name={"password"}
          rules={[
            { required: true, message: "Введите пароль" },
            { min: 8, message: "Минимум 8 символа" },
          ]}
        >
          <Input.Password></Input.Password>
        </Form.Item>
        <Form.Item
          valuePropName="checked"
          initialValue={false}
          name={"rememberMe"}
        >
          <Checkbox className={style.checkbox}>
            <span className="paragraphText">Запомнить меня</span>
          </Checkbox>
        </Form.Item>
        <div className={style.buttons}>
          <ButtonFilled
            htmlType="submit"
            name="Войти"
            className={style.buttonFilled}
          />
          <ButtonUnfilled
            className={style.buttonUnfilled}
            name="Отмена"
            onClick={() => setModalAuth()}
          />
        </div>
      </Form>
    </Modal>
  );
};
