require("../../css/studentcenter/study.less");

if(!checkInIframe()){
	window.location.href ="./studentcenter.html";
}

var studyApp = function() {
    new Vue({
        el: "#jstudyApp",
        data: {
        	courseFlag:true,
        	timeTableFlag:false,
        	scoreFlag:false,
        	taskFlag:false,
        	courseList:[],
        	subjectArr:[],
        	current:1,
            allpage:0,
            showItem: 3,
            currentIndex:1,
            courseSchedule:[],
            scoreArr:[],
            currentScore:1,
            allpageScore:0,
            showItemScore: 3,
            subjectId:"",

			// 作业块
			taskArr:[],
            taskSubjectArr:[],
            currentTask:1,
            allpageTask:0,
			hsubjectId:'',
			upTime: 3,//0：今天 1：近三天 2：近一周 3：全部
			states: 2 //0：未完成 1：已完成 2：全部
        },
        filters: {
            addRootFile: function(img) {
                return SERVERROOTFILE + img;
            },
            gotoPlayer: function(cid,vid,time) {
				return 'player.html?cid=' + cid + '&vid=' + vid+'&time=' + time;
			},
            answerQuestion:function (id) {
				return 'workdetail.html?paperId=' +id;
            },
            review:function (id) {
				return 'taskresultsummary.html?paperId=' + id;
            },
            getState:function (type) {
				if(type==0){
					return "未完成";
				}else {
					return "已完成";
				}
            }
        },
        computed: {
            pages: function() {
                var pag = [];
                if(this.current < this.showItem) { //如果当前的激活的项 小于要显示的条数
                    //总页数和要显示的条数那个大就显示多少条
                    var i = Math.min(this.showItem, this.allpage);
                    while(i) {
                        pag.unshift(i--);
                    }
                } else { //当前页数大于显示页数了
                    var middle = this.current - Math.floor(this.showItem / 2), //从哪里开始
                        i = this.showItem;
                    if(middle > (this.allpage - this.showItem)) {
                        middle = (this.allpage - this.showItem) + 1
                    }
                    while(i--) {
                        pag.push(middle++);
                    }
                }
                return pag
            },
            pageScore: function() {
                var pag = [];
                if(this.currentScore < this.showItemScore) { //如果当前的激活的项 小于要显示的条数
                    //总页数和要显示的条数那个大就显示多少条
                    var i = Math.min(this.showItemScore, this.allpageScore);
                    while(i) {
                        pag.unshift(i--);
                    }
                } else { //当前页数大于显示页数了
                    var middle = this.currentScore - Math.floor(this.showItemScore / 2), //从哪里开始
                        i = this.showItemScore;
                    if(middle > (this.allpageScore - this.showItemScore)) {
                        middle = (this.allpageScore - this.showItemScore) + 1
                    }
                    while(i--) {
                        pag.push(middle++);
                    }
                }
                return pag
            },
            pageTask: function() {
                var pag = [];
                if(this.currentTask < this.showItemScore) { //如果当前的激活的项 小于要显示的条数
                    //总页数和要显示的条数那个大就显示多少条
                    var i = Math.min(this.showItemScore, this.allpageTask);
                    while(i) {
                        pag.unshift(i--);
                    }
                } else { //当前页数大于显示页数了
                    var middle = this.currentTask - Math.floor(this.showItemScore / 2), //从哪里开始
                        i = this.showItemScore;
                    if(middle > (this.allpageTask - this.showItemScore)) {
                        middle = (this.allpageTask - this.showItemScore) + 1
                    }
                    while(i--) {
                        pag.push(middle++);
                    }
                }
                return pag
            }
        },
        mounted: function mounted() {
            this.$nextTick(function() {
                this.showData();
            });
        },
        methods: {
        	showData(){
        		if(1 == this.currentIndex){
        			this.showCourse();
        		}else if(2 == this.currentIndex){
        			this.showSchedule();
        		}else if(3 == this.currentIndex){
        			this.showSubject();
        		}else if(4 == this.currentIndex){
        			this.bindTaskBtn();
        		}
        	},
        	showCourse(){ //课程
        		var _this = this;
        		this.$http.post(SERVERROOTDATA+"api/student/site/Student.ashx?action=getCourseCollection", {
        			pageSize: _this.showItem,	//一页个数
                    pageIndex:_this.current,//页码
        		}, {
					emulateJSON: true
				}).then(function(res) {
					if(res.body.code == 200){
						_this.courseList = res.body.rows;
						_this.allpage=res.body.totalPageCount;
					}
				});
        	},
        	showSchedule(){
        		var _this = this;
        		this.$http.post(SERVERROOTDATA + "api/student/site/Student.ashx?action=showStudentSchedule", {
        		}, {
					emulateJSON: true
				}).then(function(res) {
					if(res.body.code == 200){
						_this.courseSchedule = res.body.rows;
					}
				});
        	},
        	showSubject(){
        		var _this = this;
        		this.$http.post(SERVERROOTDATA + "api/student/site/Student.ashx?action=getSubject", {
        			
        		}, {
					emulateJSON: true
				}).then(function(res) {
					if(res.body.code == 200){
						_this.subjectArr = res.body.rows;
					}
				}).then(function(){
					_this.showScore();
				});
        	},
        	showScore(){
        		var _this = this;
        		this.$http.post(SERVERROOTDATA + "api/student/site/Student.ashx?action=getStudentScore", {
        			subjectId:_this.subjectId,
        			pageSize: _this.showItemScore,	//一页个数
                    pageIndex:_this.currentScore,//页码
        		}, {
					emulateJSON: true
				}).then(function(res) {
					if(res.body.code == 200){
						_this.scoreArr = res.body.rows;
						_this.allpageScore=res.body.totalPageCount;
					}
				});
        	},
			bindTaskBtn:function () {
                var _this = this;
                this.$http.post(SERVERROOTDATA + "api/student/site/Student.ashx?action=getSubject", {

                }, {
                    emulateJSON: true
                }).then(function(res) {
                    if(res.body.code == 200){
                        _this.taskSubjectArr = res.body.rows;
                    }
                }).then(function () {
                	_this.showTask();
                });
            },
        	showTask(){
                var _this = this;
                this.$http.post(SERVERROOTDATA + "api/student/site/homework.ashx?action=getTeacherSetWork", {
                    subjectId:_this.hsubjectId,
                    states:_this.states,
                    arrangeTime:_this.upTime,
                    pageSize: 5,	//一页个数
                    pageIndex:_this.currentTask,//页码
                }, {
                    emulateJSON: true
                }).then(function(res) {
                    if(res.body.code == 200){
                        _this.taskArr = res.body.rows.reverse();
                        _this.allpageTask=res.body.totalPageCount;
                    }
                });
        	},
            changeShow(index){ //1:课程 2:课表 3:成绩 4:作业
            	if(index == 1){
            		if(this.courseFlag){
            			return false;
            		}
            		this.courseFlag = true;
            		this.timeTableFlag = false;
            		this.scoreFlag = false;
            		this.taskFlag = false;
            		this.currentIndex = 1;
            		this.showData();
            		this.setParentIframe();
            	} else if(index == 2){
            		if(this.timeTableFlag){
            			return false;
            		}
            		this.courseFlag = false;
            		this.timeTableFlag = true;
            		this.scoreFlag = false;
            		this.taskFlag = false;
            		this.currentIndex = 2;
            		this.showData();
            		this.setParentIframe();
            	}else if(index == 3){
            		if(this.scoreFlag){
            			return false;
            		}
            		this.courseFlag = false;
            		this.timeTableFlag = false;
            		this.scoreFlag = true;
            		this.taskFlag = false;
            		this.currentIndex = 3;
            		this.showData();
            		this.setParentIframe();
            	}else if(index == 4){
            		if(this.taskFlag){
            			return false;
            		}
            		this.courseFlag = false;
            		this.timeTableFlag = false;
            		this.scoreFlag = false;
            		this.taskFlag = true;
            		this.currentIndex = 4;
            		this.showData();
            		this.setParentIframe();
            	}
            },
            setParentIframe(){
            	setTimeout(function(){
            		window.parent.window.setIframeHeight($("#jStudentIframe")[0]);
            	},200);
            },
            cancelCollection(val,cId){
            	var _this = this;
        		this.$http.post(SERVERROOTDATA + "api/student/app/Student.ashx?action=saveCollectionCourse", {
        			cancel:1, //1 删除 0 添加
        			courseId:cId
        		}, {
					emulateJSON: true
				}).then(function(res) {
					if(res.body.code == 200){
						_this.courseList.splice(_this.courseList.indexOf(val),1);
						layer.msg("取消收藏!");
					}
				});
            },
            goto(index) {
				//枫叶处理
				if(index == this.current) return;
				if(index > this.allpage) {
					this.current = this.current - 2;
					layer.msg("Sorry ╮(╯_╰)╭ 没有下一页喽！");
					return false;
				}
				this.current = index;
				this.showData(this.currentIndex);
			},
			gotoScore(index) {
				//枫叶处理
				if(index == this.currentScore) return;
				if(index > this.allpageScore) {
					this.currentScore = this.currentScore - 2;
					layer.msg("Sorry ╮(╯_╰)╭ 没有下一页喽！");
					return false;
				}
				this.currentScore = index;
				this.showData(this.currentIndex);
			}
            ,
            gotoTask(index) {
                //枫叶处理
                if(index == this.currentTask) return;
                if(index > this.allpageTask) {
                    this.currentTask = this.currentTask - 2;
                    layer.msg("Sorry ╮(╯_╰)╭ 没有下一页喽！");
                    return false;
                }
                this.currentTask = index;
                this.showData(this.currentIndex);
            }
        }
    });
}

studyApp();

