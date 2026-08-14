# dsh-theme-rhine-lab

[English](README.md) | 中文

> 给 **DeepSeek Harness（dsh）网页版界面**换上《明日方舟》**莱茵生命**风格皮肤：冷白的实验室表面、青蓝色结构强调、墨蓝文字、全息六边形晶格与缓慢的实验室扫描动效。

*（截图：启动后在真实实例上截图，放入 `screenshots/light.png` 与 `screenshots/dark.png）*

皮肤借助 dsh 自带的主题令牌系统重绘整个网页界面，不替换任何功能，且随时可逆：**设置 → 通用** 里新增「**莱茵生命界面**」一行开关，实时切换；原有的浅色/深色/跟随系统外观选项继续生效。

## 皮肤包含什么

- **配色** — 偏冷近白的表面、青蓝强调色（浅色 `rgb(23, 121, 164)` / 深色 `rgb(74, 190, 232)`）、墨蓝文字、发丝级细线、冷色系的青绿/琥珀状态色。
- **纹理与动效** — 覆盖在界面上的淡六边形晶格与扫描线、11 秒一轮的实验室扫描带、边缘暗角、皮肤开启时的一次性开机扫光、青色选区与焦点描边、更利落的动效曲线。所有图层均 `pointer-events: none`、GPU 友好，并尊重系统的 `prefers-reduced-motion`（减弱动态效果）。
- **字体** — 在可用时优先使用 DIN 风格技术字体（Bahnschrift 等），其后回退系统字体栈。

## 环境要求

- 一份运行着**网页界面**的 [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness)（`dsh --profile web`）。已在 `0.1.0-rc.5` 源码 checkout 上验证；npm 发布的 `0.0.1-rc.1` 版本线尽力兼容。
- 没有其他要求：不需要 API key，也不需要浏览器扩展。

## 安装

本插件是一个 dsh **组合包（bundle）**：即一个附带 `cordis.patch.yml` 配置层的 npm 包。用 `dsh plugin` 把它装进 `web` profile：

```sh
dsh plugin --profile web add dsh-theme-rhine-lab              # 从 npm 安装（发布后可用）
dsh plugin --profile web add github:YOU/dsh-theme-rhine-lab   # 直接从 GitHub 安装
dsh plugin --profile web add ./dsh-theme-rhine-lab-0.1.0.tgz  # 从打包好的 tarball 安装
dsh plugin --profile web add ./dsh-theme-rhine-lab            # 从本地源码目录安装（开发用）
```

然后重启 `dsh web`（插件**集合**在启动时读取；插件**内容**改动可热更新），刷新页面即可。

### Git 安装需要一次构建授权

Git 安装拉取的是源码，因此 pnpm 会在检出后运行本包的 `prepare` 脚本（一份自包含的 tsdown 构建）。pnpm ≥ 10 在得到明确允许前会拒绝执行：第一次 `add` 会失败，dsh 会打印修复方法——把 pnpm 提示的确切包键复制进该 profile 的 `pnpm-workspace.yaml`：

```yaml
allowBuilds:
  dsh-theme-rhine-lab: true
```

然后重新执行 `add`。请如实看待这项授权：**它允许本包的代码在安装时于你的机器上运行**，且不在任何 agent 沙箱之内。只对源码可信的包授权，并建议锁定 commit：`dsh plugin --profile web add github:YOU/dsh-theme-rhine-lab#<sha>`。

想完全跳过授权，就从 npm 或 tarball 安装（两者都直接分发预构建的 `lib/`——本仓库提交了构建产物）。

## 使用

- 皮肤**默认开启**（`ui-theme-rhine-lab.enabled`）。随时在 **设置 → 通用 → 莱茵生命界面** 切换，选择会持久化，重启后保留。
- 外观行里的**浅色/深色/跟随系统**仍然决定基础明暗；皮肤在其上叠加自己的一套浅色与深色变体。
- 想让你的部署默认关闭，改 [`src/theme-settings.ts`](src/theme-settings.ts) 里的 `DEFAULT_ENABLED` 后重新构建，或直接预置设置文档。

## 工作原理（人话版）

dsh 插件 = 配置 + 代码。本组合包贡献了三样东西：

1. **一个配置层** — [`cordis.patch.yml`](cordis.patch.yml) 向组合中插入一行 `dsh-theme-rhine-lab`。该行是双面入口（`dsh.client`）：服务端加载它的 node 半身，浏览器加载它的 client 半身。
2. **node 半身** — [`src/index.ts`](src/index.ts) 注册 `ui-theme-rhine-lab` 设置命名空间，让开关状态可以跨重启保存。
3. **浏览器半身** — [`src/client/index.ts`](src/client/index.ts)：
   - 调用 `ctx.theme.overrideTokens()` 叠加完整的莱茵生命配色（[`src/client/palette.ts`](src/client/palette.ts)）——界面画的每一种颜色都取自这些令牌，所以整个界面一次性换肤；
   - 给 `<html>`/`<body>` 钉上 `data-rhine-lab-theme`，点亮装饰样式表（[`src/client/rhine.module.css`](src/client/rhine.module.css)）：六边形晶格、扫描线、扫描带、暗角、选区/焦点描边；
   - 把设置开关行（[`src/client/RhineLabRow.tsx`](src/client/RhineLabRow.tsx)）注册进 设置 → 通用。

## 开发

```sh
pnpm install
pnpm build        # 产出 lib/index.js 与 lib/client.js（prepare 钩子也会执行它）
```

- `lib/` 已提交进仓库，因此 npm / tarball 安装完全不需要构建步骤。
- 改配色就编辑 [`src/client/palette.ts`](src/client/palette.ts) 里的 `{ light, dark }` 值对；调装饰与动画就编辑 [`src/client/rhine.module.css`](src/client/rhine.module.css)。
- `@deepseek-ai/dsh-client-*` 导入的类型提示来自 harness 源码 checkout（构建时这些包是外置的，构建本身不需要 checkout）。

## 发布到 GitHub

1. 新建仓库，把本目录作为仓库根目录推送上去。
2. 在仓库设置里添加 topic **`dsh-plugin`**，社区目录（例如 [Oh-My-DSH](https://github.com/like-study1/Oh-My-DSH) 聚合器）就会收录它。
3. 可选：`pnpm publish` 发布到 npm，之后 `dsh plugin --profile web add dsh-theme-rhine-lab` 一条命令即可安装。

## 已知限制

- 皮肤叠加在内置明暗调色板之上，而不是新增一个可独立选择的主题 id，因此外观行继续拥有浅色/深色/跟随系统的选择权。
- 装饰仅限 CSS，不改变组件几何结构；Markdown 代码块保持原有语法高亮主题。
- harness 源码 checkout 内置的同名皮肤行（`ui-theme-rhine-lab`）会被本组合包的 patch 自动禁用，同时安装两者也不会重复注册设置命名空间。

## 许可证

[MIT](LICENSE)。本插件为粉丝自制皮肤；《明日方舟》与莱茵生命版权归鹰角网络 / Yostar 所有。
