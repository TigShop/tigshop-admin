import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import path from 'path'
import { viteMockServe } from 'vite-plugin-mock'

export default defineConfig(({ command, mode }) => {
    // 获取.env文件里定义的环境变量
    const env = loadEnv(mode, process.cwd());
    //.env文件中的环境变量必须以VITE_为前缀，否则无法引用成功
    const { VITE_BASE_URL,VITE_BASE_URL_PREFIX } = env
    return {
        plugins: [
            vue({
                script: {
                  defineModel: true
                }
            }),
            vueJsx(),
            // Mock
            viteMockServe({
                supportTs: false,
                logger: false,
                mockPath: "./src/mock/",
            })
        ],
        // base:'./',
        server: {
            host: '0.0.0.0',
            open: true,
            proxy: {
                [VITE_BASE_URL_PREFIX]: {
                    target: VITE_BASE_URL+'/', //接口地址
                    changeOrigin: true,
                    // rewrite: (path) => path.replace(/^\/api/, '')
                    rewrite: (path) => path.replace(RegExp(`^${VITE_BASE_URL_PREFIX}`), ""),

                },
            }
        },
        resolve: {
            alias: {
                '@': path.resolve(__dirname, 'src') // 用 @ 符号替换 src 文件路径
            }
        }
    }
})
