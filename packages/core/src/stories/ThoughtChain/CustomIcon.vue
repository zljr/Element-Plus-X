<script setup lang="ts">
import { CircleCloseFilled, Loading, SuccessFilled } from '@element-plus/icons-vue'
import { ElIcon } from 'element-plus'
</script>

<template>
  <ThoughtChain v-bind="$attrs">
    <!-- 自定义 icon 插槽 -->
    <template #icon="{ item }">
      <span v-if="item.status === 'success'" class="slot-success">
        <el-icon>
          <SuccessFilled />
        </el-icon>
      </span>
      <span v-if="item.status === 'error'" class="slot-error">
        <el-icon>
          <CircleCloseFilled />
        </el-icon>
      </span>
      <span v-if="item.status === 'loading'" class="slot-loading">
        <el-icon class="is-loading">
          <Loading />
        </el-icon>
      </span>
    </template>
  </ThoughtChain>
</template>

<style lang="scss" scoped></style>
