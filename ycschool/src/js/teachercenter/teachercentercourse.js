require("../../css/teachercenter/teachercenter.less");

if(!checkInIframe()){
    window.location.href ="./teachercenter.html";
}
// 课程
new Vue({
    el: "#teacherCenterCourse",
    data: {
        courseArr:[],
        showItem: 4,//页码显示条数
        allpage: 0,//总页数
        current: 1,//当前页
        nodata:false
    },
    filters: {
        addRootFile: function addRootFile(img) {
            return SERVERROOTFILE + img;
        }
    },
    computed: {
        pages: function () {
            var pag = [];
            if (this.current < this.showItem) { //如果当前的激活的项 小于要显示的条数
                //总页数和要显示的条数那个大就显示多少条
                var i = Math.min(this.showItem, this.allpage);
                while (i) {
                    pag.unshift(i--);
                }
            } else { //当前页数大于显示页数了
                var middle = this.current - Math.floor(this.showItem / 2), //从哪里开始
                    i = this.showItem;
                if (middle > (this.allpage - this.showItem)) {
                    middle = (this.allpage - this.showItem) + 1
                }
                while (i--) {
                    pag.push(middle++);
                }
            }
            return pag
        }
    },
    mounted: function () {
        var _this = this;
        this.$nextTick(function () {
            _this.getCourse(_this.current);
        })
    },
    methods: {
        getCourse: function (pageIndex) {
            var _this = this;
            this.$http.post(SERVERROOTDATA + "api/teacher/site/course.ashx?action=courseList",
                {
                    pageIndex: pageIndex,
                    pageSize: 4
                }
                , { emulateJSON: true })
                .then(function (res) {
                    if (res.body.code==200) {
                        if(res.body.rows.length<1){
                            _this.nodata=true;
                        }else{
                            _this.nodata=false;
                            _this.courseArr = res.body.rows.reverse();
                        }

                        _this.allpage = res.body.totalPageCount;
                    }
                }).then(function () {
                _this.courseArr.forEach(function(item, index) {
                    Vue.set(item, "teacherIcon", SERVERROOTFILE + item.teacherIcon); //注册变量
                });
                $(window.parent.document).find("#jTeacherIframe").css("height",$('.teacherCenterCourse').height()+135 +"px");
            })
        },
        edit:function (id) {
            window.location.href="uploadcourse.html?tag=update&courseId=" + id;
        },
        deleteCourse:function (id) {
            var _this = this;
            this.$http.post(SERVERROOTDATA + "api/teacher/site/course.ashx?action=saveCourse",
                {
                    tag: 'delete',
                    courseId: id
                }
                , { emulateJSON: true })
                .then(function (res) {
                    if (res.body.code==200) {
                        layer.msg('删除成功');
                        setTimeout(function () {
                            _this.getCourse(_this.current);
                        },1000);
                    }
                })
        },
        goto: function (index) { //枫叶处理
            var _this = this;
            if (index == this.current) return;
            if (index > this.allpage) {
                this.current = this.current - 2;
                layer.msg("Sorry ╮(╯_╰)╭ 没有下一页喽！");
                return false;
            }
            this.current = index;
            _this.getCourse(_this.current);
        }
    }
});