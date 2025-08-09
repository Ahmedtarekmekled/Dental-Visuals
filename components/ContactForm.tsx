"use client";

import { useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState<string>("");

  return (
    <form
      className="grid gap-6 max-w-xl"
      onSubmit={(e) => {
        e.preventDefault();
        setStatus("Thanks, we'll be in touch.");
      }}
    >
      <div className="space-y-6">
        <input
          className="w-full bg-transparent border-b border-gray-700 pb-4 text-primary placeholder:text-gray-500 focus:border-primary focus:outline-none transition-colors text-lg font-light"
          placeholder="Name"
          required
        />
        <input
          className="w-full bg-transparent border-b border-gray-700 pb-4 text-primary placeholder:text-gray-500 focus:border-primary focus:outline-none transition-colors text-lg font-light"
          placeholder="Email"
          type="email"
          required
        />
        <textarea
          className="w-full bg-transparent border-b border-gray-700 pb-4 text-primary placeholder:text-gray-500 focus:border-primary focus:outline-none transition-colors text-lg font-light min-h-32 resize-none"
          placeholder="Project details"
        />
      </div>

      <div className="pt-6">
        <button className="group relative inline-flex items-center gap-4 text-primary hover:text-gray-300 transition-colors">
          <span className="text-sm font-medium uppercase tracking-wider">
            Send Message
          </span>
          <div className="w-8 h-px bg-primary group-hover:w-12 transition-all duration-300"></div>
        </button>
      </div>

      {status && (
        <p className="text-sm text-gray-400 font-light pt-4">{status}</p>
      )}
    </form>
  );
}
