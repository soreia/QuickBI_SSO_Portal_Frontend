# QuickBI SSO Portal Frontend

QuickBI SSO 门户前端空白工程，Vue 3 + Vite 技术栈，用于承载 SSO 登录、报表目录与门户页面。

## 技术栈

| 依赖 | 版本 | 说明 |
| --- | --- | --- |
| Vue | 3.5 | 组合式 API，`<script setup>` 写法 |
| Vue Router | 4.6 | HTML5 History 模式 |
| Vite | 7.3 | 开发与构建 |
| ESLint | 10 | flat config（`eslint.config.js`） |
| Prettier | 3.9 | 统一代码风格 |

Node 要求：`>= 20.19.0`（Vite 7 的最低要求）。

## 快速开始

```bash
npm install        # 安装依赖
npm run dev        # 开发，默认 http://127.0.0.1:5173
npm run build      # 生产构建，输出到 dist/
npm run preview    # 本地预览构建产物，http://127.0.0.1:4173
npm run lint       # 代码检查
npm run lint:fix   # 自动修复
npm run format     # Prettier 格式化
```

## 目录结构

```
QuickBI_SSO_Portal_Frontend/
├── public/
│   └── favicon.svg
├── src/
│   ├── api/
│   │   └── client.js        # 基于 fetch 的极简 HTTP 封装
│   ├── router/
│   │   └── index.js         # 路由表 + 标题守卫
│   ├── styles/
│   │   └── main.css         # 设计变量 + reset
│   ├── views/
│   │   ├── HomeView.vue     # 首页占位
│   │   └── LoginView.vue    # 登录占位
│   ├── App.vue              # 根组件，仅承载路由出口
│   └── main.js              # 应用入口
├── .env.development         # 开发环境变量
├── .env.production          # 生产环境变量
├── eslint.config.js
├── jsconfig.json            # @ 别名与编辑器提示
├── vite.config.js
└── package.json
```

## 环境变量

| 变量 | 作用 | 开发默认值 |
| --- | --- | --- |
| `VITE_APP_TITLE` | 页面标题、路由标题后缀 | `QuickBI SSO Portal (Dev)` |
| `VITE_API_BASE_URL` | 前端请求前缀 | `/api` |
| `VITE_PROXY_TARGET` | 开发代理指向的后端地址 | `http://127.0.0.1:8081` |
| `VITE_DEV_PORT` | 开发服务端口 | `5173` |

只有 `VITE_` 前缀的变量会被注入到客户端代码，**不要**把密钥写进这些变量，它们在浏览器里可见。

## 约定

- 路径别名 `@` 指向 `src/`，在 `vite.config.js` 与 `jsconfig.json` 中同步配置。
- 所有接口走 `/api` 前缀，开发期由 Vite 代理转发到后端，生产期由 Nginx 反向代理。
- 新增页面：在 `src/views/` 建组件，在 `src/router/index.js` 注册路由并补 `meta.title`。

## 待接入

1. **SSO 登录**：把 `src/views/LoginView.vue` 中的占位实现替换为真实授权跳转（authorize URL + client_id + redirect_uri + state）。
2. **Token 处理**：在 `src/api/client.js` 的请求头注入处加上 `Authorization`，并配合回调页换取 token。
3. **会话与路由守卫**：在 `router.beforeEach` 中校验登录态，未登录跳转 `/login`。
4. **报表目录与门户页**：新增对应 view 与 API 模块。
