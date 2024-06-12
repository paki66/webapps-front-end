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
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              md="4"
              sm="6"
            >
              <v-text-field
                hint="example of persistent helper text"
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

export default {
  props: {
    title: String,
    content: Object,
    showTaskDialog: Boolean,
    buttonText: String
  },
  data() {
    return {
        defaultStatus: "to-do",
      formData: { ...this.data },
      dialog:false
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
    editTask() {
        console.log("adr")
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