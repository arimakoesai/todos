"use server";
import { createClient } from "@/utils/supabase/server";

export async function login(formData) {
  const supabase = await createClient();

  const email = formData.get("email");
  const password = formData.get("password");

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return {
      success: false,
      error: "Email atau Password salah.",
    };
  }

  return { success: true };
}

export async function signup(formData) {
  const supabase = await createClient();

  const email = formData.get("email");
  const password = formData.get("password");

  if (!password || password.length < 6) {
    return { success: false, error: "Password minimal 6 karakter." };
  }

  const { error } = await supabase.auth.signUp({ email, password });

  if (error) {
    if (error.message.includes("User already registered")) {
      return {
        success: false,
        error: "Email sudah terdaftar. Silakan login.",
      };
    }

    return {
      success: false,
      error: error.message,
    };
  }

  return {
    success: true,
    message: "Registrasi berhasil! Silakan login.",
  };
}
