export default function dateComponent() {

  class Date extends HTMLElement {
    constructor() {
      super();
    }
    connectedCallback() {
      this.innerHTML = `
      <div id="date-container">
        <h3 id="date"></h3>
        <h3 id="time"></h3>
      </div>
      `;
    }
  }

// stops the customElement getting called twice if it already exists
  if (!customElements.get('date-component')) {
   customElements.define('date-component', Date);
  }
}

dateComponent()
