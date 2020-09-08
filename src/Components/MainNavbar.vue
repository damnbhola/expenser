<template>
  <section id="MainNavBar">
    <nav>
      <div class="navbar navbar-expand-lg container pt-3">
        <router-link class="navbar-brand" to="/">Expenser</router-link>
        <button
          class="navbar-toggler navbar-dark"
          type="button"
          data-toggle="collapse"
          data-target="#navbarToggler"
          aria-controls="navbarToggler"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarToggler">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item active" v-if="!show">
              <router-link to="/signin" class="nav-link">
                <i class="fas fa-sign-in-alt"></i> Sign In
              </router-link>
            </li>
            <li class="nav-item" v-if="show">
              <router-link to="/profile" class="nav-link">
                <i class="fas fa-user"></i> Profile
              </router-link>
            </li>
            <li class="nav-item" v-if="show">
              <a class="nav-link" v-on:click="logout" href="#">
                <i class="fas fa-sign-out-alt"></i> Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </section>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "MainNavbar",
  data() {
    return {
      isLogin: true,
    };
  },
  methods: {
    ...mapActions({
      logoutUser: "user/LogoutUser",
    }),
    logout() {
      this.logoutUser();
      this.$router.push("/signin");
    },
  },
  computed: {
    ...mapGetters({
      show: "user/isAuthenticated",
    }),
  },
};
</script>
