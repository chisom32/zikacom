export default function Home() {
  return (
    <main className="min-h-screen font-sans">

      {/* NAVBAR */}
      <nav className="bg-[#003580] px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
        <img src="/unizik-logo.webp" alt="UNIZIK Logo" className="h-8 w-auto" />
          
          <div>
            <div className="text-white font-semibold tracking-wider text-base">ZIKACOM</div>
            <div className="text-white/50 text-[9px] tracking-wider">UNIZIK ACCOMMODATION</div>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-6">
          <span className="text-white/75 text-sm cursor-pointer hover:text-white">Listings</span>
          <span className="text-white/75 text-sm cursor-pointer hover:text-white">About</span>
          <span className="text-white/75 text-sm cursor-pointer hover:text-white">List your lodge</span>
          <button className="bg-[#F47920] text-white text-xs font-medium px-4 py-2 rounded-full hover:bg-[#e06810]">
            Find a lodge
          </button>
        </div>
      </nav>

      {/* HERO */}
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

        {/* SEARCH */}
        <div className="bg-white rounded-xl px-4 py-3 flex items-center gap-3 max-w-lg mx-auto mb-5">
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search by area, price or campus..."
            className="flex-1 text-sm outline-none text-gray-700 placeholder-gray-400"
          />
          <button className="bg-[#F47920] text-white text-xs font-medium px-4 py-2 rounded-lg hover:bg-[#e06810]">
            Search
          </button>
        </div>

        {/* CAMPUS TABS */}
        <div className="flex gap-2 justify-center flex-wrap">
          {["All campuses", "Nnewi", "Awka", "Agulu"].map((campus, i) => (
            <button
              key={campus}
              className={`text-xs px-4 py-2 rounded-full border ${
                i === 0
                  ? "bg-[#F47920] border-[#F47920] text-white"
                  : "bg-white/10 border-white/20 text-white/75 hover:bg-white/20"
              }`}
            >
              {campus}
            </button>
          ))}
        </div>
      </section>

      {/* LISTINGS */}
      <section className="bg-white px-6 py-8">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-base font-semibold text-gray-900">Available lodges — Nnewi campus</h2>
          <span className="text-sm text-[#003580] cursor-pointer hover:underline">View all →</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              title: "2-bedroom self-contain",
              location: "Otolo, Nnewi",
              distance: "5 mins to school gate",
              firstYear: "₦300,000",
              renewal: "₦250,000",
              campus: "Nnewi",
              verified: true,
              bg: "from-blue-900 to-blue-700",
            },
            {
              title: "Single room (shared)",
              location: "Uruagu, Nnewi",
              distance: "10 mins to school gate",
              firstYear: "₦150,000",
              renewal: "₦120,000",
              campus: "Nnewi",
              verified: true,
              bg: "from-purple-900 to-purple-700",
            },
            {
              title: "Mini flat — ensuite",
              location: "Nnewi town",
              distance: "15 mins to school gate",
              firstYear: "₦220,000",
              renewal: "₦180,000",
              campus: "Nnewi",
              verified: false,
              bg: "from-green-900 to-green-700",
            },
          ].map((lodge) => (
            <div key={lodge.title} className="border border-gray-100 rounded-xl overflow-hidden">
              {/* VIDEO THUMBNAIL */}
              <div className={`bg-gradient-to-br ${lodge.bg} aspect-video flex items-center justify-center relative`}>
                <div className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center">
                  <div className="w-0 h-0 border-t-[7px] border-t-transparent border-b-[7px] border-b-transparent border-l-[14px] border-l-[#003580] ml-1" />
                </div>
                <div className="absolute bottom-2 left-2 bg-black/60 text-white text-[9px] px-2 py-0.5 rounded">
                  ▶ Autoplays
                </div>
                {lodge.verified && (
                  <div className="absolute top-2 right-2 bg-[#F47920] text-white text-[9px] font-medium px-2 py-0.5 rounded">
                    Verified
                  </div>
                )}
              </div>

              {/* CARD BODY */}
              <div className="p-3">
                <div className="font-medium text-sm text-gray-900 mb-1">{lodge.title}</div>
                <div className="text-xs text-gray-500 mb-2">
                  📍 {lodge.location} — {lodge.distance}
                </div>

                {/* PRICES */}
                <div className="flex gap-2 mb-3">
                  <div className="flex-1 bg-gray-50 rounded-lg p-2">
                    <div className="text-[9px] text-gray-400 mb-0.5">First year</div>
                    <div className="text-xs font-semibold text-[#003580]">{lodge.firstYear}</div>
                  </div>
                  <div className="flex-1 bg-gray-50 rounded-lg p-2">
                    <div className="text-[9px] text-gray-400 mb-0.5">Renewal</div>
                    <div className="text-xs font-semibold text-green-700">{lodge.renewal}</div>
                  </div>
                </div>

                {/* FOOTER */}
                <div className="flex items-center justify-between">
                  <span className="text-[9px] bg-blue-50 text-[#003580] font-medium px-2 py-1 rounded-full">
                    {lodge.campus}
                  </span>
                  <button className="bg-[#25D366] text-white text-[9px] font-medium px-3 py-1.5 rounded-lg hover:bg-[#20b858]">
                    WhatsApp agent
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* AGENT SECTION */}
      <section className="bg-[#003580] px-6 py-10">
        <h3 className="text-white font-semibold text-base mb-1">Are you a lodge agent?</h3>
        <p className="text-white/60 text-sm mb-6">Apply to list your properties on Zikacom. We verify all agents before approval.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl mb-4">
          {["Full name", "Phone / WhatsApp", "Campus area (Nnewi / Awka / Agulu)", "Number of listings"].map((field) => (
            <input
              key={field}
              type="text"
              placeholder={field}
              className="bg-white/10 border border-white/20 text-white placeholder-white/40 text-sm rounded-lg px-3 py-2.5 outline-none focus:border-white/50"
            />
          ))}
          <textarea
            placeholder="Brief description of your lodges"
            className="bg-white/10 border border-white/20 text-white placeholder-white/40 text-sm rounded-lg px-3 py-2.5 outline-none focus:border-white/50 md:col-span-2 resize-none h-20"
          />
        </div>
        <button className="bg-[#F47920] text-white text-sm font-medium px-6 py-3 rounded-lg hover:bg-[#e06810]">
          Submit application →
        </button>
      </section>

      {/* FOOTER */}
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