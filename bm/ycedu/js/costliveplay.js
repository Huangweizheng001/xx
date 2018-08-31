function serviceBtn(){
	
	BizQQWPA.addCustom({
				aty: '0',
				a: '1005',
				nameAccount: 4006430618,
				selector: 'jsvtn_phone'
			});
	/*		
	 * BizQQWPA.addCustom({
				aty: '0',
				a: '1005',
				nameAccount: 4006430618,
				selector: 'buy_service'
			});
			BizQQWPA.addCustom({
				aty: '0',
				a: '1005',
				nameAccount: 4006430618,
				selector: 'recharge_service'
			});
			BizQQWPA.addCustom({
				aty: '0',
				a: '1005',
				nameAccount: 4006430618,
				selector: 'listen_service'
			});
			BizQQWPA.addCustom({
				aty: '0',
				a: '1005',
				nameAccount: 4006430618,
				selector: 'vip_service'
			});
			BizQQWPA.addCustom({
				aty: '0',
				a: '1005',
				nameAccount: 4006430618,
				selector: 'sale_service'
			});
		BizQQWPA.addCustom({
				aty: '0',
				a: '1005',
				nameAccount: 4006430618,
				selector: 'dycwelfareBtn'
			});*/
}
serviceBtn();

var currentChannelId = 6, //6: 播米 ； 8: 叠报
	currentProgramId;
var username = "游客",
	userImg, userGrade,
	$mid = localStorage.getItem('mid'),
	$mNickName = localStorage.getItem('mNickName'),
	$mUserIcon = localStorage.getItem('mUserIcon');
	
	userImg = "../ycedu/images/grader.png";

function getMberType(){//获取getMberType
	$.ajax({
	type: "POST",
	url: ROUTE + "Channel.ashx?action=getMemberType",
	dataType: "json",
	cache: false,
	data: {
		channelId: currentChannelId,
		memberId: $mid
	},
	success: function(result) {
		localStorage.setItem("mUserType", result[0].memberType);
	}
});
}
getMberType();

//right swiper
	function rightSwiper() {
	
		var mySwiper = new Swiper('.bmliveRightSwiperContainer', {
			pagination: '.swiper-pagination',
			paginationClickable: true,
		});
	}
	rightSwiper();

//get ProgramId
function getprogramId() {//获取当前频道id和节目id
	var datee = new Date();
	var week = datee.getDay() - 1;
	var xinqi = new Array();
	xinqi[0] = '周一';
	xinqi[1] = '周二';
	xinqi[2] = '周三';
	xinqi[3] = '周四';
	xinqi[4] = '周五';
	xinqi[5] = '周六';
	xinqi[6] = '周日';
	$.ajax({
		type: "GET",
		url: ROUTE + "ChannelProgram.ashx?action=getCurrLiveChannelProgram",
		dataType: "json",
		data: {},
		async: false,
		success: function(result) {
			result.forEach(function(value, index) {
				if(value.channelId == 6) {
					if(value.weekDay == xinqi[week]) { //当天才可以点击
						currentProgramId = value.channelProgramId;
					} else { //不是当天不能点击
						
					}

				}

			});

		},
		error: function(err) {
			console.log(err);
		}
	});
}
getprogramId();

function btnClick(){
	$("#content").emoji({
	button: "#jface",
	showTab: false,
	//animation: 'slide',
	icons: [{
		name: "QQ表情",
		path: "./images/face/qq/",
		maxNum: 90,
		excludeNums: [41, 45, 54],
		file: ".gif"
	}]
});


$("#jbrush").on("click", function() {
		$("#content").text($("#content").text());
	})

}
btnClick();


$('.dyccostservice-btn').hover(function() {
	$('.dyccostservice').css('display', 'block');
}, function() {
	$('.dyccostservice').css('display', 'none');
});

function costChat(){//聊天
	$.ajax({
	url: "http://ip.chinaz.com/getip.aspx",
	type: "get",
	dataType: 'jsonp',
	success: function(res) {
		window.CHAT.init(username, userImg, userGrade, res.address); //等级序号userGrade
	},
	error: function(res) {
		window.CHAT.init(username, userImg, userGrade); //等级序号userGrade
	}
});
$(".bmmessagePanel").mCustomScrollbar();
}
costChat();

