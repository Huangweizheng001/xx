require("../../css/teachercenter/teachercenter.less");

function isEmpty(str){
    var reg = /\S+/;
    return reg.test(str);
}
new Vue({
    el: "#uploadCourse",
    data: {
        isShow:true,
        gradeArr:[],
        termArr:[],
        subjectArr:[],
        outlineArr:[],
        gradeId:'',
        termId:'',
        subjectId:'',
        syllabusId:'',
        syllabusName:'',
        coursename:'',
        iconPath:'',
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
            // _this.init();
            _this.initOutLine();
            _this.bindOutlineClick();
        })
    },
    methods: {
        init:function () {//根据tag判断 是否是编辑页，还是上传页
            var _this = this;
            var ts = $(this).getUrlParam("tag");
            if(ts == 'update'){
                // console.log('更新');
                _this.$http.post(SERVERROOTDATA + "api/teacher/site/course.ashx?action=showCourseById",
                    {
                        id:$(this).getUrlParam("courseId")
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        if(res.body.code==200){
                            if(res.body.rows.length>0){
                                $('#code').val(res.body.rows[0].code);
                                $('#courseTypeId').val(res.body.rows[0].courseTypeId);
                                _this.gradeId = res.body.rows[0].gradeId;
                                $('.addImage img').attr('src',SERVERROOTFILE + res.body.rows[0].iconPath);
                                _this.iconPath = res.body.rows[0].iconPath;
                                _this.coursename = res.body.rows[0].name;
                                _this.subjectId = res.body.rows[0].subjectId;
                                _this.syllabusId = res.body.rows[0].syllabusId;
                                _this.syllabusName = res.body.rows[0].syllabusName;
                                _this.termId = res.body.rows[0].term;
                                $('#courseVideoId').val(res.body.rows[0].courseVideoId);
                                $('#courseId').val(res.body.rows[0].courseId);
                                // $('#courseTypeId').val(res.body.rows[0].courseTypeId);
                            }
                        }
                    }).then(function () {
                        _this.getOutline(_this.termId,_this.gradeId,_this.subjectId);
                })
            }else{
                // console.log('新增');
            }
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
                                    if($(this).getUrlParam("tag")!='update'){
                                        _this.gradeId = res.body.rows[0].gradeId;
                                    }
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
                                    if($(this).getUrlParam("tag")!='update'){
                                        _this.subjectId = res.body.rows[0].subjectId;
                                    }
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
                                    if($(this).getUrlParam("tag")!='update'){
                                        _this.termId = res.body.rows[0].id;
                                    }

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
                    }).then(function () {
                        _this.init();
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
        },
        addCover:function (e) {
            var _this = this;
            if($(e.target).val().match( /.jpg|.gif|.png|.bmp/i)) {
                var data = new FormData($('#addImg')[0]);
                $.ajax({
                    url: SERVERROOTDATA+"ashx/upload/UploadFile.ashx?action=formDataUploadNew",
                    type: "POST",
                    data: data,
                    processData: false,  // 告诉jQuery不要去处理发送的数据
                    contentType: false,   // 告诉jQuery不要去设置Content-Type请求头
                    success:function (res) {
                        var data = JSON.parse(res);
                        if(data.code==200){
                            var dom = $(e.target).prev();
                            upload(e.target, dom);
                            _this.iconPath = data.iconPath;
                        }else{
                            layer.msg("上传失败");
                        }
                    }
                });
            }else{
                layer.msg("对不起，系统仅支持标准格式的照片，请您调整格式后重新上传，谢谢 !");
            }
        },
        saveFirstStep:function () {//保存基本信息
            var _this = this;
            if(!isEmpty(_this.coursename)){
                layer.msg('课程名称不能为空');
                return;
            }
            if(!isEmpty(_this.iconPath)){
                layer.msg('封面不能为空');
                return;
            }
            if(!isEmpty(_this.syllabusId)){
                layer.msg('请选择目录');
                return;
            }
            var ts = $(this).getUrlParam("tag");
            if(ts == ''|| ts== undefined || ts=='undefined'){
                ts='add'
            }
            _this.$http.post(SERVERROOTDATA + "api/teacher/site/course.ashx?action=saveCourse",
                {
                    courseId:$(this).getUrlParam("courseId"),
                    iconPath:_this.iconPath,
                    gradeId:_this.gradeId,
                    subjectId:_this.subjectId,
                    termId:_this.termId,
                    syllabusId:_this.syllabusId,
                    name:_this.coursename,
                    tag:ts
                }
                ,{emulateJSON: true})
                .then(function (res) {
                    if(res.body.code==200){
                        _this.isShow=false;
                        $('#coverurl').val(_this.iconPath);
                        $('.secondStep').show(300);
                        if($(this).getUrlParam("tag")=='add'){
                            $('#courseId').val(res.body.rows[0].courseId);
                        }

                    }else{
                        layer.msg("保存失败")
                        _this.isShow=true;
                    }
                })
        }
    }
});