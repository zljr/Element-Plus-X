import type { Meta, StoryObj } from '@storybook/vue3'
import Attachments from './index.vue'
import AttachmentsSource from '@components/Attachments/index.vue'

const meta = {
    title: 'Example/Attachments',
    component: Attachments,
    tags: ['autodocs'],
    argTypes: {

    },
    args: {
        
    }

} satisfies Meta<typeof AttachmentsSource>;

export default meta;
type Story = StoryObj<typeof meta>;
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 */
export const AttachmentsDemo: Story = {
   args: {

   } as Story['args'],
}