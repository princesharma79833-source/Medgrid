import React from "react";
// JSON file load kar rahe hain
import ayushDataset from "../Data/ayushData.json";

export default function Treatments() {
  // Sheet arrays extract kar rahe hain
  const institutions = ayushDataset.Institutions || [];

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center border-b border-slate-200 pb-4">
          <div>
            <h1 className="text-3xl font-black text-slate-900">
              Verified AYUSH Institutions & Centers
            </h1>
            <p className="text-slate-600 text-sm mt-1">
              Live Dataset: {institutions.length} Verified Facilities in India
            </p>
          </div>
        </div>

        {/* Dynamic Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {institutions.map((item, idx) => (
            <div
              key={idx}
              className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start gap-4 mb-3">
                  <h2 className="text-xl font-bold text-slate-900">
                    {item.Institution}
                  </h2>
                  <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">
                    {item.System}
                  </span>
                </div>

                <p className="text-sm font-medium text-slate-600 mb-3 flex items-center gap-1.5">
                  📍 {item["City / Location"]}, {item.State}
                </p>

                <p className="text-xs text-slate-500 leading-relaxed mb-4">
                  {item["Credentials / Notable facts"] ||
                    "NABH / Government Recognized Center"}
                </p>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs text-slate-700 font-medium">
                <span className="text-slate-400 block font-bold uppercase tracking-wider text-[10px] mb-0.5">
                  Indicative Pricing
                </span>
                {item["Price info (indicative)"]}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
