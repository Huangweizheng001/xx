"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*
 * Autor:Jabo
 * Time：2017/07/12
 * Desc：福建教育网PC 主js
 */

/**********************************************/
//Public function
/**********************************************/

//获得URL参数
$.fn.getUrlParam = function (para) {
	var obj = typeof para === "undefined" ? "undefined" : _typeof(para);
	if (obj === "object") {
		return window.location.search.substr(1);
	}
	var reg = new RegExp("(^|&)" + para + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) {
		return decodeURI(r[2]);
	}
	return;
};

//滑动到指定位置
$.scrollTo = function (pos, time) {
	if (time == null || time == undefined || time == "") {
		time = 0;
	}
	if (pos == null || pos == undefined || pos == "") {
		pos = 0;
	}
	$('html,body').animate({
		scrollTop: pos
	}, time);
};

$.getCurrentTime = function (inputTime, type, separator, separator2) {
	//type 0 或者空默认当前时时间  1:返回年月日 2：时分秒  3：时分  4:年月日 时分秒  5:时间戳  6时间数组 separator：格式 默认 "-" separator2:分割2
	if (separator == undefined || separator == null || separator == "") {
		separator = "-";
		separator2 = ":";
	} else {
		if (separator2 == undefined || separator2 == null || separator2 == "") {
			separator2 = ":";
			if (type == 2 || type == 3) {
				separator2 = separator;
			}
		}
	}
	var dateObj = "",
	    dateArr = [];
	if ("" == inputTime || undefined == inputTime) {
		dateObj = new Date();
	} else {
		inputTime = inputTime.replace(/-/g, "/");
		console.log(inputTime);
		inputTime = new Date(inputTime);
		dateObj = inputTime;
	}

	if (1 == type) {
		//年月日
		dateObj = dateObj.getFullYear() + separator + (dateObj.getMonth() + 1) + separator + dateObj.getDate();
	}

	if (2 == type) {
		//时分秒
		dateObj = dateObj.getHours() + separator2 + dateObj.getMinutes() + separator2 + dateObj.getSeconds();
	}

	if (3 == type) {
		//时分
		dateObj = dateObj.getHours() + separator2 + dateObj.getMinutes();
	}

	if (4 == type) {
		//年月日 时分秒
		dateObj = dateObj.getFullYear() + separator + (dateObj.getMonth() + 1) + separator + dateObj.getDate() + " " + dateObj.getHours() + separator2 + dateObj.getMinutes() + separator2 + dateObj.getSeconds();
	}

	if (5 == type) {
		//获得时间戳
		dateObj = dateObj.valueOf();
	}

	if (6 == type) {
		//时间数组
		dateArr.push(dateObj.getFullYear());
		dateArr.push(dateObj.getMonth() + 1);
		dateArr.push(dateObj.getDate());
		dateArr.push(dateObj.getHours());
		dateArr.push(dateObj.getMinutes());
		dateArr.push(dateObj.getSeconds());

		return dateArr;
	}
	return dateObj;
};

//日期时间截取工具 : '2018-12-20 12:28:26
$.getDateTimeFormat = function (dateStr, separator, separator2) {
	if (separator == undefined || separator == null) {
		separator = "-";
		separator2 = ":";
	} else {
		if (separator2 == undefined || separator2 == null) {
			separator2 = ":";
		}
	}
	var timeObj = dateStr;
	var timeArr = timeObj.replace(" ", separator2).replace(/\:/g, separator).split(separator);
	return timeArr;
};

//日期或时间截取工具 : '2018-12-20 或 18:30:12  默认日期 ，时间必须写格式
$.getDateFormat = function (dateStr, separator, type) {
	if (separator == undefined || separator == null) {
		separator = "-";
	}
	var timeObj = dateStr;
	var timeArr = timeObj.split(separator);
	return timeArr;
};

//获取网站目录
$.getBasePath = function (type) {
	//0或者空：根目录加/  1：当前路径  2：主机后面目录  3:根目录
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
	var basePath = localhostPath + projectName + "/";

	if (1 == type) {
		return curWwwPath;
	}

	if (2 == type) {
		return pathName;
	}

	if (3 == type) {
		return localhostPath;
	}
	return basePath;
};

var ROOT = $.getBasePath(); //根路径
var ROOTFILE = ROOT + "images/";
var ROOTDATA = ROOT + "data/";
var SERVERROOT = "http://www.fetv.cn/fe/";
var SERVERROOTFILE = "http://www.fetv.cn/fe/";
var SERVERROOTDATA = SERVERROOT + "/website/ashx/";
var TempOrgId = 1; //临时组织，注意后期与其他组织机构区分

//公共触发部分
$(function () {
	$("#fe-right-nav-box a").last().click(function () {
		$.scrollTo(0, 500);
	});
});

/**********************************************/
//Public function  End
/**********************************************/

/**********************************************/
//header public begin
/**********************************************/

Vue.component('header-template', {
	template: '<div><div class="fe-header-top-bar">' + '<div class="container">' + '<a class="fe-header-top-logo wow slideInLeft" v-bind:href="index | addRoot">' + '<img v-bind:src="smallLogo | addRoot" alt="福建教育网" />' + '</a>' + '<a href="#this">App 下载</a>' + '<div class="fe-header-top-other">' + '<a v-show="!isLogined" v-bind:href="login| addRoot" @click="setPrePage">登录</a>' + '<a v-show="!isLogined" v-bind:href="reg| addRoot" @click="setPrePage">&nbsp;/&nbsp;注册</a>' + '<a v-show="isLogined"  v-bind:href="member | addRoot" >{{nickName}}</a>' + '<a v-show="isLogined" @click="signOut">&nbsp;/&nbsp;退出</a>' + '<a class="fe-header-message" v-bind:href="message | addRoot"><span></span></a>' + '<a class="fe-header-shopping-car" v-bind:href="shoppingcar | addRoot"><span></span></a>' + '</div>' + '</div>' + '</div>' + '<div class="container">' + '<div class="fe-header-content-bar">' + '<div class="fe-header-search-bar">' + '<a class="fe-header-search-logo wow slideInLeft" v-bind:href="index | addRoot">' + '<img v-bind:src="logo | addRoot"  alt="福建教育网" />' + '</a>' + '<div class="fe-header-search-box wow slideInRight">' + '<div class="fe-header-search-type">' + '<a v-bind:class="{\'active\': searchType == 1}" @click="changeSearchType(1)">课程</a>' + '<a v-bind:class="{\'active\': searchType == 2}" @click="changeSearchType(2)">老师</a>' + '<a v-bind:class="{\'active\': searchType == 3}" @click="changeSearchType(3)">机构</a>' + '</div>' + '<div class="fe-header-search-input">' + '<input type="search" placeholder="选择类型输入想要的内容" v-model="searchValue" @keyup.enter="keyEnter($event)" />' + '<a @click="subSearch">搜索</a>' + '</div>' + '</div>' + '</div>' + '<div class="fe-header-nav-bar wow slideInRight">' + '<a v-for="(item, index) in list" v-bind:href="item.href | addRoot"  v-bind:class="{\'active\': item.active}" @click="storageActive(index)">{{item.name}}</a>' + '</div>' + '</div>' + '</div></div>',
	data: function data() {
		return {
			list: [{ "name": "平台首页", "href": "index.html" }, { "name": "教育资讯", "href": "news.html" }, { "name": "云课堂", "href": "cloundroom.html" }, { "name": "名师工作室", "href": "teacheronline.html" }, { "name": "选课中心", "href": "coursecenter.html" }, { "name": "影视圈", "href": "moviecircle.html" }, { "name": "作业", "href": "questionindex.html" }, { "name": "社圈", "href": "community.html" }],
			isLogined: false,
			searchType: 1, //1 课程 2：老师 3：机构
			searchValue: '',
			nickName: '',
			index: 'index.html',
			login: 'login.html',
			reg: 'login.html?login=3',
			member: 'membercenter.html',
			message: 'messagecenter.html',
			shoppingcar: 'shoppingcar.html',
			smallLogo: 'images/public/logo-icon-small.png',
			logo: 'images/public/logo-front-icon.jpg'
		};
	},
	mounted: function mounted() {
		//1.0ready --> 2.0 
		this.$nextTick(function () {
			//初始化
			this.initData();
		});
	},
	filters: {
		addRoot: function addRoot(obj) {
			return ROOT + obj;
		}
	},
	methods: {
		storageActive: function storageActive(id) {
			$(window).storager({ //Uid
				key: 'navkey',
				value: id,
				expires: 0
			}).addStorage();
		},
		initData: function initData() {
			this.list.forEach(function (item, index) {
				if (typeof item.active == "undefined") {
					Vue.set(item, "active", false); //全局注册变量
				}
			});

			if ($(window).storager({ key: 'navkey' }).readStorage() == undefined) {
				this.list[0].active = true;
			} else {
				var index = parseInt($(window).storager({ key: 'navkey' }).readStorage());
				this.list[index].active = true;
			}
			if ($(window).storager({ key: 'feUid' }).readStorage() == undefined) {
				this.isLogined = false;
			} else {
				this.isLogined = true;
				this.nickName = $(window).storager({ key: 'feUNickName' }).readStorage();
			}
		},
		changeSearchType: function changeSearchType(type) {
			this.searchType = type;
		},
		subSearch: function subSearch() {
			if ("" == this.searchValue) {
				layer.msg("请输入搜索内容哦！");
				return false;
			}
			var _this = this;
			this.$http.post(ROOTDATA + "indexNewsData.json", {
				searchValue: _this.searchValue,
				searchType: _this.searchType
			}, {
				emulateJSON: true
			});
		},
		keyEnter: function keyEnter(et) {
			this.subSearch();
		},
		signOut: function signOut() {
			$(window).storager({ key: 'feUid' }).removeStorage();
			$(window).storager({ key: 'feUNickName' }).removeStorage();
			window.location.reload();
		},
		setPrePage: function setPrePage() {
			$(window).storager({ //fePrePage
				key: 'fePrePage',
				value: $.getBasePath(1),
				expires: 0
			}).addStorage();
		}
	}
});
var header = new Vue({
	el: '#header'
});
/**********************************************/
//header public end
/**********************************************/

/**********************************************/
//footer public begin
/**********************************************/

Vue.component('footer-template', {
	template: '<div><div class="fe-right-side-container container">' + '<aside id="fe-right-nav-box">' + '<a href="#this">在线咨询</a>' + '<a href="#this">问题反馈</a>' + '<a href="#this">返回顶部</a>' + '</aside>' + '</div>' + '<div class="container full">' + '<img v-bind:src="tempImg | addRoot" style="width: 100%;" />' + '</div></div>',
	data: function data() {
		return {
			list: [],
			tempImg: 'images/temp/footer.jpg'
		};
	},
	filters: {
		addRoot: function addRoot(obj) {
			return ROOT + obj;
		}
	},
	mounted: function mounted() {
		//1.0ready --> 2.0 
		this.$nextTick(function () {
			//初始化
			this.initData();
		});
	},
	methods: {
		initData: function initData() {
			var indexTopPos = 0;
			$(window).scroll(function () {
				indexTopPos = $(window).scrollTop();
				if (indexTopPos > 400) {
					$("#fe-right-nav-box").css("display", "block");
				} else {
					$("#fe-right-nav-box").css("display", "none");
				}
			});
		}
	}
});
var footer = new Vue({
	el: '#footer'
});
/**********************************************/
//footer public end
/**********************************************/

/*
 * 注册登入页
 */
