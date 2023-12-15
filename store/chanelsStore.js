import {
  createChanelApi,
  getChanelListApi,
  getChanelCardApi,
} from "../api";

export const state = () => ({
  ownChanelList: [],
  ownChanelName: '',
  chanel: {
    id: '',
    name: '',
    photo: '',
    description: '',
    owner: '',
    subscribers: [],
    privatSettings: {
      comments: null,
      posts: null,
    },
  },
});

export const getters = {
  getOwnChanelList(state) {
    return state.ownChanelList;
  },
  getOwnChanelName(state) {
    return state.ownChanelName;
  },
  getChanel(state) {
    return state.chanel;
  },
};

export const mutations = {
  setOwnChanelList(state, data) {
    state.ownChanelList = data;
  },
  setOwnChanelName(state, data) {
    state.ownChanelName = data;
  },
  setChanel(state, data) {
    state.chanel = {
      id: data._id,
      name: data.name,
      photo: data.photo,
      description: data.description,
      subscribers: data.subscribers,
      owner: data.owner,
      privatSettings: {
        comments: data.privatSettings.comments,
        posts: data.privatSettings.posts,
      },
    };
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
  setChanel({ commit, dispatch }, { chanelId }) {
    getChanelCardApi({ chanelId })
    .then(res => {
      commit("setChanel", res.data);
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
