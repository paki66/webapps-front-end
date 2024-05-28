<template>
    <v-card-item>{{task.name}}  {{task.status}}</v-card-item> 
</template>

<script>
export default ({
  props: ["task"]
});
</script>