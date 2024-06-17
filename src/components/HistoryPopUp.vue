<template>
  <v-dialog v-model="internalDialog" max-width="auto">
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
                :items="employeeReport"
                class="elevation-1"
              ></v-data-table>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <h3>Report by Task Category</h3>
              <v-data-table
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
import store from "@/store";

export default {
  props: {
    dialog: Boolean,
    projectId: String,
  },
  data() {
    return {
      employeeReport: [],
      categoryReport: [],
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

        const taskData = {
          projectId: this.projectId,
          month_year: currentMonthYear,
        };

        const tasksResponse = await TaskService.getTasksForReport(taskData);
        const tasks = tasksResponse.data;

        this.employeeReport = tasksResponse.employeeReport;

        this.categoryReport = tasksResponse.categoryReport.map((report) => {
          const categoryIndex = parseInt(report.category, 10);
          const category = store.taskCategory.find(
            (cat) => cat.index === categoryIndex
          );
          return {
            ...report,
            category: category ? category.category : report.category,
          };
        });
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
