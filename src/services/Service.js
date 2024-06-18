import axios from "axios";

const userService = axios.create({
  baseURL: "https://webapps-back-end-1.onrender.com/users",
});

const projectService = axios.create({
  baseURL: "https://webapps-back-end-1.onrender.com/api/projects",
});

const tasksService = axios.create({
  baseURL: "https://webapps-back-end-1.onrender.com/api/tasks",
});

export { userService, projectService, tasksService };
