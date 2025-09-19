export const runtime = "nodejs";

export async function GET() {
  try {
    const [imgRes, breedsRes] = await Promise.all([
      fetch("https://dog.ceo/api/breeds/image/random", { cache: "no-store" }),
      fetch("https://dog.ceo/api/breeds/list/all", { cache: "no-store" })
    ]);

    if (!imgRes.ok) {
      return new Response(JSON.stringify({ error: "Upstream error" }), {
        status: 500,
      });
    }

    if (!breedsRes.ok) {
      return new Response(
        JSON.stringify({ error: "Upstream error (breeds)" }),
        { status: 500 }
      );
    }
    const [imgData, breedsData] = await Promise.all([imgRes.json(), breedsRes.json()]);

    return new Response(
      JSON.stringify({ image: imgData.message, breeds: breedsData.message }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Fetch failed", details: String(err) }),
      { status: 500 }
    );
  }
}
