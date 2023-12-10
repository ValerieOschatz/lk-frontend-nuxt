export const state = () => ({
  modalAddPost: {
    isOpen: false,
    option: '',
  },
  modalEditProfilePhoto: {
    isOpen: false,
    option: '',
  },
  modalEditProfileInfo: {
    isOpen: false,
    option: '',
  },
  modalEditPrivatSettings: {
    isOpen: false,
    option: '',
  },
  modalLogout: {
    isOpen: false,
    option: '',
  },
  modalCommentList: {
    isOpen: false,
    option: '',
  },
  modalAddComment: {
    isOpen: false,
    option: '',
  },
  modalDeleteComment: {
    isOpen: false,
    option: '',
  },
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
  getModalLogout(state) {
    return state.modalLogout;
  },
  getModalCommentList(state) {
    return state.modalCommentList;
  },
  getModalAddComment(state) {
    return state.modalAddComment;
  },
  getModalDeleteComment(state) {
    return state.modalDeleteComment;
  },
};

export const mutations = {
  setModal(state, { type, value, option }) {
    state[type].isOpen = value;
    if (option) state[type].option = option;
  },
};

export const actions = {
  setModal({ commit }, { type, value, option }) {
    commit("setModal", { type, value, option });
  },
};
