import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

async function getUser(req) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");
  return { supabase, user };
}
export async function PATCH(req, { params }) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error("Unauthorized");

    const { selesai } = await req.json();
    const { error } = await supabase
      .from("todos")
      .update({ selesai })
      .eq("id", params.id)
      .eq("user_id", user.id);

    if (error) throw error;
    return NextResponse.json({ message: "Berhasil update" });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const { supabase, user } = await getUser(req);
    const { id } = await req.json();
    const { error } = await supabase
      .from("todos")
      .delete()
      .eq("id", id)
      .eq("user_id", user.id);
    if (error) throw error;
    return NextResponse.json({ message: "Berhasil hapus" });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
