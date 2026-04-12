"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  Globe,
  Layers,
  Zap,
  Database,
  Code2,
  Users,
  ArrowRight,
  Leaf,
  Eye,
  Upload,
} from "lucide-react";
import Link from "next/link";

const techStack = [
  {
    icon: <Code2 className="w-6 h-6" />,
    name: "Next.js 16",
    description: "App Router with server + client components for blazing-fast page loads.",
    color: "from-gray-800 to-gray-600",
  },
  {
    icon: <Zap className="w-6 h-6" />,
    name: "Framer Motion",
    description: "Buttery smooth animations and page transitions throughout the app.",
    color: "from-purple-600 to-pink-500",
  },
  {
    icon: <Database className="w-6 h-6" />,
    name: "Supabase",
    description: "Postgres database + object storage for images with real-time capabilities.",
    color: "from-emerald-600 to-teal-500",
  },
  {
    icon: <Layers className="w-6 h-6" />,
    name: "Tailwind CSS v4",
    description: "Utility-first CSS with bleeding-edge v4 engine for zero-runtime styling.",
    color: "from-cyan-500 to-blue-600",
  },
  {
    icon: <Globe className="w-6 h-6" />,
    name: "TypeScript",
    description: "Full type safety from API layer to UI components.",
    color: "from-blue-600 to-indigo-600",
  },
  {
    icon: <Users className="w-6 h-6" />,
    name: "Zustand",
    description: "Lightweight global state management for seamless client-side data flow.",
    color: "from-orange-500 to-amber-400",
  },
];

const features = [
  {
    icon: <Eye className="w-7 h-7" />,
    title: "Interactive Comparison Slider",
    desc: "Drag a pixel-perfect slider to reveal before and after imagery side-by-side on any device.",
  },
  {
    icon: <Upload className="w-7 h-7" />,
    title: "Community Submissions",
    desc: "Anyone can upload real before/after photos. Images are stored on Supabase CDN and displayed instantly.",
  },
  {
    icon: <Leaf className="w-7 h-7" />,
    title: "Category Filtering",
    desc: "Filter the gallery by Urban, Agricultural, Commercial, or Residential to find what matters to you.",
  },
  {
    icon: <Database className="w-7 h-7" />,
    title: "Live Database",
    desc: "Every submission is persisted to a cloud Postgres database and served through a fast Next.js API.",
  },
];

import { Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function AboutPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <div className="overflow-x-hidden">
      {/* ─── HERO ─── */}
      <section
        ref={heroRef}
        className="relative h-[75vh] flex items-center justify-center overflow-hidden"
      >
        {/* Parallax BG */}
        <motion.div
          style={{ y: heroY }}
          className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-cyan-50 dark:from-[#0d0d1a] dark:via-[#0a0a0a] dark:to-[#001820]"
        >
          <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-blue-400/20 rounded-full filter blur-3xl animate-blob" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-indigo-400/15 rounded-full filter blur-3xl animate-blob animation-delay-2000" />
          <div className="absolute top-1/2 left-0 w-[350px] h-[350px] bg-cyan-400/15 rounded-full filter blur-3xl animate-blob animation-delay-4000" />
        </motion.div>

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 text-center px-4 max-w-4xl mx-auto"
        >
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400 mb-6 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800"
          >
            About the Project
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-6 leading-tight"
          >
            Documenting{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
              Our World
            </span>{" "}
            — One Frame at a Time
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.7 }}
            className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          >
            Land Viewer is a community-driven platform to record, compare and share how
            our local environments change over time — from farmlands to cities, deserts to solar farms.
          </motion.p>
        </motion.div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-white dark:from-[#0a0a0a] to-transparent z-10" />
      </section>

      {/* ─── MISSION ─── */}
      <section className="py-24 bg-white dark:bg-[#0a0a0a] relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-4 block">
                Our Mission
              </span>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                Making land-use change
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-cyan-500">
                  visible to everyone.
                </span>
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                Urban sprawl, deforestation, and infrastructure growth happen gradually — so gradually that
                most people don't notice until the change is complete. Land Viewer gives communities a
                simple way to create a visual memory of their surroundings.
              </p>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
                By uploading before-and-after imagery and storing it permanently in the cloud, we build a
                living archive that anyone can explore — a record of the world as it was and as it is now.
              </p>
              <Link
                href="/gallery"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-semibold text-sm shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
              >
                View the Gallery <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

            {/* Stats card */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { value: "∞", label: "Submissions", sub: "community-powered" },
                { value: "4", label: "Categories", sub: "Urban · Agri · Comm · Resi" },
                { value: "100%", label: "Open", sub: "free to use & submit" },
                { value: "CDN", label: "Image Delivery", sub: "Supabase global edge" },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass dark:glass-dark rounded-2xl p-6"
                >
                  <div className="text-3xl font-extrabold text-gray-900 dark:text-white mb-1">{stat.value}</div>
                  <div className="font-semibold text-gray-700 dark:text-gray-200 text-sm mb-1">{stat.label}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{stat.sub}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── FEATURES ─── */}
      <section className="py-24 bg-gray-50 dark:bg-[#0d0d0d]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-3 block">
              What We Built
            </span>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white">Key Features</h2>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {features.map((f, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="group glass dark:glass-dark rounded-2xl p-8 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white mb-5 group-hover:scale-110 transition-transform">
                  {f.icon}
                </div>
                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">{f.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── TECH STACK ─── */}
      <section className="py-24 bg-white dark:bg-[#0a0a0a]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-3 block">
              Technology
            </span>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Built with the Best Stack
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
              Every tool was chosen deliberately for performance, developer experience, and production reliability.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {techStack.map((tech, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                whileHover={{ y: -4 }}
                className="group relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                {/* Gradient accent top */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${tech.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tech.color} flex items-center justify-center text-white mb-4 shadow-md`}>
                  {tech.icon}
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">{tech.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                  {tech.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-24 bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-500 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full filter blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-white/10 rounded-full filter blur-3xl" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-extrabold text-white mb-6"
          >
            Have a transformation to share?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white/80 text-lg mb-10"
          >
            Upload your before-and-after photos and contribute to our growing archive of land-use change.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/submit"
              className="px-8 py-4 rounded-full bg-white text-blue-600 font-bold shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all"
            >
              Submit a Transformation
            </Link>
            <Link
              href="/gallery"
              className="px-8 py-4 rounded-full bg-white/10 border border-white/30 text-white font-semibold hover:bg-white/20 transition-all"
            >
              Browse Gallery
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
