module.exports = {
  resolve: {
      fallback: {
        util: require.resolve("util/"),
        timers: require.resolve("timers-browserify"),
        stream: require.resolve("stream-browserify"),
        url: require.resolve("url/"),
        vm: require.resolve("vm-browserify"),
        zlib: require.resolve("browserify-zlib")
      }
  },
};