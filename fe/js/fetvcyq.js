// 社区小组-话题小组
function communityGrounp() {
	new Vue({
		el: "#jcommunityGroup",
		data: {
			communitygroupArr: []
		},
		filters: {
			addRootFile: function addRootFile(img) {
				return ROOTFILE + img;
			}
		},
		mounted: function() {
			var _this = this;
			this.$nextTick(function() {
				_this.getGroupList();
			})
		},
		methods: {
			getGroupList: function() {
				var _this = this;
				this.$http.get(ROOTDATA + "communityGroup.json", {
						emulateJSON: true
					})
					.then(function(res) {
						_this.communitygroupArr = _this.communitygroupArr.concat(res.body);

					}).then(function() {
						_this.communitygroupArr.forEach(function(item, index) {

							Vue.set(item, "liveId", 'communitydetail.html?detailId=' + item.liveId); //注册变量
						})
					})
			},
			movieloadMore: function() {
				this.getGroupList();

			}
		}
	})
}

// 社区小组-右边
function communityGrounpRight() {
	new Vue({
		el: "#jgroupRight",
		data: {
			postArr: [],
			rightNewArr: []
		},
		filters: {
			addRootFile: function addRootFile(img) {
				return ROOTFILE + img;
			}
		},
		mounted: function() {
			var _this = this;
			this.$nextTick(function() {
				_this.rightHotTab();
				_this.postList(1); //默认发帖榜
				_this.newDynamic(); //最新动态
			})
		},
		methods: {
			postList: function(obj) {
				var _this = this;
				if(obj == 1) {
					this.$http.get(ROOTDATA + "hotGroup.json", {
							emulateJSON: true
						})
						.then(function(res) {
							_this.postArr = res.body;
						})
				} else {
					this.$http.get(ROOTDATA + "memberGroup.json", {
							emulateJSON: true
						})
						.then(function(res) {
							_this.postArr = res.body;
						})
				}

			},
			rightHotTab: function() {
				var _this = this;
				$("#jhottab").off("click", "a");
				$("#jhottab").on("click", "a", function(e) {
					$("#jhottab a").removeClass('active');
					$(this).addClass('active');
					var obj = $(this).data("id");
					_this.postList(obj);
				});
			},
			newDynamic: function() {
				var _this = this;
				this.$http.get(ROOTDATA + "newdynamic.json", {
						emulateJSON: true
					})
					.then(function(res) {
						_this.rightNewArr = res.body;
					})
			}
		}
	})
}

//学校首页banner			
function schoolIndexBanner(organId) {
	new Vue({
		el: "#jschoolIndexBanner",
		data: {
			bannerArr: [], //banner新闻
			bannerImgArr: [], //banner
			bannerNodata:false,//没数据时
			indexActive: 0
		},
		filters: {
			addRootFile: function addRootFile(img) {
				return SERVERROOTFILE + img;
			}
		},
		mounted: function() {
			var _this = this;
			this.$nextTick(function() {
				_this.getBannerImg();
				_this.getBannerList();
			})
		},
		methods: {
			getBannerImg: function() {
				var _this = this;
				this.$http.post(SERVERROOTDATA + "News.ashx?action=getOrganHomeNewsBanner", {
						organId: organId,
						pageSize: 3
					}, {
						emulateJSON: true
					})
					.then(function(res) {
						_this.bannerImgArr = res.body;
					}).then(function() {
						_this.bannerImgArr.forEach(function(item, index) {
							Vue.set(item, "liveId", 'schoolnewsdetail.html?newsId=' + item.newsId + "&organId=" + organId); //注册变量
							Vue.set(item, "img", SERVERROOTFILE + item.iconPath)
						})
					}).then(function() {
						_this.bannerSwiper();
					})
			},
			getBannerList: function() {
				var _this = this;
				this.$http.post(SERVERROOTDATA + "News.ashx?action=getHottestNews", {
						organId: organId,
						pageIndex: 1,
						pageSize: 10
					}, {
						emulateJSON: true
					})
					.then(function(res) {
						_this.bannerArr = res.body.rows;
						if(this.bannerArr.length < 1) {
							_this.bannerNodata = true;
							return false;
						}else{
							_this.bannerNodata = false;
						}
					}).then(function() {
						_this.bannerArr.forEach(function(item, index) {
							Vue.set(item, "liveId", 'schoolnewsdetail.html?newsId=' + item.newsId + "&organId=" + organId); //注册变量
						})
					})
			},
			changeCurrentShow: function changeCurrentShow(newsId, index) {
				this.indexActive = index;
			},
			bannerSwiper: function() {
				var schoolIndexswiper = new Swiper('.fe-school-banner-swiper', {
					pagination: '.swiper-pagination',
					paginationClickable: true,
					autoplay: 2000
				});
			}
		}
	})
}

//学校首页
function shoolIndexCon(organId) {
	new Vue({
		el: "#jschoolIndexCon",
		data: {
			coursemore: organId, //热门课程链接
			courseListArr: [], //热门课程
			teacherListArr: [], //名师推荐
			otherTeacherArr: [], //其他名师推荐
			informationArr: [], //校园资讯，
			styleArr: [], //校园风采
			indexActive: 0,
			courseListArrNodata:false,
			teacherListArrNodata:false,
			otherTeacherArrNodata:false,
			styleArrNodata:false
		},
		filters: {
			addCourseRoot: function addCourseRoot(href) {
				return ROOT + "schoolcourse.html?organId=" + href;
			},
			addTeacherRoot: function addTeacherRoot(href) {
				return ROOT + "schoolteacher.html?organId=" + href;
			},
			addStyleRoot: function addStyleRoot(href) {
				return ROOT + "schoolstyle.html?organId=" + href;
			},
			addRootFile: function addRootFile(img) {
				return SERVERROOTFILE + img;
			}
		},
		mounted: function() {
			var _this = this;
			this.$nextTick(function() {
				_this.getCourseList();
				_this.teacherRecommendList();
				_this.getInformationList();
				_this.getSchoolStyle();
				/*  _this.getStyleList();*/
			})
		},
		methods: {
			getCourseList: function() {
				var _this = this;
				this.$http.post(SERVERROOTDATA + "Course.ashx?action=getHotRecommendCourse", {
						organId: organId,
						pageIndex: 1,
						pageSize: 8
					}, {
						emulateJSON: true
					})
					.then(function(res) {
						if(res.body.rows.length<1){
							_this.courseListArrNodata = true;
						}else{
							_this.courseListArrNodata = false;
						}
						_this.courseListArr = res.body.rows;
					}).then(function() {
						_this.courseListArr.forEach(function(item, index) {
							if(item.recordType==0){
								Vue.set(item, "courseId", 'coursedetail.html?courseId=' + item.courseId); //注册变量
							}else if(item.recordType==1){
								Vue.set(item, "courseId", 'cloundcoursedetail.html?courseId=' + item.courseId); //注册变量
							}
							
						})
					})
			},
			teacherRecommendList: function() {
				var _this = this;
				this.$http.post(SERVERROOTDATA + "Teacher.ashx?action=getOrganRecommendTeacher", {
						organId: organId,
						pageIndex: 1,
						pageSize: 10
					}, {
						emulateJSON: true
					})
					.then(function(res) {
						if(res.body.length < 1) {
							_this.teacherListArrNodata = true;
							_this.otherTeacherArrNodata = true;
						} else {
							if(res.body[0].topTeacher[0].teacherName == undefined) {
								_this.teacherListArrNodata = true;
							} else {
								
								_this.teacherListArrNodata = false;
								_this.teacherListArr = res.body[0].topTeacher[0];
							}
							
							if(res.body[0].otherTeacher.rows.length <1) {
								_this.otherTeacherArrNodata = true;
							} else {
								_this.otherTeacherArrNodata = false;
								_this.otherTeacherArr = res.body[0].otherTeacher.rows;
							}
						}

					}).then(function() {
						if(_this.teacherListArr == undefined) {
							return false;
						} else {
							Vue.set(_this.teacherListArr, "liveId", 'teacherIndex.html?teacherId=' + _this.teacherListArr.teacherId); //注册变量
						}
						if(_this.otherTeacherArr.length < 1) {
							return false;
						} else {
							_this.otherTeacherArr.forEach(function(item, index) {
								Vue.set(item, "liveId", 'teacherIndex.html?teacherId=' + item.teacherId); //注册变量
							})
						}

					}).then(function() {
						_this.teacherSwiper();
					})
			},
			getInformationList: function() { //获取校园资讯
				var _this = this;
				this.$http.post(SERVERROOTDATA + "Organ.ashx?action=getOrgan", {
						organId: organId
					}, {
						emulateJSON: true
					})
					.then(function(res) {
						if(res.body.length < 1) {
							return false;
						} else {
							_this.informationArr = res.body[0];
						}

					}).then(function () {
					$(document).attr("title", _this.informationArr.name +"—福建教育网");
				})
			},
			getSchoolStyle: function() { //获取校园风采
				var _this = this;
				this.$http.post(SERVERROOTDATA + "News.ashx?action=getOrganGracefulBearing", {
						organId: organId,
						pageIndex: 1,
						pageSize: 10
					}, {
						emulateJSON: true
					})
					.then(function(res) {
						if(res.body.length < 1) {
							_this.styleArrNodata = true;
						}else{
							_this.styleArrNodata = false;
						}
						_this.styleArr = res.body.rows;
					}).then(function() {
						// _this.styleArr.forEach(function(item, index) {
						// 	Vue.set(item, "liveId", 'schoolstyle.html?detailId=' + item.newsId); //注册变量
						// })
					}).then(function() {
						jschoolSwiper(380); //图片宽度是380
					})
			},
			teacherSwiper: function() {
				var teacherswiper = new Swiper('.fe-teacher-swiper', {
					slidesPerView: 5,
					spaceBetween :60,
					slidesPerGroup: 1,
					centeredSlides: false,
					nextButton: '.swiper-button-next',
					prevButton: '.swiper-button-prev'
				});
			},
			storageActive: function storageActive(id) {
				$(window).storager({ //Uid
					key: 'navkeySchool',
					value: id,
					expires: 0
				}).addStorage();
			}
			/*,
			            getStyleList:function(){
			            	 var _this = this;
			                this.$http.get(ROOTDATA+"schoolteacherdata2.json", {emulateJSON: true})
			                    .then(function (res) {
			                    	  _this.getStyleList=res.body;
			                    	
			                }).then(function(){
			                	_this.getStyleList.forEach(function(item, index) {
										Vue.set(item, "liveId", 'communitydetail.html?detailId=' + item.liveId); //注册变量
									})
			                })
			            }*/
		}
	})
}

