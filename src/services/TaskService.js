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
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
}

async function putTask() {

}

async function postTask() {

}

export default { getProjectTasks, putTask, postTask };
