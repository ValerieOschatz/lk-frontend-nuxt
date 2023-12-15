import {
  createChanelApi,
  getChanelListApi,
} from "../api";

export const state = () => ({
  ownChanelList: [],
  ownChanelName: '',
});

export const getters = {
  getOwnChanelList(state) {
    return state.ownChanelList;
  },
  getOwnChanelName(state) {
    return state.ownChanelName;
  },
};

export const mutations = {
  setOwnChanelList(state, data) {
    state.ownChanelList = data;
  },
  setOwnChanelName(state, data) {
    state.ownChanelName = data;
  },
};

export const actions = {
  setOwnChanelList({ commit }, { owner, name }) {
    getChanelListApi({ owner, name })
    .then(res => {
      commit("setOwnChanelList", res.data);
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
  createChanel({ dispatch }, data) {
    createChanelApi(data)
    .then(res => {
      dispatch("setOwnChanelList", { owner: res.data.owner });
      dispatch("modalStore/setModal", { type: 'modalAddChanel', value: false }, { root: true });
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
