require('../../css/teachercenter/teachercenter.less');

// 作业解析
function taskResultDetail() {
    var paperId=$(this).getUrlParam("paperId");
    new Vue({
        el:"#taskresultdetail",
        data:{
            questionList:[],
            taskName:'',
            isPicture:'',
            imgArr:[]
        },
        filters: {
            addRootFile: function addRootFile(img) {
                return SERVERROOTFILE + 'uploads/image/' + img;
            },
            isActive:function isActive(m,answer) {
                if(answer.indexOf(m)!=-1){
                    return 'active';
                }
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
            },
            getStyle:function getStyle(type) {
                switch (type){
                    case 1:
                        return 'single-choice';
                        break;
                    case 2:
                        return 'multiple-choice';
                        break;
                    case 3:
                        return 'judge';
                        break;
                    case 4:
                        return 'question-answer';
                        break;
                    case 5:
                        return 'completion';
                        break;
                }
            },
            tostring:function tostring(i) {
                switch (i){
                    case 1:
                        return 'A';
                        break;
                    case 2:
                        return 'B';
                        break;
                    case 3:
                        return 'C';
                        break;
                    case 4:
                        return 'D';
                        break;
                }
            },
            toChinese:function toChinese(i) {
                switch (i){
                    case 1:
                        return '一';
                        break;
                    case 2:
                        return '二';
                        break;
                    case 3:
                        return '三';
                        break;
                    case 4:
                        return '四';
                        break;
                    case 5:
                        return '五';
                        break;
                    case 6:
                        return '六';
                        break;
                    case 7:
                        return '七';
                        break;
                }
            }
        },
        mounted:function () {
            var _this=this;
            this.$nextTick(function () {
                _this.getQuestionList();
                _this.bindChoice();
            })
        },
        methods: {
            getQuestionList:function () {
                var _this=this;
                var index = layer.load(1, {
                    shade: [0.1,'#fff'] //0.1透明度的白色背景
                });
                this.$http.post(SERVERROOTDATA + "api/student/site/Paper.ashx?action=GetPaperResultDetail",
                    {
                        paperId:paperId
                    }
                    , {emulateJSON: true})
                    .then(function (res) {
                        layer.close(index);
                        if(res.body.code==200){
                            _this.questionList = res.body.rows.typeQuestionResultDetail;
                            _this.taskName=res.body.rows.paperTitle;
                        }
                    }).then(function () {
                        var p=$('.feanswer-card').height();
                        $('.fetaskTemplate').css('marginBottom',p);
                        var w=$('.fetaskTemplate').width();
                        $('.feanswer-card').css('width',w);
                        setTimeout(function () {
                            $(window.parent.document).find("#jStudentIframe").css("height",$('.fetaskTemplate').height() +p + 100 +"px");
                        },300)
                })
            },
            // collectQuestion:function (questionid,source) {
            //     var _this=this;
            //     layer.confirm('你确定要收藏该题吗？', {
            //         btn: ['确定','取消'] //按钮
            //     }, function(){
            //         $.ajax({
            //             url: 'http://www.fetv.cn/fe/QuestionsForTeacher/' + "QuestionsInput.ashx?action=AddCollectQuestions",
            //             type: "POST",
            //             data: {studentId:studentId,questionid:questionid,source:source},
            //             success:function (res) {
            //                 var data = JSON.parse(res);
            //                 if(data.code==200){
            //                     layer.msg('收藏成功！', {icon: 1});
            //                 }else{
            //                     layer.msg(data.message, {icon: 1});
            //                 }
            //             }
            //         });
            //     }, function(){
            //
            //     });
            // },
            bindChoice:function () {
                // 答题卡-定位题目
                $('.feanswer-card').on('click','span',function () {
                    var id=$(this).data('id');
                    var source=$(this).data('source');
                    $('body').animate({scrollTop:$('.q'+id+'-'+source).offset().top-200},1000)
                });
                // 控制答题卡显示
                $(window).scroll(function () {
                    if ($(window).scrollTop() >= ($(".fetaskTemplate").height() - $(window).height())|| $(window).scrollTop() >= $(window).height()) {
                        $('.feanswer-card').fadeIn(300);
                    }else{
                        $('.feanswer-card').fadeOut(300);
                    }
                });
            }
        }
    });
}

taskResultDetail();