<template>
  <br />
  <v-row>
    <v-col cols="4" class="d-flex align-center justify-center">
      <h1>Project overview</h1>
    </v-col>
    <v-col cols="3"> </v-col>
    <v-col cols="4">
      <v-select
        v-model="select"
        :hint="`${select ? select.title : ''}`"
        :items="allProjects"
        item-title="title"
        label="Select"
        persistent-hint
        return-object
        single-line
      ></v-select>
    </v-col>
  </v-row>
  <hr
    style="
      height: 4px;
      width: 90%;
      text-align: left;
      margin-left: 5%;
      color: black;
      background-color: black;
    "
  />
  <v-row>
    <v-col cols="1"> </v-col>

    <v-col cols="2">
      <main-button @click="showNewProjectPopUp = true" size="large" block>
        New project
        <v-icon icon="mdi-plus"> </v-icon>
      </main-button>
      <new-project-pop-up
        :dialog="showNewProjectPopUp"
        @update:dialog="showNewProjectPopUp = $event"
      ></new-project-pop-up>
    </v-col>

    <v-col cols="2">
      <v-btn size="large" block @click="showPersonStatus = true">
        <v-icon icon="mdi-account" color="black"> </v-icon>
        Employee Status
        <EmployeeStatus
          v-if="showPersonStatus"
          @close="showPersonStatus = false"
        ></EmployeeStatus>
      </v-btn>
      <status-pop-up
        :dialog="showStatusPopUp"
        @update:dialog="showStatusPopUp = $event"
      ></status-pop-up>
    </v-col>

    <v-col cols="2">
      <v-btn size="large" block @click="showFilter = true">
        <v-icon icon="mdi-filter" color="black"> </v-icon>
        Filter
      </v-btn>
      <FilterPopUp
        v-if="showFilter"
        @close="showFilter = false"
        @filter="onFilter"
      ></FilterPopUp>
    </v-col>
    <v-col cols="2">
      <v-btn size="large" block="" @click="showHistoryPopUp = true">
        <v-icon icon="mdi-clock" color="black"> </v-icon>
        History
      </v-btn>
      <history-pop-up
        :dialog="showHistoryPopUp"
        @update:dialog="showHistoryPopUp = $event"
      ></history-pop-up>
    </v-col>
    <v-col cols="2">
      <v-card class="mx-auto" color="surface-light" max-width="400">
        <v-card-text class="pa-0">
          <v-text-field
            v-model="keyword"
            :loading="loading"
            append-inner-icon="mdi-magnify"
            density="compact"
            label="Search tasks by title"
            variant="solo"
            hide-details
            single-line
            clearable
            @click:append-inner="searchByTitle"
          ></v-text-field>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>

  <v-row justify="end">
    <v-col cols="3">
      <v-btn append-icon="mdi-cancel" height="40px" @click="clearFilters">
        Clear all filters
        <template v-slot:append>
          <v-icon color="warning"></v-icon>
        </template>
      </v-btn>
    </v-col>
  </v-row>
  <v-row v-if="filteredTasks !== null && filteredTasks.length">
    <v-col cols="1"> </v-col>
    <v-col cols="10">
      <v-card
        v-for="monthData in filteredTasks"
        :key="monthData.month"
        class="mb-4"
      >
        <v-card-title>{{ monthData.month }}</v-card-title>
        <v-card-text>
          <v-list dense>
            <v-list-item v-for="task in monthData.tasks" :key="task.id">
              <v-list-item-content>
                <v-list-item-title>{{ task.name }}</v-list-item-title>
                <v-list-item-subtitle
                  >Title: {{ task.title }}</v-list-item-subtitle
                >
                <v-list-item-subtitle
                  >Category:
                  {{ getCategory(task.category) }}</v-list-item-subtitle
                >
                <v-list-item-subtitle
                  >Employee: {{ task.employee }}</v-list-item-subtitle
                >
                <v-list-item-subtitle
                  >Deadline: {{ task.deadline }}</v-list-item-subtitle
                >
                <v-list-item-subtitle
                  >Expected time: {{ task.expected_time }}</v-list-item-subtitle
                >
                <v-list-item-subtitle
                  >Taken time: {{ task.taken_time }}</v-list-item-subtitle
                >
                <v-list-item-subtitle
                  >Status: {{ getStatus(task.status) }}</v-list-item-subtitle
                >
              </v-list-item-content>
              <v-list-item-action>
                <task-dialog :buttonText="editText"></task-dialog>
                <v-btn>delete</v-btn>
              </v-list-item-action>
            </v-list-item>

          
          </v-list>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
  <v-row v-else>
    <v-col cols="1"></v-col>
    <v-col cols="10">
      <p>No tasks found for this project.</p>
    </v-col>
  </v-row>

  <br />

  <v-row>

    <v-col cols="2">
        <task-dialog
    :buttonText="addText"

    :isOpen="showTaskDialog"
     @close="closeTaskDialog">
  </task-dialog>
    </v-col>
  </v-row>



</template>

