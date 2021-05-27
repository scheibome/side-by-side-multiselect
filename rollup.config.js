import babel from '@rollup/plugin-babel';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

const config = {
    input: 'src/js/side-by-side-multiselect.js',
    output: [
        {
            file: './dist/js/side-by-side-multiselect.umd.js',
            format: 'umd',
            name: 'SideBySideMultiselect'
        },
        {
            file: './dist/js/side-by-side-multiselect.js',
            format: 'es'
        }
    ],
    plugins: [
        nodeResolve(),
        commonjs(),
        babel({
            babelHelpers: 'bundled',
            exclude: 'node_modules/**',
        }),
    ]
};

export default config;
