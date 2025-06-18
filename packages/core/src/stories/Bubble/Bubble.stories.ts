import type BubbleSource from '@components/Bubble/index.vue';
// import { fn } from '@storybook/test';
import type { Meta, StoryObj } from '@storybook/vue3';
import Bubble from './index.vue';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'Example/Bubble',
  component: Bubble,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    content: { control: 'text' },
    isMarkdown: { control: 'boolean' },
    typing: { control: 'object' },
    isFog: { control: 'boolean' },
    placement: { control: 'radio', options: ['start', 'end'] },
    avatar: { control: 'text' },
    loading: { control: 'boolean' },
    shape: { control: 'radio', options: ['round', 'corner'] },
    variant: {
      control: 'radio',
      options: ['filled', 'borderless', 'outlined', 'shadow']
    }
  },
  args: {
    // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
    loading: true,
    placement: 'start',
    shape: 'round',
    variant: 'filled',
    isMarkdown: true,
    isFog: true,
    typing: {
      step: 2,
      suffix: '💗',
      interval: 100,
      isRequestEnd: true
    }
  }
} satisfies Meta<typeof BubbleSource>;

export default meta;
type Story = StoryObj<typeof meta>;
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const BubbleDemo: Story = {
  args: {
    content: `
# 标题
这是一个 Markdown 示例。
- 列表项 1
- 列表项 2
**粗体文本** 和 *斜体文本*

### javascript
\`\`\`javascript
console.log('Hello, world!');
\`\`\`

### java
\`\`\`java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, world!");
    }
}
\`\`\`

### go
\`\`\`go
package main

import "fmt"

func main() {
    fmt.Println("Hello, world!")
}
\`\`\`

### mermaid 饼状图
\`\`\`mermaid
pie
    "传媒及文化相关" : 35
    "广告与市场营销" : 8
    "游戏开发" : 15
    "影视动画与特效" : 12
    "互联网产品设计" : 10
    "VR/AR开发" : 5
    "其他" : 15
\`\`\`

### mermaid 数学公式
\`\`\`mermaid
sequenceDiagram
    autonumber
    participant 1 as $$alpha$$
    participant 2 as $$beta$$
    1->>2: Solve: $$\sqrt{2+2}$$
    2-->>1: Answer: $$2$$
    Note right of 2: $$\sqrt{2+2}=\sqrt{4}=2$$
\`\`\`
`.trim(),
    avatar:
      'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
  }
};
