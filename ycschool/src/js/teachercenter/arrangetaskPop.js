require('../../css/teachercenter/teachercenter.less');
function isEmpty(str){
    var reg = /\S+/;
    return reg.test(str);
}

new Vue({
    el: "#basicTask",
    data: {
        classArray: [],
        gradeArr:[],
        termArr:[],
        subjectArr:[],
        outlineArr:[],
        gradeId:'',
        termId:'',
        subjectId:'',
        syllabusId:'',
        syllabusName:'',
        nodata:false
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
            _this.getClass();
            _this.initOutLine();
            _this.bindOutlineClick();
        })
    },
    methods: {
        init: function () {
            var _this = this;
            parent.ECalendarisOpen1($("#endTime"));
            // $('.fe-arrangetask-pop').on('click', '#random', function () {
            //     $('.fe-random').show()
            // });
            // $('.fe-arrangetask-pop').on('click', '#static', function () {
            //     $('.fe-random').hide()
            // });
            // $('.fe-arrangetask-pop').on('click', '.fe-random button', function () {
            //     parent.layer.open({
            //         type: 2,
            //         title: '知识点大纲',
            //         //closeBtn: 0, //不显示关闭按钮
            //         shadeClose: false,
            //         shade: [0.5, '#000'],
            //         area: ['600px', '400px'],
            //         //offset: 'rb', //右下角弹出
            //         //time: 2000, //2秒后自动关闭
            //         anim: 2,
            //         content: 'knowledgepointPop.html?type=1'
            //     })
            //
            // });
            $(".fe-arrangetask-pop #classes .classWrapper").on('click', "div", function () {
                if ($(this).hasClass("active")) {
                    $(this).removeClass("active");
                }
                else {
                    $(this).addClass("active");
                }
            })
            // 添加题型
            // $('.fe-arrangetask-pop').on('click', '#hidden-btn', function () {
            //     var kn = $('#knowledgeName').val();
            //     var count = "0";
            //     var diff = "1";
            //     var knowledgeId = $('#knowledgeId').val();
            //     var source = $('#knowledgeSource').val();
            //     var selectquestionStr = "";
            //     var questionTypeIdOne = "";
            //     $.ajax({
            //         async: false,
            //         type: "post",
            //         url: "ashx/teacherCenter.ashx",
            //         data: { action: "getNewsQuestionType", knowledgeId: knowledgeId }, //提交表单，vistor.ashx?ID=XXX
            //         success: function (msg) {
            //             if (msg != "") {
            //                 var ob = JSON.parse(msg);
            //                 var num = ob.totalCount;
            //                 //var selObj = $("#chapter");
            //                 //selObj.empty();
            //                 for (var i = 0; i < num; i++) {
            //                     if (i == 0)
            //                     {
            //                         questionTypeIdOne = ob.rows[i].questionTypeId;
            //                     }
            //                     var value = ob.rows[i].questionTypeId;
            //                     var text = Trim(ob.rows[i].name);
            //                     selectquestionStr += "<option value='" + value + "'>" + text + "</option>";
            //
            //                     //selObj.append("<option value='" + value + "'>" + text + "</option>");
            //                 }
            //             }
            //
            //         } //操作成功后的操作！msg是后台传过来的值
            //         , error: function (ex) {
            //             alert(ex);
            //         }
            //     });
            //     $.ajax({
            //         async: false,
            //         type: "post",
            //         url: "ashx/teacherCenter.ashx",
            //         data: { action: "getNewsQuestionNum", knowledgeId: knowledgeId, source: source, questionTypeIdOne: questionTypeIdOne, diff: diff }, //提交表单，vistor.ashx?ID=XXX
            //         success: function (msg) {
            //             if (msg != "") {
            //                 count = msg;
            //             }
            //
            //         } //操作成功后的操作！msg是后台传过来的值
            //         , error: function (ex) {
            //             alert(ex);
            //         }
            //     });
            //     //_this.$http.post("ashx/teacherCenter.ashx?action=getNewsQuestionType",
            //     //{
            //     //    knowledgeId: knowledgeId
            //     //}
            //     //, { emulateJSON: true }).then(function (res) {
            //     //    if (res.body != "") {
            //
            //     //    }
            //     //})
            //
            //     // var content = $('<div class="fe-add-new-timu" data-id="' + knowledgeId + '" data-count="' + count + '" data-source="' + source + '"></div>');
            //     // var span = $('<span>' + kn + '</span>');
            //     // var selectQuestion = $('<select class="question">' + selectquestionStr + '</select>');
            //     // selectQuestion.on('change', function () {
            //     //     var _this = this;
            //     //     questionTypeIdOne = $(this).val();
            //     //     $.ajax({
            //     //         type: "post",
            //     //         url: "ashx/teacherCenter.ashx",
            //     //         data: { action: "getNewsQuestionNum", knowledgeId: knowledgeId, source: source, questionTypeIdOne: questionTypeIdOne, diff: diff }, //提交表单，vistor.ashx?ID=XXX
            //     //         success: function (msg) {
            //     //             if (msg != "") {
            //     //                 count = msg;
            //     //                 $(_this).parent().find(".pCount").html(count);
            //     //             }
            //     //
            //     //         } //操作成功后的操作！msg是后台传过来的值
            //     //         , error: function (ex) {
            //     //             alert(ex);
            //     //         }
            //     //     });
            //     // })
            //     // var selectNandu = $('<select class="difficulty"><option value="1">简单</option><option value="2">一般</option><option value="3">困难</option></select>');
            //     // selectNandu.on('change', function () {
            //     //     var _this = this;
            //     //     diff = $(this).val();
            //     //     $.ajax({
            //     //         type: "post",
            //     //         url: "ashx/teacherCenter.ashx",
            //     //         data: { action: "getNewsQuestionNum", knowledgeId: knowledgeId, source: source, questionTypeIdOne: questionTypeIdOne, diff: diff }, //提交表单，vistor.ashx?ID=XXX
            //     //         success: function (msg) {
            //     //             if (msg != "") {
            //     //                 count = msg;
            //     //                 $(_this).parent().find(".pCount").html(count);
            //     //             }
            //     //
            //     //         } //操作成功后的操作！msg是后台传过来的值
            //     //         , error: function (ex) {
            //     //             alert(ex);
            //     //         }
            //     //     });
            //     // })
            //     // var other = $('<div style="display: inline-block">&nbsp;&nbsp;题数: <input type="number" style="width: 80px"> /<span style="width:auto;margin-right:10px;" class="pCount">' + count + ' </span>&nbsp;&nbsp;单题分数: <input type="text" class="fenshu" style="width: 80px"><b class="uk-icon-trash"></b></div>');
            //     // content.append(span);
            //     // content.append(selectQuestion);
            //     // content.append(selectNandu);
            //     // content.append(other);
            //     // $(this).before(content);
            // });
            $('.fe-arrangetask-pop').on('click', '.fe-save button', function () {
                if ($("#paperName").val() == "")
                {
                    layer.msg("请输入作业名称");
                    return;
                }
                var classAry = $("#classes").find(".active");
                if (classAry.length == 0) {
                    layer.msg("请选择班级");
                    return;
                }
                if (!isEmpty(_this.syllabusId))
                {
                    layer.msg("请选择目录");
                    return;
                }
                var classstr = "";
                for (var i = 0 ; i < classAry.length ; i++)
                {
                    classstr += classAry[i].dataset.id;
                    if (i != classAry.length - 1)
                    {
                        classstr += ",";
                    }
                }
                var paperName = $("#paperName").val();
                var endTime = $("#endTime").val();
                parent.layer.closeAll();

                parent.layer.open({
                    type: 2,
                    title: '题库选题',
                    //closeBtn: 0, //不显示关闭按钮
                    shadeClose: false,
                    shade: [0.5, '#000'],
                    area: ['880px', '593px'],
                    //offset: 'rb', //右下角弹出
                    //time: 2000, //2秒后自动关闭
                    anim: 2,
                    content: 'selectquestionPop.html?paperName='+ paperName +'&classId='+classstr + '&syllabusId='+ _this.syllabusId +'&endTime='+endTime
                })
                // console.log(paperName + "," + classstr + "," + _this.syllabusId  + "," + endTime);
                // if ($("#static").prop("checked") == true) {
                //     var name = $("#paperName").val();
                //     var classId = classstr;
                //     var courseId = $("#teacherCourse").val();
                //     var courseCatalogId = $("#chapter").val();
                //     var endTime = $("#endTime").val();
                //     //console.log(name + "," + classId + "," + courseId + "," + courseCatalogId + "," + endTime);
                //     parent.layer.closeAll();
                //
                //     parent.layer.open({
                //         type: 2,
                //         title: '题库选题',
                //         //closeBtn: 0, //不显示关闭按钮
                //         shadeClose: false,
                //         shade: [0.5, '#000'],
                //         area: ['880px', '593px'],
                //         //offset: 'rb', //右下角弹出
                //         //time: 2000, //2秒后自动关闭
                //         anim: 2,
                //         content: 'selectquestionPop.html?name='+name +'&classId='+classId + '&courseId='+courseId + '&courseCatalogId='+courseCatalogId+'&endTime='+endTime
                //     })
                //     console.log(name + "," + classId + "," + courseId + "," + courseCatalogId + "," + endTime);
                //
                // }
                // else {
                //     var listArray = $(".fe-random .fe-add-new-timu");
                //     if (listArray.length < 1) {
                //         layer.msg("请添加组卷规则");
                //         return;
                //     }
                //     else {
                //         var roleArray = "";
                //         for (var i = 0 ; i < listArray.length; i++)
                //         {
                //             var knowId = listArray[i].dataset.id;
                //             var count = listArray[i].dataset.count;
                //             var kSource = listArray[i].dataset.source;
                //             var typeId = $(listArray[i]).find(".question").val();
                //             var difficultyId = $(listArray[i]).find(".difficulty").val();
                //             var questionCount = $(listArray[i]).find("input:first-child").val();
                //             var score = $(listArray[i]).find(".fenshu").val();
                //             if (parseInt(questionCount) >parseInt(count))
                //             {
                //                 layer.msg("题数大于可选数量");
                //                 return;
                //             }
                //             if (questionCount <= 0)
                //             {
                //                 layer.msg("题数必须大于0");
                //                 return;
                //             }
                //             if (score <= 0) {
                //                 layer.msg("分值必须大于0");
                //                 return;
                //             }
                //             roleArray += knowId + "," + typeId + "," + difficultyId + "," + questionCount + "," + score + "," + kSource;
                //             if (i != listArray.length - 1)
                //             {
                //                 roleArray += "|";
                //             }
                //             //roleArray.push(new obj(knowId, count, typeId, difficultyId, questionCount, score));
                //
                //         }
                //         $.ajax({
                //             async: false,
                //             type: "post",
                //             url: "ashx/teacherCenter.ashx",
                //             data: { action: "homeworkSaveNew", role: roleArray, photoArray: photoArray, paperType: "1", classify: "1", name: $("#paperName").val(), classId: classstr, courseId: $("#teacherCourse").val(), courseCatalogId: $("#chapter").val(), endDate: $("#endTime").val(), saveTag: "add" }, //提交表单，vistor.ashx?ID=XXX
                //             success: function (msg) {
                //                 if (msg != "go_login") {
                //                     if (msg == "200") {
                //
                //                         parent.window.reload();
                //                     }
                //                     else {
                //                         layer.msg("操作错误");
                //                     }
                //                 }
                //             } //操作成功后的操作！msg是后台传过来的值
                //             , error: function (ex) {
                //                 alert(ex);
                //             }
                //         });
                //         //console.log(roleArray);
                //         //function obj(knowId, count, typeId, difficultyId, questionCount, score) {
                //         //    this.knowId = knowId;
                //         //    this.count = count;
                //         //    this.typeId = typeId;
                //         //    this.difficultyId = difficultyId;
                //         //    this.questionCount = questionCount;
                //         //    this.score = score;
                //         //}
                //     }
                // }

            });
            // $('.fe-arrangetask-pop').on('click', '.fe-add-new-timu b', function () {
            //     $(this).parent().parent().remove();
            // })
        },
        getClass: function () {
            var _this = this;
            this.$http.post(SERVERROOTDATA + "api/teacher/site/homework.ashx?action=getTeacherClass",
                {
                }
                , { emulateJSON: true }).then(function (res) {
                if (res.body.code==200) {
                    _this.classArray = res.body.rows;
                }
            })
        },
        initOutLine:function () {
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
                            _this.getOutline(_this.termId,_this.gradeId,_this.subjectId);
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
                            _this.getOutline(_this.termId,_this.gradeId,_this.subjectId);
                        })
                    })
                }),
                new Promise(function(resolve, reject) {
                    // 学期
                    _this.$http.post(SERVERROOTDATA + "api/teacher/site/course.ashx?action=getTerm",
                        {
                        }
                        ,{emulateJSON: true})
                        .then(function (res) {
                            if(res.body.code==200){
                                _this.termArr = res.body.rows;
                                if(res.body.rows.length>0){
                                    _this.termId = res.body.rows[0].id;
                                }
                            }
                            resolve();
                        }).then(function () {
                        $('#term').on('change',function () {
                            _this.termId = $(this).val();
                            _this.getOutline(_this.termId,_this.gradeId,_this.subjectId);
                        })
                    })
                })
            ]).then(function () {
                _this.$http.post(SERVERROOTDATA + "api/teacher/site/course.ashx?action=getNodes",
                    {
                        gradeId:_this.gradeId,
                        subjectId:_this.subjectId,
                        termId:_this.termId
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        if(res.body.code==200){
                            _this.outlineArr = res.body.rows;
                            if(res.body.rows.length<1){
                                _this.nodata=true;
                            }else {
                                _this.nodata=false;
                            }
                        }
                    })
            })
        },
        getOutline:function (termId,gradeId,subjectId) {
            var _this = this;
            _this.$http.post(SERVERROOTDATA + "api/teacher/site/course.ashx?action=getNodes",
                {
                    gradeId:gradeId,
                    subjectId:subjectId,
                    termId:termId
                }
                ,{emulateJSON: true})
                .then(function (res) {
                    if(res.body.code==200){
                        _this.outlineArr = res.body.rows;
                        if(res.body.rows.length<1){
                            _this.nodata=true;
                        }else {
                            _this.nodata=false;
                        }
                    }
                })
        },
        bindOutlineClick:function () {
            var _this = this;
            // 一级大纲
            $('.catalog').on('click','.first>h4',function () {
                if($(this).next('ul').children().length<1){
                    _this.syllabusName = $(this).html();
                    _this.syllabusId = $(this).data('id');
                }else{
                    if($(this).prev('i').hasClass('uk-icon-caret-down')){
                        $(this).prev('i').removeClass();
                        $(this).prev('i').addClass('uk-icon-caret-right');
                        $(this).next('ul').slideUp();
                    }else{
                        $(this).prev('i').removeClass();
                        $(this).prev('i').addClass('uk-icon-caret-down');
                        $(this).next('ul').slideDown();
                    }
                }

            });
            // 二级大纲
            $('.catalog').on('click','.second>li>h4',function () {
                if($(this).next('ul').children().length<1){
                    _this.syllabusName = $(this).html();
                    _this.syllabusId = $(this).data('id');
                }else{
                    if($(this).prev('i').hasClass('uk-icon-caret-down')){
                        $(this).prev('i').removeClass();
                        $(this).prev('i').addClass('uk-icon-caret-right');
                        $(this).next('ul').slideUp();
                    }else{
                        $(this).prev('i').removeClass();
                        $(this).prev('i').addClass('uk-icon-caret-down');
                        $(this).next('ul').slideDown();
                    }
                }

            });
            // 三级大纲
            $('.catalog').on('click','.three h4',function () {
                _this.syllabusName = $(this).html();
                _this.syllabusId = $(this).data('id');
            });
        }
    }
});