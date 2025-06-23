# 使用

```js
import {MarkdownRenderer,MarkdownRendererAsync} from '@/components/Markdown';


// 同步渲染
<MarkdownRenderer class="markdown-render" :markdown="content" />

// 异步渲染
<Suspense>
  <MarkdownRendererAsync class="markdown-render" :markdown="content" />
</Suspense>
```
