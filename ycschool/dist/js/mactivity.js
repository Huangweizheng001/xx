!function(t){var i={};function e(n){if(i[n])return i[n].exports;var r=i[n]={i:n,l:!1,exports:{}};return t[n].call(r.exports,r,r.exports,e),r.l=!0,r.exports}e.m=t,e.c=i,e.d=function(t,i,n){e.o(t,i)||Object.defineProperty(t,i,{configurable:!1,enumerable:!0,get:n})},e.r=function(t){Object.defineProperty(t,"__esModule",{value:!0})},e.n=function(t){var i=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(i,"a",i),i},e.o=function(t,i){return Object.prototype.hasOwnProperty.call(t,i)},e.p="",e(e.s=0)}({0:function(t,i,e){"use strict";e(74);var n=$(void 0).getUrlParam("activityId");new Vue({el:"#jmactivityApp",data:{activityArr:[]},mounted:function(){this.$nextTick(function(){this.queryDetail(),this.studyActivityFinish()})},methods:{queryDetail:function(){var t=this;this.$http.post(SERVERROOTDATA+"website/ashx/site/Activity.ashx?action=getStudyActivityDetail",{activityId:n},{emulateJSON:!0}).then(function(i){t.activityArr=i.body.currentActivity})},studyActivityFinish:function(){this.$http.post(SERVERROOTDATA+"/website/ashx/site/Activity.ashx?action=studyActivityFinish",{activityId:n},{emulateJSON:!0})}}})},74:function(t,i){}});