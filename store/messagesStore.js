import {
  createMessageApi,
  getMessageListApi,
} from "../api";

export const state = () => ({
  messageList: [],
});

export const getters = {
  getMessageList(state) {
    return state.messageList;
  },
};

export const mutations = {
  setMessageList(state, data) {
    state.messageList = data;
  },
};

export const actions = {
  createMessage({ dispatch }, { text, chat }) {
    createMessageApi({ text, chat })
    .then(res => {
      dispatch("setMessageList", { chat });
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
  setMessageList({ commit, dispatch }, { chat }) {
    getMessageListApi({ chat })
    .then(res => {
      commit("setMessageList", res.data);
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
