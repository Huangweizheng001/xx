(function () {
	var d = document,
	w = window,
	p = parseInt,
	dd = d.documentElement,
	db = d.body,
	dc = d.compatMode == 'CSS1Compat',
	dx = dc ? dd: db,
	ec = encodeURIComponent;
	
	
	w.CHAT3 = {
		logout:function(){
			//this.socket.disconnect();
			location.reload();
		},
		//提交聊天消息内容
		submit:function(){},
		genUid:function(){
			return new Date().getTime()+""+Math.floor(Math.random()*899+100);
		},

		init3:function(username, icon){
			var objSection = $("#bmscnewBox"),
				htmlStr = "";
			
			var atNews = "",
				dealatNews ="";
			
			/*
			客户端根据时间和随机数生成uid,这样使得聊天室用户名称可以重复。
			实际项目中，如果是需要用户登录，那么直接采用用户的uid来做标识就可以
			*/
			this.userid = this.genUid();
			this.username = username;
			this.userImg = icon;

			//连接websocket后端服务器
			//this.socket = io.connect('ws://realtime.plhwin.com');
			//this.socket = io.connect('http://192.168.101.180:3000');
			//this.socket = io.connect('http://116.62.226.90:3002');
			this.socket = io.connect('http://139.196.250.239:11111');
			
			//告诉服务器端有用户登录
			this.socket.emit('login', {userid:this.userid, username:this.username, userImg:this.userImg});
			this.socket.emit('joingroup','group_news');
			
			//监听新用户登录
			this.socket.on('news', function(o){
				atNews = o.split("#####0###");
				
				dealatNews = atNews[0].split("#",-1);
				
				htmlStr = '<div class="bmscnewsLi">' +
				'<p class="bmnewpublish">' + dealatNews[2] + '</p>' +
				'<div class="bmnewpublishContent">' +
				dealatNews[3] +
				'</div></div>';
				objSection.prepend(htmlStr);
					
				$("#bmscnewsInner").mCustomScrollbar("update");
			});
			
			//监听新用户登录
			this.socket.on('getnews', function(o){
				o = $.parseJSON(o);
	
				o.forEach(function(item,index){
					//console.log(item)
					atNews = item.split("#####0###");
					dealatNews = atNews[0].split("#",-1);
					
					htmlStr = '<div class="bmscnewsLi">' +
					'<p class="bmnewpublish">' + dealatNews[2] + '</p>' +
					'<div class="bmnewpublishContent">' +
					dealatNews[3] +
					'</div></div>';
					objSection.prepend(htmlStr);
					
				});
				
				$("#bmscnewsInner").mCustomScrollbar("update");
			
			});

			
			this.socket.emit('joingroup',"EURUSD");
			this.socket.emit('joingroup',"GBPUSD");
			this.socket.emit('joingroup',"USDJPY");
			this.socket.emit('joingroup',"AUDUSD");
			this.socket.emit('joingroup',"USDCHF");
			this.socket.emit('joingroup',"NZDUSD");
			
			/*
			this.socket.on('price', function(o){
				console.log(o);
			})
			
			//监听市场行情数据
			this.socket.on('prices', function(o){
				console.log(o)
			});
			
			*/
			
			
		}
	};
})();

$(function() {
	CHAT3.init3($mid, '');
	//$("#bmscnewsInner").mCustomScrollbar();
})