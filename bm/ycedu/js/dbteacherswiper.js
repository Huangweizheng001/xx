//直播打赏-点击注册登录
$.jcostLiveLogin = function() {
	$('#jcostpalyLogin').click(function() { //登录
		$('.dyccostlivelogin').addClass('addon');
		
		$.loginshow(1);
	});
	$('#jcostregister').click(function() { //注册
		$('.dyccostlivelogin').addClass('addon');
		$.loginshow(2);
		
	});
	$('#jcostliveColse').click(function() {
		$('.dyccostlivelogin').removeClass('addon');
	});

	var prePage = window.document.location.href;
	var pathName = window.document.location.pathname;
	localStorage.setItem("prePage", prePage); //设置当前页为上一页
	localStorage.setItem("pathName", pathName); //设置当前页为上一页

	
	$.enterKey(); //enter事件

}
//直播页-打赏播放器
$.costliveplayId = function(id) {
	var $jcostminute = $('#jcostminute'),
		$jcostsecond = $('#jcostsecond');

	$.ajax({
		type: "GET",
		url: ROUTE + "Channel.ashx?action=getLiveAddrByChannelId",
		dataType: "JSON",
		data: {
			"channelId": 8
		},
		success: function(result) {
			var src = result[0].rtmpUrl;
			
			var ht = $('.dyccostplay-box').height() - $('.dyccostplay-title').height() - $('.dycdbcost-tab-wrap').height()-25;

			var player = new prismplayer({
				id: "jcostPlayer", // 容器id
				source: src, // 视频地址src
				autoplay: true, //自动播放：否
				isLive: true,
				width: "100%", // 播放器宽度
				playauth: '',
				height: ht + 'px', // 播放器高度630px
			});

		},
		error: function(err) {
			console.log(err);
		}
	});
};

//打赏直播-排行榜切换
function costlisttab() {
	var oTabolds = $('#jcostlisttab div');
	//热门直播
	oTabolds.each(function(index) {
		$(this).mouseover(function() {
			var dataId = $(this).attr("data-id");
			oTabolds.removeClass('active');
			$(this).addClass('active');
			$.clistCon(dataId);
		})
	});
}


//打赏直播-排行版内容
$.clistCon = function(id) {
	var $jclistCon = $("#jcostlistcon"),
		$htmlStrmid = "",
		$htmlStr = "";
	if(id == 0) {
		$.ajax({
			type: "GET",
			url: ROUTE + "MemberReward.ashx?action=getContributionList",
			dataType: "json",
			data: {
				"pageSize": 10,
				"pageIndex": 1
			},
			success: function(result) {
				if(result.rows.length == 0) {
					return false;
				}
				result.rows.forEach(function(value, index) {
					$htmlStrmid = "<span class='dycbackcrown'></span><span class='dyccostrank-username' style='background:url(" + ROUTEFILE + value.gradeIconPath + ");background-repeat:no-repeat;'>" + value.objectName + "</span><span class='dyccostrank-content'><img src=" + ROUTEFILE + value.iconPath + " />" + value.rewardCount + "</span>";
					if(index == 0) {
						$htmlStr += "<div class='dyccostrank-list dyccostrank-list-first clearfix'>" + $htmlStrmid + "</div>";
					} else if(index == 1) {
						$htmlStr += "<div class='dyccostrank-list dyccostrank-list-second clearfix'>" + $htmlStrmid + "</div>";
					} else if(index == 2) {
						$htmlStr += "<div class='dyccostrank-list dyccostrank-list-third clearfix'>" + $htmlStrmid + "</div>";
					} else {
						$htmlStr += "<div class='dyccostrank-list clearfix'>" + $htmlStrmid + "</div>";
					}

				});
				$jclistCon.html($htmlStr);
			},
			error: function(err) {
				console.log(err);
			}
		});
	} else {
		$.ajax({
			type: "GET",
			url: ROUTE + "MemberReward.ashx?action=getRankingList",
			dataType: "json",
			data: {
				"rankType": id,
				"pageSize": 10,
				"pageIndex": 1
			},
			success: function(result) {
				if(result.rows.length == 0) {
					return false;
				}

				result.rows.forEach(function(value, index) {
					$htmlStrmid = "<span class='dycbackcrown'></span><span class='dyccostrank-username'>" + value.objectName + "</span><span class='dyccostrank-content'><img src=" + ROUTEFILE + value.iconPath + " />" + value.rewardCount + "</span>";
					if(index == 0) {
						$htmlStr += "<div class='dyccostrank-list dyccostrank-list-bank dyccostrank-list-first clearfix'>" + $htmlStrmid + "</div>";
					} else if(index == 1) {
						$htmlStr += "<div class='dyccostrank-list dyccostrank-list-bank dyccostrank-list-second clearfix'>" + $htmlStrmid + "</div>";
					} else if(index == 2) {
						$htmlStr += "<div class='dyccostrank-list dyccostrank-list-bank dyccostrank-list-third clearfix'>" + $htmlStrmid + "</div>";
					} else {
						$htmlStr += "<div class='dyccostrank-list dyccostrank-list-bank clearfix'>" + $htmlStrmid + "</div>";
					}

				});

				$jclistCon.html($htmlStr);
			},
			error: function(err) {
				console.log(err);
			}
		});
	}
}


