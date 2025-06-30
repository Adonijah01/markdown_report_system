# 🎯 欢迎使用 Laravel 靶场报告系统

欢迎使用你的个人靶场报告展示系统！这个系统基于 Laravel 11 构建，专为展示 Markdown 格式的靶场报告而设计。

## ✨ 系统特性

### 📝 Markdown 支持
- 支持标准 Markdown 语法
- GitHub 风味 Markdown 扩展
- 代码语法高亮
- 表格、任务列表等高级功能

### 🎨 现代化界面
- 响应式设计，支持移动端访问
- 基于 Pico.css 的简洁美观界面
- 深色/浅色主题自适应
- 打印友好的样式

### 🚀 性能优化
- 智能缓存机制（缓存时间：1小时）
- 文件修改时间检测，自动更新缓存
- 轻量级设计，快速加载

### 🔍 实用功能
- **搜索功能**：快速搜索报告标题和内容
- **目录生成**：自动生成文章目录导航
- **代码复制**：一键复制代码块
- **全屏模式**：专注阅读体验
- **锚点链接**：点击标题复制链接

## 📁 使用说明

### 添加新报告

1. 将 `.md` 文件放入 `storage/reports/` 目录
2. 文件名将作为 URL 的一部分（例如：`report-1.md` → `/report-1.html`）
3. 支持中文文件名和特殊字符

### Markdown 语法示例

#### 代码块
```bash
# 扫描目标主机
nmap -sS -sV 192.168.1.0/24

# 查看开放端口
nmap -p 1-65535 -T4 192.168.1.100
```

```python
# Python 漏洞利用脚本示例
import requests

def exploit_sqli(url, payload):
    """SQL注入漏洞利用"""
    data = {'username': payload, 'password': 'test'}
    response = requests.post(url + '/login', data=data)
    return response.text
```

#### 表格展示

| 漏洞类型 | 风险等级 | 影响范围 | 修复建议 |
|---------|---------|---------|---------|
| SQL注入 | 🔴 高危 | 数据泄露 | 参数化查询 |
| XSS | 🟡 中危 | 用户劫持 | 输入过滤 |
| CSRF | 🟡 中危 | 权限滥用 | Token验证 |

#### 任务清单

- [x] 信息收集
- [x] 漏洞扫描
- [x] 手工测试
- [ ] 漏洞利用
- [ ] 权限提升
- [ ] 横向移动

#### 引用块

> **注意事项**  
> 本系统仅用于合法的渗透测试和安全研究。使用前请确保已获得目标系统所有者的明确授权。

## 🛠️ 技术栈

- **后端框架**：Laravel 11
- **Markdown 解析**：league/commonmark 2.7
- **前端框架**：Pico.css + 原生 JavaScript
- **构建工具**：Vite（可选）
- **开发环境**：Laravel Valet / Artisan Serve

## 📈 高级功能

### 自定义样式

你可以通过编辑 `resources/css/app.css` 来自定义界面样式：

```css
/* 自定义主题色 */
:root {
    --primary-color: #your-color;
    --secondary-color: #your-secondary-color;
}
```

### JavaScript 扩展

在 `resources/js/app.js` 中添加自定义功能：

```javascript
// 添加自定义功能
function customFeature() {
    console.log('自定义功能');
}
```

## 🔧 故障排除

### 常见问题

1. **报告不显示**
   - 检查文件是否在 `storage/reports/` 目录
   - 确认文件扩展名为 `.md`
   - 检查文件权限

2. **样式异常**
   - 清除浏览器缓存
   - 运行 `php artisan view:clear`
   - 检查 CSS 文件路径

3. **搜索功能无效**
   - 确保 JavaScript 已加载
   - 检查浏览器控制台错误

### 性能优化

```bash
# 清除所有缓存
php artisan cache:clear
php artisan view:clear

# 优化自动加载
composer dump-autoload --optimize

# 生产环境优化
php artisan config:cache
php artisan route:cache
```

## 🚀 部署建议

### 开发环境
```bash
# 启动开发服务器
php artisan serve

# 或使用 Valet
valet link
```

### 生产环境
```bash
# 安装生产依赖
composer install --no-dev --optimize-autoloader

# 设置环境变量
cp .env.example .env
php artisan key:generate

# 配置 Web 服务器指向 public/ 目录
```

---

## 🎉 开始使用

现在你可以：

1. 📝 将你的 Markdown 报告文件放入 `storage/reports/` 目录
2. 🌐 通过浏览器访问你的报告系统
3. 🔍 使用搜索功能快速找到需要的报告
4. 📱 在任何设备上查看你的报告

祝你使用愉快！如有问题，请查看项目文档或提交 Issue。 