function courseSelectApp() {

	new Vue({
		el: '#feCourseSelectWrap',
		data: {
			bannerArr: [],
			courseType: [],
			courseTypeList: [],
			recordType: 0, //课程类型
			currentIndex: 0
		},
		mounted: function mounted() {
			//1.0ready --> 2.0
			this.$nextTick(function() {
				this.bannerSwiper();
				this.getCourseType();
			});
		},
		methods: {
			bannerSwiper: function() {
				var mySwiper = new Swiper(".feCourseContainer", {
					autoplay: true,
					pagination: {
						el: '.swiper-pagination',
					},
				})
			},
			getCourseType: function() { //获取课程类型
				var _this = this;
				_this.$http.post(SERVERROOTDATA + 'PlayType.ashx?action=getPlayType', {
					organId: 1
				}, {
					emulateJSON: true
				}).then(function(res) {
					// 响应成功回调
					if(res.body.code != 200) {
						return false;
					}
					_this.courseType = res.body.rows;

				}, function(response) {
					console.log(response);
					return false;
					// 响应错误回调
				}).then(function() {

					_this.getCourseTypeList();
					var mySwiper = new Swiper(".feCoursetypeContainer", {
						slidesPerView: 2,
						on: {
							click: function() {
								mySwiper.slideTo(_this.currentIndex, 300, false);
							}
						}
					})
				});

			},
			getCourseTypeList: function() { //获取学段年级
				var _this = this;
				_this.$http.post(SERVERROOTDATA + 'Grade.ashx?action=getPeriodGradeByRecordType', {
					recordType: _this.recordType
				}, {
					emulateJSON: true
				}).then(function(res) {
					// 响应成功回调
					if(res.body.code != 200) {
						return false;
					}
					_this.courseTypeList = res.body.rows;

				}, function(response) {
					console.log(response);
					return false;
					// 响应错误回调
				}).then(function() {
					_this.courseTypeList.forEach(function(item, index) {
						Vue.set(item, "eId", 'dist/coursecenter.html?educationalLevelId=' + item.educationalLevelId + '&gradeId=' + '&recordType=' + _this.recordType);
						item.children.forEach(function(itemChildren, indexChildren) {
							Vue.set(itemChildren, "gId", 'dist/coursecenter.html?educationalLevelId=' + item.educationalLevelId + '&gradeId=' + itemChildren.gradeId + '&recordType=' + +_this.recordType);
						});
					});
				});
			},
			changeSlide: function(t, e) {
				this.currentIndex = e;
				this.recordType = t;
				this.getCourseTypeList();
				//window.mySwiper.slideTo(index, 300, false);						
			},

		}
	});
}

//选课中心
function courseCenterApp(elId, gradeId, rtId) {
	new Vue({
		el: '#feCourseCenterWrap',
		data: {
			bannerArr: [],
			courseType: [],
			courseTypeList: [],
			subjectArr: [], //学科
			complexArr: [], //综合
			fiterCourseArr: [], //课程多选
			noData: false,
			currentIndex: 0,
			courseTemp: [], //临时存放课程列表
			courseArr: [], //课程列表
			courseTotal: 0, //课程总数
			isOpenLeft: false, //是否展开左侧筛选
			isOpenFilter: false, //是否展开筛选
			courseTypeName: '', //课程类别名称
			courseElevelName: '', //学段名称
			courseName: '', //课程名称
			recordType: rtId, //课程类别
			educationalLevelId: elId, //学段
			gradeId: gradeId, //年级
			subjectId: '', //学科
			complexId: '', //综合
			courseKind: 0, //微课
			isListen: 0, //可试听
			isFree: 0, //是否免费
			allLoaded: !1,
			bottomStatus: "",
			bottomText: "释放更新",
			courseIndex: 0,
			courseSize: 8,
			coursePageCount: 1,
		},
		mounted: function mounted() {
			//1.0ready --> 2.0
			this.$nextTick(function() {
				this.searchInit();
				this.getCourseType(); //获取左侧课程类型
				this.getCourseTypeList(); //获取年段年级初始化
				if(this.educationalLevelId != undefined || this.educationalLevelId != 'undefined') {
					this.getFilterSubject(); //获取学科
				}
				this.getFilterComplex(); //获取综合排序
				this.getFilterCourse(); //获取综合排序
			});
		},
		methods: {
			searchInit: function() {
				var _this = this;
				$("#feHeaderWhiteSearch input[type='search']").on("keypress", function(e) {
					if(e.keyCode == '13') {
						e.preventDefault();
						_this.courseArr = [];
						_this.currentIndex = 1;
						_this.hadInit = true;
						_this.noData = false;
						_this.bottomText = '释放更新';
						_this.courseName = $(this).val();
						_this.getCourseList();
					}
				});

				$("#feHeaderWhiteSearch input[type='search']").focus();
			},

			closeSelect: function(e) { //左侧课程选择
				var _this = this;
				if(!_this.isOpenLeft) {
					_this.isOpenLeft = true;
				} else {
					if(e != undefined && e != 'undefined' && e != null) {
						e.stopPropagation();
					} else {
						_this.isOpenLeft = false;
					}
				}
			},
			openFiter: function(e) { //筛选
				var _this = this;
				if(!_this.isOpenFilter) {
					_this.isOpenFilter = true;
				} else {
					_this.isOpenFilter = false;
				}
			},
			addActive: function(type, t) {
				//type=1 表示学科的筛选，type=2表示综合的筛选,type=3 表示课程多选内容
				var _this = this;
				if(type == 1) {
					_this.subjectId = t;
				} else if(type == 2) {
					_this.complexId = t;
				} else if(type == 3) {
					if(t == 'courseKind') {
						if(_this.courseKind == 0) { //如果选中微课
							_this.courseKind = 1;
						} else {
							_this.courseKind = 0;
						}

					} else if(t == 'allowListen') {
						if(_this.isListen == 0) { //如果选中可试听
							_this.isListen = 1;
						} else {
							_this.isListen = 0;
						}

					} else if(t == 'isFree') {
						if(_this.isFree == 0) { //如果选中免费
							_this.isFree = 1;
						} else {
							_this.isFree = 0;
						}
					}
				}
			},
			clearSelect: function() { //清空筛选
				var _this = this;
				_this.subjectId = ''; //学科
				_this.complexId = ''; //综合
				_this.courseKind = 0; //微课
				_this.isListen = 0; //可试听
				_this.isFree = 0;
			},
			gotoList: function(event, el, t) { //t是年级id
				var _this = this;
				_this.isOpenFilter = false;
				_this.isOpenLeft = false;

				if(el != _this.educationalLevelId) { //如果学段不一样 则更新学科
					_this.educationalLevelId = el;
					_this.getFilterSubject(); //获取学科更新
				}

				_this.gradeId = t;

				_this.courseIndex = 0; //都从第一页开始初始化数据
				_this.coursePageCount = 1;
				_this.loadBottom();
			},
			gotoCourse: function() {
				var _this = this;
				_this.isOpenFilter = false; //关闭筛选

				_this.courseIndex = 0; //都从第一页开始初始化数据
				_this.coursePageCount = 1;
				_this.loadBottom();
			},
			getCourseType: function() { //课程类型
				var _this = this;
				_this.$http.post(SERVERROOTDATA + 'PlayType.ashx?action=getPlayType', {
					organId: 1
				}, {
					emulateJSON: true
				}).then(function(res) {
					// 响应成功回调
					if(res.body.code != 200) {
						return false;
					}
					_this.courseType = res.body.rows;

				}, function(response) {
					console.log(response);
					return false;
					// 响应错误回调
				}).then(function() {
					_this.courseTypeName = $('.feCoursetypeContainer .active-nav a').text();
					var mySwiper = new Swiper(".feCoursetypeContainer", {
						slidesPerView: 2,
						on: {
							click: function() {
								mySwiper.slideTo(_this.currentIndex, 300, false);
							}
						}
					})
				});

			},
			getCourseTypeList: function() { //获取学段年级
				var _this = this;
				_this.$http.post(SERVERROOTDATA + 'Grade.ashx?action=getPeriodGradeByRecordType', {
					recordType: _this.recordType
				}, {
					emulateJSON: true
				}).then(function(res) {
					// 响应成功回调
					if(res.body.code != 200) {
						return false;
					}
					_this.courseTypeList = res.body.rows;

				}, function(response) {
					console.log(response);
					return false;
					// 响应错误回调
				}).then(function() {
					_this.courseElevelName = $('.feCoursetypeList .active').text();
				})
			},
			getFilterSubject: function() { //获取学科
				var _this = this;
				_this.$http.post(SERVERROOTDATA + 'Subject.ashx?action=getSubjectByPeriod', {
					educationalLevelId: _this.educationalLevelId
				}, {
					emulateJSON: true
				}).then(function(res) {
					// 响应成功回调
					if(res.body.code != 200) {
						return false;
					}
					_this.subjectArr = res.body.rows;

				}, function(response) {
					console.log(response);
					return false;
					// 响应错误回调
				})
			},
			getFilterComplex: function() { //获取综合排序
				var _this = this;
				_this.$http.post(SERVERROOTDATA + 'Course.ashx?action=getCourseSortType', {

				}, {
					emulateJSON: true
				}).then(function(res) {
					// 响应成功回调
					if(res.body.code != 200) {
						return false;
					}
					_this.complexArr = res.body.rows;

				}, function(response) {
					console.log(response);
					return false;
					// 响应错误回调
				})
			},
			getFilterCourse: function() { //获取课程内容更多
				var _this = this;
				_this.$http.post(SERVERROOTDATA + 'Course.ashx?action=getCourseContainContent', {

				}, {
					emulateJSON: true
				}).then(function(res) {
					// 响应成功回调
					if(res.body.code != 200) {
						return false;
					}
					_this.fiterCourseArr = res.body.rows;

				}, function(response) {
					console.log(response);
					return false;
					// 响应错误回调
				})
			},
			changeSlide: function(t, e) {
				this.currentIndex = e;
				this.recordType = t;
				this.educationalLevelId = '';
				this.gradeId = '';
				this.getCourseTypeList(); //年段年级列表
				this.courseTypeName = $('.feCoursetypeContainer .active-nav a').text();
				this.courseElevelName = $('.feCoursetypeList .active').text();

			},
			getCourseList: function() { //获取课程列表

				var _this = this;
				_this.$http.post(SERVERROOTDATA + 'Course.ashx?action=getAppCourseListByQuery', {
					pageIndex: _this.courseIndex,
					pageSize: _this.courseSize,
					organId: "",
					courseName: _this.courseName,
					recordType: _this.recordType, //类别
					educationalLevelId: _this.educationalLevelId, //学段
					gradeId: _this.gradeId, //年级
					subjectId: _this.subjectId, //学科
					sortType: _this.complexId, //综合
					ascType: 'asc',
					courseKind: _this.courseKind, //微课
					allowListen: _this.isListen, //可试听
					isFree: _this.isFree, //是否免费
				}, {
					emulateJSON: true
				}).then(function(res) {
					// 响应成功回调
					if(res.body.code != 200) {
						return false;
					}
					_this.courseTemp = res.body.rows;
					_this.courseTotal = res.body.totalCount;
					_this.coursePageCount = res.body.totalPageCount;
					if(_this.coursePageCount == 0) {
						_this.noData = true;
					}
				}, function(response) {
					console.log(response);
					return false;
					// 响应错误回调

				}).then(function() {
					_this.courseTemp.forEach(function(item, index) {
						Vue.set(item, "cId", 'coursedetail.html?courseId=' + item.courseId + '&courseKind=' + item.courseKind);
						Vue.set(item, "iconPath", SERVERROOTFILE + item.mobileIconPath);
					});
					if(_this.courseIndex == 1) { //如果是第一页，之前数据清空
						setTimeout(function() {
							$(".feCourseCenterList").scrollTop(0)
						}, 2e3);
						_this.courseArr = [];
					}
					_this.courseArr = _this.courseArr.concat(_this.courseTemp);

					_this.courseTypeName = $('.feCoursetypeContainer .active-nav a').text();
					_this.courseElevelName = $('.feCoursetypeList .active').text();
				})
			},
			loadBottom: function() { // 加载更多数据的操作
				//load data
				var e = this;
				this.courseIndex <= this.coursePageCount ? (this.bottomText = "释放更新!", this.courseIndex++, this.getCourseList()) : this.bottomText = "我是有底线的!", setTimeout(function() {
					e.$refs.loadmore.onBottomLoaded()
				}, 2e3)

			},
			handleBottomChange: function(e) {
				this.bottomStatus = e
			}

		}
	});
}

