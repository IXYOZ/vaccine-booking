"use client";

import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-between px-6 py-10 sm:px-16 font-sans bg-white dark:bg-black text-black dark:text-white">
      {/* Header */}
      <header className="text-center space-y-5">
        <h1 className="text-5xl font-extrabold tracking-tight">V-<span className="text-blue-500">Booking</span></h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">Book your vaccine with ease and confidence.</p>
      </header>

      {/* Main Actions */}
      <main className="flex flex-col sm:flex-row gap-4 mt-10">
        <Link
          href="/booking"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-full shadow transition"
        >
          Book Now
        </Link>
        <Link
          href="/register"
          className="border border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950 font-semibold px-6 py-3 rounded-full transition"
        >
          Create Account
        </Link>
      </main>

      {/* Feature Highlight */}
      <section className="mt-10 max-w-md text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Your health is our priority. Book vaccine appointments, see availability, and manage schedules easily.
        </p>
      </section>

      {/* Footer */}
      <footer className="mt-16 text-sm flex gap-6 text-gray-400 dark:text-gray-600">
        <Link href="/about" className="hover:underline">About</Link>
        <Link href="/contact" className="hover:underline">Contact</Link>
        <Link href="/doctors" className="hover:underline">See Doctors</Link>
      </footer>
    </div>
  );
}
