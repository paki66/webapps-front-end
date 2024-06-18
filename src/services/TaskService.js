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

async function putTask(taskData) {
  try {
    const response = await tasksService.put("/", taskData, {
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

async function postTask(taskData) {
  try {
    const response = await tasksService.post("/", taskData, {
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

async function patchTaskEmployee(taskData) {
  try {
    const response = await tasksService.patch("/employeeEdit", taskData, {
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

async function deleteTask(id) {
  try {
    const response = await tasksService.delete("/?id=" + id, {
      headers: {
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("user")).token,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
}

async function getTasksForReport(taskData) {
  try {
    const queryString = new URLSearchParams(taskData).toString();

    const response = await tasksService.get("/getReportTasks?" + queryString, {
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
  getProjectTasks,
  putTask,
  postTask,
  deleteTask,
  getTasksForReport,
  patchTaskEmployee,
};
