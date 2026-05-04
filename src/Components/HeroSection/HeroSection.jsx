import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
// Import required modules
import { Pagination, Autoplay, EffectFade } from "swiper/modules";
import b1 from "../../assets/banner/banner1.png";
import b2 from "../../assets/banner/banner2.png";
import b3 from "../../assets/banner/banner3.png"; // b3-তেও b2 ছবি দেওয়া আছে, আপনার প্রজেক্ট অনুযায়ী এটি পরিবর্তন করে নিন।
import { RiEBikeFill } from "react-icons/ri";

const HeroSection = () => {
  const heroImages = [b1, b2, b3];

  return (
    <div className="mt-6">
      <div className="rounded-[18px] relative">
        <Swiper
          modules={[Pagination, Autoplay, EffectFade]}
          effect={"fade"} // smooth fading effect
          spaceBetween={30}
          slidesPerView={1}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          // Custom pagination link: '.custom-pagination-container' এলিমেন্টটি নিচে যোগ করা হয়েছে
          pagination={{
            clickable: true,
            el: ".custom-pagination-container", 
          }}
          className="mySwiper h-auto"
        >
          {heroImages.map((imgSrc, idx) => (
            <SwiperSlide key={idx}>
              <div className="flex justify-center md:justify-end">
                <img
                  src={imgSrc}
                  alt={`Delivery Hero Banner ${idx + 1}`}
                  className="w-full h-auto object-contain h-fit" // max-h ব্যবহার করে ছবির উচ্চতা নিয়ন্ত্রণ করা হয়েছে
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="mt-8 md:absolute md:bottom-16 md:left-16 flex flex-col items-start gap-6 w-full md:w-auto z-10">
          <div className="flex flex-wrap gap-4 pt-4">
            <button className="btn bg-[#CAEB66] hover:bg-[#c4e685] border-none text-black rounded-full px-6 h-14 flex items-center gap-3 shadow-sm">
              Track Your Parcel
              <div className="bg-[#1A2E2E] rounded-full p-1.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={3}
                  stroke="white"
                  className="w-3 h-3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                  />
                </svg>
              </div>
            </button>
            <button className="btn bg-[#CAEB66] hover:bg-[#c4e685] border-none text-black rounded-full px-6 h-14 flex items-center gap-1 shadow-sm">
              Be A Rider <span><RiEBikeFill size={20} /></span>
            </button>
          </div>

          {/* কাস্টম পেজিনেশন (Page dots) এর জন্য কন্টেইনার */}
          {/* এটি বাটনগুলোর ঠিক নিচে (gap-6) বাম-নিচে অবস্থান করবে */}
          <div className="custom-pagination-container flex gap-2 w-fit">
            {/* Swiper JS এখানে ডটগুলো রেন্ডার করবে */}
          </div>
        </div>

      </div>

      {/* --- Swiper পেজ ডট স্টাইল ওভাররাইড (Global scope-এ প্রয়োগ হবে) --- */}
      {/* ডটগুলোকে Pill-shape করার জন্য এই CSS প্রয়োজন */}
      <style>{`
        /* Swiper-এর ডিফল্ট ডটগুলো এই ক্লাসের ভেতরে রেন্ডার হয় */
        .custom-pagination-container .swiper-pagination-bullet {
          background: #E5E7EB; /* নিষ্ক্রিয় ডট-এর রং */
          opacity: 1;
          height: 6px;
          width: 24px; /* Pill shape */
          border-radius: 999px;
          transition: all 0.3s ease;
          margin: 0 !important; /* Swiper-এর ডিফল্ট মার্জিন সরানোর জন্য */
        }

        /* সক্রিয় (Active) ডট-এর স্টাইল */
        .custom-pagination-container .swiper-pagination-bullet-active {
          background: #3EB0AC !important; /* সক্রিয় ডট-এর রং (ZapShift Teal) */
          width: 40px; /* সক্রিয় ডট একটু বড় হবে */
        }
      `}</style>
    </div>
  );
};

export default HeroSection;