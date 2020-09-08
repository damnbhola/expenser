<template>
  <div id="ExpenseNav">
    <section class="container">
      <div class="row">
        <div class="col-sm-6">
          <h2 class="text-info">Payments</h2>
        </div>
        <div class="col-sm-6">
          <button class="btn btn-info float-right" @click="addExpense()">
            Add New Expense
            <i class="fas fa-angle-down"></i>
          </button>
        </div>
      </div>
      <hr class="bg-info" />
      <table class="table table-bordered table striped">
        <thead>
          <tr class="text-center bg-info text-light">
            <th>Select</th>
            <th>Date</th>
            <th>Store</th>
            <th>Total</th>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="text-center"
            v-for="expense in expenses"
            :key="expense.id"
            :class="{ 'bg-light': expense.date }"
          >
            <td>
              <input type="checkbox" name id />
            </td>
            <td>{{ expense.date }}</td>
            <td>{{ expense.store }}</td>
            <td>{{ expense.total | currency }}</td>
            <td>{{ expense.description }}</td>
            <td>
              <a class="text-success" @click="editExpense(expense)">
                <i class="fas fa-edit"></i>
              </a>
            </td>
            <td>
              <a class="text-danger" @click="deleteExpense(expense.id)">
                <i class="fas fa-trash-alt"></i>
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
    <div id="overlay" v-if="showDone">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Expenses</h5>
            <button type="button" class="close" @click="showDone = false">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <center>
              <span>Expense is deleted successfully!</span>
            </center>
            <br />
            <div class="form-group">
              <button class="btn btn-info btn-block btn-lg" @click.prevent="showDone = false">Done</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="overlay" v-if="showAddExpense">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">New Expense</h5>
            <button type="button" class="close" @click="showAddExpense = false">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <center>
              <span class="red" v-if="this.error">*{{ this.error }}*</span>
            </center>
            <div class="row">
              <label for="Store" class="col-md-3">
                Store:
                <span class="red">*</span>
              </label>
              <input type="text" id="Store" class="form-control col-md-9" v-model="store" />
            </div>
            <div class="row">
              <label for="Total" class="col-md-3">
                Total:
                <span class="red">*</span>
              </label>
              <input type="text" id="Total" class="form-control col-md-9" v-model="total" />
            </div>
            <div class="row">
              <label for="Date" class="col-md-3">Date:</label>
              <input type="date" id="Date" class="form-control col-md-9" v-model="date" />
            </div>
            <div class="row">
              <label for="Description" class="col-md-3">Description:</label>
              <input
                type="text"
                id="Description"
                class="form-control col-md-9"
                v-model="description"
              />
            </div>
            <div class="form-group">
              <button
                class="btn btn-info btn-block btn-lg"
                @click.prevent="submitExpense()"
              >Add Expense</button>
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
  name: "ExpensesNav",
  data() {
    return {
      id: "",
      error: "",
      store: "",
      date: "",
      total: "",
      description: "",
      showAddExpense: false,
      showDone: false,
    };
  },
  watch: {
    store() {
      this.error = "";
    },
    total() {
      this.error = "";
    },
    date() {
      this.error = "";
    },
    description() {
      this.error = "";
    },
  },
  computed: {
    ...mapGetters({
      expenses: "expense/getExpenses",
      show: "user/isAuthenticated",
    }),
  },
  methods: {
    ...mapActions({
      AddExpense: "expense/AddExpense",
      DeleteExpense: "expense/DeleteExpense",
    }),
    submitExpense() {
      this.error = "";
      if (this.store && this.total) {
        this.showAddExpense = false;
        this.AddExpense({
          id: this.id,
          store: this.store,
          total: this.total,
          date: this.date,
          description: this.description,
        });
      } else {
        if (!this.store) {
          this.error += "Store Name";
        } else {
          this.error += "Total";
        }
        this.error += " is Required";
      }
    },
    addExpense() {
      this.showAddExpense = true;
      this.id = "";
      this.store = "";
      this.total = "";
      this.date = "";
      this.description = "";
    },
    editExpense(expense) {
      this.showAddExpense = true;
      this.id = expense.id;
      this.store = expense.store;
      this.total = expense.total;
      this.date = expense.date;
      this.description = expense.description;
    },
    deleteExpense(id) {
      this.DeleteExpense(id);
      this.showDone = true;
    },
  },
};
</script>
