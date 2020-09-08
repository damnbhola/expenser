import axios from "axios";
import { LoginAPI, SignupAPI, API } from "./APIs";

const state = () => ({
  user: {},
  login: false
});

const mutations = {
  setDetails(state, user) {
    state.login = true;
    state.user = {
      email: user.email,
      id: user.localId,
      token: user.idToken,
      income: user.income,
      fName: user.fName,
      lName: user.lName
    };
    $cookies.set("user", user, user.expiresIn);
  },
  clearDetails(state) {
    state.login = false;
    state.user = {};
    $cookies.remove("user");
  }
};

const actions = {
  LoginUser({ state, dispatch }, authData) {
    state.login = true;
    const data = {
      email: authData.email,
      password: authData.password,
      returnSecureToken: true
    };
    return axios.post(LoginAPI, data).then(result => {
      if (result.status == 200) {
        dispatch("fetchProfile", result.data);
      } else {
        throw new TypeError();
      }
    });
  },
  SignupUser({ state, dispatch }, authData) {
    state.login = true;
    const data = {
      email: authData.email,
      password: authData.password,
      returnSecureToken: true
    };
    return axios.post(SignupAPI, data).then(result => {
      if (result.status == 200) {
        dispatch("setProfile", result.data);
      } else {
        throw new TypeError();
      }
    });
  },
  fetchProfile({ commit }, user) {
    return axios
      .get(API + user.localId + "profile.json")
      .then(result => {
        if (result.status == 200) {
          commit("setDetails", { ...user, ...result.data });
        }
      })
      .catch(e => console.log(e));
  },
  setProfile({ commit }, user) {
    const data = {
      income: "",
      fName: "",
      lName: ""
    };
    return axios
      .put(API + user.localId + "profile.json", data)
      .then(result => {
        if (result.status == 200) {
          commit("setDetails", { ...user, ...data });
        }
      })
      .catch(e => console.log(e));
  },
  editProfile({ state, commit }, user) {
    if (
      state.user.income != user.income ||
      state.user.fName != user.fName ||
      state.user.lName != user.lName
    ) {
      const data = {
        income: user.income,
        fName: user.fName,
        lName: user.lName
      };
      return axios
        .put(API + user.id + "profile.json", data)
        .then(result => {
          if (result.status == 200) {
            commit("setDetails", {
              ...data,
              email: state.user.email,
              idToken: state.user.token
            });
          }
        })
        .catch(e => console.log(e));
    }
  },
  LogoutUser({ commit }) {
    commit("clearDetails");
  }
};

const getters = {
  isAuthenticated: state => state.user.token,
  getUser: state => state.user,
  getToken: state => state.user.token,
  getId: state => state.user.id
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
