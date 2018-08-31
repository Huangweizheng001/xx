require('../../css/teacherqzone/teacherqzone.less');
require('../../css/culturalcommunity/culturalcommunity.less');

new Vue({
    el: "#teacherlist",
    data: {
        // 筛选条件
        current: 1, //当前页
        gradeArr:[],
        subjectArr:[],
        teacherList:[],
        courseArr:[],
        activityArr:[],

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
        addTeacherRoot:function addTeacherRoot(id) {
            return 'teacherindex.html?teacherId='+ id;
        },
        addActivity:function addActivity(id) {
            return "tdetails.html?activityId=" +id;
        },
        goToplay:function (cid,vid) {
            return "player.html?cid=" +cid +"&vid=" +vid;
        }
    },
    mounted: function() {
        var _this = this;
        this.$nextTick(function() {
            _this.getGrade();
            _this.getSubject();
            _this.getTeacherList(_this.current,_this.gradeId,_this.subjectId);
            _this.getCourse();
            _this.getActivity();
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
        getTeacherList:function (pageIndex,gradeId,subjectId) {
            var _this=this;
            this.$http.post(SERVERROOTDATA + "/website/ashx/site/Teacher.ashx?action=getWellKnownTeacher", {
                gradeId:gradeId,
                subjectId:subjectId,
                pageIndex: pageIndex,
                pageSize:10
            }, {
                emulateJSON: true
            }).then(function(res) {
                if(res.body.code==200){
                    if(res.body.rows.length<1){
                        _this.nodata=true;
                    }else {
                        _this.nodata=false;
                    }
                    _this.teacherList = res.body.rows;
                    _this.allpage = res.body.totalPageCount;
                }
            })
        },
        getGrade:function () {
            var _this=this;
            this.$http.post(SERVERROOTDATA + "/website/ashx/site/Subject.ashx?action=getGrade", {
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
            this.$http.post(SERVERROOTDATA + "/website/ashx/site/Subject.ashx?action=getSubject", {
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
        getCourse:function () {
            var _this=this;
            this.$http.post(SERVERROOTDATA + "/website/ashx/site/Teacher.ashx?action=getQualityCourse", {
                pageIndex: 1,
                pageSize:2
            }, {
                emulateJSON: true
            }).then(function(res) {
                if(res.body.code==200){
                    _this.courseArr = res.body.rows;
                }
            }).then(function () {
                _this.courseArr.forEach(function(item, index) {
                    Vue.set(item, "teacherIconPath", SERVERROOTFILE + item.teacherIconPath); //注册变量
                });
            })
        },
        getActivity:function () {
            var _this=this;
            this.$http.post(SERVERROOTDATA + "/website/ashx/site/Activity.ashx?action=getTeachingResultList", {
                pageIndex: 1,
                pageSize:2
            }, {
                emulateJSON: true
            }).then(function(res) {
                if(res.body.code==200){
                    _this.activityArr = res.body.rows;
                }
            })
        },
        clickByGrade:function (id,e) {
            this.gradeId=id;
            this.current=1;
            $(e.target).siblings().removeClass('active');
            $(e.target).addClass('active');
            this.getTeacherList(this.current,this.gradeId,this.subjectId);
        },
        clickBySubject:function (id,e) {
            this.subjectId=id;
            this.current=1;
            $(e.target).siblings().removeClass('active');
            $(e.target).addClass('active');
            this.getTeacherList(this.current,this.gradeId,this.subjectId);
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
            this.getTeacherList(this.current,this.gradeId,this.subjectId);
        }
    }
});