const t=document.querySelector("[data-start]"),e=document.querySelector("[data-stop]"),o=document.querySelector("body");document.querySelector("button");let r=null,l=!1;t.addEventListener("click",(function(){if(l)return;l=!0,(r=setInterval((()=>{o.style.background=`#${Math.floor(16777215*Math.random()).toString(16)}`,console.log("Switch color",r)}),1e3))&&t.toggleAttribute("disabled")})),e.addEventListener("click",(function(){clearInterval(r),console.log("Stop switch color",r),l=!1,t.hasAttribute("disabled")&&t.removeAttribute("disabled")}));
//# sourceMappingURL=01-color-switcher.14b6026b.js.map
