// import { fn } from '@storybook/test';
import type { Meta, StoryObj } from '@storybook/vue3';
import BubbleList from './index.vue';
import BubbleListSource from '@components/BubbleList/index.vue'
// import { messageArr } from '@assets/mock'
// import type { MessageItem } from '@assets/mock'

// const bubbleItem = ref<MessageItem[]>(messageArr)

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'Example/BubbleList',
  component: BubbleList,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    maxHeight: { control: 'text' },
    showBackButton: { control: 'boolean' }
  },
  args: {
    // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
    maxHeight: '500px',
  },
} satisfies Meta<typeof BubbleListSource>;

export default meta;
type Story = StoryObj<typeof meta>;
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const BubbleListDemo: Story = {
  args: {
    maxHeight: '500px',
  } as Story['args'],
};
