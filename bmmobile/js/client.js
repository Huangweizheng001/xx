(function() {
	var d = document,
		w = window,
		p = parseInt,
		dd = d.documentElement,
		db = d.body,
		dc = d.compatMode == 'CSS1Compat',
		dx = dc ? dd : db,
		ec = encodeURIComponent;

	var userGraderLabel = ['普通', '白银', '黄金', '钻石', '专属1', '专属2', '专属3'];

	function returnLevelLabel(level) {
		if(userGraderLabel[level] == undefined) {
			return "游客";
		} else {
			return userGraderLabel[level];
		}
	}

	var ipArr = [];

	var tempObjArr = [],
		objIndex = 0;

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
			var d = $('#chatbox');
			d.scrollTop(d.prop("scrollHeight"));
			$("#chatbox").animate({
				scrollTop: $('#chatbox')[0].scrollHeight
			}, 1000); //可选
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
					type: 'content',
					userid: this.userid,
					username: this.username,
					userImg: this.userImg,
					userGrade: this.userGrade,
					content: content,
					subTime: times,
					userVartar: this.userVartar,
					userType: localStorage.getItem("mUserType") //1是管理员
				};

				var _this = this;
				var userType = localStorage.getItem("mUserType");
				if(userType == "1" || userType == 1 || userType == "2" || userType == 2) {
					//this.socket.emit('message', obj);
					this.socket.emit('admin_msg', obj);
				} else {
					this.socket.emit('for_admin', obj);
				}

				d.getElementById("chatContent").innerHTML = '';
				setTimeout(function() {
					d.getElementById("chatContent").innerHTML = '';
				}, 100);
			}

			return false;
		},

		againSend: function(obj, classObj) {
			this.socket.emit('message', obj);
			this.socket.emit('for_admin_flag', classObj);
		},

		getObjInf: function(index, classObj, ele) {
			CHAT.againSend(tempObjArr[index], classObj)
		},
		delObjInf: function(optObj) {
			this.socket.emit('to_all', optObj);
		},
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
				userVartar: this.userVartar,
				userType: localStorage.getItem("mUserType") //1是管理员
			};
			this.socket.emit('admin_msg', obj);
		},
		init: function(username, userImg, userGrade, ipAddress, relativeImgUser) {
			/*
			客户端根据时间和随机数生成uid,这样使得聊天室用户名称可以重复。
			实际项目中，如果是需要用户登录，那么直接采用用户的uid来做标识就可以
			*/
			this.userid = this.genUid();
			this.username = username;
			this.userImg = userImg;
			this.userGrade = userGrade;
			this.userAddress = ipAddress;
			this.userVartar = relativeImgUser;
			//连接websocket后端服务器
			//this.socket = io.connect('ws://realtime.plhwin.com');
			this.socket = io.connect('http://116.62.226.90:3000');
			//this.socket = io.connect('http://192.168.101.180:3000');
			//this.socket = io.connect('http://192.168.101.187:3000');

			//告诉服务器端有用户登录
			this.socket.emit('login', {
				userid: this.userid,
				username: this.username,
				userImg: this.userImg,
				userAddress: this.userAddress,
				userGrade: this.userGrade,
				userVartar: this.userVartar,
				userType: localStorage.getItem("mUserType") //1是管理员
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

			//监听用户退出
			this.socket.on('logout', function(o) {
				CHAT.updateSysMsg(o, 'logout');
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
			this.socket.on('for_admin_flag', function(obj) {
				var section = d.createElement('span');
				section.innerHTML = '<style>.yc' + obj + ':after{content:"已审核";color:#f00}</style>';
				CHAT.msgObj.appendChild(section);
			});

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

			//初始数据
			var flag = true;
			this.socket.on('init_msg', function(obj) {
				if(flag == false) {
					return false;
				}
				flag = false;
				for(var i = 0; i < obj.length; i++) {
					//console.log(obj[i].userType);
					if(obj[i].type == 'content') {
						var uid = obj[i].userid.substr(obj[i].userid.length - 4);
						if(!(obj[i].userGrade > -1 && obj[i].userGrade < 7)) {
							obj[i].username = obj[i].username + uid;
						}
						//console.log(obj[i].userType);
						if((obj[i].userType != '1') && (obj[i].userType != 1)) {
							var section = d.createElement('div');
							section.className = 'inflibox ycmessage' + obj[i].subTime;
							var userInf = '<div class="userInf"><span class="userLevel userLevel' + obj[i].userGrade + '">' + returnLevelLabel(obj[i].userGrade) + '</span>' +
								'<span class="userName">' + obj[i].username + '</span></div>' +
								'<div class="sendContent">' + getImageUrl(obj[i].content) + '</div>';
							section.innerHTML = userInf;
						} else {
							var section = d.createElement('div');
							section.className = 'inflibox adminUserBox ycmessage' + obj[i].subTime;
							var userInf = '<div class="adminUserInf"><span class="userIcon">' +
								'<img src="http://www.bomizx.net/bmOnline/' + obj[i].userVartar + '"/></span>' +
								'<span class="userLevel">管理员</span></div>' +
								'<div class="sendContent">' +
								'<span class="userName">' + obj[i].username + ':</span>' +
								getImageUrl(obj[i].content) + '</div>';

							section.innerHTML = userInf;

						}

					} else if(obj[i].type == 'cost') {
						var section = d.createElement('div');
						section.className = 'inflibox reward ycmessage' + obj[i].subTime;
						var userInf = '<div class="userInf"><span class="userLevel userLevel' + obj[i].userGrade + '">' + returnLevelLabel(obj[i].userGrade) + '</span>' +
							'<span class="userName">' + obj[i].username + '</span></div>' +
							'<div class="sendContent"><span>打赏</span>' +
							'<span class="rewardObj">' + obj[i].obType + '</span>' +
							'<span class="rewardNumber">' + obj[i].num + ' X</span>' +
							'<img src="' + obj[i].rgoods + '" /></div>';

						section.innerHTML = userInf;

					} else {
						var section = d.createElement('span');
						section.innerHTML = '<style>.ycmessage' + obj[i] + '{display:none}</style>';
					}
					CHAT.msgObj.appendChild(section);
				}

				CHAT.scrollToBottom();

			});

			//监听消息发送
			this.socket.on('for_admin', function(obj) {
				//var times = Date.parse(new Date());		
				if(obj.type == 'content') {
					var uid = obj.userid.substr(obj.userid.length - 4);
					if(!(obj.userGrade > -1 && obj.userGrade < 7)) {
						obj.username = obj.username + uid;
					}
					console.log(obj.userType);
					if((obj.userType != '1') && (obj.userType != 1)) {
						var section = d.createElement('div');
						section.className = 'inflibox ycmessage' + obj.subTime;
						var userInf = '<div class="userInf"><span class="userLevel userLevel' + obj.userGrade + '">' + returnLevelLabel(obj.userGrade) + '</span>' +
							'<span class="userName">' + obj.username + '</span></div>' +
							'<div class="sendContent">' + obj.content + '</div>';
						section.innerHTML = userInf;
					} else {
						var section = d.createElement('div');
						section.className = 'inflibox adminUserBox ycmessage' + obj.subTime;
						var userInf = '<div class="adminUserInf"><span class="userIcon">' +
							'<img src="http://www.bomizx.net/bmOnline/' + obj.userVartar + '"/></span>' +
							'<span class="userLevel">管理员</span></div>' +
							'<div class="sendContent">' +
							'<span class="userName">' + obj.username + ':</span>' +
							obj.content + '</div>';
						section.innerHTML = userInf;
					}

				} else if(obj.type == 'cost') {
					var section = d.createElement('div');
					section.className = 'inflibox reward ycmessage' + obj.subTime;
					var userInf = '<div class="userInf"><span class="userLevel userLevel' + obj.userGrade + '">' + returnLevelLabel(obj.userGrade) + '</span>' +
						'<span class="userName">' + obj.username + '</span></div>' +
						'<div class="sendContent"><span>打赏</span>' +
						'<span class="rewardObj">' + obj.obType + '</span>' +
						'<span class="rewardNumber">' + obj.num + ' X</span>' +
						'<img src="' + obj.rgoods + '" /></div>';

					section.innerHTML = userInf;
				}
				CHAT.msgObj.appendChild(section);
			});

			//监听消息发送
			this.socket.on('message', function(obj) {
				//var times = Date.parse(new Date());		
				if(obj.type == 'content') {
					var uid = obj.userid.substr(obj.userid.length - 4);
					if(!(obj.userGrade > -1 && obj.userGrade < 7)) {
						obj.username = obj.username + uid;
					}
					if((obj.userType != '1') && (obj.userType != 1)) {
						var section = d.createElement('div');
						section.className = 'inflibox ycmessage' + obj.subTime;
						var userInf = '<div class="userInf"><span class="userLevel userLevel' + obj.userGrade + '">' + returnLevelLabel(obj.userGrade) + '</span>' +
							'<span class="userName">' + obj.username + '</span></div>' +
							'<div class="sendContent">' + getImageUrl(obj.content) + '</div>';
						section.innerHTML = userInf;
					} else {
						var section = d.createElement('div');
						section.className = 'inflibox adminUserBox ycmessage' + obj.subTime;
						var userInf = '<div class="adminUserInf"><span class="userIcon">' +
							'<img src="http://www.bomizx.net/bmOnline/' + obj.userVartar + '"/></span>' +
							'<span class="userLevel">管理员</span></div>' +
							'<div class="sendContent">' +
							'<span class="userName">' + obj.username + ':</span>' +
							getImageUrl(obj.content) + '</div>';
						section.innerHTML = userInf;
					}

				} else if(obj.type == 'cost') {
					var section = d.createElement('div');
					section.className = 'inflibox reward ycmessage' + obj.subTime;
					var userInf = '<div class="userInf"><span class="userLevel userLevel' + obj.userGrade + '">' + returnLevelLabel(obj.userGrade) + '</span>' +
						'<span class="userName">' + obj.username + '</span></div>' +
						'<div class="sendContent"><span>打赏</span>' +
						'<span class="rewardObj">' + obj.obType + '</span>' +
						'<span class="rewardNumber">' + obj.num + ' X</span>' +
						'<img src="' + obj.rgoods + '" /></div>';

					section.innerHTML = userInf;
				}
				CHAT.msgObj.appendChild(section);
				CHAT.scrollToBottom();
			});

			//监听消息发送-管理员
			this.socket.on('admin_msg', function(obj) {
				if(obj.type == 'content') {
					if((obj.userType != '1') && (obj.userType != 1)) {
						var uid = obj.userid.substr(obj.userid.length - 4);
						if(!(obj.userGrade > -1 && obj.userGrade < 7)) {
							obj.username = obj.username + uid;
						}
						var usernameDiv = '<span class="dycplayname"><span class="ycuserName">' + obj.username + '</span>：<a href="#this" class="ycdelete" onclick="CHAT.delObjInf(' + obj.subTime + ');"></a></span>';
						var section = d.createElement('div');
						section.className = 'dycdiscuss-box ycmessage' + obj.subTime;
						switch(obj.userGrade) {
							case 0: //普通会员
								section.innerHTML = '<div class="clearfix"><span class="dycadmin dycadmin-ordinary" style="background-image:url(' + obj.userImg + ')"></span>' + usernameDiv + obj.content + '</div>';
								break;
							case 1: //白银
								section.innerHTML = '<div class="clearfix"><span class="dycadmin dycadmin-silver" style="background-image:url(' + obj.userImg + ')"></span>' + usernameDiv + obj.content + '</div>';
								break;
							case 2: //黄金
								section.innerHTML = '<div class="clearfix"><span class="dycadmin dycadmin-gold" style="background-image:url(' + obj.userImg + ')"></span>' + usernameDiv + obj.content + '</div>';
								break;
							case 3: //钻石
								section.innerHTML = '<div class="clearfix"><span class="dycadmin dycadmin-diamond" style="background-image:url(' + obj.userImg + ')"></span>' + usernameDiv + obj.content + '</div>';
								break;
							case 4: //专属
								section.innerHTML = '<div class="clearfix"><span class="dycadmin dycadmin-exclusive" style="background-image:url(' + obj.userImg + ')"></span>' + usernameDiv + obj.content + '</div>';
								break;
							case 5: //专属
								section.innerHTML = '<div class="clearfix"><span class="dycadmin dycadmin-exclusive" style="background-image:url(' + obj.userImg + ')"></span>' + usernameDiv + obj.content + '</div>';
								break;
							case 6: //专属
								section.innerHTML = '<div class="clearfix"><span class="dycadmin dycadmin-exclusive" style="background-image:url(' + obj.userImg + ')"></span>' + usernameDiv + obj.content + '</div>';
								break;
							default: //游客
								usernameDiv = '<span class="dycplayname"><span class="ycuserName">' + obj.username + uid + '</span>：</span>';
								usernameDiv = '<span class="dycplayname"><span class="ycuserName">' + obj.username + uid + '</span>：<a href="#this" class="ycdelete" onclick="CHAT.delObjInf(' + obj.subTime + ');"></a></span>';

								section.innerHTML = '<div class="clearfix"><span class="dycadmin" style="background-image:url(' + obj.userImg + ')"></span>' + usernameDiv + getImageUrl(obj.content) + '</div>';
						}
					} else {

						var section = d.createElement('div');
						section.className = 'inflibox adminUserBox ycmessage' + obj.subTime;
						var userInf = '<div class="adminUserInf"><span class="userIcon">' +
							'<img src="http://www.bomizx.net/bmOnline/' + obj.userVartar + '"/></span>' +
							'<span class="userLevel">管理员</span></div>' +
							'<div class="sendContent">' +
							'<span class="userName">' + obj.username + ':</span>' +
							getImageUrl(obj.content) + '</div>';
						section.innerHTML = userInf;

					}
					CHAT.msgObj.appendChild(section);
					CHAT.scrollToBottom();
				} else {
					if((obj.userType != '1') && (obj.userType != 1)) {
						var html = '';
						html += '<div class="msg-system" style="text-align:left">';
						switch(obj.userGrade) {
							case 0: //普通会员
								html += '<span class="grader grader-ordinary" style="background-image:url(' + obj.userImg + ')"></span>';
								break;
							case 1: //白银
								html += '<span class="grader grader-silver" style="background-image:url(' + obj.userImg + ')"></span>';
								break;
							case 2: //黄金
								html += '<span class="grader grader-gold" style="background-image:url(' + obj.userImg + ')"></span>';
								break;
							case 3: //钻石
								html += '<span class="grader grader-diamond" style="background-image:url(' + obj.userImg + ')"></span>';
								break;
							case 4: //专属
								html += '<span class="grader grader-exclusive"" style="background-image:url(' + obj.userImg + ')"></span>';
								break;
							case 5: //专属
								html += '<span class="grader grader-exclusive"" style="background-image:url(' + obj.userImg + ')"></span>';
								break;
							case 6: //专属
								html += '<span class="grader grader-exclusive"" style="background-image:url(' + obj.userImg + ')"></span>';
								break;
							default: //游客
								html += '<span class="grader" style="background-image:url(' + obj.userImg + ')"></span>';
						}
						html += '<span class="dycplayname">' + obj.username + '：</span>' + '打赏给' + obj.obType + obj.num;
						html += '个<div class="msg-system-img"><img src = ' + obj.rgoods + ' /></div></div>';
						var section = d.createElement('div');
						section.className = 'system J-mjrlinkWrap J-cutMsg';
						section.innerHTML = html;
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

			});

		}
	};
})();