export const state = () => ({
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
  modalAddPost: {
    isOpen: false,
    option: '',
  },
  modalDeletePost: {
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
  getModalAddPost(state) {
    return state.modalAddPost;
  },
  getModalDeletePost(state) {
    return state.modalDeletePost;
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
