import { fixture, expect } from '@open-wc/testing';
import './components/hello-world';

const renderHelper = <T extends Element>(tag: string) => {
  return (props: Record<string, any> = {}, children?: string) => {
    const attrs = Object.entries(props)
      .reduce((acc, [key, value]) => [...acc, `${key}=${value}`], [] as string[])
      .join(' ');
    return fixture<T>(`<${tag} ${attrs}>${children}</${tag}>`);
  };
};

describe('<hello-world>', () => {
  const render = renderHelper<HTMLElementTagNameMap['hello-world']>('hello-world');

  it('nodes exist', async () => {
    const comp = await render();
    expect(comp.shadowRoot).to.exist;
    const root = comp.shadowRoot!.firstElementChild;
    expect(root).to.exist;
    expect(root!.nodeName).to.equal('DIV');
    expect(root!.textContent).to.equal('hello, world!');
    const computedStyles = getComputedStyle(root!);
    expect(computedStyles.getPropertyValue('font-size')).to.equal('24px');
    expect(computedStyles.getPropertyValue('color')).to.equal('rgb(136, 170, 255)');
  });
});