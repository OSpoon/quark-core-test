import { fileURLToPath } from 'url';
import { esbuildPlugin } from '@web/dev-server-esbuild'
import { fromRollup } from '@web/dev-server-rollup';
import rollupReplace from '@rollup/plugin-replace';
import rollupPostcss from 'rollup-plugin-postcss';

const tsConfigFileURL = fileURLToPath(new URL('./tsconfig.json', import.meta.url));

const replace = fromRollup(rollupReplace);
const postcss = fromRollup(rollupPostcss);

export default {
  files: ['src/**/*.test.ts', 'src/**/*.spec.ts'],
  mimeTypes: {
    '**/*.css': 'js'
  },
  plugins: [
    postcss({ include: ['**/*.css'], modules: false }),
    esbuildPlugin({
      ts: true,
      tsconfig: tsConfigFileURL,
      tsx: true,
      json: true,
      define: {
        'process.env.NODE_ENV': `'${process.env.NODE_ENV}'`
      },
    }),
    replace({
      preventAssignment: true,
      'process.env.NODE_ENV': '"development"',
    }),
  ],
};
