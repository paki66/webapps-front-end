<template>
  <br>
  <v-row>
    <v-col 
    cols="3"
    class=" d-flex align-center justify-center blue lighten-5 "
    >
      <h1> Fipugram </h1>
    </v-col>
    <v-col cols="4">
    </v-col>
    <v-col cols="4">
      <v-select
        :items="items"
        density="comfortable"
        label="Projects"
    ></v-select>
    </v-col>
  </v-row>
  <hr style="height:4px; width:90%; text-align:left; margin-left:5%; color:black; background-color:black">
  <v-row>
    <v-col cols="1">
    </v-col>
    <v-col cols="3">
      <main-button> 
        New task +
      </main-button>
    </v-col>
    
  </v-row>
</template>


<script>
import MainButton from '@/components/MainButton.vue';
export default {
  components: { MainButton },
  name: "MainPage",
};
</script>
