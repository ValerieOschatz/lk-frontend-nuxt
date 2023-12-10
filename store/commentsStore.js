import {
  createCommentApi,
  getCommentListApi,
  updateCommentApi,
} from "../api";

export const state = () => ({
  commentList: [],
  selectedComment: null,
});

export const getters = {
  getCommentList(state) {
    return state.commentList;
  },
  getSelectedComment(state) {
    return state.selectedComment;
  },
};

export const mutations = {
  setCommentList(state, data) {
    state.commentList = data;
  },
  setSelectedComment(state, data) {
    state.selectedComment = data;
  },
};

export const actions = {
  setCommentList({ commit }, { post }) {
    getCommentListApi({ post })
    .then(res => {
      commit("setCommentList", res.data);
    })
    .catch(err => {
      console.log(err);
    })
  },
  createComment({ dispatch }, { post, text }) {
    createCommentApi({ post, text })
    .then(res => {
      dispatch("setCommentList", { post });
      dispatch("modalStore/setModal", { type: 'modalAddComment', value: false, option: '' }, { root: true });
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
  updateComment({ dispatch }, { commentId, text }) {
    updateCommentApi({ commentId, text })
    .then(res => {
      dispatch("setCommentList", { post: res.data.post });
      dispatch("modalStore/setModal", { type: 'modalAddComment', value: false, option: '' }, { root: true });
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
};
