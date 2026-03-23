# Google Search Console 配置指南

## 任务概述
为 WWE 2K26 Wiki 配置 Google Search Console，以便监控网站的 SEO 效果和索引状态。

## 网站信息
- **网站 URL**: https://www.wwe2k26.wiki
- **Sitemap URL**: https://www.wwe2k26.wiki/sitemap.xml
- **支持语言**: en, es, pt, fr, de, ja, ar, ko (8种语言)

## 配置步骤

### 1. 添加网站属性

1. 访问 [Google Search Console](https://search.google.com/search-console)
2. 点击"添加资源"
3. 选择"网域"或"网址前缀"
   - **推荐：网域** - 验证 `wwe2k26.wiki`（包含所有子域名和协议）
   - **备选：网址前缀** - 验证 `https://www.wwe2k26.wiki`（仅 HTTPS + www）

### 2. 验证网站所有权

#### 方法 A：DNS 验证（推荐，适用于网域属性）

1. Google 会提供一个 TXT 记录，例如：
   ```
   google-site-verification=abc123xyz456
   ```

2. 登录你的域名注册商（如 Cloudflare、GoDaddy、Namecheap）

3. 添加 DNS TXT 记录：
   - **类型**: TXT
   - **名称**: @ 或 wwe2k26.wiki
   - **值**: `google-site-verification=abc123xyz456`
   - **TTL**: 自动或 3600

4. 等待 DNS 传播（通常 5-30 分钟）

5. 返回 Google Search Console 点击"验证"

#### 方法 B：HTML 文件验证（适用于网址前缀）

1. Google 会提供一个 HTML 文件，例如 `google1234567890abcdef.html`

2. 在项目中创建该文件：
   ```bash
   # 在 public 目录创建验证文件
   echo "google-site-verification: google1234567890abcdef.html" > public/google1234567890abcdef.html
   ```

3. 部署到生产环境

4. 确认可访问：`https://www.wwe2k26.wiki/google1234567890abcdef.html`

5. 返回 Google Search Console 点击"验证"

#### 方法 C：HTML 标签验证

1. Google 会提供一个 meta 标签，例如：
   ```html
   <meta name="google-site-verification" content="abc123xyz456" />
   ```

2. 编辑 `src/app/layout.tsx`，在 `<head>` 中添加：
   ```tsx
   export const metadata: Metadata = {
     // ... 其他 metadata
     verification: {
       google: 'abc123xyz456', // 替换为实际的验证码
     },
   }
   ```

3. 部署到生产环境

4. 返回 Google Search Console 点击"验证"

### 3. 提交 Sitemap

验证成功后：

1. 在左侧菜单选择"站点地图"（Sitemaps）

2. 输入 sitemap URL：
   ```
   sitemap.xml
   ```

3. 点击"提交"

4. 等待 Google 抓取（通常 24-48 小时）

### 4. 配置国际化定位

由于网站支持 8 种语言，需要配置 hreflang：

1. 在左侧菜单选择"国际定位"（International Targeting）

2. 检查"语言"标签，确认 Google 是否正确识别了 hreflang 标签

3. 项目已在 `src/app/[locale]/layout.tsx` 中自动生成 hreflang 标签，无需额外配置

### 5. 设置用户和权限（可选）

如果需要团队协作：

1. 点击左上角"设置"图标
2. 选择"用户和权限"
3. 添加用户邮箱并分配权限：
   - **所有者**: 完全控制
   - **完全用户**: 查看所有数据和执行操作
   - **受限用户**: 仅查看数据

## 验证检查清单

配置完成后，检查以下项目：

- [ ] 网站已在 Google Search Console 中验证
- [ ] Sitemap 已提交（状态显示"成功"）
- [ ] 可以查看"效果"报告（需要等待数据积累）
- [ ] "覆盖率"显示已索引的页面数量
- [ ] "国际定位"正确识别 8 种语言
- [ ] 无严重错误或警告

## 预期结果

- **Sitemap 页面数**: 约 100-500 页（取决于 MDX 内容数量）
- **索引页面数**: 初期可能较少，逐步增加
- **语言版本**: 8 种语言的页面都应被索引
- **数据延迟**: 搜索性能数据通常延迟 2-3 天

## 常见问题

### Q: 验证失败怎么办？
A:
- DNS 验证：检查 DNS 记录是否正确添加，使用 `nslookup -type=TXT wwe2k26.wiki` 验证
- HTML 文件：确认文件可访问且内容正确
- HTML 标签：检查页面源代码是否包含 meta 标签

### Q: Sitemap 提交后显示"无法获取"？
A:
- 确认 sitemap.xml 可访问：https://www.wwe2k26.wiki/sitemap.xml
- 检查 robots.txt 是否阻止了 Googlebot
- 等待 24-48 小时后重试

### Q: 为什么索引页面数很少？
A:
- 新网站需要时间建立信任
- 检查"覆盖率"报告中的"已排除"和"错误"
- 确保页面有足够的内容和内部链接

### Q: 如何加速索引？
A:
- 使用"网址检查"工具手动请求索引重要页面
- 提高网站内容质量和更新频率
- 建立外部链接（backlinks）

## 下一步

配置完成后，进入任务 #2：验证 Sitemap 索引状态

## 参考资源

- [Google Search Console 帮助中心](https://support.google.com/webmasters)
- [验证网站所有权](https://support.google.com/webmasters/answer/9008080)
- [提交 Sitemap](https://support.google.com/webmasters/answer/183668)
- [国际化和 hreflang](https://developers.google.com/search/docs/specialty/international/localized-versions)
