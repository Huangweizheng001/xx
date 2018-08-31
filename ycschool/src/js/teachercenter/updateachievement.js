require("../../css/teachercenter/teachercenter.less");

function isEmpty(str){
    var reg = /\S+/;
    return reg.test(str);
}
$(window.parent.document).find("#jTeacherIframe").css("height",$('.uploadAchievement').height() +"px");
new Vue({
    el: "#uploadAchievement",
    data: {
        title:'',
        iconPath:'',
        filePath:'',
        intro:'',
        desc:''
    },
    filters: {
        addRootFile: function addRootFile(img) {
            return SERVERROOTFILE + img;
        }
    },
    mounted: function () {
        var _this = this;
        this.$nextTick(function () {

        })
    },
    methods: {
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
        addDocument:function (e) {
            var _this = this;
            if($(e.target).val().match( /.pdf|.doc|.xls/i)) {
                var data = new FormData($('#addFile')[0]);
                var yc = $(window).storager({key: 'ycToken'}).readStorage();
                // console.log(yc);
                data.append('ycToken',yc);
                $.ajax({
                    url: SERVERROOTDATA+"api/teacher/site/research.ashx?action=formDataUpload",
                    type: "POST",
                    data: data,
                    processData: false,  // 告诉jQuery不要去处理发送的数据
                    contentType: false,   // 告诉jQuery不要去设置Content-Type请求头
                    success:function (res) {
                        var data = JSON.parse(res);
                        // console.log(data);
                        if(data.code==200){
                            _this.filePath = data.filePath;
                            _this.fileName = data.fileName;
                        }else{
                            layer.msg("上传失败");
                        }
                    }
                });
            }else{
                layer.msg("对不起，系统仅支持标准格式的文件，请您调整格式后重新上传，谢谢 !");
            }
        },
        saveFirstStep:function () {
            var _this = this;
            this.desc = $("#content").html();
            if(!isEmpty(_this.title)){
                layer.msg('请填写主题');
                return;
            }
            if(!isEmpty(_this.filePath) && !isEmpty(_this.desc)){
                layer.msg('请上传文件或请填写内容');
                return;
            }
            if(!isEmpty(_this.iconPath)){
                layer.msg('请上传封面');
                return;
            }
            if(!isEmpty(_this.intro)){
                layer.msg('请填写简介');
                return;
            }
            var index = layer.load(1, {
                shade: [0.1,'#fff'] //0.1透明度的白色背景
            });
            _this.$http.post(SERVERROOTDATA + "api/teacher/site/research.ashx?action=saveResearchResult",
                {
                    fileName:_this.fileName,
                    coverUrl:_this.iconPath,
                    downloadUrl:_this.filePath,
                    intro:_this.intro,
                    resultContent:_this.desc,
                    resultId:0,
                    tag:'add',
                    title:_this.title
                }
                ,{emulateJSON: true})
                .then(function (res) {
                    if(res.body.code==200){
                        layer.msg('上传成功');
                        setTimeout(function () {
                            window.location.href="teachercenteractivity.html";
                        },1000)
                    }else{
                        layer.close(index);
                        layer.msg("保存失败")
                    }
                })

        }
    }
});

