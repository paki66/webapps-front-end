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
                <v-select
                  v-model="userType"
                  :readonly="loading"
                  :rules="[required]"
                  class="mb-4"
                  clearable
                  label="Job type"
                  placeholder="Select your job type"
                  :items="[
                    'Junior Developer',
                    'Mid-Level Developer',
                    'Senior Developer',
                    'Project Manager',
                    'Data Analyst',
                    'Data Scientist',
                  ]"
                  outline-color="black"
                  variant="outlined"
                ></v-select>

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

                <br />

                <v-btn
                  :loading="loading"
                  block
                  color="black"
                  size="large"
                  @click="dialog = true"
                  variant="elevated"
                >
                  Delete your ORGanize profile
                </v-btn>

                <v-dialog v-model="dialog" width="500">
                  <v-card>
                    <v-card-title class="headline grey lighten-2" primary-title>
                      Delete your ORGanize profile?
                    </v-card-title>

                    <v-card-text>
                      Are you sure you want to delete your ORGanize profile?
                      This action cannot be undone.
                    </v-card-text>

                    <v-divider></v-divider>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="primary" text @click="dialog = false">
                        Cancel
                      </v-btn>
                      <v-btn color="red" text @click="deleteProfile">
                        Confirm
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
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
import ProfileService from "@/services/ProfileService";

export default {
  name: "MyAccount",

  data: () => {
    let user = AuthService.getUser();
    return {
      tab: null,
      form: false,
      dialog: false,
      store,
      userName: null,
      userRole: null,
      _id: user._id,
      loggedEmail: user.email,
      email: null, // null
      phone: null,
      userType: null,
      anniversary: null,
      password: null,
      repeatPassword: null,
      currentPassword: null,
      loading: false,
    };
  },

  async beforeMount() {
    let response = await ProfileService.getUserInfo(this.loggedEmail);
    let results = response.data;

    this.userName = results.name + " " + results.surname;
    this.userRole = results.role;
    this.email = results.email;
    this.phone = results.phone;
    this.userType = results.userType;
    this.anniversary = results.anniversary;
  },

  methods: {
    async onSubmit() {
      if (!this.form) return;

      this.loading = true;

      store.user.email = this.email;
      //store.user.password = this.password;
      try {
        if (this.tab === 1) {
          await this.updateInfo();
        }
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

      return "Wrong phone number format.";
    },

    async changePassword() {
      const data = {
        loggedEmail: this.loggedEmail,
        currentPassword: this.currentPassword,
        password: this.password,
        repeatPassword: this.repeatPassword,
      };
      const response = await ProfileService.changePassword(data);
      if (response.status === 200) {
        alert(
          "The password has successfully been changed! Log in with your new password."
        );
        AuthService.logout();
        this.$router.push({ name: "login" });
      } else {
        alert(response.status, "An error occured. Please try again.");
      }
    },
    oldPassword(v) {
      if (v == store.user.password) return true;

      return "Password is incorrect.";
    },
    async updateInfo() {
      const data = {
        loggedEmail: this.loggedEmail,
        email: this.email,
        phone: this.phone,
        userType: this.userType,
        anniversary: this.anniversary,
      };
      const response = await ProfileService.updateInfo(data);
      if (response.status === 200) {
        alert("Your profile has been successfully updated!");
      } else {
        alert("An error occured. Please try again.");
      }
    },

    async deleteProfile() {
      try {
        this.loading = true;
        const response = await ProfileService.deleteProfile(this._id);
        this.loading = false;
        this.dialog = false;

        if (response.status === 200) {
          alert(
            "You have successfully deleted your profile. You will be redirected to ORGanize homepage."
          );
        }
        AuthService.logout();
        this.$router.push({ name: "home" });
      } catch (error) {
        this.loading = false;
        this.dialog = false;
        console.error("Failed to delete profile: ", error);
      }
    },
    checkPassword(v) {
      if (v == this.password) return true;

      return "Your password doesn't match.";
    },
  },
};
</script>
