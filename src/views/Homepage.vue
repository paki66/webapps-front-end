<template>
  <v-toolbar class="d-flex mt-3" color="white">
    <v-col cols="2" class="me-auto">
      <v-img src="@/assets/logo.png"></v-img>
    </v-col>
    <v-col cols="2" class="text-end">
      <v-btn variant="text" color="black" :to="{ path: '/login' }">
        Log in
      </v-btn>
    </v-col>
  </v-toolbar>
  <v-row class="d-flex align-center justify-center mt-10">
    <v-col>
      <v-img src="@/assets/womanworking.png"></v-img>
    </v-col>
    <v-col class="text-center">
      <h1>
        Welcome to ORGanize: Your Ultimate Task Management Solution for
        Businesses
      </h1>
      <p>
        Effortlessly manage tasks and customize workflows with ORGanize. Our
        intuitive platform streamlines task creation and real-time
        collaboration. Elevate your business productivity – sign up for ORGanize
        today!
      </p>
      <v-col cols="5" class="mx-auto">
        <v-btn
          block
          color="black"
          size="large"
          type="submit"
          variant="elevated"
          append-icon="mdi-arrow-right"
          :to="{ path: '/signup' }"
        >
          Get started
          <template v-slot:append>
            <v-icon color="white"></v-icon>
          </template> </v-btn
      ></v-col>
    </v-col>
    <v-col>
      <v-img src="@/assets/manworking.png"></v-img>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "Homepage",
};
</script>