$("#message").on("click", ".ycuserName", function(e) {
	$("#content").html($("#content").html() + "<span class='ycsendIcon'>@</span>" + $(this).context.innerText + "：");
})

$("#jmanageOpen").on("click", function() {
	//捕获页
	layer.open({
		type: 1,
		shade: false,
		title: false, //不显示标题
		content: $('#jmanageBox'), //捕获的元素，注意：最好该指定的元素要存放在body最外层，否则可能被其它的相对元素所影响
		cancel: function() {}
	});
})

$("#jmanageUser").on("change", function(e) {
	$("#content").html($("#content").html() + "<span class='ycsendIcon'>@</span>" + $(this).find("option:selected").val() + "：");
})

//直播打赏-点击注册登录
jcostLiveLogin = function() {
	//注册登录
	if($mid == null || $mid == undefined || $mid == "undefined" || $mid == "") {
		$('.bmliveRegisterBtn').css('display', 'block');
		$(".bmliveLoginBtn").on("click", function() {
			layer.open({
				type: 2,
				title: false,
				closeBtn: 1, //不显示关闭按钮
				shade: [0],
				shadeClose: true,
				maxmin: true, //开启最大化最小化按钮
				area: ['400px', '540px'],
				content: '../login.html?pageType=live'
			});
		})
	} else {
		$(".bmliveLoginBtn").html("<span></span>退出");
		$('.bmliveRegisterBtn').css('display', 'none');
		$(".bmliveLoginBtn").on("click", function() {
			$.liveQuitLogin();
		})
	}

	$(".bmliveRegisterBtn").on("click", function() {
		layer.open({
			type: 2,
			title: false,
			closeBtn: 1, //不显示关闭按钮
			shade: [0],
			shadeClose: true,
			maxmin: true, //开启最大化最小化按钮
			area: ['400px', '540px'],
			content: '../login.html?login=2&pageType=live'
		});
	})

}
jcostLiveLogin(); //直播打赏-点击注册登录

//get live source from channelId
function getLiveSource() {
	$.ajax({
		type: "get",
		url: ROUTE + "Channel.ashx?action=getLiveAddrByChannelId",
		dataType: 'json',
		data: {
			channelId: currentChannelId //pay attention to channelId
		},
		timeout: 600,
		success: function(res) {
			if(res.length < 1) {
				return false;
			}
			createPlayer(res[0].rtmpUrl, $("#jplayerHeight").height());
		},
		error: function() {
			console.log("request error");
		}
	});
}
getLiveSource();

//create player
function createPlayer(URL, playerHeight) {
	if(flashChecker().f == 0) {
		$("#dbLivePlayer").before('<a href="http://get.adobe.com/cn/flashplayer/" target="_blank" class="noFlashTips">检查到您的系统未安装Flash,请先安装</a>');
	}
	var dbLivePlayer = new Aliplayer({
		id: "jcostPlayer", // 容器id
		//source:"rtmp://live.hkstv.hk.lxdns.com/live/hks",
		//source: "http://live.bmizx.net/yicelive/streamyice.flv", // 视频地址
		//source: 'http://devimages.apple.com/iphone/samples/bipbop/bipbopall.m3u8',
		//source: 'http://cloud.video.taobao.com/play/u/2554695624/p/1/e/6/t/1/fv/102/28552077.mp4',
		source: URL,
		autoplay: true, //自动播放：否
		width: "100%", // 播放器宽度
		height: playerHeight + 'px', // 播放器高度
		playsinline: true,
		//preload: true,
		isLive: true,
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
			}]
		}],

		cover: './ycedu/images/public/playBgIcon.jpg'
		//cover: 'http://liveroom-img.oss-cn-qingdao.aliyuncs.com/logo.png'
	});

	$(window).resize(function() {
		dbLivePlayer.setPlayerSize("100%", $("#jplayerHeight").height() + 'px');
	});

	dbLivePlayer.on('ended', function() {
		$("#jcostPlayer").addClass("active");
	});

	dbLivePlayer.on('ready', function() {
		$("#jcostPlayer").removeClass("active");
	});

	dbLivePlayer.on('play', function() {
		$("#jcostPlayer").removeClass("active");
	});

	dbLivePlayer.on('waiting', function() {
		$("#jcostPlayer").addClass("active");
	});

}

