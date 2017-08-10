import fs from "fs";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import babel from "rollup-plugin-babel";

let pkg = JSON.parse(fs.readFileSync("./package.json"));
let format = process.env.FORMAT === "es" ? "es" : "umd";

export default {
  entry: "src/index.js",
  dest: format === "es" ? pkg.module : pkg.main,
  format,
  sourceMap: true,
  moduleName: pkg.amdName,
  external: ["preact"],
  plugins: [
    babel({
      babelrc: false,
      presets: [
        [
          "es2015",
          {
            loose: true,
            modules: false
          }
        ]
      ],
      exclude: ["node_modules/**", "**/*.json"]
    }),
    resolve({
      jsnext: true,
      main: true,
      preferBuiltins: false
    }),
    commonjs()
  ]
};
