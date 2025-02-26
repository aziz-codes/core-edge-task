import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
export async function GET(
  req: Request,
  { params }: { params: { groupId: string } }
) {
  const { data, error } = await supabase
    .from("groups")
    .select("*")
    .eq("id", params.groupId)
    .single();

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json(data, { status: 200 });
}

export async function DELETE(
  req: Request,
  { params }: { params: { groupId: string } }
) {
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

  // Check if the user is the admin
  const { data: group } = await supabase
    .from("groups")
    .select("adminId")
    .eq("id", params.groupId)
    .single();
  if (group?.adminId !== user.id)
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  // Delete the group
  const { error } = await supabase
    .from("groups")
    .delete()
    .eq("id", params.groupId);
  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ message: "Group deleted" }, { status: 200 });
}
