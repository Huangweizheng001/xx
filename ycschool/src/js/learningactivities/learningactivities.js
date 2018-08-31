require("../../css/config.less");
require("../../css/learningactivities/learningactivities.css");
/**
 * Created by guoshunhe on 2018/5/9.
 */

function learningList() {

    new Vue({
        el:"#learningActivities",
        data:{
            current:1,
            allpage:0,
            showItem: 6,
            data:{},
            data_Rankings:{},
            data_Recommended:{}
        },
        filters: {
            addRootFile: function addRootFile(img) {
                return SERVERROOTFILE + img;
            },
            gotoDetail: function(aId, typeId) {
				return 'details.html?activityId=' + aId +'&type='+typeId;
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
        mounted:function () {
            this.$nextTick(function() {
                this.qreylearningActivities();
                this.qreylearningRankings();
                this.qreylearningRecommended();
            });

        },
        methods:{
            goto: function(index) { //枫叶处理
            var _this = this;
            if(index == this.current) return;
            if(index > this.allpage) {
                this.current = this.current - 2;
                layer.msg("Sorry ╮(╯_╰)╭ 没有下一页喽！");
                return false;
            }
            _this.current = index;
            _this.qreylearningActivities();
        },
            qreylearningActivities:function () {//学习活动数据
                var _this=this;
                this.$http.post( SERVERROOTDATA +"website/ashx/site/Activity.ashx?action=getStudyActivity", {
                    pageSize: 5,//一页个数
                    pageIndex:_this.current,//页码
                    // pageIndex: pageIndex,
                }, {
                    emulateJSON: true
                }).then(function(res) {
                    if(res.body.code==200){
                        if(res.body.rows.length<1){
                            _this.nodata = true;
                        }else{
                            _this.nodata = false;
                        }
                        _this.data = res.body.rows;
                        _this.allpage=res.body.totalPageCount;
                        _this.pages=res.body.totalPageCount;
                    }
                })
            },
            qreylearningRankings:function(pageindex){//获取热门排行数据
                var _this = this;
                var pageIndex =  pageindex || 1;
                this.$http.post( SERVERROOTDATA +"website/ashx/site/Activity.ashx?action=getStudyActivityRanking", {
                    pageSize: 3,
                    pageIndex: pageIndex,
                }, {
                    emulateJSON: true
                }).then(function(res) {
                    _this.data_Rankings = res.data.rows;
                });
            },
            qreylearningRecommended:function(pageindex){//获取热门推荐数据
                var _this = this;
                var pageIndex =  pageindex || 1;
                this.$http.post( SERVERROOTDATA +"website/ashx/site/Activity.ashx?action=getHottestStudyActivity", {
                    pageSize: 5,
                    pageIndex: pageIndex,
                }, {
                    emulateJSON: true
                }).then(function(res) {
                    _this.data_Recommended = res.data.rows;
                });
            },

        },

    })
}
learningList()