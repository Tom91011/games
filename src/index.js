var _ = require('lodash');

import { wizard } from "./wizard"
import { barbarian } from "./barbarian"
import "./style.scss";
import printMe from './print.js';

console.log("Ran from index.js");
console.log(wizard);
console.log(barbarian);

const obj = { a: "alpha", b: "bravo"}
const newObj = { ...obj, c: "charlie"}
console.log(newObj);

function component() {
    const element = document.createElement('div');
   const btn = document.createElement('button');

   element.innerHTML = _.join(['Hello', 'webpack'], ' ');

   btn.innerHTML = 'Click me and check the console!';
   btn.onclick = printMe;

   element.appendChild(btn);

   return element;
}

document.body.appendChild(component());
