const { crossEnv, rimraf, series } = require("nps-utils");

const setTsNodeProject = "TS_NODE_PROJECT=\"tsconfig-tsnode.json\"";

function webpack(tool, arg) {
  return crossEnv(`${setTsNodeProject} ${package(tool)} --config webpack.config.ts ${arg}`);
}

function package(script) {
  return crossEnv(`./node_modules/.bin/${script}`);
}

function karma(single, watch, browsers, transpileOnly, noInfo, coverage, tsconfig, logLevel, devtool) {
  return crossEnv(
      `${setTsNodeProject} ${package("karma")} start`
      .concat(single !== null ? ` --single-run=${single}` : "")
      .concat(watch !== null ? ` --auto-watch=${watch}` : "")
      .concat(browsers !== null ? ` --browsers=${browsers}` : "")
      .concat(transpileOnly !== null ? ` --transpile-only=${transpileOnly}` : "")
      .concat(noInfo !== null ? ` --no-info=${noInfo}` : "")
      .concat(coverage !== null ? ` --coverage=${coverage}` : "")
      .concat(tsconfig !== null ? ` --tsconfig=${tsconfig}` : "")
      .concat(logLevel !== null ? ` --log-level=${logLevel}` : "")
      .concat(devtool !== null ? ` --devtool=${devtool}` : "")
  );
}

module.exports = {
  scripts: {
    lint: package(`tslint`),
    test: {
      default: package("nps test.single"),
      single: karma(true, false, "ChromeHeadless", true, true, true, "tsconfig-test.json", null, null),
      watch: {
        default: package("nps test.watch.dev"),
        dev: karma(false, true, "ChromeHeadless", true, true, true, "tsconfig-test.json", null, null),
        debug: karma(false, true, "ChromeDebugging", true, false, null, "tsconfig-test.json", "debug", null)
      }
    },
    build: {
      default: "nps build.development",
      development: {
        default: webpack("webpack-dev-server", "--hot --env.server")
      },
      production: {
        default: webpack("webpack", "--env.production")
      }
    }
  }
};
