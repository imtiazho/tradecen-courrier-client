import React from "react";
import { Link } from "react-router";
import {
  XCircle,
  AlertCircle,
  ArrowLeft,
  RefreshCcw,
  HelpCircle,
} from "lucide-react";

const PaymentCancelled = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] py-12 px-4 font-sans text-[#1e293b]">
      <div className="max-w-[500px] mx-auto">
        <div className="bg-white rounded-[24px] border border-slate-200 overflow-hidden shadow-[0_2px_15px_-3px_rgba(0,0,0,0.04)] ">
          <div className="bg-[#ef4444]/10 p-10 text-center border-b border-slate-100">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full mb-4 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.04)] ">
              <XCircle size={48} className="text-[#ef4444]" />
            </div>
            <h1 className="text-3xl font-black tracking-tight text-[#0f172a]">
              Payment Cancelled
            </h1>
            <p className="text-slate-500 mt-2 font-medium">
              The transaction was not completed.
            </p>
          </div>

          <div className="p-8">
            <div className="bg-slate-50 rounded-xl p-6 border border-slate-100 mb-8">
              <div className="flex gap-4">
                <AlertCircle className="text-slate-400 shrink-0" size={20} />
                <div className="space-y-1">
                  <p className="text-sm font-bold text-slate-700">
                    What happened?
                  </p>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    You might have cancelled the process, the session timed out,
                    or there was a temporary issue with the payment gateway.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-slate-600">
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
                  <HelpCircle size={16} />
                </div>
                <p className="text-sm">
                  Need help?{" "}
                  <span className="font-bold text-[#0f172a]">
                    support@tradecen.com
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className="p-8 pt-0 space-y-3">
            <button
              onClick={() => window.history.back()}
              className="w-full flex items-center justify-center gap-2 bg-[#0f172a] text-white font-bold py-4 rounded-xl hover:opacity-90 transition-all text-sm cursor-pointer shadow-lg"
            >
              <RefreshCcw size={16} /> Try Paying Again
            </button>

            <Link
              to="/dashboard"
              className="w-full flex items-center justify-center gap-2 bg-white text-[#0f172a] border-2 border-slate-200 font-bold py-4 rounded-xl hover:bg-slate-50 transition-all text-sm"
            >
              <ArrowLeft size={16} /> Back to Dashboard
            </Link>
          </div>

          <div className="pb-8 text-center px-8">
            <p className="text-[11px] text-slate-400 uppercase font-bold tracking-widest">
              TradeCen Logistics Solutions
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancelled;
