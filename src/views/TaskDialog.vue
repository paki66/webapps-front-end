<template>
  <div class="pa-4 text-center">
    <v-dialog
      v-model="dialog"
      max-width="600"
    >
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn
          v-bind="activatorProps"
        >{{buttonText}}</v-btn>
      </template>

      <v-card
        prepend-icon="mdi-account"
        title="Add/edit task"
      >
        <v-card-text>
          <v-row dense>
            <v-col
              cols="12"
              md="4"
              sm="6"
            >
              <v-text-field
                v-model="employee"
                label="Empoloyee"
                required
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              md="4"
              sm="6"
            >
              <v-text-field
                hint="example of helper text only on focus"
                label="Title"
                v-model="taskTitle"
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              md="4"
              sm="6"
            >
              <v-text-field
                v-model="takenTime"
                label="Taken time"
                persistent-hint
                required
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              md="4"
              sm="6"
            >
              <v-text-field
                label="Expected time"
                required
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              md="4"
              sm="6"
            >
              <v-select
                :items="['completed', 'expired', 'to-do']"
                label="Status"
                v-model="defaultStatus"
              ></v-select>
            </v-col>

            <v-col
              cols="12"
              sm="6"
            >
              <v-select
              v-model="category"
                :items="['new feature', 'bug', 'defect']"
                label="Category"
                required
              ></v-select>
            </v-col>

            
          </v-row>
          <v-label>Set deadline</v-label>
          <v-date-picker></v-date-picker>

        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            text="Close"
            variant="plain"
            @click="dialog = false"
          ></v-btn>

          <v-btn
            color="primary"
            text="Save"
            variant="tonal"
            @click="determine"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import TaskService from '@/services/TaskService';
import data from '@/data';

export default {
  props: {
    title: String,
    content: Object,
    showTaskDialog: Boolean,
    buttonText: String,
    project_id: String,
    
  },
  data() {
    return {
        defaultStatus: "to-do",
      formData: { ...this.data },
      dialog:false,
      employee: "",
        taskTitle: "",
        takenTime: "",
        category: "",
        status: "",
        deadline: new Date(),
        expectedTime: "",
        
    };
  },
  methods: {
    submit() {
      console.log('Submitted data:', this.formData);
      this.$emit('close');
    },
    determine() {
        this.dialog = false
        if (this.buttonText == "EDIT") {
            editTask()
        }
        else{
            createTask()
        }
    }, 
    async editTask() {
      try {
        const response = await TaskService.putTask({
          
        });
        this.internalDialog = false;
      } catch (error) {
        console.error("Error creating project:", error);
      }
    },
    async createTask() {
        const month = deadline.getUTCMonth + 1
        const year = this.deadline.getUTCFullYear

        try {
        const response = await TaskService.postTask({
          project_id: this.project_id._id,
          title: this.title,
          month_year: `${month}-${year}`,
          employee: this.employee,
          category: this.category,
          status: this.status,
          deadline: this.deadline,
          expected_time: this.expectedTime,
          taken_time: this.takenTime
        });
        this.internalDialog = false;
      } catch (error) {
        console.error("Error creating task:", error);
      }
    }
  },
};
</script>

<style>
.dialog {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
}
.dialog-content {
  background: white;
  padding: 20px;
  border-radius: 5px;
}
</style>