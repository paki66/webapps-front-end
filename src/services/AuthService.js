import ProfileService from "./ProfileService";
import { userService } from "./Service";

function signup(user) {
  service.post("/signup", user).then((response) => {
    setUser(response);
  });
}
function login(loginData) {
  return userService
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
  const user = {
    _id: res.data.data.user._id,
    email: res.data.data.user.email,
    token: res.data.token,
  };
  localStorage.setItem("user", JSON.stringify(user));
  return res.data;
}

async function logout() {
  let email = getUser().email;
  let status = await ProfileService.getStatus(email);
  if (status.data != 4 && status.data != 6) {
    await ProfileService.changeUserStatus({
      userId: getUser()._id,
      statusId: 2,
    });
  }

  localStorage.clear();
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
