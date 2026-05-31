import { AlertTriangle } from "lucide-react";
import React from "react";

const FinanceAlert = () => {
  return (
    <div>
      <div className="mb-8 p-4 bg-amber-50/70 border border-amber-200/80 rounded-xl flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <h4 className="text-xs font-black text-amber-900 uppercase tracking-wide">
            Workflow Simulation Mode
          </h4>
          <p className="text-[11px] text-amber-800 font-medium mt-0.5 leading-relaxed">
            This module serves as a temporary workflow simulation and is not a
            complete or production-ready system; as such, financial calculations
            and cash flows may contain bugs. Our current focus was strictly on
            completing the core delivery workflow. Since cash management is
            highly sensitive, full implementation is planned for the
            future—please do not rely on this module's data for actual
            processing.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FinanceAlert;