//work 作业
function workApp() {
	new Vue({
		el: "#jWorkApp",
		data: {
			newsTypeArr: [],
			newsListItem: [],
			currentNewsTypeId: "",
			currentIndex: 0,
			isOpenLeft: false,
			bottomTab: 0,
			newsListArr: [],
			newsListStatusArr: [],
			allLoaded: !1,
			bottomStatus: "",
			mySwiper: {},
			myListSwiper: {},
			bottomText: "释放更新"
		},
		filters: {
			addImagePre: function(e) {
				return SERVERROOTFILE + e
			},
			addStudioHrefPre: function(e) {
				return ROOT + "dist/studiocenter.html?teachingStudioId=" + e
			}
		},
		mounted: function() {
			this.$nextTick(function() {
				this.newTypeData()
			})
		},
		methods: {
			workTab: function(id) {
				var _this = this;
				_this.bottomTab = id;
				_this.newTypeData();
			},
			closeSelect: function() {
				var _this = this;
				_this.isOpenLeft = !_this.isOpenLeft;
				console.log(_this.isOpenLeft)
			},
			selects: function() {
				console.log(111)
			},
			newTypeData: function() {
				var e = this;
				axios({
					method: "post",
					url: "Subject.ashx?action=getStudioSubject",
					data: {
						organId: e.bottomTab,
						pageSize: 30
					}
				}).then(function(t) {
					e.newsTypeArr = t.data.rows, e.newsListItem = e.newsTypeArr.length, e.currentNewsTypeId = e.newsTypeArr[0].subjectId;
					for(var n = 0; n < e.newsListItem; n++) e.newsListArr.push([]), e.newsListStatusArr.push({
						pageIndex: 1,
						pageSize: 2,
						hadInit: !1,
						totalPageCount: 1,
						firstLoad: true
					})

				}).then(function() {
					e.getListData(), e.getSwiper()

				}).catch(function(e) {
					console.log(e)
				})
			},
			changeSlide: function(e, t) {
				this.currentNewsTypeId = e, this.currentIndex = t,
					this.newsListStatusArr[this.currentIndex].hadInit || (this.newsListStatusArr[this.currentIndex].hadInit = !0, this.getListData())

			},
			getListData: function() {
				var e = this;
				axios({
					method: "post",
					url: "TeachingStudio.ashx?action=getTeachingStudio",
					data: {
						subjectId: e.currentNewsTypeId,
						pageIndex: e.newsListStatusArr[e.currentIndex].pageIndex,
						pageSize: e.newsListStatusArr[e.currentIndex].pageSize
					}
				}).then(function(t) {
					var n = t.data.rows;
					e.newsListStatusArr[e.currentIndex].hadInit || (e.newsListStatusArr[e.currentIndex].hadInit = !0, e.newsListStatusArr[e.currentIndex].totalPageCount = t.data.totalPageCount), ((e.newsListStatusArr[e.currentIndex].firstLoad) && (n.length < 1)) ? Vue.set(e.newsListArr[e.currentIndex], "noData", true) : (Vue.set(e.newsListArr[e.currentIndex], "noData", false), n.forEach(function(t, n) {
						Vue.set(t, "iconPath", SERVERROOTFILE + t.mobileIconPath), Vue.set(t, "show", false), e.newsListArr[e.currentIndex].push(t)
					})), (e.newsListStatusArr[e.currentIndex].firstLoad = false)
				}).then(function() {
					console.log(e.newsListStatusArr[e.currentIndex].totalPageCount)
					e.myListSwiper.update();
					if(e.newsListStatusArr[e.currentIndex].pageIndex == 1) { //如果是第一页向上滚动到头部
						setTimeout(function() {
							$(".feWorkList").scrollTop(0)
						}, 1000);

					}
				}).catch(function(e) {
					console.log(e)
				})
			},
			getSwiper: function() {
				var e = this;
				e.mySwiper = new Swiper(".feTypeContainer", {
					autoHeight: true,
					slidesPerView: "auto",
					on: {
						click: function() {
							e.mySwiper.slideTo(e.currentIndex, 300, false);
							e.myListSwiper.slideTo(e.currentIndex, 300, false);
						}
					}
				});

				e.myListSwiper = new Swiper(".feWorkListContainer", {
					autoHeight: true,
					on: {
						slideChangeTransitionStart: function() {
							e.mySwiper.slideTo(this.activeIndex, 300, false);
							e.changeSlide($(".feTypeContainer .active-nav a").attr('data-id'), this.activeIndex);
						},
					},
				});
			},
			showMenu: function(index, childIndex) {
				var _this = this;
				_this.newsListArr.forEach(function(e, t) {
					e.forEach(function(child, childt) {
						if((t == index) && (childt == childIndex)) {
							child.show = !child.show;
							setTimeout(function() {
								_this.myListSwiper.update();
							}, 300)

						}
					})

				});

			},
			loadBottom: function() {
				void 0 !== this.newsListStatusArr[this.currentIndex] && (this.newsListStatusArr[this.currentIndex].pageIndex <= this.newsListStatusArr[this.currentIndex].totalPageCount ? (this.bottomText = "释放更新!", this.newsListStatusArr[this.currentIndex].pageIndex = this.newsListStatusArr[this.currentIndex].pageIndex + 1, this.getListData()) : this.bottomText = "我是有底线的!");
				var e = this;
				setTimeout(function() {
					e.$refs.loadmore.onBottomLoaded();
				}, 2e3)

			},
			handleBottomChange: function(e) {
				this.bottomStatus = e
			}
		}
	})
}

//班级作业
function classWorkApp() {
	var userId = varEmptyDeal($(window).storager({
		key: 'feUid'
	}).readStorage());
	var userType = varEmptyDeal($(window).storager({
		key: 'feUType'
	}).readStorage());
	new Vue({
		el: '#jClassWorkApp',
		data: {
			listArr: [],
			nodata: false,//默认为true,暂时为false
			
		},
		filters: {

		},
		mounted: function() {
			this.$nextTick(function() {
				this.getlist();
			})
		},
		methods: {
			getlist: function() {
				var _this = this;
			},
			addNewClass: function() {
				var _this = this;
				layer.open({
					title: [
						'申请加入班级',
					],
					anim: 'up',
					className: 'feApply',
					content: '<input type="search" value="" placeholder="请输入班级号" />',
					style: ''
					,btn: ['查询班级号', '取消']
					,yes: function(index){
				      location.href='dist/applydetail.html'
				    }
				});
			},
			addTips:function(){
				layer.open({
				    content: '正在审核，请耐心等待老师通过你的请求。。。'
				    ,skin: 'msg'
				    ,time: 2 //2秒后自动关闭
				  });
			}
		}
	})
}


//work 班级作业内容列表
function classWorkListApp() {
	new Vue({
		el: "#jClassWorkListApp",
		data: {
			newsTypeArr: [],
			newsListItem: [],
			currentNewsTypeId: "",
			currentIndex: 0,
			isOpenLeft: false,
			bottomTab: 0,
			newsListArr: [],
			newsListStatusArr: [],
			allLoaded: !1,
			bottomStatus: "",
			mySwiper: {},
			myListSwiper: {},
			bottomText: "释放更新"
		},
		filters: {
			addImagePre: function(e) {
				return SERVERROOTFILE + e
			},
			addStudioHrefPre: function(e) {
				return ROOT + "dist/studiocenter.html?teachingStudioId=" + e
			}
		},
		mounted: function() {
			this.$nextTick(function() {
				this.newTypeData()
			})
		},
		methods: {
			workTab: function(id) {
				var _this = this;
				_this.bottomTab = id;
				_this.newTypeData();
			},
			closeSelect: function() {
				var _this = this;
				_this.isOpenLeft = !_this.isOpenLeft;
				console.log(_this.isOpenLeft)
			},
			selects: function() {
				console.log(111)
			},
			newTypeData: function() {
				var e = this;
				axios({
					method: "post",
					url: "Subject.ashx?action=getStudioSubject",
					data: {
						organId: e.bottomTab,
						pageSize: 30
					}
				}).then(function(t) {
					e.newsTypeArr = t.data.rows, e.newsListItem = e.newsTypeArr.length, e.currentNewsTypeId = e.newsTypeArr[0].subjectId;
					for(var n = 0; n < e.newsListItem; n++) e.newsListArr.push([]), e.newsListStatusArr.push({
						pageIndex: 1,
						pageSize: 2,
						hadInit: !1,
						totalPageCount: 1,
						firstLoad: true
					})

				}).then(function() {
					e.getListData(), e.getSwiper()

				}).catch(function(e) {
					console.log(e)
				})
			},
			changeSlide: function(e, t) {
				this.currentNewsTypeId = e, this.currentIndex = t,
					this.newsListStatusArr[this.currentIndex].hadInit || (this.newsListStatusArr[this.currentIndex].hadInit = !0, this.getListData())

			},
			getListData: function() {
				var e = this;
				axios({
					method: "post",
					url: "TeachingStudio.ashx?action=getTeachingStudio",
					data: {
						subjectId: e.currentNewsTypeId,
						pageIndex: e.newsListStatusArr[e.currentIndex].pageIndex,
						pageSize: e.newsListStatusArr[e.currentIndex].pageSize
					}
				}).then(function(t) {
					var n = t.data.rows;
					e.newsListStatusArr[e.currentIndex].hadInit || (e.newsListStatusArr[e.currentIndex].hadInit = !0, e.newsListStatusArr[e.currentIndex].totalPageCount = t.data.totalPageCount), ((e.newsListStatusArr[e.currentIndex].firstLoad) && (n.length < 1)) ? Vue.set(e.newsListArr[e.currentIndex], "noData", true) : (Vue.set(e.newsListArr[e.currentIndex], "noData", false), n.forEach(function(t, n) {
						Vue.set(t, "iconPath", SERVERROOTFILE + t.mobileIconPath), Vue.set(t, "show", false), e.newsListArr[e.currentIndex].push(t)
					})), (e.newsListStatusArr[e.currentIndex].firstLoad = false)
				}).then(function() {
					console.log(e.newsListStatusArr[e.currentIndex].totalPageCount)
					e.myListSwiper.update();
					if(e.newsListStatusArr[e.currentIndex].pageIndex == 1) { //如果是第一页向上滚动到头部
						setTimeout(function() {
							$(".feWorkList").scrollTop(0)
						}, 1000);

					}
				}).catch(function(e) {
					console.log(e)
				})
			},
			getSwiper: function() {
				var e = this;
				e.mySwiper = new Swiper(".feTypeContainer", {
					autoHeight: true,
					slidesPerView: "auto",
					on: {
						click: function() {
							e.mySwiper.slideTo(e.currentIndex, 300, false);
							e.myListSwiper.slideTo(e.currentIndex, 300, false);
						}
					}
				});

				e.myListSwiper = new Swiper(".feWorkListContainer", {
					autoHeight: true,
					on: {
						slideChangeTransitionStart: function() {
							e.mySwiper.slideTo(this.activeIndex, 300, false);
							e.changeSlide($(".feTypeContainer .active-nav a").attr('data-id'), this.activeIndex);
						},
					},
				});
			},
			showMenu: function(index, childIndex) {
				var _this = this;
				_this.newsListArr.forEach(function(e, t) {
					e.forEach(function(child, childt) {
						if((t == index) && (childt == childIndex)) {
							child.show = !child.show;
							setTimeout(function() {
								_this.myListSwiper.update();
							}, 300)

						}
					})

				});

			},
			loadBottom: function() {
				void 0 !== this.newsListStatusArr[this.currentIndex] && (this.newsListStatusArr[this.currentIndex].pageIndex <= this.newsListStatusArr[this.currentIndex].totalPageCount ? (this.bottomText = "释放更新!", this.newsListStatusArr[this.currentIndex].pageIndex = this.newsListStatusArr[this.currentIndex].pageIndex + 1, this.getListData()) : this.bottomText = "我是有底线的!");
				var e = this;
				setTimeout(function() {
					e.$refs.loadmore.onBottomLoaded();
				}, 2e3)

			},
			handleBottomChange: function(e) {
				this.bottomStatus = e
			}
		}
	})
}


//申请加入班级
function workApplyApp(){
	var userId = varEmptyDeal($(window).storager({
		key: 'feUid'
	}).readStorage());
	var userType = varEmptyDeal($(window).storager({
		key: 'feUType'
	}).readStorage());
	new Vue({
		el:'#ApplyDetailApp',
		data:{
			classArr:[],
			nodata:false,//默认为true,没数据暂时为false
			isAdd:false
		},
		filters:{
			
		},
		mounted:function(){
			this.$nextTick(function(){
				this.getlist()
			})
		},
		methods:{
			getlist:function(){
				var _this = this;
				//获取班级信息
				if(_this.isAdd){
					layer.open({
				    content:'该班级你已加入！'
				    ,skin: 'msg'
				    ,time: 2 //2秒后自动关闭
				  });
				}
				
			},
			goApply:function(){
				var _this = this;
				//提交申请
				layer.open({
				    content:'申请成功！'
				    ,skin: 'msg'
				    ,time: 2 //2秒后自动关闭
				  });
				  setTimeout(function(){
				  	location.href='../classwork.html'
				  },2000)
			}
		}
	})
}

//作业题目
function workDetailApp() {
	new Vue({
		el: "#feWorkDetailApp",
		data: {
			titleArr: [],
			topOpen: false,
			currentIndex: 0,
			mySwiper: {},

		},
		filters: {

		},
		mounted: function() {
			this.$nextTick(function() {
				this.slideDown(), this.getTitle()
			})
		},
		methods: {
			slideDown: function() {
				var _this = this;
				var mybody = document.getElementsByClassName('container')[0];
				//滑动处理
				new AlloyFinger(mybody, {
					swipe: function(evt) {
						//evt.direction代表滑动的方向
						var side = evt.direction;
						if(side == 'Down') {
							_this.topOpen = true;
						}
					}
				});

			},
			getTitle: function() {
				var _this = this;
				_this.$http.post('http://www.fetv.cn/fe/QuestionsForTeacher/QuestionsInput.ashx?action=GetPaper', {
					paperid: 23
				}, {
					emulateJSON: true
				}).then(function(res) {
					if(res.body.code != 200) {
						return false;
					}

					res.body.returnJson.typeQuestions.forEach(function(item, index) {
						if(item.questionType == 1) {
							_this.titleArr = item.questions;
							return false;
						}
					})

				}).then(function() {
					_this.getSwiper()
				})
			},
			getSwiper: function() {
				var _this = this;

				_this.mySwiper = new Swiper(".feWorkDetailContainer", {
					autoHeight: true,
					on: {
						slideChangeTransitionStart: function() {
							_this.currentIndex = this.activeIndex;
							/*e.mySwiper.slideTo(this.activeIndex, 300, false);
							e.changeSlide($(".feTypeContainer .active-nav a").attr('data-id'), this.activeIndex);*/
						},
					},
				});
			},
			answerSelect: function(cIndex, answer) {
				var _this = this;
				Vue.set(_this.titleArr[_this.currentIndex], 'myanswer', answer); //答题人选中的答案
				_this.titleArr[_this.currentIndex].items.forEach(function(childItem, cindex) {
					if(cIndex == cindex) {
						Vue.set(childItem, 'answer', true); //选中时为true
					} else {
						Vue.set(childItem, 'answer', false); //单选，其他为false
					}
				});

			},
			goPrev: function() {
				var _this = this;
				var t = --_this.currentIndex;
				if(t < 0) {
					_this.currentIndex = 0;
				}
				_this.mySwiper.slideTo(_this.currentIndex, 300, false);
			},
			goNext: function() {
				var _this = this;
				var t = ++_this.currentIndex;
				var max = _this.titleArr.length - 1;

				if(t >= max) {
					_this.currentIndex = max;
				}
				_this.mySwiper.slideTo(_this.currentIndex, 300, false);
			},
			closeTop: function() {
				var _this = this;
				_this.topOpen = false;
			},
			subMit: function() {
				var _this = this;
				_this.titleArr.forEach(function(item, index) {
					if(!item.myanswer) {
						layer.open({
							content: '你还有题目没有完成，现在提交吗？',
							btn: ['现在提交', '继续完成'],
							yes: function(index) {
								location.href = 'workreport.html';
								layer.close(index);
							}
						});
					} else {
						layer.open({
							content: '提交成功',
							skin: 'msg',
							time: 2 //2秒后自动关闭
						});
						setTimeout(function() {
							location.href = 'workreport.html';
						}, 2000)
					}

				})

			}

		}
	})
}

function workReportApp() {
	new Vue({
		el: '#feWorkReportApp',
		data: {

		},
		filters: {

		},
		mounted: function() {
			this.$nextTick(function() {
				this.getTitle();
			})
		},
		methods: {
			getTitle: function() {
				var _this = this;

			}
		}
	})
}

