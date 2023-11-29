import { createStore } from 'vuex';

import {
  loginUser,
} from "../api";

// export const store = createStore({
//   state () {
//     return {}
//   },
//   getters: {},
//   mutations: {},
//   actions: {
//     login({ dispatch }, { login, password }) {
//       loginUser({ login, password })
//       .then(res => {
//         console.log('res', res);
//       })
//       .catch(err => {
//         console.log('err', err);
//       })
//     }
//   },
// })


export const state = () => ({});

export const getters = {};

export const mutations = {};

export const actions = {
  login({ dispatch }, { login, password }) {
    loginUser({ login, password })
    .then(res => {
      console.log('res', res);
    })
    .catch(err => {
      console.log('err', err);
    })
  }
};
