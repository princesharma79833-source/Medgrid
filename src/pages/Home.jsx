import React, { useState } from "react";
import {
  Search,
  ShieldCheck,
  HeartPulse,
  Activity,
  ArrowRight,
  Sparkles,
  MapPin,
  Clock,
  Award,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Home() {
  const [activeTab, setActiveTab] = useState("allopathy");
  const [searchQuery, setSearchQuery] = useState("");

  // Sample Mock Data for Preview
  const packages = {
    allopathy: [
      {
        id: 1,
        title: "Total Knee Replacement (Bilateral)",
        hospital: "Apollo Hospitals, New Delhi",
        accreditation: "JCI & NABH Accredited",
        price: "$4,200 - $4,800",
        stay: "5 Days Hospital + 7 Days Hotel",
        room: "Private Deluxe Room",
        inclusions: [
          "Surgeon Fee",
          "Implants (US FDA approved)",
          "Airport Transfers",
          "Language Interpreter",
        ],
      },
      {
        id: 2,
        title: "Coronary Artery Bypass (CABG)",
        hospital: "Max Healthcare, Saket",
        accreditation: "NABH Digital Certified",
        price: "$5,500 - $6,200",
        stay: "7 Days Hospital + 10 Days Recovery",
        room: "ICU + Private Suite",
        inclusions: [
          "Pre-op Evaluation",
          "ICU Charges",
          "Post-op Meds",
          "Dedicated Coordinator",
        ],
      },
    ],
    ayush: [
      {
        id: 1,
        title: "14-Day Panchakarma Detox & Rejuvenation",
        hospital: "Somatheeram Ayurveda Village, Kerala",
        accreditation: "NABH AYUSH Centre Grade A",
        price: "$1,800 - $2,200",
        stay: "14 Days Residential Retreat",
        room: "Ayurvedic Heritage Cottage",
        inclusions: [
          "Daily Abhyanga & Shirodhara",
          "Doctor Consultation",
          "Organic Sattvic Meals",
          "Yoga & Meditation",
        ],
      },
      {
        id: 2,
        title: "21-Day Spine & Joint Care Program",
        hospital: "Kottakkal Arya Vaidya Sala",
        accreditation: "NCISM Registered Institute",
        price: "$2,400 - $2,900",
        stay: "21 Days In-patient Care",
        room: "Special Care Room",
        inclusions: [
          "Kizhi & Elakizhi Therapies",
          "Internal Herbal Meds",
          "Custom Diet Plan",
          "Post-treatment Advice",
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* 1. Hero Section with Gradient Background */}
      <div className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 text-white pt-16 pb-24 px-4 sm:px-6 lg:px-8">
        {/* Background Glowing Circles */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-6">
          {/* Top Pill Tag */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-cyan-300 text-xs font-semibold tracking-wide">
            <Sparkles size={14} className="text-amber-400" />
            <span>India's Premier MVT & AYUSH Gateway</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight">
            Verified Healthcare & <br />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              AYUSH Wellness in India
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto font-light leading-relaxed">
            Compare fixed-price surgical and Ayurveda packages with transparent
            pricing, verified accreditations, and instant emergency support.
          </p>

          {/* Search Box Glassmorphism */}
          <div className="mt-8 max-w-2xl mx-auto bg-white/10 backdrop-blur-md p-2 rounded-2xl border border-white/20 shadow-2xl flex flex-col sm:flex-row gap-2">
            <div className="relative flex-grow flex items-center">
              <Search className="absolute left-4 text-slate-400" size={20} />
              <input
                type="text"
                placeholder="Search treatment (e.g., Knee Replacement, Panchakarma)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-slate-900/60 text-white placeholder-slate-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 border border-slate-700/50 text-sm"
              />
            </div>
            <button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-7 py-3.5 rounded-xl font-bold shadow-lg shadow-cyan-500/25 transition flex items-center justify-center gap-2 text-sm">
              Search Care
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main Content & Tabs Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20 pb-20">
        {/* Toggle Switch Tabs */}
        <div className="flex justify-center mb-10">
          <div className="bg-white p-1.5 rounded-2xl shadow-lg border border-slate-200 flex gap-2">
            <button
              onClick={() => setActiveTab("allopathy")}
              className={`flex items-center gap-2.5 px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 ${
                activeTab === "allopathy"
                  ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-md"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <HeartPulse size={18} />
              <span>Specialty Allopathy Care</span>
            </button>
            <button
              onClick={() => setActiveTab("ayush")}
              className={`flex items-center gap-2.5 px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 ${
                activeTab === "ayush"
                  ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <Activity size={18} />
              <span>AYUSH & Wellness Retreats</span>
            </button>
          </div>
        </div>

        {/* 3. Package Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {packages[activeTab].map((pkg) => (
            <div
              key={pkg.id}
              className="bg-white rounded-3xl border border-slate-200/80 p-7 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Header & Badges */}
                <div className="flex justify-between items-start gap-4 mb-4">
                  <div>
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border mb-2 ${
                        activeTab === "allopathy"
                          ? "bg-blue-50 text-blue-700 border-blue-200"
                          : "bg-emerald-50 text-emerald-700 border-emerald-200"
                      }`}
                    >
                      <ShieldCheck size={14} />
                      {pkg.accreditation}
                    </span>
                    <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {pkg.title}
                    </h3>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-500 font-medium block">
                      Fixed Estimate
                    </span>
                    <span className="text-lg font-black text-slate-900">
                      {pkg.price}
                    </span>
                  </div>
                </div>

                {/* Sub info */}
                <p className="text-sm font-semibold text-slate-600 flex items-center gap-2 mb-4">
                  <MapPin size={16} className="text-slate-400" />
                  {pkg.hospital}
                </p>

                {/* Meta Attributes Pill Box */}
                <div className="grid grid-cols-2 gap-2 bg-slate-50 p-3 rounded-xl text-xs text-slate-700 mb-5 font-medium">
                  <div className="flex items-center gap-1.5">
                    <Clock size={14} className="text-slate-400" />
                    <span>{pkg.stay}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Award size={14} className="text-slate-400" />
                    <span>{pkg.room}</span>
                  </div>
                </div>

                {/* Inclusions List */}
                <div className="space-y-2 mb-6">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Package Inclusions:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {pkg.inclusions.map((inc, index) => (
                      <span
                        key={index}
                        className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md text-xs font-medium"
                      >
                        ✓ {inc}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Action Buttons */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <Link
                  to="/compare"
                  className="text-xs font-bold text-slate-600 hover:text-blue-600 flex items-center gap-1"
                >
                  Compare Options
                </Link>
                <Link
                  to="/quote"
                  className={`px-5 py-2.5 rounded-xl text-xs font-bold text-white shadow-md flex items-center gap-2 transition ${
                    activeTab === "allopathy"
                      ? "bg-blue-600 hover:bg-blue-700 shadow-blue-500/20"
                      : "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/20"
                  }`}
                >
                  <span>Get Locked Quote</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
