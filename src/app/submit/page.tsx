"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Upload, CheckCircle, ImagePlus, MapPin, Calendar,
  Tag, AlignLeft, ArrowRight, Sparkles, Shield,
  Clock, Users, Star, Info,
} from "lucide-react";

const CATEGORIES = ["Urban", "Agricultural", "Commercial", "Residential"] as const;
type Category = (typeof CATEGORIES)[number];

const categoryColors: Record<Category, string> = {
  Urban:        "from-slate-600 to-slate-800",
  Agricultural: "from-green-500 to-emerald-700",
  Commercial:   "from-blue-500 to-indigo-700",
  Residential:  "from-orange-400 to-rose-600",
};

const categoryEmoji: Record<Category, string> = {
  Urban: "🏙️", Agricultural: "🌾", Commercial: "🏢", Residential: "🏡",
};

const tips = [
  { icon: <Star className="w-4 h-4 text-amber-500" />, text: "Use high-resolution images for the best comparison quality." },
  { icon: <Clock className="w-4 h-4 text-blue-500" />, text: "The bigger the time gap between images, the more dramatic the transformation." },
  { icon: <MapPin className="w-4 h-4 text-rose-500" />, text: "Include the city & neighbourhood in the location name for easy discovery." },
  { icon: <Shield className="w-4 h-4 text-green-500" />, text: "All images are stored securely on Supabase and served over a global CDN." },
];

