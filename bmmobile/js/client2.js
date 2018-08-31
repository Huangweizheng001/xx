var mid = $.getUrlParam("mid");

var ishidden = $.getUrlParam("ishidden");

var vCode = $.getUrlParam("version_code");

var hideBar = $.getUrlParam("hidebar");
var hiderecharge = $.getUrlParam("hiderecharge");
var hidecost = $.getUrlParam("hidecost");


if(vCode <12){
	$("#bmcontact").css("display","none");
	$("#bmservice").css("display","none");
}

//if(ishidden == true || ishidden == "true"){
	$(".chat-input-box").css("display","block");
	$("#jHiddenIcon").css("display","none");
	$("#chatContent").css("width","calc(100% - 132px)");
//}
	
	
	if(hideBar || hideBar =='true'){
		$(".chat-input-box").css("display","none");
	}
	
	if(hiderecharge || hiderecharge =='true'){
		$(".chat-recharge").css("display","none");
	}
	
	if(hidecost || hidecost =='true'){
		$(".chat-cost").css("display","none");
	}
	
//muserType = 0; //默认一般游客
muserType = localStorage.getItem('mUserType');
var isFresh = true,
	isFresh2 = true;

var scuserId = "";
//var $mUserIcon = localStorage.getItem('$ycuheader');

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
		msgObj: d.getElementById("chatbox"),
		//	screenheight:w.innerHeight ? w.innerHeight : dx.clientHeight,
		username: null,
		userImg: null,
		userGrade: null,
		userid: null,
		socket: null,

		//让浏览器滚动条保持在最低部
		scrollToBottom: function() {
			//console.log(this.msgObj.clientHeight);
			//msgObj.scrollTo(0, this.msgObj.clientHeight);
			/*var d = $('#chatbox');
			d.scrollTop(d.prop("scrollHeight"));*/
			$("#chatbox").animate({
				scrollTop: $('#chatbox')[0].scrollHeight
			}, 500); //可选

		},
		//退出，本例只是一个简单的刷新
		logout: function() {
			//this.socket.disconnect();
			location.reload();
		},
		//提交聊天消息内容
		submit: function() {
			var times = Date.parse(new Date());
			var content = d.getElementById("chatContent").innerHTML;

			if(content != '') {
				var obj = {
					/*type: 'content',
					userid: this.userid,
					username: this.username,
					userImg: this.userImg,
					userGrade: this.userGrade,
					content: content,
					subTime: times,
					userVartar: this.userVartar,
					userType: muserType //1是管理员，2是水军, 3 主播*/
					type: 'content',
					userid: this.userid,
					username: this.username,
					userImg: this.userImg,
					userGrade: this.userGrade,
					content: content,
					subTime: times,
					userVartar: this.userImg,
					userType: muserType //1是管理员，2是水军, 3 主播
				};

				var _this = this;
				var userType = localStorage.getItem("mUserType");
				if(userType == "1" || userType == 1 || userType == "2" || userType == 2) {
					//this.socket.emit('message', obj);
					this.socket.emit('admin_msg', obj);
				} else {
					CHAT.submitMessage(obj, 1); //聊天 :local
					this.socket.emit('for_admin', obj);
				}

				d.getElementById("chatContent").innerHTML = '';
				setTimeout(function() {
					d.getElementById("chatContent").innerHTML = '';
				}, 100);
			}

			return false;
		},
		refreshOrder: function() {
			this.socket.emit('orderSet');
		},
		//return current time format
		currentTimeFormat: function() {
			var timeObj = new Date();
			var timeFormatObj = timeObj.getFullYear() + "-" + (timeObj.getMonth() + 1) + "-" + timeObj.getDate() + "  " + timeObj.getHours() + ":" + timeObj.getMinutes() + ":" + timeObj.getSeconds();

			return timeFormatObj;
		},

		//审核通过再次发送
		againSend: function(obj, classObj) {
			this.socket.emit('message', obj);
			this.socket.emit('for_admin_flag', classObj);
		},
		//审核对象
		getObjInf: function(index, classObj, ele) {
			CHAT.againSend(tempObjArr[index], classObj)
		},
		//delete 留言
		delObjInf: function(optObj) {
			this.socket.emit('to_all', optObj);
		},
		//create userId
		genUid: function() {
			return new Date().getTime() + "" + Math.floor(Math.random() * 899 + 100);
		},
		//更新系统消息，本例中在用户加入、退出的时候调用
		updateSysMsg: function(o, action) {
			//当前在线用户列表
			var onlinesIpArr = [],
				onlinesAddressArr = [];

			var onlineUsers = o.onlineUsers;
			//当前在线人数
			//var onlineCount = o.onlineCount;
			var onlineCount = o.onlineCount * 3 + 1000;

			var onlineAddArr = o.onlineUsersAddr; //server ip address

			//新加入用户的信息
			var user = o.user;

			//更新在线人数
			var userhtml = '';
			var separator = '';
			for(key in onlineUsers) {
				if(onlineUsers.hasOwnProperty(key)) {
					userhtml += separator + onlineUsers[key];
					separator = '、';
				}
			}
			//d.getElementById("onlinecount").innerHTML = '当前共有 ' + onlineCount + ' 人在线，在线列表：' + userhtml;

		},
		//点击打赏时插入实时打赏消息
		cost: function($rgoods, $obType, $num, userGrade) {
			var obj = {
				type: 'cost',
				username: this.username,
				userImg: this.userImg,
				userGrade: this.userGrade,
				rgoods: $rgoods,
				obType: $obType,
				num: $num,
				userVartar: this.userImg,
				userType: localStorage.getItem("mUserType") //1是管理员
			};
			this.socket.emit('admin_msg', obj);
		},
		init: function(username, userImg, userGrade, ipAddress, fromUrl, keyWord, mid, channelId, noteInf) {
			/*init: function(username, userImg, userGrade, ipAddress, relativeImgUser) {*/
			/*
			客户端根据时间和随机数生成uid,这样使得聊天室用户名称可以重复。
			实际项目中，如果是需要用户登录，那么直接采用用户的uid来做标识就可以
			*/
			/*this.userid = this.genUid();
			this.username = username;
			this.userImg = userImg;
			this.userGrade = userGrade;
			this.userAddress = ipAddress;
			this.userVartar = relativeImgUser;*/

			this.userid = this.genUid();
			this.username = username;
			this.userImg = userImg;
			this.userGrade = userGrade;
			this.noteInf = noteInf;
			this.userAddress = ipAddress;
			this.formUrl = fromUrl;
			this.keyWord = keyWord;
			this.formType = "App"; //来自于移动web端 app this.formType = "App";
			this.scrollToBottom();

			//连接websocket后端服务器
			//this.socket = io.connect('ws://realtime.plhwin.com');
			this.socket = io.connect('http://116.62.226.90:3001');
			//this.socket = io.connect('http://192.168.101.180:3000');
			//this.socket = io.connect('http://116.62.226.90:3000');

			scuserId = this.userid;
			var uid = scuserId.substr(scuserId.length - 4);

			var currentTime = new Date();
			var loginTime = currentTime.getTime();
			var enterTimeFormat = getNowFormatDate()

			//告诉服务器端有用户登录
			this.socket.emit('login', {
				/*userid: this.userid,
				username: this.username,
				userImg: this.userImg,
				userAddress: this.userAddress,
				userGrade: this.userGrade,
				userVartar: this.userVartar,
				userType: localStorage.getItem("mUserType") //1是管理员*/

				userid: this.userid,
				username: this.username,
				userImg: this.userImg,
				userAddress: this.userAddress,
				userGrade: this.userGrade,
				noteInf: this.noteInf,
				userVartar: this.userImg,
				userType: muserType, //1是管理员
				fromUrl: this.formUrl,
				keyWord: this.keyWord,
				loginTime: loginTime,
				enterTime: enterTimeFormat,
				formType: this.formType, //来自于哪里
				mid: mid,
				channelId: channelId
			});

			//监听新用户登录
			this.socket.on('login', function(o) {
				CHAT.updateSysMsg(o, 'login');
			});

			var _this = this;

			var userType = localStorage.getItem("mUserType");
			if(userType == "1" || userType == 1 || userType == "2" || userType == 2) {
				_this.socket.emit('group1'); //管理组
			} else {
				_this.socket.emit('group2');
			}

			//默认自身组
			this.socket.emit('createGroup', this.userid);

			//监听用户退出
			this.socket.on('logout', function(o) {
				CHAT.updateSysMsg(o, 'logout');
			});

			this.socket.on('userinflist', function(obj) {
				var frameId = $(".chatManagerCenter iframe")[0].id;
				$('#' + frameId)[0].contentWindow.getUserList(obj);
			});

			$("#files").change(function(e) {
				var file = $(this).get(0).files[0];
				r = new FileReader(); //本地预览
				r.onload = function() {
					var img = document.createElement("img");
					img.src = r.result;
					//CHAT.submit(2, r.result);
					$("#chatContent").append(img);
				}
				r.readAsDataURL(file); //Base64
			});

			//监听消息发送
			/*this.socket.on('for_admin_flag', function(obj) {
				var section = d.createElement('span');
				section.innerHTML = '<style>.yc' + obj + ':after{content:"已审核";color:#f00}</style>';
				CHAT.msgObj.appendChild(section);
			});*/

			//监听消息发送
			this.socket.on('to_all', function(obj) {
				var section = d.createElement('span');
				section.innerHTML = '<style>.ycmessage' + obj + '{display:none}</style>';
				CHAT.msgObj.appendChild(section);
			});

			function getImageUrl(content) {
				var tempBox = "";

				tempBox = content.replace(/\.\/images\/face\//g, "http://www.bomizx.net/ycedu/images/face/");

				return tempBox;
			};

			//监听消息发送
			this.socket.on('to_self', function(obj) {
				var section = d.createElement('span');
				section.innerHTML = '<style>.ycmessageold' + obj + '{display:none}</style>';
				CHAT.msgObj.appendChild(section);
				CHAT.scrollToBottom();
				/*setTimeout(function() {
					$(".bmmessagePanel").mCustomScrollbar("scrollTo", $("#message").height());
				}, 100)*/
			});

			//指令刷新
			this.socket.on('orderRefresh', function(obj) {
				window.location.reload();
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
						} else if(obj[i].type == 'cost') {
							CHAT.submitCost(obj[i]); //打赏
						}
					} else {
						var section = d.createElement('span');
						section.innerHTML = '<style>.ycmessage' + obj[i] + '{display:none}</style>';
						CHAT.msgObj.appendChild(section);
					}
				}

				CHAT.scrollToBottom();

			});

			//监听消息发送
			this.socket.on('for_admin', function(obj) { //发送给管理员
				//var times = Date.parse(new Date());
				var uid = obj.userid.substr(obj.userid.length - 4);
				if(obj.type == 'content') {
					if((obj.userType != '1') && (obj.userType != 1) && (obj.userType != '3') && (obj.userType != 3)) {
						tempObjArr.push(obj);
						var usernameDiv = '<span class="dycplayname" style="text-align:left"><span class="ycuserName">' + obj.username + '</span>：</span><a href="#this" class="ycstatus yc' + obj.subTime + '" onclick="CHAT.getObjInf(' + objIndex + ',' + obj.subTime + ',this);"></a><a href="#this" class="ycdelete" onclick="CHAT.delObjInf(' + obj.subTime + ');"></a>';
						var section = d.createElement('div');
						section.className = 'dycdiscuss-box ' + "ycmessage" + obj.subTime;
						switch(obj.userGrade) {
							case 0: //普通会员
								section.innerHTML = '<div class="clearfix dycordinary"><span class="dycadmin dycadmin-ordinary" style="background-image:url(../images/live/grader.png)" onclick="CHAT.addGroup(' + obj.userid + ',\'' + obj.username + '\');"></span>' + usernameDiv + obj.content + '</div>';
								break;
							case 1: //白银
								section.innerHTML = '<div class="clearfix dycsilver"><span class="dycadmin dycadmin-silver" style="background-image:url(../images/live/grader.png)" onclick="CHAT.addGroup(' + obj.userid + ',\'' + obj.username + '\');"></span>' + usernameDiv + obj.content + '</div>';
								break;
							case 2: //黄金
								section.innerHTML = '<div class="clearfix dycgold"><span class="dycadmin dycadmin-gold" style="background-image:url(../images/live/grader.png)" onclick="CHAT.addGroup(' + obj.userid + ',\'' + obj.username + '\');"></span>' + usernameDiv + obj.content + '</div>';
								break;
							case 3: //钻石
								section.innerHTML = '<div class="clearfix dycdiamond"><span class="dycadmin dycadmin-diamond" style="background-image:url(../images/live/grader.png)" onclick="CHAT.addGroup(' + obj.userid + ',\'' + obj.username + '\');"></span>' + usernameDiv + obj.content + '</div>';
								break;
							case 4: //专属
								section.innerHTML = '<div class="clearfix dycexclusive"><span class="dycadmin dycadmin-exclusive" style="background-image:url(../images/live/grader.png)" onclick="CHAT.addGroup(' + obj.userid + ',\'' + obj.username + '\');"></span>' + usernameDiv + obj.content + '</div>';
								break;
							case 5: //专属
								section.innerHTML = '<div class="clearfix dycexclusive"><span class="dycadmin dycadmin-exclusive" style="background-image:url(../images/live/grader.png)" onclick="CHAT.addGroup(' + obj.userid + ',\'' + obj.username + '\');"></span>' + usernameDiv + obj.content + '</div>';
								break;
							case 6: //专属
								section.innerHTML = '<div class="clearfix dycexclusive"><span class="dycadmin dycadmin-exclusive" style="background-image:url(../images/live/grader.png)" onclick="CHAT.addGroup(' + obj.userid + ',\'' + obj.username + '\');"></span>' + usernameDiv + obj.content + '</div>';
								break;
							default: //游客
								usernameDiv = '<span class="dycplayname" style="text-align:left"><span class="ycuserName">' + obj.username + uid + '</span>：</span><a href="#this" class="ycstatus yc' + obj.subTime + '" onclick="CHAT.getObjInf(' + objIndex + ',' + obj.subTime + ',this);"></a><a href="#this" class="ycdelete" onclick="CHAT.delObjInf(' + obj.subTime + ');"></a>';

								section.innerHTML = '<div class="clearfix"><span class="dycadmin" style="background-image:url(../images/live/grader.png)" onclick="CHAT.addGroup(' + obj.userid + ',\'' + obj.username + '\');"></span>' + usernameDiv + obj.content + '</div>';
						}
					} else if((obj.userType == '3') && (obj.userType == 3)) {
						tempObjArr.push(obj);
						var usernameImg = '<div class="dycadmin-admin-img"><img src=' + SERVEROOTFILE + obj.userVartar + '></div>';
						var usernameDiv = '<span class="dycplayname">' + obj.username + '：</span><a href="#this" class="ycstatus yc' + obj.subTime + '" onclick="CHAT.getObjInf(' + objIndex + ',' + obj.subTime + ',this);"></a><a href="#this" class="ycdelete" onclick="CHAT.delObjInf(' + obj.subTime + ');"></a>';
						var section = d.createElement('div');
						section.className = 'dycdiscuss-box-admin clearfix ycmessage' + obj.subTime;
						section.innerHTML = usernameImg + '<div class="dycadmin-box dycanchor-box dyc"><div class="dycadmin dycadmin-admin"></div>' + usernameDiv + obj.content + '</div>';

					} else {
						var usernameImg = '<div class="dycadmin-admin-img"><img src=' + SERVEROOTFILE + obj.userVartar + '></div>';
						var usernameDiv = '<span class="dycplayname">' + objobj[i].username + '：</span><a href="#this" class="ycdelete" onclick="CHAT.delObjInf(' + obj.subTime + ');"></a>';
						var section = d.createElement('div');
						section.className = 'dycdiscuss-box-admin clearfix ycmessage' + obj.subTime;
						section.innerHTML = usernameImg + '<div class="dycadmin-box"><div class="dycadmin dycadmin-admin"></div>' + usernameDiv + obj.content + '</div>';
					}
					CHAT.msgObj.appendChild(section);
					CHAT.scrollToBottom();
					/*setTimeout(function() {
						$(".bmmessagePanel").mCustomScrollbar("scrollTo", $("#message").height());
					}, 500)
*/
					objIndex++;
				} else {
					if((obj.userType != '1') && (obj.userType != 1) && (obj.userType != '3') && (obj.userType != 3)) {
						var html = '';
						html += '<div class="msg-system">';
						switch(obj.userGrade) {
							case 0: //普通会员
								html += '<span class="grader grader-ordinary" style="background-image:url(../images/live/grader.png)" onclick="CHAT.addGroup(' + obj.userid + ',\'' + obj.username + '\');"></span>';
								break;
							case 1: //白银
								html += '<span class="grader grader-silver" style="background-image:url(../images/live/grader.png)" onclick="CHAT.addGroup(' + obj.userid + ',\'' + obj.username + '\');"></span>';
								break;
							case 2: //黄金
								html += '<span class="grader grader-gold" style="background-image:url(../images/live/grader.png)" onclick="CHAT.addGroup(' + obj.userid + ',\'' + obj.username + '\');"></span>';
								break;
							case 3: //钻石
								html += '<span class="grader grader-diamond" style="background-image:url(../images/live/grader.png)" onclick="CHAT.addGroup(' + obj.userid + ',\'' + obj.username + '\');"></span>';
								break;
							case 4: //专属
								html += '<span class="grader grader-exclusive"" style="background-image:url(../images/live/grader.png)" onclick="CHAT.addGroup(' + obj.userid + ',\'' + obj.username + '\');"></span>';
								break;
							case 5: //专属
								html += '<span class="grader grader-exclusive"" style="background-image:url(../images/live/grader.png)" onclick="CHAT.addGroup(' + obj.userid + ',\'' + obj.username + '\');"></span>';
								break;
							case 6: //专属
								html += '<span class="grader grader-exclusive"" style="background-image:url(../images/live/grader.png)" onclick="CHAT.addGroup(' + obj.userid + ',\'' + obj.username + '\');"></span>';
								break;
							default: //游客
								html += '<span class="grader" style="background-image:url(../images/live/grader.png)" onclick="CHAT.addGroup(' + obj.userid + ',\'' + obj.username + '\');"></span>';
						}

						html += obj.username + '打赏给' + obj.obType;
						html += '<div class="msg-system-img"><img src = ' + obj.rgoods + ' /></div>x<span class="msg-system-num">' + obj.num;
						html += '</span></div>';
						var section = d.createElement('div');
						section.className = 'system J-mjrlinkWrap J-cutMsg';
						section.innerHTML = html;
					} else if((obj.userType == '3') && (obj.userType == 3)) {
						var usernameImg = '<div class="dycadmin-admin-img"><img src=' + SERVEROOTFILE + obj.userVartar + '></div>';
						var usernameDiv = '<span class="dycplayname">' + obj.username + '：</span>';
						var section = d.createElement('div');
						section.className = 'dycdiscuss-box-admin clearfix ycmessage' + obj.subTime;
						section.innerHTML = usernameImg + '<div class="dycadmin-box dycanchor-box dyc"><div class="dycadmin dycadmin-admin"></div>' + usernameDiv + obj.content + '</div>';

					} else {
						var usernameImg = '<div class="dycadmin-admin-img"><img src=' + SERVEROOTFILE + obj.userVartar + '></div>';
						var usernameDiv = '<span class="dycplayname">' + obj.username + ':</span>打赏给' + obj.obType + obj.num + '个<div class="msg-system-img"><img src = ' + obj.rgoods + ' /></div>';
						var section = d.createElement('div');
						section.className = 'dycdiscuss-box-admin clearfix ycmessage' + obj.subTime;
						section.innerHTML = usernameImg + '<div class="dycadmin-box"><div class="dycadmin dycadmin-admin"></div>' + usernameDiv + '</div>';
					}
					CHAT.msgObj.appendChild(section);
				}
				CHAT.scrollToBottom();
			});

			//监听消息发送
			this.socket.on('message', function(obj) {
				if(typeof(obj) == 'object' && obj != null) {
					if(obj.type == 'content') {
						CHAT.submitMessage(obj); //聊天
					} else {
						CHAT.submitCost(obj); //打赏
					}
					CHAT.scrollToBottom();
				}
			});

			//监听消息发送-管理员
			this.socket.on('admin_msg', function(obj) {
				if(obj.type == 'content') { //聊天
					var usernameImg = '<div class="dycadmin-admin-img"><img src=' + SERVEROOTFILE + obj.userVartar + '></div>';
					var usernameDiv = '<span class="dycplayname">' + obj.username + '：</span><a href="#this" class="ycdelete" onclick="CHAT.delObjInf(' + obj.subTime + ');"></a>';
					var section = d.createElement('div');
					section.className = 'dycdiscuss-box-admin clearfix ycmessage' + obj.subTime;
					section.innerHTML = usernameImg + '<div class="dycadmin-box"><div class="dycadmin dycadmin-admin"></div>' + usernameDiv + obj.content + '</div>';
					CHAT.msgObj.appendChild(section);
					CHAT.scrollToBottom();
					/*setTimeout(function() {
						$(".bmmessagePanel").mCustomScrollbar("scrollTo", $("#message").height());
					}, 500)*/
				} else {
					CHAT.submitCost(obj); //打赏
				}
				CHAT.scrollToBottom();
			});
		},
		//聊天发送整合
		submitMessage: function(obj, type) { //type = 1 : local 
			var uid = obj.userid.substr(obj.userid.length - 4);
			if((obj.userType != '1') && (obj.userType != 1) && (obj.userType != '3') && (obj.userType != 3)) {
				var usernameDiv = '<span class="dycplayname"><span class="ycuserName">' + obj.username + '</span>：</span>';
				var section = d.createElement('div');
				if(type == 1) {
					section.className = 'dycdiscuss-box ycmessage' + obj.subTime + ' ycmessageold' + obj.subTime;
				} else {
					section.className = 'dycdiscuss-box ycmessage' + obj.subTime;
				}
				switch(obj.userGrade) {
					case 0: //普通会员
						section.innerHTML = '<div class="clearfix dycordinary"><span class="dycadmin dycadmin-ordinary" style="background-image:url(../images/live/grader.png)"></span>' + usernameDiv + obj.content + '</div>';
						break;
					case 1: //白银
						section.innerHTML = '<div class="clearfix dycsilver"><span class="dycadmin dycadmin-silver" style="background-image:url(../images/live/grader.png)"></span>' + usernameDiv + obj.content + '</div>';
						break;
					case 2: //黄金
						section.innerHTML = '<div class="clearfix dycgold"><span class="dycadmin dycadmin-gold" style="background-image:url(../images/live/grader.png)"></span>' + usernameDiv + obj.content + '</div>';
						break;
					case 3: //钻石
						section.innerHTML = '<div class="clearfix dycdiamond"><span class="dycadmin dycadmin-diamond" style="background-image:url(../images/live/grader.png)"></span>' + usernameDiv + obj.content + '</div>';
						break;
					case 4: //专属
						section.innerHTML = '<div class="clearfix dycexclusive"><span class="dycadmin dycadmin-exclusive" style="background-image:url(../images/live/grader.png)"></span>' + usernameDiv + obj.content + '</div>';
						break;
					case 5: //专属
						section.innerHTML = '<div class="clearfix dycexclusive"><span class="dycadmin dycadmin-exclusive" style="background-image:url(../images/live/grader.png)"></span>' + usernameDiv + obj.content + '</div>';
						break;
					case 6: //专属
						section.innerHTML = '<div class="clearfix dycexclusive"><span class="dycadmin dycadmin-exclusive" style="background-image:url(../images/live/grader.png)"></span>' + usernameDiv + obj.content + '</div>';
						break;
					default: //游客
						usernameDiv = '<span class="dycplayname"><span class="ycuserName">' + obj.username + uid + '</span>：</span>';
						section.innerHTML = '<div class="clearfix"><span class="dycadmin" style="background-image:url(../images/live/grader.png)"></span>' + usernameDiv + obj.content + '</div>';
				}
			} else if((obj.userType == '3') && (obj.userType == 3)) {
				var usernameImg = '<div class="dycadmin-admin-img"><img src=' + SERVEROOTFILE + obj.userVartar + '></div>';
				var usernameDiv = '<span class="dycplayname">' + obj.username + '：</span>';
				var section = d.createElement('div');
				if(type == 1) {
					section.className = 'dycdiscuss-box ycmessage' + obj.subTime + ' ycmessageold' + obj.subTime;
					section.className = 'dycdiscuss-box-admin clearfix ycmessage' + obj.subTime + ' ycmessageold' + obj.subTime;
				} else {
					section.className = 'dycdiscuss-box-admin clearfix ycmessage' + obj.subTime;
				}
				section.innerHTML = usernameImg + '<div class="dycadmin-box dycanchor-box dyc"><div class="dycadmin dycadmin-admin"></div>' + usernameDiv + obj.content + '</div>';

			} else {
				var usernameImg = '<div class="dycadmin-admin-img"><img src=' + SERVEROOTFILE + obj.userVartar + '></div>';
				var usernameDiv = '<span class="dycplayname">' + obj.username + '：</span>';
				var section = d.createElement('div');
				section.className = 'dycdiscuss-box-admin clearfix ycmessage' + obj.subTime;
				section.innerHTML = usernameImg + '<div class="dycadmin-box"><div class="dycadmin dycadmin-admin"></div>' + usernameDiv + obj.content + '</div>';

			}

			CHAT.msgObj.appendChild(section);
			CHAT.scrollToBottom();
		},

		//打赏整合
		submitCost: function(obj) {
			if((obj.userType != '1') && (obj.userType != 1) && (obj.userType != '3') && (obj.userType != 3)) {
				var html = '';
				switch(obj.userGrade) {
					case 0: //普通会员
						html += '<div class="msg-system dycordinary" style="text-align:left"><span class="grader grader-ordinary" style="background-image:url(../images/live/grader.png)"></span>';
						break;
					case 1: //白银
						html += '<div class="msg-system dycsilver" style="text-align:left"><span class="grader grader-silver" style="background-image:url(../images/live/grader.png)"></span>';
						break;
					case 2: //黄金
						html += '<div class="msg-system dycgold" style="text-align:left"><span class="grader grader-gold" style="background-image:url(../images/live/grader.png)"></span>';
						break;
					case 3: //钻石
						html += '<div class="msg-system dycdiamond" style="text-align:left"><span class="grader grader-diamond" style="background-image:url(../images/live/grader.png)"></span>';
						break;
					case 4: //专属
						html += '<div class="msg-system dycexclusive" style="text-align:left"><span class="grader grader-exclusive"" style="background-image:url(../images/live/grader.png)"></span>';
						break;
					case 5: //专属
						html += '<div class="msg-system dycexclusive" style="text-align:left"><span class="grader grader-exclusive"" style="background-image:url(../images/live/grader.png)"></span>';
						break;
					case 6: //专属
						html += '<div class="msg-system dycexclusive" style="text-align:left"><span class="grader grader-exclusive"" style="background-image:url(../images/live/grader.png)"></span>';
						break;
					default: //游客
						html += '<div class="msg-system" style="text-align:left"><span class="grader" style="background-image:url(../images/live/grader.png)"></span>';
				}
				html += '<span class="dycplayname">' + obj.username + '：</span>' + '打赏给' + obj.obType + obj.num;
				html += '个<div class="msg-system-img"><img src = ' + obj.rgoods + ' /></div></div>';
				var section = d.createElement('div');
				section.className = 'system J-mjrlinkWrap J-cutMsg';
				section.innerHTML = html;
			} else if((obj.userType == '3') && (obj.userType == 3)) {
				var usernameImg = '<div class="dycadmin-admin-img"><img src=' + SERVEROOTFILE + obj.userVartar + '></div>';
				var usernameDiv = '<span class="dycplayname">' + obj.username + ':</span>打赏给' + obj.obType + obj.num + '个<div class="msg-system-img"><img src = ' + obj.rgoods + ' /></div>';
				var section = d.createElement('div');
				section.className = 'dycdiscuss-box-admin  clearfix ycmessage' + obj.subTime;
				section.innerHTML = usernameImg + '<div class="dycadmin-box dycanchor-box"><div class="dycadmin dycadmin-admin"></div>' + usernameDiv + '</div>';
			} else {
				var usernameImg = '<div class="dycadmin-admin-img"><img src=' + SERVEROOTFILE + obj.userVartar + '></div>';
				var usernameDiv = '<span class="dycplayname">' + obj.username + ':</span>打赏给' + obj.obType + obj.num + '个<div class="msg-system-img"><img src = ' + obj.rgoods + ' /></div>';
				var section = d.createElement('div');
				section.className = 'dycdiscuss-box-admin clearfix ycmessage' + obj.subTime;
				section.innerHTML = usernameImg + '<div class="dycadmin-box"><div class="dycadmin dycadmin-admin"></div>' + usernameDiv + '</div>';
			}
			CHAT.msgObj.appendChild(section);
			CHAT.scrollToBottom();
		}
	};
})();
$(function() {
	var username, userImg, grade, relativeImgUser, noteInf, teacherId, anchorId, teacherName, anchorName, rewardGoodsId, rewardEqual, rewardImg, forname;
	var paramId = 8;
	var bomi = 0; //播米币余额
	var daysTips = ["周一", "周二", "周三", "周四", "周五"];
	var dateObj = new Date();
	var currentWeekDay = dateObj.getDay();
	var currentHour = dateObj.getHours();
	var currentMin = dateObj.getMinutes();
	var currentTimeStamp = currentHour * 60 + currentMin;
	var isfirst = true; //第一次加载打赏物品
	var isbookfirst = true;
	var contributefirst = true;
	var costhtmlStr = "";
	

	initPlayerData();
	getUserInf(mid);
	
	$("#chatContent").on("focus", function() {
		$(this).siblings('.chat-btns-group').hide();
		$('.chat-btns-group').eq(1).show();
	});

	$(document).on('click', function(e) {
		$('.chat-btns-group').hide();
		$('.chat-btns-group').eq(0).show();

	});
	$('.chat-input-box').on('click', function(e) {
		e.stopPropagation();
	});

	$('.face').bind({
		click: function(event) {
			if(!$('#sinaEmotion').is(':visible')) {
				$(this).sinaEmotion();
				event.stopPropagation();
			}
		}
	});
	
	$("#dbcost").on('click', function() {
		layer.open({
			type: 1,
			content: '<div class="livelayer"><p class="layertitle">礼物</p><div class="layerswiper swiper-container"><div class="swiper-wrapper" id="jlayercost"></div><div class="swiper-pagination"></div></div><a class="layerbtn rechargebtn" href="recharge.html?live=1">充值</a></div>',
			anim: 'up',
			style: 'position:fixed; bottom:0; left:0; width: 100%; height: 400px; padding:10px 0; border:none;'
		});
		if(isfirst) {
			isfirst = false;
			var htmlStr = "";

			$.ajax({ //获取打赏内容
				type: "get",
				url: SERVEROOTDATA + "RewardGoods.ashx?action=getRewardGoods",
				dataType: 'json',
				data: {},
				success: function(res) {
					if(res.length < 1) {
						console.log('没有数据')
						return false;
					}
					res.forEach(function(value, index) {
						if(index % 2 == 0) {
							htmlStr += '<div class="swiper-slide">';
						}
						if(index == 0) {
							htmlStr += "<div class='layercostbox active' data-id=" + value.rewardGoodsId + " data-value=" + value.reward + " data-img='" + SERVEROOTFILE + value.iconPath + "' data-name=" + value.name + "><img src='" + SERVEROOTFILE + value.iconPath + "'><p class='name'>" + value.name + "</p><p class='value'>" + value.reward + "播米币</p></div>";
							rewardImg = SERVEROOTFILE + value.iconPath;
							forname = value.name;
						} else {
							htmlStr += "<div class='layercostbox' data-id=" + value.rewardGoodsId + " data-value=" + value.reward + " data-img='" + SERVEROOTFILE + value.iconPath + "' data-name=" + value.name + "><img src='" + SERVEROOTFILE + value.iconPath + "'><p class='name'>" + value.name + "</p><p class='value'>" + value.reward + "播米币</p></div>";
						}

						if((index + 1) % 2 == 0) {
							htmlStr += '</div>';
						}
					});
					costhtmlStr = htmlStr;
					$('#jlayercost').html(costhtmlStr);

					costSwiper();//轮播
					costClick(); //打赏选择
				},
				error: function(res) {
					console.log("request error");
				}
			});

		} else {
			$('#jlayercost').html(costhtmlStr);
			costSwiper();//轮播
			costClick(); //打赏选择
		}
	});
	
	function costSwiper(){
		var costSwiper = new Swiper('.layerswiper', {
				pagination: '.swiper-pagination',
				slidesPerView: 4, //'auto'
				spaceBetween: 20,
				loop: false,
				slidesPerView: 4,
				slidesPerGroup: 4,
			});
	}

	function initPlayerData() {

		var setFlag = true;
		$.ajax({
			type: "get",
			url: SERVEROOTDATA + "ChannelProgram.ashx?action=getCurrLiveChannelProgram",
			dataType: 'json',
			data: {
				channelId: paramId //pay attention to channelId
			},
			success: function(res) {
				var day = (new Date()).getDay();
				res.forEach(function(item, index) {
					if(daysTips[(day - 1)] == item.weekDay) {
						timeArr = item.playTime.split("-");
						hourArr1 = timeArr[0].split(":");
						hourArr2 = timeArr[1].split(":");
						if((hourArr1[0] * 60 + parseInt(hourArr1[1])) <= (currentHour * 60 + currentMin) && (hourArr2[0] * 60 + parseInt(hourArr2[1])) >= (currentHour * 60 + currentMin)) {
							teacherId = item.teacherId;
							currentProgramId = item.channelProgramId;
							setFlag = false;
							return false;
						} else {
							if(setFlag) {
								teacherId = item.teacherId;
								teacherName = item.teacherName;
								anchorId = item.anchorId;
								anchorName = item.anchorName;
								currentProgramId = item.channelProgramId;

							}
						}
					} else {
						if(setFlag) {
							teacherId = item.teacherId;
							teacherName = item.teacherName;
							anchorId = item.anchorId;
							anchorName = item.anchorName;
							currentProgramId = item.channelProgramId;
						}
					}
				});
				//getPlayURL(paramId);
				getManageType(paramId);
				//getCurrentTeacher(teacherItem);
			},
			error: function() {
				console.log("err");
				getprogramId();
			}
		});
	}



	//get manage type
	function getManageType(paramId) {
		$.ajax({
			type: "POST",
			url: SERVEROOTDATA + "Channel.ashx?action=getMemberType",
			dataType: "json",
			cache: false,
			data: {
				channelId: paramId,
				memberId: mid
			},
			success: function(result) {
				if(result[0] == undefined) { //游客是0
					localStorage.setItem("mUserType", 0);
					return false;
				}
				localStorage.setItem("mUserType", result[0].memberType);
			}
		});

	}

	
	//get user inf
	function getUserInf(mid) {
		$.ajax({
			type: "get",
			url: SERVEROOTDATA + "Member.ashx?action=getSowingCoinByMemberId",
			dataType: 'json',
			data: {
				memberId: mid
			},
			success: function(res) {
				if(res.length < 1) {
					username = "游客";
					userImg = "http://www.bomizx.net/ycedu/images/sz01.jpg";
					grade = -1;
					getClientIpInf(mid);
					return false;
				}
				username = res[0].nickName;
				userImg = res[0].iconPath;
				relativeImgUser = res[0].iconPath;
				noteInf = res[0].note;
				grade = res[0].level - 1;
				bomi = res[0].sowingCoin;
				//grade = returnUserLevel(res[0].memberlevel);

				var autoTime = Date.parse(new Date());
				localStorage.setItem("autoTime", autoTime / 1000);
				localStorage.setItem("$ycuid", mid);
				//localStorage.setItem("mName",  res[0].name);
				localStorage.setItem("$ycuname", username);
				localStorage.setItem("$ycuheader", SERVEROOTFILE + res[0].iconPath);
				localStorage.setItem("mLever", res[0].level);
				localStorage.setItem("$bomimoney", res[0].sowingCoin);

				getClientIpInf(mid);
			},
			error: function() {
				username = "游客";
				userImg = "http://www.bomizx.net/ycedu/images/sz01.jpg";
				grade = -1;
				getClientIpInf(mid);
			}
		});
	}

	function getClientIpInf(mid) {
		$.ajax({
			type: "get",
			url: "http://ip.chinaz.com/getip.aspx",
			dataType: 'jsonp',
			success: function(res) {
				/*window.CHAT.init(username, userImg, grade, res.address, relativeImgUser); //等级名称userGrade[0]，等级序号userGrade[1]*/
				window.CHAT.init(username, userImg, grade, res.address, "", "", mid, paramId, noteInf);
			},
			error: function(e) {
				//window.CHAT.init(username, userImg, grade, null, relativeImgUser); //等级名称userGrade[0]，等级序号userGrade[1]
				window.CHAT.init(username, userImg, grade, "127.0.0.1", "", "", mid, paramId, noteInf);
			}
		});
	}

	
	
	

	function rewardTo(forId, forname) { //打赏
		$.ajax({
			type: "post",
			url: SERVEROOTDATA + "MemberReward.ashx?action=memberReward",
			dataType: "json",
			/*
									timeout: 300,*/
			data: {
				"channelId": paramId,
				"memberId": mid,
				"rewardGoodsId": rewardGoodsId, //打赏物品
				"objectId": forId, //打赏给谁的id
				"reward": rewardEqual,
				"rewardCount": 1
			},
			success: function(res) {
				bomi = bomi - rewardEqual;
				if(res != 814 || res != "814") {
					
					/*$("#jentertainmentBox .bmcodeinf").text("播米币:" + accountBalance);*/
					if(bomi > 0) { //如果余额够
						CHAT.cost(rewardImg, forname, 1, grade);
						layer.open({
							content: '谢主隆恩！',
							skin: 'msg',
							time: 2 //2秒后自动关闭
						});
					} else {
						layer.open({
							content: '余额不够，请前去充值！',
							skin: 'msg',
							time: 2 //2秒后自动关闭
						});
					}

				} else {
					if(bomi > 0) { //如果余额够
						layer.open({
						content: '打赏错误，请刷新！',
						skin: 'msg',
						time: 2 //2秒后自动关闭
						});
					} else {
						layer.open({
							content: '余额不够，请前去充值！',
							skin: 'msg',
							time: 2 //2秒后自动关闭
						});
					}
					
				}
			},
			error: function() {
				layer.open({
					content: '网络异常,请刷新重新！',
					skin: 'msg',
					time: 2 //2秒后自动关闭
				});
			}
		});
	}

	function costClick() { //打赏选择

		$('#jlayercost .layercostbox').on('click', function() {
			if(mid == null || mid == undefined || mid == "undefined") { //未登录
				layer.open({
					content: '您还未登录，是否前往？',
					btn: ['登录', '不要'],
					yes: function(index) {
						window.location.href = 'login.html';
					}
				});
			} else {

				$('#jlayercost .layercostbox').removeClass('active');
				$(this).addClass('active');
				rewardGoodsId = $(this).attr('data-id');
				rewardEqual = $(this).attr('data-value');
				rewardImg = $(this).attr('data-img');
				forname = $(this).attr('data-name');
				isobject(); //打赏

			}
		});

	}

	function isobject() { //判断当前有什么对象，打赏

		if(anchorId != null && anchorId != undefined && anchorId != "undefined" && anchorId != "" && anchorName != null && anchorName != undefined && anchorName != "undefined" && anchorName != "") { //如果当前有主播
			if(teacherId != null || teacherId != undefined || teacherId != "undefined" || teacherId != "" || teacherName != null || teacherName != undefined || teacherName != "undefined" || teacherName != "") { //如果当前有嘉宾有主播
				layer.open({
					content: '请选择打赏对象？',
					btn: ['打赏嘉宾', '打赏主播'],
					yes: function(index) { //打赏嘉宾
						rewardTo(teacherId, teacherName);
						layer.closeAll();

					},
					no: function() { //打赏主播
						rewardTo(anchorId, anchorName);
						layer.closeAll();
					}
				});
			} else { //如果当前没有嘉宾有主播
				rewardTo(anchorId, anchorName);
				layer.closeAll();
			}
		} else {
			if(teacherId != null || teacherId != undefined || teacherId != "undefined" || teacherId != "" || teacherName != null || teacherName != undefined || teacherName != "undefined" || teacherName != "") { //如果当前没有主播，有嘉宾
				rewardTo(teacherId, teacherName);
				layer.closeAll();
			} else {
				console.log('当前啥都没有');
			}
		}
	}
	
	
	$('#jrecharge').on('click',function(){//点击充值页面时
		window.WebViewJavascriptBridge.callHandler(
                'pay'
                , {}
                , function(responseData) {
                  
                }
            );
            
		  /*var data = {id: 1, content: "这是一个图片 <img src=\"a.png\"/> test\r\nhahaha"};
            window.WebViewJavascriptBridge.send(
                data
                , function(responseData) {
                    document.getElementById("show").innerHTML = "repsonseData from java, data = " + responseData
                }
            );*/
		/*JSBridge.gotoNative('pay');*/
	});
	
	$("#jHiddenIcon").on("click",function(){
		$(".chat-input-box").css("display","none");
		 //call native method
           window.WebViewJavascriptBridge.callHandler(
               'showBottom'
               , {'param': '显示导航'}
               , function(responseData) {
            	   
               }
           );
	})
	
	$("#bmservice").on("click",function(){
		 //call native method
            window.WebViewJavascriptBridge.callHandler(
                'guestQQ'
                , {'param': '打开QQ'}
                , function(responseData) {
                }
            );
	});
	
	$("#bmcontact").on("click",function(){
		 //call native method
           window.WebViewJavascriptBridge.callHandler(
               'Shangwutong'
               , {'param': '打开QQ'}
               , function(responseData) {
               }
           );
	})
	
	
	//暂定
	function bridgeLog(logContent) {
           document.getElementById("show").innerHTML = logContent;
       }

       function connectWebViewJavascriptBridge(callback) {
           if (window.WebViewJavascriptBridge) {
               callback(WebViewJavascriptBridge)
           } else {
               document.addEventListener(
                   'WebViewJavascriptBridgeReady'
                   , function() {
                       callback(WebViewJavascriptBridge)
                   },
                   false
               );
           }
       }
       
       connectWebViewJavascriptBridge(function(bridge) {
           bridge.init(function(message, responseCallback) {
               console.log('JS got a message', message);
               var data = {
                   'Javascript Responds': '测试中文!'
               };
               console.log('JS responding with', data);
               responseCallback(data);
           });
           
           bridge.registerHandler("showKeyboard", function(data, responseCallback) {
        	   $(".chat-input-box").css("display","block");
               responseCallback(responseData);
           });
       })
       
     //单个
		/*BizQQWPA.addCustom({
			aty: '0', //指定工号类型,0-自动分流，1-指定工号，2-指定分组
			nameAccount: SERVERQQ, //营销 QQ 号码
			selector: 'bmservice' //WPA 被放置的元素
		});*/

});
