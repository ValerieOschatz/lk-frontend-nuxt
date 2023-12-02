import {
  createPostApi
} from "../api";

export const state = () => ({
});

export const getters = {
};

export const mutations = {
};

export const actions = {
  createPost({ dispatch }, data) {
    createPostApi(data)
    .then(res => {
      dispatch("modalStore/setModalAddPost", false, { root: true });
    })
    .catch(err => {
      console.log(err);
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
