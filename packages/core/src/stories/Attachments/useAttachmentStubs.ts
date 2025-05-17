import type { FilesCardProps, FilesType } from '@components/FilesCard/types'
import { ElMessage } from 'element-plus'
import { ref } from 'vue'

export type SelfFilesCardProps = FilesCardProps & { id?: number }

export const files = ref<SelfFilesCardProps[]>([])

// 初始化 30 个模拟文件
export async function initDemoFiles() {
  if (files.value.length)
    return
  const { colorMap1 } = await import('@assets/mock.ts')
  const typeList = Object.keys(colorMap1) as FilesType[]
  for (let i = 0; i < 30; i++) {
    files.value.push({
      id: i,
      uid: i.toString(),
      name: `文件${i}`,
      fileSize: 1024 * 2,
      fileType: typeList[Math.floor(Math.random() * typeList.length)],
      url: 'https://www.baidu.com',
      thumbUrl: 'https://www.baidu.com',
      imgFile: new File([], `test${i}.txt`),
      showDelIcon: true,
    })
  }
}

export function useAttachmentStubs() {
  initDemoFiles()
  function handleBeforeUpload(file: File) {
    if (file.size > 1024 * 1024 * 2) {
      ElMessage.error('文件大小不能超过 2MB!')
      return false
    }
    return true
  }
  function handleUploadDrop(dropped: File[], props: any) {
    console.log(dropped, props)
    if (!dropped.length)
      return
    if (dropped[0].type === '') {
      ElMessage.error('禁止上传文件夹！')
      return false
    }
    dropped.forEach(f => handleHttpRequest({ file: f }))
  }
  async function handleHttpRequest(options: { file: File }) {
    const formData = new FormData()
    formData.append('file', options.file) // 字段名必须与 multer 配置的 `upload.single('file')` 一致
    // const res = await fetch('http://localhost:8330/api/upload', {
    //   method: 'POST',
    //   body: formData,
    // }).then(res => res.json()).then((res) => {
    //   return res
    // })
    ElMessage.info('上传中...')
    setTimeout(() => {
      const res = {
        message: '文件上传成功',
        fileName: options.file.name,
        uid: options.file.name,
        fileSize: options.file.size,
        imgFile: options.file,
      }
      files.value.push({
        id: files.value.length,
        uid: res.uid,
        name: res.fileName,
        fileSize: res.fileSize,
        imgFile: res.imgFile,
        showDelIcon: true,
      })
      ElMessage.success('上传成功')
    }, 1000)
  }
  function handleDeleteCard(item: SelfFilesCardProps) {
    files.value = files.value.filter(x => x.id !== item.id)
    console.log('delete' + item)
    ElMessage.success('删除成功')
  }
  return {
    files,
    handleBeforeUpload,
    handleUploadDrop,
    handleHttpRequest,
    handleDeleteCard,
  }
}
