"use client";
import { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function Apply() {
  const [form, setForm] = useState({
    full_name: "",
    phone: "",
    campus: "",
    num_listings: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit() {
    if (!form.full_name || !form.phone || !form.campus) {
      setError("Please fill in your name, phone, and campus.");
      return;
    }
    setLoading(true);
    setError("");

    const { error } = await supabase
      .from("agent_applications")
      .insert([{
        full_name: form.full_name,
        phone: form.phone,
        campus: form.campus,
        num_listings: form.num_listings,
        description: form.description,
        status: "pending",
      }]);

    if (error) {
      setError("Something went wrong. Please try again.");
      console.error(error);
    } else {
      setSubmitted(true);
    }
    setLoading(false);
  }

  if (submitted) {
    return (
      <main className="min-h-screen font-sans bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl p-10 text-center max-w-md mx-auto shadow-sm">
          <div className="text-5xl mb-4">🎉</div>
          <h1 className="text-xl font-semibold text-gray-900 mb-2">Application submitted!</h1>
          <p className="text-sm text-gray-500 mb-6">We will review your application and contact you on WhatsApp within 24 hours.</p>
          <Link href="/" className="bg-[#003580] text-white text-sm font-medium px-6 py-3 rounded-xl inline-block hover:bg-[#002a6b]">
            Back to homepage
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen font-sans bg-gray-50">

      <nav className="bg-[#003580] px-6 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <img src="/unizik-logo.webp" alt="UNIZIK Logo" className="h-8 w-auto" />
          <div>
            <div className="text-white font-semibold tracking-wider text-base">ZIKACOM</div>
            <div className="text-white/50 text-[9px] tracking-wider">UNIZIK ACCOMMODATION</div>
          </div>
        </Link>
        <div className="hidden md:flex items-center gap-6">
          <Link href="/listings" className="text-white/75 text-sm hover:text-white">Listings</Link>
          <button className="bg-[#F47920] text-white text-xs font-medium px-4 py-2 rounded-full">Find a lodge</button>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-6 py-12">

        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">Apply to list your lodge</h1>
          <p className="text-sm text-gray-500">Fill in your details below. We verify all agents before approving listings on Zikacom.</p>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-sm">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-xs font-medium text-gray-700 mb-1 block">Full name *</label>
              <input
                name="full_name"
                value={form.full_name}
                onChange={handleChange}
                placeholder="Your full name"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#003580] transition-colors"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-700 mb-1 block">Phone / WhatsApp *</label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="08012345678"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#003580] transition-colors"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-700 mb-1 block">Campus area *</label>
              <select
                name="campus"
                value={form.campus}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#003580] transition-colors bg-white"
              >
                <option value="">Select campus</option>
                <option value="Nnewi">Nnewi</option>
                <option value="Awka">Awka</option>
                <option value="Agulu">Agulu</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-gray-700 mb-1 block">Number of lodges</label>
              <input
                name="num_listings"
                value={form.num_listings}
                onChange={handleChange}
                placeholder="How many lodges do you have?"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#003580] transition-colors"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="text-xs font-medium text-gray-700 mb-1 block">Brief description of your lodges</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Tell us about your lodges — location, type, amenities..."
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#003580] transition-colors resize-none h-28"
            />
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-xl mb-4">
              {error}
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-[#F47920] text-white text-sm font-medium py-4 rounded-xl hover:bg-[#e06810] transition-colors disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Submit application"}
          </button>

          <p className="text-xs text-gray-400 text-center mt-4">
            We will contact you on WhatsApp within 24 hours of reviewing your application.
          </p>

        </div>
      </div>

      <footer className="bg-[#001F4D] px-6 py-5 flex justify-between items-center mt-12">
        <div>
          <div className="text-white font-semibold tracking-wider text-sm">ZIKACOM</div>
          <div className="text-white/40 text-[10px] mt-0.5">A HeirMark product · Built for UNIZIK students</div>
        </div>
        <div className="text-white/50 text-xs">Awka · Nnewi · Agulu</div>
      </footer>

    </main>
  );
}