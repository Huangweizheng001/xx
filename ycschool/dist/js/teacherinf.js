!function(t){var e={};function n(o){if(e[o])return e[o].exports;var r=e[o]={i:o,l:!1,exports:{}};return t[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=t,n.c=e,n.d=function(t,e,o){n.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:o})},n.r=function(t){Object.defineProperty(t,"__esModule",{value:!0})},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=31)}({122:function(t,e){},31:function(t,e,n){"use strict";n(122);new Vue({el:"#teacherInfo",data:{userData:[]},filters:{addRootFile:function(t){return SERVERROOTFILE+t}},mounted:function(){this.$nextTick(function(){this.initData()})},methods:{initData:function(){var t=this;this.$http.post(SERVERROOTDATA+"api/teacher/site/common.ashx?action=teacherInfo",{},{emulateJSON:!0}).then(function(e){200==e.body.code&&(t.userData=e.body.rows)})}}})}});