require("../../css/studentcenter/checkwork.less");

if(!checkInIframe()){
	window.location.href ="./studentcenter.html";
}

var checkworkApp = function() {
    new Vue({
        el: "#jcheckWorkApp",
        data: {
        	namingList:[],
        	leaveList:[],
        	namingFlag:true,
        	leaveFlag:false,
        	current:1,
            allpage:0,
            showItem: 3,
            currentIndex:1,
            currentLeave:1,
            allpageLeave:0,
            showItemLeave: 3,
            leaveApplyFlag:false,
            beginLeaveTime:'',
            endLeaveTime:'',
            reason:'',
        },
        filters: {
            addRootFile: function(img) {
                return SERVERROOTFILE + img;
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
            pageLeave: function() {
                var pag = [];
                if(this.currentLeave < this.showItemLeave) { //如果当前的激活的项 小于要显示的条数
                    //总页数和要显示的条数那个大就显示多少条
                    var i = Math.min(this.showItemLeave, this.allpageLeave);
                    while(i) {
                        pag.unshift(i--);
                    }
                } else { //当前页数大于显示页数了
                    var middle = this.currentLeave - Math.floor(this.showItemLeave / 2), //从哪里开始
                        i = this.showItemLeave;
                    if(middle > (this.allpageLeave - this.showItemLeave)) {
                        middle = (this.allpageLeave - this.showItemLeave) + 1
                    }
                    while(i--) {
                        pag.push(middle++);
                    }
                }
                return pag
            },
            reasonLen:function(){
            	return this.reason.length;
            }
        },
        mounted: function mounted() {
            this.$nextTick(function() {
            	this.beginLeaveTime = $.getCurrentTime("",4);
				this.endLeaveTime = $.getCurrentTime("",4);
                this.showData();
            });
        },
        methods: {
        	showData(){
        		if(1 == this.currentIndex){
        			this.showNaming();
        		}else if(2 == this.currentIndex){
        			this.showLeave();
        		}
        	},
        	showNaming(){ //课程
        		var _this = this;
        		this.$http.post(SERVERROOTDATA+"api/student/app/Student.ashx?action=getStudentAttendance", {
        			pageSize: _this.showItem,	//一页个数
                    pageIndex:_this.current,//页码
        		}, {
					emulateJSON: true
				}).then(function(res) {
					if(res.body.code == 200){
						_this.namingList = res.body.rows;
						_this.allpage=res.body.totalPageCount;
					}
				});
        	},
        	showLeave(){
        		var _this = this;
        		this.$http.post(SERVERROOTDATA + "api/student/site/Student.ashx?action=getStudentLeave", {
        			pageSize: _this.showItemLeave,	//一页个数
                    pageIndex:_this.currentLeave,//页码
        		}, {
					emulateJSON: true
				}).then(function(res) {
					if(res.body.code == 200){
						_this.leaveList = res.body.rows;
						_this.allpageLeave=res.body.totalPageCount;
					}
				});
        	},
            changeShow(index){ //1:点名 2:请假
            	if(index == 1){
            		if(this.NamingFlag){
            			return false;
            		}
            		this.namingFlag = true;
            		this.leaveFlag = false;
            		this.currentIndex = 1;
            		this.showData();
            		this.setParentIframe();
            	} else if(index == 2){
            		this.namingFlag = false;
            		this.leaveFlag = true;
            		this.currentIndex = 2;
            		this.showData();
            		this.setParentIframe();
            	}
            },
            
            setParentIframe(){
            	setTimeout(function(){
            		window.parent.window.setIframeHeight();
            	},200);
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
			gotoLeave(index) {
				//枫叶处理
				if(index == this.currentLeave) return;
				if(index > this.allpageLeave) {
					this.currentLeave = this.currentLeave - 2;
					layer.msg("Sorry ╮(╯_╰)╭ 没有下一页喽！");
					return false;
				}
				this.currentLeave = index;
				this.showData();
			},
			initTime(){
				var _this = this;
				setTimeout(function(){
					 $("#begin_date").ECalendar({
		             type:"time",   //模式，time: 带时间选择; date: 不带时间选择;
		             stamp : false,   //是否转成时间戳，默认true;
		             offset:[0,2],   //弹框手动偏移量;
		             //format:"yyyy年mm月dd日",   //时间格式 默认 yyyy-mm-dd hh:ii;
		             skin:3,   //皮肤颜色，默认随机，可选值：0-8,或者直接标注颜色值;
		             step:10,   //选择时间分钟的精确度;
		             callback:function(v,e){
		            	 _this.beginLeaveTime = v;
		             } //回调函数
		        });
				$("#end_date").ECalendar({
		             type:"time",   //模式，time: 带时间选择; date: 不带时间选择;
		             stamp : false,   //是否转成时间戳，默认true;
		             offset:[0,2],   //弹框手动偏移量;
		             //format:"yyyy年mm月dd日",   //时间格式 默认 yyyy-mm-dd hh:ii;
		             skin:2,   //皮肤颜色，默认随机，可选值：0-8,或者直接标注颜色值;
		             step:10,   //选择时间分钟的精确度;
		             callback:function(v,e){
		            	 _this.endLeaveTime = v;
		             } //回调函数
		        });
				},300)
			},
			applyLeave(){
				this.leaveApplyFlag = true;
				this.setParentIframe();
				this.initTime();
			},
			submitLeave(){
				var _this = this;
				if(this.reason ==""){
					layer.msg("请假理由不能为空!");
					return false;
				}
        		this.$http.post(SERVERROOTDATA + "api/student/site/Student.ashx?action=saveStudentLeave", {
        			beginTime: _this.beginLeaveTime,
        			endTime:_this.endLeaveTime,
        			leaveReasons:_this.reason,
        		}, {
					emulateJSON: true
				}).then(function(res) {
					if(res.body.code == 200){
						layer.msg(res.body.message);
						_this.reason = "";
						_this.currentLeave = 1;
						_this.leaveApplyFlag = false;
					}else{
						layer.msg(res.body.message);
					}
				}).then(function(){
					_this.showLeave();
				});
			}
        }
    });
}

checkworkApp();