//学校-手风琴
function jschoolSwiper(imgwidth) {
	var aLi = $('#jschoolSwiper li');

	for(var i = 0; i < aLi.length; i++) {

		aLi[i].index = i;

		//预置图片位置
		if(i != 0) {
			//第一张宽度+后面每张图片显示出来的距离*(后面图片的下标-1)。
			aLi[i].style.left = imgwidth + 200 * (i - 1) + 'px';
		}
		//给每张图片添加鼠标移入事件
		aLi[i].onmouseover = function() {
			$(aLi).removeClass('active');
			$(this).addClass('active');
			for(var j = 0; j < aLi.length; j++) {
				if(j <= this.index) {
					move(aLi[j], 'left', 200 * j)
				} else {
					move(aLi[j], 'left', imgwidth + 200 * (j - 1))
				}
			}
		}
	}

	function getStyle(obj, attr) {
		if(obj.currentStyle) {
			return obj.currentStyle[attr]
		} else {
			return getComputedStyle(obj)[attr]
		}
	}

	function move(obj, attr, iTarget) {

		clearInterval(obj.timer)
		obj.timer = setInterval(function() {
			var speed = (iTarget - parseInt(getStyle(obj, attr))) / 10;
			speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
			if(iTarget == parseInt(getStyle(obj, attr))) {
				clearInterval(obj.timer);
			} else {
				obj.style[attr] = parseInt(getStyle(obj, attr)) + speed + 'px';
			}
		}, 10)
	}

}

