import React, { useState, useEffect } from "react";
import orderService from "../../Services/order-service.js";
import { useAuth } from "../../context/AuthContext.jsx";

const CreateOrder = ({ onOrderCreated }) => {
  const { isLogged, token, user } = useAuth();

  const [form, setForm] = useState({
    first_name: isLogged ? user.user_firstName : "",
    last_name: isLogged ? user.user_lastName : "",
    email: isLogged ? user.user_email : "",
    phone: "",
    address: "",
    address_2: "",
    city: "",
    state: "",
    zip_code: "",
    shipping_option: "",
    delivery_date: "",
    habesha_cookies_quantity: 0,
    baklava_quantity: 0,
    almunium_phoil_quantity: 0,
    packaging_type: "small",
    special_instructions: "",
    total_price: 0,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successOrder, setSuccessOrder] = useState(null); // ✅ store successful order info

  // Calculate total price whenever quantities change
  useEffect(() => {
    const total =
      form.habesha_cookies_quantity * 3.5 +
      form.baklava_quantity * 4 +
      form.almunium_phoil_quantity * 6;
    setForm((prev) => ({ ...prev, total_price: total.toFixed(2) }));
  }, [
    form.habesha_cookies_quantity,
    form.baklava_quantity,
    form.almunium_phoil_quantity,
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: [
        "habesha_cookies_quantity",
        "baklava_quantity",
        "almunium_phoil_quantity",
      ].includes(name)
        ? Number(value)
        : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!form.delivery_date) {
      setError("Please select a delivery date.");
      setLoading(false);
      return;
    }

    try {
      const data = {
        ...form,
        user_id: isLogged ? user.user_id : null,
      };

      const res = await orderService.createOrder(data, isLogged ? token : null);

      // ✅ Store success info and show success view
      setSuccessOrder({
        orderId: res.data.orderId,
        total: form.total_price,
        email: form.email,
        date: form.delivery_date,
      });

      // Do NOT refresh orders table immediately
    } catch (err) {
      console.error("Create Order error:", err);
      setError("Failed to create order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Handle creating another order
  const handleCreateAnother = () => {
    setSuccessOrder(null); // show the form again
    if (onOrderCreated) onOrderCreated(); // refresh orders table now
    // Reset form fields
    setForm((prev) => ({
      ...prev,
      habesha_cookies_quantity: 0,
      baklava_quantity: 0,
      almunium_phoil_quantity: 0,
      total_price: 0,
      special_instructions: "",
      address: "",
      address_2: "",
      city: "",
      state: "",
      zip_code: "",
      phone: "",
      shipping_option: "",
      delivery_date: "",
    }));
  };

  // ✅ Success view
  if (successOrder) {
    return (
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg mx-auto text-center mt-10">
        <h2 className="text-2xl font-bold text-green-600 mb-4">
          Order Submitted Successfully!
        </h2>
        <p className="text-gray-700 mb-2">Thank you for your order.</p>
        <p className="text-gray-700 mb-2">
          Confirmation sent to:{" "}
          <span className="font-semibold">{successOrder.email}</span>
        </p>

        <div className="border-t border-gray-300 mt-4 pt-4 text-left">
          <h3 className="font-bold mb-2">Order Summary</h3>
          <p>
            <strong>Order ID:</strong> #{successOrder.orderId}
          </p>
          <p>
            <strong>Total Price:</strong> ${successOrder.total}
          </p>
          <p>
            <strong>Delivery Date:</strong>{" "}
            {new Date(successOrder.date).toLocaleDateString()}
          </p>
        </div>

        <p className="mt-4 text-gray-600">
          We'll process your order and contact you if we need additional info.
        </p>
        <p className="mt-2 text-gray-600">
          Need help? Call +1 (571) 580-9245 or email{" "}
          <span className="font-medium">habeshacookies@gmail.com</span>
        </p>

        <div className="flex justify-center mt-6 gap-4">
          <button
            onClick={() => window.print()}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Print Order
          </button>
          <button
            onClick={handleCreateAnother}
            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
          >
            Create Another Order
          </button>
        </div>
      </div>
    );
  }

  // ✅ Default form view
  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-lg mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">New Order</h2>

      {error && <p className="text-red-600 mb-4 text-center">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Name */}
        <div className="flex gap-2">
          <input
            type="text"
            name="first_name"
            value={form.first_name}
            onChange={handleChange}
            placeholder="First Name"
            className="border p-2 flex-1"
            required
          />
          <input
            type="text"
            name="last_name"
            value={form.last_name}
            onChange={handleChange}
            placeholder="Last Name"
            className="border p-2 flex-1"
            required
          />
        </div>

        {/* Email & Phone */}
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="border p-2 w-full"
          required
        />
        <input
          type="tel"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone"
          className="border p-2 w-full"
          required
        />

        {/* Address */}
        <input
          type="text"
          name="address"
          value={form.address}
          onChange={handleChange}
          placeholder="Address"
          className="border p-2 w-full"
          required
        />
        <input
          type="text"
          name="address_2"
          value={form.address_2}
          onChange={handleChange}
          placeholder="Address 2 (optional)"
          className="border p-2 w-full"
        />

        <div className="grid grid-cols-3 gap-2">
          <input
            type="text"
            name="city"
            value={form.city}
            onChange={handleChange}
            placeholder="City"
            className="border p-2 w-full"
            required
          />
          <input
            type="text"
            name="state"
            value={form.state}
            onChange={handleChange}
            placeholder="State"
            className="border p-2 w-full"
            required
          />
          <input
            type="text"
            name="zip_code"
            value={form.zip_code}
            onChange={handleChange}
            placeholder="ZIP"
            className="border p-2 w-full"
            required
          />
        </div>

        {/* Shipping & Delivery */}
        <input
          type="text"
          name="shipping_option"
          value={form.shipping_option}
          onChange={handleChange}
          placeholder="Shipping Option"
          className="border p-2 w-full"
        />
        <input
          type="date"
          name="delivery_date"
          value={form.delivery_date}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />

        {/* Quantities with labels */}
        <div className="space-y-2">
          <label className="block font-medium text-gray-700">
            Habesha Cookies Quantity
          </label>
          <input
            type="number"
            name="habesha_cookies_quantity"
            value={form.habesha_cookies_quantity}
            onChange={handleChange}
            min={0}
            className="border p-2 w-full"
          />

          <label className="block font-medium text-gray-700">
            Baklava Quantity
          </label>
          <input
            type="number"
            name="baklava_quantity"
            value={form.baklava_quantity}
            onChange={handleChange}
            min={0}
            className="border p-2 w-full"
          />

          <label className="block font-medium text-gray-700">
            Aluminum Phoil Quantity
          </label>
          <input
            type="number"
            name="almunium_phoil_quantity"
            value={form.almunium_phoil_quantity}
            onChange={handleChange}
            min={0}
            className="border p-2 w-full"
          />
        </div>

        {/* Packaging & Instructions */}
        <select
          name="packaging_type"
          value={form.packaging_type}
          onChange={handleChange}
          className="border p-2 w-full"
        >
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
        </select>
        <textarea
          name="special_instructions"
          value={form.special_instructions}
          onChange={handleChange}
          placeholder="Special instructions"
          className="border p-2 w-full"
        />

        {/* Total & Submit */}
        <p className="font-bold text-lg">Total: ${form.total_price}</p>
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600"
        >
          {loading ? "Submitting..." : "Create Order"}
        </button>
      </form>
    </div>
  );
};

export default CreateOrder;
