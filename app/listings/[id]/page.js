"use client";

import Link from "next/link";

const lodges = [
  {
    id: 1,
    title: "2-bedroom self-contain",
    location: "Otolo, Nnewi",
    distance: "5 mins to school gate",
    firstYear: "N300,000",
    renewal: "N250,000",
    campus: "Nnewi",
    verified: true,
    bg: "from-blue-900 to-blue-700",
    type: "Self-contain",
    agent: "08012345678",
    description:
      "Spacious 2-bedroom self-contain lodge with running water, prepaid meter, and strong security. Very close to UNIZIK Nnewi campus gate.",
  },
  {
    id: 2,
    title: "Single room (shared)",
    location: "Uruagu, Nnewi",
    distance: "10 mins to school gate",
    firstYear: "N150,000",
    renewal: "N120,000",
    campus: "Nnewi",
    verified: true,
    bg: "from-purple-900 to-purple-700",
    type: "Shared room",
    agent: "08023456789",
    description:
      "Clean shared room for 2 students. Shared kitchen and bathroom. Prepaid meter. Secure compound with gate.",
  },
  {
    id: 3,
    title: "Mini flat ensuite",
    location: "Nnewi town",
    distance: "15 mins to school gate",
    firstYear: "N220,000",
    renewal: "N180,000",
    campus: "Nnewi",
    verified: false,
    bg: "from-green-900 to-green-700",
    type: "Mini flat",
    agent: "08034567890",
    description:
      "Mini flat with private bathroom and kitchen. Quiet environment. Good for serious students. Borehole water available.",
  },
  {
    id: 4,
    title: "1-bedroom flat",
    location: "Awka south",
    distance: "8 mins to school gate",
    firstYear: "N280,000",
    renewal: "N230,000",
    campus: "Awka",
    verified: true,
    bg: "from-orange-900 to-orange-700",
    type: "Mini flat",
    agent: "08045678901",
    description:
      "1-bedroom flat with sitting room. Perfect for a student who wants privacy. Tiled, painted, and ready to move in.",
  },
  {
    id: 5,
    title: "Self-contain ensuite",
    location: "Ifite, Awka",
    distance: "3 mins to school gate",
    firstYear: "N350,000",
    renewal: "N300,000",
    campus: "Awka",
    verified: true,
    bg: "from-teal-900 to-teal-700",
    type: "Self-contain",
    agent: "08056789012",
    description:
      "Premium self-contain lodge. Closest to Awka campus gate. Modern finishing, inverter light backup, 24hr security.",
  },
  {
    id: 6,
    title: "Shared room 2 per room",
    location: "Agulu town",
    distance: "12 mins to school gate",
    firstYear: "N100,000",
    renewal: "N80,000",
    campus: "Agulu",
    verified: false,
    bg: "from-red-900 to-red-700",
    type: "Shared room",
    agent: "08067890123",
    description:
      "Budget-friendly shared room. Good for first year students on a tight budget. Safe and decent environment.",
  },
];

export default function SingleListing({ params }) {
  const { id: rawId } = require("react").use(params);
  const id = parseInt(rawId);
  const lodge = lodges.find((l) => l.id === id);

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

  const whatsappLink = `https://wa.me/234${lodge.agent.slice(
    1
  )}?text=Hi, I saw your lodge on ZIKACOM. I am interested in ${
    lodge.title
  }`;

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
        {/* HERO CARD */}
        <div
          className={`bg-gradient-to-br ${lodge.bg} rounded-2xl aspect-video flex items-center justify-center relative mb-6`}
        >
          <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
            <div className="w-0 h-0 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent border-l-[18px] border-l-[#003580] ml-1" />
          </div>

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
            {/* INFO CARD */}
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

              {/* PRICE */}
              <div className="flex gap-3 mb-5">
                <div className="flex-1 bg-blue-50 rounded-xl p-4">
                  <div className="text-xs text-gray-400 mb-1">
                    First year price
                  </div>

                  <div className="text-xl font-bold text-[#003580]">
                    {lodge.firstYear}
                  </div>
                </div>

                <div className="flex-1 bg-green-50 rounded-xl p-4">
                  <div className="text-xs text-gray-400 mb-1">
                    Renewal price
                  </div>

                  <div className="text-xl font-bold text-green-700">
                    {lodge.renewal}
                  </div>
                </div>
              </div>

              {/* DESCRIPTION */}
              <h2 className="text-sm font-semibold text-gray-900 mb-2">
                About this lodge
              </h2>

              <p className="text-sm text-gray-600 leading-relaxed">
                {lodge.description}
              </p>
            </div>

            {/* DETAILS */}
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

        <div className="text-white/50 text-xs">
          Awka — Nnewi — Agulu
        </div>
      </footer>
    </main>
  );
}