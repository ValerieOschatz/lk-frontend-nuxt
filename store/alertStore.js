export const state = () => ({
  alert: {
    isOpen: false,
    text: '',
    color: '',
  }
});

export const getters = {
  getAlert(state) {
    return state.alert;
  },
};

export const mutations = {
  setAlert(state, { isOpen, text, color }) {
    state.alert = {
      isOpen,
      text,
      color,
    };
  },
  closeAlert(state) {
    state.alert = {
      isOpen: false,
      text: '',
      color: '',
    };
  },
};

export const actions = {
  setAlert({ commit }, data) {
    commit("setAlert", data);
  },
  closeAlert({ commit }) {
    commit("closeAlert");
  },
};
