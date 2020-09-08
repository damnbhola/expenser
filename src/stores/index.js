import Vue from "vue";
import Vuex from "vuex";
import user from "./store/user";
import expense from "./store/expense";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    expense,
    user
  }
});
