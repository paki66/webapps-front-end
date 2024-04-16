import axios from "axios";
const dataServiceBaseUrl = "http://localhost:3000/users";

function signup(user) {
  axios.post(dataServiceBaseUrl + "/signup", user).then((response) => {
    setUser(response);
  });
}
function login(loginData) {
  return axios
    .post(dataServiceBaseUrl + "/login", loginData)
    .then((response) => {
      if (response.status === 200) {
        setUser(response);
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
function setUser(res) {
  localStorage.setItem("user", JSON.stringify(res.data));
  return res.data;
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
  setUser,
};
