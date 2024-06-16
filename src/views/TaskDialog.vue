<template>
  <div class="pa-4 text-center">
    <v-dialog v-model="dialog" max-width="600" persistent>
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn v-bind="activatorProps">{{ buttonText }}</v-btn>
      </template>

      <v-card prepend-icon="mdi-account" title="Add/edit task">
        <v-card-text>
          <v-row dense>
            <v-col cols="12" md="4" sm="6">
              <v-text-field
                v-model="employee"
                label="Employee"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="4" sm="6">
              <v-text-field v-model="title" label="Title"></v-text-field>
            </v-col>
            <v-text-field
              v-model="taken_time"
              label="Taken time"
            ></v-text-field>

            <v-col cols="12" md="4" sm="6">
              <v-text-field
                v-model="expected_time"
                label="Expected time"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="4" sm="6">
              <v-select
                v-model="status"
                :items="statusItems"
                required
                item-value="index"
                item-text="title"
                label="Status"
              ></v-select>
            </v-col>

            <v-col cols="12" sm="6">
              <v-select
                v-model="category"
                :readonly="loading"
                class="mb-4"
                clearable
                label="Category"
                placeholder="Select the category"
                :items="categoryItems"
                item-value="index"
                item-text="title"
                required
              ></v-select>
            </v-col>
          </v-row>
          <v-label>Set deadline</v-label>
          <v-date-picker v-model="deadline"></v-date-picker>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text="Close" variant="plain" @click="dialog = false"></v-btn>

          <v-btn
            color="primary"
            text="Save"
            variant="tonal"
            @click="handleSave"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import store from "@/store";
export default {
  props: {
    title: String,
    content: Object,
    showTaskDialog: Boolean,
    buttonText: String,
    isEdit: Boolean,
    taskId: String,
  },
  data() {
    return {
      statusItems: store.taskStatus.map((item, index) => ({
        index,
        title: item.status,
      })),
      categoryItems: store.taskCategory.map((item, index) => ({
        index,
        title: item.category,
      })),

      employee: null,
      title: null,
      taken_time: null,
      expected_time: null,
      status: null,
      category: null,
      deadline: null,

      dialog: false,
    };
  },
  methods: {
    closeDialog() {
      this.dialog = false;
      this.$emit("close");
    },
    handleSave() {
      if (this.isEdit) {
        this.$emit("update", {
          task_id: this.taskId,
          employee: this.employee,
          title: this.title,
          taken_time: this.taken_time,
          expected_time: this.expected_time,
          status: this.status,
          category: this.category,
          deadline: this.deadline,
        });
      } else {
        this.$emit("create", {
          employee: this.employee,
          title: this.title,
          taken_time: this.taken_time,
          expected_time: this.expected_time,
          status: this.status,
          category: this.category,
          deadline: this.deadline,
        });
      }
      this.closeDialog();
    },
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
