import babel from 'rollup-plugin-babel'
import globals from 'rollup-plugin-node-globals'
import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'

export default {
  entry: 'client/main.js',
  dest: 'public/bundle.js',
  format: 'iife',
  plugins: [
    babel({
      babelrc: false,
      exclude: 'node_modules/**',
      presets: [['es2015', { modules: false }], 'react'],
      plugins: ['external-helpers']
    }),
    commonjs({
      include: 'node_modules/**',
      namedExports: {
        'node_modules/react/react.js': ['PropTypes', 'createElement', 'Component', 'Children']
      }
    }),
    globals(),
    nodeResolve({ browser: true, main: true }),
  ]
}
