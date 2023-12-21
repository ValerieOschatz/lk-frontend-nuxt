import {
  getUserListApi,
  getUserCardApi,
} from "../api";

export const state = () => ({
  userList: [],
  subscriberList: [],
  subscriptionList:[],
  user: {
    _id: '',
    name: '',
    photo: '',
    description: '',
    subscribers: [],
    privatSettings: {
      comments: null,
      posts: null,
    },
  },
});

export const getters = {
  getUserList(state) {
    return state.userList;
  },
  getSubscriberList(state) {
    return state.subscriberList;
  },
  getSubscriptionList(state) {
    return state.subscriptionList;
  },
  getUser(state) {
    return state.user;
  },
};

export const mutations = {
  setUserList(state, data) {
    state.userList = data;
  },
  setSubscriberList(state, data) {
    state.subscriberList = data;
  },
  setSubscriptionList(state, data) {
    state.subscriptionList = data;
  },
  setUser(state, data) {
    state.user = {
      _id: data._id,
      name: data.name,
      photo: data.photo,
      description: data.description,
      subscribers: data.subscribers,
      privatSettings: {
        comments: data.privatSettings.comments,
        posts: data.privatSettings.posts,
      },
    };
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
  setSubscriberList({ commit }, { name, subscribers }) {
    getUserListApi({ name, subscribers })
    .then(res => {
      commit("setSubscriberList", res.data);
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
  setSubscriptionList({ commit }, { name, subscriptions }) {
    getUserListApi({ name, subscriptions })
    .then(res => {
      commit("setSubscriptionList", res.data);
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
  setUser({ commit, dispatch }, { userId }) {
    getUserCardApi({ userId })
    .then(res => {
      commit("setUser", res.data);
    })
    .catch(err => {
      navigateTo('/users');
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
