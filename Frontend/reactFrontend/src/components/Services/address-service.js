
import API from "./api.js";

const addressService = {
  // Create a new address (guest or logged-in user)
  createAddress: (data) => API.post("/addresses", data),

  // Get all addresses (only works if logged in, admin gets all, user gets their own)
  getAddresses: () => API.get("/addresses"),
};

export default addressService;