//打赏直播-打赏按钮
costBtn = function(id,num) {
	var oTabolds = $('#jcostlogo .dycgifts');
	var oPersons = $('#jcostperson a');
	var $jcostSelect = $('#jcostselect'),
		$htmlStr = "",
		$obType = tab(oPersons),
		$rgoods = tab(oTabolds);
	var over = $('#jover').text();
	if(over >= $rgoods[1] * num) {
		//余额充足，可以打赏
		$.ajax({
			type: "GET",
			url: ROUTE + "MemberReward.ashx?action=memberReward",
			dataType: "json",
			data: {
				"memberId": $mid,
				"rewardGoodsId": $rgoods[0], //打赏物品
				"channelId": currentChannelId,
				"channelProgramId": id,
				"objectType": $obType[1], //打赏给谁
				"objectId": $obType[0], //打赏给谁的id
				"reward": $rgoods[1],
				"rewardCount": num
			},
			success: function(result) {
				if(result.body = '200') {
					$('#jover').text(parseFloat(over - $rgoods[1] * num));
					$mMoney = localStorage.setItem("mMoney", $('#jover').html());
					CHAT.cost($rgoods[3], $obType[2], num, userGrade);
					layer.msg("谢主隆恩!");

				} else {
					alert('服务器出错啦~');
				}
			},
			error: function(err) {
				console.log(err);
			}
		});
	} else {
		alert('播米币余额不足，请前去充值~');
		return false;
	}
}

//打赏直播-播米币余额
$.jOver = function() {
	var $jcostMemberImg = $('#jcostMemberImg'),
		$jcostMemberName = $('#jcostMemberName'),
		$jOver = $('#jover'),
		$htmlStr = "";
	$.ajax({
		type: "get",
		url: ROUTE + "Member.ashx?action=getSowingCoinByMemberId",
		dataType: "json",
		data: {
			"memberId": $mid
		},
		success: function(result) {
			if(result.length < 1){
				console.log('数据出错');
				return false;
			}
			userGrade = result[0].level - 1;
			username = result[0].nickName;
			localStorage.setItem("mLever", result[0].memberlevel);
			localStorage.setItem("mMoney", result[0].sowingCoin);
			$jOver.html(result[0].sowingCoin);
			if($mUserIcon == "") {
				$mUserIcon = 'images/youke.png';
			} else {
				$mUserIcon = ROUTEFILE + $mUserIcon;
			}
			$jcostMemberImg.css('background-image', 'url(' + "'" + $mUserIcon + "'" + ' )');
			$jcostMemberName.html(result[0].nickName);
		},
		error: function(err) {
			console.log(err);
		}
	});
}

