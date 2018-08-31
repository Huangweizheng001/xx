require('../../css/teachercenter/teachercenter.less');

if(!checkInIframe()){
    window.location.href ="./teachercenter.html";
}
$(window.parent.document).find("#jTeacherIframe").css("height",$('.teacherCenterAttendanc').height() +"px");

new Vue({
    el: "#teacherCenterAttendanc",
    data: {
        table:[],
        leaveArr:[],
        showItem: 4,//页码显示条数
        allpage: 0,//总页数
        current: 1,//当前页
    },
    filters: {
        addRootFile: function addRootFile(img) {
            return SERVERROOTFILE + img;
        },
        shiftTime:function shiftTime(num) {
            switch (num){
                case '1':
                    return "第一节";
                    break;
                case '2':
                    return "第二节";
                    break;
                case '3':
                    return "第三节";
                    break;
                case '4':
                    return "第四节";
                    break;
                case '5':
                    return "第五节";
                    break;
                case '6':
                    return "第六节";
                    break;
                case '7':
                    return "第七节";
                    break;
                case '8':
                    return "第八节";
                    break;
            }
        },
        getClass:function getClass(data) {
            return data.split('_')[0];
        },
        getToWhere:function getToWhere(data) {
            var id=data.split('_')[1];
            var type=data.split('_')[2];
            if(type==0||type=='0'){
                return "namingdetail.html?id=" + id;
            }else {
                return "recorddetail.html";
            }
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
            // _this.getOffice(_this.current);
            _this.bindNav();
            _this.getTable();
        })
    },
    methods: {
        bindNav:function () {
            var _this = this;
            $('.teacherCenterAttendanc .title').on('click','span',function () {
                if($(this).hasClass('active')){
                    return;
                }else{
                    $(this).addClass('active');
                    $(this).siblings().removeClass('active');
                    var id = $(this).data('id');
                    if(id==0){
                        $('.namingWrapper').fadeIn();
                        $('.leave').css('display','none');
                        $(window.parent.document).find("#jTeacherIframe").css("height",$('.teacherCenterAttendanc').height() +"px");
                    }else{
                        $('.namingWrapper').css('display','none');
                        $('.leave').fadeIn();
                        _this.getLeave(1);
                    }
                }

            })
        },
        getTable:function () {
            var _this = this;
            this.$http.post(SERVERROOTDATA + "api/teacher/site/schedule.ashx?action=getScheduleList",
                {
                }
                , { emulateJSON: true })
                .then(function (res) {
                    if (res.body.code==200) {
                        _this.table = res.body.rows;
                    }
                }).then(function () {
                $(window.parent.document).find("#jTeacherIframe").css("height",$('.teacherCenterAttendanc').height() +"px");
            })
        },
        getLeave: function (pageIndex) {
            var _this = this;
            _this.$http.post(SERVERROOTDATA + "api/teacher/site/studentLeave.ashx?action=studentLeaveList",
                {
                    pageIndex: pageIndex,
                    pageSize: 4
                }
                , { emulateJSON: true })
                .then(function (res) {
                    if (res.body.code==200) {
                        _this.leaveArr = res.body.rows.reverse();
                        _this.allpage = res.body.totalPageCount;
                    }
                }).then(function () {
                $(window.parent.document).find("#jTeacherIframe").css("height",$('.teacherCenterAttendanc').height()+135 +"px");
            })
        },
        setYes:function (id,e) {
            if($(e.target).hasClass('active')){
                return;
            }
            var _this = this;
            _this.$http.post(SERVERROOTDATA + "api/teacher/site/studentLeave.ashx?action=studentLeaveAudit",
                {
                    state: 1,
                    studentLeaveId: id
                }
                , { emulateJSON: true })
                .then(function (res) {
                    if (res.body.code==200) {
                        layer.msg(res.body.message);
                        // setTimeout(function () {
                            _this.getLeave(_this.current);
                        // },1000)
                    }
                })
        },
        setNo:function (id,e) {
            if($(e.target).hasClass('active')){
                return;
            }
            var _this = this;
            _this.$http.post(SERVERROOTDATA + "api/teacher/site/studentLeave.ashx?action=studentLeaveAudit",
                {
                    state: 0,
                    studentLeaveId: id
                }
                , { emulateJSON: true })
                .then(function (res) {
                    if (res.body.code==200) {
                        layer.msg(res.body.message);
                        // setTimeout(function () {
                            _this.getLeave(_this.current);
                        // },1000)
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
            _this.getLeave(_this.current);
        }
    }
});