require('../../css/culturalcommunity/culturalcommunity.less');

// 判断是否为空
function isEmpty(str){
    var reg = /\S+/;
    return reg.test(str);
}
// var uId=$(window).storager({key: 'feUid'}).readStorage();
// var userType=$(window).storager({key: 'feUType'}).readStorage();

var ycToken=$(window).storager({key: 'ycToken'}).readStorage();
// 积分提问
new Vue({
    el: "#knowledgeAskQuestion",
    data: {
        limitsize:400,
        point:0,
        currentPoint:0,
        gradeArr:[],
        subjectArr:[],
        gradeId:'',
        subjectId:''
    },
    filters: {
        addRootFile: function addRootFile(img) {
            return SERVERROOTFILE + img;
        }
    },
    mounted: function() {
        var _this = this;
        this.$nextTick(function() {
            _this.init();
            _this.getGrade();
            _this.getSubject();
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
            this.$http.post(SERVERROOTDATA + "api/knowledge/site/KnowledgePay.ashx?action=getUserKPInfo", {
                // userId: uId,
                // userType: userType
                ycToken:ycToken
            }, {
                emulateJSON: true
            }).then(function(res) {
                if(res.body.code==200){
                    if(res.body.rows.length>0){
                        _this.currentPoint = res.body.rows[0].myPoint;
                    }
                }
            })
        },
        getGrade:function () {
            var _this = this;
            this.$http.post(SERVERROOTDATA + "website/ashx/site/Subject.ashx?action=getGrade", {
                pageIndex:1,
                pageSize:999
            }, {
                emulateJSON: true
            }).then(function(res) {
                if(res.body.code==200){
                    if(res.body.rows.length>0){
                        _this.gradeArr = res.body.rows;
                    }
                }
            })
        },
        getSubject:function () {
            var _this = this;
            this.$http.post(SERVERROOTDATA + "website/ashx/site/Subject.ashx?action=getSubject", {
                pageIndex:1,
                pageSize:999
            }, {
                emulateJSON: true
            }).then(function(res) {
                if(res.body.code==200){
                    if(res.body.rows.length>0){
                        _this.subjectArr = res.body.rows;
                    }
                }
            })
        },
        putQuestion:function(){
            var _this=this;
            if(ycToken==null||ycToken==undefined||ycToken=='undefined'){
                layer.msg('请先登录');
                return;
            }
            if(!isEmpty($('.textarea').html())){
                layer.msg("问题描述不能为空");
                return;
            }
            if(_this.point<0){
                layer.msg("积分不能为负数");
                return;
            }
            if(parseInt(_this.point)>parseInt(_this.currentPoint)){
                layer.msg("目前你的积分不够");
                return;
            }
            var index = layer.load(1, {
                shade: [0.1,'#fff'] //0.1透明度的白色背景
            });
            this.$http.post(SERVERROOTDATA + "api/knowledge/site/knowledgePay.ashx?action=saveKPQuestion", {
                qType: 0,
                content: $('.textarea').html(),
                iconPath: photoArray,
                ycToken:ycToken,
                // userId:uId,
                // userKind:userType,
                point:_this.point,
                state:0,
                saveTag:'add',
                subjectId:_this.subjectId,
                gradeId:_this.gradeId
            }, {
                emulateJSON: true
            }).then(function(res) {
                layer.close(index);
                if(res.body.code==200){
                    layer.msg("提交成功");
                    setTimeout(function () {
                        // window.location.href = "cindex.html";
                    },1000);
                }else{
                    layer.msg("提交失败")
                }
            })
        },
        limitSize:function(){
            this.limitsize=400-$('.textarea').html().length;
        }
    }
});
function valueReplace(v){
    v=v.toString().replace(/\\/gi,"");
    return v;
}