//打赏直播-打赏按钮
costMenu = function(id, currentProgramId) {
	var $jcostMenu = $("#jcostmenu"),
		$jltImg = $('#jliveteacherimg'),
		$jlivecName = $('#jlivecname'),
		$jlivetName = $('#jlivetname'),
		$jcostPerson = $("#jcostperson"),
		$nhtmlStr = "",
		$htmlStr = "";

	var arr = new Array();
	$.ajax({
		type: "GET",
		url: ROUTE + "ChannelProgram.ashx?action=getCurrLiveChannelProgram",
		dataType: "json",
		data: {
			"channelId": id
		},
		success: function(result) {
			if(id != "undefined") {
				result.forEach(function(value, index) {
					$nhtmlStr = "<div class='dyccostprogram-title'><p class='dyccostprogram-name'>" + value.name + "</p><p class='dyccostprogram-time'>" + value.playTime + "</p></div><div class='dyccostprogram-teacher'>" + value.teacherName + "</div>";
					if((value.channelId == id) && (value.channelProgramId == currentProgramId)) {
						$jltImg.html("<a class='dyccostplay-image' href='guestindex.html?teacherId=" + value.teacherId + "'><img src='" + ROUTEFILE + value.iconPath + "' /></a>");
						$jlivecName.html(value.name);
						$jlivetName.html("<span class='dyccostplay-speaker-name'>主讲：" + value.teacherName + "</span> <span>人气：<span id='jpopular'></span></span>");
						$jcostPerson.html("<a class='dyccostteacher' data-id=" + value.teacherId + " data-other='teacher' data-name='" + value.teacherName + "嘉宾'>打赏嘉宾</a><a class='dyccostanchor' data-id=" + value.anchorId + " data-other='anchor' data-name='" + value.anchorName + "主播'>打赏主播</a>");
					}
				});

			}
			$jcostMenu.html($htmlStr);
			$('#jcostperson a').click(function() { //打赏
				$('#jcostperson a').removeClass('active');
				$(this).addClass('active');
				if($mid != null && $mid != undefined && $mid != "") {
					if(currentProgramId == "undefined") {
						alert('当前没有直播，不能打赏哦~')
					} else {
						var num = $('#jcostnum').text();
						if(num == 0) {
							alert('打赏数量不能为0哦~');
						} else {
							costBtn(currentProgramId, num);
						}
					}
				} else {
					layer.alert("非会员暂不支持打赏哦！");
					return false;
				}

			});

		},
		error: function(err) {
			console.log(err);
		}
	});
}

//打赏直播-打赏图标
costLogo = function(id) {
	var $jcostLogo = $("#jcostlogo"),
		$jcostBrief = $('#jcostBrief'),
		$htmlBrief = "",
		$price = "",
		$htmlStr = "";
	$.ajax({
		type: "GET",
		url: ROUTE + "RewardGoods.ashx?action=getRewardGoods",
		dataType: "json",
		data: {},
		success: function(result) {
			result.forEach(function(value, index) {
				if(index == 0) {
					$htmlStr = "<div class='swiper-slide'><a class='dycgifts active' data-id=" + value.rewardGoodsId + " data-other=" + value.reward + " data-img='" + ROUTEFILE + value.iconPath + "' data-name='" + value.name + "' data-note='" + value.note + "' title='" + value.name + "'><img src='" + ROUTEFILE + value.iconPath + "'/></a></div>";
					$htmlBrief = "<div class='dyccost-brief-wrap-img span2'><img src=" + ROUTEFILE + value.iconPath + " /></div><p class='dyccost-brief-wrap-name'>" + value.name + "<span id='junivalent' data-id=" + value.reward + ">(" + value.reward + "播米币)</span></p><p>" + value.note + "</p>";
					$price = value.reward;
				} else {
					$htmlStr += "<div class='swiper-slide'><a class='dycgifts' data-id=" + value.rewardGoodsId + " data-other=" + value.reward + " data-img='" + ROUTEFILE + value.iconPath + "' data-name='" + value.name + "' data-note='" + value.note + "' title='" + value.name + "'><img src='" + ROUTEFILE + value.iconPath + "'/></a></div>";
				}
			});
			$jcostLogo.html($htmlStr);
			costswiper(); //打赏

			$jcostBrief.html($htmlBrief); //默认为播米币
			$('#jprice').html($price); //默认播米币值

			var data = new Array();
			$('#jcostlogo .dycgifts').each(function() {
				$(this).click(function() {
					$('#jcostlogo .dycgifts').removeClass('active');
					$(this).addClass('active');
					data[0] = $(this).parent().find('.active').attr('data-name'); //名字
					data[1] = $(this).parent().find('.active').attr('data-other'); //价值
					data[2] = $(this).parent().find('.active').attr('data-img'); //图片地址
					data[3] = $(this).parent().find('.active').attr('data-note'); //图片描述

					$htmlBrief = "<div class='dyccost-brief-wrap-img span2'><img src=" + data[2] + " /></div><p class='dyccost-brief-wrap-name'>" + data[0] + "<span id='junivalent' data-id=" + data[1] + ">(" + data[1] + "播米币)</span></p><p>" + data[3] + "</p>";
					$jcostBrief.html($htmlBrief);
					var price = data[1] * ($('#jcostnum').text()); //计算价值总额
					$('#jprice').html(price); //播米币总价
				})

			});
			costNum(); //打赏数量

		},
		error: function(err) {
			console.log(err);
		}
	});
}

