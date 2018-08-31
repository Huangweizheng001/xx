require("../../css/studentcenter/homework.less");

var homeSchoolApp = function() {
    new Vue({
        el: "#jhomeWorkApp",
        data: {
        	consultList:[],
        	replyList:[],
        	current:1,
            allpage:0,
            showItem: 3,
            userIconPath:''
        },
        filters: {
            addRootFile: function(img) {
                return SERVERROOTFILE + img;
            }
        },
        mounted: function mounted() {
            this.$nextTick(function() {
               this.getConsult();
               this.userIconPath = $(window).storager({key: 'uIcon'}).readStorage();
            });
        },
        methods: {
        	getConsult(){
        		var _this = this;
        		this.$http.post(SERVERROOTDATA+"api/student/site/Student.ashx?action=getSuggestionList", {
        			pageSize: _this.showItem,	//一页个数
                    pageIndex:_this.current,	//页码
        		}, {
					emulateJSON: true
				}).then(function(res) {
					if(res.body.code == 200){
						_this.consultList = res.body.rows;
						_this.consultList.forEach(function(item,index){
							Vue.set(item, "openFlag", false); //全局注册变量
						});
						_this.allpage=res.body.totalPageCount;
						
					}
				}).then(function(){
					_this.setParentIframe();
				});
        	},
        	getSuggestion(item){ 
        		var _this = this;
        		this.$http.post(SERVERROOTDATA+"api/student/site/Student.ashx?action=getSuggestionResponseList", {
        			suggestionId:item.suggestionId,
        			pageSize: 200,
                    pageIndex:1,
        		}, {
					emulateJSON: true
				}).then(function(res) {
					if(res.body.code == 200){
						Vue.set(_this.consultList[_this.consultList.indexOf(item)], "suggestion", res.body.rows); 					
					}
				}).then(function(){
					_this.setParentIframe();
				});
        	},
        	toggleReply(item){
        		Vue.set(item, "openFlag", !item.openFlag); //全局注册变量
        		if(item.openFlag){
        			Vue.set(item, "suggestion", []); //全局注册变量
        			Vue.set(item, "replyContent", ""); //全局注册变量
        			this.getSuggestion(item);
        		}
        	},
        	replySub(item){
        		var _this = this;
        		if(item.replyContent == ""){
        			layer.msg("回复内容不能为空!");
        			return false;
        		}
        		this.$http.post(SERVERROOTDATA+"api/student/app/Student.ashx?action=saveSuggestionResponse", {
        			suggestionId:item.suggestionId,
        			content:item.replyContent
        		}, {
					emulateJSON: true
				}).then(function(res) {
					if(res.body.code == 200){
						layer.msg(res.body.message);
						Vue.set(_this.consultList[_this.consultList.indexOf(item)], "replyContent", ""); 
						_this.getSuggestion(item);
					}else{
						layer.msg(res.body.message);		
					}
				}).then(function(){
					_this.setParentIframe();
				});
        	},
        	setParentIframe(){
            	setTimeout(function(){
            		window.parent.window.setIframeHeight($("#jStudentIframe")[0]);
            	},200);
            },
        	
        }
    });
}

homeSchoolApp();