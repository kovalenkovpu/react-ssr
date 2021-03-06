const path = require('path');
const nodeExternals = require('webpack-node-externals');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

const commonLoaders = [
  {
    test: /\.(js|jsx|ts|tsx)$/,
    exclude: /node_modules/,
    use: 'ts-loader',
  },
  {
    test: /\.s[ac]ss$/i,
    use: [MiniCssExtractPlugin.loader, 'css-loader'],
  },
  {
    test: /\.(png|jpg|svg|ico)$/i,
    type: 'asset/resource',
  },
  {
    test: /\.(woff|woff2|eot|ttf)$/,
    use: ['url-loader?limit=100000'],
  },
];

const browserConfig = {
  entry: './client/src/index.tsx',
  // It is default, but is set here for better visibility
  target: "web",
  output: {
    filename: 'index.[contenthash].js',
    clean: true,
    publicPath: '/',
    path: path.resolve(__dirname, './client/build'),
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, './client/public'),
          globOptions: {
            ignore: ["**/index.html"],
          },
          to: path.resolve(__dirname, './client/build'),
        },
      ],
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './client/public/index.html'),
    }),
  ],
  module: {
    rules: commonLoaders,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
  },
}

const serverConfig = {
  entry: './server/index.tsx',
  target: 'node',
  externals: [nodeExternals()],
  output: {
    path: path.resolve(__dirname, 'build'),
    clean: true,
    publicPath: '/',
    filename: 'index.js',
  },
  plugins: [new MiniCssExtractPlugin()],
  module: {
    rules: commonLoaders,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
  },
};

module.exports = [browserConfig, serverConfig];
