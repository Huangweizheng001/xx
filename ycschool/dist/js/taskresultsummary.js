!function(t){var e={};function r(o){if(e[o])return e[o].exports;var n=e[o]={i:o,l:!1,exports:{}};return t[o].call(n.exports,n,n.exports,r),n.l=!0,n.exports}r.m=t,r.c=e,r.d=function(t,e,o){r.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:o})},r.r=function(t){Object.defineProperty(t,"__esModule",{value:!0})},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=4)}({132:function(t,e){},4:function(t,e,r){"use strict";r(132),function(){var t=$(this).getUrlParam("paperId");new Vue({el:"#resultsummary",data:{questionList:[],taskName:"",sumValue:""},filters:{addRootFile:function(t){return SERVERROOTFILE+"uploads/image/"+t},getColor:function(t,e){return e>3?"subjectiveColor":1==t?"rightColor":"errorColor"}},mounted:function(){var t=this;this.$nextTick(function(){t.getResultSummary()})},methods:{getResultSummary:function(){var e=this,r=layer.load(1,{shade:[.1,"#fff"]});this.$http.post(SERVERROOTDATA+"api/student/site/Paper.ashx?action=GetPaperResultSummary",{paperId:t},{emulateJSON:!0}).then(function(t){layer.close(r),200==t.body.code&&(e.questionList=t.body.rows.typeQuestionResult,e.taskName=t.body.rows.paperTitle,e.sumValue=t.body.rows.sumValue)}).then(function(){$(".feresultsummary").on("click",".feoperation a",function(){window.location.href="taskresultdetail.html?paperId="+t})})}}})}()}});