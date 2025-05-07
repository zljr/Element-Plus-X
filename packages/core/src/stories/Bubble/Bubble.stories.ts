// import { fn } from '@storybook/test';
import type { Meta, StoryObj } from '@storybook/vue3';
import Bubble from './index.vue';
import BubbleSource from '@components/Bubble/index.vue'



// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'Example/Bubble',
  component: Bubble,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    // TODO: 这里需要改成 Bubble 的属性
    content: { control: 'text' },
    isMarkdown: { control: 'boolean' },
    typing: { control: 'object' },
    isFog: { control: 'boolean' }
  },
  args: {
    // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  },
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
  },
};
