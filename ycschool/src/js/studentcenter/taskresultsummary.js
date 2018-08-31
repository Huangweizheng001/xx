require('../../css/teachercenter/teachercenter.less');

function resultSummary() {
    var paperId=$(this).getUrlParam("paperId");
    new Vue({
        el:"#resultsummary",
        data:{
            questionList:[],
            taskName:'',
            sumValue:''
        },
        filters: {
            addRootFile: function addRootFile(img) {
                return SERVERROOTFILE + 'uploads/image/' + img;
            },
            getColor:function getColor(result,type) {
                if(type>3){
                    return 'subjectiveColor'
                }else{
                    if(result==1){
                        return 'rightColor';
                    }else{
                        return 'errorColor';
                    }
                }
            }
        },
        mounted:function () {
            var _this=this;
            this.$nextTick(function () {
                _this.getResultSummary();
            })
        },
        methods: {
            getResultSummary:function () {
                var _this=this;
                var index = layer.load(1, {
                    shade: [0.1,'#fff'] //0.1透明度的白色背景
                });
                this.$http.post(SERVERROOTDATA + "api/student/site/Paper.ashx?action=GetPaperResultSummary",
                    {
                        paperId:paperId
                    }
                    , {emulateJSON: true})
                    .then(function (res) {
                        layer.close(index);
                        if(res.body.code==200){
                            _this.questionList = res.body.rows.typeQuestionResult;
                            _this.taskName=res.body.rows.paperTitle;
                            _this.sumValue=res.body.rows.sumValue;
                        }
                    }).then(function () {
                    $('.feresultsummary').on('click','.feoperation a',function () {
                        window.location.href = 'taskresultdetail.html?paperId='+paperId;
                    })
                })
            }
        }
    });
}

resultSummary();