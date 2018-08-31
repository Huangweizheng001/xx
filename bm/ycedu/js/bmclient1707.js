var manageOpenFlag = true; //是否开启了管理员查看模式
muserType = 0; //默认一般游客

var isFresh = true,
	isFresh2 = true;

var scuserId ="";
	
function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + " " + date.getHours() + seperator2 + date.getMinutes()
            + seperator2 + date.getSeconds();
    return currentdate;
}

function timeStampToTime(now){
	now=new Date(now); 
	var year=now.getFullYear(); 
	var month=now.getMonth()+1; 
	var date=now.getDate(); 
	var hour=now.getHours(); 
	var minute=now.getMinutes(); 
	var second=now.getSeconds(); 
	return year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second; 
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
		userGrade: null,
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
			var times = Date.parse(new Date());
			var content = d.getElementById("content").innerHTML;

			if(content != '') {
				var obj = {
					type: 'content',
					userid: this.userid,
					username: this.username,
					userImg: this.userImg,
					userGrade: this.userGrade,
					content: content,
					subTime: times,
					userVartar: $mUserIcon,
					userType: muserType //1是管理员，2是水军
				};

				var _this = this;
				if(muserType == "1" || muserType == 1 || muserType == "2" || muserType == 2) {
					this.socket.emit('admin_msg', obj);
				} else {
					this.socket.emit('for_admin', obj);
					CHAT.submitMessage(obj, 1); //聊天 :local
					$(".bmmessagePanel").mCustomScrollbar("update");
				}

				d.getElementById("content").innerHTML = '';
				setTimeout(function() {
					d.getElementById("content").innerHTML = '';
				}, 100);
				setTimeout(function() {
					$(".bmmessagePanel").mCustomScrollbar("scrollTo", $("#chat").height());
				}, 100)

			}
			return false;
		},
		
		refreshOrder:function(){
			this.socket.emit('orderSet');
		},

		//私聊OTO
		submitoto: function(gid,toName) {
			var ototime = CHAT.currentTimeFormat();
			var frameId = $(".chatwinWrap iframe")[0].id;
			var otocontent = $("#" + frameId).contents().find("#content").html();
			var otoobj = {
				userid: this.userid,
				username: this.username,
				userImg: this.userImg,
				userGrade: this.userGrade,
				content: otocontent,
				subTime: ototime,
				userVartar: $mUserIcon,
				userType: muserType //1是管理员
			};
			this.socket.emit('oTochat', gid, otoobj,toName,this.username);
			$("#" + frameId).contents().find("#content").html("");
			setTimeout(function() {
				$("#" + frameId).contents().find("#content").html("");
			}, 150);
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
		//开启oTo 对话组
		addGroup: function(gId, toName) {
			this.socket.emit('createGroup', gId);
			this.socket.emit('oTo', gId, toName, this.username, this.userid);
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
			var onlineUsers = o.onlineUsers;
			//当前在线人数
			//var onlineCount = o.onlineCount;
			var onlineAddArr = o.onlineUsersAddr; //server ip address

			if(muserType == "1" || muserType == 1) {
				if(manageOpenFlag) {
					layer.open({
						type: 2,
						title: "管理中心",
						closeBtn: 0, //不显示关闭按钮
						shadeClose: false,
						shade: false,
						area: ['800px', '500px'],
						skin: 'chatManagerCenter',
						anim: 2,
						content: './chatmanager.html'
					});
					manageOpenFlag = false;

					$(".chatManagerCenter .layui-layer-setwin").on("click", function() {
						$(".chatManagerCenter").toggle();
					})
				}
				
				if($(".chatManagerCenter").is(':visible')) {
					this.socket.emit('onlineuser', this.userid);
				}
				
				

				var htmlUserStr = "<option>选择对象</option>";
				for(var z in onlineUsers) {
					if(onlineUsers[z][0].name == "游客") {
						onlineUsers[z][0].name = onlineUsers[z][0].name + onlineUsers[z][0].userid.substr(onlineUsers[z][0].userid.length - 4);
					}
					htmlUserStr += '<option>' + onlineUsers[z][0].name + '</option>';
				}

				$("#jmanageUser").html(htmlUserStr);

			}
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
				userVartar: $mUserIcon,
				userType: muserType //1是管理员，2是水军
			};
			this.socket.emit('admin_msg', obj);
		},

		init: function(username, userImg, userGrade, ipAddress, fromUrl, keyWord,mid, channelId,noteInf) {
			/*
			客户端根据时间和随机数生成uid,这样使得聊天室用户名称可以重复。
			实际项目中，如果是需要用户登录，那么直接采用用户的uid来做标识就可以
			*/
			this.userid = this.genUid();
			this.username = username;
			this.userImg = userImg;
			this.userGrade = userGrade;
			this.userAddress = ipAddress;
			this.formUrl = fromUrl;
			this.keyWord = keyWord;
			this.scrollToBottom();
			this.formType = "PC_BMLIVEROOM";
			this.noteInf = noteInf;
			//连接websocket后端服务器
			//this.socket = io.connect('ws://realtime.plhwin.com');
			this.socket = io.connect('http://116.62.226.90:3000');
			//this.socket = io.connect('http://192.168.101.180:3000');
			//this.socket = io.connect('http://192.168.0.3:3000');
			//this.socket = io.connect('http://192.168.101.187:3000');
			
			scuserId = this.userid;
			var uid = scuserId.substr(scuserId.length - 4);
			if($("#juserInf .bmnickname").text() == "游客"){
				$("#juserInf .bmnickname").text("游客" + uid);
			}

			var currentTime = new Date();
			var loginTime = currentTime.getTime();
			var enterTimeFormat = getNowFormatDate()
			
			//告诉服务器端有用户登录
			this.socket.emit('login', {
				userid: this.userid,
				username: this.username,
				userImg: this.userImg,
				userAddress: this.userAddress,
				userGrade: this.userGrade,
				noteInf:this.noteInf,
				userVartar: $mUserIcon,
				userType: muserType, //1是管理员
				fromUrl: this.formUrl,
				keyWord: this.keyWord,
				loginTime: loginTime,
				formType: this.formType,
				enterTime: enterTimeFormat,
				mid:mid,
				channelId:channelId
			});

			//监听新用户登录
			this.socket.on('login', function(o) {
				CHAT.updateSysMsg(o, 'login');
			});

			var _this = this;
			if(muserType == "1" || muserType == 1) {
				_this.socket.emit('group1'); //管理组
				$("#jmanageOpen,#jmanageUser").css("display", "inline-block");
			} else {
				_this.socket.emit('group2');
			}
			//默认自身组
			this.socket.emit('createGroup', this.userid);

			//监听用户退出
			this.socket.on('logout', function(o) {
				CHAT.updateSysMsg(o, 'logout');
			});

			//open manage 
			$("#jmanageOpen").on("click", function() {
				$(".chatManagerCenter").toggle();

				if($(".chatManagerCenter").is(':visible')) {
					_this.socket.emit('onlineuser', _this.userid);
				}
			});

			this.socket.on('userinflist', function(obj) {
				var frameId = $(".chatManagerCenter iframe")[0].id;
				$('#' + frameId)[0].contentWindow.getUserList(obj);
			});

			var hasChatWin = false; //是否已经开启oTo模式
			//open oto 模式
			this.socket.on('openwin', function(gid, toName, fromName) {
				var whoAdmin = "";		
				if(username == "游客"){
					whoAdmin = fromName;
				}else{
					if(toName == username) {
						whoAdmin = fromName;
					} else {
						whoAdmin = toName;
					}
				}
				if(hasChatWin) {
					$(".layui-layer-shade").fadeIn();
					$(".chatwinWrap").fadeIn();
					$("#bmchatOpenBtnBox").removeClass("active");
					var frameId = $(".chatwinWrap iframe")[0].id;
					$('#' + frameId)[0].contentWindow.parentDealChild(gid, whoAdmin);
					return false;
				}
				hasChatWin = true;

				layer.open({
					type: 2,
					title: '与' + whoAdmin + "交流",
					closeBtn: 0, //不显示关闭按钮
					shadeClose: false,
					shade: [0.5, '#000'],
					area: ['800px', '500px'],
					skin: 'chatwinWrap',
					//offset: 'rb', //右下角弹出
					//time: 2000, //2秒后自动关闭
					anim: 2,
					content: './chatwin.html?gid=' + gid + "&admin=" + whoAdmin
				});

				$(".chatwinWrap .layui-layer-setwin").on("click", function() {
					$(".layui-layer-shade").fadeOut();
					$(".chatwinWrap").fadeOut();
					$("#bmchatOpenBtnBox").addClass("active");
				})
			});
			//oto format
			this.socket.on('oTochatSend', function(obj, gid) {
				var frameId = $(".chatwinWrap iframe")[0].id;
				var outBox = $("#" + frameId).contents().find("#bmmain");
				var chatBox = $("#" + frameId).contents().find("#bmchatbox" + gid);
				var chatContent = "";
				var uid = obj.userid.substr(obj.userid.length - 4);
				if(obj.username == "游客") {
					obj.username = "游客" + uid;
				}
				//no admin
				if(gid == obj.userid) {
					chatContent = '<div class="bmchatcotentli">' +
						'<span class="bmchatname">' + obj.username + '</span>' +
						'<span class="bmchattime">' + obj.subTime + '</span>' +
						'<div class="bmotochatcontent">' + obj.content + '</div></div>';
				} else {
					chatContent = '<div class="bmchatcotentli bmadmin">' +
						'<span class="bmchatname">' + obj.username + '</span>' +
						'<span class="bmchattime">' + obj.subTime + '</span>' +
						'<div class="bmotochatcontent">' + obj.content + '</div></div>';
				}

				$(chatBox).append(chatContent);
				$(outBox).scrollTop($(chatBox).height());
			})
			
			$("#bmchatOpenBtnBox").on("click", function() {
				$(".layui-layer-shade").fadeIn();
				$(".chatwinWrap").fadeIn();
				$("#bmchatOpenBtnBox").removeClass("active");
			})

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
				
				if(!isFresh2){
					return false;
				}
				
				isFresh2 = false;
				
				for(var i = 0; i < obj.length; i++) {
					if(typeof(obj[i]) == 'object' && obj[i] != null){
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
				$(".bmmessagePanel").mCustomScrollbar("update");
			});

			//监听消息发送
			this.socket.on('for_admin', function(obj) { //发送给管理员
				//var times = Date.parse(new Date());
				var uid = obj.userid.substr(obj.userid.length - 4);
				if(obj.type == 'content') {
					if((obj.userType != '1') && (obj.userType != 1) && (obj.userType != '3') && (obj.userType != 3) && (obj.userType != '4') && (obj.userType != 4)) {
						tempObjArr.push(obj);
						var usernameDiv = '<span class="dycplayname" style="text-align:left"><span class="ycuserName">' + obj.username + '</span>：<span class="bmsendMessageTime">'+timeStampToTime(obj.subTime)+'</span></span><a href="#this" class="ycstatus yc' + obj.subTime + '" onclick="CHAT.getObjInf(' + objIndex + ',' + obj.subTime + ',this);"></a><a href="#this" class="ycdelete" onclick="CHAT.delObjInf(' + obj.subTime + ');"></a>';
						var section = d.createElement('div');
						section.className = 'dycdiscuss-box ' + "ycmessage" + obj.subTime;
						switch(obj.userGrade) {
							case 0: //普通会员
								section.innerHTML = '<div class="clearfix dycordinary"><span class="dycadmin dycadmin-ordinary" style="background-image:url(../ycedu/images/grader.png)" onclick="CHAT.addGroup(' + obj.userid + ',\'' + obj.username + '\');"></span>' + usernameDiv + '<div class="bmsendContent">'+obj.content+'</div>' + '</div>';
								break;
							case 1: //白银
								section.innerHTML = '<div class="clearfix dycsilver"><span class="dycadmin dycadmin-silver" style="background-image:url(../ycedu/images/grader.png)" onclick="CHAT.addGroup(' + obj.userid + ',\'' + obj.username + '\');"></span>' + usernameDiv + '<div class="bmsendContent">'+obj.content+'</div>' + '</div>';
								break;
							case 2: //黄金
								section.innerHTML = '<div class="clearfix dycgold"><span class="dycadmin dycadmin-gold" style="background-image:url(../ycedu/images/grader.png)" onclick="CHAT.addGroup(' + obj.userid + ',\'' + obj.username + '\');"></span>' + usernameDiv + '<div class="bmsendContent">'+obj.content+'</div>' + '</div>';
								break;
							case 3: //钻石
								section.innerHTML = '<div class="clearfix dycdiamond"><span class="dycadmin dycadmin-diamond" style="background-image:url(../ycedu/images/grader.png)" onclick="CHAT.addGroup(' + obj.userid + ',\'' + obj.username + '\');"></span>' + usernameDiv + '<div class="bmsendContent">'+obj.content+'</div>' + '</div>';
								break;
							case 4: //专属
								section.innerHTML = '<div class="clearfix dycexclusive"><span class="dycadmin dycadmin-exclusive" style="background-image:url(../ycedu/images/grader.png)" onclick="CHAT.addGroup(' + obj.userid + ',\'' + obj.username + '\');"></span>' + usernameDiv + '<div class="bmsendContent">'+obj.content+'</div>' + '</div>';
								break;
							case 5: //专属
								section.innerHTML = '<div class="clearfix dycexclusive"><span class="dycadmin dycadmin-exclusive" style="background-image:url(../ycedu/images/grader.png)" onclick="CHAT.addGroup(' + obj.userid + ',\'' + obj.username + '\');"></span>' + usernameDiv + '<div class="bmsendContent">'+obj.content+'</div>' + '</div>';
								break;
							case 6: //专属
								section.innerHTML = '<div class="clearfix dycexclusive"><span class="dycadmin dycadmin-exclusive" style="background-image:url(../ycedu/images/grader.png)" onclick="CHAT.addGroup(' + obj.userid + ',\'' + obj.username + '\');"></span>' + usernameDiv + '<div class="bmsendContent">'+obj.content+'</div>' + '</div>';
								break;
							default: //游客
								usernameDiv = '<span class="dycplayname" style="text-align:left"><span class="ycuserName">' + obj.username + uid + ':</span><span class="bmsendMessageTime"> '+timeStampToTime(obj.subTime)+'</span></span><a href="#this" class="ycstatus yc' + obj.subTime + '" onclick="CHAT.getObjInf(' + objIndex + ',' + obj.subTime + ',this);"></a><a href="#this" class="ycdelete" onclick="CHAT.delObjInf(' + obj.subTime + ');"></a>';

								section.innerHTML = '<div class="clearfix"><span class="dycadmin" style="background-image:url(../ycedu/images/grader.png)" onclick="CHAT.addGroup(' + obj.userid + ',\'' + obj.username + '\');"></span>' + '<div>'+usernameDiv+'</div><div class="bmsendContent">' + obj.content + '</div></div>';
						}
					} else if((obj.userType == '3') && (obj.userType == 3)) {
						tempObjArr.push(obj);
						var usernameImg = '<div class="dycadmin-admin-img"><img src=' + ROUTEFILE + obj.userVartar + '></div>';
						var usernameDiv = '<span class="dycplayname">' + obj.username + '：</span><a href="#this" class="ycstatus yc' + obj.subTime + '" onclick="CHAT.getObjInf(' + objIndex + ',' + obj.subTime + ',this);"></a><a href="#this" class="ycdelete" onclick="CHAT.delObjInf(' + obj.subTime + ');"></a>';
						var section = d.createElement('div');
						section.className = 'dycdiscuss-box-admin clearfix ycmessage' + obj.subTime;
						section.innerHTML = usernameImg + '<div class="dycadmin-box dycanchor-box dyc"><div class="dycadmin dycadmin-admin"><span class="bmsendMessageTime">'+timeStampToTime(obj.subTime)+'</span></div>' + usernameDiv + obj.content + '</div>';

					}else if((obj.userType == '4') && (obj.userType == 4)) {
						tempObjArr.push(obj);
						var usernameImg = '<div class="dycadmin-admin-img"><img src=' + ROUTEFILE + obj.userVartar + '></div>';
						var usernameDiv = '<span class="dycplayname">' + obj.username + '：</span><a href="#this" class="ycstatus yc' + obj.subTime + '" onclick="CHAT.getObjInf(' + objIndex + ',' + obj.subTime + ',this);"></a><a href="#this" class="ycdelete" onclick="CHAT.delObjInf(' + obj.subTime + ');"></a>';
						var section = d.createElement('div');
						section.className = 'dycdiscuss-box-admin clearfix ycmessage' + obj.subTime;
						section.innerHTML = usernameImg + '<div class="dycadmin-box dycteacher-box dyc"><div class="dycadmin dycadmin-admin"><span class="bmsendMessageTime">'+timeStampToTime(obj.subTime)+'</span></div>' + usernameDiv + obj.content + '</div>';

					} else {
						var usernameImg = '<div class="dycadmin-admin-img"><img src=' + ROUTEFILE + obj.userVartar + '></div>';
						var usernameDiv = '<span class="dycplayname">' + objobj[i].username + '：</span><a href="#this" class="ycdelete" onclick="CHAT.delObjInf(' + obj.subTime + ');"></a>';
						var section = d.createElement('div');
						section.className = 'dycdiscuss-box-admin clearfix ycmessage' + obj.subTime;
						section.innerHTML = usernameImg + '<div class="dycadmin-box"><div class="dycadmin dycadmin-admin"><span class="bmsendMessageTime">'+timeStampToTime(obj.subTime)+'</span></div>' + usernameDiv + obj.content + '</div>';
					}
					CHAT.msgObj.appendChild(section);
					setTimeout(function() {
						$(".bmmessagePanel").mCustomScrollbar("scrollTo", $("#message").height());
					}, 520)

					objIndex++;
				} else {
					if((obj.userType != '1') && (obj.userType != 1) && (obj.userType != '3') && (obj.userType != 3) && (obj.userType != '4') && (obj.userType != 4)) {
						var html = '';
						html += '<div class="msg-system">';
						switch(obj.userGrade) {
							case 0: //普通会员
								html += '<span class="grader grader-ordinary" style="background-image:url(../ycedu/images/grader.png)" onclick="CHAT.addGroup(' + obj.userid + ',\'' + obj.username + '\');"></span>';
								break;
							case 1: //白银
								html += '<span class="grader grader-silver" style="background-image:url(../ycedu/images/grader.png)" onclick="CHAT.addGroup(' + obj.userid + ',\'' + obj.username + '\');"></span>';
								break;
							case 2: //黄金
								html += '<span class="grader grader-gold" style="background-image:url(../ycedu/images/grader.png)" onclick="CHAT.addGroup(' + obj.userid + ',\'' + obj.username + '\');"></span>';
								break;
							case 3: //钻石
								html += '<span class="grader grader-diamond" style="background-image:url(../ycedu/images/grader.png)" onclick="CHAT.addGroup(' + obj.userid + ',\'' + obj.username + '\');"></span>';
								break;
							case 4: //专属
								html += '<span class="grader grader-exclusive"" style="background-image:url(../ycedu/images/grader.png)" onclick="CHAT.addGroup(' + obj.userid + ',\'' + obj.username + '\');"></span>';
								break;
							case 5: //专属
								html += '<span class="grader grader-exclusive"" style="background-image:url(../ycedu/images/grader.png)" onclick="CHAT.addGroup(' + obj.userid + ',\'' + obj.username + '\');"></span>';
								break;
							case 6: //专属
								html += '<span class="grader grader-exclusive"" style="background-image:url(../ycedu/images/grader.png)" onclick="CHAT.addGroup(' + obj.userid + ',\'' + obj.username + '\');"></span>';
								break;
							default: //游客
								html += '<span class="grader" style="background-image:url(../ycedu/images/grader.png)" onclick="CHAT.addGroup(' + obj.userid + ',\'' + obj.username + '\');"></span>';
						}

						html += obj.username + '打赏给' + obj.obType;
						html += '<div class="msg-system-img"><img src = ' + obj.rgoods + ' /></div>x<span class="msg-system-num">' + obj.num;
						html += '</span></div>';
						var section = d.createElement('div');
						section.className = 'system J-mjrlinkWrap J-cutMsg';
						section.innerHTML = html;
					} else if((obj.userType == '3') && (obj.userType == 3)) { 
						var usernameImg = '<div class="dycadmin-admin-img"><img src=' + ROUTEFILE + obj.userVartar + '></div>';
						var usernameDiv = '<span class="dycplayname">' + obj.username + '：</span>';
						var section = d.createElement('div');
						section.className = 'dycdiscuss-box-admin clearfix ycmessage' + obj.subTime;
						section.innerHTML = usernameImg + '<div class="dycadmin-box dycanchor-box dyc"><div class="dycadmin dycadmin-admin"></div>' + usernameDiv + obj.content + '</div>';

					}else if((obj.userType == '4') && (obj.userType == 4)) { 
						var usernameImg = '<div class="dycadmin-admin-img"><img src=' + ROUTEFILE + obj.userVartar + '></div>';
						var usernameDiv = '<span class="dycplayname">' + obj.username + '：</span>';
						var section = d.createElement('div');
						section.className = 'dycdiscuss-box-admin clearfix ycmessage' + obj.subTime;
						section.innerHTML = usernameImg + '<div class="dycadmin-box dycteacher-box dyc"><div class="dycadmin dycadmin-admin"></div>' + usernameDiv + obj.content + '</div>';

					} else {
						var usernameImg = '<div class="dycadmin-admin-img"><img src=' + ROUTEFILE + obj.userVartar + '></div>';
						var usernameDiv = '<span class="dycplayname">' + obj.username + ':</span>打赏给' + obj.obType + obj.num + '个<div class="msg-system-img"><img src = ' + obj.rgoods + ' /></div>';
						var section = d.createElement('div');
						section.className = 'dycdiscuss-box-admin clearfix ycmessage' + obj.subTime;
						section.innerHTML = usernameImg + '<div class="dycadmin-box"><div class="dycadmin dycadmin-admin"></div>' + usernameDiv + '</div>';
					}
					CHAT.msgObj.appendChild(section);
					setTimeout(function() {
						$(".bmmessagePanel").mCustomScrollbar("scrollTo", $("#message").height());
					}, 100)
				}
				$(".bmmessagePanel").mCustomScrollbar("update");
			});

			//监听消息发送
			this.socket.on('message', function(obj) {
				if(typeof(obj) == 'object' && obj != null){
					if(obj.type == 'content') {
						CHAT.submitMessage(obj); //聊天
					} else {
						CHAT.submitCost(obj); //打赏
					}
					$(".bmmessagePanel").mCustomScrollbar("update");
				}
			});

			//监听消息发送-管理员
			this.socket.on('admin_msg', function(obj) {
				if(obj.type == 'content') { //聊天
					var usernameImg = '<div class="dycadmin-admin-img"><img src=' + ROUTEFILE + obj.userVartar + '></div>';
					var usernameDiv = '<span class="dycplayname">' + obj.username + '：</span><a href="#this" class="ycdelete" onclick="CHAT.delObjInf(' + obj.subTime + ');"></a>';
					var section = d.createElement('div');
					section.className = 'dycdiscuss-box-admin clearfix ycmessage' + obj.subTime;
					section.innerHTML = usernameImg + '<div class="dycadmin-box"><div class="dycadmin dycadmin-admin"></div>' + usernameDiv + obj.content + '</div>';
					CHAT.msgObj.appendChild(section);
					setTimeout(function() {
						$(".bmmessagePanel").mCustomScrollbar("scrollTo", $("#message").height());
					}, 500)
				} else {
					CHAT.submitCost(obj); //打赏
				}
				$(".bmmessagePanel").mCustomScrollbar("update");
			});

		},

		//聊天发送整合
		submitMessage: function(obj, type) { //type = 1 : local 
			var uid = obj.userid.substr(obj.userid.length - 4);
			if((obj.userType != '1') && (obj.userType != 1) && (obj.userType != '3') && (obj.userType != 3)&& (obj.userType != '4') && (obj.userType != 4)) {
				var usernameDiv = '<span class="dycplayname"><span class="ycuserName">' + obj.username + '</span>：<span class="bmsendMessageTime">'+timeStampToTime(obj.subTime)+'</span></span>';
				var section = d.createElement('div');
				if(type == 1) {
					section.className = 'dycdiscuss-box ycmessage' + obj.subTime + ' ycmessageold' + obj.subTime;
				} else {
					section.className = 'dycdiscuss-box ycmessage' + obj.subTime;
				}
				switch(obj.userGrade) {
					case 0: //普通会员
						section.innerHTML = '<div class="clearfix dycordinary"><span class="dycadmin dycadmin-ordinary" style="background-image:url(../ycedu/images/grader.png)"></span>' + usernameDiv + '<div class="bmsendContent">'+obj.content+'</div></div>';
						break;
					case 1: //白银
						section.innerHTML = '<div class="clearfix dycsilver"><span class="dycadmin dycadmin-silver" style="background-image:url(../ycedu/images/grader.png)"></span>' + usernameDiv + '<div class="bmsendContent">'+obj.content+'</div></div>';
						break;
					case 2: //黄金
						section.innerHTML = '<div class="clearfix dycgold"><span class="dycadmin dycadmin-gold" style="background-image:url(../ycedu/images/grader.png)"></span>' + usernameDiv + '<div class="bmsendContent">'+obj.content+'</div></div>';
						break;
					case 3: //钻石
						section.innerHTML = '<div class="clearfix dycdiamond"><span class="dycadmin dycadmin-diamond" style="background-image:url(../ycedu/images/grader.png)"></span>' + usernameDiv + '<div class="bmsendContent">'+obj.content+'</div></div>';
						break;
					case 4: //专属
						section.innerHTML = '<div class="clearfix dycexclusive"><span class="dycadmin dycadmin-exclusive" style="background-image:url(../ycedu/images/grader.png)"></span>' + usernameDiv + '<div class="bmsendContent">'+obj.content+'</div></div>';
						break;
					case 5: //专属
						section.innerHTML = '<div class="clearfix dycexclusive"><span class="dycadmin dycadmin-exclusive" style="background-image:url(../ycedu/images/grader.png)"></span>' + usernameDiv + '<div class="bmsendContent">'+obj.content+'</div></div>';
						break;
					case 6: //专属
						section.innerHTML = '<div class="clearfix dycexclusive"><span class="dycadmin dycadmin-exclusive" style="background-image:url(../ycedu/images/grader.png)"></span>' + usernameDiv + '<div class="bmsendContent">'+obj.content+'</div></div>';
						break;
					default: //游客
						usernameDiv = '<span class="dycplayname"><span class="ycuserName">' + obj.username + uid + '</span>：<span class="bmsendMessageTime"> '+timeStampToTime(obj.subTime)+'</span></span>';
						section.innerHTML = '<div class="clearfix"><span class="dycadmin" style="background-image:url(../ycedu/images/grader.png)"></span>' + usernameDiv +'<div class="bmsendContent">'+obj.content+'</div></div>';
				}
			} else if((obj.userType == '3') && (obj.userType == 3)) {
				var usernameImg = '<div class="dycadmin-admin-img"><img src=' + ROUTEFILE + obj.userVartar + '></div>';
				var usernameDiv = '<span class="dycplayname">' + obj.username + '：</span>';
				var section = d.createElement('div');
				if(type == 1) {
					section.className = 'dycdiscuss-box ycmessage' + obj.subTime + ' ycmessageold' + obj.subTime;
					section.className = 'dycdiscuss-box-admin clearfix ycmessage' + obj.subTime + ' ycmessageold' + obj.subTime;
				} else {
					section.className = 'dycdiscuss-box-admin clearfix ycmessage' + obj.subTime;
				}
				section.innerHTML = usernameImg + '<div class="dycadmin-box dycanchor-box dyc"><div class="dycadmin dycadmin-admin"><span class="bmsendMessageTime">'+timeStampToTime(obj.subTime)+'</span></div>' + usernameDiv + obj.content + '</div>';

			}else if((obj.userType == '4') && (obj.userType == 4)) {
				var usernameImg = '<div class="dycadmin-admin-img"><img src=' + ROUTEFILE + obj.userVartar + '></div>';
				var usernameDiv = '<span class="dycplayname">' + obj.username + '：</span>';
				var section = d.createElement('div');
				if(type == 1) {
					section.className = 'dycdiscuss-box ycmessage' + obj.subTime + ' ycmessageold' + obj.subTime;
					section.className = 'dycdiscuss-box-admin clearfix ycmessage' + obj.subTime + ' ycmessageold' + obj.subTime;
				} else {
					section.className = 'dycdiscuss-box-admin clearfix ycmessage' + obj.subTime;
				}
				section.innerHTML = usernameImg + '<div class="dycadmin-box dycteacher-box dyc"><div class="dycadmin dycadmin-admin"><span class="bmsendMessageTime">'+timeStampToTime(obj.subTime)+'</span></div>' + usernameDiv + obj.content + '</div>';

			} else {
				var usernameImg = '<div class="dycadmin-admin-img"><img src=' + ROUTEFILE + obj.userVartar +  '></div>';
				var usernameDiv = '<span class="dycplayname">' + obj.username + '：</span>';
				var section = d.createElement('div');
				section.className = 'dycdiscuss-box-admin clearfix ycmessage' + obj.subTime;
				section.innerHTML = usernameImg + '<div class="dycadmin-box"><div class="dycadmin dycadmin-admin"><span class="bmsendMessageTime">'+timeStampToTime(obj.subTime)+'</span></div>' + usernameDiv + obj.content + '</div>';

			}

			CHAT.msgObj.appendChild(section);
			setTimeout(function() {
				$(".bmmessagePanel").mCustomScrollbar("scrollTo", $("#message").height());
			}, 100)
		},

		//打赏整合
		submitCost: function(obj) {
			if((obj.userType != '1') && (obj.userType != 1) && (obj.userType != '3') && (obj.userType != 3)&& (obj.userType != '4') && (obj.userType != 4)) {
				var html = '';
				switch(obj.userGrade) {
					case 0: //普通会员
						html += '<div class="msg-system dycordinary" style="text-align:left"><span class="grader grader-ordinary" style="background-image:url(../ycedu/images/grader.png)"></span>';
						break;
					case 1: //白银
						html += '<div class="msg-system dycsilver" style="text-align:left"><span class="grader grader-silver" style="background-image:url(../ycedu/images/grader.png)"></span>';
						break;
					case 2: //黄金
						html += '<div class="msg-system dycgold" style="text-align:left"><span class="grader grader-gold" style="background-image:url(../ycedu/images/grader.png)"></span>';
						break;
					case 3: //钻石
						html += '<div class="msg-system dycdiamond" style="text-align:left"><span class="grader grader-diamond" style="background-image:url(../ycedu/images/grader.png)"></span>';
						break;
					case 4: //专属
						html += '<div class="msg-system dycexclusive" style="text-align:left"><span class="grader grader-exclusive"" style="background-image:url(../ycedu/images/grader.png)"></span>';
						break;
					case 5: //专属
						html += '<div class="msg-system dycexclusive" style="text-align:left"><span class="grader grader-exclusive"" style="background-image:url(../ycedu/images/grader.png)"></span>';
						break;
					case 6: //专属
						html += '<div class="msg-system dycexclusive" style="text-align:left"><span class="grader grader-exclusive"" style="background-image:url(../ycedu/images/grader.png)"></span>';
						break;
					default: //游客
						html += '<div class="msg-system" style="text-align:left"><span class="grader" style="background-image:url(../ycedu/images/grader.png)"></span>';
				}
				html += '<span class="dycplayname">' + obj.username + '：</span>' + '打赏给' + obj.obType + obj.num;
				html += '个<div class="msg-system-img"><img src = ' + obj.rgoods + ' /></div></div>';
				var section = d.createElement('div');
				section.className = 'system J-mjrlinkWrap J-cutMsg';
				section.innerHTML = html;
			} else if((obj.userType == '3') && (obj.userType == 3)) {
				var usernameImg = '<div class="dycadmin-admin-img"><img src=' + ROUTEFILE + obj.userVartar + '></div>';
				var usernameDiv = '<span class="dycplayname">' + obj.username + ':</span>打赏给' + obj.obType + obj.num + '个<div class="msg-system-img"><img src = ' + obj.rgoods + ' /></div>';
				var section = d.createElement('div');
				section.className = 'dycdiscuss-box-admin  clearfix ycmessage' + obj.subTime;
				section.innerHTML = usernameImg + '<div class="dycadmin-box dycanchor-box"><div class="dycadmin dycadmin-admin"></div>' + usernameDiv + '</div>';
			}else if((obj.userType == '4') && (obj.userType == 4)) {
				var usernameImg = '<div class="dycadmin-admin-img"><img src=' + ROUTEFILE + obj.userVartar + '></div>';
				var usernameDiv = '<span class="dycplayname">' + obj.username + ':</span>打赏给' + obj.obType + obj.num + '个<div class="msg-system-img"><img src = ' + obj.rgoods + ' /></div>';
				var section = d.createElement('div');
				section.className = 'dycdiscuss-box-admin  clearfix ycmessage' + obj.subTime;
				section.innerHTML = usernameImg + '<div class="dycadmin-box dycteacher-box"><div class="dycadmin dycadmin-admin"></div>' + usernameDiv + '</div>';
			} else {
				var usernameImg = '<div class="dycadmin-admin-img"><img src=' + ROUTEFILE + obj.userVartar + '></div>';
				var usernameDiv = '<span class="dycplayname">' + obj.username + ':</span>打赏给' + obj.obType + obj.num + '个<div class="msg-system-img"><img src = ' + obj.rgoods + ' /></div>';
				var section = d.createElement('div');
				section.className = 'dycdiscuss-box-admin clearfix ycmessage' + obj.subTime;
				section.innerHTML = usernameImg + '<div class="dycadmin-box"><div class="dycadmin dycadmin-admin"></div>' + usernameDiv + '</div>';
			}
			CHAT.msgObj.appendChild(section);
			setTimeout(function() {
				$(".bmmessagePanel").mCustomScrollbar("scrollTo", $("#message").height());
			}, 520)
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
	//set params
	var currentChannelId = 6, //6: 播米 ； 8: 谍报
		currentProgramId,
		teacherItem,
		accountBalance,
		rewardCount,
		rewardGoodsId,
		rewardEqual,
		rewardName,
		rewardImg,
		username = "游客",
		noteInf,
		userImg, userGrade,
		memberlevelLabel="游客会员",
		formUrl = 'http://www.bomizx.net/',
		keyWord = "";
	
	var isYhMember = "";  //悦华会员
	var daysTips = ["周一", "周二", "周三", "周四", "周五"];
	var day = (new Date()).getDay();
	var currentHour = (new Date()).getHours();
	var currentMin = (new Date()).getMinutes();
	var timeArr, hourArr1, hourArr2, min1, min2;
	var tempMemberArr = []; //low
	tempMemberArr["普通会员"] = 0;
	tempMemberArr["白银会员"] = 1;
	tempMemberArr["黄金会员"] = 2;
	tempMemberArr["钻石会员"] = 3;
	tempMemberArr["专属会员(一对一)"] = 4;
	tempMemberArr["专属会员(二对一)"] = 5;
	tempMemberArr["专属会员(三对一)"] = 6;

	function getRUrlAndWork() {
		var refer = document.referrer; //搜索来源页  
		var url = refer.split("?")[0];
		if(url == "") {
			url = window.location.href;
		} else {
			var index = url.lastIndexOf("\/");
			url = url.substring(0, index);
		}
		
		formUrl = url;

		var sosuo = refer.split(".")[1];
		var grep = null;
		var str = null;
		var kword = null;
		switch(sosuo) {
			case "baidu":
				grep = /wd\=.*\&/i;
				str = refer.match(grep)
				kword = str.toString().split("=")[1].split("&")[0];
				keyWord = decodeURIComponent(kword);
				break;
			case "google":
				grep = /q\=.*\&/i;
				str = refer.match(grep)
				kword = str.toString().split("=")[1].split("&")[0];
				keyWord = decodeURIComponent(kword);
				break;
			case "sogou":
				grep = /query\=.*\&/i;
				str = refer.match(grep)
				kword = str.toString().split("=")[1].split("&")[0];
				keyWord = decodeURIComponent(kword);
				break;
			case "soso":
				grep = /query\=.*\&/i;
				str = refer.match(grep)
				kword = str.toString().split("=")[1].split("&")[0];
				keyWord = decodeURIComponent(kword);
				break;
			case "bing":
				grep = /q\=.*\&/i;
				str = refer.match(grep)
				kword = str.toString().split("=")[1].split("&")[0];
				keyWord = decodeURIComponent(kword);
				break;
			case "yahoo":
				grep = /p\=.*\&/i;
				str = refer.match(grep)
				kword = str.toString().split("=")[1].split("&")[0];
				keyWord = decodeURIComponent(kword);
				break;
			case "soso":
				grep = /query\=.*\&/i;
				str = refer.match(grep)
				kword = str.toString().split("=")[1].split("&")[0];
				keyWord = decodeURIComponent(kword);
				break;
			case "so":
				grep = /q\=.*\&/i;
				str = refer.match(grep)
				kword = str.toString().split("=")[1].split("&")[0];
				keyWord = decodeURIComponent(kword);
				break;
			default:
				keyWord = "";
		}
	}
	getRUrlAndWork();
	
	//db room init
	function dbroomInit(mid,flag){
		getUserType(mid,flag);
	}
	dbroomInit($mid,true);
	
	
	$.childOptParent = function(){
		$mid = localStorage.getItem("mid");
		dbroomInit($mid,true);
		isLoginShow();
	}


	//get user information
	function getUserInf(mid,flag) {
		$.ajax({
			type: "post",
			url: ROUTE + "Member.ashx?action=getSowingCoinByMemberId",
			dataType: 'json',
			data: {
				"memberId": mid
			},
			timeout: 600,
			success: function(res) {
				if(res.length < 1) {
					getLiveSource(1);
					$("#dbLivePlayer").off("click");
					$("#dbLivePlayer").on("click",function(){
						layer.open({
							type: 2,
							title: false,
							closeBtn: 1, //不显示关闭按钮
							shade: [0],
							shadeClose: true,
							//scrollbar: false,
							maxmin: true, //开启最大化最小化按钮
							area: ['700px', '520px'],
							content: '../login.html?pageType=live'
						});
					})
					clientIp(mid);
					return false;
				}
				var obj = res[0];
				username = obj.nickName;
				userImg = obj.iconPath;
				noteInf = obj.note;
				//userGrade = tempMemberArr[obj.memberlevel];
				userGrade = obj.level-1;
				
				if(userImg == '') { //如果头像为空
					userImg = 'images/youke.png';
				} else {
					userImg = ROUTEFILE + userImg;
				}
				
				if(obj.memberTypeId =="2" || obj.memberTypeId ==2 || obj.memberTypeId =="3" || obj.memberTypeId ==3){
					getUserList(obj.memberId,obj.memberTypeId);
					$("#jchangeAccount").css("display","block");
				}
				
				$("#juserInf .bmuserIcon").attr("src", userImg);
				$("#juserInf .bmnickname").text(obj.nickName);
				$("#juserInf .bmuserLevel").text(obj.memberlevel);
				$("#jentertainmentBox .bmcodeinf").text("播米币:" + obj.sowingCoin);
				accountBalance = obj.sowingCoin;
				
				var autoTime = Date.parse(new Date());
				localStorage.setItem("autoTime", autoTime / 1000);
				localStorage.setItem("mid", mid);
				localStorage.setItem("mName", obj.name);
				localStorage.setItem("mNickName", username);
				localStorage.setItem("mUserIcon", obj.iconPath);
				localStorage.setItem("mLever", obj.level);
				localStorage.setItem("mMoney", obj.owingCoin);
				
				$mid = mid;
				
				isYhMember = obj.isSaLong;
				
				if(isYhMember == 1 || isYhMember == "1" ){
					$("#dbLivePlayer").off("click");
					if(flag){
						getLiveSource(isYhMember);
					}
				} else{
					getLiveSource(isYhMember);
					layer.msg("请先购买会员,参与在线直播互动！");
					$("#dbLivePlayer").off("click");
					$("#dbLivePlayer").on("click",function(){
						layer.open({
							type: 2,
							title: false,
							closeBtn: 1, //不显示关闭按钮
							shade: [0],
							shadeClose: true,
							maxmin: true, //开启最大化最小化按钮
							area: ['700px', '520px'],
							content: '../login.html?pageType=live'
						});
					})
				}
				
				clientIp(mid);
			},
			error: function(err) {
				layer.msg("请先购买会员,参与在线直播互动！");
//				clientIp(mid);
//				console.log("request error");
				layer.msg("网络异常！");
				getUserInf(mid);
			}
		});
	}
	
	//change user
	function getUserList(mid,uType){
		$.ajax({
			type: "post",
			url: ROUTE + "Member.ashx?action=getNavylist",
			dataType: 'json',
			data: {
				"memberId": mid,
				"memberTypeId":uType
			},
			timeout: 600,
			success: function(res) {
				if(res.length < 1) {
					return false;
				}
				
				var htmlStr = "";
				
				res.forEach(function(item, index){
					htmlStr += '<option value='+item.memberId+'>'+item.nickName+'</option>';
				});				
				
				$("#jchangeAccount").html(htmlStr);
				
				$("#jchangeAccount").off("click");
				$("#jchangeAccount").on("click",function(){
					logoutchat();
					dbroomInit($(this).val(),false);
				})
			},
			error: function(err) {
				console.log("request error");
			}
		});
	}
	
	//logout chat 
	function logoutchat(){
		window.CHAT.logout();
		//$("#chatbox").mCustomScrollbar("stop");
//		$("#jchatBox").html('<div class="bmmessagePanel" id="chatbox" class="clearfix"><div id="doc"><div id="chat"><div id="message"></div></div></div></div>');
	}

	//get user type
	function getUserType(mid,flag) {
		if(mid =="" || mid == undefined || mid == null){
			mid = -1;
		}
		$.ajax({
			type: "post",
			url: ROUTE + "Channel.ashx?action=getMemberType",
			dataType: 'json',
			data: {
				"memberId": mid,
				channelId: currentChannelId //pay attention to channelId
			},
			timeout: 300,
			success: function(res) {
				if(res[0] == undefined){
					getUserInf(mid,flag);
					muserType = 0;
					return false;
				}
				muserType = res[0].memberType
				
				getUserInf(mid,flag);
			},
			error: function() {
				muserType = 0;
				getUserType(mid);
				//localStorage.removeItem("mUserType");
				//console.log("request error or tourist member");
			}
		});
	}

	//get live source from channelId
	function getLiveSource(isYHM) {
		$.ajax({
			type: "get",
			url: ROUTE + "Channel.ashx?action=getLiveAddrByChannelId",
			dataType: 'json',
			data: {
				channelId: currentChannelId, //pay attention to channelId
				//isSaLong: isYHM
			},
			timeout: 600,
			success: function(res) {
				if(res.length < 1) {
					return false;
				}
				createPlayer(res[0].rtmpUrl2,res[0].hlsUrl);
			},
			error: function() {
				console.log("request error");
				getLiveSource(isYHM);
			}
		});
	}
	

	//create player
	function createPlayer(URL, URL2) {
		if(flashChecker().f == 0) {
			$("#dbLivePlayer").before('<a href="http://get.adobe.com/cn/flashplayer/" target="_blank" class="noFlashTips">检查到您的系统未安装Flash,请先安装</a>');
		}
		var objectPlayer = new aodianPlayer({
			container: 'dbLivePlayer', //播放器容器ID，必要参数
			rtmpUrl: URL, //控制台开通的APP rtmp地址，必要参数
			hlsUrl: URL2, //控制台开通的APP hls地址，必要参数
			/* 以下为可选参数*/
			width: '100%', //播放器宽度，可用数字、百分比等
			height: '100%', //播放器高度，可用数字、百分比等
			autostart: true, //是否自动播放，默认为false
			bufferlength: '1', //视频缓冲时间，默认为3秒。hls不支持！手机端不支持
			maxbufferlength: '2', //最大视频缓冲时间，默认为2秒。hls不支持！手机端不支持
			stretching: '1', //设置全屏模式,1代表按比例撑满至全屏,2代表铺满全屏,3代表视频原始大小,默认值为1。hls初始设置不支持，手机端不支持
			controlbardisplay: 'enable', //是否显示控制栏，值为：disable、enable默认为disable。
			adveDeAddr: './images/live/dbplayerbg.jpg', //封面图片链接
			//adveWidth: 320,//封面图宽度
			//adveHeight: 240,//封面图高度
			//adveReAddr: '',//封面图点击链接
			//isclickplay: false,//是否单击播放，默认为false
			isfullscreen: true //是否双击全屏，默认为true
		});

	}

	//get live teacher inf  form programId
	function getCurrentTeacher(item) {
		if(!item){
			return false;
		}
		$("#jliveTeacherInf .bmteahcerIcon").attr("src", ROUTEFILE + item.iconPath);
		$("#jliveTeacherInf .bmlinkTeacher").attr("href", "guestindex.html?teacherId=" + item.teacherId);
		$("#jliveTeacherInf .bmliveCoursename").text("课 题：" + item.name);
		$("#jliveTeacherInf .bmliveTeacher").text("嘉宾：" + item.teacherName);
		$(".bmcostToTeacher").attr("dataId", item.teacherId);
		$(".bmcostToTeacher").attr("dataName", item.teacherName);
		$(".bmcostToPresenter").attr("dataId", item.anchorId);
		$(".bmcostToPresenter").attr("dataName", item.anchorName + "主播");
	}

	//get ProgramId
	function getprogramId() {
		var setFlag = true;
		$.ajax({
			type: "get",
			url: ROUTE + "ChannelProgram.ashx?action=getCurrLiveChannelProgram",
			dataType: 'json',
			data: {
				channelId: currentChannelId //pay attention to channelId
			},
			success: function(res) {
				res.forEach(function(item, index) {
					if(daysTips[(day - 1)] == item.weekDay) {
						timeArr = item.playTime.split("-");
						hourArr1 = timeArr[0].split(":");
						hourArr2 = timeArr[1].split(":");
						if((hourArr1[0] * 60 + parseInt(hourArr1[1])) <= (currentHour * 60 + currentMin) && (hourArr2[0] * 60 + parseInt(hourArr2[1])) >= (currentHour * 60 + currentMin)) {
							teacherItem = item;
							currentProgramId = item.channelProgramId;
							setFlag = false;
							return false;
						} else {
							if(setFlag) {
								setFlag = false;   //临时处理6：因为一天就一个
								teacherItem = item;
								currentProgramId = item.channelProgramId;
							}
						}
					} else {
						if(setFlag) {
							teacherItem = item;
							currentProgramId = item.channelProgramId;
						}
					}
				})
				getCurrentTeacher(teacherItem);
			},
			error: function() {
				console.log("err")
			}
		});
	}
	getprogramId();

	//get rewark goods list
	function getRewarkList() {
		var htmlStr = "";
		$.ajax({
			type: "get",
			url: ROUTE + "RewardGoods.ashx?action=getRewardGoods",
			dataType: 'json',
			timeout: 300,
			success: function(res) {
				res.forEach(function(item, index) {
					if(0 == index) {
						htmlStr += '<div class="swiper-slide">' +
							'<a class="bmreward active" data-id="' + item.rewardGoodsId + '" data-index="' + item.reward + '"  data-img="' + item.iconPath + '"  data-note="' + item.note + '"  data-name="' + item.name + '">' +
							'<img src="' + ROUTEFILE + item.iconPath + '">' +
							'</a></div>';
						showRewardDetail(item.rewardGoodsId, item.iconPath, item.name, item.note, item.reward);
					} else {
						htmlStr += '<div class="swiper-slide">' +
							'<a class="bmreward" data-id="' + item.rewardGoodsId + '" data-index="' + item.reward + '"  data-img="' + item.iconPath + '"  data-note="' + item.note + '"  data-name="' + item.name + '">' +
							'<img src="' + ROUTEFILE + item.iconPath + '">' +
							'</a></div>';
					}

				})

				$("#jenterainmentSwiperWrapper").html(htmlStr);
				enterainmentSwiper();
				changerewardShow();
			},
			error: function(err) {
				getRewarkList();
				console.log(err);
			}
		});
	}
	getRewarkList();

	//change reward show
	function changerewardShow() {
		$("#jenterainmentSwiperWrapper a").on("click", function() {
			$("#jenterainmentSwiperWrapper a").removeClass("active");
			$(this).addClass("active");
			showRewardDetail($(this).attr("data-id"), $(this).attr("data-img"), $(this).attr("data-name"), $(this).attr("data-note"), $(this).attr("data-index"));
		})
	}

	//show current reward detail
	function showRewardDetail(id, img, name, note, equalnum) {
		rewardGoodsId = id;
		rewardEqual = equalnum;
		rewardName = name;
		rewardImg = ROUTEFILE + img;
		$("#jcostDetail .bmcostImg").attr("src", ROUTEFILE + img);
		$("#jcostDetail .bmcostName").html(name + "<span>(" + equalnum + "播米币)</span>");
		$("#jcostDetail .bmcostBrief").text(note);
		$("#jcostDetail input").attr("dataType", equalnum);
		getEqualCost(equalnum);
		setCostNum();
	}

	$("#jcostDetail input").on("change", function() {
		getEqualCost($("#jcostDetail input").attr("dataType"));
	})

	function setCostNum() {
		var costnum = 0;
		$("#jcostDetail .bmcostOptSub").off("click");
		$("#jcostDetail .bmcostOptSub").on("click", function() {
			costnum = $("#jcostDetail input").val();
			costnum--;
			if(costnum <= 0) {
				costnum = 1;
				return false;
			}
			$("#jcostDetail input").val(costnum);
			getEqualCost($("#jcostDetail input").attr("dataType"));
		})
		$("#jcostDetail .bmcostOptAdd").off("click");
		$("#jcostDetail .bmcostOptAdd").on("click", function() {
			costnum = $("#jcostDetail input").val();
			costnum++;
			$("#jcostDetail input").val(costnum);
			getEqualCost($("#jcostDetail input").attr("dataType"));
		})
	}

	//get equal cost
	function getEqualCost(costprice) {
		var number = $("#jcostDetail input").val();
		if(number < 1){
			$("#jcostDetail input").val(1);
			number = 1;
		}
		rewardCount = costprice * number;
		$("#jcostDetail .bmcostnumber").text("播米币:" + rewardCount);
	}

	function enterainmentSwiper() {
		var enterainmentSwiper = new Swiper('.bmenterainmentContainer', {
			spaceBetween: 3,
			slidesPerView: 10,
			loop: true,
			breakpoints: {
				1600: {
					slidesPerView: 10
				},
				1448: {
					slidesPerView: 10
				},
				1100: {
					slidesPerView: 8
				},
				1000: {
					slidesPerView: 6
				},
				900: {
					slidesPerView: 4
				},
				800: {
					slidesPerView: 2
				},
				700: {
					slidesPerView: 1
				}
			},

		});
		$('.bmenterainmentSwiperPrev').click(function() {
			enterainmentSwiper.slidePrev();
		});
		$('.bmenterainmentSwiperNext').click(function() {
			enterainmentSwiper.slideNext();
		});

	}

	//right swiper
	function rightSwiper() {
		var mySwiper = new Swiper('.bmliveRightSwiperContainer', {
			pagination: '.swiper-pagination',
			paginationClickable: true,
			autoplay:2000
		})
	}
	rightSwiper();

	//get form ip
	function clientIp(mid) {
		$.ajax({
			url: "http://ip.chinaz.com/getip.aspx",
			type: "get",
			dataType: 'jsonp',
			timeout: 300,
			success: function(res) {
				window.CHAT.init(username, userImg, userGrade, res.address, formUrl, keyWord, mid,6,noteInf); //等级名称userGrade[0]，等级序号userGrade[1]
			},
			error: function(res) {
				window.CHAT.init(username, userImg, userGrade, "127.0.0.1", formUrl, keyWord, mid,6,noteInf); //等级名称userGrade[0]，等级序号userGrade[1]
			}
		});
		if(isFresh){
			$(".bmmessagePanel").mCustomScrollbar();
			isFresh = false;
		}
		
	}

	//reward to 
	//1、user status
	//2、user account balance
	$(".bmentertainmentForBtns a").on("click", function() {
		if($mid == null || $mid == undefined || $mid == "undefined" || $mid == "") {
			//layer.alert("非会员暂不支持打赏哦！");
			layer.open({
				type: 2,
				title: false,
				closeBtn: 1, //不显示关闭按钮
				shade: [0],
				shadeClose: true,
				maxmin: true, //开启最大化最小化按钮
				area: ['700px', '520px'],
				content: '../login.html?pageType=live'
			});
			return false;
		}
		if(accountBalance < rewardCount) {
			layer.alert("播米币余额不足,请先充值！",function(){
				layer.open({
					type: 2,
					title: false,
					closeBtn: 1, //不显示关闭按钮
					shade: [0],
					shadeClose: true,
					maxmin: true, //开启最大化最小化按钮
					area: ['90%', '90%'],
					content: './recharge.html?recharge=1&type=1&from=yhlive'
				});
			});
			return false;
		}
		rewardTo($(this).attr("dataid"), $(this).attr("dataname"));
	})
	
	$(".bmliveSerBtn").on("click", function() {
		if($mid == null || $mid == undefined || $mid == "undefined" || $mid == "") {
			//layer.alert("非会员暂不支持打赏哦！");
			layer.open({
				type: 2,
				title: false,
				closeBtn: 1, //不显示关闭按钮
				shade: [0],
				shadeClose: true,
				maxmin: true, //开启最大化最小化按钮
				area: ['700px', '520px'],
				content: '../login.html?pageType=live'
			});
			return false;
		}
		layer.open({
			type: 2,
			title: false,
			closeBtn: 1, //不显示关闭按钮
			shade: [0],
			shadeClose: true,
			maxmin: true, //开启最大化最小化按钮
			area: ['90%', '90%'],
			content: './recharge.html?recharge=1&type=1&from=yhlive'
		});
	})

	function rewardTo(forId, forname) {
		if(forId =="" || forId ==null || forId == undefined){
			layer.msg("该时段暂无该类型打赏对象");
			return false;
		}
		var rewardNum = $("#jcostDetail input").val();
		$.ajax({
			type: "post",
			url: ROUTE + "MemberReward.ashx?action=memberReward",
			dataType: "json",
			timeout: 300,
			data: {
				"channelId": 6,
				"memberId": $mid,
				"rewardGoodsId": rewardGoodsId, //打赏物品
				"objectId": forId, //打赏给谁的id
				"reward": rewardEqual,
				"rewardCount": rewardNum
			},
			success: function(res) {
				if(res != 814 || res !="814"){
					accountBalance = accountBalance - rewardEqual * rewardNum;
					$("#jentertainmentBox .bmcodeinf").text("播米币:" + accountBalance);
					CHAT.cost(rewardImg, forname, rewardNum, userGrade);
					layer.msg("谢主隆恩!");
				}else{
					layer.msg("打赏异常,请刷新!");
				}
			},
			error: function() {
				layer.msg("网络异常,请刷新重新");
			}
		});
	}

	$(".bmliveSendTools .bmicon").on("click", function(event) {
		if(!$('#sinaEmotion').is(':visible')) {
			$(this).sinaEmotion();
			event.stopPropagation();
		}
	})

	$(".bmliveSendTools .bmFormat").on("click", function() {
		$("#content").text($("#content").text());
	})

	$(".bmliveFooterBtns a").on("click", function() {
		if($("this").hasClass("active")) {
			return false;
		}
		var that = $(this);
		$(".bmliveFooterBtns a").removeClass("active");
		$(this).addClass("active");
		$(".bmfooterContentBox").css("display", "none");
		$(".bmfooterContentBox").each(function() {
			if($(this).attr("dataId") == that.attr("dataId")) {
				$(this).css("display", "block");
			}
		})
	})
	
	
	if($mid == null || $mid == undefined || $mid == "undefined" || $mid == ""){
		layer.open({
			type: 2,
			title: "登录观看讲座",
			closeBtn: 1, //不显示关闭按钮
			shade: [0],
			shadeClose: true,
			//scrollbar: false,
			maxmin: true, //开启最大化最小化按钮
			area: ['700px', '520px'],
			content: '../login.html?pageType=live'
		});
	}

	//注册登录
	function isLoginShow(){
		if($mid == null || $mid == undefined || $mid == "undefined" || $mid == "") {
			$(".bmliveLoginBtn").off("click");
			$(".bmliveLoginBtn").on("click", function() {
				layer.open({
					type: 2,
					title: false,
					closeBtn: 1, //不显示关闭按钮
					shade: [0],
					shadeClose: true,
					maxmin: true, //开启最大化最小化按钮
					area: ['700px', '520px'],
					content: '../login.html?pageType=live'
				});
			})
		} else {
			$(".bmliveLoginBtn").text("退出");
			$(".bmliveLoginBtn").off("click");
			$(".bmliveLoginBtn").on("click", function() {
				$.liveQuitLogin();
			})
		}
	}
	
	isLoginShow();

	$("#message").on("click", ".dycplayname", function(e) {
		$("#content").html($("#content").html() + "<span class='ycsendIcon'>@" + "</span>" + $(this).context.innerText);
	})

	$("#jmanageUser").on("change", function(e) {
		$("#content").html($("#content").html() + "<span class='ycsendIcon'>@" + "</span>" + $(this).find("option:selected").val() + '：');
	})

	$('#bmsaveBtn').on("click", function() {
		var sUrl = ROUTEFILE + 'ycedu/dbliveroom.html';
		toDesktop(sUrl, '播米直播')
	});

	function toDesktop(sUrl, sName) {
		try {
			var WshShell = new ActiveXObject("WScript.Shell");
			var oUrlLink = WshShell.CreateShortcut(WshShell.SpecialFolders("Desktop") + "\\" + sName + ".url");
			oUrlLink.TargetPath = sUrl;
			oUrlLink.Save();
			alert("恭喜！收藏成功！");
		} catch(e) {
			alert("收藏失败，可能浏览器不支持！请按Ctrl+D");
		}
	}

	function serviceBtn() {
		BizQQWPA.addCustom({
			aty: '0',
			a: '1005',
			nameAccount: 4006430618,
			selector: 'jsvtn_phone'
		});
		BizQQWPA.addCustom({
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
		});

		BizQQWPA.addCustom({
			aty: '0',
			a: '1005',
			nameAccount: 4006430618,
			selector: 'jdbAssistant'
		});

		$('.dyccostservice-btn').hover(function() {
			$('.dyccostservice').css('display', 'block');
		}, function() {
			$('.dyccostservice').css('display', 'none');
		});
		
		BizQQWPA.addCustom({
			aty: '1',
			a: '1005',
			nameAccount: 4006430618,
			selector: 'jbmserverQQ'
		});
		
		/*
		setTimeout(function () {
            document.getElementById("jbmserverQQ").click();
        }, 500);
        */
	}
	serviceBtn();
	
	function gotoReport() { //技术分析报告查看
		var reportDate = ["Eiareport.html?technologyTypeId=1", "nonfarmReport.html?technologyTypeId=2", "dayShortReport.html?technologyTypeId=3", "mediumlonglineReport.html?technologyTypeId=4"];
		$('#jbmliveReport a').on('click', function() {
			if(($mid != null) && ($mid != undefined) && ($mid != "")) {
				var num = $(this).attr('data-id');
				if(reportDate[num] != "") {
					$(this).attr('target', '_blank');
					$(this).attr('href', reportDate[num]);
				} else {
					layer.alert("该部分暂无数据哦~");
				}
			} else {
				//layer.alert("非会员不能查看哦！");
				layer.open({
					type: 2,
					title: false,
					closeBtn: 1, //不显示关闭按钮
					shade: [0],
					shadeClose: true,
					maxmin: true, //开启最大化最小化按钮
					area: ['700px', '520px'],
					content: '../login.html?pageType=live'
				});
			}

		});
	}
	gotoReport();

})

