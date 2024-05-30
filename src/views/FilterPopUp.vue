<template>
  <v-dialog v-model="internalDialog" max-width="600px">
    <v-card>
      <v-card-title>
        <span class="headline">Filter through tasks</span>
      </v-card-title>


      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red" @click="internalDialog = false">Close</v-btn>
        
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>


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
  }
};
</script>