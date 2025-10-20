// user-service.js
import API from "./api.js";

const userService = {
  registerUser: (data) => API.post("/users", data),
  loginUser: (data) => API.post("/login", data),
  getUsers: () => API.get("/users"),
  updateUser: (id, data) => API.put(`/users/${id}`, data),
  deleteUser: (id) => API.delete(`/users/${id}`),
  updateUserRole: (id, newRole) =>
    API.put(`/users/${id}/role`, { role: newRole }),
};

export default userService;
