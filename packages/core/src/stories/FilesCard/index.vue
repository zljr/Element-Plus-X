<script lang="ts" setup>
import { FilesCard } from '../../components';
</script>

<template>
  <h2>下方设置属性进行预览</h2>
  <FilesCard v-bind="$attrs" />

  <br />
  <h4>设置 name 属性, 且 name 没有后缀。name="测试文件"</h4>
  <FilesCard v-bind="$attrs" name="测试文件" />
  <br />
  <h4>设置 name 属性，有文件后缀。name="测试文件.pdf"</h4>
  <FilesCard v-bind="$attrs" name="测试文件.pdf" />
  <br />
  <div class="files-card-container">
    <FilesCard v-bind="$attrs" name="测试doc后缀.doc" />
    <FilesCard v-bind="$attrs" name="测试xls后缀.xls" />
    <FilesCard v-bind="$attrs" name="测试ppt后缀.ppt" />
    <FilesCard v-bind="$attrs" name="测试txt后缀.txt" />
    <FilesCard v-bind="$attrs" name="测试pdf后缀.pdf" />
    <FilesCard v-bind="$attrs" name="测试png后缀.png" />
    <FilesCard v-bind="$attrs" name="测试jpg后缀.jpg" />
    <FilesCard v-bind="$attrs" name="测试gif后缀.gif" />
    <FilesCard v-bind="$attrs" name="测试mp4后缀.mp4" />
    <FilesCard v-bind="$attrs" name="测试mp3后缀.mp3" />
    <FilesCard v-bind="$attrs" name="测试zip后缀.zip" />
    <FilesCard v-bind="$attrs" name="测试rar后缀.rar" />
    <FilesCard v-bind="$attrs" name="测试7z后缀.7z" />
    <FilesCard v-bind="$attrs" name="测试lnk后缀.lnk" />
    <FilesCard v-bind="$attrs" name="测试obj后缀.obj" />
    <FilesCard v-bind="$attrs" name="测试fbx后缀.fbx" />
    <FilesCard v-bind="$attrs" name="测试glb后缀.glb" />
    <FilesCard v-bind="$attrs" name="测试sql后缀.sql" />
    <FilesCard v-bind="$attrs" name="测试db后缀.db" />
    <FilesCard v-bind="$attrs" name="测试md后缀.md" />
    <FilesCard v-bind="$attrs" name="测试js后缀.js" />
    <FilesCard v-bind="$attrs" name="测试py后缀.py" />
    <FilesCard v-bind="$attrs" name="测试java后缀.java" />
    <FilesCard v-bind="$attrs" name="测试php后缀.php" />
    <FilesCard v-bind="$attrs" name="测试json后缀.json" />
  </div>
  <br />
  <h4>如果有后缀，但是匹配不到常用的图标，则默认为 File 文件</h4>
  <FilesCard v-bind="$attrs" name="https://dd.com多个特殊字符.后缀.self" />
  <h4>状态设置</h4>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <div class="files-card-container-wrapper">
      <h4>设置 status 属性，控制文件加载状态 "uploading","done","error"</h4>
      <div class="files-card-container">
        <FilesCard
          v-bind="$attrs"
          name="uploading 测试文件.pdf"
          status="uploading"
        />
        <FilesCard v-bind="$attrs" name="done 测试文件.pdf" status="done" />
        <FilesCard v-bind="$attrs" name="error 测试文件.pdf" status="error" />
      </div>
      <h4>
        "uploading"+"percent" 控制上传进度，"error"+"errorTip"控制自定义失败提示
      </h4>
      <div class="files-card-container">
        <FilesCard
          v-bind="$attrs"
          name="uploading 测试文件.doc"
          status="uploading"
          :percent="50"
        />
        <FilesCard
          v-bind="$attrs"
          name="error 测试文件.doc"
          status="error"
          error-tip="自定义失败提示"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.files-card-container {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.files-card-container-wrapper {
  display: flex;
  gap: 12px;
  flex-direction: column;

  .files-card-container {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
}
</style>