function loginInit(urlParamValue, pageObj) {
	new Vue({
		el: '#jloginWrapApp',
		data: {
			userType: 1, //1：学生; 2:家长； 3：教师
			pageType: 1, //1：登录【账号】； 2：登录【手机】；3：注册
			userName: '',
			userPwd: '',
			quickPhone: '',
			quickVC: '',
			quickVCTime: 120,
			quickVCTimeKey: true,
			regPhone: '',
			regVC: '',
			regVCTime: 120,
			regVCTimeKey: true,
			regUserName: '',
			regPwd: '',
			regPwd2: '',
			forgetPhone: '',
			forgetVC: '',
			forgetVCTime: 120,
			forgetVCTimeKey: true,
			forgetPwd: '',
			forgetPwd2: '',
			userNameErrorTips: '昵称不能为空！',
			userNameErrorTipsKey: false,
			userPwdErrorTips: '密码不能为空！',
			userPwdErrorTipsKey: false,
			quickPhoneErrorTips: '手机号不能为空！',
			quickPhoneErrorTipsKey: false,
			quickVCErrorTips: '验证码不能为空！',
			quickVCErrorTipsKey: false,
			quickVCLabel: '获取短信验证码',
			regPhoneErrorTips: '手机号不能为空！',
			regPhoneErrorTipsKey: false,
			regVCErrorTips: '验证码不能为空！',
			regVCErrorTipsKey: false,
			regVCLabel: '获取短信验证码',
			regUserNameErrorTips: '昵称不能为空！',
			regUserNameErrorTipsKey: false,
			regPwdErrorTips: '密码不能为空！',
			regPwdErrorTipsKey: false,
			regPwd2ErrorTips: '密码不一致！',
			regPwd2ErrorTipsKey: false,
			forgetPhoneErrorTips: '昵称不能为空',
			forgetPhoneErrorTipsKey: false,
			forgetVCErrorTips: '验证码不能为空！',
			forgetVCErrorTipsKey: false,
			forgetVCLabel: '获取短信验证码',
			forgetPwdErrorTips: '密码不能为空！',
			forgetPwdErrorTipsKey: false,
			forgetPwd2ErrorTips: '密码不一致！',
			forgetPwd2ErrorTipsKey: false,
			storageType: -1, // -1：长期制  0：回话制  
			agreeRegKey: true
		},
		mounted: function mounted() {
			//1.0ready --> 2.0
			this.$nextTick(function () {
				this.initLogin();
			});
		},
		watch: {
			userName: function userName(value) {
				if ("" != value) {
					this.userNameErrorTipsKey = false;
				}
			},
			userPwd: function userPwd(value) {
				if ("" != value) {
					this.userPwdErrorTipsKey = false;
				}
			},
			quickPhone: function quickPhone(value) {
				if ("" != value) {
					this.quickPhoneErrorTipsKey = false;
				}
			},
			quickVC: function quickVC(value) {
				if ("" != value) {
					this.quickVCErrorTipsKey = false;
				}
			},
			regPhone: function regPhone(value) {
				if ("" != value) {
					this.regPhoneErrorTipsKey = false;
				}
			},
			regVC: function regVC(value) {
				if ("" != value) {
					this.regVCErrorTipsKey = false;
				}
			},
			regUserName: function regUserName(value) {
				if ("" != value) {
					this.regUserNameErrorTipsKey = false;
				}
			},
			regPwd: function regPwd(value) {
				if ("" != value) {
					this.regPwdErrorTipsKey = false;
				}
			},
			regPwd2: function regPwd2(value) {
				if ("" != value) {
					this.regPwd2ErrorTipsKey = false;
				}
			},
			forgetPhone: function forgetPhone(value) {
				if ("" != value) {
					this.forgetPhoneErrorTipsKey = false;
				}
			},
			forgetVC: function forgetVC(value) {
				if ("" != value) {
					this.forgetVCErrorTipsKey = false;
				}
			},
			forgetPwd: function forgetPwd(value) {
				if ("" != value) {
					this.forgetPwdErrorTipsKey = false;
				}
			},
			forgetPwd2: function forgetPwd2(value) {
				if ("" != value) {
					this.forgetPwd2ErrorTipsKey = false;
				}
			}
		},
		methods: {
			//init params
			initLogin: function initLogin() {
				var _this = this;
				if (2 == urlParamValue || "2" == urlParamValue) {
					_this.pageType = 2;
				} else if (3 == urlParamValue || "3" == urlParamValue) {
					_this.pageType = 3;
				} else if (4 == urlParamValue || "4" == urlParamValue) {
					_this.pageType = 4;
				} else {
					_this.pageType = 1;
				}
			},

			//change show page
			changeShowPage: function changeShowPage(showPageKey) {
				this.pageType = showPageKey;
			},

			//select user type
			selectUserType: function selectUserType(selectUserTypeKey) {
				this.userType = selectUserTypeKey;
			},

			//change storage type
			toggleStorage: function toggleStorage() {
				if (-1 == this.storageType) {
					this.storageType = 0;
				} else {
					this.storageType = -1;
				}
			},


			//toggle argree register
			toggleAgreeReg: function toggleAgreeReg() {
				if (this.agreeRegKey) {
					this.agreeRegKey = false;
				} else {
					this.agreeRegKey = true;
				}
			},


			//短信验证码
			getVCCode: function getVCCode() {
				var tempUrl = "";
				var vc = "";
				if (2 == this.pageType) {
					tempUrl = "User.ashx?action=getLoginValidateCode";
					vc = this.quickPhone;
				} else if (3 == this.pageType) {
					tempUrl = "User.ashx?action=getRegisterValidateCode";
					vc = this.regPhone;
				} else if (4 == this.pageType) {
					tempUrl = "User.ashx?action=getPwdAlterValidateCode";
					vc = this.forgetPhone;
				}
				this.$http.post(SERVERROOTDATA + tempUrl, {
					mobile: vc
				}, {
					emulateJSON: true
				}).then(function (res) {
					var obj = res.body;
					if (811 == obj || "811" == obj) {
						layer.msg("请求超时");
					} else if (808 == obj || "808" == obj) {
						layer.msg("改手机号已注册");
					} else {
						layer.msg("验证码已发送注意查收短信");
					}
				});
			},

			//vc time count
			vcTimeCount: function vcTimeCount() {
				console.log(this.pageType);
				var _this = this;
				if (2 == this.pageType) {
					if (_this.quickVCTimeKey) {
						if (!this.regCheckValue(/^1[34578]\d{9}$/, this.quickPhone)) {
							this.quickPhoneErrorTipsKey = true;
							this.quickPhoneErrorTips = "请输入正确的手机号码！";
							return false;
						}
						var quickInterval = setInterval(function () {
							_this.quickVCTimeKey = false;
							_this.quickVCLabel = _this.quickVCTime-- + "s";

							if (_this.quickVCTime < 1) {
								_this.quickVCTimeKey = true;
								_this.quickVCLabel = '获取短信验证码';
								clearInterval(quickInterval);
							}
						}, 1000);
						_this.getVCCode();
					}
				} else if (3 == this.pageType) {
					if (_this.regVCTimeKey) {
						if (!this.regCheckValue(/^1[34578]\d{9}$/, this.regPhone)) {
							this.regPhoneErrorTipsKey = true;
							this.regPhoneErrorTips = "请输入正确的手机号码！";
							return false;
						}
						var regInterval = setInterval(function () {
							_this.regVCTimeKey = false;
							_this.regVCLabel = _this.regVCTime-- + "s";

							if (_this.regVCTime < 1) {
								_this.regVCTimeKey = true;
								_this.regVCLabel = '获取短信验证码';
								clearInterval(regInterval);
							}
						}, 1000);
						_this.getVCCode();
					}
				} else if (4 == this.pageType) {
					if (_this.forgetVCTimeKey) {
						if (!this.regCheckValue(/^1[34578]\d{9}$/, this.forgetPhone)) {
							this.forgetPhoneErrorTipsKey = true;
							this.forgetPhoneErrorTips = "请输入正确的手机号码！";
							return false;
						}
						var forgetInterval = setInterval(function () {
							_this.forgetVCTimeKey = false;
							_this.forgetVCLabel = _this.forgetVCTime-- + "s";

							if (_this.forgetVCTime < 1) {
								_this.forgetVCTimeKey = true;
								_this.forgetVCLabel = '获取短信验证码';
								clearInterval(forgetInterval);
							}
						}, 1000);
						_this.getVCCode();
					}
				}
			},


			//empty check
			emptyCheck: function emptyCheck() {
				if (1 == this.pageType) {
					if ("" == this.userName) {
						this.userNameErrorTipsKey = true;
						this.userPwdErrorTipsKey = false;
						this.userNameErrorTips = "昵称不能为空！";
						return false;
					} else if ("" == this.userPwd) {
						this.userNameErrorTipsKey = false;
						this.userPwdErrorTipsKey = true;
						this.userPwdErrorTips = "密码不能为空！";
						return false;
					} else {
						this.userNameErrorTipsKey = false;
						this.userPwdErrorTipsKey = false;
					}
				} else if (2 == this.pageType) {
					if ("" == this.quickPhone) {
						this.quickPhoneErrorTipsKey = true;
						this.quickVCErrorTipsKey = false;
						this.quickPhoneErrorTips = "手机号不能为空！";
						return false;
					} else if ("" == this.quickVC) {
						this.quickPhoneErrorTipsKey = false;
						this.quickVCErrorTipsKey = true;
						this.quickVCErrorTips = "验证码不能为空！";
						return false;
					} else {
						this.quickPhoneErrorTipsKey = false;
						this.quickVCErrorTipsKey = false;
					}
				} else if (3 == this.pageType) {
					if ("" == this.regPhone) {
						this.regPhoneErrorTipsKey = true;
						this.regVCErrorTipsKey = false;
						this.regUserNameErrorTipsKey = false;
						this.regPwdErrorTipsKey = false;
						this.regPwd2ErrorTipsKey = false;
						this.regPhoneErrorTips = "手机号不能为空！";
						return false;
					} else if ("" == this.regVC) {
						this.regPhoneErrorTipsKey = false;
						this.regVCErrorTipsKey = true;
						this.regUserNameErrorTipsKey = false;
						this.regPwdErrorTipsKey = false;
						this.regPwd2ErrorTipsKey = false;
						this.regVCErrorTips = "验证码不能为空";
						return false;
					} else if ("" == this.regUserName) {
						this.regPhoneErrorTipsKey = false;
						this.regVCErrorTipsKey = false;
						this.regUserNameErrorTipsKey = true;
						this.regPwdErrorTipsKey = false;
						this.regPwd2ErrorTipsKey = false;
						this.regUserNameErrorTips = "昵称不能为空!";
						return false;
					} else if ("" == this.regPwd) {
						this.regPhoneErrorTipsKey = false;
						this.regVCErrorTipsKey = false;
						this.regUserNameErrorTipsKey = false;
						this.regPwdErrorTipsKey = true;
						this.regPwd2ErrorTipsKey = false;
						this.regPwdErrorTips = "密码不能为空！";
						return false;
					} else if ("" == this.regPwd2) {
						this.regPhoneErrorTipsKey = false;
						this.regVCErrorTipsKey = false;
						this.regUserNameErrorTipsKey = false;
						this.regPwdErrorTipsKey = false;
						this.regPwd2ErrorTipsKey = true;
						this.regPwd2ErrorTips = "密码不一致!";
						return false;
					} else {
						this.regPhoneErrorTipsKey = false;
						this.regVCErrorTipsKey = false;
						this.regUserNameErrorTipsKey = false;
						this.regPwdErrorTipsKey = false;
						this.regPwd2ErrorTipsKey = false;
					}
				} else if (4 == this.pageType) {
					if ("" == this.forgetPhone) {
						this.forgetPhoneErrorTipsKey = true;
						this.forgetVCErrorTipsKey = false;
						this.forgetPwdErrorTipsKey = false;
						this.forgetPwd2ErrorTipsKey = false;
						this.forgetPhoneErrorTips = "手机号不能为空！";
						return false;
					} else if ("" == this.forgetVC) {
						this.forgetPhoneErrorTipsKey = false;
						this.forgetVCErrorTipsKey = true;
						this.forgetPwdErrorTipsKey = false;
						this.forgetPwd2ErrorTipsKey = false;
						this.forgetVCErrorTips = "验证码不能为空";
						return false;
					} else if ("" == this.forgetPwd) {
						this.forgetPhoneErrorTipsKey = false;
						this.forgetVCErrorTipsKey = false;
						this.forgetPwdErrorTipsKey = true;
						this.forgetPwd2ErrorTipsKey = false;
						this.forgetPwdErrorTips = "密码不能为空！";
						return false;
					} else if ("" == this.forgetPwd2) {
						this.forgetPhoneErrorTipsKey = false;
						this.forgetVCErrorTipsKey = false;
						this.forgetPwdErrorTipsKey = false;
						this.forgetPwd2ErrorTipsKey = true;
						this.forgetPwd2ErrorTips = "密码不一致!";
						return false;
					} else {
						this.forgetPhoneErrorTipsKey = false;
						this.forgetVCErrorTipsKey = false;
						this.forgetPwdErrorTipsKey = false;
						this.forgetPwd2ErrorTipsKey = false;
					}
				}
				return true;
			},


			//keyboard submit
			keyboardSub: function keyboardSub(ev) {
				if (13 == ev.keyCode) {
					//submit before check
					this.emptyCheck();
				}
			},

			//reg check input value
			regCheckValue: function regCheckValue(reg, str) {
				if (!reg.test(str)) {
					return false;
				};
				return true;
			},
			goPrePage: function goPrePage() {
				var prePage = $(window).storager({
					key: 'fePrePage'
				}).readStorage();
				setTimeout(function () {
					if (undefined == prePage || "undefined" == prePage) {
						window.location.href = "index.html";
					} else {
						window.location.href = prePage;
					}
				}, 300);
			},


			//success tips and gotoNext
			successTipGoTo: function successTipGoTo() {
				if (1 == this.pageType || 2 == this.pageType) {
					layer.msg('登录成功!');
					this.goPrePage();
				} else if (3 == this.pageType) {
					layer.msg('注册成功!');
					this.goPrePage();
				} else if (4 == this.pageType) {
					layer.msg('密码重置成功!');
				}
			},


			//save user information
			saveUserInfor: function saveUserInfor(obj) {
				pageObj.storager({ //UNickName
					key: 'feUType',
					value: this.userType,
					expires: this.storageType
				}).addStorage();
				pageObj.storager({ //Uid
					key: 'feUid',
					value: obj.memberId,
					expires: this.storageType
				}).addStorage();
				pageObj.storager({ //UName
					key: 'feUName',
					value: obj.name,
					expires: this.storageType
				}).addStorage();
				pageObj.storager({ //UNickName
					key: 'feUNickName',
					value: obj.nickName,
					expires: this.storageType
				}).addStorage();
				pageObj.storager({ //UICon
					key: 'feUIcon',
					value: obj.iconPath,
					expires: this.storageType
				}).addStorage();

				this.successTipGoTo();
			},


			//login subimt
			loginSub: function loginSub() {
				if (!this.emptyCheck()) {
					return false;
				}
				var _this = this;
				if (1 == this.pageType) {
					if (!this.regCheckValue(/^\w{4,8}$/, this.userPwd)) {
						this.userPwdErrorTipsKey = true;
						this.userPwdErrorTips = "请输入合法的密码";
						return false;
					}

					this.$http.post(SERVERROOTDATA + "User.ashx?action=userLogin", {
						mobile: _this.userName,
						userType: _this.userType,
						password: _this.userPwd
					}, {
						emulateJSON: true
					}).then(function (res) {
						console.log(JSON.stringify(res.body));
						var obj = res.body;
						if (803 == obj || "803" == obj) {
							_this.userNameErrorTipsKey = true;
							_this.userNameErrorTips = "用户名错误！";
							return false;
						}
						if (804 == obj || "804" == obj) {
							_this.userPwdErrorTipsKey = true;
							_this.userPwdErrorTips = "密码错误！";
							return false;
						}

						this.saveUserInfor(obj[0]);
					});
				} else if (2 == this.pageType) {
					if (!this.regCheckValue(/^1[34578]\d{9}$/, this.quickPhone)) {
						this.quickPhoneErrorTipsKey = true;
						this.quickPhoneErrorTips = "请输入正确的手机号码！";
						return false;
					}

					this.$http.post(SERVERROOTDATA + "User.ashx?action=validateCodeLogin", {
						mobile: _this.quickPhone,
						userType: _this.userType,
						validateCode: _this.quickVC
					}, {
						emulateJSON: true
					}).then(function (res) {
						var obj = res.body;
						if (801 == obj || "801" == obj) {
							layer.msg("请先注册");
							return false;
						}
						if (805 == obj || "805" == obj) {
							_this.quickVCErrorTipsKey = true;
							_this.quickVCErrorTips = "验证码错误！";
							return false;
						}
						if (806 == obj || "806" == obj) {
							_this.quickVCErrorTipsKey = true;
							_this.quickVCErrorTips = "验证码过期！";
							return false;
						}

						_this.saveUserInfor(obj[0]);
					});
				}
			},

			//register submit
			regSub: function regSub() {
				if (!this.emptyCheck()) {
					return false;
				}
				if (!this.regCheckValue(/^1[34578]\d{9}$/, this.regPhone)) {
					this.regPhoneErrorTipsKey = true;
					this.regPhoneErrorTips = "请输入正确的手机号码！";
					return false;
				}

				if (!this.regCheckValue(/^[A-Za-z0-9_\u4e00-\u9fa5]{4,16}$/, this.regUserName)) {
					this.regUserNameErrorTipsKey = true;
					this.regUserNameErrorTips = "请设置4-16位的用户名";
					return false;
				}

				if (!this.regCheckValue(/^\w{4,8}$/, this.regPwd)) {
					this.regPwdErrorTipsKey = true;
					this.regPwdErrorTips = "请设置4-8位的密码";
					return false;
				}

				if (this.regPwd != this.regPwd2) {
					this.regPwd2ErrorTipsKey = true;
					return false;
				}

				if (!this.agreeRegKey) {
					layer.msg("请先勾选同意协议");
					return false;
				}

				var _this = this;
				this.$http.post(SERVERROOTDATA + "User.ashx?action=userRegister", {
					mobile: _this.regPhone,
					validateCode: _this.regVC,
					userName: _this.regUserName,
					userType: _this.userType,
					password: _this.regPwd
				}, {
					emulateJSON: true
				}).then(function (res) {
					var obj = res.body;
					if (805 == obj || "805" == obj) {
						_this.regVCErrorTipsKey = true;
						_this.regVCErrorTips = "验证码错误！";
						return false;
					}
					if (806 == obj || "806" == obj) {
						_this.regVCErrorTipsKey = true;
						_this.regVCErrorTips = "验证码过期！";
						return false;
					}

					_this.successTipGoTo();
				});
			},


			//forget submit
			forgetSub: function forgetSub() {
				if (!this.emptyCheck()) {
					return false;
				}
				if (!this.regCheckValue(/^1[34578]\d{9}$/, this.forgetPhone)) {
					this.forgetPhoneErrorTipsKey = true;
					this.forgetPhoneErrorTips = "请输入正确的手机号码！";
					return false;
				}

				if (!this.regCheckValue(/^\w{4,8}$/, this.forgetPwd)) {
					this.forgetPwdErrorTipsKey = true;
					this.forgetPwdErrorTips = "请设置4-8位的密码";
					return false;
				}

				if (this.forgetPwd != this.forgetPwd2) {
					this.forgetPwd2ErrorTipsKey = true;
					return false;
				}

				var _this = this;
				this.$http.post(SERVERROOTDATA + "User.ashx?action=resetPassword", {
					mobile: _this.forgetPhone,
					validateCode: _this.forgetVC,
					userType: _this.userType,
					password: _this.forgetPwd,
					forgetPwd: _this.forgetPwd2

				}, {
					emulateJSON: true
				}).then(function (res) {
					var obj = res.body;
					if (805 == obj || "805" == obj) {
						_this.forgetVCErrorTipsKey = true;
						_this.forgetVCErrorTips = "验证码错误！";
						return false;
					}

					if (806 == obj || "806" == obj) {
						_this.forgetVCErrorTipsKey = true;
						_this.forgetVCErrorTips = "验证码已过期！";
						return false;
					}

					_this.saveUserInfor(obj[0]);
				});
			}
		}
	});
}
/**********************************************/
//login end
/**********************************************/
/*
 * Autor:Jabo
 * Time：2017/07/20
 * Desc：index.html js
 */