//作业解析
function workAnalyzeApp() {
	var userId = varEmptyDeal($(window).storager({
		key: 'feUid'
	}).readStorage());
	var userType = varEmptyDeal($(window).storager({
		key: 'feUType'
	}).readStorage());

	new Vue({
		el: "#feWorkAnalyzeApp",
		data: {
			titleArr: [],
			currentIndex: 0,
			mySwiper: {},

		},
		filters: {

		},
		mounted: function() {
			this.$nextTick(function() {
				this.getTitle()
			})
		},
		methods: {
			getTitle: function() {
				var _this = this;
				_this.$http.post('http://www.fetv.cn/fe/QuestionsForTeacher/QuestionsInput.ashx?action=GetPaperResultDetail', {
					paperid: 27,
					studentId: 20
				}, {
					emulateJSON: true
				}).then(function(res) {
					if(res.body.code != 200) {
						return false;
					}
					res.body.returnJson.typeQuestionResultDetail.forEach(function(item, index) {
						if(item.questionType == 2) { //提取单选题1,没数据 暂时用2代替
							_this.titleArr = item.question_resultdetail;
						}
					})

				}).then(function() {
					_this.getSwiper()
				})
			},
			getSwiper: function() {
				var _this = this;

				_this.mySwiper = new Swiper(".feWorkDetailContainer", {
					autoHeight: true,
					on: {
						slideChangeTransitionStart: function() {
							_this.currentIndex = this.activeIndex;
						},
					},
				});
			}
		}
	})
}

//studio 工作室
function studioApp() {
	new Vue({
		el: "#jStudioApp",
		data: {
			newsBannerArr: [],
			newsTypeArr: [],
			newsListItem: [],
			currentNewsTypeId: "",
			currentIndex: 0,
			newsListArr: [],
			newsListStatusArr: [],
			allLoaded: !1,
			bottomStatus: "",
			newsListSwiper: {},
			bottomText: "释放更新"
		},
		filters: {
			addImagePre: function(e) {
				return SERVERROOTFILE + e
			},
			addStudioHrefPre: function(e) {
				return ROOT + "dist/studiocenter.html?teachingStudioId=" + e
			}
		},
		mounted: function() {
			this.$nextTick(function() {
				this.getBannerAndHotNews(), this.newTypeData(), this.searchInit()
			})
		},
		methods: {
			searchInit: function() {
				$("#feHeaderWhiteSearch input[type='search']").on("click", function() {
					window.location.href = "./dist/studiosearchlist.html"
				})
			},
			getBannerAndHotNews: function() {
				var e = this;
				axios({
					method: "post",
					url: "News.ashx?action=getEducationNewsBanner",
					data: {
						organId: TempOrgId,
						pageSize: 3
					}
				}).then(function(t) {
					e.newsBannerArr = t.data.rows, e.newsBannerArr.forEach(function(e, t) {
						Vue.set(e, "iconPath", SERVERROOTFILE + e.iconPath)
					})
				}).then(function() {
					e.newsBanner()
				}).catch(function(e) {
					console.log(e)
				})
			},
			newsBanner: function() {
				new Swiper(".feNewsBannerContainer", {
					autoplay: {
						delay: 3e3
					},
					pagination: {
						el: ".feBanner-swiper-pagination",
						clickable: !0
					}
				})
			},
			newTypeData: function() {
				var e = this;
				axios({
					method: "post",
					url: "Subject.ashx?action=getStudioSubject",
					data: {
						organId: TempOrgId,
						pageSize: 30
					}
				}).then(function(t) {
					e.newsTypeArr = t.data.rows, e.newsListItem = e.newsTypeArr.length, e.currentNewsTypeId = e.newsTypeArr[0].subjectId;
					for(var n = 0; n < e.newsListItem; n++) e.newsListArr.push([]), e.newsListStatusArr.push({
						pageIndex: 1,
						pageSize: 2,
						hadInit: !1,
						totalPageCount: 1,
						firstLoad: true
					})

				}).then(function() {
					$(".feNewsTypeListContainer .swiper-slide").eq(0).addClass("active-nav"), e.getListData(), e.newsList()
				}).catch(function(e) {
					console.log(e)
				})
			},
			changeSlide: function(e, t) {
				this.currentNewsTypeId = e, this.currentIndex = t,

					this.newsListStatusArr[this.currentIndex].hadInit || (this.newsListStatusArr[this.currentIndex].hadInit = !0, this.getListData())

			},
			getListData: function() {
				var e = this;
				axios({
					method: "post",
					url: "TeachingStudio.ashx?action=getTeachingStudio",
					data: {
						subjectId: e.currentNewsTypeId,
						pageIndex: e.newsListStatusArr[e.currentIndex].pageIndex,
						pageSize: e.newsListStatusArr[e.currentIndex].pageSize
					}
				}).then(function(t) {
					var n = t.data.rows;
					e.newsListStatusArr[e.currentIndex].hadInit || (e.newsListStatusArr[e.currentIndex].hadInit = !0, e.newsListStatusArr[e.currentIndex].totalPageCount = t.data.totalPageCount), ((e.newsListStatusArr[e.currentIndex].firstLoad) && (n.length < 1)) ? Vue.set(e.newsListArr[e.currentIndex], "noData", true) : (Vue.set(e.newsListArr[e.currentIndex], "noData", false), n.forEach(function(t, n) {
						Vue.set(t, "iconPath", SERVERROOTFILE + t.mobileIconPath), e.newsListArr[e.currentIndex].push(t)
					})), (e.newsListStatusArr[e.currentIndex].firstLoad = false)
				}).then(function() {
					e.newsListSwiper.update();
					if(e.newsListStatusArr[e.currentIndex].pageIndex == 1) { //如果是第一页向上滚动到头部
						setTimeout(function() {
							$(".feStudioList").scrollTop(0)
						}, 4000);

					}
				}).catch(function(e) {
					console.log(e)
				})
			},
			newsList: function() {
				var e = this,
					t = new Swiper(".feNewsListContainer", {
						on: {
							slideChange: function() {
								! function() {
									var s, i;
									if(i = t.activeIndex, $(".feNewsTypeListContainer .active-nav").removeClass("active-nav"), s = $(".feNewsTypeListContainer .swiper-slide").eq(i).addClass("active-nav"), e.currentNewsTypeId = s.attr("data-typeid"), e.changeSlide(e.currentNewsTypeId, i), !s.hasClass("swiper-slide-visible"))
										if(s.index() > n.activeIndex) {
											var a = Math.floor(n.width / s.width()) - 1;
											n.slideTo(s.index() - a)
										} else n.slideTo(s.index())
								}()
							}
						},
						spaceBetween: 34,
						autoHeight: !0
					});
				this.newsListSwiper = t;
				var n = new Swiper(".feNewsTypeListContainer", {
					visibilityFullFit: !0,
					slidesPerView: "auto",
					on: {
						click: function() {
							t.slideTo(n.clickedIndex)
						}
					}
				})
			},
			loadBottom: function() {
				console.log(1)
				void 0 !== this.newsListStatusArr[this.currentIndex] && (this.newsListStatusArr[this.currentIndex].pageIndex <= this.newsListStatusArr[this.currentIndex].totalPageCount ? (this.bottomText = "释放更新!", this.newsListStatusArr[this.currentIndex].pageIndex = this.newsListStatusArr[this.currentIndex].pageIndex + 1, this.getListData()) : this.bottomText = "我是有底线的!");
				var e = this;
				setTimeout(function() {

					e.$refs.loadmore.onBottomLoaded();
					console.log(111)
				}, 2e3)

			},
			handleBottomChange: function(e) {
				this.bottomStatus = e
			},
			itemClick: function(data) {
				console.log('item click, msg : ' + data);
			}
		}
	})
}

/*
 * studio search list
 */
function studioSearchApp() {
	new Vue({
		el: "#jStudioSearchApp",
		data: {
			studioListArr: [], //列表
			pageIndex: 1,
			pageSize: 6,
			totalPageCount: 0,
			searchValue: '',
			searchEmpty: false,
			hadInit: true,
			allLoaded: false, //所有数据加载完成
			bottomStatus: '', //bottom loading status
			bottomText: '释放更新', // 上拉加载更多 显示的文本
		},
		filters: {
			addImagePre: function(img) {
				return SERVERROOTFILE + img;
			},
			addStudioHrefPre: function(sId) {
				return ROOT + "dist/studiocenter.html?teachingStudioId=" + sId;
			}
		},

		mounted: function mounted() {
			//1.0ready --> 2.0
			this.$nextTick(function() {
				this.initSearchNews();
			});
		},

		methods: {
			initSearchNews: function() {
				var _this = this;
				$("#feHeaderWhiteSearch input[type='search']").on("keypress", function(e) {
					if(e.keyCode == '13') {
						e.preventDefault();
						_this.studioListArr = [];
						_this.pageIndex = 1;
						_this.hadInit = true;
						_this.searchEmpty = false;
						_this.bottomText = '释放更新';
						_this.searchValue = $(this).val();
						_this.getSearchList(_this.searchValue);
					}
				});

				$("#feHeaderWhiteSearch input[type='search']").focus();

			},

			getSearchList: function(value) {
				var _this = this;
				//终极版
				axios({
					method: 'post',
					url: 'TeachingStudio.ashx?action=getTeachingStudio',
					data: {
						name: value,
						pageIndex: _this.pageIndex,
						pageSize: _this.pageSize,
					}
				}).then(function(response) {
					var tempArr = response.data.rows;
					console.log(_this.hadInit);
					if(_this.hadInit) {
						_this.hadInit = false;
						if(tempArr.length == 0) {
							_this.searchEmpty = true;
						}
					}
					_this.totalPageCount = response.data.totalPageCount;
					tempArr.forEach(function(item, index) {
						Vue.set(item, "iconPath", SERVERROOTFILE + item.iconPath); //注册变量
						_this.studioListArr.push(item);
					});

				}).catch(function(error) {
					console.log(error);
				});
			},

			loadBottom: function() { // 加载更多数据的操作
				if(this.pageIndex < this.totalPageCount) {
					this.bottomText = "释放更新!";
					this.pageIndex++;
					this.getSearchList(this.searchValue);
				} else {
					this.bottomText = "我是有底线的!";
				}

				//this.allLoaded = true;// 若数据已全部获取完毕
				var _this = this;
				setTimeout(function() {
					_this.$refs.loadmore.onBottomLoaded();
				}, 2000);
			},
			handleBottomChange: function(status) {
				this.bottomStatus = status;
			},

		}
	})
}

//studio-center 工作室中心
function studioCenterApp(id) {
	new Vue({
		el: "#feStudioCenterWrap",
		data: {
			studioArr: [],
			newNotice: [], //最新公告
			newsArr: [],
			courseArr: [],
			memberArr: [],
			sourceArr: [],
			noNotice: false,
			noNewsData: false,
			noCourseData: false,
			noMemberData: false
		},
		filters: {
			addImagePre: function(e) {
				return SERVERROOTFILE + e
			},
			addNoticePre: function(e) {
				return ROOT + "dist/studionotice.html?noticeId=" + e
			},
			addNewsPre: function(e) {
				return ROOT + "dist/newsdetail.html?newsId=" + e
			},
			addCoursePre: function(e, k) {
				return ROOT + "dist/coursedetail.html?courseId=" + e + '&courseKind=' + k
			},
			addTeacherPre: function(e) {
				return ROOT + 'dist/teachercenter.html?tId=' + e
			},
			addNewsListHref: function(e) {
				return ROOT + "dist/studionewslist.html?teachingStudioId=" + id + '&type=' + e
			},
			addCourseListHref: function() {
				return ROOT + "dist/studiocourselist.html?teachingStudioId=" + id
			},
			addTeacherListHref: function() {
				return ROOT + "dist/studiomemberlist.html?teachingStudioId=" + id
			}
		},
		mounted: function() {
			this.$nextTick(function() {
				this.getStudio();
				this.getNewNotice();
				this.getStudioNews();
				this.getStudioCourse();
				this.getStudioMember();
				this.getStudioSource();
			})
		},
		methods: {
			getStudio: function() {
				var _this = this;
				_this.$http.post(SERVERROOTDATA + 'TeachingStudio.ashx?action=getTeachingStudioById', {
					teachingStudioId: id
				}, {
					emulateJSON: true
				}).then(function(res) {
					// 响应成功回调
					if((res.body.code != 200) && (res.body.rows.length > 0)) {
						return false;
					}
					_this.studioArr = res.body.rows[0];
				}, function(response) {
					console.log(response);
					return false;
					// 响应错误回调

				}).then(function() {
					Vue.set(_this.studioArr, "iconPath", SERVERROOTFILE + _this.studioArr.mobileIconPath)
				})
			},
			getNewNotice: function() {
				var _this = this;
				_this.$http.post(SERVERROOTDATA + 'Activity.ashx?action=getAppTeachingStudioNotice', {
					teachingStudioId: id,
					pageIndex: 1,
					pageSize: 6
				}, {
					emulateJSON: true
				}).then(function(res) {
					// 响应成功回调
					if(res.body.code != 200) {
						return false;
					}
					if(res.body.rows.length < 1) {
						_this.noNotice = true;
					} else {
						_this.newNotice = res.body.rows;
					}

				}, function(response) {
					console.log(response);
					return false;
					// 响应错误回调

				}).then(function() {
					var mySwiper = new Swiper('.feStudioNoticeContainer', {
						loop: true,
						direction: 'vertical',
						autoplay: true,
					})
				})
			},
			getStudioNews: function() {
				var _this = this;
				_this.$http.post(SERVERROOTDATA + 'News.ashx?action=getTeachingStudioNews', {
					teachingStudioId: id,
					pageIndex: 1,
					pageSize: 3
				}, {
					emulateJSON: true
				}).then(function(res) {
					// 响应成功回调
					if(res.body.code != 200) {
						return false;
					}

					_this.newsArr = res.body.rows;

				}, function(response) {
					console.log(response);
					return false;
					// 响应错误回调

				}).then(function() {
					if(_this.newsArr.length < 1) {
						_this.noNewsData = true;
					} else {
						_this.newsArr.forEach(function(item, index) {
							Vue.set(item, "iconPath", SERVERROOTFILE + item.mobileIconPath)
						})
					}

				})
			},
			getStudioCourse: function() {
				var _this = this;
				_this.$http.post(SERVERROOTDATA + 'Course.ashx?action=getAppStudioCourse', {
					teachingStudioId: id,
					pageIndex: 1,
					pageSize: 6
				}, {
					emulateJSON: true
				}).then(function(res) {
					// 响应成功回调
					if(res.body.code != 200) {
						return false;
					}

					_this.courseArr = res.body.rows;

				}, function(response) {
					console.log(response);
					return false;
					// 响应错误回调

				}).then(function() {
					if(_this.courseArr.length < 1) {
						_this.noCourseData = true;
					} else {
						_this.courseArr.forEach(function(item, index) {
							Vue.set(item, "iconPath", SERVERROOTFILE + item.mobileIconPath)
						})
					}

				})
			},
			getStudioMember: function() {
				var _this = this;
				_this.$http.post(SERVERROOTDATA + 'TeachingStudio.ashx?action=getAppStudioMember', {
					teachingStudioId: id,
					pageIndex: 1,
					pageSize: 6
				}, {
					emulateJSON: true
				}).then(function(res) {
					// 响应成功回调
					if(res.body.code != 200) {
						return false;
					}

					_this.memberArr = res.body.rows;

				}, function(response) {
					console.log(response);
					return false;
					// 响应错误回调

				}).then(function() {
					if(_this.memberArr.length < 1) {
						_this.noMemberData = true;
					} else {
						_this.memberArr.forEach(function(item, index) {
							Vue.set(item, "iconPath", SERVERROOTFILE + item.iconPath)
						})
					}

				}).then(function() {
					_this.memberSwiper();
				})
			},
			getStudioSource: function() {
				var _this = this;
				_this.$http.post(SERVERROOTDATA + 'TeachingStudio.ashx?action=getAppCourseWareResources', {
					teachingStudioId: id,
					resourceTag: 'doc',
					pageIndex: 1,
					pageSize: 6
				}, {
					emulateJSON: true
				}).then(function(res) {
					// 响应成功回调
					if(res.body.code != 200) {
						return false;
					}

					_this.sourceArr = res.body.rows;

				}, function(response) {
					console.log(response);
					return false;
					// 响应错误回调

				})
			},
			memberSwiper: function() {
				var mySwiper = new Swiper('.feStudioMemberContainer', {
					visibilityFullFit: !0,
					slidesPerView: "auto",
				})
			}
		}
	})
}