//打赏、充值选择
$.costSelect = function(paramId, channelProgramId) {
	costLogo(); //获取打赏图标
	costMenu(paramId, channelProgramId); //获取当前菜单
	if($mid != null && $mid != undefined && $mid != "") {

		$.jOver(); //获取当前播米币
	}

	$('#jrecharge').click(function() { //充值播米币
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

			$(this).attr('href', 'recharge.html?recharge=1&type=1');
			$(this).attr('target', '_blank');

		} else {
			layer.closeAll();
			$('.dyccostlivelogin').addClass('addon');
			$('form').css('display', 'none');
			$('#jloginForm').css('display', 'block');
			$('.dyccurrentreg-box').css('display', 'block');
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
			$('.dyccostlivelogin').addClass('addon');
			$('form').css('display', 'none');
			$('#jloginForm').css('display', 'block');
			$('.dyccurrentreg-box').css('display', 'block');
			
		}
	});

}

//打赏直播-打赏按钮
costBtn = function(id, num) {
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
				"channelProgramId": id,
				"objectType": $obType[1], //打赏给谁
				"objectId": $obType[0], //打赏给谁的id
				"reward": $rgoods[1],
				"rewardCount": num
			},
			success: function(result) {
				if(result.body = '200') {
					var userGrade = getLever(); //等级名称userGrade[0]，等级序号userGrade[1]
					$('#jover').text(parseFloat(over - $rgoods[1] * num));
					$mMoney = localStorage.setItem("mMoney", $('#jover').html());
					CHAT.cost($rgoods[3], $obType[2], num, userGrade[1]);

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



//全局会员等级变量
var Lever = new Array("普通", "白银", "黄金", "钻石", "专属一", "专属二", "专属三");

function getLever() {
	var str = new Array();
	$mLever = localStorage.getItem("mLever");
	switch($mLever) {
		case "普通会员":
			str[0] = Lever[0];
			str[1] = 0;
			break;
		case "白银会员":
			str[0] = Lever[1];
			str[1] = 1;
			break;
		case "黄金会员":
			str[0] = Lever[2];
			str[1] = 2;
			break;
		case "钻石会员":
			str[0] = Lever[3];
			str[1] = 3;
			break;
		case "专属会员(一对一)":
			str[0] = Lever[4];
			str[1] = 4;
			break;
		case "专属会员(二对一)":
			str[0] = Lever[5];
			str[1] = 5;
			break;
		case "专属会员(三对一)":
			str[0] = Lever[6];
			str[1] = 6;
			break;
		default:
			return false
	}
	return str;
}


//直播页-播放器
$.liveplayId = function(id) {

	$.ajax({
		type: "GET",
		url: ROUTE + "Channel.ashx?action=getLiveAddrByChannelId",
		dataType: "json",
		data: {
			"channelId": id
		},
		success: function(result) {
			var src = result[0].rtmpUrl;
			var ht = $('.w1200-player').height();
			var player = new prismplayer({
				id: "J_prismPlayer", // 容器id
				source: src, // 视频地址src
				autoplay: true, //自动播放：否
				isLive: true,
				width: "100%", // 播放器宽度
				isLive: true,
				height: ht + 'px', // 播放器高度630px
			});

			var clickDom = document.getElementById("J_clickToPlay");
			clickDom.addEventListener("click", function(e) {
				// 调用播放器的play方法
				palyer.paly();
			});

			var t;

			if(localStorage.getItem("time") != 't') { //如果时间被清空则从0开始，否则直接获取缓存time

				t = localStorage.getItem("time");
			} else {
				t = 0;
			}

			var ss = setInterval(function() {
				t++;
				localStorage.setItem("time", t); //设置观看时间time为"t";
				console.log(t)
				if(($mid == undefined) || ($mid == null) || ($mid == "")) {
					if(t >= 900) { //游客只能观看15min
						/*clearInterval(ss);*/
						player.pause();
						$('#jstop').css('display', 'block');
						$('#jstop a').click(function() {
							$(this).attr('href', '../login.html');
						});

					}
				} else {
					if(t >= 1800) { //普通会员只能观看30min
						player.pause();
						$('#jstop').css('display', 'block');
						$('#jstop a').html("普通会员只能观看30分钟~")
						$('#jstop a').click(function() {
							$(this).attr('href', 'recharge.html');
						});

					}
					
				}

			}, 1000);

		},
		error: function(err) {
			console.log(err);
		}
	});
};

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
			localStorage.setItem("mLever", result[0].memberlevel);
			localStorage.setItem("mMoney", result[0].sowingCoin);
			$jOver.html(result[0].sowingCoin);
			$jcostMemberImg.css('background-image', 'url(' + "'" + ROUTEFILE + $mUserIcon + "'" + ' )');
			$jcostMemberName.html($mNickName);
		},
		error: function(err) {
			console.log(err);
		}
	});
}

