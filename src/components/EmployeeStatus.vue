<template>
  <v-dialog v-model="dialog" max-width="800">
    <v-card>
      <v-card-title class="d-flex justify-space-between align-center">
        <span class="headline">Employee Status</span>
        <v-btn class="custom-button" text @click="closeDialog">
          <v-icon class="custom-icon" icon="mdi-close-thick"></v-icon>
        </v-btn>
      </v-card-title>
      <v-container>
        <v-row>
          <!--<v-col v-for="employee in employees" :key="employee._id" cols="12">
              <div>
                {{ employee.name }} {{ employee.surname }} -
                {{ employee.email }} (Status: {{ employee.status }})
              </div>
            </v-col>-->
          <v-data-table :items="employees"></v-data-table>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
import EmployeeService from "@/services/EmployeeService";
import store from "@/store";

export default {
  data() {
    return {
      dialog: false,
      employees: [],
    };
  },
  methods: {
    async getAllStatuses() {
      try {
        let response = await EmployeeService.getAllStatuses();
        let statuses = response.data;
        this.employees = statuses.map((employee) => ({
          full_name: employee.name + " " + employee.surname,
          email: employee.email,
          status:
            employee.status !== undefined
              ? store.userStatus[employee.status].status
              : "N/A",
        }));
        this.dialog = true;
      } catch (error) {
        console.error("Error fetching employee statuses:", error);
      }
    },
    closeDialog() {
      this.dialog = false;
      this.$emit("close");
    },
  },
  mounted() {
    this.getAllStatuses();
  },
};
</script>

<style scoped>
.custom-button {
  background-color: none;
  color: black;
}

.custom-button:hover {
  background-color: red;
}

.custom-button:hover .custom-icon {
  color: white;
}

.custom-icon {
  color: black;
}
</style>
