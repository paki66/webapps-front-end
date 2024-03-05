import axios from "axios";
const dataServiceBaseUrl = "http://localhost:3000/users";

export default {
  signup(user) {
    axios.post(dataServiceBaseUrl + "/signup", user).then((response) => {
      response.data;
    });
  },
};
