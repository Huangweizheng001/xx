// 社圈-首页
//导航


function communityNavi() { //社圈导航
	new Vue({
		el: "#communityNavi",
		data: {
			naviSortArr: [],
			naviMemberArr: []
		},
		filters: {
			addRoot: function addRoot(Id) {
				return ROOT + "community/communityarea.html?groupTypeId=" + Id;
			},
			addRootFile: function addRootFile(img) {
				return COMMINITYROOTFILE + img;
			}
		},
		mounted: function() {
			var _this = this;
			this.$nextTick(function() {
				_this.getNaviSort();
				_this.getNaviMember();
			})
		},
		methods: {
			getNaviSort: function() {
				var _this = this;
				this.$http.get(COMMUNITESERVERROOTDATA + "topic.ashx?action=getGroupTypeTopicList", {
						emulateJSON: true
					})
					.then(function(res) {
						_this.naviSortArr = res.body.returnObj;
					})
			},
			getNaviMember: function() {
				var _this = this;
				this.$http.get(COMMUNITESERVERROOTDATA + "topic.ashx?action=getUserCount", {
						emulateJSON: true
					})
					.then(function(res) {
						_this.naviMemberArr = res.body;
					})
			}
		}
	})
}


function community() { //社圈首页-右边部分
	new Vue({
		el: "#fecommunity",
		data: {
			memberArr: [], //会员信息
			memberIcon: "", //会员头像
			memberName: "", //会员名字
			memberGroup: "", //用户组
			memberPost: "", //会员帖子数
			memberScope: "", //会员积分，
			memberFriend: "", //好友
			communityListArr: [], //精贴
			communitStarArr: [], //社圈之星
			hotsWeekListArr: [], //热贴排行周榜
			hotsMonthListArr: [], //热贴排行月榜
			newHandArr: [], //新手攻略
			communityListArrNodata:false,//精贴是否有数据
			communitStarArrNodata:false,//社圈之星是否有数据
			hotsWeekListArrNodata:false,//热帖周榜是否有数据
			hotsMonthListArrNodata:false,//热帖月榜是否有数据
			islogin:0,//0未登录，1 登录
			current: 1, //默认在第一页
			showItem: 10,
			allpage: 0,
		},
		filters: {
			addRoot: function addRoot(uid) {
				return ROOT + "community/communitypostdetail.html?postId=" + uid;
			},
			addRootFile: function addRootFile(img) {
				return COMMINITYROOTFILE + img;
			},
			addAvarFile:function addAvarFile(img){
				return SERVERROOTFILE + img;
			}
		},
		mounted: function() {
			var _this = this;
			this.$nextTick(function() {
				_this.getNewsList(1); //获取精华帖
				_this.getNewHand(); //获取新手攻略
				_this.isLogin(); //判断是否登录
				_this.getCommunitStar(); //社圈之星
				_this.getHotWeekLists(); //热帖排行-周榜
				_this.getHotMonthLists() //热帖排行-月榜
				_this.hotListTab(); //月周榜切换
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
			getNewsList: function(currentPage) { //获取精华帖
				var _this = this;
				this.$http.post(COMMUNITESERVERROOTDATA + "topic.ashx?action=getTopicIsDigestList", {
						pageIndex: currentPage,
						pageSize: _this.showItem
					}, {
						emulateJSON: true
					})
					.then(function(res) {
						if(res.body.returnObj.length < 1) {
							_this.communityListArrNodata = true;
							
						} else {
							_this.communityListArrNodata = false;
							_this.allpage = Math.ceil(res.body.total / _this.showItem); //总页数
							_this.communityListArr = res.body.returnObj;
						}
					}).then(function() {
						_this.communityListArr.forEach(function(item, index) {
							Vue.set(item, "ptx", SERVERROOTFILE + item.userIcon);
							Vue.set(item, "postId", "community/communitypostdetail.html?postId="+item.tid);
						})
					})
			},
			getNewHand: function() { //新手攻略
				var _this = this;
				this.$http.post(COMMUNITESERVERROOTDATA + "topic.ashx?action=getNewStrategyList", {}, {
						emulateJSON: true
					})
					.then(function(res) {
						if(res.body.returnObj.length < 1) {
							return false;
						} else {
							_this.newHandArr = res.body.returnObj;
						}
					}).then(function() {
						_this.newHandArr.forEach(function(item, index) {
							Vue.set(item, "postId", "community/communitypostdetail.html?postId="+item.tid);
						})
					})
			},
			isLogin: function() {
				var _this = this;
				var uid = $(window).storager({
					key: 'feCommunityUid'
				}).readStorage();
				if(uid == undefined || uid == null || uid == 'undefined') {
					$('.fecommunity-personal .content').css('display', 'none');
					$('.fecommunity-personal .nologin').css('display', 'block');
					$('.fecommunity-personal .fecommunity-personal-btn').css('display', 'none');
					_this.memberIcon = 'images/static/community/avar.png';
					_this.islogin = 0;
				} else {
					$('.fecommunity-personal .content').css('display', 'block');
					$('.fecommunity-personal .nologin').css('display', 'none');
					$('.fecommunity-personal .fecommunity-personal-btn').css('display', 'block');
					_this.getMemberInfo();
					_this.islogin = 1;
				}
			},
			getMemberInfo: function() { //获取会员信息
				var _this = this;
				var uid = $(window).storager({
					key: 'feCommunityUid'
				}).readStorage();
				this.$http.post(COMMUNITESERVERROOTDATA + "topic.ashx?action=getUserInfo", {
						userId: uid
					}, {
						emulateJSON: true
					})
					.then(function(res) {
						if(res.body.returnObj.length < 1) {
							return false;
						} else {
							_this.memberArr = res.body.returnObj[0];
							_this.memberIcon = SERVERROOTFILE + _this.memberArr.UserIcon;
							_this.memberName = _this.memberArr.Username;
							_this.memberGroup = _this.memberArr.GroupName;
							_this.memberPost = _this.memberArr.Posts;
							_this.memberScope = _this.memberArr.Credits;
							_this.memberFriend = _this.memberArr.FriendCount;
						}
					})
			},
			getCommunitStar: function() { //获取社圈之星
				var _this = this;
				this.$http.post(COMMUNITESERVERROOTDATA + "topic.ashx?action=getUserHotList", {
						topNum: 6
					}, {
						emulateJSON: true
					})
					.then(function(res) {
						if(res.body.returnObj.length < 1) {
							_this.communitStarArrNodata = true;
							
						} else {
							_this.communitStarArrNodata = false;
							_this.communitStarArr = res.body.returnObj
						}
					}).then(function() {
						_this.communitStarArr.forEach(function(item, index) {
							Vue.set(item, "userId", 'community/communityuserspace.html?userId=' + item.uid);
						})
					})
			},
			getHotWeekLists: function() { //获取热帖排行-周榜 1
				var _this = this;
				this.$http.post(COMMUNITESERVERROOTDATA + "topic.ashx?action=getTopicHotList", {
						topNum: 10,
						groupId: 1,
						week: 1 //周榜 1
					}, {
						emulateJSON: true
					})
					.then(function(res) {
						if(res.body.returnObj.length < 1) {
							_this.hotsWeekListArrNodata = true;
							return false;
						} else {
							_this.hotsWeekListArrNodata = false;
							_this.hotsWeekListArr = res.body.returnObj;
						}
					}).then(function(res) {
						_this.hotsWeekListArr.forEach(function(item,index){
							Vue.set(item, "postId", 'community/communitypostdetail.html?postId=' + item.tid);
						});
					})
			},
			getHotMonthLists: function() { //获取热帖排行-月榜 2
				var _this = this;
				this.$http.post(COMMUNITESERVERROOTDATA + "topic.ashx?action=getTopicHotList", {
						topNum: 10,
						groupId: 1,
						week: 2 //月榜 2
					}, {
						emulateJSON: true
					})
					.then(function(res) {
						if(res.body.returnObj.length < 1) {
							_this.hotsMonthListArrNodata = true;
							return false;
						} else {
							_this.hotsMonthListArrNodata = false;
							_this.hotsMonthListArr = res.body.returnObj;
						}
					}).then(function(res) {
						_this.hotsMonthListArr.forEach(function(item,index){
							Vue.set(item, "postId", 'community/communitypostdetail.html?postId=' + item.tid);
						});
					})
			},
			hotListTab: function() { //切换月榜周榜
				$('.fecommunity-hotlist-tab ').on('click', 'a', function() {
					var num = $(this).attr('data-id');
					$(this).siblings('a').removeClass('active');
					$(this).addClass('active');
					$('.fecommunity-hotlist-wrap').css('display', 'none');
					$('.fecommunity-hotlist-wrap').eq(num).css('display', 'block');

				});
			},
			ceateGroup: function() { //创建群组
				layer.open({
					type: 2,
					title: '创建群组',
					//closeBtn: 0, //不显示关闭按钮
					shadeClose: true,
					shade: [0.5, '#000'],
					area: ['750px', '400px'],
					//offset: 'rb', //右下角弹出
					//time: 2000, //2秒后自动关闭
					anim: 2,
					maxmin: true, //开启最大化最小化按钮
					content: 'community/creategroup.html'
				});
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
				_this.getNewsList(_this.current);
			}
		}
	})
}
/*
 * 创建群组
 */
function createGroup() {
	new Vue({
		el: "#fecreategroup",
		data: {
			groupSortArr: [], //分类
			isChangePic: false, //默认为未转换
		},
		filters: {
			addRootFile: function addRootFile(img) {
				return SERVERROOTFILE + img;
			}
		},
		mounted: function mounted() {
			//1.0ready --> 2.0
			var that = this;
			this.$nextTick(function() {
				this.getGroupSort(); //获取小组分类类别
				this.changeTx();
			});
		},
		methods: {
			getGroupSort: function() { //获取小组分类列表
				var _this = this;
				var uid = $(window).storager({
					key: 'feCommunityUid'
				}).readStorage();

				if(uid == null || uid == undefined || uid == 'undefined') {
					layer.msg('请先登录');
					setTimeout(function() {
						window.parent.location.href = ROOT + "login.html";
					}, 1000);
					return;
				}
				this.$http.post(COMMUNITESERVERROOTDATA + "topic.ashx?action=getGroupTypeList", {
					uid:uid
				}, {
					emulateJSON: true
				}).then(function(res) {
					if(res.body.returnObj.length < 1) {
						return false;
					} else {
						_this.groupSortArr = res.body.returnObj;
					}
				})
			},
			postGroup: function() { //创建群组
				var _this = this;
				var title = $('#name').val();
				var groupTypeId = $('#sort  option:selected').val();
				var content = $('#note').val();
				var reg = /^([A-Za-z]|[\u4E00-\u9FA5]){3,15}$/i;
				if(!reg.test(title)) {
					layer.msg("请输入3-15个汉字及字母组合！");
					$('#name').focus();
				} else if(content == "") {
					layer.msg("简介不能为空！");
					$('#note').focus();
				} else {
					if(!_this.isChangePic) {
						layer.msg("未选择图片,使用默认！", {
							time: 2000
						});
					}
					setTimeout(function() {
						_this.doPost(title, groupTypeId, content);
					}, 2000)
				}

			},
			doPost: function(title, groupId, content) {//提交到服务器
				var data = new FormData($('#membercenter')[0]);
				data.append('uid', $(window).storager({
					key: 'feCommunityUid'
				}).readStorage());
				data.append('groupName', title);
				data.append('groupTypeId', groupId);
				data.append('Introduction', content);
				this.$http.post(COMMUNITESERVERROOTDATA + "topic.ashx?action=createGroupInfo", data, {
					emulateJSON: true
				}).then(function(res) {
					if(res.body.code == 200) {
						layer.msg("创建群组成功!");
						setTimeout(function() {
							window.parent.location.href = '../community/communityarea.html?groupTypeId='+groupId;
						}, 1500)

					} else {
						layer.msg("创建群组成功失败，请重新创建");
					}

				})

			},
			changeTx: function changeTx() {//选择图片
				var _this = this;
				$('.avarbtn').on('change', '#file_upload', function() {
					var dom = $(this).parents('.avarbtn').siblings('.avar').find('img');
					upload(this, dom);
					_this.isChangePic = true;
				});

			},
			savePic: function() { //保存头像  暂时没用
				var data = new FormData($('#membercenter')[0]);
				this.$http.post(COMMUNITESERVERROOTDATA + "topic.ashx?action=uploadGroupIcon", data, {
					emulateJSON: true
				}).then(function(res) {
					if(res.body.code == 200) {
						layer.msg("上传头像成功!");
						$('.avar').css('background-image', 'url(' + '"' + COMMUNITESERVERROUTEFILE + res.body.returnStr + '"' + ')');

					} else {
						layer.msg("上传文件失败，请重新上传");
					}

				})

			}
		}

	})
}

/*
 还可以输入多少字符*/
function gbcount(obj,textobj,max) {
	var checklen = $('#checklen');
	var own;
	if(obj.value.length > max) {
		obj.value = obj.value.substring(0, max);

	} else {
		own = max - obj.value.length;
		textobj.html(own);
	}
}
//上传图像，并显示图像
//c:点击节点，即点击input type=fille 后内容存贮
//d:存贮图像的节点
var upload = function(c, d) {
	var $file = $(c);
	var fileObj = $file[0];
	var windowURL = window.URL || window.webkitURL;
	var dataURL;
	var $img = $(d);

	if(fileObj && fileObj.files && fileObj.files[0]) {
		dataURL = windowURL.createObjectURL(fileObj.files[0]);
		$img.attr('src', dataURL);
		// console.log(dataURL);
	} else {
		dataURL = $file.val();
		var imgObj = document.querySelector(d);
		// 两个坑:
		// 1、在设置filter属性时，元素必须已经存在在DOM树中，动态创建的Node，也需要在设置属性前加入到DOM中，先设置属性在加入，无效；
		// 2、src属性需要像下面的方式添加，上面的两种方式添加，无效；
		imgObj.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)";
		imgObj.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = dataURL;
		// console.log(dataURL);
	}
};

//专区
function communityArea(id) { //社圈专区
	new Vue({
		el: "#fecommunityArea",
		data: {
			memberName: "", //会员名字
			memberHref:'',//社圈个人中心地址
			addPost: "", //新增帖子数
			addMember: "", //新增人数，
			topHotGroupArr:[],//头部几组群组
			currentGroupArr:[],//选中组信息
			currentnaviSortArr:[],//当前专区
			naviSortArr:[], //其他分类
			naviSortFiveArr:[],//其他五个分类
			areaHotArr: [], //热门小组
			tabPostArr: [], //热贴/最新贴/精华帖
			topHotGroupArrnodata:false,//头部几组群组是否有数组
			areaHotArrnodata:false,//热门群组是否有数组
			tabPostArrnodata:false,//热贴/最新贴/精华帖是否有数据
			current: 1, //默认在第一页
			showItem: 10,
			allpage: 0,
		},
		filters: {
			addRoot: function addRoot(uid) {
				return ROOT + "communitydetail.html?Uid=" + uid;
			},
			addRootFile: function addRootFile(img) {
				return COMMINITYROOTFILE + img;
			}
		},
		mounted: function() {
			var _this = this;
			this.$nextTick(function() {
				_this.getHeadGroup();//获取头部几组群组
				_this.getHotList(1); //获取热门群组
				_this.getToday();//获取今日新增
				_this.isLogin(); //判断是否登录
				_this.getNewPost(0); //最新发表,默认
				_this.postTab(); //热帖
				_this.getAnotherNavi();//获取其他分区
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
			getHeadGroup:function(){//获取头部几组群组
				var _this = this;
				this.$http.post(COMMUNITESERVERROOTDATA + "topic.ashx?action=getGroupHotByGroupTypeId", {
						groupTypeId:id,
						topNum: 3
					}, {
						emulateJSON: true
					})
					.then(function(res) {
						if(res.body.returnObj.length < 1) {
							/*layer.msg("Sorry ╮(╯_╰)╭ 没有下一页喽！");*/
							_this.topHotGroupArrnodata = true;
							return false;
						} else {
							_this.topHotGroupArr = res.body.returnObj;
							_this.currentGroupArr = _this.topHotGroupArr[0];//默认
						}
					}).then(function(){
						_this.topHotGroupArr.forEach(function(item,index){
							Vue.set(item, "groupId", 'communitygroupdetail.html?groupId=' + item.id+'&groupTypeId='+id);
						});
					}).then(function(){
						$('.communityarea-tab-head').on('mouseover', 'a', function() {
							var num = $(this).attr('data-id');
							$(this).siblings('a').removeClass('active');
							$(this).addClass('active');
							if(num==0){//0 最新
								_this.currentGroupArr = _this.topHotGroupArr[0]
							}else if(num==1){//1热门
								_this.currentGroupArr = _this.topHotGroupArr[1]
							}else if(num==2){//2精贴
								_this.currentGroupArr = _this.topHotGroupArr[2]
							}
						});
					})
			},
			getHotList: function(currentPage) { //获取热门群组
				var _this = this;
				this.$http.post(COMMUNITESERVERROOTDATA + "topic.ashx?action=getGroupList", {
						groupTypeId:id,
						pageIndex: currentPage,
						pageSize: _this.showItem
					}, {
						emulateJSON: true
					})
					.then(function(res) {
						if(res.body.returnObj.length < 1) {
							_this.areaHotArrnodata = true;
						/*	layer.msg("Sorry ╮(╯_╰)╭ 没有下一页喽！");
							return false;*/
						} else {
							_this.areaHotArrnodata = false;
							_this.allpage = Math.ceil(res.body.total / _this.showItem); //总页数
							_this.areaHotArr = res.body.returnObj;
						}
					}).then(function(){
						_this.areaHotArr.forEach(function(item,index){
							Vue.set(item, "groupId", 'communitygroupdetail.html?groupId=' + item.id+'&groupTypeId='+id);
						});
					})
			},
			getToday:function(){//今日新增
				var _this = this;
				this.$http.post(COMMUNITESERVERROOTDATA + "topic.ashx?action=getCountByGroupTypeId", {
					groupTypeId:id
				}, {
						emulateJSON: true
					})
					.then(function(res) {
						if(res.body.length < 1) {
							return false;
						} else {
							_this.addMember  = res.body.memberCount;
							_this.addPost= res.body.topicCount;
						}
					})
			},
			isLogin: function() {
				var _this = this;
				var uid = $(window).storager({
					key: 'feCommunityUid'
				}).readStorage();
				if(uid == undefined || uid == null || uid == 'undefined') {
					_this.memberName = '游客';
					_this.memberHref = ROOT + "login.html";
				} else {
					_this.memberName = $(window).storager({
					key: 'feUNickName'
				}).readStorage();
				_this.memberHref = 'centeralreadygroup.html';
				}
			},
			getNewPost: function(typeId) { //获取最新发表,热帖，精华帖
				var _this = this;
				this.$http.post(COMMUNITESERVERROOTDATA + "topic.ashx?action=getTopicNewByGroupTypeId", {
						type:typeId,
						groupTypeId:id,
						topNum: 5
					}, {
						emulateJSON: true
					})
					.then(function(res) {
						if(res.body.returnObj.length < 1) {
							_this.tabPostArrnodata = true;
						
						} else {
							_this.tabPostArrnodata = false;
							
						}
						_this.tabPostArr = res.body.returnObj
					}).then(function() {
						_this.tabPostArr.forEach(function(item, index) {
							Vue.set(item, "postId", 'communitypostdetail.html?postId=' + item.tid);
						})
					})
			},
			postTab: function() { //切换帖子
				var _this = this;
				$('.tab-head').on('click', 'a', function() {
					var num = $(this).attr('data-id');
					$(this).siblings('a').removeClass('active');
					$(this).addClass('active');
					_this.getNewPost(num)//0 最新,1热门,2精贴
					

				});
			},
			getAnotherNavi:function(){//获取其他分类
				var _this = this;
				this.$http.get(COMMUNITESERVERROOTDATA + "topic.ashx?action=getGroupTypeTopicList", {
						emulateJSON: true
					})
					.then(function(res) {
						_this.naviSortArr = res.body.returnObj;
					}).then(function(){
						_this.naviSortArr.forEach(function(item,index){
							if(item.id != id){
								_this.naviSortFiveArr.push(item);
							}else{
								_this.currentnaviSortArr.push(item);
							}
						})
					}).then(function(){
						_this.naviSortFiveArr.forEach(function(item,index){
							Vue.set(item, "groupTypeId", 'communityarea.html?groupTypeId=' + item.id)
						});
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
				_this.getHotList(_this.current);
			}
		}
	})
}

//帖子详情
function communityPostDetail(tId) {
	new Vue({
		el: "#communitypostdetail",
		data: {
			leavewordList:[],//评论信息
			postContenArr:[],//帖子内容
			memberArr:[],//会员信息
			newPostArr:[],//新帖
			newPostHref:[],//新帖更多
			groupArr:[],//所属群组
			recommendPostArr:[],//相关推荐
			recommendPostHref:[],//推荐更多
			uid:"",//用户id
			uavar:[],//用户头像
			isClose:0,//是否锁贴  1是锁贴，0不是锁帖
			isLogin:0,//0未登录，1登录 ，默认未登录
			isMe:0,//0 不是自己，1是自己 ，默认不是自己
			isAttention:0,//0未关注，1关注
			current:1,
            allCount:0,
            showItem:4,
            allpage:""
		},
		filters: {
			addRootFile: function addRootFile(img) {
				return COMMINITYROOTFILE + img;
			},
			addAvarRootFile: function addAvarRootFile(img) {
				return SERVERROOTFILE + img;
			}
		},
		computed: {
            pages: function pages() {
                var pag = [];
                if(this.current < this.showItem) {
                    //如果当前的激活的项 小于要显示的条数
                    //总页数和要显示的条数那个大就显示多少条
                    var i = Math.min(this.showItem, this.allpage);
                    while(i) {
                        pag.unshift(i--);
                    }
                } else {
                    //当前页数大于显示页数了
                    var middle = this.current - Math.floor(this.showItem / 2),
                        //从哪里开始
                        i = this.showItem;
                    if(middle > this.allpage - this.showItem) {
                        middle = this.allpage - this.showItem + 1;
                    }
                    while(i--) {
                        pag.push(middle++);
                    }
                }
                return pag;
            }
        },
		mounted: function mounted() {
			//1.0ready --> 2.0
			var that = this;
			this.$nextTick(function() {
				this.isLogins();//判断是否登录
				this.getContent();//获取内容
				
				this.getLeaveWord(tId,1);
                this.bindClick(tId);//评论
			});
		},
		methods: {
			isLogins:function(){//判断是否登录
				var _this = this;
				_this.uid = $(window).storager({
					key: 'feCommunityUid'
				}).readStorage();
				var avar = $(window).storager({
					key: 'feUIcon'
				}).readStorage();
				 if(_this.uid==undefined||_this.uid==null||_this.uid=='undefined'||_this.uid==''){
				 	_this.uavar = '../images/static/community/avar.png';
                        layer.msg('请先登录!');
                    }else{
                    	_this.isLogin = 1;
                    	if(avar==undefined||avar==null||avar=='undefined'||avar==''){
                    		_this.uavar = '../images/static/community/avar.png';
                    	}else{
                    		_this.uavar = SERVERROOT +avar;
                    	}
                    	
                    	
                    }
			},
			getContent:function(){//获取帖子内容
				var _this = this ;
				this.$http.post(COMMUNITESERVERROOTDATA + "topic.ashx?action=getPostInfoByPostId", {
                    tid: tId
                }, {
                    emulateJSON: true
                }).then(function (res) {
                	if(res.body.returnObj.length<1){
                		console.log('没有数据');
                		return false;
                	}
                    _this.postContenArr=res.body.returnObj[0];
                }).then(function(){
                	if(_this.postContenArr.posterid==$(window).storager({
					key: 'feCommunityUid'
				}).readStorage()){//如果是自己
                		
                		_this.isMe = 1;
                		console.log(_this.isMe)
                	}
                	_this.isClose = _this.postContenArr.closed;//判断该贴是否锁了
                	_this.getMember(_this.postContenArr.posterid);//获取帖主信息
                	_this.getNewPostList(_this.postContenArr.posterid);//获取新帖
                	_this.getGroupList(_this.postContenArr.posterid);//获取所属群组
                	_this.getRecommendList(_this.postContenArr.posterid);//获取相关推荐
                	_this.isAddattention(_this.postContenArr.posterid);//判断是否关注
                	_this.addAttention(_this.postContenArr.posterid);//加关注
                	
                })
				
			},
			getMember:function(pid){//获取帖主信息
				var _this = this;
				this.$http.post(COMMUNITESERVERROOTDATA + "topic.ashx?action=getUserInfoCount", {
                     uid:pid
                }, {
                    emulateJSON: true
                }).then(function (res) {
                	if(res.body.returnObj.length<1){
                		layer.msg("该账号没有会员信息");
                		return false;
                	}
                    _this.memberArr=res.body.returnObj[0];
                }).then(function(){
                	if(_this.memberArr.avatar==""){
                		_this.memberArr.avatar = '../images/static/community/avar.png';
                	}else{
                		_this.memberArr.avatar = SERVERROOTFILE+ _this.memberArr.avatar;
                	}
                	
                })
			},
			contentLike:function(pid){//文章点赞
                    this.$http.post(COMMUNITESERVERROOTDATA + "topic.ashx?action=addPostPraise", {
                        pid: pid
                    }, {
                        emulateJSON: true
                    }).then(function (res) {
                         if(res.body.code==200){
                            layer.msg('点赞+1  成功');
                            var zannum =  $('.fecommunity-left-content .right .zan').html();
                            zannum++;
                           $('.fecommunity-left-content .right .zan').html(zannum);
                         }else{
                             layer.msg("评论失败");
                         }
                    })

			},
			shareTo:function(){//分享
				var _this = this ;
				
				$(".bdsharebuttonbox").slideToggle();
				
		
				
			},
			getNewPostList:function(pid){//获取新帖列表
				var _this = this ;
				_this.newPostHref = 'communityuserspace.html?userId='+pid;
				this.$http.post(COMMUNITESERVERROOTDATA + "topic.ashx?action=getTopicByUidList", {
                    uid:pid,
                    topNum:8
                }, {
                    emulateJSON: true
                }).then(function (res) {
                	if(res.body.returnObj.length<1){
                		console.log("没有新帖列表");
                		return false;
                	}
                    _this.newPostArr=res.body.returnObj;
                }).then(function () {
                    _this.newPostArr.forEach(function(item,index){
                    	Vue.set(item, "postId", 'communitypostdetail.html?postId=' + item.tid);
                    });
                })
			},
			getGroupList:function(pid){//获取所属群组
				var _this = this ;
				_this.recommendPostHref = 'communityuserspace.html?type=1&userId='+pid;
				this.$http.post(COMMUNITESERVERROOTDATA + "topic.ashx?action=getGroupByUid", {
                    uid:pid,
                    topNum:5
                }, {
                    emulateJSON: true
                }).then(function (res) {
                	if(res.body.returnObj.length<1){
                		console.log("没有所属群组");
                		return false;
                	}
                    _this.groupArr=res.body.returnObj;
                }).then(function () {
                    _this.groupArr.forEach(function(item,index){
                    	Vue.set(item, "groupId", 'communitygroupdetail.html?groupId=' + item.groupId +'&groupTypeId='+item.groupTypeId);
                    });
                })
			},
			getRecommendList:function(pid){//获取相关推荐
				var _this = this ;
				this.$http.post(COMMUNITESERVERROOTDATA + "topic.ashx?action=getTopicSpecialByUserId", {
                    uid:pid,
                    topNum:8
                }, {
                    emulateJSON: true
                }).then(function (res) {
                	if(res.body.returnObj.length<1){
                		console.log("没有相关推荐");
                		return false;
                	}
                    _this.recommendPostArr=res.body.returnObj;
                }).then(function () {
                    _this.recommendPostArr.forEach(function(item,index){
                    	Vue.set(item, "postId", 'communitypostdetail.html?postId=' + item.tid);
                    });
                })
			},
			isAddattention:function(pid){//判断是否关注
				var _this = this ;
				this.$http.post(COMMUNITESERVERROOTDATA + "web_users.ashx?action=getIsUseUser", {
	                    uid:_this.uid,
	                    focusUserId:pid
	                }, {
	                    emulateJSON: true
	                }).then(function (res) {
	                	if(res.body.flagFans==false){
	                		_this.isAttention = 0;
	                		setTimeout(function(){
	                			_this.addAttention(pid);//加关注
	                		},1000);
	                		
	                		/*_this.cancelAttention(pid);//取消关注*/
	                	}else{
	                		_this.isAttention = 1;
	                		setTimeout(function(){
	                			_this.cancelAttention(pid);//取消关注
	                		},1000);
	                		/*_this.addAttention(pid);//加关注*/
                			
	                	}
	                   
	                })
			},
			addAttention:function(pid){//加关注
				var _this = this ;
				$('#attention').off();
				$('#attention').on('click',function(){
					if(_this.isLogin == 0) {
								layer.msg('请先登录');
								setTimeout(function() {
									window.location.href = ROOT + "login.html";
								}, 1000);
								return false;
							}else{
								
							
					_this.$http.post(COMMUNITESERVERROOTDATA + "topic.ashx?action=addUserFans", {
	                    uid:_this.uid,
	                    focusUserId:pid
	                }, {
	                    emulateJSON: true
	                }).then(function (res) {
	                	if(res.body.code==200){
	                		/*_this.isAttention = 1;*/
	                		_this.isAddattention(pid);
	                		_this.getMember(pid);
	                		layer.msg(res.body.message);
	                	}else{
	                		layer.msg('关注失败，请重新关注')
	                	}
	                   
	                })
	                }
				})
			},
			cancelAttention:function(pid){//取消关注
				var _this = this ;
				$('#cancelattention').off();
				$('#cancelattention').on('click',function(){
					layer.confirm('确认要取消关注吗？', {
		            btn : [ '确定', '取消' ]//按钮
		        }, function(index) {
		           _this.$http.post(COMMUNITESERVERROOTDATA + "topic.ashx?action=closeFocus", {
	                    uid:_this.uid,
	                    focusUserId:pid
	                }, {
	                    emulateJSON: true
	                }).then(function (res) {
	                	if(res.body.code==200){
	                		/*_this.isAttention = 0;*/
	                		_this.isAddattention(pid);
	                		_this.getMember(pid);
	                		layer.msg(res.body.message);
	                		
	                	}else{
	                		layer.msg('取消失败，请重新取消')
	                	}
	                   
	                })
		        }); 
					
				})
				
				
			},
			getLeaveWord: function (tid,pageIndex) {
                var _this = this;
                this.$http.post(COMMUNITESERVERROOTDATA + "topic.ashx?action=getPostListByTid", {
                    tid: tid,
                    pageIndex:pageIndex,
                    pageSize:3
                }, {
                    emulateJSON: true
                }).then(function (res) {
                	if(res.body.rows.length<1){
                		console.log("没有所属群组");
                		return false;
                	}
                    _this.leavewordList=res.body.rows
                    _this.allCount=res.body.totalCount;
                    _this.allpage=res.body.totalPageCount;
                }).then(function () {
                    // 回复添加评论模块
                    $('.feleaveword .febox').on('click','button',function () {
                        $('.fepinglunarea .feliuyan').remove();
                        var duixiang=$(this).parent().parent().find('.fetop').find('h4').find('span').html();
                        var userId=$(window).storager({
					key: 'feCommunityUid'
				}).readStorage();
                        var byuserId =$(this).parent().parent().find('.fetop').find('h4').find('span').attr('data-id');
                        if(userId==byuserId){//防止自己回复自己
                            layer.msg("不能回复自己");
                            return;
                        }
                        var pliuyan=$('<div class="feliuyan"><input type="text" placeholder="回复'+ duixiang +':"><button>评论</button></div>');
                        $(this).parent().after(pliuyan);
                    });

                })
            },
            bindClick:function (tid) {
                // 最外层评论课程按钮方法
                var _this=this;
                $('.feliuyan-parent').on('click','button',function () {
                    var uid=$(window).storager({
					key: 'feCommunityUid'
				}).readStorage();
                    var username = $(window).storager({
					key: 'feUNickName'
				}).readStorage();
                    if(uid==undefined||uid==null||uid=='undefined'){
                        layer.msg('请先登录!');
                    }else{
                        var value=$(this).parent().prev('.content').val();
                        $(this).parent().prev().val('');
                        var reg = /\S+/;
                        if(!reg.test(value)){
                            layer.msg('评论不能为空!');
                        }else{
                            _this.$http.post(COMMUNITESERVERROOTDATA + "topic.ashx?action=createPost", {
                                uid: uid,
                                pid:_this.postContenArr.pid,//被回复的贴ID
                                tid:tid,
                                groupId:_this.memberArr.groupid,
                                layer:0,//0 评论，1是回复
                                userName:username,
                                content:value
                            }, {
                                emulateJSON: true
                            }).then(function (res) {
                                if(res.body.code==200){
                                    layer.msg('评论成功')
                                    _this.getLeaveWord(tid,_this.current);
                                }else{
                                    layer.msg("评论失败");
                                }
                            })
                        }

                    }
                });
                // 绑定评论方法
                $('.feleaveword ').on('click','.feliuyan button',function () {
                	var my=this;
                    var uid=$(window).storager({
					key: 'feCommunityUid'
				}).readStorage();
                    var mid=$(this).parent().parent().find('.fetop').find('h4').find('span').data('id');
                    console.log(uid);
                    console.log(mid)
                    if(mid==uid){
                        layer.msg('不能回复自己');
                       /* return;*/
                    }
                    
                    var nick=$(window).storager({
					key: 'feUNickName'
				}).readStorage();

                    var courseEvaluationId=$(this).parent().parent().data('courseevaluationid');
                    var levelOneEvaluationId=$(this).parent().parent().data('leveloneevaluationid');
                    var topEvaluationId=$(this).parent().parent().data('topvaluationid');
                  
                    if(topEvaluationId !=undefined && topEvaluationId != 'undefined'){
                    	  console.log(topEvaluationId)
                    	levelOneEvaluationId = topEvaluationId;//如果是孩子节点 传最底端的父亲节点
                    }
                    if (courseEvaluationId==0||courseEvaluationId==''){
                        courseEvaluationId=levelOneEvaluationId;
                    }
                    if(uid==undefined||uid==null||uid=='undefined'){
                        layer.msg('请先登录!');
                    }else{
                        var value=$(this).prev().val();
                        $(this).prev().val('');
                        var reg = /\S+/;
                        if(!reg.test(value)){
                            layer.msg('评论不能为空!');
                        }else{
                            _this.$http.post(COMMUNITESERVERROOTDATA + "topic.ashx?action=createPost", {
                                uid: uid,
                                pid:courseEvaluationId,//被回复的贴ID
                                tid:tid,
                                tPid:levelOneEvaluationId,
                                groupId:_this.memberArr.groupid,
                                layer:1,//0 评论，1是回复
                                userName:nick,
                                content:value
                            }, {
                                emulateJSON: true
                            }).then(function (res) {
                                if(res.body.code==200){
                                    layer.msg('评论成功')
                                    _this.getLeaveWord(tid,_this.current);
                                    $(my).parent().next('ul.feleaveword-chirld').css('display','block');
                                    setTimeout(function(){
                                    	if($(my).parent().prev('div.febox').find('span.lookup').length<1){
                                    		$(my).parent().parent().parent().prev('div.febox').find('span.lookup').html('收起');
                                    	}else{
                                    		$(my).parent().prev('div.febox').find('span.lookup').html('收起');
                                    	}
                                    	
                                    	
                                    },200)
                                }else{
                                    layer.msg("评论失败");
                                }
                            })
                        }
                    }
                });
                // 绑定点赞方法
                $('.feleaveword').on('click','.dianzang',function () {
                    var courseEvaluationId=$(this).parent().parent().data('courseevaluationid');
                    _this.$http.post(COMMUNITESERVERROOTDATA + "topic.ashx?action=addPostPraise", {
                        pid: courseEvaluationId
                    }, {
                        emulateJSON: true
                    }).then(function (res) {
                         if(res.body.code==200){
                            layer.msg('点赞成功')
                            _this.getLeaveWord(tid,_this.current);
                         }else{
                             layer.msg("评论失败");
                         }
                    })

                });
                // 查看收起
              /*  $('.feleaveword ').on('click','.lookup',function () {
                    if($(this).html()=='收起'){
                        $(this).parent().parent().find('.feleaveword-chirld').fadeOut();
                        $(this).html('查看('+ $(this).data('count') +')');
                    }else{
                        if($(this).data('count')==0){
                            return;
                        }
                        $(this).parent().parent().find('.feleaveword-chirld').fadeIn();
                        $(this).html('收起');
                    }
                });*/
            },
            getCount:function(num,obj){ // 查看收起
            	var _this = $(obj.target);
            	 if(_this.html()=='收起'){
                       _this.parent().parent().find('.feleaveword-chirld').fadeOut();
                      _this.html('查看('+ num +')');
                    }else{
                        if(num==0){
                            return;
                        }
                        _this.parent().parent().find('.feleaveword-chirld').fadeIn();
                        _this.html('收起');
                       }
            },
            goto: function goto(index) {
                //枫叶处理
                if(index == this.current) return;
                if(index > this.allpage) {
                    this.current = this.current - 2;
                    layer.msg("Sorry ╮(╯_╰)╭ 没有下一页喽！");
                    return false;
                }
                this.current = index;
                this.getLeaveWord(tId,this.current);
            }
		}

	})
}



/*
 * 发帖
 */
function communityPost(groupId,groupTypeId) {
	new Vue({
		el: "#post",
		data: {
				themeArr:[],//主题
				isChangePic: false, //默认为未转换
		},
		filters: {
			addRootFile: function addRootFile(img) {
				return SERVERROOTFILE + img;
			}
		},
		mounted: function mounted() {
			//1.0ready --> 2.0
			var that = this;
			this.$nextTick(function() {
				this.getTheme();//获取主题
				//this.changeTx();
				this.isCanPost();
			});
		},
		methods: {
			getTheme:function(){//获取主题
				var _this = this;
				this.$http.post(COMMUNITESERVERROOTDATA + "topic.ashx?action=getTopicTypeList", {
					groupTypeId: groupTypeId
				}, {
					emulateJSON: true
				}).then(function(res) {
					if(res.body.returnObj.length < 1) {
							return false;
						} else {
							_this.themeArr = res.body.returnObj;
						}
				})
			},
			changeTx: function changeTx() {//选择图片
				var _this = this;
				$('.select').on('change', '#file_upload', function() {
					var dom = $(this).parents('.avar').find('img');
					upload(this, dom);
					_this.isChangePic = true;
				});

			},
			isCanPost: function() { //点击提交
				var _this = this;
				var uid = $(window).storager({
					key: 'feCommunityUid'
				}).readStorage();
				var username =  $(window).storager({
					key: 'feUNickName'
				}).readStorage();
				if(uid == null || uid == undefined || uid == 'undefined') {
					layer.msg('请先登录');
					setTimeout(function() {
						window.location.href = ROOT + "login.html";
					}, 1000);
					return;
				}
				$('#postbtn').click(function() {
					var title = $('#title').val();
					var content=UE.getEditor('editor').getContent();
					var sort = $('#sort').val();
					if(title == "") {
						layer.msg("标题不能为空！");
						$('#title').focus();
					} else if(content == "") {
						layer.msg("内容不能为空！");
						$('#contain').focus();
					} else {
						if(!(_this.isChangePic)){
							layer.msg('您还未选择封面图，使用系统默认图，可在个人中心修改封面~');
							setTimeout(function(){
								_this.doPost(sort,title, content, uid,username);
							},2000)
						}else{
							_this.doPost(sort,title, content, uid,username);
						}
					}
				});
			},
			doPost: function(sort,title, content, uid,uname) {
				var data = new FormData($('#membercenter')[0]);
				data.append('topicTypeId', sort);
				data.append('title', title);
				data.append('content', content);
				data.append('groupId', groupId);
				data.append('uid', uid);
				data.append('userName', uname);
				this.$http.post(COMMUNITESERVERROOTDATA + "topic.ashx?action=createTopic", data, {
					emulateJSON: true
				}).then(function(res) {
					if(res.body.code == 200) {
						setTimeout(function(){
							layer.confirm('发帖成功,继续发帖？', {
						            btn : [ '确定', '取消' ]//按钮
						        }, function(index) {
						        	layer.close(index);
						           $('#title').val('');
						           $('#contain').val('');
						        },function(){
						        	window.location.href = "communitygroupdetail.html?groupId="+groupId+'&groupTypeId='+groupTypeId;
						        });
						},2000);

					} else {
						layer.msg("发帖失败，请重新发帖");
					}

				});
			}
		}

	})
}
/*
 群组详情页
  */
function communitygroupdetail(id,typeId) {
	new Vue({
		el: "#communitygroupdetail",
		data: {
			isLoginArr:[],//判断是否登录，0 未登录 1登录
			isCanAdd:0,//判断是否加入群组权限，0 无权限  1有权限   有无加组权限跟创组是一样
			isaddGroup:[],//判断是否加入群组，，0 加入  1未加入
			groupInfo:[],//获取群组信息
			memberName:'',//用户昵称
			memberHref:'',//社圈用户中心
			// groupId:'',
			adminList:[],//管理员列表
			notice:[],//公告
			newtheme:[],//新帖
			essencetheme:[],//精贴
			activeMember:[],//活跃会员
			todayAddArr:[],//今日新增
			themeArr:[],//主题分类
			postListArr:[],//底部帖子列表
			themepostMore:[],//主题更多
			newpostHref:[],//最新
			essencepostHref:[],//精华
			adminListnodata:false,//判断是否有管理员
			noticenodata:false,//判断是否有公告
			newthemenodata:false,//判断是否有最新帖子
			essencethemenodata:false,//判断是否有最新帖子
			activeMembernodata:false,//判断是否有最新帖子
			postListArrnodata:false
		},
		filters: {
			addRoot: function addRoot(uid) {
				return ROOT + "communitydetail.html?Uid=" + uid;
			},
			addRootFile: function addRootFile(img) {
				return COMMINITYROOTFILE + img;
			},
			addAvarFile: function addRootFile(img) {
				return SERVERROOTFILE + img;
			}
		},
		mounted: function() {
			var _this = this;
			this.$nextTick(function() {
				
				_this.getGroupInfo(); //获取群组信息
				
				_this.getAdminList();//管理员
				_this.getNotice();//公告
				_this.getNewtheme();//获取最新
				_this.getTodayAdd();//获取今日新增
				_this.getThemeSort();//获取主题分类
				_this.getEssencetheme();//精华
				_this.getActiveMember();//活跃会员
				_this.getThemePostList('');//获取底部帖子，默认获取全部
			})
		},
		methods: {
			isLogin:function(){//判断是否登录
				var _this = this;
				var uid = $(window).storager({
									key: 'feCommunityUid'
								}).readStorage();
				if(uid == null || uid == undefined || uid == 'undefined') {
					_this.isLoginArr = 0;
					_this.isaddGroup = 0;
					_this.memberName = '游客';
					_this.memberHref=ROOT + "login.html";
				}else{
					_this.isLoginArr = 1;
					_this.isCanAddGroup();//
					_this.memberName = $(window).storager({
									key: 'feUNickName'
								}).readStorage();
					_this.memberHref = 'centeralreadygroup.html';
				}
				
			},
			isCanAddGroup:function(){//判断是否有加组权限
				var uid = $(window).storager({key: 'feCommunityUid'}).readStorage();
				var _this = this;
				this.$http.post(COMMUNITESERVERROOTDATA + "web_users.ashx?action=getIsUseUser", {
					uid:uid,
					groupTypeId: typeId
				}, {
					emulateJSON: true
				}).then(function(res) {
						if(res.body.flagUse == true) {//已加入
							_this.isCanAdd = 1;
							_this.isAddGroup();//判断是否加入该群组
						} else {
							_this.isCanAdd = 0;
						}
					}).then(function(){
						var _this = this;
						var uid = $(window).storager({
									key: 'feCommunityUid'
								}).readStorage();
								console.log(_this.isCanAdd)
						$('.creatnewpost').on('click','a',function () {
							if(uid == null || uid == undefined || uid == 'undefined') {
								layer.msg('请先登录');
								setTimeout(function() {
									window.location.href = ROOT + "login.html";
								}, 1000);
								return;
							}
							
							if(_this.isaddGroup==1){
								$(this).attr('target','_blank');
								$(this).attr('href','communitypost.html?groupId='+id+'&groupTypeId='+typeId);
								
							}else{
								layer.msg('请先加入该群组~');
							}
							
							
							
						});
						
						$('.addgroup').on('click',function () {
							if(uid == null || uid == undefined || uid == 'undefined') {
								layer.msg('请先登录');
								setTimeout(function() {
									window.location.href = ROOT + "login.html";
								}, 1000);
								return;
							}
							if(_this.isaddGroup==0){//加入群组
								_this.$http.post(COMMUNITESERVERROOTDATA + "topic.ashx?action=addGroupMembersInfo", {
								uid: uid,
								groupId:id
							}, {
								emulateJSON: true
							})
								.then(function(res) {
									layer.msg(res.body.message);
									_this.isAddGroup();
									_this.getGroupInfo();
									_this.getActiveMember();
								})
							}
							
						});
						
						
					})
			},
			isAddGroup:function(){//判断是否加入群组
				var uid = $(window).storager({key: 'feCommunityUid'}).readStorage();
				var _this = this;
				this.$http.post(COMMUNITESERVERROOTDATA + "web_users.ashx?action=getIsUseUser", {
					uid:uid,
					groupId: id
				}, {
					emulateJSON: true
				}).then(function(res) {
						if(res.body.flagGroup == true) {//已加入
							_this.isaddGroup = 1;
							_this.getTodayAdd();//刷新
						} else {
							_this.isaddGroup = 0;
						}
					})
			},
			getGroupInfo: function() { //获取群组信息
				var _this = this;
				this.$http.post(COMMUNITESERVERROOTDATA + "topic.ashx?action=getGroupInfoById", {
					groupId: id
				}, {
					emulateJSON: true
				})
					.then(function(res) {
						if(res.body.returnObj.length < 1) {
							layer.msg("没有该群组!");
							return false;
						} else {
							_this.groupInfo = res.body.returnObj;
						}
					}).then(function(){
						_this.isLogin();//判断是否登录
					})
			},
			getAdminList:function () {
				var _this = this;
				this.$http.post(COMMUNITESERVERROOTDATA + "topic.ashx?action=getGroupMembersAdminList", {
					groupId: id
				}, {
					emulateJSON: true
				}).then(function(res) {
						if(res.body.returnObj.length < 1) {
							_this.adminListnodata = true;
							return false;
						} else {
							_this.adminListnodata = false;
							_this.adminList = res.body.returnObj;
						}
					}).then(function(){
						_this.adminList.forEach(function(item,index){
							Vue.set(item, "userId", 'communityuserspace.html?userId=' + item.userId);
						})
					})
			},
			getNotice:function () {
				var _this = this;
				this.$http.post(COMMUNITESERVERROOTDATA + "topic.ashx?action=getGroupAnnouncementsList", {
					groupId: id,
					topNum:4
				}, {
					emulateJSON: true
				}).then(function(res) {
						if(res.body.returnObj.length < 1) {
							_this.noticenodata = true;
							return false;
						} else {
							_this.noticenodata = false;
							_this.notice = res.body.returnObj;
						}
					})
			},
			seeDetail:function(message){//点击弹出公告内容
				layer.open({
				  type: 1,
				  title:'公告详情',
				  skin: 'layui-layer-rim', //加上边框
				  area: ['500px', '320px'], //宽高
				  content:'<div style="padding: 10px 20px ">' +message+'</div>'
				});
			},
			getNewtheme:function () {
				var _this = this;
				_this.newpostHref = 'communitypostlist.html?type=4&groupId='+id;
				this.$http.post(COMMUNITESERVERROOTDATA + "topic.ashx?action=getGroupTopicNewList", {
					groupId: id,
					topNum:7
				}, {
					emulateJSON: true
				}).then(function(res) {
					if(res.body.returnObj.length < 1) {
						_this.newthemenodata = true;
						return false;
					} else {
						_this.newthemenodata = false;
						_this.newtheme = res.body.returnObj;
					}
				}).then(function(){
					_this.newtheme.forEach(function(item,index){
						var timeArr = new Array;
						timeArr = item.lastpost.split(' ');
						Vue.set(item, "postId", 'communitypostdetail.html?postId=' + item.tid);
						Vue.set(item, "postTime", timeArr[0]);
					})
				})
			},
			getEssencetheme:function () {
				var _this = this;
				_this.essencepostHref = 'communitypostlist.html?type=2&groupId='+id;
				this.$http.post(COMMUNITESERVERROOTDATA + "topic.ashx?action=getGroupTopicDigestList", {
					groupId: id,
					topNum:6
				}, {
					emulateJSON: true
				}).then(function(res) {
					if(res.body.returnObj.length < 1) {
						_this.essencethemenodata = true;
						return false;
					} else {
						_this.essencethemenodata = false;
						_this.essencetheme = res.body.returnObj;
					}
				}).then(function(){
					_this.essencetheme.forEach(function(item,index){
						var timeArr = new Array;
						timeArr = item.lastpost.split(' ');
						Vue.set(item, "postId", 'communitypostdetail.html?postId=' + item.tid);
						Vue.set(item, "postTime", timeArr[0]);
					})
				})
			},
			getActiveMember:function(){
				var _this = this;
				this.$http.post(COMMUNITESERVERROOTDATA + "topic.ashx?action=getGroupMembersTopList", {
					groupId: id,
					topNum:8
				}, {
					emulateJSON: true
				}).then(function(res) {
					if(res.body.returnObj.length < 1) {
						_this.activeMembernodata = true;
						return false;
					} else {
						_this.activeMembernodata = false;
						_this.activeMember = res.body.returnObj;
					}
				}).then(function(){
					_this.activeMember.forEach(function(item,index){
						Vue.set(item, "userId", 'communityuserspace.html?userId=' + item.userId);
					})
				})
			},
			getTodayAdd:function(){//获取今日新增
				var _this = this;
				this.$http.post(COMMUNITESERVERROOTDATA + "topic.ashx?action=getGroupDayMemberTopicCount", {
					groupId: id
				}, {
					emulateJSON: true
				}).then(function(res) {
					if(res.body.length < 1) {
						console.log('没有今日新增数据')
						return false;
					} else {
						_this.todayAddArr = res.body;
					}
				})
			},
			getThemeSort: function() { //获取主题分类
				var _this = this;
				this.$http.post(COMMUNITESERVERROOTDATA + "topic.ashx?action=getTopicTypeList", {
					groupTypeId: typeId
				}, {
					emulateJSON: true
				}).then(function(res) {
					if(res.body.returnObj.length < 1) {
						return false;
					} else {
						_this.themeArr = res.body.returnObj;
					}
				}).then(function(){
					_this.themeArr.forEach(function(item,index){
						Vue.set(item, "typeId", item.typeid);
					})
				});
				
				
			},
			selectTheme:function(typeid,dataId){//主题选择
				$('#fetheme li').removeClass('active');
				$('#fetheme li').eq(dataId).addClass('active');
				var _this = this;
				_this.getThemePostList(typeid);
			},
			getThemePostList: function(topicid) { //获取底部分类帖子内容
				var _this = this;
					_this.themepostMore = 'communitypostlist.html?groupId='+id+'&topicId='+topicid;
				this.$http.post(COMMUNITESERVERROOTDATA + "topic.ashx?action=getGroupTopicAllList", {
					groupId: id,
					pageIndex:1,
					pageSize:8,
					topicTypeId:topicid
				}, {
					emulateJSON: true
				}).then(function(res) {
					if(res.body.returnObj.length < 1) {
						_this.postListArrnodata = true;
						layer.msg('当前类型没有数据，换个试试~')
					} else{
						_this.postListArrnodata = false;
					}
					_this.postListArr = res.body.returnObj;
				}).then(function(){
					_this.postListArr.forEach(function(item,index){
						Vue.set(item, "postId", 'communitypostdetail.html?postId=' + item.tid);
					})
				})
				
				
			}
		}
	})
}


/*
 * 帖子列表页
 */

function communityPostList(groupId,topicTypeId,type) {
	new Vue({
		el: "#communitypostList",
		data: {
				groupInfo:[],//群组信息
				isCanAdd:0,//判断是否加入群组权限，0 无权限  1有权限   有无加组权限跟创组是一样
				isaddGroup:0,//未加入为0，加入为1  默认未加入
				topicName:[],//分类名字
				addPost:[],//今日新增帖子
				addMember:[],//新增会员
				memberName:[],//会员名字
				memberHref:'',//社圈个人中心地址
				postListArr:[],//帖子信息
				rightHotArr:[],//左边热门
				rightEssenceArr:[],//左边精华
				rightRecommendArr:[],//左边推荐
				themeArr:[],//主题
				groupTypeId:[],//组区id
				groupSortArr:[],//发帖类型选择
				postListArrnodata:false,//没有帖子列表
				typeId:0,//默认类型为0
				current:1,
	            allCount:0,
	            showItem:7,
	            allpage:""
		},
		filters: {
			addRootFile: function addRootFile(img) {
				return COMMINITYROOTFILE + img;
			}
		},
		computed: {
            pages: function pages() {
                var pag = [];
                if(this.current < this.showItem) {
                    //如果当前的激活的项 小于要显示的条数
                    //总页数和要显示的条数那个大就显示多少条
                    var i = Math.min(this.showItem, this.allpage);
                    while(i) {
                        pag.unshift(i--);
                    }
                } else {
                    //当前页数大于显示页数了
                    var middle = this.current - Math.floor(this.showItem / 2),
                        //从哪里开始
                        i = this.showItem;
                    if(middle > this.allpage - this.showItem) {
                        middle = this.allpage - this.showItem + 1;
                    }
                    while(i--) {
                        pag.push(middle++);
                    }
                }
                return pag;
            }
        },
		mounted: function mounted() {
			//1.0ready --> 2.0
			var _this = this;
			this.$nextTick(function() {
				_this.getGroupInfo();//获取群组信息
				_this.isLogin();//判断是否登录
				_this.getToday();//获取今日新增
				_this.typeSelect(type);//获取默认列表
				_this.getRightHotList();//获取右边热门
				_this.getRightEssenceList();//获取右边精华
				_this.getRightRecommendList();//获取右边推荐
				
			});
		},
		methods: {
			isLogin:function(){//判断是否登录
				var _this = this;
				var uid = $(window).storager({
									key: 'feCommunityUid'
								}).readStorage();
				var uname = $(window).storager({
									key: 'feUNickName'
								}).readStorage();
				if(uid == null || uid == undefined || uid == 'undefined' || uid=='') {
					_this.isLoginArr = 0;
					_this.memberName = '游客';
					_this.memberHref = ROOT + "login.html";
				}else{
					_this.isLoginArr = 1;
					_this.memberName = uname;
					_this.memberHref = 'centeralreadygroup.html';
				}
			},
			isCanAddGroup:function(id){//判断是否有加组权限
				var uid = $(window).storager({key: 'feCommunityUid'}).readStorage();
				if(uid != null && uid != undefined && uid != 'undefined' && uid !='') {
				var _this = this;
				this.$http.post(COMMUNITESERVERROOTDATA + "web_users.ashx?action=getIsUseUser", {
					uid:uid,
					groupTypeId:id
				}, {
					emulateJSON: true
				}).then(function(res) {
						if(res.body.flagUse == true) {//已加入
							_this.isAddGroup();//判断是否加入该群组
							_this.isCanAdd = 1;
							var ue = UE.getEditor('editor');
						} else {
							_this.isCanAdd = 0;
						}
					}).then(function(){
						var uid = $(window).storager({
									key: 'feCommunityUid'
								}).readStorage();
						$('.addgroup').on('click',function () {//申请加入群组
							if(uid == null || uid == undefined || uid == 'undefined') {
								layer.msg('请先登录');
								setTimeout(function() {
									window.location.href = ROOT + "login.html";
								}, 1000);
								return;
							}
							if(_this.isaddGroup==0){//如果未加入，加入群组
								_this.$http.post(COMMUNITESERVERROOTDATA + "topic.ashx?action=addGroupMembersInfo", {
								uid: uid,
								groupId:groupId
							}, {
								emulateJSON: true
							})
								.then(function(res) {
									layer.msg(res.body.message);
									_this.isAddGroup();
								})
							}
							
						});
						$('.creatnewpost').on('click',function () {
							if(uid == null || uid == undefined || uid == 'undefined') {
								layer.msg('请先登录');
								setTimeout(function() {
									window.location.href = ROOT + "login.html";
								}, 1000);
								return;
							}
							if(_this.isaddGroup==1){
								window.location.href='communitypost.html?groupId='+groupId+'&groupTypeId='+_this.groupTypeId;
							}else{
								layer.msg('请先加入该群组~');
							}
							
						});
						_this.isCanPost(id);//发帖
					})
				}
			},
			isAddGroup:function(){//判断是否加入群组
				var uid = $(window).storager({key: 'feCommunityUid'}).readStorage();
				var _this = this;
				this.$http.post(COMMUNITESERVERROOTDATA + "topic.ashx?action=getUserAndGroupByUidGroupId", {
					uid:uid,
					groupId: groupId
				}, {
					emulateJSON: true
				}).then(function(res) {
						if(res.body.isFocus == true) {//已加入
							_this.isaddGroup = 1;
							_this.getToday();//刷新下加入数据
						} else {
							_this.isaddGroup = 0;
						}
					})
			},
			getGroupInfo: function() { //获取群组信息
				var _this = this;
				this.$http.post(COMMUNITESERVERROOTDATA + "topic.ashx?action=getGroupInfoById", {
					groupId: groupId
				}, {
					emulateJSON: true
				})
					.then(function(res) {
						if(res.body.returnObj.length < 1) {
							layer.msg("没有该群组!");
							return false;
						} else {
							_this.groupInfo = res.body.returnObj;
						}
					}).then(function () {
						var _this = this;
						_this.groupTypeId = _this.groupInfo[0].groupTypeId;
						_this.isCanAddGroup(_this.groupTypeId);//判断是否有加组权限
						_this.getTheme(_this.groupTypeId);//获取主题
						//_this.isCanPost(_this.groupTypeId);//发帖
						
						
						
				})
			},
			getToday:function(){//获取今日信息
				var _this = this;
				this.$http.post(COMMUNITESERVERROOTDATA + "topic.ashx?action=getTopicCountByTypeIdAndGroupId", {
					groupId:groupId,
					topicTypeId:topicTypeId
				}, {
					emulateJSON: true
				}).then(function(res) {
					_this.topicName = res.body.topicTypeName;
					_this.addPost = res.body.topicCount;
					_this.addMember = res.body.memberCount;
				})
			},
			typeSelect:function(id){//选择分类
				var _this = this;
				_this.current = 1;
				$('#fepostlisttype a').removeClass('active');
				$('#fepostlisttype a').eq(id).addClass('active');
				
				_this.getPostList(id,_this.current);
			},
			getPostList:function(id,currentPage){//获取列表
				var _this = this;
				_this.typeId = id;
				this.$http.post(COMMUNITESERVERROOTDATA + "topic.ashx?action=getGroupTopicAllList", {
					groupId: groupId,
					pageIndex:currentPage,
					pageSize:_this.showItem,
					topicTypeId:topicTypeId,
					type:id
				}, {
					emulateJSON: true
				}).then(function(res) {
					if(res.body.returnObj.length < 1) {
						_this.postListArrnodata = true;
							layer.msg('没有数据，换个类型试试~')
						}else{
							_this.postListArrnodata = false;
						}
							_this.allpage = Math.ceil(res.body.total / _this.showItem); //总页数
							_this.postListArr = res.body.returnObj;
						
				}).then(function(){
					_this.postListArr.forEach(function(item,index){
						var img = item.icon;
						if(img == null || img == undefined || img == 'undefined' || img=='') {
							img = '../images/static/community/avar.png'
						}else{
							img = COMMINITYROOTFILE + img;
						}
						Vue.set(item, "ptx", img);
						Vue.set(item, "postId", "communitypostdetail.html?postId="+item.tid);
					})
				})
			},
			getRightHotList:function(){//获取右边热门排行
				var _this = this;
				this.$http.post(COMMUNITESERVERROOTDATA + "topic.ashx?action=getTopicListTopHotByTypeAndGroupId", {
					groupId: groupId,
					topNum:4
				}, {
					emulateJSON: true
				}).then(function(res) {
					if(res.body.returnObj.length < 1) {
							return false;
						} else {
							_this.rightHotArr = res.body.returnObj;
						}
				}).then(function(){
					_this.rightHotArr.forEach(function(item,index){
						Vue.set(item, "postId", "communitypostdetail.html?postId="+item.tid);
					})
				})
			},
			getRightEssenceList:function(){//获取右边精华排行
				var _this = this;
				this.$http.post(COMMUNITESERVERROOTDATA + "topic.ashx?action=getTopicListTopDigestByTypeAndGroupId", {
					groupId: groupId,
					topNum:4
				}, {
					emulateJSON: true
				}).then(function(res) {
					if(res.body.returnObj.length < 1) {
							return false;
						} else {
							_this.rightEssenceArr = res.body.returnObj;
						}
				}).then(function(){
					_this.rightEssenceArr.forEach(function(item,index){
						Vue.set(item, "postId", "communitypostdetail.html?postId="+item.tid);
					})
				})
			},
			getRightRecommendList:function(){//获取右边推荐排行
				var _this = this;
				this.$http.post(COMMUNITESERVERROOTDATA + "topic.ashx?action=getTopicListTopSpecialByTypeAndGroupId", {
					groupId: groupId,
					topNum:4
				}, {
					emulateJSON: true
				}).then(function(res) {
					if(res.body.returnObj.length < 1) {
							return false;
						} else {
							_this.rightRecommendArr = res.body.returnObj;
						}
				}).then(function(){
					_this.rightRecommendArr.forEach(function(item,index){
						Vue.set(item, "postId", "communitypostdetail.html?postId="+item.tid);
					})
				})
			},
			getTheme:function(gtd){//获取分类
				var _this = this;
				this.$http.post(COMMUNITESERVERROOTDATA + "topic.ashx?action=getTopicTypeList", {
					groupTypeId: gtd
				}, {
					emulateJSON: true
				}).then(function(res) {
					if(res.body.returnObj.length < 1) {
							return false;
						} else {
							_this.themeArr = res.body.returnObj;
						}
				})
			},
			isCanPost: function(gtd) { //点击提交
				var _this = this;
				var uid = $(window).storager({
					key: 'feCommunityUid'
				}).readStorage();
				var username =  $(window).storager({
					key: 'feUNickName'
				}).readStorage();
				/*if(uid == null || uid == undefined || uid == 'undefined' || uid == "") {
					layer.msg('请先登录');
					setTimeout(function() {
						window.location.href = ROOT + "login.html";
					}, 1000);
					return;
				}*/
				
				
				$('#postbtn').on('click',function() {
					if(uid == null || uid == undefined || uid == 'undefined' || uid == "") {
						layer.msg('请先登录');
						setTimeout(function() {
							window.location.href = ROOT + "login.html";
						}, 1000);
					
					}
					
					var title = $('#title').val();
					var content=UE.getEditor('editor').getContent();
					var sort = $('#sort').val();
					
					if(_this.isaddGroup==0){
								layer.msg('请加入小组！');
							}else if(title == "") {
						layer.msg("标题不能为空！");
						$('#title').focus();
					} else if(content == "") {
						layer.msg("内容不能为空！");
						$('#contain').focus();
					}else if(sort==null || sort == undefined || sort == 'undefined'){
						layer.msg("请选择分类！");
						}else{
						
						_this.doPost(sort,title, content, uid,username,gtd);
					}
				});
			},
			doPost: function(sort,title, content, uid,uname,gtd) {
				var _this = this;
				this.$http.post(COMMUNITESERVERROOTDATA + "topic.ashx?action=createTopic", {
					topicTypeId:sort,
					title: title,
					content: content,
					groupId: groupId,
					uid: uid,
					userName:uname,
				}, {
					emulateJSON: true
				}).then(function(res) {
					if(res.body.code == '200') {
						layer.msg('发帖成功~');
						setTimeout(function(){
							window.location.href = "communitygroupdetail.html?groupId="+groupId+'&groupTypeId='+gtd;
						},2000);
								
						
					}
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
				_this.getPostList(_this.typeId,_this.current);
			}
		}

	})
}

/*
 个人空间
  */
 function communityuserspace(userId){
 	new Vue({
		el: "#fecommunityuserspace",
		data: {
				userInfo:[],//页主信息
				userMainInfo:[],//页主头像等信息
				postListArr:[],//帖子列表
				groupListArr:[],//群组列表
				userInfoNodata:false,//页主没数据
				postListArrNodata:false,//帖子列表没数据
				groupListArrNodata:false,//群组列表没数据
				isAttention:0,//未关注0，已关注为1  默认未关注
				attentionArr:[],//关注的人
				followedArr:[],//被关注的人
				newPostArr:[],//新帖子
				attentionArrNodata:false,//关注的人没数据
				followedArrNodata:false,//被关注的人没数据
				newPostArrNodata:false,//新帖子没数据
				isFirstGroupArr:true,//是否第一次获取群组
				isMe:0,//判断是否是自己  0 不是  1是
				isPost:1,//判断是帖子类型还是群组，0 群组  1帖子，默认为1
				searchKey:[],//搜索值
				isSearch:0,//判断是否是搜索  0不是 1 是
				typeId:'',//默认类型为'',获取全部
				current:1,
				postCurrent:1,//帖子当前页
				groupCurrent:1,//群组当前页
				allpage:0,
	           	postAllpage:0,//帖子总页数
	           	groupAllpage:0,//群组总页数
	            showItem:7,
	            allpage:""
		},
		filters: {
			addRootFile: function addRootFile(img) {
				return COMMINITYROOTFILE + img;
			},
			addAvarFile:function addAvarFile(img){
				return SERVERROOTFILE + img;
			}
		},
		computed: {
            pages: function pages() {
                var pag = [];
                if(this.current < this.showItem) {
                    //如果当前的激活的项 小于要显示的条数
                    //总页数和要显示的条数那个大就显示多少条
                    var i = Math.min(this.showItem, this.allpage);
                    while(i) {
                        pag.unshift(i--);
                    }
                } else {
                    //当前页数大于显示页数了
                    var middle = this.current - Math.floor(this.showItem / 2),
                        //从哪里开始
                        i = this.showItem;
                    if(middle > this.allpage - this.showItem) {
                        middle = this.allpage - this.showItem + 1;
                    }
                    while(i--) {
                        pag.push(middle++);
                    }
                }
                return pag;
            }
        },
		mounted: function mounted() {
			//1.0ready --> 2.0
			var _this = this;
			this.$nextTick(function() {
				_this.isLogin()//判断是否是自己
				_this.getUserInfo();//获取页主信息
				_this.getPostList('',_this.current);//默认获取帖子列表
				_this.getAttentionList();//获取他关注的人
				_this.getFollowList();//获取关注他的人
				_this.getNewPostList();//获取最新帖子
				
			});
		},
		methods: {
			isLogin:function(){//判断是否是自己
				var _this = this;
				var uid = $(window).storager({
									key: 'feCommunityUid'
								}).readStorage();
				
				if(uid == null || uid == undefined || uid == 'undefined' || uid=='') {
					_this.isMe = 0;
				}else{
					_this.getAttention();//判断是否关注
					if(uid!=userId){//如果不是自己
						_this.isMe = 0;
					}else if(uid == userId){
						_this.isMe = 1;
					}
					
					
				}
			},
			getAttention: function(){//判断是否加关注
				var uid = $(window).storager({key: 'feCommunityUid'}).readStorage();
				var _this = this;
				this.$http.post(COMMUNITESERVERROOTDATA + "web_users.ashx?action=getIsUseUser", {
					uid:uid,
					focusUserId: userId
				}, {
					emulateJSON: true
				}).then(function(res) {
						if(res.body.flagFans == true) {//已加入
							_this.isAttention = 1;
						} else {
							_this.isAttention = 0;
						}
					})
			},
			addAttention:function(){//加关注
				var uid = $(window).storager({key: 'feCommunityUid'}).readStorage();
				var _this = this;
				if(uid==undefined || uid == 'undefined' || uid==null || uid=='null' || uid==''){
					layer.msg('请先登录~');
					setTimeout(function(){
						window.location.href=ROOT+'login.html';
					},1000)
					
				}
				_this.$http.post(COMMUNITESERVERROOTDATA + "topic.ashx?action=addUserFans", {
	                    uid:uid,
	                    focusUserId:userId
	                }, {
					emulateJSON: true
				}).then(function(res) {
						if(res.body.code == '200') {//已加入
							layer.msg(res.body.message);
							_this.getAttention();
							_this.getUserInfo();
							_this.getFollowList();
						} else {
							layer.msg('取消关注失败，请重新操作~');
						}
					})
			},
			cancelAttention:function(){//取消关注
				var uid = $(window).storager({key: 'feCommunityUid'}).readStorage();
				var _this = this;
				this.$http.post(COMMUNITESERVERROOTDATA + "topic.ashx?action=closeFocus", {
					uid:uid,
					focusUserId: userId
				}, {
					emulateJSON: true
				}).then(function(res) {
						if(res.body.code == '200') {//已加入
							layer.msg(res.body.message);
							_this.getAttention();
							_this.getUserInfo();
							_this.getFollowList();
						} else {
							layer.msg('取消关注失败，请重新操作~');
						}
					})
			},
			getUserInfo: function() { //获取页主信息
				var _this = this;
				this.$http.post(COMMUNITESERVERROOTDATA + "web_users.ashx?action=getUserInfoAndCount", {
					uid: userId
				}, {
					emulateJSON: true
				})
					.then(function(res) {
						
							_this.userInfo = res.body;
						
					}).then(function (){
						if(_this.userInfo.userInfo.length < 1) {
							_this.userInfoNodata = true;
							return false;
						} else {
							_this.userInfoNodata = false;
							_this.userMainInfo = _this.userInfo.userInfo[0];
						}
						
				})
			},
			headSelect:function(obj,id){//帖子、群组切换
				var _this = this;
				$(obj.target).addClass('active');
				$(obj.target).siblings('a').removeClass('active');
				if(id==0){//帖子
					_this.isPost =1;
					_this.allpage =_this.postAllpage;
					_this.current = _this.postCurrent;
					$(obj.target).parent().siblings('ul').css('display','block');
				}else{
					_this.isPost =0;
					_this.isSearch = 0;//非搜素
					_this.allpage =_this.groupAllpage;
					_this.current = _this.groupCurrent;
					if(_this.isFirstGroupArr){//不知道是否可以更优化，暂时保存，如果只能加载一次，点击搜索后  回不到获取所有
						_this.getGroupList(1);//获取群组列表
						_this.isFirstGroupArr = false;
					}
					//_this.getGroupList(1);//获取群组列表
					$(obj.target).parent().siblings('ul').css('display','none');
				}
				
			},
			selectSort:function(obj,id){//帖子分类选择
				var _this = this;
				_this.current = 1;
				_this.isSearch = 0;
				$(obj.target).addClass('active');
				$(obj.target).siblings('li').removeClass('active');
				_this.getPostList(id,_this.current);//获取帖子列表
				
			},
			onSearch:function(obj){//点击搜索
				var _this = this;
				var cons = $(obj.target).parents('.search').find('input').val();
				if(cons == ''){
					layer.msg('请输入正确的搜索内容哦~');
					return false;
				}else{
					_this.searchKey = cons;
					_this.current = 1;
					_this.isSearch = 1;
					if(_this.isPost==1){//帖子搜索
						_this.getSearchPost(_this.current)
					}else{//群组搜索
						_this.isFirstGroupArr = true;
						_this.getSearchGroup(_this.current);
					}
				}
			},
			getSearchPost:function(currentPage){//搜索获取帖子列表
				var _this = this;
				this.$http.post(COMMUNITESERVERROOTDATA + "web_topics.ashx?action=getMyCreatePostListByUid", {
					uid: userId,
					type:"",
					conditions:_this.searchKey,
					pageIndex:currentPage,
					pageSize:_this.showItem
				}, {
					emulateJSON: true
				}).then(function(res) {
					if(res.body.returnObj.length < 1) {
						layer.msg('没有相关搜索结果，换个关键词试试哦~')
					} else { 
						
							_this.allpage = res.body.totalPageCount;
							_this.postAllpage = _this.allpage;
							_this.postCurrent = currentPage;
							_this.postListArr = res.body.returnObj;
						}
				}).then(function(){
					_this.postListArr.forEach(function(item,index){
						Vue.set(item, "postId", "communitypostdetail.html?postId="+item.tid);
					})
				})
			},
			getSearchGroup:function(currentPage){//搜索获取群组列表
				var _this = this;
				this.$http.post(COMMUNITESERVERROOTDATA + "web_group.ashx?action=getMyGroupListByUid", {
					uid: userId,
					conditions:_this.searchKey,
					pageIndex:currentPage,
					pageSize:_this.showItem
				}, {
					emulateJSON: true
				}).then(function(res) {
					if(res.body.returnObj.length < 1) {
						layer.msg('没有相关搜索结果，换个关键词试试哦~');
					} else {
						
							_this.allpage =res.body.totalPageCount;
							_this.groupAllpage = _this.allpage;
							_this.groupCurrent = currentPage;
							_this.groupListArr = res.body.returnObj;
							
					}	
				}).then(function(){
					_this.groupListArr.forEach(function(item,index){
						Vue.set(item, "groupId", "communitygroupdetail.html?groupId="+item.groupId+'&groupTypeId='+item.groupTypeId);
					})
				})
			},
			getPostList:function(type,currentPage){//获取帖子列表
				var _this = this;
				_this.typeId = type;
				this.$http.post(COMMUNITESERVERROOTDATA + "web_topics.ashx?action=getMyCreatePostListByUid", {
					uid: userId,
					type:type,
					pageIndex:currentPage,
					pageSize:_this.showItem
				}, {
					emulateJSON: true
				}).then(function(res) {
					if(res.body.returnObj.length < 1) {
						
							_this.postListArrNodata = true;
						} else {
							_this.postListArrNodata = false;
						}
						
							_this.allpage = res.body.totalPageCount;
							_this.postAllpage = _this.allpage;
							_this.postCurrent = currentPage;
							_this.postListArr = res.body.returnObj;
						
					/*if(res.body.returnObj.length < 1) {
							return false;
						} else {
							_this.allpage = res.body.totalPageCount;
							_this.postAllpage = _this.allpage;
							_this.postCurrent = currentPage;
							_this.postListArr = res.body.returnObj;
							
							
						}*/
				}).then(function(){
					_this.postListArr.forEach(function(item,index){
						Vue.set(item, "postId", "communitypostdetail.html?postId="+item.tid);
					})
				})
			},
			getGroupList:function(currentPage){//获取群组列表
				var _this = this;
				this.$http.post(COMMUNITESERVERROOTDATA + "web_group.ashx?action=getMyGroupListByUid", {
					uid: userId,
					pageIndex:currentPage,
					pageSize:_this.showItem
				}, {
					emulateJSON: true
				}).then(function(res) {
					if(res.body.returnObj.length < 1) {
						_this.groupListArrNodata = true;
					} else {
						_this.groupListArrNodata = false;
					}
							_this.allpage =res.body.totalPageCount;
							_this.groupAllpage = _this.allpage;
							_this.groupCurrent = currentPage;
							_this.groupListArr = res.body.returnObj;
							
						
				}).then(function(){
					_this.groupListArr.forEach(function(item,index){
						Vue.set(item, "groupId", "communitygroupdetail.html?groupId="+item.groupId+'&groupTypeId='+item.groupTypeId);
					})
				})
			},
			getAttentionList:function(){//获取他关注的人
				var _this = this;
				this.$http.post(COMMUNITESERVERROOTDATA + "web_users.ashx?action=getMyFocusFansList", {
					uid: userId,
					topNum:8
				}, {
					emulateJSON: true
				}).then(function(res) {
					if(res.body.returnObj.length<1){
						_this.attentionArrNodata = true;
					}else{
						_this.attentionArrNodata = false;
					}
						_this.attentionArr = res.body.returnObj;
				}).then(function(){
					_this.attentionArr.forEach(function(item,index){
						Vue.set(item, "userId", "communityuserspace.html?userId="+item.uid);
					})
				})
			},
			getFollowList:function(){//获取关注他的人
				var _this = this;
				this.$http.post(COMMUNITESERVERROOTDATA + "web_users.ashx?action=getFocusMyFansList", {
					uid: userId,
					topNum:8
				}, {
					emulateJSON: true
				}).then(function(res) {
					if(res.body.returnObj.length<1){
						_this.followedArrNodata = true;
					}else{
						_this.followedArrNodata = false;
					}
						_this.followedArr = res.body.returnObj;
				}).then(function(){
					_this.followedArr.forEach(function(item,index){
						Vue.set(item, "userId", "communityuserspace.html?userId="+item.uid);
					})
				})
			},
			getNewPostList:function(){//获取最新帖子
				var _this = this;
				this.$http.post(COMMUNITESERVERROOTDATA + "web_topics.ashx?action=getTopicNewListByUid", {
					uid: userId,
					topNum:8
				}, {
					emulateJSON: true
				}).then(function(res) {
					if(res.body.returnObj.length < 1) {
						_this.newPostArrNodata = true;
					} else {
							_this.newPostArrNodata = false;
						}
					_this.newPostArr = res.body.returnObj;
				}).then(function(){
					_this.newPostArr.forEach(function(item,index){
						Vue.set(item, "postId", "communitypostdetail.html?postId="+item.tid);
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
				if(_this.isPost==1){//帖子列表
					if(_this.isSearch==1){//搜索帖子
						_this.getSearchPost(_this.current);
					}else{
						_this.getPostList(_this.typeId,_this.current);
					}
					
				}else{//群组列表
					if(_this.isSearch==1){//搜索帖子
						_this.getSearchGroup(_this.current);
					}else{
						_this.getGroupList(_this.current);
					}
					
				}
				
			}
		}

	})
 }
