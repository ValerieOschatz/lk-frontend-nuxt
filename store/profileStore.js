import {
  getProfileApi,
  updateProfilePhotoApi,
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
    profileInfo: null,
  }
});

export const getters = {
  getProfile(state) {
    return state.profile;
  },
  getPrivatSettings(state) {
    return state.privatSettings;
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
      profileInfo: data.privatSettings.profileInfo,
    };
  },
};

export const actions = {
  setProfile({ commit }) {
    getProfileApi()
    .then(res => {
      commit("setProfile", res.data);
      commit("setPrivatSettings", res.data);
    })
    .catch(err => {
      console.log(err);
    })
  },
  editProfilePhoto({ dispatch }, data) {
    updateProfilePhotoApi(data)
    .then(res => {
      dispatch("setProfile");
      dispatch("modalStore/setModal", { type: 'modalEditProfilePhoto', value: false }, { root: true });
    })
    .catch(err => {
      console.log(err);
    })
  },
};
