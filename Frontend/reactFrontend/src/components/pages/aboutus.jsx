import React from "react";
import AboutUsHeader from "../../components/Header/aboutusHeader";

const AboutUs = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <AboutUsHeader />

      {/* Page content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <section className="mb-10">
          <h2 className="text-3xl font-bold text-[#3b1d0b] mb-4">Our Story</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            Habesha Cookies started with a passion for authentic, homemade
            treats. From our kitchen to your table, we focus on quality, flavor,
            and love in every bite. Our goal is to bring joy and tradition
            through cookies and cakes, made fresh every day.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-3xl font-bold text-[#3b1d0b] mb-4">
            Our Mission
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            We aim to provide delicious, handcrafted baked goods using natural
            ingredients. Our mission is to create a memorable experience with
            every cookie or cake, ensuring customers come back for more.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-[#3b1d0b] mb-4">
            Meet the Team
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            Our dedicated bakers, decorators, and delivery team work together to
            make sure every order meets our high standards of quality and
            freshness.
          </p>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;
