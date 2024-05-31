<template>
  <v-dialog v-model="internalDialog" max-width="600px">
    <v-card>
      <v-card-title>
        <span class="headline">Check status of your co-workers</span>
      </v-card-title>

      <v-card :user="user"
          v-for="(user, index) in data.users" 
          :key="index"> 
          <v-card-title>{{user.ime}} {{user.prezime}} ---  {{user.status}} </v-card-title>
          <v-card-item></v-card-item>
      </v-card>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red" @click="internalDialog = false">Close</v-btn>
        
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import data from "@/data";

export default {
    props: {
    dialog: Boolean
  },
  computed: {
    internalDialog: {
      get() {
        return this.dialog;
      },
      set(value) {
        this.$emit('update:dialog', value);
      }
    }
  },
  data() {
    return {
      data
    }
  }
};
</script>