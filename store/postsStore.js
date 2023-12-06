import {
  createPostApi,
  getPostListApi,
} from "../api";

export const state = () => ({
  postList: [],
});

export const getters = {
  getPostList(state) {
    return state.postList;
  },
};

export const mutations = {
  setPostList(state, data) {
    state.postList = data;
  },
};

export const actions = {
  createPost({ dispatch }, data) {
    createPostApi(data)
    .then(res => {
      dispatch("setPostList", { owner: res.data.owner });
      dispatch("modalStore/setModal", { type: 'modalAddPost', value: false }, { root: true });
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
  setPostList({ commit }, { owner, ownerChanel }) {
    getPostListApi({ owner, ownerChanel })
    .then(res => {
      commit("setPostList", res.data);
    })
    .catch(err => {
      console.log(err);
    })
  }
};

