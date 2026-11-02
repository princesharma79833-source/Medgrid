export type ComparePackage = {
  id: string;
  title: string;
  provider: string;
  location: string;
  system: "allo" | "ayush";
  accreditations: string[];
  price: string;
  procedureFee: string;
  room: string;
  hospitalDays: number;
  hotelDays: number;
  icuDays: number;
  inclusions: Record<"Pre-op diagnostics" | "Daily meals" | "Airport transfer" | "Interpreter support", boolean>;
  exclusions: string[];
};

export const comparePackages: ComparePackage[] = [
  {
    id: "apollo-tkr", title: "Total Knee Replacement", provider: "Apollo Hospitals", location: "New Delhi",
    system: "allo", accreditations: ["NABH", "JCI"], price: "$4,200 – $4,800", procedureFee: "$2,900 (incl. surgeon)",
    room: "Private Deluxe", hospitalDays: 6, hotelDays: 10, icuDays: 1,
    inclusions: { "Pre-op diagnostics": true, "Daily meals": true, "Airport transfer": true, "Interpreter support": true },
    exclusions: ["Special implants", "Extra ICU stay", "Home medicines"],
  },
  {
    id: "max-tkr", title: "Knee Replacement", provider: "Max Healthcare", location: "Saket, New Delhi",
    system: "allo", accreditations: ["NABH", "JCI"], price: "$3,900 – $4,500", procedureFee: "$2,600 (incl. surgeon)",
    room: "Twin Sharing", hospitalDays: 5, hotelDays: 12, icuDays: 1,
    inclusions: { "Pre-op diagnostics": true, "Daily meals": true, "Airport transfer": true, "Interpreter support": false },
    exclusions: ["Special implants", "Extra ICU stay", "Home medicines"],
  },
  {
    id: "somatheeram-pk14", title: "14-Day Panchakarma Detox", provider: "Somatheeram Ayurveda Resort", location: "Kovalam, Kerala",
    system: "ayush", accreditations: ["NABH-AYUSH"], price: "$1,600 – $2,000", procedureFee: "$1,100 (therapies & physician)",
    room: "Private Deluxe", hospitalDays: 0, hotelDays: 14, icuDays: 0,
    inclusions: { "Pre-op diagnostics": true, "Daily meals": true, "Airport transfer": true, "Interpreter support": true },
    exclusions: ["Home medicines"],
  },
  {
    id: "fortis-cabg", title: "Cardiac CABG Surgery", provider: "Fortis Escorts", location: "New Delhi",
    system: "allo", accreditations: ["NABH", "JCI"], price: "$5,200 – $6,500", procedureFee: "$3,800 (incl. surgeon)",
    room: "Private Deluxe", hospitalDays: 8, hotelDays: 7, icuDays: 3,
    inclusions: { "Pre-op diagnostics": true, "Daily meals": true, "Airport transfer": true, "Interpreter support": true },
    exclusions: ["Extra ICU stay", "Home medicines"],
  },
];

export type Treatment = {
  id: string;
  name: string;
  system: "allo" | "ayush";
  duration: string;
  startingPrice: string;
  summary: string;
  highlights: string[];
};

export const treatments: Treatment[] = [
  { id: "cardiac", name: "Cardiac", system: "allo", duration: "7–14 days", startingPrice: "$4,800", summary: "CABG, valve replacement and angioplasty at JCI-accredited cardiac centres.", highlights: ["CABG bypass", "Valve replacement", "Angioplasty & stenting"] },
  { id: "orthopedics", name: "Orthopedics", system: "allo", duration: "5–21 days", startingPrice: "$3,900", summary: "Joint replacement and spine surgery with robotic-assisted options.", highlights: ["Total knee replacement", "Hip replacement", "Spinal fusion"] },
  { id: "oncology", name: "Oncology", system: "allo", duration: "Cycle-based, 2–6 weeks", startingPrice: "$3,500", summary: "Tumour boards, surgery, chemotherapy and radiation in one plan.", highlights: ["Surgical oncology", "Chemotherapy", "Radiation therapy"] },
  { id: "panchakarma", name: "Panchakarma Detox", system: "ayush", duration: "7–21 days", startingPrice: "$1,200", summary: "Classical five-fold Ayurvedic cleanse supervised by BAMS physicians.", highlights: ["Abhyanga & Swedana", "Virechana", "Sattvic diet plan"] },
  { id: "spine-joint", name: "Spine & Joint Care", system: "ayush", duration: "14–28 days", startingPrice: "$1,800", summary: "Integrative therapy for back pain, arthritis and mobility.", highlights: ["Kati Basti", "Janu Basti", "Physiotherapy & yoga"] },
  { id: "rejuvenation", name: "Rejuvenation", system: "ayush", duration: "7–14 days", startingPrice: "$900", summary: "Rasayana therapies for stress, sleep and vitality.", highlights: ["Shirodhara", "Rasayana herbs", "Meditation"] },
];
