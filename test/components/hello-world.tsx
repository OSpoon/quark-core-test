import {
  QuarkElement,
  customElement,
} from "quarkc"
import style from "./style.css"

const tag = 'hello-world';

declare global {
  interface HTMLElementTagNameMap {
    [tag]: HelloWorld;
  }
}

@customElement({ tag, style })
class HelloWorld extends QuarkElement {
  render() {
    return <div className="test">hello, world!</div>;
  }
}
