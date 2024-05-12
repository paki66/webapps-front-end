import service from "./Service";
const config = {
  headers: {
    Authorization: "Bearer " + JSON.parse(localStorage.getItem("user")).token,
  },
};

function changeUserStatus(data) {
  service.patch("/changeStatus", data, config).then((response) => {
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
