require("../../css/studentcenter/modifypwd.less");

var modifyPwd = function() {
    new Vue({
        el: "#jmodifyPwdApp",
        data: {
        	oldPwd:'',
        	newPwd:'',
        	surePwd:'',
            oldPwdTips:'原始密码不能为空!',
            newPwdTips:'新密码不能为空!',
            surePwdTips:'两次密码不一致!',
            oldPwdTipsFlag:false,
            newPwdTipsFlag:false,
            surePwdTipsFlag:false,
            
        },
        filters: {
            addRootFile: function(img) {
                return SERVERROOTFILE + img;
            }
        },
        watch: {
        	oldPwd(value) {
				if("" != value) {
					this.oldPwdTipsFlag = false;
				}
			},
			newPwd(value) {
				if("" != value) {
					this.newPwdTipsFlag = false;
				}
			},
			surePwd(value) {
				if("" != value) {
					this.surePwdTipsFlag = false;
				}
			},
		},
        mounted: function mounted() {
            this.$nextTick(function() {
                
            });
        },
        methods: {
            subModifyPwd: function(){
            	var rule =new RegExp(/^\w{6,20}$/);
            	if(!this.emptyCheck()){
					return false;
				}
            	if(!(rule.test(this.newPwd))){
            		this.newPwdTipsFlag = true;
            		this.newPwdTips='密码格式错误!';
            		return false;
            	}
            	if(this.surePwd != this.newPwd){
            		this.surePwdTipsFlag = true;
            		this.surePwdTips='两次密码不一致!';
            		return false;
            	}
            	var _this = this;
                var type=$(this).getUrlParam("type");
                if(type=='teacher'){
                    this.$http.post(SERVERROOTDATA+"api/teacher/site/login.ashx?action=updatePassword", {
                        oldPassword:_this.oldPwd,
                        newPassword:_this.newPwd,
                    }, {
                        emulateJSON: true
                    }).then(function(res) {
                        if(res.body.code != 200){
                            this.oldPwdTipsFlag = true;
                            this.oldPwdTips= res.body.message;
                        }else{
                            layer.msg(res.body.message);
                            setTimeout(function(){
                                _this.closeLayer();
                            },600)
                        }
                    });
				}else{
                    this.$http.post(SERVERROOTDATA+"api/student/site/Student.ashx?action=resetPassword", {
                        oldPassword:_this.oldPwd,
                        newPassword:_this.newPwd,
                    }, {
                        emulateJSON: true
                    }).then(function(res) {
                        if(res.body.code != 200){
                            this.oldPwdTipsFlag = true;
                            this.oldPwdTips= res.body.message;
                        }else{
                            layer.msg(res.body.message);
                            setTimeout(function(){
                                _this.closeLayer();
                            },600)
                        }
                    });
				}

            },
            keyboardSub: function keyboardSub(ev) {
				if(13 == ev.keyCode) {
					//submit before check
					this.subModifyPwd();
				}
			},
			closeLayer(){
				var index = parent.layer.getFrameIndex(window.name);
				parent.layer.close(index);
			},
			emptyCheck: function emptyCheck() {
				if("" == this.oldPwd) {
					this.oldPwdTipsFlag = true;
					this.newPwdTipsFlag = false;
					this.surePwdTipsFlag = false;
					this.oldPwdTips = "原始密码不能为空!";
					return false;
				} else if("" == this.newPwd) {
					this.oldPwdTipsFlag = false;
					this.newPwdTipsFlag = true;
					this.surePwdTipsFlag = false;
					this.newPwdTips = "新密码不能为空!";
					return false;
				}else if("" == this.surePwd) {
					this.oldPwdTipsFlag = false;
					this.newPwdTipsFlag = false;
					this.surePwdTipsFlag = true;
					this.surePwdTips = "两次密码不一致!";
					return false;
				} else {
					this.accountTipsFlag = false;
					this.passwordTipsFlag = false;
					this.surePwdTipsFlag = false;
				}
				return true;
			},
        }
    });
}

modifyPwd();