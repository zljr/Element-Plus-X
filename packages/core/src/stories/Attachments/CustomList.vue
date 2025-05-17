<script setup lang="ts">
import Attachments from '@components/Attachments/index.vue'
import { useAttachmentStubs } from './useAttachmentStubs'
import 'element-plus/theme-chalk/el-message.css'

const {
  files,
  handleBeforeUpload,
  handleHttpRequest,
  handleUploadDrop,
} = useAttachmentStubs()
</script>

<template>
  <div>
    <div class="component-container">
      <div class="component-title">
        附件上传组件-自定义 列表内容
      </div>
      <Attachments
        :items="files"
        overflow="scrollX"
        :list-style="{ padding: '0 12px' }"
        :before-upload="handleBeforeUpload"
        :hide-upload="false"
        :http-request="handleHttpRequest"
        @upload-drop="handleUploadDrop"
      >
        <template #file-list="{ items }">
          <div class="custom-list">
            <div
              v-for="(item, idx) in items"
              :key="idx"
              class="custom-item"
            >
              <div class="custom-item-name">
                {{ item.name }}
              </div>
            </div>
          </div>
        </template>
      </Attachments>
    </div>
  </div>
</template>

<style scoped lang="scss">
.component-container {
  background-color: white;
  padding: 12px;
  border-radius: 15px;
  height: calc(100vh - 80px);
  overflow-y: auto;

  .component-title {
    display: flex;
    align-items: center;
    position: relative;
    padding-left: 12px;
    font-weight: 700;
    line-height: 1.5;
    margin-bottom: 12px;
    margin-top: 24px;

    &::after {
      position: absolute;
      content: '';
      display: block;
      width: 5px;
      height: 75%;
      border-radius: 15px;
      left: 0;
      background-color: #409EFF;
    }
  }
}
.custom-list {
  display: flex;
  .custom-item {
    margin: 8px;
    width: 200px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    background-color: antiquewhite;
  }
}
</style>
