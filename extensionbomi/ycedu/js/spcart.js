$(function() {
	var ROUTE = $.getBasePath()+ "bmOnline/website/ashx/";
	/*var ROUTE = "http://www.bomizx.net/bmOnline/website/ashx/";*/

	if($mid != null && $mid != undefined && $mid != "") {
		var vm = new Vue({
			el: "#jscapp",
			data: {
				allMoney: 0,
				selectedCourse: 0,
				pList: [], //全部课程
				pList2: [], //打折课程
				pList3: [], //即将过期
				selectedIdArr: [], //已选择cId
				checkAllFlag: false, //全选flag
				checkDisFlag: false, //打折flag
				checkExpFlag: false, //过期flag
				tempswitch: false,
				tempswitch2: false,
				tempswitch3: false,
				hadSelected: false //是否有选择课程
			},
			mounted: function() { //1.0ready --> 2.0 
				this.$nextTick(function() { //初始化
					this.cartView();
					//vm.cartView();
				})
			},
			methods: {
				cartView: function() { //初始全部课程
					var _this = this;
					this.$http.post(ROUTE + "ycedu/server/sp01.json", {
						mid: $mid
					}, {
						emulateJSON: true
					}).then(function(res) {
						_this.pList = res.body.list;
					}).then(function() {
						_this.initRegCheck();
						_this.courseNum();
						_this.tempswitch = true;
					}).then(function() {
						spcartFunc();
					});
				},
				courseNum: function() {  //tab 课程计数
					var $jspcartnum0 = $(".jspcartnum0"),
						$jspcartnum1 = $(".jspcartnum1"),
						$jspcartnum2 = $(".jspcartnum2");

					$jspcartnum0.text(this.pList.length);
					$jspcartnum1.text(this.pList2.length);
					$jspcartnum2.text(this.pList3.length);

				},

				initRegCheck: function() { //初始全部课程checkbox
					this.pList.forEach(function(item, index) {
						if(typeof item.checked == "undefined") {
							Vue.set(item, "checked", false); //全局注册变量
							//_this.$set(item, "checked", _this.checkAllFlag); //局部注册变量
						}
						Vue.set(item, "show", true); //是否显示
					})
				},
				initDisCheck: function() { //初始打折checkbox
					this.pList2.forEach(function(item, index) {
						if(typeof item.checked == "undefined") {
							Vue.set(item, "checked", false); //全局注册变量
							//_this.$set(item, "checked", _this.checkAllFlag); //局部注册变量
						}
						Vue.set(item, "show", true); //是否显示
					})
				},
				initExpCheck: function() { //初始过期课程
					this.pList3.forEach(function(item, index) {
						if(typeof item.checked == "undefined") {
							Vue.set(item, "checked", false); //全局注册变量
							//_this.$set(item, "checked", _this.checkAllFlag); //局部注册变量
						}
						Vue.set(item, "show", true); //是否显示
					})
				},

				checkDisHad: function() { //check打折课程状态
					var _this = this;
					_this.pList.forEach(function(item, index) {
						_this.pList2.forEach(function(item2, index2) {
							if(item2.pid == item.pid) {
								item2.checked = item.checked;
								return;
							}
						})
					})
				},
				checkExpHad: function() { //check过期课程状态
					var _this = this;
					_this.pList.forEach(function(item, index) {
						_this.pList3.forEach(function(item3, index3) {
							if(item3.pid == item.pid) {
								item3.checked = item.checked;
								return;
							}
						})
					})
				},

				revCheckDisHad: function() { //check打折课程状态rev
					var _this = this;

					_this.pList2.forEach(function(item2, index2) {
						_this.pList.forEach(function(item, index) {
							if(item2.pid == item.pid) {
								item.checked = item2.checked;
							}
						})
					})

					_this.pList2.forEach(function(item2, index2) {
						_this.pList3.forEach(function(item3, index3) {
							if(item2.pid == item3.pid) {
								item3.checked = item2.checked;
							}
						})
					})
				},

				revCheckExpHad: function() { //check过期课程状态rev
					var _this = this;

					_this.pList3.forEach(function(item3, index3) {
						_this.pList.forEach(function(item, index) {
							if(item3.pid == item.pid) {
								item.checked = item3.checked;
							}
						})
					})

					_this.pList3.forEach(function(item3, index3) {
						_this.pList2.forEach(function(item2, index2) {
							if(item2.pid == item3.pid) {
								item2.checked = item3.checked;
							}
						})
					})
				},

				checkSelectAllStatu: function() { //check all statu
					var temp = false,
						temp2 = false,
						temp3 = false,
						_this = this;
					_this.pList.forEach(function(item, index) {
						if(!item.checked == true) {
							temp = true;
							return false;
						}
					})
					_this.pList2.forEach(function(item2, index2) {
						if(!item2.checked == true) {
							temp = true;
							temp2 = true;
							return false;
						}
					})

					_this.pList3.forEach(function(item3, index3) {
						if(!item3.checked == true) {
							temp = true;
							temp3 = true;
							return false;
						}
					})

					if(temp3 || temp2 || temp) {
						_this.checkAllFlag = false;
						if(temp3) {
							_this.checkExpFlag = false;
						}
						if(temp2) {
							_this.checkDisFlag = false;
						}
					} else {
						_this.checkAllFlag = true;
						_this.checkDisFlag = true;
						_this.checkExpFlag = true;
					}

				},

				sppost: function(event) { //tab 获取数据
					var _this = this;
					$("#jspcartnav").off("click", "li");
					$("#jspcartnav").on("click", "li", function(obj) {
						var objClass = obj.target.className;
						if((objClass.indexOf("jspcartli0") > 0 || objClass.indexOf("jspcartnum0") > 0) && !_this.tempswitch) {
							_this.$http.post(ROUTE + "ycedu/server/sp01.json", {
								mid: $mid
							}, {
								emulateJSON: true
							}).then(function(res) {
								_this.pList = res.body.list;
							}).then(function() {
								_this.isCheckAll();
								_this.courseNum();
								_this.tempswitch = true;
							});
						} else if((objClass.indexOf("jspcartli1") > 0 || objClass.indexOf("jspcartnum1") > 0) && !_this.tempswitch2) {
							_this.$http.post(ROUTE + "ycedu/server/sp02.json", {
								mid: $mid
							}, {
								emulateJSON: true
							}).then(function(res) {
								_this.pList2 = res.body.list;
							}).then(function(res) {
								_this.initDisCheck();
								_this.isCheckAll();
								_this.isCheckDis();
								_this.checkDisHad();
								_this.courseNum();
								_this.tempswitch2 = true;
							}).then(function() {
								window.spcartSwiper.update();
							});

						} else if((objClass.indexOf("jspcartli2") > 0 || objClass.indexOf("jspcartnum2") > 0) && !_this.tempswitch3) {
							_this.$http.post(ROUTE + "ycedu/server/sp03.json", {
								mid: $mid
							}, {
								emulateJSON: true
							}).then(function(res) {
								_this.pList3 = res.body.list;
							}).then(function(res) {
								_this.initExpCheck();
								_this.isCheckAll();
								_this.isCheckExp();
								_this.checkExpHad();
								_this.courseNum();
								_this.tempswitch3 = true;
							}).then(function() {
								window.spcartSwiper.update();
							});
						}
					})
				},

				selectedProduct: function(item, pid) { //单个check改变状态
					if(typeof item.checked == "undefined") {
						Vue.set(item, "checked", true); //全局注册变量
						//_this.$set(item,"checked", true);  //局部注册变量
					} else {
						item.checked = !item.checked;
					}

					this.pList.forEach(function(item1, index) {
						if(item1.pid == pid) {
							item1.checked = item.checked;
						}
					})
					this.pList2.forEach(function(item2, index) {
						if(item2.pid == pid) {
							item2.checked = item.checked;
						}
					})
					this.pList3.forEach(function(item3, index) {
						if(item3.pid == pid) {
							item3.checked = item.checked;
						}
					})

					this.checkSelectAllStatu();
					this.calcSelectedCourse();
					this.calcAllMoney();

				},
				//全选check
				checkAll: function() {
					this.checkAllFlag = !this.checkAllFlag;
					this.checkDisFlag = this.checkAllFlag;
					this.checkExpFlag = this.checkAllFlag;
					var _this = this;
					this.pList.forEach(function(item, index) {
						if(typeof item.checked == "undefined") {
							Vue.set(item, "checked", true); //全局注册变量
							//_this.$set(item, "checked", _this.checkAllFlag); //局部注册变量
						} else {
							item.checked = _this.checkAllFlag;
						}
					})

					this.pList2.forEach(function(item, index) {
						if(typeof item.checked == "undefined") {
							Vue.set(item, "checked", true); //全局注册变量
							//_this.$set(item, "checked", _this.checkAllFlag); //局部注册变量
						} else {
							item.checked = _this.checkAllFlag;
						}
					})

					this.pList3.forEach(function(item, index) {
						if(typeof item.checked == "undefined") {
							Vue.set(item, "checked", true); //全局注册变量
							//_this.$set(item, "checked", _this.checkAllFlag); //局部注册变量
						} else {
							item.checked = _this.checkAllFlag;
						}
					})
					this.calcSelectedCourse();
					this.calcAllMoney();

				},
				//打折check
				checkDis: function() {
					this.checkDisFlag = !this.checkDisFlag;
					var _this = this;

					if(!this.checkDisFlag) {
						this.checkAllFlag = false;
					}

					this.pList2.forEach(function(item, index) {
						if(typeof item.checked == "undefined") {
							Vue.set(item, "checked", true); //全局注册变量
							//_this.$set(item, "checked", _this.checkAllFlag); //局部注册变量
						} else {
							item.checked = _this.checkDisFlag;
						}
					})
					this.revCheckDisHad();
					this.calcSelectedCourse();
					this.calcAllMoney();

				},
				//过期check
				checkExp: function() {
					this.checkExpFlag = !this.checkExpFlag;
					var _this = this;

					if(!this.checkExpFlag) {
						this.checkAllFlag = false;
					}

					this.pList3.forEach(function(item, index) {
						if(typeof item.checked == "undefined") {
							Vue.set(item, "checked", true); //全局注册变量
							//_this.$set(item, "checked", _this.checkAllFlag); //局部注册变量
						} else {
							item.checked = _this.checkExpFlag;
						}
					})
					_this.revCheckExpHad();
					_this.calcSelectedCourse();
					this.calcAllMoney();
				},
				isCheckAll: function() { //判断是否是全选状态
					if(!this.checkAllFlag) {
						this.checkDisFlag = false;
						this.checkExpFlag = false;
						return;
					} else {
						this.checkDisFlag = true;
						this.checkExpFlag = true;
						this.pList.forEach(function(item, index) {
							if(typeof item.checked == "undefined") {
								Vue.set(item, "checked", true); //全局注册变量
								//_this.$set(item, "checked", _this.checkAllFlag); //局部注册变量
							} else {
								item.checked = true;
							}
						})
						this.pList2.forEach(function(item, index) {
							if(typeof item.checked == "undefined") {
								Vue.set(item, "checked", true); //全局注册变量
								//_this.$set(item, "checked", _this.checkAllFlag); //局部注册变量
							} else {
								item.checked = true;
							}
						})
						this.pList3.forEach(function(item, index) {
							if(typeof item.checked == "undefined") {
								Vue.set(item, "checked", true); //全局注册变量
								//_this.$set(item, "checked", _this.checkAllFlag); //局部注册变量
							} else {
								item.checked = true;
							}
						})
					}
				},
				isCheckDis: function() { //判断是否全部打折
					if(!this.checkDisFlag) {
						this.checkAllFlag = false;
						return;
					} else {
						this.pList2.forEach(function(item, index) {
							if(typeof item.checked == "undefined") {
								Vue.set(item, "checked", true); //全局注册变量
								//_this.$set(item, "checked", _this.checkAllFlag); //局部注册变量
							} else {
								item.checked = true;
							}
						})
					}
				},
				isCheckExp: function() { //判断是否全部过期
					if(!this.checkExpFlag) {
						return;
					} else {
						this.pList3.forEach(function(item, index) {
							if(typeof item.checked == "undefined") {
								Vue.set(item, "checked", true); //全局注册变量
								//_this.$set(item, "checked", _this.checkAllFlag); //局部注册变量
							} else {
								item.checked = true;
							}
						})
					}
				},

				eachDelItem: function(id) { //遍历单个删除处理
					var _this = this;
					this.pList.forEach(function(item, index) {
						if(item.pid == id) {
							item.checked = false;
							Vue.set(item, "show", false); //是否显示
						}
					})

					this.pList2.forEach(function(item, index) {
						if(item.pid == id) {
							item.checked = false;
							Vue.set(item, "show", false); //是否显示
						}
					})

					this.pList3.forEach(function(item, index) {
						if(item.pid == id) {
							item.checked = false;
							Vue.set(item, "show", false); //是否显示
						}
					})
					setTimeout(function() {
						_this.calcAllMoney();
						_this.calcSelectedCourse();
						window.spcartSwiper.update();
					}, 300)
				},

				delItem: function(id) { //单个删除
					var _this = this;
					layer.confirm('是否删除？', {
						btn: ['删除', '点错']
					}, function() {
						_this.$http.post(ROUTE + "ycedu/server/success.json", { //删除的API
							mid: $mid,
							pId: id
						}, {
							emulateJSON: true
						}).then(function(res) {
							_this.eachDelItem(id);
							layer.msg('删除成功！', {
								icon: 1
							});
						});

					})
				},

				selectedDel: function() { //选择删除
					var _this = this;
					layer.confirm('是否删除？', {
						btn: ['删除', '点错']
					}, function() {
						_this.selectedIdArr = []; //先清空
						_this.pList.forEach(function(item, index) {
							if(item.checked) {
								_this.selectedIdArr.push(item.pid);
							}
						});
						_this.$http.post(ROUTE + "ycedu/server/success.json", { //删除的API
							mid: $mid,
							pId: _this.selectedIdArr
						}, {
							emulateJSON: true
						}).then(function(res) {
							this.pList.forEach(function(item, index) {
								if(item.checked) {
									Vue.set(item, "show", false); //是否显示
								}
							});
							this.pList2.forEach(function(item, index) {
								if(item.checked) {
									Vue.set(item, "show", false); //是否显示
								}
							});
							this.pList3.forEach(function(item, index) {
								if(item.checked) {
									Vue.set(item, "show", false); //是否显示
								}
							});
							layer.msg('删除成功！', {
								icon: 1
							});
						}).then(function(){
							window.spcartSwiper.update();
						});

					})
				},

				calcAllMoney: function() { //统计总价
					var _this = this;
					this.allMoney = 0;
					this.pList.forEach(function(item, index) {
						if(item.checked) {
							_this.allMoney += parseFloat(item.price);
						}
					})
				},
				calcSelectedCourse: function() {
					var _this = this;
					this.selectedCourse = 0;
					this.pList.forEach(function(item, index) {
						if(item.checked) {
							_this.selectedCourse++;
						}
					})

					if(this.selectedCourse > 0) {
						this.hadSelected = true;
					} else {
						this.hadSelected = false;
					}
				},

				subOrder: function() { //结算
					var _this = this;
					if(this.allMoney > 0) {
						_this.selectedIdArr = []; //先清空
						_this.pList.forEach(function(item, index) {
							if(item.checked) {
								_this.selectedIdArr.push(item.pid);
							}
						});
						_this.$http.post(ROUTE + "ycedu/server/success.json", {
							mid: $mid,
							pIdArr: _this.selectedIdArr
						}, {
							emulateJSON: true
						}).then(function(res) {   //生成订单并返回订单号
							//console.log(res)
							window.open("submitorder.html?orderId=");
						});
					} else {
						layer.msg("Sorry ╮(╯_╰)╭ 您还没选择课程哦！");
					}
				}
			}
		})
	} else {
		layer.msg("Sorry ╮(╯_╰)╭ 您没有登入哦！");
		setTimeout(function() {
			window.location.href = "login.html";
		}, 1000);
	}

})
