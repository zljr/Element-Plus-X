import type { Meta, StoryObj } from '@storybook/vue3'
import CustomButtons from './CustomButtons.vue'
import CustomList from './CustomList.vue'
import DefaultScrollX from './DefaultScrollX.vue'
import ScrollY from './ScrollY.vue'
import Wrap from './Wrap.vue'

const meta: Meta = {
  title: 'Example/Attachments',
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj

export const CustomListDemo: Story = {
  name: 'CustomList',
  render: () => ({ components: { CustomList }, template: '<CustomList/>' }),
}
export const CustomButtonsDemo: Story = {
  name: 'CustomButtons',
  render: () => ({ components: { CustomButtons }, template: '<CustomButtons/>' }),
}
export const DefaultScrollXDemo: Story = {
  name: 'ScrollX',
  render: () => ({ components: { DefaultScrollX }, template: '<DefaultScrollX/>' }),
}
export const ScrollYDemo: Story = {
  name: 'ScrollY',
  render: () => ({ components: { ScrollY }, template: '<ScrollY/>' }),
}
export const WrapDemo: Story = {
  name: 'Wrap',
  render: () => ({ components: { Wrap }, template: '<Wrap/>' }),
}
