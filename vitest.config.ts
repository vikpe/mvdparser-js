/// <reference types="vitest" />
import {defineConfig} from "vite";
import {resolve} from 'path'

export default defineConfig({
    build: {
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
        }
    },
    test: {
        environment: "jsdom",
    },
});
