import React, { useState } from "react";
import ContactHeader from "../../components/Header/contactusHeader";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      `Message sent!\nName: ${formData.name}\nEmail: ${formData.email}\nMessage: ${formData.message}`
    );
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <ContactHeader />

      {/* Contact Form */}
      <div className="max-w-3xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-[#3b1d0b] mb-6">Get in Touch</h2>
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-lg p-8 flex flex-col gap-4"
        >
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            required
          />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message"
            rows="5"
            className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            required
          />
          <button
            type="submit"
            className="bg-yellow-400 text-[#3b1d0b] font-semibold px-6 py-3 rounded-md hover:bg-yellow-300 transition"
          >
            Send Message
          </button>
        </form>

        {/* Optional contact info */}
        <div className="mt-10 text-gray-700">
          <p className="mb-2">
            <strong>Email:</strong> contact@habeshacookies.com
          </p>
          <p className="mb-2">
            <strong>Phone:</strong> +1 (555) 123-4567
          </p>
          <p>
            <strong>Address:</strong> 123 Habesha St, Cookie City, CA 90000
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
