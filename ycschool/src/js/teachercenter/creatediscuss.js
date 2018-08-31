require('../../css/teachercenter/teachercenter.less');

function isEmpty(str){
    var reg = /\S+/;
    return reg.test(str);
}
$(window.parent.document).find("#jTeacherIframe").css("height",$('.creatediscuss').height()+300 +"px");

new Vue({
    el: "#creatediscuss",
    data: {
        typeArr:[],
        addressArr:[],
        gradeArr:[],
        subjectArr:[],
        menberArr:[],
        title:'',
        content:'',
        modeId:'',
        gradeId:'',
        subjectId:'',
        boardroomApplyId:''
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
            _this.initSelect();
        })
    },
    methods: {
        init:function () {
            ECalendarisOpen1($("#time"));
            var _this = this;
            _this.$http.post(SERVERROOTDATA + "api/teacher/site/research.ashx?action=modeList",
                {
                }
                ,{emulateJSON: true})
                .then(function (res) {
                    if(res.body.code==200){
                        _this.typeArr = res.body.rows;
                        if(res.body.rows.length>0){
                            _this.modeId = res.body.rows[0].mode;
                        }
                    }
                });
            _this.$http.post(SERVERROOTDATA + "api/teacher/site/research.ashx?action=boardroomApplyList",
                {
                }
                ,{emulateJSON: true})
                .then(function (res) {
                    if(res.body.code==200){
                        _this.addressArr = res.body.rows
                    }
                }).then(function () {
                    $('#address').on('click',function () {
                        if(_this.addressArr.length<1){
                            parent.layer.open({
                                type: 1,
                                area: ['320px', '220px'], //宽高
                                content: '<div class="applyTip"><p>暂未申请会议室，请点击申请按钮，前往申请会议室</p><a onclick="goToapply()">前去申请</a></div>'
                            });
                        }
                    })
            })
        },
        initSelect:function () {
            var _this=this;
            Promise.all([
                new Promise(function(resolve, reject) {
                    // 年级
                    _this.$http.post(SERVERROOTDATA + "api/teacher/site/course.ashx?action=gradeList",
                        {
                        }
                        ,{emulateJSON: true})
                        .then(function (res) {
                            if(res.body.code==200){
                                _this.gradeArr = res.body.rows;
                                if(res.body.rows.length>0){
                                    _this.gradeId = res.body.rows[0].gradeId;
                                }
                            }
                            resolve();
                        }).then(function () {
                        $('#grade').on('change',function () {
                            _this.gradeId = $(this).val();
                            _this.getMenber(_this.gradeId,_this.subjectId);
                        })
                    })
                }),
                new Promise(function(resolve, reject) {
                    // 学科
                    _this.$http.post(SERVERROOTDATA + "api/teacher/site/course.ashx?action=subjectList",
                        {
                        }
                        ,{emulateJSON: true})
                        .then(function (res) {
                            if(res.body.code==200){
                                _this.subjectArr = res.body.rows;
                                if(res.body.rows.length>0){
                                    _this.subjectId = res.body.rows[0].subjectId;
                                }
                            }
                            resolve();
                        }).then(function () {
                        $('#subject').on('change',function () {
                            _this.subjectId = $(this).val();
                            _this.getMenber(_this.gradeId,_this.subjectId);
                        })
                    })
                })
            ]).then(function () {
                _this.$http.post(SERVERROOTDATA + "api/teacher/site/research.ashx?action=showTeacherList",
                    {
                        gradeId:_this.gradeId,
                        subjectId:_this.subjectId
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        if(res.body.code==200){
                            _this.menberArr = res.body.rows;
                        }
                    }).then(function () {
                        $('#teacher').on('click',function () {
                            if($(this).hasClass('active')){
                                $(this).find('ul').slideUp(300);
                                $(this).removeClass('active');
                            }else{
                                $(this).find('ul').slideDown(300);
                                $(this).addClass('active');
                            }
                        });
                        $('#teacher ul').on('click','li',function () {
                            var tId = $(this).val();
                            var tName = $(this).html();
                            var $span=$('<span data-id="'+ tId +'">'+ tName +'<b>×</b></span>');
                            $span.on('click','b',function () {
                               $(this).parent().remove();
                            });
                            $('.menberList').append($span);
                        })
                })
            })
        },
        getMenber:function (gradeId,subjectId) {
            var _this = this;
            _this.$http.post(SERVERROOTDATA + "api/teacher/site/research.ashx?action=showTeacherList",
                {
                    gradeId:gradeId,
                    subjectId:subjectId
                }
                ,{emulateJSON: true})
                .then(function (res) {
                    if(res.body.code==200){
                        _this.menberArr = res.body.rows;
                    }
                })
        },
        saveFirstStep:function () {
            var _this = this;
            if(!isEmpty(_this.title)){
                layer.msg('请填写主题');
                return;
            }
            if(!isEmpty($('#time').val())){
                layer.msg('请填写时间');
                return;
            }
            if(!isEmpty(_this.boardroomApplyId)){
                layer.msg('请选择地点');
                return;
            }
            if(!isEmpty(_this.content)){
                layer.msg('请填写内容');
                return;
            }
            var list = $('.menberList span');
            if(list.length<1){
                layer.msg('请填加成员');
                return;
            }
            var members='';
            for(var i=0; i<list.length;i++){
                var id = list[i].dataset.id;
                if(i == list.length-1){
                    members += id ;
                }else{
                    members += id + ",";
                }
            }
            var index = layer.load(1, {
                shade: [0.1,'#fff'] //0.1透明度的白色背景
            });
            _this.$http.post(SERVERROOTDATA + "api/teacher/site/research.ashx?action=saveResearch",
                {
                    boardroomApplyId:_this.boardroomApplyId,
                    members:members,
                    mode:_this.modeId,
                    researchContent:_this.content,
                    researchId:0,
                    researchTime:$('#time').val(),
                    researchTitle:_this.title,
                    tag:'add'
                }
                ,{emulateJSON: true})
                .then(function (res) {
                    if (res.body.code == 200) {
                        layer.msg("提交成功");
                        setTimeout(function () {
                            window.location.href = "teachercenteractivity.html";
                        }, 1000)
                    } else {
                        layer.close(index);
                        layer.msg("提交失败");
                    }
                })
        }
    }
});