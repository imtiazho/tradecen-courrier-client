import React from "react";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingModal from "../../Components/LoadingModal/LoadingModal";
import {
  MdStore,
  MdLocationOn,
  MdCall,
  MdMailOutline,
  MdLocalMall,
} from "react-icons/md";
import { FiCopy } from "react-icons/fi";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const MerchantsAreaWise = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // 1. Fetch Hub Manager profile to extract active location parameter
  const { isLoading: managerLoading, data: managerData = {} } = useQuery({
    queryKey: ["managerData", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/users/hub-managers?email=${user.email}`,
      );
      return Array.isArray(res.data) && res.data.length > 0
        ? res.data[0]
        : res.data;
    },
    enabled: !!user?.email,
  });

  // 2. Fetch Area Wise Merchants based on dynamic path parameter
  const { isLoading: merchantsLoading, data: merchants = [] } = useQuery({
    queryKey: ["areaMerchants", managerData?.hubName],
    queryFn: async () => {
      // Dynamic endpoint integration passing hubName safely
      const res = await axiosSecure.get(
        `/area-merchant/${managerData?.hubName}`,
      );
      return Array.isArray(res.data) ? res.data : [];
    },
    enabled: !!managerData?.hubName,
  });

  // Action Helper: Copy Pickup Address to Clipboard for riders dispatching
  const handleCopyAddress = (address, business) => {
    navigator.clipboard.writeText(address);
    toast.success(`${business}'s address copied!`, {
      style: {
        border: "1px solid #CAEB66",
        padding: "12px 16px",
        color: "#CAEB66",
        fontWeight: "bold",
        fontSize: "12px",
        fontFamily: "sans-serif",
        borderRadius: "12px",
      },
      iconTheme: {
        primary: "#CAEB66",
        secondary: "#002B36",
      },
    });
  };

  if (managerLoading || merchantsLoading) {
    return <LoadingModal isLoading={true} />;
  }

  return (
    <div className="p-4 md:p-8 bg-[#ffffff] rounded-tradecen min-h-screen font-sans">
      {/* Header Operational Analytics Card */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-extrabold text-[#002B36] tracking-wide">
            Merchants
          </h2>
          <p className="text-sm text-gray-500 mt-1 font-medium">
            Manage active B2B partners, business hubs, and pipeline logistics in{" "}
            {managerData?.hubName || "current"} zone.
          </p>
        </div>
        <div className="flex items-center gap-3 bg-[#CAEB66]/20 px-4 py-2 rounded-full border border-[#CAEB66]">
          <span className="text-[#002B36] font-bold text-sm uppercase tracking-wider">
            Merchants: {merchants?.length || 0} 
          </span>
        </div>
      </div>

      {/* Grid Architecture Blueprint */}
      {merchants?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {merchants.map((merchant) => (
            <div
              key={merchant._id}
              className="bg-[#FFFFFF] border border-gray-100 rounded-3xl p-5 shadow-flat hover:border-primary transition-all duration-300 relative group flex flex-col justify-between"
            >
              {/* Brand Top Block */}
              <div>
                <div className="flex items-start justify-between gap-2 border-b border-gray-50 pb-4 mb-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-xl overflow-hidden shadow-inner flex-shrink-0">
                      {merchant.photoURL ? (
                        <img
                          src={merchant.photoURL}
                          alt={merchant.businessName}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <MdStore className="text-gray-400" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-base font-black text-[#002B36] uppercase tracking-tight truncate">
                        {merchant.businessName || "No Brand Name"}
                      </h4>
                      <p className="text-[11px] text-gray-400 font-bold uppercase tracking-wide truncate">
                        Pro: {merchant.displayName}
                      </p>
                    </div>
                  </div>

                  {/* Merchant Account Tier Tag */}
                  <span className="text-[9px] font-black uppercase px-2.5 py-1 rounded-md bg-gray-50 text-gray-500 border border-gray-100 tracking-wider">
                    {merchant.merchantType || "Standard"}
                  </span>
                </div>

                {/* Logistics Profile Specification */}
                <div className="space-y-3.5 mb-6">
                  {/* Total Successful Deliveries */}
                  <div className="flex items-center justify-between text-xs bg-gray-50/70 p-2.5 rounded-xl border border-gray-100/50">
                    <span className="text-gray-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                      <MdLocalMall size={14} className="text-gray-400" />{" "}
                      Deliveries
                    </span>
                    <span className="font-black text-[#002B36] uppercase text-[11px]">
                      {merchant.totalSuccessfulDeliveries || 0} Successful
                    </span>
                  </div>

                  {/* Contact Info Text Frame */}
                  <div className="flex items-center justify-between text-xs px-1">
                    <span className="text-gray-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                      <MdMailOutline size={14} className="text-gray-400" />{" "}
                      Contact Email
                    </span>
                    <span className="font-bold text-[#002B36] text-right truncate max-w-[160px] text-[11px]">
                      {merchant.email}
                    </span>
                  </div>

                  {/* Operational Pickup Address Module */}
                  <div className="flex flex-col bg-gray-50/40 p-3 rounded-2xl border border-dashed border-gray-200 mt-2">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[10px] text-gray-400 font-black uppercase tracking-wider flex items-center gap-1">
                        <MdLocationOn size={12} className="text-gray-400" />{" "}
                        Warehouse / Pickup Point
                      </span>
                      <button
                        onClick={() =>
                          handleCopyAddress(
                            merchant.pickupPoint,
                            merchant.businessName,
                          )
                        }
                        className="text-gray-400 hover:text-[#002B36] transition-colors p-0.5"
                        title="Copy Address"
                      >
                        <FiCopy size={12} />
                      </button>
                    </div>
                    <p className="text-xs text-[#002B36] font-black leading-relaxed">
                      {merchant.pickupPoint || "Not Configured"}
                    </p>
                    <span className="text-[9px] uppercase font-bold text-gray-400 mt-1.5 tracking-tight">
                      Zone: {merchant.area}, {merchant.district}
                    </span>
                  </div>
                </div>
              </div>

              {/* Functional Card Footer Action Hub */}
              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-gray-50">
                {/* Protocol 1: Direct Phone Dialer */}
                <a
                  href={`tel:${merchant.contact}`}
                  className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:text-[#002B36] hover:bg-gray-50 transition-all text-xs font-black uppercase tracking-wider text-center cursor-pointer"
                >
                  <MdCall size={14} />
                  Call Merchant
                </a>

                {/* Protocol 2: Email Client Shortcut */}
                <a
                  href={`mailto:${merchant.email}?subject=TradeCen Logistics Hub Query`}
                  className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-[#002B36] text-white hover:bg-black transition-all text-xs font-black uppercase tracking-wider text-center cursor-pointer shadow-sm"
                >
                  <MdMailOutline size={14} className="text-[#CAEB66]" />
                  Send Email
                </a>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty Merchant Directory Placeholder State */
        <div className="py-24 text-center bg-white rounded-[24px] border border-dashed border-gray-200 mt-2">
          <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-100 text-xl">
            🏬
          </div>
          <h4 className="text-[#002B36] font-black uppercase tracking-tight text-base mb-1">
            No Active Merchants in this Hub
          </h4>
          <p className="text-gray-400 text-xs font-medium max-w-xs mx-auto">
            There are currently no B2B distribution store profiles registered or
            mapped under the {managerData?.hubName || "active"} area desk.
          </p>
        </div>
      )}
    </div>
  );
};

export default MerchantsAreaWise;
