"use client";

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight } from 'lucide-react';
import { ComparisonEntry } from '@/lib/mockData';

const categoryColors: Record<string, string> = {
  Urban:        "from-slate-500 to-slate-700",
  Agricultural: "from-green-500 to-emerald-700",
  Commercial:   "from-blue-500 to-indigo-700",
  Residential:  "from-orange-400 to-rose-600",
};

const categoryEmoji: Record<string, string> = {
  Urban: "🏙️", Agricultural: "🌾", Commercial: "🏢", Residential: "🏡",
};

export default function ComparisonCard({ entry }: { entry: ComparisonEntry }) {
  const gradient = categoryColors[entry.category] ?? "from-gray-500 to-gray-700";
  const emoji    = categoryEmoji[entry.category] ?? "📍";

  return (
    <Link href={`/compare/${entry.id}`} className="block group">
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800"
      >
        {/* Category accent line */}
        <div className={`h-1 bg-gradient-to-r ${gradient}`} />

        {/* Image */}
        <div className="relative h-52 w-full overflow-hidden">
          <Image
            src={entry.afterImage}
            alt={`${entry.location} After`}
            fill
            className="object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

          {/* Category badge */}
          <div className="absolute top-3 left-3">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${gradient} shadow-md`}>
              <span>{emoji}</span>{entry.category}
            </span>
          </div>

          {/* Year range pill — bottom of image */}
          <div className="absolute bottom-3 left-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-white bg-black/50 backdrop-blur-md border border-white/20">
              <Calendar className="w-3 h-3" />
              {entry.yearBefore} → {entry.yearAfter}
            </span>
          </div>

          {/* "View Comparison" reveal on hover */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-gray-900 font-semibold text-sm shadow-xl">
              View Comparison <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1.5 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
            {entry.location}
          </h3>
          <p className="text-sm line-clamp-2 text-gray-500 dark:text-gray-400 leading-relaxed">
            {entry.description}
          </p>
        </div>
      </motion.div>
    </Link>
  );
}
