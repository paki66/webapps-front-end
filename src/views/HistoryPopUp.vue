<template>
  <v-dialog v-model="internalDialog" max-width="800px">
    <v-card>
      <v-card-title>
        <span class="headline">Reports for the current month</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col>
              <h3>Report by Employee</h3>
              <v-data-table
                :headers="employeeHeaders"
                :items="employeeReport"
                class="elevation-1"
              ></v-data-table>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <h3>Report by Task Category</h3>
              <v-data-table
                :headers="categoryHeaders"
                :items="categoryReport"
                class="elevation-1"
              ></v-data-table>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red" @click="internalDialog = false">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import TaskService from "@/services/TaskService";

export default {
  props: {
    dialog: Boolean,
  },
  data() {
    return {
      employeeReport: [],
      categoryReport: [],
      employeeHeaders: [
        { text: "Employee", value: "employee" },
        { text: "Completed Tasks", value: "completed" },
        { text: "Incomplete Tasks", value: "incomplete" },
        { text: "Expired Tasks", value: "expired" },
        { text: "Expected Hours", value: "expectedHours" },
        { text: "Taken Hours", value: "takenHours" },
      ],
      categoryHeaders: [
        { text: "Category", value: "category" },
        { text: "Total Tasks", value: "totalTasks" },
        { text: "Completed Tasks", value: "completed" },
        { text: "Incomplete Tasks", value: "incomplete" },
        { text: "Expired Tasks", value: "expired" },
        { text: "Expected Hours", value: "expectedHours" },
        { text: "Taken Hours", value: "takenHours" },
      ],
    };
  },
  computed: {
    internalDialog: {
      get() {
        return this.dialog;
      },
      set(value) {
        this.$emit("update:dialog", value);
      },
    },
  },
  methods: {
    async fetchReportData() {
      try {
        const currentMonthYear = `${String(new Date().getMonth() + 1).padStart(
          2,
          "0"
        )}-${new Date().getFullYear()}`;
        const projectId = "YOUR_PROJECT_ID";

        const tasksResponse = await axios.get(
          `/api/tasks?project_id=${projectId}&month_year=${currentMonthYear}`
        );
        const tasks = tasksResponse.data;

        // Process data for employee report
        const employeeData = {};
        const categoryData = {};

        tasks.forEach((task) => {
          const employeeId = task.employee.$oid;
          const category = task.category.$numberInt;
          const status = task.status.$numberInt;
          const expectedTime = task.expected_time.$numberInt;
          const takenTime = task.taken_time ? task.taken_time.$numberInt : 0;

          // Employee Report
          if (!employeeData[employeeId]) {
            employeeData[employeeId] = {
              completed: 0,
              incomplete: 0,
              expired: 0,
              expectedHours: 0,
              takenHours: 0,
            };
          }

          if (status == 2) {
            employeeData[employeeId].completed += 1;
          } else if (status == 1) {
            employeeData[employeeId].incomplete += 1;
          } else if (status == 0) {
            employeeData[employeeId].expired += 1;
          }

          employeeData[employeeId].expectedHours += expectedTime;
          employeeData[employeeId].takenHours += takenTime;

          // Category Report
          if (!categoryData[category]) {
            categoryData[category] = {
              totalTasks: 0,
              completed: 0,
              incomplete: 0,
              expired: 0,
              expectedHours: 0,
              takenHours: 0,
            };
          }

          categoryData[category].totalTasks += 1;

          if (status == 2) {
            categoryData[category].completed += 1;
          } else if (status == 1) {
            categoryData[category].incomplete += 1;
          } else if (status == 0) {
            categoryData[category].expired += 1;
          }

          categoryData[category].expectedHours += expectedTime;
          categoryData[category].takenHours += takenTime;
        });

        // Format data for tables
        this.employeeReport = Object.keys(employeeData).map((employeeId) => ({
          employee: employeeId,
          ...employeeData[employeeId],
        }));

        this.categoryReport = Object.keys(categoryData).map((category) => ({
          category,
          ...categoryData[category],
        }));
      } catch (error) {
        console.error("Error fetching report data", error);
      }
    },
  },
  watch: {
    internalDialog(newVal) {
      if (newVal) {
        this.fetchReportData();
      }
    },
  },
};
</script>
