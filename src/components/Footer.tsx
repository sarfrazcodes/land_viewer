import Link from "next/link";
import { MapPin, Github, Twitter, Mail } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-auto border-t border-gray-200/50 dark:border-gray-800/50 bg-white/50 dark:bg-black/50 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4 group">
              <div className="p-2 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-400 text-white shadow-lg group-hover:scale-105 transition-transform">
                <MapPin className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">
                Land Viewer
              </span>
            </Link>
            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm mb-6 leading-relaxed">
              A community-driven platform exploring how our local environments evolve over time. Archiving tomorrow's history, today.
            </p>
            {/* Socials */}
            <div className="flex items-center gap-4 text-gray-400 dark:text-gray-500">
              <a href="#" className="hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors">
                <span className="sr-only">Twitter</span>
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors">
                <span className="sr-only">GitHub</span>
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors">
                <span className="sr-only">Email</span>
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-xs font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Explore
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/gallery" className="text-sm text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/submit" className="text-sm text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Submit Imagery
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  About the Project
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal / Resources */}
          <div>
            <h3 className="text-xs font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Resources
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-sm text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  API Documentation
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="mt-12 pt-8 border-t border-gray-100 dark:border-gray-800/60 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-400">
            &copy; {currentYear} Land Use Change Viewer. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
