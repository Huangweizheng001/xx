!function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:r})},n.r=function(t){Object.defineProperty(t,"__esModule",{value:!0})},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=34)}({132:function(t,e){},34:function(t,e,n){"use strict";n(132),checkInIframe()||(window.location.href="./teachercenter.html"),new Vue({el:"#teacherCenterAnswer",data:{list:[],showItem:4,allpage:0,current:1,nodata:!1},filters:{addRootFile:function(t){return SERVERROOTFILE+t}},computed:{pages:function(){var t=[];if(this.current<this.showItem)for(var e=Math.min(this.showItem,this.allpage);e;)t.unshift(e--);else{var n=this.current-Math.floor(this.showItem/2);e=this.showItem;for(n>this.allpage-this.showItem&&(n=this.allpage-this.showItem+1);e--;)t.push(n++)}return t}},mounted:function(){var t=this;this.$nextTick(function(){t.getList(1)})},methods:{getList:function(t){var e=this;this.$http.post(SERVERROOTDATA+"api/knowledge/site/knowledgePay.ashx?action=getKPAskMeList",{pageIndex:t,pageSize:6},{emulateJSON:!0}).then(function(t){200==t.body.code&&(t.body.rows.length<1?e.nodata=!0:(e.nodata=!1,e.list=t.body.rows.reverse()),e.allpage=t.body.totalPageCount)}).then(function(){e.list.forEach(function(t,e){Vue.set(t,"headIconPath",SERVERROOTFILE+t.headIconPath)}),$(window.parent.document).find("#jTeacherIframe").css("height",$(".teacherCenterAnswer").height()+135+"px")})},answer:function(t){window.open("replydetail.html?questionId="+t)},goto:function(t){if(t!=this.current){if(t>this.allpage)return this.current=this.current-2,layer.msg("Sorry ╮(╯_╰)╭ 没有下一页喽！"),!1;this.current=t,this.getList(this.current)}}}})}});