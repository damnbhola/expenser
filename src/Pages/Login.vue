<template>
  <div id="Signin">
    <div class="sign-inup">
      <div class="container mt-5">
        <div class="row justify-content-center">
          <div class="col-lg-5">
            <div class="sign-form">
              <div class="sign-inner">
                <div class="form-dt">
                  <div class="form-inpts checout-address-step">
                    <div class="form-title">
                      <h6>Sign In</h6>
                    </div>
                    <div class="form-group" v-if="error">
                      <center style="color:#cf1b1b">*{{ error }}*</center>
                    </div>
                    <div class="form-group pos_rel">
                      <input
                        id="email"
                        name="emailaddress"
                        type="email"
                        placeholder="Email Address"
                        class="form-control lgn_input"
                        required
                        v-model="email"
                      />
                      <i class="uil uil-envelope lgn_icon"></i>
                    </div>
                    <div class="form-group pos_rel">
                      <input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Password"
                        class="form-control lgn_input"
                        required
                        v-model="password"
                      />
                      <i class="uil uil-padlock lgn_icon"></i>
                    </div>
                    <button class="login-btn hover-btn" @click="verify" :disabled="loading">
                      <div v-if="loading">Loading...</div>
                      <div v-else>Sign In Now</div>
                    </button>
                  </div>
                  <br />
                  <div class="signup-link">
                    <p>
                      Don't have an account? -
                      <router-link to="/signup">Sign Up Now</router-link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Signin",
  data() {
    return {
      email: "",
      password: "",
      error: "",
      loading: false,
    };
  },
  computed: {
    ...mapGetters({
      show: "user/isAuthenticated",
    }),
  },
  watch: {
    email() {
      this.error = "";
    },
    password() {
      this.error = "";
    },
  },
  mounted() {
    if (this.show) {
      this.$router.push("/");
    }
  },
  methods: {
    verify() {
      this.loading = true;
      if (this.email && this.password) {
        this.$store
          .dispatch("user/LoginUser", {
            email: this.email,
            password: this.password,
          })
          .then(() => {
            this.$router.push("/");
          })
          .catch(() => {
            this.error = "Invalid Email or Password";
            this.loading = false;
          });
      } else {
        this.loading = false;
        if (this.email) {
          this.error = "Please Enter the Password.";
        } else if (this.password) {
          this.error = "Please Enter the Email.";
        } else {
          this.error = "Please Enter the Credentials";
        }
      }
    },
  },
};
</script>
