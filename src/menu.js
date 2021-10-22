import burgerComponent from './burger-component'
import menuComponent from './menu-component'
// import dateComponent from './date-component'
export default function menu() {
  console.log("button Clicked");

  const menuOuterEl = document.getElementById("menu-outer")
  menuOuterEl.classList.toggle("menu-hidden")
  menuOuterEl.classList.toggle("menu-show")


  burgerMenu.classList.add("burger-menu-hidden")
  burgerMenu.classList.toggle("burger-menu-show")
  setTimeout(function() {
    burgerMenu.classList.toggle("burger-menu-hidden")
  },1000)
}

const menuBtnEl = document.getElementById("menu-btn")
menuBtnEl.onclick = menu
const burgerMenu = document.querySelector("burger-component")
burgerMenu.onclick = menu
