"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Calendar, Share2, MapPin, Check } from "lucide-react";
import ComparisonSlider from "@/components/ComparisonSlider";
import { useStore } from "@/store/useStore";
import Link from "next/link";

const categoryColors: Record<string, string> = {
  Urban:        "from-slate-500 to-slate-700",
  Agricultural: "from-green-500 to-emerald-700",
  Commercial:   "from-blue-500 to-indigo-700",
  Residential:  "from-orange-400 to-rose-600",
};

const categoryEmoji: Record<string, string> = {
  Urban: "🏙️", Agricultural: "🌾", Commercial: "🏢", Residential: "🏡",
};

export default function CompareViewer() {
  const { id } = useParams() as { id: string };
  const router = useRouter();
  const { entries, fetchEntries } = useStore();
  const [copied, setCopied] = useState(false);

  const copyLink = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => { if (entries.length === 0) fetchEntries(); }, [entries.length, fetchEntries]);

  const entry = entries.find((e) => e.id === id);

  if (!entry) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "radial-gradient(ellipse at 20% 30%, rgba(99,102,241,0.09) 0%, transparent 55%), #f8fafc" }}
      >
        <div className="absolute inset-0 dark:bg-[#080812] -z-10" />
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-xl font-bold text-gray-700 dark:text-gray-200 mb-3">Entry not found</h2>
          <Link href="/gallery" className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline">← Back to Gallery</Link>
        </div>
      </div>
    );
  }

  const gradient = categoryColors[entry.category] ?? "from-gray-500 to-gray-700";
  const emoji    = categoryEmoji[entry.category]  ?? "📍";
  const yearsSpan = entry.yearAfter - entry.yearBefore;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative min-h-screen overflow-hidden animate-bg-pan bg-[length:200%_200%]"
      style={{ background: "radial-gradient(ellipse at 20% 30%, rgba(99,102,241,0.09) 0%, transparent 55%), radial-gradient(ellipse at 80% 70%, rgba(6,182,212,0.08) 0%, transparent 55%), #f8fafc" }}
    >
      {/* Dark mode base */}
      <div className="absolute inset-0 dark:bg-[#080812] dark:[background:radial-gradient(ellipse_at_20%_30%,rgba(99,102,241,0.13)_0%,transparent_55%),radial-gradient(ellipse_at_80%_70%,rgba(6,182,212,0.11)_0%,transparent_55%),#080812] -z-10" />
      
      {/* Decorative blur shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-400/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob opacity-60 dark:opacity-20" />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-purple-400/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000 opacity-60 dark:opacity-20" />
        <div className="absolute bottom-1/4 left-1/3 w-[600px] h-[600px] bg-cyan-400/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000 opacity-60 dark:opacity-20" />
      </div>
      <div className="absolute inset-0 -z-10 opacity-[0.025] dark:opacity-[0.04] pointer-events-none"
        style={{ backgroundImage: "radial-gradient(circle, #6366f1 1px, transparent 1px)", backgroundSize: "32px 32px" }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Back button */}
        <motion.button
          initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 dark:hover:text-white mb-8 transition-colors group"
        >
          <span className="w-8 h-8 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center group-hover:border-indigo-400 transition-colors shadow-sm">
            <ArrowLeft className="w-4 h-4" />
          </span>
          Back to Gallery
        </motion.button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          {/* Slider */}
          <motion.div
            initial={{ y: 24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}
            className="lg:col-span-2 space-y-4"
          >
            <ComparisonSlider beforeImage={entry.beforeImage} afterImage={entry.afterImage} />

            {/* Drag hint */}
            <p className="text-center text-xs text-gray-400 dark:text-gray-500 flex items-center justify-center gap-1.5">
              <span>←</span> Drag the handle to compare <span>→</span>
            </p>

            {/* Premium action card */}
            <div className="rounded-2xl bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-white/40 dark:border-white/10 shadow-xl p-4">
              <div className="grid grid-cols-2 gap-3">
                {/* Copy Link */}
                <motion.button
                  onClick={copyLink}
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                  className={`relative flex items-center gap-4 px-5 py-4 rounded-xl text-left transition-all duration-300 border ${
                    copied
                      ? "bg-green-50 dark:bg-green-900/30 border-green-300 dark:border-green-700"
                      : "bg-gray-50 dark:bg-gray-800/80 border-gray-200 dark:border-gray-700 hover:border-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20"
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${
                    copied ? "bg-green-500" : "bg-gradient-to-br from-gray-700 to-gray-900"
                  }`}>
                    <AnimatePresence mode="wait">
                      {copied
                        ? <motion.div key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}><Check className="w-5 h-5 text-white" /></motion.div>
                        : <motion.div key="share" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}><Share2 className="w-5 h-5 text-white" /></motion.div>
                      }
                    </AnimatePresence>
                  </div>
                  <div>
                    <AnimatePresence mode="wait">
                      {copied
                        ? <motion.p key="l2" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="font-bold text-sm text-green-600 dark:text-green-400">Copied! 🎉</motion.p>
                        : <motion.p key="l1" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="font-bold text-sm text-gray-800 dark:text-gray-100">Copy Link</motion.p>
                      }
                    </AnimatePresence>
                    <p className="text-xs text-gray-400 mt-0.5">Share this comparison</p>
                  </div>
                </motion.button>

                {/* Browse Gallery */}
                <Link href="/gallery">
                  <motion.div
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                    className="flex items-center gap-4 px-5 py-4 rounded-xl bg-gradient-to-br from-indigo-600 to-cyan-500 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-shadow cursor-pointer"
                  >
                    <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-sm text-white">Browse Gallery</p>
                      <p className="text-xs text-white/70 mt-0.5">See more changes</p>
                    </div>
                  </motion.div>
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ x: 24, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }}
            className="flex flex-col gap-4"
          >
            {/* Main info card */}
            <div className="rounded-3xl overflow-hidden shadow-xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
              {/* Gradient header */}
              <div className={`h-2 bg-gradient-to-r ${gradient}`} />
              <div className="p-7">
                {/* Category badge */}
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${gradient} shadow mb-5`}>
                  {emoji} {entry.category}
                </span>

                <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight">
                  {entry.location}
                </h1>

                {/* Timeline */}
                <div className="flex items-center gap-3 mb-6 p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700">
                  <Calendar className="w-5 h-5 text-indigo-500 flex-shrink-0" />
                  <div className="flex items-center gap-2 flex-1 justify-between">
                    <div className="text-center">
                      <div className="text-xs text-gray-400 mb-0.5">Before</div>
                      <div className="text-xl font-bold text-gray-900 dark:text-white">{entry.yearBefore}</div>
                    </div>
                    <div className="flex-1 flex flex-col items-center gap-1">
                      <div className="w-full h-px bg-gradient-to-r from-indigo-400 to-cyan-400" />
                      <span className="text-xs font-semibold text-indigo-500">{yearsSpan} yrs</span>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-gray-400 mb-0.5">After</div>
                      <div className="text-xl font-bold text-gray-900 dark:text-white">{entry.yearAfter}</div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">About the Change</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm">{entry.description}</p>
                </div>
              </div>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-2 gap-3">
              <div className="glass dark:glass-dark rounded-2xl p-4 text-center">
                <div className="text-2xl font-extrabold text-gray-900 dark:text-white">{yearsSpan}</div>
                <div className="text-xs text-gray-500 mt-0.5">Years Apart</div>
              </div>
              <div className="glass dark:glass-dark rounded-2xl p-4 text-center">
                <div className="text-2xl">{emoji}</div>
                <div className="text-xs text-gray-500 mt-0.5">{entry.category}</div>
              </div>
            </div>


          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
