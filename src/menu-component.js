export default function menuComponent() {
  class Menu extends HTMLElement {
    constructor() {
      super();
    }
    connectedCallback() {
      this.innerHTML = `
      <div class="menu-options">
        <nav id="nav">

          <h1>Games</h1>
          <ul>
            <li><a href="file:///C:/Users/tomni/OneDrive/Documents/Tom/Web%20Development/games/games/dist/index.html">Cards</a></li>
            <li><a href="file:///C:/Users/tomni/OneDrive/Documents/Tom/Web%20Development/games/games/dist/index.html">Dice</a></li>
            <li><a href="file:///C:/Users/tomni/OneDrive/Documents/Tom/Web%20Development/games/games/dist/index.html">Pacman</a></li>
            <li><a href="file:///C:/Users/tomni/OneDrive/Documents/Tom/Web%20Development/games/games/dist/index.html">Dominoes</a></li>
            <li><a href="./minesweeper.html">Minesweeper</a></li>
            <li><a href="file:///C:/Users/tomni/OneDrive/Documents/Tom/Web%20Development/games/games/dist/index.html">Rock, Paper, Scissors</a></li>
          </ul>
          <h1>Other Sites</h1>
          <ul>
            <li><a href="file:///C:/Users/tomni/OneDrive/Documents/Tom/Web%20Development/games/games/dist/index.html">Countries</a></li>
            <li><a href="file:///C:/Users/tomni/OneDrive/Documents/Tom/Web%20Development/games/games/dist/index.html">IP Tracker</a></li>
            <li><a href="file:///C:/Users/tomni/OneDrive/Documents/Tom/Web%20Development/games/games/dist/index.html">Blog Site</a></li>
            <li><a href="file:///C:/Users/tomni/OneDrive/Documents/Tom/Web%20Development/games/games/dist/index.html">Sign-up Page</a></li>
            <li><a href="file:///C:/Users/tomni/OneDrive/Documents/Tom/Web%20Development/games/games/dist/index.html">Picture Carousel</a></li>
          </ul>
          <h1>About Me</h1>
          <ul>
            <li><a href="file:///C:/Users/tomni/OneDrive/Documents/Tom/Web%20Development/games/games/dist/index.html">Why does this exist?</a></li>
            <li><a href="file:///C:/Users/tomni/OneDrive/Documents/Tom/Web%20Development/games/games/dist/index.html">What do I want?</a></li>
            <li><a href="file:///C:/Users/tomni/OneDrive/Documents/Tom/Web%20Development/games/games/dist/index.html">My History</a></li>
            <li><a href="file:///C:/Users/tomni/OneDrive/Documents/Tom/Web%20Development/games/games/dist/index.html">CV</a></li>
          </ul>
        </nav>
        <div class="hide-btn">
          <button id="menu-btn" type="submit" name="button">
            <i class="fas fa-caret-left"></i>
          </button>
        </div>
      </div>
      `
    }
  }
  customElements.define("menu-component", Menu)
}

menuComponent()
