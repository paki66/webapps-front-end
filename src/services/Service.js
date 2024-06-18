import axios from "axios";

const userService = axios.create({
  baseURL: "https://webapps-back-end.vercel.app/users",
});

const projectService = axios.create({
  baseURL: "https://webapps-back-end.vercel.app/api/projects",
});

const tasksService = axios.create({
  baseURL: "https://webapps-back-end.vercel.app/api/tasks",
});

export { userService, projectService, tasksService };
