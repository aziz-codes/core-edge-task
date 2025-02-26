"use server";

import { cookies } from "next/headers";

export async function login(data: any) {
  // ✅ No need to await cookies(), it should be called directly
  (await cookies()).set("session", data.session?.access_token || "", {
    httpOnly: true,
    path: "/",
    secure: true,
    sameSite: "lax",
  });
}

export const logout = async () => {
  (await cookies()).delete("session");
};
