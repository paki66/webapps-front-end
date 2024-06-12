<template>
  <v-dialog v-model="internalDialog" max-width="600px">
    <v-card>
      <v-card-title>
        <span class="headline">Create new project</span>
      </v-card-title>
      <v-text-field v-model="projectName" label="New project name"></v-text-field>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green">Create</v-btn>
        <v-btn color="red" @click="internalDialog = false">Close</v-btn>
        
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import createProject from "@/services/ProjectService"
export default {
    props: {
    dialog: Boolean
  },
  data() {
    return {
      projectName: ''
    }
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
  },
  methods: {
    async handleCreate() {
      try {
        const response = await createProject({ name: this.projectName }); 
        this.internalDialog = false; 
      } catch (error) {
        console.error('Error creating project:', error);
      }
    }
  }
};
</script>

<style scoped>
/* Add your styles here */
</style>
