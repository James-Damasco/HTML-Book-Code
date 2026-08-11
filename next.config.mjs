import { imageHosts } from "./image-hosts.config.mjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
    // Enable browser source maps in production
    productionBrowserSourceMaps: true,

    // Allow a custom build directory
    distDir: process.env.DIST_DIR || ".next",

    // Keep your existing TypeScript behavior
    typescript: {
        ignoreBuildErrors: true,
    },

    // Next.js image configuration
    images: {
        remotePatterns: imageHosts,
        minimumCacheTTL: 60,
        qualities: [75, 85, 100],
    },

    // DhiWise component tagger requires the webpack loader.
    // We explicitly use webpack through package.json scripts.
    webpack(config, { dev }) {
        if (dev) {
            config.module.rules.push({
                test: /\.(jsx|tsx)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "@dhiwise/component-tagger/nextLoader",
                    },
                ],
            });

            const ignorePaths = (process.env.WATCH_IGNORED_PATHS || "")
                .split(",")
                .map((path) => path.trim())
                .filter(Boolean);

            if (ignorePaths.length > 0) {
                config.watchOptions = {
                    ...config.watchOptions,
                    ignored: ignorePaths.map(
                        (path) =>
                            `**/${path.replace(/^\/+|\/+$/g, "")}/**`
                    ),
                };
            }
        }

        return config;
    },
};

export default nextConfig;