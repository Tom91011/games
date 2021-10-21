export default function menu() {

  const menuOuterEl = document.getElementById("menu-outer")
  menuOuterEl.classList.toggle("menu-hidden")
  menuOuterEl.classList.toggle("menu-show")

  burgerMenu.classList.toggle("burger-menu-hidden")
  setTimeout(function() {
    burgerMenu.classList.toggle("burger-menu-show")
  },900)
}

const menuBtnEl = document.getElementById("menu-btn")
menuBtnEl.onclick = menu
const burgerMenu = document.getElementById("burger-menu")
burgerMenu.onclick = menu

// menu()
