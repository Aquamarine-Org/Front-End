export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const response = await env.ASSETS.fetch(request);

    if (
      response.status === 404 &&
      request.method === "GET" &&
      !url.pathname.includes(".")
    ) {
      const fallbackUrl = new URL("/index.html", url).toString();
      return env.ASSETS.fetch(
        new Request(fallbackUrl, {
          method: "GET",
          headers: request.headers,
        }),
      );
    }

    return response;
  },
};
