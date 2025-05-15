import type { Meta, StoryObj } from '@storybook/vue3';
import Thinking from './index.vue'
import ThinkingSource from '@components/Thinking/index.vue'

const meta = {
    title: 'Example/Thinking',
    component: Thinking,
    tags: ['autodocs'],
    argTypes: {
        modelValue: {
            control: 'boolean', 
        }
    },
    args: {
        modelValue: true
    }
} satisfies Meta<typeof ThinkingSource>;

export default meta;
type Story = StoryObj<typeof meta>;
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 */
export const ThinkingDemo: Story = {
    args: {
        
    } 
}