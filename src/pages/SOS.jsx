import React, { useState, useEffect } from "react";
import {
  AlertTriangle,
  PhoneCall,
  Navigation,
  ShieldCheck,
  CheckCircle,
} from "lucide-react";

export default function SOS() {
  const [countdown, setCountdown] = useState(5);
  const [isCancelled, setIsCancelled] = useState(false);
  const [sosActive, setSosActive] = useState(true);

  // 5-second auto-confirm timer
  useEffect(() => {
    if (sosActive && countdown > 0 && !isCancelled) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown, sosActive, isCancelled]);

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6 flex flex-col items-center">
      {/* Top Header */}
      <div className="w-full max-w-3xl flex justify-between items-center mb-8 border-b border-slate-800 pb-4">
        <h1 className="text-2xl font-bold text-red-500 flex items-center gap-2">
          <AlertTriangle className="animate-pulse" /> MedGrid Emergency Net
        </h1>
        <a
          href="tel:112"
          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-semibold flex items-center gap-2 text-sm transition"
        >
          <PhoneCall size={16} /> Call Local EMS
        </a>
      </div>

      <div className="w-full max-w-3xl space-y-6">
        {/* 1. Cancellation Bar & Alert Status */}
        {!isCancelled ? (
          <div className="bg-red-950/60 border border-red-500/50 p-6 rounded-2xl text-center space-y-4">
            <h2 className="text-xl font-bold text-red-400">
              Emergency Dispatch Triggered
            </h2>
            {countdown > 0 ? (
              <div>
                <p className="text-slate-300 text-sm">
                  Auto-confirming ER request in
                </p>
                <div className="text-4xl font-black text-red-400 my-2">
                  {countdown}s
                </div>
                <button
                  onClick={() => setIsCancelled(true)}
                  className="mt-3 bg-slate-800 hover:bg-slate-700 text-slate-300 px-8 py-2.5 rounded-lg text-sm font-medium border border-slate-600 transition"
                >
                  Cancel (False Alarm)
                </button>
              </div>
            ) : (
              <p className="text-emerald-400 font-bold flex items-center justify-center gap-2 text-lg">
                <CheckCircle size={20} /> Request Broadcasted to Closest ER
              </p>
            )}
          </div>
        ) : (
          <div className="bg-slate-800 p-6 rounded-xl text-center text-slate-400 border border-slate-700">
            Emergency SOS cancelled by user.
            <button
              onClick={() => {
                setIsCancelled(false);
                setCountdown(5);
              }}
              className="ml-4 text-blue-400 hover:underline"
            >
              Re-trigger SOS
            </button>
          </div>
        )}

        {/* 2. Live Tracking & ER Assignment (Only shows if not cancelled) */}
        {!isCancelled && countdown === 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in duration-500">
            {/* Ambulance Tracking Card */}
            <div className="bg-slate-800/80 border border-slate-700 p-5 rounded-xl space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-950 px-2.5 py-1 rounded-full border border-emerald-800">
                    Simulated Tracking
                  </span>
                  <h3 className="text-lg font-bold mt-3">
                    ALS Ambulance #AMB-104
                  </h3>
                </div>
                <Navigation className="text-blue-400 animate-bounce mt-1" />
              </div>
              <p className="text-sm text-slate-300">
                Driver: Rajesh Kumar (Verified Paramedic)
              </p>
              <div className="bg-slate-900 p-3 rounded-lg text-sm font-mono text-cyan-400 border border-slate-800">
                ETA: <span className="text-white font-bold">8 Minutes</span>{" "}
                (En-route)
              </div>
            </div>

            {/* Assigned Hospital ER Card */}
            <div className="bg-slate-800/80 border border-slate-700 p-5 rounded-xl space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-xs font-bold text-blue-400 bg-blue-950 px-2.5 py-1 rounded-full border border-blue-800">
                    Best-Fit ER Matched
                  </span>
                  <h3 className="text-lg font-bold mt-3">
                    Max Healthcare Trauma Center
                  </h3>
                </div>
                <ShieldCheck className="text-emerald-400 mt-1" />
              </div>
              <p className="text-sm text-slate-300">
                Level 1 ER • NABH Accredited
              </p>
              <div className="bg-slate-900 p-3 rounded-lg text-xs text-slate-400 space-y-1.5 border border-slate-800">
                <p className="flex items-center gap-2">
                  🟢 Pre-Alert & Digital ID Sent
                </p>
                <p className="flex items-center gap-2">
                  🟢 Bed Reserved (Payment-Blind)
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 3. Patient Clinical Synopsis (Digital ER Card) */}
        <div className="bg-slate-800/50 border border-slate-700 p-5 rounded-xl space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-slate-200">
              Patient Synopsis (Pre-Arrival ER Card)
            </h3>
            <span className="text-[10px] uppercase tracking-wider bg-slate-700 px-2 py-1 rounded text-slate-300">
              Auto-Generated
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
            <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
              <span className="text-slate-500 text-xs block mb-1">
                Primary Complaint
              </span>
              <span className="font-medium text-red-400">Acute Chest Pain</span>
            </div>
            <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
              <span className="text-slate-500 text-xs block mb-1">
                Allergies
              </span>
              <span className="font-medium text-slate-200">Penicillin</span>
            </div>
            <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
              <span className="text-slate-500 text-xs block mb-1">
                Blood Group
              </span>
              <span className="font-medium text-slate-200">O Positive</span>
            </div>
            <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
              <span className="text-slate-500 text-xs block mb-1">
                Language
              </span>
              <span className="font-medium text-slate-200">
                English / Arabic
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
