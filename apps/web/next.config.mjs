import webpack from 'webpack';

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['ui', 'react-native', '@expo/vector-icons'],
  webpack: (config, { dev }) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      // Transform all direct `react-native` imports to `react-native-web`
      'react-native$': 'react-native-web',
    }
    config.resolve.extensions = [
      '.web.js',
      '.web.jsx',
      '.web.ts',
      '.web.tsx',
      ...config.resolve.extensions,
    ]
    config.module.rules.push({
      test: /\.ttf$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'static/media/',
            publicPath: '/_next/static/media/',
          },
        },
      ],
    });

    config.plugins.push(
      new webpack.DefinePlugin({
        __DEV__: dev,
        'process.env.EXPO_OS': JSON.stringify('web'),
      })
    );

    return config
  },
};

export default nextConfig; 