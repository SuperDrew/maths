(this.webpackJsonpmathss=this.webpackJsonpmathss||[]).push([[0],{41:function(e,t,a){e.exports=a(53)},46:function(e,t,a){},47:function(e,t,a){},53:function(e,t,a){"use strict";a.r(t);var n,r=a(0),c=a.n(r),o=a(13),l=a.n(o),i=(a(46),a(23)),u=(a(47),a(85)),m=a(54),s=a(82),d=a(83),b=a(84),f=a(86),E=a(37),h=a(88),g=function(e){var t=Object(E.a)(Array(e.max+1).keys()).map((function(e){return{value:e,label:e.toString()}}));return c.a.createElement(c.a.Fragment,null,c.a.createElement(m.a,{id:"discrete-slider-custom",gutterBottom:!0},e.label),c.a.createElement(h.a,{id:e.label,value:e.value,"aria-labelledby":"discrete-slider-custom",step:e.step,valueLabelDisplay:"off",min:0,max:e.max,marks:t,onChange:function(t,a){e.onChange(a)}}))},p=a(76),v=a(87),y=function(e){return c.a.createElement(c.a.Fragment,null,c.a.createElement(p.a,{control:c.a.createElement(v.a,{name:e.name,color:e.color,checked:e.value}),label:e.name,labelPlacement:"start",onChange:function(t,a){return e.onChange(a)}}))},j=a(78),k=a(79),O=a(80),S=a(81),w=a(77),A=Object(w.a)((function(){return{table:{tableLayout:"fixed"}}})),x=function(e){var t=A();return c.a.createElement(c.a.Fragment,null,c.a.createElement(m.a,{variant:"h4",gutterBottom:!0,align:"center"},e.label),c.a.createElement(j.a,{className:t.table},c.a.createElement(k.a,null,e.rows.map((function(e){return c.a.createElement(O.a,{key:e.key},c.a.createElement(S.a,{align:"center"},e.sums[0]),c.a.createElement(S.a,{align:"center"},e.sums[1]),c.a.createElement(S.a,{align:"center"},e.sums[2]))})))))},B=a(57),C=a(55);!function(e){e.Addition="+",e.Subtraction="-"}(n||(n={}));var N=function(e,t){return Math.round(Math.random()*(t-e)+e)},M=function(e){var t=N(e.min,e.numberBond),a=[];e.useAddition&&a.push(n.Addition),e.useSubtraction&&a.push(n.Subtraction);var r=function(e){return e[Math.floor(Math.random()*e.length)]}(a);return{a:t,operation:r,b:r===n.Addition?N(e.min,e.numberBond-t):N(0,t),x:"___"}},W=function(e){var t=M(e),a=t.a,n=t.operation,r=t.b,c=t.x;return"".concat(a," ").concat(n," ").concat(r," = ").concat(c)},F=function(e){return[W(e),W(e),W(e)]},_=function(e,t){return{key:t,sums:F(e)}},I=function(e,t){if(!e.useSubtraction&&!e.useAddition)return[];for(var a=[],n=0;n<t;n++)a.push(_(e,n));return a},J=Object(B.a)({"@global":{"html, body":{backgroundColor:"#f5f5f5"}}})((function(){return null})),L=Object(C.a)((function(){return{control:{padding:10}}}));var D=function(){var e=L(),t=Object(r.useState)(10),a=Object(i.a)(t,2),n=a[0],o=a[1],l=Object(r.useState)(!0),E=Object(i.a)(l,2),h=E[0],p=E[1],v=Object(r.useState)(!0),j=Object(i.a)(v,2),k=j[0],O=j[1],S=Object(r.useState)(I({min:0,numberBond:n,useAddition:h,useSubtraction:k},10)),w=Object(i.a)(S,2),A=w[0],B=w[1];return Object(r.useEffect)((function(){B(I({min:0,numberBond:n,useAddition:h,useSubtraction:k},10))}),[0,n,h,k]),c.a.createElement("div",{className:"App"},c.a.createElement(J,null),c.a.createElement("header",{className:"App-header","data-testid":"header"},c.a.createElement(m.a,{variant:"h1",align:"center"},"Maths")),c.a.createElement(s.a,{maxWidth:"sm"},c.a.createElement(d.a,{container:!0,spacing:2},c.a.createElement(d.a,{item:!0,xs:12},c.a.createElement(b.a,{className:e.control},c.a.createElement(d.a,{item:!0},c.a.createElement(g,{label:"Number Bonds",max:10,value:n,step:1,onChange:function(e){o(e)}})))),c.a.createElement(d.a,{container:!0,direction:"row",justify:"center",spacing:2},c.a.createElement(d.a,{item:!0},c.a.createElement(b.a,{className:e.control},c.a.createElement(y,{name:"addition",color:"primary",value:h,onChange:function(e){p(e)}}))),c.a.createElement(d.a,{item:!0},c.a.createElement(b.a,{className:e.control},c.a.createElement(y,{name:"subtraction",color:"primary",value:k,onChange:function(e){O(e)}})))),c.a.createElement(d.a,{item:!0}),c.a.createElement(d.a,{container:!0,direction:"row",justify:"center",spacing:2},c.a.createElement(d.a,{item:!0},c.a.createElement(u.a,{variant:"contained",color:"primary",endIcon:c.a.createElement(f.a,null,"send"),onClick:function(){B(I({min:0,numberBond:n,useAddition:h,useSubtraction:k},10))}},"Generate maths fun!"))),c.a.createElement(d.a,{item:!0},c.a.createElement(b.a,null,c.a.createElement(x,{label:"Worksheet",rows:A}))))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a(52);l.a.render(c.a.createElement(c.a.StrictMode,null,c.a.createElement(D,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[41,1,2]]]);
//# sourceMappingURL=main.feddea5a.chunk.js.map