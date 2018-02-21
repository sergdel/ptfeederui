const rewireMobX = require("react-app-rewire-mobx");
const rewirePreact = require("react-app-rewire-preact");
const { injectBabelPlugin } = require("react-app-rewired");

module.exports = function override(config, env) {
  //do stuff with the webpack config...

  const babelLoader = function(conf) {
    if (!conf.loader) return false;
    return conf.loader.indexOf("babel-loader") > -1;
  };

  function rewireEmotion(config, env) {
    const babelrc = config.module.rules.find(babelLoader).options;
    babelrc.plugins = ["emotion/babel"].concat(babelrc.plugins || []);

    return config;
  }

  module.exports = function override(config, env) {
    config = rewireEmotion(config, env);
    return config;
  };

  if (env === "production") {
    console.log("⚡ Production build with Preact");
    config = rewirePreact(config, env);
  }

  config = rewireMobX(config, env);

  return config;
};
