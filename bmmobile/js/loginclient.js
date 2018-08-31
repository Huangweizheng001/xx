(function() {
	var d = document,
		w = window,
		p = parseInt,
		dd = d.documentElement,
		db = d.body,
		dc = d.compatMode == 'CSS1Compat',
		dx = dc ? dd : db,
		ec = encodeURIComponent;

	w.CHAT2 = {
		logout: function() {
			//this.socket.disconnect();
			location.reload();
		},
		//提交聊天消息内容
		submit: function(sid, obj) {
			this.socket.emit('loginMessage',sid, obj);

//			var content = d.getElementById("content2").value;
//			if(content != '') {
//				var obj = {
//					userid: this.userid,
//					username: this.username,
//					userImg: this.userImg,
//					content: content,
//					publishTime: '2017-10-10 20:00:55'
//				};
//				this.socket.emit('message', obj);
//
//			}
//			return false;

		},
		genUid: function() {
			return new Date().getTime() + "" + Math.floor(Math.random() * 899 + 100);
		},
		//更新系统消息，本例中在用户加入、退出的时候调用
		updateSysMsg: function(o, action) {
			//当前在线用户列表
			var onlineUsers = o.onlineUsers;
			//当前在线人数
			var onlineCount = o.onlineCount;
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

		},
		init2: function(username, icon) {
			var sid ='',
				htmlStr = "";
			/*
			客户端根据时间和随机数生成uid,这样使得聊天室用户名称可以重复。
			实际项目中，如果是需要用户登录，那么直接采用用户的uid来做标识就可以
			*/
			this.userid = this.genUid();
			this.username = username;
			this.userImg = icon;
			
			sid = this.userid;

			//连接websocket后端服务器
			//this.socket = io.connect('ws://realtime.plhwin.com');
			this.socket = io.connect('http://116.62.226.90:3002');
			//this.socket = io.connect('http://192.168.101.180:3002');
			//this.socket = io.connect('http://192.168.0.3:3002');

			//告诉服务器端有用户登录
			this.socket.emit('login', {
				userid: this.userid,
				username: this.username,
				userImg: this.userImg
			});

			//监听新用户登录
			this.socket.on('login', function(o) {
				CHAT2.updateSysMsg(o, 'login');
			});

			//监听用户退出
			this.socket.on('logout', function(o) {
				CHAT2.updateSysMsg(o, 'logout');
			});
			
			$("#weixinLoginBtn").on("click", function() {
				$.ajax({
					type: "get",
					url: ROUTE + "Member.ashx?action=wxH5Login",
					data: {
						sid: sid
					},
					dataType: 'json',
					async: true,
					success: function(res) {
						console.log(res[0])
						layer.open({
							title:'微信登录',
							type: 1,
							//skin: 'layui-layer-rim', //加上边框
							area: ['420px', '240px'], //宽高
							content: '<div style="text-align:center"><img src="'+ROUTEFILE+res[0].codePath+'" /></div>'
						});
					}
				});
			})
			
			
			/*
			//初始数据
			var flag = true;
			this.socket.on('init_msg', function(obj) {
				if(flag == false) {
					return false;
				}
				flag = false;

				for(var i = 0; i < obj.length; i++) {
					if(typeof(obj[i]) == 'object' && obj[i] != null) {
						htmlStr = '<div class="bmscnewsLi">' +
							'<p class="bmnewpublish">' + obj[i].publishTime + '</p>' +
							'<div class="bmnewpublishContent">' +
							obj[i].content +
							'</div></div>';
						objSection.prepend(htmlStr);
					}
				}
				$("#bmscnewsInner").mCustomScrollbar("update");
			});
			*/

			//监听消息发送
			this.socket.on('message', function(obj) {
				htmlStr = '<div class="bmscnewsLi">' +
					'<p class="bmnewpublish">' + obj.publishTime + '</p>' +
					'<div class="bmnewpublishContent">' +
					obj.content +
					'</div></div>';
				
			});

		}
	};
})();

$(function() {
	CHAT2.init2("", "");
})