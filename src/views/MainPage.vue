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
    <div>
      {{ select.months }}
    </div>
  </v-row>

</template>


<script>
import MainButton from '@/components/MainButton.vue';
export default {
  components: { MainButton },
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
};
</script>
