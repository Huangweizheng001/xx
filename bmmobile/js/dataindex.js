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
			
		
			
			this.socket.emit('joingroup',"EURUSD");
			//this.socket.emit('joingroup',"GBPUSD");
			//this.socket.emit('joingroup',"USDJPY");
			//this.socket.emit('joingroup',"AUDUSD");
			//this.socket.emit('joingroup',"USDCHF");
			//this.socket.emit('joingroup',"NZDUSD");
			
			
			//监听市场行情数据
			this.socket.on('prices', function(o){//初始化数据
				
				var bmindexSwiper = $('#bmbroadcastSwiper'),
					htmlStr = "";
				    
				var EUR_data1 = "",
					EUR_data2 = "",
					JPY_data1 = "",
					JPY_data2 = "",
					AUD_data1 = "",
					AUD_data2 = "",
					XAU_data1 = "",
					XAU_data2 = "",
					XAG_data1 = "",
					XAG_data2 = "",
					OIL_data1 = "",
					OIL_data2 = "";
				var turndata = strToJson(o);
				EUR_data1 = strToJson(turndata.EURUSD).v.lp.toFixed(2);
				EUR_data2 = strToJson(turndata.EURUSD).v.ch.toFixed(4);
				
				JPY_data1 = strToJson(turndata.USDJPY).v.lp.toFixed(2);
				JPY_data2 = strToJson(turndata.USDJPY).v.ch.toFixed(4);
				
				AUD_data1 = strToJson(turndata.AUDUSD).v.lp.toFixed(2);
				AUD_data2 = strToJson(turndata.AUDUSD).v.ch.toFixed(4);
				
				XAU_data1 = strToJson(turndata.XAUUSD).v.lp.toFixed(2);
				XAU_data2 = strToJson(turndata.XAUUSD).v.ch.toFixed(4);
				
				XAG_data1 = strToJson(turndata.XAGUSD).v.lp.toFixed(2);
				XAG_data2 = strToJson(turndata.XAGUSD).v.ch.toFixed(4);
				
				OIL_data1 = strToJson(turndata.USOIL).v.lp.toFixed(2);
				OIL_data2 = strToJson(turndata.USOIL).v.ch.toFixed(4);
			
					//htmlStr ='<div class="swiper-slide" id="EUR" data-name='+strToJson(turndata.EURUSD).name+' data-id="0"><p class="title">欧元</p><p class="index">'+EUR_data1+'</p><p class="float">'+EUR_data2+'</p></div><div class="swiper-slide" id="JPY" data-name='+strToJson(turndata.USDJPY).name+' data-id="1"><p class="title">日元</p><p class="index">'+JPY_data1+'</p><p class="float">'+JPY_data2+'</p></div><div class="swiper-slide" id="AUD" data-name='+strToJson(turndata.AUDUSD).name+' data-id="2"><p class="title">澳元</p><p class="index">'+AUD_data1+'</p><p class="float">'+AUD_data2+'</p></div><div class="swiper-slide" id="XAU" data-name='+strToJson(turndata.XAUUSD).name+' data-id="3"><p class="title">黄金</p><p class="index">'+XAU_data1+'</p><p class="float">'+XAU_data2+'</p></div><div class="swiper-slide" id="XAG" data-name='+strToJson(turndata.XAGUSD).name+' data-id="4"><p class="title">白银</p><p class="index">'+XAG_data1+'</p><p class="float">'+XAG_data2+'</p></div><div class="swiper-slide" id="OIL" data-name='+strToJson(turndata.USOIL).name+' data-id="5"><p class="title">原油</p><p class="index">'+OIL_data1+'</p><p class="float">'+OIL_data2+'</p></div>';
					
				//bmindexSwiper.html(htmlStr);
				
				$('#EURUSD').html('<p class="title">欧元</p><p class="index">'+EUR_data1+'</p><p class="float">'+EUR_data2+'</p>');
				$('#USDJPY').html('<p class="title">日元</p><p class="index">'+JPY_data1+'</p><p class="float">'+JPY_data2+'</p>');
				$('#AUDUSD').html('<p class="title">澳元</p><p class="index">'+AUD_data1+'</p><p class="float">'+AUD_data2+'</p>');
				$('#XAUUSD').html('<p class="title">黄金</p><p class="index">'+XAU_data1+'</p><p class="float">'+XAU_data2+'</p>');
				$('#XAGUSD').html('<p class="title">白银</p><p class="index">'+XAG_data1+'</p><p class="float">'+XAG_data2+'</p>');
				$('#USOIL').html('<p class="title">原油</p><p class="index">'+OIL_data1+'</p><p class="float">'+OIL_data2+'</p>');
				
				indexBroadFunc();
				
				
			});
			
			
			
			this.socket.on('price', function(o){//实时
				var name = strToJson(o).name;
				var namegrounp = new Array();
				namegrounp =  $('#bmbroadcastSwiper .swiper-slide');
				
				
				for(var i=0;i< namegrounp.length;i++){
					var ss = $(namegrounp[i]).attr('data-name');
					if(ss == name){//如果相等,说明值有变化,更新
						$(namegrounp[i]).find('.index').html(strToJson(o).v.lp.toFixed(2));
						$(namegrounp[i]).find('.float').html(strToJson(o).v.ch.toFixed(4));
					}
					
				}
				
				
				
			})
				function strToJson(str){ 
				var json = eval('(' + str + ')'); 
				return json; 
				} 
				
				function indexBroadFunc() {
					bmbroadcastSwiper = new Swiper(".bmbroadcastSwiper", {
						direction: "horizontal",
						slidesPerView: 3,
						slidesPerGroup: 3,
						pagination: '.swiper-pagination',
						paginationClickable: true
					});
					window.bmbroadcastSwiper = bmbroadcastSwiper;
				}
			
		}
	};
})();

$(function() {
	CHAT3.init3("", '');

})