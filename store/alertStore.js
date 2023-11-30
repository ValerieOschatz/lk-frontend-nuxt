export const state = () => ({
  alert: {
    isOpen: false,
    text: '',
    color: '',
    icon: '',
  }
});

export const getters = {
  getAlert(state) {
    return state.alert;
  },
};

export const mutations = {
  setAlert(state, { isOpen, text, color, icon }) {
    state.alert = {
      isOpen,
      text,
      color,
      icon,
    };
  },
  closeAlert(state) {
    state.alert = {
      isOpen: false,
      text: '',
      color: '',
      icon: '',
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
