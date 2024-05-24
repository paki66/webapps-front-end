import service from "./Service";

async function getAllStatuses() {
  try {
    const response = await service.get("/userStatuses", {
      headers: {
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("user")).token,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

export default {
  getAllStatuses,
};
