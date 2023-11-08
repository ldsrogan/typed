import { defineConfig } from 'vite';
import { obfuscator } from 'rollup-obfuscator';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ command }) => {
  const options: any = {
    plugins: [react()],
    base: './',
    server: {
      hmr: {
        overlay: false,
      },
    },
    build: {
      outDir: './dist',
      cssMinify: true,
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  };

  // build (prod)
  if (command === 'build') {
    options.plugins = [
      obfuscator({
        global: false,
        exclude: ['./node_modules/**/*', './pubilc/**/*', './src/common/gltfloader.js'],
        stringArrayRotate: true,
      }),
      // viteStaticCopy({
      //   targets: [
      //     {
      //       src: path.resolve(__dirname, 'node_modules/sql.js/dist/sql-wasm.wasm'),
      //       dest: path.resolve(__dirname, 'dist/sql.js/dist'),
      //     },
      //   ],
      // }),
    ];
  } else {
    options.define = {
      DEV: true,
    };
  }

  // build (prod)
  return options;
});