function indexData() {

	var newsBannerInterval;
	/*
  * 新闻Banner
  */
	new Vue({
		el: '#jindexNewBannerApp',
		data: {
			dataArr: '',
			currentNewsId: '',
			currentImg: "./images/temp/indexBigNewBg.jpg",
			indexActive: 0

		},
		mounted: function mounted() {
			//1.0ready --> 2.0
			this.$nextTick(function () {
				this.loadData();
			});
		},
		methods: {
			loadData: function loadData() {
				this.getNewsData();
			},
			getNewsData: function getNewsData() {
				var _this = this;
				this.$http.post(SERVERROOTDATA + "News.ashx?action=getHomeNewsBanner", {
					organId: TempOrgId,
					pageSize: 10
				}, {
					emulateJSON: true
				}).then(function (res) {
					this.dataArr = res.body;
					if (this.dataArr.length < 1) {
						return false;
					}
					this.currentImg = SERVERROOTFILE + this.dataArr[0].iconPath;
					this.currentNewsId = ROOT + "newsdetail.html?newsId=" + this.dataArr[0].newsId;
					this.autoShow();
				});
			},
			autoShow: function autoShow() {
				var obj = this.dataArr;
				var len = obj.length,
				    _this = this;
				newsBannerInterval = setInterval(function () {
					_this.indexActive += 1;
					if (_this.indexActive >= len) {
						_this.indexActive = 0;
					}
					_this.currentImg = SERVERROOTFILE + obj[_this.indexActive].iconPath;
					_this.currentNewsId = ROOT + "newsdetail.html?newsId=" + obj[_this.indexActive].newsId;
				}, 5000);
			},
			leaveContinue: function leaveContinue() {
				this.autoShow();
			},
			changeCurrentShow: function changeCurrentShow(src, newsId, index) {
				this.currentImg = SERVERROOTFILE + src;
				this.currentNewsId = ROOT + "newsdetail.html?newsId=" + newsId;
				this.indexActive = index;
				clearInterval(newsBannerInterval);
			}
		}
	});

	/*
  * 教育资讯
  */
	new Vue({
		el: '#jindexEduApp',
		data: {
			dataExamArr: [],
			dataBroadcastArr: [],
			dataWorkArr: [],
			firstBroadcastNewsId: "",
			firstBroadcastNewsTitle: '',
			firstBroadcastNewsImg: "temp/newssmall-school.jpg"
		},
		filters: {
			addRoot: function addRoot(newsId) {
				return ROOT + "newsdetail.html?newsId=" + newsId;
			},
			addRootFile: function addRootFile(img) {
				return ROOTFILE + img;
			}
		},
		mounted: function mounted() {
			//1.0ready --> 2.0
			this.$nextTick(function () {
				this.getNewsData();
			});
		},
		methods: {
			getNewsData: function getNewsData() {
				var _this = this;
				this.$http.post(ROOTDATA + "indexEduNewsData.json", {}, {
					emulateJSON: true
				}).then(function (res) {
					var obj = res.body;
					if (obj.length < 1) {
						return false;
					}
					_this.dataExamArr = obj[0];
					_this.dataBroadcastArr = obj[1];
					_this.dataWorkArr = obj[2];

					_this.firstBroadcastNewsId = obj[1][0].newsId;
					_this.firstBroadcastNewsTitle = obj[1][0].title;
					_this.firstBroadcastNewsImg = obj[1][0].img;
				});
			}
		}
	});

	/*
  * 影视圈
  */
	new Vue({
		el: '#jindexVideoHubApp',
		data: {
			dataPlayListArr: [],
			dataWeiPlayArr: [],
			type: true,
			initScrollFlag: true
		},
		filters: {
			addRoot: function addRoot(playId) {
				return ROOT + "weiplayer.html?playId=" + playId;
			},
			addRootFile: function addRootFile(img) {
				return ROOTFILE + img;
			}
		},
		mounted: function mounted() {
			//1.0ready --> 2.0
			this.$nextTick(function () {
				this.getPlayListData();
			});
		},
		methods: {
			getPlayListData: function getPlayListData() {
				var _this = this;
				this.$http.post(ROOTDATA + "programListData.json", {}, {
					emulateJSON: true
				}).then(function (res) {
					_this.dataPlayListArr = res.body;
				}).then(function () {
					var tempBeiginTime,
					    tempEndTime,
					    tempBeginHour,
					    tempBeginMins,
					    tempEndHour,
					    tempEndMins,
					    currentHour = $.getCurrentTime().getHours(),
					    currentMins = $.getCurrentTime().getMinutes();

					for (var i in _this.dataPlayListArr) {
						//时间格式 ： 2017-07-28 18:30:36
						tempBeiginTime = $.getDateTimeFormat(_this.dataPlayListArr[i].timebegin, "/");
						tempEndTime = $.getDateTimeFormat(_this.dataPlayListArr[i].timeend, "/");
						tempBeginHour = tempBeiginTime[3];
						tempBeginMins = tempBeiginTime[4];
						tempEndHour = tempEndTime[3];
						tempEndMins = tempEndTime[4];
						_this.dataPlayListArr[i].timebegin = tempBeginHour + ":" + tempBeginMins;
						_this.dataPlayListArr[i].timeend = tempEndHour + ":" + tempEndMins;

						if (_this.activationCurrentPlay(currentHour, currentMins, tempBeginHour, tempBeginMins, tempEndHour, tempEndMins)) {
							Vue.set(_this.dataPlayListArr[i], "active", true);
						}
					}
					if (_this.initScrollFlag) {
						_this.initScrollFlag = false;
						$(".fe-tv-list-box").mCustomScrollbar();
					}
				});
			},
			activationCurrentPlay: function activationCurrentPlay(cHour, cMins, bHour, bMins, eHour, eMins) {
				if (bHour < cHour && eHour > cHour) {
					return true;
				} else if (bHour == cHour && bMins <= cMins) {
					return true;
				} else if (eHour == cHour && eMins >= cMins) {
					return true;
				}
				return false;
			},
			getWeiData: function getWeiData() {
				var _this = this;
				this.$http.post(ROOTDATA + "indexWeiData.json", {}, {
					emulateJSON: true
				}).then(function (res) {
					_this.dataWeiPlayArr = res.body;
				});
			},
			changeType: function changeType() {
				if (this.type) {
					this.type = false;
					this.getWeiData();
				} else {
					this.type = true;
					this.getPlayListData();
				}
			}
		}
	});

	/*
  * 云课题
  */
	new Vue({
		el: '#jindexCloudApp',
		data: {
			adHeight: 0,
			screenWidth: 1200,
			timer: false,
			tempActiveIndex: 0,
			dataCloudTypeArr: [],
			dataCloudCourse: [],
			dataCloudTodayArr: [],
			dataCloudTomorrowArr: [],
			initScrollFlag: true
		},
		filters: {
			addRoot: function addRoot(courseId) {
				//				return ROOT + "coursedatail.html?courseId=" + courseId;
				return ROOT + "cloundcoursedetail.html?courseId=" + courseId;
			},
			addRootFile: function addRootFile(img) {
				return SERVERROOTFILE + img;
			}
		},
		mounted: function mounted() {
			//1.0ready --> 2.0
			var that = this;
			this.$nextTick(function () {
				this.getType();
			});

			window.onresize = function () {
				return function () {
					window.screenWidth = document.body.clientWidth;
					that.screenWidth = window.screenWidth;
				}();
			};
		},
		watch: {
			screenWidth: function screenWidth(val) {
				if (!this.timer) {
					this.screenWidth = val;
					this.timer = true;
					var that = this;

					setTimeout(function () {
						that.setCourseHeight();
						that.timer = false;
					}, 400);
				}
			}
		},
		methods: {
			getType: function getType() {
				var _this = this;
				this.$http.post(SERVERROOTDATA + "EducationalLevel.ashx?action=getEducationalLevel", {}, {
					emulateJSON: true
				}).then(function (res) {
					_this.dataCloudTypeArr = res.body;
					if (_this.dataCloudTypeArr.length < 1) {
						return false;
					}
					_this.getCourseData(_this.dataCloudTypeArr[0].educationalLevelId);
				});
			},
			getCourseData: function getCourseData(typeId) {
				var _this = this;
				this.$http.post(SERVERROOTDATA + "CourseCenter.ashx?action=getDiscountCourse", {
					organId: TempOrgId,
					educationLevelId: typeId
				}, {
					emulateJSON: true
				}).then(function (res) {
					_this.dataCloudCourse = res.body;
				}).then(function (res) {
					if (_this.initScrollFlag) {
						_this.initScrollFlag = false;
						_this.getListData();
					}
				});
			},
			getListData: function getListData() {
				var _this = this;
				this.$http.post(SERVERROOTDATA + "ChannelProgram.ashx?action=getTodayAndTomorrowLiveProgram", {}, {
					emulateJSON: true
				}).then(function (res) {
					if (res.body.length < 1) {
						return false;
					}
					_this.dataCloudTodayArr = res.body[0].todayLive;
					_this.dataCloudTomorrowArr = res.body[1].tomorrowLive;
				}).then(function () {
					_this.adHeight = $("#fe-course-box").height();
					setTimeout(function () {
						_this.adHeight = $("#fe-course-box").height();
					}, 400);
				}).then(function () {
					$("#fe-clound-play-list").mCustomScrollbar();
				});
			},
			changeType: function changeType(typeId, index) {
				this.tempActiveIndex = index;
				this.getCourseData(typeId);
			},
			setCourseHeight: function setCourseHeight() {
				this.adHeight = $("#fe-course-box").height();
			}
		}
	});

	/*
  * 选课中心
  */
	new Vue({
		el: "#jindexSelectionApp",
		data: {
			dataSeletionTypeArr: [],
			dataSeletionArr: [],
			dataSeletionWeiArr: [],
			tempActiveIndex: 0
		},
		filters: {
			addRoot: function addRoot(courseId) {
				//return ROOT + "coursedetail.html?courseId=" + courseId;
				return ROOT + "coursedetail.html?courseId=" + courseId;
			},
			addRootFile: function addRootFile(img) {
				return SERVERROOTFILE + img;
			}
		},
		mounted: function mounted() {
			//1.0ready --> 2.0
			var that = this;
			this.$nextTick(function () {
				this.getType();
			});
		},
		methods: {
			getType: function getType() {
				var _this = this;
				this.$http.post(SERVERROOTDATA + "EducationalLevel.ashx?action=getEducationalLevel", {}, {
					emulateJSON: true
				}).then(function (res) {
					_this.dataSeletionTypeArr = res.body;
					_this.getCourseData(_this.dataSeletionTypeArr[0].educationalLevelId);
				});
			},
			getCourseData: function getCourseData(typeId) {
				var _this = this;
				this.$http.post(SERVERROOTDATA + "CourseCenter.ashx?action=getSelectiveCourse", {
					educationalLevelId: typeId,
					organId: TempOrgId
				}, {
					emulateJSON: true
				}).then(function (res) {
					if (res.body.length < 1) {
						return false;
					}
					_this.dataSeletionArr = res.body[0].course;
					_this.dataSeletionWeiArr = res.body[1].microLecture;
				});
			},
			changeType: function changeType(typeId, index) {
				this.tempActiveIndex = index;
				this.getCourseData(typeId);
			}
		}

	});

	/*
  * 名师在线
  */
	new Vue({
		el: "#jindexTeacherApp",
		data: {
			teacherArr: []
		},
		filters: {
			addRoute: function addRoute(value) {
				return SERVERROOTFILE + value;
			},
			addHref: function addHref(id) {
				return ROOT + "teacherindex.html?teacherId=" + id;
			}
		},
		mounted: function mounted() {
			//1.0ready --> 2.0
			this.$nextTick(function () {
				this.getTeacherData();
			});
		},
		methods: {
			getTeacherData: function getTeacherData() {
				var _this = this;
				this.$http.post(SERVERROOTDATA + "Teacher.ashx?action=getOnlineTeacher", {
					pageSize: 8,
					organId: TempOrgId
				}, {
					emulateJSON: true
				}).then(function (res) {
					_this.teacherArr = res.body;
				}).then(function () {
					_this.initSwiper();
				});
			},
			initSwiper: function initSwiper() {
				new Swiper('.fe-teacher-container', {
					slidesPerView: 4,
					spaceBetween: 20,
					nextButton: '.swiper-button-next',
					prevButton: '.swiper-button-prev',
					autoplay: 5000,
					breakpoints: {
						960: {
							slidesPerView: 3,
							spaceBetween: 10
						},
						767: {
							slidesPerView: 2,
							spaceBetween: 8
						},
						479: {
							slidesPerView: 1,
							spaceBetween: 6
						}
					}
				});
			}
		}
	});

	/*
  * 活动快讯
  */
	new Vue({
		el: "#jindexActivityApp",
		data: {
			type: 1 // 初始1：辩论赛 2：教育台 3：最美教师 
		},
		mounted: function mounted() {
			//1.0ready --> 2.0
			this.$nextTick(function () {
				this.getDebateData();
			});
		},
		methods: {
			getDebateData: function getDebateData() {},
			changeType: function changeType(typeId) {
				this.type = typeId;
			}
		}
	});

	(function () {
		var indexTopPos = 0;
		$(window).scroll(function () {
			indexTopPos = $(window).scrollTop();
			if (indexTopPos > 400) {
				$("#fe-left-nav-box").css("display", "block");
			} else {
				$("#fe-left-nav-box").css("display", "none");
			}

			if (indexTopPos < 900) {
				//教育资讯
				if (!$("#fe-left-nav-box a").first().hasClass("active")) {
					$("#fe-left-nav-box .active").removeClass("active");
					$("#fe-left-nav-box a").first().addClass("active");
				}
			} else if (indexTopPos > 900 && indexTopPos < 1600) {
				//影视圈
				if (!$("#fe-left-nav-box a").eq(1).hasClass("active")) {
					$("#fe-left-nav-box .active").removeClass("active");
					$("#fe-left-nav-box a").eq(1).addClass("active");
				}
			} else if (indexTopPos > 1600 && indexTopPos < 2000) {
				//云课堂
				if (!$("#fe-left-nav-box a").eq(2).hasClass("active")) {
					$("#fe-left-nav-box .active").removeClass("active");
					$("#fe-left-nav-box a").eq(2).addClass("active");
				}
			} else if (indexTopPos > 2000 && indexTopPos < 2600) {
				//选课中心
				if (!$("#fe-left-nav-box a").eq(3).hasClass("active")) {
					$("#fe-left-nav-box .active").removeClass("active");
					$("#fe-left-nav-box a").eq(3).addClass("active");
				}
			} else if (indexTopPos > 2600 && indexTopPos < 3100) {
				//名师在线
				if (!$("#fe-left-nav-box a").eq(4).hasClass("active")) {
					$("#fe-left-nav-box .active").removeClass("active");
					$("#fe-left-nav-box a").eq(4).addClass("active");
				}
			} else if (indexTopPos > 3100 && indexTopPos < 3600) {
				//名师在线
				if (!$("#fe-left-nav-box a").eq(5).hasClass("active")) {
					$("#fe-left-nav-box .active").removeClass("active");
					$("#fe-left-nav-box a").eq(5).addClass("active");
				}
			}
		});

		$("#fe-left-nav-box a").click(function () {
			$("html, body").animate({
				scrollTop: $($(this).attr("href")).offset().top + "px"
			}, {
				duration: 500,
				easing: "swing"
			});
		});
	})();
}

