import { NextResponse } from "next/server";

import { supabase } from "@/lib/supabase";
export async function POST(
  req: Request,
  { params }: { params: { groupId: string } }
) {
  const body = await req.json();
  const { userId } = body;

  const { error } = await supabase
    .from("group_members")
    .insert([{ group_id: params.groupId, user_id: userId }]);

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ message: "Member added" }, { status: 201 });
}

export async function DELETE(
  req: Request,
  { params }: { params: { groupId: string } }
) {
  const body = await req.json();
  const { userId } = body;

  const { error } = await supabase
    .from("group_members")
    .delete()
    .eq("group_id", params.groupId)
    .eq("user_id", userId);

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ message: "Member removed" }, { status: 200 });
}
