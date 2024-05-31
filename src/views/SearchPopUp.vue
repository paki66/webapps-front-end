<template>
  <v-dialog v-model="internalDialog" max-width="600px">
    <v-card>
      <v-card-title>
        <span class="headline">Search users or tasks </span>
      </v-card-title>
      <input id="search-bar" type="text" v-model="input" placeholder="Search" @input="updateFilteredList"/>
      <div class="item object" v-for="object in filteredList" :key="object">
        <p>{{ object }}</p>
      </div>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red" @click="internalDialog = false">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import data from '../data';

function extractNames(data) {
  let names = [];

  // Extract names from users
  data.users.forEach(user => {
    if (user.ime) {
      names.push(user.ime);
    }
  });

  // Extract names from tasks
  data.task.forEach(task => {
    if (task.ime) {
      names.push(task.ime);
    }
})
  // Extract names from projects

  return names;
}

export default {
  data() {
    return {
      data,
      input: "",
      filteredList: []
    }
  },
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
  methods: {
    updateFilteredList() {
      let searchData = extractNames(this.data);
      this.filteredList = searchData.filter(object =>
        object.toLowerCase().includes(this.input.toLowerCase())
      );
    }
  },
  watch: {
    input() {
      this.updateFilteredList();
    }
  },
  mounted() {
    this.filteredList = extractNames(this.data);
  }
};
</script>