/**********************************************/
//index  end
/**********************************************/
/*
 * Autor:Jabo
 * Time：2017/07/20
 * Desc：cloundroom js
 */
function cloundRoomData() {
	/*
  * Banner
  */
	new Vue({
		el: "#jcloundBannerApp",
		data: {
			cloundBannerArr: [],
			cloundImg: ""
		},
		filters: {
			addRootFile: function addRootFile(img) {
				return SERVERROOTFILE + img;
			}
		},
		mounted: function mounted() {
			//1.0ready --> 2.0
			this.$nextTick(function () {
				this.getInitData();
			});
		},
		methods: {
			getInitData: function getInitData() {
				var _this = this;

				this.$http.post(SERVERROOTDATA + "Banner.ashx?action=getBanner", {
					bannerType: "cloudclassroom",
					organId: TempOrgId
				}, {
					emulateJSON: true
				}).then(function (res) {
					if (res.body.length < 1) {
						return false;
					} else {
						_this.cloundBannerArr = res.body;
						_this.cloundImg = SERVERROOTFILE + _this.cloundBannerArr[0].iconPath;
					}
				});
			}
		}
	});
	/*
  * 左侧快速导航  
  */
	new Vue({
		el: '#jcloundNavApp',
		data: {
			leftNavArr: [],
			leftNavLoadOnce: true,
			isShowFlag: false,
			secondFlag: false,
			secondNavArr: [],
			inSecondBox: false,
			inLeftBox: false,
			rightNavArr: [],
			todayArr: [],
			tomorrowArr: [],
			afterTomorrowArr: [],
			todayFlag: true,
			tomorrowFlag: false,
			afterTomorrowFlag: false,
			toggleDire: false,
			parentNavId: '',
			gradeNavId: ''
		},
		filters: {
			addFirNavParent: function addFirNavParent(id) {
				return ROOT + "cloundcourselist.html?period=" + id + "&grade=&subject=";
			},
			addFirNav: function addFirNav(pid, id) {
				return ROOT + "cloundcourselist.html?period=" + pid + "&grade=&subject=" + id;
			},
			addSecNavGrade: function addSecNavGrade(id, pid) {
				return ROOT + "cloundcourselist.html?period=" + pid + "&grade=" + id + "&subject=";
			},
			addSecNav: function addSecNav(id, pid, gid) {
				return ROOT + "cloundcourselist.html?period=" + pid + "&grade=" + gid + "&subject=" + id;
			}
		},
		mounted: function mounted() {
			//1.0ready --> 2.0
			this.$nextTick(function () {
				this.getInitData();
			});
		},
		methods: {
			getInitData: function getInitData() {
				var _this = this;

				this.$http.post(SERVERROOTDATA + "Course.ashx?action=getPeriodSubject", {}, {
					emulateJSON: true
				}).then(function (res) {
					if (res.body.length < 1) {
						return false;
					} else {
						if (typeof res.body == "string") {
							_this.leftNavArr = JSON.parse(res.body);
						} else {
							_this.leftNavArr = res.body;
						}
					}
				});

				this.$http.post(SERVERROOTDATA + "ChannelProgram.ashx?action=getTodayTomorrowAfterLiveProgram", {
					channelId: "",
					organId: TempOrgId,
					pageIndex: "",
					pageSize: ""
				}, {
					emulateJSON: true
				}).then(function (res) {
					if (res.body.length < 1) {
						return false;
					}
					_this.todayArr = res.body[0].todayLive;
					_this.tomorrowArr = res.body[1].tomorrowLive;
					_this.afterTomorrowArr = res.body[2].tomorrowAfterLive;
				}).then(function () {
					$(".fe-nav-content").mCustomScrollbar();
				});
			},
			mousechangeShow: function mousechangeShow(id) {
				//first left nav change show
				var _this = this;
				this.secondFlag = true;
				this.inLeftBox = true;
				this.parentNavId = id;
				this.showSecondNav(id);
			},
			closeShow: function closeShow() {
				//first leave close
				if (!this.inSecondBox) {
					this.secondFlag = false;
				}
			},
			openShow: function openShow() {
				//open second nav
				this.inLeftBox = false;
				this.secondFlag = true;
				this.inSecondBox = true;
			},
			secondCloseShow: function secondCloseShow() {
				//leave second box
				this.inSecondBox = false;
				if (!this.inLeftBox) {
					this.secondFlag = false;
				}
			},
			showSecondNav: function showSecondNav(id) {
				//get second nav data
				var _this = this;
				this.$http.post(SERVERROOTDATA + "Course.ashx?action=getGradeSubject", {
					educationalLevelId: id
				}, {
					emulateJSON: true
				}).then(function (res) {
					if (res.body.length < 1) {
						return false;
					}
					_this.secondNavArr = res.body;
				});
			},
			getGrade: function getGrade(id) {
				this.gradeNavId = id;
			},
			changeList: function changeList(typeId) {
				//change show type
				if (1 == typeId) {
					this.todayFlag = true;
					this.tomorrowFlag = false;
					this.afterTomorrowFlag = false;
				} else if (2 == typeId) {
					this.todayFlag = false;
					this.tomorrowFlag = true;
					this.afterTomorrowFlag = false;
				} else if (3 == typeId) {
					this.todayFlag = false;
					this.tomorrowFlag = false;
					this.afterTomorrowFlag = true;
				}
				setTimeout(function () {
					$(".fe-nav-content").mCustomScrollbar("update");
				}, 300);
			},
			toggleLeftShow: function toggleLeftShow() {
				if (this.isShowFlag) {
					this.isShowFlag = false;
					$(".fe-left-nav-inner").css("height", "40px");
				} else {
					this.isShowFlag = true;
					$(".fe-left-nav-inner").css("height", "430px");
				}
			},
			toggleOpen: function toggleOpen() {
				$(".fe-nav-content").slideToggle();
				if (this.toggleDire) {
					this.toggleDire = false;
				} else {
					this.toggleDire = true;
				}
				setTimeout(function () {
					$(".fe-nav-content").mCustomScrollbar("update");
				}, 300);
			}
		}
	});

	/*
  * 最新直播
  */
	new Vue({
		el: "#jcloundLiveApp",
		data: {
			liveData: []

		},
		filters: {
			addRoot: function addRoot(courseId) {
				return ROOT + "cloundcoursedetail.html?courseId=" + courseId;
			},
			addRootOrg: function addRootOrg(sid) {
				return ROOT + "schoolindex.html?schoolId=" + sid;
			},
			addRootTeacher: function addRootTeacher(tid) {
				return ROOT + "teacherindex.html?teacherId=" + tid;
			},
			addRootFile: function addRootFile(img) {
				return SERVERROOTFILE + img;
			}
		},
		mounted: function mounted() {
			//1.0ready --> 2.0
			this.$nextTick(function () {
				this.getInitData();
			});
		},
		methods: {
			getInitData: function getInitData() {
				var _this = this;
				this.$http.post(SERVERROOTDATA + "ChannelProgram.ashx?action=getNewestLiveProgram", {
					channelId: "",
					organId: TempOrgId
					//					pageIndex:1,
					//					pageSize:12
				}, {
					emulateJSON: true
				}).then(function (res) {
					if (res.body.rows == undefined) {
						return false;
					}
					_this.liveData = res.body.rows;
				}).then(function () {
					_this.setCloundSwiper();
				});
			},
			setCloundSwiper: function setCloundSwiper() {
				var cloundLiveSwiper = new Swiper('.fe-clound-live-container', {
					prevButton: '.fe-clound-live-swiper-prev',
					nextButton: '.fe-clound-live-swiper-next',
					autoHeight: true
				});
			}
		}
	});

	/*
  * 热门课程
  */
	new Vue({
		el: "#jcloundHotApp",
		data: {
			liveData: []
		},
		filters: {
			addRoot: function addRoot(courseId) {
				return ROOT + "cloundcoursedetail.html?courseId=" + courseId;
			},
			addRootOrg: function addRootOrg(orgId) {
				return ROOT + "school.html?schoolId=" + orgId;
			},
			addRootFile: function addRootFile(img) {
				return SERVERROOTFILE + img;
			}
		},
		mounted: function mounted() {
			//1.0ready --> 2.0
			this.$nextTick(function () {
				this.getInitData();
			});
		},
		methods: {
			getInitData: function getInitData() {
				var _this = this;
				this.$http.post(SERVERROOTDATA + "ChannelProgram.ashx?action=getHottestLiveProgram", {
					channelId: "",
					organId: TempOrgId
					//					pageIndex:1,
					//					pageSize:12
				}, {
					emulateJSON: true
				}).then(function (res) {
					if (res.body.rows == undefined) {
						return false;
					}
					_this.liveData = res.body.rows;
				}).then(function () {
					_this.setCloundSwiper();
				});
			},
			setCloundSwiper: function setCloundSwiper() {
				var cloundHotSwiper = new Swiper('.fe-clound-hot-container', {
					prevButton: '.fe-clound-hot-swiper-prev',
					nextButton: '.fe-clound-hot-swiper-next',
					autoHeight: true
				});
			}
		}
	});

	/*
  * 往期直播
  */
	new Vue({
		el: "#jcloundPastApp",
		data: {
			liveData: []
		},
		filters: {
			addRoot: function addRoot(courseId) {
				return ROOT + "cloundcoursedetail.html?courseId=" + courseId;
			},
			addRootOrg: function addRootOrg(orgId) {
				return ROOT + "schoolindex.html?schoolId=" + orgId;
			},
			addRootFile: function addRootFile(img) {
				return SERVERROOTFILE + img;
			}
		},
		mounted: function mounted() {
			//1.0ready --> 2.0
			this.$nextTick(function () {
				this.getInitData();
			});
		},
		methods: {
			getInitData: function getInitData() {
				var _this = this;
				this.$http.post(SERVERROOTDATA + "ChannelProgram.ashx?action=getPreviousLiveProgram", {
					channelId: "",
					organId: TempOrgId
					//					pageIndex:1,
					//					pageSize:12
				}, {
					emulateJSON: true
				}).then(function (res) {
					if (res.body.rows == undefined) {
						return false;
					}
					_this.liveData = res.body.rows;
				}).then(function () {
					_this.setCloundSwiper();
				});
			},
			setCloundSwiper: function setCloundSwiper() {
				var cloundHotSwiper = new Swiper('.fe-clound-past-container', {
					prevButton: '.fe-clound-past-swiper-prev',
					nextButton: '.fe-clound-past-swiper-next',
					autoHeight: true
				});
			}
		}
	});
}
/*
 * 新闻详情页
 */

