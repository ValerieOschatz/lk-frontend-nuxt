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
  },
  privatSettings: {
    comments: null,
    posts: null,
  },
  searchedName: '',
});

export const getters = {
  getProfile(state) {
    return state.profile;
  },
  getPrivatSettings(state) {
    return state.privatSettings;
  },
  getSearchedName(state) {
    return state.searchedName;
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
    };
  },
  setPrivatSettings(state, data) {
    state.privatSettings = {
      comments: data.privatSettings.comments,
      posts: data.privatSettings.posts,
    };
  },
  setSearchedName(state, data) {
    state.searchedName = data;
  },
};

export const actions = {
  setProfile({ commit, dispatch }) {
    getProfileApi()
    .then(res => {
      commit("setProfile", res.data);
      commit("setPrivatSettings", res.data);
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
      dispatch("modalStore/setModal", { type: 'modalEditProfilePhoto', value: false }, { root: true });
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
      dispatch("modalStore/setModal", { type: 'modalEditProfileInfo', value: false }, { root: true });
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
  subscribe({ state, dispatch }, userId) {
    subscribeApi(userId)
    .then(res => {
      dispatch("usersStore/setUserList", { name: state.searchedName }, { root: true });
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
  unsubscribe({ state, dispatch }, userId) {
    unsubscribeApi(userId)
    .then(res => {
      dispatch("usersStore/setUserList", { name: state.searchedName }, { root: true });
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
};
