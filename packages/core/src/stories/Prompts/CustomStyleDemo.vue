<script lang="ts" setup>
import type { PromptsItemsProps } from '@components/Prompts/types';
import { ElMessage } from 'element-plus';
import { Prompts } from '../../components';

function handleItemClick(item: PromptsItemsProps) {
  ElMessage.success(`点击了 ${item.key}`);
}
</script>

<template>
  <h4>定制样式</h4>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <Prompts
      v-bind="$attrs"
      :style="{
        width: '300px',
        padding: '12px',
        borderRadius: '8px',
        background:
          'linear-gradient(to bottom right, rgba(237, 43, 114, 0.9), rgba(223, 67, 62, 0.9)'
      }"
      @item-click="handleItemClick"
    />
  </div>
</template>
