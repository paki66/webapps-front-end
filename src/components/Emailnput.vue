<template>
    <v-text-field
          v-model="email"
          label="Email"
          type="email"
          outlined
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