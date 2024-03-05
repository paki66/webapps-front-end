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
                <h2 class="mb-10">Welcome to ORGanize!</h2>
              </v-row>
              <v-form
                v-model="form"
                @submit.prevent="onSubmit"
                validate-on="blur"
              >
                <v-text-field
                  v-model="name"
                  :readonly="loading"
                  :rules="[required]"
                  class="mb-4"
                  clearable
                  label="Name"
                  type="text"
                  placeholder="Enter your name"
                  outline-color="black"
                  variant="outlined"
                ></v-text-field>

                <v-text-field
                  v-model="surname"
                  :readonly="loading"
                  :rules="[required]"
                  class="mb-4"
                  clearable
                  label="Surname"
                  type="text"
                  placeholder="Enter your surname"
                  outline-color="black"
                  variant="outlined"
                ></v-text-field>
                <v-text-field
                  v-model="email"
                  :readonly="loading"
                  :rules="[required, validEmail]"
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
                  :rules="[required, minLength]"
                  class="mb-4"
                  clearable
                  label="Password"
                  placeholder="Enter your password"
                  outline-color="black"
                  variant="outlined"
                  type="password"
                ></v-text-field>

                <v-text-field
                  v-model="repeatPassword"
                  :readonly="loading"
                  :rules="[required, checkPassword]"
                  clearable
                  label="Repeated password"
                  placeholder="Repeat your password"
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
                  @click="signUp()"
                >
                  Sign In
                </v-btn>

                <v-row justify="center">
                  <p class="mt-10 mb-2">
                    Already have an account?
                    <a
                      @click="$router.push('/login')"
                      :style="{
                        color: 'blue',
                        textDecoration: 'underline',
                        cursor: 'pointer',
                      }"
                      >Log in</a
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
          height="100%"
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
  name: "SignupVue",
  data: () => ({
    form: false,
    name: null,
    surname: null,
    email: null,
    password: null,
    repeatPassword: null,
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
    minLength(v) {
      if (v?.length > 5) return true;

      return "Password needs to be at least 6 digits.";
    },
    validEmail(v) {
      if (/.+@.+..+/.test(v)) return true;

      return "E-mail must be valid.";
    },
    checkPassword(v) {
      if (v == this.password) return true;

      return "Your password doesn't match.";
    },
    async signUp() {
      try {
        let user = {
          name: this.name,
          surname: this.surname,
          email: this.email,
          password: this.password,
          repeatPassword: this.repeatPassword,
        };
        let result = await AuthService.signup(user);
        this.$router.push("/mainpage");
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
