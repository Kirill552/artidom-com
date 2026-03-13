import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  reactCompiler: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/sr',
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
