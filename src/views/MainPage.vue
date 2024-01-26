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
  <hr style="height:4px; width:90%; text-align:left; margin-left:5%; color:black; background-color:black">
  <v-row>
    <v-col cols="1">
    </v-col>

    <v-col cols="2">
      <main-button size="large" block> 
        New project 
      <v-icon icon="mdi-plus">
        </v-icon> 
      </main-button>
    </v-col>

    <v-col cols="2">
      <v-btn size="large" block> 
        <v-icon 
        icon="mdi-magnify"
        color="black"
        >
        </v-icon>
        Search
      </v-btn>
    </v-col>

    <v-col cols="2">
      <v-btn size="large" block=""> 
        <v-icon 
        icon="mdi-account"
        color="black"
        >
        </v-icon>
        Person status
      </v-btn>
    </v-col>

     <v-col cols="2">
      <v-btn size="large" block=""> 
        <v-icon 
        icon="mdi-filter"
        color="black"
        >
        </v-icon>
        Filter
      </v-btn>
    </v-col>
     <v-col cols="2">
      <v-btn size="large" block=""> 
        <v-icon 
        icon="mdi-clock"
        color="black"
        >
        </v-icon>
        History
      </v-btn>
    </v-col>
  </v-row>

  
 
  <v-row>
    <v-col cols="1">
    </v-col>
    <v-col cols="10">
      <month>
      </month>
      <month>
      </month>
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

osobe: [
  {
    "id": "1",
    "name": "mihaela soldat"
  },
  {
    "id": "2",
    "name": "paolo bursic"
  },
  {
    "id": "3",
    "name": "John Doe"
  }
]
task: [
  {
    "id": "1",
    "month_year": "02-2024",
    "person": "1",
    "project": "1",
  },
  {
    "id": "2",
    "month_year": "01-2024",
    "person": "1",
    "project": "1",
  },
  {
    "id": "3",
    "month_year": "02-2024",
    "person": "2",
    "project": "1",
  },
  {
    "id": "4",
    "month_year": "02-2024",
    "person": "2",
    "project": "2",
  }
]

projekti: [
  {
    "id": "1",
    "title": "Fipugram",
  },
  {    
    "id": "2",
    "title": "rukovnik",
  },
  {
    "id": "3",
    "title": "ORGanize",
  }
]


export default {
  components: { MainButton, Month},
  name: "MainPage",
  data () {
    return {
      select: { title: 'Fipugram',
                months: [
                  {name: 'January', year: '2024'},
                  {name: 'February', year: '2024'},
                  {name: 'March', year:'2024'},
                ] 
              },
      projekti: [
        { title: 'Fipugram',
          months: [
                  {name: 'January', year: '2024'},
                  {name: 'February', year: '2024'},
                  {name: 'March', year:'2024'},
                ] },
        { title: 'Rukovnik',
          months: [
                  {name: 'January', year: '2024'},
                  {name: 'February', year: '2024'},
                ] },
        { title: 'ORGanize',
          months: [
                  {name: 'January', year: '2024'},
                ] },
      ],
    }
  },
  methods: {
    handleDropdownChange() {
      
      console.log(`Selected option: ${this.selectedOption}`);
    },
  },
};
</script>