<script>
import MainButton from "@/components/MainButton.vue";
import Month from "@/components/Month.vue";
import NewProjectPopUp from "@/views/NewProjectPopUp.vue";
import HistoryPopUp from "./HistoryPopUp.vue";
import data from "@/data";
import EmployeeStatus from "@/components/EmployeeStatus.vue";
import FilterPopUp from "@/components/FilterPopUp.vue";
import AuthService from "@/services/AuthService";
import ProfileService from "@/services/ProfileService";
import ProjectService from "@/services/ProjectService";
import TaskService from "@/services/TaskService";
import store from "@/store";
import TaskDialog from "./TaskDialog.vue";

export default {
  components: {
    MainButton,
    Month,
    NewProjectPopUp,
    EmployeeStatus,
    FilterPopUp,
    HistoryPopUp,
    TaskDialog,
  },
  name: "MainPage",
  data() {
    return {
      data,
      popupDialog: false,
      select: null,
      allProjects: [], //za dropdown
      showNewProjectPopUp: false,
      showPersonStatus: false,
      showHistoryPopUp: false,
      showFilter: false,

      allTasks: [], //svi tasks
      filteredTasks: [],

      dateFilter: [], // očisti se sa butonom clearFilters
      statusFilter: [],
      categoryFilter: [],

      keyword: null,

      showTaskDialog: false,
      editTitle: "Edit task",
      addTitle: "Add new task",
      addText: "Add report",
      editText: "EDIT"
    };
  },
  async beforeCreate() {
    try {
      const userId = AuthService.getUser()._id;
      let response = await ProfileService.getUserInfo(userId);
      let results = response.data;
      const userRole = results.role;

      if (userRole == "Manager") {
        const response = await ProjectService.getManagerProjects(userId);
        this.allProjects = response.data;
        if (this.allProjects) {
          this.select = this.allProjects[0];
        }
      }

      if (userRole == "Employee") {
        const response = await ProjectService.getEmployeeProjects(userId);
        this.allProjects = response.data;
        if (this.allProjects) {
          this.select = this.allProjects[0];
        }
      }
    } catch (error) {
      console.error("Error in created hook:", error);
    }
  },
  watch: {
    select(newProject) {
      this.handleDropdownChange();
    },
  },

  methods: {
    async handleDropdownChange() {
      if (this.select) {
        try {
          const projectId = this.select._id;
          const response = await TaskService.getProjectTasks(projectId);
          this.allTasks = response;
          this.filteredTasks = this.allTasks;
        } catch (error) {
          console.error("Error fetching project tasks:", error);
        }
      }
    },
    onFilter(filterValues) {
      this.statusFilter = filterValues.status;
      this.categoryFilter = filterValues.category;
      this.dateFilter = filterValues.date
        ? new Date(
            filterValues.date.getTime() -
              filterValues.date.getTimezoneOffset() * 60000
          ).toISOString()
        : null;

      this.filteredTasks = [];

      for (var i = 0; i < this.allTasks.length; i++) {
        for (var j = 0; j < this.allTasks[i].tasks.length; j++) {
          if (
            (this.statusFilter === null ||
              this.allTasks[i].tasks[j].status === this.statusFilter) &&
            (this.categoryFilter === null ||
              this.allTasks[i].tasks[j].category === this.categoryFilter) &&
            (this.dateFilter === null ||
              this.allTasks[i].tasks[j].deadline === this.dateFilter)
          ) {
            this.filteredTasks.push(
              JSON.parse(JSON.stringify(this.allTasks[i]))
            );
          }
        }
      }

      console.log("Filtered Tasks: ", this.filteredTasks);
    },

    searchByTitle() {
      this.filteredTasks = [];
      const title = this.keyword;
      for (var i = 0; i < this.allTasks.length; i++) {
        for (var j = 0; j < this.allTasks[i].tasks.length; j++) {
          if (
            this.allTasks[i].tasks[j].title
              .toLowerCase()
              .includes(title.toLowerCase())
          ) {
            this.filteredTasks.push(
              JSON.parse(JSON.stringify(this.allTasks[i]))
            );
          }
        }
      }
    },

    openPopUp() {
      this.popupDialog = true;
    },
    getCategory(index) {
      return store.taskCategory[index]?.category || "Unknown Category";
    },
    getStatus(index) {
      return store.taskStatus[index]?.status || "Unknown Status";
    },
    clearFilters() {
      this.dateFilter = [];
      this.statusFilter = [];
      this.categoryFilter = [];
      this.filteredTasks = this.allTasks;
    },
    openCreateTaskDialog() {
      this.TaskDialogTitle = "Create Component";
      this.TaskDialogData = { name: "", description: "" };
      this.showTaskDialog = true;
    },
    openEditTaskDialog() {
      this.TaskDialogTitle = "Edit Component";
      this.TaskDialogData = {
        name: "Existing Component",
        description: "Some description",
      };
      this.showTaskDialog = true;
    },
    closeTaskDialog() {
      this.showTaskDialog = false;
    },
  },
};
</script>

<style scoped>
h1 {
  text-align: left;
}
</style>
