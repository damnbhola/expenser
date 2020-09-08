import Vue from "vue";
import App from "./App.vue";
import "./assets/styles.css";
import router from "./routes";
import store from "./stores";
import VueCookies from "vue-cookies";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(VueCookies);

Vue.filter("currency", value => {
  return "\u20B9 " + Number(value).toFixed(2);
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  el: "#app",
  created() {
    this.checkLogin();
  },
  watch: {
    $route: "checkLogin"
  },
  methods: {
    checkLogin() {
      if ($cookies.get("user") != null && $cookies.get("user") != undefined) {
        let user = $cookies.get("user");
        this.$store.commit("user/setDetails", user);
        this.$store.dispatch("user/fetchProfile", user);
        this.$store.dispatch("expense/fetchExpenses", user.localId);
      } else {
        this.$store.commit("user/clearDetails");
        this.$store.commit("expense/clearDetails");
      }
    }
  },
  render: h => h(App)
});
