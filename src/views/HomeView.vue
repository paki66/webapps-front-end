<template>
  <LogiImage />
</template>

<script>
import { defineComponent } from 'vue';

// Components
import LoginImage from '../components/LoginImage.vue';

export default defineComponent({
  name: 'HomeView',

  components: {
    LoginImage,
  },
});
</script>
