<template>
  <v-app class="about">
    <v-img
  :width="300"
  aspect-ratio="16/9"
  cover
  src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
  ></v-img>
    <h1>This is an login page</h1>
    <div class="container">
      <div class="row">
        <div class="col-sm"></div>
        <div class="col-sm">
          <form>
            <div class="form-group">
              <label for="exampleInputEmail1">Email address</label>
              <input type="email" v-model="username" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
              <small id="emailHelp" class="form-text text-muted" >We'll never share your email with anyone else.</small>
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Password</label>
              <input type="password" v-model="password" class="form-control" id="exampleInputPassword1" placeholder="Password" />
            </div>
            <button type="button" @click="login()" class="btn btn-primary">Submit</button>
          </form>
        </div>
        <div class="col-sm"></div>
      </div>
    </div>
  </v-app>
</template>

<script>
import { firebase } from 'firebase/app';

export default {
  name: "login",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    login() {
      console.log("login..." + this.username)

      firebase
        .auth()
        .signInWithEmailAndPassword(this.username, this.password)
        .then(function(result) {
          console.log("Uspjesna prijava", result);
        }).catch(function(e) {
          console.error('Greska: ', e);
        });

    },
  },
}
</script>