import {
  getUserListApi,
  getUserCardApi,
} from "../api";

export const state = () => ({
  userList: [],
  user: {
    id: '',
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
  getUser(state) {
    return state.user;
  },
};

export const mutations = {
  setUserList(state, data) {
    state.userList = data;
  },
  setUser(state, data) {
    state.user = {
      id: data._id,
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
  setUserList({ commit }, { name, subscribers, subscriptions, search }) {
    if (search === 'name' && !name) {
      commit("setUserList", []);
      return;
    }
    
    getUserListApi({ name, subscribers, subscriptions })
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
