import"./assets/styles-CMGI31Y4.js";document.querySelector(".form").addEventListener("submit",function(s){s.preventDefault();const i=new FormData(s.target),t=parseInt(i.get("delay"),10),o=i.get("state");new Promise((e,r)=>{setTimeout(()=>{o==="fulfilled"?e(t):r(t)},t)}).then(e=>{iziToast.success({title:"Success",message:`✅ Fulfilled promise in ${e}ms`,position:"topRight"})}).catch(e=>{iziToast.error({title:"Error",message:`❌ Rejected promise in ${e}ms`,position:"topRight"})})});
//# sourceMappingURL=page-3.js.map