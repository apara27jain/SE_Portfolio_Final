import { supabase } from "@/integrations/supabase/client";

const TEN_YEARS = 60 * 60 * 24 * 365 * 10;

export async function uploadMedia(file: File, folder = "uploads"): Promise<string> {
  const ext = file.name.split(".").pop() || "bin";
  const path = `${folder}/${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage.from("media").upload(path, file, {
    cacheControl: "3600",
    upsert: false,
    contentType: file.type,
  });
  if (error) throw error;
  const { data, error: signErr } = await supabase.storage
    .from("media")
    .createSignedUrl(path, TEN_YEARS);
  if (signErr || !data?.signedUrl) throw signErr ?? new Error("Failed to sign URL");
  return data.signedUrl;
}