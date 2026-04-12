"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import ComparisonCard from "@/components/ComparisonCard";
import { useStore } from "@/store/useStore";
import { ArrowRight } from "lucide-react";
import { useRef, useEffect } from "react";

export default function Home() {
  const { entries, fetchEntries } = useStore();
  const featuredEntries = entries.slice(0, 3);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchEntries();
  }, [fetchEntries]);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <div className="flex flex-col min-h-screen" ref={containerRef}>
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Parallax Background */}
        <motion.div
          style={{ y }}
          className="absolute inset-0 z-0 bg-gradient-to-br from-indigo-50 via-white to-cyan-50 dark:from-gray-900 dark:via-black dark:to-gray-800"
        >
          {/* Decorative blur shapes */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-400/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
          <div className="absolute -bottom-8 left-1/2 w-96 h-96 bg-pink-400/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000" />
        </motion.div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-6"
          >
            See How Your Local Area Has <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Changed Over Time</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto"
          >
            Explore interactive before-and-after imagery of urban development, agricultural shifts, and environmental changes.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link
              href="/gallery"
              className="inline-flex items-center px-8 py-4 rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-semibold text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            >
              Explore Changes
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-24 bg-white dark:bg-[#0a0a0a] relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Featured Transformations</h2>
              <p className="text-gray-600 dark:text-gray-400">Discover the most dramatic changes documented in our community.</p>
            </div>
            <Link href="/gallery" className="text-blue-600 dark:text-blue-400 hover:underline font-medium items-center hidden sm:flex">
              View all <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredEntries.map((entry, idx) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <ComparisonCard entry={entry} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
