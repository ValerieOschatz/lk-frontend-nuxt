import {
  createMessageApi,
} from "../api";

export const state = () => ({
  // ownChanelList: [],
});

export const getters = {
  // getOwnChanelList(state) {
  //   return state.ownChanelList;
  // },
};

export const mutations = {
  // setOwnChanelList(state, data) {
  //   state.ownChanelList = data;
  // },
};

export const actions = {
  createMessage({ dispatch }, { text, chat }) {
    createMessageApi({ text, chat })
    .then(res => {
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
