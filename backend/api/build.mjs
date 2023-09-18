import esbuild from 'esbuild';

const options = {
  entryPoints: ['src/index.ts'],
  bundle: true,
  platform: 'node',
  outfile: 'dist/index.js',
};

esbuild.build(options).catch(() => process.exit(1));
