require('../../css/teachercenter/teachercenter.less');
if(!checkInIframe()){
    window.location.href ="./teachercenter.html";
}
new Vue({
    el: "#teachercenterscore",
    data: {
        classes:[],
        classId:'',
        list:[]
    },
    filters: {
        addRootFile: function addRootFile(img) {
            return SERVERROOTFILE + img;
        }
    },
    mounted: function () {
        var _this = this;
        this.$nextTick(function () {
            _this.init();
            _this.getScoreList();
        })
    },
    methods: {
        init:function () {
            // 获取班级列表
            var _this = this;
            this.$http.post(SERVERROOTDATA + "api/teacher/site/common.ashx?action=GetMyClassList",
                {
                }
                , { emulateJSON: true })
                .then(function (res) {
                    if (res.body.code==200) {
                        _this.classes = res.body.rows;
                        if(res.body.rows.length>0){
                            _this.classId = res.body.rows[0].classId;
                        }
                    }
                })
        },
        getScoreList: function () {
            var _this = this;
            this.$http.post(SERVERROOTDATA + "api/teacher/site/exam.ashx?action=examList",
                {
                }
                , { emulateJSON: true })
                .then(function (res) {
                    if (res.body.code==200) {
                        _this.list = res.body.rows.reverse();
                    }
                }).then(function () {
                $(window.parent.document).find("#jTeacherIframe").css("height",$('.teachercenterscore').height() + 100 +"px");
            })
        },
        goToDetail:function (examId,subjectId,examName) {
            window.location.href = "teachercenterscoredetail.html?examId=" + examId +"&subjectId=" + subjectId + "&classId=" + this.classId + "&examName=" + examName;
        }
    }
});