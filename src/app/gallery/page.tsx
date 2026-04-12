"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import ComparisonCard from "@/components/ComparisonCard";
import { useStore } from "@/store/useStore";
import { ArrowRight, ImageIcon, Grid3x3, Filter, Upload } from "lucide-react";

const categories = ["All", "Urban", "Agricultural", "Commercial", "Residential"];

const categoryMeta: Record<string, { emoji: string; color: string }> = {
  All:          { emoji: "🌍", color: "from-gray-600 to-gray-800" },
  Urban:        { emoji: "🏙️", color: "from-slate-500 to-slate-700" },
  Agricultural: { emoji: "🌾", color: "from-green-500 to-emerald-700" },
  Commercial:   { emoji: "🏢", color: "from-blue-500 to-indigo-700" },
  Residential:  { emoji: "🏡", color: "from-orange-400 to-rose-600" },
};

export default function GalleryPage() {
  const { entries, isLoading, fetchEntries } = useStore();
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    fetchEntries();
  }, [fetchEntries]);

  const filteredEntries =
    filter === "All" ? entries : entries.filter((e) => e.category === filter);

  const counts: Record<string, number> = { All: entries.length };
  categories.slice(1).forEach((c) => {
    counts[c] = entries.filter((e) => e.category === c).length;
  });

  return (
    <div className="relative min-h-screen py-12 px-4 sm:px-6 lg:px-8 overflow-hidden animate-bg-pan bg-[length:200%_200%]"
      style={{
        background:
          "radial-gradient(ellipse at 20% 50%, rgba(99,102,241,0.08) 0%, transparent 60%), radial-gradient(ellipse at 80% 10%, rgba(6,182,212,0.08) 0%, transparent 55%), #f8fafc",
      }}
    >
      {/* Dark mode base */}
      <div className="absolute inset-0 dark:bg-[#080812] dark:[background:radial-gradient(ellipse_at_20%_50%,rgba(99,102,241,0.12)_0%,transparent_60%),radial-gradient(ellipse_at_80%_10%,rgba(6,182,212,0.10)_0%,transparent_55%),#080812] -z-10" />

      {/* Decorative blur shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-400/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob opacity-60 dark:opacity-20" />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-purple-400/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000 opacity-60 dark:opacity-20" />
        <div className="absolute bottom-1/4 left-1/3 w-[600px] h-[600px] bg-cyan-400/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000 opacity-60 dark:opacity-20" />
      </div>

      {/* Blobs */}
      <div className="absolute top-20 left-[-100px] w-[450px] h-[450px] bg-indigo-400/10 dark:bg-indigo-500/10 rounded-full filter blur-3xl animate-blob pointer-events-none" />
      <div className="absolute bottom-32 right-[-80px] w-[380px] h-[380px] bg-cyan-400/10 dark:bg-cyan-500/10 rounded-full filter blur-3xl animate-blob animation-delay-2000 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-purple-400/10 dark:bg-purple-500/10 rounded-full filter blur-3xl animate-blob animation-delay-4000 pointer-events-none" />

      {/* Dot grid */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.025] dark:opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #6366f1 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* ── HERO BANNER ── */}
      <section className="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 mb-5 px-4 py-2 rounded-full bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-200 dark:border-indigo-800"
            >
              <ImageIcon className="w-3.5 h-3.5" /> Community Archive
            </motion.span>

            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-5 leading-tight">
              Observation{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-500">
                Gallery
              </span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-10">
              Browse through our growing collection of before-and-after visual records, documenting how
              landscapes, cities, and communities have transformed over time.
            </p>

            <Link
              href="/submit"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all text-sm"
            >
              <Upload className="w-4 h-4" /> Add Your Transformation
            </Link>
          </motion.div>

          {/* ── STATS BAR ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12"
          >
            {[
              { label: "Total Entries",  value: isLoading ? "…" : entries.length, icon: <Grid3x3 className="w-4 h-4" /> },
              { label: "Urban Entries",  value: isLoading ? "…" : counts["Urban"] ?? 0, icon: <span>🏙️</span> },
              { label: "Agricultural",   value: isLoading ? "…" : counts["Agricultural"] ?? 0, icon: <span>🌾</span> },
              { label: "Commercial",     value: isLoading ? "…" : counts["Commercial"] ?? 0, icon: <span>🏢</span> },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 + i * 0.07 }}
                className="glass dark:glass-dark rounded-2xl px-5 py-4 flex items-center justify-between"
              >
                <div>
                  <div className="text-2xl font-extrabold text-gray-900 dark:text-white">{stat.value}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 font-medium mt-0.5">{stat.label}</div>
                </div>
                <div className="text-xl opacity-70">{stat.icon}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* ── CATEGORY FILTER ── */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="flex items-center gap-3 mb-3"
          >
            <Filter className="w-4 h-4 text-gray-400" />
            <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Filter by Category</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap gap-2 mb-10"
          >
            {categories.map((cat) => {
              const meta = categoryMeta[cat];
              return (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                    filter === cat
                      ? `bg-gradient-to-r ${meta.color} text-white shadow-md scale-105`
                      : "bg-white dark:bg-gray-800/80 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-600"
                  }`}
                >
                  <span>{meta.emoji}</span> {cat}
                  {!isLoading && (
                    <span className={`text-xs font-bold rounded-full px-1.5 py-0.5 ${filter === cat ? "bg-white/20" : "bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400"}`}>
                      {counts[cat] ?? 0}
                    </span>
                  )}
                </button>
              );
            })}
          </motion.div>

          {/* ── GRID ── */}
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredEntries.map((entry) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.3 }}
                  key={entry.id}
                >
                  <ComparisonCard entry={entry} />
                </motion.div>
              ))}
            </AnimatePresence>

            {isLoading && (
              <div className="col-span-full py-24 text-center">
                <svg className="animate-spin h-10 w-10 text-indigo-400 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <p className="text-gray-500 dark:text-gray-400 font-medium">Loading from Supabase…</p>
              </div>
            )}

            {!isLoading && filteredEntries.length === 0 && (
              <div className="col-span-full py-24 text-center">
                <div className="text-5xl mb-4">🔍</div>
                <h3 className="text-lg font-bold text-gray-700 dark:text-gray-200 mb-2">No entries found</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
                  No {filter !== "All" ? filter.toLowerCase() : ""} transformations have been submitted yet.
                </p>
                <Link
                  href="/submit"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition-colors"
                >
                  Be the first to submit <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* ── BOTTOM CTA STRIP ── */}
      {!isLoading && entries.length > 0 && (
        <section className="relative z-10 py-16 mt-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-3xl bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 p-10 text-center relative overflow-hidden"
            >
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
              <div className="relative z-10">
                <h2 className="text-3xl font-extrabold text-white mb-3">Know a place that's changed?</h2>
                <p className="text-white/80 mb-7 max-w-lg mx-auto text-sm">Upload your before-and-after photos and help grow our community archive of land-use change.</p>
                <Link
                  href="/submit"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white text-indigo-700 font-bold shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all text-sm"
                >
                  <Upload className="w-4 h-4" /> Submit a Transformation
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      )}
    </div>
  );
}
