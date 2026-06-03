import React, { useState } from "react";
import {
  FaHeadset,
  FaEnvelope,
  FaPhoneAlt,
  FaRobot,
  FaTicketAlt,
  FaPaperPlane,
  FaTimes,
} from "react-icons/fa";
import Swal from "sweetalert2";

const SupportClaim = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleChatClick = () => {
    setIsChatOpen(true);

    Swal.fire({
      title: "Logistics on Autopilot. Powered by AI. 🚀",
      text: "Get ready for a smarter way to manage shipments. Our upcoming next-gen AI Assistant will handle everything from live tracking to smart analytics effortlessly. Next chapter is arriving soon!",
      icon: "info",
      confirmButtonColor: "#02312A",
      timer: 5000,
      showConfirmButton: true,
      confirmButtonText: "Got It!",
      customClass: {
        popup: "rounded-[20px]",
      },
    });
  };

  return (
    <div className="p-6 md:p-10 bg-white rounded-tradecen shadow-flat min-h-[80vh] relative">
      {/* Header */}
      <div className="mb-10">
        <h2 className="text-3xl font-black text-[#02312A] mb-2">
          Support & Claims
        </h2>
        <p className="text-gray-500 text-sm">
          Need help with a shipment or have a claim? Our team is here 24/7.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Cards (Email & Phone) */}
        <div className="lg:col-span-1 space-y-6">
          <div className="p-6 bg-[#F8F9FA] rounded-tradecen border border-transparent hover:border-[#CAEB66] transition-all group">
            <div className="w-12 h-12 bg-white rounded-[10px] flex items-center justify-center mb-4 shadow-flat group-hover:bg-[#CAEB66]">
              <FaPhoneAlt className="text-[#02312A]" size={20} />
            </div>
            <h4 className="font-black text-[#02312A] mb-1">Call Us</h4>
            <a
              href="tel:+880123456789"
              className="text-sm font-bold text-[#02312A] underline"
            >
              +880 123 456 789
            </a>
          </div>

          <div className="p-6 bg-[#F8F9FA] rounded-tradecen border border-transparent hover:border-[#CAEB66] transition-all group">
            <div className="w-12 h-12 bg-white rounded-[10px] flex items-center justify-center mb-4 shadow-flat group-hover:bg-[#CAEB66]">
              <FaEnvelope className="text-[#02312A]" size={20} />
            </div>
            <h4 className="font-black text-[#02312A] mb-1">Email Support</h4>
            <a
              href="mailto:support@TradeCen.com"
              className="text-sm font-bold text-[#02312A] underline"
            >
              support@tradecen.com
            </a>
          </div>
        </div>

        {/* AI Chat Agent Card */}
        <div className="lg:col-span-2 p-8 bg-[#02312A] rounded-[40px] text-white flex flex-col justify-between relative overflow-hidden">
          <FaRobot className="absolute -bottom-10 -right-10 text-white/5 size-64" />
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[#CAEB66] rounded-full flex items-center justify-center">
                <FaRobot className="text-[#02312A]" size={20} />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#CAEB66]">
                TradeCen AI Active
              </span>
            </div>
            <h3 className="text-2xl font-black mb-4">Chat with our AI Agent</h3>
            <p className="text-gray-400 text-sm max-w-md">
              Get instant updates on parcels and report issues using our smart
              assistant.
            </p>
          </div>

          <div className="mt-10">
            <button
              onClick={handleChatClick}
              className="bg-[#CAEB66] text-[#02312A] px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-transform flex items-center gap-3"
            >
              Start Live Chat <FaHeadset size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* --- LIVE CHAT INBOX POPUP --- */}
      {isChatOpen && (
        <div className="fixed bottom-6 right-6 w-80 md:w-96 bg-white rounded-tradecen overflow-hidden z-50 animate-in slide-in-from-bottom-10 duration-300">
          {/* Chat Header */}
          <div className="bg-[#02312A] p-4 flex justify-between items-center text-white">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#CAEB66] rounded-full flex items-center justify-center">
                <FaRobot className="text-[#02312A]" size={14} />
              </div>
              <div>
                <h5 className="text-xs font-bold">TradeCen AI</h5>
                <p className="text-[10px] text-[#CAEB66]">Online</p>
              </div>
            </div>
            <button
              onClick={() => setIsChatOpen(false)}
              className="hover:text-red-400 transition-colors"
            >
              <FaTimes size={18} />
            </button>
          </div>

          {/* Chat Messages Slot */}
          <div className="h-80 p-4 overflow-y-auto bg-gray-50 flex flex-col gap-3">
            <div className="bg-[#CAEB66]/20 p-3 rounded-2xl rounded-tl-none text-[11px] text-[#02312A] self-start max-w-[80%]">
              Hello! I am TradeCen. How can I help you with your parcel today?
            </div>
            <div className="bg-[#02312A] p-3 rounded-2xl rounded-tr-none text-[11px] text-white self-end max-w-[80%]">
              I want to check my parcel status.
            </div>
          </div>

          {/* Chat Input */}
          <div className="p-4 bg-white flex items-center gap-2 border-t border-t-gray-200">
            <input
              type="text"
              placeholder="Type your message..."
              className="flex-1 text-xs border-0 bg-gray-100 p-4 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#CAEB66]"
            />
            <button className="p-4 bg-[#CAEB66] text-[#02312A] rounded-xl hover:scale-110 transition-transform">
              <FaPaperPlane size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SupportClaim;
