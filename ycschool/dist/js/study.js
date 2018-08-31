!function(t){var e={};function s(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,s),o.l=!0,o.exports}s.m=t,s.c=e,s.d=function(t,e,r){s.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:r})},s.r=function(t){Object.defineProperty(t,"__esModule",{value:!0})},s.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="",s(s.s=13)}({13:function(t,e,s){"use strict";s(94),checkInIframe()||(window.location.href="./studentcenter.html");new Vue({el:"#jstudyApp",data:{courseFlag:!0,timeTableFlag:!1,scoreFlag:!1,taskFlag:!1,courseList:[],subjectArr:[],current:1,allpage:0,showItem:3,currentIndex:1,courseSchedule:[],scoreArr:[],currentScore:1,allpageScore:0,showItemScore:3,subjectId:"",taskArr:[],taskSubjectArr:[],currentTask:1,allpageTask:0,hsubjectId:"",upTime:3,states:2},filters:{addRootFile:function(t){return SERVERROOTFILE+t},gotoPlayer:function(t,e,s){return"player.html?cid="+t+"&vid="+e+"&time="+s},answerQuestion:function(t){return"workdetail.html?paperId="+t},review:function(t){return"taskresultsummary.html?paperId="+t},getState:function(t){return 0==t?"未完成":"已完成"}},computed:{pages:function(){var t=[];if(this.current<this.showItem)for(var e=Math.min(this.showItem,this.allpage);e;)t.unshift(e--);else{var s=this.current-Math.floor(this.showItem/2);for(e=this.showItem,s>this.allpage-this.showItem&&(s=this.allpage-this.showItem+1);e--;)t.push(s++)}return t},pageScore:function(){var t=[];if(this.currentScore<this.showItemScore)for(var e=Math.min(this.showItemScore,this.allpageScore);e;)t.unshift(e--);else{var s=this.currentScore-Math.floor(this.showItemScore/2);for(e=this.showItemScore,s>this.allpageScore-this.showItemScore&&(s=this.allpageScore-this.showItemScore+1);e--;)t.push(s++)}return t},pageTask:function(){var t=[];if(this.currentTask<this.showItemScore)for(var e=Math.min(this.showItemScore,this.allpageTask);e;)t.unshift(e--);else{var s=this.currentTask-Math.floor(this.showItemScore/2);for(e=this.showItemScore,s>this.allpageTask-this.showItemScore&&(s=this.allpageTask-this.showItemScore+1);e--;)t.push(s++)}return t}},mounted:function(){this.$nextTick(function(){this.showData()})},methods:{showData:function(){1==this.currentIndex?this.showCourse():2==this.currentIndex?this.showSchedule():3==this.currentIndex?this.showSubject():4==this.currentIndex&&this.bindTaskBtn()},showCourse:function(){var t=this;this.$http.post(SERVERROOTDATA+"api/student/site/Student.ashx?action=getCourseCollection",{pageSize:t.showItem,pageIndex:t.current},{emulateJSON:!0}).then(function(e){200==e.body.code&&(t.courseList=e.body.rows,t.allpage=e.body.totalPageCount)})},showSchedule:function(){var t=this;this.$http.post(SERVERROOTDATA+"api/student/site/Student.ashx?action=showStudentSchedule",{},{emulateJSON:!0}).then(function(e){200==e.body.code&&(t.courseSchedule=e.body.rows)})},showSubject:function(){var t=this;this.$http.post(SERVERROOTDATA+"api/student/site/Student.ashx?action=getSubject",{},{emulateJSON:!0}).then(function(e){200==e.body.code&&(t.subjectArr=e.body.rows)}).then(function(){t.showScore()})},showScore:function(){var t=this;this.$http.post(SERVERROOTDATA+"api/student/site/Student.ashx?action=getStudentScore",{subjectId:t.subjectId,pageSize:t.showItemScore,pageIndex:t.currentScore},{emulateJSON:!0}).then(function(e){200==e.body.code&&(t.scoreArr=e.body.rows,t.allpageScore=e.body.totalPageCount)})},bindTaskBtn:function(){var t=this;this.$http.post(SERVERROOTDATA+"api/student/site/Student.ashx?action=getSubject",{},{emulateJSON:!0}).then(function(e){200==e.body.code&&(t.taskSubjectArr=e.body.rows)}).then(function(){t.showTask()})},showTask:function(){var t=this;this.$http.post(SERVERROOTDATA+"api/student/site/homework.ashx?action=getTeacherSetWork",{subjectId:t.hsubjectId,states:t.states,arrangeTime:t.upTime,pageSize:5,pageIndex:t.currentTask},{emulateJSON:!0}).then(function(e){200==e.body.code&&(t.taskArr=e.body.rows.reverse(),t.allpageTask=e.body.totalPageCount)})},changeShow:function(t){if(1==t){if(this.courseFlag)return!1;this.courseFlag=!0,this.timeTableFlag=!1,this.scoreFlag=!1,this.taskFlag=!1,this.currentIndex=1,this.showData(),this.setParentIframe()}else if(2==t){if(this.timeTableFlag)return!1;this.courseFlag=!1,this.timeTableFlag=!0,this.scoreFlag=!1,this.taskFlag=!1,this.currentIndex=2,this.showData(),this.setParentIframe()}else if(3==t){if(this.scoreFlag)return!1;this.courseFlag=!1,this.timeTableFlag=!1,this.scoreFlag=!0,this.taskFlag=!1,this.currentIndex=3,this.showData(),this.setParentIframe()}else if(4==t){if(this.taskFlag)return!1;this.courseFlag=!1,this.timeTableFlag=!1,this.scoreFlag=!1,this.taskFlag=!0,this.currentIndex=4,this.showData(),this.setParentIframe()}},setParentIframe:function(){setTimeout(function(){window.parent.window.setIframeHeight($("#jStudentIframe")[0])},200)},cancelCollection:function(t,e){var s=this;this.$http.post(SERVERROOTDATA+"api/student/app/Student.ashx?action=saveCollectionCourse",{cancel:1,courseId:e},{emulateJSON:!0}).then(function(e){200==e.body.code&&(s.courseList.splice(s.courseList.indexOf(t),1),layer.msg("取消收藏!"))})},goto:function(t){if(t!=this.current){if(t>this.allpage)return this.current=this.current-2,layer.msg("Sorry ╮(╯_╰)╭ 没有下一页喽！"),!1;this.current=t,this.showData(this.currentIndex)}},gotoScore:function(t){if(t!=this.currentScore){if(t>this.allpageScore)return this.currentScore=this.currentScore-2,layer.msg("Sorry ╮(╯_╰)╭ 没有下一页喽！"),!1;this.currentScore=t,this.showData(this.currentIndex)}},gotoTask:function(t){if(t!=this.currentTask){if(t>this.allpageTask)return this.currentTask=this.currentTask-2,layer.msg("Sorry ╮(╯_╰)╭ 没有下一页喽！"),!1;this.currentTask=t,this.showData(this.currentIndex)}}}})},94:function(t,e){}});