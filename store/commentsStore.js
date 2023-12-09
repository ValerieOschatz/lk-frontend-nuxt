import {
  createCommentApi,
  getCommentListApi,
} from "../api";

export const state = () => ({
  commentList: [],
});

export const getters = {
  getCommentList(state) {
    return state.commentList;
  },
};

export const mutations = {
  setCommentList(state, data) {
    state.commentList = data;
  },
};

export const actions = {
  createComment({ dispatch }, { post, text }) {
    createCommentApi({ post, text })
    .then(res => {
      dispatch("setCommentList", { post });
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
  setCommentList({ commit }, { post }) {
    getCommentListApi({ post })
    .then(res => {
      commit("setCommentList", res.data);
    })
    .catch(err => {
      console.log(err);
    })
  }
};
