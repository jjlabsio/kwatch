import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "단기과열종목 계산기",
    short_name: "과열종목계산기",
    description: "단기과열종목 지정 조건을 실시간으로 계산하는 도구",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#000000",
    orientation: "portrait",
    categories: ["finance", "business", "productivity"],
    lang: "ko-KR",
    icons: [
      // {
      //   src: '/icon-192x192.png',
      //   sizes: '192x192',
      //   type: 'image/png',
      // },
      // {
      //   src: '/icon-512x512.png',
      //   sizes: '512x512',
      //   type: 'image/png',
      // },
    ],
  };
}
