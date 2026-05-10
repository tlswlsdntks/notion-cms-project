import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const isDev = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Notion S3 업로드 파일
      {
        protocol: "https",
        hostname: "prod-files-secure.s3.us-west-2.amazonaws.com",
      },
      // Notion 외부 이미지 (external URL)
      {
        protocol: "https",
        hostname: "*.amazonaws.com",
      },
    ],
  },

  // 개발 환경에서만 상세 로그 출력
  logging: isDev ? { fetches: { fullUrl: true } } : undefined,
};

export default withNextIntl(nextConfig);
