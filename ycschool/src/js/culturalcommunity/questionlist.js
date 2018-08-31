require('../../css/culturalcommunity/culturalcommunity.less');

new Vue({
    el: "#questionList",
    data: {
        // 筛选条件
        current: 1, //当前页
        questionList:[],
        gradeArr:[],
        subjectArr:[],
        ranking:[],
        hotQuestion:[],

        // keyword:'',
        gradeId:'',
        subjectId:'',
        showItem: 6,
        allpage: 0,
        nodata:false
    },
    filters: {
        addRootFile: function addRootFile(img) {
            return SERVERROOTFILE + img;
        },
        addRoot:function addRoot(id) {
            return ROOT + "replydetail.html?questionId="+id ;
        }
    },
    mounted: function() {
        var _this = this;
        this.$nextTick(function() {
            _this.getQuestionlist(_this.gradeId,_this.subjectId,_this.current);
            _this.getGrade();
            _this.getSubject();
            _this.getRanking();
            _this.lookPicture();
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
        getQuestionlist:function (gradeId,subjectId,pageIndex) {
            var _this=this;
            this.$http.post(SERVERROOTDATA + "website/ashx/site/knowledgePay.ashx?action=getWaitResponseList", {
                gradeId: gradeId,
                subjectId:subjectId,
                key:'',
                pageIndex: pageIndex,
                pageSize:10
            }, {
                emulateJSON: true
            }).then(function(res) {
                if(res.body.code==200){
                    if(res.body.rows.length<1){
                        _this.nodata = true;
                    }else{
                        _this.nodata = false;
                    }
                    _this.questionList = res.body.rows;
                    _this.allpage=res.body.totalPageCount;
                }
            })
        },
        // keySearch:function () {
        //     this.current=1;
        //     this.getQuestionlist(this.keyword,this.current);
        // },
        lookPicture:function () {
            $('.feknowledgequestionlist .fecontent').on('click','li h2 img',function () {
                showPhoto($(this));
            });
        },
        getGrade:function () {
            var _this=this;
            this.$http.post(SERVERROOTDATA + "website/ashx/site/Subject.ashx?action=getGrade", {
                pageIndex: 1,
                pageSize:999
            }, {
                emulateJSON: true
            }).then(function(res) {
                if(res.body.code==200){
                    _this.gradeArr = res.body.rows;
                }
            })
        },
        getSubject:function () {
            var _this=this;
            this.$http.post(SERVERROOTDATA + "website/ashx/site/Subject.ashx?action=getSubject", {
                pageIndex: 1,
                pageSize:999
            }, {
                emulateJSON: true
            }).then(function(res) {
                if(res.body.code==200){
                    _this.subjectArr = res.body.rows;
                }
            })
        },
        clickByGrade:function (id,e) {
            this.gradeId=id;
            this.current=1;
            $(e.target).siblings().removeClass('active');
            $(e.target).addClass('active');
            this.getQuestionlist(this.gradeId,this.subjectId,this.current);
        },
        clickBySubject:function (id,e) {
            this.subjectId=id;
            this.current=1;
            $(e.target).siblings().removeClass('active');
            $(e.target).addClass('active');
            this.getQuestionlist(this.gradeId,this.subjectId,this.current);
        },
        getRanking:function () {
            var _this=this;
            this.$http.post(SERVERROOTDATA + "website/ashx/site/knowledgePay.ashx?action=getTopQAList", {

            }, {
                emulateJSON: true
            }).then(function(res) {
                if(res.body.code==200){
                    _this.ranking = res.body.rows;
                }
            }).then(function () {
                _this.ranking.forEach(function(item, index) {
                    Vue.set(item, "iconPath", SERVERROOTFILE  + item.iconPath); //注册变量
                });
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
            _this.getQuestionlist(_this.gradeId,_this.subjectId,_this.current);
        }
    }
});
