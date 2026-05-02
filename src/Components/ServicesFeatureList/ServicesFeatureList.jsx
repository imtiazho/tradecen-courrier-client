import React from "react";
import pic1 from "../../assets/safe-delivery.png";
import pic2 from "../../assets/live-tracking.png";
import "./ServicesFeatureList.css";

const ServicesFeatureList = () => {
  const serviceItems = [
    {
      id: 1,
      title: "Live Parcel Tracking",
      description:
        "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.",
      image: pic2,
    },
    {
      id: 2,
      title: "100% Safe Delivery",
      description:
        "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
      image: pic1,
    },
    {
      id: 3,
      title: "24/7 Call Center Support",
      description:
        "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
      image: pic2, // Swap with a support-specific pic later if you have one!
    },
  ];

  return (
    <div className="w-[86%] mx-auto">
      <div className="h-[1.6px] w-full bg-[linear-gradient(to_right,#aeaeae_50%,transparent_0%)] bg-[length:15px_1.6px] bg-repeat-x mb-20" />

      <div className="space-y-5">
        {serviceItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-[20px] p-6 md:p-8 flex items-center gap-x-8 md:gap-x-12 border border-[#E9ECEF] shadow-[0px_4px_16px_rgba(20,40,60,0.03)]"
          >
            {/* 1. Left Side: Image Container */}
            <div className="flex-shrink-0 w-[120px] md:w-[150px] aspect-[1/1] flex items-center justify-center">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-contain object-center"
              />
            </div>

            <div className="w-[1.6px] self-stretch bg-[linear-gradient(to_bottom,#aeaeae_50%,transparent_0%)] bg-[length:1.6px_10px] bg-repeat-y" />

            {/* 3. Right Side: Text Content */}
            <div className="grow space-y-3">
              <h3 className="text-[#102B36] text-[25px] font-extrabold tracking-[-0.010em]">
                {item.title}
              </h3>
              <p className="text-[#5F7180] text-[14px] font-medium leading-[1.6]">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="h-[1.6px] w-full bg-[linear-gradient(to_right,#aeaeae_50%,transparent_0%)] bg-[length:15px_1.6px] bg-repeat-x mt-20" />
    </div>
  );
};

export default ServicesFeatureList;
