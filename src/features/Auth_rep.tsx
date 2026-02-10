const Users = [
  {
    name: "Даниил Барсук",
    login: "tabachnik",
    password: "qwerty123",
    token:
      "AdshbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhbGV4MTIzIiwibmFtZSI6IkFsZXhleSIsImlhdCI6MTc0MTk4NzIwMCwiZXhwIjoyMDMwMDAwMDAwfQ.fakeSignature123",
  },
  {
    name: "Алексей Иванов",
    login: "alex123",
    password: "passAlex2026",
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhbGV4MTIzIiwibmFtZSI6IkFsZXhleSIsImlhdCI6MTc0MTk4NzIwMCwiZXhwIjoyMDMwMDAwMDAwfQ.fakeSignature123",
  },
  {
    name: "Мария Соколова",
    login: "mariasok",
    password: "Maria!qwe789",
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJtYXJpYSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzQxOTg3MzAwLCJleHAiOjE3NDIwNzM3MDB9.mockToken456789",
  },
  {
    name: "Дмитрий Ковалёв",
    login: "dkovalev2026",
    password: "Dm!tr!y_2026",
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjozLCJ1c2VybmFtZSI6ImQua292YWxldiIsImlhdCI6MTc0MTk4NzQwMCwiZXhwIjoyMDMwMDAwMDAwfQ.testSig987",
  },
  {
    name: "Ольга Петренко",
    login: "olgapetr",
    password: "OlgaTest2026!",
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJvbGdhIiwibmFtZSI6Ik9sZ2EgUGV0cmVuayIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc0MTk4NzYwMCwiZXhwIjoyMDMwMDAwMDAwfQ.fakeAdminToken",
  },
  {
    name: "Сергей",
    login: "sergmoroz",
    password: "S3rg3y_M0r0z",
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo1LCJsb2dpbiI6InNlcmdfbW9yb3oiLCJpYXQiOjE3NDE5ODc4MDAsImV4cCI6MTc0MjA3NDIwMH0.mockSignature321",
  },
];

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

//
export async function signInLoginPassword(login: string, password: string) {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const user = Users.find((u) => u.login == login);
  if (user && user?.password === password) {
    return user.token;
  } else {
    return "Error";
  }
}
export async function sendUser(token: string) {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const user = Users.find((u) => u.token == token);
  if (user) {
    return user;
  } else {
    return "Error";
  }
}
