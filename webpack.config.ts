import { AureliaPlugin, ModuleDependenciesPlugin } from "aurelia-webpack-plugin";
import CopyWebpackPlugin from "copy-webpack-plugin";
import ExtractTextPlugin from "extract-text-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import * as path from "path";
import * as webpack from "webpack";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";

interface IEnv {
  server?: boolean;
  production?: boolean;
  extractCss?: boolean;
  analyze?: boolean;
}

// config helpers:
const ensureArray = config => (config && (Array.isArray(config) ? config : [config])) || [];
const when = (condition, config, negativeConfig?) => (condition ? ensureArray(config) : ensureArray(negativeConfig));

const title = "Aurelia Skeleton TS Webpack";
const outDir = path.resolve(__dirname, "dist");
const srcDir = path.resolve(__dirname, "src");
const nodeModulesDir = path.resolve(__dirname, "node_modules");
const baseUrl = "/";

const cssRules = [
  { loader: "css-loader" },
  {
    loader: "postcss-loader",
    // tslint:disable-next-line:no-require-imports
    options: { plugins: () => [require("autoprefixer")({ browsers: ["last 2 versions"] })] }
  }
];

function createHtmlWebpackPlugin(production: any, server: any): HtmlWebpackPlugin {
  const opts: HtmlWebpackPlugin.Options = {
    template: "index.ejs",
    metadata: {
      title,
      server,
      baseUrl
    }
  };
  if (production) {
    opts.minify = {
      removeComments: true,
      collapseWhitespace: true,
      collapseInlineTagWhitespace: true,
      collapseBooleanAttributes: true,
      removeAttributeQuotes: true,
      minifyCSS: true,
      minifyJS: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true,
      ignoreCustomFragments: [/\${.*?}/g]
    };
  }

  return new HtmlWebpackPlugin(opts);
}

function configure(env: IEnv = {}): webpack.Configuration {
  return {
    mode: env.production ? "production" : "development",
    resolve: {
      extensions: [".ts", ".js"],
      modules: [srcDir, "node_modules"],
      alias: {
        bluebird: path.join(nodeModulesDir, "bluebird/js/browser/bluebird.core")
      }
    },
    entry: {
      app: ["aurelia-bootstrapper"],
      vendor: ["bluebird"]
    },
    output: {
      path: outDir,
      publicPath: baseUrl,
      filename: env.production ? "[name].[chunkhash].bundle.js" : "[name].[hash].bundle.js",
      sourceMapFilename: env.production ? "[name].[chunkhash].bundle.map" : "[name].[hash].bundle.map",
      chunkFilename: env.production ? "[name].[chunkhash].chunk.js" : "[name].[hash].chunk.js"
    },
    devtool: env.production ? "nosources-source-map" : "cheap-module-eval-source-map",
    performance: { hints: false },
    devServer: {
      contentBase: outDir,
      historyApiFallback: true,
      lazy: false,
      open: true,
      overlay: {
        warnings: true,
        errors: true
      }
    },
    module: {
      rules: [
        {
          test: /\.css$/i,
          issuer: [{ not: [{ test: /\.html$/i }] }],
          use: env.extractCss
            ? ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: cssRules
              })
            : ["style-loader", ...cssRules]
        },
        {
          test: /\.css$/i,
          issuer: [{ test: /\.html$/i }],
          use: cssRules
        },
        {
          test: /\.scss$/,
          use: ["style-loader", "css-loader", "sass-loader"],
          issuer: /\.[tj]s$/i
        },
        {
          test: /\.scss$/,
          use: ["css-loader", "sass-loader"],
          issuer: /\.html?$/i
        },
        { test: /\.html$/i, loader: "html-loader" },
        { test: /\.ts$/i, loader: "ts-loader", exclude: nodeModulesDir },
        { test: /\.json$/i, loader: "json-loader" },
        { test: /[\/\\]node_modules[\/\\]bluebird[\/\\].+\.js$/, loader: "expose-loader?Promise" },
        { test: /\.(png|gif|jpg|cur)$/i, loader: "url-loader", options: { limit: 8192 } },
        {
          test: /\.woff2(\?v=[0-9]\.[0-9]\.[0-9])?$/i,
          loader: "url-loader",
          options: { limit: 10000, mimetype: "application/font-woff2" }
        },
        {
          test: /\.woff(\?v=[0-9]\.[0-9]\.[0-9])?$/i,
          loader: "url-loader",
          options: { limit: 10000, mimetype: "application/font-woff" }
        },
        { test: /\.(ttf|eot|svg|otf)(\?v=[0-9]\.[0-9]\.[0-9])?$/i, loader: "file-loader" }
      ]
    },
    plugins: [
      new AureliaPlugin(),
      new webpack.ProvidePlugin({ Promise: "bluebird" }),
      createHtmlWebpackPlugin(env.production, env.server),
      new ModuleDependenciesPlugin({
        "aurelia-testing": ["./compile-spy", "./view-spy"]
      }),
      ...when(
        env.extractCss,
        new ExtractTextPlugin({
          filename: env.production ? "[contenthash].css" : "[id].css",
          allChunks: true
        })
      ),
      ...when(env.analyze, new BundleAnalyzerPlugin())
    ]
  };
}

export default configure;
