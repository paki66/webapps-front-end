<template>
  <v-dialog v-model="internalDialog" max-width="600px">
    <v-card>
      <v-card-title>
        <span class="headline">Create new project</span>
      </v-card-title>
      <v-text-field label="New project name"></v-text-field>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green">Create</v-btn>
        <v-btn color="red" @click="internalDialog = false">Close</v-btn>
        
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
    props: {
    dialog: Boolean
  },
  computed: {
    internalDialog: {
      get() {
        return this.dialog;
      },
      set(value) {
        this.$emit('update:dialog', value);
      }
    }
  }
};
</script>

<style scoped>
/* Add your styles here */
</style>
