<script setup>
  import LoginImage from './components/LoginImage.vue';
  import EmailInput from './components/Emailnput.vue';
  import PasswordInput from './components/PasswordInput.vue';
  import MainButton from './components/MainButton.vue';
</script>


<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  }),
};
</script>
