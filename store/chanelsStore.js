import {
  createChanelApi,
  getChanelListApi,
  getChanelCardApi,
  updateChanelPhotoApi,
  updateChanelInfoApi,
  updateChanelPrivatSettingsApi,
  deleteChanelApi,
  subscribeChanelApi,
  unsubscribeChanelApi,
} from "../api";

export const state = () => ({
  ownChanelList: [],
  searchedChanelList: [],
  subscriptionChanelList: [],
  ownChanelName: '',
  searchedName: '',
  subscriptionName: '',
  chanel: {
    _id: '',
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
  getSearchedChanelList(state) {
    return state.searchedChanelList;
  },
  getSubscriptionChanelList(state) {
    return state.subscriptionChanelList;
  },
  getOwnChanelName(state) {
    return state.ownChanelName;
  },
  getSearchedChanelName(state) {
    return state.searchedName;
  },
  getSubscriptionChanelName(state) {
    return state.subscriptionName;
  },
  getChanel(state) {
    return state.chanel;
  },
};

export const mutations = {
  setOwnChanelList(state, data) {
    state.ownChanelList = data;
  },
  setSearchedChanelList(state, data) {
    state.searchedChanelList = data;
  },
  setSubscriptionChanelList(state, data) {
    state.subscriptionChanelList = data;
  },
  setOwnChanelName(state, data) {
    state.ownChanelName = data;
  },
  setSearchedChanelName(state, data) {
    state.searchedName = data;
  },
  setSubscriptionChanelName(state, data) {
    state.subscriptionName = data;
  },
  setChanel(state, data) {
    state.chanel = {
      _id: data._id,
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
  resetChanel(state) {
    state.chanel = {
      _id: '',
      name: '',
      photo: '',
      description: '',
      owner: '',
      subscribers: [],
      privatSettings: {
        comments: null,
        posts: null,
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
  setSearchedChanelList({ commit }, { name }) {
    if (!name) {
      commit("setSearchedChanelList", []);
      return;
    }

    getChanelListApi({ name })
    .then(res => {
      commit("setSearchedChanelList", res.data);
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
  setSubscriptionChanelList({ commit }, { subscriptions, name }) {
    getChanelListApi({ subscriptions, name })
    .then(res => {
      commit("setSubscriptionChanelList", res.data);
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
  editChanelPhoto({ dispatch }, data) {
    updateChanelPhotoApi(data)
    .then(res => {
      dispatch("setChanel", { chanelId: res.data._id });
      dispatch("modalStore/setModal", { type: 'modalEditPhoto', value: false }, { root: true });
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
  editChanelInfo({ dispatch }, data) {
    updateChanelInfoApi(data)
    .then(res => {
      dispatch("setChanel", { chanelId: res.data._id });
      dispatch("modalStore/setModal", { type: 'modalEditInfo', value: false }, { root: true });
    })
    .catch(err => {
      const data = {
        isOpen: true,
        text: err.response.data.message,
        color: 'error',
        icon: '$warning',
      };
      dispatch("alertStore/setAlert", data, { root: true });    })
  },
  editPrivatSettings({ dispatch }, data) {
    updateChanelPrivatSettingsApi(data)
    .then(res => {
      dispatch("setChanel", { chanelId: res.data._id });
      dispatch("modalStore/setModal", { type: 'modalEditPrivatSettings', value: false }, { root: true });
    })
    .catch(err => {
      const data = {
        isOpen: true,
        text: err.response.data.message,
        color: 'error',
        icon: '$warning',
      };
      dispatch("alertStore/setAlert", data, { root: true });    })
  },
  deleteChanel({ commit, dispatch }, { chanelId }) {
    deleteChanelApi({ chanelId })
    .then(res => {
      navigateTo('/chanels');
      commit("resetChanel");
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
  subscribe({ state, dispatch }, { chanelId, profileId, option }) {
    subscribeChanelApi(chanelId)
    .then(res => {
      if (option === 'search') dispatch("setSearchedChanelList", { name: state.searchedName });
      if (option === 'subscriptions') dispatch("setSubscriptionChanelList", { name: state.subscriptionName, subscriptions: profileId });
      if (option === 'card') dispatch("setChanel", { chanelId });
    })
    .catch(err => {
      const data = {
        isOpen: true,
        text: err.response.data.message,
        color: 'error',
        icon: '$warning',
      };
      dispatch("alertStore/setAlert", data, { root: true });    })
  },
  unsubscribe({ state, dispatch }, { chanelId, profileId, option }) {
    unsubscribeChanelApi(chanelId)
    .then(res => {
      if (option === 'search') dispatch("setSearchedChanelList", { name: state.searchedName });
      if (option === 'subscriptions') dispatch("setSubscriptionChanelList", { name: state.subscriptionName, subscriptions: profileId });
      if (option === 'card') dispatch("setChanel", { chanelId });
    })
    .catch(err => {
      const data = {
        isOpen: true,
        text: err.response.data.message,
        color: 'error',
        icon: '$warning',
      };
      dispatch("alertStore/setAlert", data, { root: true });    })
  },
};
