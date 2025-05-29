<script lang="ts" setup>
import { FilesCard } from '../../components';
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <FilesCard
      v-bind="$attrs"
      name="自定义style样式.xls"
      style="
        background-color: #f0f9eb;
        border: 2px solid #67c23a;
        border-radius: 20px;
      "
    />
    <FilesCard
      v-bind="$attrs"
      name="自定义hoverStyle样式.xls"
      style="
        background-color: #f0f9eb;
        border: 1px solid #67c23a;
        border-radius: 20px;
      "
      :hover-style="{
        'box-shadow': '0 2px 12px 0 rgba(0, 0, 0, 0.1)',
        'border-color': 'red',
        'background-color': 'rgba(255, 0, 0, 0.1)'
      }"
    />
  </div>
</template>

<style scoped lang="less"></style>
