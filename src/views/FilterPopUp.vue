<template>
  <v-dialog v-model="internalDialog" max-width="600px">
    <v-card>
      <v-card-title>
        <span class="headline">Filter through tasks</span>
      </v-card-title>
      <br>
        <v-row>
          <v-col cols="6">
        <h5>Task status</h5>
              <label>
        <input type="checkbox" v-model="group1.selectedOptions" value="Option 1"> to-do  
      </label>
      <label>
        <input type="checkbox" v-model="group1.selectedOptions" value="Option 2"> completed
      </label>
      <label>
        <input type="checkbox" v-model="group1.selectedOptions" value="Option 3"> expired
      </label>

          </v-col>
          <v-col cols="6">
        <h5>Task category</h5>
      <label>
        <input type="checkbox" v-model="group2.selectedOptions" value="Option A"> new feature
      </label>
      <label>
        <input type="checkbox" v-model="group2.selectedOptions" value="Option B"> bug
      </label>
      <label>
        <input type="checkbox" v-model="group2.selectedOptions" value="Option C"> defect
      </label>
          </v-col>
     </v-row>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red" @click="internalDialog = false">Close</v-btn>
        
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { ref } from 'vue';
import Datepicker from 'vue3-datepicker';

export default {
  props: {
    dialog: Boolean,
    height: {
      type: String,
      default: '800px',
    },
  },
  components: {
    'vue-datepicker': Datepicker,
  },
  setup() {
    const group1 = ref({
      selectedOptions: [],
    });

    const group2 = ref({
      selectedOptions: [],
    });
    const dateFormat = 'yyyy-MM-dd';

    return {
      group1,
      group2,
      dateFormat,
    };
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

<style scoped>
label {
  display: block;
  margin-bottom: 5px;
}

</style>