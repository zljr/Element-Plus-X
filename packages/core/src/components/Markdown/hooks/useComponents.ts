import { h } from 'vue';
import { CodeX, Link } from '../components/index';

function useComponents() {
  const components = {
    code: (raw: any) => h(CodeX, { raw }),
    a: (raw: any) => h(Link, { raw })
  };
  return components;
}

export { useComponents };
