import Header from "../../component/Header/Header";
import style from "./Contact.module.scss";
const ContactPage: React.FC = () => {
  return (
    <>
      <Header></Header>
      <div className={style.contactPage}>
        <div className={style.container}>
          <div className={style.title}>
            <span className="alignText"> Контакты </span>
          </div>
        </div>
      </div>
    </>
  );
};
export default ContactPage;
