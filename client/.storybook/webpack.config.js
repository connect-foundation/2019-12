// module.exports = function({ config }) {
// config.module.rules.push({
//   test: /\.stories\.tsx?$/,
//   loaders: [require.resolve('@storybook/source-loader')]
// });

//   return config;
// };

module.exports = ({ config, mode }) => {
  config.module.rules.push({
    test: /\.stories\.tsx?$/,
    loaders: [require.resolve('@storybook/source-loader')]
  });
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    loader: require.resolve('babel-loader'),
    options: {
      presets: [['react-app', { flow: false, typescript: true }]]
    }
  });
  config.resolve.extensions.push('.ts', '.tsx');
  return config;
};
