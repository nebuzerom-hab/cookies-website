import { jwtDecode } from "jwt-decode";

const getAuth = (token) => {
  try {
    const jwt = token || localStorage.getItem("token");
    if (!jwt) return null;

    const decoded = jwtDecode(jwt);

    if (decoded.exp && Date.now() >= decoded.exp * 1000) {
      console.warn("Token expired");
      return null;
    }

    return {
      user_token: jwt,
      user_id: decoded.id,
      user_email: decoded.email,
      user_role: decoded.role,
    };
  } catch (err) {
    console.error("Failed to decode token:", err.message);
    return null;
  }
};

export default getAuth;
