require('../../css/teacherqzone/teacherqzone.less');

var teacherId = $(this).getUrlParam("teacherId");
new Vue({
    el: "#teacherActivity",
    data: {
        // 筛选条件
        current: 1, //当前页
        showItem: 6,
        allpage: 0,
        allCount:0,
        courseArr:[],
        nodata:false
    },
    filters: {
        addRootFile: function addRootFile(img) {
            return SERVERROOTFILE + img;
        },
        addActivity:function (id) {
            return "tdetails.html?activityId=" + id;
        },
        timeType: function timeType(time) {
            if(time!=''||time!=undefined||time!='undefined'){
                var date = time.split(":");
                return parseInt(date[0])+"小时" + parseInt(date[1]) + "分钟" + parseInt(date[2]) + "秒";
            }
        }
    },
    mounted: function() {
        var _this = this;
        this.$nextTick(function() {
            this.getActivity(this.current);
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
        getActivity:function (pageIndex) {
            var _this = this;
            this.$http.post(SERVERROOTDATA + "/website/ashx/site/Activity.ashx?action=getTeachingResultList", {
                teacherId:teacherId,
                pageIndex:pageIndex,
                pageSize:6
            }, {
                emulateJSON: true
            }).then(function(res) {
                if(res.body.code==200){
                    if(res.body.rows.length<1){
                        _this.nodata=true;
                    }else{
                        _this.nodata=false;
                    }
                    _this.courseArr=res.body.rows;
                    _this.allCount=res.body.totalCount;
                    _this.allpage=res.body.totalPageCount;
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
            this.getActivity(this.current);
        }
    }
});