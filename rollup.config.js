import babel from 'rollup-plugin-babel'
import preset from 'babel-preset-es2015-minimal-rollup'

export default {
  external: [ 'preact' ],
  plugins: [
    babel({
      babelrc: false,
      sourceMap: true,
      exclude: 'node_modules/**',
      presets: ['stage-0'],
      plugins: [].concat(preset.plugins)
    })
  ]
}
