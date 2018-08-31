require("../../css/studentcenter/activity.less");

if(!checkInIframe()){
	window.location.href ="./studentcenter.html";
}

var activityApp = function() {
    new Vue({
        el: "#jactivityApp",
        data: {
        	completeState:1,
        	activityArr:[],
        	activityArr2:[],
        	studyArr:[],
        	current:1,
            allpage:0,
            showItem: 3,
            current2:1,
            allpage2:0,
            showItem2: 3,
            
        },
        filters: {
            addRootFile: function(img) {
                return SERVERROOTFILE + img;
            },
            gotoActivity:function(aId){
            	return 'details.html?activityId=' + aId;
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
            pages2: function() {
                var pag = [];
                if(this.current2 < this.showItem2) { //如果当前的激活的项 小于要显示的条数
                    //总页数和要显示的条数那个大就显示多少条
                    var i = Math.min(this.showItem2, this.allpage2);
                    while(i) {
                        pag.unshift(i--);
                    }
                } else { //当前页数大于显示页数了
                    var middle = this.current2 - Math.floor(this.showItem2 / 2), //从哪里开始
                        i = this.showItem2;
                    if(middle > (this.allpage2 - this.showItem2)) {
                        middle = (this.allpage2 - this.showItem2) + 1
                    }
                    while(i--) {
                        pag.push(middle++);
                    }
                }
                return pag
            },
        },
        mounted: function mounted() {
            this.$nextTick(function() {
                this.showData();
                this.getStudentActivityState();
            });
        },
        methods: {
        	showData(){
        		if(this.completeState == 1){
        			this.incomplete();
        		}else{
        			this.complete();
        		}
        	},
        	
        	changeShow(index){
        		this.completeState = index;
        		this.showData();
        		this.setParentIframe();
        	},
        	
        	incomplete(){
        		var _this = this;
        		this.$http.post(SERVERROOTDATA+"api/student/site/Student.ashx?action=getStudentAtivity", {
        			state: _this.completeState,
        			pageSize: _this.showItem,	//一页个数
                    pageIndex:_this.current,//页码
        		}, {
					emulateJSON: true
				}).then(function(res) {
					if(res.body.code == 200){
						_this.activityArr = res.body.rows;
						_this.allpage=res.body.totalPageCount;
					}
				});
        	},
        	
        	complete(){
        		var _this = this;
        		this.$http.post(SERVERROOTDATA+"api/student/site/Student.ashx?action=getStudentAtivity", {
        			state: _this.completeState,
        			pageSize: _this.showItem2,	//一页个数
                    pageIndex:_this.current2,//页码
        		}, {
					emulateJSON: true
				}).then(function(res) {
					if(res.body.code == 200){
						_this.activityArr2 = res.body.rows;
						_this.allpage2=res.body.totalPageCount;
					}
				});
        	},
        	setParentIframe(){
            	setTimeout(function(){
            		window.parent.window.setIframeHeight($("#jStudentIframe")[0]);
            	},200);
            },
        	getStudentActivityState(){
        		this.$http.post(SERVERROOTDATA+"api/student/site/Student.ashx?action=getStudentStudy", {}, {
					emulateJSON: true
				}).then(function(res) {
					if(res.body.code == 200){
						this.studyArr = res.body.rows;
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
				this.showData();
			},
			
			goto2(index) {
				//枫叶处理
				if(index == this.current2) return;
				if(index > this.allpage2) {
					this.current2 = this.current2 - 2;
					layer.msg("Sorry ╮(╯_╰)╭ 没有下一页喽！");
					return false;
				}
				this.current2 = index;
				this.showData();
			},
			
        }
    });
}

activityApp();
