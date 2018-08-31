require("../../css/player/player.less");

var vid = $(document).getUrlParam("vid"),
	cid = $(document).getUrlParam("cid"),
	time = $(document).getUrlParam("time"),
	uicon = $(window).storager({
		key: 'uIcon'
	}).readStorage(),
	uid = $(window).storager({
		key: 'uId'
	}).readStorage(),
	interval = '';

if(isNaN(time)) {
	time = 0;
}

var player = function() {
	new Vue({
		el: '#jplayerApp',
		data: {
			playauth: '',
			current: 1,
			allpage: 0,
			showItem: 9,
			eval: '',
			evaluationList: [],
			evalCount: 0,
			userIcon: '',
			relativeCourse: [],
			hasCollected: 0,
			collectTitle:'收藏',
			collectLabel:'收藏',
		},
		filters: {
			addRootFile: function(img) {
				return SERVERROOTFILE + img;
			},
			gotoPlayer: function(cid, vid) {
				return 'player.html?cid=' + cid + '&vid=' + vid;
			},
		},
		mounted: function mounted() {
			this.$nextTick(function() {
				this.createAuth();
				this.gettEvaluationList();
				this.getRelativeCourse();
				this.userIcon = uicon;
				this.isCollection();
				this.alterCourseReadCount();
			});
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
			evalLen: function() {
				return this.eval.length;
			}
		},
		methods: {
			createAuth() {
				var _this = this;
				this.$http.post(SERVERROOTDATA + "/website/ashx/app/LearningWorld.ashx?action=getPlayUrlByVideoId", {
					videoId: vid,
				}, {
					emulateJSON: true
				}).then(function(res) {
					if(res.body.code == 200) {
						_this.playauth = res.body.rows[0].playAuth;
					}
				}).then(function() {
					_this.initPlayer();
				});
			},
			isCollection() {
				var _this = this;
				this.$http.post(SERVERROOTDATA + "/website/ashx/site/OnlineClass.ashx?action=checkCourseHasCollected", {
					courseId: cid
				}, {
					emulateJSON: true
				}).then(function(res) {
					_this.hasCollected = res.body.hasCollected;
					if(_this.hasCollected == 1){
						_this.collectTitle = "取消收藏";
						_this.collectLabel = "已收藏";
					}else{
						_this.collectTitle = "收藏";
						_this.collectLabel = "收藏";
					}
				});
			},
			collectionCourse() {
				var _this = this;
				if(_this.hasCollected != 1) {
					this.$http.post(SERVERROOTDATA + "api/student/site/Student.ashx?action=saveCollectionCourse", {
						cancel: 0, //添加
						courseId: cid
					}, {
						emulateJSON: true
					}).then(function(res) {
						if(res.body.code == 200) {
							layer.msg("收藏成功!");
							
						}
					}).then(function(){
						_this.isCollection();
					});
				}else{
					this.$http.post(SERVERROOTDATA + "api/student/site/Student.ashx?action=saveCollectionCourse", {
						cancel: 1, //删除
						courseId: cid
					}, {
						emulateJSON: true
					}).then(function(res) {
						if(res.body.code == 200) {
							layer.msg("取消收藏!");
							
						}
					}).then(function(){
						_this.isCollection();
					});
				}
			},
			alterCourseReadCount(){
				var _this = this;
				this.$http.post(SERVERROOTDATA + "/website/ashx/site/OnlineClass.ashx?action=alterCourseReadCount", {
					courseId: cid
				}, {
					emulateJSON: true
				});
			},
			initPlayer() {
				var _this = this;
				var player = new Aliplayer({
					id: 'jcoursePlayer',
					width: '100%',
					height: '675px',
					autoplay: true,
					vid: vid,
					playauth: _this.playauth,
					cover: '../images/public/player.jpg',
				}, function(player) {
					player.seek(time);
					interval = setInterval(function() {
						_this.playTimeLenSave(player.getCurrentTime())
					}, 10000);
					player.on('play', function() {
						clearInterval(interval);
						interval = setInterval(function() {
							_this.playTimeLenSave(player.getCurrentTime())
						}, 10000);
					});
					player.on('pause', function() {
						clearInterval(interval);
						_this.playTimeLenSave(player.getCurrentTime())
					});
				});
			},
			playTimeLenSave(time) {
				var _this = this;
				this.$http.post(SERVERROOTDATA + "/website/ashx/site/OnlineClass.ashx?action=playTimeLenSave", {
					courseId: cid,
					timeLen: time
				}, {
					emulateJSON: true
				});
			},
			gotoTeacher(tId) {
				window.open('teacherindex.html?teacherId=' + tId);
			},
			gettEvaluationList() {
				var _this = this;
				this.$http.post(SERVERROOTDATA + "website/ashx/app/CourseEvaluation.ashx?action=getEvaluationList", {
					courseId: cid,
					pageIndex: _this.current,
					pageSize: 6,
				}, {
					emulateJSON: true
				}).then(function(res) {
					if(res.body.code == 200) {
						_this.evaluationList = res.body.rows;
						_this.evalCount = res.body.totalCount;
						_this.allpage = res.body.totalPageCount;
					}
				});
			},
			subEval() {
				var _this = this;
				if(this.eval == "") {
					layer.msg("评论不能为空!");
					return false;
				}
				if(!uid) {
					layer.confirm('游客暂不能评论!', {
						btn: ['登录', '取消'], //按钮
					}, function() {
						window.location.href = "login.html";
					}, function() {
						layer.closeAll();
					});
					return false;
				}
				this.$http.post(SERVERROOTDATA + "/website/ashx/app/CourseEvaluation.ashx?action=evaluation", {
					courseId: cid,
					evaluation: _this.eval,
				}, {
					emulateJSON: true
				}).then(function(res) {
					console.log(res.body)
					if(res.body.code == 200) {
						layer.msg(res.body.message);
						_this.current = 1;
						_this.gettEvaluationList();
						_this.eval = "";
					}
				});

			},
			getRelativeCourse() { //相关课程
				var _this = this;
				this.$http.post(SERVERROOTDATA + "/website/ashx/site/OnlineClass.ashx?action=getRelativeCourse", {
					courseId: cid,
					pageSize: 4,
					pageIndex: 1,
				}, {
					emulateJSON: true
				}).then(function(res) {
					if(res.body.code == 200) {
						_this.relativeCourse = res.body.rows;
						_this.relativeCourse.forEach(function(item, index) {
							Vue.set(item, "teacherIconPath", SERVERROOTFILE + item.teacherIconPath); //注册变量
						});
					}
				})
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
				this.gettEvaluationList();
			},

		}
	})

}

player();