function newsDetail(newsId) {
	new Vue({
		el: "#jnewsDetailApp",
		data: {
			newsId: "",
			currentNewsArr: [],
			preNewsArr: [],
			nextNewsArr: [],
			hotNewsListArr: [],
			momentNewsListArr: []

		},
		filters: {
			addRootFile: function addRootFile(img) {
				return SERVERROOTFILE + img;
			}
		},
		mounted: function mounted() {
			//1.0ready --> 2.0
			this.$nextTick(function () {
				this.newsId = newsId;
				this.getNewsDetail();
				this.getHotNews();
				this.getMomentNews();
			});
		},
		methods: {
			//get news detail
			getNewsDetail: function getNewsDetail() {
				var _this = this;
				this.$http.post(SERVERROOTDATA + "News.ashx?action=getCurrentNews", {
					newsId: _this.newsId,
					organId: TempOrgId
				}, {
					emulateJSON: true
				}).then(function (res) {
					if (res.body.length < 1) {
						return false;
					}
					_this.currentNewsArr = res.body[0];
					_this.preNewsArr = res.body[1];
					_this.nextNewsArr = res.body[2];
					$.scrollTo(0);
				});
			},

			//get left part new hot
			getHotNews: function getHotNews() {
				var _this = this;
				this.$http.post(SERVERROOTDATA + "News.ashx?action=getHottestNews", {
					organId: TempOrgId,
					pageIndex: 1,
					pageSize: 10
				}, {
					emulateJSON: true
				}).then(function (res) {
					if (res.body.rows == undefined) {
						return false;
					}
					_this.hotNewsListArr = res.body.rows;
				});
			},

			//get left part new moment
			getMomentNews: function getMomentNews() {
				var _this = this;
				this.$http.post(SERVERROOTDATA + "News.ashx?action=getWonderfulNews", {
					organId: TempOrgId,
					pageIndex: 1,
					pageSize: 4
				}, {
					emulateJSON: true
				}).then(function (res) {
					if (res.body.rows == undefined) {
						return false;
					}
					_this.momentNewsListArr = res.body.rows;
				});
			},

			//select news
			openNews: function openNews(id) {
				this.newsId = id;
				this.getNewsDetail();
			}
		}
	});
}
/*
 * Desc：云课堂详情
 * 课程状态：1、免费 【游客或未报名】  2、免费已报名   3、
 */
