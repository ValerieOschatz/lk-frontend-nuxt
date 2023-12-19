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
  loading: false,
});

export const getters = {
  getPostList(state) {
    return state.postList;
  },
  getSelectedPost(state) {
    return state.selectedPost;
  },
  getLoading(state) {
    return state.loading;
  },
};

export const mutations = {
  setPostList(state, data) {
    state.postList = data;
  },
  setSelectedPost(state, data) {
    state.selectedPost = data;
  },
  setLoading(state, data) {
    state.loading = data;
  },
};

export const actions = {
  setPostList({ commit }, { owner, ownerChanel, tape }) {
    getPostListApi({ owner, ownerChanel, tape })
    .then(res => {
      commit("setPostList", res.data);
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => {
      commit("setLoading", false);
    })
  },
  createPost({ dispatch }, data) {
    createPostApi(data)
    .then(res => {
      if (res.data.ownerChanel) {
        dispatch("setPostList", { ownerChanel: res.data.ownerChanel });
      } else {
        dispatch("setPostList", { owner: res.data.owner });
      }
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
      if (res.data.ownerChanel) {
        dispatch("setPostList", { ownerChanel: res.data.ownerChanel });
      } else {
        dispatch("setPostList", { owner: res.data.owner });
      }
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
  deletePost({ dispatch }, { postId, owner, ownerChanel }) {
    deletePostApi({ postId })
    .then(res => {
      if (ownerChanel) {
        dispatch("setPostList", { ownerChanel });
      } else {
        dispatch("setPostList", { owner });
      }
      dispatch("modalStore/setModal", { type: 'modalDelete', value: false }, { root: true });
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
  addLikePost({ dispatch }, { postId, tape }) {
    addLikePostApi(postId)
    .then(res => {
      if (tape) {
        dispatch("setPostList", { tape });
      } else {
        if (res.data.ownerChanel) {
          dispatch("setPostList", { ownerChanel: res.data.ownerChanel });
        } else {
          dispatch("setPostList", { owner: res.data.owner });
        }
      }
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
  deleteLikePost({ dispatch }, { postId, tape }) {
    deleteLikePostApi(postId)
    .then(res => {
      if (tape) {
        dispatch("setPostList", { tape });
      } else {
        if (res.data.ownerChanel) {
          dispatch("setPostList", { ownerChanel: res.data.ownerChanel });
        } else {
          dispatch("setPostList", { owner: res.data.owner });
        }
      }
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