//名师工作室-公告/资讯
function studioNewsApp(id, tabId) {
	new Vue({
		el: '#feStudioNewsWrap',
		data: {
			type: tabId, //类型
			firstTab: true,
			noticeArr: [],
			newsArr: [],
			noNoticeData: false,
			noNewsData: false,
			noticeIndex: 0,
			newsIndex: 0,
			noticehadInit: !1,
			newshadInit: !1,
			noticePageCount: 1,
			newsPageCount: 1,
			pageSize: 6,
			allLoaded: !1,
			bottomStatus: "",
			bottomText: "释放更新"
		},
		filters: {
			addNoticePre: function(e) {
				return ROOT + "dist/studionotice.html?noticeId=" + e
			},
			addNewsPre: function(e) {
				return ROOT + "dist/newsdetail.html?newsId=" + e
			}
		},
		mounted: function mounted() {
			//1.0ready --> 2.0
			this.$nextTick(function() {
				this.getCourseType();
				if((this.type == 1) && (this.firstTab)) {
					this.myListSwiper.slideTo(this.type, 300, false);
				}
			});
		},
		methods: {
			getCourseType: function() { //swiper切换
				var _this = this;
				var mySwiper = new Swiper(".feCoursetypeContainer", {
					slidesPerView: 2,
					on: {
						click: function() {
							_this.myListSwiper.slideTo(_this.type, 300, false);
							_this.myListSwiper.update();
						}
					}
				});

				_this.myListSwiper = new Swiper(".feListContainer", {
					autoHeight: true,
					on: {
						slideChangeTransitionStart: function() {
							$(".feCoursetypeContainer .active-nav").removeClass("active-nav");
							$(".feCoursetypeContainer .swiper-slide").eq(this.activeIndex).addClass("active-nav");
							_this.changeSlide(this.activeIndex);
						},
					},
				});

			},
			getNoticeList: function() { //获取公告列表
				var e = this;
				e.$http.post(SERVERROOTDATA + 'Activity.ashx?action=getAppTeachingStudioNotice', {
					teachingStudioId: id,
					pageIndex: e.noticeIndex,
					pageSize: e.pageSize
				}, {
					emulateJSON: true
				}).then(function(res) {
					// 响应成功回调
					if(res.body.code != 200) {
						return false;
					}
					var n = res.body.rows;
					e.noticePageCount = res.body.totalPageCount;
					if(res.body.totalPageCount == 0) {
						e.noNoticeData = true;
						return false;
					}

					n.forEach(function(t, n) {
						Vue.set(t, "cId", 'coursedetail.html?courseId=' + t.courseId + '&courseKind=' + t.courseKind);
						Vue.set(t, "iconPath", SERVERROOTFILE + t.mobileIconPath);
						e.noticeArr.push(t);
					});

				}, function(response) {
					console.log(response);
					return false;
					// 响应错误回调
				}).then(function() {
					e.myListSwiper.update();
				});
			},
			getNewsList: function() {
				var e = this;
				e.$http.post(SERVERROOTDATA + 'News.ashx?action=getTeachingStudioNews', {
					teachingStudioId: id,
					pageIndex: e.newsIndex,
					pageSize: e.pageSize
				}, {
					emulateJSON: true
				}).then(function(res) {
					// 响应成功回调
					if(res.body.code != 200) {
						return false;
					}
					var n = res.body.rows;
					e.newsPageCount = res.body.totalPageCount;
					if(e.newsPageCount == 0) {
						e.noNewsData = true;
						return false;
					}

					n.forEach(function(t, n) {
						Vue.set(t, "cId", 'coursedetail.html?courseId=' + t.courseId + '&courseKind=' + t.courseKind);
						Vue.set(t, "iconPath", SERVERROOTFILE + t.mobileIconPath);
						e.newsArr.push(t);
					});
					console.log(e.newsArr.length)

				}, function(response) {
					console.log(response);
					return false;
					// 响应错误回调
				}).then(function() {
					e.myListSwiper.update();
				});
			},

			changeSlide: function(t) {
				this.type = t;
				if(this.firstTab) {
					this.firstTab = false;
					if(t == 0) {
						this.noticeIndex = 1;
						this.getNoticeList();
					} else if(t == 1) {
						this.newsIndex = 1;
						this.getNewsList();
					}

				}
			},
			loadBottom: function() { // 加载更多数据的操作
				console.log(this.type)
				//load data
				var e = this;
				if(e.type == 0) { //公告
					void 0 !== (this.noticeIndex <= this.noticePageCount ? (this.bottomText = "释放更新!", this.noticeIndex++, this.getNoticeList()) : this.bottomText = "我是有底线的!");

				} else if(e.type == 1) { //资讯
					if(this.newsIndex <= this.newsPageCount) {
						this.bottomText = "释放更新!";

						this.newsIndex = this.newsIndex + 1;
						this.getNewsList();
					} else {
						this.bottomText = "我是有底线的!"
					}

				}

				setTimeout(function() {
					e.$refs.loadmore.onBottomLoaded();
				}, 2e3)

			},
			handleBottomChange: function(e) {
				this.bottomStatus = e
			}

		}
	});
}

//工作室公告详情页
function noticeDetailApp(e) {
	new Vue({
		el: "#jNewsDetailApp",
		data: {
			newsDetailArr: [],
			hiddenTitle: !1,
			newsTitle: ""
		},
		filters: {},
		mounted: function() {
			this.$nextTick(function() {
				this.getNewsDetail()
			}), document.getElementById("jNewsDetailApp").addEventListener("scroll", this.handleScroll)
		},
		methods: {
			getNewsDetail: function() {
				var t = this;
				axios({
					method: "post",
					url: "Activity.ashx?action=getAppActivityDetailById",
					data: {
						activityId: e
					}
				}).then(function(e) {
					t.newsDetailArr = e.data.rows, t.newsTitle = t.newsDetailArr[0].title, t.updateNewsClickCount()
				}).catch(function(e) {
					console.log(e)
				})
			},
			updateNewsClickCount: function() {
				axios({
					method: "post",
					url: "Activity.ashx?action=updateActivityClickCount",
					data: {
						activityId: e
					}
				}).then(function(e) {}).catch(function(e) {
					console.log(e)
				})
			},
			handleScroll: function(e) {
				e.target.scrollTop > 30 ? (this.hiddenTitle = !0, $("#feHeaderWhiteShare .feTitle").text(this.newsTitle)) : (this.hiddenTitle = !1, $("#feHeaderWhiteShare .feTitle").text(""))
			}
		}
	})
}

//名师工作室-好课推荐
function studioCourseApp(id) {
	new Vue({
		el: '#feStudioCourseWrap',
		data: {
			courseType: [],
			recordType: 0, //课程类型
			currentIndex: 0,
			courseArr: [],
			courseListItem: '',
			courseListStatusArr: [],
			pageSize: 6,
			allLoaded: !1,
			bottomStatus: "",
			bottomText: "释放更新"
		},
		mounted: function mounted() {
			//1.0ready --> 2.0
			this.$nextTick(function() {
				this.getCourseType();
			});
		},
		methods: {
			getCourseType: function() { //获取课程类型
				var _this = this;
				_this.$http.post(SERVERROOTDATA + 'PlayType.ashx?action=getPlayType', {
					organId: 1
				}, {
					emulateJSON: true
				}).then(function(res) {
					// 响应成功回调
					if(res.body.code != 200) {
						return false;
					}
					_this.courseType = res.body.rows;
					_this.courseListItem = _this.courseType.length;
					_this.recordType = _this.courseType[0].recordType;
					for(var n = 0; n < _this.courseListItem; n++) {
						_this.courseArr.push([]);
						_this.courseListStatusArr.push({
							pageIndex: 1,
							pageSize: _this.pageSize,
							hadInit: !1,
							totalPageCount: 1
						})
					}

				}, function(response) {
					console.log(response);
					return false;
					// 响应错误回调
				}).then(function() {
					_this.getCourseList();
					var mySwiper = new Swiper(".feCoursetypeContainer", {
						slidesPerView: 2,
						on: {
							click: function() {
								_this.myListSwiper.slideTo(_this.currentIndex, 300, false);
							}
						}
					});

					_this.myListSwiper = new Swiper(".feListContainer", {
						autoHeight: true,
						on: {
							slideChangeTransitionStart: function() {
								$(".feCoursetypeContainer .active-nav").removeClass("active-nav");
								$(".feCoursetypeContainer .swiper-slide").eq(this.activeIndex).addClass("active-nav");
								_this.changeSlide($(".feCoursetypeContainer .swiper-slide").eq(this.activeIndex).attr('data-id'), this.activeIndex);
							},
						},
					});

				});

			},
			getCourseList: function() { //获取课程列表
				var e = this;
				e.$http.post(SERVERROOTDATA + 'Course.ashx?action=getAppStudioRecommentCourse', {
					teachingStudioId: id,
					recordType: e.recordType,
					pageIndex: e.courseListStatusArr[e.currentIndex].pageIndex,
					pageSize: e.courseListStatusArr[e.currentIndex].pageSize
				}, {
					emulateJSON: true
				}).then(function(res) {
					// 响应成功回调
					if(res.body.code != 200) {
						return false;
					}
					var n = res.body.rows;
					if(e.courseListStatusArr[e.currentIndex].hadInit || (e.courseListStatusArr[e.currentIndex].hadInit = !0)) {
						e.courseListStatusArr[e.currentIndex].totalPageCount = res.body.totalPageCount;
						if(e.courseListStatusArr[e.currentIndex].totalPageCount == 0) {
							Vue.set(e.courseArr[e.currentIndex], "noData", true)
							return false;
						}
					}

					n.forEach(function(t, n) {
						Vue.set(t, "cId", 'coursedetail.html?courseId=' + t.courseId + '&courseKind=' + t.courseKind);
						Vue.set(t, "iconPath", SERVERROOTFILE + t.mobileIconPath);
						e.courseArr[e.currentIndex].push(t);
					});

				}, function(response) {
					console.log(response);
					return false;
					// 响应错误回调
				}).then(function() {
					e.myListSwiper.update();
				});
			},
			changeSlide: function(t, e) {
				this.recordType = t;
				this.currentIndex = e;

				this.courseListStatusArr[this.currentIndex].pageIndex >= this.courseListStatusArr[this.currentIndex].totalPageCount ? this.bottomText = "我是有底线的!" : this.bottomText = "释放更新!", this.courseListStatusArr[this.currentIndex].hadInit || this.getCourseList()
			},

			loadBottom: function() { // 加载更多数据的操作

				//load data
				var e = this;

				void 0 !== this.courseListStatusArr[this.currentIndex] && (this.courseListStatusArr[this.currentIndex].pageIndex <= this.courseListStatusArr[this.currentIndex].totalPageCount ? (this.bottomText = "释放更新!", this.courseListStatusArr[this.currentIndex].pageIndex = this.courseListStatusArr[this.currentIndex].pageIndex + 1, this.getCourseList()) : this.bottomText = "我是有底线的!");

				setTimeout(function() {
					e.$refs.loadmore.onBottomLoaded();
				}, 2e3)

			},
			handleBottomChange: function(e) {
				this.bottomStatus = e
			}

		}
	});
}

//名师工作室-名师列表
function studioMemberApp(id) {
	/*var userId = 5;
	var userType = 1;*/
	new Vue({
		el: '#feStudioMemberWrap',
		data: {
			memberArr: [],
			currentIndex: 1,
			pageSize: 6,
			totalPageCount: 0,
			hadInit: !1,
			allLoaded: !1,
			bottomStatus: "",
			bottomText: "释放更新"
		},
		mounted: function mounted() {
			//1.0ready --> 2.0
			this.$nextTick(function() {
				this.getMemberList();
			});
		},
		methods: {
			getMemberList: function() { //获取老师列表
				var e = this;
				e.$http.post(SERVERROOTDATA + 'TeachingStudio.ashx?action=getAppStudioMember', {
					teachingStudioId: id,
					pageIndex: e.currentIndex,
					pageSize: e.pageSize
				}, {
					emulateJSON: true
				}).then(function(res) {
					// 响应成功回调
					if(res.body.code != 200) {
						return false;
					}
					var n = res.body.rows;
					e.totalPageCount = res.body.totalPageCount;

					n.forEach(function(t, n) {
						Vue.set(t, "cId", 'coursedetail.html?courseId=' + t.courseId + '&courseKind=' + t.courseKind);
						Vue.set(t, "tId", 'teachercenter.html?tId=' + t.teacherId);
						Vue.set(t, "iconPath", SERVERROOTFILE + t.iconPath);
						e.memberArr.push(t);
					});

				}, function(response) {
					console.log(response);
					return false;
					// 响应错误回调
				});
			},
			loadBottom: function() { // 加载更多数据的操作

				//load data
				var e = this;

				void 0 !== (this.currentIndex <= this.totalPageCount ? (this.bottomText = "释放更新!", this.currentIndex = this.currentIndex + 1, this.getMemberList()) : this.bottomText = "我是有底线的!");

				setTimeout(function() {
					e.$refs.loadmore.onBottomLoaded();
				}, 2e3)

			},
			handleBottomChange: function(e) {
				this.bottomStatus = e
			}

		}
	});
}

