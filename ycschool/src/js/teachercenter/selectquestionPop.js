require('../../css/teachercenter/teachercenter.less')
// 选择题目弹框
function selectQuestionPop() {
    var name = $(this).getUrlParam("paperName");
    var classId = $(this).getUrlParam("classId");
    var syllabusId = $(this).getUrlParam("syllabusId");
    var endTime = $(this).getUrlParam("endTime");
    new Vue({
        el: "#selectQuestion",
        data: {
            // KnowledgeId: "",
            SearchName: "",
            Diffculty: "",
            QuestionType: "",
            courseId:"",
            current: 1,
            questionType: [],
            rightAlready:[],
            questionList:[],
            courseList:[],
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
                _this.getQuestionType();
                _this.getCourseList();
                _this.selectQuestion();
                _this.deleteRightQuestion();
                _this.getQuestionList(_this.SearchName, _this.Diffculty, _this.QuestionType, _this.current);
            })
        },
        methods: {
            init: function () {
                // var index = parent.layer.getFrameIndex(window.name);
                var _this = this;
                // $('.fe-select-question-pop').on('click', '.feoperation button', function () {
                //     // parent[0].$('#hh').click();
                //     // parent[0].$('#hh').text('哈哈');
                //     // parent.layer.close(index);
                // });
                //全选
                $(".fe-select-condition").on("click", ".fe-checkall input", function () {
                    var list = $(".fe-question-bank .fe-item");
                    for (var i = 0 ; i < list.length; i++)
                    {
                        if ($(this).prop("checked") == true) {
                            if ($(list[i]).find("input").prop("checked") == true) {

                            }
                            else {
                                var listInput = $(list[i]).find("input");
                                listInput.prop("checked", true);
                                var Sid = $(list[i]).find("input").data("id");
                                // var Ssource = $(list[i]).find("input").data("source");
                                var Sscore = $(list[i]).find("input").data("score");
                                var Sname = $(list[i]).find("h3").html();
                                $(list[i]).find("span").addClass("active");
                                _this.rightAlready.push(new SelectQuestionObj(Sid, Sname,Sscore));
                            }
                        }
                        else {
                            var listInput = $(list[i]).find("input");
                            listInput.prop("checked", false);
                            var Sid = $(list[i]).find("input").data("id");
                            // var Ssource = $(list[i]).find("input").data("source");
                            $(list[i]).find("span").removeClass("active");
                            SelectQuestionRemove(_this.rightAlready, Sid);
                        }
                    }
                })
                // 分类按钮
                // $('.fe-select-question-pop').on('click', '.fe-classify button', function () {
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
                //         content: 'knowledgepointPop.html?type=2'
                //     })
                // });
                // 子类触发分类筛选方法
                // $('.fe-select-question-pop').on('click', '#hidden-btn1', function () {
                //     var kn = $('#selectName').val();
                //     var ksort = $('#selectSortId').val();
                //     var ksourse = $('#selectSource').val();
                //     _this.KnowledgeId = ksort;
                //     _this.KnowledgeSource = ksourse;
                //     _this.current = 1;
                //     _this.questionList = [];
                //     _this.getQuestionList(_this.KnowledgeSource, _this.KnowledgeId, _this.SearchName, _this.Diffculty, _this.QuestionType, _this.current);
                //     $(".fe-checkall input").prop("checked", "");
                //     // console.log(kn);
                //     $('.fe-classify button').css('display', 'none');
                //     $('.fe-already-mes a').html(kn);
                //     $('.fe-already-mes a').attr('title', kn);
                //     $('.fe-already-mes').css('display', 'inline-block');
                // });
                // $('.fe-select-question-pop').on('click', '.fe-already-mes b', function () {
                //     $('.fe-classify button').css('display', 'inline-block');
                //     $('.fe-already-mes').css('display', 'none');
                //     $('#selectName').val('');
                //     $('#selectSortId').val('');
                //     $('#selectSource').val('');
                //     _this.KnowledgeId = "";
                //     _this.KnowledgeSource = "1";
                //     _this.current = 1;
                //     _this.questionList = [];
                //     _this.getQuestionList(_this.KnowledgeSource, _this.KnowledgeId, _this.SearchName, _this.Diffculty, _this.QuestionType, _this.current);
                //     $(".fe-checkall input").prop("checked", "");
                // });
                // 难度按钮
                $('.fe-select-question-pop').on('click', '.fe-difficulty button', function () {
                    if ($(this).hasClass('active')) {
                        $(this).parent().find('ul').css('display', 'none');
                        $(this).removeClass('active');
                    } else {
                        $(this).addClass('active');
                        $(this).parent().find('ul').css('display', 'block')
                    }
                });
                $('.fe-select-question-pop .fe-difficulty').on('click', 'ul li', function () {
                    var text = $(this).html();
                    _this.Diffculty  = $(this).data('id');
                    $(this).parent().hide();
                    _this.current = 1;
                    _this.questionList = [];
                    _this.getQuestionList(_this.SearchName, _this.Diffculty, _this.QuestionType, _this.current);
                    $(".fe-checkall input").prop("checked", "");
                    $('.fe-already-difficulty').show();
                    $('.fe-already-difficulty a').html(text);
                    $('.fe-difficulty button').hide();
                });
                $('.fe-select-question-pop .fe-difficulty').on('click', '.fe-already-difficulty b', function () {
                    $('.fe-already-difficulty').hide();
                    $('.fe-difficulty button').show();
                    $('.fe-difficulty button').removeClass('active');
                    _this.Diffculty = "";
                    _this.current = 1;
                    _this.questionList = [];
                    _this.getQuestionList(_this.SearchName, _this.Diffculty, _this.QuestionType, _this.current);
                    $(".fe-checkall input").prop("checked", "");
                });
                // 类型按钮
                $('.fe-select-question-pop').on('click', '.fe-type button', function () {
                    if ($(this).hasClass('active')) {
                        $(this).parent().find('ul').css('display', 'none');
                        $(this).removeClass('active');
                    } else {
                        $(this).addClass('active');
                        $(this).parent().find('ul').css('display', 'block')
                    }
                });
                $('.fe-select-question-pop .fe-type').on('click', 'ul li', function () {
                    var text = $(this).html();
                    _this.QuestionType = $(this).data('id');
                    $(this).parent().hide();
                    _this.current = 1;
                    _this.questionList = [];
                    _this.getQuestionList(_this.SearchName, _this.Diffculty, _this.QuestionType, _this.current);
                    $(".fe-checkall input").prop("checked", "");
                    $('.fe-already-type').show();
                    $('.fe-already-type a').html(text);
                    $('.fe-type button').hide();
                });
                $('.fe-select-question-pop .fe-type').on('click', '.fe-already-type b', function () {
                    $('.fe-already-type').hide();
                    $('.fe-type button').show();
                    $('.fe-type button').removeClass('active');
                    _this.QuestionType = "";
                    _this.current = 1;
                    _this.questionList = [];
                    _this.getQuestionList(_this.SearchName, _this.Diffculty, _this.QuestionType, _this.current);
                    $(".fe-checkall input").prop("checked", "");
                });
                // 课程按钮
                $('.fe-select-question-pop').on('click', '.fe-course button', function () {
                    if ($(this).hasClass('active')) {
                        $(this).parent().find('ul').css('display', 'none');
                        $(this).removeClass('active');
                    } else {
                        $(this).addClass('active');
                        $(this).parent().find('ul').css('display', 'block')
                    }
                });
                $('.fe-select-question-pop .fe-course').on('click', 'ul li', function () {
                    var text = $(this).html();
                    _this.courseId = $(this).data('id');
                    $(this).parent().hide();
                    // _this.current = 1;
                    // _this.questionList = [];
                    // _this.getQuestionList(_this.SearchName, _this.Diffculty, _this.QuestionType, _this.current);
                    // $(".fe-checkall input").prop("checked", "");
                    $('.fe-already-course').show();
                    $('.fe-already-course a').html(text);
                    $('.fe-course button').hide();
                });
                $('.fe-select-question-pop .fe-course').on('click', '.fe-already-course b', function () {
                    $('.fe-already-course').hide();
                    $('.fe-course button').show();
                    $('.fe-course button').removeClass('active');
                    _this.courseId = "";
                    // _this.current = 1;
                    // _this.questionList = [];
                    // _this.getQuestionList(_this.SearchName, _this.Diffculty, _this.QuestionType, _this.current);
                    // $(".fe-checkall input").prop("checked", "");
                });



                // 题干名字
                $('.fe-select-question-left').on('keyup', 'p input', function () {
                    var comTitle = $(this).val();
                    _this.current = 1;
                    _this.SearchName = comTitle;
                    _this.questionList = [];
                    _this.getQuestionList(_this.SearchName, _this.Diffculty, _this.QuestionType, _this.current);
                })
                // 重新选择按钮
                $('.fe-select-question-right').on('click', '.fe-select-question-right-top button', function () {
                    _this.rightAlready = [];
                    _this.setLeftgougou();
                });
                // 生成作业按钮
                $('.fe-select-question-pop').on('click', '.feoperation button', function () {
                    var index = layer.load(1, {
                        shade: [0.1, '#fff'] //0.1透明度的白色背景
                    });
                    var str = "";
                    for (var i = 0 ; i < _this.rightAlready.length; i++)
                    {
                        str += _this.rightAlready[i].Id + "," + _this.rightAlready[i].score;
                        if (i != _this.rightAlready.length - 1)
                        {
                            str += "|";
                        }
                    }
                    _this.$http.post(SERVERROOTDATA + "api/teacher/site/homework.ashx?action=homeworkSaveNewForTeacher",
                        {
                            syllabusId:syllabusId,
                            paperName: name,
                            classId: classId,
                            courseId: _this.courseId,
                            endTime: endTime,
                            saveTag: "add",
                            quesitonList:str
                        }
                        , { emulateJSON: true }).then(function (res) {
                            layer.close(index);
                            if (res.body.code == 200) {
                                parent.layer.closeAll();
                                parent.location.reload();
                            }
                            else {
                                layer.msg("布置失败");
                            }
                    })
                })
            },
            setLeftgougou: function () {
                var _this = this;
                var list = $(".fe-question-bank .fe-item");
                for (var i = 0; i < list.length; i++)
                {
                    var id = $(list[i]).find("input").data("id");
                    // var source = $(list[i]).find("input").data("source");
                    if (pipeiList(_this.rightAlready, id)) {
                        $(list[i]).find("span").addClass("active");
                        $(list[i]).find("input").prop("checked",true);
                    }
                    else {
                        $(list[i]).find("span").removeClass("active");
                        $(list[i]).find("input").prop("checked", "");
                    }
                }

                var alLeftList = $(".fe-question-bank .fe-item span.active");
                if (alLeftList.length < 1)
                {
                    $(".fe-checkall input").prop("checked", "");
                }
            },
            deleteRightQuestion: function () {
                var _this = this;
                $(".fe-already-select-question").on("click", ".fe-item i", function (e) {
                    var Sid = e.target.dataset.id;
                    // var Ssource = e.target.dataset.source;
                    SelectQuestionRemove(_this.rightAlready, Sid);
                    _this.setLeftgougou();
                })
            },
            selectQuestion: function () {
                var _this = this;
                $(".fe-question-bank").on("click", ".fe-item", function (e) {
                    e.preventDefault();
                    if ($(this).find("input").prop("checked") == true) {
                        $(this).find("input").prop("checked", false);
                        var Sid = $(this).find("input").data("id");
                        // var Ssource = $(this).find("input").data("source");
                        $(this).find("span").removeClass("active");
                        //alert('1');
                        SelectQuestionRemove(_this.rightAlready, Sid);
                    }
                    else {
                        $(this).find("input").prop("checked", true);
                        var Sid = $(this).find("input").data("id");
                        // var Ssource = $(this).find("input").data("source");
                        var Sscore = $(this).find("input").data("score");
                        var Sname = $(this).find("h3").html();
                        //alert('3');
                        $(this).find("span").addClass("active");
                        _this.rightAlready.push(new SelectQuestionObj(Sid, Sname,Sscore));
                        // console.log(_this.rightAlready);
                    }
                })
                //$(".fe-question-bank").on("click", ".fe-item input", function () {
                //    if ($(this).prop("checked") == true) {
                //        $(this).prop("checked", false);
                //        var Sid = $(this).data("id");
                //        var Ssource = $(this).data("source");
                //        console.log(Sid + "|" + Ssource);
                //        console.log(_this.rightAlready);
                //        alert("2");
                //        SelectQuestionRemove(_this.rightAlready, Ssource, Sid);
                //    }
                //    else {
                //        $(this).prop("checked", true);
                //        var Sid = $(this).data("id");
                //        var Ssource = $(this).data("source");
                //        var Sname = $(this).parent().next("h3").html();
                //        alert('4');
                //        _this.rightAlready.push(new SelectQuestionObj(Sid, Sname, Ssource));
                //    }
                //})
            },
            getQuestionType:function()
            {
                var _this = this;
                this.$http.post(SERVERROOTDATA + "api/teacher/site/homework.ashx?action=getQuestionType",
                    {
                    }
                    , { emulateJSON: true }).then(function (res) {
                    if(res.body.code == 200){
                        _this.questionType = res.body.rows;
                    }
                })
            },
            // 获取课程列表
            getCourseList:function()
            {
                var _this = this;
                this.$http.post(SERVERROOTDATA + "website/ashx/app/LearningWorld.ashx?action=getCourse",
                    {
                        courseTypeId:1,
                        name:'',
                        syllabusId:syllabusId
                    }
                    , { emulateJSON: true }).then(function (res) {
                    if(res.body.code == 200){
                        _this.courseList = res.body.rows;
                    }
                })
            },
            lodingMore:function()
            {
                var _this = this;
                _this.current++;
                _this.getQuestionList(_this.SearchName, _this.Diffculty, _this.QuestionType, _this.current);
            },
            getQuestionList: function (questionName,diff,Qtype,pageIndex)
            {
                var _this = this;
                this.$http.post(SERVERROOTDATA + "api/teacher/site/homework.ashx?action=getQuestionList",
                    {
                        Qtype: Qtype,
                        diff: diff,
                        pageIndex:pageIndex,
                        pageSize:11,
                        syllabusId: syllabusId,
                        questionName: questionName,
                    }
                    , { emulateJSON: true }).then(function (res) {
                    //console.log(res);
                    if (res.body.code==200) {
                        if(res.body.rows.length<1){
                            _this.nodata = true;
                        }else {
                            _this.nodata = false;
                        }
                        _this.questionList = _this.questionList.concat(res.body.rows);
                    }
                }).then(function () {
                    _this.setLeftgougou();
                })
            }
        }
    });
}

selectQuestionPop();
function SelectQuestionObj(Id,name,score) {
    this.Id = Id;
    this.name = name;
    // this.source = source;
    this.score = score;

}
function SelectQuestionRemove(obj, id) {
    var index = -1;
    for (var i = 0; i < obj.length; i++) {
        if (obj[i]["Id"] == id) {
            index = i;
        };
    }
    if (index > -1) {
        obj.splice(index, 1);
    }
    return obj;
}

//匹配
function pipeiList(obj,id)
{
    var flag = false;
    for (var i = 0; i < obj.length; i++) {
        if (obj[i]["Id"] == id) {
            flag = true;
        };
    }
    return flag;
}