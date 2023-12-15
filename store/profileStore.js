import {
  getProfileApi,
  updateProfilePhotoApi,
  updateProfileInfoApi,
  updateProfilePrivatSettingsApi,
  subscribeApi,
  unsubscribeApi,
} from "../api";

export const state = () => ({
  profile: {
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
  searchedName: '',
  subscriberName: '',
  subscriptionName: '',
});

export const getters = {
  getProfile(state) {
    return state.profile;
  },
  getSearchedName(state) {
    return state.searchedName;
  },
  getSubscriberName(state) {
    return state.subscriberName;
  },
  getSubscriptionName(state) {
    return state.subscriptionName;
  },
};

export const mutations = {
  setProfile(state, data) {
    state.profile = {
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
  setSearchedName(state, data) {
    state.searchedName = data;
  },
  setSubscriberName(state, data) {
    state.subscriberName = data;
  },
  setSubscriptionName(state, data) {
    state.subscriptionName = data;
  },
  resetProfile(state) {
    state.profile = {
      id: '',
      name: '',
      photo: '',
      description: '',
      subscribers: [],
      privatSettings: {
        comments: null,
        posts: null,
      },
    };
  },
};

export const actions = {
  setProfile({ commit, dispatch }) {
    getProfileApi()
    .then(res => {
      commit("setProfile", res.data);
    })
    .catch(err => {
      navigateTo('/sign-in');
      const data = {
        isOpen: true,
        text: "На сервере произошла ошибка",
        color: 'error',
        icon: '$warning',
      };
      dispatch("alertStore/setAlert", data, { root: true });
    })
  },
  editProfilePhoto({ dispatch }, data) {
    updateProfilePhotoApi(data)
    .then(res => {
      dispatch("setProfile");
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
  editProfileInfo({ dispatch }, data) {
    updateProfileInfoApi(data)
    .then(res => {
      dispatch("setProfile");
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
    updateProfilePrivatSettingsApi(data)
    .then(res => {
      dispatch("setProfile");
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
  subscribe({ state, dispatch }, { userId, profileId, option }) {
    subscribeApi(userId)
    .then(res => {
      if (option === 'search') dispatch("usersStore/setUserList", { name: state.searchedName }, { root: true });
      if (option === 'subscribers') dispatch("usersStore/setSubscriberList", { name: state.subscriberName, subscribers: profileId }, { root: true });
      if (option === 'subscriptions') dispatch("usersStore/setSubscriptionList", { name: state.subscriptionName, subscriptions: profileId }, { root: true });
      if (option === 'card') dispatch("usersStore/setUser", { userId }, { root: true });
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
  unsubscribe({ state, dispatch }, { userId, profileId, option }) {
    unsubscribeApi(userId)
    .then(res => {
      if (option === 'search') dispatch("usersStore/setUserList", { name: state.searchedName }, { root: true });
      if (option === 'subscribers') dispatch("usersStore/setSubscriberList", { name: state.subscriberName, subscribers: profileId }, { root: true });
      if (option === 'subscriptions') dispatch("usersStore/setSubscriptionList", { name: state.subscriptionName, subscriptions: profileId }, { root: true });
      if (option === 'card') dispatch("usersStore/setUser", { userId }, { root: true });
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
  resetProfile({ commit }) {
    commit("resetProfile");
  }
};
