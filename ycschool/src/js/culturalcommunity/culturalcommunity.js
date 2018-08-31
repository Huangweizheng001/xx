require('../../css/culturalcommunity/culturalcommunity.less');

// 判断是否为空
function isEmpty(str){
    var reg = /\S+/;
    return reg.test(str);
}
// 知识付费首页
new Vue({
    el: "#knowledgepay",
    data: {
        login:false,
        teacherCurrent:1,
        teacherPage:0,
        nickName:'',
        mypoint:0,
        myQnum:0,
        myAnum:0,
        questionList:[],
        headIcon:'',
        teacherQAList:[],
        parentClass:[],
        articles:[],
        nodata:false,
        noQuestionData:false,
        textArea:'',
        limitsize:0
    },
    filters: {
        addRootFile: function addRootFile(img) {
            return SERVERROOTFILE + img;
        },
        addRoot:function (cid,vid) {
            return "player.html?cid=" +cid +"&vid=" +vid;
        },
        addQuestionRoot: function addQuestionRoot(id){
            return ROOT + 'replydetail.html?questionId='+id;
        },
        addTeacherRoot:function addTeacherRoot(id) {
            return ROOT + 'askteacherquestion.html?teacherId='+id;
        },
        addArticleRoot:function addArticleRoot(id) {
            return "details.html?activityId=" + id;
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
        }
    },
    mounted: function() {
        var _this = this;
        this.$nextTick(function() {
            _this.init();
            // _this.psychological();
            _this.waitForU();
            _this.teacherAnswerList(_this.teacherCurrent);
            _this.getParentClass();
            _this.getArticle();
        })
    },
    methods: {
        init:function (){
            var _this=this;
            // var uId=$(window).storager({key: 'feUid'}).readStorage();
            var ycToken=$(window).storager({key: 'ycToken'}).readStorage();
            _this.headIcon=$(window).storager({key: 'uIcon'}).readStorage();
            if(ycToken==null||ycToken==undefined||ycToken=='undefined'){
                this.login=false;
            }else{
                this.login=true;
                this.nickName = $(window).storager({key: 'uName'}).readStorage();
                this.$http.post(SERVERROOTDATA + "api/knowledge/site/KnowledgePay.ashx?action=getUserKPInfo", {
                    ycToken:ycToken
                }, {
                    emulateJSON: true
                }).then(function(res) {
                    if(res.body.code==200){
                        if(res.body.rows.length>0){
                            _this.mypoint = res.body.rows[0].myPoint;
                            _this.myQnum = res.body.rows[0].myQuestionNum;
                            _this.myAnum = res.body.rows[0].myResponseNum;
                        }

                    }

                })
            }
        },
        waitForU:function (){//等你来答
            var _this=this;
            this.$http.post(SERVERROOTDATA + "website/ashx/site/knowledgePay.ashx?action=getWaitResponseList", {
                gradeId:'',
                subjectId:'',
                key:'',
                pageIndex: 1,
                pageSize: 5
            }, {
                emulateJSON: true
            }).then(function(res) {
                if(res.body.code==200){
                    if(res.body.rows.length<1){
                        _this.noQuestionData = true;
                    }else{
                        _this.noQuestionData = false;
                    }
                    _this.questionList=res.body.rows;

                }
            })
        },
        teacherAnswerList:function (pageIndex) {//名师问答
            var _this=this;
            this.$http.post(SERVERROOTDATA + "website/ashx/site/knowledgePay.ashx?action=getTeacherQAList", {
                pageIndex: pageIndex,
                pageSize: 5
            }, {
                emulateJSON: true
            }).then(function(res) {
                if(res.body.code==200){
                    _this.teacherQAList=res.body.rows;
                    _this.teacherPage = res.body.totalPageCount;
                }
            })
        },
        anotherBatch:function () {//换一批
            if(this.teacherCurrent<this.teacherPage){
                this.teacherAnswerList(++this.teacherCurrent);
            }else{
                this.teacherCurrent = 1;
            }
        },
        getParentClass:function () {//家长课堂
            var _this=this;
            this.$http.post(SERVERROOTDATA + "website/ashx/site/KnowledgePay.ashx?action=getParentCourseList", {
                pageIndex: 1,
                pageSize: 6
            }, {
                emulateJSON: true
            }).then(function(res) {
                if(res.body.code==200){
                    _this.parentClass=res.body.rows;
                    if(res.body.rows.length<1){
                        _this.nodata=true;
                    }else{
                        _this.nodata=false;
                    }
                }
            }).then(function () {
                _this.parentClass.forEach(function(item, index) {
                    Vue.set(item, "headIconPath", SERVERROOTFILE + item.pcHeadIconPath); //注册变量
                });
            })
        },
        getArticle:function () {//热门推荐
            var _this=this;
            this.$http.post(SERVERROOTDATA + "website/ashx/site/Activity.ashx?action=getHottestStudyActivity", {
                pageIndex: 1,
                pageSize: 8
            }, {
                emulateJSON: true
            }).then(function(res) {
                if(res.body.code==200){
                    _this.articles=res.body.rows;
                }
            })
        },
        psychological:function () {//心理咨询
            var swiper = new Swiper('.teacher-content-hook',{
                autoplay: {
                    stopOnLastSlide:true,
                    disableOnInteraction: false,
                },
                speed:1000,
                autoplayDisableOnInteraction : false,
                loop:true,
                centeredSlides : true,
                slidesPerView:5,
                // pagination : '.swiper-pagination',
                // paginationClickable:true,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                // onInit:function(swiper){
                //     swiper.slides[2].className="swiper-slide swiper-slide-active";//第一次打开不要动画
                // },
                breakpoints: {
                    668: {
                        slidesPerView: 1,
                    }
                }
            });
        },
        limitSize:function(){
            this.limitsize=this.textArea.length;
        },
        jxSubmit:function () {
            if(!isEmpty(this.textArea)){
                layer.msg('请输入您的留言');
                return;
            }
            if(this.limitsize>400){
                layer.msg("您的字数超出范围");
                return;
            }
            var _this=this;
            this.$http.post(SERVERROOTDATA + "api/knowledge/site/knowledgePay.ashx?action=saveSuggestion", {
                content:this.textArea
            }, {
                emulateJSON: true
            }).then(function(res) {
                if(res.body.code==200){
                    layer.msg(res.body.message);
                }
            })
        },
        gotoMyquestion:function(){
            var userType=$(window).storager({key: 'uType'}).readStorage();
            if(userType==3){
                // window.location.href=ROOT+"teachercenter.html#answer";
            }else{
                window.location.href = ROOT+"studentcenter.html#answer";
            }
        },
        gotoMyreply:function(){
            var userType=$(window).storager({key: 'uType'}).readStorage();
            if(userType==3){
                window.location.href = ROOT +"teachercenter.html#answer";
            }else{
                // $(window).storager({key: 'state', value: 1, expires: -1}).addStorage();
                window.location.href = ROOT+"studentcenter.html?type=1#answer";
            }
        }
    }
});

