import { createRouter, createWebHistory } from "vue-router";
import Homepage from "../views/Homepage.vue";
import Login from "../views/Login.vue";
import Signup from "../views/Signup.vue";
import MyAccount from "../views/MyAccount.vue";
import MainPage from "../views/MainPage.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: Homepage,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/signup",
    name: "signup",
    component: Signup,
  },
  {
    path: "/myaccount",
    name: "myaccount",
    component: MyAccount,
  },
  {
    path: "/mainpage",
    name: "mainpage",
    component: MainPage,
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