//个人中心-我的课程
function myCourseApp() {
	var userId = varEmptyDeal($(window).storager({
		key: 'feUid'
	}).readStorage());
	var userType = varEmptyDeal($(window).storager({
		key: 'feUType'
	}).readStorage());
	new Vue({
		el: "#feMyCourseWrap",
		data: {
			liveArr: [],
			recordeArr: [],
			commentArr: [],
			pageSize: 10,
			liveIndex: 0,
			recordeIndex: 1,
			commentIndex: 1,
			livePageCount: 1,
			recordePageCount: 1,
			commentPageCount: 1,
			currentIndex: 0,
			liveInit: true,
			recordeInit: true,
			commentInit: true,
			liveNodata: false,
			recordeNodata: false,
			commentNodata: false,
			newsListArr: [],
			newsListStatusArr: [],
			mySwiper: {},
			myListSwiper: {},
			allLoaded: !1,
			bottomStatus: "",
			bottomText: "释放更新"
		},
		filters: {
			addImagePre: function(e) {
				return SERVERROOTFILE + e
			},
			addCommentHrefPre: function(e, t) {
				return ROOT + "dist/comment.html?courseId=" + e + "&courseKind=" + t
			},
			courseHref: function(e, t) {
				return ROOT + "dist/coursedetail.html?courseId=" + e + "&courseKind=" + t
			},
			coursePlayHref: function(e, t, ccId) {
				return ROOT + "dist/courseplayer.html?courseId=" + e + "&courseKind=" + t + '&courseCatalogId=' + ccId
			}
		},
		mounted: function() {
			this.$nextTick(function() {
				this.myCourseSwiper();
			})
		},
		methods: {
			gotoCourse: function(e, t) {
				location.href = ROOT + "dist/coursedetail.html?courseId=" + e + "&courseKind=" + t
			},
			gotoCoursePlay: function(e, t, ccId) {
				location.href = ROOT + "dist/courseplayer.html?courseId=" + e + "&courseKind=" + t + '&courseCatalogId=' + ccId
			},
			changeSlide: function(t) {
				$('.feMyCourseHeadContainer .active-nav').removeClass('active-nav');
				$('.feMyCourseHeadContainer .swiper-slide').eq(t).addClass('active-nav');
				this.currentIndex = t;

				if(t == 0 && this.liveInit) {
					this.getLiveList();
				} else if(t == 1 && this.recordeInit) {
					this.getRecordList();
				} else if(t == 2 && this.commentInit) {
					this.getCommentList();
				}

			},
			myCourseSwiper: function() {
				var _this = this;
				_this.mySwiper = new Swiper(".feMyCourseHeadContainer", {
					autoHeight: true,
					slidesPerView: 3,
					on: {
						click: function() {
							_this.myListSwiper.slideTo(_this.currentIndex, 300, false);
						}
					}
				});

				_this.myListSwiper = new Swiper(".feMyCourseListContainer", {
					autoHeight: true,
					on: {
						slideChangeTransitionStart: function() {
							_this.mySwiper.slideTo(this.activeIndex, 300, false);
							$(".feMyCourseHeadContainer .active-nav").removeClass("active-nav");
							$(".feMyCourseHeadContainer .swiper-slide").eq(this.activeIndex).addClass("active-nav");
							_this.changeSlide(this.activeIndex);
						},
					},
				});

			},
			getLiveList: function() {
				var _this = this;
				_this.$http.post(SERVERROOTDATA + 'Course.ashx?action=getAppLiveCourse', {
					userId: userId,
					userType: userType,
					pageIndex: _this.liveIndex,
					pageSize: _this.pageSize,
				}, {
					emulateJSON: true
				}).then(function(res) {
					// 响应成功回调
					if(res.body.code != 200) {
						return false;
					}

					if(res.body.totalPageCount == 0) {
						_this.liveNodata = true;
						return false;
					}
					var n = res.body.rows;
					n.forEach(function(t, n) {
						Vue.set(t, "iconPath", SERVERROOTFILE + t.mobileIconPath);
						_this.liveArr.push(t);
					})

					_this.livePageCount = res.body.totalPageCount;

				}, function(response) {
					console.log(response);
					return false;
					// 响应错误回调

				}).then(function() {
					_this.liveInit = false;
					_this.myListSwiper.update();
				});

			},
			getRecordList: function() {
				var _this = this;
				_this.$http.post(SERVERROOTDATA + 'Course.ashx?action=getAppRecordCourse', {
					userId: userId,
					userType: userType,
					pageIndex: _this.recordeIndex,
					pageSize: _this.pageSize,
				}, {
					emulateJSON: true
				}).then(function(res) {
					// 响应成功回调
					if(res.body.code != 200) {
						return false;
					}

					if(res.body.totalPageCount == 0) {
						_this.recordeNodata = true;
						return false;
					}

					var n = res.body.rows;
					n.forEach(function(t, n) {
						Vue.set(t, "iconPath", SERVERROOTFILE + t.mobileIconPath);
						_this.recordeArr.push(t);
					})

					_this.recordePageCount = res.body.totalPageCount;

				}, function(response) {
					console.log(response);
					return false;
					// 响应错误回调

				}).then(function() {
					_this.recordeInit = false;
					_this.myListSwiper.update();
				});

			},
			getCommentList: function() {
				var _this = this;
				_this.$http.post(SERVERROOTDATA + 'Course.ashx?action=getToBeEvaluatedCourse', {
					userId: userId,
					userType: userType,
					pageIndex: _this.commentIndex,
					pageSize: _this.pageSize,
				}, {
					emulateJSON: true
				}).then(function(res) {
					// 响应成功回调
					if(res.body.code != 200) {
						return false;
					}

					if(res.body.totalPageCount == 0) {
						_this.commentNodata = true;
						return false;
					}

					var n = res.body.rows;
					n.forEach(function(t, n) {
						Vue.set(t, "iconPath", SERVERROOTFILE + t.mobileIconPath);
						_this.commentArr.push(t);
					})

					_this.commentPageCount = res.body.totalPageCount;

				}, function(response) {
					console.log(response);
					return false;
					// 响应错误回调
				}).then(function() {
					_this.commentInit = false;
					_this.myListSwiper.update();
				});
			},
			loadBottom: function() { // 加载更多数据的操作
				//load data
				var e = this;
				if(this.currentIndex == 0) {
					this.liveIndex < this.livePageCount ? (this.bottomText = "释放更新!", this.liveIndex++, this.getLiveList()) : this.bottomText = "我是有底线的!", setTimeout(function() {
						e.$refs.loadmore.onBottomLoaded()
					}, 2e3)
				} else if(this.currentIndex == 1) {
					this.recordeIndex < this.recordePageCount ? (this.bottomText = "释放更新!", this.recordeIndex++, this.getRecordList()) : this.bottomText = "我是有底线的!", setTimeout(function() {
						e.$refs.loadmore.onBottomLoaded()
					}, 2e3)
				} else if(this.currentIndex == 2) {
					this.commentIndex < this.commentPageCount ? (this.bottomText = "释放更新!", this.commentIndex++, this.getCommentList()) : this.bottomText = "我是有底线的!", setTimeout(function() {
						e.$refs.loadmore.onBottomLoaded()
					}, 2e3)
				}

			},
			handleBottomChange: function(e) {
				this.bottomStatus = e
			}

		}
	})
}