//打赏直播-菜单
costMenu = function(id, channelProgramId) {
	var $jcostMenu = $("#jcostmenu"),
		$jltImg = $('#jliveteacherimg'),
		$jlivecName = $('#jlivecname'),
		$jlivetName = $('#jlivetname'),
		$jcostPerson = $("#jcostperson"),
		$jguest=$('#jdbguest'),
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

					if((value.channelId == id) && (value.channelProgramId == channelProgramId)) {
						$jltImg.html("<a class='dyccostplay-image' href='guestindex.html?teacherId=" + value.teacherId + "' target='_blank'><img src='" + ROUTEFILE + value.iconPath + "' /></a>");
						$jlivecName.html("课程："+value.name);
						$jlivetName.html("<span class='dyccostplay-speaker-name'>嘉宾：" + value.teacherName + "</span></span>");
						$jguest.html("<a class='attention'></a><a class='homepage' href='guestindex.html?teacherId=" + value.teacherId + "' target='_blank'></a>")
						$jcostPerson.html("<a class='dyccostteacher' data-id=" + value.teacherId + " data-other='teacher' data-name='" + value.teacherName + "嘉宾'></a><a class='dyccostanchor' data-id=" + value.anchorId + " data-other='anchor' data-name='" + value.anchorName + "主播'></a>");
					}
				});

			}
			$jcostMenu.html($htmlStr);
			$('#jcostperson a').click(function() { //打赏
				$('#jcostperson a').removeClass('active');
				$(this).addClass('active');
				if($mid != null && $mid != undefined && $mid != "") {
					if(channelProgramId == "undefined") {
						alert('当前没有直播，不能打赏哦~')
					} else {
						var num = $('#jcostnum').text();
						if(num == 0) {
							alert('打赏数量不能为0哦~');
						} else {
							costBtn(channelProgramId, num);
						}
					}
				} else {
					$('.dyccostlivelogin').addClass('addon');
					$.loginshow(1); //弹出登录页面
					
					return false;
				}

			});
			
		},
		error: function(err) {
			console.log(err);
		}
	});
}


