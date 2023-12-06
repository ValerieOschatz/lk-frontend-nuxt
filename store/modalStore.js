export const state = () => ({
  modalAddPost: false,
  modalEditProfilePhoto: false,
  modalEditProfileInfo: false,
  modalEditPrivatSettings: false,
});

export const getters = {
  getModalAddPost(state) {
    return state.modalAddPost;
  },
  getModalEditProfilePhoto(state) {
    return state.modalEditProfilePhoto;
  },
  getModalEditProfileInfo(state) {
    return state.modalEditProfileInfo;
  },
  getModalEditPrivatSettings(state) {
    return state.modalEditPrivatSettings;
  },
};

export const mutations = {
  setModal(state, { type, value }) {
    state[type] = value;
  },
};

export const actions = {
  setModal({ commit }, { type, value }) {
    commit("setModal", { type, value });
  },
};
