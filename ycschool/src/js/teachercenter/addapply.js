require("../../css/teachercenter/teachercenter.less");

var type = $(this).getUrlParam("type");
function isEmpty(str){
    var reg = /\S+/;
    return reg.test(str);
}
$(window.parent.document).find("#jTeacherIframe").css("height",$('.addapply').height()+100 +"px");

new Vue({
    el: "#addapply",
    data: {
        officeArr:[],
        carArr:[],
        state:0, //0为调用会议室列表，1为调用车辆列表
        reason:'',
        boardroomId:'',
        schoolCarId:''
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
        })
    },
    methods: {
        init:function () {
            ECalendarisOpen1($("#beginTime"));
            ECalendarisOpen1($("#endTime"));
            var _this = this;
            if(type==0){
                _this.state=0;
                _this.$http.post(SERVERROOTDATA + "api/teacher/site/office.ashx?action=boardroomList",
                    {
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        if(res.body.code==200){
                           _this.officeArr = res.body.rows
                        }
                    })
            }else{
                _this.state=1;
                _this.$http.post(SERVERROOTDATA + "api/teacher/site/office.ashx?action=carList",
                    {
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        if(res.body.code==200){
                            _this.carArr = res.body.rows
                        }
                    })
            }
        },
        saveFirstStep:function () {
            var _this = this;
            var bt = new Date($('#beginTime').val());
            var et = new Date($('#endTime').val());
            // console.log(bt);
            // console.log(et);
            if(bt>=et){
                layer.msg("起始日期不能大于截止日期");
                return;
            }
            if(!isEmpty(_this.reason)){
                layer.msg('请填写您的理由');
                return;
            }
            var index = layer.load(1, {
                shade: [0.1,'#fff'] //0.1透明度的白色背景
            });
            if(type==0){
                _this.$http.post(SERVERROOTDATA + "api/teacher/site/office.ashx?action=saveBoardroomApply",
                    {
                        beginDate:$('#beginTime').val(),
                        boardroomApplyId:0,
                        boardroomId:_this.boardroomId,
                        endDate:$('#endTime').val(),
                        importance:1,
                        note:_this.reason,
                        state:0,
                        tag:'add'
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        if(res.body.code==200){
                            layer.msg("提交成功");
                            setTimeout(function () {
                                window.location.href="teachercenteroffice.html";
                            },1000)
                        }else{
                            layer.close(index);
                            layer.msg("提交失败");
                        }
                    })
            }else{
                _this.$http.post(SERVERROOTDATA + "api/teacher/site/office.ashx?action=saveCarApply",
                    {
                        carApplyId:0,
                        destination:'',
                        note:'',
                        reasons:_this.reason,
                        schoolCarId:_this.schoolCarId,
                        state:0,
                        tag:'add',
                        useTime:$('#beginTime').val(),
                        useTimeEnd:$('#endTime').val()
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        if(res.body.code==200){
                            layer.msg("提交成功");
                            setTimeout(function () {
                                window.location.href="teachercenteroffice.html";
                            },1000)
                        }else{
                            layer.close(index);
                            layer.msg("提交失败");
                        }
                    })
            }

        }
    }
});