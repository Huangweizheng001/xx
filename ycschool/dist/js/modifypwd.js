!function(e){var s={};function t(i){if(s[i])return s[i].exports;var d=s[i]={i:i,l:!1,exports:{}};return e[i].call(d.exports,d,d.exports,t),d.l=!0,d.exports}t.m=e,t.c=s,t.d=function(e,s,i){t.o(e,s)||Object.defineProperty(e,s,{configurable:!1,enumerable:!0,get:i})},t.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},t.n=function(e){var s=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(s,"a",s),s},t.o=function(e,s){return Object.prototype.hasOwnProperty.call(e,s)},t.p="",t(t.s=8)}({8:function(e,s,t){"use strict";t(86);new Vue({el:"#jmodifyPwdApp",data:{oldPwd:"",newPwd:"",surePwd:"",oldPwdTips:"原始密码不能为空!",newPwdTips:"新密码不能为空!",surePwdTips:"两次密码不一致!",oldPwdTipsFlag:!1,newPwdTipsFlag:!1,surePwdTipsFlag:!1},filters:{addRootFile:function(e){return SERVERROOTFILE+e}},watch:{oldPwd:function(e){""!=e&&(this.oldPwdTipsFlag=!1)},newPwd:function(e){""!=e&&(this.newPwdTipsFlag=!1)},surePwd:function(e){""!=e&&(this.surePwdTipsFlag=!1)}},mounted:function(){this.$nextTick(function(){})},methods:{subModifyPwd:function(){var e=new RegExp(/^\w{6,20}$/);if(!this.emptyCheck())return!1;if(!e.test(this.newPwd))return this.newPwdTipsFlag=!0,this.newPwdTips="密码格式错误!",!1;if(this.surePwd!=this.newPwd)return this.surePwdTipsFlag=!0,this.surePwdTips="两次密码不一致!",!1;var s=this;"teacher"==$(this).getUrlParam("type")?this.$http.post(SERVERROOTDATA+"api/teacher/site/login.ashx?action=updatePassword",{oldPassword:s.oldPwd,newPassword:s.newPwd},{emulateJSON:!0}).then(function(e){200!=e.body.code?(this.oldPwdTipsFlag=!0,this.oldPwdTips=e.body.message):(layer.msg(e.body.message),setTimeout(function(){s.closeLayer()},600))}):this.$http.post(SERVERROOTDATA+"api/student/site/Student.ashx?action=resetPassword",{oldPassword:s.oldPwd,newPassword:s.newPwd},{emulateJSON:!0}).then(function(e){200!=e.body.code?(this.oldPwdTipsFlag=!0,this.oldPwdTips=e.body.message):(layer.msg(e.body.message),setTimeout(function(){s.closeLayer()},600))})},keyboardSub:function(e){13==e.keyCode&&this.subModifyPwd()},closeLayer:function(){var e=parent.layer.getFrameIndex(window.name);parent.layer.close(e)},emptyCheck:function(){return""==this.oldPwd?(this.oldPwdTipsFlag=!0,this.newPwdTipsFlag=!1,this.surePwdTipsFlag=!1,this.oldPwdTips="原始密码不能为空!",!1):""==this.newPwd?(this.oldPwdTipsFlag=!1,this.newPwdTipsFlag=!0,this.surePwdTipsFlag=!1,this.newPwdTips="新密码不能为空!",!1):""==this.surePwd?(this.oldPwdTipsFlag=!1,this.newPwdTipsFlag=!1,this.surePwdTipsFlag=!0,this.surePwdTips="两次密码不一致!",!1):(this.accountTipsFlag=!1,this.passwordTipsFlag=!1,this.surePwdTipsFlag=!1,!0)}}})},86:function(e,s){}});