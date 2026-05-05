import React, { useState } from "react";
import { useNavigate } from "react-router";
import { FiTruck, FiShoppingBag, FiArrowRight } from "react-icons/fi";

const RoleSelection = () => {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(null);

  const roles = [
    {
      id: "rider",
      title: "Be a Rider",
      description:
        "Deliver packages, earn on your schedule, and explore the city.",
      icon: <FiTruck className="text-4xl" />,
      color: "#CAEB66",
    },
    {
      id: "merchant",
      title: "Be a Merchant",
      description:
        "Grow your business, reach more customers, and manage orders easily.",
      icon: <FiShoppingBag className="text-4xl" />,
      color: "#CAEB66",
    },
  ];

  const handleRoleSelect = (roleId) => {
    // You can save this to local state or navigate to a specific signup form
    navigate(`/auth/signup/${roleId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full">
        {/* HEADER */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-[#02312A] mb-4">
            How would you like to{" "}
            <span className="text-[#A5C141]">Join Us?</span>
          </h1>
          <p className="text-gray-600 text-lg">
            Select your path to get started with our platform.
          </p>
        </div>

        {/* ROLE CARDS */}
        <div className="grid md:grid-cols-2 gap-8">
          {roles.map((role) => (
            <div
              key={role.id}
              onMouseEnter={() => setHovered(role.id)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => handleRoleSelect(role.id)}
              className={`relative bg-white p-8 rounded-3xl border-2 transition-all duration-300 cursor-pointer overflow-hidden group shadow-sm ${
                hovered === role.id
                  ? "border-[#CAEB66] shadow-xl translate-y-[-8px]"
                  : "border-gray-100"
              }`}
            >
              {/* BACKGROUND ACCENT */}
              <div
                className={`absolute -right-12 -top-12 w-40 h-40 rounded-full transition-all duration-500 ${
                  hovered === role.id
                    ? "bg-[#CAEB66] opacity-20 scale-150"
                    : "bg-gray-100 opacity-0"
                }`}
              />

              <div className="relative z-10">
                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-colors duration-300 ${
                    hovered === role.id
                      ? "bg-[#02312A] text-[#CAEB66]"
                      : "bg-[#CAEB66] text-[#02312A]"
                  }`}
                >
                  {role.icon}
                </div>

                <h2 className="text-2xl font-black text-[#02312A] mb-3">
                  {role.title}
                </h2>

                <p className="text-gray-500 font-medium mb-8 leading-relaxed">
                  {role.description}
                </p>

                <div className="flex items-center gap-2 font-bold text-[#02312A] group-hover:gap-4 transition-all">
                  Get Started <FiArrowRight />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* FOOTER */}
        <p className="text-center mt-12 text-gray-400 text-sm">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/auth/login")}
            className="text-[#A5C141] font-bold hover:underline"
          >
            Login here
          </button>
        </p>
      </div>
    </div>
  );
};

export default RoleSelection;
