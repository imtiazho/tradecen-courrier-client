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
            This is a temporary simulation focused solely on core delivery
            workflows. Financial modules are highly sensitive, currently
            incomplete, and may contain bugs; full implementation is planned for
            the future. Please do not rely on this data.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FinanceAlert;
