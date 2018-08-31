require("../../css/onlineclassroom/onlineclassmore.less");

var subject = $(document).getUrlParam("subject"),
	grade = $(document).getUrlParam("grader"),
	semester = $(document).getUrlParam("semester"),
	type = $(document).getUrlParam("type");


var onlineMore = function(){
	new Vue({
		el:"#jonlineClassApp",
		data:{
			subjectArr:[],  //学科
			gradeArr:[],    //年级
			semesterArr:[], //学期
			typeArr:[],     //类别
			gradeLabel:"初一",
			typeLabel:"基础课程",
			current:1,
	        allpage:0,
	        showItem: 9,
	        subjectIndex:0,
	        gradeIndex:0,
	        semesterIndex:0,
	        typeIndex:0,
	        subjectId:"",
	        gradeId:"",
	        semesterId:"",
	        typeId:"",
	        outLineArr:[],
	        courseArr:[],
	        currentSyllabusId:''
		},
		filters: {
	        addRootFile: function(img) {
	            return SERVERROOTFILE + img;
	        },
	        gotoPlayer: function(cid, vid) {
				return 'player.html?cid=' + cid + '&vid=' + vid;
			},
			gotoTeacher(tId){
	        	return 'teacherindex.html?teacherId='+tId;
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
	        }
	    },
	    mounted: function mounted() {
	        this.$nextTick(function() {
	            this.getFilter(subject,grade,semester,type);
	        });
	    },  
	    methods:{
	    	getFilter(subject,grade,semester,type){
	    		var _this = this;
	    		this.getSubject(subject,grade,semester,type);
        		
        		//类别
        		this.$http.post(SERVERROOTDATA+"/website/ashx/site/Subject.ashx?action=getCourseType", {
        			pageSize: 24,	//一页个数
                    pageIndex:1,//页码
        		}, {
					emulateJSON: true
				}).then(function(res) {
					if(res.body.code == 200){
						_this.typeArr = res.body.rows;
						_this.typeId = _this.typeArr[0].courseTypeId;
						_this.typeLabel = _this.typeArr[0].courseTypeName;
						_this.typeArr.forEach(function(item,index){
							if(item.courseTypeId == type){
								_this.typeId = type;
								_this.typeIndex = index;
								_this.typeLabel = item.courseTypeName;
							}
						})
					}
				});
	    	},
	    	getSubject(subject,grade,semester,type){
	    		var _this = this;
	    		//学科
        		this.$http.post(SERVERROOTDATA+"/website/ashx/site/Subject.ashx?action=getSubject", {
        			pageSize: 24,	//一页个数
                    pageIndex:1,//页码
        		}, {
					emulateJSON: true
				}).then(function(res) {
					if(res.body.code == 200){
						_this.subjectArr = res.body.rows;
						_this.subjectId = _this.subjectArr[0].subjectId;
						_this.subjectArr.forEach(function(item,index){
							if(item.subjectId == subject){
								_this.subjectId = subject;
								_this.subjectIndex = index;
							}
						})
					}
				}).then(function(){
					_this.getGrade(subject,grade,semester,type);
				});
	    	},
	    	getGrade(subject,grade,semester,type){
	    		var _this = this;
	    		//年级
        		this.$http.post(SERVERROOTDATA+"/website/ashx/site/Subject.ashx?action=getGrade", {
        			pageSize: 24,	//一页个数
                    pageIndex:1,//页码
        		}, {
					emulateJSON: true
				}).then(function(res) {
					if(res.body.code == 200){
						_this.gradeArr = res.body.rows;
						_this.gradeId = _this.gradeArr[0].gradeId;
						_this.gradeLabel = _this.gradeArr[0].gradeName;
						_this.gradeArr.forEach(function(item,index){
							if(item.gradeId == grade){
								_this.gradeId = grade;
								_this.gradeIndex = index;
								_this.gradaLabel = item.gradeName;
							}
						})
					}
				}).then(function(){
					_this.getTerm(subject,grade,semester,type);
				});
	    	},
	    	getTerm(subject,grade,semester,type){
	    		var _this = this;
	    		//学期
        		this.$http.post(SERVERROOTDATA+"/website/ashx/site/Subject.ashx?action=getTerm", {
        			pageSize: 24,	//一页个数
                    pageIndex:1,//页码
        		}, {
					emulateJSON: true
				}).then(function(res) {
					if(res.body.code == 200){
						_this.semesterArr = res.body.rows;
						_this.semesterId = _this.semesterArr[0].termId;
						_this.semesterArr.forEach(function(item,index){
							if(item.termId == semester){
								_this.semesterId = semester;
								_this.semesterIndex = index;
							}
						})
					}
				}).then(function(){
					_this.getOutLine();
				});
	    	},
	    	changeFilter(sId,sIndex,gId,gIndex,seId,seIndex,tId,tIndex,gName,tName){
	    		this.subjectId = sId;
	    		this.gradeId = gId;
	    		this.semesterId = seId;
	    		this.typeId = tId;
	    		
	    		this.subjectIndex = sIndex;
	    		this.gradeIndex = gIndex;
	    		this.semesterIndex = seIndex;
	    		this.typeIndex = tIndex;
	    		if(gName !="" && gName !=undefined){
	    			this.gradeLabel = gName;
	    		}
	    		
	    		if(tName !="" && tName !=undefined){
	    			this.typeLabel = tName;
	    		}

	    		
	    		this.getOutLine();
	    	},
	    	getOutLine(){
	    		var _this = this;
	    		this.$http.post(SERVERROOTDATA+"/website/ashx/app/LearningWorld.ashx?action=getSyllabus", {
	    			gradeId:_this.gradeId,
	    			subjectId:_this.subjectId,
	    			termId:_this.semesterId,
        			pageSize: 48,	//一页个数
                    pageIndex:1,//页码
        		}, {
					emulateJSON: true
				}).then(function(res) {
					if(res.body.code == 200){
						_this.outLineArr = res.body.rows;
						_this.currentSyllabusId = _this.outLineArr[0].syllabusId;
						_this.outLineArr.forEach(function(item,index){
							Vue.set(item, "openFlag", false); //全局注册变量
						})
						_this.getCourse();
					}
				});
	    	},
	    	toggleOpen(item,flag){
	    		this.outLineArr.forEach(function(item,index){
					Vue.set(item, "openFlag", false); //全局注册变量
				});
	    		Vue.set(item, "openFlag", !flag); //全局注册变量
	    		this.changeSyId(item.syllabusId);
	    	},
	    	changeSyId(index){
	    		this.currentSyllabusId = index;
	    		this.getCourse();
	    	},
	    	getCourse(){
	    		var _this = this;
	    		this.$http.post(SERVERROOTDATA+"/website/ashx/app/LearningWorld.ashx?action=getCourse", {
	    			name:'',
	    			courseTypeId:_this.typeId,
	    			syllabusId:_this.currentSyllabusId,
	    			pageSize: _this.showItem,	//一页个数
                    pageIndex:_this.current,//页码
        		}, {
					emulateJSON: true
				}).then(function(res) {
					if(res.body.code == 200){
						_this.courseArr = res.body.rows;
						_this.allpage = res.body.totalPageCount;
						_this.courseArr.forEach(function(item,index){
							Vue.set(item, "teacherIconPath",SERVERROOTFILE + item.teacherIconPath); //全局注册变量
						})
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
				this.getCourse();
			},
	    	
	    	
	    }
	})
}

onlineMore();