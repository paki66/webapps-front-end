<template>
    <v-text-field
          v-model="password"
          type="password"
          outline-color="black"
          variant="outlined"
          required
        ></v-text-field>
</template>

<script>
export default {
  data() {
    return {
      password: '',
    };
  },
};
</script>