import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "POP Studying",
    short_name: "POP",
    description: "An all-in-one educational platform for secondary students.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0056D2",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
