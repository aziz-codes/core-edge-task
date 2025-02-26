"use client";
import React from "react";
import Link from "next/link";
import { logout } from "@/actions/auth";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { supabase } from "@/lib/supabase";
const Navbar = () => {
  const path = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut(); // Logout from Supabase

    await logout();
    router.replace("/login"); // Redirect to login
  };
  return (
    <div className="h-12 flex items-center px-4 border-b shadow-xs">
      {/* Left spacer */}
      <div className="flex-1" />

      {/* Centered Dashboard Link */}
      <Link
        href="/dashboard"
        className={`text-sm font-medium transition-colors hover:text-primary ${
          path === "/dashboard" && "text-sky-500"
        }`}
      >
        Dashboard
      </Link>

      {/* Right-aligned Avatar */}
      <div className="flex-1 flex justify-end">
        <Button variant="outline" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
