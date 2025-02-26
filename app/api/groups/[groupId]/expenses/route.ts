import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
export async function POST(
  req: Request,
  { params }: { params: { groupId: string } }
) {
  const body = await req.json();
  const { description, amount, category } = body;

  // Get user session
  const supabaseAuth = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  const {
    data: { user },
  } = await supabaseAuth.auth.getUser();

  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data, error } = await supabase.from("expenses").insert([
    {
      group_id: params.groupId,
      user_id: user.id,
      description,
      amount,
      category,
    },
  ]);

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json(data, { status: 201 });
}
