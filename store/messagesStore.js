import {
  createMessageApi,
  getMessageListApi,
  updateMessageApi,
  deleteMessageApi,
} from "../api";

export const state = () => ({
  messageList: [],
  selectedMessage: null,
});

export const getters = {
  getMessageList(state) {
    return state.messageList;
  },
  getSelectedMessage(state) {
    return state.selectedMessage;
  },
};

export const mutations = {
  setMessageList(state, data) {
    state.messageList = data;
  },
  setSelectedMessage(state, data) {
    state.selectedMessage = data;
  },
};

export const actions = {
  createMessage({ dispatch }, { text, chat }) {
    createMessageApi({ text, chat })
    .then(res => {})
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
  updateMessage({ dispatch }, { messageId, text }) {
    updateMessageApi({ messageId, text })
    .then(res => {
      dispatch("modalStore/setModal", { type: 'modalEditMessage', value: false }, { root: true });
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
  deleteMessage({ dispatch }, { chat, messageId }) {
    deleteMessageApi({ messageId })
    .then(res => {
      dispatch("modalStore/setModal", { type: 'modalDelete', value: false }, { root: true });
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
