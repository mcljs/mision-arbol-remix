import { createRoutesFromFolders } from '@remix-run/v1-route-convention';

/** @type {import('@remix-run/dev').AppConfig} */
export default {
  future: {
    unstable_postCss: true,
    v2_routeConvention: true,
  },
  serverModuleFormat: 'esm',
  serverPlatform: 'node',
  tailwind: true,
  postcss: true,
  cacheDirectory: "./node_modules/.cache/remix",
  ignoredRouteFiles: ["**/.*", "**/*.css", "**/*.test.{js,jsx,ts,tsx}"],
  routes(defineRoutes) {
    // uses the v1 convention, works in v1.15+ and v2
    return createRoutesFromFolders(defineRoutes);
  },
};
