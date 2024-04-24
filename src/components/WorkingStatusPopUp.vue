<template>
  <form @submit.prevent="onSubmit">
    <v-row justify="center">
      <v-dialog v-model="dialog" persistent width="20%">
        <v-card>
          <v-card-title>
            <span class="text-h5">What's your status?</span>
          </v-card-title>
          <v-list>
            <v-radio-group v-model="radios">
              <v-list-item v-for="(item, index) in status" :key="index">
                <v-list-item-content>
                  <v-radio :value="index"
                    ><template v-slot:label>
                      <div class="custom-radio-label">
                        {{ item.status }}
                        <v-icon class="ml-1" :color="item.color" size="small">{{
                          item.icon
                        }}</v-icon>
                      </div>
                    </template></v-radio
                  >
                </v-list-item-content>
              </v-list-item>
            </v-radio-group>
          </v-list>
          <v-btn color="blue-darken-1" variant="text" @click="closeDialog">
            Close
          </v-btn>
          <v-btn color="blue-darken-1" variant="text" @click="onSubmit">
            Save
          </v-btn>
        </v-card>
      </v-dialog>
    </v-row>
  </form>
</template>

<script>
import store from "../store.js";
import AuthService from "@/services/AuthService";
import ProfileService from "../services/ProfileService";
export default {
  name: "WorkingStatus",
  data: () => ({
    dialog: true,
    loading: false,
    radios: 0,
    status: store.userStatus,
  }),
  methods: {
    closeDialog() {
      this.dialog = false;
      this.$emit("close");
    },
    onSubmit() {
      this.loading = true;
      let user = AuthService.getUser().data.user;
      ProfileService.changeUserStatus({
        userId: user._id,
        statusId: this.radios,
      });

      this.closeDialog();
    },
  },
};
</script>
<style scoped>
.custom-radio-label {
  display: flex;
  align-items: center;
}
</style>
