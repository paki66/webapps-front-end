<template>
    
    <v-card>
        <v-card-title>
            {{month.name}}
        </v-card-title>
        <ul>
            <task
                  :task="task"
                  v-for="(task, task_index) in month.tasks" 
                  :key="task_index"
               ></task>
        </ul>
        <div class="form-container" v-show="showFormContainer">
        <form @submit.prevent="submitForm">
            <!-- Your form fields go here -->
            <label >Name:</label> <br>
            <button type="submit">Submit</button>
        </form>
        </div>
        <v-card-actions>
            <v-btn  @click="showForm" append-icon="mdi-plus">
                Add task
            </v-btn>        
        </v-card-actions>
    </v-card>

</template>

<script>
import Task from "./Task.vue"
export default {
    props: ["month", "task"],
    components: {Task},
    data() {
        return {
            showFormContainer: false
        }
    },
    methods: {
      showForm() {
        // Show the form container
        this.showFormContainer = true;
      },
      submitForm() {
        // Handle form submission logic here
        console.log('Form submitted with data:', this.formData);
        // Reset form data
        this.formData.name = '';
        this.formData.email = '';
        // Hide the form container
        this.showFormContainer = false;
      }
    }
}
</script>
