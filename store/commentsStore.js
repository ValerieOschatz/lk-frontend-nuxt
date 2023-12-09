import {
  createCommentApi,
  // getPostListApi,
} from "../api";

export const state = () => ({
  // postList: [],
});

export const getters = {
  // getPostList(state) {
  //   return state.postList;
  // },
};

export const mutations = {
  // setPostList(state, data) {
  //   state.postList = data;
  // },
};

export const actions = {
  createComment({ dispatch }, { post, text }) {
    createCommentApi({ post, text })
    .then(res => {
      console.log(res)
      // dispatch("setPostList", { owner: res.data.owner });
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
  // setPostList({ commit }, { owner, ownerChanel }) {
  //   getPostListApi({ owner, ownerChanel })
  //   .then(res => {
  //     commit("setPostList", res.data);
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   })
  // }
};