//学校老师
function shoolTeacher(organId) {
	new Vue({
		el: "#jshoolTeacher",
		data: {
			// 筛选条件
			current: 1, //当前页
			gradeId: '',
			subjectId: '',

			allpage: '', //总页码
			gradeArr: [], //年级
			subjectArr: [], //学科
			teacherListArr: [], //左边老师列表
			dynamicListArr: [], //名师动态
			courseListArr: [], //推荐课程
			nodata: false,
			load: true,
			showItem: 6,
			allpage: 0,
		},
		filters: {
			addCourseRoot: function addCourseRoot(cid) {
				  return ROOT + "coursedetail.html?courseId=" + cid;
			},
            addCloundRoot: function addCloundRoot(newsId) {
                return ROOT + "cloundcoursedetail.html?courseId=" + newsId;
            },
			addRootFile: function addRootFile(img) {
				return SERVERROOTFILE + img;
			},
			downloadRoot: function downloadRoot(url) {
				return SERVERROOTFILE + url;
			},
			changeType: function changeType(type) {
				return type == 'courseware' ? "课件" : "文章";
			},
			getTime: function getTime(date) {
				return $.getCurrentTime(date, 3);
			}
		},
		mounted: function() {
			var _this = this;
			this.$nextTick(function() {
				_this.getLeftList(_this.gradeId, _this.subjectId, _this.current);
				_this.rightDynamicList();
				_this.rightCourseList();
				_this.getSelectlist();
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
			getSelectlist: function() {
				var _this = this;
				// 年级
				this.$http.post(SERVERROOTDATA + "Grade.ashx?action=getGrade", {
						organId: organId
					}, {
						emulateJSON: true
					})
					.then(function(res) {
						_this.gradeArr = res.body;
					}).then(function() {
						$('#grade').on('click', 'a', function() {
							_this.gradeId = $(this).data('id');
							_this.subjectId = '';
							$('#subject a').removeClass('active');
							$(this).siblings('a').removeClass('active');
							$(this).addClass('active');
							// 已选项显示栏操作
							$('.fe-schoolteacher-head-title a:nth-child(3)').html($(this).html());
							$('.fe-schoolteacher-head-title a:nth-child(4)').html('');
							_this.$http.post(SERVERROOTDATA + "Subject.ashx?action=getSubject", {
									gradeId: $(this).data('id'),
									organId: organId
								}, {
									emulateJSON: true
								})
								.then(function(res) {
									_this.subjectArr = res.body;
								})
							_this.current = 1;
							_this.teacherListArr = []; //清空数据
							_this.getLeftList(_this.gradeId, _this.subjectId, _this.current);
						})
					})
				// 学科
				this.$http.post(SERVERROOTDATA + "Subject.ashx?action=getSubject", {
						gradeId: $(this).data('id') == undefined ? '' : $(this).data('id'),
						organId: organId
					}, {
						emulateJSON: true
					})
					.then(function(res) {
						_this.subjectArr = res.body;
					}).then(function() {
						$('#subject').on('click', 'a', function() {
							$(this).siblings('a').removeClass('active');
							$(this).addClass('active');
							$('.fe-schoolteacher-head-title a:nth-child(4)').html($(this).html());
						})
					})
			},
			getsubject: function(p) { //绑定学科 点击按钮
				var _this = this;
				_this.subjectId = p;
				_this.current = 1;
				_this.teacherListArr = []; //清空数据
				_this.getLeftList(_this.gradeId, _this.subjectId, _this.current);
			},
			getLeftList: function(gradeId, subjectId, pageIndex) {
				var _this = this;
				this.$http.post(SERVERROOTDATA + "Teacher.ashx?action=getOrganTeacherList", {
						organId: organId,
						subjectId: subjectId,
						gradeId: gradeId,
						pageIndex: pageIndex,
						pageSize: _this.showItem
					}, {
						emulateJSON: true
					})
					.then(function(res) {
						/*if(res.body.rows.length < 1) {
							_this.nodata = true;
						} else {
							_this.teacherListArr = _this.teacherListArr.concat(res.body.rows);
							_this.nodata = false;
						}
						if(pageIndex >= res.body.totalPageCount) {
							_this.load = false;
						} else {
							_this.load = true;
						}*/
						if(res.body.rows.length < 1) {
							_this.nodata = true;
							console.log('没有数据')
							//return false;
						}else{
							_this.nodata = false;
						}
						_this.allpage = res.body.totalPageCount;
						 _this.teacherListArr = res.body.rows;

					}).then(function() {
						_this.teacherListArr.forEach(function(item, index) {
							Vue.set(item, "liveId", 'teacherindex.html?teacherId=' + item.teacherId); //注册变量
							
						})
					})
			},
			rightDynamicList: function() { //名师动态
				var _this = this;
				this.$http.post(SERVERROOTDATA + "Teacher.ashx?action=getTeacherDynamic", {
						organId: organId,
						pageIndex: 1,
						pageSize: _this.showItem
					}, {
						emulateJSON: true
					})
					.then(function(res) {
						_this.dynamicListArr = res.body.rows;
					}).then(function() {
						_this.dynamicListArr.forEach(function(item, index) {
							Vue.set(item, "liveId", 'teacherindex.html?teacherId=' + item.operatorId); //注册变量
							Vue.set(item, "briefId", 'articledetail.html?articleId=' + item.studioResourceId); //注册变量
						})
					})
			},
			rightCourseList: function() {
				var _this = this;
				this.$http.post(SERVERROOTDATA + "Course.ashx?action=getOrganRecommendCourse", {
						organId: organId,
						pageIndex: 1,
						pageSize: 2
					}, {
						emulateJSON: true
					})
					.then(function(res) {
						_this.courseListArr = res.body.rows;

					}).then(function() {
						_this.courseListArr.forEach(function(item, index) {
							if(item.recordType==0){
								Vue.set(item, "liveId", 'coursedetail.html?courseId=' + item.courseId); //注册变量
							}else if(item.recordType==1){
								Vue.set(item, "liveId", 'cloundcoursedetail.html?courseId=' + item.courseId); //注册变量
							}
							
						})
					})
			},
			addDownloadRecord:function (id,url) {//下载保存记录
				var _this = this;
				var studentId=$(window).storager({key: 'feUid'}).readStorage();
				var userType=$(window).storager({key: 'feUType'}).readStorage();
				if(studentId==null||studentId==undefined||studentId=='undefined'){
					layer.msg('请先登录');
					setTimeout(function () {
						window.location.href = ROOT+"login.html";
					},1000);
					return;
				}
				var uType='';
				if(userType==1){
					uType='student';
				}else if(userType==2){
					uType='parent';
				}else if(userType==3){
					uType='teacher';
				}
				this.$http.post(SERVERROOTDATA + "ResourceDownload.ashx?action=resourceDownloadSave",
					{
						userId:studentId,
						userType:uType,
						saveTag:'add',
						studioResourceId:id
					}
					,{emulateJSON: true})
					.then(function (res) {});
				var form=$("<form>");//定义一个form表单
				form.attr("style","display:none");
				form.attr("target","");
				form.attr("method","get");  //请求类型
				form.attr("action",SERVERROOTFILE + url);   //请求地址
				$("body").append(form);//将表单放置在web中
				form.submit();//表单提交
			},
			goto: function(index) { //枫叶处理
				var _this = this;
				if(index == this.current) return;
				if(index > this.allpage) {
					this.current = this.current - 2;
					layer.msg("Sorry ╮(╯_╰)╭ 没有下一页喽！");
					return false;
				}
				_this.current = index;
				_this.getLeftList(_this.gradeId, _this.subjectId, _this.current);
			}
		}
	})
}

//学校资讯
function shoolInformation(organId) {
	new Vue({
		el: "#jshoolInformation",
		data: {
			current: 1, //当前页
			leftListArr: [], //左边资讯
			rightHotArr: [], //右边资讯
			nodata: false,
			rightHotArrNodata:false,
			load: true,
			showItem: 6,
			allpage: 0,
		},
		filters: {
			addRootFile: function addRootFile(img) {
				return SERVERROOTFILE + img;
			}
		},
		mounted: function() {
			var _this = this;
			this.$nextTick(function() {
				_this.getLeftList(_this.current);
				_this.rightHotList();
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
			getLeftList: function(pageIndex) {
				var _this = this;
				this.$http.post(SERVERROOTDATA + "News.ashx?action=getOrganNews", {
						organId: organId,
						pageIndex: pageIndex,
						pageSize: _this.showItem
					}, {
						emulateJSON: true
					})
					.then(function(res) {
						if(res.body.rows.length < 1) {
							_this.nodata = true;
						} else {
							
							_this.allpage = res.body.totalPageCount;
							_this.leftListArr = res.body.rows;
							_this.nodata = false;
						}
						
					}).then(function() {
						_this.leftListArr.forEach(function(item, index) {

							Vue.set(item, "liveId", 'schoolnewsdetail.html?newsId=' + item.newsId + "&organId=" + organId); //注册变量
						})
					})
			},
			informationloadMore: function() {
				this.getLeftList(++this.current);

			},
			rightHotList: function() {
				var _this = this;
				this.$http.post(SERVERROOTDATA + "News.ashx?action=getHottestNews", {
						organId: organId,
						pageIndex: 1,
						pageSize: 10
					}, {
						emulateJSON: true
					})
					.then(function(res) {
						if(res.body.rows.length<1){
							_this.rightHotArrNodata=true;
						}else{
							_this.rightHotArrNodata=false;
						}
						
						_this.rightHotArr = res.body.rows;

					}).then(function() {
						_this.rightHotArr.forEach(function(item, index) {
							Vue.set(item, "liveId", 'schoolnewsdetail.html?newsId=' + item.newsId + "&organId=" + organId); //注册变量
						})
					})
			},
			goto: function(index) { //枫叶处理
				var _this = this;
				if(index == this.current) return;
				if(index > this.allpage) {
					this.current = this.current - 2;
					layer.msg("Sorry ╮(╯_╰)╭ 没有下一页喽！");
					return false;
				}
				_this.current = index;
				_this.getLeftList( _this.current);
			}
		}
	})
}

//学校风格banner			
function schoolStyleBanner(organId) {
	new Vue({
		el: "#jschoolStyleBanner",
		data: {
			bannerArr: [] //banner
		},
		filters: {
			addRootFile: function addRootFile(img) {
				return SERVERROOTFILE + img;
			}
		},
		mounted: function() {
			var _this = this;
			this.$nextTick(function() {
				_this.getBannerList();
			})
		},
		methods: {
			getBannerList: function() {
				var _this = this;
				this.$http.post(SERVERROOTDATA + "News.ashx?action=getOrganNewsBanner", {
						organId: organId,
						pageIndex: 1,
						pageSize: 10
					}, {
						emulateJSON: true
					})
					.then(function(res) {
						if(res.length < 1) {
							return false;
						}
						_this.bannerArr = res.body;
					}).then(function() {
						_this.bannerArr.forEach(function(item, index) {
							Vue.set(item, "liveId", 'schoolnewsdetail.html?newsId=' + item.newsId + "&organId=" + organId); //注册变量
							Vue.set(item, "img", SERVERROOTFILE + item.iconPath)
						})
					}).then(function() {
						_this.bannerSwiper();
					})
			},
			bannerSwiper: function() {
				var schoolstyleIndexswiper = new Swiper('.fe-schoolstyle-banner-swiper', {
					pagination: '.swiper-pagination',
					paginationClickable: true,
					autoplay: 2000
				});
				$('.fe-schoolstyle-banner-swiper').hover(function() {
					schoolstyleIndexswiper.stopAutoplay();
				}, function() {
					schoolstyleIndexswiper.startAutoplay();

				});
			}
		}
	})
}

//学校风格内容		
function schoolStyleCon(organId) {
	new Vue({
		el: "#jschoolStyleCon",
		data: {
			slightArr: [], //微光
			hotArr:[],//热图
			hotLeftArr: [], //热图左边
			hotRightArr: [], //热图右边大图
			youthArr:[],//致青春
			youthLeftArr: [], //致青春左大
			youthRightArr: [],//致青春右
			teacherArr: [], //名师风采
			hotCurrent:1,//热图默认页数
			hotAllPage:0,//热图总页数
			youthCurrent:1,//致青春默认页数
			youthAllPage:0,//致青春总页数
			hotLeftArrNodata: false, //热图左边
			hotRightArrNodata: false, //热图右边大图一个
			youthLeftArrNodata: false, //致青春左大
			youthRightArrNodata: false, //致青春右2
			slightArrNodata:false,//微光无数据
			teacherArrNodata:false,//名师风采无数据
		},
		filters: {
			addRootFile: function addRootFile(img) {
				return SERVERROOTFILE + img;
			}
		},
		mounted: function() {
			var _this = this;
			this.$nextTick(function() {
				_this.getSlightList(); //微光
				_this.getHotList(_this.hotCurrent); //热图,默认第一页
				_this.getYouthList(_this.youthCurrent); //致青春
				_this.getTeacherList(); //名师风采
			})
		},
		methods: {
			getSlightList: function() { //微光
				var _this = this;
				this.$http.post(SERVERROOTDATA + "News.ashx?action=getShimmerNews", {
						organId: organId,
						pageIndex: 1,
						pageSize: 20
					}, {
						emulateJSON: true
					})
					.then(function(res) {
						if(res.body.rows.length < 1) {
							_this.slightArrNodata = true;
							
						}else{
							_this.slightArrNodata = false;
						}
						_this.slightArr = res.body.rows;
					}).then(function() {
						_this.bannerSwiper();
					})
			},
			getHotList: function(current) { //热图
				var _this = this;
				this.$http.post(SERVERROOTDATA + "News.ashx?action=getInfraredImagesNews", {
						organId: organId,
						pageIndex: current,
						pageSize: 5
					}, { //多组数据(schoolStyledata2.json)，一组最少5个,一组多个数据(schoolStyledata5.json)
						emulateJSON: true
					})
					.then(function(res) {
						/*res.body.forEach(function(value, index) {//多组数据(schoolStyledata2.json)
							if(value.length < 4) {
								return false;
							}

						});
						var i=0;
						_this.hotLeftTop = res.body[i][0]; //左上
						_this.hotRightTop = res.body[i][1]; //右上
						_this.hotLeftBottom = res.body[i][2]; //左下
						_this.hotRightBottom = res.body[i][3]; //右下
						_this.hotRightArr = res.body[i][4];

						if(i<=res.body.length){
							
							$('#jHotChange').click(function(){
								i++;console.log(i)
								if(i>=res.body.length){
									i=0;
							}

						_this.hotLeftTop = res.body[i][0]; //左上
						_this.hotRightTop = res.body[i][1]; //右上
						_this.hotLeftBottom = res.body[i][2]; //左下
						_this.hotRightBottom = res.body[i][3]; //右下
						_this.hotRightArr = res.body[i][4];
							});
							
						}*/
						if(res.body.rows == undefined) {
							return false
						}
						_this.hotArr = res.body.rows;
						if(_this.hotArr.length<1){
							_this.hotLeftArrNodata = true;
							_this.hotRightArrNodata = true;
						}
						
						/*if(res.body.rows[0] != undefined) {
							_this.hotLeftTopNodata = false;
							_this.hotLeftTop = [];
							_this.hotLeftTop.push (res.body.rows[0]) ; //左上*/
							/*_this.hotLeftTop =  res.body.rows[0];*/
						/*}else{
							_this.hotLeftTopNodata = true;
						}
						
						if(res.body.rows[1] != undefined) {
							_this.hotRightTopNodata = false;
							_this.hotRightTop = res.body.rows; //右上
						}else{
							_this.hotRightTopNodata = true;
						}
					
					
						if(res.body.rows[2] != undefined) {
							_this.hotLeftBottomNodata = false;*/
							/*_this.hotLeftBottom = res.body.rows[2]; //左下*/
							/*_this.hotLeftBottom = [];
							_this.hotLeftBottom.push (res.body.rows[2]) ; //左上
						}else{
							_this.hotLeftBottomNodata = true;
						}
						
						if(res.body.rows[3] != undefined) {
							_this.hotRightBottomNodata = false;
							_this.hotRightBottom = res.body.rows[3]; //右下
						}else{
							_this.hotRightBottomNodata = true;
						}
						
						if(res.body.rows[4] != undefined) {
							_this.hotRightArrNodata = false;
							_this.hotRightArr = res.body.rows[4];
						}else{
							_this.hotRightArrNodata = true;
						}
						_this.hotLeftTop = res.body.rows;
						_this.hotAllPage = res.body.totalPageCount;*/
/*
						var i = 0;

						if(i <= res.body.rows.length / 5) {

							$('#jHotChange').click(function() {
								i++;
								console.log(i);
								if(res.body.rows.length % 5 != 0) {

									if(i >= res.body.rows.length / 5 - 1) {
										i = 0;
										if(res.body.rows.length / 5 - 1 < '1') {
											alert('数据太少了~')
										}
									}

								} else {
									if(i >= res.body.rows.length / 5) {
										i = 0;
									}

								}
								_this.hotLeftTop = res.body.rows[0 + 5 * i]; //左上
								_this.hotRightTop = res.body.rows[1 + 5 * i]; //右上
								_this.hotLeftBottom = res.body.rows[2 + 5 * i]; //左下
								_this.hotRightBottom = res.body.rows[3 + 5 * i]; //右下
								_this.hotRightArr = res.body.rows[4 + 5 * i];
							});
						}*/
					}).then(function(){
						
						_this.hotLeftArr=[];
						_this.hotRightArr = [];
					}).then(function(){
						setTimeout(function(){
							_this.hotArr.forEach(function(item,index){
							
							if(index<4){
								_this.hotLeftArrNodata = false;
								_this.hotRightArrNodata = true;
								_this.hotLeftArr.push (item) ;
							}else if(index==4){
								_this.hotRightArrNodata = false;
								
								_this.hotRightArr.push (item) ;
							}
							
						})
						},10);
						
					})
			},
			getYouthList: function(current) { //致青春
				var _this = this;
				this.$http.post(SERVERROOTDATA + "News.ashx?action=getSoYoungNews", {
						organId: organId,
						pageIndex: current,
						pageSize: 3
					}, {
						emulateJSON: true
					})
					.then(function(res) {
						if(res.body.rows == undefined) {
							return false;
						}

						_this.youthArr = res.body.rows;
						_this.youthAllPage = res.body.totalPageCount;
						if(_this.youthArr.length<1){
							_this.youthLeftArrNodata = true;
							_this.youthRightArrNodata = true;
						}
						/*var i = 0;

						if(i <= res.body.rows.length / 3) {

							$('#jYouthChange').click(function() {
								i++;
								if(res.body.rows.length % 3 != 0) {

									if(i >= res.body.rows.length / 3 - 1) {
										i = 0;
										if(res.body.rows.length / 3 - 1 < '1') {
											console.log('数据太少了~');
											return false;
										}
									}

								} else {
									if(i >= res.body.rows.length / 3) {
										i = 0;
									}

								}
								console.log(i)
								_this.youthLeftArr = res.body.rows[0 + i * 3]; //致青春左大
								_this.youthRightOne = res.body.rows[1 + i * 3]; //致青春右1
								_this.youthRightTwo = res.body.rows[2 + i * 3]; //致青春右2
							});
						}*/

					}).then(function(){
						_this.youthLeftArr=[];
						_this.youthRightArr = [];
					}).then(function(){
						setTimeout(function(){
							_this.youthArr.forEach(function(item,index){
							
							if(index<1){
								_this.youthLeftArr.push (item);
								_this.youthRightArrNodata = true;
							}else {
								_this.youthRightArrNodata = false;
								_this.youthRightArr.push (item) ;
							}
						})
						},10)
					})
			},
			getTeacherList: function() { //名师风采
				var _this = this;
				this.$http.post(SERVERROOTDATA + "Teacher.ashx?action=getOrganFamousTeacher", {
						organId: organId,
						pageIndex: 1,
						pageSize: 10
					}, {
						emulateJSON: true
					})
					.then(function(res) {
						if(res.body.rows.length < 1) {
							_this.teacherArrNodata = true;
						}else{
							_this.teacherArrNodata = false;
						}
						_this.teacherArr = res.body.rows;
					}).then(function() {
						_this.teacherArr.forEach(function(item, index) {
							Vue.set(item, "liveId", 'teacherindex.html?teacherId=' + item.teacherId); //注册变量
						})
					}).then(function() {
						var teacherswiper = new Swiper('.fe-schoolstyle-teacher-swiper', {
							slidesPerView: 4,
							spaceBetween: 20,
							centeredSlides: false,
							prevButton: '#teacherswiper-button-prev',
							nextButton: '#teacherswiper-button-next',
						});
					})
			},
			bannerSwiper: function() {
				var slightswiper = new Swiper('.fe-schoolstyle-slight-swiper', {
					slidesPerView: 3,
					spaceBetween: 20,
					centeredSlides: false,
					nextButton: '#swiper-button-next',
					prevButton: '#swiper-button-prev'
				});

			},
			changeList: function(i) { //换一批
				var _this = this;
			
				if(_this.hotCurrent>=_this.hotAllPage){
					_this.hotCurrent = 0;
				}
				if(_this.youthCurrent>=_this.youthAllPage){
					_this.youthCurrent = 0;
				}
				
				if(i == '0') {
					_this.getHotList(++_this.hotCurrent);
				} else {
					_this.getYouthList(++_this.youthCurrent);
				}
				
			}
		}
	})
}
//题库-首页-搜索
function questionIndexSearch() {
	new Vue({
		el: "#jQuestionIndexSearch",
		data: {
			keywordsList: [] //热门关键字
		},
		filters: {
			addRootFile: function addRootFile(img) {
				return ROOTFILE + img;
			}
		},
		mounted: function() {
			var _this = this;
			this.$nextTick(function() {
				_this.getInputValue(); //点击搜索
				_this.getQuestionList(); //获取热门关键字
			})
		},
		methods: {
			getQuestionList: function() {
				var _this = this;
				this.$http.get(ROOTDATA + "questionindexsearch.json", {
						emulateJSON: true
					})
					.then(function(res) {
						if(res.length < 1) {
							return false;
						}
						_this.keywordsList = res.body; //热门关键字

					}).then(function() {
						_this.keywordsList.forEach(function(item, index) {
							Vue.set(item, "href", 'questionexercise.html?pageType=' + item.keywords); //注册变量
						});
					})
			},
			enterInput:function(obj){
				var name = $(obj.target).val();
					if(name != "") {
						window.location.href = 'questionexercise.html?pageType=' + name;
					} else {
						alert('请输入搜索关键字~')
					}
			},
			getInputValue: function() {
				$('#jQuestionSearch').click(function() { //点击搜索
					var name = $(this).siblings('input').val();
					if(name != "") {
						$(this).attr('href', 'questionexercise.html?pageType=' + name);
					} else {
						alert('请输入搜索关键字~')
					}

				});
			}
		}
	})
}


	
//题库-首页-列表
function questionIndex() {
	new Vue({
		el: "#jQuestionIndex",
		data: {
			hotList: [], //热门试卷
			newList: [], //最新试卷
			downList: [] //下载排行
		},
		filters: {
			addRootFile: function addRootFile(img) {
				return ROOTFILE + img;
			}
		},
		mounted: function() {
			var _this = this;
			this.$nextTick(function() {
				_this.getHotPaper();
				_this.getNewPaper();
				_this.getDownPaper();
			})
		},
		methods: {
			getHotPaper: function() {
				var _this = this;
				this.$http.post(SERVERROOTDATA + "questionWeb.ashx?action=getHotPaper", {}, {
						emulateJSON: true
					})
					.then(function(res) {
						if(res.length < 1 || isEmptyObject(res.body[0])) {
							return false;
						}
						_this.hotList = res.body; //热门试卷列表
					}).then(function() {
						_this.hotList.forEach(function(item, index) {
							Vue.set(item, "examPaperId", 'questiontopic.html?examPaperId=' + item.examPaperId); //注册变量
						});
					})
			},
			getNewPaper: function() {
				var _this = this;
				this.$http.post(SERVERROOTDATA + "questionWeb.ashx?action=getNewPaper", {}, {
						emulateJSON: true
					})
					.then(function(res) {
						if(res.length < 1 || isEmptyObject(res.body[0])) {
							return false;
						}
						_this.newList = res.body; //最新试卷列表
					}).then(function() {
						_this.newList.forEach(function(item, index) {
							Vue.set(item, "examPaperId", 'questiontopic.html?examPaperId=' + item.examPaperId); //注册变量
						});
					})
			},
			getDownPaper: function() {
				var _this = this;
				this.$http.post(SERVERROOTDATA + "questionWeb.ashx?action=getDownPaper", {}, {
						emulateJSON: true
					})
					.then(function(res) {
						if(res.length < 1 || isEmptyObject(res.body[0])) {
							return false;
						}
						_this.downList = res.body; //下载排行列表
					}).then(function() {
						_this.downList.forEach(function(item, index) {
							Vue.set(item, "examPaperId", 'questiontopic.html?examPaperId=' + item.examPaperId); //注册变量
						})
					})
			},
			gettestname: function(name) {
				localStorage.setItem("testname", name);
			}
		}
	})
}

//题库-题目			
function questionTopic(examPaperId) {
	new Vue({
		el: "#jQuestionTopic",
		data: {
			topicList: [], //题目列表
			selectList: [], //选项列表
			isNoData:1,// 0 没数据，1有数据   默认有数据1
			totalCount: 0, //题目总数
			current: 1, //当前页面
			showItem: 10, //展示条数
			allPage: 0 //总页数

		},
		filters: {
			addRootFile: function addRootFile(img) {
				return SERVERROOTFILE + img;
			}
		},
		mounted: function() {
			var _this = this;
			this.$nextTick(function() {
				_this.getQuestionList(_this.current);
				_this.questionCardHeight();
			})
		},
		methods: {
			getQuestionList: function(curentPage) {
				var _this = this;
				this.$http.post(SERVERROOTDATA + "questionWeb.ashx?action=getExamPaper", {
						pageIndex: curentPage,
						pageSize: _this.showItem,
						examPaperId: examPaperId
					}, {
						emulateJSON: true
					})
					.then(function(res) {
						if(res.body.length < 1) {//如果返回数据为空时
							_this.isNoData=0;// 0 没数据，1有数据   默认有数据1
							
							return false;
						}
						_this.allPage = res.body.totalPageCount; //总页数
						if(_this.current >= _this.allPage) {
							$('.fe-questiontopic-more').css('display', 'none');
						}
						_this.totalCount = parseInt(res.body.totalCount); //题目总数
						_this.topicList = _this.topicList.concat(res.body.rows); //题目列表

					}).then(function() {
						$(".fe-questiontopic-card-box").mCustomScrollbar();
						_this.selectOption();
					})
			},
			selectOption: function() {
				var s = $('.fe-questiontopic-card-box li');
				$(".fe-questiontopic-list li").on('click', 'div', function() { //选题
					var answer = $(this).find('span').html();
					var num = $(this).siblings('p').find('a').html() - 1;
					$(s[num]).addClass('active');
					$(this).siblings().removeClass('active');
					$(this).addClass('active');
					$(this).siblings('p').find('span').html(answer);
				});
			},
			questionMore: function() {
				var _this = this;
				_this.current++;
				if(_this.current <= _this.allPage) {
					this.getQuestionList(_this.current);
				} else { //大于总页数时，更多隐藏
					$('.fe-questiontopic-more').css('display', 'none');
				}
			},
			questionPost: function() {
				var _this = this;
				var completedoms = $('.fe-questiontopic-card-box').find('.active');
				if(completedoms.length < this.totalCount) {
					layer.msg('有未答题，确定要提交？', {
						time: 0 //不自动关闭
							,
						btn: ['确定', '取消'],
						yes: function(index) {
							layer.msg('提交成功！');
							_this.postAnswer();
						}
					});
				}else{
					_this.postAnswer();
				}
				
			},
			postAnswer:function(){
				layer.msg('提交成功！');
				var doms = $('.fe-questiontopic-list li');
				var rightnum = 0; //答对题数
				var right, error;
				for(var i = 0; i < doms.length; i++) {
					right = $(doms[i]).find('input').val();
					error = $(doms[i]).find('.active').find('span').html();
					if(right == error) {
						rightnum++;
					}
				}
				var completedoms = $('.fe-questiontopic-card-box').find('.active');
				window.localStorage.setItem('rightnum', rightnum); //正确题数
				window.localStorage.setItem('completenum', completedoms.length); //完成题数
				window.localStorage.setItem('timunum', this.totalCount); //总题数
				setTimeout(function() {
					window.location.href = "questionreport.html?examPaperId=" + examPaperId;
				}, 1000);
			},
			questionCardHeight: function() {
				$(window).scroll(function() {
					var scrollheight = $(document).scrollTop();
					if(scrollheight > '0') {
						$('#jQuestionCard').css({
							'margin-top': '0px',
							'top': '200px'
						});
					} else {
						$('#jQuestionCard').css({
							'margin-top': '240px',
							'top': '0'
						});
					}
				});

			}
		}
	})
}

//题库-解析		
function questionAnalysis(id) {
	new Vue({
		el: "#jQuestionAnalysis",
		data: {
			topicList: [], //题目列表
			// selectList: [], //选项列表
			current: 1, //当前条位置财经
			showItem: 10, //展示条数
			allPage: 0 //总页数

		},
		filters: {
			addRootFile: function addRootFile(img) {
				return SERVERROOTFILE + img;
			}
		},
		mounted: function() {
			var _this = this;
			this.$nextTick(function() {
				_this.getQuestionList(1);
			})
		},
		methods: {
			getQuestionList: function(curentPage) {
				var _this = this;
				this.$http.post(SERVERROOTDATA + "questionWeb.ashx?action=getExamPaper", {
						pageIndex: curentPage,
						pageSize: _this.showItem,
						examPaperId: id
					}, {
						emulateJSON: true
					})
					.then(function(res) {
						if(res.length < 1) {
							return false;
						}
						_this.allPage = res.body.totalPageCount; //总页数
						if(_this.current >= _this.allPage) {
							$('.fe-questionanalysis-more').css('display', 'none');
						}
						_this.topicList = _this.topicList.concat(res.body.rows); //题目列表

					}).then(function() {
						// _this.topicList.forEach(function(item, index) {
						// 	_this.selectList = item.questionOptions;
						// })
					})
			},
			questionMore: function() {
				var _this = this;
				_this.current++;
				if(_this.current <= _this.allPage) {
					this.getQuestionList(_this.current);
				} else { //大于总页数时，更多隐藏
					$('.fe-questionanalysis-more').css('display', 'none');
				}
			}
		}
	})
}

//题库-模拟练习	
function questionExercise(type) {
	new Vue({
		el: "#jQuestionExercise",
		data: {
			sectionList: [], //学段
			yearList: [], //年段
			subjectList: [], //学科
			topicList: [], //题目列表
			isNoData:1,// 0 没数据，1有数据   默认有数据1
			current: 1, //当前条位置财经
			showItem: 10, //展示条数
			allpage: 0 //总页数
		},
		filters: {
			addRootFile: function addRootFile(img) {
				return SERVERROOTFILE + img;
			}
		},
		mounted: function() {
			var _this = this;
			this.$nextTick(function() {
				// _this.getQuestionHead();
				_this.getQuestionList(1);
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
			// getQuestionHead: function() {
			// 	var _this = this;
			// 	this.$http.get(ROOTDATA + "questionselect.json", {
			// 			emulateJSON: true
			// 		})
			// 		.then(function(res) {
			// 			if(res.length < 1) {
			// 				return false;
			// 			}
			// 			_this.sectionList = res.body; //题目列表
			//
			// 		}).then(function() {
			// 			$('#jSectionSelect a').click(function() { //根据选择学段获取年段值
			// 				$(this).siblings().removeClass('active');
			// 				$(this).addClass('active');
			// 				var num = $(this).attr("data-id") - 1;
			// 				_this.yearList = _this.sectionList[num].nianduan;
			// 				$('#jYearSelect a').click(function() { //根据选择年段获取学科
			// 					$(this).siblings().removeClass('active');
			// 					$(this).addClass('active');
			// 					var num = $(this).attr("data-id") - 1;
			// 					_this.subjectList = _this.yearList[num].xueke;
			// 					$('#jSubjectSelect a').click(function() { //根据选择年段获取学科
			// 					$(this).siblings().removeClass('active');
			// 					$(this).addClass('active');
			// 				});
			// 				});
			//
			// 			});
			// 		}).then(function() {
			// 			/*$('#jYearSelect a').click(function() { //根据选择学段获取年段值
			// 				$(this).siblings().removeClass('active');
			// 				$(this).addClass('active');
			// 				var num = $(this).attr("data-id") - 1;
			// 				_this.subjectList = _this.yearList[num].xueke;
			// 			});*/
			// 		}).then(function() {
			// 			_this.questionSelect();
			// 		})
			//
			// },
			getQuestionList: function(curentPage) {
				var _this = this;
				this.$http.post(SERVERROOTDATA + "questionWeb.ashx?action=getPracticeList", {
						key: type,
						pageIndex: curentPage,
						pageSize: _this.showItem
					}, {
						emulateJSON: true
					})
					.then(function(res) {
						if(res.body.rows.length < 1) {
							_this.isNoData = 0;//没有数据
							//return false;
						}
						 _this.allPage = res.body.totalPageCount; //总页数
						if(_this.current >= _this.allPage) {
							$('.fe-questionexercise-more').css('display', 'none');
						}
						_this.topicList =res.body.rows; //题目列表
						//_this.topicList = _this.topicList.concat(res.body.rows); //题目列表

					}).then(function() {
						_this.topicList.forEach(function(item, index) {
							Vue.set(item, "examPaperId", 'questiontopic.html?examPaperId=' + item.examPaperId); //注册变量
						})
					})
			},
			questionMore: function() {
				var _this = this;
				_this.current++;
				if(_this.current <= _this.allPage) {
					this.getQuestionList(_this.current);
				} else { //大于总页数时，更多隐藏
					$('.fe-questionexercise-more').css('display', 'none');
				}
			},
			questionSelect: function() {
				$('.fe-questionexercise-head-select a').click(function() {
					$(this).siblings().removeClass('active');
					$(this).addClass('active');
				})
			},
			gettestname: function(name) {
				localStorage.setItem("testname", name);
			}, 
			goto: function(index) { //枫叶处理
                var _this=this;
                if(index == this.current) return;
                if(index > this.allpage) {
                    this.current = this.current - 2;
                    layer.msg("Sorry ╮(╯_╰)╭ 没有下一页喽！");
                    return false;
                }
                _this.current = index;
                _this.getQuestionList(_this.current);
            }
		}
	})
}
// 题库-报告结果
function questionReport(id) {
	var timunum = localStorage.getItem("timunum"); //题目总数
	var testname = localStorage.getItem("testname"); //试卷名字
	var rightnum = localStorage.getItem("rightnum"); //正确题数
	var completenum = localStorage.getItem("completenum"); //完成题数
	$('.fe-questionreport-contain .fe-questionreport-title h2 span').html(testname);
	$('.fe-questionreport-contain .fe-questionreport-title p').html("[试题 " + timunum + " 道 答题时间 120分钟]");
	$('.fecomplete>span>em').html(completenum);
	$('.fecomplete>em').html((completenum / timunum).toFixed(2) * 100);
	$('.fezhengque>span>em').html(rightnum);
	$('.fezhengque>em').html((rightnum / timunum).toFixed(2) * 100);
	$('.fescore>em').html(rightnum * 5);
	$('.fe-questionreport-percent span').css('left', (completenum / timunum).toFixed(2) * 100 - 5 + "%");
	$('.fe-questionreport-percent span').html((completenum / timunum).toFixed(2) * 100 + "%");
	$('.progress-bar span').css('width', (completenum / timunum).toFixed(2) * 100 + "%");
	$('.fe-questionreport-btn-box .fe-questionreport-btn').attr('href', "questionanalysis.html?examPaperId=" + id);
}

/*
 * 课程列表播放器
 */
function coursePlayBox(cid, vid, courseType,courseKind) {
	var uId=$(window).storager({key: 'feUid'}).readStorage();
	var userType=$(window).storager({key: 'feUType'}).readStorage();
	var uType='';
	switch (userType){
		case '1':
			uType='student';
			break;
		case '2':
			uType='parent';
			break;
		case '3':
			uType='teacher';
			break;
	}
	new Vue({
		el: "#jplayerboxApp",
		data: {
			inputValue: "",
			courseArr: [],
			courseScheduleArr: [],
			cid: '',
			vid: '',
			courseType: '',
			currentIndex: '',
			hasEnrolled:false,//是否已经报名
			noteList:[]
		},
		filters: {
			addRootFile: function addRootFile(img) {
				return SERVERROOTFILE + img;
			},
			gotoCoursePlayer: function gotoCoursePlayer(cid, vid, cType) {
				return ROOT + "courseplayer.html?cid=" + cid + "&vid=" + vid + "&courseType=" + cType+'&courseKind='+courseKind;
			}
		},
		mounted: function mounted() {
			//1.0ready --> 2.0
			var that = this;
			this.$nextTick(function() {
				this.initFunc();
				this.addEventFunc();
				this.getNoteList();
				this.addNote();
			});
		},
		methods: {
			initFunc: function() {
				this.vid = vid;
				this.cid = cid;
				this.courseType = courseType;
				this.getCourseDetail();
			},
			addEventFunc: function() {
				var isclick = true;

				$('#jbtn').click(function() {
					if(isclick) {
						$(this).siblings('.fe-prism-player').css('width', '100%');
						$(this).siblings('.fe-courseplayer-right').css('width', '0%');
						$(this).css('right', '0%');
						$(this).html('<');
					} else {
						$(this).siblings('.fe-prism-player').css('width', '70%');
						$(this).siblings('.fe-courseplayer-right').css('width', '30%');
						$(this).css('right', '30%');
						$(this).html('>');
					}
					isclick = !isclick;
				});
				$('.fe-courseplayer-right-head a').click(function() {
					$(this).parent('.span4').siblings().children('a').removeClass('active');
					$(this).addClass('active');
					var num = $(this).attr('data-id');
					$('.fe-courseplayer-right-con').css('display', 'none');
					$($('.fe-courseplayer-right-con')[num]).css('display', 'block');
				})
				$('.fe-courseplayer-course-con a').click(function() {
					$(this).siblings().removeClass('active');
					$(this).addClass('active');
				});
				$('.fe-courseplayer-tab a').click(function() {
					$(this).siblings().removeClass('active');
					$(this).addClass('active');
					var num = $(this).attr('data-id');
					$('.fe-courseplayer-questionlist').css('display', 'none');
					$($('.fe-courseplayer-questionlist')[num]).css('display', 'block');
				});
				this.createPlayer();
			},
			checkLen: function() {
				var maxChars = 200; //最多字符数
				if(this.inputValue.length > maxChars)
					this.inputValue = this.inputValue.substring(0, maxChars);
				var curr = maxChars - this.inputValue.length;
				document.getElementById("count").innerHTML = curr.toString();
			},
			createPlayer: function(auth) {
				var _this = this;
				
				$.courseDetailPlayer = new Aliplayer({
					id: 'jcoursePlayer', // 容器id
					//source: "http://live.fetv.cn/felive/festream.m3u8?auth_key=1503027257-0-0-70dbae53de166a87b5d163a0e4d57398", // 视频地址src
					vid: _this.vid,
					playauth: auth,
					autoplay: true, //自动播放：否
					width: "70%", // 播放器宽度
					height: "570px" // 播放器高度630px
				 },function(player){
                console.log('播放器创建好了。')
           });
			},
			getPlayerAuth: function() {
				var _this = this;
				this.$http.post(SERVERROOTDATA + "CourseCatalog.ashx?action=getPlayUrlByVideoId", {
					videoid: this.vid
				}, {
					emulateJSON: true
				}).then(function(res) {
					_this.createPlayer(res.body);
				})
			},
			getCourseDetail: function() {
				var _this = this;
				this.$http.post(SERVERROOTDATA + "Course.ashx?action=getCourseDetailHeaderById", {
					courseId: _this.cid,
					recordType: _this.courseType,//是否是直播
					courseKind:courseKind,//是否是微课
					userType: $(window).storager({
						key: 'feUType'
					}).readStorage(),
					userId: $(window).storager({
						key: 'feUid'
					}).readStorage()
				}, {
					emulateJSON: true
				}).then(function(res) {
					_this.courseArr = res.body.rows;
				}).then(function(){
					_this.courseArr.forEach(function(item,index){
						if(item.hasEnrolled==1){
							_this.hasEnrolled = true;
						}
					});
				}).then(function(){
					_this.getSchedule();
				})
					
				
			},
			getSchedule: function getSchedule() {
				var _this = this,
					url;
				var userId =  $(window).storager({
						key: 'feUid'
					}).readStorage();
				var utype = $(window).storager({
						key: 'feUType'
					}).readStorage();
				if(_this.courseType == 0 || _this.courseType == "0") {
					url = "CourseCatalog.ashx?action=getCourseCatalogByCourseId";
				} else {
					url = "ChannelProgram.ashx?action=getCourseLiveProgram"
				}
				this.$http.post(SERVERROOTDATA + url, {
					courseId: _this.cid,
					recordType: _this.courseType,
					courseKind:courseKind,//是否是微课
					userType: $(window).storager({
						key: 'feUType'
					}).readStorage(),
					userId:userId,
					pageIndex: 1,
					pageSize: 100,
				}, {
					emulateJSON: true
				}).then(function(res) {
					if(res.body.rows == undefined) {
						return false;
					}
					_this.courseScheduleArr = res.body.rows.reverse();
					console.log(_this.hasEnrolled)
					_this.courseScheduleArr.forEach(function(item, index) {
						//if(item.playState == 2 || item.playState == "2") {}
						
						if(item.videoId == _this.vid) {
							_this.currentIndex = index;
							if(userId == undefined || userId == 'undefined'||userId==null || userId=='null' || userId == ''){
									layer.confirm('您还未登录,请先登录', {
										btn: ['登录', '取消'] //按钮
									}, function(){
										window.location.href= 'login.html';	
									});
									return false;
							}
							
							/*if(item.isFree == 1){
								if(_this.vid != undefined || _this.vid != "undefined") {
									_this.getPlayerAuth();
								}
							}else if(_this.hasEnrolled) {
								if(_this.vid != undefined || _this.vid != "undefined") {
									_this.getPlayerAuth();
								}
							} else */
							if(_this.hasEnrolled || item.allowListen == 1) {
								if(_this.vid != undefined || _this.vid != "undefined") {
									_this.getPlayerAuth();
								}
							} else {
								layer.confirm('您还未报名,请先报名', {
									btn: ['立即报名', '取消'] //按钮
								}, function() {
									if(item.isFree == 1){
										_this.$http.post(SERVERROOTDATA + "Course.ashx?action=courseEnrollment", {
											courseId: _this.cid,
											userId: userId,
											userType:utype,
											courseKind:courseKind
										}, {
											emulateJSON: true
										}).then(function(res) {
											_this.isEnrolled = true;
											layer.msg("报名课程成功！欢迎收看",{time:1000});
											_this.getCourseDetail();
											
										}).then(function(){
											//_this.getSchedule();
										});
									}else{
										window.location.href = "paymentoptions.html?cid=" + _this.cid + "&orderType=" + _this.courseType;
									}
									
									/*if(userId == undefined || userId == 'undefined'||userId==null || userId=='null' || userId == ''){
										window.location.href = ROOT + 'login.html'
									}else{
										window.location.href = "paymentoptions.html?cid=" + _this.cid + "&orderType=" + _this.courseType;
									}*/
									
								});
							}
						}else if(_this.vid == undefined || _this.vid == "undefined" || _this.vid==''||_this.vid==null||_this.vid=='null'){
							if(userId == undefined || userId == 'undefined'||userId==null || userId=='null' || userId == ''){
									layer.confirm('您还未登录,请先登录', {
										btn: ['登录', '取消'] //按钮
									}, function(){
										window.location.href= 'login.html';	
									});
									return false;
							}
							if(_this.hasEnrolled ||  item.allowListen==1){
								 _this.currentIndex = 0;
								 _this.vid = item.videoId;
								 _this.getPlayerAuth();
							}else{
								layer.confirm('您还未报名,请先报名', {
									btn: ['立即报名', '取消'] //按钮
								}, function() {
									if(item.isFree == 1){
										_this.$http.post(SERVERROOTDATA + "Course.ashx?action=courseEnrollment", {
											courseId: _this.cid,
											userId: userId,
											userType:utype,
											courseKind:courseKind
										}, {
											emulateJSON: true
										}).then(function(res) {
											_this.isEnrolled = true;
											layer.msg("报名课程成功！欢迎收看",{time:1000});
											
											_this.getCourseDetail();
												
										});			
									}else{
										window.location.href = "paymentoptions.html?cid=" + _this.cid + "&orderType=" + _this.courseType;
									}
									
									/*if(userId == undefined || userId == 'undefined'||userId==null || userId=='null' || userId == ''){
										window.location.href = ROOT + 'login.html'
									}else{
										window.location.href = "paymentoptions.html?cid=" + _this.cid + "&orderType=" + _this.courseType;
									}*/
									
								});
							}
						}
					});
				}).then(function () {
					$(document).attr("title",$('.fe-courseplayer-course-con').find('a.active').text()+"—福建教育网");
				});
			},
			addNote:function () {
				var _this=this;
				$('.fe-courseplayer-note-con').on('click','.fe-courseplayer-save',function () {
					if(uId==null||uId==undefined||uId=='undefined'){
						layer.msg("请先登录");
						return;
					}
					if(!isEmpty($('#notetextarea').val())){
						layer.msg('笔记不能为空！');
						return;
					}
					var content=$('#notetextarea').val();
					_this.inputValue='';
					_this.$http.post(SERVERROOTDATA + "Note.ashx?action=noteSave", {
						userId:uId,
						userType:uType,
						courseId:_this.cid,
						content:content,
						noteId:0,
						saveTag:'add'
					}, {
						emulateJSON: true
					}).then(function(res) {
						layer.msg(res.body.message);
						if(res.body.code==200){
							_this.getNoteList();
						}
					})
				})
			},
			edit:function (id) {
				var _this=this;
				this.$http.post(SERVERROOTDATA + "Note.ashx?action=getNoteById", {
					noteId:id
				}, {
					emulateJSON: true
				}).then(function(res) {
					$('#notePop h1').html(res.body[0].courseName);
					$('#notePop h3').html(res.body[0].noteTime);
					$('#notetext').val(res.body[0].content);
					$('#saveBtn').data('noteid',res.body[0].noteId);
					$('#saveBtn').data('cid',res.body[0].courseId);
					layer.open({
						type: 1,
						area:['500px','360px'],
						content: $('#notePop') //这里content是一个DOM
					});
				})
			},
			updateNote:function (obj) {
				var content=$('#notetext').val();
				if(!isEmpty(content)){
					layer.msg('笔记内容不能为空');
					return;
				}
				$('#notetext').val('');
				this.$http.post(SERVERROOTDATA + "Note.ashx?action=noteSave", {
					userId:uId,
					userType:uType,
					courseId:$(obj.target).data('cid'),
					content:content,
					noteId:$(obj.target).data('noteid'),
					saveTag:'update'
				}, {
					emulateJSON: true
				}).then(function(res) {
					if(res.body.code==200){
						layer.closeAll();
						this.getNoteList();
					}
					// setTimeout(function () {
						layer.msg(res.body.message);
					// },1000)
				})
			},
			deleteNote:function (id) {
				this.$http.post(SERVERROOTDATA + "Note.ashx?action=noteSave", {
					noteId:id,
					saveTag:'delete'
				}, {
					emulateJSON: true
				}).then(function(res) {
					if(res.body.code==200){
						layer.closeAll();
						this.getNoteList();
					}
					// setTimeout(function () {
					layer.msg(res.body.message);
					// },1000)
				})
			},
			closePop:function () {
				layer.closeAll();
			},
			getNoteList:function () {
				if(uId==null||uId==undefined||uId=='undefined'){

					return;
				}
				var _this = this;
				this.$http.post(SERVERROOTDATA + "Note.ashx?action=getNoteList", {
					userId:uId,
					userType:uType,
					courseId:this.cid,
					pageIndex:1,
					pageSize:99999
				}, {
					emulateJSON: true
				}).then(function(res) {
					_this.noteList=res.body.rows;
				})
			},
			changeActive: function(index) {
				this.currentIndex = index;
			}
		}

	})
}
function isEmpty(str){
	var reg = /\S+/;
	return reg.test(str);
}
function checkOrgan(organId) {
	// alert(1111);
    var index = layer.load(1, {
        shade: [0.1,'#fff'] //0.1透明度的白色背景
    });
    $.ajax({
		async:false,
        url: SERVERROOTDATA + "organ.ashx?action=checkOrgan",
        type: "POST",
        data: {organId:organId},
        success:function (res) {
            var data = JSON.parse(res);
            layer.close(index);
            if(data.code==1){
                // console.log('11111');
                // window.open('surveyresult.html');
                window.location.href='mechanismindex.html?organId='+organId;
            }else{
                // window.open('survey.html');
                // layer.msg(data.message);
                // window.location.href='schoolindex.html?organId='+organId;
            }
        }
    });
}