function cloundCourseDetail(courseId) {
	new Vue({
		el: "#jcloundCourseDetailApp",
		data: {
			courseIcon: "",
			courseHeaderArr: [],
			courseContentArr: [],
			//			courseIntruArr: [],
			//			courseDetailArr: [],
			//			courseTeacherArr: [],
			courseReInf: [],
			courseId: "",
			courseScheduleArr: [],
			courseCommentArr: [],
			//820: 课程免费【游客或者未购买(未报名)】
			//821: 课程免费/收费【已购买（已报名）】
			//822: 课程收费【未购买（未报名）】：有试听
			//825: 直播课程即将开课暂无回放【已购买（已报名）】
			//826: 直播课程即将开课有回放【已购买（已报名）】
			//827: 直播课程进入课堂暂无回放【已购买（已报名）】
			//828: 直播课程进入课堂有回放【已购买（已报名）】
			//courseStatusCode: 820,
			isPurchased: false,
			isFreeFlag: false,
			isLiving: true,
			enrollFlag: true, //是否要报名
			freeAuditionFlag: false,
			liveBeforeFlag: false,
			liveBeforeNextFlag: false,
			livePlayFlag: false,
			livePlayNextFlag: false,
			activeStatus: 1, // 1：课程介绍， 2：详情， 3：课表 4 名师简介  5 评价
			bgRootFile: "",
			showItem: 5,
			current: 1,
			allpage: 0,
			commentCount: 0,
			reviewId: "",
			liveId: "",
			freeId: ""
		},
		filters: {
			addRootFile: function addRootFile(img) {
				return SERVERROOTFILE + img;
			},
			gotoSchool: function gotoSchool(id) {
				return ROOT + "schoolindex.html?schoolId=" + id;
			},
			gotoTeacher: function gotoTeacher(id) {
				return ROOT + "teacherindex.html?teacherId=" + id;
			},
			gotoCloundPlayer: function gotoCloundPlayer(id) {
				return ROOT + "cloundplayer.html?cid=" + id;
			},
			gotoCoursePlayer: function gotoCoursePlayer(vid, cid) {
				return ROOT + "courseplayer.html?cid=" + cid + "&vid=" + vid;
			},
			gotoPayment: function gotoPayment(id) {
				return ROOT + "paymentoptions.html?cid=" + id;
			}
		},
		computed: {
			pages: function pages() {
				var pag = [];
				if (this.current < this.showItem) {
					//如果当前的激活的项 小于要显示的条数
					//总页数和要显示的条数那个大就显示多少条
					var i = Math.min(this.showItem, this.allpage);
					while (i) {
						pag.unshift(i--);
					}
				} else {
					//当前页数大于显示页数了
					var middle = this.current - Math.floor(this.showItem / 2),
					    //从哪里开始
					i = this.showItem;
					if (middle > this.allpage - this.showItem) {
						middle = this.allpage - this.showItem + 1;
					}
					while (i--) {
						pag.push(middle++);
					}
				}
				return pag;
			}
		},
		mounted: function mounted() {
			//1.0ready --> 2.0
			this.$nextTick(function () {
				this.getInitData();
				this.getCourseDetail();
			});
		},
		methods: {
			getInitData: function getInitData() {
				//get init data
				var _this = this;
				this.courseId = courseId;
				this.bgRootFile = SERVERROOTFILE;
				this.$http.post(SERVERROOTDATA + "Course.ashx?action=getCourseDetailHeaderById", {
					courseId: _this.courseId,
					recordType: 1,
					userType: $(window).storager({
						key: 'feUType'
					}).readStorage(),
					userId: $(window).storager({
						key: 'feUid'
					}).readStorage()
				}, {
					emulateJSON: true
				}).then(function (res) {
					if (res.body.length > 0) {
						_this.courseHeaderArr = res.body[0];
						_this.courseIcon = SERVERROOTFILE + _this.courseHeaderArr.iconPath;
						//_this.courseStatusCode = _this.courseHeaderArr.statusCode;
						if (_this.courseHeaderArr.isPurchased == 1 || _this.courseHeaderArr.isPurchased == "1") {
							_this.isPurchased = true;
						} else if (_this.courseHeaderArr.isFree == 1 || _this.courseHeaderArr.isFree == "1") {
							_this.isFreeFlag = true;
						}
					}
				}).then(function () {
					//_this.initStatus();
					_this.getSchedule();
				});
			},
			getCourseDetail: function getCourseDetail() {
				var _this = this;
				this.$http.post(SERVERROOTDATA + "Course.ashx?action=getCourseDetailById", {
					courseId: _this.courseId,
					recordType: 1,
					userType: $(window).storager({
						key: 'feUType'
					}).readStorage(),
					userId: $(window).storager({
						key: 'feUid'
					}).readStorage()
				}, {
					emulateJSON: true
				}).then(function (res) {
					if (res.body.length > 0) {
						_this.courseReInf = res.body;
						//_this.courseContentArr = res.body;
						//						_this.courseIntruArr = res.body[0];
						//						_this.courseDetailArr = res.body[1];
						//						_this.courseTeacherArr = res.body[2];
					}
				});
			},
			getSchedule: function getSchedule() {
				var _this = this;
				this.$http.post(SERVERROOTDATA + "ChannelProgram.ashx?action=getCourseLiveProgram", {
					courseId: _this.courseId,
					recordType: 1,
					userType: $(window).storager({
						key: 'feUType'
					}).readStorage(),
					userId: $(window).storager({
						key: 'feUid'
					}).readStorage()
				}, {
					emulateJSON: true
				}).then(function (res) {
					if (res.body.rows == undefined) {
						return false;
					}
					_this.courseScheduleArr = res.body.rows;
					_this.courseScheduleArr.forEach(function (item, index) {
						if (item.playState == 2 || item.playState == "2") {}
					});
				}).then(function () {
					_this.getComment();
				});
			},
			getComment: function getComment() {
				var _this = this;
				this.$http.post(SERVERROOTDATA + "CourseEvaluation.ashx?action=getEvaluation", {
					courseId: _this.courseId,
					uid: $(window).storager({
						key: 'feUid'
					}).readStorage(),
					pageSize: _this.showItem,
					pageIndex: _this.current
				}, {
					emulateJSON: true
				}).then(function (res) {
					if (res.body.rows != undefined) {
						_this.allpage = res.body.totalPageCount;
						_this.commentCount = res.body.totalCount;
						//Array.prototype.push.apply(_this.courseCommentArr, res.body.rows);
						_this.courseCommentArr = res.body.rows;
					}
				});
			},

			//			initStatus() { //init status
			//				if(820 == this.courseStatusCode) { //820: 课程免费【游客或者未购买(未报名)】
			//					this.isFreeFlag = true;
			//					this.enrollFlag = true;
			//					this.freeAuditionFlag = true;
			//					this.liveBeforeFlag = false;
			//					this.liveBeforeNextFlag = false;
			//					this.livePlayFlag = false;
			//					this.livePlayNextFlag = false;
			//					this.isPurchased = false;
			//				} else if(821 == this.courseStatusCode) { //821: 课程免费/收费【已购买（已报名）】
			//					this.isFreeFlag = true;
			//					this.enrollFlag = false;
			//					this.freeAuditionFlag = false;
			//					this.liveBeforeFlag = false;
			//					this.liveBeforeNextFlag = true;
			//					this.livePlayFlag = false;
			//					this.livePlayNextFlag = false;
			//					this.isPurchased = true;
			//				} else if(822 == this.courseStatusCode) { //课程未购买(有试听)
			//					this.isFreeFlag = false;
			//					this.enrollFlag = true;
			//					this.freeAuditionFlag = true;
			//					this.liveBeforeFlag = false;
			//					this.liveBeforeNextFlag = false;
			//					this.livePlayFlag = false;
			//					this.livePlayNextFlag = false;
			//					this.isPurchased = false;
			//				} else if(825 == this.courseStatusCode) { //825: 直播课程即将开课暂无回放【已购买（已报名）】
			//					this.isFreeFlag = false;
			//					this.enrollFlag = false;
			//					this.freeAuditionFlag = false;
			//					this.liveBeforeFlag = true;
			//					this.liveBeforeNextFlag = false;
			//					this.livePlayFlag = false;
			//					this.livePlayNextFlag = false;
			//					this.isPurchased = true;
			//
			//				} else if(826 == this.courseStatusCode) { //826: 直播课程即将开课有回放【已购买（已报名）】
			//					this.isFreeFlag = false;
			//					this.enrollFlag = false;
			//					this.freeAuditionFlag = false;
			//					this.liveBeforeFlag = false;
			//					this.liveBeforeNextFlag = true;
			//					this.livePlayFlag = false;
			//					this.livePlayNextFlag = false;
			//					this.isPurchased = true;
			//				} else if(827 == this.courseStatusCode) { //827: 直播课程进入课堂暂无回放【已购买（已报名）】
			//					this.isFreeFlag = false;
			//					this.enrollFlag = false;
			//					this.freeAuditionFlag = false;
			//					this.liveBeforeFlag = false;
			//					this.liveBeforeNextFlag = false;
			//					this.livePlayFlag = true;
			//					this.livePlayNextFlag = false;
			//					this.isPurchased = true;
			//				} else if(828 == this.courseStatusCode) { //828: 直播课程进入课堂有回放【已购买（已报名）】
			//					this.isFreeFlag = false;
			//					this.enrollFlag = false;
			//					this.freeAuditionFlag = false;
			//					this.liveBeforeFlag = true;
			//					this.liveBeforeNextFlag = false;
			//					this.livePlayFlag = false;
			//					this.livePlayNextFlag = true;
			//					this.isPurchased = true;
			//				}
			//			},
			initStatus: function initStatus() {},
			changeActiveStatus: function changeActiveStatus(index, ele) {
				//change Tab status
				this.activeStatus = index;
				$.scrollTo($(ele).offset().top, 300);
			},
			enroll: function enroll() {
				//报名购买free
				var _this = this;
				this.$http.post(ROOTDATA + "successData.json", {
					courseId: _this.courseId,
					uid: $(window).storager({
						key: 'feUid'
					}).readStorage()
				}, {
					emulateJSON: true
				}).then(function (res) {
					layer.msg("报名课程成功！欢迎收看");
					//_this.courseStatusCode = 821;
					//_this.initStatus();
					_this.getSchedule();
				});
			},
			goto: function goto(index) {
				//枫叶处理
				if (index == this.current) return;
				if (index > this.allpage) {
					this.current = this.current - 2;
					layer.msg("Sorry ╮(╯_╰)╭ 没有下一页喽！");
					return false;
				}
				this.current = index;
				this.getComment();
			}
		}
	});
}
/**********************************************/
//header public begin
/**********************************************/

