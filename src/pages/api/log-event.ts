import type { APIRoute } from "astro";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(import.meta.env.PUBLIC_SUPABASE_URL!, import.meta.env.SUPABASE_SERVICE_ROLE_KEY!);

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { event_name, session_id, page_url, data } = body;

    if (!event_name || !session_id) {
      return new Response(JSON.stringify({ error: "Brakuje wymaganych pól" }), {
        status: 400,
      });
    }

    const { error } = await supabase.from("analytics_events").insert([
      {
        event_name,
        session_id,
        page_url,
        additional_data: data ?? {},
      },
    ]);

    if (error) {
      console.error("Błąd zapisu:", error.message);
      return new Response(JSON.stringify({ error: "Błąd zapisu do bazy" }), {
        status: 500,
      });
    }

    return new Response(JSON.stringify({ status: "ok" }), {
      status: 200,
    });
  } catch (error) {
    console.error("Błąd przetwarzania:", error);
    return new Response(JSON.stringify({ error: "Błąd przetwarzania danych" }), {
      status: 400,
    });
  }
};
