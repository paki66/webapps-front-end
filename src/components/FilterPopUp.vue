<template>
  <v-dialog v-model="dialog" max-width="900" persistent>
    <v-card>
      <v-card-title class="d-flex justify-space-between align-center">
        <span class="text-h5">Filter your tasks</span>

        <v-btn class="custom-button" text @click="closeDialog">
          <v-icon class="custom-icon" icon="mdi-close-thick"></v-icon>
        </v-btn>
      </v-card-title>
      <v-container>
        <v-row>
          <v-col cols="12" md="6" class="pb-0">
            <v-subheader class="text-subtitle-1 font-weight-medium"
              >Filter by status</v-subheader
            >
            <v-select
              v-model="status"
              :readonly="loading"
              class="mb-4"
              clearable
              label="Status"
              placeholder="Select the status"
              :items="statusItems"
              item-value="index"
              item-text="title"
              variant="underlined"
            ></v-select>

            <v-subheader class="text-subtitle-1 font-weight-medium"
              >Filter by category</v-subheader
            >
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
              variant="underlined"
            ></v-select>
            <v-card-actions>
              <v-btn class="filter-button" @click="onSubmit">Filter</v-btn>
            </v-card-actions>
          </v-col>
          <v-col cols="12" md="6" class="pa-0">
            <v-subheader class="text-subtitle-1 font-weight-medium"
              >Filter by date</v-subheader
            >
            <v-date-picker
              v-model="date"
              color="purple"
              label="Select date"
              class="pb-0"
            ></v-date-picker>
          </v-col>
        </v-row>
      </v-container>
      <v-row justify="center"> </v-row>
    </v-card>
  </v-dialog>
</template>

<script>
import store from "@/store";

export default {
  data() {
    return {
      dialog: false,

      statusItems: store.taskStatus.map((item, index) => ({
        index,
        title: item.status,
      })),
      categoryItems: store.taskCategory.map((item, index) => ({
        index,
        title: item.category,
      })),

      status: null,
      category: null,
      date: null,
    };
  },
  methods: {
    onSubmit() {
      this.$emit("filter", {
        status: this.status,
        category: this.category,
        date: this.date,
      });
      this.closeDialog();
    },
    closeDialog() {
      this.dialog = false;
      this.$emit("close");
    },
  },
  mounted() {
    this.dialog = true;
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

.filter-button {
  background-color: purple;
  color: white;
}
.custom-icon {
  color: black;
}
</style>
