export async function GET() {
  try {
    const imgRes = await fetch("https://dog.ceo/api/breeds/image/random");
    if (!imgRes.ok) {
      return new Response(JSON.stringify({ error: "Upstream error" }), {
        status: 500,
      });
    }
    const imgData = await imgRes.json();

    const breedsRes = await fetch("https://dog.ceo/api/breeds/list/all");
    if (!breedsRes.ok) {
      return new Response(
        JSON.stringify({ error: "Upstream error (breeds)" }),
        { status: 500 }
      );
    }
    const breedsData = await breedsRes.json();

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
