import axios from "axios";
const dataServiceBaseUrl = "http://localhost:3000/users";

function signup(user) {
  axios.post(dataServiceBaseUrl + "/signup", user).then((response) => {
    response.data;
  });
}
function login(loginData) {
  axios.post(dataServiceBaseUrl + "/login", loginData).then((response) => {
    response.data;
  });
}
export default {
  signup,
  login,
};
