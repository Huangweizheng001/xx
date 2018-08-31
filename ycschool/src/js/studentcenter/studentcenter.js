require("../../css/studentcenter/studentcenter.less");

var studentcenterApp = function() {
    var userType=$(window).storager({key: 'uType'}).readStorage();
    if(userType=='3'||userType==3){
        window.location.href='teachercenter.html';
    }
    new Vue({
        el: "#jStudentcenterApp",
        data: {
        	getRouter:'study.html',
        	userData:[],
        	studyArr:[],
        	studyFlag:true,
        	checkWorkFlag:false,
        	evaTeachingFlag:false,
        	homeSchoolFlag:false,
        	activeFlag:false,
            answerFlag:false,
            applicationFlag:false,
            
        },
        filters: {
            addRootFile: function(img) {
                return SERVERROOTFILE + img;
            }
        },
        mounted: function mounted() {
            this.$nextTick(function() {
                this.setRouter();
                this.getUserData();
            });
        },
        methods: {
        	getUserData(){
        		var _this = this;
        		this.$http.post(SERVERROOTDATA+"api/student/site/Student.ashx?action=getStudentInfo", {}, {
					emulateJSON: true
				}).then(function(res) {
					if(res.body.code == 200){
						_this.userData = res.body.rows;
					}
				});
        		this.$http.post(SERVERROOTDATA+"api/student/site/Student.ashx?action=getStudentStudy", {}, {
					emulateJSON: true
				}).then(function(res) {
					if(res.body.code == 200){
						_this.studyArr = res.body.rows;
					}
				});
        	},
        	setRouter(achor){
                if(achor){
                    this.getRouter = achor;
                }else{
                    this.getRouter = getAchors();
                }
        		
	        	if (!this.getRouter || this.getRouter == undefined || this.getRouter == "" || this.getRouter == "#study") {
	        	    this.getRouter = "study.html";
	        	    this.studyFlag=true;
	            	this.checkWorkFlag=false;
	            	this.evaTeachingFlag=false;
	            	this.homeSchoolFlag=false;
	            	this.activeFlag=false;
	            	this.answerFlag=false;
	            	this.applicationFlag=false;
	        	} else if (this.getRouter == "#checkWork") {
	        	    this.getRouter = "checkWork.html";
	        	    this.studyFlag=false;
	            	this.checkWorkFlag=true;
	            	this.evaTeachingFlag=false;
	            	this.homeSchoolFlag=false;
	            	this.activeFlag=false;
                    this.answerFlag=false;
                    this.applicationFlag=false;
	        	} else if (this.getRouter == "#evaTeaching") {
	        	    this.getRouter = "evateaching.html";
	        	    this.studyFlag=false;
	            	this.checkWorkFlag=false;
	            	this.evaTeachingFlag=true;
	            	this.homeSchoolFlag=false;
	            	this.activeFlag=false;
                    this.answerFlag=false;
                    this.applicationFlag=false;
	        	} else if (this.getRouter == "#homeSchool") {
	        	    this.getRouter = "homeschool.html";
	        	    this.studyFlag=false;
	            	this.checkWorkFlag=false;
	            	this.evaTeachingFlag=false;
	            	this.homeSchoolFlag=true;
	            	this.activeFlag=false;
                    this.answerFlag=false;
                    this.applicationFlag=false;
	        	} else if (this.getRouter == "#active") {
	        	    this.getRouter = "activity.html";
	        	    this.studyFlag=false;
	            	this.checkWorkFlag=false;
	            	this.evaTeachingFlag=false;
	            	this.homeSchoolFlag=false;
	            	this.activeFlag=true;
                    this.answerFlag=false;
                    this.applicationFlag=false;
	        	} else if (this.getRouter == "#answer") {
                    var type=$(this).getUrlParam("type");
                    if(type==undefined||type==''||type=='undefined'){
                        type=0
					}
                    this.getRouter = "answer.html?type=" + type;
                    this.studyFlag=false;
                    this.checkWorkFlag=false;
                    this.evaTeachingFlag=false;
                    this.homeSchoolFlag=false;
                    this.activeFlag=false;
                    this.answerFlag=true;
                    this.applicationFlag=false;
				} else if (this.getRouter == "#application") {
	        	    this.getRouter = "application.html";
	        	    this.studyFlag=false;
	            	this.checkWorkFlag=false;
	            	this.evaTeachingFlag=false;
	            	this.homeSchoolFlag=false;
	            	this.activeFlag=false;
                    this.answerFlag=false;
                    this.applicationFlag=true;
	        	}
	        	this.changeSrc(this.getRouter);
        	},
            changeSrc(routerSrc) {
                var _this = this;
                $("#jStudentIframe").attr("src", routerSrc);
                setTimeout(function() {
                    setIframeHeight($("#jStudentIframe")[0]);
                }, 300);
            },
            openInf(){
            	layer.open({
            		  type: 2,
            		  title: '个人信息',
            		  shadeClose: true,
            		  shade: 0.5,
            		  area: ['850px', '380px'],
            		  content: "./studentinf.html"
            		}); 
            },
            modifyPwd(){
            	layer.open({
          		  type: 2,
          		  title: '修改密码',
          		  shadeClose: true,
          		  shade: 0.5,
          		  area: ['650px', '390px'],
          		  content: "./modifypwd.html" 
          		}); 
            }
        }
    });
}

studentcenterApp();