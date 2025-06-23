import type { Pluggable } from 'unified';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';
import remarkBreaks from 'remark-breaks';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import { computed, toRefs } from 'vue';

function usePlugins(props: any) {
  const { allowHtml, enableLatex, enableBreaks, rehypePlugins, remarkPlugins } =
    toRefs(props);

  const rehype = computed(() => {
    return [
      allowHtml.value && rehypeRaw,
      enableLatex.value && rehypeKatex,
      ...(rehypePlugins.value as Pluggable[])
    ].filter(Boolean) as Pluggable[];
  });

  const remark = computed(() => {
    const base: (Pluggable | { plugins: Pluggable[] })[] = [
      [remarkGfm, { singleTilde: false }],
      enableLatex.value && remarkMath,
      enableBreaks.value && remarkBreaks
    ].filter(Boolean) as (Pluggable | { plugins: Pluggable[] })[];

    return [
      ...base,
      ...(remarkPlugins.value as (Pluggable | { plugins: Pluggable[] })[])
    ];
  });

  return {
    rehypePlugins: rehype,
    remarkPlugins: remark
  };
}
export { usePlugins };
