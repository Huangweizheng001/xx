!function(t){var e={};function a(i){if(e[i])return e[i].exports;var s=e[i]={i:i,l:!1,exports:{}};return t[i].call(s.exports,s,s.exports,a),s.l=!0,s.exports}a.m=t,a.c=e,a.d=function(t,e,i){a.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:i})},a.r=function(t){Object.defineProperty(t,"__esModule",{value:!0})},a.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return a.d(e,"a",e),e},a.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},a.p="",a(a.s=14)}({14:function(t,e,a){"use strict";a(96);var i;"3"!=(i=$(window).storager({key:"uType"}).readStorage())&&3!=i||(window.location.href="teachercenter.html"),new Vue({el:"#jStudentcenterApp",data:{getRouter:"study.html",userData:[],studyArr:[],studyFlag:!0,checkWorkFlag:!1,evaTeachingFlag:!1,homeSchoolFlag:!1,activeFlag:!1,answerFlag:!1,applicationFlag:!1},filters:{addRootFile:function(t){return SERVERROOTFILE+t}},mounted:function(){this.$nextTick(function(){this.setRouter(),this.getUserData()})},methods:{getUserData:function(){var t=this;this.$http.post(SERVERROOTDATA+"api/student/site/Student.ashx?action=getStudentInfo",{},{emulateJSON:!0}).then(function(e){200==e.body.code&&(t.userData=e.body.rows)}),this.$http.post(SERVERROOTDATA+"api/student/site/Student.ashx?action=getStudentStudy",{},{emulateJSON:!0}).then(function(e){200==e.body.code&&(t.studyArr=e.body.rows)})},setRouter:function(t){if(this.getRouter=t||getAchors(),this.getRouter&&void 0!=this.getRouter&&""!=this.getRouter&&"#study"!=this.getRouter)if("#checkWork"==this.getRouter)this.getRouter="checkWork.html",this.studyFlag=!1,this.checkWorkFlag=!0,this.evaTeachingFlag=!1,this.homeSchoolFlag=!1,this.activeFlag=!1,this.answerFlag=!1,this.applicationFlag=!1;else if("#evaTeaching"==this.getRouter)this.getRouter="evateaching.html",this.studyFlag=!1,this.checkWorkFlag=!1,this.evaTeachingFlag=!0,this.homeSchoolFlag=!1,this.activeFlag=!1,this.answerFlag=!1,this.applicationFlag=!1;else if("#homeSchool"==this.getRouter)this.getRouter="homeschool.html",this.studyFlag=!1,this.checkWorkFlag=!1,this.evaTeachingFlag=!1,this.homeSchoolFlag=!0,this.activeFlag=!1,this.answerFlag=!1,this.applicationFlag=!1;else if("#active"==this.getRouter)this.getRouter="activity.html",this.studyFlag=!1,this.checkWorkFlag=!1,this.evaTeachingFlag=!1,this.homeSchoolFlag=!1,this.activeFlag=!0,this.answerFlag=!1,this.applicationFlag=!1;else if("#answer"==this.getRouter){var e=$(this).getUrlParam("type");void 0!=e&&""!=e&&"undefined"!=e||(e=0),this.getRouter="answer.html?type="+e,this.studyFlag=!1,this.checkWorkFlag=!1,this.evaTeachingFlag=!1,this.homeSchoolFlag=!1,this.activeFlag=!1,this.answerFlag=!0,this.applicationFlag=!1}else"#application"==this.getRouter&&(this.getRouter="application.html",this.studyFlag=!1,this.checkWorkFlag=!1,this.evaTeachingFlag=!1,this.homeSchoolFlag=!1,this.activeFlag=!1,this.answerFlag=!1,this.applicationFlag=!0);else this.getRouter="study.html",this.studyFlag=!0,this.checkWorkFlag=!1,this.evaTeachingFlag=!1,this.homeSchoolFlag=!1,this.activeFlag=!1,this.answerFlag=!1,this.applicationFlag=!1;this.changeSrc(this.getRouter)},changeSrc:function(t){$("#jStudentIframe").attr("src",t),setTimeout(function(){setIframeHeight($("#jStudentIframe")[0])},300)},openInf:function(){layer.open({type:2,title:"个人信息",shadeClose:!0,shade:.5,area:["850px","380px"],content:"./studentinf.html"})},modifyPwd:function(){layer.open({type:2,title:"修改密码",shadeClose:!0,shade:.5,area:["650px","390px"],content:"./modifypwd.html"})}}})},96:function(t,e){}});