<template>
    <v-text-field
          v-model="password"
          :readonly="loading"
          :rules="[required, checkPassword]"
          clearable
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