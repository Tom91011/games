import burgerComponent from './burger-component'
import menuComponent from './menu-component'

export default function menu() {

  // toggles classes wchih initiates animation effects on the menu
  const menuOuterEl = document.getElementById("menu-outer")
  menuOuterEl.classList.toggle("menu-hidden")
  menuOuterEl.classList.toggle("menu-show")

  const menuOptionsEl = document.querySelector(".menu-options")
  menuOptionsEl.classList.toggle("menu-in")
  menuBtnEl.classList.toggle("menu-btn-in")
  menuBtnEl.classList.toggle("menu-btn-out")



    // changes the close button text and arrow direction
  const menuBtnIconEl = document.querySelector("button i")
  menuBtnIconEl.classList.toggle("fa-caret-left")
  menuBtnIconEl.classList.toggle("fa-caret-right")

  menuOut = !menuOut
  const  menuBtnCloseEl = document.querySelector("button h3")
    if(menuOut) {
      menuBtnCloseEl.innerHTML = "CLOSE"
    } else {
      menuBtnCloseEl.innerHTML = ""
    }
}

let menuOut = true
const menuBtnEl = document.getElementById("menu-btn")
menuBtnEl.onclick = menu
const burgerMenu = document.querySelector("burger-component")
burgerMenu.onclick = menu
