<script setup lang="ts">
import Attachments from '@components/Attachments/index.vue'
import { useAttachmentStubs } from './useAttachmentStubs'

const {
  files,
  handleBeforeUpload,
  handleHttpRequest,
  handleUploadDrop,
  handleDeleteCard,
} = useAttachmentStubs()
</script>

<template>
  <div>
    <div class="component-container">
      <div class="component-title">
        附件上传组件- scrollY
      </div>
      <Attachments
        :file-list="files"
        :http-request="handleHttpRequest"
        :items="files"
        drag
        overflow="scrollY"
        :list-style="{
          padding: '0 12px',
          height: '200px',
        }"
        :before-upload="handleBeforeUpload"
        drag-target="attachmentsDemo"
        :hide-upload="false"
        @upload-drop="handleUploadDrop"
        @delete-card="handleDeleteCard"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.component-container {
  background-color: white;
  padding: 12px;
  border-radius: 15px;
  height: calc(100vh - 10px);
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
</style>
