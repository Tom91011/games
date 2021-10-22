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
  customElements.define("date-component", Date)
}

dateComponent()
