require('../../css/teachercenter/teachercenter.less');
var ycToken=$(window).storager({key: 'ycToken'}).readStorage();
function isEmpty(str){
    var reg = /\S+/;
    return reg.test(str);
}
new Vue({
    el: "#photoTask",
    data: {
        classArray: [],
        gradeArr:[],
        termArr:[],
        subjectArr:[],
        outlineArr:[],
        courseArr:[],
        courseId:'',
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
            //配置需要引入jq 1.7.2版本以上
            //服务器端成功返回 {state:1,path:文件保存路径}
            //服务器端失败返回 {state:0,errmsg:错误原因}
            //默认做了文件名不能含有中文,后端接收文件的变量名为file

            $(".fe-arrangetask-pop #classes .classWrapper").on('click', "div", function () {
                if ($(this).hasClass("active")) {
                    $(this).removeClass("active");
                }
                else {
                    $(this).addClass("active");
                }
            })
            $("#zwb_upload").bindUpload({
                url: "http://zz.fetv.cn/YcE/ashx/upload/UploadFile.ashx?action=formDataUploadNew",//上传服务器地址
                callbackPath: "",//绑定上传成功后 图片地址的保存容器的id或者class 必须为input或者textarea等可以使用$(..).val()设置之的表单元素
                // ps:值返回上传成功的 默认id为#callbackPath  保存容器为位置不限制,id需要加上#号,class需要加上.
                // 返回格式为:
                // 原来的文件名,服务端保存的路径|原来的文件名,服务端保存的路径|原来的文件名,服务端保存的路径|原来的文件名,服务端保存的路径....
                num: 8,//上传数量的限制 默认为空 无限制
                type: "jpg|png|gif|svg",//上传文件类型 默认为空 无限制
                size: 3,//上传文件大小的限制,默认为5单位默认为mb
            });

            parent.ECalendarisOpen1($("#endTime"));
            $('.fe-arrangetask-pop').on('click', '.fe-save button', function () {
                if ($("#paperName").val() == "") {
                    layer.msg("作业名称不能为空");
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
                if (!isEmpty(photoArray))
                {
                    layer.msg("请添加图片");
                    return;
                }
                var index = layer.load(1, {
                    shade: [0.1, '#fff'] //0.1透明度的白色背景
                });
                $.ajax({
                    async: false,
                    type: "post",
                    url: SERVERROOTDATA + "api/teacher/site/homework.ashx?action=homeworkSave",
                    data: { ycToken: ycToken ,photoArray: photoArray,paperType:"1", classify: "2", name: $("#paperName").val(), classId: classstr, courseId: _this.courseId, endDate: $("#endTime").val(), saveTag: "add" }, //提交表单，vistor.ashx?ID=XXX
                    success: function (msg) {
                        layer.close(index);
                        if (res.body.code == 200) {
                            parent.layer.closeAll();
                            parent.location.reload();
                        }
                        else {
                            layer.msg("布置失败");
                        }
                    } //操作成功后的操作！msg是后台传过来的值
                    , error: function (ex) {
                        alert(ex);
                    }
                });
                photoArray = "";
            });
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
                    _this.getCourse(_this.syllabusId);
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
                    _this.getCourse(_this.syllabusId);
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
                _this.getCourse(_this.syllabusId);
            });
        },
        getCourse:function (syllabusId) {
            var _this = this;
            _this.$http.post(SERVERROOTDATA + "api/teacher/site/homework.ashx?action=getTeacherCourse",
                {
                    syllabusId:syllabusId
                }
                ,{emulateJSON: true})
                .then(function (res) {
                    if(res.body.code==200){
                        _this.courseArr = res.body.rows;
                    }
                })
        }
    }
});