//个人中心-我的订单
function myOrderApp() {
	var userId = varEmptyDeal($(window).storager({
		key: 'feUid'
	}).readStorage());
	var userType = varEmptyDeal($(window).storager({
		key: 'feUType'
	}).readStorage());
	new Vue({
		el: "#feMyOrderWrap",
		data: {
			liveArr: [],
			recordeArr: [],
			pageSize: 10,
			liveIndex: 0,
			recordeIndex: 1,
			livePageCount: 1,
			recordePageCount: 1,
			currentIndex: 0,
			liveInit: true,
			recordeInit: true,
			liveNoData: false,
			recordeNodata: false,
			newsListArr: [],
			newsListStatusArr: [],
			myListSwiper: {},
			mySwiper: {},
			allLoaded: !1,
			bottomStatus: "",
			bottomText: "释放更新"
		},
		filters: {
			addImagePre: function(e) {
				return SERVERROOTFILE + e
			},
			addOrderHrefPre: function(e, t) {
				return ROOT + "dist/order.html?courseId=" + e + '&courseKind=' + t;
			}
		},
		mounted: function() {
			this.$nextTick(function() {
				this.myCourseSwiper();
			})
		},
		methods: {
			changeSlide: function(t) {
				$('.feMyCourseHeadContainer .active-nav').removeClass('active-nav');
				$('.feMyCourseHeadContainer .swiper-slide').eq(t).addClass('active-nav');
				this.currentIndex = t;

				if(t == 0 && this.liveInit) {
					this.getNoPayList();
				} else if(t == 1 && this.recordeInit) {
					this.getPayList();
				}

			},
			myCourseSwiper: function() {
				var _this = this;
				_this.mySwiper = new Swiper(".feMyOrderHeadContainer", {
					autoHeight: true,
					slidesPerView: 2,
					on: {
						click: function() {
							_this.myListSwiper.slideTo(_this.currentIndex, 300, false);
						}
					}
				});

				_this.myListSwiper = new Swiper(".feMyCourseListContainer", {
					autoHeight: true,
					on: {
						slideChangeTransitionStart: function() {
							_this.mySwiper.slideTo(this.activeIndex, 300, false);
							$(".feMyCourseHeadContainer .active-nav").removeClass("active-nav");
							$(".feMyCourseHeadContainer .swiper-slide").eq(this.activeIndex).addClass("active-nav");
							_this.changeSlide(this.activeIndex);
						},
					},
				});

			},
			getNoPayList: function() { //待支付
				var _this = this;
				_this.$http.post(SERVERROOTDATA + 'Order.ashx?action=getAppOrderList', {
					payState: 0,
					userId: userId,
					userType: userType,
					pageIndex: _this.liveIndex,
					pageSize: _this.pageSize,
				}, {
					emulateJSON: true
				}).then(function(res) {
					// 响应成功回调
					if(res.body.code != 200) {
						return false;
					}
					var n = res.body.rows;
					n.forEach(function(t, n) {
						Vue.set(t, "iconPath", SERVERROOTFILE + t.iconPath);
						_this.liveArr.push(t);
					})

					_this.livePageCount = res.body.totalPageCount;
					if(_this.livePageCount == 0) {
						_this.liveNoData = true;
					}

				}, function(response) {
					console.log(response);
					return false;
					// 响应错误回调

				}).then(function() {
					_this.liveInit = false;
					_this.myListSwiper.update();
				});

			},
			getPayList: function() {
				var _this = this;
				_this.$http.post(SERVERROOTDATA + 'Order.ashx?action=getAppOrderList', {
					payState: 1,
					userId: userId,
					userType: userType,
					pageIndex: _this.recordeIndex,
					pageSize: _this.pageSize,
				}, {
					emulateJSON: true
				}).then(function(res) {
					// 响应成功回调
					if(res.body.code != 200) {
						return false;
					}
					var n = res.body.rows;
					n.forEach(function(t, n) {
						Vue.set(t, "iconPath", SERVERROOTFILE + t.iconPath);
						_this.recordeArr.push(t);
					})

					_this.recordePageCount = res.body.totalPageCount;

					if(_this.recordePageCount == 0) {
						_this.recordeNodata = true;
					}

				}, function(response) {
					console.log(response);
					return false;
					// 响应错误回调

				}).then(function() {
					_this.recordeInit = false;
					_this.myListSwiper.update();
				});

			},
			gotoOrder: function(id) {
				location.href = ROOT + "dist/orderdetail.html?orderId=" + id;
			},
			gotoCourse: function(id, courseKind) {
				location.href = ROOT + "dist/coursedetail.html?courseId=" + id + '&courseKind=' + courseKind;
			},
			deletOrder: function(id) {
				var _this = this;
				_this.$http.post(SERVERROOTDATA + 'Order.ashx?action=deleteOrder', {
					userId: userId,
					userType: userType,
					orderId: id
				}, {
					emulateJSON: true
				}).then(function(res) {
					if(res.body.code == 200) {
						_this.liveArr.forEach(function(item, index) {
							if(item.orderId == id) {
								_this.liveArr.splice(index, 1);

							}
						})

						setTimeout(function() {
							_this.myListSwiper.update();
						}, 300)
					}
					layer.open({
						content: res.body.message,
						skin: 'msg',
						time: 2 //2秒后自动关闭
					});

				})
			},
			loadBottom: function() { // 加载更多数据的操作
				//load data
				var e = this;
				if(this.currentIndex == 1) {
					this.recordeIndex < this.recordePageCount ? (this.bottomText = "释放更新!", this.recordeIndex++, this.getPayList()) : this.bottomText = "我是有底线的!", setTimeout(function() {
						e.$refs.loadmore.onBottomLoaded()
					}, 2e3)
				} else if(this.currentIndex == 0) {

					this.liveIndex < this.livePageCount ? (this.bottomText = "释放更新!", this.liveIndex++, this.getNoPayList()) : this.bottomText = "我是有底线的!", setTimeout(function() {
						e.$refs.loadmore.onBottomLoaded()
					}, 2e3)
				}

			},
			handleBottomChange: function(e) {
				this.bottomStatus = e
			}

		}
	})
}
//个人中心-已评价课程
function tobeCommentApp() {
	var userId = varEmptyDeal($(window).storager({
		key: 'feUid'
	}).readStorage());
	var userType = varEmptyDeal($(window).storager({
		key: 'feUType'
	}).readStorage());

	new Vue({
		el: '#feToCommentWrap',
		data: {
			listArr: [],
			currentIndex: 0,
			pageSize: 6,
			pageCount: 1,
			commentNum: 0,
			nolist: false,
			allLoaded: !1,
			bottomStatus: "",
			bottomText: "释放更新"
		},
		filters: {

		},
		mounted: function() {
			this.$nextTick(function() {
				if(!checkLogined()) {
					location.href = "../login.html"
				} else {
					this.toCommentNum();
				}

			})
		},
		methods: {
			toCommentNum: function() {
				var _this = this;

				_this.$http.post(SERVERROOTDATA + 'Course.ashx?action=getToBeEvaluatedCourse', {
					userId: userId,
					userType: userType,
					pageIndex: 1,
					pageSize: 1,
				}, {
					emulateJSON: true
				}).then(function(res) {
					// 响应成功回调
					if(res.body.code != 200) {
						return false;
					}

					_this.commentNum = res.body.totalCount;

				}, function(response) {
					console.log(response);
					return false;
					// 响应错误回调

				});
			},
			getList: function() {
				var _this = this;
				_this.$http.post(SERVERROOTDATA + 'CourseEvaluation.ashx?action=getAppUserEvaluationList', {
					userId: userId,
					userType: userType,
					pageIndex: _this.currentIndex,
					pageSize: _this.pageSize,
				}, {
					emulateJSON: true
				}).then(function(res) {
					// 响应成功回调
					if(res.body.code != 200) {
						return false;
					}
					if(res.body.rows.length < 1) {
						_this.nolist = true;
						return false;
					}
					var n = res.body.rows;
					n.forEach(function(t, n) {
						Vue.set(t, "starnum", t.score / 2);
						Vue.set(t, "half", false);
						if(String(t.starnum).indexOf(".") > -1) {
							Vue.set(t, "starnum", parseInt(t.starnum));
							Vue.set(t, "half", true);
						}
						Vue.set(t, "iconPath", SERVERROOTFILE + t.mobileIconPath);
						t.children.forEach(function(child, index) {
							Vue.set(child, "photo", SERVERROOTFILE + child.photo);
						});
						_this.listArr.push(t);
					})

					_this.pageCount = res.body.totalPageCount;

				}, function(response) {
					console.log(response);
					return false;
					// 响应错误回调

				});
			},
			loadBottom: function() { // 加载更多数据的操作
				//load data
				var e = this;
				this.currentIndex < this.pageCount ? (this.bottomText = "释放更新!", this.currentIndex++, this.getList()) : this.bottomText = "我是有底线的!", setTimeout(function() {
					e.$refs.loadmore.onBottomLoaded()
				}, 2e3)

			},
			handleBottomChange: function(e) {
				this.bottomStatus = e
			}
		}
	})
}
//个人中心-我的笔记
function myNoteApp() {
	var userId = varEmptyDeal($(window).storager({
		key: 'feUid'
	}).readStorage());
	var userType = varEmptyDeal($(window).storager({
		key: 'feUType'
	}).readStorage());
	new Vue({
		el: '#feMyNoteWrap',
		data: {
			listArr: [],
			noData: false,
			currentNote: [],
			currentIndex: 1,
			commentContent: '',
			currentWordTips: 0,
			allWordTips: 300,
			pageSize: 6,
			pageCount: 1,
			allLoaded: !1,
			bottomStatus: "",
			bottomText: "释放更新",
			isShow: true
		},
		filters: {

		},
		mounted: function() {
			this.$nextTick(function() {
				this.getList();
			})
		},
		methods: {
			getList: function() {
				var _this = this;
				_this.$http.post(SERVERROOTDATA + 'Note.ashx?action=getNoteList', {
					userId: userId,
					userType: userType,
					subjectName: '',
					courseName: '',
					pageIndex: _this.currentIndex,
					pageSize: _this.pageSize,
				}, {
					emulateJSON: true
				}).then(function(res) {
					// 响应成功回调
					if(res.body.code != 200) {
						return false;
					}
					if(res.body.totalPageCount == 0) {
						_this.noData = true;
						return false;
					}
					var n = res.body.rows;
					n.forEach(function(t, n) {
						Vue.set(t, "iconPath", SERVERROOTFILE + t.mobileIconPath);
						_this.listArr.push(t);
					})

					_this.pageCount = res.body.totalPageCount;

				}, function(response) {
					console.log(response);
					return false;
					// 响应错误回调

				});
			},
			inputText: function() {
				this.currentWordTips = this.commentContent.length;
				if(this.currentWordTips >= this.allWordTips) {
					this.commentContent = this.commentContent.substring(0, this.allWordTips);
					this.currentWordTips = this.commentContent.length;
				}

			},
			closeNote: function() {
				this.isShow = true;
			},
			//编辑笔记
			editNote: function(id) {
				var _this = this;

				_this.$http.post(SERVERROOTDATA + "Note.ashx?action=getAppNoteById", {
						noteId: id
					}, {
						emulateJSON: true
					})
					.then(function(res) {
						if(res.body.code != 200) {
							return false;
						}
						_this.currentNote = res.body.rows[0];
					}).then(function() {
						this.currentWordTips = _this.currentNote.content.length;
						this.commentContent = _this.currentNote.content;
						this.inputText();
						_this.isShow = false;
					})
			},
			// 删除笔记
			deleteNote: function(id) {
				var _this = this;
				layer.open({
					content: '你确定要删除吗？',
					btn: ['确定', '取消'],
					yes: function(index) {
						_this.$http.post(SERVERROOTDATA + "Note.ashx?action=deleteNoteById", {
								noteId: id
							}, {
								emulateJSON: true
							})
							.then(function(res) {
								if(res.body.code == 200) {
									layer.open({
										content: res.body.message,
										skin: 'msg',
										time: 2 //2秒后自动关闭
									});
									setTimeout(function() {
										layer.closeAll();
										_this.listArr.forEach(function(item, index) {
											if(item.noteId == id) {
												_this.listArr.splice(index, 1);
											}
										});
									}, 1000);

								} else {
									layer.open({
										content: '删除失败',
										skin: 'msg',
										time: 2 //2秒后自动关闭
									});
								}
							})
						layer.close(index);
					}
				});

			},
			// 更新笔记
			updateNote: function(id, subjectId, courseId) {
				var _this = this;

				var ediorVal = $('#editcontent').val();
				var reg = /^\s*$/g;
				if(ediorVal == "" || reg.test(ediorVal)) {
					layer.open({
						content: '笔记不能为空',
						skin: 'msg',
						time: 2 //2秒后自动关闭
					});
				} else {
					this.$http.post(SERVERROOTDATA + "Note.ashx?action=appNoteSave", {
							userId: userId,
							userType: userType,
							subjectId: subjectId,
							courseId: courseId,
							content: ediorVal,
							noteId: id,
							saveTag: 'update'
						}, {
							emulateJSON: true
						})
						.then(function(res) {
							if(res.body.code == 200) {
								_this.isShow = true;
								layer.open({
									content: res.body.message,
									skin: 'msg',
									time: 2 //2秒后自动关闭
								});

							} else {
								layer.msg('保存失败,请重试！');
							}
						})
				}

			},
			loadBottom: function() { // 加载更多数据的操作
				//load data
				var e = this;
				this.currentIndex < this.pageCount ? (this.bottomText = "释放更新!", this.currentIndex++, this.getList()) : this.bottomText = "我是有底线的!", setTimeout(function() {
					e.$refs.loadmore.onBottomLoaded()
				}, 2e3)

			},
			handleBottomChange: function(e) {
				this.bottomStatus = e
			}
		}
	})
}

//课程详情
function courseDetailApp(id, courseKind) {
	var userId = varEmptyDeal($(window).storager({
		key: 'feUid'
	}).readStorage());
	var userType = varEmptyDeal($(window).storager({
		key: 'feUType'
	}).readStorage());
	new Vue({
		el: "#feCourseDetailWrap",
		data: {
			headArr: [],
			detailArr: [],
			menuArr: [],
			commentArr: [],
			hasCollected: 0,
			hasPay: 0,
			vId: '',
			courseCatalogId: '',
			noCommentData: false,
			isFind: false,
			currentIndex: 1,
			pageSize: 6,
			pageCount: 1,
			allLoaded: !1,
			bottomStatus: "",
			bottomText: "释放更新",
			cIndex: 0
		},
		filters: {
			schoolHref: function(t) {
				return ROOT + 'dist/schoolcenter.html?schoolId=' + t;
			},
			playHref: function(t) {
				return ROOT + 'dist/courseplayer.html?courseCatalogId=' + t + '&courseId=' + id + '&courseKind=' + courseKind;
			},
			payHref: function() {
				return ROOT + "dist/order.html?courseId=" + id + "&courseKind=" + courseKind;
			}
		},
		mounted: function() {
			this.$nextTick(function() {
				this.getHead();
				this.getMenu();
				this.getComment();
				this.courseSlide();
				this.gotoSlide();
			})
		},
		methods: {
			getHead: function() {
				var _this = this;
				_this.$http.post(SERVERROOTDATA + 'Course.ashx?action=getCourseDetailHeaderById', {
					userId: userId,
					userType: userType,
					courseId: id,
					courseKind: courseKind
				}, {
					emulateJSON: true
				}).then(function(res) {
					// 响应成功回调
					if(res.body.code != 200) {
						return false;
					}
					_this.headArr = res.body.rows[0];
				}).then(function() {
					_this.hasCollected = _this.headArr.hasCollected;
					_this.hasPay = _this.headArr.hasEnrolled;

					Vue.set(_this.headArr, "iconPath", SERVERROOTFILE + _this.headArr.mobileIconPath);
					_this.getCourseDetail(_this.headArr.recordType);
				}, function(response) {
					console.log(response);
					return false;
					// 响应错误回调

				});

			},
			getCourseDetail: function(recordType) {
				var _this = this;
				_this.$http.post(SERVERROOTDATA + 'Course.ashx?action=getCourseDetailById', {
					userId: userId,
					userType: userType,
					courseId: id,
					courseKind: courseKind,
					recordType: recordType
				}, {
					emulateJSON: true
				}).then(function(res) {
					// 响应成功回调
					if(res.body.code != 200) {
						return false;
					}
					_this.detailArr = res.body.rows[0];

				}, function(response) {
					console.log(response);
					return false;
					// 响应错误回调

				});

			},
			getMenu: function() {
				var _this = this;
				_this.$http.post(SERVERROOTDATA + 'CourseCatalog.ashx?action=getCourseCatalogByCourseId', {
					userId: userId,
					userType: userType,
					courseId: id,
					courseKind: courseKind,
					pageIndex: 1,
					pageSize: 10
				}, {
					emulateJSON: true
				}).then(function(res) {
					// 响应成功回调
					if(res.body.code != 200) {
						return false;
					}
					_this.menuArr = res.body.rows;

				}, function(response) {
					console.log(response);
					return false;
					// 响应错误回调

				}).then(function() {
					_this.menuArr.forEach(function(item, index) {
						if(item.allowListen == 1 && !_this.isFind) {
							_this.vId = item.videoId;
							_this.courseCatalogId = item.courseCatalogId;
							_this.isFind = true;
						}
					})
				});
			},
			getComment: function() {
				var _this = this;
				_this.$http.post(SERVERROOTDATA + 'CourseEvaluation.ashx?action=getAppEvaluation', {
					courseId: id,
					courseKind: courseKind,
					pageIndex: _this.currentIndex,
					pageSize: _this.pageSize
				}, {
					emulateJSON: true
				}).then(function(res) {
					// 响应成功回调
					if(res.body.code != 200) {
						return false;
					}
					var n = res.body.rows;
					n.forEach(function(t, n) {
						Vue.set(t, "starnum", t.score / 2);
						Vue.set(t, "half", false);
						if(String(t.starnum).indexOf(".") > -1) {
							Vue.set(t, "starnum", parseInt(t.starnum));
							Vue.set(t, "half", true);
						}
						Vue.set(t, "iconPath", SERVERROOTFILE + t.mobileIconPath);
						t.children.forEach(function(child, index) {
							Vue.set(child, "photo", SERVERROOTFILE + child.photo);
						});
						_this.commentArr.push(t);
					})

					_this.pageCount = res.body.totalPageCount;
					if(_this.pageCount < 1) {
						_this.noCommentData = true;
					}

				}, function(response) {
					console.log(response);
					return false;
					// 响应错误回调

				});
			},
			courseSlide: function() {
				var nav = $(".feCourseDetailTab"); //得到导航对象

				var win = $(window); //得到窗口对象

				var sc = $(document); //得到document文档对象。

				win.scroll(function() {
					if(sc.scrollTop() >= 300) {
						$('.fixednav').fadeIn();
					} else {
						$('.fixednav').fadeOut();
					}

				})
			},
			gotoPay: function() { //报名
				var _this = this;
				_this.$http.post(SERVERROOTDATA + 'Course.ashx?action=courseEnrollment', {
					userId: userId,
					userType: userType,
					courseId: id,
					courseKind: courseKind
				}, {
					emulateJSON: true
				}).then(function(res) {
					if(res.body.code == 200) {
						_this.hasPay = 1;
						layer.open({
							content: res.body.message,
							skin: 'msg',
							time: 2 //2秒后自动关闭
						});
					}

				});

			},
			gotoCheck: function() {
				var _this = this;
				if(!checkLogined()) {
					location.href = "../login.html"
				} else {
					layer.open({
						content: '该课程购买后才可观看，是否前去购买？',
						btn: ['是', '否'],
						yes: function(index) {
							if(_this.headArr.isFree == 1) {
								_this.gotoPay();
								layer.close(index);
							} else {
								location.href = "order.html?courseId=" + id + '&courseKind=' + courseKind;

							}

						}
					});
				}

			},
			hasFreeListen: function() {
				layer.open({
					content: '暂无免费试听课程',
					skin: 'msg',
					time: 2 //2秒后自动关闭
				});
			},
			gotoSlide: function() {
				var _this = this;
				$(".feCourseDetailTab a").click(function() {
					_this.cIndex = $(this).attr('data-id');

					if($(document).scrollTop() < 300) {
						var distance = 90;
					} else {
						var distance = $('.fixednav').height() + 5;
					}

					var num = document.body.scrollHeight - ($(".feCourseDetailBox").eq(_this.cIndex).offset().top - distance) - document.body.offsetHeight; //判断是否可以滑动到最底部

					if(num > 0) {
						var ss = $(".feCourseDetailBox").eq(_this.cIndex).offset().top - distance
					} else {
						var ss = document.body.scrollHeight - document.body.offsetHeight; //滑到最底部
					}

					$("body").animate({
						scrollTop: ss
					}, {
						duration: 300,
						easing: "swing"
					});

				});
			},
			collect: function(cid, cancel) {
				if(!checkLogined()) {
					location.href = "../login.html"
				}
				var _this = this;
				_this.$http.post(SERVERROOTDATA + 'Course.ashx?action=courseCollect', {
					userId: userId,
					userType: userType,
					courseId: id,
					courseKind: courseKind,
					cancel: cancel,
					courseCollectionId: ''
				}, {
					emulateJSON: true
				}).then(function(res) {
					// 响应成功回调
					if(res.body.code != 200) {
						return false;
					}
					if(cancel == 1) {
						layer.open({
							content: '收藏成功',
							skin: 'msg',
							time: 2 //2秒后自动关闭
						});
						_this.hasCollected = false
					} else {
						layer.open({
							content: '取消收藏成功',
							skin: 'msg',
							time: 2 //2秒后自动关闭
						});
						_this.hasCollected = true
					}

				}, function(response) {
					console.log(response);
					return false;
					// 响应错误回调

				});

			},
			cancelcollect: function(cid) {
				var _this = this;
				layer.open({
					content: '您确定要取消收藏吗？',
					btn: ['是', '否'],
					yes: function(index) {
						_this.collect(cid, 1);
						layer.close(index);
					}
				});
			},
			loadBottom: function() { // 加载更多数据的操作
				//load data
				var e = this;
				this.currentIndex < this.pageCount ? (this.bottomText = "释放更新!", this.currentIndex++, this.getComment()) : this.bottomText = "我是有底线的!", setTimeout(function() {
					e.$refs.loadmore.onBottomLoaded()
				}, 2e3)
			},
			handleBottomChange: function(e) {
				this.bottomStatus = e
			}
		}
	})
}

