const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack-config-builder/webpack.common');

const loadAddonConfigs = (args) => [...[args]]
  .filter(Boolean)
  .map((name) => require(`./webpack-config-builder/add-ons/webpack.${name}.js`));

module.exports = (env) => {
  const { NODE_ENV } = process.env;
  if (!['development', 'production'].includes(NODE_ENV)) {
    throw new Error('Please set your --node-env variable to "production" or "development"');
  }
  const envConfig = require(`./webpack-config-builder/webpack.${NODE_ENV}`);
  return webpackMerge.merge(
    commonConfig,
    envConfig,
    ...loadAddonConfigs(env.addons),
  );
};
