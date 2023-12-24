<template>
  <v-container fluid fill-height>
    <v-row no-gutters>
      <!-- Left Column for Signup -->
      <v-col
        cols="12"
        md="6"
        class="d-flex align-center justify-center blue lighten-5"
      >
        <v-card class="w-50">
          <v-container>
            <v-row class="d-flex justify-center align-center">
              <v-col cols="12">
                <v-row justify="center">
                  <v-img
                    src="@/assets/logo.png"
                    alt="Logo"
                    class="mb-4"
                    max-height="200"
                    max-width="300"
                  ></v-img>
                </v-row>
                <v-row justify="center">
                  <h2 class="mb-10">Welcome to ORGanize!</h2>
                </v-row>
                <v-form v-model="form" @submit.prevent="onSubmit">
                  <v-text-field
                    v-model="email"
                    :readonly="loading"
                    :rules="[required]"
                    class="mb-4"
                    clearable
                    label="Email"
                  ></v-text-field>

                  <v-text-field
                    v-model="password"
                    :readonly="loading"
                    :rules="[required]"
                    clearable
                    label="Password"
                    placeholder="Enter your password"
                  ></v-text-field>

                  <br />

                  <v-btn
                    :disabled="!form"
                    :loading="loading"
                    block
                    color="teal-darken-4"
                    size="large"
                    type="submit"
                    variant="elevated"
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
        </v-card>
      </v-col>
      <v-col cols="12" md="6" class="d-flex align-center justify-center">
        <v-img
          src="@/assets/signup_image.jpg"
          height="95vh"
          width="100%"
          cover
        ></v-img>
      </v-col>
    </v-row>
  </v-container>
  <!-- <v-form v-model="form" @submit.prevent="onSubmit">
    <v-card class="mx-auto mt-8 px-6 py-8" max-width="344">
      <v-text-field
        v-model="email"
        :readonly="loading"
        :rules="[required]"
        class="mb-2"
        clearable
        label="Email"
      ></v-text-field>

      <v-text-field
        v-model="password"
        :readonly="loading"
        :rules="[required]"
        clearable
        label="Password"
        placeholder="Enter your password"
      ></v-text-field>

      <br />

      <v-btn
        :disabled="!form"
        :loading="loading"
        block
        color="success"
        size="large"
        type="submit"
        variant="elevated"
      >
        Sign In
      </v-btn>
    </v-card>
  </v-form> -->
</template>

<script>
export default {
  name: "SignupVue",
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
  },
};
</script>
