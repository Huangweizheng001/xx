require('../../css/studentcenter/answer.less');

if(!checkInIframe()){
    window.location.href ="./studentcenter.html";
}
var state=$(this).getUrlParam("type");
// var state=$(window).storager({key: 'state'}).readStorage();
// $(window).storager({key: 'state'}).removeStorage();
if(state == undefined||state == ''||state == 'undefined'){
    state = 0
}
// alert(state);

new Vue({
    el: "#answer",
    data: {
        quizArr:[],
        answerArr:[],
        adopt:'',
        answer:'',
        replyAdopt:'',
        state:state, //0为提问，1为回答
        showItem: 4,//页码显示条数
        allpage: 0,//总页数
        current: 1,//当前页
        noQuiz:false,
        noAnswer:false
    },
    filters: {
        addRootFile: function addRootFile(img) {
            return SERVERROOTFILE + img;
        },
        showTime:function showTime(date) {
            // return $.getCurrentTime(date,3);
            var end_str = (date).replace(/-/g,"/");//发布时间
            var current_str=new Date();//当前时间
            var differ_str=current_str.getTime() - new Date(end_str).getTime();   //时间差的毫秒数
            //计算出相差天数
            var days=Math.floor(differ_str/(24*3600*1000));

            //计算出小时数

            var leave1=differ_str%(24*3600*1000);    //计算天数后剩余的毫秒数
            var hours=Math.floor(leave1/(3600*1000));
            //计算相差分钟数
            var leave2=leave1%(3600*1000);      //计算小时数后剩余的毫秒数
            var minutes=Math.floor(leave2/(60*1000));
            //计算相差秒数
            var leave3=leave2%(60*1000);   //计算分钟数后剩余的毫秒数
            var seconds=Math.round(leave3/1000);
            // console.log(" 相差 "+days+"天 "+hours+"小时 "+minutes+" 分钟"+seconds+" 秒");
            if(days>0){
                return days+"天前";
            }else if(hours>0){
                return hours+"小时前";
            }else if(minutes>0){
                return minutes+"分钟前";
            }else if(seconds>0){
                return "刚刚";
            }
        },
        addRoot:function addRoot(id) {
            return ROOT + "replydetail.html?questionId="+id ;
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
            _this.bindNav();
            _this.init();
        })
    },
    methods: {
        init:function () {
            if(state==0){
                this.getQuiz(this.current,this.adopt,this.answer);
            }else{
                this.getAnswer(this.current,this.replyAdopt);
            }
        },
        bindSelect:function (event,adopt,answer) {
            $(event.target).addClass('active');
            $(event.target).parent().siblings().find('span').removeClass('active');
            this.current=1;
            this.getQuiz(this.current,adopt,answer);
        },
        bindType:function (event,adopt) {
            $(event.target).addClass('active');
            $(event.target).parent().siblings().find('span').removeClass('active');
            this.current=1;
            this.getAnswer(this.current,adopt);
        },
        bindNav:function () {
            var _this = this;
            $('.answer .title').on('click','span',function () {
                if($(this).hasClass('active')){
                    return;
                }else{
                    $(this).addClass('active');
                    $(this).siblings().removeClass('active');
                    var id = $(this).data('id');
                    if(id==0){ //提问
                        _this.state=0;
                        _this.current=1;
                        _this.adopt='';
                        _this.answer='';
                        _this.getQuiz(_this.current,_this.adopt,_this.answer);
                    }else{ //答案
                        _this.state=1;
                        _this.current=1;
                        _this.replyAdopt='';
                        _this.getAnswer(_this.current,_this.replyAdopt);
                    }
                }
            })
        },
        getQuiz: function (pageIndex,adopt,answer) {
            var _this = this;
            this.$http.post(SERVERROOTDATA + "api/knowledge/site/knowledgePay.ashx?action=getMyKPQuestionList",
                {
                    adopt:adopt,
                    answer:answer,
                    pageIndex: pageIndex,
                    pageSize: 6
                }
                , { emulateJSON: true })
                .then(function (res) {
                    if (res.body.code==200) {
                        if(res.body.rows.length<1){
                            _this.noQuiz=true;
                        }else{
                            _this.noQuiz=false;
                            _this.quizArr = res.body.rows.reverse();
                        }
                        _this.allpage = res.body.totalPageCount;
                    }
                }).then(function () {
                $(window.parent.document).find("#jStudentIframe").css("height",$('.answer').height()+135 +"px");
            })
        },
        getAnswer:function (pageIndex,adopt) {
            var _this = this;
            this.$http.post(SERVERROOTDATA + "api/knowledge/site/knowledgePay.ashx?action=getMyKPResponseList",
                {
                    Qtype:0,
                    adopt:adopt,
                    pageIndex: pageIndex,
                    pageSize: 6
                }
                , { emulateJSON: true })
                .then(function (res) {
                    if (res.body.code==200) {
                        if(res.body.rows.length<1){
                            _this.noAnswer=true;
                        }else{
                            _this.noAnswer=false;
                            _this.answerArr = res.body.rows.reverse();
                        }
                        _this.allpage = res.body.totalPageCount;
                    }
                }).then(function () {
                $(window.parent.document).find("#jStudentIframe").css("height",$('.answer').height()+135 +"px");
            })
        },
        goto: function (index) { //枫叶处理
            var _this = this;
            if (index == this.current) return;
            if (index > this.allpage) {
                this.current = this.current - 2;
                layer.msg("Sorry ╮(╯_╰)╭ 没有下一页喽！");
                return false;
            }
            this.current = index;
            if(_this.state==0){
                _this.getQuiz(_this.current,_this.adopt,_this.answer);
            }else{
                _this.getAnswer(_this.current,_this.replyAdopt);
            }

        }
    }
});