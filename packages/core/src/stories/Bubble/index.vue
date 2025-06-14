<script setup lang="ts">
import type { BubbleProps } from '@components/Bubble/types';
import Bubble from '@components/Bubble/index.vue';
import ConfigProvider from '@components/ConfigProvider/index.vue';
import { DocumentCopy, Refresh, Search, Star } from '@element-plus/icons-vue';
import markdownItMermaid from '@jsonlee_12138/markdown-it-mermaid';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-go';
import 'prismjs/themes/prism.min.css';

defineProps<BubbleProps>();
const loading = ref(true);

const mdPlugins = [markdownItMermaid({ delay: 100, forceLegacyMathML: true })];

onMounted(() => {
  setTimeout(() => {
    loading.value = false;
  }, 2000);
});
</script>

<template>
  <ConfigProvider :md-plugins="mdPlugins">
    <div class="component-container">
      <p>新版本支持 打字器 雾化效果 使用 Mermaid.js 支持简单的图表和函数公式</p>
      <div class="component-1">
        <Bubble
          :placement="placement"
          :content="content"
          :shape="shape"
          :variant="variant"
          :loading="loading"
          :typing="typing"
          :is-markdown="isMarkdown"
          :is-fog="{ bgColor: '#FFFFFF' }"
        >
          <template #avatar>
            <el-avatar :size="32" :src="avatar" />
          </template>

          <!-- <template #content>
          <div class="content-container">在这里可以自定义内容，支持插槽。</div>
        </template> -->

          <template #footer>
            <div class="footer-container">
              <el-button type="info" :icon="Refresh" size="small" circle />
              <el-button type="success" :icon="Search" size="small" circle />
              <el-button type="warning" :icon="Star" size="small" circle />
              <el-button
                color="#626aef"
                :icon="DocumentCopy"
                size="small"
                circle
              />
            </div>
          </template>
        </Bubble>
      </div>
    </div>
  </ConfigProvider>
</template>

<style scoped lang="scss">
.component-container {
  background-color: white;
  padding: 12px;
  border-radius: 15px;

  .component-1 {
    .footer-container {
      :deep() {
        .el-button + .el-button {
          margin-left: 8px;
        }
      }
    }
  }
}
</style>
