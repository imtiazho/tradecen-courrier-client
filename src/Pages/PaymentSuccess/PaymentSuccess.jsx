import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import {
  CheckCircle2,
  Package,
  Hash,
  Calendar,
  ArrowRight,
  Download,
} from "lucide-react";
import confetti from "canvas-confetti";

const PaymentSuccess = () => {
  const [paymentInfo, setPaymentInfo] = useState(null);
  const [searchParams] = useSearchParams();
  const sessionID = searchParams.get("session_id");
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (sessionID) {
      axiosSecure
        .patch(`/verify-payment?session_id=${sessionID}`)
        .then((res) => {
          setPaymentInfo(res.data);
          // পেমেন্ট সফল হলে কনফেটি উড়ানো
          confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ["#bef264", "#1e293b", "#ffffff"],
          });
        })
        .catch((err) => console.error("Payment verification failed", err));
    }
  }, [sessionID, axiosSecure]);

  if (!paymentInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#bef264]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-12 px-4 font-sans">
      <div className="max-w-[550px] mx-auto">
        {/* Success Icon & Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-[#bef264]/20 rounded-full mb-4">
            <CheckCircle2 size={48} className="text-[#84cc16]" />
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Payment Successful!
          </h1>
          <p className="text-slate-500 mt-2">
            Transaction completed and parcel status updated.
          </p>
        </div>

        {/* Invoice Card */}
        <div className="bg-white rounded-[12px] shadow-[0_2px_15px_-3px_rgba(0,0,0,0.04)] border border-slate-100 overflow-hidden">
          <div className="bg-slate-900 p-6 text-white flex justify-between items-center">
            <div>
              <p className="text-slate-400 text-xs uppercase font-bold tracking-widest">
                Amount Paid
              </p>
              <h2 className="text-3xl font-black mt-1">
                ৳{paymentInfo.amount}
              </h2>
            </div>
            <div className="text-right">
              <p className="text-slate-400 text-xs uppercase font-bold tracking-widest">
                Status
              </p>
              <span className="inline-block mt-1 bg-[#bef264] text-slate-900 text-[11px] font-black px-3 py-1 rounded-full uppercase">
                Captured
              </span>
            </div>
          </div>

          <div className="p-8 space-y-6">
            {/* Details Grid */}
            <div className="grid grid-cols-1 gap-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-slate-50 rounded-[10px] flex items-center justify-center text-slate-400 border border-slate-100">
                  <Hash size={18} />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Transaction ID
                  </p>
                  <p className="text-sm font-mono font-bold text-slate-700">
                    {paymentInfo.transactionId}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-slate-50 rounded-[10px] flex items-center justify-center text-slate-400 border border-slate-100">
                  <Package size={18} />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Tracking ID
                  </p>
                  <p className="text-sm font-bold text-indigo-600">
                    {paymentInfo.trackingID}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-slate-50 rounded-[10px] flex items-center justify-center text-slate-400 border border-slate-100">
                  <Calendar size={18} />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Payment Date
                  </p>
                  <p className="text-sm font-bold text-slate-700">
                    {new Date(paymentInfo.paidAt).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-dashed border-slate-200">
              
        <button className="w-full flex items-center justify-center gap-2 text-slate-400 hover:text-slate-600 transition-colors text-xs font-bold uppercase tracking-widest">
          <Download size={14} /> Download Receipt
        </button>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 grid grid-cols-2 gap-4">
          <Link
            to="/dashboard/my-parcels"
            className="flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-700 font-bold py-4 rounded-[12px] hover:bg-slate-50 transition-all text-sm"
          >
            My Parcels
          </Link>
          <Link
            to="/dashboard"
            className="flex items-center justify-center gap-2 bg-[#bef264] text-slate-900 font-bold py-4 rounded-[12px] hover:shadow-[0_4px_14px_0_rgba(190,242,100,0.39)] transition-all text-sm"
          >
            Dashboard <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
