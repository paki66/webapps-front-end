import { tasksService } from "./Service";

async function getProjectTasks(projectId) {
  try {
    const response = await tasksService.get(
      "/getProjectTasks?projectId=" + projectId,
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
export default { getProjectTasks };
