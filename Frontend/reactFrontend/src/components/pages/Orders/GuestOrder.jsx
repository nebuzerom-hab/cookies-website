import React, { useState } from "react";
import orderService from "../../Services/order-service";
import ele from "../../../assets/6.jpg";
import LoginHeader from "../../Header/LoginHeader";

const GuestOrder = () => {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    address: "",
    address_2: "",
    city: "",
    state: "",
    zip_code: "",
    shipping_option: "",
    habesha_cookies_quantity: 0,
    baklava_quantity: 0,
    almunium_phoil_quantity: 0,
    packaging_type: "small",
    special_instructions: "",
    delivery_date: "",
    total_price: 0,
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    // Validate required fields
    if (
      !form.first_name ||
      !form.last_name ||
      !form.email ||
      !form.address ||
      !form.delivery_date
    ) {
      setMessage("Please fill all required fields");
      setLoading(false);
      return;
    }

    try {
      // Call backend guest endpoint (no token)
      const res = await orderService.createOrder(form, null);
      setMessage(`Order #${res.data.orderId} created successfully!`);

      // Reset form
      setForm({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        address: "",
        address_2: "",
        city: "",
        state: "",
        zip_code: "",
        shipping_option: "",
        habesha_cookies_quantity: 0,
        baklava_quantity: 0,
        almunium_phoil_quantity: 0,
        packaging_type: "small",
        special_instructions: "",
        delivery_date: "",
        total_price: 0,
      });
    } catch (err) {
      console.error("Order creation failed:", err);
      setMessage("Failed to create order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col items-center"
      style={{ backgroundImage: `url(${ele})` }}
    >
      <LoginHeader />
      <div className="max-w-2xl mx-auto p-6 bg-white/80 rounded-md shadow-md">
        <h1 className="text-2xl font-bold mb-4">Place Your Order</h1>
        {message && <p className="mb-4 text-red-500">{message}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {/* Personal Details */}
          {[
            "first_name",
            "last_name",
            "email",
            "phone",
            "address",
            "address_2",
            "city",
            "state",
            "zip_code",
          ].map((field) => (
            <label key={field}>
              {field.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
              {["first_name", "last_name", "email", "address"].includes(
                field
              ) && "*"}
              :
              <input
                type={field === "email" ? "email" : "text"}
                name={field}
                value={form[field]}
                onChange={handleChange}
                className="border p-1 w-full"
                required={[
                  "first_name",
                  "last_name",
                  "email",
                  "address",
                ].includes(field)}
              />
            </label>
          ))}

          {/* Delivery Date */}
          <label>
            Delivery Date*:
            <input
              type="date"
              name="delivery_date"
              value={form.delivery_date}
              onChange={handleChange}
              className="border p-1 w-full"
              required
            />
          </label>

          {/* Product Quantities */}
          {[
            "habesha_cookies_quantity",
            "baklava_quantity",
            "almunium_phoil_quantity",
          ].map((field) => (
            <label key={field}>
              {field.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
              :
              <input
                type="number"
                name={field}
                value={form[field]}
                onChange={handleChange}
                className="border p-1 w-full"
              />
            </label>
          ))}

          {/* Packaging Type */}
          <label>
            Packaging Type:
            <select
              name="packaging_type"
              value={form.packaging_type}
              onChange={handleChange}
              className="border p-1 w-full"
            >
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </label>

          {/* Special Instructions */}
          <label>
            Special Instructions:
            <input
              type="text"
              name="special_instructions"
              value={form.special_instructions}
              onChange={handleChange}
              className="border p-1 w-full"
            />
          </label>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Place Order"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default GuestOrder;
