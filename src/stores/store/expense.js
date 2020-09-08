import axios from "axios";
import { API } from "./APIs";

const state = () => ({
  expenses: [],
  id: null
});

const mutations = {
  setExpenses(state, data) {
    state.expenses = data;
  },
  addExpense(state, data) {
    state.expenses = data;
  },
  deleteExpense(state, id) {
    state.expenses.pop(id);
  },
  clearDetails(state) {
    state.expenses = [];
    state.id = null;
  }
};

const actions = {
  fetchExpenses({ state, commit }, id) {
    state.id = id;
    return axios
      .get(API + id + ".json")
      .then(result => {
        if (result.status == 200 && result.data) {
          let data = [];
          for (let key in result.data) {
            data.push({ ...result.data[key], id: key });
          }
          commit("setExpenses", data);
        }
      })
      .catch(e => console.log(e));
  },
  AddExpense({ state, dispatch }, authData) {
    let date = new Date();
    date = date.toJSON().slice(0, 10);
    if (authData.date) {
      date = authData.date;
    }
    const data = {
      store: authData.store,
      total: authData.total,
      date: date,
      description: authData.description
    };
    if (authData.id) {
      return axios
        .put(API + state.id + "/" + authData.id + ".json", data)
        .then(result => {
          if (result.status == 200) {
            dispatch("fetchExpenses", state.id);
          }
        })
        .catch(e => console.log(e));
    } else {
      return axios
        .post(API + state.id + ".json", data)
        .then(result => {
          if (result.status == 200) {
            dispatch("fetchExpenses", state.id);
          }
        })
        .catch(e => console.log(e));
    }
  },
  DeleteExpense({ state, commit }, id) {
    return axios
      .delete(API + state.id + "/" + id + ".json")
      .then(result => {
        if (result.status == 200) {
          commit("deleteExpense", id);
        }
      })
      .catch(e => console.log(e));
  }
};

const getters = {
  getExpenses: state => state.expenses
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
