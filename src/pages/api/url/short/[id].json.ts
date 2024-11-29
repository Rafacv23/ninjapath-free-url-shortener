import type { APIRoute } from "astro"
import { supabase } from "@/lib/supabase"

export const prerender = false

export const GET: APIRoute = async ({ params }) => {
  const id = params.id

  const url = await supabase
    .from("urls")
    .select("*")
    .eq("short_url", id)
    .single()

  if (!url) {
    return new Response(null, {
      status: 404,
      statusText: "URL Not Found",
    })
  }

  return new Response(JSON.stringify(url), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  })
}
