/*
 * 会员
 */
$(function() {

	if($mid != null && $mid != undefined && $mid != "") {
		$.menbercenter = function(openType) {
			//关闭banner
			$("#jclosembBanner").on("click", function() {
				$(".dycmbbanner-container").slideUp();
			});

			new Vue({
				el: "#jmembercenter",
				data: {
					userArr: [], //用户信息
					userImg:[],//用户头像
					orderArr: [], //订单
					orderWaitPayArr: [], //待支付和待评价
					orderAllApplyFlag: true, //全部订单申请Flag
					orderWaitPayFlag: true, //待支付订单申请Flag
					orderType:0,		//默认
					orderWaitEvaluateFlag: true, //待评价订单申请Flag
					avarArr:[],//默认头像列表
					messageArr: [], //消息
					invitationrulesArr: [], //邀请规则
					invitationArr: [], //邀请
					invitationContent: "播米好友邀请您加入播米",
					invitationContentVC: "播米好友邀请您加入播米邀请码:",
					invitationContentURL: ROUTEROOT+"login.html?login=2&inviteCode=",
					invitationrecordArr: [], //邀请记录
					invitationawardArr: [], //邀请奖励
					couponArr: [], //优惠券
					questiontypeArr:[],//题库类型
					questionArr: [], //题库
					collectionArr: [], //收藏
					courseArr: [], //课程
					courseTypeArr: [], //课程类型
					current: 1, //当前条位置财经
					allpage: 0, //总页码  默认热点
					showItem: 8,
					courseBoxFlag: true, //课程flag
					dataArr: [], //个人
					orderFlag: true, //显示订单Flag
					messageFlag: false, //消息Flag
					invitationFlag: false, //邀请Flag
					couponFlag: false, //优惠Flag
					questionFlag: false, //题库Flag
					collectionFlag: false, //收藏Flag
					courseFlag: false, //课程Flag
					dataFlag: false, //个人Flag
					dataChange:false,//是否点击更换头像
					codeKey:"",
					codeImg:"",
					codeKey2:"",
					codeImg2:"",
					codeKey3:"",
					codeImg3:""
				},
				filters: {
					addRoute: function(value) {
						return ROUTEFILE + value;
					}
				},
				mounted: function() { //1.0ready --> 2.0 
					this.$nextTick(function() {
						this.getUserData();
						//this.getAllOrder();
						this.messageDefault();
						this.myData();
						this.toggleNewsList();
						this.init(openType);
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
					init:function(openType){
						if(openType !="" && openType != undefined && openType !=null){
							this.toggleRightContent(openType);
							$(".dycmemberleft-list li span.active").removeClass("active");
							$(".dycmemberleft-list li span[data-show='"+openType+"']").addClass("active");
						}else{
							this.getAllOrder();
						}
					},
					getUserData: function() { //用户信息
						var _this = this;
						this.$http.post(ROUTE + "Member.ashx?action=getMemberInfoById", {
							memberId: $mid
						}, {
							emulateJSON: true
						}).then(function(res) {
							_this.userArr = res.body[0];
						}).then(function() {
							localStorage.setItem("mLever", _this.userArr.memberlevel);
						 	Vue.set(_this.userArr, "iconPath", ROUTEFILE + _this.userArr.iconPath); //注册变量  
							Vue.set(_this.userImg,"iconPath",ROUTEFILE);
							//_this.userArr.iconPath = "xxx";
							$("#dycdata-address, #dycrec-address").distpicker({
								province: _this.userArr.province,
								city: _this.userArr.city,
								district: _this.userArr.district
							});
							
							
						})
					},

					getAllOrder: function(typeId, curentPage) { //订单默认
						var _this = this;
						this.$http.post(ROUTE + "OrderDetail.ashx?action=getMemberOrderList", {
							memberId: $mid,
							pageIndex: curentPage,
							pageSize: _this.showItem,
							orderType: ""
						}, {
							emulateJSON: true
						}).then(function(res) {
							_this.orderArr = res.body.rows;
							_this.allpage = res.body.totalPageCount;

						}).then(function() {
							memberSwiper();
							_this.deleteOrder("");
						})
					},
					toggleOrderDetail: function() { //toggle 订单详情
						$("#jorder").off("click", ".jopenorder");
						$("#jorder").on("click", ".jopenorder", function(e) {
							var $obj = $(e.target);
							var $objIcon = $obj.find("i");
							$obj.parent().siblings(".dycorder-detail-box").slideToggle();
							if($objIcon.hasClass("uk-icon-angle-down")) {
								$objIcon.removeClass("uk-icon-angle-down").addClass("uk-icon-angle-up");
							} else {
								$objIcon.removeClass("uk-icon-angle-up").addClass("uk-icon-angle-down");
							}
						});
					},
					tabOrder: function(typeId, curentPage) { //切换订单
						var _this = this;
						if(0 == typeId) {
							_this.$http.post(ROUTE + "OrderDetail.ashx?action=getMemberOrderList", { //全部订单
								memberId: $mid,
								pageIndex: curentPage,
								pageSize: _this.showItem,
								orderType: ''
							}, {
								emulateJSON: true
							}).then(function(res) {
								_this.orderArr = res.body.rows;
								_this.allpage = res.body.totalPageCount;
								window.mborderSwiper.update();
							}).then(function() {
								//_this.orderWaitPayFlag = false;
								window.mborderSwiper.update();
								_this.deleteOrder("");
							})
						} else if((typeId == 1) || (typeId == 2)) {
							_this.$http.post(ROUTE + "OrderDetail.ashx?action=getMemberOrderList", { //待支付和待评价
								memberId: $mid,
								pageIndex: curentPage,
								pageSize: _this.showItem,
								orderType: typeId - 1
							}, {
								emulateJSON: true
							}).then(function(res) {
								_this.orderWaitPayArr = res.body.rows;
								_this.allpage = res.body.totalPageCount;
							}).then(function() {
								//_this.orderWaitPayFlag = false;
								window.mborderSwiper.update();
								_this.deleteOrder(--typeId);
							})

						}
						this.orderType = typeId;
					},
					//http://localhost/bmOnline/website/ashx/Course.ashx?action=getCourseByTypeAndMemberId&memberId=1&courseTypeId=1
					courseDefault: function(cId,cPa) { // 课程初始化
						this.$http.post(ROUTE + "Course.ashx?action=getCourseByTypeAndMemberId", { //课程默认大宗
							memberId: $mid,
							courseTypeId: cId,
							pageIndex:cPa,
							pageSize:this.showItem
						}, {
							emulateJSON: true
						}).then(function(res) {
							this.courseArr = res.body.rows;
							this.allpage = res.body.totalPageCount;
							this.tabCourse();
						})
					},
					tabCourse: function(index) { //切换订单课程
						var _this = this;
						if(index == undefined){
							index = 1;
						}
						$("#jtabCourseList").off("click", "a");
						$("#jtabCourseList").on("click", "a", function() {
							var obj = $(this).data("id");
							_this.courseDefault(obj,index);
						});
					},
					toggleCourseBox: function(obj) { //我的课程分类
						var $that = $(obj.target);
						var $sublist = $that.siblings(".dycsublist"),
							$jmbcoursepanel = $(".jmb-course-panel"); // 课程面板
						//http://localhost/bmOnline/website/ashx/CourseType.ashx?action=getCourseTypeByMemberId&memberId=1
						this.$http.post(ROUTE + "CourseType.ashx?action=getCourseTypeByMemberId", { //课程类型
							memberId: $mid
						}, {
							emulateJSON: true
						}).then(function(res) {
							this.courseTypeArr = res.body;
						});
						$that.toggleClass("uk-icon-angle-down");
						$that.toggleClass("uk-icon-angle-up");
						$sublist.slideToggle();

						this.getCourseType();
					},

					getCourseType: function() { //根据类型获取课程
						var _this = this;
						$("#jtabCourseList").off("click", "a");
						$("#jtabCourseList").on("click", "a", function() {
							var objId = $(this).data("id");
							_this.courseDefault(objId,1);
							_this.toggleRightContent("kc01");
						})
					},
					getquestionTypeId:function(id){
						var _this = this;
						_this.$http.post(ROUTE + "ExamPaper.ashx?action=getSecondLevelCourseType", { 
							memberId: $mid
						},{
							emulateJSON: true
						}).then(function(res){
							_this.questiontypeArr = res.body;
						});
					},
					questionDefault:function(id,curenrPage){//获取我的题库类型
						var _this = this;
						if(id == 'question'){
							_this.$http.post(ROUTE + "ErrorQuestion.ashx?action=geMemberErrorQuestion", { 
							memberId:$mid,
							courseTypeId:id,
							pageIndex: curenrPage,
							pageSize:_this.showItem
						},{
							emulateJSON: true
						}).then(function(res){
						/*_this.questionArr = res.body;*/
							_this.questionArr = res.body.rows;
							_this.allpage = res.body.totalPageCount;
						});
						}else if(id == 'score'){
							_this.$http.post(ROUTE + "ErrorQuestion.ashx?action=getMemberTotalScore", { 
							memberId:$mid,
							pageIndex: curenrPage,
							pageSize:_this.showItem
						},{
							emulateJSON: true
						}).then(function(res){
						/*_this.questionArr = res.body;*/
							_this.questionArr = res.body.rows;
							_this.allpage = res.body.totalPageCount;
						});
						}
					
						else{
							
						_this.$http.post(ROUTE + "ExamPaper.ashx?action=getExamPaperByCourseTypeId", { 
							memberId: $mid,
							courseTypeId:id,
							pageIndex: curenrPage,
							pageSize:_this.showItem
						},{
							emulateJSON: true
						}).then(function(res){
							_this.questionArr = res.body.rows;
							_this.allpage = res.body.totalPageCount;
						}).then(function(){
							
							//window.mbquestionsSwiper.update();
							//_this.questionGoto(1);
						});
						
						}
						
					},
					getQuestionType: function() { //根据题库类型获取试卷名称
						var _this = this;
						$("#jtabquestionsList").off("click", "li");
						$("#jtabquestionsList").on("click", "li", function() {
							var objId = $(this).data("id");
							$(this).siblings().removeClass('swiper-pagination-bullet-active');
							$(this).addClass('swiper-pagination-bullet-active');
							_this.questionDefault(objId,1);
							
						})
					},
					couponDefault:function(curentPage){//我的优惠券
						var _this = this;
						_this.$http.post(ROUTE + "CouponReceive.ashx?action=getCouponReceiveByMemberId", { 
							memberId: $mid,
							pageIndex: curentPage,
							pageSize:_this.showItem
						}, {
							emulateJSON: true
						}).then(function(res) {
							_this.couponArr = res.body.rows;
							_this.allpage = res.body.totalPageCount;
							
						}).then(function(){
							_this.couponGoto(1);
						});
					},
					messageDefault: function() { // 我的消息
						this.$http.post(ROUTE + "Notice.ashx?action=getMyMessages", {
							
							memberId: $mid
						}, {
							emulateJSON: true
						}).then(function(res) {
							this.messageArr = res.body;
						}).then(function(res){
							var _this = this;
							
							$("#jmessage").off("click", "p");
							$("#jmessage").on("click", "p", function() {
								var msgId = $(this).data("id");
								layer.open({
									type: 1,
									title: '我的消息',
									area: ['420px', '420px'], //宽高
									content: "<div class='dycdycmessage-content'><p>"+_this.messageArr[msgId].name+"</p><p>"+_this.messageArr[msgId].content+"</p></div>"
								});
							});
						});
					},
					myInvite: function() { //我的邀请码
						this.$http.post(ROUTE + "InvitePresent.ashx?action=getInvitePresent", { //我的邀请码规则
							memberId: $mid
						}, {
							emulateJSON: true
						}).then(function(res) {
							this.invitationrulesArr = res.body[0];
						});

						this.$http.post(ROUTE + "Member.ashx?action=getQrCode", { //我的邀请码
							memberId: $mid
						}, {
							emulateJSON: true
						}).then(function(res) {
							this.invitationArr = res.body[0];
						}).then(function() {
							this.invitationContent = "您的好友邀请您加入播米在线：" + ROUTEROOT + "login.html?login=2&inviteCode=" + this.invitationArr.inviteCode + '\n' + '邀请码是：' + this.invitationArr.inviteCode;
							this.invitationContentVC = "您的好友邀请您加入播米在线:邀请码:" + this.invitationArr.inviteCode;
							this.invitationContentURL += this.invitationArr.inviteCode;
						});

						this.$http.post(ROUTE + "MemberInvite.ashx?action=getMemberInvite", { //我的邀请记录和奖励
							memberId: $mid
						}, {
							emulateJSON: true
						}).then(function(res) {
							this.invitationrecordArr = res.body[0];
							this.invitationawardArr = res.body[1];
						});
					},

					toggleRightContent: function(key) { //显示右侧内容
						var _this = this;
						switch(key) {
							case "kc01": //课程面板
								this.orderFlag = false; //显示订单Flag
								this.messageFlag = false; //消息Flag
								this.invitationFlag = false; //邀请Flag
								this.couponFlag = false; //优惠Flag
								this.questionFlag = false; //题库Flag
								this.collectionFlag = false; //收藏Flag
								this.courseFlag = true; //课程Flag
								this.dataFlag = false; //个人Flag
								_this.pageIndex = 1;
								_this.current = 1;
								if(this.courseBoxFlag) {
									this.courseDefault("",1);
								}
								
								//mbcourseSwiper.update(true); //更新课程swiper
								break;
							case "kc02": //收藏面板
								this.orderFlag = false; //显示订单Flag
								this.messageFlag = false; //消息Flag
								this.invitationFlag = false; //邀请Flag
								this.couponFlag = false; //优惠Flag
								this.questionFlag = false; //题库Flag
								this.collectionFlag = true; //收藏Flag
								this.courseFlag = false; //课程Flag
								this.dataFlag = false; //个人Flag
								break;
							case "kc03": //题库面板
								this.orderFlag = false; //显示订单Flag
								this.messageFlag = false; //消息Flag
								this.invitationFlag = false; //邀请Flag
								this.couponFlag = false; //优惠Flag
								this.questionFlag = true; //题库Flag
								this.collectionFlag = false; //收藏Flag
								this.courseFlag = false; //课程Flag
								this.dataFlag = false; //个人Flag
								if(this.questionFlag) {
									this.getquestionTypeId();
									this.questionDefault('question',1);//默认我的题库是我的错题
									this.getQuestionType();
									
								}
								setTimeout(function() {
									
									//questionsSwiper();
								}, 300)
								//mbquestionsSwiper.update(true); //更新题库swiper
								break;
							case "kc04": //优惠券面板
								this.orderFlag = false; //显示订单Flag
								this.messageFlag = false; //消息Flag
								this.invitationFlag = false; //邀请Flag
								this.couponFlag = true; //优惠Flag
								this.questionFlag = false; //题库Flag
								this.collectionFlag = false; //收藏Flag
								this.courseFlag = false; //课程Flag
								this.dataFlag = false; //个人Flag
								if(this.couponFlag) {
									this.couponDefault();
								}
								break;
							case "kc05": //邀请码面板
								this.orderFlag = false; //显示订单Flag
								this.messageFlag = false; //消息Flag
								this.invitationFlag = true; //邀请Flag
								this.couponFlag = false; //优惠Flag
								this.questionFlag = false; //题库Flag
								this.collectionFlag = false; //收藏Flag
								this.courseFlag = false; //课程Flag
								this.dataFlag = false; //个人Flag
								this.myInvite();
								setTimeout(function() {
									_this.baiduShare();
									invitationSwiper();
								}, 300);
								//window.mbinvitationSwiper.update(true); //更新邀请swiper
								break;
							case "kc06": //消息面板
								this.orderFlag = false; //显示订单Flag
								this.messageFlag = true; //消息Flag
								this.invitationFlag = false; //邀请Flag
								this.couponFlag = false; //优惠Flag
								this.questionFlag = false; //题库Flag
								this.collectionFlag = false; //收藏Flag
								this.courseFlag = false; //课程Flag
								this.dataFlag = false; //个人Flag
								break;
							case "kc07": //订单面板
								this.orderFlag = true; //显示订单Flag
								this.messageFlag = false; //消息Flag
								this.invitationFlag = false; //邀请Flag
								this.couponFlag = false; //优惠Flag
								this.questionFlag = false; //题库Flag
								this.collectionFlag = false; //收藏Flag
								this.courseFlag = false; //课程Flag
								this.dataFlag = false; //个人Flag
								//mborderSwiper.update(true); //更新订单swiper
								
								_this.pageIndex = 1;
								if(this.orderFlag) {
									this.getAllOrder();
								}
								
								break;
							case "kc08": //我的资料
								this.orderFlag = false; //显示订单Flag
								this.messageFlag = false; //消息Flag
								this.invitationFlag = false; //邀请Flag
								this.couponFlag = false; //优惠Flag
								this.questionFlag = false; //题库Flag
								this.collectionFlag = false; //收藏Flag
								this.courseFlag = false; //课程Flag
								this.dataFlag = true; //个人Flag
								if(this.dataFlag) {
									this.getAvarList();
								}
								
								break;
							default:
								console.log("error");
								break;
						}
					},
					toggleLeftMenu: function() { //左侧列表点击
						var _this = this;
						$(".dycmemberleft-wrap").off("click", ".jmblistChange")
						$(".dycmemberleft-wrap").on("click", ".jmblistChange", function(e) {
							var $obj = $(e.target);
							if($obj.hasClass("active")) return;
							$(".jmblistChange.active").removeClass("active");
							$obj.addClass("active");
							_this.toggleRightContent($obj.data("show")); //对应展开右侧内容
						});
					},
					invitationCopy: function() { //邀请复制
						$("#jinvitationLink").select();
						layer.msg("请按 Ctrl + C 复制");
					},

					baiduShare: function() { //百度分享
						//分享
						window._bd_share_config = {
							common: {
								"bdSnsKey": {},
								"bdMini": "2",
								"bdStyle": "0",
								"bdSize": "16",
								"bdText": this.invitationContent,
								"bdDesc": this.invitationContentVC,
								"bdUrl": this.invitationContentURL,
								"bdPic": ROUTEROOT+'ycedu/images/weixin.png'
							},
							share: [{
								"bdSize": 16
							}],
							/*slide: [{
								bdImg: 0,
								bdPos: "right",
								bdTop: 100
							}],
							selectShare: [{
								"bdselectMiniList": ['qzone', 'tqq', 'kaixin001', 'bdxc', 'tqf']
							}]*/
						};
						with(document) 0[(getElementsByTagName('head')[0] || body).appendChild(createElement('script')).src = 'http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion=' + ~(-new Date() / 36e5)];
					},
					//个人资料初始化-时间
					ECalendarisOpen: function(obj) {
						if(obj.length > 0) {
							obj.ECalendar({
								type: "time", //模式，time: 带时间选择; date: 不带时间选择;
								stamp: false, //是否转成时间戳，默认true;
								offset: [0, 2], //弹框手动偏移量;
								format: "yyyy-mm-dd", //时间格式 默认 yyyy-mm-dd hh:ii;
								//skin: 3, //皮肤颜色，默认随机，可选值：0-8,或者直接标注颜色值;
								step: 10, //选择时间分钟的精确度;
								callback: function(v, e) {} //回调函数
							});
						}
					},

					myData: function() { //我的资料
						var _this = this;
						$(".dycdata-open-btn").off("click");
						$(".dycdata-open-btn").on("click", function() {
							_this.ECalendarisOpen($("#ECalendar_date"));
							var $dycdataObj = $(this).parents(".dycdata-box-li").find(".dycdata-li-body"),
								$that = $(this);
							$dycdataObj.slideToggle(function() {
								if($dycdataObj.is(":visible")) {
									$that.text("收起");
									
								} else {
									$that.text("编辑");
									
								}
							});
						});
					},
					getObjectURL: function(file) { //头像预览
						var url = null;
						if(window.createObjectURL != undefined) { // basic
							url = window.createObjectURL(file);
						} else if(window.URL != undefined) { // mozilla(firefox)
							url = window.URL.createObjectURL(file);
						} else if(window.webkitURL != undefined) { // webkit or chrome
							url = window.webkitURL.createObjectURL(file);
						}
						return url;
					},
					getAvarList:function(){//获取默认头像
						var _this = this;
						_this.$http.post(ROUTE + "Member.ashx?action=listMemberIcon",{},{
							emulateJSON: true
						}).then(function(res){
							_this.avarArr = res.body;
							
						}).then(function(){
							$('.dycavatar .dycavataimg').click(function(){
								$(this).siblings().removeClass('active');
								$(this).addClass('active');
							})
						});
					},
					onFileChange: function(e) { //头像选择
						var _this = this;
						$(e.target).change(function() {
							_this.dataChange = true;
							var objUrl = _this.getObjectURL(this.files[0]);
							//console.log("objUrl = " + objUrl);
							if(objUrl) {
								$("#jpreIcon").attr("src", objUrl);
							}
						});
					},

					uploadIcon: function() { //上传头像
						var _this = this;
						if(_this.dataChange){
							var data = new FormData($('#juploadIma')[0]);
						data.append("memberId", $mid);
						
							this.$http.post(ROUTE + "Member.ashx?action=updateMemberIcon", data, {
							emulateJSON: true
						}).then(function(res) {
							/*console.log(res)*/
							if(res.body == '816') {
								layer.msg("上传文件失败，请重新上传");
								return false;
							} else {
								layer.msg("上传头像成功！");
								$('.dycpersonlogo a').css('background-image','url('+'"'+ROUTEFILE+res.body.iconPath+'"'+')');
								localStorage.setItem("mUserIcon", res.body.iconPath);
							}
							})
						_this.dataChange = false;
						}else{
							layer.msg("您还未选择新文件~");
						}
						
						
					},
					
					uploadIconDefault: function() { //上传默认头像
						if($('.dycavatar .active').find('img').attr('data-src') == undefined){
							alert('请选择图片~')
						}else{
							this.$http.post(ROUTE + "Member.ashx?action=updateMemberListIconPath", 
						{
							"memberId": $mid,
							"iconPath":$('.dycavatar .active').find('img').attr('data-src')
						}, {
							emulateJSON: true
						}).then(function(res) {
							if(res.body == '816') {
								layer.msg("上传文件失败，请重新上传");
								return false;
							} else {
								layer.msg("上传头像成功！");
								$('.dycpersonlogo a').css('background-image','url('+$('.dycavatar .active').find('img').attr('src')+')');
								$('#jpreIcon').attr('src',$('.dycavatar .active').find('img').attr('src'));
								localStorage.setItem("mUserIcon", $('.dycavatar .active').find('img').attr('data-src'));
							}
						})
						}
					},

					updateNick: function() { //更新昵称
						if($("#dycdata-new-nice").val()==''){
							layer.msg("昵称不能为空~");
						}else{
							this.$http.post(ROUTE + "Member.ashx?action=updateNickName", {
							memberId: $mid,
							nickName: $("#dycdata-new-nice").val()
						}, {
							emulateJSON: true
						}).then(function(res) {
							if(res.body == '200'){
								layer.msg("昵称修改成功！");
								$mNickName = localStorage.setItem("mNickName",$("#dycdata-new-nice").val());
								$('#jhadLogined').html($("#dycdata-new-nice").val());
								$('.dycpersonName').html($("#dycdata-new-nice").val());
								$('.dycdata-current-nice').html($("#dycdata-new-nice").val());
								$("#dycdata-new-nice").val('');
								
							}
							
						})
						}
						
					},

					updatePersonInf: function() { //更新个人

						this.$http.post(ROUTE + "Member.ashx?action=updatePersonalData", {
							memberId: $mid,
							name: $("#dycdata-real-name").val(),
							province: $("#dycdata-address select:first-child").val(),
							city: $("#dycdata-address select:nth-child(2)").val(),
							district: $("#dycdata-address select:last-child").val(),
							sex: $("input[name='gender']:checked").val(),
							birthDay: $("#ECalendar_date").val(),
							note: $("#dycdata-intro").val(),
							email: $("#dycdata-email").val()
						}, {
							emulateJSON: true
						}).then(function(res) {
							if(res.body == '200'){
							layer.msg("个人资料更新成功！")
							}
						})
					},
					updateDeliveryAddress: function() { //更新收货地址
						this.$http.post(ROUTE + "Member.ashx?action=updateDeliveryAddress", {
							memberId: $mid,
							consignee: $("#dycrec-name").val(),
							province: $("#dycrec-address select:first-child").val(),
							city: $("#dycrec-address select:nth-child(2)").val(),
							district: $("#dycrec-address select:last-child").val(),
							consigneeAddr: $("#dycrec-detail-addr").val(),
							zipCode: $("#dycemail-code").val(),
							mobile: $("#dycdate-phone").val(),
							defult: $("#dycset-default").val(),

						}, {
							emulateJSON: true
						}).then(function(res) {
							if(res.body == '200'){
							layer.msg("收货地址更新成功！")
							}
						})
					},

					oldMobileVc: function() { //原手机验证码
						this.$http.post(ROUTE + "Member.ashx?action=getMobAlterValidCode", {
							memberId: $mid,
							name: this.userArr.mobile,
							codeKey:this.codeKey2,
							codeValue:$("#imgaVCUpdate2").val()
						}, {
							emulateJSON: true
						}).then(function(res) {
							if(res.body == "810" || res.body == 810){
								layer.msg("图形验证码错误");
								return false;
							}
							if(res.body == "815" || res.body == 815){
								layer.msg("请勿重复请求验证码");
								return false;
							}
							layer.msg("验证码已发送请注意查收");
						})
					},

					newMobileVc: function() { //新手机验证码
						this.$http.post(ROUTE + "Member.ashx?action=getNewMobValidCode", {
							memberId: $mid,
							name: $("#dycnew-phone").val(),
							codeKey:this.codeKey3,
							codeValue:$("#imgaVCUpdate3").val()
						}, {
							emulateJSON: true
						}).then(function(res) {
							if(res.body == "810" || res.body == 810){
								layer.msg("图形验证码错误");
								return false;
							}
							if(res.body == "815" || res.body == 815){
								layer.msg("请勿重复请求验证码");
								return false;
							}
							layer.msg("新手机号验证码已发送请注意查收");
						})
					},

					updateMobile: function() { //更新手机号码
						this.$http.post(ROUTE + "Member.ashx?action=updateMemberMobile", {
							memberId: $mid,
							mobile: this.userArr.mobile,
							oldValidateCode: $("#dycver").val(),
							newMobile: $("#dycnew-phone").val(),
							newValidateCode: $("#dycnew-vercode").val(),
						}, {
							emulateJSON: true
						}).then(function(res) {
							if(res.body == "805") {
								layer.msg("验证码错误！");
								return false;
							}
							layer.msg("新手机号更新成功！");
						})
					},
					getImageVC: function(){
						this.$http.post(ROUTE + "Member.ashx?action=GetVerifyCode", {
						}, {
							emulateJSON: true
						}).then(function(res) {
							this.codeKey = res.body[0].codeKey;
							this.codeImg = ROUTEFILE + res.body[0].codeImg;
						})
					},
					getImageVC2: function(){
						this.$http.post(ROUTE + "Member.ashx?action=GetVerifyCode", {
						}, {
							emulateJSON: true
						}).then(function(res) {
							this.codeKey2 = res.body[0].codeKey;
							this.codeImg2 = ROUTEFILE + res.body[0].codeImg;
						})
					},
					getImageVC3: function(){
						this.$http.post(ROUTE + "Member.ashx?action=GetVerifyCode", {
						}, {
							emulateJSON: true
						}).then(function(res) {
							this.codeKey3 = res.body[0].codeKey;
							this.codeImg3 = ROUTEFILE + res.body[0].codeImg;
						})
					},
					executeVCFunc:function(){
						this.getImageVC2();
						this.getImageVC3();
					},
					
					changePWVc: function() { //更新密码验证码
						if($("#imgaVCUpdate").val() == ""){
							layer.msg("验证码不能为空！");
							return false;
						}
						this.$http.post(ROUTE + "Member.ashx?action=getPwdAlterValidCode", {
							memberId: $mid,
							name: this.userArr.mobile,
							codeKey:this.codeKey,
							codeValue:$("#imgaVCUpdate").val()
							
						}, {
							emulateJSON: true
						}).then(function(res) {
							if(res.body == "810" || res.body == 810){
								layer.msg("图形验证码错误");
								return false;
							}
							if(res.body == "815" || res.body == 815){
								layer.msg("请勿重复请求验证码");
								return false;
							}
							layer.msg("验证码已发送请注意查收");
						})
					},
					updatePassword: function() { //更新密码
						if($("#dycpwd").val() == null || $("#dycpwd").val() == undefined || $("#dycpwd").val() == "") {
							layer.msg("原密码不能为空！");
							return false;
						}
						if($("#dycpwdver").val() == null || $("#dycpwdver").val() == undefined || $("#dycpwdver").val() == "") {
							layer.msg("验证码不能为空！");
							return false;
						}
						if($("#dycnewpwd").val() == null || $("#dycnewpwd").val() == undefined || $("#dycnewpwd").val() == "") {
							layer.msg("新密码不能为空！");
							return false;
						}

						if($("#dycnewpwd").val() != $("#dycnewpwd-again").val()) {
							layer.msg("两次密码不一致！");
							return false;
						}

						this.$http.post(ROUTE + "Member.ashx?action=updateMemberPassword", {
							memberId: $mid,
							mobile: this.userArr.mobile,
							oldPassword: $("#dycpwd").val(),
							validCode: $("#dycpwdver").val(),
							newPassword: $("#dycnewpwd").val(),
							againPassword: $("#dycnewpwd-again").val()
						}, {
							emulateJSON: true
						}).then(function(res) {
							if(res.body == "804") {
								layer.msg("密码错误！");
								return false;
							}
							if(res.body == "805") {
								layer.msg("验证码错误！");
								return false;
							} else {
								layer.msg("密码更新成功！");
							}

						})
					},
					toggleNewsList: function() { //toggle 订单切换
						var _this = this;
						$("#jtabOrder").off("click", "li");
						$("#jtabOrder").on("click", "li", function(e) {
							var obj = $(this).data("id");
							_this.typeId = obj;
							_this.tabOrder(obj, 0);
							_this.current = 1;

						});
					},
					deleteOrder: function(obj) { //代付款点击删除订单
						var _this = this;
						var type = "";
						$("#jorder").off("click", ".dycorder-delete");
						$("#jorder").on("click", ".dycorder-delete", function(e) {
//							var index = $('#jorder .swiper-slide-active').find('.active a').html();
							var box = $(this).parents('.dycorderli-box');
							var currentCount = box.parent().children(".dycorderli-box").length;
							console.log(currentCount);
							_this.$http.post(ROUTE + "Order.ashx?action=deleteOrder", { //删除订单
								memberId: $mid,
								orderId: $(this).data("number"),
								orderType: obj
							}, {
								emulateJSON: true
							}).then(function(res) {

								if(200 == res.body) {
									layer.msg("删除成功！");
									box.remove();
									if(--currentCount == 0){
										_this.tabOrder(_this.orderType, 1);
									}
								} else if(822 == res.body) {
									layer.msg("已购买，不允许删除！");
								} else if(820 == res.body) {
									layer.msg("删除失败！");
									return false;
								} else {
									return false;
								}
							});

						});
					},
					goto: function(index) { //我的订单枫叶处理

						if(index == this.current) return;
						if(index > this.allpage) {
							this.current = this.current - 2;
							layer.msg("Sorry ╮(╯_╰)╭ 没有下一页喽！");
							return false;
						}
						this.current = index;
						if(this.courseFlag){
							this.tabCourse(index);
						}else if(this.orderFlag){
							if((this.typeId == 1) || (this.typeId == 2)) {
								this.tabOrder(this.typeId, index);
							} else {
								this.getAllOrder(this.typeId, index);
							}
							$.scrollTo(280, 0);
						}
					},
					questionGoto:function(index){//我的题库枫叶处理
						if(index == this.current) return;
						if(index > this.allpage) {
							this.current = this.current - 2;
							layer.msg("Sorry ╮(╯_╰)╭ 没有下一页喽！");
							return false;
						}
						this.current = index;
						this.questionDefault(this.courseTypeId,index);
						$.scrollTo(280, 0);
					},
					couponGoto: function(index) { //我的优惠券枫叶处理

						if(index == this.current) return;
						if(index > this.allpage) {
							this.current = this.current - 2;
							layer.msg("Sorry ╮(╯_╰)╭ 没有下一页喽！");
							return false;
						}
						this.current = index;
						this.couponDefault(index);
						$.scrollTo(280, 0);

					}

				}
			})
		}

	} else {
		window.location.href = "login.html";
		return false;
	}

})