Vue.component('header-template', {
	template: '<div><div class="fequestion-header-top-bar">' + '<div class="container">' + '<a v-bind:href="index | addRoot">网站首页</a> |' + '<a href="#this"> APP下载</a>' + '<div class="fequestion-header-top-other fequestion-unlogin">' + '<div v-show="!isLogined" class="fequestion-unlogin-box">' + '<a href="#this" v-bind:href="login| addRoot" @click="setPrePage">登陆</a> |' + '<a href="#this" v-bind:href="reg| addRoot" @click="setPrePage"> 注册</a>' + '</div>' + '<div v-show="isLogined" class="fequestion-login-box">' + '<a href="#this" v-bind:href="member | addRoot">{{nickName}}</a> | ' + '<a href="#this" @click="signOut"> 退出</a>' + ' </div>' + '</div>' + '</div>' + '</div>' + '<div class="container">' + '<div class="fequestion-content">' + '<a v-bind:href="index | addRoot" class="fequestion-nav-icon">' + '<img v-bind:src="logo | addRootFile" />' + '</a>' + '</div>' + '</div>' + '<div class="fequestion-nav-inner">' + '<div class="container">' + '<ul class="fe-question-nav-wrap">' + '<li v-for="(item, index) in list"><a v-bind:href="item.href | addRoot"  v-bind:class="{\'active\': item.active}" @click="storageActive(index)"><span>{{item.name}}</span></a></li>' + '</ul>' + '</div>' + '</div>' + '</div>',
	data: function data() {
		return {
			list: [{ "name": "首页", "href": "questionindex.html" }, { "name": "小学试题", "href": "questionexercise.html?pageType=1" }, { "name": "初中试题", "href": "questionexercise.html?pageType=2" }, { "name": "高中试题", "href": "questionexercise.html?pageType=3" }, { "name": "模拟练习", "href": "questionexercise.html?pageType=4" }],
			isLogined: false,
			nickName: '',
			questionid: '',
			index: 'index.html',
			login: 'login.html',
			reg: 'login.html?login=3',
			member: 'membercenter.html',
			logo: 'public/logo-front-icon.jpg'
		};
	},
	mounted: function mounted() {
		//1.0ready --> 2.0 
		this.$nextTick(function () {
			//初始化
			this.initData();
		});
	},
	filters: {
		addRoot: function addRoot(obj) {
			return ROOT + obj;
		},
		addRootFile: function addRootFile(obj) {
			return ROOTFILE + obj;
		}
	},
	methods: {
		storageActive: function storageActive(id) {
			$(window).storager({ //Uid
				key: 'navkey',
				value: id,
				expires: 0
			}).addStorage();
		},
		initData: function initData() {
			this.questionid = $(window).getUrlParam("questionId");
			this.list.forEach(function (item, index) {
				if (typeof item.active == "undefined") {
					Vue.set(item, "active", false); //全局注册变量
				}
			});

			if ($(window).storager({ key: 'navkey' }).readStorage() == undefined) {
				this.list[0].active = true;
			} else {
				var index = parseInt($(window).storager({ key: 'navkey' }).readStorage());
				this.list[index].active = true;
			}
			if ($(window).storager({ key: 'feUid' }).readStorage() == undefined) {
				this.isLogined = false;
			} else {
				this.isLogined = true;
				this.nickName = $(window).storager({ key: 'feUNickName' }).readStorage();
			}
		},
		signOut: function signOut() {
			$(window).storager({ key: 'feUid' }).removeStorage();
			$(window).storager({ key: 'feUNickName' }).removeStorage();
			window.location.reload();
		},
		setPrePage: function setPrePage() {
			$(window).storager({ //fePrePage
				key: 'fePrePage',
				value: $.getBasePath(1),
				expires: 0
			}).addStorage();
		}
	}
});
new Vue({
	el: '#questionheader'
});
/**********************************************/
//header public end
/**********************************************/

/*
 * Desc：课程详情
 * 课程状态：1、免费 【游客或未报名】  2、免费已报名   3、
 */
