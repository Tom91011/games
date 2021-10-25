export default function burgerComponent() {

  class Burger extends HTMLElement {
    constructor() {
      super();
    }
    connectedCallback() {
      this.innerHTML = `
          <i class="fas fa-bars"></i>
      `;
    }
  }
  customElements.define("burger-component", Burger)
}

burgerComponent()
