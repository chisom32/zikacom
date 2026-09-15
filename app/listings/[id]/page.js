"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function SingleListing({ params }) {
  const { id } = require("react").use(params);
  const [lodge, setLodge] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLodge = async () => {
      const { data, error } = await supabase
        .from("listings")
        .select("*")
        .eq("id", id)
        .single();

      if (!error) setLodge(data);
      setLoading(false);
    };

    fetchLodge();
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-sm text-gray-500">Loading...</p>
      </main>
    );
  }

  if (!lodge) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-xl font-semibold text-gray-900 mb-2">
            Lodge not found
          </h1>
          <Link
            href="/listings"
            className="text-[#003580] text-sm hover:underline"
          >
            Back to listings
          </Link>
        </div>
      </main>
    );
  }

  const whatsappLink = `https://wa.me/234${lodge.agent_whatsapp?.slice(
    1
  )}?text=Hi, I saw your lodge on ZIKACOM. I am interested in ${lodge.title}`;

  return (
    <main className="min-h-screen font-sans bg-gray-50">
      {/* NAVBAR */}
      <nav className="bg-[#003580] px-6 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <img
            src="/unizik-logo.webp"
            alt="UNIZIK Logo"
            className="h-8 w-auto"
          />
          <div>
            <div className="text-white font-semibold tracking-wider text-base">
              ZIKACOM
            </div>
            <div className="text-white/50 text-[9px] tracking-wider">
              UNIZIK ACCOMMODATION
            </div>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <Link
            href="/listings"
            className="text-white/75 text-sm hover:text-white"
          >
            Listings
          </Link>
          <button className="bg-[#F47920] text-white text-xs font-medium px-4 py-2 rounded-full">
            Find a lodge
          </button>
        </div>
      </nav>

      {/* BACK BUTTON */}
      <div className="px-6 py-4">
        <Link
          href="/listings"
          className="text-[#003580] text-sm hover:underline"
        >
          Back to listings
        </Link>
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-4xl mx-auto px-6 pb-12">
        {/* HERO — VIDEO OR PLACEHOLDER */}
        <div className="bg-gradient-to-br from-blue-900 to-blue-700 rounded-2xl aspect-video flex items-center justify-center relative mb-6 overflow-hidden">
          {lodge.video_url ? (
            <video
              src={lodge.video_url}
              controls
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
              <div className="w-0 h-0 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent border-l-[18px] border-l-[#003580] ml-1" />
            </div>
          )}

          {lodge.verified && (
            <div className="absolute top-4 right-4 bg-[#F47920] text-white text-xs font-medium px-3 py-1 rounded-full">
              Verified Agent
            </div>
          )}
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* LEFT SIDE */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-2xl p-6 mb-4">
              <div className="flex items-start justify-between mb-3">
                <h1 className="text-xl font-semibold text-gray-900">
                  {lodge.title}
                </h1>
                <span className="text-[10px] bg-blue-50 text-[#003580] font-medium px-3 py-1 rounded-full">
                  {lodge.campus}
                </span>
              </div>

              <div className="text-sm text-gray-500 mb-4">
                {lodge.location} — {lodge.distance}
              </div>

              <div className="flex gap-3 mb-5">
                <div className="flex-1 bg-blue-50 rounded-xl p-4">
                  <div className="text-xs text-gray-400 mb-1">
                    First year price
                  </div>
                  <div className="text-xl font-bold text-[#003580]">
                    {lodge.first_year_price}
                  </div>
                </div>
                <div className="flex-1 bg-green-50 rounded-xl p-4">
                  <div className="text-xs text-gray-400 mb-1">
                    Renewal price
                  </div>
                  <div className="text-xl font-bold text-green-700">
                    {lodge.renewal_price}
                  </div>
                </div>
              </div>

              <h2 className="text-sm font-semibold text-gray-900 mb-2">
                About this lodge
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                {lodge.description}
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6">
              <h2 className="text-sm font-semibold text-gray-900 mb-3">
                Lodge details
              </h2>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-[10px] text-gray-400 mb-1">Type</div>
                  <div className="text-sm font-medium text-gray-900">
                    {lodge.type}
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-[10px] text-gray-400 mb-1">Campus</div>
                  <div className="text-sm font-medium text-gray-900">
                    {lodge.campus}
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-[10px] text-gray-400 mb-1">
                    Distance
                  </div>
                  <div className="text-sm font-medium text-gray-900">
                    {lodge.distance}
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-[10px] text-gray-400 mb-1">
                    Agent status
                  </div>
                  <div className="text-sm font-medium text-gray-900">
                    {lodge.verified ? "Verified" : "Unverified"}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div>
            <div className="bg-white rounded-2xl p-6">
              <h2 className="text-sm font-semibold text-gray-900 mb-1">
                Interested?
              </h2>
              <p className="text-xs text-gray-500 mb-4">
                Contact the agent directly on WhatsApp.
              </p>

              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#25D366] text-white text-sm font-medium py-3 px-4 rounded-xl flex items-center justify-center hover:bg-[#20b858]"
              >
                WhatsApp agent
              </a>

              <div className="mt-3 text-center">
                <Link
                  href="/listings"
                  className="text-xs text-gray-400 hover:text-gray-600"
                >
                  See other lodges
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="bg-[#001F4D] px-6 py-5 flex justify-between items-center">
        <div>
          <div className="text-white font-semibold tracking-wider text-sm">
            ZIKACOM
          </div>
          <div className="text-white/40 text-[10px] mt-0.5">
            A HeirMark product — Built for UNIZIK students
          </div>
        </div>
        <div className="text-white/50 text-xs">Awka — Nnewi — Agulu</div>
      </footer>
    </main>
  );
}