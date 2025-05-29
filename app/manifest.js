export default function manifest() {
  return {
    name: "Mbit Portfolio",
    short_name: "Mbit",
    description: "A Progressive Web App built with Next.js",
    start_url: "/",
    theme_color: "#565454",
    background_color: "#757373",
    display: "standalone",
    icons: [
      {
        src: "/web-app-manifest-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/web-app-manifest-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
