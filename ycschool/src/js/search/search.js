require("../../css/search/search.less");

var val = $(document).getUrlParam("val"); //默认login , page = reg :注册

var search = function(){
	new Vue({
		el:'#jsearchListApp',
		data:{
			searchArr:[],
			searchType:'',
			searchVal:'',
			current:1,
	        allpage:0,
	        showItem: 9,
	        
		},
		filters: {
	        addRootFile: function(img) {
	            return SERVERROOTFILE + img;
	        },
	        gotoSearch(val){
	    		if(val == "" && !val){
	    			return "javascript:;";
	    		}
	        	return 'search.html?val='+val;
	        },
	        gotoPlayer(cid,vid){
	        	return 'player.html?cid='+cid+'&vid='+vid;
	        },
	        gotoBook(bid){
	        	return 'bookdetails.html?bookId='+bid;
	        },
	        gotoDetail(did){
	        	return 'details.html?activityId='+did;
	        },
	        gotoTDetail(did){
	        	return 'tdetails.html?activityId='+did;
	        },
	        gotoTeacherDetail(tid){
	        	return 'teacherindex.html?teacherId='+tid;
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
	    mounted: function mounted() {
	        this.$nextTick(function() {
	        	this.searchVal = val;
	            this.getSearchList();
	        });
	    },
	    methods:{
	    	getSearchList(){
	    		var _this = this;
	    		this.$http.post(SERVERROOTDATA+"/website/ashx/site/HomePage.ashx?action=seo", {
	    			name:_this.searchVal,
	    			type:_this.searchType,
	    			pageSize: _this.showItem,//一页个数
                    pageIndex:_this.current,//页码
        		}, {
					emulateJSON: true
				}).then(function(res) {
					if(res.body.code == 200){
						_this.searchArr = res.body.rows;
						_this.allpage = res.body.totalPageCount;
					}
				});
	    	},
	    	changeType(type){
	    		this.searchType = type;
	    		this.current = 1;
	    		this.getSearchList();
	    	},
	    	goto(index) {
				//枫叶处理
				if(index == this.current) return;
				if(index > this.allpage) {
					this.current = this.current - 2;
					layer.msg("Sorry ╮(╯_╰)╭ 没有下一页喽！");
					return false;
				}
				this.current = index;
				this.getSearchList();
			},
	    }
	})
}

search();
