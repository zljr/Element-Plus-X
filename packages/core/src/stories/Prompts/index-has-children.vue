<script lang="ts" setup>
import type { PromptsItemsProps } from '@components/Prompts/types';
import { ElMessage } from 'element-plus';
import { Prompts } from '../../components';

const items = ref<PromptsItemsProps[]>([]);

onMounted(() => {
  for (let index = 0; index < 3; index++) {
    items.value.push({
      key: index,
      label: `🐠 主标题 ${index}`,
      description: `描述 ${index}`,
      // icon: h(InfoFilled, { style: { color: '#409EFF' } }),
      // icon: 'ancient-gate-fill',
      disabled: false,
      itemStyle: {
        width: `calc(100% / ${3} - 43px)`,
        backgroundImage: `linear-gradient(137deg, #e5f4ff 0%, #efe7ff 100%)`
      },
      itemHoverStyle: {
        cursor: 'unset'
        // background: '#409EFF',
        // color: '#fff',
      },
      // itemActiveStyle: {
      //   // background: 'red',
      //   // color: '#fff',
      // },
      children: [
        {
          key: `${index}-1`,
          label: `🐛 子标题 ${index}-1`,
          description: `描述 ${index}`,
          disabled: false,
          itemStyle: {
            backgroundImage: `linear-gradient(137deg, #e5f4ff 0%, #efe7ff 100%)`,
            border: '1px solid #FFF'
          },
          itemHoverStyle: {
            cursor: 'unset'
          },
          children: [
            {
              key: `${index}-1-1`,
              label: `🐛 孙子标题 ${index}-1-1`,
              description: `描述 ${index}`,
              disabled: false,
              itemStyle: {
                background: 'rgba(255,255,255,0.45)',
                border: '1px solid #FFF'
              }
            },
            {
              key: `${index}-1-2`,
              label: `🐛 孙子标题 ${index}-1-1`,
              description: `描述 ${index}`,
              disabled: false,
              itemStyle: {
                background: 'rgba(255,255,255,0.45)',
                border: '1px solid #'
              }
            },
            {
              key: `${index}-1-3`,
              label: `🐛 孙子标题 ${index}-1-1`,
              description: `描述 ${index}`,
              disabled: false,
              itemStyle: {
                background: 'rgba(255,255,255,0.45)',
                border: '1px solid #FFF'
              }
            }
          ]
        },
        {
          key: `${index}-2`,
          label: `🐛 子标题 ${index}-2`,
          description: `描述 ${index}`,
          disabled: false,
          itemStyle: {
            background: 'rgba(255,255,255,0.45)',
            border: '1px solid #FFF'
          }
        },
        {
          key: `${index}-3`,
          label: `🐛 子标题 ${index}-3`,
          description: `描述 ${index}`,
          disabled: false,
          itemStyle: {
            background: 'rgba(255,255,255,0.45)',
            border: '1px solid #FFF'
          }
        }
      ]
    });
  }
});

function handleItemClick(item: PromptsItemsProps) {
  ElMessage.success(`点击了 ${item.key}`);
}
</script>

<template>
  <h4>嵌套样式</h4>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <Prompts
      title="🐛 提示集组件标题"
      v-bind="$attrs"
      :items="items"
      @item-click="handleItemClick"
    />
  </div>
</template>
