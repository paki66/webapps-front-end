<template>
    <v-text-field
          v-model="password"
          label="Password"
          type="password"
          outlined
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