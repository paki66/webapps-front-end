import { userService } from "./Service";

function changeUserStatus(data) {
  return userService
    .patch("/changeStatus", data, {
      headers: {
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("user")).token,
      },
    })
    .then((response) => {
      setUserStatus(data.statusId);
      return response;
    });
}

function setUserStatus(id) {
  localStorage.setItem("userStatus", JSON.stringify(id));
}

function getUserStatus() {
  return JSON.parse(localStorage.getItem("userStatus"));
}

async function getStatus(email) {
  try {
    const response = await userService.get("/changeStatus", {
      headers: {
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("user")).token,
      },
      params: {
        email: email,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user status:", error);
    throw error;
  }
}
function changePassword(data) {
  return userService
    .patch("/changePassword", data, {
      headers: {
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("user")).token,
      },
    })
    .then((response) => response);
}

async function getUserInfo(userId) {
  try {
    const response = await userService.get("/userInfo?userId=" + userId, {
      headers: {
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("user")).token,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user info:", error);
    throw error;
  }
}
function updateInfo(data) {
  return userService
    .patch("/userInfo", data, {
      headers: {
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("user")).token,
      },
    })
    .then((response) => response);
}

async function deleteProfile(_id) {
  try {
    const response = await userService.delete("/deleteProfile?_id=" + _id, {
      headers: {
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("user")).token,
      },
    });
    return response;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

export default {
  setUserStatus,
  getUserStatus,
  changeUserStatus,
  changePassword,
  getUserInfo,
  updateInfo,
  getStatus,
  deleteProfile,
};
