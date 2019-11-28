const Dotenv = require('dotenv-webpack');

module.exports = ({ config, mode }) => {
  config.plugins.push(new Dotenv());

  config.module.rules.push({
    test: /\.tsx?$/,
    use: [
      {
        loader: require.resolve('babel-loader'),
        options: {
          presets: [require.resolve('babel-preset-react-app')],
        },
      },
      require.resolve('react-docgen-typescript-loader'),
    ],
  });

  config.resolve.extensions.push('.ts', '.tsx');

  return config;
};
