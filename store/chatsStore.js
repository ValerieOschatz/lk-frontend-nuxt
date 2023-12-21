import {
  createChatApi,
  getChatCardApi,
  checkChatApi,
  deleteChatApi,
} from "../api";

export const state = () => ({
  chat: {
    _id: '',
    name: '',
    photo: '',
    participants: [],
    createdAt: '',
    updatedAt: '',
    groupDetails: {
      isGroup: false,
      creator: null,
      rights: false,
    },
  },
  selectedChat: null,
});

export const getters = {
  getChat(state) {
    return state.chat;
  },
  getSelectedChat(state) {
    return state.selectedChat;
  },
};

export const mutations = {
  setChat(state, data) {
    state.chat = {
      _id: data._id,
      name: data.name,
      photo: data.photo,
      participants: data.participants,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      groupDetails: {
        isGroup: data.groupDetails.isGroup,
        creator: data.groupDetails.creator,
        rights: data.groupDetails.rights,
      },
    };
  },
  setSelectedChat(state, data) {
    state.selectedChat = data;
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
      navigateTo('/chats');
      const data = {
        isOpen: true,
        text: err.response.data.message,
        color: 'error',
        icon: '$warning',
      };
      dispatch("alertStore/setAlert", data, { root: true });
    })
  },
  checkChat({ dispatch }, user) {
    checkChatApi({ participant: user._id })
    .then(res => {
      if (res.data) {
        navigateTo(`/chats/${res.data._id}`);
      } else {
        localStorage.setItem('user', JSON.stringify(user));
        navigateTo('/chats/new');
      }
    })
    .catch(err => {
      navigateTo('/chats');
      const data = {
        isOpen: true,
        text: err.response.data.message,
        color: 'error',
        icon: '$warning',
      };
      dispatch("alertStore/setAlert", data, { root: true });
    })
  },
  deleteChat({ dispatch }, { chatId }) {
    deleteChatApi({ chatId })
    .then(res => {
      dispatch("modalStore/setModal", { type: 'modalDelete', value: false }, { root: true });
      navigateTo('/chats');
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
