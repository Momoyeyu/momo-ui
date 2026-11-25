# momo-ui

momo 的 React 与 Vue 组件、设计 token 和文档。每个公开组件都有独立页面，操作类组件提供可交互示例。组件可以用于 React 19 和 Vue 3.5 项目，来自 [momo 游戏](https://github.com/Momoyeyu/momo)，也用于 [momo 官网](https://momoyeyu.github.io/momo/)。

[组件文档](https://momoyeyu.github.io/momo-ui/) · [版本与安装包](https://github.com/Momoyeyu/momo-ui/releases)

## 使用

```sh
pnpm add https://momoyeyu.github.io/momo-ui/packages/momo-ui-0.3.0.tgz
```

```tsx
import {Button, ClockFace, Combobox} from '@momoyeyu/momo-ui';
import '@momoyeyu/momo-ui/styles.css';
```

Vue 项目从 `@momoyeyu/momo-ui/vue` 导入布局组件及 `Button`、`Link`，样式入口相同。

## 维护

使用 Node.js 22.12+ 和 pnpm 12。

```sh
pnpm install --frozen-lockfile
pnpm dev
pnpm build
npm pack
```

`src/ui/` 保存 React 组件和样式 token。`src/pages/components/` 保存文档页面，组件 API 与目录来自 src/component-docs.ts。`pnpm build` 输出静态站 `dist/` 和可分发的 ESM 组件 `lib-dist/`。文档发布由 GitHub Pages 工作流构建。发布新包时，把打包产物上传到对应 GitHub Release 并更新文档版本。

许可证为 [MIT](LICENSE)。
