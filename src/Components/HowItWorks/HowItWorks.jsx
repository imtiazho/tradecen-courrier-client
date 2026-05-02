import React from "react";
import {
  LuPackageSearch,
  LuBanknote,
  LuWarehouse,
  LuBuilding2,
} from "react-icons/lu"; // Using Lucide icons via react-icons for a clean look

const HowItWorks = () => {
  // Common data structure for the cards
  const steps = [
    {
      id: 1,
      title: "Booking Pick & Drop",
      description:
        "From personal packages to business shipments — we deliver on time, every time.",
      icon: <LuPackageSearch className="w-10 h-10 text-teal-800" />,
    },
    {
      id: 2,
      title: "Cash On Delivery",
      description:
        "From personal packages to business shipments — we deliver on time, every time.",
      icon: <LuBanknote className="w-10 h-10 text-teal-800" />,
    },
    {
      id: 3,
      title: "Delivery Hub",
      description:
        "From personal packages to business shipments — we deliver on time, every time.",
      icon: <LuWarehouse className="w-10 h-10 text-teal-800" />,
    },
    {
      id: 4,
      title: "Booking SME & Corporate",
      description:
        "From personal packages to business shipments — we deliver on time, every time.",
      icon: <LuBuilding2 className="w-10 h-10 text-teal-800" />,
    },
  ];

  return (
    <section className="w-[85%] mx-auto mt-20">
      {/* Section Heading */}
      <h2 className="text-2xl md:text-3xl font-bold text-teal-900 mb-8">
        How it Works
      </h2>

      {/* Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step) => (
          <div
            key={step.id}
            className="bg-white px-8 pt-6 pb-4 rounded-2xl flex flex-col items-start"
          >
            {/* Icon Container */}
            <div className="mb-5 p-3 bg-teal-50 rounded-2xl">{step.icon}</div>

            {/* Text Content */}
            <h3 className="text-[20px] font-bold text-teal-950 mb-3">
              {step.title}
            </h3>
            <p className="text-gray-500 leading-relaxed text-sm">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
