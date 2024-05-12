import service from "./Service";

function signup(user) {
  service.post("/signup", user).then((response) => {
    setUser(response);
  });
}
function login(loginData) {
  return service
    .post("/login", loginData)
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
  localStorage.clear();
}

function getUser() {
  return JSON.parse(localStorage.getItem("user"));
}
function changePassword(data) {
  return service
    .patch("/changePassword", data, {
      headers: {
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("user")).token,
      },
    })
    .then((response) => response);
}
function updateInfo(data) {
  return service
    .patch("/updateInfo", data, {
      headers: {
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("user")).token,
      },
    })
    .then((response) => response);
}
export default {
  signup,
  login,
  logout,
  getUser,
  setUser,
  changePassword,
  updateInfo,
};
