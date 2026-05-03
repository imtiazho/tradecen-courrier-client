import React from "react";
import {
  LuPhoneCall,
  LuMail,
  LuMapPin,
  LuClock,
  LuMoveUpRight,
} from "react-icons/lu";

const ContactPage = () => {
  return (
    <section className="bg-[#F2F4F7] pt-8 pb-16 font-sans">
      <div className="bg-white rounded-[30px] p-8 md:p-16 lg:p-20">
        {/* 1. Header Section */}
        <div className="mb-10">
          <h2 className="text-[#02312A] text-4xl md:text-5xl font-extrabold mb-6">
            Get in Touch
          </h2>
          <p className="text-[#5F7180] text-sm md:text-base max-w-2xl leading-relaxed">
            Have a question about your shipment or want to partner with
            TradeCen? Our team is here to help you 24/7 with zero hassle.
          </p>
        </div>

        {/* 2. Custom Dashed Divider */}
        <div className="w-full h-[1.2px] bg-[linear-gradient(to_right,#B0BCC8_50%,transparent_0%)] bg-[length:15px_1.2px] bg-repeat-x mb-16 opacity-30" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left Side: Contact Info Cards */}
          <div className="space-y-8">
            {/* Phone Call System Card */}
            <a
              href="tel:+8801328503739"
              className="group flex items-center p-6 bg-[#F2F4F7] rounded-3xl border border-transparent hover:border-[#CAEB66] transition-all duration-300"
            >
              <div className="bg-[#CAEB66] w-14 h-14 rounded-2xl flex items-center justify-center text-[#02312A] shadow-lg group-hover:scale-110 transition-transform">
                <LuPhoneCall size={28} />
              </div>
              <div className="ml-6">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">
                  Call Us Now
                </p>
                <h4 className="text-[#02312A] text-xl md:text-2xl font-black">
                  +880 1328 503739
                </h4>
              </div>
              <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                <LuMoveUpRight className="text-[#02312A] text-2xl" />
              </div>
            </a>

            {/* Other Info Items */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 border border-[#E9ECEF] rounded-3xl">
                <LuMail className="text-[#CAEB66] mb-4" size={24} />
                <h5 className="text-[#02312A] font-bold mb-1">Email Support</h5>
                <p className="text-gray-500 text-sm">support@tradecen.com</p>
              </div>
              <div className="p-6 border border-[#E9ECEF] rounded-3xl">
                <LuClock className="text-[#CAEB66] mb-4" size={24} />
                <h5 className="text-[#02312A] font-bold mb-1">Working Hours</h5>
                <p className="text-gray-500 text-sm">Sat - Thu: 9AM - 8PM</p>
              </div>
            </div>

            <div className="p-6 border border-[#E9ECEF] rounded-3xl flex items-start">
              <LuMapPin
                className="text-[#CAEB66] mt-1 mr-4 shrink-0"
                size={24}
              />
              <div>
                <h5 className="text-[#02312A] font-bold mb-1">Headquarters</h5>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Level 4, Trade Tower, Banani, <br />
                  Dhaka - 1213, Bangladesh.
                </p>
              </div>
            </div>
          </div>

          {/* Right Side: Quick Message Form */}
          <div className="bg-[#02312A] rounded-[32px] p-8 md:p-10 shadow-xl relative overflow-hidden">
            {/* Abstract background shape for flair */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#CAEB66] opacity-10 rounded-full -mr-16 -mt-16" />

            <h3 className="text-white text-2xl font-bold mb-6">
              Send a Message
            </h3>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full bg-white/10 border border-white/20 rounded-2xl py-4 px-6 text-white placeholder:text-white/40 focus:outline-none focus:border-[#CAEB66] transition-all"
              />
              <input
                type="email"
                placeholder="Email Address"
                className="w-full bg-white/10 border border-white/20 rounded-2xl py-4 px-6 text-white placeholder:text-white/40 focus:outline-none focus:border-[#CAEB66] transition-all"
              />
              <textarea
                rows="4"
                placeholder="How can we help you?"
                className="w-full bg-white/10 border border-white/20 rounded-2xl py-4 px-6 text-white placeholder:text-white/40 focus:outline-none focus:border-[#CAEB66] transition-all"
              />
              <button className="w-full bg-[#CAEB66] hover:bg-[#b8d65a] text-[#02312A] font-bold py-4 rounded-2xl transition-all shadow-lg hover:shadow-[#CAEB66]/20">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
