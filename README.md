# momo-ui

momo 的 React 组件、设计 token 和静态文档。组件可以用于 React 19 项目。

[组件文档](https://momoyeyu.github.io/momo-ui/) · [版本与安装包](https://github.com/Momoyeyu/momo-ui/releases)

## 使用

```sh
pnpm add https://github.com/Momoyeyu/momo-ui/releases/download/v0.1.0/momo-ui-0.1.0.tgz
```

```tsx
import {Button, ClockFace, Combobox} from '@momoyeyu/momo-ui';
import '@momoyeyu/momo-ui/styles.css';
```

## 维护

使用 Node.js 22.12+ 和 pnpm 12。

```sh
pnpm install --frozen-lockfile
pnpm dev
pnpm build
npm pack
```

`src/ui/` 保存 React 组件和样式 token。`src/pages/components/` 保存 MDX 使用文档。`pnpm build` 输出静态站 `dist/` 和可分发的 ESM 组件 `lib-dist/`。文档发布由 GitHub Pages 工作流构建。发布新包时，把打包产物上传到对应 GitHub Release 并更新文档版本。

许可证为 [MIT](LICENSE)。
