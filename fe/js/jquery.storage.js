"use strict";var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};!function(e){"function"==typeof define&&define.amd?define(["jquery"],e):e("object"===("undefined"==typeof exports?"undefined":_typeof(exports))?require("jquery"):jQuery)}(function(e){function o(e){return p.raw?e:encodeURIComponent(e)}function t(e){return p.raw?e:decodeURIComponent(e)}function i(e){return o(p.json?JSON.stringify(e):String(e))}function n(e){0===e.indexOf('"')&&(e=e.slice(1,-1).replace(/\\"/g,'"').replace(/\\\\/g,"\\"));try{return e=decodeURIComponent(e.replace(r," ")),p.json?JSON.parse(e):e}catch(e){}}function s(o,t){var i=p.raw?o:n(o);return e.isFunction(t)?t(i):i}var r=/\+/g,p=e.cookie=function(n,r,u){if(void 0!==r&&!e.isFunction(r)){if("number"==typeof(u=e.extend({},p.defaults,u)).expires){var a=u.expires,c=u.expires=new Date;c.setTime(+c+864e5*a)}return document.cookie=[o(n),"=",i(r),u.expires?"; expires="+u.expires.toUTCString():"",u.path?"; path="+u.path:"",u.domain?"; domain="+u.domain:"",u.secure?"; secure":""].join("")}for(var f=n?void 0:{},y=document.cookie?document.cookie.split("; "):[],l=0,d=y.length;l<d;l++){var h=y[l].split("="),m=t(h.shift()),g=h.join("=");if(n&&n===m){f=s(g,r);break}n||void 0===(g=s(g))||(f[m]=g)}return f};p.defaults={},e.removeCookie=function(o,t){return void 0!==e.cookie(o)&&(e.cookie(o,"",e.extend({},t,{expires:-1})),!e.cookie(o))}}),function(e,o,t,i){var n=function(o){this.defaluts={key:void 0,value:void 0,expires:15},this.options=e.extend({},this.defaults,o)};n.prototype={suportType:function(){return!!(o.Storage&&o.localStorage&&o.localStorage instanceof Storage)},addStorage:function(){-1==this.options.expires||"-1"==this.options.expires?this.suportType()?0==this.options.expires||"0"==this.options.expires?sessionStorage.setItem(this.options.key,this.options.value):localStorage.setItem(this.options.key,this.options.value):e.cookie(this.options.key,this.options.value):this.suportType()?0==this.options.expires||"0"==this.options.expires?sessionStorage.setItem(this.options.key,this.options.value):e.cookie(this.options.key,this.options.value):e.cookie(this.options.key,this.options.value,{expires:parseInt(this.options.expires)})},readStorage:function(){return void 0==localStorage.getItem(this.options.key)||null==localStorage.getItem(this.options.key)?void 0==sessionStorage.getItem(this.options.key)||null==sessionStorage.getItem(this.options.key)?void 0==sessionStorage.getItem(this.options.key)||null==sessionStorage.getItem(this.options.key)?void 0:e.cookie(this.options.key):sessionStorage.getItem(this.options.key):localStorage.getItem(this.options.key)},removeStorage:function(){localStorage.removeItem(this.options.key),sessionStorage.removeItem(this.options.key),e.removeCookie(this.options.key)}},e.fn.storager=function(e){return new n(e)}}(jQuery,window,document);