import service from "./Service";

function changeUserStatus(data) {
  service
    .patch("/changeStatus", data, {
      headers: {
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("user")).token,
      },
    })
    .then((response) => {
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
