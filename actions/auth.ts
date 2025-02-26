"use server";

import { cookies } from "next/headers";
import { supabase } from "@/lib/supabase";

export async function login(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) return { error: error.message };

  // ✅ No need to await cookies(), it should be called directly
  (await cookies()).set("session", data.session?.access_token || "", {
    httpOnly: true,
    path: "/",
    secure: true,
    sameSite: "lax",
  });

  return { success: true };
}