//课程播放页
function coursePlayApp(ccId, cId, courseKind) {
	if(!checkLogined()) {
		location.href = "../login.html"
	}

	var userId = varEmptyDeal($(window).storager({
		key: 'feUid'
	}).readStorage());
	var userType = varEmptyDeal($(window).storager({
		key: 'feUType'
	}).readStorage());

	new Vue({
		el: "#jCoursePlayWrap",
		data: {
			activeDetailArr: [],
			menuArr: [],
			courseCatalogId: ccId,
			allowListen: false,
			cover: "",
			playauth: "",
			currentIndex: 1,
			totalPage: 1,
			pageSize: 100,
			allLoaded: !1,
			bottomStatus: "",
			bottomText: "释放更新",
			thumbUpCount: 0,
			lookMoreLabel: "查看更多"
		},
		filters: {
			addActiveHrefPre: function(e) {
				return ROOT + "dist/courseplayer.html?courseCatalogId=" + e + '&courseId=' + cId + '&courseKind=' + courseKind
			}
		},
		mounted: function() {
			this.$nextTick(function() {
				this.getHead();
			})
		},
		methods: {
			getHead: function() {
				var _this = this;
				axios({
					method: "post",
					url: "Course.ashx?action=getCourseDetailHeaderById",
					data: {
						courseId: cId,
						courseKind: courseKind,
						userId: userId,
						userType: userType
					}
				}).then(function(a) {
					if(a.data.code != 200) {
						return false;
					}
					if(a.data.rows.length >= 1) {
						_this.activeDetailArr = a.data.rows[0];
						_this.getPlayList();

					} else {
						console.log('没有该数据')
					}

				}).catch(function(e) {
					console.log(e)
				})
			},
			getPlayList: function() {
				var e = this;
				axios({
					method: "post",
					url: "CourseCatalog.ashx?action=getCourseCatalogByCourseId",
					data: {
						userId: userId,
						userType: userType,
						courseId: cId,
						courseKind: courseKind,
						pageIndex: e.currentIndex,
						pageSize: e.pageSize
					}
				}).then(function(a) {
					if(a.data.code != 200) {
						return false;
					}

					var t = a.data.rows;
					t.forEach(function(item, index) {
						e.menuArr.push(item);
					});
					e.totalPage = a.data.totalPageCount;

				}).then(function() {

					if(e.courseCatalogId == undefined || e.courseCatalogId == 'undefined' || e.courseCatalogId == '' || e.courseCatalogId == null || e.courseCatalogId == 'null') {
						if(e.menuArr.length >= 1) { //如果没有给章节id，默认获取第一个
							e.courseCatalogId = e.menuArr[0].courseCatalogId;
						} else {
							console.log('没有该数据')
						}
					}

					e.menuArr.forEach(function(item, index) { //判断该章节是否允许试听
						if(e.courseCatalogId == item.courseCatalogId && item.allowListen == 1) {
							e.allowListen = true;
						}
					})

					if(e.activeDetailArr.hasEnrolled == 1 || e.allowListen) { //已购买或者有免费试听
						e.getPlayauth();
					} else {
						layer.confirm('该课程需要购买，是否前去购买？', {
							btn: ['是', '否'] //按钮
						}, function() {
							window.location.href = 'order.html?courseId=' + cId + '&courseKind=' + courseKind;
						});
					}

				})
			},
			getPlayauth: function() {
				var t = this;
				axios({
					method: "post",
					url: "CourseCatalog.ashx?action=getPlayUrlById",
					data: {
						courseCatalogId: t.courseCatalogId,
						userId: userId,
						userType: userType
					}
				}).then(function(a) {
					if(a.data.code == 801) {
						layer.msg(a.data.message);
						return false;
					}
					if(a.data.rows.length < 1) { //暂时用来判断如果没有权限观看
						layer.open({
							content: '购买后才可观看，是否购买？',
							btn: ['购买', '不要'],
							yes: function(index) {
								location.href = "order.html?courseId=" + cId + '&courseKind=' + courseKind;
								layer.close(index);
							}
						});
					} else {
						t.loadPlayer(a.data.rows[0].playAuth, a.data.rows[0].videoId)
					}

				}).catch(function(e) {
					console.log(e)
				})
			},
			loadPlayer: function(e, t) {
				console.log(t)
				new Aliplayer({
					id: "jActivePlayer",
					playsinline: !0,
					width: "100%",
					height: "4.18rem",
					autoplay: !0,
					vid: t,
					playauth: e,
					cover: this.cover,
					skinLayout: [{
						name: "bigPlayButton",
						align: "cc"
					}, {
						name: "H5Loading",
						align: "cc"
					}, {
						name: "errorDisplay",
						align: "tlabs",
						x: 0,
						y: 0
					}, {
						name: "infoDisplay",
						align: "cc"
					}, {
						name: "controlBar",
						align: "blabs",
						x: 0,
						y: 0,
						children: [{
							name: "progress",
							align: "tlabs",
							x: 0,
							y: 0
						}, {
							name: "playButton",
							align: "tl",
							x: 15,
							y: 12
						}, {
							name: "timeDisplay",
							align: "tl",
							x: 10,
							y: 7
						}, {
							name: "fullScreenButton",
							align: "tr",
							x: 10,
							y: 10
						}, {
							name: "volume",
							align: "tr",
							x: 10,
							y: 10
						}, {
							name: "streamButton",
							align: "tr",
							x: 0,
							y: 10
						}, {
							name: "speedButton",
							align: "tr",
							x: 0,
							y: 10
						}]
					}]
				})
			},
			gotoBuy: function() {
				layer.confirm('该课程需要购买，是否前去购买？', {
					btn: ['是', '否'] //按钮
				}, function() {
					window.location.href = 'order.html?courseId=' + cId + '&courseKind=' + courseKind;
				});
			}
			/*,
						loadBottom: function() {
							var e = this;
							e.totalPage >= e.currentIndex ? (this.bottomText = "释放更新!", e.getPlayList(), e.currentIndex++) : this.bottomText = "我是有底线的!", setTimeout(function() {
								e.$refs.loadmore.onBottomLoaded()
							}, 2e3)
						},
						handleBottomChange: function(e) {
							this.bottomStatus = e
						}*/
		}
	})
}

//直播播放页
function livePlayApp(id, courseKind, channelProgramId) {
	if(!checkLogined()) {
		location.href = "../login.html"
	}

	var userId = varEmptyDeal($(window).storager({
		key: 'feUid'
	}).readStorage());
	var userType = varEmptyDeal($(window).storager({
		key: 'feUType'
	}).readStorage());

	getLiveChatInf(userId, userType, 'moblie', id);

	new Vue({
		el: "#jLivePlayWrap",
		data: {
			headerArr: [],
			menuArr: [],
			menuTab: true,
			currentIndex: 0,
			channelId: 182, //获取直播地址，暂时写固定
			channelProgramId: channelProgramId,
			courseCatalogId: 11, //当前播放的时间
			courseKind: courseKind,
			hasEnrolled: false,
			firstLoad: true,
			cover: "",
			playauth: "",
			pageSize: 30
		},
		filters: {
			addActiveHrefPre: function(e) {
				return ROOT + "dist/liveplayer.html?cpId=" + e
			}
		},
		mounted: function() {
			this.$nextTick(function() {

				this.getHead();
				/*this.getMenuList();*/
			})
		},
		methods: {
			menuBtnTab: function(tabId) {
				var _this = this;
				if(tabId == 0) {
					_this.menuTab = true;
				} else {
					_this.menuTab = false;
				}

			},
			getHead: function() {
				var e = this;
				axios({
					method: "post",
					url: "Course.ashx?action=getAppLiveCourseHeader",
					data: {
						channelProgramId: e.channelProgramId,
						userId: userId,
						userType: userType
					}
				}).then(function(a) {
					if(a.data.code != 200) {
						return false;
					}
					e.headerArr = a.data.rows;

				}).then(function() {
					e.headerArr.forEach(function(item, index) {
						if(item.hasEnrolled == 1) {
							e.hasEnrolled = true;
						}
					})
				}).then(function() {
					e.getMenuList();
				}).catch(function(e) {
					console.log(e)
				})
			},
			getMenuList: function() {
				var e = this;
				axios({
					method: "post",
					url: "ChannelProgram.ashx?action=getCourseLiveProgram",
					data: {
						userId: userId,
						userType: userType,
						courseId: id,
						recordType: 1
					}
				}).then(function(a) {
					if(a.data.code != 200) {
						return false;
					}

					e.menuArr = a.data.rows;

				}).then(function() {
					e.channelId = $('.feCoursePlayLi .active').attr('data-channelId'); //获取直播地址，暂时写固定
				}).then(function() {
					if(e.hasEnrolled) {
						/*e.getPlayauth();录播播放地址*/
						e.loadPlayer('', a.data.rows[0].rtmpUrl); //直播播放

					} else {
						layer.open({
							content: '购买后才可观看，是否购买？',
							btn: ['购买', '不要'],
							yes: function(index) {
								location.href = "order.html?courseId=" + id + '&courseKind=' + courseKind;
								layer.close(index);
							}
						});
					}

				})
			},
			getPlayauth: function() {
				var t = this;
				axios({
					method: "post",
					url: "CourseCatalog.ashx?action=getPlayUrlById",
					data: {
						courseCatalogId: t.channelProgramId,
						userId: userId,
						userType: userType
					}
				}).then(function(a) {
					if(a.data.code != 200) {
						return false;
					}
					if(a.data.rows.length < 1) { //暂时用来判断如果没有权限观看
						layer.open({
							content: '购买后才可观看，是否购买？',
							btn: ['购买', '不要'],
							yes: function(index) {
								location.href = "order.html?courseId=" + cId + '&courseKind=' + courseKind;
								layer.close(index);
							}
						});
					} else {
						t.loadPlayer(a.data.rows[0].playAuth, a.data.rows[0].videoId)
					}

				}).catch(function(e) {
					console.log(e)
				})
			},
			gotoBuy: function() {
				var _this = this;
				if(!checkLogined()) {
					location.href = "../login.html"
				} else {
					var isFree = false;
					_this.headerArr.forEach(function(item, index) {
						if(item.isFree == 1) {
							isFree = true
						}
					})
					layer.open({
						content: '该课程购买后才可观看，是否前去购买？',
						btn: ['是', '否'],
						yes: function(index) {
							if(isFree) {
								_this.gotoPay();
								layer.close(index);
							} else {
								location.href = "order.html?courseId=" + id + '&courseKind=' + courseKind;

							}

						}
					});
				}
			},
			gotoPay: function() {
				var _this = this;
				axios({
					method: "post",
					url: "Course.ashx?action=courseEnrollment",
					data: {
						userId: userId,
						userType: userType,
						courseId: id,
						courseKind: _this.courseKind
					}
				}).then(function(a) {
					if(a.data.code == 200) {
						_this.hasEnrolled = true;
						layer.open({
							content: a.data.message,
							skin: 'msg',
							time: 2 //2秒后自动关闭
						});
					}

				});
			},
			loadPlayer: function(e, t) {
				new Aliplayer({
					id: "jActivePlayer",
					playsinline: !0,
					width: "100%",
					height: "4.18rem",
					autoplay: !0,
					/*vid: t,
					playauth: e,录播使用*/
					cover: this.cover,
					isLive: true,
					controlBarVisibility: "always",
					useH5Prism: false,
					useFlashPrism: false,
					source: t, //直播使用
					cover: "",

					skinLayout: [{
						name: "bigPlayButton",
						align: "cc"
					}, {
						name: "H5Loading",
						align: "cc"
					}, {
						name: "errorDisplay",
						align: "tlabs",
						x: 0,
						y: 0
					}, {
						name: "infoDisplay",
						align: "cc"
					}, {
						name: "controlBar",
						align: "blabs",
						x: 0,
						y: 0,
						children: [{
							name: "progress",
							align: "tlabs",
							x: 0,
							y: 0
						}, {
							name: "playButton",
							align: "tl",
							x: 15,
							y: 12
						}, {
							name: "timeDisplay",
							align: "tl",
							x: 10,
							y: 7
						}, {
							name: "fullScreenButton",
							align: "tr",
							x: 10,
							y: 10
						}, {
							name: "volume",
							align: "tr",
							x: 10,
							y: 10
						}, {
							name: "streamButton",
							align: "tr",
							x: 0,
							y: 10
						}, {
							name: "speedButton",
							align: "tr",
							x: 0,
							y: 10
						}]
					}]
				})
			}
		}
	})
}

