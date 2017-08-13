import buble from 'rollup-plugin-buble';
import fs from 'fs';

const pkg = JSON.parse(fs.readFileSync('./package.json'));

export default {
	entry: 'src/index.js',
	useStrict: false,
  sourceMap: true,
  external: ["preact"],
	plugins: [
		buble()
	],
	targets: [
    { dest: pkg.main, format: 'cjs' },
		{ dest: pkg.module, format: 'es' },
		{ dest: pkg['main:umd'], format: 'umd', moduleName: pkg.amdName }
	]
};