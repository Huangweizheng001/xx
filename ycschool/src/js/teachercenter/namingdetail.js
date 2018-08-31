require('../../css/teachercenter/teachercenter.less');

var scheduleId = $(this).getUrlParam("id");
var tag = $(this).getUrlParam("tag");
if(tag == "" || tag == undefined || tag == "undefined"){
    tag = 'add';
}
new Vue({
    el: "#namingdetail",
    data: {
        headArr:[],// 头部信息
        list:[], //学生列表
        classId:'',
        attendanceDate:'',
        isNew: false
    },
    filters: {
        addRootFile: function addRootFile(img) {
            return SERVERROOTFILE + img;
        },
        shiftTime:function shiftTime(num) {
            switch (num){
                case '1':
                    return "第一节";
                    break;
                case '2':
                    return "第二节";
                    break;
                case '3':
                    return "第三节";
                    break;
                case '4':
                    return "第四节";
                    break;
                case '5':
                    return "第五节";
                    break;
                case '6':
                    return "第六节";
                    break;
                case '7':
                    return "第七节";
                    break;
                case '8':
                    return "第八节";
                    break;
            }
        },
        getWeek:function getWeek(num) {
            switch (num) {
                case '1':
                    return "星期一";
                    break;
                case '2':
                    return "星期二";
                    break;
                case '3':
                    return "星期三";
                    break;
                case '4':
                    return "星期四";
                    break;
                case '5':
                    return "星期五";
                    break;
            }
        }
    },
    mounted: function () {
        var _this = this;
        this.$nextTick(function () {
            _this.getHead();
            _this.bindOperation();
        })
    },
    methods: {
        getHead:function () {
            var _this = this;
            if(tag == "add"){
                _this.isNew = true;
            }else{
                _this.isNew = false;
            }
            this.$http.post(SERVERROOTDATA + "api/teacher/site/schedule.ashx?action=getStudentListHead",
                {
                    scheduleId: scheduleId,
                    tag: tag == 'add'? '': tag
                }
                , { emulateJSON: true })
                .then(function (res) {
                    if (res.body.code==200) {
                        _this.headArr = res.body.rows;
                        if(_this.headArr.length>0){
                            _this.classId=_this.headArr[0].classId;
                            _this.attendanceDate = _this.headArr[0].AttendanceDate;
                        }
                    }
                }).then(function () {
                    _this.$http.post(SERVERROOTDATA + "api/teacher/site/schedule.ashx?action=getStudentListBody",
                        {
                            classId: _this.classId,
                            scheduleId:scheduleId,
                            tag:tag
                        }
                        , { emulateJSON: true })
                        .then(function (res) {
                            if (res.body.code==200) {
                                _this.list = res.body.rows;
                            }
                        }).then(function () {
                            $(window.parent.document).find("#jTeacherIframe").css("height",$('.namingdetail').height() +"px");
                    })
            })
        },
        bindOperation:function () {
            $('.contentWrapper .content').on('click','.list .radioBox span',function () {
                if($(this).hasClass('active')){
                    return;
                }else{
                    $(this).addClass('active');
                    $(this).siblings().removeClass('active');
                    var state = $(this).data('state');
                    // console.log(state);
                    // console.log($(this).parent().parent().parent())
                    $(this).parent().parent().parent().attr('state',state);
                }
            })
        },
        refer:function () {
            var studentArr = $('.list');
            var text = '';
            for(var i = 0 ; i < studentArr.length ; i++){
                var sId = studentArr[i].dataset.id;
                var state = studentArr[i].getAttribute('state');
                var attendance = studentArr[i].getAttribute('attendance');
                if(state == 0||state=='0'){
                    parent.layer.open({
                        type: 1,
                        // skin: 'layui-layer-rim', //加上边框
                        area: ['300px', '163px'], //宽高
                        content: '<div class="namingTip">'+$(studentArr[i]).find('.leftList').html()+'&nbsp;&nbsp;&nbsp;还未考勤</div>'
                    });
                    return;
                }
                if(i == studentArr.length-1){
                    text += sId +"|" + state + "|" + attendance;
                }else{
                    text += sId +"|" + state + "|" + attendance + ",";
                }
            }
            // console.log(text);
            var _this = this;
            _this.$http.post(SERVERROOTDATA + "api/teacher/site/schedule.ashx?action=saveAttendance",
                {
                    attendanceData: text,
                    attendanceDate: _this.attendanceDate,
                    scheduleId: scheduleId,
                    tag: tag
                }
                , { emulateJSON: true })
                .then(function (res) {
                    if (res.body.code==200) {
                        layer.msg("考勤成功");
                        setTimeout(function () {
                            if(tag == 'add'){
                                window.location.href="teachercenterattendanc.html";
                            }else{
                                window.location.href="recorddetail.html";
                            }
                        },1000)
                    }
                })
        }
    }
});