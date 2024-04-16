import axios from "axios";
const dataServiceBaseUrl = "http://localhost:3000/users";

function signup(user) {
  axios.post(dataServiceBaseUrl + "/signup", user).then((response) => {
    setUser(response);
  });
}
function setUser(res) {
  localStorage.setItem("user", JSON.stringify(res.data));
  return res.data;
}
export default {
  signup,
  setUser,
};
