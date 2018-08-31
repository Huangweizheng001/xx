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

//客服
$("#jsvtn_shop").click(function() {
	var num = $('.shops-num').text();
	num++;
	$('.shops-num').html(num);
})

//直播专题页
$.livestopicList = function(id) {
	var $jliveslist = $("#jlivestopiclist"),
		num=0,
		$btnStr="",
		$htmlStr = "";
	
	var datee = new Date();
	var week = datee.getDay();
	
	$.ajax({
		type: "GET",
		url: ROUTE + "Course.ashx?action=getLiveCoursePlayback",
		dataType: "json",
		data:{
			"pageIndex":1,
			"pageSize":5
		},
		success: function(result) {
			if(result.rows.length < 1){
				return false;
			}
			result.rows.forEach(function(value,index){
				switch(value.weekDay){
					case '周一':
						num = 1;
						break;
					case '周二':
						num = 2;
						break;
					case '周三':
						num = 3;
						break;
					case '周四':
						num = 4;
						break;
					case '周五':
						num = 5;
						break;
					default:
					    break;
				}
				if(num<week){//已播
					$btnStr = "<div class='dyclivestopic-box-btn'><a class='over-btn'>公开课已结束</a><a class='replay-btn' href='player.html?courseId="+value.courseId+"&videoId="+value.videoId+"&courseCatalogId="+value.courseCatalogId+"' target='_blank'>回看课程<i class='uk-icon-caret-right'></i></a></div>";
				}else if(num==week){//当天正在播
					$btnStr = "<div class='dyclivestopic-box-btn'><a class='now-btn' href='costliveplay.html?channelId="+value.channelId+"&channelProgramId="+value.channelProgramId+"' target='_blank'>进入公开课<i class='uk-icon-caret-right'></i></a></div>";
				}else if(num>week){//未播
					$btnStr = "<div class='dyclivestopic-box-btn'><a class='will-btn'>课程暂未开始</a></div>";	
				}
				
				$htmlStr += "<li class='dyclivestopic-box clearfix'><div class='span7 dyclivestopic-box-img'><img src='"+ROUTEFILE+value.iconPath+"' /><p>"+value.note+"</p></div><div class='span5 dyclivestopic-box-brief'><h3>"+value.teacherName+"的实战演练课程</h3><p>嘉 宾："+value.teacherName+"</p><p>主持人："+value.anchorName+"</p><p>时 段："+value.weekDay+' '+value.playBeginTime+'-'+value.playEndTime+"</p><p>课 程："+value.courseName+"</p>"+$btnStr+"</div></li>";
				
			});
			$jliveslist.html($htmlStr);
		},
		error: function(err) {
			console.log(err);
		}
	});
};

//直播选择页banner
$.lpsBannerFunc = function() {
	var $jlpsBanner = $("#lpsBanner"),
		$htmlStr = "";
	$.ajax({
		type: "GET",
		url: ROUTE + "Banner.ashx?action=getBanner&bannerType=live",
		dataType: "json",
		data: {},
		success: function(result) {
			result.forEach(function(value, index) {
				$htmlStr += "<div class='swiper-slide' style='background-image: url(" + ROUTEFILE + value.iconPath + ");'><a href=" + value.href + " target='_blank'></a></div>"
			})
			$jlpsBanner.html("");
			$jlpsBanner.html($htmlStr);
			indexSwiper(); //new swiper
		},
		error: function(err) {
			console.log(err);
		}
	});
};

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
				width: "100%", // 播放器宽度
				height: ht + 'px', // 播放器高度630px
				waterMark: ROUTEROOT + "ycedu/images/liveWaterIcon.png|BL|0.08|0.8"
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
					/*if(t >= 1800)&&($mid !='高级会员') { //游客只能观看15min
						player.pause();
						$('#jstop').css('display', 'block');
						$('#jstop a').html("普通会员只能观看30分钟~")
						$('#jstop a').click(function() {
							$(this).attr('href', 'recharge.html');
						});

					}*/
				}

			}, 1000);

		},
		error: function(err) {
			console.log(err);
		}
	});
};

//直播页-打赏播放器
$.costliveplayId = function(id, leftTime) {
	var $jcostminute = $('#jcostminute'),
		$jcostsecond = $('#jcostsecond'),
		leftTimes = "";

	$.ajax({
		type: "GET",
		url: ROUTE + "Channel.ashx?action=getLiveAddrByChannelId",
		dataType: "JSON",
		data: {
			"channelId": id
		},
		success: function(result) {
			var src = result[0].rtmpUrl;
			var ht = $('.dyccostplay-box').height() - $('.dyccostplay-title').height() - $('.dyccost-wrap').height() - 120;

			var player = new prismplayer({
				id: "jcostPlayer", // 容器id
				source: src, // 视频地址src
				autoplay: true, //自动播放：否
				width: "100%", // 播放器宽度
				playauth: '',
				height: ht + 'px', // 播放器高度630px
				waterMark: ROUTEROOT + "ycedu/images/liveWaterIcon.png|BL|0.08|0.8"
			});

			var t;

			function checkExpire() { //判断 是否过期
				var diffTimeStamp = parseInt(localStorage.getItem("costtime"));
				var timeout = 3600 * 24; //有效期为一天，一天过后清空缓存
				if(diffTimeStamp > timeout) { //过期
					localStorage.removeItem("costtime");
				}
				return;
			}
			checkExpire();

			if((localStorage.getItem("costtime") != null) && (localStorage.getItem("costtime") != undefined) && (localStorage.getItem("costtime") != "")) { //如果没有缓存值设置t为0，否则t获取当前的缓存时间
				t = localStorage.getItem("costtime");
			} else {
				t = 0;
			}
			leftTimes = leftTime; //30分钟00秒

			var ss = setInterval(function() {
				t++;
				var owntime = leftTimes - t;
				if(owntime > 0) {
					var minute = Math.floor(owntime / 60);
					var second = Math.floor(owntime % 60);

					var tenminute = Math.floor(minute / 10);
					var geminute = Math.floor(minute % 10);
					var tensecond = Math.floor(second / 10);
					var gesecond = Math.floor(second % 10);
					$jcostminute.html("<a>" + tenminute + "</a><a>" + geminute + "</a>");
					$jcostsecond.html("<a>" + tensecond + "</a><a>" + gesecond + "</a>");
				} else {
					owntime = 0;
				}
				localStorage.setItem("costtime", t); //设置观看时间time为"t";
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
					if($mLever == '普通会员') { //高于普通会员的，可免费看直播
						if(t >= 1800) { //普通会员只能观看30min
							player.pause();
							$('#jstop').css('display', 'block');
							$('#jstop a').html("普通会员只能观看30分钟~");
							$('#jstop a').click(function() {
								$(this).attr('href', 'recharge.html');
							});
							clearInterval(ss); //清除计时
						}
					} else {
						if(t > 1799) { //30min后不进行计时
							clearInterval(ss); //清除计时
						}
						$('.dyccosttime').css('display', 'none');
					}

				}

			}, 1000);

		},
		error: function(err) {
			console.log(err);
		}
	});
};

//直播页-讨论区
$.discussMent = function(id) {
	var $jdiscussment = $("#message"),
		$htmlStr = "";
	$.ajax({
		type: "GET",
		url: ROUTE + "ChannelEvaluation.ashx?action=getEvaluation",
		dataType: "json",
		data: {
			"channelId": 1
		},
		success: function(result) {
			result.forEach(function(value, index) {
				if(value.memberId == '0') {
					$htmlStr += "<div class='dycdiscuss-box'><div class='clearfix dycadmin'><div class='span2'><div class='dycdiscuss-img'><img src='images/costlive03.png'></div></div><div class='span10'><span class='dycplayname'>游客</span><div class='dycnormal'><i class='uk-icon-caret-left'></i><span class='dycplaycon span10'>" + value.evaluation + "</span></div></div></div></div>";
				} else {
					$htmlStr += "<div class='dycdiscuss-box'><div class='clearfix dycadmin'><div class='span2'><div class='dycdiscuss-img'><img src='" + ROUTEFILE + "'></div></div><div class='span10'><span class='dycplayname'>" + value.iconPath + "</span><div class='dycnormal'><i class='uk-icon-caret-left'></i><span class='dycplaycon span10'>" + value.evaluation + "</span></div></div></div></div>";
				}
			});
			$jdiscussment.html($htmlStr);
		},
		error: function(err) {
			console.log(err);
		}
	});
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

//视频课程banner
$.courseBanner = function() {
	var $jcourseBanner = $("#jcoursebanner"),
		$htmlStr = "";
	$.ajax({
		type: "GET",
		url: ROUTE + "Banner.ashx?action=getBanner&bannerType=course",
		dataType: "json",
		data: {},
		success: function(result) {
			result.forEach(function(value, index) {
				/*$htmlStr += "<div class='swiper-slide' style='background-image: url(" + ROUTEFILE + value.iconPath + ");'><a href=" + ROUTEROOT + value.href + " target='_blank'></a></div>"
			})*/
				$htmlStr += "<div class='swiper-slide' style='background-image: url(" + ROUTEFILE + value.iconPath + ");'><a href='#this'></a></div>"
			})
			$jcourseBanner.html("");
			$jcourseBanner.html($htmlStr);
			indexSwiper(); //new swiper
		},
		error: function(err) {
			console.log(err);
		}
	});
};

//直播选择页-热门课程Tab-swiper
function hotzbSwiper() {
	var hotzbSwiper = new Swiper('.dycgkcourse-container', {
		mousewheelControl: false,
		noSwiping: true,
		autoHeight: true,
		slidesPerView: 6,
		spaceBetween: 20,
	});
}

//打赏直播页-直播课程
function costliveSwiper(num) {
	var costliveSwiper = new Swiper('.dyccostprogram-container', {
		autoplay: 3000,
		loop: true,
		spaceBetween: 20,
		slidesPerView: num,
		prevButton: '.swiper-button-prev',
		nextButton: '.swiper-button-next',
	});
}

//直播选择页-热门Tab
/*$.dyzboTab = function(id) {
	var $jdyzboTab = $("#jliveselecttab"),
		$htmlStr = "";
	$.ajax({
		type: "GET",
		url: ROUTE + "Channel.ashx?action=getLiveChannel",
		dataType: "json",
		data: {},
		success: function(result) {
			console.log(result);
			$htmlStr = "<div class='swiper-slide active' data-id='1'>热门直播</div>";
			result.forEach(function(value, index) {
				$htmlStr += "<div class='swiper-slide' data-id=" + value.channelId + ">" + value.name + "</div>";
			});
			$jdyzboTab.html($htmlStr);
			gkcourseSwiper.update();
			lphotTab();
		},
		error: function(err) {
			console.log(err);
		}
	});
}*/

//直播选择
/*$.dyzboCon = function(id) {
	var $jdyzboCon = $("#jliveselectcon"),
	    $htmlStr = "";
	
	$.ajax({
		type: "GET",
		url: ROUTE + "Channel.ashx?action=getLiveChannel",
		dataType: "json",
		data: {
			courseTypeId: id
		},
		success: function(result) {
			
				$jdyzboCon.html($htmlStr);
		},
		error: function(err) {
			console.log(err);
		}
	});
}*/

//直播选择-往期Tab
$.dyzoldTab = function(id) {
	var $jdyzhotsTab = $("#jliveoldtab"),
		$htmlStr = "";
	$.ajax({
		type: "GET",
		url: ROUTE + "CourseType.ashx?action=getChannelCourseType",
		dataType: "json",
		data: {},
		success: function(result) {
			$htmlStr = "<div class='swiper-slide active' data-id=''>往期课程</div>";
			result.forEach(function(value, index) {
				$htmlStr += "<div class='swiper-slide' data-id=" + value.courseTypeId + ">" + value.name + "</div>";
			});
			$jdyzhotsTab.html($htmlStr);
			hotzbSwiper();
			/*hotzbSwiper.update();*/
			lpoldTab();
		},
		error: function(err) {
			console.log(err);
		}
	});
}

//直播选择-往期内容
$.dyzoldCon = function(id) {
	var $jdyzoldCon = $("#jliveoldcon"),
		$htmlStr = "";
	$.ajax({
		type: "GET",
		url: ROUTE + "Course.ashx?action=getLiveChannelCourse",
		dataType: "json",
		data: {
			courseTypeId: id
		},
		success: function(result) {
			result.forEach(function(value, index) {
				$htmlStr += "<li><a href='ycedu/player.html?courseId=" + value.courseId + "&videoId=' data-id=" + value.courseId + " target='_blank' title=" + value.name + "><img src='" + ROUTEFILE + value.iconPath + "'></a></li>";
			});
			$jdyzoldCon.html("<ul class='dycgklist'>" + $htmlStr + "</ul>");
		},
		error: function(err) {
			console.log(err);
		}
	});
}

//直播选择页点击热门直播发起数据请求
function lphotTab(channelId, channelProgramId) {
	var $jdyzboCon = $("#jliveselectcon"),
		$htmlStr = "";

	$.ajax({ //默认获取第一个-嘉宾做客
		type: "GET",
		url: ROUTE + "Banner.ashx?action=getBanner&bannerType=guest",
		dataType: "json",
		async: false,
		success: function(result) {
			if(result.length == 0) {
				return false
			}
			$htmlStr = "<a class='dyclpsg-wrap' href='ycedu/costliveplay.html?channelId=" + channelId + "&channelProgramId=" + channelProgramId + "' target='_blank' style='background-image:url(" + ROUTEFILE + result[0].iconPath + ")'></a>";
			$jdyzboCon.html($htmlStr);
		},
		error: function(err) {
			console.log(err);
		}
	});

	var oTabhs = $('#jliveselecttab .swiper-slide');
	//热门直播
	oTabhs.each(function(index) {
		$(this).click(function() {
			var dataId = $(this).attr("data-id");
			var $htmlStr = "";
			oTabhs.removeClass('active');
			$(this).addClass('active');
			//$.jSchedule(dataId); 切换的同时，右边菜单也切换
			//$.dyzboCon(dataId);
			switch(dataId) {
				case "1":
					$.ajax({ //嘉宾做客
						type: "GET",
						url: ROUTE + "Banner.ashx?action=getBanner&bannerType=guest",
						dataType: "json",
						async: false,
						success: function(result) {
							if(result.length == 0) {
								return false
							}
							$htmlStr = "<a class='dyclpsg-wrap' href='ycedu/costliveplay.html?channelId=" + channelId + "&channelProgramId=" + channelProgramId + "' target='_blank' style='background-image:url(" + ROUTEFILE + result[0].iconPath + ")'></a>";
						},
						error: function(err) {
							console.log(err);
						}
					});
					break;
				case "2":
					$.ajax({ //课程抢鲜
						type: "GET",
						url: ROUTE + "Banner.ashx?action=getBanner&bannerType=firstCourse",
						dataType: "json",
						async: false,
						success: function(result) {
							if(result.length == 0) {
								return false
							}
							$htmlStr = "<a class='dyclpsg-wrap' href='ycedu/costliveplay.html?channelId=" + channelId + "&channelProgramId=" + channelProgramId + "' target='_blank' style='background-image:url(" + ROUTEFILE + result[0].iconPath + ")'></a>";
						},
						error: function(err) {
							console.log(err);
						}
					});
					break;
				case "3":
					$.ajax({ //实时播报
						type: "GET",
						url: ROUTE + "Banner.ashx?action=getBanner&bannerType=broadcast",
						dataType: "json",
						async: false,
						success: function(result) {
							if(result.length == 0) {
								return false
							}
							$htmlStr = "<a class='dyclpsg-wrap' href='ycedu/costliveplay.html?channelId=" + channelId + "&channelProgramId=" + channelProgramId + "' target='_blank' style='background-image:url(" + ROUTEFILE + result[0].iconPath + ")'></a>";
						},
						error: function(err) {
							console.log(err);
						}
					});
					break;
				case "4":
					$.ajax({ //主播在线
						type: "GET",
						url: ROUTE + "Banner.ashx?action=getBanner&bannerType=anchorOnline",
						dataType: "json",
						async: false,
						success: function(result) {
							if(result.length == 0) {
								return false
							}
							$htmlStr = "<a class='dyclpsg-wrap' href='ycedu/costliveplay.html?channelId=" + channelId + "&channelProgramId=" + channelProgramId + "' target='_blank' style='background-image:url(" + ROUTEFILE + result[0].iconPath + ")'></a>";
						},
						error: function(err) {
							console.log(err);
						}
					});
					break;
				default:
					console.log("error");
					break;
			}
			$jdyzboCon.html($htmlStr);
			//$.liveMenu(dataId);
		})
	});
}

//直播选择页点击往期回顾发起数据请求
function lpoldTab() {
	var oTabolds = $('#jliveoldtab .swiper-slide');
	//热门直播
	oTabolds.each(function(index) {
		$(this).click(function() {
			var dataId = $(this).attr("data-id");
			oTabolds.removeClass('active');
			$(this).addClass('active');
			$.dyzoldCon(dataId);
		})
	});
}

//直播选择-直播菜单（20170819修改删除）
/*$.liveMenu = function(id) {
	var $jliveMenu = $("#jlivemenu"),
		$nhtmlStr = "",
		$htmlStr = "";
	var datee = new Date();
	var strHours = datee.getHours();
	var strSeconds = datee.getSeconds();
	var channelarr = new Array();

	var arr = new Array();
	$.ajax({
		type: "GET",
		url: ROUTE + "ChannelProgram.ashx?action=getCurrLiveChannelProgram",
		dataType: "json",
		data: {},
		async: false,
		success: function(result) {
			result.forEach(function(value, index) {
				var time = value.playTime.split("-");
				for(var i = 0; i < time.length; i++) {
					arr[i] = time[i].split(":");
				}
				var smallhour = arr[0][0];
				var smallhoursecond = arr[0][1];
				var bighour = arr[1][0];
				var bighoursecond = arr[1][1];
				if(id == 1) {
					$nhtmlStr = "<a class='dyclivemenu dyclivenow' href='ycedu/liveplay.html?channelId=" + value.channelId + "&channelProgramId=" + value.channelProgramId + "' target='_blank'><p class='dyclive-name'>" + value.name + "</p><p class='dyclive-time'>" + value.playTime + "</p><p class='dyclivemenu-btn'>直播</p></a>";
				} else {
					$nhtmlStr = "<a class='dyclivemenu dyclivenow' href='ycedu/costliveplay.html?channelId=" + value.channelId + "&channelProgramId=" + value.channelProgramId + "' target='_blank'><p class='dyclive-name'>" + value.name + "</p><p class='dyclive-time'>" + value.playTime + "</p><p class='dyclivemenu-btn'>直播</p></a>";
				}

				if(((strHours > smallhour) && (strHours < bighour)) || ((strHours == smallhour) && (strSeconds >= smallhoursecond)) || ((strHours == bighour) && (strSeconds <= bighoursecond))) {
					$htmlStr += $nhtmlStr;
					channelarr[0] = value.channelProgramId;
					channelarr[1] = value.channelId;
				} else {
					$htmlStr += "<a class='dyclivemenu'><p class='dyclive-name'>" + value.name + "</p><p class='dyclive-time'>" + value.playTime + "</p></a>";
				}

			});
			$jliveMenu.html($htmlStr);
		},
		error: function(err) {
			console.log(err);
		}
	});
	return channelarr;
}*/

$.jSchedule = function(id) {
	var $jliveMenu = $("#jSchedule"),
		$jScheduleLimit = $('#jScheduleLimit'),
		$nhtmlStr = "",
		$htmlStr = "";
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

	/*var channelarr = new Array();*/
	/*var arr = new Array();*/

	$.ajax({
		type: "GET",
		url: ROUTE + "Channel.ashx?action=getLiveChannelPeriod",
		dataType: "json",
		data: {},
		async: false,
		success: function(result) {
			if(result.length == 0) {
				return false
			}
			$jScheduleLimit.html('<span></span>排班有效期：' + result[0].dayBegin + ' 到 ' + result[0].dayEnd);
		},
		error: function(err) {
			console.log(err);
		}
	});

	$.ajax({
		type: "GET",
		url: ROUTE + "ChannelProgram.ashx?action=getCurrLiveChannelProgram",
		dataType: "json",
		data: {},
		async: false,
		success: function(result) {
			result.forEach(function(value, index) {
				switch(value.weekDay) {
					case '周一':
						$nhtmlStr = "<p class='dychotzb-schedule-left'>周一<span>MON</span></p>";
						break;
					case '周二':
						$nhtmlStr = "<p class='dychotzb-schedule-left'>周二<span>TUE</span></p>";
						break;
					case '周三':
						$nhtmlStr = "<p class='dychotzb-schedule-left'>周三<span>WED</span></p>";
						break;
					case '周四':
						$nhtmlStr = "<p class='dychotzb-schedule-left'>周四<span>THU</span></p>";
						break;
					case '周五':
						$nhtmlStr = "<p class='dychotzb-schedule-left'>周五<span>FRI</span></p>";
						break;
					default:
						console.log("error");
						break;
				}
				if(index < 5) {
					if(value.weekDay == xinqi[week]) { //当天才可以点击
						$htmlStr += "<a class='dychotzb-schedule-box active' href='ycedu/costliveplay.html?channelId=" + value.channelId + "&channelProgramId=" + value.channelProgramId + "' target='_blank'>" + $nhtmlStr + "<div class='dychotzb-schedule-right'><p class='time'><span></span>时间：" + value.playTime + "</p><p class='person'><span></span>特约嘉宾：<em>" + value.teacherName + "</em><em>" + value.anchorName + "</em></p></div></a>";
						lphotTab(value.channelId, value.channelProgramId);
						localStorage.setItem('channelId', value.channelId);
						localStorage.setItem('channelProgramId', value.channelProgramId);
					} else { //不是当天不能点击
						$htmlStr += "<a class='dychotzb-schedule-box'>" + $nhtmlStr + "<div class='dychotzb-schedule-right'><p class='time'><span></span>时间：" + value.playTime + "</p><p class='person'><span></span>特约嘉宾：<em>" + value.teacherName + "</em><em>" + value.anchorName + "</em></p></div></a>";
					}

				}

			});

			$jliveMenu.html($htmlStr);

		},
		error: function(err) {
			console.log(err);
		}
	});
	/*return channelarr;*/
}

//在线直播-直播源
$.courseBrief = function(id) {
	var $jcourseBrief = $("#jcoursebrief");
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

//在线直播-推荐课程
$.recommendCourse = function(id) {
	var $jrecommendCourse = $("#jrecommendcourse"),
		$htmlStr = "";
	$.ajax({
		type: "GET",
		url: ROUTE + "Course.ashx?action=getChannelRecommendCourse",
		dataType: "json",
		data: {
			"channelId": id
		},
		success: function(result) {
			result.forEach(function(value, index) {
				$htmlStr += "<li class='span4'><a class='dyccourse-list-box' href='coursedetail.html?courseId=" + value.courseId + "'><div class='dyccourse-list-img'><img src='" + ROUTEFILE + value.iconPath + "'></div><p class='dyccourse-list-title'>" + value.name + "</p><p class='dyccourse-list-brief'>" + value.note + "</p></a></li>";
			});
			$jrecommendCourse.html($htmlStr);
		},
		error: function(err) {
			console.log(err);
		}
	});
}

//在线直播-推荐老师
$.relatedTeacher = function(id) {
	var $jrelatedTeacher = $("#jrelatedteacher"),
		$htmlStr = "";
	$.ajax({
		type: "GET",
		url: ROUTE + "Teacher.ashx?action=getLiveRecommendTeacher",
		dataType: "json",
		data: {
			"channelId": id
		},
		success: function(result) {

			$htmlStr = "<a class='dycliveteacher' href='teacherdetail.html?teacherId=" + result[0].teacherId + "'><div class='dycliveteacher-img'><img src='" + ROUTEFILE + result[0].iconPath + "'></div><p class='dycliveteacher-name'>" + result[0].name + "</p><p class='dycliveteacher-brief'>" + result[0].note + "</p></a>";

			$jrelatedTeacher.html($htmlStr);
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
						$jltImg.html("<a class='dyccostplay-image' href='teacherdetail.html?teacherId=" + value.teacherId + "'><img src='" + ROUTEFILE + value.iconPath + "' /></a>");
						$jlivecName.html(value.name);
						$jlivetName.html("<span class='dyccostplay-speaker-name'>主讲：" + value.teacherName + "</span> <span>人气：<span id='jpopular'></span></span>");
						$jcostPerson.html("<a class='dyccostteacher' href='#this' data-id=" + value.teacherId + " data-other='teacher' data-name='" + value.teacherName + "嘉宾'>打赏嘉宾</a><a class='dyccostanchor' href='#this' data-id=" + value.anchorId + " data-other='anchor' data-name='" + value.anchorName + "主播'>打赏主播</a>");
					}
				});
				/*var popular = $('#jpopular').text();
				setInterval(function(){
					popular = parseInt(popular)+parseInt(Math.random()*10);
					$('#jpopular').text(popular);
				},5000);*/

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
					alert("您还未登录哦~");
					return false;
				}

			});
			/*var oPersons = $('#jcostperson a');
			tab(oPersons);*/
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

