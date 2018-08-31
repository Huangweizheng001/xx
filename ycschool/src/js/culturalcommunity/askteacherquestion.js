require('../../css/culturalcommunity/culturalcommunity.less');


function isEmpty(str){
    var reg = /\S+/;
    return reg.test(str);
}
var teacherId = $(this).getUrlParam("teacherId");
// console.log(teacherId);
new Vue({
    el: "#AskTeacherQuestion",
    data: {
        limitsize:400,
        teacherInfo:{},
        historyAnswer:[],
        nodata:false,
        showItem: 6,
        allpage: 0,
        current:1
    },
    filters: {
        addRootFile: function addRootFile(img) {
            return SERVERROOTFILE + img;
        },
        addRoot:function addRoot(id) {
            return ROOT + "replydetail.html?questionId="+id ;
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
        pages: function() {
            var pag = [];
            if(this.current < this.showItem) { //如果当前的激活的项 小于要显示的条数
                //总页数和要显示的条数那个大就显示多少条
                var i = Math.min(this.showItem, this.allpage);
                while(i) {
                    pag.unshift(i--);
                }
            } else { //当前页数大于显示页数了
                var middle = this.current - Math.floor(this.showItem / 2), //从哪里开始
                    i = this.showItem;
                if(middle > (this.allpage - this.showItem)) {
                    middle = (this.allpage - this.showItem) + 1
                }
                while(i--) {
                    pag.push(middle++);
                }
            }
            return pag
        }
    },
    mounted: function() {
        var _this = this;
        this.$nextTick(function() {
            _this.init();
            _this.getHistoryAnswer(_this.current);
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
            this.$http.post(SERVERROOTDATA + "website/ashx/site/knowledgePay.ashx?action=getTeacherKPInfo", {
                teacherId: teacherId
            }, {
                emulateJSON: true
            }).then(function(res) {
                if(res.body.code==200){
                    if(res.body.rows.length>0){
                        _this.teacherInfo = res.body.rows[0];
                    }
                }
            })
        },
        putQuestion:function(){
            // var uId=$(window).storager({key: 'feUid'}).readStorage();
            // var userType=$(window).storager({key: 'feUType'}).readStorage();
            var ycToken=$(window).storager({key: 'ycToken'}).readStorage();
            if(ycToken==null||ycToken==undefined||ycToken=='undefined'){
                layer.msg('请先登录');
                return;
            }
            var _this=this;
            if(!isEmpty($('.textarea').html())){
                layer.msg("问题描述不能为空");
                return;
            }
            var index = layer.load(1, {
                shade: [0.1,'#fff'] //0.1透明度的白色背景
            });
            this.$http.post(SERVERROOTDATA + "api/knowledge/site/knowledgePay.ashx?action=saveKPQuestion", {
                qType: 1,
                content: $('.textarea').html(),
                iconPath: photoArray,
                teacherId:teacherId,
                ycToken:ycToken,
                // userId:uId,
                // userKind:userType,
                point:0,
                state:0,
                saveTag:'add'
            }, {
                emulateJSON: true
            }).then(function(res) {
                layer.close(index);
                if(res.body.code==200){
                    layer.msg("提交成功");
                    setTimeout(function () {
                        window.location.href = "cindex.html";
                    },1000);
                }else{
                    layer.msg(res.body.message);
                }
            })
        },
        limitSize:function(){
            this.limitsize=400-$('.textarea').html().length;
        },
        getHistoryAnswer:function (pageIndex) {
            var _this=this;
            this.$http.post(SERVERROOTDATA + "website/ashx/site/knowledgePay.ashx?action=getQuestionAListById", {
                teacherId: teacherId,
                pageIndex: pageIndex,
                pageSize:5
            }, {
                emulateJSON: true
            }).then(function(res) {
                if(res.body.code==200){
                    _this.historyAnswer=res.body.rows;
                    _this.allpage = res.body.totalPageCount;
                    if(res.body.rows.length<1){
                        _this.nodata=true
                    }else{
                        _this.nodata=false
                    }
                }
            })
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
            _this.getHistoryAnswer(_this.current);
        }
    }
});