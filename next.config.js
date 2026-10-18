/** @type {import('next').NextConfig} */
module.exports = {
  // Allow a production preview without sharing output with a running dev server.
  distDir: process.env.NITI_DIST_DIR || '.next',
  transpilePackages: ['./shared'],
}