var isLookImg = true, imgobj;
$("#message").on("click",".dycdiscuss-box img, .dycadmin-box img", function(){
	imgObj = $(this);
	imgObj.parents(".layui-layer").css("width","100%");
	if(isLookImg){
		layer.open({
			  type: 1,
			  title:false,
			  shadeClose: false,
			  skin: 'bmLookImgBox', //加上边框
			  area: ['auto','auto'], //宽高
			  content: $(this),
			  cancel:function(){
				  isLookImg = true;
			  }
		});
		isLookImg = false;
	}
})

$(".bmliveReadBtn").on("click", function() {
					if($mid == null || $mid == undefined || $mid == "undefined" || $mid == "") {
						layer.open({
							type: 2,
							title: "登录观看讲座",
							closeBtn: 1, //不显示关闭按钮
							shade: [0],
							shadeClose: true,
							//scrollbar: false,
							maxmin: true, //开启最大化最小化按钮
							area: ['700px', '520px'],
							content: '../login.html?pageType=live'
						});
					} else {
						layer.open({
							type: 2,
							title: "获取讲座门票",
							closeBtn: 1, //不显示关闭按钮
							shade: [0],
							shadeClose: true,
							maxmin: true, //开启最大化最小化按钮
							area: ['700px', '520px'],
							content: '../login.html?pageType=live'
						});
					}

				})
				

//oto 组
var groupArr = [];

function changeChatTitle(name) {
	$(".chatwinWrap .layui-layer-title").text(name);
}

function reOrder() {
	CHAT.refreshOrder();
}

function otochatSend(gid,toName) {
	CHAT.submitoto(gid,toName);
}

function otoAddGroup(gid, name) {
	CHAT.addGroup(gid, name);
}

function reloadWin() {
	window.location.reload();
}

function fromPayOpt(){
	$.childOptParent();
}