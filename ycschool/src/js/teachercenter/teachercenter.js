require("../../css/teachercenter/teachercenter.less");

var teachercenterApp = function() {
    var userType=$(window).storager({key: 'uType'}).readStorage();
    if(userType=='1'||userType==1){
        window.location.href='studentcenter.html';
    }
    new Vue({
        el: "#jTeacherCenter",
        data: {
            teacherInfo:{},
            getRouter:'teachercentercourse.html',
        },
        filters: {
            addRootFile: function(img) {
                return SERVERROOTFILE + img;
            }
        },
        mounted: function mounted() {
            this.$nextTick(function() {
                this.getInfo();
                this.setRouter();
                this.changeActive();
            });
        },
        methods: {
            getInfo:function () {
                var _this = this;
                _this.$http.post(SERVERROOTDATA + "api/teacher/site/common.ashx?action=teacherInfo",
                    {
                    }
                    , { emulateJSON: true })
                    .then(function (res) {
                        if (res.body.code==200) {
                            if(res.body.rows.length>0){
                                _this.teacherInfo = res.body.rows[0];
                            }
                        }
                    })
            },
            setRouter(achor){
                if(achor){
                    this.getRouter = achor;
                }else{
                    this.getRouter = this.getAchors();
                }

                if (!this.getRouter || this.getRouter == undefined || this.getRouter == "" || this.getRouter == "#course") {
                    this.getRouter = "teachercentercourse.html";
                } else if (this.getRouter == "#homework") {
                    this.getRouter = "teachercenterhomework.html";
                } else if (this.getRouter == "#resource") {
                    this.getRouter = "teachercenterresource.html";
                } else if (this.getRouter == "#office") {
                    this.getRouter = "teachercenteroffice.html";
                } else if (this.getRouter == "#attendanc") {
                    this.getRouter = "teachercenterattendanc.html";
                } else if (this.getRouter == "#score") {
                    this.getRouter = "teachercenterscore.html";
                } else if (this.getRouter == "#activity") {
                    this.getRouter = "teachercenteractivity.html";
                } else if (this.getRouter == "#answer") {
                    this.getRouter = "teachercenteranswer.html";
                } else if (this.getRouter == "#task") {
                    this.getRouter = "task.html";
                } else if (this.getRouter == "#myclass") {
                    this.getRouter = "myclass.html";
                } else if (this.getRouter == "#pmeeting") {
                    this.getRouter = "pmeeting.html";
                } else if (this.getRouter == "#hrecord") {
                    this.getRouter = "hrecord.html";
                } else if (this.getRouter == "#tapplication") {
                    this.getRouter = "tapplication.html";
                }
                this.changeSrc(this.getRouter);
            },
            changeActive:function () {
                $('.leftCon').on('click','a',function () {
                    $(this).parent().siblings().removeClass('active');
                    $(this).parent().addClass('active');
                });
                var url = window.location.hash;
                if(url==''||url==undefined||url=='undefined'){
                    url='#course';
                }
                // console.log(url);
                // // var currentUrl = url[url.length - 1].split('#')[0];
                $('.personCenterLeft .leftCon li').removeClass('active');
                $('.personCenterLeft .leftCon li a[href|="' + url + '"]').parent().addClass('active');
            },
            getAchors:function () {
                return window.location.hash;
            },
            changeSrc(routerSrc) {
                var _this = this;
                $("#jTeacherIframe").attr("src", routerSrc);

                // setTimeout(function() {
                //     _this.setIframeHeight($("#jTeacherIframe")[0]);
                // }, 300);
            },
            openInf(){
                layer.open({
                    type: 2,
                    title: '个人信息',
                    shadeClose: true,
                    shade: 0.5,
                    area: ['850px', '380px'],
                    content: "./teacherinf.html"
                });
            },
            modifyPwd(){
                layer.open({
                    type: 2,
                    title: '修改密码',
                    shadeClose: true,
                    shade: 0.5,
                    area: ['650px', '390px'],
                    content: "./modifypwd.html?type=teacher"
                });
            }
            // setIframeHeight(iframe) {
            //     if (iframe) {
            //         var iframeWin = iframe.contentWindow || iframe.contentDocument.parentWindow;
            //         if (iframeWin.document.body) {
            //             iframe.height = iframeWin.document.body.scrollHeight || iframeWin.document.documentElement.scrollHeight;
            //         }
            //     }
            // }
        }
    });
}
teachercenterApp();
