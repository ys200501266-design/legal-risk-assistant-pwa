# 法律风险识别助手 PWA Demo

一个手机端优先的 AI 法律风险识别助手 Demo，用于展示 AI 产品经理与前端工程能力。用户可以通过拍照、语音或文字描述租房押金、劳动加班、消费退款、合同纠纷等生活问题，系统先识别事实，再展示相关法律依据、风险等级和下一步建议。

> 本项目是 PWA，不是原生 App。部署后用户可用手机浏览器直接访问链接，并添加到手机主屏幕。

## 为什么做这个项目

法律类 AI 产品的核心难点不是“回答得像律师”，而是避免无依据结论和幻觉。本 Demo 重点展示 RAG、OCR、语音输入、法律条文引用、风险分级和免责声明等产品设计能力，让 AI 只做法律信息检索与风险提示，不替代律师或司法机关判断。

## 核心功能

- 首页：拍照识别、语音输入、文字咨询三个入口
- 输入页：图片上传 UI、文字输入、语音占位、场景选择
- 结果页：识别问题、事实摘要、风险等级、法律依据卡片、AI 解释、下一步建议
- Mock 数据：房东拒绝退押金、公司要求无偿加班、商家拒绝七天无理由退货
- 风控：没有法律依据时显示“未找到明确法律依据，建议补充信息或咨询专业人士”

## 产品亮点

- 不直接断定“违法”，而是输出风险提示
- 结果必须展示法律名称、条文编号、摘要和来源链接
- 使用“低风险 / 中风险 / 高风险 / 无法判断”进行分级
- 页面包含明确免责声明
- 适合手机浏览器和添加到主屏幕后使用

## PWA 能力说明

- 使用 `vite-plugin-pwa`
- 配置 `manifest.webmanifest`
- PWA 安装名称：法律风险识别助手
- `short_name`：法律助手
- `display: standalone`
- 包含 192x192、512x512 和 Apple Touch Icon
- 生成 service worker，支持基础离线缓存
- 首页包含 `InstallPrompt` 安装提示组件

## 技术栈

- React
- TypeScript
- Vite
- vite-plugin-pwa
- lucide-react
- Vercel

## 项目结构

```text
.
├── public/
│   ├── apple-touch-icon.png
│   ├── pwa-192x192.png
│   └── pwa-512x512.png
├── product-docs/
│   ├── PRD.md
│   ├── prompt-design.md
│   ├── risk-control-design.md
│   └── user-flow.md
├── src/
│   ├── components/
│   │   ├── Disclaimer.tsx
│   │   └── InstallPrompt.tsx
│   ├── data/
│   │   └── legal_cases.json
│   ├── pages/
│   │   ├── Analyze.tsx
│   │   ├── Home.tsx
│   │   └── Result.tsx
│   ├── App.tsx
│   ├── main.tsx
│   ├── styles.css
│   └── types.ts
├── index.html
├── package.json
└── vite.config.ts
```

## 本地运行

```bash
npm install
npm run dev
```

默认访问：

```text
http://localhost:5173
```

## 构建与预览

```bash
npm run build
npm run preview
```

预览构建产物时，PWA service worker 和 manifest 会更接近线上效果。

## 部署到 Vercel

1. 将项目推送到 GitHub。
2. 打开 [Vercel](https://vercel.com/) 并导入该 GitHub 仓库。
3. Framework Preset 选择 `Vite`。
4. Build Command 使用 `npm run build`。
5. Output Directory 使用 `dist`。
6. 点击 Deploy。
7. 部署完成后复制 Vercel 公开链接，用手机浏览器打开。

也可以使用 Vercel CLI：

```bash
npm i -g vercel
vercel
vercel --prod
```

## 手机如何打开链接

部署完成后，用手机浏览器打开 Vercel 生成的 HTTPS 链接。建议使用 Chrome、Edge、Safari 或系统默认浏览器测试。

## 手机如何添加到主屏幕

Android Chrome：

1. 打开部署链接。
2. 等待页面底部出现“添加到手机桌面”，点击“添加”。
3. 如果按钮未出现，点击浏览器菜单，选择“添加到主屏幕”或“安装应用”。

iPhone Safari：

1. 用 Safari 打开部署链接。
2. 点击分享按钮。
3. 选择“添加到主屏幕”。
4. 名称显示为“法律风险识别助手”或“法律助手”。

## 如果 PWA 安装按钮不出现

- 确认页面使用 HTTPS，localhost 除外。
- 确认 `npm run build` 后产物包含 `manifest.webmanifest` 和 service worker。
- 确认浏览器支持 `beforeinstallprompt`。iOS Safari 通常不会触发该事件，需要通过分享菜单添加。
- 确认 manifest 中包含 `name`、`icons`、`start_url`、`display: standalone`。
- 确认图标文件可访问，例如 `/pwa-192x192.png` 和 `/pwa-512x512.png`。
- 清理浏览器站点数据后重新打开页面测试。

## 未来迭代方向

- 接入 OCR 识别合同、票据和聊天截图
- 接入语音识别和移动端录音上传
- 接入真实法律法规数据库和向量检索
- 增加地区差异和时效性提示
- 增加证据清单导出
- 增加多轮补充事实问答
- 增加法条来源可信度和检索置信度展示

## AI 产品经理能力体现

- 能识别法律 AI 的高风险边界
- 能将 RAG、OCR、ASR、Prompt Guardrail 转化为可演示产品流程
- 能设计“风险等级 + 法条依据 + 免责声明”的幻觉控制机制
- 能用 PWA 快速验证手机端产品体验
- 能将产品文档、前端实现和部署说明组织成作品集项目

## 免责声明

本工具仅提供法律信息检索与风险提示，不构成法律意见，不替代律师或司法机关判断。
