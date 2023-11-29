import {
  loginUser,
} from "../api";

export const state = () => ({});

export const getters = {};

export const mutations = {};

export const actions = {
  login({ dispatch }, { login, password }) {
    loginUser({ login, password })
    .then(res => {
      navigateTo('/profile');
    })
    .catch(err => {
      const data = {
        isOpen: true,
        text: err.response.data.message,
        color: 'error'
      };
      dispatch("alertStore/setAlert", data, { root: true });
    })
  }
};
