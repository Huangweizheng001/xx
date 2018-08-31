require('../../css/teachercenter/teachercenter.less')

function isEmpty(str){
    var reg = /\S+/;
    return reg.test(str);
}
function taskTemplate() {
    var paperId=$(this).getUrlParam("paperId");
    var ycToken=$(window).storager({key: 'ycToken'}).readStorage();
    new Vue({
        el:"#tasktemplate",
        data:{
            questionList:[],
            taskName:'',
            isPicture:'',
            imgArr:[]
        },
        filters: {
            addRootFile: function addRootFile(img) {
                return SERVERROOTFILE + img;
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
                this.$http.post(SERVERROOTDATA + "api/student/site/Paper.ashx?action=GetPaper",
                    {
                        paperId:paperId
                    }
                    , {emulateJSON: true})
                    .then(function (res) {
                        layer.close(index);
                        if(res.body.code==200){
                            _this.questionList = res.body.rows.typeQuestions;
                            _this.taskName=res.body.rows.paperTitle;
                            _this.imgArr=res.body.rows.pictureNameArray;
                            _this.isPicture=res.body.rows.isPicture;
                        }
                    }).then(function () {
                        var p=$('.feanswer-card').height();
                        $('.fetaskTemplate').css('marginBottom',p);
                        var w=$('.fetaskTemplate').width();
                        $('.feanswer-card').css('width',w);
                        $(window.parent.document).find("#jTeacherIframe").css("height",$('.fetaskTemplate').height() +p +50 +"px");
                        if(_this.isPicture==true){
                            setTimeout(function () {
                                $(window.parent.document).find("#jTeacherIframe").css("height",$('.fetaskTemplate').height() +p +50 +"px");
                            },300)
                        }
                }).then(function () {
                    $('.fetaskTemplate').on('click','img',function () {
                        showPhoto($(this));
                    })
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
                // 选择题
                $('.fetaskTemplate').on('click','.single-choice .febox .fe-items .i-select',function () {
                    $(this).siblings().removeClass('active');
                    $(this).addClass('active');
                    var text=$(this).find('b').html();
                    // console.log(text);
                    $(this).parent().parent().find('input.studentAnswer').val(text);
                    var id=$(this).parent().parent().data('id');
                    var source=$(this).parent().parent().data('source');
                    if(isEmpty(text)){
                        $('.w'+ id +'-'+ source).addClass('active');
                    }else{
                        $('.w'+ id +'-'+ source).removeClass('active');
                    }
                });
                // 多选题
                $('.fetaskTemplate').on('click','.multiple-choice .febox .fe-items .i-select',function () {
                    if($(this).hasClass('active')){
                        $(this).removeClass('active');
                    }else{
                        $(this).addClass('active');
                    }
                    var list=$(this).parent().find('.active');
                    var text='';
                    for(var i=0;i<list.length;i++){
                        text += $(list[i]).find('b').html();
                        if(i<list.length-1){
                            text += '、';
                        }
                    }
                    // console.log(text);
                    $(this).parent().parent().find('input.studentAnswer').val(text);
                    var id=$(this).parent().parent().data('id');
                    var source=$(this).parent().parent().data('source');
                    if(isEmpty(text)){
                        $('.w'+ id +'-'+ source).addClass('active');
                    }else{
                        $('.w'+ id +'-'+ source).removeClass('active');
                    }
                });
                // 判断题
                $('.fetaskTemplate').on('click','.judge .febox .fe-items .i-select',function () {
                    $(this).siblings().removeClass('active');
                    $(this).addClass('active');
                    var text=$(this).find('b').html();
                    // console.log(text);
                    $(this).parent().parent().find('input.studentAnswer').val(text);
                    var id=$(this).parent().parent().data('id');
                    var source=$(this).parent().parent().data('source');
                    if(isEmpty(text)){
                        $('.w'+ id +'-'+ source).addClass('active');
                    }else{
                        $('.w'+ id +'-'+ source).removeClass('active');
                    }
                });
                // 问答题
                $('.fetaskTemplate').on('keyup','.question-answer .febox .fe-items textarea',function () {
                    var text=$(this).val();
                    // console.log(text);
                    $(this).parent().parent().parent().find('input.studentAnswer').val(text);
                    var id=$(this).parent().parent().parent().data('id');
                    var source=$(this).parent().parent().parent().data('source');
                    if(isEmpty(text)){
                        $('.w'+ id +'-'+ source).addClass('active');
                    }else{
                        $('.w'+ id +'-'+ source).removeClass('active');
                    }
                });
                // 填空题
                $('.fetaskTemplate').on('keyup','.completion .febox .fe-stems input',function () {
                    var inputs=$(this).parent().parent().find('input');
                    var text='';
                    var n=0;
                    for(var i=0;i<inputs.length;i++){
                        text += $(inputs[i]).val();
                        if(i<inputs.length-1){
                            text += '_';
                        }
                        if(!isEmpty($(inputs[i]).val())){
                            n++;
                        }
                    }
                    // console.log(text);
                    $(this).parent().parent().parent().find('input.studentAnswer').val(text);
                    var id=$(this).parent().parent().parent().data('id');
                    var source=$(this).parent().parent().parent().data('source');
                    // console.log(n);
                    if(n>0){
                        $('.w'+ id +'-'+ source).removeClass('active');
                    }else{
                        $('.w'+ id +'-'+ source).addClass('active');
                    }
                });
            }
        }
    });
}

taskTemplate();

function answerObj(id,type,answer) {
    this.questionid=id;
    this.source=type;
    this.answer=answer;
}