export default function SubmitPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState<1 | 2>(1);

  const [formData, setFormData] = useState({
    location: "", yearBefore: 2000,
    yearAfter: new Date().getFullYear(), description: "", category: "Urban" as Category,
  });

  const [beforeFile, setBeforeFile] = useState<File | null>(null);
  const [afterFile,  setAfterFile]  = useState<File | null>(null);
  const [beforePreview, setBeforePreview] = useState("");
  const [afterPreview,  setAfterPreview]  = useState("");

  const beforeRef = useRef<HTMLInputElement>(null);
  const afterRef  = useRef<HTMLInputElement>(null);

  const pickFile = (e: React.ChangeEvent<HTMLInputElement>, type: "before" | "after") => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    type === "before" ? (setBeforeFile(file), setBeforePreview(url)) : (setAfterFile(file), setAfterPreview(url));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!beforeFile || !afterFile) { setError("Both Before and After images are required."); return; }
    setIsSubmitting(true);
    try {
      const fd = new FormData();
      fd.append("beforeImage", beforeFile); fd.append("afterImage",  afterFile);
      fd.append("location", formData.location); fd.append("yearBefore", String(formData.yearBefore));
      fd.append("yearAfter", String(formData.yearAfter)); fd.append("category", formData.category);
      fd.append("description", formData.description);
      const res = await fetch("/api/comparisons", { method: "POST", body: fd });
      if (!res.ok) { const j = await res.json(); throw new Error(j.error ?? "Upload failed."); }
      setIsSuccess(true);
      setTimeout(() => router.push("/gallery"), 3000);
    } catch (err: any) { setError(err.message); }
    finally { setIsSubmitting(false); }
  };

  /* ── Success Screen ── */
  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4"
        style={{ background: "radial-gradient(ellipse at 70% 0%, rgba(99,102,241,0.10) 0%, transparent 55%), radial-gradient(ellipse at 10% 80%, rgba(6,182,212,0.09) 0%, transparent 55%), #f8fafc" }}
      >
        <div className="absolute inset-0 dark:bg-[#080812] -z-10" />
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center max-w-md">
          <motion.div
            initial={{ scale: 0 }} animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
            className="w-28 h-28 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-green-500/30"
          >
            <CheckCircle className="w-14 h-14 text-white" />
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-3xl font-extrabold text-gray-900 dark:text-white mb-3">
            Transformation Submitted!
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="text-gray-500 dark:text-gray-400 mb-2">
            Your images are stored in Supabase and will appear in the gallery shortly.
          </motion.p>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }} className="text-sm text-gray-400">
            Redirecting to gallery…
          </motion.p>
        </motion.div>
      </div>
    );
  }

  return (
    <div
      className="relative min-h-screen py-14 px-4 overflow-hidden animate-bg-pan bg-[length:200%_200%]"
      style={{ background: "radial-gradient(ellipse at 70% 0%, rgba(99,102,241,0.10) 0%, transparent 55%), radial-gradient(ellipse at 10% 80%, rgba(6,182,212,0.09) 0%, transparent 55%), #f8fafc" }}
    >
      <div className="absolute inset-0 dark:bg-[#080812] dark:[background:radial-gradient(ellipse_at_70%_0%,rgba(99,102,241,0.15)_0%,transparent_55%),radial-gradient(ellipse_at_10%_80%,rgba(6,182,212,0.12)_0%,transparent_55%),#080812] -z-10" />
      
      {/* Decorative blur shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-400/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob opacity-60 dark:opacity-20" />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-purple-400/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000 opacity-60 dark:opacity-20" />
        <div className="absolute bottom-1/4 left-1/3 w-[600px] h-[600px] bg-cyan-400/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000 opacity-60 dark:opacity-20" />
      </div>
      <div className="absolute inset-0 -z-10 opacity-[0.025] dark:opacity-[0.04] pointer-events-none"
        style={{ backgroundImage: "radial-gradient(circle, #6366f1 1px, transparent 1px)", backgroundSize: "32px 32px" }} />

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Page header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 mb-4 px-4 py-2 rounded-full bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-200 dark:border-indigo-800">
            <Sparkles className="w-3.5 h-3.5" /> Community Contribution
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-4">
            Submit a{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-500">
              Transformation
            </span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 max-w-lg mx-auto">
            Upload before &amp; after images of a land-use change you've witnessed. It takes less than a minute.
          </p>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

          {/* ── LEFT: FORM ── */}
          <div className="lg:col-span-2">
            {/* Step indicator */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="flex items-center gap-3 mb-6">
              {[1, 2].map((s) => (
                <div key={s} className="flex items-center gap-3">
                  <button type="button"
                    onClick={() => { if (s < step || (s === 2 && beforeFile && afterFile)) setStep(s as 1 | 2); }}
                    className={`w-9 h-9 rounded-full text-sm font-bold transition-all duration-300 flex items-center justify-center
                    ${step >= s ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/30" : "bg-gray-200 dark:bg-gray-800 text-gray-400"}`}
                  >{s}</button>
                  {s === 1 && <div className={`w-16 h-0.5 transition-all duration-500 ${step === 2 ? "bg-indigo-600" : "bg-gray-200 dark:bg-gray-700"}`} />}
                </div>
              ))}
              <span className="text-xs text-gray-400 font-medium ml-1">
                Step {step} of 2 — {step === 1 ? "Location Details" : "Upload Images"}
              </span>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
              className="glass dark:glass-dark rounded-3xl overflow-hidden shadow-2xl"
            >
              {/* Category colour bar */}
              <div className={`h-1.5 bg-gradient-to-r ${categoryColors[formData.category]} transition-all duration-500`} />

              <div className="p-8 md:p-10">
                {error && (
                  <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                    className="mb-6 px-4 py-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 text-red-700 dark:text-red-300 text-sm"
                  >{error}</motion.div>
                )}

                <form onSubmit={handleSubmit}>
                  <AnimatePresence mode="wait">

                    {/* STEP 1 */}
                    {step === 1 && (
                      <motion.div key="step1" initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 24 }} transition={{ duration: 0.28 }} className="space-y-5"
                      >
                        {/* Location */}
                        <div>
                          <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
                            <MapPin className="w-3.5 h-3.5" /> Location Name
                          </label>
                          <input required type="text" value={formData.location}
                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                            placeholder="e.g. Downtown Valley, Mumbai Suburbs…"
                            className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                          />
                        </div>

                        {/* Years */}
                        <div className="grid grid-cols-2 gap-4">
                          {(["yearBefore", "yearAfter"] as const).map((field) => (
                            <div key={field}>
                              <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
                                <Calendar className="w-3.5 h-3.5" /> Year {field === "yearBefore" ? "Before" : "After"}
                              </label>
                              <input required type="number" min={1900} max={new Date().getFullYear()}
                                value={formData[field]}
                                onChange={(e) => setFormData({ ...formData, [field]: parseInt(e.target.value) })}
                                className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                              />
                            </div>
                          ))}
                        </div>

                        {/* Category pills */}
                        <div>
                          <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">
                            <Tag className="w-3.5 h-3.5" /> Category
                          </label>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                            {CATEGORIES.map((cat) => (
                              <button key={cat} type="button" onClick={() => setFormData({ ...formData, category: cat })}
                                className={`flex flex-col items-center gap-1.5 px-3 py-3 rounded-xl text-sm font-semibold transition-all duration-200 border ${
                                  formData.category === cat
                                    ? `bg-gradient-to-br ${categoryColors[cat]} text-white shadow-md border-transparent scale-105`
                                    : "bg-gray-50 dark:bg-gray-900 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-indigo-300"
                                }`}
                              >
                                <span className="text-xl">{categoryEmoji[cat]}</span>
                                <span className="text-xs">{cat}</span>
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Description */}
                        <div>
                          <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
                            <AlignLeft className="w-3.5 h-3.5" /> Description
                          </label>
                          <textarea required rows={4} value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            placeholder="Describe what changed here — what existed before, what's there now…"
                            className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all resize-none"
                          />
                        </div>

                        <button type="button"
                          onClick={() => {
                            if (!formData.location || !formData.description) { setError("Please fill in all fields before continuing."); return; }
                            setError(null); setStep(2);
                          }}
                          className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-bold text-base shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
                        >
                          Continue to Images <ArrowRight className="w-5 h-5" />
                        </button>
                      </motion.div>
                    )}

                    {/* STEP 2 */}
                    {step === 2 && (
                      <motion.div key="step2" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.28 }} className="space-y-5"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <ImagePlus className="w-4 h-4 text-gray-400" />
                          <h2 className="font-bold text-gray-900 dark:text-white">Upload Images</h2>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          {(["before", "after"] as const).map((type) => {
                            const preview = type === "before" ? beforePreview : afterPreview;
                            const ref = type === "before" ? beforeRef : afterRef;
                            return (
                              <motion.div key={type} whileHover={{ scale: 1.01 }} onClick={() => ref.current?.click()}
                                className={`relative group cursor-pointer rounded-2xl overflow-hidden border-2 border-dashed transition-all duration-300 h-52
                                  ${preview ? "border-transparent" : "border-gray-300 dark:border-gray-700 hover:border-indigo-400 dark:hover:border-indigo-500 bg-gray-50 dark:bg-gray-900"}`}
                              >
                                {preview ? (
                                  <>
                                    <img src={preview} alt={type} className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                      <p className="text-white font-semibold text-sm">Click to change</p>
                                    </div>
                                    <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold text-white ${type === "before" ? "bg-gray-900/80" : "bg-indigo-600/90"}`}>
                                      {type.toUpperCase()}
                                    </span>
                                  </>
                                ) : (
                                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg ${type === "before" ? "bg-gradient-to-br from-gray-500 to-gray-700" : "bg-gradient-to-br from-indigo-500 to-cyan-500"}`}>
                                      <Upload className="w-6 h-6 group-hover:-translate-y-1 transition-transform" />
                                    </div>
                                    <div className="text-center">
                                      <p className="font-semibold text-gray-700 dark:text-gray-200 text-sm">
                                        {type === "before" ? "Before" : "After"} Image
                                      </p>
                                      <p className="text-xs text-gray-400 mt-0.5">PNG · JPG · WEBP</p>
                                    </div>
                                  </div>
                                )}
                                <input ref={ref} type="file" accept="image/*" onChange={(e) => pickFile(e, type)} className="hidden" />
                              </motion.div>
                            );
                          })}
                        </div>

                        {/* Mini summary */}
                        <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-800 flex flex-wrap gap-4 text-sm">
                          <span className="flex items-center gap-1.5 text-gray-600 dark:text-gray-400"><MapPin className="w-3.5 h-3.5 text-indigo-500" />{formData.location || "—"}</span>
                          <span className="flex items-center gap-1.5 text-gray-600 dark:text-gray-400"><Calendar className="w-3.5 h-3.5 text-indigo-500" />{formData.yearBefore} → {formData.yearAfter}</span>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-bold text-white bg-gradient-to-r ${categoryColors[formData.category]}`}>
                            {categoryEmoji[formData.category]} {formData.category}
                          </span>
                        </div>

                        <button type="submit" disabled={isSubmitting || !beforeFile || !afterFile}
                          className="w-full py-4 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold text-base shadow-lg hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed transition-all hover:-translate-y-0.5"
                        >
                          {isSubmitting ? (
                            <span className="flex items-center justify-center gap-3">
                              <svg className="animate-spin h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                              </svg>
                              Uploading to Supabase…
                            </span>
                          ) : (
                            <span className="flex items-center justify-center gap-2">
                              <Sparkles className="w-5 h-5" /> Submit Transformation
                            </span>
                          )}
                        </button>

                        <button type="button" onClick={() => setStep(1)}
                          className="w-full text-sm text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors py-2"
                        >← Back to Details</button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>
              </div>
            </motion.div>
          </div>

          {/* ── RIGHT: SIDEBAR ── */}
          <div className="space-y-5">
            {/* How it works */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
              className="glass dark:glass-dark rounded-2xl p-6"
            >
              <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Info className="w-4 h-4 text-indigo-500" /> How It Works
              </h3>
              <ol className="space-y-4">
                {[
                  { step: "1", label: "Fill the Details", desc: "Location, years, category & a short description." },
                  { step: "2", label: "Upload Images",    desc: "One 'before' photo and one 'after' photo of the same spot." },
                  { step: "3", label: "Submit",           desc: "Images are uploaded to Supabase CDN and your entry goes live instantly." },
                ].map((s, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-white text-xs font-bold">{s.step}</span>
                    <div>
                      <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">{s.label}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{s.desc}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </motion.div>

            {/* Tips */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
              className="glass dark:glass-dark rounded-2xl p-6"
            >
              <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" /> Tips for a Great Submission
              </h3>
              <ul className="space-y-3">
                {tips.map((tip, i) => (
                  <li key={i} className="flex gap-3 text-xs text-gray-600 dark:text-gray-400">
                    <span className="flex-shrink-0 mt-0.5">{tip.icon}</span>
                    {tip.text}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Stats / social proof */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}
              className="rounded-2xl bg-gradient-to-br from-indigo-600 to-cyan-500 p-6 text-white"
            >
              <Users className="w-7 h-7 mb-3 opacity-80" />
              <h3 className="font-bold text-lg mb-1">Join the Community</h3>
              <p className="text-white/80 text-xs mb-4">
                Every submission helps build a collective memory of how our planet changes. Your contribution matters.
              </p>
              <Link href="/gallery"
                className="inline-flex items-center gap-1.5 text-xs font-semibold bg-white/20 hover:bg-white/30 px-4 py-2 rounded-full transition-colors"
              >
                Browse the Gallery <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
