function xwztApp() {
	new Vue({
		el: "#jxwApp",
		data: {
			bannerArr: [],
			eduAch: [],
			videoArr:[],
			activeArr:[],
		},
		filters: {
			addRootFile: function(img) {
				return SERVERROOTFILE + img;
			},
			addRootHref: function(aId, acTId) {
				return ROOT + 'activedetail.html?activeId=' + aId + '&activityTypeId=' + acTId;
			}
		},
		mounted: function mounted() {
			this.$nextTick(function() {
				this.initBanner();
				this.geteduAch();
				this.getVideo();
				this.getActive();
			});
		},
		methods: {
			initBanner: function() {
				var _this = this;
				this.$http.post(SERVERROOTDATA + "ReformAndOpen.ashx?action=getBanner", {
					}, {
						emulateJSON: true
					})
					.then(function(res) {
						_this.bannerArr = res.body.rows;
						_this.bannerArr.forEach(function(item,index){
							Vue.set(item,"iconPath",SERVERROOTFILE + item.iconPath);
						})
					}).then(function(){
						_this.setSwiper();
					})
				
			},
			setSwiper: function() {
				var swiper = new Swiper('.xwzt-container', {
					spaceBetween: 0,
					autoplay:3000,
					pagination: '.swiper-pagination',
					paginationClickable: true,
				});
			},
			getVideo: function() {
				var _this = this;
				this.$http.post(SERVERROOTDATA + "ReformAndOpen.ashx?action=getNew", {
						activityTypeId: 38,
						pageIndex: 1,
						pageSize: 3
					}, {
						emulateJSON: true
					})
					.then(function(res) {
						_this.videoArr = res.body.rows;
						_this.videoArr.forEach(function(item,index){
							Vue.set(item,"iconPath",SERVERROOTFILE + item.iconPath);
						})
					})
				
			},
			
			getActive: function() {
				var _this = this;
				this.$http.post(SERVERROOTDATA + "ReformAndOpen.ashx?action=getNew", {
						activityTypeId: 36,
						pageIndex: 1,
						pageSize: 6
					}, {
						emulateJSON: true
					})
					.then(function(res) {
						_this.activeArr = res.body.rows;
						_this.activeArr.forEach(function(item,index){
							Vue.set(item,"iconPath",SERVERROOTFILE + item.iconPath);
						})
					})
				
			},
			geteduAch: function() {
				var _this = this;
				this.$http.post(SERVERROOTDATA + "ReformAndOpen.ashx?action=getNew", {
						activityTypeId: 37,
						pageIndex: 1,
						pageSize: 13
					}, {
						emulateJSON: true
					})
					.then(function(res) {
						_this.eduAch = res.body.rows;
					})
			},

		}
	})
}

function xwztlist() {
	new Vue({
		el: "#fexwztList",
		data: {
			activityTypeArr:[],
			activityArr:[],
			currentActivityId:36,
			allpage: 0,
			showItem: 10,
			current:1,
		},
		filters: {
			addRootFile: function(img) {
				return SERVERROOTFILE + img;
			},
			addRootHref: function(aId, acTId) {
				return ROOT + 'activedetail.html?activeId=' + aId + '&activityTypeId=' + acTId;
			}
		},
		computed: {
			pages: function() {
				var pag = [];
				if(this.current < this.showItem) { //如果当前的激活的项 小于要显示的条数
					//总页数和要显示的条数那个大就显示多少条
					var i = Math.min(this.showItem, this.allpage);
					while(i) {
						pag.unshift(i--);
					}
				} else { //当前页数大于显示页数了
					var middle = this.current - Math.floor(this.showItem / 2), //从哪里开始
						i = this.showItem;
					if(middle > (this.allpage - this.showItem)) {
						middle = (this.allpage - this.showItem) + 1
					}
					while(i--) {
						pag.push(middle++);
					}
				}
				return pag
			}
		},
		mounted: function() {
			var _this = this;
			this.$nextTick(function() {
				this.getType();
			})
		},
		methods: {
			getType:function(){
				var _this = this;
				_this.currentActivityId = $(document).getUrlParam("activityId")==undefined ? '36':$(document).getUrlParam("activityId");
				this.$http.post(SERVERROOTDATA + "ReformAndOpen.ashx?action=getType", {
					}, {
						emulateJSON: true
					})
					.then(function(res) {
						_this.activityTypeArr = res.body;
					}).then(function(){
						_this.getActive();
					})
			},
			getActive: function() {
				var _this = this;
				this.$http.post(SERVERROOTDATA + "ReformAndOpen.ashx?action=getNew", {
						activityTypeId: _this.currentActivityId,
						pageIndex: _this.current,
						pageSize: 6
					}, {
						emulateJSON: true
					})
					.then(function(res) {
						_this.activityArr = res.body.rows;
						_this.activityArr.forEach(function(item,index){
							Vue.set(item,"iconPath",SERVERROOTFILE + item.iconPath);
						})
						_this.allpage = res.body.totalPageCount;
					})
			},
			
			changeType:function(tId){
				this.currentActivityId = tId;
				this.current = 1;
				this.getActive();
			},
			
			goto: function(index) { //枫叶处理
				var _this = this;
				if(index == this.current) return;
				if(index > this.allpage) {
					this.current = this.current - 2;
					layer.msg("Sorry ╮(╯_╰)╭ 没有下一页喽！");
					return false;
				}
				_this.current = index;
				_this.getActive();
				$.scrollTo($('#newscontent').offset().top - 98, 300);
			}
		}
	})
}