import "./scss/main.scss";
import printMe from './modules/nav.js';

 function component() {
   const element = document.createElement('div');

  const btn = document.createElement('button');

   element.innerText = "Hi";

  btn.innerHTML = 'Click me and check the console!';

  btn.onclick = printMe;


  element.appendChild(btn);


   return element;
 }

 document.body.appendChild(component());