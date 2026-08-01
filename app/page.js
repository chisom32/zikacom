"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function Home() {
  const [lodges, setLodges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCampus, setActiveCampus] = useState("All");

  useEffect(() => {
    fetchListings();
  }, []);

  async function fetchListings() {
    const { data, error } = await supabase
      .from("listings")
      .select("*")
      .eq("approved", true)
      .limit(6);

    if (error) {
      console.error("Error:", error);
    } else {
      setLodges(data || []);
    }
    setLoading(false);
  }

  const filtered = lodges.filter((l) =>
    activeCampus === "All" ? true : l.campus === activeCampus
  );

  return (
    <main className="min-h-screen font-sans">

      <nav className="bg-[#003580] px-6 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <img src="/unizik-logo.webp" alt="UNIZIK Logo" className="h-8 w-auto" />
          <div>
            <div className="text-white font-semibold tracking-wider text-base">ZIKACOM</div>
            <div className="text-white/50 text-[9px] tracking-wider">UNIZIK ACCOMMODATION</div>
          </div>
        </Link>
        <div className="hidden md:flex items-center gap-6">
          <Link href="/listings" className="text-white/75 text-sm cursor-pointer hover:text-white">Listings</Link>
          <span className="text-white/75 text-sm cursor-pointer hover:text-white">About</span>
          <Link href="/apply" className="text-white/75 text-sm hover:text-white">List your lodge</Link>
          <Link href="/listings" className="bg-[#F47920] text-white text-xs font-medium px-4 py-2 rounded-full hover:bg-[#e06810]">
            Find a lodge
          </Link>
        </div>
      </nav>

      <section className="bg-[#001F4D] px-6 py-14 text-center">
        <div className="inline-block bg-[#F47920]/20 border border-[#F47920]/50 text-[#F47920] text-xs font-medium px-4 py-1 rounded-full mb-4 tracking-wider">
          AWKA · NNEWI · AGULU
        </div>
        <h1 className="text-white text-3xl md:text-4xl font-semibold leading-tight mb-3">
          Find your lodge at <span className="text-[#F47920]">UNIZIK</span><br />
          without the stress
        </h1>
        <p className="text-white/60 text-sm max-w-md mx-auto mb-6 leading-relaxed">
          Browse verified lodges across all three campuses. Real videos, honest prices, trusted agents.
        </p>
        <div className="bg-white rounded-xl px-4 py-3 flex items-center gap-3 max-w-lg mx-auto mb-5">
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input type="text" placeholder="Search by area, price or campus..." className="flex-1 text-sm outline-none text-gray-700 placeholder-gray-400" />
          <Link href="/listings" className="bg-[#F47920] text-white text-xs font-medium px-4 py-2 rounded-lg">Search</Link>
        </div>
        <div className="flex gap-2 justify-center flex-wrap">
          {["All campuses", "Nnewi", "Awka", "Agulu"].map((campus, i) => (
            <button
              key={campus}
              onClick={() => setActiveCampus(i === 0 ? "All" : campus)}
              className={`text-xs px-4 py-2 rounded-full border ${
                (i === 0 && activeCampus === "All") || activeCampus === campus
                  ? "bg-[#F47920] border-[#F47920] text-white"
                  : "bg-white/10 border-white/20 text-white/75 hover:bg-white/20"
              }`}
            >
              {campus}
            </button>
          ))}
        </div>
      </section>

      <section className="bg-white px-6 py-8">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-base font-semibold text-gray-900">
            Available lodges — {activeCampus === "All" ? "All campuses" : activeCampus}
          </h2>
          <Link href="/listings" className="text-sm text-[#003580] cursor-pointer hover:underline">View all →</Link>
        </div>

        {loading ? (
          <div className="text-center py-20 text-gray-400 text-sm">Loading lodges...</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-4xl mb-3">🏠</div>
            <div className="text-gray-500 text-sm mb-4">No lodges available yet. Check back soon.</div>
            <Link href="/apply" className="bg-[#003580] text-white text-sm px-6 py-3 rounded-xl inline-block">
              Are you an agent? List your lodge
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {filtered.map((lodge) => (
              <Link href={`/listings/${lodge.id}`} key={lodge.id} className="block">
                <div className="border border-gray-100 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
                  <div className="aspect-video bg-[#001F4D] flex items-center justify-center relative">
                    {lodge.video_url ? (
                      <video src={lodge.video_url} className="w-full h-full object-cover" autoPlay muted loop playsInline />
                    ) : (
                      <div className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center">
                        <div className="w-0 h-0 border-t-[7px] border-t-transparent border-b-[7px] border-b-transparent border-l-[14px] border-l-[#003580] ml-1" />
                      </div>
                    )}
                    <div className="absolute bottom-2 left-2 bg-black/60 text-white text-[9px] px-2 py-0.5 rounded">▶ Autoplays</div>
                    {lodge.verified && (
                      <div className="absolute top-2 right-2 bg-[#F47920] text-white text-[9px] font-medium px-2 py-0.5 rounded">Verified</div>
                    )}
                  </div>
                  <div className="p-3">
                    <div className="font-medium text-sm text-gray-900 mb-1">{lodge.title}</div>
                    <div className="text-xs text-gray-500 mb-2">📍 {lodge.location} — {lodge.distance}</div>
                    <div className="flex gap-2 mb-3">
                      <div className="flex-1 bg-gray-50 rounded-lg p-2">
                        <div className="text-[9px] text-gray-400 mb-0.5">First year</div>
                        <div className="text-xs font-semibold text-[#003580]">{lodge.first_year_price}</div>
                      </div>
                      <div className="flex-1 bg-gray-50 rounded-lg p-2">
                        <div className="text-[9px] text-gray-400 mb-0.5">Renewal</div>
                        <div className="text-xs font-semibold text-green-700">{lodge.renewal_price}</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] bg-blue-50 text-[#003580] font-medium px-2 py-1 rounded-full">{lodge.campus}</span>
                      <button className="bg-[#25D366] text-white text-[9px] font-medium px-3 py-1.5 rounded-lg">WhatsApp agent</button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      <section className="bg-[#003580] px-6 py-10">
        <h3 className="text-white font-semibold text-base mb-1">Are you a lodge agent?</h3>
        <p className="text-white/60 text-sm mb-6">Apply to list your properties on Zikacom. We verify all agents before approval.</p>
        <Link href="/apply" className="bg-[#F47920] text-white text-sm font-medium px-6 py-3 rounded-lg inline-block hover:bg-[#e06810]">
          Apply to list your lodge →
        </Link>
      </section>

      <footer className="bg-[#001F4D] px-6 py-5 flex justify-between items-center">
        <div>
          <div className="text-white font-semibold tracking-wider text-sm">ZIKACOM</div>
          <div className="text-white/40 text-[10px] mt-0.5">A HeirMark product · Built for UNIZIK students</div>
        </div>
        <div className="text-white/50 text-xs">Awka · Nnewi · Agulu</div>
      </footer>

    </main>
  );
}