"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

const links = [
  { href: '/', label: 'Home' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/submit', label: 'Submit' },
  { href: '/about', label: 'About' },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 inset-x-0 z-50 glass border-b border-gray-200/50 dark:border-gray-800/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-500 dark:from-white dark:to-gray-400">
            Land Viewer
          </Link>
          <div className="flex space-x-6">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="relative py-2 text-sm font-medium transition-colors hover:text-gray-900 dark:hover:text-white text-gray-500 dark:text-gray-400">
                {pathname === link.href && (
                  <motion.div
                    layoutId="underline"
                    className="absolute left-0 right-0 bottom-0 h-0.5 bg-gray-900 dark:bg-white"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
