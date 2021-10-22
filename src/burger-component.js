export default function burgerComponent() {

  class Burger extends HTMLElement {
    constructor() {
      super();
    }
    connectedCallback() {
      this.innerHTML = `
        <div id="burger-menu">
        <button type="button" name="button" >
          <i class="fas fa-bars"></i>
        </button>
      </div>
      `;
    }
  }
  customElements.define("burger-component", Burger)
}

burgerComponent()
