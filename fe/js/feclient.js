var manageOpenFlag = true; //是否开启了管理员查看模式
//var userType = 0; //默认一般游客
var $mid = $(window).storager({
	key: 'feUid'
}).readStorage();
var $mUserIcon = $(window).storager({
	key: 'feUIcon'
}).readStorage();
var $type = $(window).storager({
	key: 'feUType'
}).readStorage();

var isFresh = true,
	isFresh2 = true;

var scuserId = "";

var aWordType = "";

function getNowFormatDate() {
	var date = new Date();
	var seperator1 = "-";
	var seperator2 = ":";
	var month = date.getMonth() + 1;
	var strDate = date.getDate();
	if(month >= 1 && month <= 9) {
		month = "0" + month;
	}
	if(strDate >= 0 && strDate <= 9) {
		strDate = "0" + strDate;
	}
	var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate +
		" " + date.getHours() + seperator2 + date.getMinutes() +
		seperator2 + date.getSeconds();
	return currentdate;
}

function timeStampToTime(now) {
	now = new Date(now);
	var year = now.getFullYear();
	var month = now.getMonth() + 1;
	var date = now.getDate();
	var hour = now.getHours();
	var minute = now.getMinutes();
	var second = now.getSeconds();
	return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
}

(function() {
	var d = document,
		w = window,
		p = parseInt,
		dd = d.documentElement,
		db = d.body,
		dc = d.compatMode == 'CSS1Compat',
		dx = dc ? dd : db,
		ec = encodeURIComponent;

	var tempObjArr = [], //当前临时对象组
		objIndex = 0; //当前对象下标

	w.CHAT = {
		msgObj: d.getElementById("message"),
		//	screenheight:w.innerHeight ? w.innerHeight : dx.clientHeight,
		username: null,
		userImg: null,
		userType: null,
		userid: null,
		socket: null,

		//让浏览器滚动条保持在最低部
		scrollToBottom: function(height) {
			w.scrollTo(0, height);
		},
		//退出，本例只是一个简单的刷新
		logout: function() {
			this.socket.disconnect();
			//location.reload();
		},
		//提交聊天消息内容
		submit: function(type, eleObj) {

			var times = (new Date()).getTime();
			var content = d.getElementById("content").innerHTML;
			if(content != '' && content != "<div><br></div><div><br></div>") {
				var obj = {
					type: 'content',
					userid: this.userid,
					username: this.username,
					userImg: this.userImg,
					userType: this.userType, //1老师，2是家长
					content: content,
					subTime: times,
					tId: this.tId,
					userVartar: this.userImg, //$mUserIcon
				};

				this.socket.emit('meeting', obj);
				//CHAT.submitMessage(obj); //聊天 :local
				$(".messagePanel").mCustomScrollbar("update");

				d.getElementById("content").innerHTML = '';
				setTimeout(function() {
					d.getElementById("content").innerHTML = '';
				}, 100);
				setTimeout(function() {
					$(".messagePanel").mCustomScrollbar("scrollTo", $("#chat").height());
				}, 100)

			}
			return false;
		},

		//create userId
		genUid: function() {
			if($mid == null || $mid == undefined || $mid == "" || $mid == "undefined") {
				return new Date().getTime() + "" + Math.floor(Math.random() * 899 + 100);
			} else {
				return(Array(6).join('1') + $mid).slice(-6);
			}
		},
		//更新系统消息，本例中在用户加入、退出的时候调用
		updateSysMsg: function(o, action) {
			var onlineUsers = o.onlineUsers;
			//当前在线人数
			var parentCount = onlineUsers.onlineParentCount;
			var parentHtmlStr = "";

			//var onlineAddArr = o.onlineUsersAddr; //server ip address
			var teacherGroup = new Array; //老师组
			var parentGroup = new Array; //家长组
			var studentGroup = new Array; //游客组

			for(var i in onlineUsers) {
				if(typeof onlineUsers[i] == 'object') {
					if(onlineUsers[i].userType == 2){//家长组
						parentHtmlStr +="<li><a><span><img src="+SERVERROOTFILE+ onlineUsers[i].userImg+"  /></span>"+onlineUsers[i].nickName+"</a></li>"
					}else if(onlineUsers[i].userType == 3){//老师组
						console.log(3)
					}
				}
			}
			$('#jparentlist').html(parentHtmlStr);
			$('#jnowtotal').text(parentCount);
		},

		init: function(username, userImg, userType, ipAddress, formUrl, keyWord, mid, channelId, teacherId, noteInf) {
			/*
			客户端根据时间和随机数生成uid,这样使得聊天室用户名称可以重复。
			实际项目中，如果是需要用户登录，那么直接采用用户的uid来做标识就可以
			*/
			this.userid = this.genUid();
			this.username = username;
			this.userImg = userImg;
			this.userType = userType;
			this.noteInf = noteInf;
			this.userAddress = ipAddress;
			this.keyWord = keyWord;
			this.tId = teacherId;
			this.scrollToBottom();
			this.formType = "PC_LIVEROOM";
			//连接websocket后端服务器
			//this.socket = io.connect('ws://realtime.plhwin.com');
			this.socket = io.connect('http://106.14.210.98:3000');
			//this.socket = io.connect('http://192.168.101.186:3000');
			//this.socket = io.connect('http://192.168.0.3:3000');

			scuserId = this.userid;
			var uid = scuserId.substr(scuserId.length - 4);

			var currentTime = new Date();
			var loginTime = currentTime.getTime();
			var enterTimeFormat = getNowFormatDate()

			//告诉服务器端有用户登录
			this.socket.emit('login', {
				userid: this.userid,
				username: this.username,
				userImg: this.userImg,
				userAddress: this.userAddress,
				userType: this.userType, //3是老师，2是家长
				noteInf: this.noteInf,
				userVartar: $mUserIcon,
				keyWord: this.keyWord,
				loginTime: loginTime,
				enterTime: enterTimeFormat,
				formType: this.formType,
				mid: mid,
				tId: this.tId,
				channelId: channelId
			});

			//监听新用户登录
			this.socket.on('login', function(o) {
				CHAT.updateSysMsg(o, 'login');
			});

			//监听用户退出
			this.socket.on('logout', function(o) {
				CHAT.updateSysMsg(o, 'logout');
			});

			var _this = this;

			/*var onlineAddArr = obj.onlineUsersAddr;
			console.log(onlineAddArr)*/
			if(userType == "3" || userType == 3) {
				_this.socket.emit('joinT', teacherId); //老师组

			} else if(userType == "2" || userType == 2) {
				_this.socket.emit('joinP', teacherId); //家长组
			}

			//监听用户退出
			this.socket.on('logout', function(o) {
				CHAT.updateSysMsg(o, 'logout');
			});

			$("#jsendImgPanel").change(function(e) {
				var file = $(this).get(0).files[0];
				r = new FileReader(); //本地预览
				r.onload = function() {
					var img = document.createElement("img");
					img.src = r.result;
					//CHAT.submit(2, r.result);
					$("#content").append(img);
				}
				r.readAsDataURL(file); //Base64
			});

			//初始数据
			var flag = true;
			this.socket.on('init_msg', function(obj) {
				if(flag == false) {
					return false;
				}
				flag = false;

				if(!isFresh2) {
					return false;
				}

				isFresh2 = false;

				for(var i = 0; i < obj.length; i++) {
					if(typeof(obj[i]) == 'object' && obj[i] != null) {
						if(obj[i].type == 'content') {
							CHAT.submitMessage(obj[i]); //聊天
						}
					} else {
						var section = d.createElement('span');
						section.innerHTML = '<style>.ycmessage' + obj[i] + '{display:none}</style>';
						CHAT.msgObj.appendChild(section);
					}
				}
				$(".messagePanel").mCustomScrollbar("update");
			});

			//监听消息发送
			this.socket.on('meeting', function(obj) {
				if(typeof(obj) == 'object' && obj != null) {
					if(obj.type == 'content') {
						CHAT.submitMessage(obj); //聊天
					}
					$(".messagePanel").mCustomScrollbar("update");
				}
			});

		},

		//聊天发送整合
		submitMessage: function(obj) {
			var uid = obj.userid.substr(obj.userid.length - 4);
			var usernameImg = '<div class="dycadmin-admin-img "><img src=' + SERVERROOT + obj.userVartar + '></div>';
			var usernameDiv = '<span class="dycplayname"><span class="ycuserName">' + obj.username + '：</span></span>';
			var section = d.createElement('div');
			section.className = 'dycdiscuss-box-admin clearfix sendContent ycmessage ' + obj.subTime;
			section.innerHTML = '<div class="dycadmin-box "><div class="dycadmin dycadmin-admin"><span class="bmsendMessageTime">' + timeStampToTime(obj.subTime) + '</span></div>' + usernameDiv + obj.content + '</div>';

			CHAT.msgObj.appendChild(section);
			setTimeout(function() {
				$(".messagePanel").mCustomScrollbar("scrollTo", $("#message").height());
			}, 100)
		}

	};

	//通过“回车”提交信息
	d.getElementById("content").onkeydown = function(e) {
		e = e || event;
		if(e.keyCode === 13) {
			CHAT.submit();
		}

	};

})();
$(function() {
	var username = "游客",
		userImg, userType,
		keyWord = "",
		formUrl = "",
		noteInf = "";
	
	var $mid = $(window).storager({
		key: 'feUid'
	}).readStorage();
	var $mUserIcon = $(window).storager({
		key: 'feUIcon'
	}).readStorage();
	var $type = $(window).storager({
		key: 'feUType'
	}).readStorage();
	
	var channelId = $(this).getUrlParam("channelId");
	var channelProgramId = $(this).getUrlParam("channelProgramId");
	var teacherId = $(this).getUrlParam("teacherId");

	if($mid != null && $mid != undefined && $mid != ""){
		username = $(window).storager({
			key: 'feUNickName'
		}).readStorage();
		userImg = $mUserIcon;
		userType = $type;
		if($type == 1) {
			$type = 'student'
		} else if($type == 2) {
			$type = 'parent'
		} else if($type == 3) {
			$type = 'teacher'
		}
		clientIp($mid);
	} else {
		layer.msg('您没有该直播权限，无法观看！');
		setTimeout(function() {
			window.location.href = ROOT;
		}, 1000)
	}

	getLiveSource(channelId, channelProgramId); //获取视频源
	getParentList($mid, $type); //获取家长列表

	liveTab(); //头部切换

	//get form ip
	var c = true;

	function clientIp(mid) {
		$.ajax({
			url: "http://ip.chinaz.com/getip.aspx",
			type: "get",
			dataType: 'jsonp',
			timeout: 300,
			success: function(res) {
				cIP = res.address;

				window.CHAT.init(username, userImg, userType, cIP, formUrl, keyWord, mid, channelId, teacherId, noteInf); //等级名称userGrade[0]，等级序号userGrade[1]
				if(c) {
					//getLiveSource();
					c = false;
				}
			},
			error: function(res) {
				window.CHAT.init(username, userImg, userType, "127.0.0.1", formUrl, keyWord, mid, channelId, teacherId, noteInf); //等级名称userGrade[0]，等级序号userGrade[1]
				if(c) {
					//	getLiveSource();
					c = false;
				}
			}
		});
		if(isFresh) {
			//$(".messagePanel").mCustomScrollbar();
			isFresh = false;
		}

	}

	$(".liveSendTools .icon").on("click", function(event) {
		if(!$('#sinaEmotion').is(':visible')) {
			$(this).sinaEmotion();
			event.stopPropagation();
		}
	});
	$("#message").on("click", ".ycuserName", function(e) { //@
		$("#content").html($("#content").html() + "<span class='ycsendIcon'>@" + "</span>" + $(this).context.innerText);
	})
	/*//格式刷
	$(".bmliveSendTools .bmFormat").on("click", function() {
		$("#content").text($("#content").text());
	})*/

	function createPlayer(URL, URL1, playHeight) {
		if(flashChecker().f == 0) {
			$("#livePlayer").before('<a href="http://get.adobe.com/cn/flashplayer/" target="_blank" class="noFlashTips">检查到您的系统未安装Flash,请先安装</a>');
		}
		var objectPlayer = new aodianPlayer({
			container: 'livePlayer', //播放器容器ID，必要参数
			/*rtmpUrl: URL, //控制台开通的APP rtmp地址，必要参数*/
			hlsUrl: URL1, //控制台开通的APP hls地址，必要参数
			/* 以下为可选参数*/
			width: '100%', //播放器宽度，可用数字、百分比等
			height: playHeight, //播放器高度，可用数字、百分比等
			autostart: false, //是否自动播放，默认为false
			bufferlength: '1', //视频缓冲时间，默认为3秒。hls不支持！手机端不支持
			maxbufferlength: '2', //最大视频缓冲时间，默认为2秒。hls不支持！手机端不支持
			stretching: '2', //设置全屏模式,1代表按比例撑满至全屏,2代表铺满全屏,3代表视频原始大小,默认值为1。hls初始设置不支持，手机端不支持
			controlbardisplay: 'enable', //是否显示控制栏，值为：disable、enable默认为disable。
			adveDeAddr: 'images/temp/live.jpg', //封面图片链接
			adveWidth: '100%', //封面图宽度
			adveHeight: 530, //封面图高度
			//adveReAddr: '',//封面图点击链接
			//isclickplay: false,//是否单击播放，默认为false
			isfullscreen: true //是否双击全屏，默认为true
		});

		/*$('#livePlayer').on('click',function(){
			objectPlayer.pausePlay()
		})*/
	}
	$('.livePlayer').click(function() {
		alert(111)

	})

	function getLiveSource(id, pid) {
		$.ajax({
			type: "get",
			url: SERVERROOTDATA + "Channel.ashx?action=getLiveAddrByProgramId",
			dataType: 'json',
			data: {
				channelId: id,
				channelProgramId: pid, //类型
			},
			timeout: 600,
			success: function(res) {
				if(res.length < 2) {
					layer.msg('没有该直播间')
					return false;
				} else {

					$('#jliveTeacherInf .livename').html(res.rows[0].channelProgramName);
					createPlayer(res.rows[0].rtmpUrl, res.rows[0].hlsUrl, $("#jplayerHeight").height());
				}
			},
			error: function() {
				console.log("request error");
			}
		});
	}

	function liveTab() {
		$('#livetab').on('click', 'a', function() {
			var num = $(this).attr('data-id');
			$(this).siblings('a').removeClass('active');
			$(this).addClass('active');
			$('.liveRightCon').css('display', 'none');
			$('.liveRightCon').eq(num).css('display', 'block');

		})
	}

	function getParentList(uid, type) { //获取家长列表
		var list = $('#jparentlist'),
			totalNum = $('#jparenttotal'),
			htmlStr = "";
		$.ajax({
			type: "get",
			url: SERVERROOTDATA + "Parent.ashx?action=getClassParentListByUser",
			dataType: 'json',
			data: {
				userId: uid,
				userType: type, //类型
				pageIndex: 1,
				pageSize: 100
			},
			timeout: 600,
			success: function(res) {
				if(res.rows.length < 1) {
					return false;
				}
				totalNum.html(res.totalCount);
				res.rows.forEach(function(item, index) {
					htmlStr += "<li><a><span><img src=" + SERVERROOT + item.iconPath + "  /></span>" + item.userName + "</a></li>";
				});
				list.html(htmlStr);
			},
			error: function() {
				console.log("request error");
			}
		});
	}

});