//新闻直播页
function newsLiveApp() {
	if(!checkLogined()) {
		location.href = "../login.html"
	}

	var userId = varEmptyDeal($(window).storager({
		key: 'feUid'
	}).readStorage());
	var userType = varEmptyDeal($(window).storager({
		key: 'feUType'
	}).readStorage());
	var t = $.getUrlParam("courseId");
	getLiveChatInf(userId, userType, 'moblie', t);

	new Vue({
		el: "#jNewsLiveWrap",
		data: {
			weekArr: [],
			menuArr: [],
			menuTab: true,
			commentTab: false,
			currentIndex: 0,
			channelId: '',
			channelProgramId: '',
			firstLoad: true,
			cover: "",
			playauth: "",
			menuListItem: '',
			menuListStatusArr: [],
			myListSwiper: '',
			mySwiper: '',
			pageSize: 30
		},
		filters: {
			addActiveHrefPre: function(e) {
				return ROOT + "dist/mediadetail.html?mId=" + e
			}
		},
		mounted: function() {
			this.$nextTick(function() {

				this.getWeek();
				/*this.getMenuList();*/
			})
		},
		methods: {
			menuBtnTab: function(tabId) {
				var _this = this;
				if(tabId == 0) {
					_this.menuTab = true;
					_this.commentTab = false;
				} else {
					_this.menuTab = false;
					_this.commentTab = true;
				}

			},
			getWeek: function() {
				var e = this;
				axios({
					method: "post",
					url: "NewsType.ashx?action=getEducationNewsType",
					data: {
						organId: 1,
						pageSize: e.pageSize
					}
				}).then(function(a) {
					if(a.data.code != 200) {
						return false;
					}
					e.weekArr = a.data.rows;

				}).then(function() {
					e.menuListItem = e.weekArr.length;
					for(var n = 0; n < e.menuListItem; n++) {
						e.menuArr.push([]);
						e.menuListStatusArr.push({
							pageIndex: 1,
							pageSize: e.pageSize,
							hadInit: !1,
							totalPageCount: 1
						})
					}

				}).then(function() {
					e.getMenuList($(".feNewsLiveContainer .active-nav a").attr('data-id'));
					e.channelId = $('.feNewsLiveList .active').attr('data-channelId'); //获取直播地址，暂时写固定
					/*e.channelId=182;
					e.channelProgramId=1;*/

					e.getSwiper();
				}).then(function() {

					e.getPlayauth();

				}).catch(function(e) {
					console.log(e)
				})
			},
			getSwiper: function() {
				var e = this;
				e.mySwiper = new Swiper(".feNewsLiveContainer", {
					autoHeight: true,
					slidesPerView: "auto",
					on: {
						click: function() {
							e.mySwiper.slideTo(e.currentIndex, 300, false);
							e.myListSwiper.slideTo(e.currentIndex, 300, false);
						}
					}
				});

				e.myListSwiper = new Swiper(".feNewsListContainer", {
					autoHeight: true,
					on: {
						slideChangeTransitionStart: function() {
							$(".feNewsLiveContainer .active-nav").removeClass("active-nav");
							$(".feNewsLiveContainer .swiper-slide").eq(this.activeIndex).addClass("active-nav");
							e.mySwiper.slideTo(this.activeIndex, 300, false);
							e.changeSlide($(".feNewsLiveContainer .active-nav a").attr('data-id'), this.activeIndex);
						},
					},
				});
			},
			changeSlide: function(e, t) {
				var _this = this;
				_this.currentIndex = t;
				if(!_this.menuListStatusArr[t].hadInit) {
					_this.getMenuList(e);
				}
			},
			getMenuList: function(id) {
				var e = this;
				axios({
					method: "post",
					url: "News.ashx?action=getNewsByType",
					data: {
						organId: 1,
						newsTypeId: id,
						pageIndex: 1,
						pageSize: 10
					}
				}).then(function(a) {
					if(a.data.code != 200) {
						return false;
					}
					var t = a.data.rows;
					e.menuListStatusArr[e.currentIndex].hadInit = true;
					if(t.length < 1) {
						Vue.set(e.menuArr[e.currentIndex], "noData", true);
					} else {
						Vue.set(e.menuArr[e.currentIndex], "noData", false);
					}
					/*	e.menuArr[e.currentIndex] = t;*/
					t.forEach(function(item, index) {
						e.menuArr[e.currentIndex].push(item);
					});

				}).then(function() {
					setTimeout(function() {
						e.myListSwiper.update();
					}, 1000)

				})
			},
			getTime: function() {
				//例如：13：20-15：20
				var now = new Date();
				var hour = now.getHours();
				var minu = now.getMinutes();

			},
			getPlayauth: function() {
				var t = this;
				axios({
					method: "post",
					url: "CourseCatalog.ashx?action=getPlayUrlById",
					data: {
						courseCatalogId: t.channelId,
						userId: userId,
						userType: userType
					}
				}).then(function(a) {
					if(a.data.code != 200) {
						return false;
					}
					if(a.data.rows.length < 1) { //暂时用来判断如果没有权限观看
						layer.open({
							content: '购买后才可观看，是否购买？',
							btn: ['购买', '不要'],
							yes: function(index) {
								location.href = "order.html?courseId=" + cId + '&courseKind=' + courseKind;
								layer.close(index);
							}
						});
					} else {
						t.loadPlayer(a.data.rows[0].playAuth, a.data.rows[0].videoId)
					}

				}).catch(function(e) {
					console.log(e)
				})
			},
			loadPlayer: function(e, t) {
				new Aliplayer({
					id: "jActivePlayer",
					playsinline: !0,
					width: "100%",
					height: "4.18rem",
					autoplay: !0,
					vid: t,
					playauth: e,
					cover: this.cover,
					isLive: true,
					skinLayout: [{
						name: "bigPlayButton",
						align: "cc"
					}, {
						name: "H5Loading",
						align: "cc"
					}, {
						name: "errorDisplay",
						align: "tlabs",
						x: 0,
						y: 0
					}, {
						name: "infoDisplay",
						align: "cc"
					}, {
						name: "controlBar",
						align: "blabs",
						x: 0,
						y: 0,
						children: [{
							name: "progress",
							align: "tlabs",
							x: 0,
							y: 0
						}, {
							name: "playButton",
							align: "tl",
							x: 15,
							y: 12
						}, {
							name: "timeDisplay",
							align: "tl",
							x: 10,
							y: 7
						}, {
							name: "fullScreenButton",
							align: "tr",
							x: 10,
							y: 10
						}, {
							name: "volume",
							align: "tr",
							x: 10,
							y: 10
						}, {
							name: "streamButton",
							align: "tr",
							x: 0,
							y: 10
						}, {
							name: "speedButton",
							align: "tr",
							x: 0,
							y: 10
						}]
					}]
				})
			}
		}
	})
}

//学校页面
function schoolcenterApp(id) {
	new Vue({
		el: '#schoolApp',
		data: {
			headArr: [],
			courseArr: [],
			teacherArr: [],
			newsArr: [],
			slightArr: [],
			hotArr: [],
			showNote: false,
			note: '展开',
			noHeadData: false,
			statusArr: [],
			noCourseMore: true,
			noTeacherMore: true,
			noNewsMore: true,
			noSlightMore: true,
			noHotMore: true,
			noCourseData: false,
			noTeacherData: false,
			noNewsData: false,
			noSlightData: false,
			noHotData: false,
			courseIndex: 1,
			teacherIndex: 1,
			newsIndex: 1,
			slightIndex: 1,
			hotIndex: 1,
			pageSize: 6,
			mySwiper: {},
		},
		filters: {
			addCoursePre: function(e, t) {
				return ROOT + 'dist/coursedetail.html?courseId=' + e + '&courseKind=' + t
			},
			addTeacherPre: function(t) {
				return ROOT + 'dist/teachercenter.html?tId=' + t
			},
			addNewsPre: function(t) {
				return ROOT + 'dist/newsdetail.html?newsId=' + t
			}
		},
		mounted: function() {
			this.$nextTick(function() {
				this.getHead();
				this.getHot(this.hotIndex);
			})
		},
		methods: {
			getHead: function() {
				var _this = this;
				_this.$http.post(SERVERROOTDATA + 'Banner.ashx?action=getAppBanner', {
					organId: id,
					bannerType: 'school'
				}, {
					emulateJSON: true
				}).then(function(res) {
					if(res.body.code != 200) {
						return false;
					}
					if(res.body.totalPageCount == 0) {
						_this.noHeadData = true;
					}
					_this.headArr = res.body.rows;
				}).then(function() {
					_this.headArr.forEach(function(item, index) {
						Vue.set(item, 'bgiconPath', SERVERROOTFILE + item.iconPath);
						Vue.set(item, 'iconPath', SERVERROOTFILE + item.iconPath);
					})
				}).then(function() {
					_this.schoolSwiper();
				});
			},
			noteClick: function() {
				var _this = this;
				_this.showNote = !_this.showNote;
				if(_this.showNote) {
					_this.note = '隐藏'
				} else {
					_this.note = '展开'
				}

			},
			schoolSwiper: function() {
				var _this = this;
				_this.mySwiper = new Swiper('.feSchoolContainer', {
					autoHeight: true,
					pagination: {
						el: '.swiper-pagination',
						clickable: true,
						renderBullet: function(index, className) {

							switch(index) {
								case 0:
									var name = '热门课程';
									break;
								case 1:
									var name = '名师推荐';
									break;
								case 2:
									var name = '校园资讯';
									break;
								default:
									var name = '校园风采';
							}
							return '<span class="' + className + '">' + name + '</span>';
						}
					},
					on: {
						transitionStart: function() {
							_this.mySwiper.slideTo(this.activeIndex, 300, false);
							if(_this.statusArr[this.activeIndex].firstLoad) {
								_this.statusArr[this.activeIndex].firstLoad = false;

								switch(this.activeIndex) {
									case 0:
										_this.getCourse(_this.courseIndex);
										break;
									case 1:
										_this.getTeacher(_this.teacherIndex);
										break;
									case 2:
										_this.getNews(_this.newsIndex);
										break;
									default:
										_this.getSlight(_this.slightIndex);
								}
							}
						}
					},

				});

				for(i = 0; i < _this.mySwiper.pagination.bullets.length; i++) {
					_this.statusArr.push({
						firstLoad: true
					});

					if(_this.statusArr[0].firstLoad) { //初始第一个
						_this.getCourse(_this.courseIndex);
						_this.statusArr[0].firstLoad = false;

					}

					_this.mySwiper.pagination.bullets[i].index = i
					_this.mySwiper.pagination.bullets[i].onmouseover = function() {
						if(_this.statusArr[this.index].firstLoad) {
							_this.statusArr[this.index].firstLoad = false;
							switch(this.index) {
								case 0:
									_this.getCourse(_this.courseIndex);
									break;
								case 1:
									_this.getTeacher(_this.teacherIndex);
									break;
								case 2:
									_this.getNews(_this.newsIndex);
									break;
								default:
									_this.getSlight(_this.slightIndex);
							}

						}
					};

				}

			},
			getTeacher: function(t) {
				var _this = this;
				_this.teacherIndex = t;
				_this.$http.post(SERVERROOTDATA + 'Teacher.ashx?action=getSchoolTeacherList', {
					organId: id,
					pageIndex: _this.teacherIndex,
					pageSize: _this.pageSize,

				}, {
					emulateJSON: true
				}).then(function(res) {
					if(res.body.code != 200) {
						return false;
					}
					if(res.body.totalPageCount == 0) {
						_this.noTeacherData = true;
					}
					var replaceArr = res.body.rows;

					if(t < res.body.totalPageCount) {
						_this.noTeacherMore = false
					} else {
						_this.noTeacherMore = true
					}

					replaceArr.forEach(function(item, index) {
						Vue.set(item, 'iconPath', SERVERROOTFILE + item.iconPath);
						_this.teacherArr.push(item)
					})
				}).then(function() {
					_this.mySwiper.update();

				})
			},
			getCourse: function(t) {
				var _this = this;
				_this.courseIndex = t;
				_this.$http.post(SERVERROOTDATA + 'Course.ashx?action=getSchoolRecommendCourse', {
					organId: id,
					pageIndex: _this.courseIndex,
					pageSize: _this.pageSize,

				}, {
					emulateJSON: true
				}).then(function(res) {
					if(res.body.code != 200) {
						return false;
					}

					if(res.body.totalPageCount == 0) {
						_this.noCourseData = true;
					}
					var replaceArr = res.body.rows;

					if(t < res.body.totalPageCount) {
						_this.noCourseMore = false
					} else {
						_this.noCourseMore = true
					}

					replaceArr.forEach(function(item, index) {
						Vue.set(item, 'iconPath', SERVERROOTFILE + item.iconPath);
						_this.courseArr.push(item)
					})

				}).then(function() {
					_this.schoolSwiper();
					_this.mySwiper.update();
				})
			},
			getNews: function(t) {
				var _this = this;
				_this.newsIndex = t;
				_this.$http.post(SERVERROOTDATA + 'News.ashx?action=getAppOrganNews', {
					organId: id,
					pageIndex: _this.newsIndex,
					pageSize: _this.pageSize,
				}, {
					emulateJSON: true
				}).then(function(res) {
					if(res.body.code != 200) {
						return false;
					}
					if(res.body.totalPageCount == 0) {
						_this.noNewsData = true;
					}
					var replaceArr = res.body.rows;

					if(t < res.body.totalPageCount) {
						_this.noNewsMore = false
					} else {
						_this.noNewsMore = true
					}

					replaceArr.forEach(function(item, index) {
						Vue.set(item, 'iconPath', SERVERROOTFILE + item.iconPath);
						_this.newsArr.push(item)
					})

				}).then(function() {
					_this.mySwiper.update();
				})
			},
			getSlight: function(t) {
				var _this = this;
				_this.slightIndex = t;
				_this.$http.post(SERVERROOTDATA + 'News.ashx?action=getAppShimmerNews', {
					organId: id,
					pageIndex: _this.slightIndex,
					pageSize: _this.pageSize,
				}, {
					emulateJSON: true
				}).then(function(res) {
					if(res.body.code != 200) {
						return false;
					}
					if(res.body.totalPageCount == 0) {
						_this.noSlightData = true;
					}
					var replaceArr = res.body.rows;

					if(t < res.body.totalPageCount) {
						_this.noSlighMore = false
					} else {
						_this.noSlighMore = true
					}

					replaceArr.forEach(function(item, index) {
						Vue.set(item, 'iconPath', SERVERROOTFILE + item.iconPath);
						_this.slightArr.push(item)
					})

				}).then(function() {
					_this.mySwiper.update();
				})
			},
			getHot: function(t) {
				var _this = this;
				_this.hotIndex = t;
				_this.$http.post(SERVERROOTDATA + 'News.ashx?action=getAppInfraredImagesNews', {
					organId: id,
					pageIndex: _this.hotIndex,
					pageSize: _this.pageSize,
				}, {
					emulateJSON: true
				}).then(function(res) {
					if(res.body.code != 200) {
						return false;
					}
					if(res.body.totalPageCount == 0) {
						_this.noHotData = true;
						return false;
					}
					var replaceArr = res.body.rows;

					if(t < res.body.totalPageCount) {
						_this.noHotMore = false
					} else {
						_this.noHotMore = true
					}

					replaceArr.forEach(function(item, index) {
						Vue.set(item, 'iconPath', SERVERROOTFILE + item.iconPath);
						_this.hotArr.push(item)
					})

				}).then(function() {
					//_this.mySwiper.update();
				})
			}
		}
	})
}