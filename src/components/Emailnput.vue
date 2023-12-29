<template>
    <v-text-field
          v-model="email"
          label="Email"
          type="email"
          placeholder="name.example@gmail.com"
          outline-color="black"
          variant="outlined"
          required
        ></v-text-field>
</template>

<script>
export default {
  data() {
    return {
      email: '',
    };
  },
};
</script>