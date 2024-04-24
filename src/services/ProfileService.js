import axios from "axios";
const dataServiceBaseUrl = "http://localhost:3000/users";

function changeUserStatus(data) {
  axios.patch(dataServiceBaseUrl + "/changeStatus", data).then((response) => {
    setUserStatus(data.statusId);
  });
}
function setUserStatus(id) {
  localStorage.setItem("userStatus", JSON.stringify(id));
}

function getUserStatus() {
  return JSON.parse(localStorage.getItem("userStatus"));
}
export default {
  setUserStatus,
  getUserStatus,
  changeUserStatus,
};
