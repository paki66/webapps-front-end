<template>
  <br />
  <v-row>
    <v-col cols="3" class="d-flex align-center justify-center blue lighten-5">
      <h1>Project</h1>
    </v-col>
    <v-col cols="4"> </v-col>
    <v-col cols="4">
      <v-select
        v-model="select"
        :hint="`${select.title}`"
        :items="projekti"
        item-title="title"
        label="Select"
        persistent-hint
        return-object
        single-line
        @input="handleDropdownChange"
      ></v-select>
    </v-col>
  </v-row>
  <hr
    style="
      height: 4px;
      width: 90%;
      text-align: left;
      margin-left: 5%;
      color: black;
      background-color: black;
    "
  />
  <v-row>
    <v-col cols="1"> </v-col>

    <v-col cols="2">
      <main-button @click="openPopUp" size="large" block>
        New project
        <v-icon icon="mdi-plus"> </v-icon>
      </main-button>
    </v-col>

    <v-col cols="2">
      <v-btn size="large" block>
        <v-icon icon="mdi-magnify" color="black"> </v-icon>
        Search
      </v-btn>
    </v-col>

    <v-col cols="2">
      <v-btn size="large" block @click="showPersonStatus = true">
        <v-icon icon="mdi-account" color="black"> </v-icon>
        Employee Status
        <EmployeeStatus
          v-if="showPersonStatus"
          @close="showPersonStatus = false"
        ></EmployeeStatus>
      </v-btn>
    </v-col>

    <v-col cols="2">
      <v-btn size="large" block="">
        <v-icon icon="mdi-filter" color="black"> </v-icon>
        Filter
      </v-btn>
    </v-col>
    <v-col cols="2">
      <v-btn size="large" block="">
        <v-icon icon="mdi-clock" color="black"> </v-icon>
        History
      </v-btn>
    </v-col>
  </v-row>

  <v-row>
    <v-col cols="1"> </v-col>
    <v-col cols="10">
      <month> </month>
      <month> </month>
    </v-col>
  </v-row>

  <br />

  <v-row>
    <v-col cols="1"> </v-col>

    <v-col cols="2">
      <v-btn append-icon="mdi-plus" size="x-large"> Add month </v-btn>
    </v-col>
  </v-row>
</template>

<script>
import MainButton from "@/components/MainButton.vue";
import Month from "@/components/Month.vue";
import NewProjectPopUp from "@/components/NewProjectPopUp.vue";
import EmployeeStatus from "@/components/EmployeeStatus.vue";

export default {
  components: { MainButton, Month, NewProjectPopUp, EmployeeStatus },
  name: "MainPage",
  data() {
    return {
      popupDialog: false,
      select: { title: "Fipugram" },
      projekti: [
        { title: "Fipugram" },
        { title: "Rukovnik" },
        { title: "ORGanize" },
      ],
      showPersonStatus: false,
    };
  },
  methods: {
    handleDropdownChange() {
      console.log(`Selected option: ${this.selectedOption}`);
    },
    openPopUp() {
      this.popupDialog = true;
    },
  },
};
</script>