//在线直播-会员信息
$.courseBrief = function(id) {
	var $jcostMember = $("#jcostMember");
	$.ajax({
		type: "GET",
		url: ROUTE + "Channel.ashx?action=getLiveChannelProgram",
		dataType: "json",
		data: {
			"channelId": id
		},
		success: function(result) {

			$jcourseBrief.html(result[0].note);

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
					$htmlStr = "<div class='swiper-slide'><a class='dycgifts active' data-id=" + value.rewardGoodsId + " data-other=" + value.reward + " data-img='" + ROUTEFILE + value.iconPath + "' data-name='" + value.name + "' data-note='" + value.note + "'><img src='" + ROUTEFILE + value.iconPath + "'/></a></div>";
					$htmlBrief = "<div class='dyccost-brief-wrap-img span2'><img src=" + ROUTEFILE + value.iconPath + " /></div><p class='dyccost-brief-wrap-name'>" + value.name + "<span id='junivalent' data-id=" + value.reward + ">(" + value.reward + "播米币)</span></p><p>" + value.note + "</p>";
					$price = value.reward;
				} else {
					$htmlStr += "<div class='swiper-slide'><a class='dycgifts' data-id=" + value.rewardGoodsId + " data-other=" + value.reward + " data-img='" + ROUTEFILE + value.iconPath + "' data-name='" + value.name + "' data-note='" + value.note + "'><img src='" + ROUTEFILE + value.iconPath + "'/></a></div>";
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
//登录enter事件
$.enterKey = function() {
	//新增enter账号登录验证
	document.getElementById("jloginForm").onkeydown = function(e) {
		e = e || event;
		if(e.keyCode === 13) {
			$.pwdsubmit();

		}
	};
	//新增enter手机登录
	document.getElementById('jphoneLoginForm').onkeydown = function(e) {
		e = e || event;
		if(e.keyCode === 13) {
			$.phonesubmit();
		}
	};

	//新增enter手机登录
	document.getElementById('jregPwd').onkeydown = function(e) {
		e = e || event;
		if(e.keyCode === 13) {
			$.subRegForm();
		}
	};
}

				$('#jdbcosttab li').click(function() {
					$(this).addClass('active');
					$(this).siblings().removeClass('active');
					var type = $(this).attr('data-id');
					var cons = $('.dyccost-wrap');
					cons.css('display', 'none');
					$(cons[type]).css('display', 'block');
				});
				$('#jdbcosttab .assistant').click(function(){
					//助理专题
					window.open("assistant.html");
					
				})

				$('#jstudy li').click(function() {
					$(this).addClass('active');
					$(this).siblings().removeClass('active');
				});
				$('#jdbmenu a').click(function() {
					$(this).addClass('active');
					$(this).parent().siblings().children('a').removeClass('active');
				});
				$('.dyctop-menu li').hover(function() {
					$(this).find('.dbmenu').css('display', 'block');
				}, function() {
					$(this).find('.dbmenu').css('display', 'none');
				});
				$('#jreservation').click(function() {
					
					/*$('.dbcourse').('display','block');*/
					$('.dbcourse').toggle();
				});
				
				$('#jdbcourseclose').click(function(){
					setTimeout(function(){
						$('.dbcourse').css('display','none');
					},200)
					
				});
				
				
    var swiper = new Swiper('.dyccostranklist-container', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        autoplay: 5000
    });
    
    
