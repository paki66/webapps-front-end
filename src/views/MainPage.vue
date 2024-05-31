<template>
  <br>
  <v-row>
    <v-col 
    cols="3"
    class=" d-flex align-center justify-center blue lighten-5 "
    >
      <h1> Project </h1>
    </v-col>
    <v-col cols="4">
    </v-col>
    <v-col cols="4">

      <v-select
        v-model="select"
        :hint="`${select.naziv}`"
        :items="projects"
        item-title="naziv"
        label="Select"
        persistent-hint
        return-object
        single-line
        @input="handleDropdownChange"
      ></v-select>

    </v-col>
  </v-row>
  <hr style="height:4px; width:90%; text-align:left; margin-left:5%; color:black; background-color:black">
  <v-row>
    <v-col cols="1">
    </v-col>

    <v-col cols="2">
      <main-button 
      @click="showNewProjectPopUp = true"
      size="large" 
      block
      >
        New project 
      <v-icon icon="mdi-plus">
        </v-icon> 
        
      </main-button>
      <new-project-pop-up :dialog="showNewProjectPopUp" @update:dialog="showNewProjectPopUp = $event"></new-project-pop-up>
    </v-col>

    <v-col cols="2">
      <v-btn size="large" block
      @click="showSearchPopUp = true"> 
        <v-icon 
        icon="mdi-magnify"
        color="black"
        >
        </v-icon>
        Search
      </v-btn>
      <search-pop-up :dialog="showSearchPopUp" @update:dialog="showSearchPopUp = $event"></search-pop-up>
    </v-col>

    <v-col cols="2">
      <v-btn size="large" @click="showStatusPopUp = true" block> 
        <v-icon 
        icon="mdi-account"
        color="black" 
        >
        </v-icon>
        Person status
      </v-btn>
      <status-pop-up :dialog="showStatusPopUp" @update:dialog="showStatusPopUp = $event"></status-pop-up>
    </v-col>

     <v-col cols="2">
      <v-btn size="large" @click="showFilterPopUp = true" block> 
        <v-icon 
        icon="mdi-filter"
        color="black"
        >
        </v-icon>
        Filter
      </v-btn>
      <filter-pop-up :dialog="showFilterPopUp" @update:dialog="showFilterPopUp = $event"></filter-pop-up>
    </v-col>
     <v-col cols="2">
      <v-btn size="large" block=""
      @click="showHistoryPopUp = true"> 
        <v-icon 
        icon="mdi-clock"
        color="black"
        >
        </v-icon>
        History
      </v-btn>
      <history-pop-up :dialog="showHistoryPopUp" @update:dialog="showHistoryPopUp = $event"></history-pop-up>
    </v-col>
  </v-row>

  
 
  <v-row>
    <v-col cols="1">
    </v-col>
    <v-col cols="10">
      <ul>
        <month
          :month="month"
          v-for="(month, month_index) in months" 
          :key="month_index">
        
        </month>
      </ul>

    </v-col>
  </v-row>

  <br>

  <v-row>
    <v-col cols="1">
    </v-col>

    <v-col cols="2">
      <v-btn 
      append-icon="mdi-plus"
      size="x-large"
      >
        Add month
      </v-btn>
    </v-col>
  </v-row>

</template>


<script>
import MainButton from '@/components/MainButton.vue';
import Month from '@/components/Month.vue';
import NewProjectPopUp from '@/views/NewProjectPopUp.vue';
import StatusPopUp from './StatusPopUp.vue';
import FilterPopUp from './FilterPopUp.vue';
import SearchPopUp from './SearchPopUp.vue';
import HistoryPopUp from './HistoryPopUp.vue';
import data from '@/data';

function extractNames(data) {
  let names = [];
  data.project.forEach(user => {
    if (user.naziv) {
      names.push(user.naziv);
    }
  });
  console.log(names)
  return names
}

export default {
  components: { MainButton, Month, NewProjectPopUp, StatusPopUp, SearchPopUp, FilterPopUp, HistoryPopUp},
  name: "MainPage",
  data() {
    return {
      data,
      projects: extractNames(data),
      showNewProjectPopUp: false,
      showStatusPopUp: false,
      showSearchPopUp: false,
      showFilterPopUp: false,
      showHistoryPopUp: false,
      select: { naziv: data.project[0].naziv},
      months: data.project[select].taskovi
    }
  },
  methods: {
    handleDropdownChange() {
      
      console.log(`Selected option: ${this.selectedOption}`);
    }
  },
};
</script>
