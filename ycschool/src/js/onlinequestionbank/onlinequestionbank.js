require('../../css/onlinequestionbank/onlinequestionbank.less');
require('../../css/culturalcommunity/culturalcommunity.less');
function isEmpty(str){
    var reg = /\S+/;
    return reg.test(str);
}

new Vue({
    el: "#onlinequestionbank",
    data: {
        gradeArr:[],
        termArr:[],
        subjectArr:[],
        outlineArr:[],
        gradeId:'',
        termId:'',
        subjectId:'',
        syllabusId:'',
        syllabusName:'',
        nodata:false,
        questionList:[],
        current:1,
        noQuestion:false,
        showItem: 4,//页码显示条数
        allpage: 0,//总页数
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
        }
    },
    computed: {
        pages: function () {
            var pag = [];
            if (this.current < this.showItem) { //如果当前的激活的项 小于要显示的条数
                //总页数和要显示的条数那个大就显示多少条
                var i = Math.min(this.showItem, this.allpage);
                while (i) {
                    pag.unshift(i--);
                }
            } else { //当前页数大于显示页数了
                var middle = this.current - Math.floor(this.showItem / 2), //从哪里开始
                    i = this.showItem;
                if (middle > (this.allpage - this.showItem)) {
                    middle = (this.allpage - this.showItem) + 1
                }
                while (i--) {
                    pag.push(middle++);
                }
            }
            return pag
        }
    },
    mounted: function () {
        var _this = this;
        this.$nextTick(function () {
            _this.bindChoice();
            _this.initOutLine();
            _this.bindOutlineClick();
            _this.lookAnswer();
        })
    },
    methods: {
        getQuestionList:function (termId,gradeId,subjectId,syllabusId,pageIndex) {
            var _this=this;
            var index = layer.load(1, {
                shade: [0.1,'#fff'] //0.1透明度的白色背景
            });
            this.$http.post(SERVERROOTDATA + "api/student/site/Paper.ashx?action=GetQuestionList",
                {
                    pageIndex:pageIndex,
                    pageSize:10,
                    termId:termId,
                    gradeId:gradeId,
                    subjectId:subjectId,
                    syllabusId:syllabusId
                }
                , {emulateJSON: true})
                .then(function (res) {
                    layer.close(index);
                    if(res.body.code==200){
                        if(res.body.rows.length<1){
                            _this.noQuestion=true;
                        }else {
                            _this.noQuestion=false;
                        }
                        _this.questionList = res.body.rows;
                        _this.allpage = res.body.totalPageCount;
                        // console.log(_this.questionList);
                    }
                }).then(function () {
                $('.fetaskTemplate').on('click','img',function () {
                    showPhoto($(this));
                })
            })
        },
        bindChoice:function () {
            // 选择题
            $('.fetaskTemplate').on('click','.febox.single-choice .fe-items .i-select',function () {
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
            $('.fetaskTemplate').on('click','.febox.multiple-choice .fe-items .i-select',function () {
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
            $('.fetaskTemplate').on('click','.febox.judge .fe-items .i-select',function () {
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
            $('.fetaskTemplate').on('keyup','.febox.question-answer .fe-items textarea',function () {
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
            $('.fetaskTemplate').on('keyup','.febox.completion .fe-stems input',function () {
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
        },
        initOutLine:function () {
            var _this=this;
            Promise.all([
                new Promise(function(resolve, reject) {
                    // 年级
                    _this.$http.post(SERVERROOTDATA + "api/student/site/Paper.ashx?action=GetGradeList",
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
                        $('#grade a:nth-child(2)').addClass('active');
                    })
                }),
                new Promise(function(resolve, reject) {
                    // 学科
                    _this.$http.post(SERVERROOTDATA + "api/student/site/Paper.ashx?action=GetSubjectList",
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
                        $('#subject a:nth-child(2)').addClass('active');
                    })
                }),
                new Promise(function(resolve, reject) {
                    // 学期
                    _this.$http.post(SERVERROOTDATA + "api/student/site/Paper.ashx?action=GetTermList",
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
                        $('#term a:nth-child(2)').addClass('active');
                    })
                })
            ]).then(function () {
                _this.$http.post(SERVERROOTDATA + "api/student/site/Paper.ashx?action=GetSyllabusList",
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
                    _this.getQuestionList(_this.termId,_this.gradeId,_this.subjectId,'',_this.current);
                })
            })
        },
        getOutline:function (termId,gradeId,subjectId) {
            var _this = this;
            _this.$http.post(SERVERROOTDATA + "api/student/site/Paper.ashx?action=GetSyllabusList",
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
                }).then(function () {
                    _this.syllabusId='';
                    _this.current =1;
                    _this.getQuestionList(termId,gradeId,subjectId,_this.syllabusId,_this.current);
            })
        },
        clickBySubject:function (id,e) {
            this.subjectId=id;
            $(e.target).siblings().removeClass('active');
            $(e.target).addClass('active');
            this.getOutline(this.termId,this.gradeId,this.subjectId);
        },
        clickByGrade:function (id,e) {
            this.gradeId=id;
            this.syllabusId='';
            this.current =1;
            $(e.target).siblings().removeClass('active');
            $(e.target).addClass('active');
            this.getOutline(this.termId,this.gradeId,this.subjectId);
        },
        clickByTerm:function (id,e) {
            this.termId=id;
            this.syllabusId='';
            this.current =1;
            $(e.target).siblings().removeClass('active');
            $(e.target).addClass('active');
            this.getOutline(this.termId,this.gradeId,this.subjectId);
        },
        bindOutlineClick:function () {
            var _this = this;
            // 一级大纲
            $('.catalog').on('click','.first>h4',function () {
                if($(this).next('ul').children().length<1){

                }else{
                    if($(this).prev('i').hasClass('turn-down')){
                        $(this).prev('i').removeClass();
                        $(this).prev('i').addClass('turn-right');
                        $(this).next('ul').slideUp();
                    }else{
                        $(this).prev('i').removeClass();
                        $(this).prev('i').addClass('turn-down');
                        $(this).next('ul').slideDown();
                        $(this).parent().siblings().find('i').removeClass();
                        $(this).parent().siblings().find('i').addClass('turn-right');
                        $(this).parent().siblings().find('ul').slideUp();
                    }
                }
                _this.current =1;
                _this.syllabusId = $(this).data('id');
                _this.getQuestionList(_this.termId,_this.gradeId,_this.subjectId,_this.syllabusId,_this.current);
            });
            // 二级大纲
            $('.catalog').on('click','.second>li>h4',function () {
                if($(this).next('ul').children().length<1){

                }else{
                    if($(this).prev('i').hasClass('turn-down')){
                        $(this).prev('i').removeClass();
                        $(this).prev('i').addClass('turn-right');
                        $(this).next('ul').slideUp();
                    }else{
                        $(this).prev('i').removeClass();
                        $(this).prev('i').addClass('turn-down');
                        $(this).next('ul').slideDown();
                    }
                }
                _this.current =1;
                _this.syllabusId = $(this).data('id');
                _this.getQuestionList(_this.termId,_this.gradeId,_this.subjectId,_this.syllabusId,_this.current);
            });
            // 三级大纲
            $('.catalog').on('click','.three h4',function () {
                _this.current =1;
                _this.syllabusId = $(this).data('id');
                _this.getQuestionList(_this.termId,_this.gradeId,_this.subjectId,_this.syllabusId,_this.current);
            });
        },
        goto: function(index) { //枫叶处理
            var _this = this;
            if(index == this.current) return;
            if(index > this.allpage) {
                this.current = this.current - 2;
                layer.msg("Sorry ╮(╯_╰)╭ 没有下一页喽！");
                return false;
            }
            _this.current = index;
            _this.getQuestionList(_this.termId,_this.gradeId,_this.subjectId,_this.syllabusId,_this.current);
        },
        lookAnswer:function () {
            $('.fetaskTemplate').on('click','.feanswer a',function () {
                if($(this).hasClass('active')){
                    $(this).parent().parent().find('.ferightanswer').hide(300);
                    $(this).removeClass('active');
                }else{
                    $(this).parent().parent().find('.ferightanswer').show(300);
                    $(this).addClass('active');
                }
            })
        }
    }
});