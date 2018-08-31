(function() {
	var d = document,
		w = window,
		p = parseInt,
		dd = d.documentElement,
		db = d.body,
		dc = d.compatMode == 'CSS1Compat',
		dx = dc ? dd : db,
		ec = encodeURIComponent;

	var ipArr = [];

	var tempObjArr = [],
		objIndex = 0;

	w.CHAT = {
		msgObj: d.getElementById("message"),
		//	screenheight:w.innerHeight ? w.innerHeight : dx.clientHeight,
		username: null,
		userImg: null,
		userGrade: null,
		userid: null,
		socket: null,

		//让浏览器滚动条保持在最低部
		scrollToBottom: function(height) {
			w.scrollTo(0, height);
		},
		//退出，本例只是一个简单的刷新
		logout: function() {
			//this.socket.disconnect();
			location.reload();
		},
		//提交聊天消息内容
		submit: function(type, eleObj) {
			var times = Date.parse(new Date());
			if(type == 2) {
				var content = '<img src="' + eleObj + '"/>';
			} else {
				var content = d.getElementById("content").innerHTML;
			}

			if(content != '') {
				var obj = {
					type: 'content',
					userid: this.userid,
					username: this.username,
					userImg: this.userImg,
					userGrade: this.userGrade,
					content: content,
					subTime: times,
					userVartar:$mUserIcon,
					userType: localStorage.getItem("mUserType") //1是管理员
				};

				var _this = this;
				var userType = localStorage.getItem("mUserType");
				if(userType == "1" || userType == 1 || userType == "2" || userType == 2) {
					//this.socket.emit('message', obj);
					this.socket.emit('admin_msg', obj);
				} else {
					this.socket.emit('for_admin', obj);
					
					var uid = obj.userid.substr(obj.userid.length - 4);
					if(obj.type == 'content') {
						if((obj.userType != '1') && (obj.userType != 1)) {
							var usernameDiv = '<span class="dycplayname" style="text-align:left"><span class="ycuserName">' + obj.username + ' : </span></span>';
							var section = d.createElement('div');
							/*section.className = 'dycdiscuss-box ' + "ycmessage" + obj.subTime + " ycmessageold" + obj.subTime;*/
							section.className = 'dycdiscuss-box ' +  " ycmessageold" + obj.subTime;
							switch(obj.userGrade) {
								case 0: //普通会员
									section.innerHTML = '<div class="clearfix dycordinary"><span class="dycadmin dycadmin-ordinary" style="background-image:url(../ycedu/images/grader.png)"></span>' + usernameDiv + obj.content + '</div>';
									break;
								case 1: //白银
									section.innerHTML = '<div class="clearfix dycsilver"><span class="dycadmin dycadmin-silver" style="background-image:url(../ycedu/images/grader.png)"></span>' + usernameDiv + obj.content + '</div>';
									break;
								case 2: //黄金
									section.innerHTML = '<div class="clearfix dycgold"><span class="dycadmin dycadmin-gold" style="background-image:url(../ycedu/images/grader.png)"></span>' + usernameDiv + obj.content + '</div>';
									break;
								case 3: //钻石
									section.innerHTML = '<div class="clearfix dycdiamond"><span class="dycadmin dycadmin-diamond" style="background-image:url(../ycedu/images/grader.png)"></span>' + usernameDiv + obj.content + '</div>';
									break;
								case 4: //专属
									section.innerHTML = '<div class="clearfix dycexclusive"><span class="dycadmin dycadmin-exclusive" style="background-image:url(../ycedu/images/grader.png)"></span>' + usernameDiv + obj.content + '</div>';
									break;
								case 5: //专属
									section.innerHTML = '<div class="clearfix dycexclusive"><span class="dycadmin dycadmin-exclusive" style="background-image:url(../ycedu/images/grader.png)"></span>' + usernameDiv + obj.content + '</div>';
									break;
								case 6: //专属
									section.innerHTML = '<div class="clearfix dycexclusive"><span class="dycadmin dycadmin-exclusive" style="background-image:url(../ycedu/images/grader.png)"></span>' + usernameDiv + obj.content + '</div>';
									break;
								default: //游客
									usernameDiv = '<span class="dycplayname" style="text-align:left"><span class="ycuserName">' + obj.username + uid + ' : </span></span>';

									section.innerHTML = '<div class="clearfix"><span class="dycadmin" style="background-image:url(../ycedu/images/grader.png)"></span>' + usernameDiv + obj.content + '</div>';
							}
						} else {
							var usernameImg = '<div class="dycadmin-admin-img"><img src=' + ROUTEFILE + obj.userVartar + '></div>';
							var usernameDiv = '<span class="dycplayname">' + objobj[i].username + '</span>';
							var section = d.createElement('div');
							section.className = 'dycdiscuss-box-admin clearfix ycmessage' + obj.subTime;
							section.innerHTML = usernameImg + '<div class="dycadmin-box"><div class="dycadmin dycadmin-admin"></div>' + usernameDiv + obj.content + '</div>';
						}
						CHAT.msgObj.appendChild(section);
						setTimeout(function() {
							$(".bmmessagePanel").mCustomScrollbar("scrollTo", $("#message").height());
						}, 500)
					}
				}

				d.getElementById("content").innerHTML = '';
				setTimeout(function() {
					d.getElementById("content").innerHTML = '';
				}, 100);
				setTimeout(function() {
						$(".bmmessagePanel").mCustomScrollbar("scrollTo", $("#chat").height());
					}, 100)
				/*var height = $("#chat")[0].scrollHeight;
				var chath = $('#doc').height();
				setTimeout(function() {
					if(height > chath) {
						$("#doc").scrollTop(height);
						$("#chatbox").scrollTop(height);
					}
				}, 100)*/

				
			}

			return false;
		},

		againSend: function(obj, classObj) {
			this.socket.emit('message', obj);
			this.socket.emit('for_admin_flag', classObj);
		},

		getObjInf: function(index, classObj, ele) {
			CHAT.againSend(tempObjArr[index], classObj)
			//			ele.className = "reviewed";
			//			ele.innerHTML = "<span'>已审核 </span>";
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

			var htmlStr = "";
			for(var i in onlineAddArr) {
				htmlStr += "<li><p>" + i + "&nbsp;&nbsp;" + onlineAddArr[i][0].address + "</p>";
				for(var j in onlineAddArr[i]) {
					htmlStr += '<p class="yc-user-li">' + onlineAddArr[i][j].name + '&nbsp; uid：' + onlineAddArr[i][j].userid + '</p>';
				}
				htmlStr += "</li>";
			}

			$("#jmanageBox").html(htmlStr);

			var htmlUserStr = "<option>选择对象</option>";
			for(var z in onlineUsers) {
				if(onlineUsers[z][0].name == "游客") {
					onlineUsers[z][0].name = onlineUsers[z][0].name + onlineUsers[z][0].userid.substr(onlineUsers[z][0].userid.length - 4);
				}
				htmlUserStr += '<option>' + onlineUsers[z][0].name + '</option>';
			}

			$("#jmanageUser").html(htmlUserStr);
			$('#jpopular').text(onlineCount); //人气

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

			//添加系统消息
			var html = '';
			html += '<div class="msg-system">';
			html += user.username;
			html += (action == 'login') ? ' 加入了聊天室' : ' 退出了聊天室';
			html += '</div>';
			var section = d.createElement('div');
			section.className = 'system J-mjrlinkWrap J-cutMsg';
			section.innerHTML = html;
			//this.msgObj.appendChild(section);
			CHAT.scrollToBottom();
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
				userVartar:$mUserIcon,
				userType: localStorage.getItem("mUserType") //1是管理员
			};
			this.socket.emit('admin_msg', obj);
		},
		init: function(username, userImg, userGrade, ipAddress) {
			/*
			客户端根据时间和随机数生成uid,这样使得聊天室用户名称可以重复。
			实际项目中，如果是需要用户登录，那么直接采用用户的uid来做标识就可以
			*/
			this.userid = this.genUid();
			this.username = username;
			this.userImg = userImg;
			this.userGrade = userGrade;
			this.userAddress = ipAddress;
			this.scrollToBottom();
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
				userVartar:$mUserIcon,
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
				$("#jmanageOpen,#jmanageUser").css("display", "inline-block");
			} else {
				_this.socket.emit('group2');
			}

			//监听用户退出
			this.socket.on('logout', function(o) {
				CHAT.updateSysMsg(o, 'logout');
			});

			this.socket.on('icost', function() {
				//alert(1)
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

			//监听消息发送
			this.socket.on('for_admin_flag', function(obj) {
				var section = d.createElement('span');
				section.innerHTML = '<style>.yc' + obj + ':after{content:"已审核";color:#f00}</style>';
				CHAT.msgObj.appendChild(section);
				setTimeout(function() {
						$(".bmmessagePanel").mCustomScrollbar("scrollTo", $("#message").height());
					}, 100)
			});

			//监听消息发送
			this.socket.on('to_all', function(obj) {
				var section = d.createElement('span');
				section.innerHTML = '<style>.ycmessage' + obj + '{display:none}</style>';
				CHAT.msgObj.appendChild(section);
				setTimeout(function() {
						$(".bmmessagePanel").mCustomScrollbar("scrollTo", $("#message").height());
					}, 100)
			});
			
			//监听消息发送
			this.socket.on('to_self', function(obj) {
				var section = d.createElement('span');
				section.innerHTML = '<style>.ycmessageold' + obj + '{display:none}</style>';
				CHAT.msgObj.appendChild(section);
				setTimeout(function() {
						$(".bmmessagePanel").mCustomScrollbar("scrollTo", $("#message").height());
					}, 100)
			});

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
						if((obj[i].userType != '1') && (obj[i].userType != 1)) {
							var usernameDiv = '<span class="dycplayname"><span class="ycuserName">' + obj[i].username + '</span>：</span>';
							var section = d.createElement('div');
							section.className = 'dycdiscuss-box ycmessage' + obj[i].subTime;
							switch(obj[i].userGrade) {
								case 0: //普通会员
									section.innerHTML = '<div class="clearfix dycordinary"><span class="dycadmin dycadmin-ordinary" style="background-image:url(' + obj[i].userImg + ')"></span>' + usernameDiv + obj[i].content + '</div>';
									break;
								case 1: //白银
									section.innerHTML = '<div class="clearfix dycsilver"><span class="dycadmin dycadmin-silver" style="background-image:url(' + obj[i].userImg + ')"></span>' + usernameDiv + obj[i].content + '</div>';
									break;
								case 2: //黄金
									section.innerHTML = '<div class="clearfix dycgold"><span class="dycadmin dycadmin-gold" style="background-image:url(' + obj[i].userImg + ')"></span>' + usernameDiv + obj[i].content + '</div>';
									break;
								case 3: //钻石
									section.innerHTML = '<div class="clearfix dycdiamond"><span class="dycadmin dycadmin-diamond" style="background-image:url(' + obj[i].userImg + ')"></span>' + usernameDiv + obj[i].content + '</div>';
									break;
								case 4: //专属
									section.innerHTML = '<div class="clearfix dycexclusive"><span class="dycadmin dycadmin-exclusive" style="background-image:url(' + obj[i].userImg + ')"></span>' + usernameDiv + obj[i].content + '</div>';
									break;
								case 5: //专属
									section.innerHTML = '<div class="clearfix dycexclusive"><span class="dycadmin dycadmin-exclusive" style="background-image:url(' + obj[i].userImg + ')"></span>' + usernameDiv + obj[i].content + '</div>';
									break;
								case 6: //专属
									section.innerHTML = '<div class="clearfix dycexclusive"><span class="dycadmin dycadmin-exclusive" style="background-image:url(' + obj[i].userImg + ')"></span>' + usernameDiv + obj[i].content + '</div>';
									break;
								default: //游客
									usernameDiv = '<span class="dycplayname"><span class="ycuserName">' + obj[i].username + uid + '</span>：</span>';
									section.innerHTML = '<div class="clearfix"><span class="dycadmin" style="background-image:url(' + obj[i].userImg + ')"></span>' + usernameDiv + obj[i].content + '</div>';
							}
						} else {
							var usernameImg = '<div class="dycadmin-admin-img"><img src='  +ROUTEFILE+ obj[i].userVartar + '></div>';
							var usernameDiv = '<span class="dycplayname">' + obj[i].username + '：</span>';
							var section = d.createElement('div');
							section.className = 'dycdiscuss-box-admin clearfix ycmessage' + obj[i].subTime;
							section.innerHTML = usernameImg + '<div class="dycadmin-box"><div class="dycadmin dycadmin-admin"></div>' + usernameDiv + obj[i].content + '</div>';

						}

						CHAT.msgObj.appendChild(section);
						setTimeout(function() {
							$(".bmmessagePanel").mCustomScrollbar("scrollTo",$("#message").height());
						}, 100);
						/*var height = $("#chat")[0].scrollHeight;
						var chath = $('#doc').height();
						setTimeout(function() {
							if(height > chath) {
								$("#doc").scrollTop(height);
							}
						}, 100);*/
					} else if(obj[i].type == 'cost') {
						if((obj[i].userType != '1') && (obj[i].userType != 1)) {
							var html = '';
							switch(obj[i].userGrade) {
								case 0: //普通会员
									html += '<div class="msg-system dycordinary" style="text-align:left"><span class="grader grader-ordinary" style="background-image:url(' + obj[i].userImg + ')"></span>';
									break;
								case 1: //白银
									html += '<div class="msg-system dycsilver" style="text-align:left"><span class="grader grader-silver" style="background-image:url(' + obj[i].userImg + ')"></span>';
									break;
								case 2: //黄金
									html += '<div class="msg-system dycgold" style="text-align:left"><span class="grader grader-gold" style="background-image:url(' + obj[i].userImg + ')"></span>';
									break;
								case 3: //钻石
									html += '<div class="msg-system dycdiamond" style="text-align:left"><span class="grader grader-diamond" style="background-image:url(' + obj[i].userImg + ')"></span>';
									break;
								case 4: //专属
									html += '<div class="msg-system dycexclusive" style="text-align:left"><span class="grader grader-exclusive"" style="background-image:url(' + obj[i].userImg + ')"></span>';
									break;
								case 5: //专属
									html += '<div class="msg-system dycexclusive" style="text-align:left"><span class="grader grader-exclusive"" style="background-image:url(' + obj[i].userImg + ')"></span>';
									break;
								case 6: //专属
									html += '<div class="msg-system dycexclusive" style="text-align:left"><span class="grader grader-exclusive"" style="background-image:url(' + obj[i].userImg + ')"></span>';
									break;
								default: //游客
									html += '<div class="msg-system" style="text-align:left"><span class="grader" style="background-image:url(' + obj[i].userImg + ')">></span>';
							}
							html += '<span class="dycplayname">' + obj[i].username + '：</span>' + '打赏给' + obj[i].obType + obj[i].num;
							html += '个<div class="msg-system-img"><img src = ' + obj[i].rgoods + ' /></div></div>';
							var section = d.createElement('div');
							section.className = 'system J-mjrlinkWrap J-cutMsg';
							section.innerHTML = html;
						} else {
							var usernameImg = '<div class="dycadmin-admin-img"><img src='  +ROUTEFILE+ obj[i].userVartar + '></div>';
							var usernameDiv = '<span class="dycplayname">' + obj[i].username + ':</span>打赏给' + obj[i].obType + obj[i].num + '个<div class="msg-system-img"><img src = ' + obj[i].rgoods + ' /></div>';
							var section = d.createElement('div');
							section.className = 'dycdiscuss-box-admin clearfix ycmessage' + obj[i].subTime;
							section.innerHTML = usernameImg + '<div class="dycadmin-box"><div class="dycadmin dycadmin-admin"></div>' + usernameDiv + '</div>';
						}
						CHAT.msgObj.appendChild(section);
						setTimeout(function() {
							$(".bmmessagePanel").mCustomScrollbar("scrollTo",$("#message").height());
						}, 100);
						/*var height = $("#chat")[0].scrollHeight;
						var chath = $('#doc').height();
						setTimeout(function() {
							if(height > chath) {
								$("#doc").scrollTop(height);
							}
						}, 100);*/
				}else {
						var section = d.createElement('span');
						section.innerHTML = '<style>.ycmessage' + obj[i] + '{display:none}</style>';
						CHAT.msgObj.appendChild(section);
					}
				}
				$(".bmmessagePanel").mCustomScrollbar("update");
			});

			//监听消息发送
			this.socket.on('for_admin', function(obj) {
				//var times = Date.parse(new Date());
				var uid = obj.userid.substr(obj.userid.length - 4);
				if(obj.type == 'content') {
					if((obj.userType != '1') && (obj.userType != 1)) {
					tempObjArr.push(obj);
					var usernameDiv = '<span class="dycplayname" style="text-align:left"><span class="ycuserName">' + obj.username + '</span>：<a href="#this" class="ycstatus yc' + obj.subTime + '" onclick="CHAT.getObjInf(' + objIndex + ',' + obj.subTime + ',this);"></a><a href="#this" class="ycdelete" onclick="CHAT.delObjInf(' + obj.subTime + ');"></a></span>';
					var section = d.createElement('div');
					section.className = 'dycdiscuss-box ' + "ycmessage" + obj.subTime;
					switch(obj.userGrade) {
						case 0: //普通会员
							section.innerHTML = '<div class="clearfix dycordinary"><span class="dycadmin dycadmin-ordinary" style="background-image:url(' + obj.userImg + ')"></span>' + usernameDiv + obj.content + '</div>';
							break;
						case 1: //白银
							section.innerHTML = '<div class="clearfix dycsilver"><span class="dycadmin dycadmin-silver" style="background-image:url(' + obj.userImg + ')"></span>' + usernameDiv + obj.content + '</div>';
							break;
						case 2: //黄金
							section.innerHTML = '<div class="clearfix dycgold"><span class="dycadmin dycadmin-gold" style="background-image:url(' + obj.userImg + ')"></span>' + usernameDiv + obj.content + '</div>';
							break;
						case 3: //钻石
							section.innerHTML = '<div class="clearfix dycdiamond"><span class="dycadmin dycadmin-diamond" style="background-image:url(' + obj.userImg + ')"></span>' + usernameDiv + obj.content + '</div>';
							break;
						case 4: //专属
							section.innerHTML = '<div class="clearfix dycexclusive"><span class="dycadmin dycadmin-exclusive" style="background-image:url(' + obj.userImg + ')"></span>' + usernameDiv + obj.content + '</div>';
							break;
						case 5: //专属
							section.innerHTML = '<div class="clearfix dycexclusive"><span class="dycadmin dycadmin-exclusive" style="background-image:url(' + obj.userImg + ')"></span>' + usernameDiv + obj.content + '</div>';
							break;
						case 6: //专属
							section.innerHTML = '<div class="clearfix dycexclusive"><span class="dycadmin dycadmin-exclusive" style="background-image:url(' + obj.userImg + ')"></span>' + usernameDiv + obj.content + '</div>';
							break;
						default: //游客
							usernameDiv = '<span class="dycplayname" style="text-align:left"><span class="ycuserName">' + obj.username + uid + '</span>：<a href="#this" class="ycstatus yc' + obj.subTime + '" onclick="CHAT.getObjInf(' + objIndex + ',' + obj.subTime + ',this);"></a><a href="#this" class="ycdelete" onclick="CHAT.delObjInf(' + obj.subTime + ');"></a></span>';

							section.innerHTML = '<div class="clearfix"><span class="dycadmin" style="background-image:url(' + obj.userImg + ')"></span>' + usernameDiv + obj.content + '</div>';
					}
					}else{
						var usernameImg = '<div class="dycadmin-admin-img"><img src='+ROUTEFILE+ obj.userVartar + '></div>';
							var usernameDiv = '<span class="dycplayname">' + objobj[i].username + '：<a href="#this" class="ycdelete" onclick="CHAT.delObjInf(' + obj.subTime + ');"></a></span>';
							var section = d.createElement('div');
							section.className = 'dycdiscuss-box-admin clearfix ycmessage' + obj.subTime;
							section.innerHTML = usernameImg + '<div class="dycadmin-box"><div class="dycadmin dycadmin-admin"></div>' + usernameDiv + obj.content + '</div>';
					}
					CHAT.msgObj.appendChild(section);
					setTimeout(function() {
						$(".bmmessagePanel").mCustomScrollbar("scrollTo", $("#message").height());
					}, 500)
					/*var height = $("#chat")[0].scrollHeight;
					var chath = $('#doc').height();
					setTimeout(function() {
						if(height > chath) {
							$("#chatbox").scrollTop(height);
						}
					}, 100);*/
					objIndex++;
				} else {
					if((obj.userType != '1') && (obj.userType != 1)) {
					var html = '';
					html += '<div class="msg-system">';
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
							html += '<span class="grader" style="background-image:url(' + obj.userImg + ')">></span>';
					}

					html += obj.username + '打赏给' + obj.obType;
					html += '<div class="msg-system-img"><img src = ' + obj.rgoods + ' /></div>x<span class="msg-system-num">' + obj.num;
					html += '</span></div>';
					var section = d.createElement('div');
					section.className = 'system J-mjrlinkWrap J-cutMsg';
					section.innerHTML = html;
				}else{
					var usernameImg = '<div class="dycadmin-admin-img"><img src=' +ROUTEFILE+ obj.userVartar + '></div>';
							var usernameDiv = '<span class="dycplayname">' + obj.username + ':</span>打赏给' + obj.obType + obj.num + '个<div class="msg-system-img"><img src = ' + obj.rgoods + ' /></div>';
							var section = d.createElement('div');
							section.className = 'dycdiscuss-box-admin clearfix ycmessage' + obj.subTime;
							section.innerHTML = usernameImg + '<div class="dycadmin-box"><div class="dycadmin dycadmin-admin"></div>' + usernameDiv + '</div>';
				}
					CHAT.msgObj.appendChild(section);
					setTimeout(function() {
						$(".bmmessagePanel").mCustomScrollbar("scrollTo", $("#message").height());
					}, 100);
					/*var height = $("#chat")[0].scrollHeight;
					var chath = $('#doc').height();
					setTimeout(function() {
						if(height > chath) {
							
							$("#chatbox").scrollTop(height);
						}
					}, 100)*/
				}
				$(".bmmessagePanel").mCustomScrollbar("update");
			});

			//监听消息发送
			this.socket.on('message', function(obj) {
				if(obj.type == 'content') {
					if((obj.userType != '1') && (obj.userType != 1)) {
					var uid = obj.userid.substr(obj.userid.length - 4);
					var usernameDiv = '<span class="dycplayname"><span class="ycuserName">' + obj.username + '</span>：</span>';
					var section = d.createElement('div');
					section.className = 'dycdiscuss-box ycmessage' + obj.subTime;
					switch(obj.userGrade) {
						case 0: //普通会员
							section.innerHTML = '<div class="clearfix dycordinary"><span class="dycadmin dycadmin-ordinary" style="background-image:url(' + obj.userImg + ')"></span>' + usernameDiv + obj.content + '</div>';
							break;
						case 1: //白银
							section.innerHTML = '<div class="clearfix dycsilver"><span class="dycadmin dycadmin-silver" style="background-image:url(' + obj.userImg + ')"></span>' + usernameDiv + obj.content + '</div>';
							break;
						case 2: //黄金
							section.innerHTML = '<div class="clearfix dycgold"><span class="dycadmin dycadmin-gold" style="background-image:url(' + obj.userImg + ')"></span>' + usernameDiv + obj.content + '</div>';
							break;
						case 3: //钻石
							section.innerHTML = '<div class="clearfix dycdiamond"><span class="dycadmin dycadmin-diamond" style="background-image:url(' + obj.userImg + ')"></span>' + usernameDiv + obj.content + '</div>';
							break;
						case 4: //专属
							section.innerHTML = '<div class="clearfix dycexclusive"><span class="dycadmin dycadmin-exclusive" style="background-image:url(' + obj.userImg + ')"></span>' + usernameDiv + obj.content + '</div>';
							break;
						case 5: //专属
							section.innerHTML = '<div class="clearfix dycexclusive"><span class="dycadmin dycadmin-exclusive" style="background-image:url(' + obj.userImg + ')"></span>' + usernameDiv + obj.content + '</div>';
							break;
						case 6: //专属
							section.innerHTML = '<div class="clearfix dycexclusive"><span class="dycadmin dycadmin-exclusive" style="background-image:url(' + obj.userImg + ')"></span>' + usernameDiv + obj.content + '</div>';
							break;
						default: //游客
							usernameDiv = '<span class="dycplayname"><span class="ycuserName">' + obj.username + uid + '</span>：</span>';
							section.innerHTML = '<div class="clearfix"><span class="dycadmin" style="background-image:url(' + obj.userImg + ')"></span>' + usernameDiv + obj.content + '</div>';
					}
					}else{
						var usernameImg = '<div class="dycadmin-admin-img"><img src='+ROUTEFILE+ obj.userVartar + '></div>';
							var usernameDiv = '<span class="dycplayname">' + obj.username + '：</span>';
							var section = d.createElement('div');
							section.className = 'dycdiscuss-box-admin clearfix ycmessage' + obj.subTime;
							section.innerHTML = usernameImg + '<div class="dycadmin-box"><div class="dycadmin dycadmin-admin"></div>' + usernameDiv + obj.content + '</div>';
					}
					CHAT.msgObj.appendChild(section);
					setTimeout(function() {
						$(".bmmessagePanel").mCustomScrollbar("scrollTo", $("#message").height());
					}, 500);
					/*var height = $("#chat")[0].scrollHeight;
					var chath = $('#doc').height();
					setTimeout(function() {
						if(height > chath) {
							$("#chatbox").scrollTop(height);
						}
					}, 100);*/
				} else {
					if((obj.userType != '1') && (obj.userType != 1)) {
					var html = '';
					switch(obj.userGrade) {
						case 0: //普通会员
							html += '<div class="msg-system dycordinary" style="text-align:left"><span class="grader grader-ordinary" style="background-image:url(' + obj.userImg + ')"></span>';
							break;
						case 1: //白银
							html += '<div class="msg-system dycsilver" style="text-align:left"><span class="grader grader-silver" style="background-image:url(' + obj.userImg + ')"></span>';
							break;
						case 2: //黄金
							html += '<div class="msg-system dycgold" style="text-align:left"><span class="grader grader-gold" style="background-image:url(' + obj.userImg + ')"></span>';
							break;
						case 3: //钻石
							html += '<div class="msg-system dycdiamond" style="text-align:left"><span class="grader grader-diamond" style="background-image:url(' + obj.userImg + ')"></span>';
							break;
						case 4: //专属
							html += '<div class="msg-system dycexclusive" style="text-align:left"><span class="grader grader-exclusive"" style="background-image:url(' + obj.userImg + ')"></span>';
							break;
						case 5: //专属
							html += '<div class="msg-system dycexclusive" style="text-align:left"><span class="grader grader-exclusive"" style="background-image:url(' + obj.userImg + ')"></span>';
							break;
						case 6: //专属
							html += '<div class="msg-system dycexclusive" style="text-align:left"><span class="grader grader-exclusive"" style="background-image:url(' + obj.userImg + ')"></span>';
							break;
						default: //游客
							html += '<div class="msg-system" style="text-align:left"><span class="grader" style="background-image:url(' + obj.userImg + ')">></span>';
					}
					html += '<span class="dycplayname">' + obj.username + '：</span>' + '打赏给' + obj.obType + obj.num;
					html += '个<div class="msg-system-img"><img src = ' + obj.rgoods + ' /></div></div>';
					var section = d.createElement('div');
					section.className = 'system J-mjrlinkWrap J-cutMsg';
					section.innerHTML = html;
					}else{
						var usernameImg = '<div class="dycadmin-admin-img"><img src=' +ROUTEFILE+ obj.userVartar + '></div>';
							var usernameDiv = '<span class="dycplayname">' + obj.username + ':</span>打赏给' + obj.obType + obj.num + '个<div class="msg-system-img"><img src = ' + obj.rgoods + ' /></div>';
							var section = d.createElement('div');
							section.className = 'dycdiscuss-box-admin clearfix ycmessage' + obj.subTime;
							section.innerHTML = usernameImg + '<div class="dycadmin-box"><div class="dycadmin dycadmin-admin"></div>' + usernameDiv + '</div>';
					}
					CHAT.msgObj.appendChild(section);
					setTimeout(function() {
						$(".bmmessagePanel").mCustomScrollbar("scrollTo", $("#message").height());
					}, 100);
					/*var height = $("#chat")[0].scrollHeight;
					var chath = $('#doc').height();
					setTimeout(function() {
						if(height > chath) {
							$("#chatbox").scrollTop(height);
						}
					}, 100)*/
				}
				$(".bmmessagePanel").mCustomScrollbar("update");
			});

			//监听消息发送-管理员
			this.socket.on('admin_msg', function(obj) {
				if(obj.type == 'content') {
					if((obj.userType != '1') && (obj.userType != 1)) {
					var uid = obj.userid.substr(obj.userid.length - 4);
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

							section.innerHTML = '<div class="clearfix"><span class="dycadmin" style="background-image:url(' + obj.userImg + ')"></span>' + usernameDiv + obj.content + '</div>';
					}
					}else{
						var usernameImg = '<div class="dycadmin-admin-img"><img src='+ROUTEFILE+ obj.userVartar + '></div>';
							var usernameDiv = '<span class="dycplayname">' + obj.username + '：<a href="#this" class="ycdelete" onclick="CHAT.delObjInf(' + obj.subTime + ');"></a></span>';
							var section = d.createElement('div');
							section.className = 'dycdiscuss-box-admin clearfix ycmessage' + obj.subTime;
							section.innerHTML = usernameImg + '<div class="dycadmin-box"><div class="dycadmin dycadmin-admin"></div>' + usernameDiv + obj.content + '</div>';
					}
					CHAT.msgObj.appendChild(section);
					setTimeout(function() {
						$(".bmmessagePanel").mCustomScrollbar("scrollTo", $("#message").height());
					}, 500);
				/*	var height = $("#chat")[0].scrollHeight;
					var chath = $('#doc').height();
					setTimeout(function() {
						if(height > chath) {
							$("#chatbox").scrollTop(height);
						}
					}, 100)*/
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
				}
				else{
					var usernameImg = '<div class="dycadmin-admin-img"><img src=' +ROUTEFILE+ obj.userVartar + '></div>';
							var usernameDiv = '<span class="dycplayname">' + obj.username + ':</span>打赏给' + obj.obType + obj.num + '个<div class="msg-system-img"><img src = ' + obj.rgoods + ' /></div>';
							var section = d.createElement('div');
							section.className = 'dycdiscuss-box-admin clearfix ycmessage' + obj.subTime;
							section.innerHTML = usernameImg + '<div class="dycadmin-box"><div class="dycadmin dycadmin-admin"></div>' + usernameDiv + '</div>';
				}
					CHAT.msgObj.appendChild(section);
					setTimeout(function() {
						$(".bmmessagePanel").mCustomScrollbar("scrollTo", $("#message").height());
					}, 100);
					/*var height = $("#chat")[0].scrollHeight;
					var chath = $('#doc').height();
					setTimeout(function() {
						if(height > chath) {
							$("#chatbox").scrollTop(height);
						}
					}, 100)*/
				}
				$(".bmmessagePanel").mCustomScrollbar("update");
			});

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