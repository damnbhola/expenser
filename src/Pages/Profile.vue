<template>
  <div id="Profile">
    <section class="container mt-5 mb-5">
      <div class="row">
        <label for="fName" class="col-md-2">First Name:</label>
        <input type="text" id="fName" class="form-control col-md-6" v-model="user.fName" />
      </div>
      <div class="row">
        <label for="lName" class="col-md-2">Last Name:</label>
        <input type="text" id="lName" class="form-control col-md-6" v-model="lName" />
      </div>
      <div class="row">
        <label for="income" class="col-md-2">Income:</label>
        <input type="text" id="income" class="form-control col-md-6" v-model="income" />
      </div>
      <div class="row">
        <label for="email" class="col-md-2">Email:</label>
        <input type="email" id="email" class="form-control col-md-6" v-model="user.email" disabled />
      </div>
      <button :disabled="changes" class="btn btn-info" @click.prevent="save()">
        Save
        <i class="fas fa-check"></i>
      </button>
    </section>
    <div id="overlay" v-if="showDone">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Profile</h5>
            <button type="button" class="close" @click="showDone = false">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <center>
              <span>Profile is saved successfully!</span>
            </center>
            <br />
            <div class="form-group">
              <button class="btn btn-info btn-block btn-lg" @click.prevent="showDone = false">Done</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Profile",
  data() {
    return {
      income: "",
      fName: "",
      lName: "",
      changes: false,
      showDone: false,
    };
  },
  computed: {
    ...mapGetters({
      user: "user/getUser",
    }),
  },
  methods: {
    ...mapActions({
      editProfile: "user/editProfile",
    }),
    save() {
      this.editProfile({
        income: this.income,
        fName: this.fName,
        lName: this.lName,
        id: this.user.id,
      });
      this.showDone = true;
    },
  },
  mounted() {
    this.income = this.user.income;
    this.fName = this.user.fName;
    this.lName = this.user.lName;
  },
};
</script>
