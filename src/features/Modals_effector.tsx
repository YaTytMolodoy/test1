import { createEvent, createStore } from "effector";
interface StoreModal {
  openModalAuth: boolean;
}
const initStore: StoreModal = {
  openModalAuth: false,
};
export const setModalAuth = createEvent();
export const $storeModal = createStore<StoreModal>(initStore).on(
  setModalAuth,
  (state) => ({ ...state, openModalAuth: !state.openModalAuth }),
);
