/*
 * Autor:播米在线
 * Time:2017/09/16
 * Desc:播米优化修改
 */

function indexData() {
	new Vue({
		el: '#jindexLiveTeacherInfApp',
		data: {
			liveTeacherArr: []
		},
		mounted: function() { //1.0ready --> 2.0
			this.$nextTick(function() {
				this.loadData();
			})
		},
		methods: {
			loadData: function() {
				var _this = this;
				//获取频道
				this.$http.post(ROUTE + "ChannelProgram.ashx?action=getCurrLiveChannelProgram", {

				}, {
					emulateJSON: true
				}).then(function(res) {
					res.body.forEach(function(item, index) {
						if(item.channelId == 8 || item.channelId == "8") {
							Vue.set(item, "iconPath", ROUTEFILE + item.iconPath); //注册变量
							_this.liveTeacherArr.push(item);
						}
					})
				}).then(function() {
					_this.liveTeacherSwiper();
				});
				//谍报直播源
				this.$http.post(ROUTE + "Channel.ashx?action=getLiveAddrByChannelId", {
					channelId: 8
				}, {
					emulateJSON: true
				}).then(function(res) {
					_this.createPlayer(res.body[0].rtmpUrl2, res.body[0].hlsUrl);
				});

			},
			liveTeacherSwiper: function() {
				var mySwiper = new Swiper('.bmindex-swiper-live-teacher', {
					//direction: 'vertical',
					slidesPerView: 2,
					autoplay: 3000,
					loop: true
				})
			},
			createPlayer: function(URL,URL2) {
				if(flashChecker().f == 0) {
					$("#indexLivePlayer").before('<a href="http://get.adobe.com/cn/flashplayer/" target="_blank" class="noFlashTips">检查到您的系统未安装Flash,请先安装</a>');
				}
				var objectPlayer = new aodianPlayer({
					container: 'indexLivePlayer', //播放器容器ID，必要参数
					rtmpUrl: URL, //控制台开通的APP rtmp地址，必要参数
					hlsUrl: URL2, //控制台开通的APP hls地址，必要参数
					/* 以下为可选参数*/
					width: '100%', //播放器宽度，可用数字、百分比等
					height: '680', //播放器高度，可用数字、百分比等
					autostart: true, //是否自动播放，默认为false
					bufferlength: '1', //视频缓冲时间，默认为3秒。hls不支持！手机端不支持
					maxbufferlength: '2', //最大视频缓冲时间，默认为2秒。hls不支持！手机端不支持
					stretching: '1', //设置全屏模式,1代表按比例撑满至全屏,2代表铺满全屏,3代表视频原始大小,默认值为1。hls初始设置不支持，手机端不支持
					controlbardisplay: 'enable', //是否显示控制栏，值为：disable、enable默认为disable。
					adveDeAddr: './ycedu/images/public/xtsj.jpg', //封面图片链接
					//adveWidth: 320,//封面图宽度
					//adveHeight: 240,//封面图高度
					//adveReAddr: '',//封面图点击链接
					//isclickplay: false,//是否单击播放，默认为false
					isfullscreen: true //是否双击全屏，默认为true
				});
			}
		}
	});

	//专题栏
	//	new Vue({
	//		el: '#jSpecialModelApp',
	//		data: {
	//			specialArr: []
	//		},
	//		mounted: function() { //1.0ready --> 2.0
	//			this.$nextTick(function() {
	//				this.loadData();
	//			})
	//		},
	//		methods: {
	//			loadData: function() {
	//				var _this = this;
	//				//http://www.bomizx.net/bmOnline/website/ashx/
	//				//专题栏
	//				this.$http.post(ROUTE + "CourseType.ashx?action=getSecondLevelCourseType", {
	//
	//				}, {
	//					emulateJSON: true
	//				}).then(function(res) {
	//					_this.specialArr = res.body;
	//					_this.specialArr.forEach(function(item, index) {
	//						Vue.set(item, "iconPath", ROUTEFILE + item.iconPath); //注册变量
	//					})
	//				});
	//
	//			}
	//		}
	//	});

	new Vue({
		el: '#jindexInforApp',
		data: {
			newsArr: []
		},
		mounted: function() { //1.0ready --> 2.0
			this.$nextTick(function() {
				this.loadData();
			})
		},
		methods: {
			//新闻
			loadData: function() {
				var _this = this;
				//http://www.bomizx.net/bmOnline/website/ashx/
				//专题栏
				this.$http.post(ROUTE + "News.ashx?action=getFreeNews", {
					pageIndex: 0,
					pageSize: 3
				}, {
					emulateJSON: true
				}).then(function(res) {
					_this.newsArr = res.body.rows;
					_this.newsArr.forEach(function(item, index) {
						Vue.set(item, "iconPath", ROUTEFILE + item.iconPath); //注册变量
					})
				});

			}
		}
	});

	new Vue({
		el: '#jindexPublicApp',
		data: {
			publicArr: [],
			currentChannelProgramId: '',
			setKeyFlag: true
		},
		mounted: function() { //1.0ready --> 2.0
			this.$nextTick(function() {
				this.loadData();
			})
		},
		methods: {
			//公开课
			loadData: function() {
				var _this = this;
				var daysTips = ["周一", "周二", "周三", "周四", "周五"];
				var day = (new Date()).getDay();
				var currentHour = (new Date()).getHours();
				var currentMin = (new Date()).getMinutes();
				var timeArr, hourArr1, hourArr2, min1, min2;
				this.$http.post(ROUTE + "ChannelProgram.ashx?action=getCurrLiveChannelProgram", {

				}, {
					emulateJSON: true
				}).then(function(res) {
					_this.publicArr = res.body;
					_this.publicArr.forEach(function(item, index) {
						if(daysTips[(day - 1)] == item.weekDay) {
							if(item.channelId == 6 || item.channelId == "6") {
								_this.currentChannelProgramId = item.channelProgramId;
								//return false;
							}

							if(item.channelId == 8 || item.channelId == "8") {
								if(_this.setKeyFlag) {
									$("#bmindexGoToLive").attr("href", "ycedu/dbliveroom.html?channelId=8&channelProgramId=" + item.channelProgramId);
								}

								timeArr = item.playTime.split("-");
								hourArr1 = timeArr[0].split(":");
								hourArr2 = timeArr[1].split(":");
								console.log(currentHour * 60 + currentMin)
								if((hourArr1[0] * 60 + parseInt(hourArr1[1])) <= (currentHour * 60 + currentMin) && (hourArr2[0] * 60 + parseInt(hourArr2[1])) >= (currentHour * 60 + currentMin)) {
									$("#bmindexGoToLive").attr("href", "ycedu/dbliveroom.html?channelId=8&channelProgramId=" + item.channelProgramId);
									_this.setKeyFlag = false;
								}
							}
						}

					})
				});

			}
		}
	});

	new Vue({
		//金融
		el: '#jindexencyclopediaApp',
		data: {
			encyclopeArr: []
		},
		mounted: function() { //1.0ready --> 2.0
			this.$nextTick(function() {
				this.loadData();
			})
		},
		methods: {
			loadData: function() {
				var _this = this;
				this.$http.post(ROUTE + "Course.ashx?action=getFinancialKnowledge", {
					type: 'uptodate',
					pageIndex: 1,
					pageSize: 10,
					courseTypeId: 15
				}, {
					emulateJSON: true
				}).then(function(res) {
					_this.encyclopeArr = res.body.rows;
					_this.encyclopeArr.forEach(function(item, index) {
						Vue.set(item, "iconPath", ROUTEFILE + item.iconPath); //注册变量
					})
				}).then(function() {
					_this.gotoPlay();
					indexEncyclopediaSwiper();
				});

			},
			gotoPlay: function() {
				$('.bmindexEncyclopediaLi').on('click', function() {
					var id = $(this).attr('data-id');
					var vid = $(this).attr('data-vid');
					if(vid != "") {
						$(this).attr('href', 'ycedu/encyclopediadetail.html?ecId=' + id);
						$(this).attr('target', '_blank');
					} else {
						layer.alert("该部分没有视频！");
					}

				});
			}
		}
	});
}

