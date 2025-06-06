# useRecord 🌴

## 介绍

这是一个自动调用 浏览器内置 API 语音转文字的 钩子函数，让用户快速使用 语音转文字功能，并且返回开始、结束、错误等事件，和 loading 状态。方便开发者 集成使用，实现自定义的 语音按钮样式。

结合 `sender` 发送输入框 和 useRecord 钩子函数，可以很好的实现自定义的 语音按钮样式。

## 代码演示

<demo src="./demos/use.vue"></demo>

## config 配置

| 参数名 | 说明               | 类型                          |
| ------ | ------------------ | ----------------------------- |
| onEnd  | 结束语音的回调函数 | `(res: 语音转换结果) => void` |

## 返回钩子

| 属性名  | 说明               | 类型                         |
| ------- | ------------------ | ---------------------------- |
| start   | 触发开始语音       | `(event:MouseEvent) => void` |
| stop    | 触发开始语音       | `(event:MouseEvent) => void` |
| loading | 是否正在语音中     | `boolean`                    |
| value   | 语音转换的实时文字 | `string`                     |
