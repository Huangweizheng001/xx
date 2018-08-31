Vue.component('header-template', {
	template: '<div class="container" v-on:mouseleave="closeSearch">' +
		'<div id="moblieMenu">' +
		'<span></span>' +
		'<span></span>' +
		'<span></span>' +
		'</div>' +
		'<div id="bmnavMask"></div>' +
		'<div id="bmnavWrap">' +
		'<div class="bmnavLogoBox">' +
		'<a v-bind:href="index | getPath">' +
		'<img v-bind:src="logo | getPath" />' +
		'</a>' +
		'</div>' +
		'<div class="bmnavBox">' +
		'<ul class="bmNavFirst">' +
		'<li v-for="(item, index) in list" v-bind:class="{\'active\': item.active}" >' +
		'<a v-bind:href="item.href | getPath" v-on:click="storageActive(index)">{{item.name}}</a>' +
		'</li>' +
		'</ul>' +
		'<div class="bmnavSmallUserBox">' +
		'<a class="bmnavUser" v-bind:href="member | getPath"><span></span><i id="bmNickName">游客</i></a>' +
		'<a class="bmnavQuit" href="#this"><span>退出</span></a>' +
		'</div>' +
		'</div>' +
		'<div class="bmnavToolBox">' +
		'<div class="bmnavSearchBox" :class="{\'active\': openSearchFlag}">' +
		'<select class="bmnavSearchSelect" name="searchBar">' +
		'<option selected="selected" value="1">课程</option>' +
		'<option value="2">嘉宾</option>' +
		'</select>' +
		'<div class="bmnavSearchInputBox">' +
		'<input type="text" placeholder="请输入您要搜索的内容" maxlength="30" />' +
		'</div>' +
		'	<a id="jsearchBtn" class="bmnavSearchLogo" v-on:mouseenter="openSearch"></a>' +
		'</div>' +
		'<div class="bmnavUserBox">' +
		'<a class="bmnavUserLogo"  v-bind:href="login | getPath"></a>' +
		'<div class="bmnavUserBtns">' +
		'<a id="jhadLogined" v-bind:href="member | getPath">Jabo</a>' +
		'<a id="jquitLogin" href="#this"><span>退出</span></a>' +
		'</div>' +
		'</div>' +
		'</div>' +
		'</div>' +
		'</div>',
	data: function() {
		return {
			list: [{
					"name": "平台首页",
					"href": "index.html",
					"flag": false
				},
				{
					"name": "公开课",
					"href": "liveplayselect.html",
					"flag": false
				},
				//{"name":"视频课程","href":"courselist.html","flag":true, "sub":[{"name":"哈哈","href":"test.html"},{"name":"嘻嘻","href":"test.html"}]},
				{
					"name": "金融课堂",
					"href": "courselist.html",
					"flag": false
				},
				{
					"name": "嘉宾在线",
					"href": "fteachertopic.html",
					"flag": false
				},
				{
					"name": "行情资讯",
					"href": "ycedu/encyclopedialist.html",
					"flag": false
				},
				{
					"name": "策略解读",
					"href": "ycedu/strategy.html",
					"flag": false
				},
				{
					"name": "新手频道",
					"href": "ycedu/encyclopedialist2.html",
					"flag": false
				},
			],
			index: 'index.html',
			login: 'login.html?login=1',
			reg: 'login.html?login=2',
			member: 'membercenter.html',
			logo: 'ycedu/images/public/logonew.png',
			openSearchFlag: true
		}
	},
	mounted: function() { //1.0ready --> 2.0 
		this.$nextTick(function() { //初始化
			this.initActive();
		})
	},
	filters: {
		getPath: function(obj) {
			//获取当前网址，如： http://localhost:8080/ems/Pages/Basic/Person.jsp
			var curWwwPath = window.document.location.href;
			//获取主机地址之后的目录，如： /ems/Pages/Basic/Person.jsp
			var pathName = window.document.location.pathname;
			var pos = curWwwPath.indexOf(pathName);
			//获取主机地址，如： http://localhost:8080
			var localhostPath = curWwwPath.substring(0, pos);
			//获取带"/"的项目名，如：/ems
			var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
			//获取项目的basePath   http://localhost:8080/ems/
			var basePath = localhostPath + "/";
			return(basePath + obj);
		}
	},
	methods: {
		storageActive: function(id) {
			sessionStorage.setItem("navkey", id);
		},
		initActive: function() {
			this.list.forEach(function(item, index) {
				if(typeof item.active == "undefined") {
					Vue.set(item, "active", false); //全局注册变量
				}
			})
			if(sessionStorage.getItem("navkey") == undefined || sessionStorage.getItem("navkey") == null) {
				//this.list[0].active = true;
			} else {
				var index = parseInt(sessionStorage.getItem("navkey"));
				this.list[index].active = true;
			}
		},
		openSearch: function() {
			this.openSearchFlag = true;
		},
		closeSearch: function() {
			//this.openSearchFlag = false;
		}

	}
})
var header = new Vue({
	el: '#header'
})

