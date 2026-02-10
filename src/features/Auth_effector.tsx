import { createEffect, createEvent, createStore, sample } from "effector";
import { authUserRp, getUserRp } from "./Auth_rep";
import { setModalAuth } from "./Modals_effector";

interface User {
  login: string;
  name: string;
  auth: boolean;
}
const initStore: User = {
  login: "",
  name: "",
  auth: false,
};
interface LoginProps {
  login: string;
  password: string;
  rememberMe: boolean;
}

export const exitUser = createEvent();
export const exitUserFx = createEffect(async () => {
  localStorage.clear();
});
sample({ clock: exitUser, target: exitUserFx });
export const getTokenBrowser = createEffect(async () => {
  const token = localStorage.getItem("auth_token");
  if (token) {
    getUserFx(token);
  }
});
export const authUser = createEvent<LoginProps>();
export const authUserFx = createEffect<LoginProps, { token: string }, string>(
  async ({ login, password, rememberMe }) => {
    const result = await authUserRp(login, password, rememberMe);

    if (!result.success || !result.token) {
      throw result.error ?? "Ошибка авторизации";
    }
    setModalAuth();
    getUserFx(result.token);
    return { token: result.token };
  },
);

export const getUserFx = createEffect<
  string,
  {
    data?: {
      name: string;
      login: string;
    };
    success: boolean;
    error?: string;
  }
>(async (token) => {
  return getUserRp(token);
});

sample({
  clock: authUser,
  target: authUserFx,
});

export const $storeAuth = createStore<User>(initStore)
  .on(getUserFx.doneData, (state, data) => ({
    ...state,
    auth: true,
    login: data.data?.login ?? "",
    name: data.data?.name ?? "",
  }))
  .on(exitUser, () => initStore);