function courseDetail(courseId) {
	new Vue({
		el: "#jcourseDetailApp",
		data: {
			courseIcon: "",
			courseHeaderArr: [],
			courseContentArr: [],
			courseIntruArr: [],
			courseDetailArr: [],
			courseTeacherArr: [],
			courseId: "",
			courseScheduleArr: [],
			courseCommentArr: [],
			courseReInf: [],
			//820: 课程免费【游客或者未购买(未报名)】
			//821: 课程免费/收费【已购买（已报名）】
			//822: 课程收费【未购买（未报名）】：有试听
			//825: 直播课程即将开课暂无回放【已购买（已报名）】
			//826: 直播课程即将开课有回放【已购买（已报名）】
			//827: 直播课程进入课堂暂无回放【已购买（已报名）】
			//828: 直播课程进入课堂有回放【已购买（已报名）】
			courseStatusCode: 820,
			isPurchased: false,
			isFreeFlag: false,
			enrollFlag: true,
			freeAuditionFlag: false,
			liveBeforeFlag: false,
			liveBeforeNextFlag: false,
			livePlayFlag: false,
			livePlayNextFlag: false,
			activeStatus: 1, // 1：课程介绍， 2：详情， 3：课表 4 名师简介  5 评价
			bgRootFile: "",
			showItem: 5,
			current: 1,
			allpage: 0,
			commentCount: 0,
			reviewId: "",
			liveId: "",
			freeId: "",
			uId: "",
			uType: "",
			allowId: "", //试听iD 第一个
			allowCourseCatalogId: "", //试听大纲ID 第一个
			firstId: "", //第一个vId
			firstCourseCatalogId: "", // 第一个大纲Id
			orderType: 0, //默认课程类型 订单类型： 0 订课程 1 订微课 2 订微视频(电影) 3 订直播(专家观点(如：填报志愿))
			orderId: ""
		},
		filters: {
			addRootFile: function addRootFile(img) {
				return ROOTFILE + img;
			},
			gotoSchool: function gotoSchool(id) {
				return ROOT + "schoolindex.html?schoolId=" + id;
			},
			gotoTeacher: function gotoTeacher(id) {
				return ROOT + "teacherindex.html?teacherId=" + id;
			},
			gotoCloundPlayer: function gotoCloundPlayer(id) {
				return ROOT + "cloundplayer.html?cid=" + id;
			},
			gotoCoursePlayer: function gotoCoursePlayer(id) {
				return ROOT + "courseplayer.html?cid=" + id;
			},
			gotoPayment: function gotoPayment(id, orderId) {
				return ROOT + "paymentoptions.html?cid=" + id + "&orderId=" + orderId;
			}
		},
		computed: {
			pages: function pages() {
				var pag = [];
				if (this.current < this.showItem) {
					//如果当前的激活的项 小于要显示的条数
					//总页数和要显示的条数那个大就显示多少条
					var i = Math.min(this.showItem, this.allpage);
					while (i) {
						pag.unshift(i--);
					}
				} else {
					//当前页数大于显示页数了
					var middle = this.current - Math.floor(this.showItem / 2),
					    //从哪里开始
					i = this.showItem;
					if (middle > this.allpage - this.showItem) {
						middle = this.allpage - this.showItem + 1;
					}
					while (i--) {
						pag.push(middle++);
					}
				}
				return pag;
			}
		},
		mounted: function mounted() {
			//1.0ready --> 2.0
			this.$nextTick(function () {
				this.getInitData();
				this.getCourseDetail();
			});
		},
		methods: {
			getInitData: function getInitData() {
				//get init data
				var _this = this;
				this.courseId = courseId;
				this.bgRootFile = ROOTFILE;
				this.uId = $(window).storager({
					key: 'feUid'
				}).readStorage();
				if (this.uId == undefined || this.uId == "undefined") {
					this.uId = "";
				}
				this.uType = $(window).storager({
					key: 'feUType'
				}).readStorage();
				if (this.uType == undefined || this.uType == "undefined") {
					this.uType = "";
				}
				this.$http.post(SERVERROOTDATA + "Course.ashx?action=getCourseDetailHeaderById", {
					userId: _this.uId,
					courseId: _this.courseId,
					recordType: 0,
					userType: _this.uType
				}, {
					emulateJSON: true
				}).then(function (res) {
					if (res.body.length > 0) {
						_this.courseHeaderArr = res.body[0];
						_this.courseIcon = SERVERROOTFILE + _this.courseHeaderArr.iconPath;
						_this.courseStatusCode = _this.courseHeaderArr.statusCode;
					}
				}).then(function () {
					//_this.initStatus();
					_this.getSchedule();
				});
				if (_this.courseHeaderArr.isPurchased == 1 || _this.courseHeaderArr.isPurchased == "1") {
					_this.isPurchased = true;
				} else if (_this.courseHeaderArr.isFree == 1 || _this.courseHeaderArr.isFree == "1") {
					_this.isFreeFlag = true;
				}
			},
			getCourseDetail: function getCourseDetail() {
				var _this = this;
				this.$http.post(SERVERROOTDATA + "Course.ashx?action=getCourseDetailById", {
					courseId: _this.courseId,
					recordType: 0,
					userType: _this.uType,
					userId: _this.uId
				}, {
					emulateJSON: true
				}).then(function (res) {
					if (res.body.length > 0) {
						_this.courseReInf = res.body[0];
						//_this.courseContentArr = res.body;
						//						_this.courseIntruArr = res.body[0];
						//						_this.courseDetailArr = res.body[1];
						//						_this.courseTeacherArr = res.body[2];
					}
				});
			},
			getSchedule: function getSchedule() {
				var _this = this;
				this.$http.post(SERVERROOTDATA + "CourseCatalog.ashx?action=getCourseCatalogByCourseId", {
					courseId: _this.courseId,
					userType: _this.uType,
					userId: _this.uId,
					pageIndex: 1,
					pageSize: 100
				}, {
					emulateJSON: true
				}).then(function (res) {
					if (res.body.rows != undefined) {
						_this.courseScheduleArr = res.body.rows;

						_this.courseScheduleArr.forEach(function (item, index) {
							if (index == 0) {
								_this.firstId = item.videoId; //第一个vId
								_this.firstCourseCatalogId = item.courseCatalogId;
							}

							if (item.allowListen == 1 || item.allowListen == "1") {
								_this.allowId = item.videoId; //试听iD 第一个
								_this.allowCourseCatalogId = item.courseCatalogId; //试听大纲ID 第一个

								return false;
							}
						});
					}
				}).then(function () {
					_this.getComment();
				});
			},
			getComment: function getComment() {
				var _this = this;
				this.$http.post(SERVERROOTDATA + "CourseEvaluation.ashx?action=getEvaluation", {
					courseId: _this.courseId,
					pageSize: _this.showItem,
					pageIndex: _this.current
				}, {
					emulateJSON: true
				}).then(function (res) {
					if (res.body.rows != undefined) {
						_this.allpage = res.body.totalPageCount;
						_this.commentCount = res.body.totalCount;
						//Array.prototype.push.apply(_this.courseCommentArr, res.body.rows);
						_this.courseCommentArr = res.body.rows;
					}
				});
			},

			//			initStatus() { //init status
			//				if(820 == this.courseStatusCode) { //820: 课程免费【游客或者未购买(未报名)】
			//					this.isFreeFlag = true;
			//					this.enrollFlag = true;
			//					this.freeAuditionFlag = true;
			//					this.liveBeforeFlag = false;
			//					this.liveBeforeNextFlag = false;
			//					this.livePlayFlag = false;
			//					this.livePlayNextFlag = false;
			//					this.isPurchased = false;
			//				} else if(821 == this.courseStatusCode) { //821: 课程免费/收费【已购买（已报名）】
			//					this.isFreeFlag = true;
			//					this.enrollFlag = false;
			//					this.freeAuditionFlag = false;
			//					this.liveBeforeFlag = false;
			//					this.liveBeforeNextFlag = true;
			//					this.livePlayFlag = false;
			//					this.livePlayNextFlag = false;
			//					this.isPurchased = true;
			//				} else if(822 == this.courseStatusCode) { //课程未购买(有试听)
			//					this.isFreeFlag = false;
			//					this.enrollFlag = true;
			//					this.freeAuditionFlag = true;
			//					this.liveBeforeFlag = false;
			//					this.liveBeforeNextFlag = false;
			//					this.livePlayFlag = false;
			//					this.livePlayNextFlag = false;
			//					this.isPurchased = false;
			//				} else if(825 == this.courseStatusCode) { //825: 直播课程即将开课暂无回放【已购买（已报名）】
			//					this.isFreeFlag = false;
			//					this.enrollFlag = false;
			//					this.freeAuditionFlag = false;
			//					this.liveBeforeFlag = true;
			//					this.liveBeforeNextFlag = false;
			//					this.livePlayFlag = false;
			//					this.livePlayNextFlag = false;
			//					this.isPurchased = true;
			//
			//				} else if(826 == this.courseStatusCode) { //826: 直播课程即将开课有回放【已购买（已报名）】
			//					this.isFreeFlag = false;
			//					this.enrollFlag = false;
			//					this.freeAuditionFlag = false;
			//					this.liveBeforeFlag = false;
			//					this.liveBeforeNextFlag = true;
			//					this.livePlayFlag = false;
			//					this.livePlayNextFlag = false;
			//					this.isPurchased = true;
			//				} else if(827 == this.courseStatusCode) { //827: 直播课程进入课堂暂无回放【已购买（已报名）】
			//					this.isFreeFlag = false;
			//					this.enrollFlag = false;
			//					this.freeAuditionFlag = false;
			//					this.liveBeforeFlag = false;
			//					this.liveBeforeNextFlag = false;
			//					this.livePlayFlag = true;
			//					this.livePlayNextFlag = false;
			//					this.isPurchased = true;
			//				} else if(828 == this.courseStatusCode) { //828: 直播课程进入课堂有回放【已购买（已报名）】
			//					this.isFreeFlag = false;
			//					this.enrollFlag = false;
			//					this.freeAuditionFlag = false;
			//					this.liveBeforeFlag = true;
			//					this.liveBeforeNextFlag = false;
			//					this.livePlayFlag = false;
			//					this.livePlayNextFlag = true;
			//					this.isPurchased = true;
			//				}
			//			},
			changeActiveStatus: function changeActiveStatus(index, ele) {
				//change Tab status
				this.activeStatus = index;
				$.scrollTo($(ele).offset().top, 300);
			},
			enroll: function enroll() {
				//报名购买free
				var _this = this;
				this.$http.post(ROOTDATA + "successData.json", {
					courseId: _this.courseId,
					uid: $(window).storager({
						key: 'feUid'
					}).readStorage()
				}, {
					emulateJSON: true
				}).then(function (res) {
					layer.msg("报名课程成功！欢迎收看");
					_this.courseStatusCode = 821;
					//_this.initStatus();
					_this.getSchedule();
				});
			},
			a: function a() {
				var _this = this;
				this.$http.post(SERVERROOTDATA + "Order.ashx?action=directBuyGoods", {
					goodsId: _this.courseId,
					userId: _this.uId,
					userType: _this.uType,
					orderType: this.orderType

				}, {
					emulateJSON: true
				}).then(function (res) {
					_this.orderId = res.body[0].orderId;
				});
			},
			goto: function goto(index) {
				//枫叶处理
				if (index == this.current) return;
				if (index > this.allpage) {
					this.current = this.current - 2;
					layer.msg("Sorry ╮(╯_╰)╭ 没有下一页喽！");
					return false;
				}
				this.current = index;
				this.getComment();
			}
		}
	});
}
/*
 * 新闻详情页
 */

function schoolNewsDetail(newsId) {
	new Vue({
		el: "#jschoolNewsDetailApp",
		data: {
			newsId: "",
			currentNewsArr: [],
			preNewsArr: [],
			nextNewsArr: []
		},
		filters: {
			addRootFile: function addRootFile(img) {
				return ROOTFILE + img;
			}
		},
		mounted: function mounted() {
			//1.0ready --> 2.0
			this.$nextTick(function () {
				this.newsId = newsId;
				this.getNewsDetail();
			});
		},
		methods: {
			//get news detail
			getNewsDetail: function getNewsDetail() {
				var _this = this;
				this.$http.post(ROOTDATA + "newsdetails.json", {
					newsId: _this.newsId
				}, {
					emulateJSON: true
				}).then(function (res) {
					if (res.body.length < 1) {
						return false;
					}
					_this.currentNewsArr = res.body[0];
					_this.preNewsArr = res.body[1];
					_this.nextNewsArr = res.body[2];
					$.scrollTo(0);
				});
			},

			//select news
			openNews: function openNews(id) {
				this.newsId = id;
				this.getNewsDetail();
			}
		}
	});
}
/**********************************************/
//header public begin
/**********************************************/

Vue.component('header-template', {
	template: '<div><div class="feschool-header-top-bar">' + '<div class="container">' + '<a href="index.html">网站首页</a> |' + '<a href="#this"> APP下载</a>' + '<div class="feschool-header-top-other feschool-unlogin">' + '<div v-show="!isLogined" class="feschool-unlogin-box">' + '<a href="#this" v-bind:href="login| addRoot" @click="setPrePage">登陆</a> |' + '<a href="#this" v-bind:href="reg| addRoot" @click="setPrePage"> 注册</a>' + '</div>' + '<div v-show="isLogined" class="feschool-login-box">' + '<a href="#this" v-bind:href="member | addRoot">{{nickName}}</a> | ' + '<a href="#this" @click="signOut"> 退出</a>' + ' </div>' + '</div>' + '</div>' + '</div>' + '<div class="container">' + '<div class="feschool-content">' + '<a v-bind:href="index | addRoot" class="feschool-nav-icon">' + '<img v-bind:src="logo | addRootFile" />' + '</a>' + '<ul class="fe-school-nav-wrap">' + '<li v-for="(item, index) in list"><a v-bind:href="item.href,schoolid | addSchoolRoot"  v-bind:class="{\'active\': item.active}" @click="storageActive(index)"><span>{{item.name}}</span></a></li>' + '</ul>' + '</div>' + '</div>' + '</div>',
	data: function data() {
		return {
			list: [{ "name": "首页", "href": "schoolindex.html" }, { "name": "热门课程", "href": "schoolcourse.html" }, { "name": "名师推荐", "href": "schoolteacher.html" }, { "name": "校园资讯", "href": "schoolnewslist.html" }, { "name": "校园风采", "href": "schoolstyle.html" }],
			isLogined: false,
			nickName: '',
			schoolid: '',
			index: 'schoolindex.html',
			login: 'login.html',
			reg: 'login.html?login=3',
			member: 'membercenter.html',
			logo: 'temp/schoolicon.jpg'
		};
	},
	mounted: function mounted() {
		//1.0ready --> 2.0 
		this.$nextTick(function () {
			//初始化
			this.initData();
		});
	},
	filters: {
		addRoot: function addRoot(obj) {
			return ROOT + obj;
		},
		addRootFile: function addRootFile(obj) {
			return ROOTFILE + obj;
		},
		addSchoolRoot: function addSchoolRoot(obj, id) {
			return ROOT + obj + "?schoolId=" + id;
		}
	},
	methods: {
		storageActive: function storageActive(id) {
			$(window).storager({ //Uid
				key: 'navkey',
				value: id,
				expires: 0
			}).addStorage();
		},
		initData: function initData() {
			this.schoolid = $(window).getUrlParam("schoolId");
			this.list.forEach(function (item, index) {
				if (typeof item.active == "undefined") {
					Vue.set(item, "active", false); //全局注册变量
				}
			});

			if ($(window).storager({ key: 'navkey' }).readStorage() == undefined) {
				this.list[0].active = true;
			} else {
				var index = parseInt($(window).storager({ key: 'navkey' }).readStorage());
				this.list[index].active = true;
			}
			if ($(window).storager({ key: 'feUid' }).readStorage() == undefined) {
				this.isLogined = false;
			} else {
				this.isLogined = true;
				this.nickName = $(window).storager({ key: 'feUNickName' }).readStorage();
			}
		},
		signOut: function signOut() {
			$(window).storager({ key: 'feUid' }).removeStorage();
			$(window).storager({ key: 'feUNickName' }).removeStorage();
			window.location.reload();
		},
		setPrePage: function setPrePage() {
			$(window).storager({ //fePrePage
				key: 'fePrePage',
				value: $.getBasePath(1),
				expires: 0
			}).addStorage();
		}
	}
});
var header = new Vue({
	el: '#schoolheader'
});
/**********************************************/
//header public end
/**********************************************/