<template>
  <v-dialog v-model="internalDialog" max-width="600px">
    <v-card>
      <v-card-title>
        <span class="headline">Popup with Tabs</span>
      </v-card-title>
      <v-tabs v-model="activeTab">
        <v-tab v-for="tab in tabs" :key="tab">{{ tab }}</v-tab>
      </v-tabs>
      <v-tabs-items v-model="activeTab">
        <v-tab-item v-for="tab in tabs" :key="tab">
          <v-card-text>
            <component :is="tabComponents[tab]"></component>
          </v-card-text>
        </v-tab-item>
      </v-tabs-items>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="internalDialog = false">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import NewProjectPopUp from './NewProjectPopUp.vue';

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
  components: {NewProjectPopUp},
  activeTab: 0,
      tabs: ['Tab 1', 'Tab 2', 'Tab 3', 'Tab 4'],
      tabComponents: {
        'Tab 1': NewProjectPopUp,
        'Tab 2': true,
        'Tab 3': true,
        'Tab 4': true
      }
};
</script>