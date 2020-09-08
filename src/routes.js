import Vue from "vue";
import Router from "vue-router";
import Index from "./Pages/Index.vue";
import Login from "./Pages/Login.vue";
import Signup from "./Pages/Signup.vue";
import Profile from "./Pages/Profile.vue";
import MainNavbar from "./Components/MainNavbar";
import MainFooter from "./Components/MainFooter";
import store from "./stores";

Vue.use(Router);

const router = new Router({
  linkExactActiveClass: "active",
  routes: [
    {
      path: "/",
      name: "index",
      components: { default: Index, header: MainNavbar, footer: MainFooter }
    },
    {
      path: "/signin",
      name: "signin",
      components: { default: Login, header: MainNavbar, footer: MainFooter }
    },
    {
      path: "/signup",
      name: "signup",
      components: { default: Signup, header: MainNavbar, footer: MainFooter }
    },
    {
      path: "/profile",
      name: "profile",
      components: { default: Profile, header: MainNavbar, footer: MainFooter }
    }
  ],
  scrollBehavior: to => {
    if (to.hash) {
      return { selector: to.hash };
    } else {
      return { x: 0, y: 0 };
    }
  }
});

router.beforeEach((to, from, next) => {
  if (
    (to.name == "index" || to.name == "profile") &&
    store.state.user.login == false
  ) {
    next("signin");
  } else if (
    (to.name == "signin" || to.name == "signup") &&
    store.state.user.login == true
  ) {
    next("/");
  } else {
    next();
  }
});

export default router;
