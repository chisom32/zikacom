"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function Listings() {
  const [lodges, setLodges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCampus, setActiveCampus] = useState("All");
  const [activeType, setActiveType] = useState("All");

  useEffect(() => {
    fetchListings();
  }, []);

  async function fetchListings() {
    const { data, error } = await supabase
      .from("listings")
      .select("*")
      .eq("approved", true);

    if (error) {
      console.error("Error fetching listings:", error);
    } else {
      setLodges(data || []);
    }
    setLoading(false);
  }

  const filtered = lodges.filter((l) => {
    const campusMatch = activeCampus === "All" || l.campus === activeCampus;
    const typeMatch = activeType === "All" || l.type === activeType;
    return campusMatch && typeMatch;
  });

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
          <Link href="/listings" className="text-white text-sm font-medium">Listings</Link>
          <span className="text-white/75 text-sm cursor-pointer hover:text-white">About</span>
          <Link href="/apply" className="text-white/75 text-sm hover:text-white">List your lodge</Link>
          <button className="bg-[#F47920] text-white text-xs font-medium px-4 py-2 rounded-full">Find a lodge</button>
        </div>
      </nav>

      <section className="bg-[#001F4D] px-6 py-10 text-center">
        <h1 className="text-white text-2xl md:text-3xl font-semibold mb-2">
          All lodges — <span className="text-[#F47920]">{activeCampus === "All" ? "All campuses" : activeCampus}</span>
        </h1>
        <p className="text-white/60 text-sm">{filtered.length} lodges available</p>
      </section>

      <div className="bg-white border-b border-gray-100 px-6 py-4 flex flex-wrap gap-4 items-center">
        <div className="flex gap-2 flex-wrap">
          <span className="text-xs text-gray-500 font-medium self-center mr-1">Campus:</span>
          {["All", "Nnewi", "Awka", "Agulu"].map((c) => (
            <button
              key={c}
              onClick={() => setActiveCampus(c)}
              className={`text-xs px-4 py-2 rounded-full border transition-all ${
                activeCampus === c
                  ? "bg-[#003580] text-white border-[#003580]"
                  : "bg-white text-gray-600 border-gray-200 hover:border-[#003580]"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="flex gap-2 flex-wrap">
          <span className="text-xs text-gray-500 font-medium self-center mr-1">Type:</span>
          {["All", "Self-contain", "Mini flat", "Shared room"].map((t) => (
            <button
              key={t}
              onClick={() => setActiveType(t)}
              className={`text-xs px-4 py-2 rounded-full border transition-all ${
                activeType === t
                  ? "bg-[#F47920] text-white border-[#F47920]"
                  : "bg-white text-gray-600 border-gray-200 hover:border-[#F47920]"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <section className="bg-gray-50 px-6 py-8">
        {loading ? (
          <div className="text-center py-20 text-gray-400 text-sm">Loading lodges...</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-4xl mb-3">🏠</div>
            <div className="text-gray-500 text-sm">No lodges available yet. Check back soon.</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {filtered.map((lodge) => (
              <Link href={`/listings/${lodge.id}`} key={lodge.id} className="block">
                <div className="border border-gray-100 rounded-xl overflow-hidden bg-white hover:shadow-md transition-shadow">
                  <div className="aspect-video bg-[#001F4D] flex items-center justify-center relative">
                    {lodge.video_url ? (
                      <video
                        src={lodge.video_url}
                        className="w-full h-full object-cover"
                        autoPlay
                        muted
                        loop
                        playsInline
                      />
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