/*costMenu = function(id) {
	var $jcostMenu = $("#jcostmenu"),
		$jltImg = $('#jliveteacherimg'),
		$jlivecName = $('#jlivecname'),
		$jlivetName = $('#jlivetname'),
		$jcostPerson = $("#jcostperson"),
		$nhtmlStr = "",
		$htmlStr = "";

	var datee = new Date();
	var strHours = datee.getHours();
	var strSeconds = datee.getSeconds();

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
					var time = value.playTime.split("-");
					for(var i = 0; i < time.length; i++) {
						arr[i] = time[i].split(":");
					}
					var smallhour = arr[0][0];
					var smallhoursecond = arr[0][1];
					var bighour = arr[1][0];
					var bighoursecond = arr[1][1];

					$nhtmlStr = "<div class='dyccostprogram-title'><p class='dyccostprogram-name'>" + value.name + "</p><p class='dyccostprogram-time'>" + value.playTime + "</p></div><div class='dyccostprogram-teacher'>" + value.teacherName + "</div>";

					if(((strHours > smallhour) && (strHours < bighour)) || ((strHours == smallhour) && (strSeconds >= smallhoursecond)) || ((strHours == bighour) && (strSeconds <= bighoursecond))) {
						$htmlStr += "<div class='swiper-slide'><div class='dyccostprogram-list'><a href='#' class='dycnow dycprogram'><p class='dyctips'>正在看</p>" + $nhtmlStr + "</a></div></div>";
						$jltImg.html("<a class='dyccostplay-image' href='teacherdetail.html?teacherId=" + value.teacherId + "'><img src='" + ROUTEFILE + value.iconPath + "' /></a>");
						$jlivecName.html(value.name);
						$jlivetName.html("<span class='dyccostplay-speaker-name'>主讲：" + value.teacherName + "</span> <span>人气：1599</span>");
						$jcostPerson.html("<a class='active dyccostteacher' href='#this' data-id=" + value.teacherId + " data-other='teacher' data-name='" + value.teacherName + "老师'>" + value.teacherName + "老师</a><a class='dyccostanchor' href='#this' data-id=" + value.anchorId + " data-other='anchor' data-name='" + value.authorName + "主播'>" + value.authorName + "主播</a>");
					} else if((strHours < smallhour) || ((strHours == smallhour) && (strSeconds < smallhoursecond))) {
						$htmlStr += "<div class='swiper-slide'><div class='dyccostprogram-list'><a href='#' class='dycwill dycprogram'><p class='dyctips'>未播</p>" + $nhtmlStr + "</a></div></div>";
					} else {
						$htmlStr += "<div class='swiper-slide'><div class='dyccostprogram-list'><a href='#' class='dycold dycprogram'><p class='dyctips'>已播</p>" + $nhtmlStr + "</a></div></div>";
					}

				});

				$jcostMenu.html($htmlStr);
				var oPersons = $('#jcostperson a');
				tab(oPersons);
			}
			//处理屏幕大小
			$wb = document.body.clientWidth;
			if($wb > 1500) {
				$wid = $wb - 560;
				$('.dyccostprogram').width(510);
				costliveSwiper(3);
			}
			if(($wb > 1360) && ($wb < 1500)) {
				$wid = $wb - 560;
				$('.dyccostprogram').width(340);
				costliveSwiper(2);

			}
			if(($wb > 1200) && ($wb < 1360)) {
				$wid = $wb - 560;
				costliveSwiper(1);
			} else if($wb < 1200) {
				$wid = 1200 - 560;
				costliveSwiper(1);
				$('.dycgifts').width(45);
				$('.dycgifts').height(45);
				$('.dyccostplay-right').css('width', $wb - $wid);

			}
			$('.dyccostplay-box').width($wid);
			var mySwiper = new Swiper('.dyccost-adv-swiper', {
					autoplay: 5000,//可选选项，自动滑动
				})
		},
		error: function(err) {
			console.log(err);
		}
	});
}*/

//打赏直播-打赏图标
costLogo = function(id) {
	var $jcostLogo = $("#jcostlogo"),
		$jcostBrief = $('#jcostBrief'),
		$htmlBrief = "",
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
				} else {
					$htmlStr += "<div class='swiper-slide'><a class='dycgifts' data-id=" + value.rewardGoodsId + " data-other=" + value.reward + " data-img='" + ROUTEFILE + value.iconPath + "' data-name='" + value.name + "' data-note='" + value.note + "'><img src='" + ROUTEFILE + value.iconPath + "'/></a></div>";
				}
			});
			$jcostLogo.html($htmlStr);
			var costliveSwiper = new Swiper('.dyccost-swiper', {
				autoplay: false,
				loop: false,
				/*prevButton: '.swiper-button-prev',
				nextButton: '.swiper-button-next',*/
				spaceBetween: 10,
				slidesPerView: 10,
				breakpoints: {
					1600: {
						slidesPerView: 9
					},
					1448: {
						slidesPerView: 8
					},
					1100: {
						slidesPerView: 7
					},
					1000: {
						slidesPerView: 5
					},
					800: {
						slidesPerView: 4
					}
				}

			});

			/* var costliveSwiper = new Swiper('.dyccost-swiper', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        slidesPerView: 5,
        spaceBetween: 50,
       
    });*/

			$jcostBrief.html($htmlBrief); //默认为播米币

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

