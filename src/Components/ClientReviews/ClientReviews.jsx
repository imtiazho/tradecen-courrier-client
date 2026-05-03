import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { LuQuote, LuMoveLeft, LuMoveRight } from "react-icons/lu";
import topPic from "../../assets/customer-top.png";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const reviews = [
  {
    id: 1,
    name: "Awlad Hossin",
    role: "Senior Product Designer",
    review:
      "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day.",
    img: null, // Add client image path here
  },
  {
    id: 2,
    name: "Rasel Ahmed",
    role: "CTO",
    review:
      "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day.",
    img: null,
  },
  {
    id: 3,
    name: "Nasir Uddin",
    role: "CEO",
    review:
      "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day.",
    img: null,
  },
  {
    id: 4,
    name: "Awlad Hossin",
    role: "Senior Product Designer",
    review:
      "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day.",
    img: null,
  },
];

const ClientReviews = () => {
  return (
    <section className="pb-20 pt-12 px-4 font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto text-center mb-16">
        <div className="flex justify-center mb-6">
          <div className="flex items-center justify-center text-teal-600 text-[10px]">
            <img src={topPic} alt="" />
          </div>
        </div>

        <h2 className="text-[#02312A] text-3xl md:text-4xl font-extrabold mb-4">
          What our customers are sayings
        </h2>
        <p className="text-[#5F7180] w-[70%] mx-auto text-sm md:text-base leading-relaxed">
          Enhance posture, mobility, and well-being effortlessly with Posture
          Pro. Achieve proper alignment, reduce pain, and strengthen your body
          with ease!
        </p>
      </div>

      <div className="relative">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1.2}
          centeredSlides={true}
          loop={true}
          autoplay={{ delay: 4000 }}
          pagination={{ clickable: true, el: ".custom-pagination" }}
          navigation={{ nextEl: ".nav-next", prevEl: ".nav-prev" }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="review-swiper !pb-20 !pt-6"
        >
          {reviews.map((item) => (
            <SwiperSlide key={item.id}>
              {({ isActive }) => (
                <div
                  className={`
                  bg-white rounded-[32px] p-8 md:p-10 transition-all duration-500 border border-[#E9ECEF]
                  ${isActive ? "scale-105 shadow-lg opacity-100" : "scale-90 opacity-40 grayscale"}
                `}
                >
                  {/* Quote Icon */}
                  <LuQuote className="text-[#CAEB66] text-5xl mb-6 opacity-50" />

                  <p className="text-[#5F7180] text-sm md:text-base leading-relaxed mb-8 text-left italic">
                    {item.review}
                  </p>

                  {/* Custom Dashed Divider we built earlier */}
                  <div className="h-[1.2px] w-full bg-[linear-gradient(to_right,#B0BCC8_50%,transparent_0%)] bg-[length:12px_1.2px] bg-repeat-x mb-8" />

                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-[#02312A] flex-shrink-0" />
                    <div className="text-left">
                      <h4 className="text-[#02312A] font-extrabold text-lg">
                        {item.name}
                      </h4>
                      <p className="text-[#5F7180] text-sm">{item.role}</p>
                    </div>
                  </div>
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation & Pagination Layout */}
        <div className="flex flex-col items-center gap-6 mt-4">
          <div className="flex items-center gap-4">
            {/* Prev Button */}
            <button className="nav-prev btn btn-circle bg-white hover:bg-white text-xl shadow-sm">
              <LuMoveLeft />
            </button>

            {/* Dots */}
            <div className="custom-pagination flex gap-2 !w-auto"></div>

            {/* Next Button - Lime Green themed */}
            <button className="nav-next btn btn-circle bg-[#CAEB66] border-none hover:bg-[#b8d65a] text-xl shadow-md text-[#02312A]">
              <LuMoveRight />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .custom-pagination .swiper-pagination-bullet {
          background: #B0BCC8;
          opacity: 1;
          width: 8px;
          height: 8px;
          transition: all 0.3s ease;
        }
        .custom-pagination .swiper-pagination-bullet-active {
          background: #02312A;
          width: 24px;
          border-radius: 4px;
        }
      `}</style>
    </section>
  );
};

export default ClientReviews;
