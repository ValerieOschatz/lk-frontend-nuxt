import {
  getUserListApi,
} from "../api";

export const state = () => ({
  userList: [],
});

export const getters = {
  getUserList(state) {
    return state.userList;
  },
};

export const mutations = {
  setUserList(state, data) {
    state.userList = data;
  },
};

export const actions = {
  setUserList({ commit }, { name }) {
    if (!name) {
      commit("setUserList", []);
      return;
    }
    
    getUserListApi({ name })
    .then(res => {
      commit("setUserList", res.data);
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
};
