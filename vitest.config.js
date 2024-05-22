import { defineConfig, mergeConfig } from 'vite';

import viteConfig from './vite.config.js';

export default mergeConfig(
    viteConfig,
    defineConfig({
        test: {
            globals: true,
            environment: 'jsdom',
            setupFiles: ['./src/__test__/config/setup.jsx'],
            coverage: {
                reporter: ['text', 'json', 'html'],
                all: true,
                include: ['src/**/*.{js,jsx}'],
                exclude: ['src/**/*.test.{js,jsx}'],
            },
        },
    })
);
