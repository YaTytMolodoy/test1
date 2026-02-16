import axios from "axios";
const API = "https://698ef2b0aded595c253348ef.mockapi.io";
export async function authUserRp(
  login: string,
  password: string,
  rememberMe: boolean,
) {
  try {
    const token = await signInLoginPassword(login, password);
    if (token == "Error") {
      return { success: false, error: "Неверный логин или пароль" };
    }

    if (rememberMe) {
      localStorage.setItem("auth_token", token);
    }
    return { success: true, token };
  } catch (error) {
    console.error("Ошибка авторизации: ", error);
    return { success: false, error: "Неизвестная ошибка" };
  }
}

export async function getUserRp(token: string) {
  try {
    const user = await sendUser(token);

    if (user == "Error") {
      return {
        success: false,
        error: "Токен недействителен или истёк",
      };
    } else {
      return {
        success: true,
        data: {
          name: user.name,
          login: user.login,
        },
      };
    }
  } catch (error) {
    console.error("Ошибка токен: ", error);
    return { success: false, error: "Неизвестная ошибка" };
  }
}

/// Все что ниже должно происходить со стороны backend и пароли хранятся на сервере
export async function signInLoginPassword(login: string, password: string) {
  const user = await axios.get(`${API}/users?login=` + login);
  if (user.status == 200 && password === user.data[0].password) {
    return user.data[0].token;
  } else {
    return "Error";
  }
}
export async function sendUser(token: string) {
  const user = await axios.get(`${API}/users?token=` + token);
  if (user.status == 200) {
    return { login: user.data[0].login, name: user.data[0].name };
  } else {
    return "Error";
  }
}