//首页金融课堂
function indexCourse() {
	var htmlStr = "";
	$.ajax({
		type: "get",
		url: ROUTE + "Course.ashx?action=getCourseByType",
		dataType: "json",
		data: {
			courseTypeId: '',
			pageIndex: 1,
			pageSize: 16,
			orderName: 'price',
			ascType: "asc"
		},
		success: function(result) {
			var dataObj = result.rows;
			dataObj.forEach(function(item, index) {
				if(index % 2 == 0) {
					htmlStr += '<div class="swiper-slide">';
				}
				htmlStr += '<div class="bmindexCourseLi">' +
					'<a class="bmindexCourseImg" href="ycedu/coursedetail.html?courseId=' + item.courseId + '" target="_blank">' +
					'<img src="' + ROUTEFILE + item.iconPath + '" alt="course" /></a>' +
					'<div class="bmindexCourseInf">' +
					'<h5>' + item.name + '</h5><p>' +
					'<a href="ycedu/guestindex.html?teacherId="' + item.teacherId + ' target="_blank">' + item.teacherName + '</a> <span>' + item.preferentialPrice + '</span></p></div></div>';

				if((index + 1) % 2 == 0) {
					htmlStr += '</div>';
				}
			})

			$("#jbmindexCourseApp").html(htmlStr);
			indexCourseSwiper();
		},
		error: function(err) {
			console.log(err);
		}
	});
}