//打赏、充值选择
$.costSelect = function(paramId, channelProgramId) {
	costLogo(); //获取打赏图标
	costMenu(paramId, channelProgramId); //获取当前菜单
	if($mid != null && $mid != undefined && $mid != "") {

		$.jOver(); //获取当前播米币
	}

	$('#jrecharge').click(function() { //充值
		if($mid != null && $mid != undefined && $mid != "") {
			var t = 0;
			var ss = setInterval(function() { //点击充值后，10分钟内每3s刷新一次播米币余额
				$('#jover').html(localStorage.getItem('mMoney'));
				t++;
				console.log(localStorage.getItem('mMoney'))
				if((t > 199) || (localStorage.getItem('mMoney') != $mMoney)) {
					clearInterval(ss);
				}
			}, 3000);

			$(this).attr('href', 'recharge.html?recharge=1&type=1');
			$(this).attr('target', '_blank');

		} else {
			alert("您还未登录哦~");
		}
	});
	$('#jrechargemember').click(function() { //充值
		if($mid != null && $mid != undefined && $mid != "") {
			$(this).attr('href', 'recharge.html?recharge=0');
			$(this).attr('target', '_blank');

		} else {
			alert("您还未登录哦~");
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
					$htmlStrmid = "<span class='dyccostrank-username' style='background:url(" + ROUTEFILE + value.gradeIconPath + ");background-repeat:no-repeat;'>" + value.objectName + "</span><span class='dyccostrank-content'><img src=" + ROUTEFILE + value.iconPath + " />" + value.rewardCount + "</span>";
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
					$htmlStrmid = "<span class='dyccostrank-username'>" + value.objectName + "</span><span class='dyccostrank-content'><img src=" + ROUTEFILE + value.iconPath + " />" + value.rewardCount + "</span>";
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
//关于我们Tab
$.aboutSwiper = function() {

	var aboutSwiper = new Swiper('.dycaboutus-container', {
		mousewheelControl: false,
		noSwiping: true,
		autoHeight: true,
		pagination: '.ycabout-swiper-pagination',
		paginationClickable: true,
		paginationBulletRender: function(tzksSwiper, index, className) {
			switch(index) {
				case 0:
					name = '> 播米在线';
					break;
				case 1:
					name = '> 播米优势';
					break;
				case 2:
					name = '> 合作伙伴';
					break;
				case 3:
					name = '> 展望未来';
					break;
				default:
					name = '';
			}
			return '<li class="' + className + '">' + name + '</li>';
		}
	});

}

//联系我们Tab
$.contactSwiper = function() {
	var aboutSwiper = new Swiper('.dyccontactus-container', {
		mousewheelControl: false,
		noSwiping: true,
		autoHeight: true,
		pagination: '.ycabout-swiper-pagination',
		paginationClickable: true,
		paginationBulletRender: function(tzksSwiper, index, className) {
			switch(index) {
				case 0:
					name = '> 联系方式';
					break;
				case 1:
					name = '> 关注微信';
					break;
				case 2:
					name = '> 关注微博';
					break;
				case 3:
					name = '> 邮箱、QQ';
					break;
				default:
					name = '';
			}
			return '<li class="' + className + '">' + name + '</li>';
		}
	});
}
//课程详情-课程评价
$.courseComment = function(id, index) {
	var $jcourseComment = $("#jcoursecomment"),
		$iconStr = "",
		$nameStr = "",
		$num = "",
		$htmlStr = "";
	$.ajax({
		type: "GET",
		url: ROUTE + "CourseEvaluation.ashx?action=getEvaluation",
		dataType: "json",
		data: {
			"courseId": id,
			"pageIndex": index,
			"pageSize": 5
		},
		success: function(result) {
			$num = index;
			if(result.rows.length == 0) {

				$jcourseComment.html($htmlStr);
				$('#jaddmore').css('display', 'none');
				return false;
			} else {
				if(result.totalPageCount == 1) {
					$('#jaddmore').css('display', 'none');
				}
				result.rows.forEach(function(value, index) {
					if(value.memberId != 0) {
						if((value.iconPath == '') || (value.memberId == 0)) {
							$iconStr = ROUTEROOT + "ycedu/images/sz01.jpg";
						} else {
							$iconStr = ROUTEFILE + value.iconPath;
						}
					} else {
						$iconStr = ROUTEROOT + "ycedu/images/sz01.jpg";
					}
					$htmlStr += "<div class='dycmli-box clearfix'><div class='dyccm-icon'><div class='dyccm-icon-img' style='background-image:url(" + $iconStr + ")'></div><span class='dyccm-icon-name'>" + value.nickName + "</span></div><div class='dyccm-content'><p>" + value.evaluation + "</p></div></div>";
				});
				$jcourseComment.html($htmlStr);
				$('#jaddmore').click(function() {
					$num++;
					if($num == result.totalPageCount) {
						$('#jaddmore').css('display', 'none');
					};
					$.courseCommentmore(id, $num);
				});
			}
		},
		error: function(err) {
			console.log(err);
		}
	});
}

//课程详情-课程评价-点击添加更多
$.courseCommentmore = function(id, $index) {
	var $jcourseComment = $("#jcoursecomment"),
		$iconStr = "",
		$htmlStr = "";
	$.ajax({
		type: "GET",
		url: ROUTE + "CourseEvaluation.ashx?action=getEvaluation",
		dataType: "json",
		data: {
			"courseId": id,
			"pageIndex": $index,
			"pageSize": 5
		},
		success: function(result) {
			result.rows.forEach(function(value, index) {
				if(value.memberId != 0) {
					if((value.iconPath == '') || (value.memberId == 0)) {
						$iconStr = ROUTEROOT + "ycedu/images/sz01.jpg";
					} else {
						$iconStr = ROUTEFILE + value.iconPath;
					}
				} else {
					$iconStr = ROUTEROOT + "ycedu/images/sz01.jpg";
				}
				$htmlStr += "<div class='dycmli-box clearfix'><div class='dyccm-icon'><div class='dyccm-icon-img' style='background-image:url(" + $iconStr + ")'></div><span>" + value.nickName + "</span></div><div class='dyccm-content'><p>" + value.evaluation + "</p></div></div>";
			});
			$jcourseComment.append($htmlStr);
			window.kcxqSwiper.update();
		},
		error: function(err) {
			console.log(err);
		}
	});
}

//课程详情-课程评价-提交评论
$.postComment = function(id) {
	var $jcourseComment = $("#jcoursecomment"),
		$iconStr = "",
		$nameStr = "",
		$htmlStr = "";
	$.ajax({
		type: "POST",
		url: ROUTE + "CourseEvaluation.ashx?action=evaluation",
		data: {
			memberId: $mid,
			courseId: id,
			evaluation: $("#jcomment").val()
		},
		success: function(result) {
			if(result == '会员评论成功') {
				if($mid != null && $mid != undefined && $mid != "") {
					if($mUserIcon != null && $mUserIcon != undefined && $mUserIcon != "") {
						$iconStr = $mUserIcon;
					} else {
						$iconStr = "images/sz01.jpg";
					}
					$htmlStr = "<div class='dycmli-box'><div class='dyccm-icon'><div class='dyccm-icon-img' style='background-image:url(" + ROUTEFILE + $iconStr + ")'></div><span>" + $mNickName + "</span></div><div class='dyccm-content'><p>" + $("#jcomment").val() + "</p></div></div>";

					alert('评论成功~');
					$jcourseComment.prepend($htmlStr);
					window.kcxqSwiper.update();
					$("#jcomment").val(' ');
				} else {
					//未登入时
					layer.msg("Sorry ╮(╯_╰)╭ 您还未登入哦！");
					return false;
				}

			}
		},
		error: function(err) {
			console.log(err);
		}
	});
}

//课程详情-其他课程
$.courseOther = function(id) {
	var $jcadBox = $("#jcadbox"),
		$htmlStr = "";
	$.ajax({
		type: "GET",
		url: ROUTE + "Course.ashx?action=getCourseByType",
		dataType: "json",
		data: {
			"courseTypeId": id
		},
		success: function(result) {
			if(result.rows.length >= 2) {
				for(var i = 0; i < 2; i++) {
					$htmlStr += "<a class='dycadbox-wrap' href='coursedetail.html?courseId=" + result.rows[i].courseId + "'><img src='" + ROUTEFILE + result.rows[i].iconPath + "' alt='课程' /></a>";
				}
			} else {
				for(var i = 0; i < result.rows.length; i++) {
					$htmlStr += "<a class='dycadbox-wrap' href='coursedetail.html?courseId=" + result.rows[i].courseId + "'><img src='" + ROUTEFILE + result.rows[i].iconPath + "' alt='课程' /></a>";
				}
			}
			$jcadBox.html($htmlStr);
		},
		error: function(err) {
			console.log(err);
		}
	});
}

//名师专题-名师列表类别tab
function ftSwiper() {
	var ftswiper = new Swiper('.dycmsexpert-list', {
		mousewheelControl: false,
		noSwiping: true,
		autoHeight: true,
		slidesPerView: 4,
		spaceBetween: 0
	});
}

//名师专题-名师类别
$.teachertopicTab = function(id) {
	var $jfteacherTab = $("#jfteachertab"),
		$htmlStr = "";
	$.ajax({
		type: "GET",
		url: ROUTE + "CourseType.ashx?action=getTeacherCourseType",
		dataType: "json",
		data: {

		},
		success: function(result) {
			result.forEach(function(value, index) {
				$htmlStr += "<div class='swiper-slide' ><a class='dycmsexpert-keys' href='#this' data-id=" + value.courseTypeId + ">" + value.name + "</a></div>";
			});

			$jfteacherTab.html($htmlStr);
			ftSwiper();
			fteacherTab();
		},
		error: function(err) {
			console.log(err);
		}
	});
}

//名师专题-名师列表
$.fteacherList = function(id, pageIndex) {
	var $jteacherList = $("#jteacherlist"),
		$jteacherpage = $("#jteacherpage"),
		$htmlPage = "",
		$htmlStr = "";
	$.ajax({
		type: "GET",
		url: ROUTE + "Teacher.ashx?action=getTeacherByCourseType",
		dataType: "json",
		data: {
			"courseTypeId": id,
			"pageIndex": pageIndex,
			"pageSize": 9
		},
		success: function(result) {
			result.rows.forEach(function(value, index) {
				$htmlStr += "<div class='dycst-wrap clearfix'><div class='span4'><a href='ycedu/teacherdetail.html?teacherId=" + value.teacherId + "' class='dycst-images'><img src='" + ROUTEFILE + value.iconPath + "' alt=" + value.name + " /><div class='dycteacher-title'>" + value.teacherGradeName + "</div></a></div><div class='span8'><div class='dycstlist-box'><a class='dycstlist-name' href='ycedu/teacherdetail.html?teacherId=" + value.teacherId + "'>" + value.name + "</a><p class='dycstlist-interest'>" + value.specialty + "</p><p class='dycstlist-brief'>" + value.note + "</p><div class='dycstcourse' ><a class='dycstcourse-list' href='ycedu/coursedetail.html?courseId=" + value.courseId + "'> 课程：<span class='dycstcourse-name'>" + value.courseName + "</span><span class='dycstcourse-num'>已报" + value.orderedCount + "人</span><span class='dycstcourse-vedio'></span></a><a class='dycstcourse-list' href='ycedu/liveplay.html?channelId=" + value.channelId + "'>直播：<span class='dycstcourse-name'>" + value.liveProgramName + "</span><span class='dycstcourse-num'>已报" + value.liveOrderedCount + "人</span></a></div></div></div></div>";
			});

			$jteacherList.html($htmlStr);
			for(var i = 0; i < result.totalPageCount; i++) {
				$htmlPage += "<li><a href='#this'>" + (i + 1) + "</a></li>"
			}

			$jteacherpage.html("<li><a href='#this'>上一页</a></li>" + $htmlPage + "<li><a href='#this'>下一页</a></li>");
			var $jteacherPage = $('#jteacherpage li a');

			if(result.totalPageCount == '0') {
				$jsubPage.css('display', 'none');
			} else if((pageIndex == '1') && (pageIndex == result.totalPageCount)) {
				$jteacherPage.eq(0).css('display', 'none');
				$jteacherPage.eq(result.totalPageCount + 1).css('display', 'none');
			} else if(pageIndex == '1') {
				$jteacherPage.eq(0).css('display', 'none');
			} else if(pageIndex == (result.totalPageCount)) {
				$jteacherPage.eq(result.totalPageCount + 1).css('display', 'none');
			}
			$jteacherPage.eq(pageIndex).parent().addClass('active');

			$jteacherPage.click(function() {
				var num = $jteacherPage.index(this);
				if(num && (num < $jteacherPage.length - 1)) {
					pageIndex = num;
				} else if((num == "0") && (pageIndex > 1)) {
					pageIndex -= 1;
				} else if((num == ($jteacherPage.length - 1)) && (pageIndex < $jteacherPage.length - 2)) {
					pageIndex += 1;
				}
				$.fteacherList(id, pageIndex);

				$.scrollTo(1800, 0);
			});
		},
		error: function(err) {
			console.log(err);
		}
	});
}
//名师专题名师类别切换
function fteacherTab() {
	var oTab = $('#jfteachertab .swiper-slide');
	//热门直播
	oTab.each(function(index) {
		$(this).click(function() {
			var dataId = $(this).find("a").attr("data-id");
			oTab.removeClass('active');
			$(this).addClass('active');
			$.fteacherList(dataId, 1);
		})
	});
}
//外汇专题-课程列表
$.fxCourse = function(id) {
	var $jfxCourse = $("#jfxcourse"),
		$htmlStr = "";
	$.ajax({
		type: "GET",
		url: ROUTE + "Course.ashx?action=getCourseTopicByType",
		dataType: "json",
		data: {
			"courseTypeId": id
		},
		success: function(result) {
			result.forEach(function(value, index) {
				$htmlStr += "<a class='dycfxcourse-box' href='coursedetail.html?courseId=" + value.courseId + "'><div class='dycfxcourse-img'><img src='" + ROUTEFILE + value.iconPath + "' /></div><p class='dycfxcourse-title'>" + value.name + "</p><p class='dycfxcourse-brief'>" + value.note + "</p></a>";
			});
			$jfxCourse.html($htmlStr);
		},
		error: function(err) {
			console.log(err);
		}
	});
}

//外汇专题-名师
$.fxTeacher = function(id) {
	var $jfxTeacher = $("#jfxteacher"),
		$htmlStr = "";
	$.ajax({
		type: "GET",
		url: ROUTE + "Teacher.ashx?action=getTeacherByCourseType",
		dataType: "json",
		data: {
			"courseTypeId": id
		},
		success: function(result) {
			result.rows.forEach(function(value, index) {
				if((index >= 0) && (index < 3)) {
					$htmlStr += "<div class='dycstotea-box'><a href='teacherdetail.html?teacherId=" + value.teacherId + "' class='dycstotea-box-img'><img src='" + ROUTEFILE + value.iconPath + "' /><div class='dycfxteacher-title'>" + value.teacherGradeName + "</div></a><p class='dycstotea-box-title'>" + value.name + "</p><p class='dycstotea-box-brief'>" + value.note + "</p></div>";
				} else {
					return false;
				}
			});
			$jfxTeacher.html($htmlStr);
		},
		error: function(err) {
			console.log(err);
		}
	});
}

//大宗专题-课程列表
$.bulkCourse = function(id) {
	var $jbulkCourse = $("#jbulkcourse"),
		$htmlStr = "";
	$.ajax({
		type: "GET",
		url: ROUTE + "Course.ashx?action=getCourseTopicByType",
		dataType: "json",
		data: {
			"courseTypeId": id
		},
		success: function(result) {
			result.forEach(function(value, index) {
				$htmlStr += "<a class='dycdzcourse-box' href='coursedetail.html?courseId=" + value.courseId + "'><div class='dycdzcourse-img'><img src='" + ROUTEFILE + value.iconPath + "' /></div><p class='dycdzcourse-title'>" + value.name + "</p><p class='dycdzcourse-brief'>" + value.note + "</p></a>";
			});
			$jbulkCourse.html($htmlStr);
		},
		error: function(err) {
			console.log(err);
		}
	});
}

//大宗专题-名师
$.bulkTeacher = function(id) {
	var $jbulkTeacher = $("#jbulkteacher"),
		$htmlStr = "";
	$.ajax({
		type: "GET",
		url: ROUTE + "Teacher.ashx?action=getTeacherByCourseType",
		dataType: "json",
		data: {
			"courseTypeId": id
		},
		success: function(result) {

			result.rows.forEach(function(value, index) {
				if((index >= 0) && (index < 3)) {
					$htmlStr += "<div class='dycstotea-box'><a href='teacherdetail.html?teacherId=" + value.teacherId + "' class='dycstotea-box-img'><img src='" + ROUTEFILE + value.iconPath + "' /><div class='dycdzteacher-title'>" + value.teacherGradeName + "</div></a><p class='dycstotea-box-title'>" + value.name + "</p><p class='dycstotea-box-brief'>" + value.note + "</p></div>";
				} else {
					return false;
				}
			});

			$jbulkTeacher.html($htmlStr);
		},
		error: function(err) {
			console.log(err);
		}
	});
}

//股票专题-课程列表
$.stockCourse = function(id) {
	var $jstockCourse = $("#jstockcourse"),
		$htmlStr = "";
	$.ajax({
		type: "GET",
		url: ROUTE + "Course.ashx?action=getCourseTopicByType",
		dataType: "json",
		data: {
			"courseTypeId": id
		},
		success: function(result) {
			result.forEach(function(value, index) {
				$htmlStr += "<a class='dyccoursewrap-box' href='coursedetail.html?courseId=" + value.courseId + "'><div class='dyccourse-img'><img src='" + ROUTEFILE + value.iconPath + "' /></div><p class='dyccourse-title'>" + value.name + "</p><p class='dyccourse-brief'>" + value.note + "</p></a>";
			});
			$jstockCourse.html($htmlStr);
		},
		error: function(err) {
			console.log(err);
		}
	});
}

//股票专题-相关老师
$.stockTeacher = function(id) {
	var $stockTeacher = $("#jstockteacher"),
		$htmlStr = "";
	$.ajax({
		type: "GET",
		url: ROUTE + "Teacher.ashx?action=getTeacherByCourseType",
		dataType: "json",
		data: {
			"courseTypeId": id
		},
		success: function(result) {
			result.rows.forEach(function(value, index) {
				if((index >= 0) && (index < 3)) {
					$htmlStr += "<div class='dycstotea-box'><a href='teacherDetail.html?teacherId=" + value.teacherId + "' class='dycstotea-box-img'><img src='" + ROUTEFILE + value.iconPath + "' /></a><p class='dycstotea-box-title'>" + value.teacherGradeName + "：<br/>" + value.name + " 嘉宾</p><p class='dycstotea-box-brief'>" + value.note + "</p></div>";
				} else {
					return false;
				}
			});
			$stockTeacher.html($htmlStr);
		},
		error: function(err) {
			console.log(err);
		}
	});
}

//从业（证券）专题-课程列表
$.securityCourse = function(id) {
	var $jsecurityCourse = $("#jseccheats"),
		$htmlStr = "";
	$.ajax({
		type: "GET",
		url: ROUTE + "Course.ashx?action=getCourseTopicByType",
		dataType: "json",
		data: {
			"courseTypeId": id
		},
		success: function(result) {
			result.forEach(function(value, index) {
				$htmlStr += "<a class='dycseccheats-box' href='coursedetail.html?courseId=" + value.courseId + "'><div class='dycseccheats-image'><img src='" + ROUTEFILE + value.iconPath + " '/></div><div class='dycseccheats-brief'><div class='dycseccheats-box-title'>" + value.name + "</div><p class='dycseccheats-box-brief'>" + value.note + "</p></div></a>";
			});
			$jsecurityCourse.html($htmlStr);
		},
		error: function(err) {
			console.log(err);
		}
	});
}

//从业（证券）专题-名师
$.secTeacher = function(id) {
	var $jsecTeacher = $("#jsecteacher"),
		$htmlStr = "";
	$.ajax({
		type: "GET",
		url: ROUTE + "Teacher.ashx?action=getTeacherByCourseType",
		dataType: "json",
		data: {
			"courseTypeId": 1
		},
		success: function(result) {
			$htmlStr = "<div class='span4'><a class='dycsecteacher-image' href='teacherdetail.html?teacherId=" + result.rows[0].teacherId + "'><image src='" + ROUTEFILE + result.rows[0].iconPath + "' /><div class='dycsecteacher-name'><span>" + result.rows[0].name + "</span>嘉宾</div></a></div><div class='span8'><div class='dycsecteacher-brief'>" + result.rows[0].teacherGradeName + "：" + result.rows[0].name + " 嘉宾<br/>" + result.rows[0].note + "</div></div>";
			$jsecTeacher.html($htmlStr);
		},
		error: function(err) {
			console.log(err);
		}
	});
}

//录制播放player-课程播放列表
$.playerList = function(id, ccId) {
	var $jplayerlist = $("#jplayerlist"),
		$htmlStr = "",
		$status = "";
	var arr = new Array();
	var arrow = 1;

	$.ajax({
		type: "GET",
		url: ROUTE + "CourseCatalog.ashx?action=getCourseCatalogByCourseId",
		dataType: "json",
		data: {
			"memberId": $mid,
			"courseId": id
		},
		async: false,
		success: function(result) {
			arr[2] = result[0][0].isSold; //是否购买
			/*返回第一个免费试听的videoId和名称*/
			for(var i = 0; i < result[1].length; i++) {
				if(arrow) {
					if(result[1][i].children == undefined) {
						if(result[1][i].allowListen == 1) {
							arr[0] = result[1][i].videoId;
							arr[1] = result[1][i].courseCatalogId; //章节名称

							arrow = 0;
						}
					} else {
						for(var j = 0; j < result[1][i].children.length; j++) {
							if((arrow) && (result[1][i].children[j].allowListen == 1)) {
								arr[0] = result[1][i].children[j].videoId;
								arr[1] = result[1][i].children[j].courseCatalogId; //章节名称

								arrow = 0;
							}
						}
					}
				}
			}

			result[1].forEach(function(value, index) {
				var $nodeStr = "";

				if(value.children == undefined) {
					$nodeStr = "";
					if(value.courseCatalogId == ccId) {
						$htmlStr += "<ul><h4 class='active'><span class='dycz'>第 <span>" + (index + 1) + "</span>章</span><a href='#this'>" + value.name + "</a></h4>" + $nodeStr + "</ul>";
					} else {
						$htmlStr += "<ul><h4><span class='dycz'>第 <span>" + (index + 1) + "</span>章</span><a href='player.html?courseId=" + value.courseId + "&videoId=" + value.videoId + "&courseCatalogId=" + value.courseCatalogId + "'>" + value.name + "</a></h4>" + $nodeStr + "</ul>";
					}
				} else {
					value.children.forEach(function(children, num) {
						if(children.courseCatalogId == ccId) {
							$nodeStr += "<li><a class='active' href='#this'><span class='dycpltext'>" + 0 + (num + 1) + "- " + children.name + "</span><span class='dyclearnlogo nolearn'><i class='uk-icon-circle-o'></i></span></a></li>";
						} else {
							$nodeStr += "<li><a href='player.html?courseId=" + children.courseId + "&videoId=" + children.videoId + "&courseCatalogId=" + children.courseCatalogId + "'><span class='dycpltext'>" + 0 + (num + 1) + "- " + children.name + "</span><span class='dyclearnlogo nolearn'><i class='uk-icon-circle-o'></i></span></a></li>";
						}

					});

					if(value.courseCatalogId == ccId) {
						$htmlStr += "<ul><h4 class='active'><span class='dycz'>第 <span>" + (index + 1) + "</span>章</span><a href='#this'>" + value.name + "</a></h4>" + $nodeStr + "</ul>";
					} else {
						$htmlStr += "<ul><h4><span class='dycz'>第 <span>" + (index + 1) + "</span>章</span><a href='player.html?courseId=" + value.courseId + "&videoId=" + value.videoId + "&courseCatalogId=" + value.courseCatalogId + "'>" + value.name + "</a></h4>" + $nodeStr + "</ul>";
					}

				}

			});

			$jplayerlist.html($htmlStr);

		},
		error: function(err) {
			console.log(err);
		}
	});
	return arr;
}

//录制播放player-视频播放头部
$.playerHead = function(id) {
	var $jplayerHead = $("#jplayerhead .dycgo-left"),
		$jycptitleName = $("#jplayertitle span"),
		$jycpondeName = $("#jplayertitle em");
	var sold = "";
	$.ajax({
		type: "GET",
		url: ROUTE + "CourseCatalog.ashx?action=getCourseCatalogById",
		dataType: "json",
		data: {
			"courseCatalogId": id
		},
		async: false,
		success: function(result) {

			$jplayerHead.html("<a href='javascript:history.back();'><i class='uk-icon-arrow-left'></i></a>");
			$jycptitleName.html(result[0].name);
			sold = result[0].allowListen;
		},
		error: function(err) {
			console.log(err);
		}
	});
	return sold;
}

//名师详情
$.teacherDetail = function(id) {
	var $jteacherDetail = $("#jteacherdetail"),
		$jteacherPerson = $("#jteacherperson"),
		$htmlStr = "";
	$.ajax({
		type: "GET",
		url: ROUTE + "Teacher.ashx?action=getTeacherDetailById",
		dataType: "json",
		data: {
			"teacherId": id
		},
		success: function(result) {

			$htmlStr = "<div class='dycdetailes-image'><img src='" + ROUTEFILE + result[0].iconPath + "'></div><div class='dycdetailes-box'><div class='dycdetailes-name'>" + result[0].name + "</div><a class='dycdetailes-jobs' href='teacherdetail.html?teacherId=" + result[0].teacherId + "'>" + result[0].teacherTypeName + "</a><div class='dycdetailes-brief'><div class='ycpanel-para'><span class='dycpoint'>教龄：</span>" + result[0].ofSchoolAge + "</div><div class='ycpanel-para'><p>" + result[0].introduce + "</p></div></div></div></div>";

			$jteacherDetail.html($htmlStr);
			$jteacherPerson.html(result[0].encyclopedia);
		},
		error: function(err) {
			console.log(err);
		}
	});
}

//名师详情-相关老师
$.teacherSwiper = function(id) {
	var $jteacherSwiper = $("#jteacherswiper"),
		$htmlStr = "";
	$.ajax({
		type: "GET",
		url: ROUTE + "Teacher.ashx?action=getOtherTeacher",
		dataType: "json",
		data: {
			"teacherId": id
		},
		success: function(result) {
			result.forEach(function(value, index) {
				$htmlStr += "<div class='swiper-slide'><a class='ycpanel-box' href='teacherdetail.html?teacherId=" + value.teacherId + "'><div class='ycpanel-image'><img src='" + ROUTEFILE + value.iconPath + "' /></div><div class='ycpanel-title'>" + value.name + "</div></a></div>";
			});
			$jteacherSwiper.html($htmlStr);
			var msswiper = new Swiper('.dycot-container', {
				autoplay: 3000,
				loop: true,
				spaceBetween: 30,
				slidesPerView: 2,
				effect: 'slide',
				direction: 'vertical',
			});

			$('#swiper-button-prev').click(function() {
				msswiper.slidePrev();
			});
			$('#swiper-button-next').click(function() {
				msswiper.slideNext();
			});

		},
		error: function(err) {
			console.log(err);
		}
	});
}

//新闻详情-播米名师
$.newsTeacher = function(id) {
	var $jnewsTeacher = $("#jnewsteacher"),
		$htmlStr = "";
	$.ajax({
		type: "GET",
		url: ROUTE + "Teacher.ashx?action=getTopTeacherOneCourse",
		dataType: "json",
		data: {
			"newsId": id
		},
		success: function(result) {
			result.forEach(function(value, index) {
				$htmlStr += "<div class='swiper-slide'><a class='dycms-slide' href='teacherdetail.html?teacherId=" + value.teacherId + "'><p class='yctitle'>" + value.courseName + "</p><div class='dyccontent clearfix'><div class='ycimage'><img src='" + ROUTEFILE + value.iconPath + "' alt='名师' /><p>" + value.teacherName + "</p></div><p class='ycbrief'>" + value.note + "</p></div></a></div>"
			})

			$jnewsTeacher.html($htmlStr);
			newdetailSwiper.update();
		},
		error: function(err) {
			console.log(err);
		}
	});
};

//搜索页面-课程搜索
$.searchCourse = function(id, pageIndex) {
	var $jsearchCourse = $("#jsearchcourse"),
		$jscoursePage = $("#jscoursepage"),
		$htmlPage = "",
		$htmlStr = "";
	$.ajax({
		type: "GET",
		url: ROUTE + "Course.ashx?action=getCourseByName",
		dataType: "json",
		data: {
			"name": id,
			"pageIndex": pageIndex,
			"pageSize": 9
		},
		success: function(result) {
			if(result.totalPageCount) {
				result.rows.forEach(function(value, index) {
					var $htmlImg = "",
						$htmlCon = "";
					$htmlImg += "<a href='coursedetail.html?courseId=" + value.courseId + "' class='dycsearchlist-image' target='_blank'><img src=" + ROUTEFILE + value.iconPath + " alt='课程列表' /></a>";
					$htmlCon += "<a class='dycsearchlist-title' href='coursedetail.html?courseId=" + value.courseId + "'>" + value.name + "</a><p class='dycsearchlist-brief'>" + value.note + "</p><span class='dyccurrentPrice'>￥" + value.price + "</span> <span class='dycoldPrice'>￥6980</span>";
					$htmlStr += "<div class='dycsearchlist-wrap'><div class='span3'>" + $htmlImg + "</div><div class='span9'><div class='dycsearchlist-box'>" + $htmlCon + "<a class='dycdetail' href='coursedetail.html?courseId=" + value.courseId + "' target='_blank'>查看详情</a></div></div></div>"
				});

				$jsearchCourse.html("<div class='dycsearchlist clearfix'>" + $htmlStr + "</div>");

				for(var i = 0; i < result.totalPageCount; i++) {
					$htmlPage += "<li><a href='#this'>" + (i + 1) + "</a></li>"
				}
				$jscoursePage.html("<li><a href='#this'>上一页</a></li>" + $htmlPage + "<li><a href='#this'>下一页</a></li>");
				setTimeout(function() {
					var $jsearchPage = $('#jscoursepage li a');

					if((pageIndex == '1') && (pageIndex == result.totalPageCount)) {
						$jsearchPage.eq(0).css('display', 'none');
						$jsearchPage.eq(result.totalPageCount + 1).css('display', 'none');
					} else if(pageIndex == '1') {
						$jsearchPage.eq(0).css('display', 'none');
					} else if(pageIndex == (result.totalPageCount)) {
						$jsearchPage.eq(result.totalPageCount + 1).css('display', 'none');
					}
					$jsearchPage.eq(pageIndex).parent().addClass('active');
					$jsearchPage.click(function() {
						var num = $jsearchPage.index(this);
						if(num && (num < $jsearchPage.length - 1)) {
							pageIndex = num;
						} else if((num == "0") && (pageIndex > 1)) {
							pageIndex -= 1;
						} else if((num == ($jsearchPage.length - 1)) && (pageIndex < $jsearchPage.length - 2)) {
							pageIndex += 1;
						}
						$.searchCourse(id, pageIndex);
						$.scrollTo(0, 0);
					});
				}, 2);
			} else {
				$jsearchCourse.html("<div style='height:600px;font-size:30px;line-height:100px;text-align:center'>没有相关结果，请换个关键字试试~</div>");
				$jscoursePage.html("");
			}
		},
		error: function(err) {
			console.log(err);
		}
	});
};

//搜索页面-老师搜索
$.searchTeacher = function(id, pageIndex) {
	var $jsearchTeacher = $("#jsearchteacher"),
		$jsteacherPage = $("#jsteacherpage"),
		$htmlPage = "",
		$htmlStr = "";
	$.ajax({
		type: "GET",
		url: ROUTE + "Teacher.ashx?action=getTeacherByName",
		dataType: "json",
		data: {
			"name": id,
			"pageIndex": pageIndex,
			"pageSize": 9
		},
		success: function(result) {
			if(result.totalPageCount) {

				result.rows.forEach(function(value, index) {

					var $htmlImg = "",
						$htmlCon = "";
					$htmlImg += "<a href='teacherdetail.html?teacherId=" + value.teacherId + "' class='dycst-images span9' target='_blank'><img src='" + ROUTEFILE + value.iconPath + "' alt='课程列表' /></a>";
					$htmlCon += "<a class='dycstlist-name' href='teacherdetail.html?teacherId=" + value.teacherId + "'  target='_blank'>" + value.name + "</a><p class='dycstlist-interest'>" + value.specialty + "</p><p class='dycstlist-brief'>" + value.note + "</p><div class='dycstcourse'><p class='dycstcourse-list'>课程：<a class='dycstcourse-name' href='coursedetail.html?courseId=" + value.courseId + "' target='_blank'>" + value.courseName + "</a></p><p class='dycstcourse-list'>直播：<a class='dycstcourse-name' href='liveplay.html?channelId=" + value.channelId + "'>" + value.liveProgramName + "</a></p></div>";
					$htmlStr += "<div class='dycst-wrap clearfix'><div class='span3'>" + $htmlImg + "</div><div class='span9'><div class='dycstlist-box'>" + $htmlCon + "</div></div></div>"
				});

				$jsearchTeacher.html("<div class='dycsearch-teacher'>" + $htmlStr + "</div>");

				for(var i = 0; i < result.totalPageCount; i++) {
					$htmlPage += "<li><a href='#this'>" + (i + 1) + "</a></li>";
				}
				$jsteacherPage.html("<li><a href='#this'>上一页</a></li>" + $htmlPage + "<li><a href='#this'>下一页</a></li>");

				setTimeout(function() {
					var $jsteacherPage = $('#jsteacherpage li a');

					if((pageIndex == '1') && (pageIndex == result.totalPageCount)) {
						$jsteacherPage.eq(0).css('display', 'none');
						$jsteacherPage.eq(result.totalPageCount + 1).css('display', 'none');
					} else if(pageIndex == '1') {
						$jsteacherPage.eq(0).css('display', 'none');
					} else if(pageIndex == (result.totalPageCount)) {
						$jsteacherPage.eq(result.totalPageCount + 1).css('display', 'none');
					}
					$jsteacherPage.eq(pageIndex).parent().addClass('active');
					$jsteacherPage.click(function() {
						var num = $jsteacherPage.index(this);
						if(num && (num < $jsteacherPage.length - 1)) {
							pageIndex = num;
						} else if((num == "0") && (pageIndex > 1)) {
							pageIndex -= 1;
						} else if((num == ($jsteacherPage.length - 1)) && (pageIndex < $jsteacherPage.length - 2)) {
							pageIndex += 1;
						}
						$.searchTeacher(id, pageIndex);
						$.scrollTo(0, 0);
					});
				}, 2);
			} else {
				$jsearchTeacher.html("<div style='height:600px;font-size:30px;line-height:100px;text-align:center'>没有相关结果，请换个关键字试试~</div>");
				$jsteacherPage.html("");
			}
		},
		error: function(err) {
			console.log(err);
		}
	});
};

//名师详情-相关课程
$.pcourseList = function(id) {
	var $jpcourselist = $("#jpcourselist"),
		$htmlStr = "";
	$.ajax({
		type: "GET",
		url: ROUTE + "Course.ashx?action=getTeacherRelativeCourse",
		dataType: "json",
		data: {
			"teacherId": id
		},
		success: function(result) {
			result.forEach(function(value, index) {
				$htmlStr += "<li class='ycpanel-box'><a href='coursedetail.html?courseId=" + value.courseId + "'><div class='ycpanel-image'><img src='" + ROUTEFILE + value.iconPath + "' /></div><p class='ycpanel-title'>" + value.name + "</p></a><p class='ycpanel-price'>￥" + value.preferentialPrice + "</p><p class='ycpanel-para'>" + value.note + "</p></li>";
			});
			$jpcourselist.html($htmlStr);
		},
		error: function(err) {
			console.log(err);
		}
	});
}
//首页-首页直播
$.newsLive = function(id) {
	var	$jindexleft = $("#jindexleft"),
		$jindexmiddle=$("#jindexmiddle"),
		$jindexright = $("#jindexright"),
		$htmlLeftStr = "",
		$htmlRightStr = "",
		$htmlMiddleStr = "",
		$htmlStr = "";
	var channelId, channelProgramId;
	var datee = new Date();
	var week = datee.getDay() - 1;
	$.ajax({
		type: "GET",
		url:  ROUTE + "ChannelProgram.ashx?action=getCurrLiveChannelProgram",
		dataType: "json",
		success: function(result) {
			result.forEach(function(value, index) {
				if(index == week) {
					channelId = value.channelId;
					channelProgramId = value.channelProgramId;
				}
			});
				$.ajax({
					type: "GET",
					url:  ROUTE + "Banner.ashx?action=getBanner&bannerType=FamousTeacher",
					dataType: "json",
					success: function(result) {
						result.forEach(function(value, index) {
							if(index < '2') {
								$htmlLeftStr += "<div class='dyclink-box'><a href='ycedu/costliveplay.html?channelId="+channelId+"&channelProgramId="+channelProgramId+"' target='_blank'><img src='"+ROUTEFILE+value.iconPath+"' alt='投资' /></a></div>";
							}else if(index=='2'){
								$htmlMiddleStr = "<div class='dyclink-box'><a href='ycedu/costliveplay.html?channelId="+channelId+"&channelProgramId="+channelProgramId+"' target='_blank'><img src='"+ROUTEFILE+value.iconPath+"' alt='投资' /></a></div>";
							}else if(index<'5'){
								$htmlRightStr += "<div class='dyclink-box'><a href='ycedu/costliveplay.html?channelId="+channelId+"&channelProgramId="+channelProgramId+"' target='_blank'><img src='"+ROUTEFILE+value.iconPath+"' alt='投资' /></a></div>";
							}
						});
						$jindexleft.html($htmlLeftStr); 
						$jindexmiddle.html($htmlMiddleStr);
						$jindexright.html($htmlRightStr);
					},
					error: function(err) {
						console.log(err);
					}
				});
			
		},
		error: function(err) {
			console.log(err);
		}
	});

};

//首页-专家观点
$.NewsTop = function(id) {
	var $jNewsTop = $("#jNewsTop"),
		$htmlStr = "";
	$.ajax({
		type: "GET",
		url: ROUTE + "News.ashx?action=getFirstExpert",
		dataType: "json",
		success: function(result) {
			/*$htmlStr = "<a href='ycedu/newsdetail.html?newsId=" + result + "' target='_blank'></a>";
			$jNewsTop.html($htmlStr);*/
			$htmlStr = "<a href='#this'></a>";
			$jNewsTop.html($htmlStr);
				$("#jNewsTop").click(function(){
				if(($mid == undefined) || ($mid == null) || ($mid == "")) {
					layer.confirm('登录后才可查看观点，是否立即前往登录', {
						btn: ['是', '否']
					}, function(index, layero) {
						window.location.href = '../login.html';
					});
				} else{
					$(this).find('a').attr('href','ycedu/newsdetail.html?newsId='+result+'&charge=1');
					$(this).find('a').attr('target','_blank');
				}
			});
			
			
		},
		error: function(err) {
			console.log(err);
		}
	});
};

//首页-投资理财与考试Tab
$.tzksSwiper = function() {
	var tzksSwiper = new Swiper('.dyctzks-container', {
		pagination: '.yctzks-swiper-pagination',
		paginationClickable: true,
		paginationBulletRender: function(tzksSwiper, index, className) {
			switch(index) {
				case 0:
					name = '理财投资';
					break;
				case 1:
					name = '考证从业';
					break;
				default:
					name = '';
			}
			return '<li class="' + className + '" data-id="' + (index + 1) + '">' + name + '</li>';
		}
	});
}
//首页-理财投资
$.jtzcourse = function(id) {
	var $jtzCourse = $("#jtzcourse"),
		$jtzCoursebox = "",
		$htmlStr = "";
	$.ajax({
		type: "GET",
		url: ROUTE + "Course.ashx?action=getHottestCourse",
		dataType: "json",
		data: {

		},
		success: function(result) {
			result.forEach(function(value, index) {
				$jtzCoursebox += "<div class='span4 col-xm-6 col-xs-12'><div class='dyctzks-box'><a href='ycedu/coursedetail.html?courseId=" + value.courseId + "'><img src='" + ROUTEFILE + value.iconPath + "' alt='投资考试' /></a></div></div>";
			});
			$htmlStr = "<div class='swiper-slide'><div class='ycwrap clearfix'><div class='span4 col-xm-6 col-xs-12'><div class='dyctzks-box'><a href='#'><img src='ycedu/images/tzlc01.jpg' alt='投资考试' /></a></div></div>" + $jtzCoursebox + "</div></div>";
			$jtzCourse.html($htmlStr);
			//tzksSwiper.updatse();
		},
		error: function(err) {
			console.log(err);
		}
	});
};

//会员充值规则-个人信息
$.jruleMember = function(id) {
	var $jruleMember = $('#jrulemember'),
		$htmlStr = "";

	$.ajax({
		type: "get",
		url: ROUTE + "Member.ashx?action=getSowingCoinByMemberId",
		dataType: "json",
		data: {
			"memberId": $mid
		},
		success: function(result) {

			if(result[0].iconPath == '') {
				$htmlStr += "<div class='dycimg span5'><img src='" + ROUTEROOT + "ycedu/images/mbheadIcon.png' /></div><div class='span7'><p class='dycmembername'>" + result[0].nickName + "</p><div class='dycmembergrade'>" + result[0].memberlevel + "</div></div>";
			} else {
				$htmlStr += "<div class='dycimg span5'><img src='" + ROUTEFILE + result[0].iconPath + "' /></div><div class='span7'><p class='dycmembername'>" + result[0].nickName + "</p><div class='dycmembergrade'>" + result[0].memberlevel + "</div></div>";
			}

			$jruleMember.html($htmlStr);

		},
		error: function(err) {
			console.log(err);
		}
	});
}

//会员充值-个人信息
$.jPersonal = function(id) {
	var $jPersonal = $('#jpersonal'),
		$jRest = $('#jrest'),
		$htmlStr = "";

	$.ajax({
		type: "get",
		url: ROUTE + "Member.ashx?action=getSowingCoinByMemberId",
		dataType: "json",
		data: {
			"memberId": $mid
		},
		success: function(result) {
			if(result[0].iconPath == '') {
				$htmlStr += "<div class='span5'><div class='dycrecharge-person-img'><img src='" + ROUTEROOT + "ycedu/images/mbheadIcon.png' /></div></div><div class='span7'>" + result[0].nickName + "</div>";
			} else {
				$htmlStr += "<div class='span5'><div class='dycrecharge-person-img'><img src='" + ROUTEFILE + result[0].iconPath + "' /></div></div><div class='span7'>" + result[0].nickName + "</div>";
			}

			$jPersonal.html($htmlStr);
			$jRest.html(result[0].sowingCoin);

			$('#jgrade').html(result[0].memberlevel);
		},
		error: function(err) {
			console.log(err);
		}
	});
}

//会员充值-tab
$.jmemberRecordselect = function() {

	//会员充值-切换选择
	selectt($('#jselect p'), $('.dycrecharge-right-box'));
	selectt($('#jrecordselect span'), $('.dycrecharge-crecord-box'));
	selectt($('#jrechargeselect span'), $('.recharge-style-box'));

	//会员等级、充值金额选择
	graderChange($('#jmoneynums .dycrecharge-grade'));

	//选择充值金额
	$('#jmoneynums .dycrecharge-grade').click(function() {
		var textnum = $('#jtext').val();
		$("#jtext").off('blur');
		$("#jtext").on('blur', function() {
			textnum = parseFloat($(this).val());
			if(textnum == 0) {
				alert('请输入大于0的整数或两位小数点的有效数字')
			} else {
				reg = /^[0-9]*\.{0,1}[0-9]{0,2}$/;
				if(reg.test(textnum)) {
					$('#jcorrect').html('请确认：充值<span id="jcorrectrmb">' + textnum + '</span>元，您将获得<span class="dyccorectnums">' + textnum + ' 播米币</span>');
				} else {
					$(this).val('');
					alert('请输入整数或两位小数点的有效数字');

				}
			}
		});

		$('.dycrecharge-own .dycrecharge-bominum').attr('data-id', textnum);
		var num = $(this).attr('data-id');

		$('#jcorrect').html('请确认：充值<span id="jcorrectrmb">' + num + '</span>元，您将获得<span class="dyccorectnums">' + num + ' 播米币</span>');

	});
}

function selectt(obj, ocon) {
	obj.click(function() {
		obj.removeClass('active');
		$(this).addClass('active');
		var num = $(this).attr('data-id');
		ocon.css('display', 'none');
		ocon.eq(num).css('display', 'block')
	});
}

function graderChange(obj) { //会员等级、充值金额选择
	obj.click(function() {
		obj.removeClass('active');
		$(this).addClass('active');
		obj.find('i').removeClass('uk-icon-check-circle').addClass('uk-icon-circle-thin');
		$(this).find('i').removeClass('uk-icon-circle-thin').addClass('uk-icon-check-circle');
	});
}

//获取会员等级
jmemberNums = function(id) {
	var jmembernums = $('#jmembernums'),
		jmembercorrect = $('#jmembercorrect'),
		htmlStr = "";
	$.ajax({
		type: "get",
		url: ROUTE + "MemberGrade.ashx?action=getMemberGrade",
		dataType: "json",
		success: function(result) {
			var grade = getLever();
			result.forEach(function(value, index) { //grade[1]等级
				if(index > 5) {
					htmlStr += "";
				} else {
					if(index < grade[1]) { //如果已经是这个等级以上，则不能点击
						htmlStr += "<div class='span4'><div class='dycrecharge-grade dycrecharge-member clearfix disabled' data-id=" + value.amount + " data-gift=" + value.note + " data-name=" + value.name + "><div class='span2'><i class='uk-icon-circle-thin'></i></div><div class='span10'>" + value.name + "</div></div></div>";
					} else {
						if(index == grade[1]) {
							htmlStr += "<div class='span4'><div class='dycrecharge-grade dycrecharge-member active clearfix' data-id=" + value.amount + " data-gift=" + value.note + " data-name=" + value.name + "><div class='span2'><i class='uk-icon-check-circle'></i></div><div class='span10'>" + value.name + "</div></div></div>";
							jmembercorrect.html("备注：<span style='margin-right:5%;'>当月课程购买达会员等级即可享受相应服务</span>" + value.note + "");
						} else if(index < 6) {
							htmlStr += "<div class='span4'><div class='dycrecharge-grade dycrecharge-member clearfix' data-id=" + value.amount + " data-gift=" + value.note + " data-name=" + value.name + "><div class='span2'><i class='uk-icon-circle-thin'></i></div><div class='span10'>" + value.name + "</div></div></div>";
						}
					}
				}
			});
			jmembernums.html(htmlStr);
			graderChange($('#jmembernums .dycrecharge-grade')); //会员等级选择
			$('#jmembernums .dycrecharge-grade').click(function() {
				var num = $(this).attr('data-gift');
				jmembercorrect.html("备注：<span style='margin-right:5%;'>当月课程购买达会员等级即可享受相应服务</span>" + num + "");
			});
		},
		error: function(err) {
			console.log(err);
		}
	});
}
//充值-时间查询
function timeselect(obj) {
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

//会员充值-交易记录查询
$.rechargeRecord = function() {
	var numfrom = new Array();
	var numto = new Array();
	var d = new Date();
	var str = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();

	$('#recharge_date_from').val(str);
	$('#recharge_date_to').val(str);
	$('#cost_date_from').val(str);
	$('#cost_date_to').val(str);

	timeselect($('#cost_date_from'));
	timeselect($('#cost_date_to'));
	timeselect($('#recharge_date_from'));
	timeselect($('#recharge_date_to'));

	$('#jrechargeresult').click(function() {
		numfrom = $('#recharge_date_from').val().split("-");
		numto = $('#recharge_date_to').val().split("-");
		var numFrom = "",
			numTo = "";

		for(var i = 0; i < numfrom.length; i++) {

			if(numfrom[i] < 10) {
				numfrom[i] = '0' + numfrom[i];
			}
			if(numto[i] < 10) {
				numto[i] = '0' + numto[i];
			}
			numFrom += String(numfrom[i]);
			numTo += String(numto[i]);
		}
		var timefrom = numfrom[0] + "-" + numfrom[1] + "-" + numfrom[2];
		var timeto = numto[0] + "-" + numto[1] + "-" + numto[2];

		var num = parseInt(numTo) - parseInt(numFrom);
		if(($mid != undefined) && ($mid != '') && ($mid != null)) {
			if(num >= 0) {
				jrechargeList(timefrom, timeto, 1); //充值记录
			} else {
				alert('请选择正确的时间');
			}
		} else {
			alert('您还未登录~');
		}

	});

	$('#jcostresult').click(function() {
		numfrom = $('#cost_date_from').val().split("-");
		numto = $('#cost_date_to').val().split("-");
		var numFrom = "",
			numTo = "";

		for(var i = 0; i < numfrom.length; i++) {
			if(numfrom[i] < 10) {
				numfrom[i] = '0' + numfrom[i];
			}
			if(numto[i] < 10) {
				numto[i] = '0' + numto[i];
			}
			numFrom += String(numfrom[i]);
			numTo += String(numto[i]);
		}

		var timefrom = numfrom[0] + "-" + numfrom[1] + "-" + numfrom[2];
		var timeto = numto[0] + "-" + numto[1] + "-" + numto[2];

		var num = parseInt(numTo) - parseInt(numFrom);
		if(($mid != undefined) && ($mid != '') && ($mid != null)) {
			if(num >= 0) {
				jcostList(timefrom, timeto, 1); //消费记录
			} else {
				alert('请选择正确的时间');
			}
		} else {
			alert('您还未登录~');
		}

	});
}

//会员充值-充值播米币
recordBomi = function(paytype, obj, id) {
	if(paytype == 0) {
		var newWindow = window.open('about:blank');
	}
	$.ajax({
		type: "post",
		url: ROUTE + "MemberRecharge.ashx?action=memberRecharge",
		data: {
			"memberId": $mid,
			"rechargeAmount": obj,
			"payTypeId": paytype,
			"rechargeList": id
		},
		success: function(res) {
			if(paytype == 0) {
				newWindow.location.href = "turnpaybomi.html?rechargeAmount=" + obj + '&rechargeList=' + id + '&memberId=' + $mid;
				setTimeout(function() {
					layer.confirm("是否支付完成", {
						btn: ['重新选择支付方式', '支付完成'],
					}, function() {
						layer.closeAll('dialog')
						console.log("心选");
					}, function() { //二次校验
						$.ajax({
							type: "POST",
							url: ROUTE + "MemberRecharge.ashx?action=checkPaySuccess",
							dataType: "json",
							data: {
								"memberId": $mid,
								"rechargeList": id
							},
							success: function(res) {
								if(res == '812') {
									$(".dyc-success-bg").show().delay(3000).fadeOut();
									console.log("ok")
								}
								if(res == '814') {
									console.log("未完成")
								} else {
									return false;
								}
							}
						});
					});
				}, 3000);
			} else if(paytype == 1) {
				setTimeout(function() {
					var json = eval('(' + res + ')')
					layer.open({
						type: 1,
						title: '微信支付',
						area: ['420px', '420px'], //宽高
						content: "<div class='dycweixin-img' style='text-align:center;width:200px;height:200px;line-height:200px;margin:50px auto 0'><img src=" + ROUTEFILE + json.iconPath + " /></div><p style='text-align:center'>应付金额：<span style='color: #df5e3f;font-size: 20px;'>￥" + obj + "</span></p>",
						success: function() {

							var xunhuan = setInterval(function() {
								$.ajax({
									type: "POST",
									url: ROUTE + "MemberRecharge.ashx?action=checkPaySuccess",
									dataType: "json",
									data: {
										"memberId": $mid,
										"rechargeList": id
									},
									success: function(res) {
										if(res == '812') {
											clearInterval(xunhuan);
											layer.closeAll();
											$(".dyc-success-bg").show().delay(3000).fadeOut();
										}
										if(res == '814') {
											setTimeout(function() {
												clearInterval(xunhuan);
											}, 60000);
											console.log("未完成")
										} else {
											return false;
										}
									}
								});
							}, 3000)
						},
						cancel: function() {
							//右上角关闭回调
							// clearInterval(xunhuan);
						}
					});
				}, 500);
			} else {
				alert('使用播米币充值');
			}
		},
		error: function(err) {
			console.log(err);
		}
	});
}

//会员充值-充值会员等级
RecordGrade = function(paytype, id, obj, gradename, type) {
	if(paytype == '2') { //播米币支付
		layer.open({
			type: 1,
			title: '播米币支付',
			area: ['360px', '360px'], //宽高
			content: "<div class='dycweixin-img' style='text-align:center;width:300px;height:200px;margin:50px auto 0;color:#606060;'><p style='text-align:center'>应付播米币：<span style='color: #df5e3f;font-size: 20px;'>￥" + obj + "</span></p><div style='margin-top:30px'><input id='jvalue' name='name' type='text' placeholder='输入验证码确认支付' /><a id='jvalid'>获取短信验证码</a></div></div>",
			success: function() {

				$('#jvalid').click(function() { //点击获取验证码
					if($('#jvalid').text() == '获取短信验证码') {
						$.ajax({
							type: "post",
							url: ROUTE + "Member.ashx?action=getMemberMobById",
							data: {
								"memberId": $mid
							},
							dataType: "json",
							success: function(result) {
								$.ajax({
									type: "post",
									url: ROUTE + "Member.ashx?action=getConfirmCoinValidCode",
									data: {
										"name": result[0].mobile
									},
									dataType: "json",
									success: function(result) {
										changeVCShow($('#jvalid')); //获取验证码
									},
									error: function(err) {
										console.log(err);
									}
								});

							},
							error: function(err) {
								console.log(err);
							}
						});
					}
				});

			},
			btn: ['确认支付', '取消'],
			yes: function(index, layero) { //确认支付

				$.ajax({
					type: "post",
					url: ROUTE + "MemberGrade.ashx?action=purchaseMemberGrade",
					data: {
						"memberId": $mid,
						"purchaseAmount": obj,
						"payTypeId": paytype, //支付方式：0-支付宝，1-微信，2-播米币
						"purchaseList": id, //订单号
						"validateCode": $('#jvalue').val() //校验验证码是否正确
					},
					success: function(result) {
						if(result == '812') {
							layer.closeAll();
							layer.msg('支付成功,恭喜升级为' + gradename);
							localStorage.setItem("mlever", gradename);
							$mMoney = localStorage.setItem("mMoney", $('#jrest').html() - obj);
							console.log($mMoney)
							$('#jgrade').html(gradename);
							$('#jrest').html($('#jrest').html() - obj);
							if(type == '1') {
								setTimeout(function() {
									window.close();
								}, 3000);
							}

						} else if(result == '814') {
							layer.msg("支付失败，请重新支付");
						} else if(result == '819') {
							layer.closeAll();
							layer.msg("播米币余额不足，请换一种支付方式或充值播米币~");
						} else if(result == '805') {
							layer.msg("验证码输入错误，请重新输入");
						} else if(result == '818') {
							layer.closeAll();
							layer.msg('你已购买,无需在购买');
						} else {
							return false;
						}
					},
					error: function(err) {
						console.log(err);
					}
				});

			}
		});

	} else { //支付宝、微信支付

		if(paytype == 0) {
			var newWindow = window.open('about:blank');
		}
		$.ajax({
			type: "post",
			url: ROUTE + "MemberGrade.ashx?action=purchaseMemberGrade",
			data: {
				"memberId": $mid,
				"purchaseAmount": obj,
				"payTypeId": paytype, //支付方式：0-支付宝，1-微信，2-播米币
				"purchaseList": id, //订单号
			},
			success: function(res) {
				if(paytype == 0) {
					newWindow.location.href = "turnpaybomi.html?rechargeAmount=" + obj + '&rechargeList=' + id + '&memberId=' + $mid;
					setTimeout(function() {
						layer.confirm("是否支付完成", {
							btn: ['重新选择支付方式', '支付完成'],
						}, function() {
							layer.closeAll('dialog')
							console.log("心选");
						}, function() { //二次校验
							$.ajax({
								type: "POST",
								url: ROUTE + "MemberRecharge.ashx?action=checkPaySuccess",
								dataType: "json",
								data: {
									"memberId": $mid,
									"rechargeList": id
								},
								success: function(res) {
									if(res == '812') {
										layer.closeAll();
										layer.msg('支付成功');
										localStorage.setItem("mlever", gradename);
										$('#jgrade').html(gradename);
									}
									if(res == '814') {
										layer.msg('支付失败，请重新支付');

									} else {
										return false;
									}
								}
							});
						});
					}, 3000);
				} else if(paytype == '1') {
					setTimeout(function() {
						var json = eval('(' + res + ')')
						layer.open({
							type: 1,
							title: '微信支付',
							area: ['420px', '420px'], //宽高
							content: "<div class='dycweixin-img' style='text-align:center;width:200px;height:200px;line-height:200px;margin:50px auto 0'><img src=" + ROUTEFILE + json.iconPath + " /></div><p style='text-align:center'>应付金额：<span style='color: #df5e3f;font-size: 20px;'>￥" + obj + "</span></p>",
							success: function() {

								var xunhuan = setInterval(function() {
									$.ajax({
										type: "POST",
										url: ROUTE + "MemberGrade.ashx?action=checkPaySuccess",
										dataType: "json",
										data: {
											"memberId": $mid,
											"purchaseList": id
										},
										success: function(res) {
											if(res == '812') {
												clearInterval(xunhuan);
												layer.closeAll();
												layer.msg('支付成功');
												localStorage.setItem("mlever", gradename);
												$('#jgrade').html(gradename);
											}
											if(res == '814') {

												setTimeout(function() {
													clearInterval(xunhuan);
												}, 60000);
												console.log("未完成")
											} else {
												return false;
											}
										}
									});
								}, 3000)
							},
							cancel: function() {
								//右上角关闭回调
								// clearInterval(xunhuan);
							}
						});
					}, 500);
				}
			},
			error: function(err) {
				console.log(err);
			}
		});

	}
}

//会员充值-充值
$.bomiRecharge = function(id, type) {
	if(type == 1) {
		console.log(type);
		$('#jrechargeselect span').removeClass('active');
		$($('#jrechargeselect span')[type]).addClass('active');
		$('.recharge-style-box').css("display", "none");
		$($('.recharge-style-box')[type]).css("display", "block");

	}
	jmemberNums(); //会员等级
	//会员充值-充值播米币
	var paytype = 0,
		memberpaytype = 0;
	$('#jpayselect span').click(function() {
		$('#jpayselect span').removeClass('active');
		$(this).addClass('active');
		paytype = $(this).attr('data-id');
	});
	$('#jmemberpayselect span').click(function() {
		$(this).siblings().removeClass('active');
		$(this).addClass('active');
		memberpaytype = $(this).attr('data-id');
	});

	//会员充值-点击充值播米币
	$('#jrecord').click(function() {
		if(($mid != undefined) && ($mid != '') && ($mid != null)) {
			var date = new Date();
			var month = date.getMonth() + 1;
			var strDate = date.getDate();
			var seconds = date.getSeconds();
			var randnum = "";
			for(var i = 0; i < 5; i++) {
				randnum += Math.floor(Math.random() * 10);
			}

			if(month >= 1 && month <= 9) {
				month = "0" + month;
			}
			if(strDate >= 0 && strDate <= 9) {
				strDate = "0" + strDate;
			}
			if(seconds >= 0 && seconds <= 9) {
				seconds = "0" + seconds;
			}
			var currentdate = date.getFullYear() + month + strDate + date.getHours() + date.getMinutes() + seconds + randnum;

			if($('#jcorrectrmb').html() == '' || $('#jcorrectrmb').html() == 0) {
				alert('请选择充值的金额~');
			} else {

				recordBomi(paytype, $('#jcorrectrmb').html(), currentdate);
			}
		} else {
			alert('您还未登录~');
		}
	});

	//会员充值-点击充值会员
	$('#jmemberrecord').click(function() {
		if(($mid != undefined) && ($mid != '') && ($mid != null)) {
			var date = new Date();
			var month = date.getMonth() + 1;
			var strDate = date.getDate();
			var seconds = date.getSeconds();
			var randnum = "";
			for(var i = 0; i < 5; i++) {
				randnum += Math.floor(Math.random() * 10);
			}

			if(month >= 1 && month <= 9) {
				month = "0" + month;
			}
			if(strDate >= 0 && strDate <= 9) {
				strDate = "0" + strDate;
			}
			if(seconds >= 0 && seconds <= 9) {
				seconds = "0" + seconds;
			}
			var currentdate = date.getFullYear() + month + strDate + date.getHours() + date.getMinutes() + seconds + randnum;
			RecordGrade(memberpaytype, currentdate, $('#jmembernums .active').attr('data-id'), $('#jmembernums .active').attr('data-name'), id);
		} else {
			alert('您还未登录~');
		}
	});

}

//会员充值-消费记录
jcostList = function(timefrom, timeto, pageIndex) {
	var $jcostList = $('#jcostlist'),
		$htmlStr = "";
	$.ajax({
		type: "get",
		url: ROUTE + "MemberGrade.ashx?action=getMemberPurchase",
		dataType: "json",
		data: {
			"memberId": $mid,
			"pageIndex": pageIndex,
			"pageSize": 15,
			"beginDate": timefrom,
			"endDate": timeto
		},
		success: function(result) {
			if(result.totalPageCount != 0) {
				result.rows.forEach(function(value, index) {
					if(value.moneys == '') {
						value.moneys = '0';
					} else if(value.coin == '') {
						value.coin = '0';
					}
					$htmlStr += "<li class='clearfix'><div class='span3'>" + value.payTime + "</div><div class='span3'>" + value.moneys + "</div><div class='span3'>" + value.coin + "</div><div class='span3'>" + value.used + "</div></li>";
				});
			} else {
				$htmlStr = "没有相关记录，换个时间段试试呗~";
			}
			$jcostList.html($htmlStr);

			//页码
			pages(pageIndex, result.totalPageCount, $('#jcostlistpage'));
			var $jsubPage = $('#jcostlistpage li a');
			$jsubPage.click(function() {
				var num = $jsubPage.index(this);
				if(num && (num < $jsubPage.length - 1)) {
					pageIndex = num;
				} else if((num == "0") && (pageIndex > 1)) {
					pageIndex -= 1;
				} else if((num == ($jsubPage.length - 1)) && (pageIndex < $jsubPage.length - 2)) {
					pageIndex += 1;
				}
				jcostList(timefrom, timeto, pageIndex);

			});
		},
		error: function(err) {
			console.log(err);
		}
	});
}

//会员充值-充值记录
jrechargeList = function(timefrom, timeto, pageIndex) {
	var $jrechargeList = $('#jrechargelist'),
		$htmlStr = "";
	$.ajax({
		type: "get",
		url: ROUTE + "MemberRecharge.ashx?action=getMemberRecharge",
		dataType: "json",
		data: {
			"memberId": $mid,
			"pageIndex": pageIndex,
			"pageSize": 15,
			"beginDate": timefrom,
			"endDate": timeto
		},
		success: function(result) {
			if(result.totalPageCount != 0) {
				result.rows.forEach(function(value, index) {
					$htmlStr += "<li class='clearfix'><div class='span3'>" + value.rechargeDate + "</div><div class='span3'>" + value.rechargeList + "</div><div class='span3'>" + value.rechargeAmount + "</div><div class='span3'>" + value.payTypeName + "</div></li>"
				});
			} else {
				$htmlStr = "没有相关记录，换个时间段试试呗~";
			}
			$jrechargeList.html($htmlStr);
			//页码
			pages(pageIndex, result.totalPageCount, $('#jrechargelistpage'));
			var $jsubPage = $('#jrechargelistpage li a');

			$jsubPage.click(function() {
				var num = $jsubPage.index(this);
				if(num && (num < $jsubPage.length - 1)) {
					pageIndex = num;
				} else if((num == "0") && (pageIndex > 1)) {
					pageIndex -= 1;
				} else if((num == ($jsubPage.length - 1)) && (pageIndex < $jsubPage.length - 2)) {
					pageIndex += 1;
				}
				jrechargeList(timefrom, timeto, pageIndex);
			});
		},
		error: function(err) {
			console.log(err);
		}
	});
}

//题库
$.jSubject = function(id) {
	var $jSubject = $("#jsubject"),
		$paperStrtop = "",
		$paperStrdown = "",
		$htmlStr = "";

	$.ajax({
		type: "GET",
		url: ROUTE + "PaperType.ashx?action=getPaperType",
		dataType: "json",
		data: {},
		success: function(result) {
			result.forEach(function(value, index) {
				var tagNames = new Array();
				var $briefStr = "",
					tagNames = value.tagName.split(' ');
				$paperStr = "<li class='span4'><div class='dycsubject-img'><img src='" + ROUTEFILE + value.iconPath + "' /></div><div class='dycsubject-title'><p class='dycsystem dyctest'>" + value.name + "</p><p>" + value.title + "</p></div><div class='subject-brief clearfix'>";
				for(var i = 0; i < tagNames.length; i++) {
					$briefStr += "<p class='span4'>" + tagNames[i] + "</p>";
				}
				if(value.randType == 0) {
					$paperStrdown = "</div><div class='dycsubjectbtn'><a class='dycsubject-btn' href='ycedu/subjectselect.html?paperTypeId=" + value.paperTypeId + "' target='_blank'>" + value.btnName + "</a></div></li>";
				} else {
					$paperStrdown = "</div><div class='dycsubjectbtn'><a class='dycsubject-btn' href='ycedu/subjecttest.html?paperTypeId=" + value.paperTypeId + "' target='_blank' >" + value.btnName + "</a></div></li>";
				}
				$htmlStr += $paperStr　 + $briefStr + $paperStrdown;
			});
			$jSubject.html($htmlStr);
		},
		error: function(err) {
			console.log(err);
		}
	});
};
//题库-题库类型
$.jcourseType = function(pId) {
	var $jcourseType = $('#jcourseTypeId'),
		$htmlStr = "";
	$.ajax({
		type: "get",
		url: ROUTE + "ExamPaper.ashx?action=getSecondLevelCourseType",
		dataType: "json",
		data: {
			"memberId": $mid
		},
		success: function(result) {
			result.forEach(function(value, index) {
				if(index == '0') {
					$htmlStr += "<p class='span2'><label>" + value.name + "</label><input type='radio' name='subselect' value=" + value.courseTypeId + " checked='checked' data-isbuy=" + value.isbuy + " /></p>";
				} else {
					$htmlStr += "<p class='span2'><label>" + value.name + "</label><input type='radio' name='subselect' value=" + value.courseTypeId + " data-isbuy=" + value.isbuy + " /></p>";
				}

			});
			$jcourseType.html($htmlStr);
			$('#jcourseTypeId input').click(function() {
				var type = $(this).attr('value');
				var isbuy = $(this).attr('data-isbuy');
				$.jsubjectList(pId, 1, type, isbuy);
			});
		},
		error: function(err) {
			console.log(err);
		}
	});
};

//题库-题目列表
$.jsubjectList = function(id, pageIndex, courseTypeId, isbuy) {
	var $jsubjectList = $("#jsubjectlist"),
		$htmlStr = "";
	$.ajax({
		type: "GET",
		url: ROUTE + "ExamPaper.ashx?action=getExamPaperByTypeId",
		dataType: "json",
		data: {
			"paperTypeId": id,
			"pageIndex": pageIndex,
			"pageSize": 10,
			"courseTypeId": courseTypeId
		},
		success: function(result) {
			result.rows.forEach(function(value, index) {
				if(($mid == undefined) || ($mid == '') || ($mid == null) || (isbuy == '0')) {
					$htmlStr += "<li><a href='#this'>" + value.name + "</a></li>";
				} else {
					$htmlStr += "<li><a href='subjecttest.html?paperTypeId=" + id + "&examPaperId=" + value.examPaperId + "' target='_blank'>" + value.name + "</a></li>";
				}

			});

			$jsubjectList.html($htmlStr);

			//页码
			pages(pageIndex, result.totalPageCount, $("#jsubjectlistpage"));
			var $jsubPage = $('#jsubjectlistpage li a');

			$jsubPage.click(function() {
				var num = $jsubPage.index(this);
				if(num && (num < $jsubPage.length - 1)) {
					pageIndex = num;
				} else if((num == "0") && (pageIndex > 1)) {
					pageIndex -= 1;
				} else if((num == ($jsubPage.length - 1)) && (pageIndex < $jsubPage.length - 2)) {
					pageIndex += 1;
				}
				$.jsubjectList(id, pageIndex, courseTypeId, isbuy);
			});

		},
		error: function(err) {
			console.log(err);
		}
	});
}

//题库测试题-机考类型
$.jmachineTest = function(id, pageIndex, answer) {
	var $jtestBox = $("#jtestsystembox"),
		$jtestNums = $("#jtestnums"),
		$jtestHead = $('#jtesthead'),
		$headStr = "",
		$num = 0,
		$numsStr = "",
		$titleStr = "",
		$htmlStr = "";

	$.ajax({
		type: "GET",
		url: ROUTE + "ExamPaper.ashx?action=getExamPaperByTypeId",
		dataType: "json",
		asynch: false,
		data: {
			"paperTypeId": id,
			"pageIndex": pageIndex,
			"pageSize": 10
		},
		success: function(result) {
			$("#jtestcard").html("试题数：" + result[0].totalCount + "题<br/>" + "错答题：0题<br/> " + "未答题：" + result[0].totalCount + "题<br/>" + "总 分：" + result[0].totalScore + "分");

			result[0].rows.forEach(function(value, index) {
				var $optionStr = "";
				$titleStr = "<div class='dyctestsystem-box' data-pId=" + value.examPaperId + " data-eId=" + value.examQuestionId + " data-qId=" + value.questionBankId + " data-score = " + value.point + " data-answer = " + value.rightAnswer + "><div class='dyctestsystem-box-title'><span class='dyctestsystem-num'>" + value.questionNo + "</span>[<span class='input' contenteditable='true'></span>]" + value.title + "</div>";
				if(answer[value.questionNo] != null) {
					value.questionOptions.forEach(function(valueoption, indexs) {
						if(valueoption.optionNo == answer[value.questionNo][0]) {
							$optionStr += "<p class='dyctestsystem-box-select active' data-id=" + valueoption.optionNo + ">[ " + valueoption.optionNo + " ] " + valueoption.questionOption + "</p>";
						} else {
							$optionStr += "<p class='dyctestsystem-box-select' data-id=" + valueoption.optionNo + ">[ " + valueoption.optionNo + " ] " + valueoption.questionOption + "</p>";
						}
					});

				} else {
					value.questionOptions.forEach(function(valueoption, indexs) {
						$optionStr += "<p class='dyctestsystem-box-select' data-id=" + valueoption.optionNo + ">[ " + valueoption.optionNo + " ] " + valueoption.questionOption + "</p>";
					});
				}
				$headStr = value.name;
				$htmlStr += $titleStr + $optionStr + "<div class='dycanasysis'></div></div>";
			});
			$jtestHead.html($headStr);
			$jtestBox.html($htmlStr);

			$('.dyctestsystem-box-select').click(function() {
				$(this).siblings().removeClass('active');
				$(this).addClass('active');
				//保存当前页答案
				var xuhao = $(this).siblings('.dyctestsystem-box-title').children('.dyctestsystem-num').html();
				var ans = new Array();
				ans[0] = $(this).attr('data-id');
				ans[1] = $(this).parent().attr("data-eid");
				ans[2] = $(this).parent().attr("data-qid");
				var score = $(this).parent().attr("data-score");
				var rightanswer = $(this).parent().attr("data-answer");
				if(ans[0] == rightanswer) {
					ans[3] = score;
				} else {
					ans[3] = 0;
				}
				answer[xuhao] = ans;
			});

			for(var i = 0; i < result[0].totalCount; i++) {
				$numsStr += "<li class='dycnoanswer'>" + (i + 1) + "</li>";
			}
			$jtestNums.html($numsStr);

			pages(pageIndex, result[0].totalPageCount, $("#jsubjectlistpage"));
			var $jsubPage = $('#jsubjectlistpage li a');

			$jsubPage.click(function() {
				var num = $jsubPage.index(this);
				if(num && (num < $jsubPage.length - 1)) {
					pageIndex = num;
				} else if((num == "0") && (pageIndex > 1)) {
					pageIndex -= 1;
				} else if((num == ($jsubPage.length - 1)) && (pageIndex < $jsubPage.length - 2)) {
					pageIndex += 1;
				}
				$.jmachineTest(id, pageIndex, answer);
			});

		},
		error: function(err) {
			console.log(err);
		}
	});
	return answer;
};

//题库测试题-机考类型-实时
$.jmachineTesttime = function(id, pageIndex) {
	var $jtestBox = $("#jtestsystembox"),
		$jtestNums = $("#jtestnums"),
		$janswer = $("#jtestsystembox").children().find('.active'),
		$num = 0,
		$numsStr = "",
		$titleStr = "",
		$score = 0,
		$rightnum = 0,
		$htmlStrana = "",
		$htmlanswer = "",
		$htmlStr = "";

	$.ajax({
		type: "GET",
		url: ROUTE + "ExamPaper.ashx?action=getExamPaperByTypeId",
		dataType: "json",
		data: {
			"paperTypeId": id,
			"pageIndex": pageIndex,
			"pageSize": 10
		},
		success: function(result) {
			$("#jtestcard").html("试题数：" + result[0].totalCount + "题<br/>" + "错答题：0题<br/> " + "未答题：" + result[0].totalCount + "题<br/>" + "总 分：" + result[0].totalScore + "分");

			result[0].rows.forEach(function(value, index) {
				var $optionStr = "";
				$titleStr = "<div class='dyctestsystem-box' data-eId=" + value.examQuestionId + " data-qId=" + value.questionBankId + " data-answer = " + value.rightAnswer + " data-score = " + value.point + " data-isclick='true'><div class='dyctestsystem-box-title'><span class='dyctestsystem-num'>" + value.questionNo + "</span>[<span class='input' contenteditable='true'></span>]" + value.title + "</div>";
				value.questionOptions.forEach(function(valueoption, indexs) {
					$optionStr += "<p class='dyctestsystem-box-select' data-id=" + valueoption.optionNo + ">[ " + valueoption.optionNo + " ] " + valueoption.questionOption + "</p>";
				});
				$htmlStrana = "<div class='dycanswer'></div><p>正确答案：" + value.rightAnswer + "</p><div class='dycansweranasysis'><p>试题解析：</p>" + value.analysis + "</div>";

				$htmlStr += $titleStr + $optionStr + "<div class='dycanasysis' style='display:none'>" + $htmlStrana + "</div></div>";
			});

			$jtestBox.html($htmlStr);

			for(var i = 0; i < result[0].totalCount; i++) {
				$numsStr += "<li class='dycnoanswer'>" + (i + 1) + "</li>";
			}
			$jtestNums.html($numsStr);

			var $jtestnums = $(".dyctestnums li");

			$('.dyctestsystem-box-select').click(function() {
				if($(this).parent().attr('data-isclick') == 'true') {
					$(this).parent().attr('data-isclick', 'false');
					$(this).siblings().removeClass('active');
					$(this).addClass('active');
					$(this).parent().find('.dycanasysis').css("display", "block");

					var index = $(this).siblings('.dyctestsystem-box-title').children('.dyctestsystem-num').html() - 1;
					if($(this).attr("data-id") == $(this).parent().attr("data-answer")) {
						$htmlanswer = "您的答案：<span class='dycanswerright'><i class='uk-icon-check'></i></span>";
						$($jtestnums[index]).removeClass().addClass('dyccorect');
						$score += parseFloat($(this).parent().attr("data-score"));
					} else {
						$htmlanswer = "<div>您的答案：<span class='dycanswerwrong'>x</span>";
						$($jtestnums[index]).removeClass().addClass('dycerror');
						$rightnum += 1;
					}
					$(this).parent().find('.dycanswer').html($htmlanswer);
					$num = $('#jtestsystembox').children().find('.active').length;
					$("#jtestcard").html("试题数：" + result[0].totalCount + "题<br/>错答题：" + $rightnum + "题<br/>未答题: " + (result[0].totalCount - $num) + "题<br/>总 分：" + result[0].totalScore + "分<br/>总得分: " + $score + "分");
				} else {
					return false;
				}

			});

			//页码

			pages(pageIndex, result[0].totalPageCount, $("#jsubjectlistpage"));
			var $jsubPage = $('#jsubjectlistpage li a');

			$jsubPage.click(function() {
				var num = $jsubPage.index(this);
				if(num && (num < $jsubPage.length - 1)) {
					pageIndex = num;
				} else if((num == "0") && (pageIndex > 1)) {
					pageIndex -= 1;
				} else if((num == ($jsubPage.length - 1)) && (pageIndex < $jsubPage.length - 2)) {
					pageIndex += 1;
				}
				$.jmachineTesttime(id, pageIndex);

				/*$.scrollTo(1950, 0);*/
			});

		},
		error: function(err) {
			console.log(err);
		}
	});
};

//题库测试题--全真模拟
$.jtestBox = function(id, pageIndex, answer) {
	var $jtestBox = $("#jtestsystembox"),
		$jtestNums = $("#jtestnums"),
		$jtestHead = $('#jtesthead'),
		$headStr = "",
		$numsStr = "",
		$titleStr = "",
		$htmlStr = "";

	$.ajax({
		type: "GET",
		url: ROUTE + "ExamQuestion.ashx?action=getExamQuestionByPaperId",
		dataType: "json",
		asynch: false,
		data: {
			"memberId": $mid,
			"examPaperId": id,
			"pageIndex": pageIndex,
			"pageSize": 10
		},
		success: function(result) {
			$("#jtestcard").html("试题数：" + result[0].totalCount + "题<br/>" + "错答题：0题<br/> " + "未答题：" + result[0].totalCount + "题<br/>" + "总 分：" + result[0].totalScore + "分");

			result[0].rows.forEach(function(value, index) {
				var $optionStr = "";
				$titleStr = "<div class='dyctestsystem-box' data-pId=" + value.examPaperId + " data-eId=" + value.examQuestionId + " data-qId=" + value.questionBankId + " data-score = " + value.point + " data-answer = " + value.rightAnswer + "><div class='dyctestsystem-box-title'><span class='dyctestsystem-num'>" + value.questionNo + "</span>[<span class='input' contenteditable='true'></span>]" + value.title + "</div>";
				if(answer[value.questionNo] != null) {
					value.questionOptions.forEach(function(valueoption, indexs) {
						if(valueoption.optionNo == answer[value.questionNo][0]) {
							$optionStr += "<p class='dyctestsystem-box-select active' data-id=" + valueoption.optionNo + ">[ " + valueoption.optionNo + " ] " + valueoption.questionOption + "</p>";
						} else {
							$optionStr += "<p class='dyctestsystem-box-select' data-id=" + valueoption.optionNo + ">[ " + valueoption.optionNo + " ] " + valueoption.questionOption + "</p>";
						}
					});

				} else {
					value.questionOptions.forEach(function(valueoption, indexs) {
						$optionStr += "<p class='dyctestsystem-box-select' data-id=" + valueoption.optionNo + ">[ " + valueoption.optionNo + " ] " + valueoption.questionOption + "</p>";
					});
				}
				$headStr = value.name;
				$htmlStr += $titleStr + $optionStr + "<div class='dycanasysis'></div></div>";
			});
			$jtestHead.html($headStr);
			$jtestBox.html($htmlStr);
			$('.dyctestsystem-box-select').click(function() {
				$(this).siblings().removeClass('active');
				$(this).addClass('active');
				//保存当前页答案

				var xuhao = $(this).siblings('.dyctestsystem-box-title').children('.dyctestsystem-num').html();
				var ans = new Array();
				ans[0] = $(this).attr('data-id');
				ans[1] = $(this).parent().attr("data-eid");
				ans[2] = $(this).parent().attr("data-qid");
				var score = $(this).parent().attr("data-score");
				var rightanswer = $(this).parent().attr("data-answer");
				if(ans[0] == rightanswer) {
					ans[3] = score;
				} else {
					ans[3] = 0;
				}
				answer[xuhao] = ans;

			});

			for(var i = 0; i < result[0].totalCount; i++) {
				$numsStr += "<li class='dycnoanswer'>" + (i + 1) + "</li>";
			}
			$jtestNums.html($numsStr);

			//页码
			pages(pageIndex, result[0].totalPageCount, $("#jsubjectlistpage"));

			var $jsubPage = $('#jsubjectlistpage li a');
			$jsubPage.click(function() {
				var num = $jsubPage.index(this);
				if(num && (num < $jsubPage.length - 1)) {
					pageIndex = num;
				} else if((num == "0") && (pageIndex > 1)) {
					pageIndex -= 1;
				} else if((num == ($jsubPage.length - 1)) && (pageIndex < $jsubPage.length - 2)) {
					pageIndex += 1;
				}
				$.jtestBox(id, pageIndex, answer);

			});

		},
		error: function(err) {
			console.log(err);
		}
	});

	return answer;
};

//题库测试题-错题
$.jquestionTest = function(id, pageIndex, answer) {
	var $jtestBox = $("#jtestsystembox"),
		$jtestNums = $("#jtestnums"),
		$jtestHead = $('#jtesthead'),
		$headStr = "",
		$numsStr = "",
		$titleStr = "",
		$htmlStr = "";

	$.ajax({
		type: "GET",
		url: ROUTE + "ExamQuestion.ashx?action=getExamQuestionBymemberId",
		dataType: "json",
		asynch: false,
		data: {
			"memberId": 12,
			"examPaperId": id,
			"pageIndex": pageIndex,
			"pageSize": 10
		},
		success: function(result) {
			$(".dyctestcard").css('display', 'none');

			result[0].rows.forEach(function(value, index) {
				var $optionStr = "";
				$titleStr = "<div class='dyctestsystem-box' data-pId=" + value.examPaperId + " data-eId=" + value.examQuestionId + " data-qId=" + value.questionBankId + " data-score = " + value.point + "  data-num = " + value.questionNo + "  data-answer = " + value.rightAnswer + " ><div class='dyctestsystem-box-title'><span class='dyctestsystem-num'>" + (index + 1) + "</span>[<span class='input' contenteditable='true'></span>]" + value.title + "</div>";
				if(answer[value.questionNo] != null) {
					value.questionOptions.forEach(function(valueoption, indexs) {
						if(valueoption.optionNo == answer[value.questionNo][0]) {
							$optionStr += "<p class='dyctestsystem-box-select active' data-id=" + valueoption.optionNo + ">[ " + valueoption.optionNo + " ] " + valueoption.questionOption + "</p>";
						} else {
							$optionStr += "<p class='dyctestsystem-box-select' data-id=" + valueoption.optionNo + ">[ " + valueoption.optionNo + " ] " + valueoption.questionOption + "</p>";

						}
					});

				} else {
					value.questionOptions.forEach(function(valueoption, indexs) {
						$optionStr += "<p class='dyctestsystem-box-select' data-id=" + valueoption.optionNo + ">[ " + valueoption.optionNo + " ] " + valueoption.questionOption + "</p>";
					});
				}
				$headStr = value.name;
				$htmlStr += $titleStr + $optionStr + "<div class='dycanasysis'></div></div>";
			});
			$jtestHead.html($headStr);
			$jtestBox.html($htmlStr);
			$('.dyctestsystem-box-select').click(function() {
				$(this).siblings().removeClass('active');
				$(this).addClass('active');
				//保存当前页答案

				var xuhao = $(this).parent().attr("data-num");
				var ans = new Array();
				ans[0] = $(this).attr('data-id');
				ans[1] = $(this).parent().attr("data-eid");
				ans[2] = $(this).parent().attr("data-qid");
				var score = $(this).parent().attr("data-score");
				var rightanswer = $(this).parent().attr("data-answer");
				if(ans[0] == rightanswer) {
					ans[3] = score;
				} else {
					ans[3] = 0;
				}
				answer[xuhao] = ans;

			});

			for(var i = 0; i < result[0].totalCount; i++) {
				$numsStr += "<li class='dycnoanswer'>" + (i + 1) + "</li>";
			}
			$jtestNums.html($numsStr);

			//页码
			pages(pageIndex, result[0].totalPageCount, $("#jsubjectlistpage"));

			var $jsubPage = $('#jsubjectlistpage li a');
			$jsubPage.click(function() {
				var num = $jsubPage.index(this);
				if(num && (num < $jsubPage.length - 1)) {
					pageIndex = num;
				} else if((num == "0") && (pageIndex > 1)) {
					pageIndex -= 1;
				} else if((num == ($jsubPage.length - 1)) && (pageIndex < $jsubPage.length - 2)) {
					pageIndex += 1;
				}
				$.jquestionTest(id, pageIndex, answer);

			});

		},
		error: function(err) {
			console.log(err);
		}
	});

	return answer;
};

//题库-交卷
$.clickTestpost = function(pId, eId, ac) {
	$('#jtestpost').click(function() {
		if(($mid != undefined) && ($mid != "") && ($mid != null)) {
			var examQuestions = "",
				score = 0,
				totalscore = 0;

			for(var i = 1; i < ac.length; i++) {
				var epId = $($('#jtestsystembox').children().find('.active')).parent().attr("data-pid");
				if(ac[i] != null) {
					var answer = ac[i][0];
					var examQuestionId = ac[i][1];
					var questionBankId = ac[i][2];
					score = ac[i][3];
					totalscore += parseFloat(score);

					if(i < ac.length - 1) {
						examQuestions += '{"examQuestionId":' + '"' + examQuestionId + '",' + '"answer":' + '"' + answer + '",' + '"questionBankId":' + '"' + questionBankId + '",' + '"score":' + '"' + score + '"},';
					} else if(i == ac.length - 1) {
						examQuestions += '{"examQuestionId":' + '"' + examQuestionId + '",' + '"answer":' + '"' + answer + '",' + '"questionBankId":' + '"' + questionBankId + '",' + '"score":' + '"' + score + '"}';
					}
				}
			}

			examQuestions = "[" + examQuestions + "]";
			if(ac.length == '0') {
				layer.confirm("您还未答题，确定提交？", {
					btn: ['确定', '取消'],
				}, function() {
					if(eId == undefined) {
						$.jtestPost(0, pId, epId, totalscore, examQuestions, ac); //机考、每日一练
					} else {
						if(qbId == undefined) {
							$.jtestPost(1, pId, eId, totalscore, examQuestions, ac); //全真模拟
						} else {
							$.jtestPost(1, pId, eId, totalscore, examQuestions, ac, qbId); //全真模拟
						}
					}
				});
			} else {
				if(eId == undefined) {
					$.jtestPost(0, pId, epId, totalscore, examQuestions, ac); //机考、每日一练
				} else {
					if(qbId == undefined) {
						$.jtestPost(1, pId, eId, totalscore, examQuestions, ac); //全真模拟
					} else {
						$.jtestPost(1, pId, eId, totalscore, examQuestions, ac, qbId); //全真模拟
					}

				}
			}

		} else {
			alert('您还未登录~')
		}
	});
}

//题库-提交测试题
$.jtestPost = function(testtype, id, eid, totalScore, examQuestions, ans, qbid) {
	var $jtestPost = $("#jtestpost"),
		$htmlStr = "";

	$.ajax({
		type: "POST",
		url: ROUTE + "MemberExam.ashx?action=examPaperCommit",
		dataType: "json",
		data: {
			"memberId": $mid,
			"paperTypeId": id,
			"examPaperId": eid,
			"totalScore": totalScore,
			"examQuestions": examQuestions
		},
		success: function(result) {
			if(result == '200') {
				layer.msg("提交成功,即将出答案结果~");
				setTimeout(function() {
					if(qbid == '1') {
						jquestionAnalysis(eid, 1, ans);
					} else {
						if(testtype == '0') {
							jmachineAnalysis(id, 1, ans, totalScore);
						} else {
							jtestAnalysis(eid, 1, ans, totalScore);
						}
					}
				}, 2000)

			} else {
				layer.msg("提交失败");
				return false;
			}

		},
		error: function(err) {
			console.log(err);
		}
	});
};

//题库测试题--错题-解析
jquestionAnalysis = function(id, pageIndex, answer, totalScore) {
	var $jtestAnalysis = $(".dycanasysis"),
		$jtestBox = $("#jtestsystembox"),
		$jtestnums = $("#jtestnums li"),
		$rightnum = 0,
		$totalStr = "",
		$htmlStr = "";

	$.ajax({
		type: "GET",
		url: ROUTE + "ExamQuestion.ashx?action=getExamQuestionBymemberId",
		dataType: "json",
		data: {
			"memberId": 12,
			"examPaperId": id,
			"pageIndex": pageIndex,
			"pageSize": 10
		},
		success: function(result) {

			result[0].rows.forEach(function(value, index) {
				var $optionStr = "";
				$titleStr = "<div class='dyctestsystem-box' data-pId=" + value.examPaperId + " data-eId=" + value.examQuestionId + " data-qId=" + value.questionBankId + " data-score = " + value.point + " data-answer = " + value.rightAnswer + "><div class='dyctestsystem-box-title'><span class='dyctestsystem-num'>" + (index + 1) + "</span>[<span class='input' contenteditable='true'></span>]" + value.title + "</div>";

				if(answer[value.questionNo] != null) { //判断是否有答题
					value.questionOptions.forEach(function(valueoption, indexs) {
						if(valueoption.optionNo == answer[value.questionNo][0]) { //判断所选答案
							$optionStr += "<p class='dyctestsystem-box-select active' data-id=" + valueoption.optionNo + ">[ " + valueoption.optionNo + " ] " + valueoption.questionOption + "</p>";
						} else {
							$optionStr += "<p class='dyctestsystem-box-select' data-id=" + valueoption.optionNo + ">[ " + valueoption.optionNo + " ] " + valueoption.questionOption + "</p>";
						}
					});

					if((answer[value.questionNo][0] != '') && (answer[value.questionNo][0] == value.rightAnswer)) { //判断答案是否正确
						$htmlStr = "<div>您的答案：<span class='dycanswerright'><i class='uk-icon-check'></i></span></div><p>正确答案：" + value.rightAnswer + "</p><div class='dycansweranasysis'><p>试题解析：</p>" + value.analysis + "</div>";

					} else {
						$htmlStr = "<div>您的答案：<span class='dycanswerwrong'>x</span></div><p>正确答案：" + value.rightAnswer + "</p><div class='dycansweranasysis'><p>试题解析：</p>" + value.analysis + "</div>";
					}

				} else { //未答题错误
					$htmlStr = "<div>您的答案：<span class='dycanswerwrong'>x</span></div><p>正确答案：" + value.rightAnswer + "</p><div class='dycansweranasysis'><p>试题解析：</p>" + value.analysis + "</div>";
					value.questionOptions.forEach(function(valueoption, indexs) {
						$optionStr += "<p class='dyctestsystem-box-select' data-id=" + valueoption.optionNo + ">[ " + valueoption.optionNo + " ] " + valueoption.questionOption + "</p>";
					});
				}

				$totalStr += $titleStr + $optionStr + "<div class='dycanasysis'>" + $htmlStr + "</div></div>";
			});
			$jtestBox.html($totalStr);
			for(var i = 0; i < result[0].totalCount; i++) {
				$($jtestnums[i]).removeClass().addClass('dycerror');
				if(answer[(i + 1)] != undefined) {
					if(answer[(i + 1)][3] != '0') {
						$($jtestnums[i]).removeClass().addClass('dyccorect');
						$rightnum += 1;
					} else {
						$($jtestnums[i]).removeClass().addClass('dycerror');
					}
				}

			}

			$('#jtestpost').css("display", "none");

			//页码
			pages(pageIndex, result[0].totalPageCount, $("#jsubjectlistpage"));
			var $jsubPage = $('#jsubjectlistpage li a');
			$jsubPage.click(function() {
				var num = $jsubPage.index(this);
				if(num && (num < $jsubPage.length - 1)) {
					pageIndex = num;
				} else if((num == "0") && (pageIndex > 1)) {
					pageIndex -= 1;
				} else if((num == ($jsubPage.length - 1)) && (pageIndex < $jsubPage.length - 2)) {
					pageIndex += 1;
				}
				jquestionAnalysis(id, pageIndex, answer);
			});

		},
		error: function(err) {
			console.log(err);
		}
	});
};

//题库测试题--机考系统-解析
jmachineAnalysis = function(id, pageIndex, answer, totalScore) {
	var $jtestAnalysis = $(".dycanasysis"),
		$jtestBox = $("#jtestsystembox"),
		$jtestnums = $("#jtestnums li"),
		$rightnum = 0,
		$htmlStr = "",
		$totalStr = "";

	$.ajax({
		type: "GET",
		url: ROUTE + "ExamPaper.ashx?action=getExamPaperByTypeId",
		dataType: "json",
		data: {
			"paperTypeId": id,
			"pageIndex": pageIndex,
			"pageSize": 10
		},
		success: function(result) {
			result[0].rows.forEach(function(value, index) {
				var $optionStr = "";
				$titleStr = "<div class='dyctestsystem-box' data-pId=" + value.examPaperId + " data-eId=" + value.examQuestionId + " data-qId=" + value.questionBankId + " data-score = " + value.point + " data-answer = " + value.rightAnswer + "><div class='dyctestsystem-box-title'><span class='dyctestsystem-num'>" + value.questionNo + "</span>[<span class='input' contenteditable='true'></span>]" + value.title + "</div>";
				if(answer[value.questionNo] != null) { //判断是否有答题
					value.questionOptions.forEach(function(valueoption, indexs) {
						if(valueoption.optionNo == answer[value.questionNo][0]) { //判断所选答案
							$optionStr += "<p class='dyctestsystem-box-select active' data-id=" + valueoption.optionNo + ">[ " + valueoption.optionNo + " ] " + valueoption.questionOption + "</p>";
						} else {
							$optionStr += "<p class='dyctestsystem-box-select' data-id=" + valueoption.optionNo + ">[ " + valueoption.optionNo + " ] " + valueoption.questionOption + "</p>";
						}
					});

					if((answer[value.questionNo][0] != '') && (answer[value.questionNo][0] == value.rightAnswer)) { //判断答案是否正确
						$htmlStr = "<div>您的答案：<span class='dycanswerright'><i class='uk-icon-check'></i></span></div><p>正确答案：" + value.rightAnswer + "</p><div class='dycansweranasysis'><p>试题解析：</p>" + value.analysis + "</div>";

					} else {
						$htmlStr = "<div>您的答案：<span class='dycanswerwrong'>x</span></div><p>正确答案：" + value.rightAnswer + "</p><div class='dycansweranasysis'><p>试题解析：</p>" + value.analysis + "</div>";
					}

				} else { //未答题错误
					$htmlStr = "<div>您的答案：<span class='dycanswerwrong'>x</span></div><p>正确答案：" + value.rightAnswer + "</p><div class='dycansweranasysis'><p>试题解析：</p>" + value.analysis + "</div>";
					value.questionOptions.forEach(function(valueoption, indexs) {
						$optionStr += "<p class='dyctestsystem-box-select' data-id=" + valueoption.optionNo + ">[ " + valueoption.optionNo + " ] " + valueoption.questionOption + "</p>";
					});
				}

				$totalStr += $titleStr + $optionStr + "<div class='dycanasysis'>" + $htmlStr + "</div></div>";
			});
			$jtestBox.html($totalStr);
			for(var i = 0; i < result[0].totalCount; i++) {
				$($jtestnums[i]).removeClass().addClass('dycerror');
				if(answer[(i + 1)] != undefined) {
					if(answer[(i + 1)][3] != '0') {
						$($jtestnums[i]).removeClass().addClass('dyccorect');
						$rightnum += 1;
					} else {
						$($jtestnums[i]).removeClass().addClass('dycerror');
					}
				}

			}

			$("#jtestcard").html("试题数：" + result[0].totalCount + "题<br/>" + "错答题：" + (result[0].totalCount - $rightnum) + "题<br/> " + "答对题：" + $rightnum + "题<br/>" + "总 分：" + result[0].totalScore + "分<br/>" + "总得分:" + totalScore + "分");
			$('#jtestpost').css("display", "none");

			//页码
			pages(pageIndex, result[0].totalPageCount, $("#jsubjectlistpage"));

			var $jsubPage = $('#jsubjectlistpage li a');
			$jsubPage.click(function() {
				var num = $jsubPage.index(this);
				if(num && (num < $jsubPage.length - 1)) {
					pageIndex = num;
				} else if((num == "0") && (pageIndex > 1)) {
					pageIndex -= 1;
				} else if((num == ($jsubPage.length - 1)) && (pageIndex < $jsubPage.length - 2)) {
					pageIndex += 1;
				}
				jmachineAnalysis(id, pageIndex, answer, totalScore);
			});
		},
		error: function(err) {
			console.log(err);
		}
	});
};

//题库测试题--全真模拟-解析
jtestAnalysis = function(id, pageIndex, answer, totalScore) {
	var $jtestAnalysis = $(".dycanasysis"),
		$jtestBox = $("#jtestsystembox"),
		$jtestnums = $("#jtestnums li"),
		$rightnum = 0,
		$totalStr = "",
		$htmlStr = "";

	$.ajax({
		type: "GET",
		url: ROUTE + "ExamQuestion.ashx?action=getExamQuestionByPaperId",
		dataType: "json",
		data: {
			"examPaperId": id,
			"pageIndex": pageIndex,
			"pageSize": 10
		},
		success: function(result) {
			/*result[0].rows.forEach(function(value, index) {
				if((answer[index] != '') && (answer[index] == value.rightAnswer)) {
					$htmlStr = "<div>您的答案：<span class='dycanswerright'><i class='uk-icon-check'></i></span></div><p>正确答案：" + value.rightAnswer + "</p><div class='dycansweranasysis'><p>试题解析：</p>" + value.analysis + "</div>";
					$($jtestnums[index]).removeClass().addClass('dyccorect');
					$score += parseFloat(value.point);
				} else {
					$htmlStr = "<div>您的答案：<span class='dycanswerwrong'>x</span></div><p>正确答案：" + value.rightAnswer + "</p><div class='dycansweranasysis'><p>试题解析：</p>" + value.analysis + "</div>";
					$($jtestnums[index]).removeClass().addClass('dycerror');
					$rightnum += 1;
				}

				$($jtestAnalysis[index]).html($htmlStr);
			});*/
			result[0].rows.forEach(function(value, index) {
				var $optionStr = "";
				$titleStr = "<div class='dyctestsystem-box' data-pId=" + value.examPaperId + " data-eId=" + value.examQuestionId + " data-qId=" + value.questionBankId + " data-score = " + value.point + " data-answer = " + value.rightAnswer + "><div class='dyctestsystem-box-title'><span class='dyctestsystem-num'>" + value.questionNo + "</span>[<span class='input' contenteditable='true'></span>]" + value.title + "</div>";

				if(answer[value.questionNo] != null) { //判断是否有答题
					value.questionOptions.forEach(function(valueoption, indexs) {
						if(valueoption.optionNo == answer[value.questionNo][0]) { //判断所选答案
							$optionStr += "<p class='dyctestsystem-box-select active' data-id=" + valueoption.optionNo + ">[ " + valueoption.optionNo + " ] " + valueoption.questionOption + "</p>";
						} else {
							$optionStr += "<p class='dyctestsystem-box-select' data-id=" + valueoption.optionNo + ">[ " + valueoption.optionNo + " ] " + valueoption.questionOption + "</p>";
						}
					});

					if((answer[value.questionNo][0] != '') && (answer[value.questionNo][0] == value.rightAnswer)) { //判断答案是否正确
						$htmlStr = "<div>您的答案：<span class='dycanswerright'><i class='uk-icon-check'></i></span></div><p>正确答案：" + value.rightAnswer + "</p><div class='dycansweranasysis'><p>试题解析：</p>" + value.analysis + "</div>";

					} else {
						$htmlStr = "<div>您的答案：<span class='dycanswerwrong'>x</span></div><p>正确答案：" + value.rightAnswer + "</p><div class='dycansweranasysis'><p>试题解析：</p>" + value.analysis + "</div>";
					}

				} else { //未答题错误
					$htmlStr = "<div>您的答案：<span class='dycanswerwrong'>x</span></div><p>正确答案：" + value.rightAnswer + "</p><div class='dycansweranasysis'><p>试题解析：</p>" + value.analysis + "</div>";
					value.questionOptions.forEach(function(valueoption, indexs) {
						$optionStr += "<p class='dyctestsystem-box-select' data-id=" + valueoption.optionNo + ">[ " + valueoption.optionNo + " ] " + valueoption.questionOption + "</p>";
					});
				}

				$totalStr += $titleStr + $optionStr + "<div class='dycanasysis'>" + $htmlStr + "</div></div>";
			});
			$jtestBox.html($totalStr);
			for(var i = 0; i < result[0].totalCount; i++) {
				$($jtestnums[i]).removeClass().addClass('dycerror');
				if(answer[(i + 1)] != undefined) {
					if(answer[(i + 1)][3] != '0') {
						$($jtestnums[i]).removeClass().addClass('dyccorect');
						$rightnum += 1;
					} else {
						$($jtestnums[i]).removeClass().addClass('dycerror');
					}
				}

			}

			$("#jtestcard").html("试题数：" + result[0].totalCount + "题<br/>" + "错答题：" + (result[0].totalCount - $rightnum) + "题<br/> " + "答对题：" + $rightnum + "题<br/>" + "总 分：" + result[0].totalScore + "分<br/>" + "总得分:" + totalScore + "分");
			$('#jtestpost').css("display", "none");

			//页码
			pages(pageIndex, result[0].totalPageCount, $("#jsubjectlistpage"));
			var $jsubPage = $('#jsubjectlistpage li a');
			$jsubPage.click(function() {
				var num = $jsubPage.index(this);
				if(num && (num < $jsubPage.length - 1)) {
					pageIndex = num;
				} else if((num == "0") && (pageIndex > 1)) {
					pageIndex -= 1;
				} else if((num == ($jsubPage.length - 1)) && (pageIndex < $jsubPage.length - 2)) {
					pageIndex += 1;
				}
				jtestAnalysis(id, pageIndex, answer, totalScore);
			});

		},
		error: function(err) {
			console.log(err);
		}
	});
};

//页码
function pages(pageIndex, totalPageCount, obj) {
	var $htmlPage = "",
		$jsubjectListpage = obj;

	for(var i = 0; i < totalPageCount; i++) {
		$htmlPage += "<li><a href='#this'>" + (i + 1) + "</a></li>"
	}

	$jsubjectListpage.html("<li><a href='#this'>上一页</a></li>" + $htmlPage + "<li><a href='#this'>下一页</a></li>");
	var $jsubPage = obj.find('a');

	if(totalPageCount == '0') {
		$jsubPage.css('display', 'none');
	} else if((pageIndex == '1') && (pageIndex == totalPageCount)) {
		$jsubPage.eq(0).css('display', 'none');
		$jsubPage.eq(parseInt(totalPageCount) + 1).css('display', 'none');
	} else if(pageIndex == '1') {
		$jsubPage.eq(0).css('display', 'none');
	} else if(pageIndex == (totalPageCount)) {
		$jsubPage.eq(parseInt(totalPageCount) + 1).css('display', 'none');
	}
	$jsubPage.eq(pageIndex).parent().addClass('active');

}

//观点支付页面
$.viewPay = function(id) {
	var $jMoney = $("#jmoney"),
		$jviewList = $("#jviewlist"),
		$htmlStr = "";
	$.ajax({
		type: "GET",
		url: ROUTE + "OrderDetail.ashx?action=getOrderListByOrderId",
		dataType: "json",
		data: {
			"memberId": $mid,
			"orderId": id,
			"orderTypeId": 1
		},
		success: function(result) {
			result[0].list.forEach(function(value, index) {
				$htmlStr = "<div class='dycsubmitorder-li'><a href='#this' class='ycimage'><img src='" + ROUTEFILE + value.iconPath + "' alt='课程' /></a><div class='dycsbcontent'><a class='yctitle' href='#this'>" + value.newsName + "</a><p class='ycbrief'>" + value.note + "</p></div><span class='dycsbprice'>" + value.preferentialPrice + "</span><span class='dycsbnumber'>1</span><span class='dycsbsubtotal'>" + value.totalPrice + "</span></div>"
			});
			$jviewList.html($htmlStr);
			$jMoney.html(result[0].preferentialTotalPrice);

		},
		error: function(err) {
			console.log(err);
		}
	});
};

//观点支付-立即支付
$.imPayment = function(payTypeId, orderId, id) {
	if(payTypeId == '2') {
		layer.open({
			type: 1,
			title: '播米币支付',
			area: ['360px', '360px'], //宽高
			content: "<div class='dycweixin-img' style='text-align:center;width:300px;height:200px;margin:50px auto 0;color:#606060;'><p style='text-align:center'>应付播米币：<span style='color: #df5e3f;font-size: 20px;'>￥" + $("#jmoney").html() + "</span></p><div style='margin-top:30px'><input id='jvalue' name='name' type='text' placeholder='输入验证码确认支付' /><a id='jvalid' style='margin-left:10px;background-color:#df5e3f;color:#fff;padding:4px 5px;'>获取短信验证码</a></div></div>",
			success: function() {

				$('#jvalid').click(function() { //点击获取验证码
					if($('#jvalid').text() == '获取短信验证码') {
						$.ajax({
							type: "post",
							url: ROUTE + "Member.ashx?action=getMemberMobById",
							data: {
								"memberId": $mid
							},
							dataType: "json",
							success: function(result) {
								$.ajax({
									type: "post",
									url: ROUTE + "Member.ashx?action=getConfirmCoinValidCode",
									data: {
										"name": result[0].mobile
									},
									dataType: "json",
									success: function(result) {
										changeVCShow($('#jvalid'));
									},
									error: function(err) {
										console.log(err);
									}
								});

							},
							error: function(err) {
								console.log(err);
							}
						});
					}
				});

			},
			btn: ['确认支付', '取消'],
			yes: function(index, layero) { //确认支付

				$.ajax({
					type: "post",
					url: ROUTE + "Pay.ashx?action=directPay",
					data: {
						"memberId": $mid,
						"amount": $("#jmoney").html(),
						"discount": 0,
						"orderId": orderId,
						"payTypeId": payTypeId,
						"couponReceiveId": 0,
						"orderTypeId": 1,
						"validateCode": $('#jvalue').val() //校验验证码是否正确
					},
					success: function(result) {
						if(result == '812') {
							layer.closeAll();
							$(".dyc-success-bg").show().delay(3000).fadeOut();
							setTimeout(function() {
								if(id == '0') { //购买包月
									window.location.href = "../news.html";
								} else {
									window.location.href = "newsdetail.html?newsId=" + id + "&newsTypeId=" + payTypeId;
								}

							}, 3000);
						} else if(result == '814') {
							layer.msg("支付失败，请重新支付");
						} else if(result == '819') {
							layer.closeAll();
							layer.msg("播米币余额不足，请换一种支付方式或充值播米币~");
						} else if(result == '805') {
							layer.msg("验证码输入错误，请重新输入");
						} else if(result == '818') {
							layer.closeAll();
							layer.msg('你已购买,无需在购买');
						} else {
							return false;
						}
					},
					error: function(err) {
						console.log(err);
					}
				});

			}
		});
	} else {
		if(payTypeId == '0') {
			var newWindow = window.open('about:blank');
		}
		$.ajax({
			type: "post",
			url: ROUTE + "Pay.ashx?action=directPay",
			data: {
				"memberId": $mid,
				"amount": $("#jmoney").html(),
				"discount": 0,
				"orderId": orderId,
				"payTypeId": payTypeId,
				"couponReceiveId": 0,
				"orderTypeId": 1
			},
			success: function(result) {
				if(result == '818') {
					layer.msg('你已购买,无需在购买')
				} else {
					if(payTypeId == '0') {
						newWindow.location.href = "turnpay.html?amount=" + $("#jmoney").html() + '&orderId=' + orderId + "&memberId=" + $mid + "&discount=0&couponReceiveId=0&orderTypeId=1";
						setTimeout(function() {
							layer.confirm("是否支付完成", {
								btn: ['重新选择支付方式', '支付完成'],
							}, function() {
								layer.closeAll('dialog');
								console.log("心选");
							}, function() {
								$.ajax({ //二次校验
									type: "post",
									url: ROUTE + "Pay.ashx?action=checkPaySuccess",
									dataType: "json",
									data: {
										"memberId": $mid,
										"orderId": orderId,
										"orderTypeId": 1
									},
									success: function(result) {
										if(result == '812') {
											$(".dyc-success-bg").show().delay(3000).fadeOut();
											setTimeout(function() {
												if(id == '0') { //购买包月
													window.location.href = "../news.html";
												} else {
													window.location.href = "newsdetail.html?newsId=" + id + "&newsTypeId=" + payTypeId;
												}
											}, 3000);
										}
										if(result == '814') {
											alert("未完成支付");
										} else {
											return false;
										}
									},
									error: function(err) {
										console.log(err);
									}
								});

							});
						}, 3000);
					} else if(payTypeId == '1') {
						var json = eval('(' + result + ')')
						setTimeout(function() {
							layer.open({
								type: 1,
								title: '微信支付',
								area: ['420px', '420px'], //宽高
								content: "<div class='dycweixin-img' style='text-align:center;width:200px;height:200px;line-height:200px;margin:50px auto 0'><img src=" + ROUTEFILE + json.iconPath + " /></div><p style='text-align:center'>应付金额：<span style='color: #df5e3f;font-size: 20px;'>￥" + $("#jmoney").html() + "</span></p>",
								success: function() {
									var t = 0;
									var xunhuan = setInterval(function() {
										$.ajax({ //二次校验
											type: "post",
											url: ROUTE + "Pay.ashx?action=checkPaySuccess",
											dataType: "json",
											data: {
												"memberId": $mid,
												"orderId": orderId
											},
											success: function(result) {
												if(result == '812') {
													clearInterval(xunhuan);
													layer.closeAll();
													$(".dyc-success-bg").show().delay(3000).fadeOut();
													setTimeout(function() {
														if(id == '0') { //购买包月
															window.location.href = "../news.html";
														} else {
															window.location.href = "newsdetail.html?newsId=" + id + "&newsTypeId=" + payTypeId;
														}
													}, 3000);

												}
												/*else if(result == '814'){
													t++;
													if(t>3){
														clearInterval(xunhuan);
														layer.closeAll();
														alert("支付超时,请重新打开~");
													}
												}*/

											},
											error: function(err) {
												console.log(err);
											}
										});
									}, 3000);
								}
							});
						}, 500);
					}

				}
			},
			error: function(err) {
				console.log(err);
			}
		});
	}
}

function changeVCShow(obj) { //短信验证码计时
	var time = 120;
	var tempCount = setInterval(function() {
		obj.text(time-- + "s");
	}, 1000)

	setTimeout(function() {
		obj.text("获取短信验证码");
		clearInterval(tempCount);
	}, 121000);
}

//活动公告页面
$.jTutorial = function(id) {
	var $jtutrial = $("#jtutrial");
	$.ajax({
		type: "GET",
		url: ROUTE + "Notice.ashx?action=getNoticeContentById",
		dataType: "json",
		data: {
			"noticeId": id
		},
		success: function(result) {
			$jtutrial.html(result[0].content);
		},
		error: function(err) {
			console.log(err);
		}
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

//修改备案名
var curWwwPath = window.document.location.href;
//获取主机地址之后的目录，如： /ems/Pages/Basic/Person.jsp
var pathName = window.document.location.pathname;
var pos = curWwwPath.indexOf(pathName);
//获取主机地址，如： http://localhost:8080
var localhostPath = curWwwPath.substring(0, pos);

if(curWwwPath.indexOf('http://188.ttcm755.cn/') != '-1') {
	$('.dyc-icp').html('金创互动科技（深圳）有限公司  备案号：粤ICP备16102940号-1');
}

//检测是否安装了flash 
function flashChecker() {
	var hasFlash = 0;　

	if(document.all) {
		var swf = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
		if(swf) {
			hasFlash = 1;
		}
	}
	if((navigator.userAgent.indexOf("MSIE") > 0)) {
		if(navigator.plugins && navigator.plugins.length > 0) {
			var swf = navigator.plugins["Shockwave Flash"];
			if(swf) {
				hasFlash = 1;
			}
		}

	} else {
		if(navigator.userAgent.indexOf("Firefox") > 0 || navigator.userAgent.indexOf("Chrome")) {
			var swf = navigator.plugins["Shockwave Flash"];
			if(swf) {
				hasFlash = 1;
			}
		}
	}
	return {
		f: hasFlash
	};
}

var fls = flashChecker();
var s = "";
var oPlay = $('.video');
if(!fls.f) {
	oPlay.html("<p style='width:100%;height:500px;line-height:500px;text-align:center;font-size:24px;background-color:#232323;color:#fff'>您的浏览器未安装Flash插件，<a target='_blank' href='http://get.adobe.com/cn/flashplayer/' >现在安装？</a></p>");

}