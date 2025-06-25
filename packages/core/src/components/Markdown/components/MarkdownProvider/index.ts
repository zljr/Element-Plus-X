import type { Ref } from 'vue';
import type { MarkdownContext } from './types';
import deepmerge from 'deepmerge';
import { computed, defineComponent, h, inject, provide } from 'vue';
import { usePlugins } from '../../hooks';
import { MarkdownProps } from '../../shared';
import { MARKDOWN_PROVIDER_KEY } from '../../shared';

const MarkdownProvider = defineComponent({
  name: 'MarkdownProvider',
  props: MarkdownProps,
  setup(props, { slots, attrs }) {
    const { rehypePlugins, remarkPlugins } = usePlugins(props);
    const contextProps = computed(() => {
      return deepmerge(
        {
          rehypePlugins: toValue(rehypePlugins),
          remarkPlugins: toValue(remarkPlugins)
        },
        props
      );
    });
    provide(MARKDOWN_PROVIDER_KEY, contextProps);
    return () =>
      h(
        'div',
        { class: 'markdownProvider', ...attrs },
        slots.default && slots.default()
      );
  }
});

function useMarkdownContext(): Ref<MarkdownContext> {
  const context = inject<Ref<MarkdownContext>>(MARKDOWN_PROVIDER_KEY);
  if (!context) {
    return computed(() => ({})) as Ref<MarkdownContext>;
  }
  return context;
}
export { MarkdownProvider, useMarkdownContext };
