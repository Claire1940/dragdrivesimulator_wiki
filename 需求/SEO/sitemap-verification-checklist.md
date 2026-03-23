# Sitemap 索引验证清单

## 任务概述
验证 WWE 2K26 Wiki 的 sitemap 是否被搜索引擎正确索引，确保所有重要页面都能被发现。

## 前置条件
- ✅ Google Search Console 已配置（任务 #3）
- ✅ Sitemap 已提交到 GSC
- ⏳ 等待 24-48 小时让 Google 抓取

## 验证步骤

### 1. 检查 Sitemap 可访问性

#### 1.1 访问 Sitemap URL
```bash
# 在浏览器中访问
https://www.wwe2k26.wiki/sitemap.xml
```

**预期结果**:
- 返回 200 状态码
- 显示 XML 格式的 sitemap
- 包含所有语言版本的页面

#### 1.2 验证 Sitemap 格式
检查 sitemap 是否包含必要字段：
- `<url>` - 页面 URL
- `<lastmod>` - 最后修改时间
- `<changefreq>` - 更新频率
- `<priority>` - 优先级

#### 1.3 统计页面数量
```bash
# 使用 curl 和 grep 统计 URL 数量
curl -s https://www.wwe2k26.wiki/sitemap.xml | grep -c "<url>"
```

**预期数量**:
- 首页: 8 页（8 种语言）
- 静态页面: 32 页（4 页 × 8 语言）
- MDX 内容: 根据实际内容数量
- **总计**: 约 100-500 页

### 2. Google Search Console 验证

#### 2.1 检查 Sitemap 状态

1. 登录 [Google Search Console](https://search.google.com/search-console)
2. 选择 `wwe2k26.wiki` 属性
3. 左侧菜单 → "站点地图"

**检查项**:
- [ ] 状态显示"成功"（绿色勾号）
- [ ] "已发现的网址"数量 > 0
- [ ] "上次读取时间"在最近 48 小时内
- [ ] 无错误或警告

#### 2.2 查看索引覆盖率

1. 左侧菜单 → "覆盖率"或"页面"
2. 查看"有效"页面数量

**检查项**:
- [ ] "有效"页面数量逐步增加
- [ ] "已排除"页面原因合理（如重复内容、noindex）
- [ ] "错误"页面数量为 0 或可解释

#### 2.3 检查多语言索引

1. 左侧菜单 → "国际定位" → "语言"
2. 查看是否识别了 8 种语言

**检查项**:
- [ ] 显示 8 种语言：en, es, pt, fr, de, ja, ar, ko
- [ ] 每种语言都有对应的页面数量
- [ ] hreflang 标签无错误

### 3. 手动索引测试

#### 3.1 测试重要页面索引

使用"网址检查"工具测试关键页面：

**测试页面列表**:
1. 首页（英文）: `https://www.wwe2k26.wiki`
2. 首页（其他语言）: `https://www.wwe2k26.wiki/es`
3. 静态页面: `https://www.wwe2k26.wiki/about`
4. MDX 内容页: `https://www.wwe2k26.wiki/{contentType}/{slug}`

**操作步骤**:
1. 在 GSC 顶部搜索框输入完整 URL
2. 点击"测试实际网址"
3. 查看结果

**预期结果**:
- [ ] "网址在 Google 中"显示"已编入索引"或"网址可编入索引"
- [ ] 无抓取错误
- [ ] 移动设备可用性正常
- [ ] 结构化数据有效（如果有）

#### 3.2 请求索引（可选）

如果重要页面未索引：
1. 在"网址检查"结果页
2. 点击"请求编入索引"
3. 等待 1-2 天后重新检查

### 4. 搜索引擎验证

#### 4.1 Google 搜索测试

使用 `site:` 操作符检查索引：

```
site:wwe2k26.wiki
```

**检查项**:
- [ ] 返回结果数量 > 0
- [ ] 首页出现在结果中
- [ ] 多语言页面都有索引

#### 4.2 特定页面搜索

```
site:wwe2k26.wiki/es
site:wwe2k26.wiki/about
```

**检查项**:
- [ ] 各语言版本都能搜索到
- [ ] 静态页面已索引

### 5. Robots.txt 验证

#### 5.1 检查 robots.txt

访问: `https://www.wwe2k26.wiki/robots.txt`

**确认项**:
- [ ] 允许 Googlebot 抓取 sitemap
- [ ] 未阻止重要页面
- [ ] Sitemap 位置正确声明

**推荐配置**:
```txt
User-agent: *
Allow: /

Sitemap: https://www.wwe2k26.wiki/sitemap.xml
```

#### 5.2 GSC Robots.txt 测试

1. GSC → "设置" → "robots.txt 测试工具"
2. 测试重要 URL 是否被允许

### 6. 性能监控

#### 6.1 查看搜索性能

1. GSC → "效果"
2. 查看数据（需要等待数据积累）

**监控指标**:
- 总点击次数
- 总展示次数
- 平均点击率（CTR）
- 平均排名

**注意**: 新网站需要 2-4 周才能看到有意义的数据

#### 6.2 设置数据导出（可选）

1. GSC → "效果" → "导出"
2. 定期导出数据用于分析

## 常见问题排查

### 问题 1: Sitemap 显示"无法获取"

**可能原因**:
- Sitemap URL 不可访问
- 服务器返回错误状态码
- robots.txt 阻止了 Googlebot

**解决方案**:
```bash
# 测试 sitemap 可访问性
curl -I https://www.wwe2k26.wiki/sitemap.xml

# 检查返回状态码是否为 200
```

### 问题 2: 已发现但未索引

**可能原因**:
- 页面内容质量不足
- 页面被标记为 noindex
- 页面重复内容

**解决方案**:
1. 检查页面 meta 标签是否有 `noindex`
2. 确保页面有足够的独特内容
3. 使用"网址检查"查看具体原因

### 问题 3: 多语言页面未索引

**可能原因**:
- hreflang 标签配置错误
- 语言版本内容不足
- 缺少内部链接

**解决方案**:
1. 验证 hreflang 标签格式
2. 确保每种语言都有完整翻译
3. 添加语言切换器链接

### 问题 4: 索引速度慢

**正常情况**:
- 新网站: 2-4 周
- 已建立网站: 1-7 天

**加速方法**:
1. 手动请求索引重要页面
2. 提高内容更新频率
3. 建立外部链接
4. 提交到其他搜索引擎（Bing Webmaster Tools）

## 验证完成标准

- [x] Sitemap 可正常访问
- [x] GSC 显示 sitemap 状态"成功"
- [x] 至少 50% 的页面已被索引
- [x] 8 种语言版本都有索引
- [x] 无严重抓取错误
- [x] 重要页面（首页、主要内容）已索引

## 持续监控建议

### 每周检查
- GSC 覆盖率报告
- 新增错误或警告
- 索引页面数量变化

### 每月检查
- 搜索性能趋势
- 热门查询关键词
- 点击率和排名变化

### 季度检查
- 整体 SEO 效果评估
- 竞争对手分析
- 内容策略调整

## 下一步

验证完成后，进入任务 #4：SEO 效果分析报告

## 工具推荐

- **Google Search Console**: 官方索引监控
- **Bing Webmaster Tools**: 微软搜索引擎
- **Screaming Frog**: 网站爬虫工具
- **Ahrefs/SEMrush**: 专业 SEO 分析（付费）

## 参考资源

- [Google 搜索中心 - Sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview)
- [索引覆盖率报告](https://support.google.com/webmasters/answer/7440203)
- [国际化 SEO](https://developers.google.com/search/docs/specialty/international/localized-versions)
