import { message } from "antd";
import { useUnit } from "effector-react";
import { $storeModal, setModalAuth } from "../../features/Modals_effector";
import { authUserFx } from "../../features/Auth_effector";

import { useEffect, useState } from "react";
import Modale from "./modal";
import { FormAuth } from "./form";
export const AuthModal: React.FC = () => {
  const [storeModal] = useUnit([$storeModal]);
  useEffect(() => {
    const unsub = authUserFx.failData.watch(() => {
      message.error("Неверный логин или пароль");
    });

    return () => unsub();
  }, []);

  return (
    <Modale visible={storeModal.openModalAuth} onCancel={() => setModalAuth()}>
      <FormAuth />
    </Modale>
    // Предыдущая версия
    // <Modal
    //   footer={null}
    //   open={storeModal.openModalAuth}
    //   onCancel={() => setModalAuth()}
    // >
    //   <span className="bigBodyText">Авторизация </span>
    //   <Form
    //     form={form}
    //     onFinish={(value) => {
    //       authUser({
    //         login: value.login,
    //         password: value.password,
    //         rememberMe: value.rememberMe,
    //       });

    //     }}
    //   >
    //     <span className="bodyText">Логин</span>
    //     <Form.Item
    //       name={"login"}
    //       rules={[
    //         { required: true, message: "Введите логин" },
    //         { min: 3, message: "Минимум 3 символа" },
    //       ]}
    //     >
    //       <Input></Input>
    //     </Form.Item>
    //     <span className="bodyText">Пароль</span>
    //     <Form.Item
    //       name={"password"}
    //       rules={[
    //         { required: true, message: "Введите пароль" },
    //         { min: 8, message: "Минимум 8 символа" },
    //       ]}
    //     >
    //       <Input.Password></Input.Password>
    //     </Form.Item>
    //     <Form.Item
    //       valuePropName="checked"
    //       initialValue={false}
    //       name={"rememberMe"}
    //     >
    //       <Checkbox className={style.checkbox}>
    //         <span className="paragraphText">Запомнить меня</span>
    //       </Checkbox>
    //     </Form.Item>
    //     <div className={style.buttons}>
    //       <ButtonFilled
    //         htmlType="submit"
    //         name="Войти"
    //         className={style.buttonFilled}
    //       />
    //       <ButtonUnfilled
    //         className={style.buttonUnfilled}
    //         name="Отмена"
    //         onClick={() => setModalAuth()}
    //       />
    //     </div>
    //   </Form>
    // </Modal>
  );
};
