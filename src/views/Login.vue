<template>
  <v-container fluid fill-height>
    <v-row no-gutters>
      <!-- Left Column for Signup -->
      <v-col
        cols="12"
        md="6"
        class="d-flex align-center justify-center blue lighten-5"
      >
        <v-container class="pt-0">
          <v-row class="d-flex justify-center align-center">
            <v-col cols="6">
              <v-row justify="center">
                <v-img
                  src="@/assets/logo.png"
                  alt="Logo"
                  max-height="200"
                  max-width="300"
                ></v-img>
              </v-row>
              <v-row justify="center" class="my-0 text-center">
                <h2 class="mb-10">Log in to continue</h2>
              </v-row>

              <v-form
                v-model="form"
                @submit.prevent="onSubmit"
                validate-on="blur"
              >
                <v-text-field
                  v-model="email"
                  :readonly="loading"
                  :rules="[required]"
                  class="mb-4"
                  clearable
                  label="Email"
                  type="email"
                  placeholder="Enter your email"
                  outline-color="black"
                  variant="outlined"
                ></v-text-field>

                <v-text-field
                  v-model="password"
                  :readonly="loading"
                  :rules="[required]"
                  class="mb-4"
                  clearable
                  label="Password"
                  placeholder="Enter your password"
                  outline-color="black"
                  variant="outlined"
                  type="password"
                ></v-text-field>

                <br />

                <v-btn
                  :disabled="!form"
                  :loading="loading"
                  block
                  color="black"
                  size="large"
                  type="submit"
                  variant="elevated"
                  @click="login()"
                >
                  Log In
                </v-btn>

                <v-row justify="center">
                  <p class="mt-10 mb-2">
                    Don't have an account?
                    <a
                      @click="$router.push('/signup')"
                      :style="{
                        color: 'blue',
                        textDecoration: 'underline',
                        cursor: 'pointer',
                      }"
                      >Sign up</a
                    >
                  </p>
                </v-row>
              </v-form>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
      <v-col cols="12" md="6" class="d-flex align-center justify-center">
        <v-img
          src="https://aimlief.com/wp-content/uploads/2019/11/featured-tiny-png-101.png"
          height="95vh"
          width="100%"
          cover
        ></v-img>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import AuthService from "@/services/AuthService";
export default {
  name: "LoginVue",
  data: () => ({
    form: false,
    email: null,
    password: null,
    loading: false,
  }),

  methods: {
    onSubmit() {
      if (!this.form) return;

      this.loading = true;

      setTimeout(() => (this.loading = false), 2000);
    },
    required(v) {
      return !!v || "Field is required";
    },
    async login() {
      try {
        let userData = {
          email: this.email,
          password: this.password,
        };
        let result = await AuthService.login(userData);
        console.log(result); // Add this line
        console.log(localStorage.getItem("user"));
        let user = AuthService.getUser();
        console.log(user);
        this.$router.push("/mainpage");
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
