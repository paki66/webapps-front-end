<template>
  <div>
    <v-dialog v-model="dialogProp" max-width="500">
      <v-card>
        <v-card-title>New Project</v-card-title>

        <v-card-text>
          <!-- Your form content goes here -->
          <v-form @submit.prevent="submitForm">
            <v-text-field v-model="formData.name" label="Name" required></v-text-field>
            <v-text-field v-model="formData.email" label="Email" required type="email"></v-text-field>

            <!-- Add more form fields as needed -->

            <v-btn type="submit" color="primary">Submit</v-btn>
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-btn @click="closePopup" color="error">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      formData: {
        name: '',
        email: '',
        // Add more form fields as needed
      },
    };
  },
  computed: {
    dialogProp: {
        get() {
            return this.value;
        },
        set(newValue) {
        this.$emit('input', newValue);
      },
    }
  },
  methods: {
    closePopup() {
      this.$emit('input', false);
    },
    submitForm() {
      
      // Close the popup after submission
      this.closePopup();
    },
  },
};
</script>

<style scoped>
/* Add your styles here */
</style>
