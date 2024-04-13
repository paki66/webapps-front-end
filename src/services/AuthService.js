import axios from "axios";
const dataServiceBaseUrl = "http://localhost:3000/users";

function signup(user) {
  axios.post(dataServiceBaseUrl + "/signup", user).then((response) => {
    response.data;
  });
}
function login(loginData) {
  return axios
    .post(dataServiceBaseUrl + "/login", loginData)
    .then((response) => {
      if (response.status === 200) {
        localStorage.setItem("user", JSON.stringify(response.data));
        return response.data;
      } else {
        throw new Error(response.data.message);
      }
    })
    .catch((error) => {
      alert(
        `Error: ${error.response ? error.response.data.message : error.message}`
      );
      return Promise.reject(error);
    });
}
function logout() {
  localStorage.removeItem("user");
}

function getUser() {
  return JSON.parse(localStorage.getItem("user"));
}
export default {
  signup,
  login,
  logout,
  getUser,
};
