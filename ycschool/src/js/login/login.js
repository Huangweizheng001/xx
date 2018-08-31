require("../../css/login/login.less");

var pageType = $(document).getUrlParam("page"); //默认login , page = reg :注册


function loginApp(pageType){
	new Vue({
        el: "#jLoginApp",
        data: {
            currentTypeLabel:"学生",
            currentTypeIndex : 1, //1 学生；2 家长 ；3 教师
            account :"",
            password:"",
            accountTipsFlag:false,
            accountTips:'账号不能为空!',
            passwordTipsFlag:false,
            passwordTips:'密码不能为空!',
            storageType:-1, // -1：长期制  0：回话制  
 
        },
        filters: {},
        watch: {
        	account(value) {
				if("" != value) {
					this.accountTipsFlag = false;
				}
			},
			password(value) {
				if("" != value) {
					this.passwordTipsFlag = false;
				}
			},
		},
        mounted: function mounted() {
            this.$nextTick(function() {
               
            });
        },
        methods: {
        	loginSub(){
        		var _this = this,
        			loginUrl = SERVERROOTDATA;
        		if(!_this.emptyCheck()){
        			return false;
        		}
        		
        		if(_this.currentTypeIndex == 1){
        			loginUrl = loginUrl + "api/student/site/Student.ashx?action=login";
        		}else if(_this.currentTypeIndex == 3){
        			loginUrl = loginUrl + "api/teacher/site/login.ashx?action=login";
        		}
        		
        		this.$http.post(loginUrl, {
        			code:_this.account,
        			password:_this.password
				}, {
					emulateJSON: true
				}).then(function(res) {
					if(res.body.code == 200){
						_this.saveUserInfor(res.body.rows[0])
					}else{
						if(res.body.code == 803){
							_this.accountTipsFlag = true;
							_this.accountTips = res.body.message;
						}else if(res.body.code == 804){
							_this.passwordTipsFlag = true;
							_this.passwordTips = res.body.message;
						}
					}
				});
        		
        	},
            changeUserType(index){
            	this.currentTypeIndex = index;
            	if(index == 3){
            		this.currentTypeLabel = "教师";
            	} else{
            		this.currentTypeLabel = "学生";
            	}
            },
          //keyboard submit
			keyboardSub: function keyboardSub(ev) {
				if(13 == ev.keyCode) {
					//submit before check
					if(this.emptyCheck()){
						this.loginSub();
					}
				}
			},
			//empty check
			emptyCheck: function emptyCheck() {
				if("" == this.account) {
					this.accountTipsFlag = true;
					this.passwordTipsFlag = false;
					this.accountTips = "请输入账号！";
					return false;
				} else if("" == this.password) {
					this.accountTipsFlag = false;
					this.passwordTipsFlag = true;
					this.passwordTips = "请输入密码！";
					return false;
				} else {
					this.accountTipsFlag = false;
					this.passwordTipsFlag = false;
				}
				return true;
			},
            successTipGoTo() {
				layer.msg('登录成功!');
				this.goPrePage();
			},
            //change storage type
            toggleStorage() {
                if(-1 == this.storageType) {
                    this.storageType = 0;
                } else {
                    this.storageType = -1;
                }
            },
			goPrePage() {
				var prePage = $(window).storager({
					key: 'prePage'
				}).readStorage();
				setTimeout(function() {
					if(undefined == prePage || "undefined" == prePage) {
						window.location.href = "index.html";
					} else {
						window.location.href = prePage;
					}
				}, 300);
			},
          //save user information
			saveUserInfor(obj) {
				//remove
            	$(window).storager({
					key: 'uType'
				}).removeStorage();
            	$(window).storager({
					key: 'uId'
				}).removeStorage();
            	$(window).storager({
					key: 'uName'
				}).removeStorage();
            	$(window).storager({
					key: 'uNickName'
				}).removeStorage();
            	$(window).storager({
					key: 'uIcon'
				}).removeStorage();
            	$(window).storager({
					key: 'ycToken'
				}).removeStorage();
            	
            	if(this.currentTypeIndex == 1){
            		//save
                	$(window).storager({ //UNickName
    					key: 'uType',
    					value: this.currentTypeIndex,
    					expires: this.storageType
    				}).addStorage();
                	$(window).storager({ //UNickName
    					key: 'uId',
    					value: obj.studentId,
    					expires: this.storageType
    				}).addStorage();
                	$(window).storager({ //UNickName
    					key: 'uName',
    					value: obj.studentName,
    					expires: this.storageType
    				}).addStorage();
                	$(window).storager({ //UNickName
    					key: 'uNickName',
    					value: obj.nickName,
    					expires: this.storageType
    				}).addStorage();
                	$(window).storager({ //UNickName
    					key: 'uIcon',
    					value: obj.iconPath,
    					expires: this.storageType
    				}).addStorage();
                	$(window).storager({ //UNickName
    					key: 'ycToken',
    					value: obj.ycToken,
    					expires: this.storageType
    				}).addStorage();
            	} else if(this.currentTypeIndex == 3){
            		//save
                	$(window).storager({ //UNickName
    					key: 'uType',
    					value: this.currentTypeIndex,
    					expires: this.storageType
    				}).addStorage();
                	$(window).storager({ //UNickName
    					key: 'uId',
    					value: obj.teacherId,
    					expires: this.storageType
    				}).addStorage();
                	$(window).storager({ //UNickName
    					key: 'uName',
    					value: obj.teacherName,
    					expires: this.storageType
    				}).addStorage();
                	$(window).storager({ //UNickName
    					key: 'uNickName',
    					value: obj.nickName,
    					expires: this.storageType
    				}).addStorage();
                	$(window).storager({ //UNickName
    					key: 'uIcon',
    					value: obj.iconPath,
    					expires: this.storageType
    				}).addStorage();
                	$(window).storager({ //UNickName
    					key: 'ycToken',
    					value: obj.ycToken,
    					expires: this.storageType
    				}).addStorage();
            	}
            	
            	this.successTipGoTo();
			},
        }
    });
}

if(pageType != "reg"){
	pageType = 0;
}
loginApp(pageType);