function costswiper() {
	var costliveSwiper = new Swiper('.dyccost-swiper', {
		spaceBetween: 10,
		slidesPerView: 10,
		loop: true,
		breakpoints: {
			1600: {
				slidesPerView: 8
			},
			1448: {
				slidesPerView: 7
			},
			1100: {
				slidesPerView: 6
			},
			1000: {
				slidesPerView: 5
			},
			800: {
				slidesPerView: 4
			}
		},

	});
	$('#swiper-button-prev').click(function() {
		costliveSwiper.slidePrev();
	});
	$('#swiper-button-next').click(function() {
		costliveSwiper.slideNext();
	});

}


costSelect = function(currentChannelId, currentProgramId) {
	costLogo(); //获取打赏图标
	costMenu(currentChannelId, currentProgramId); //打赏
	if($mid != null && $mid != undefined && $mid != "") {

		$.jOver(); //获取当前播米币
	}

	$('#jrecharge').click(function() { //充值播米币
		if($mid != null && $mid != undefined && $mid != "") {
			var t = 0;
			var ss = setInterval(function() { //点击充值后，10分钟内每3s刷新一次播米币余额
				$('#jover').html(localStorage.getItem('mMoney'));
				t++;

				if((t > 199) || (localStorage.getItem('mMoney') != $mMoney)) {
					clearInterval(ss);
				}
			}, 3000);

			$(this).attr('href', 'recharge.html?recharge=1&type=1');
			$(this).attr('target', '_blank');

		} else {
			layer.alert("非会员暂不支持充值哦！");

		}
	});
	$('#jrechargemember').click(function() { //充值会员
		if($mid != null && $mid != undefined && $mid != "") {
			var t = 0;
			var ss = setInterval(function() { //点击充值后，10分钟内每3s刷新一次播米币余额
				$('#jover').html(localStorage.getItem('mMoney'));
				t++;
				//console.log(localStorage.getItem('mMoney'))
				if((t > 199) || (localStorage.getItem('mMoney') != $mMoney)) {
					clearInterval(ss);
				}
			}, 3000);

			$(this).attr('href', 'recharge.html?recharge=0');
			$(this).attr('target', '_blank');

		} else {
			layer.open({
				type: 2,
				title: false,
				closeBtn: 1, //不显示关闭按钮
				shade: [0],
				shadeClose: true,
				maxmin: true, //开启最大化最小化按钮
				area: ['400px', '540px'],
				content: '../login.html?login=2&pageType=live'
			});
			/*	layer.alert("非会员暂不支持会员哦！");*/

		}
	});

}
costSelect(currentChannelId, currentProgramId); //打赏、充值


//获取打赏图标的选择值和老师选择值
function tab(obj) {
	var data = new Array();
	obj.each(function() {
		$(this).click(function() {
			obj.removeClass('active');
			$(this).addClass('active');
		})
	});
	data[0] = obj.parent().find('.active').attr('data-id');
	data[1] = obj.parent().find('.active').attr('data-other');
	data[2] = obj.parent().find('.active').attr('data-name'); //打赏给谁
	data[3] = obj.parent().find('.active').attr('data-img'); //打赏图片
	return data;
}

//获取打赏数量
function costNum() {
	$('#jadd').click(function() {
		var univalent = $('#junivalent').attr('data-id');
		var num = $('#jcostnum').text();

		if(num < 1000) {
			num++;
		} else {
			num = 1000;
		}
		var price = parseFloat(num * univalent).toFixed(1);
		$('#jcostnum').text(num);

		$('#jprice').html(price);
	})
	$('#jminus').click(function() {
		var univalent = $('#junivalent').attr('data-id');
		var num = $('#jcostnum').text();
		if(num > 1) {
			num--;
		} else {
			num = 1;
		}
		var price = num * univalent;
		$('#jcostnum').text(num);
		$('#jprice').html(price);
	});

}