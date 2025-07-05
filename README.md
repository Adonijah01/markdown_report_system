# wither's blog

一个基于 Laravel 11 的个人博客系统，支持技术文章和靶场报告展示，专为个人使用设计。

## 📁 项目结构

```
laravel_report_system/
├── app/                        # 应用逻辑
│   └── Http/
│       └── Controllers/        # 控制器
│           └── ReportController.php
├── bootstrap/                  # 启动文件
│   ├── app.php                # 应用启动配置
│   ├── cache/                 # 启动缓存
│   └── providers/             # 服务提供者
├── config/                     # 配置文件
│   └── app.php                # 应用配置
├── database/                   # 数据库相关
│   ├── factories/             # 模型工厂
│   ├── migrations/            # 数据库迁移
│   └── seeders/               # 数据填充
├── public/                     # 公共访问目录
│   ├── css/                   # 编译后的CSS文件
│   ├── js/                    # 编译后的JS文件
│   ├── images/                # 图片资源
│   └── index.php              # 应用入口
├── resources/                  # 资源文件
│   ├── css/                   # 源CSS文件
│   │   └── app.css            # 主样式文件
│   ├── js/                    # 源JavaScript文件
│   │   └── app.js             # 主脚本文件
│   └── views/                 # Blade模板
│       ├── layout.blade.php   # 布局模板
│       ├── index.blade.php    # 首页模板
│       └── report.blade.php   # 报告详情模板
├── routes/                     # 路由文件
│   ├── web.php                # Web路由
│   └── console.php            # 控制台路由
├── storage/                    # 存储目录
│   ├── app/                   # 应用存储
│   ├── framework/             # 框架缓存
│   ├── logs/                  # 日志文件
│   └── reports/               # Markdown报告文件
├── tests/                      # 测试文件
│   ├── Feature/               # 功能测试
│   └── Unit/                  # 单元测试
├── .env                       # 环境配置
├── .gitignore                 # Git忽略文件
├── artisan                    # Laravel命令行工具
├── composer.json              # Composer依赖配置
├── package.json               # NPM依赖配置
└── vite.config.js             # Vite构建配置
```

## 🚀 快速开始

### 1. 安装依赖

```bash
# 安装 PHP 依赖
composer install

# 安装前端依赖（可选）
npm install
```

### 2. 环境配置

```bash
# 生成应用密钥
php artisan key:generate

# 设置存储目录权限
chmod -R 775 storage bootstrap/cache
```

### 3. 启动开发服务器

```bash
# Laravel 内置服务器
php artisan serve

# 或使用 Valet（推荐）
valet link
```

### 4. 前端资源编译（可选）

```bash
# 开发模式
npm run dev

# 生产构建
npm run build
```

## 📝 使用说明

### 添加报告

1. 将 Markdown 文件放入 `storage/reports/` 目录
2. 文件名将作为 URL slug 使用
3. 访问 `/filename.html` 查看报告

### 文件管理

- **报告存储**：`storage/reports/`
- **静态资源**：`public/css/`, `public/js/`, `public/images/`
- **模板文件**：`resources/views/`
- **样式源文件**：`resources/css/app.css`
- **脚本源文件**：`resources/js/app.js`

### 自定义样式

- 编辑 `resources/css/app.css` 自定义样式
- 使用 Pico.css 作为基础样式框架
- 支持响应式设计和打印样式

### 自定义脚本

- 编辑 `resources/js/app.js` 添加交互功能
- 内置搜索、代码高亮、目录生成功能
- 支持代码块复制、全屏模式等

## 🛠️ 技术栈

- **后端**：Laravel 11
- **Markdown**：league/commonmark 2.7
- **前端**：Pico.css + 原生 JavaScript
- **构建工具**：Vite（可选）
- **服务器**：Laravel Valet（推荐）

## 📂 目录说明

| 目录 | 用途 | 说明 |
|------|------|------|
| `public/` | Web根目录 | Nginx/Apache 指向此目录 |
| `resources/css/` | CSS源文件 | 样式开发目录 |
| `resources/js/` | JS源文件 | 脚本开发目录 |
| `public/css/` | 编译后CSS | Vite构建输出目录 |
| `public/js/` | 编译后JS | Vite构建输出目录 |
| `public/images/` | 图片资源 | 静态图片存储 |
| `storage/reports/` | Markdown文件 | 报告内容存储 |
| `storage/framework/` | 框架缓存 | Laravel框架缓存目录 |
| `bootstrap/cache/` | 启动缓存 | 应用启动优化缓存 |

## 🔧 开发工具

```bash
# 创建新报告（待实现）
php artisan make:report "报告标题"

# 清除缓存
php artisan cache:clear
php artisan view:clear

# 代码格式化
./vendor/bin/pint
```

## 📈 扩展功能

- 语法高亮：可集成 Shiki 或 highlight.js
- 全文搜索：可使用 Laravel Scout + Meilisearch
- 静态导出：可使用 spatie/laravel-export
- 文件上传：可添加 Web 端文件管理

## 🚀 部署

### 开发环境
- 使用 `php artisan serve` 或 Laravel Valet
- 前端资源使用 CDN（Pico.css）

### 生产环境
- 配置 Nginx/Apache 指向 `public/` 目录
- 运行 `composer install --no-dev --optimize-autoloader`
- 可选：`npm run build` 构建前端资源

---

**注意**：此项目为个人使用设计，无用户认证系统。如需公开部署，请添加适当的访问控制。 