Vue.component('footer-template', {
	template: '<div class="container">' +
		'<div class="dycservice-btn">' +
		'<a id="jsvtn_phone" class="dycphone-btn" href="#this"  title="联系客服"></a>' +
		'<a id="jsvtn_people" class="dycpeople-btn" href="#this" title="信息交流"></a>' +
		'<a id="jsvtn_weixin" class="dycweixin-btn" href="#this" title="问题反馈"></a>' +
		'<a id="jsvtn_shop" class="dycshop-btn" href="#this" title="返回顶部"></a></div>' +
		'<div class="ycfooter clearfix">' +
		'<div class="span3">' +
		'<div class="dycphone-box">' +
		'<span></span>' +
		'<a href="tel:4006430618">400-6430-618</a>' +
		'<p>周一至周五 9:00-23:00</p>' +
		'</div>' +
		'</div>' +
		'<div class="span3 dycactivity">' +
		'<div class="activity">' +
		'<p class="yctitle">活动&公告</p>' +
		'<ul id="activelist">' +
		'<li>' +
		'<a href="#"><span>活动 | </span> 开学充电享底价！超值礼包免费送！</a>' +
		'</li>' +
		'</ul>' +
		'</div>' +
		'</div>' +
		'<div class="span2">' +
		'<div class="dylink">' +
		'<p class="yctitle">首页</p>' +
		'<ul>' +
		'<li>' +
		'<a v-bind:href="about | getPath">关于我们</a>' +
		'</li>' +
		'<li>' +
		'<a v-bind:href="contact | getPath">联系我们</a>' +
		'</li>' +
		'<li>' +
		'<a href="#this">机构入驻</a>' +
		'</li>' +
		'<li>' +
		'<a href="#this">嘉宾入驻</a>' +
		'</li>' +
		'</ul>' +
		'</div>' +
		'</div>' +
		'<div class="span2">' +
		'<div class="dycweixin">' +
		'<p class="yctitle">微信公众号</p>' +
		'<img v-bind:src="weixin | getPath" alt="微信" style="width:140px" />' +
		'</div>' +
		'</div>' +
		'<div class="span2">' +
		'<div class="dycweixin">' +
		'<p class="yctitle">APP下载</p>' +
		'<img v-bind:src="appWX | getPath" alt="APP下载" style="width:140px" />' +
		'</div>' +
		'</div>' +
		'</div>' +
		'<div class="dyc-icp">Copyright © 上海汇卡福金融科技有限公司  备案号：粤ICP备16102940号-1</div>' +
		'</div>',
	data: function() {
		return {
			about: 'aboutus.html',
			contact: 'contactus.html',
			weixin: 'images/weixin.png',
			appWX:'images/public/appweixin.png',
			ftsettle: 'fteachersettled.html',
			ojgsettle: 'organizationsettled.html'
		}
	},
	mounted: function() { //1.0ready --> 2.0 
		this.$nextTick(function() { //初始化
			this.initQQ();
			this.initData();
		})
	},
	filters: {
		getPath: function(obj) {
			//获取当前网址，如： http://localhost:8080/ems/Pages/Basic/Person.jsp
			var curWwwPath = window.document.location.href;
			//获取主机地址之后的目录，如： /ems/Pages/Basic/Person.jsp
			var pathName = window.document.location.pathname;
			var pos = curWwwPath.indexOf(pathName);
			//获取主机地址，如： http://localhost:8080
			var localhostPath = curWwwPath.substring(0, pos);
			//获取带"/"的项目名，如：/ems
			var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
			//获取项目的basePath   http://localhost:8080/ems/
			var basePath = localhostPath + "/ycedu/";
			return(basePath + obj);
		}
	},
	methods: {
		initQQ: function() {
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
				selector: 'jsvtn_people'
			});
			BizQQWPA.addCustom({
				aty: '0',
				a: '1005',
				nameAccount: 4006430618,
				selector: 'jsvtn_weixin'
			});
			BizQQWPA.addCustom({
				aty: '0',
				a: '1005',
				nameAccount: 4006430618,
				selector: 'js-extension'
			});
		},
		initData: function() {
			var indexTopPos = 0;
			$(window).scroll(function() {
				indexTopPos = $(window).scrollTop();
				if(indexTopPos > 400) {
					$(".dycshop-btn").css("display", "block");
				} else {
					$(".dycshop-btn").css("display", "none");
				}
			})
			$("#jsvtn_shop").on("click", function() {
				$('body,html').animate({
					scrollTop: 0
				}, 300);
			})
		}
	},

})
var footer = new Vue({
	el: '#footer'
})