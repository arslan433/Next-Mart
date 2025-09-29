"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      <div className="text-center">
        {/* Floating Image */}
        <motion.img
          src="./404.webp"
          alt="404 Illustration"
          className="mx-auto w-80 shadow-xl rounded-lg"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Heading */}
        <motion.h1
          className="text-7xl font-extrabold text-blue-700 mt-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Looks Like You're Lost!
        </motion.h1>

        {/* Subtext */}
        <motion.p
          className="text-xl text-gray-700 mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          We can&apos;t seem to find the page you&apos;re looking for.
        </motion.p>

        {/* Button */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <Link
            href="/"
            className="mt-6 inline-block bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg transform transition hover:scale-105 hover:bg-blue-700"
          >
            Return Home
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
