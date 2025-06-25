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

export async function GET() {
  try {
    const { supabase, user } = await getUser();
    const { data, error } = await supabase
      .from("todos")
      .select("*")
      .eq("user_id", user.id)
      .order("judul", { ascending: true });
    if (error) throw error;
    return NextResponse.json({ todos: data });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 401 });
  }
}

export async function POST(req) {
  try {
    const { supabase, user } = await getUser(req);
    const { judul } = await req.json();
    const { error } = await supabase
      .from("todos")
      .insert({ judul, user_id: user.id });
    if (error) throw error;
    return NextResponse.json({ message: "Berhasil tambah todo" });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
