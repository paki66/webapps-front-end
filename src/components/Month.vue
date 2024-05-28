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
            
        <v-card-actions>
            <v-btn append-icon="mdi-plus">
                Add task
            </v-btn>        
        </v-card-actions>
    </v-card>

</template>

<script>
import Task from "./Task.vue"
export default {
    props: ["month", "task"],
    components: {Task}
}
</script>
