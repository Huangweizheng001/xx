!function(t){var e={};function o(n){if(e[n])return e[n].exports;var i=e[n]={i:n,l:!1,exports:{}};return t[n].call(i.exports,i,i.exports,o),i.l=!0,i.exports}o.m=t,o.c=e,o.d=function(t,e,n){o.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:n})},o.r=function(t){Object.defineProperty(t,"__esModule",{value:!0})},o.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="",o(o.s=19)}({106:function(t,e){},116:function(t,e){},19:function(t,e,o){"use strict";o(116),o(106);var n=$(void 0).getUrlParam("bookId");new Vue({el:"#bookDetils",data:{beginTime:"",title:"",content:"",activityTypeName:"",data:{},bookId:0},filters:{addRootFile:function(t){return SERVERROOTFILE+t},gotoMiddle:function(t){return"miframe.html?bookId="+t},gotoDetail:function(t){return"bookdetails.html?bookId="+t}},computed:{},mounted:function(){},created:function(){this.$nextTick(function(){this.qreyetails(),this.bookId=n})},methods:{qreyetails:function(){var t=this;this.$http.post(SERVERROOTDATA+"website/ashx/site/Book.ashx?action=getBookDetailById",{bookId:n},{emulateJSON:!0}).then(function(e){t.data=e.body.rows})},back:function(){this.$router.go(-1)}}})}});