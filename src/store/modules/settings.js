import defaultSettings from "@/settings";

const { showSettings, layout } = defaultSettings;

const state = {
  showSettings: showSettings,
  layout: layout
};

const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    if (state.hasOwnProperty(key)) {
      state[key] = value;
    }
  }
};

const actions = {
  changeSetting({ commit }, data) {
    commit("CHANGE_SETTING", data);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