/*
 * 公开课
 */
function initOpenClass() {
	new Vue({
		el: '#jopenLiveApp',
		data: {
			openLiveUrl: '',
			openLiveArr: [],
			publicArr: [],
			currentChannelProgramId: '',
			iconPathPre: ROUTEFILE,
			teacherInfArr: []
		},
		mounted: function() { //1.0ready --> 2.0
			this.$nextTick(function() {
				//暂时屏蔽
				this.loadData();
			})
		},
		methods: {
			loadData: function() {
				var _this = this;
				this.$http.post(ROUTE + "Channel.ashx?action=getLiveAddrByChannelId", {
					channelId: 6
				}, {
					emulateJSON: true
				}).then(function(res) {
					_this.openLiveUrl = res.body[0].rtmpUrl2;
					//_this.createOpenPlayer(_this.openLiveUrl,res.body[0].hlsUrl);
				});

				var day = (new Date()).getDay();
				var daysTips = ["周一", "周二", "周三", "周四", "周五"];
				this.$http.post(ROUTE + "ChannelProgram.ashx?action=getCurrLiveChannelProgram", {
					
				}, {
					emulateJSON: true
				}).then(function(res) {
					var issetFlag = true;
					_this.publicArr = res.body;
					_this.publicArr.forEach(function(item, index) {
						if(item.channelId == 6 || item.channelId == "6") {
							if(issetFlag) {
								_this.teacherInfArr = item;
							}

							if(daysTips[(day - 1)] == item.weekDay) {
								issetFlag = false;
								_this.teacherInfArr = item;
								return false;
							}
						}
					})
				}).then(function() {
					//					_this.getLiveTeacherInf(_this.currentChannelProgramId);
				});

			},
			createOpenPlayer: function(URL,URL2) {
				if(flashChecker().f == 0) {
					$("#indexLivePlayer").before('<a href="http://get.adobe.com/cn/flashplayer/" target="_blank" class="noFlashTips">检查到您的系统未安装Flash,请先安装</a>');
				}
				var objectPlayer = new aodianPlayer({
					container: 'openClassLivePlayer', //播放器容器ID，必要参数
					rtmpUrl: URL, //控制台开通的APP rtmp地址，必要参数
					hlsUrl: URL2, //控制台开通的APP hls地址，必要参数
					/* 以下为可选参数*/
					width: '100%', //播放器宽度，可用数字、百分比等
					height: '670', //播放器高度，可用数字、百分比等
					autostart: true, //是否自动播放，默认为false
					bufferlength: '1', //视频缓冲时间，默认为3秒。hls不支持！手机端不支持
					maxbufferlength: '2', //最大视频缓冲时间，默认为2秒。hls不支持！手机端不支持
					stretching: '1', //设置全屏模式,1代表按比例撑满至全屏,2代表铺满全屏,3代表视频原始大小,默认值为1。hls初始设置不支持，手机端不支持
					controlbardisplay: 'enable', //是否显示控制栏，值为：disable、enable默认为disable。
					adveDeAddr: './ycedu/images/live/dbplayerbg.jpg', //封面图片链接
					//adveWidth: 320,//封面图宽度
					//adveHeight: 240,//封面图高度
					//adveReAddr: '',//封面图点击链接
					//isclickplay: false,//是否单击播放，默认为false
					isfullscreen: true //是否双击全屏，默认为true
				});
			}
		}
	});

	new Vue({
		el: '#jbackCourseApp',
		data: {
			backCourseArr: []
		},
		mounted: function() { //1.0ready --> 2.0
			this.$nextTick(function() {
				this.loadData();
			});
			
		},
		methods: {
			
			loadData: function() {
				var _this = this;
				this.$http.post(ROUTE + "Course.ashx?action=getLiveChannelCourse", {
					pageIndex: 0,
					pageSize: 8,
				}, {
					emulateJSON: true
				}).then(function(res) {
					_this.backCourseArr = res.body.rows;
					_this.backCourseArr.forEach(function(item, index) {
						Vue.set(item, "iconPath", ROUTEFILE + item.iconPath); //注册变量
					})
				});

			},
			openBackPlayer: function(courseId, vId) {
				if(undefined == vId || "" == vId || null == vId) {
					layer.alert("该课程暂未开放,请选择别的看看!");
					return false;
				}
				layer.open({
					type: 2,
					title: '播米往前公开课',
					//closeBtn: 0, //不显示关闭按钮
					shadeClose: true,
					shade: [0.5, '#000'],
					area: ['800px', '500px'],
					//offset: 'rb', //右下角弹出
					//time: 2000, //2秒后自动关闭
					anim: 2,
					content: 'ycedu/backcourseplayer.html?courseId=' + courseId + '&videoId=' + vId
				});
			}
		}
	});
	new Vue({
		el: '#jbackCourseList',
		data: {
			showItem: 12,
			current: 1,
			allpage: 0,
			backCourseArr: []
		},
		mounted: function() { //1.0ready --> 2.0
			this.$nextTick(function() {
				this.loadData();
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
			}
		},
		methods: {
			loadData: function() {
				var _this = this;
				this.$http.post(ROUTE + "Course.ashx?action=getLiveChannelCourse", {
					pageIndex: 0,
					pageSize: _this.showItem,
				}, {
					emulateJSON: true
				}).then(function(res) {
					_this.allpage = res.body.totalPageCount;
					_this.backCourseArr = res.body.rows;
					_this.backCourseArr.forEach(function(item, index) {
						Vue.set(item, "iconPath", ROUTEFILE + item.iconPath); //注册变量
					})
				});

			},
			openBackPlayer: function(courseId, vId) {
				if(undefined == vId || "" == vId || null == vId) {
					layer.alert("该课程暂未开放,请选择别的看看!");
					return false;
				}
				layer.open({
					type: 2,
					title: '播米往前公开课',
					//closeBtn: 0, //不显示关闭按钮
					shadeClose: true,
					shade: [0.5, '#000'],
					area: ['800px', '500px'],
					//offset: 'rb', //右下角弹出
					//time: 2000, //2秒后自动关闭
					anim: 2,
					content: 'backcourseplayer.html?courseId=' + courseId + '&videoId=' + vId
				});
			},
			getListData: function(id) {
				var _this = this;
				this.$http.post(ROUTE + "Course.ashx?action=getLiveChannelCourse", {
					pageIndex: _this.current,
					pageSize: _this.showItem,
				}, {
					emulateJSON: true
				}).then(function(res) {
					_this.allpage = res.body.totalPageCount;
					_this.backCourseArr = res.body.rows;
					_this.backCourseArr.forEach(function(item, index) {
						Vue.set(item, "iconPath", ROUTEFILE + item.iconPath); //注册变量
					})
				});
			},
			goto: function(index) { //枫叶处理
				if(index == this.current) return;
				if(index > this.allpage) {
					this.current = this.current - 2;
					layer.msg("Sorry ╮(╯_╰)╭ 没有下一页喽！");
					return false;
				}
				this.current = index;
				this.getListData();;
				$.scrollTo($(".bmencyclopediaType").height() - 100, 0);
			}
		}
	});
	new Vue({
		el: '#jopenClassViewApp',
		data: {
			viewArr: [],
			viewImg: '',
			viewHref: ''
		},
		mounted: function() { //1.0ready --> 2.0
			this.$nextTick(function() {
				this.loadData();
			})
		},
		methods: {
			loadData: function() {
				var _this = this;
				this.$http.post(ROUTE + "Banner.ashx?action=getBanner", {
					bannerType: 'opinion'
				}, {
					emulateJSON: true
				}).then(function(res) {
					if(res.body[0] == undefined || res.body[0] == "undefined") {
						return false;
					}
					_this.viewImg = ROUTEFILE + res.body[0].iconPath;
					_this.viewHref = res.body[0].href;
				});

				this.$http.post(ROUTE + "News.ashx?action=getUpToDateNews", {
					pageIndex: 0,
					pageSize: 7
				}, {
					emulateJSON: true
				}).then(function(res) {
					_this.viewArr = res.body.rows;
				});

			}

		}
	});
}

function initEnDetail(ecId) {
	new Vue({
		el: '#jencyclopediadetailApp',
		data: {
			playId: '',
			title: '',
			intru: '',
			reletiveArr: [],
			reletiveVideoArr: [],
			currentChannelProgramId: '',
			icon: ROUTEFILE,
			titleT: '',
			teacherName: '',
			teacherId: '',
			count: '',
			time: ''
		},
		mounted: function() { //1.0ready --> 2.0
			this.$nextTick(function() {
				this.loadData();
				this.getReletiveCourse();
				this.getReletiveVideo();
			})
		},
		methods: {
			loadData: function() {
				var _this = this;
				var day = (new Date()).getDay();
				var daysTips = ["周一", "周二", "周三", "周四", "周五"];
				this.$http.post(ROUTE + "ChannelProgram.ashx?action=getCurrLiveChannelProgram", {

				}, {
					emulateJSON: true
				}).then(function(res) {
					_this.publicArr = res.body;
					_this.publicArr.forEach(function(item, index) {
						if(daysTips[(day - 1)] == item.weekDay) {
							if(item.channelId == 6 || item.channelId == "6") {
								_this.currentChannelProgramId = item.channelProgramId;
								_this.icon = _this.icon + item.iconPath;
								_this.titleT = item.name;
								_this.teacherName = item.teacherName;
								//_this.count = res.body[0].clickCount;
								_this.teacherId = item.teacherId;
								_this.time = item.weekDay + item.playTime;
								return false;
							}
						}
					})
				});

				this.$http.post(ROUTE + "Course.ashx?action=getCourseDetailById", {
					courseId: ecId
				}, {
					emulateJSON: true
				}).then(function(res) {
					if(res.body[1][0].courseId == undefined) {
						return false;
					}
					var obj = res.body[1][0];
					_this.playId = obj.videoId;
					_this.title = obj.name;
					_this.intru = obj.introduce;
					_this.getPlayAuth(_this.playId);
				});

			},

			getPlayAuth: function(vid) {
				var _this = this;
				this.$http.post(ROUTE + "CourseCatalog.ashx?action=getPlayUrlByVideoId", {
					videoid: vid
				}, {
					emulateJSON: true
				}).then(function(res) {
					createPlayerEnDetail(vid, res.body);
				});
			},

			getReletiveCourse: function() {
				var _this = this;
				this.$http.post(ROUTE + "Course.ashx?action=getRecommendCourse", {
					pageIndex: 1,
					pageSize: 4
				}, {
					emulateJSON: true
				}).then(function(res) {
					_this.reletiveArr = res.body.rows;
					_this.reletiveArr.forEach(function(item, index) {
						Vue.set(item, "iconPath", ROUTEFILE + item.iconPath); //注册变量
					})
				});
			},

			getReletiveVideo: function() {
				var _this = this;
				this.$http.post(ROUTE + "Course.ashx?action=getRelativeFinancialKnowledge", {
					courseId: '',
					pageIndex: 1,
					pageSize: 4
				}, {
					emulateJSON: true
				}).then(function(res) {
					_this.reletiveVideoArr = res.body.rows;
					_this.reletiveVideoArr.forEach(function(item, index) {
						Vue.set(item, "iconPath", ROUTEFILE + item.iconPath); //注册变量
					})
				});
			}
		}
	});
}

//create player
function createPlayerEnDetail(vid, auto) {
	new prismplayer({
		id: "encyclopediadetailPlayer", // 容器id
		//source: "http://live.bmizx.net/yicelive/streamyice.flv", // 视频地址
		// source: 'http://devimages.apple.com/iphone/samples/bipbop/bipbopall.m3u8',
		//source: URL,
		vid: vid,
		playauth: auto,
		autoplay: true, //自动播放：否
		width: "100%", // 播放器宽度
		height: "36.5rem", // 播放器高度
		playsinline: true,
		preload: false,
		//isLive: true,
		skinLayout: [{
			"name": "bigPlayButton",
			"align": "cc",
			"x": 30,
			"y": 80
		}, {
			"name": "controlBar",
			"align": "blabs",
			"x": 0,
			"y": 0,
			"children": [{
				"name": "playButton",
				"align": "tlabs",
				"x": 10,
				"y": 25
			}, {
				"name": "fullScreenButton",
				"align": "trabs",
				"x": 10,
				"y": 25
			}, {
				"name": "volume",
				"align": "trabs",
				"x": 50,
				"y": 25
			}, {
				"name": "progress",
				"align": "tlabs",
				"x": 0,
				"y": 0
			}]
		}],
		cover: './images/public/xtsj.jpg'
		//cover: 'http://liveroom-img.oss-cn-qingdao.aliyuncs.com/logo.png'
	});
}

//createPlayerEnDetail();

/*
 * 首页金融课堂
 */
function indexCourseSwiper() {
	var courseSwiper = new Swiper('.bmindex-swiper-course', {
		slidesPerView: 4, //'auto'
		spaceBetween: 20,
		loop: false,
		nextButton: '.swiper-button-course-next',
		prevButton: '.swiper-button-course-prev',
		breakpoints: {
			1024: {
				slidesPerView: 4,
				spaceBetween: 20
			},
			960: {
				slidesPerView: 3,
				spaceBetween: 15
			},
			640: {
				slidesPerView: 2,
				spaceBetween: 10
			}
		}
	})
}

/*
 * 
 */
function indexEncyclopediaSwiper() {
	var courseSwiper = new Swiper('.bmindex-swiper-encyclopedia', {
		slidesPerView: 3, //'auto'
		spaceBetween: 20,
		nextButton: '.swiper-button-encyclopedia-next',
		prevButton: '.swiper-button-encyclopedia-prev',
		breakpoints: {
			768: {
				slidesPerView: 2,
				spaceBetween: 20
			},
			640: {
				slidesPerView: 2,
				spaceBetween: 15
			}
		}
	})
}

function initEncyclopediaList(id,tid) {
	new Vue({
		el: '#jencyclopediaListApp',
		data: {
			encyclopediaListTypeArr: [],
			encyclopediaListArr: [],
			ectype: 'uptodate', //hottest
			courseTypeId: '',
			showItem: 12,
			current: 1,
			allpage: 0,
			isTrue: true //判断courseTypeId是否正确,

		},
		mounted: function() { //1.0ready --> 2.0
			this.$nextTick(function() {
				this.loadData();
			})
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
		methods: {
			loadData: function() {
				if(tid == undefined){
					tid = "";
				}
				var _this = this,
					isChildFlag = true;
				this.$http.post(ROUTE + "CourseType.ashx?action=getFinancialCourseType", {
					topTypeId:tid
				}, {
					emulateJSON: true
				}).then(function(res) {
					_this.encyclopediaListTypeArr = res.body;
					_this.encyclopediaListTypeArr.forEach(function(item, index) {
						Vue.set(item, "iconPath", ROUTEFILE + item.iconPath); //注册变量
						if(item.courseTypeId == id) {
							_this.getListData(id,1);
							isChildFlag = false;
						}
					});
					
					if(isChildFlag){
						_this.getListData('',1);
					}
					
				}).then(function() {
					_this.initType();
					_this.initSortType();
				});
			},
			initType: function() {
				var _this = this;
				if(id == undefined) {
					$(".bmencyclopediaListType a").first().addClass("active");
				} else {

					if(_this.isTrue) {
						_this.encyclopediaListTypeArr.forEach(function(item, index) {
							if(item.courseTypeId == id) {
								$(".bmencyclopediaListType a").eq((index + 1)).addClass("active");
								_this.isTrue = false;
							}
						});
					}

					if(_this.isTrue) {
						$(".bmencyclopediaListType a").first().addClass("active");
					}

				}

				$(".bmencyclopediaListType a").on("click", function() {
					if(!$(this).hasClass()) {
						$(".bmencyclopediaListType a").removeClass("active");
						$(this).addClass("active");
						_this.getListData(this.courseTypeId,1);
						_this.current = 1;
					}
				})
			},
			changeType: function(ecTypeId) {
				this.courseTypeId = ecTypeId;
			},

			initSortType: function() {
				var _this = this;
				$(".bmencyclopediaType a").first().addClass("active");
				$(".bmencyclopediaType a").on("click", function() {
					if(!$(this).hasClass()) {
						$(".bmencyclopediaType a").removeClass("active");
						$(this).addClass("active");
						_this.getListData();
					}
				})
			},
			changeSortType: function(ecSortTypeId) {
				this.ectype = ecSortTypeId;
			},
			getListData: function(id,currentPage) {
				var _this = this;
				_this.encyclopediaListArr ="";
				_this.changeCourseType(id);
				this.$http.post(ROUTE + "Course.ashx?action=getFinancialKnowledge", {
					type: _this.ectype,
					pageIndex: currentPage,
					pageSize: _this.showItem,
					courseTypeId: _this.courseTypeId
				}, {
					emulateJSON: true
				}).then(function(res) {
					_this.allpage = res.body.totalPageCount;
					_this.encyclopediaListArr = res.body.rows;
					_this.encyclopediaListArr.forEach(function(item1, index) {
						Vue.set(item1, "iconPath", ROUTEFILE + item1.iconPath); //注册变量
						Vue.set(item1, "name", item1.name); //注册变量
					})
				});
			},
			changeCourseType: function(id) {
				var _this = this;
				if(id != undefined) {
					_this.courseTypeId = id
				} else {
					_this.courseTypeId = _this.courseTypeId
				}
			},
			goto: function(index) { //枫叶处理
				if(index == this.current) return;
				if(index > this.allpage) {
					this.current = this.current - 2;
					layer.msg("Sorry ╮(╯_╰)╭ 没有下一页喽！");
					return false;
				}
				this.current = index;
				this.getListData(this.courseTypeId,index);
				$.scrollTo($(".bmencyclopediaType").height() - 100, 0);
			}
		}
	});
}

/*
 * 弹窗广告
 */
function adFunc() {
	var strHtml = '<div class="dycindenxadv " id="jadv" style="display: none;">' +
		'<div class="dyctadv">' +
		'<div style="position: relative;">' +
		'<a id="dycadv-img" target="_blank" class="dycadv-img" href="ycedu/dbadv.html">' +
		'<img src="ycedu/images/indexadv.png" />' +
		'</a>' +
		'<div class="dycadvclose-img" id="jadvclose">' +
		'<img src="ycedu/images/indexadvclose.png" />' +
		'</div></div></div></div>';

	$("body").append(strHtml);

	/*BizQQWPA.addCustom({
		aty: '0',
		a: '1005',
		nameAccount: 4006430618,
		selector: 'dycadv-img'
	});
*/
	setTimeout(function() {
		$('#jadv').css('display', 'block');
	}, 2000);
	$('#jadv').click(function() {
		$(this).css('display', 'none');
	});
}

/*
 * 往前课程播放器
 */

function backCoursePlayer(cId, vId) {
	new Vue({
		el: '#jbackPlayerApp',
		data: {

		},
		mounted: function() { //1.0ready --> 2.0
			this.$nextTick(function() {
				this.getPlayAuth(vId);
			})
		},
		methods: {
			getPlayAuth: function(vid) {
				var _this = this;
				this.$http.post(ROUTE + "CourseCatalog.ashx?action=getPlayUrlByVideoId", {
					videoid: vid
				}, {
					emulateJSON: true
				}).then(function(res) {
					_this.createBackPlayerEnDetail(vid, res.body);
				});
			},
			createBackPlayerEnDetail: function(vid, auto) {
				new prismplayer({
					id: "backcoursePlayer", // 容器id
					//source: "http://live.bmizx.net/yicelive/streamyice.flv", // 视频地址
					// source: 'http://devimages.apple.com/iphone/samples/bipbop/bipbopall.m3u8',
					//source: URL,
					vid: vid,
					playauth: auto,
					autoplay: true, //自动播放：否
					width: "100%", // 播放器宽度
					height: "452px", // 播放器高度
					playsinline: true,
					preload: false,
					//isLive: true,
					skinLayout: [{
						"name": "bigPlayButton",
						"align": "cc",
						"x": 30,
						"y": 80
					}, {
						"name": "controlBar",
						"align": "blabs",
						"x": 0,
						"y": 0,
						"children": [{
							"name": "playButton",
							"align": "tlabs",
							"x": 10,
							"y": 25
						}, {
							"name": "fullScreenButton",
							"align": "trabs",
							"x": 10,
							"y": 25
						}, {
							"name": "volume",
							"align": "trabs",
							"x": 50,
							"y": 25
						}, {
							"name": "progress",
							"align": "tlabs",
							"x": 0,
							"y": 0
						}]
					}],
					cover: './images/public/playBgIcon.jpg'
					//cover: 'http://liveroom-img.oss-cn-qingdao.aliyuncs.com/logo.png'
				});
			}
		}
	});
}