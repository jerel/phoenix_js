exports.config = {

  files: {
    javascripts: {
      joinTo: {
        'tests.js': 'tests/**/*.js',
        'phoenix.js': 'src/**/*.js',
      },
    },
  },

  paths: {
    // Which directories to watch
    watched: ["src", "tests"],

    // Where to compile files to
    public: "lib"
  },

};
