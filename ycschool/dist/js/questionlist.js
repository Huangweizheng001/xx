!function(t){var e={};function i(n){if(e[n])return e[n].exports;var s=e[n]={i:n,l:!1,exports:{}};return t[n].call(s.exports,s,s.exports,i),s.l=!0,s.exports}i.m=t,i.c=e,i.d=function(t,e,n){i.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:n})},i.r=function(t){Object.defineProperty(t,"__esModule",{value:!0})},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="",i(i.s=61)}({140:function(t,e){},61:function(t,e,i){"use strict";i(140),new Vue({el:"#questionList",data:{current:1,questionList:[],gradeArr:[],subjectArr:[],ranking:[],hotQuestion:[],gradeId:"",subjectId:"",showItem:6,allpage:0,nodata:!1},filters:{addRootFile:function(t){return SERVERROOTFILE+t},addRoot:function(t){return ROOT+"replydetail.html?questionId="+t}},mounted:function(){var t=this;this.$nextTick(function(){t.getQuestionlist(t.gradeId,t.subjectId,t.current),t.getGrade(),t.getSubject(),t.getRanking(),t.lookPicture()})},computed:{pages:function(){var t=[];if(this.current<this.showItem)for(var e=Math.min(this.showItem,this.allpage);e;)t.unshift(e--);else{var i=this.current-Math.floor(this.showItem/2);e=this.showItem;for(i>this.allpage-this.showItem&&(i=this.allpage-this.showItem+1);e--;)t.push(i++)}return t}},methods:{getQuestionlist:function(t,e,i){var n=this;this.$http.post(SERVERROOTDATA+"website/ashx/site/knowledgePay.ashx?action=getWaitResponseList",{gradeId:t,subjectId:e,key:"",pageIndex:i,pageSize:10},{emulateJSON:!0}).then(function(t){200==t.body.code&&(t.body.rows.length<1?n.nodata=!0:n.nodata=!1,n.questionList=t.body.rows,n.allpage=t.body.totalPageCount)})},lookPicture:function(){$(".feknowledgequestionlist .fecontent").on("click","li h2 img",function(){showPhoto($(this))})},getGrade:function(){var t=this;this.$http.post(SERVERROOTDATA+"website/ashx/site/Subject.ashx?action=getGrade",{pageIndex:1,pageSize:999},{emulateJSON:!0}).then(function(e){200==e.body.code&&(t.gradeArr=e.body.rows)})},getSubject:function(){var t=this;this.$http.post(SERVERROOTDATA+"website/ashx/site/Subject.ashx?action=getSubject",{pageIndex:1,pageSize:999},{emulateJSON:!0}).then(function(e){200==e.body.code&&(t.subjectArr=e.body.rows)})},clickByGrade:function(t,e){this.gradeId=t,this.current=1,$(e.target).siblings().removeClass("active"),$(e.target).addClass("active"),this.getQuestionlist(this.gradeId,this.subjectId,this.current)},clickBySubject:function(t,e){this.subjectId=t,this.current=1,$(e.target).siblings().removeClass("active"),$(e.target).addClass("active"),this.getQuestionlist(this.gradeId,this.subjectId,this.current)},getRanking:function(){var t=this;this.$http.post(SERVERROOTDATA+"website/ashx/site/knowledgePay.ashx?action=getTopQAList",{},{emulateJSON:!0}).then(function(e){200==e.body.code&&(t.ranking=e.body.rows)}).then(function(){t.ranking.forEach(function(t,e){Vue.set(t,"iconPath",SERVERROOTFILE+t.iconPath)})})},goto:function(t){if(t!=this.current){if(t>this.allpage)return this.current=this.current-2,layer.msg("Sorry ╮(╯_╰)╭ 没有下一页喽！"),!1;this.current=t,this.getQuestionlist(this.gradeId,this.subjectId,this.current)}}}})}});