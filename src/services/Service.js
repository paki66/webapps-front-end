import axios from "axios";

const userService = axios.create({
  baseURL: "http://localhost:3000/users",
});

const projectService = axios.create({
  baseURL: "http://localhost:3000/api/projects",
});

const tasksService = axios.create({
  baseURL: "http://localhost:3000/api/tasks",
});

export { userService, projectService, tasksService };
