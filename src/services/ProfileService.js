import service from "./Service";

function changeUserStatus(data) {
  return service
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
    const response = await service.get("/changeStatus", {
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
  return service
    .patch("/changePassword", data, {
      headers: {
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("user")).token,
      },
    })
    .then((response) => response);
}

async function getUserInfo(email) {
  try {
    const response = await service.get("/userInfo", {
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
    console.error("Error fetching user info:", error);
    throw error;
  }
}
function updateInfo(data) {
  return service
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
    const response = await service.delete("/deleteProfile", {
      headers: {
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("user")).token,
      },
      params: {
        _id: _id,
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
