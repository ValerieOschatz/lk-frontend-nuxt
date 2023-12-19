import {
  createChatApi,
  getChatCardApi,
} from "../api";

export const state = () => ({
  chat: {
    id: '',
    participants: [],
    createdAt: '',
    updatedAt: ''
  },
});

export const getters = {
  getChat(state) {
    return state.chat;
  },
};

export const mutations = {
  setChat(state, data) {
    state.chanel = {
      id: data._id,
      participants: data.participants,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt
    };
  },
};

export const actions = {
  createChat({ dispatch }, { otherParticipants, text }) {
    createChatApi({ otherParticipants })
    .then(res => {
      dispatch("messagesStore/createMessage", { text, chat: res.data._id }, { root: true });
      navigateTo(`/chats/${res.data._id}`);
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
  setChat({ commit, dispatch }, { chatId }) {
    getChatCardApi({ chatId })
    .then(res => {
      commit("setChat", res.data);
    })
    .catch(err => {
      navigateTo('/chanels');
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
