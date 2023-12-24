<script setup>
  import LoginImage from './components/LoginImage.vue';
  import EmailInput from './components/Emailnput.vue';
  import PasswordInput from './components/PasswordInput.vue';
  import MainButton from './components/MainButton.vue';
</script>


<template>
  <v-app>
    <v-main>
      <v-container fluid>
        <v-row>
            <v-col cols="12" md="6" class="d-flex align-center justify-center">
              <div> 
                <h1>
                  Welcome to ORGanize
                </h1>
                <p align="center">
                  Begin new era in your life.
                </p>
                <br>
                <br>
                <EmailInput/>
                <PasswordInput label="password"/>
                <PasswordInput label="repeat password"/>
                <MainButton style="display: flex; justify-content: center; width: 400px;">
                  Continue
                </MainButton>
                <br>
                <br>
                <v-row class="mt-auto, justify-center" >
                  <p :style="{'font-size': '20px'}">Already have an account?</p>
                  <v-btn inline variant="text"
                  style="color:blue; padding-top: 0px;" >
                    Login
                  </v-btn>
                </v-row>
              </div> 
            </v-col>
            <v-col cols="12" md="6">
              <LoginImage/>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app> 
</template>

 
