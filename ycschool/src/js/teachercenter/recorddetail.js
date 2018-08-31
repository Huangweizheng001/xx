require('../../css/teachercenter/teachercenter.less');

new Vue({
    el: "#recorddetail",
    data: {
        list:[]
    },
    filters: {
        addRootFile: function addRootFile(img) {
            return SERVERROOTFILE + img;
        },
        goUpdate:function goUpdate(id) {
            return "namingdetail.html?id=" + id + "&tag=update";
        }
    },
    mounted: function () {
        var _this = this;
        this.$nextTick(function () {
            _this.getList();
        })
    },
    methods: {
        getList: function () {
            var _this = this;
            this.$http.post(SERVERROOTDATA + "api/teacher/site/schedule.ashx?action=attendanceHistory",
                {
                    pageIndex: 1,
                    pageSize: 9999
                }
                , { emulateJSON: true })
                .then(function (res) {
                    if (res.body.code==200) {
                        _this.list = res.body.rows.reverse();
                    }
                }).then(function () {
                $(window.parent.document).find("#jTeacherIframe").css("height",$('.recorddetail').height() + 100 +"px");
            })
        }
    }
});