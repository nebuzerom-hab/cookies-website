import { Routes, Route } from "react-router-dom";
import AuthProvider from "./components/context/AuthContext.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";

import Home from "./components/pages/home.jsx";
import Login from "./components/pages/Login.jsx";
import Signup from "./components/pages/signup.jsx";
import OrdersPage from "./components/pages/Orders/OrdersPage.jsx";
import GuestOrder from "./components/pages/Orders/GuestOrder.jsx";
import AboutUs from "./components/pages/aboutus.jsx";
import ContactUs from "./components/pages/contactus.jsx";
import AdminDashboard from "./components/pages/AdminDashboard.jsx";
import Unauthorized from "./components/pages/unauthorized.jsx";
import Menu from "./components/pages/product/menu.jsx";
function App() {
  return (
    <AuthProvider>
      {" "}
      {/* ✅ Only keep this */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />

        {/* ✅ Protected routes */}
        <Route
          path="/userlist"
          element={
            <PrivateRoute allowedRoles={["Admin"]}>
              <AdminDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <PrivateRoute allowedRoles={["Admin", "Customer"]}>
              <OrdersPage />
            </PrivateRoute>
          }
        />

        <Route path="/guest-order" element={<GuestOrder />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="*" element={<Unauthorized />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
