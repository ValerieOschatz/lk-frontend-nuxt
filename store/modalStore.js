export const state = () => ({
  modalEditPhoto: {
    isOpen: false,
    option: '',
  },
  modalEditInfo: {
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
  modalDelete: {
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
  modalAddChanel: {
    isOpen: false,
    option: '',
  },
});

export const getters = {
  getModalEditPhoto(state) {
    return state.modalEditPhoto;
  },
  getModalEditInfo(state) {
    return state.modalEditInfo;
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
  getModalDelete(state) {
    return state.modalDelete;
  },
  getModalCommentList(state) {
    return state.modalCommentList;
  },
  getModalAddComment(state) {
    return state.modalAddComment;
  },
  getModalAddChanel(state) {
    return state.modalAddChanel;
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
