!function(){var t=document.querySelector("[data-start]"),e=document.querySelector("[data-stop]"),o=document.querySelector("body"),n=(document.querySelector("button"),null),r=!1;t.addEventListener("click",(function(){if(r)return;r=!0,(n=setInterval((function(){o.style.background="#".concat(Math.floor(16777215*Math.random()).toString(16)),console.log("Switch color",n)}),1e3))&&t.toggleAttribute("disabled")})),e.addEventListener("click",(function(){clearInterval(n),console.log("Stop switch color",n),r=!1,t.hasAttribute("disabled")&&t.removeAttribute("disabled")}))}();
//# sourceMappingURL=01-color-switcher.5730d3af.js.map
