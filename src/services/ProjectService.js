import { projectService } from "./Service";

async function getManagerProjects(userId) {
  try {
    const response = await projectService.get(
      "/ownerProjects?userId=" + userId,
      {
        headers: {
          Authorization:
            "Bearer " + JSON.parse(localStorage.getItem("user")).token,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
}
async function getEmployeeProjects(userId) {
  try {
    const response = await projectService.get(
      "/employeeProjects?userId=" + userId,
      {
        headers: {
          Authorization:
            "Bearer " + JSON.parse(localStorage.getItem("user")).token,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
}

async function createProject(projectData) {
  try {
    const response = await projectService.post("/", projectData, {
      headers: {
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("user")).token,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export default {
  getManagerProjects,
  getEmployeeProjects,
  createProject,
};
