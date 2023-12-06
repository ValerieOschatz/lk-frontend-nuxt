import {
  loginUserApi,
  registerApi,
  logoutUserApi,
} from "../api";

export const state = () => ({});
export const getters = {};
export const mutations = {};

export const actions = {
  login({ dispatch }, { login, password }) {
    loginUserApi({ login, password })
    .then(res => {
      navigateTo('/profile');
    })
    .catch(err => {
      const data = {
        isOpen: true,
        text: err.response.data.message,
        color: 'error',
        icon: '$warning',
      };
      dispatch("alertStore/setAlert", data, { root: true });
    })
  },
  register({ dispatch }, { name, login, password }) {
    registerApi({ name, login, password })
    .then(res => {
      dispatch("login", { login, password });
    })
    .catch(err => {
      const data = {
        isOpen: true,
        text: err.response.data.message,
        color: 'error',
        icon: '$warning',
      };
      dispatch("alertStore/setAlert", data, { root: true });
    })
  },
  logout({ dispatch }) {
    logoutUserApi()
    .then(res => {
      dispatch("modalStore/setModal", { type: 'modalLogout', value: false }, { root: true });
      navigateTo('/sign-in');
    })
    .catch(err => {
      const data = {
        isOpen: true,
        text: err.response.data.message,
        color: 'error',
        icon: '$warning',
      };
      dispatch("alertStore/setAlert", data, { root: true });
    })
  }
};
