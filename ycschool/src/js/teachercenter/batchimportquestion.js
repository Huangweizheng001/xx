require('../../css/teachercenter/teachercenter.less');

new Vue({
    el: "#batchImportQuestion",
    data: {
        checkFlag: false,
        checkContent: '',
        questions: [],
        leftCon: ''
    },
    filters: {
        addRootFile: function addRootFile(img) {
            return SERVERROOTFILE + img;
        },
        getType: function (type) {
            switch (type) {
                case 1:
                    return '选择题';
                    break;
                case 2:
                    return '多选题';
                    break;
                case 3:
                    return '判断题';
                    break;
                case 4:
                    return '问答题';
                    break;
                case 5:
                    return '填空题';
                    break;
            }
        }
    },
    mounted: function () {
        var _this = this;
        this.$nextTick(function () {
            _this.init();
        })
    },
    methods: {
        init: function () {
            var screenH = $(window).height() - 71;
            var _this = this;
            $('.fe-batchimport-question-left .fe-left-con').css('height', screenH);
            $('.fe-batchimport-question-right .fe-right-con').css('height', screenH);

            // 导入文档按钮
            $('.fe-batchimport-question-left').on('click', '.fe-left-nav #word', function () {
                if ($('.fe-word-type').hasClass('active')) {
                    $('.fe-word-type').slideUp(300);
                    $('.fe-word-type').removeClass('active');
                } else {
                    $('.fe-word-type').slideDown(300);
                    $('.fe-word-type').addClass('active');
                }
            });
            $('.fe-batchimport-question-left').on('click', '.fe-word-type  .fe-bottom button', function () {
                $('.fe-word-type').slideUp(300);
                $('.fe-word-type').removeClass('active');
            });
            // 识别
            $('.fe-batchimport-question').on('click', '.feoperation button:first-child', function () {
                var index = layer.load(1, {
                    shade: [0.1, '#fff'] //0.1透明度的白色背景
                });
                _this.$http.post('http://www.fetv.cn/fe/QuestionsForTeacher/' + "QuestionsInput.ashx?action=CheckWord",
                    {

                    }
                    , { emulateJSON: true })
                    .then(function (res) {
                        // console.log(res.body);
                        layer.closeAll();
                        if (res.body.code == 200) {
                            _this.checkFlag = res.body.returnJson.checkFlag;
                            _this.checkContent = res.body.returnJson.checkContent;
                            _this.questions = res.body.returnJson.questions;
                        } else {
                            layer.msg('识别错误，请按格式更改')
                            _this.checkFlag = false;
                            _this.checkContent = res.body.returnJson;
                            _this.questions = [];
                        }
                    }).then(function () {
                    // var imgs=$('.fe-batchimport-question-right .fe-right-con .fe-items span img');
                    // console.log(imgs);
                    // for(var i=0;i<imgs.length;i++){
                    //     var url=$(imgs[i])[0].src;
                    //     console.log('------');
                    //     console.log(url);
                    //     $(imgs[i]).attr('src',url.splice('/%22')[1]);
                    // }
                })
            });
            // 保存
            $('.fe-batchimport-question').on('click', '.feoperation button:last-child', function () {
                var index = layer.load(1, {
                    shade: [0.1, '#fff'] //0.1透明度的白色背景
                });

                _this.$http.post('http://www.fetv.cn/fe/QuestionsForTeacher/' + "QuestionsInput.ashx?action=SaveWord",
                    {
                        //teacherId: uid
                    }
                    , { emulateJSON: true })
                    .then(function (res) {
                        // console.log(res.body);
                        layer.closeAll();
                        if (res.body.code == 200) {
                            layer.msg('导入成功！');
                            $('.fe-batchimport-question-left').css('display', 'none');
                            $('.fe-batchimport-question-right').css('display', 'none');
                            $('.feoperation').css('display', 'none');
                            $('.fe-goback').css('display', 'block');
                        }

                    })
            });
            // 右边筛选
            $('.fe-batchimport-question-right').on('click', '.fe-right-nav span', function () {
                if ($(this).hasClass('active')) {
                    return
                } else {
                    $(this).siblings().removeClass('active');
                    $(this).addClass('active');
                    var id = $(this).data('id');
                    _this.$http.post('http://www.fetv.cn/fe/QuestionsForTeacher/' + 'QuestionsInput.ashx?action=FilterCheckResult',
                        {
                            type: id
                        }
                        , { emulateJSON: true })
                        .then(function (res) {
                            // console.log(res.body)
                            if (res.body.code == 200) {
                                _this.checkFlag = res.body.returnJson.checkFlag;
                                _this.checkContent = res.body.returnJson.checkContent;
                                _this.questions = res.body.returnJson.questions;
                            }
                        })
                }
            })
            // 上传word
            $('.fe-batchimport-question .fe-word-type').on('change', '#upload', function () {
                $('.fe-word-type').removeClass('active');
                $('.fe-word-type').slideUp(300);
                var data = new FormData($('#upload-form')[0]);
                // var uid=$(window).storager({key: 'feUid'}).readStorage();
                // data.append('teacherId',uid);
                var index = layer.load(1, {
                    shade: [0.1, '#fff'] //0.1透明度的白色背景
                });
                $.ajax({
                    url: 'http://www.fetv.cn/fe/QuestionsForTeacher/' + "QuestionsInput.ashx?action=UploadWord",
                    type: "POST",
                    data: data,
                    processData: false,  // 告诉jQuery不要去处理发送的数据
                    contentType: false,   // 告诉jQuery不要去设置Content-Type请求头
                    success: function (res) {
                        layer.closeAll();
                        var result = JSON.parse(res);
                        // console.log(result);
                        if (result.code == 200) {
                            _this.leftCon = result.returnJson;
                        }
                        // console.log(res);
                    }
                });
            })
        }
    }
});