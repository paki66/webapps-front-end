<template>
  <v-app>
    <v-main>
      <v-toolbar
        class="d-flex pt-1"
        color="#e5dfff"
        v-if="!['signup', 'login', 'home'].includes($route.name)"
      >
        <v-col cols="2" class="me-auto">
          <v-img src="@/assets/logo.png" height="80%" width="80%"></v-img>
        </v-col>
        <v-col cols="2" class="text-end">
          <v-btn @click="openPopUp = true">
            Status
            <WorkingStatusPopUp v-if="openPopUp"></WorkingStatusPopUp>
          </v-btn>
        </v-col>
        <v-col cols="2" class="text-end">
          <v-btn
            variant="text"
            color="transparent"
            :to="{ path: '/myaccount' }"
          >
            <v-icon
              icon="mdi-account-circle"
              color="black"
              size="x-large"
            ></v-icon>
          </v-btn>
        </v-col>
      </v-toolbar>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { useRoute } from "vue-router";
import WorkingStatusPopUp from "./components/WorkingStatusPopUp.vue";

export default {
  components: { WorkingStatusPopUp },
  name: "App",

  data: () => ({
    openPopUp: false,
  }),
};
</script>
