require("../../css/header/header.less");

Vue.component('header-template',{
    template: '<div class="container">' +
        '<div class="headerInner">' +
        '<div class="headerLeft">' +
        '<a href="javascript:;">' +
        '	<img :src="logo" />' +
        '</a>' +
        '</div>' +
        '<div class="headerContent">' +
        '<ul class="headerNavList">' +
        '	<li class="firstNav" v-for="item in navList" v-cloak>' +
        '		<a :href="item.href" :class="{\'active\':item.active}">{{item.name}}</a> ' +
        '		<ul class="subNavList" v-if="item.sub.length > 0">' +
        '			<li class="secondNav" v-for="subItem in item.sub">' +
        '				<a :href="subItem.href" :class="{\'active\':subItem.active}">{{subItem.name}}</a>' +
        '			</li>' +
        '		</ul>' +
        '	</li>' +
        '</ul>' +
        '</div>' +
        '<div class="headerUser" :class="{\'opening\':openSearchFlag}">' +
        '	<a class="searchIcon" @click="openSearchBox"  target="_blank" :href="searchVal | gotoSearch">&nbsp;</a>|' +
        '	<a  v-if="isLogined" href="javascript:;" class="userIcon" @mouseover="showUserBarTrue">' +
        '		<img :src="icon" />' +
        '	</a>' +
        '	<a v-else href="javascript:;" @click="gotoLogin" class="userIcon">' +
        '		登录' +
        '	</a>' +
        '	<div class="searchBox">' +
        '		<input type="search" placeholder="输入你想要的内容" name="" id="" value="" v-model="searchVal" />' +
        '		<p class="tips">热门搜索</p>' +
        '		<ul class="searchList">' +
        '			<li class="searchLi" v-for="item in searchHotList" v-cloak>' +
        '				<a :href="item.value | gotoSearch" target="_blank">{{item.value}}</a>' +
        '			</li>' +
        '		</ul>' +
        '	</div>' +
        '		<div class="headerMask" v-if="openMask" @click="closeSearchBox"></div>' +
	    '    <div class="loginUserBar" v-if="showUserBar" @mouseleave="hiddenUserBar"> '+
		'		<a class="gotoCenter" :href="centerUrl" target="_blank">个人中心</a> '+
		'		<a class="quiteOut"  href="javascript:;" @click="quiteOut">退出</a> '+
		'	</div> '+
        '</div>' +
        '</div>' +
        '</div>',
    data: function() {
        return {
            navList:[{
                "name": "首页",
                "href": "index.html",
                "active":false,
                "sub":[],
            }, {
                "name": "教育教学",
                "href": "onlineclassroom.html",
                "active":false,
                "sub": [{
                    "name": '在线课堂',
                    "active":false,
                    "href": "onlineclassroom.html"
                },{
                    "name": '数字图书',
                    "active":false,
                    "href": "digitalbooks.html"
                }, {
                    "name": '教学素材',
                    "active":false,
                    "href": "material.html"
                }, {
                    "name": '在线题库',
                    "active":false,
                    "href": "onlinequestionbank.html"
                }]
            },{
                "name": "学校活动",
                "active":false,
                "href": "learningactivities.html",
                "sub":[
					{
					    "name": '学习活动',
					    "active":false,
					    "href": "learningactivities.html"
					}, 
					{
					    "name": '教研活动',
					    "active":false,
					    "href": "teachingactivities.html"
					}
                 ]
            },{
                "name": "文化社区",
                "active":false,
                "href": "cindex.html",
                "sub":[]
            }],
            searchHotList:[{
            	"value":"学习活动",
            },{
            	"value":"数字图书",
            },{
            	"value":"教学素材",
            },{
            	"value":"在线题库",
            }],
            openSearchFlag:false,
            showUserBar:false,
            openMask:false,
            isLogined:true,
            logo: './images/static/logo.png',
            icon:'./images/temp/userIcon.jpg',
            centerUrl:'javascript:;',
            searchVal:'',
        }
    },
    mounted: function mounted() {
        //1.0ready --> 2.0 
        this.$nextTick(function() {
            //初始化
        	this.initData();
        	this.setActive();
        });
    },
    filters: {
    	gotoSearch(val){
    		if(val == "" && !val){
    			return "javascript:;";
    		}
        	return 'search.html?val='+val;
        },
    },
    methods: {
    	initData(){
    		var localIcon = $(window).storager({key: 'uIcon'}).readStorage();
    		var isLogin =  $(window).storager({key: 'ycToken'}).readStorage();
    		if(!isLogin){
    			this.isLogined = false;
    		}else{
    			this.isLogined = true;
    			if(1 == $(window).storager({key: 'uType'}).readStorage()){
    				this.centerUrl = "./studentcenter.html";
    			}else if(3 == $(window).storager({key: 'uType'}).readStorage()){
    				this.centerUrl ="./teachercenter.html";
    			}
    		}
    		if(localIcon){
    			this.icon = SERVERROOTFILE + localIcon;
    		}else{
    			this.icon = './images/temp/userIcon.jpg';
    		}
    	},
    	setActive() {
            var currentPageName = $.getBasePath(5); //当前页面名称
            if ("" == $.getBasePath(5) || undefined == $.getBasePath(5)) { //初始默认首页
                this.navList[0].active = true;
            } else {
                if (currentPageName == "index") {
                	this.navList[0].active = true;
                }else if (currentPageName == "onlineclassroom" || currentPageName == "onlineclassmore") {
                	this.navList[1].active = true;
                	this.navList[1].sub[0].active = true;
                }else if (currentPageName == "digitalbooks" ||currentPageName =="bookdetails") {
                	this.navList[1].active = true;
                	this.navList[1].sub[1].active = true;
                }else if (currentPageName == "material") {
                	this.navList[1].active = true;
                	this.navList[1].sub[2].active = true;
                }else if (currentPageName == "onlinequestionbank") {
                	this.navList[1].active = true;
                	this.navList[1].sub[3].active = true;
                }else if (currentPageName == "learningactivities") {
                	this.navList[2].active = true;
                	this.navList[2].sub[0].active = true;
                }else if (currentPageName == "teachingactivities") {
                	this.navList[2].active = true;
                	this.navList[2].sub[1].active = true;
                }else if(currentPageName == "cindex"){
                	this.navList[3].active = true;
                }
                
            }
        },
        openSearchBox(){
        	if(!this.openSearchFlag){
        		this.openSearchFlag = true;
        		this.openMask = true;
        	}else{
        		this.openSearchFlag = false;
        		this.openMask = false;
        	}
        },
        closeSearchBox(){
        	this.openSearchFlag = false;
        	this.showUserBar = false;
        	this.openMask = false;
        },
        showUserBarTrue(){
        	this.showUserBar = true;
        	this.openMask = true;
        },
        hiddenUserBar(){
        	this.showUserBar = false;
        },
        gotoLogin(){
        	$(window).storager({ //prePage
				key: 'prePage',
				value: $.getBasePath(1),
				expires: 0
			}).addStorage();
        	setTimeout(function(){
        		window.location.href ="login.html";
        	},300);
        },
        quiteOut(){
        	$(window).storager({
				key: 'uType'
			}).removeStorage();
        	$(window).storager({
				key: 'uId'
			}).removeStorage();
        	$(window).storager({
				key: 'uName'
			}).removeStorage();
        	$(window).storager({
				key: 'uNickName'
			}).removeStorage();
        	$(window).storager({
				key: 'uIcon'
			}).removeStorage();
        	$(window).storager({
				key: 'ycToken'
			}).removeStorage();
        	
        	layer.msg("退出成功!");
        	
        	setTimeout(function(){
        		window.location.reload();
        	},1500);
        }
    }
})

var header = new Vue({
	el: '#header'
});