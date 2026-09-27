# pubeth.github.io

个人主页（GitHub Pages），首页为单页介绍 + Three.js 3D 背景；全屏模型演示见 [demo.html](./demo.html)。

## 本地预览

在项目根目录启动任意静态服务器，例如：

```bash
npx serve .
```

浏览器打开 `http://localhost:3000`（端口以终端输出为准）。

## 改内容

| 文件 | 说明 |
|------|------|
| `index.html` | 标题、关于、技能列表 |
| `assets/data/projects.json` | 项目卡片 |
| `assets/css/main.css` | 样式与配色 |
| `model/` | STL 与环境贴图（需与线上一致） |

## 结构

- `assets/js/scene.js` — 首页背景 3D
- `assets/js/site.js` — 导航与项目加载
- `docs/个人主页改造执行计划.md` — 改造说明
