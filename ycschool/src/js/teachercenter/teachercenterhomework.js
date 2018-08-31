require('../../css/teachercenter/teachercenter.less');

if(!checkInIframe()){
    window.location.href ="./teachercenter.html";
}
// $(window.parent.document).find("#jTeacherIframe").css("height",$('.teacherCenterHomework').height() +135 +"px");
//作业
new Vue({
    el: "#homework",
    data: {
        homework: [],
        classArray: [],
        Couarray:[],
        showItem: 4,//页码显示条数
        allpage: '',//总页数
        current: 1,//当前页
        subjectName: '',
        className: '0',
        arrangeTime: '4'
    },
    filters: {
        addRootFile: function addRootFile(img) {
            return SERVERROOTFILE + img;
        },
        lookpaper: function lookpaper(id) {
            return "tasktemplate.html?paperId=" + id;
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
            _this.gethomework(1, _this.className, _this.arrangeTime);
            _this.bindSearch();
        })
    },
    methods: {
        bindCompleteease:function (id,classId) {
            layer.open({
                type: 2,
                // title: '',
                //closeBtn: 0, //不显示关闭按钮
                shadeClose: false,
                shade: [0.5, '#000'],
                area: ['800px', '550px'],
                //offset: 'rb', //右下角弹出
                //time: 2000, //2秒后自动关闭
                anim: 2,
                content: 'completesituation.html?id=' + id + "&classId=" + classId
            });
        },
        gethomework: function (pageIndex, className, arrangeTime) {
            var _this = this;
            this.$http.post(SERVERROOTDATA + "api/teacher/site/homework.ashx?action=getTeacherSetWork",
                {
                    classId: className,
                    arrangeTime: arrangeTime,
                    pageIndex: pageIndex,
                    pageSize: 8
                }
                , { emulateJSON: true })
                .then(function (res) {
                    if (res.body.code==200) {
                        _this.homework = res.body.rows.reverse();
                        _this.allpage = res.body.totalPageCount;
                    }
                }).then(function () {
                $(window.parent.document).find("#jTeacherIframe").css("height",$('.teacherCenterHomework').height() +135 +"px");
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
            _this.gethomework(_this.current, _this.className, _this.arrangeTime);
        },
        bindSearch: function bindSearch() {
            var _this = this;
            this.$http.post(SERVERROOTDATA + "api/teacher/site/homework.ashx?action=getTeacherClass",
                {
                }
                , { emulateJSON: true }).then(function (res) {
                if (res.body.code==200) {
                    _this.classArray = res.body.rows;
                }
            }).then(function () {
                var _this = this;
                $('#homework .selectBox').on('change', '#classes', function () {
                    _this.className = $(this).val();
                    _this.current = 1;
                    _this.gethomework(_this.current, _this.className, _this.arrangeTime);
                });
            })

            $('#homework .selectBox').on('change', '#time', function () {
                _this.arrangeTime = $(this).val();
                _this.current = 1;
                _this.gethomework(_this.current, _this.className, _this.arrangeTime);
            });
        },
        paperWork:function () {
            parent.layer.open({
                type: 2,
                title: '布置作业',
                //closeBtn: 0, //不显示关闭按钮
                shadeClose: false,
                shade: [0.5, '#000'],
                area: ['880px', '640px'],
                //offset: 'rb', //右下角弹出
                //time: 2000, //2秒后自动关闭
                anim: 2,
                content: 'arrangetaskPop.html'
            });
        },
        batchQuestion:function () {
            window.open('batchimportquestion.html');
        },
        photoWork:function () {
            parent.layer.open({
                type: 2,
                title: '图片作业',
                //closeBtn: 0, //不显示关闭按钮
                shadeClose: false,
                shade: [0.5, '#000'],
                area: ['880px', '640px'],
                //offset: 'rb', //右下角弹出
                //time: 2000, //2秒后自动关闭
                anim: 2,
                content: 'phototaskPop.html'
            });
        }
    }
});