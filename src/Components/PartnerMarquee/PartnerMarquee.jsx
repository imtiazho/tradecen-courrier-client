import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";

// Import your local images
import b1 from "../../assets/brands/amazon.png";
import b2 from "../../assets/brands/amazon_vector.png";
import b3 from "../../assets/brands/casio.png";
import b4 from "../../assets/brands/moonstar.png";
import b5 from "../../assets/brands/randstad.png";
import b6 from "../../assets/brands/star.png";
import b7 from "../../assets/brands/start-people 1.png";
import b8 from "../../assets/brands/start.png";
import b9 from "../../assets/brands/start_people.png";

const PartnerSwiper = () => {
  const partners = [
    { id: 1, src: b1 },
    { id: 2, src: b2 },
    { id: 3, src: b3 },
    { id: 4, src: b4 },
    { id: 5, src: b5 },
    { id: 6, src: b6 },
    { id: 7, src: b7 },
    { id: 8, src: b8 },
    { id: 9, src: b9 },
  ];

  return (
    <section className="pt-20 pb-28">
      <div className="w-[86%] mx-auto px-4">
        <h2 className="text-[#03373D] text-center text-xl md:text-2xl font-bold mb-10">
          We've helped thousands of sales teams
        </h2>

        <Swiper
          modules={[Autoplay]}
          loop={true}
          speed={5000} 
          slidesPerView={2}
          spaceBetween={30}
          autoplay={{
            delay: 0, 
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          breakpoints={{
            640: { slidesPerView: 3 },
            1024: { slidesPerView: 5 },
          }}
          className="linear-swiper"
          style={{
            wrapperClass: "transition-timing-function: linear !important",
          }}
        >
          {partners.map((partner) => (
            <SwiperSlide
              key={partner.id}
              className="flex items-center justify-center"
            >
              <img
                src={partner.src}
                className="opacity-100 object-contain mx-auto"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Add this to your Global CSS or a style tag to make it move linearly */}
      <style>{`
        .linear-swiper .swiper-wrapper {
          transition-timing-function: linear !important;
        }
      `}</style>
    </section>
  );
};

export default PartnerSwiper;
