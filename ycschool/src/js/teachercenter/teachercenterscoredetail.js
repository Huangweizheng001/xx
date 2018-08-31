require('../../css/teachercenter/teachercenter.less');

var examId = $(this).getUrlParam("examId");
var subjectId = $(this).getUrlParam("subjectId");
var classId = $(this).getUrlParam("classId");
var examName = $(this).getUrlParam("examName");

new Vue({
    el: "#teachercenterscoredetail",
    data: {
        list:[],
        examName:examName
    },
    filters: {
        addRootFile: function addRootFile(img) {
            return SERVERROOTFILE + img;
        }
    },
    mounted: function () {
        var _this = this;
        this.$nextTick(function () {
            _this.getScoreList();
        })
    },
    methods: {
        getScoreList: function () {
            var _this = this;
            this.$http.post(SERVERROOTDATA + "api/teacher/site/exam.ashx?action=scoreList",
                {
                    classId: classId,
                    examId: examId,
                    subjectId:subjectId
                }
                , { emulateJSON: true })
                .then(function (res) {
                    if (res.body.code==200) {
                        _this.list = res.body.rows;
                    }
                }).then(function () {
                $(window.parent.document).find("#jTeacherIframe").css("height",$('.teachercenterscoredetail').height()+100 +"px");
            })
        }
    }
});