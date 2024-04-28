<template>
  <v-container fluid class="mx-0 pa-0">
    <v-row
      class="d-flex justify-center align-center pt-4"
      style="background-color: #e5dfff"
    >
      <v-col cols="12" class="text-center pb-0">
        <v-avatar size="100">
          <img
            :src="store.user.photo"
            alt="User Image"
            style="object-fit: contain; width: 165%; height: 165%"
          />
        </v-avatar>
        <h3>{{ userName }}</h3>
        <p class="mb-0">{{ userRole }}</p>
      </v-col>

      <v-tabs
        v-model="tab"
        color="deep-purple-accent-4"
        align-tabs="center"
        style="background-color: #e5dfff"
      >
        <v-tab :value="1">Personal info</v-tab>
        <v-tab :value="2">Change password</v-tab>
      </v-tabs>
    </v-row>
    <v-window v-model="tab" class="pt-8">
      <v-window-item v-show="tab === 1" :key="1" :value="1">
        <v-container fluid class="pt-0">
          <v-row class="d-flex justify-center align-center">
            <v-col cols="4">
              <v-form
                v-model="form"
                @submit.prevent="onSubmit"
                validate-on="blur"
              >
                <v-text-field
                  v-model="role"
                  :readonly="loading"
                  :rules="[required, validRole]"
                  class="mb-4"
                  clearable
                  label="Role"
                  type="role"
                  placeholder="Enter your role"
                  outline-color="black"
                  variant="outlined"
                ></v-text-field>
                <v-text-field
                  v-model="phone"
                  :readonly="loading"
                  :rules="[required, validPhoneNumber]"
                  class="mb-4"
                  clearable
                  label="Phone"
                  type="phone"
                  placeholder="Enter your phone number"
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
                  v-model="anniversary"
                  :readonly="loading"
                  :rules="[required, validAnniversary]"
                  class="mb-4"
                  clearable
                  label="Work anniversary"
                  type="anniversary"
                  placeholder="Enter your work anniversary"
                  outline-color="black"
                  variant="outlined"
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
                >
                  Save
                </v-btn>
              </v-form>
            </v-col>
          </v-row>
        </v-container>
      </v-window-item>

      <v-window-item v-show="tab === 2" :key="2" :value="2">
        <v-container fluid class="pt-0">
          <v-row class="d-flex justify-center align-center">
            <v-col cols="4">
              <v-form
                v-model="form"
                @submit.prevent="onSubmit"
                validate-on="blur"
              >
                <v-text-field
                  v-model="currentPassword"
                  :readonly="loading"
                  :rules="[required]"
                  class="mb-4"
                  clearable
                  label="Current password"
                  type="password"
                  placeholder="Enter your current password"
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
                  type="password"
                  placeholder="Enter your password"
                  outline-color="black"
                  variant="outlined"
                ></v-text-field>

                <v-text-field
                  v-model="repeatPassword"
                  :readonly="loading"
                  :rules="[required]"
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
                >
                  Save
                </v-btn>
              </v-form>
            </v-col>
          </v-row>
        </v-container>
      </v-window-item>
    </v-window>
  </v-container>
</template>

<script>
import store from "../store";
import AuthService from "@/services/AuthService";
let user = JSON.parse(localStorage.getItem("user"));

export default {
  name: "MyAccount",
  data: () => ({
    tab: null,
    form: false,
    store,
    userName: store.user.name + " " + store.user.surname,
    userRole: store.user.role,
    email: user.data.user.email,
    phone: store.user.phone,
    userType: store.user.userType,
    role: store.user.role,
    anniversary: store.user.anniversary,
    password: null,
    repeatPassword: null,
    currentPassword: null,
    loading: false,
  }),
  methods: {
    async onSubmit() {
      if (!this.form) return;

      this.loading = true;

      store.user.email = this.email;
      //store.user.password = this.password;
      try {
        if (this.tab === 2) {
          await this.changePassword();
        }
      } catch (error) {
        console.log(error);
      }
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

    validPhoneNumber(v) {
      if (/^\d{10,15}$/.test(v)) return true;

      return "Broj telefona/mobitela mora biti ispravan.";
    },

    async changePassword() {
      const data = {
        email: user.data.user.email,
        currentPassword: this.currentPassword,
        password: this.password,
        repeatPassword: this.repeatPassword,
      };
      console.log(data);
      const response = await AuthService.changePassword(data);
      if (response.status === 200) {
        alert("The password has successfully been changed!");
      } else {
        alert("An error occured. Please try again.");
      }
    },
    oldPassword(v) {
      if (v == store.user.password) return true;

      return "Password is incorrect.";
    },

    checkPassword(v) {
      if (v == this.password) return true;

      return "Your password doesn't match.";
    },
  },
};
</script>
