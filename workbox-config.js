module.exports = {
  globDirectory: "build/",
  globPatterns: ["**/*.{js,css,html,png,svg,ico,json}"],
  swDest: "build/service-worker.js",
  swSrc: "src/service-worker.js",
  maximumFileSizeToCacheInBytes: 5 * 1024 * 1024, // 5MB
};