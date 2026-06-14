import React from "react";
import { MdSettingsBackupRestore } from "react-icons/md";
import DynamicTitle from "../../Components/DynamicTitle/DynamicTitle";

const ReturnParcels = () => {
  return (
    <div className="p-4 md:p-8 bg-[#ffffff] rounded-tradecen min-h-screen font-sans flex flex-col justify-between">
     <DynamicTitle title="Dashboard | Returns" />
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 w-full">
        <div>
          <h2 className="text-3xl font-extrabold text-[#002B36] tracking-wide">
            Return Shipments
          </h2>
          <p className="text-sm text-gray-500 mt-1 font-medium">
            Manage, audit, and accept canceled or undelivered parcels back to
            hub.
          </p>
        </div>
        <div className="flex items-center gap-3 bg-amber-50 px-4 py-2 rounded-full border border-amber-100">
          <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
          <span className="text-[#002B36] font-bold text-sm uppercase tracking-wider">
            Coming Soon Desk
          </span>
        </div>
      </div>

      {/* Static Info Placeholder Container */}
      <div className="flex-1 flex flex-col items-center justify-center my-auto py-20 text-center bg-white rounded-[24px] border border-dashed border-gray-200/80">
        <div className="bg-[#CAEB66]/10 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-[#CAEB66]/30 text-3xl shadow-sm text-[#002B36] transform rotate-3 hover:rotate-0 transition-transform duration-300">
          <MdSettingsBackupRestore size={36} className="text-[#002B36]" />
        </div>

        <h3 className="text-xl font-black text-[#002B36] uppercase tracking-tight mb-2">
          Return Desk is Under Construction
        </h3>

        <p className="text-gray-400 font-medium text-sm max-w-sm mx-auto px-4 leading-relaxed">
          We are currently building this panel. In the future, hub managers will
          be able to manage, track, and re-route returned items from here.
        </p>

        {/* Dummy/Disabled Button to match page layout symmetry */}
        <button
          disabled
          className="mt-6 px-6 py-3 bg-gray-100 text-gray-400 rounded-xl text-xs font-black uppercase tracking-widest cursor-not-allowed border border-gray-200/50 shadow-none"
        >
          Initialize Return Module
        </button>
      </div>

      {/* Footer Meta */}
      <div className="text-center py-4 border-t border-gray-50 mt-8">
        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
          TradeCen Logistics Engine v2.0
        </p>
      </div>
    </div>
  );
};

export default ReturnParcels;
