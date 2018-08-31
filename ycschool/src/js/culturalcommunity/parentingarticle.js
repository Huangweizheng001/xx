require('../../css/culturalcommunity/culturalcommunity.less');

// 育儿文章
new Vue({
    el: "#parentingarticle",
    data: {
        current: 1, //当前页
        showItem: 6,
        allpage: 0,
        articles:[],
        hotArts:[],
        nodata:false
    },
    filters: {
        addRootFile: function addRootFile(img) {
            return SERVERROOTFILE + img;
        },
        addRoot:function addRoot(id) {
            return "details.html?activityId=" + id;
        }
    },
    mounted: function() {
        var _this = this;
        this.$nextTick(function() {
            _this.getArticle(_this.current);
            _this.getHotArticle();
        })
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
    methods: {
        getArticle:function (pageIndex) {
            var _this=this;
            this.$http.post(SERVERROOTDATA + "website/ashx/site/KnowledgePay.ashx?action=getHotArticleList", {
                pageIndex: pageIndex,
                pageSize: 4
            }, {
                emulateJSON: true
            }).then(function(res) {
                if(res.body.code==200){
                    _this.articles=res.body.rows;
                    _this.allpage = res.body.totalPageCount;
                    if(res.body.rows.length<1){
                        _this.nodata=true;
                    }else{
                        _this.nodata=false;
                    }
                }
            })
        },
        getHotArticle:function () {
            var _this=this;
            this.$http.post(SERVERROOTDATA + "website/ashx/site/KnowledgePay.ashx?action=getHotArticleList", {
                pageIndex: 1,
                pageSize: 5
            }, {
                emulateJSON: true
            }).then(function(res) {
                if(res.body.code==200){
                    _this.hotArts=res.body.rows;
                }
            })
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
            _this.getArticle(_this.current);
        }
    }
});