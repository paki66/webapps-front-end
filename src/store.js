import { reactive } from "vue";
const store = reactive({
  user: {
    id: 1,
    name: "John",
    surname: "Doe",
    userType: "manager",
    role: "Senior developer",
    phone: "052123456",
    email: "john.doe@gmail.com",
    password: "Abc123.?!",
    anniversary: "1.1.2022",
    photo:
      "https://static.vecteezy.com/system/resources/thumbnails/010/260/479/small/default-avatar-profile-icon-of-social-media-user-in-clipart-style-vector.jpg",
    status: 0,
  },
  userStatus: [
    { status: "Active", icon: "mdi-circle", color: "#00ff44" },
    { status: "Don't disturb", icon: "mdi-minus-circle-off", color: "#ff0000" },
    {
      status: "Out of office",
      icon: "mdi-arrow-right-circle",
      color: "#1303fc",
    },
    { status: "Be right back", icon: "mdi-account-clock", color: "#fc9003" },
    { status: "Off sick", icon: "mdi-emoticon-sick", color: "#4d7050" },
    { status: "Working remotely", icon: "mdi-home", color: "#000000" },
    { status: "On a vacation", icon: "mdi-airplane", color: "#3189e8" },
  ],
});

export default store;
