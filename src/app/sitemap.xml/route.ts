export async function GET() {
  const response = await fetch("https://new.varpet.com/api/sitemap");

  if (!response.ok) {
    return new Response("<error>Failed to fetch sitemap</error>", {
      status: 500,
      headers: {
        "Content-Type": "application/xml",
      },
    });
  }

  const xmlData = await response.text();
  return new Response(xmlData, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
