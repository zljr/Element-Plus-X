import type EditorSenderSource from '@components/ChatEditorSender/index.vue';
import type { EditorProps } from '@components/ChatEditorSender/types';
import type { Meta, StoryObj } from '@storybook/vue3';
import EditorSender from './index.vue';

const meta: Meta<typeof EditorSenderSource> = {
  title: 'Example/EditorSender'
} satisfies Meta<typeof EditorSenderSource>;

export default meta;

type Story = StoryObj<typeof meta>;

export const EditorSenderDemo: Story = {
  render: (_args: EditorProps) => ({
    setup() {},
    components: { EditorSender },
    template: `
      <EditorSender />
    `
  })
};
