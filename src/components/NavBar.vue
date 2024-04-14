<template>
  <v-toolbar
    class="d-flex pt-1"
    color="#e5dfff"
    v-if="!['signup', 'login', 'home'].includes($route.name)"
  >
    <v-col cols="2" class="me-auto">
      <v-img src="@/assets/logo.png" height="80%" width="80%"></v-img>
    </v-col>
    <v-col cols="8"></v-col>

    <v-col class="text-end px-0">
      <v-btn @click="openPopUp = true" class="text-none px-0">
        {{ allStatuses[statusIndex].status }}
        <v-icon
          class="ml-1"
          :color="allStatuses[statusIndex].color"
          size="small"
          >{{ allStatuses[statusIndex].icon }}</v-icon
        >
        <WorkingStatusPopUp
          v-if="openPopUp"
          @close="openPopUp = false"
        ></WorkingStatusPopUp>
      </v-btn>
    </v-col>
    <v-col class="text-end px-0">
      <v-btn variant="text" color="transparent" class="px-0">
        <v-icon
          icon="mdi-playlist-check"
          color="black"
          size="x-large"
        ></v-icon> </v-btn
    ></v-col>
    <v-col class="text-end px-0">
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn variant="text" color="transparent" class="pl-0" v-bind="props">
            <v-icon
              icon="mdi-account-circle"
              color="black"
              size="x-large"
            ></v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item :to="{ path: '/mainpage' }">
            <v-list-item-title>Mainpage</v-list-item-title>
          </v-list-item>
          <v-list-item :to="{ path: '/myaccount' }">
            <v-list-item-title>My profile</v-list-item-title>
          </v-list-item>
          <v-list-item @click="logout" :to="{ path: '/' }">
            <v-list-item-title>Log out</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-col>
  </v-toolbar>
</template>

<script>
import WorkingStatusPopUp from "./WorkingStatusPopUp.vue";
import store from "../store";
import AuthService from "@/services/AuthService";
export default {
  components: { WorkingStatusPopUp },
  name: "NavBar",
  data: () => ({
    openPopUp: false,
    allStatuses: store.userStatus,
  }),
  computed: {
    statusIndex() {
      return store.user.status;
    },
  },
  methods: {
    logout() {
      AuthService.logout();
    },
  },
};
</script>
