require('../../css/culturalcommunity/culturalcommunity.less');

// var r=$(this).getUrlParam("r");
// if(r==undefined||r==''||r=='undefined'){
//     r=0
// }
// var c=$(this).getUrlParam("c");
// if(c==undefined||c==''||c=='undefined'){
//     c=0
// }
// 判断是否为空
function isEmpty(str){
    var reg = /\S+/;
    return reg.test(str);
}

var questionId = $(this).getUrlParam("questionId");
var uId=$(window).storager({key: 'uId'}).readStorage();
var userType=$(window).storager({key: 'uType'}).readStorage();
var ycToken=$(window).storager({key: 'ycToken'}).readStorage();
new Vue({
    el: "#knowledgereplydetail",
    data: {
        login:false,
        qUid:'',
        qUtype:'',
        qType:'',
        nickName:'',
        mypoint:0,
        myQnum:0,
        myAnum:0,
        headIcon:'',
        questionCon:'',
        current:1,
        totalCount:0,
        replylist:[],
        loadmore:false,
        questionDetail:''
    },
    filters: {
        addImgile: function addRootFile(img) {
            return SERVERROOTFILE + "uploads/images/" + img;
        },
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
        }
    },
    computed: {
        hasBest: function() {
            for(var i=0;i<this.replylist.length;i++){
                if(this.replylist[i].isBest==1||this.replylist[i].isBest=='1'){
                    return true;
                }
            }
            return false;
        },
        chargeMode:function () {
            return this.qType;
        },
        isResult :function () { //用来是调用回答页，还是答案页
            if(uId == this.qUid && userType == this.qUtype){
                return 1;
            }else {
                return 0;
            }
        }
    },
    mounted: function() {
        var _this = this;
        this.$nextTick(function() {
            _this.init();
        })
    },
    methods: {
        init:function (){
            var _this=this;
            //配置需要引入jq 1.7.2版本以上
            //服务器端成功返回 {state:1,path:文件保存路径}
            //服务器端失败返回 {state:0,errmsg:错误原因}
            //默认做了文件名不能含有中文,后端接收文件的变量名为file
            $("#zwb_upload").bindUpload({
                url:"http://zz.fetv.cn/YcE/ashx/upload/UploadFile.ashx?action=formDataUploadNew",//上传服务器地址
                callbackPath:"",//绑定上传成功后 图片地址的保存容器的id或者class 必须为input或者textarea等可以使用$(..).val()设置之的表单元素
                // ps:值返回上传成功的 默认id为#callbackPath  保存容器为位置不限制,id需要加上#号,class需要加上.
                // 返回格式为:
                // 原来的文件名,服务端保存的路径|原来的文件名,服务端保存的路径|原来的文件名,服务端保存的路径|原来的文件名,服务端保存的路径....
                num:8,//上传数量的限制 默认为空 无限制
                type:"jpg|png|gif|svg",//上传文件类型 默认为空 无限制
                size:3,//上传文件大小的限制,默认为5单位默认为mb
            });
            _this.headIcon=$(window).storager({key: 'uIcon'}).readStorage();
            if(ycToken==null||ycToken==undefined||ycToken=='undefined'){
                this.login=false;
            }else{
                this.login=true;
                this.nickName = $(window).storager({key: 'uName'}).readStorage();
                this.$http.post(SERVERROOTDATA + "api/knowledge/site/KnowledgePay.ashx?action=getUserKPInfo", {
                    // userId: uId,
                    // userType: userType
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
            this.getQuestionDetail();
            this.getReplylist(this.current);
        },
        getQuestionDetail:function(){
            var _this=this;
            this.$http.post(SERVERROOTDATA + "website/ashx/site/knowledgePay.ashx?action=getKPQuestionById", {
                KPQuestionId: questionId
            }, {
                emulateJSON: true
            }).then(function(res) {
                if(res.body.code==200){
                    if(res.body.rows.length>0){
                        _this.questionCon = res.body.rows[0];
                        _this.questionDetail = res.body.rows[0].content;
                        _this.questionDetail = _this.questionDetail.replace(/u003c/g,'<');
                        _this.questionDetail = _this.questionDetail.replace(/u003e/g,'>');
                        _this.qType = res.body.rows[0].qType;
                        _this.qUid = res.body.rows[0].userId;
                        _this.qUtype = res.body.rows[0].userKind;
                    }
                }

            }).then(function () {
                $('.feaskquestion-left').on('click','.fepictureArr img',function () {
                    showPhoto($(this));
                })
            })
        },
        getReplylist:function (pageIndex) {
            var _this=this;
            this.$http.post(SERVERROOTDATA + "website/ashx/site/knowledgePay.ashx?action=getKPResponseById", {
                KPQuestionId: questionId,
                pageIndex:pageIndex,
                pageSize:5
            }, {
                emulateJSON: true
            }).then(function(res) {
                if(res.body.code==200){
                    _this.replylist = _this.replylist.concat(res.body.rows);
                    _this.totalCount =res.body.totalCount;
                    if(pageIndex<res.body.totalPageCount){
                        _this.loadmore=true;
                    }else{
                        _this.loadmore=false;
                    }
                }

            }).then(function () {
                $('.felastanswer').on('click','.fepictureArr img',function () {
                    showPhoto($(this));
                })
            })
        },
        setGood:function(Qid){
            var _this=this;
            layer.confirm('你确定要采纳这个答案吗？', {
                btn: ['确定','取消'] //按钮
            }, function(){
                $.ajax({
                    url: SERVERROOTDATA + "api/knowledge/site/knowledgePay.ashx?action=saveKPResponse",
                    type: "POST",
                    data: {KPResponseId:Qid,isBest:1,saveTag:'update',ycToken:ycToken},
                    success:function (res) {
                        var data = JSON.parse(res);
                        if(data.code==200){
                            layer.msg('采纳成功！', {icon: 1});
                            setTimeout(function () {
                                _this.replylist=[];
                                _this.current=1;
                                _this.getReplylist(_this.current);
                            },1000)
                        }else{
                            layer.msg('采纳失败', {icon: 1});
                            setTimeout(function () {
                                layer.closeAll();
                            },1000)
                        }
                    }
                });
            }, function(){

            });
        },
        loadMore:function () {
            this.getReplylist(++this.current);
        },
        putQuestion:function(type){
            var _this=this;
            if(ycToken==null||ycToken==undefined||ycToken=='undefined'){
                layer.msg('请先登录');
                return;
            }
            if(type==1 && userType!=3){
                layer.msg("只有老师才能回答");
                return;
            }
            if(!isEmpty($('.textarea').html())){
                layer.msg("问题回复不能为空");
                return;
            }
            var index = layer.load(1, {
                shade: [0.1,'#fff'] //0.1透明度的白色背景
            });
            this.$http.post(SERVERROOTDATA + "api/knowledge/site/knowledgePay.ashx?action=saveKPResponse", {
                KPQuestionId: questionId,
                content: $('.textarea').html(),
                filePath: photoArray,
                // responseId:uId,
                // responseType:userType,
                ycToken:ycToken,
                isBest:0,
                saveTag:'add'
            }, {
                emulateJSON: true
            }).then(function(res) {
                layer.close(index);
                if(res.body.code==200){
                    layer.msg("提交成功");
                    setTimeout(function () {
                        location.reload();
                    },1000);

                }else{
                    layer.msg("提交失败")
                }
            })
        },
        gotoMyquestion:function(){
            if(userType==3){
                // window.location.href="http://www.fetv.cn/fe/TeacherLogin/teachercenterQAmyquiz.html";
            }else{
                window.location.href = ROOT+"studentcenter.html#answer";
            }
        },
        gotoMyreply:function(){
            if(userType==3){
                window.location.href = ROOT +"teachercenter.html#answer";
            }else{
                // $(window).storager({key: 'state', value: 1, expires: -1}).addStorage();
                window.location.href = ROOT+"studentcenter.html?type=1#answer";
            }
        }
    }
})