/*! (C) Andrea Giammarchi - @WebReflection - Mit Style License */
var Data=Data||{data:function(t,n){var r,i="data-dom-class-"+String(t).replace(/([a-z])([A-Z])/g,function(e,t,n){return t+"-"+n.toLowerCase()}).toLowerCase();if(arguments.length!==2)return r=this.getAttribute(i),r==null?r:JSON.parse(r);n==null?this.removeAttribute(i):this.setAttribute(i,JSON.stringify(n))}};