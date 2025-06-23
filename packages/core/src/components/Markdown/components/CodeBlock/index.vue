<script lang="ts">
import {
  transformerNotationDiff,
  transformerNotationErrorLevel,
  transformerNotationFocus,
  transformerNotationHighlight,
  transformerNotationWordHighlight
} from '@shikijs/transformers';
import { codeToHtml } from 'shiki';
import { defineComponent, h, ref, watch } from 'vue'; // 引入vue相关API

export default defineComponent({
  props: {
    raw: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {
    const renderLines = ref<string[]>([]);
    const preStyle = ref<any | null>(null);
    const shikiTransformers = [
      transformerNotationDiff(),
      transformerNotationErrorLevel(),
      transformerNotationFocus(),
      transformerNotationHighlight(),
      transformerNotationWordHighlight()
    ];
    // 生成高亮HTML的异步方法
    const generateHtml = async () => {
      const { language, content } = props.raw;
      // 调用shiki生成高亮HTML
      const html = await codeToHtml(content, {
        lang: language,
        theme: 'vitesse-light',
        transformers: shikiTransformers
      }).catch(() => {
        return '';
      });
      const parse = new DOMParser();
      const doc = parse.parseFromString(html, 'text/html');
      const preElement = doc.querySelector('pre');
      preStyle.value = preElement?.getAttribute('style');
      const codeElement = doc.querySelector('pre code');
      if (codeElement) {
        const lines = codeElement.querySelectorAll('.line'); // 获取所有代码行
        renderLines.value = Array.from(lines).map(line => line.outerHTML); // 存储每行HTML
      }
    };
    watch(() => props.raw.content, generateHtml, { immediate: true });
    return () =>
      h(
        'pre',
        {
          style: preStyle.value,
          key: props.raw.key
        },
        [
          h(
            'div',
            {
              style: { background: '#f5f5f5', color: 'red' }
            },
            'TODO:复制，粘贴，编辑等自定义操作头'
          ),
          h(
            'code',
            {
              class: `language-${props.raw.language}`,
              style: {
                display: 'flex',
                flexDirection: 'column'
              }
            },
            renderLines.value.map((line, index) =>
              h('span', {
                key: index,
                innerHTML: line
              })
            )
          )
        ]
      );
  }
});
</script>
