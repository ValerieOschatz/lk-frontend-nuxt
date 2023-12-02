export const state = () => ({
  modalAddPost: false,
});

export const getters = {
  getModalAddPost(state) {
    return state.modalAddPost;
  },
};

export const mutations = {
  setModalAddPost(state, value) {
    state.modalAddPost = value;
  },
};

export const actions = {
  setModalAddPost({ commit }, value) {
    commit("setModalAddPost", value);
  },
};
