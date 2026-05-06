import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import {
  FiTruck,
  FiShoppingBag,
  FiArrowRight,
  FiClock,
  FiCheckCircle,
  FiAlertCircle,
} from "react-icons/fi";
import useAuth from "../../Hooks/useAuth";

const StatusCard = ({ icon, title, message, colorClass, btnText, linkTo }) => (
  <div className="bg-white p-10 rounded-2xl border-2 border-gray-100 shadow-xl text-center animate-fade-in">
    <div
      className={`w-20 h-20 ${colorClass} rounded-xl flex items-center justify-center mb-6 mx-auto shadow-lg`}
    >
      {icon}
    </div>
    <h2 className="text-3xl font-black text-[#02312A] mb-3">{title}</h2>
    <p className="text-gray-500 font-medium mb-8 leading-relaxed">{message}</p>
    {btnText && (
      <Link
        to={linkTo}
        className="inline-flex items-center gap-2 font-bold text-white bg-[#02312A] px-8 py-3 rounded-xl hover:bg-[#034d42] transition-all"
      >
        {btnText} <FiArrowRight />
      </Link>
    )}
  </div>
);

const RoleSelection = () => {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(null);
  const { dbUser } = useAuth();

  const role = dbUser?.role;

  const roles = [
    {
      id: "/be-rider",
      title: "Be a Rider",
      description:
        "Deliver packages, earn on your schedule, and explore the city.",
      icon: <FiTruck className="text-4xl" />,
      color: "#CAEB66",
    },
    {
      id: "/be-merchant",
      title: "Be a Merchant",
      description:
        "Grow your business, reach more customers, and manage orders easily.",
      icon: <FiShoppingBag className="text-4xl" />,
      color: "#CAEB66",
    },
  ];
  
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-4xl w-full">
        {role === "rider" || role === "merchant" ? (
          <StatusCard
            icon={<FiCheckCircle className="text-4xl text-[#02312A]" />}
            title={`You are a ${role.toUpperCase()}!`}
            message={`You have already joined our team as a ${role}. You cannot make another request with the same credentials.`}
            colorClass="bg-[#CAEB66]"
            btnText="Go to Dashboard"
            linkTo={`/dashboard`}
          />
        ) : role === "pending-rider" ? (
          <StatusCard
            icon={<FiClock className="text-4xl text-[#02312A]" />}
            title="Request Pending!"
            message="Your request to become a rider is currently under review. Our team will verify your documents soon. Please wait for approval."
            colorClass="bg-yellow-100"
            btnText="Check Status"
            linkTo="/profile"
          />
        ) : (
          <>
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-black text-[#02312A] mb-4">
                How would you like to{" "}
                <span className="text-[#A5C141]">Join Us?</span>
              </h1>
              <p className="text-gray-600 text-lg">
                Select your path to get started with our platform.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {roles.map((roleItem) => (
                <Link
                  to={roleItem.id}
                  key={roleItem.id}
                  onMouseEnter={() => setHovered(roleItem.id)}
                  onMouseLeave={() => setHovered(null)}
                  className={`relative bg-white p-8 rounded-3xl border-2 transition-all duration-300 cursor-pointer overflow-hidden group shadow-sm ${
                    hovered === roleItem.id
                      ? "border-[#CAEB66] shadow-xl translate-y-[-5px]"
                      : "border-gray-100"
                  }`}
                >
                  <div
                    className={`absolute -right-12 -top-12 w-40 h-40 rounded-full transition-all duration-500 ${
                      hovered === roleItem.id
                        ? "bg-[#CAEB66] opacity-20 scale-150"
                        : "bg-gray-100 opacity-0"
                    }`}
                  />

                  <div className="relative z-10">
                    <div
                      className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-colors duration-300 ${
                        hovered === roleItem.id
                          ? "bg-[#02312A] text-[#CAEB66]"
                          : "bg-[#CAEB66] text-[#02312A]"
                      }`}
                    >
                      {roleItem.icon}
                    </div>

                    <h2 className="text-2xl font-black text-[#02312A] mb-3">
                      {roleItem.title}
                    </h2>
                    <p className="text-gray-500 font-medium mb-8 leading-relaxed">
                      {roleItem.description}
                    </p>

                    <div className="flex items-center gap-2 font-bold text-[#02312A] group-hover:gap-4 transition-all">
                      Get Started <FiArrowRight />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default RoleSelection;
