import {
  createPostApi,
  getPostListApi,
  updatePostApi,
  deletePostApi,
  addLikePostApi,
  deleteLikePostApi,
} from "../api";

export const state = () => ({
  postList: [],
  selectedPost: null,
});

export const getters = {
  getPostList(state) {
    return state.postList;
  },
  getSelectedPost(state) {
    return state.selectedPost;
  },
};

export const mutations = {
  setPostList(state, data) {
    state.postList = data;
  },
  setSelectedPost(state, data) {
    state.selectedPost = data;
  },
};

export const actions = {
  setPostList({ commit }, { owner, ownerChanel }) {
    getPostListApi({ owner, ownerChanel })
    .then(res => {
      commit("setPostList", res.data);
    })
    .catch(err => {
      console.log(err);
    })
  },
  createPost({ dispatch }, data) {
    createPostApi(data)
    .then(res => {
      dispatch("setPostList", { owner: res.data.owner });
      dispatch("modalStore/setModal", { type: 'modalAddPost', value: false, option: '' }, { root: true });
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
  updatePost({ dispatch }, { postId, text }) {
    updatePostApi({ postId, text })
    .then(res => {
      dispatch("setPostList", { owner: res.data.owner });
      dispatch("modalStore/setModal", { type: 'modalAddPost', value: false, option: '' }, { root: true });
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
  deletePost({ dispatch }, { postId, owner }) {
    deletePostApi({ postId })
    .then(res => {
      dispatch("setPostList", { owner });
      dispatch("modalStore/setModal", { type: 'modalDeletePost', value: false }, { root: true });
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
  addLikePost({ dispatch }, postId) {
    addLikePostApi(postId)
    .then(res => {
      dispatch("setPostList", { owner: res.data.owner });
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
  deleteLikePost({ dispatch }, postId) {
    deleteLikePostApi(postId)
    .then(res => {
      dispatch("setPostList", { owner: res.data.owner });
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
