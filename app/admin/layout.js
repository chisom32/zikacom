"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function AdminLayout({ children }) {
  const [checking, setChecking] = useState(true);
  const [profile, setProfile] = useState(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        if (pathname !== "/admin/login") router.push("/admin/login");
        setChecking(false);
        return;
      }

      const { data: profileData } = await supabase
        .from("profiles")
        .select("role, email")
        .eq("id", session.user.id)
        .single();

      if (!profileData) {
        await supabase.auth.signOut();
        router.push("/admin/login");
        setChecking(false);
        return;
      }

      setProfile(profileData);
      setChecking(false);
    };

    checkAuth();
  }, [pathname, router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  if (pathname === "/admin/login") return children;

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-sm text-gray-500">Checking access...</p>
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div className="min-h-screen bg-gray-50">
    <nav className="bg-[#003580] px-4 sm:px-6 py-3">
  <div className="flex items-center justify-between gap-2">
    <span className="text-white font-semibold text-sm sm:text-base whitespace-nowrap">
      Zikacom Admin
    </span>
    <div className="hidden md:flex items-center gap-6">
      <Link href="/admin" className="text-white/75 text-sm hover:text-white">
        Dashboard
      </Link>
      <Link href="/admin/listings" className="text-white/75 text-sm hover:text-white">
        Listings
      </Link>
      <Link href="/admin/applications" className="text-white/75 text-sm hover:text-white">
        Applications
      </Link>
    </div>
    <div className="hidden md:flex items-center gap-4">
      <span className="text-white/50 text-xs">
        {profile.email} · {profile.role}
      </span>
      <button
        onClick={handleLogout}
        className="text-white/75 text-sm hover:text-white"
      >
        Log out
      </button>
    </div>
    <button
      onClick={handleLogout}
      className="md:hidden text-white/75 text-xs whitespace-nowrap"
    >
      Log out
    </button>
  </div>
  <div className="md:hidden flex items-center gap-4 mt-3 pt-3 border-t border-white/10 overflow-x-auto">
    <Link href="/admin" className="text-white/75 text-xs hover:text-white whitespace-nowrap">
      Dashboard
    </Link>
    <Link href="/admin/listings" className="text-white/75 text-xs hover:text-white whitespace-nowrap">
      Listings
    </Link>
    <Link href="/admin/applications" className="text-white/75 text-xs hover:text-white whitespace-nowrap">
      Applications
    </Link>
  </div>
</nav>
      <main className="p-6">{children}</main>
    </div>
  );
}