/**
 * Created by Administrator on 2017/9/18 0018.
 */
// 获取月份方法，如果是今年，则返回XX月，如果不是今年，则返回XXXX年XX月
function getMonth(m,y) {
    var mydate = new Date();
    var currentM = mydate.getMonth() + 1;
    var currentY = mydate.getFullYear();
    if (parseInt(y) == currentY) {
        if (parseInt(m) == currentM) {
            return "本月";
        } else {
            switch (parseInt(m)) {
                case 1:
                    return "1月";
                    break;
                case 2:
                    return "2月";
                    break;
                case 3:
                    return "3月";
                    break;
                case 4:
                    return "4月";
                    break;
                case 5:
                    return "5月";
                    break;
                case 6:
                    return "6月";
                    break;
                case 7:
                    return "7月";
                    break;
                case 8:
                    return "8月";
                    break;
                case 9:
                    return "9月";
                    break;
                case 10:
                    return "10月";
                    break;
                case 11:
                    return "11月";
                    break;
                case 12:
                    return "12月";
                    break;
            }
        }
    } else {
        switch (parseInt(m)) {
            case 1:
                return y+"年1月";
                break;
            case 2:
                return y+"年2月";
                break;
            case 3:
                return y + "年3月";
                break;
            case 4:
                return y + "年4月";
                break;
            case 5:
                return y + "年5月";
                break;
            case 6:
                return y + "年6月";
                break;
            case 7:
                return y + "年7月";
                break;
            case 8:
                return y + "年8月";
                break;
            case 9:
                return y + "年9月";
                break;
            case 10:
                return y + "年10月";
                break;
            case 11:
                return y + "年11月";
                break;
            case 12:
                return y + "年12月";
                break;
        }
    }

}
// 绘制视频/照片模板
var request = 1;//初始化 用于判断第几次渲染
function photomodal(result){
    for(var i=0;i<result.length;i++){
        //获取时间
        var date = result[i].uploadMonth;
        var month = date.split('-')[1];//月份
        var year = date.split('-')[0];//年份
        // 初始化月份标签
        var $month = $('<li class="dycmonth">' + getMonth(month, year) + '</li>');
        if (request == 1) {//如果是第一次渲染页面 直接添加月份标签
            request++;
            $('.dycdistinguishedguest-photo-content').append($month);
        } else if (i == 0) {//如果不是第一次渲染页面，判断是否是追加第一子元素
            //获取上一次渲染的 最后一个子元素
            var dom = $('.dycdistinguishedguest-photo-content').children().last().find('input').val();
            if (dom.split('-')[0] != month) {//比较是否月份相等，不是则添加新的月份标签
                $('.dycdistinguishedguest-photo-content').append($month);
            }
        }
        //如果不是第一次渲染页面,也不是追加第一子元素，则比较当前子元素与上一个子元素的月份，不相等则追加月份标签
        if (i != 0 && result[i].uploadMonth.split('-')[1] != result[i - 1].uploadMonth.split('-')[1]) {
            $('.dycdistinguishedguest-photo-content').append($month);
        }
        var $li=$('<li></li>');
        if(result[i].type=='photo'){//添加图片代码段
            var $photo=$('<div class="dycimg dycphoto"><img src="'+ ROUTEFILE +result[i].iconPath +'" alt="">' +
                '<input type="text" class="dychidden" value="'+ month +'"></div>');
            $photo.on('click',function () {//绑定图片放大缩放功能
                showPhoto($(this).find('img'));
            });
            $li.append($photo);
        }else{//添加视频代码段
            var $video=$('<div class="dycimg dycvideo" data-id="'+result[i].videoId+'"><img src="'+ ROUTEFILE +result[i].iconPath +'" alt="">' +
                '<b><i></i></b><input type="text" class="dychidden" value="'+ month +'"></div>');
            $video.on('click',function () {
                var vid = $(this).data('id');
                layer.open({
                    type: 2,
                    // title: '播米往前公开课',
                    //closeBtn: 0, //不显示关闭按钮
                    shadeClose: true,
                    shade: [0.5, '#000'],
                    area: ['800px', '500px'],
                    //offset: 'rb', //右下角弹出
                    //time: 2000, //2秒后自动关闭
                    anim: 2,
                    content: 'backcourseplayer.html?courseId='+ '&videoId=' + vid
                });
            });
            $li.append($video);
        }
        $('.dycdistinguishedguest-photo-content').append($li);
    }
}
// 嘉宾头部
// function guesthead(teacherId) {
//     new Vue({
//         el:'#guest',
//         data:{
//             banner:[],//头部背景
//             specialArr:[]//专题轮播栏
//         },
//         filters: {
//             addRoute: function(img) {
//                 return ROUTEFILE + img;
//             },
//             addCourseRoute: function addCourseRoute(id) {
//                 return "coursedetail.html?courseId=" +id;
//             }
//         },
//         mounted: function() { //1.0ready --> 2.0
//             var _this = this;
//             this.$nextTick(function() {
//                 _this.getBanner();
//                 _this.getSpecial();
//             })
//         },
//         methods: {
//             getBanner: function () {//获取头部背景图
//                 var _this = this;
//                 this.$http.post(ROUTE + "Teacher.ashx?action=getGuestIntroduce", {
//                     teacherId: teacherId
//                 }, {
//                     emulateJSON: true
//                 }).then(function (res) {
//                     _this.banner = res.body[0];
//                 }).then(function () {
//                     $('.guestbanner img').removeAttr('title');
//                     $('.guestbanner img').css('width','100%');
//                 }).then(function () {
//                     var height=$('#guest').height();
//                     $.scrollTo(height-100,500);
//                 })
//             },
//             getSpecial: function () {//获取课程
//                 var _this = this;
//                 this.$http.post(ROUTE + "Course.ashx?action=getTeacherRelativeCourse", {
//                     teacherId: teacherId,
//                     pageIndex:1,
//                     pageSize:20
//                 }, {
//                     emulateJSON: true
//                 }).then(function (res) {
//                     _this.specialArr = res.body.rows;
//                 }).then(function () {
//                     if(_this.specialArr.length<5){
//                         $('.dycpastreview .swiper-button-next').addClass('dychidden');
//                         $('.dycpastreview .swiper-button-prev').addClass('dychidden');
//                         // return false;
//                     }else{
//
//                     }
//                     var swiper = new Swiper('.aa', {
//                         nextButton: '.swiper-button-next',
//                         prevButton: '.swiper-button-prev',
//                         slidesPerView: 4,
//                         spaceBetween: 20
//                     });
//                 })
//             }
//         }
//     })
// }
// 嘉宾头部-改
function guesthead(teacherId) {
    new Vue({
        el:'#guest',
        data:{
            teachermsg:[]//老师资料
        },
        filters: {
            addRoute: function(img) {
                return ROUTEFILE + img;
            },
            addCourseRoute: function addCourseRoute(id) {
                return "coursedetail.html?courseId=" +id;
            }
        },
        mounted: function() { //1.0ready --> 2.0
            var _this = this;
            this.$nextTick(function() {
                _this.getTeacher();
            })
        },
        methods: {
            getTeacher: function () {//获取老师
                var _this = this;
                this.$http.post(ROUTE + "Teacher.ashx?action=getTeacherDetailById", {
                    teacherId: teacherId
                }, {
                    emulateJSON: true
                }).then(function (res) {
                    if(res.body.length<1){
                        return false
                    }else{
                        _this.teachermsg = res.body[0];
                    }
                })
            }
        }
    })
}
function CurentTime()
{
    var now = new Date();

    var year = now.getFullYear();       //年
    var month = now.getMonth() + 1;     //月
    var day = now.getDate();            //日

    var hh = now.getHours();            //时
    var mm = now.getMinutes();          //分

    var clock = year + "-";

    if(month < 10)
        clock += "0";

    clock += month + "-";

    if(day < 10)
        clock += "0";

    clock += day + " ";

    if(hh < 10)
        clock += "0";

    clock += hh + ":";
    if (mm < 10) clock += '0';
    clock += mm;
    return(clock);
}
// 嘉宾-主页
function guestindex(teacherId) {
    new Vue({
        el: "#guestindex",
        data: {
            teacherId:teacherId,
            current: 1,//当前页
            nodata:false,
            load:true,
            sayArr:[],//说说
            resourse: [],//图片/视频
            expertopinion: []//专家观点
        },
        filters: {
            addRoute: function (img) {
                return ROUTEFILE + img;
            },
            sendmsg:function sendmsg(name) {
                return "回复 "+name+ " : ";
            },
            addpinglun:function addpinglun(num) {
                return num==0? "添加评论" : num;
            },
            addExpertRoute: function addExpertRoute(id,tId) {
                return "strategydetail.html?newsTypeId=" +id + "&teacherId="+tId;
            },
            addindexRoute: function addindexRoute(id) {
                return "guestindex.html?teacherId=" +id;
            },
            addphotoRoute: function addphotoRoute(id) {
                return "guestphoto.html?teacherId=" +id;
            },
            addpersonRoute: function addpersonRoute(id) {
                return "guestperson.html?teacherId=" +id;
            },
            addcourseRoute: function addcourseRoute(id) {
                return "guestcourse.html?teacherId=" +id;
            }
        },
        mounted: function () { //1.0ready --> 2.0
            var _this = this;
            this.$nextTick(function () {
                _this.getSay(_this.current);
                _this.getResourse();
                _this.getExpertOpinion();
            })
        },
        methods: {
            getSay:function (pageIndex) {//说说
                var _this = this;
                this.$http.post(ROUTE + "Teacher.ashx?action=getGuestHomePage", {
                    teacherId:teacherId,
                    pageIndex:pageIndex,
                    pageSize:4
                }, {
                    emulateJSON: true
                }).then(function(res) {
                    if(res.body.rows==undefined){
                        return false;
                    }else{
                        if(res.body.rows.length < 1) {
                            _this.nodata=true;
                        } else {
                            _this.sayArr =_this.sayArr.concat(res.body.rows);
                            _this.nodata=false;
                        }
                        if(pageIndex >=res.body.totalPageCount){
                            _this.load=false;
                        }else{
                            _this.load=true;
                        }
                    }
                }).then(function () {
                    _this.sayArr.forEach(function(item, index) {
                        Vue.set(item, "iconPath", ROUTEFILE + item.iconPath.split(ROUTEFILE)[item.iconPath.split(ROUTEFILE).length-1]);
                    })
                }).then(function () {//添加图片放大缩小功能
                    $('.dycguestsay').on('click','.dycguestsay-content img',function () {
                        showPhoto($(this));
                    })
                }).then(function () {
                    // 查看评论
                    $('.dycguestsay').on('click','p .pinglun',function () {
                        if($(this).html()=='收起'){
                            $('.dycpinglunarea').fadeOut(200);
                            $(this).html($(this).data('count'));
                            $(this).parent().next().find('.dycdiscuss').find('li').remove();
                            $(this).parent().next().find('.dycdiscuss').find('.dyclookmore').css('display','block');
                        }else{
                            var _this=$(this);
                            var id=$(this).parent().data('id');
                            getresult(1,id,_this);
                            $(this).parent().next().find('.dyclookmore').data('current',1);
                        }
                    });
                    // 发表评论
                    $('.dycpinglunarea>.dycliuyan-parent').on('click','button',function () {
                        var _this=$(this);
                        var mid=localStorage.getItem('mid');
                        var img=localStorage.getItem('mUserIcon');
                        var nick=localStorage.getItem('mNickName');
                        if(mid==undefined||mid==null||mid=='undefined'){
                            layer.msg('请先登录!');
                        }else{
                            var saySomethingId=$(this).parent().parent().prev().data('id');
                            var value=$(this).prev().val();
                            $(this).prev().val('');
                            var reg = /\S+/;
                            if(!reg.test(value)){
                                layer.msg('评论不能为空!');
                            }else{
                                $.ajax({
                                    type: "post",
                                    url: ROUTE + "SayEvaluation.ashx?action=evaluation",
                                    dataType: 'text',
                                    data: {
                                        memberId:mid,
                                        saySomethingId: saySomethingId,
                                        parentid:0,
                                        sayEvaluationLevel1Id:0,
                                        evaluation:value
                                    },
                                    success: function(data) {
                                        console.log(data);
                                        if(data==200){
                                            layer.msg('评论成功');
                                            var html=$('<li><div class="dyctop clearfix"><img src="'+ ROUTEFILE + img+'" alt="">' +
                                                '<h4>'+ nick +'</h4><s>'+ CurentTime() +'</s></div>' +
                                                '<div class="dycbox"><p>'+ value +'</p><button>回复</button><span class="dianzang">0</span></div></li>');
                                            _this.parent().parent().find('.dycdiscuss').prepend(html);

                                            var n=_this.parent().parent().prev().find('.pinglun').data('count');
                                            _this.parent().parent().prev().find('.pinglun').data('count',++n);
                                        }
                                    },
                                    error: function(ex) {
                                        // alert('错误！');
                                        console.log(ex);
                                    }
                                });
                            }

                        }
                    })
                    // 说说点赞
                    $('.dycguestsay').on('click','p .dianzang',function () {
                        var _this=$(this);
                        var count=parseInt($(this).html());
                        $.ajax({
                            type: "post",
                            url: ROUTE + "SayEvaluation.ashx?action=thumbUp",
                            dataType: 'text',
                            data: {
                                typeId:1,
                                objId:$(this).parent().data('id')
                            },
                            success: function(data) {
                                if(data==200){
                                    layer.msg('点赞成功');
                                    _this.html(++count);
                                }
                            },
                            error: function(ex) {
                                // alert('错误！');
                                console.log(ex);
                            }
                        });
                    })
                }).then(function () {
                    (function() {//引用分享插件JS
                        var p = document.createElement("script");
                        p.src = "http://v3.jiathis.com/code/jia.js";
                        var d = document.getElementsByTagName("script")[0];
                        d.parentNode.insertBefore(p, d);
                    })();
                    // 查看更多
                    $('.dyclookmore').on('click','span',function () {
                        var current=$(this).parent().data('current');
                        current++;
                        var id=$(this).parent().parent().parent().prev().data('id');
                        $(this).parent().data('current',current);
                        getresult(current,id,$(this).parent().parent().parent().prev().find('.pinglun'));
                    })
                })
            },
            getResourse: function() {//图片和视频模块
                var _this = this;
                this.$http.post(ROUTE + "Teacher.ashx?action=getPhotoVideo", {
                    teacherId:teacherId,
                    type:'all',
                    pageIndex:1,
                    pageSize:10
                }, {
                    emulateJSON: true
                }).then(function(res) {
                    _this.resourse = res.body.rows;
                }).then(function () {
                    $('.dycviewpoint-photo').on('click','.dycphoto',function () {
                        showPhoto($(this).find('img'));
                    });
                    $('.dycviewpoint-photo').on('click','.dycvideo',function () {
                        var vid = $(this).data('id');
                        layer.open({
                            type: 2,
                            // title: '播米往前公开课',
                            //closeBtn: 0, //不显示关闭按钮
                            shadeClose: true,
                            shade: [0.5, '#000'],
                            area: ['800px', '500px'],
                            //offset: 'rb', //右下角弹出
                            //time: 2000, //2秒后自动关闭
                            anim: 2,
                            content: 'backcourseplayer.html?courseId='+ '&videoId=' + vid
                        });

                    })
                })
            },
            getExpertOpinion: function() {//策略解析
                var _this = this;
                this.$http.post(ROUTE + "Teacher.ashx?action=getGuestOpinion", {
                    teacherId:teacherId,
                    pageIndex:1,
                    pageSize:1
                }, {
                    emulateJSON: true
                }).then(function(res) {
                    _this.expertopinion = res.body.rows;
                })
            },
            loadmore:function () {//查看更多
                var _this=this;
                _this.getSay(++_this.current);
            }
        }
    })
}
// 获取评论数组
function getresult(pcurrent,id,obj) {

    $.ajax({
        type: "post",
        url: ROUTE + "SayEvaluation.ashx?action=getEvaluation",
        dataType: 'json',
        data: {
            saySomethingId: id,
            pageIndex:pcurrent,
            pageSize:3
        },
        success: function(data) {
            obj.parent().next().css('display','block');
            discuss(data.rows,id,obj);
            obj.html('收起');
            if(pcurrent>=data.totalPageCount){
                obj.parent().next().find('.dyclookmore').css('display','none');
            }
        },
        error: function(ex) {
            // alert('错误！');
            console.log(ex);
        }
    });
}
// 获取评论方法
function discuss(result,sayId,obj) {
    // var parent=$('<ul class="dycdiscuss"></ul>');
    for(var i=0;i<result.length;i++){
        var Chirld=$('<ul class="dycdiscuss-chirld"></ul>');
        if(result[i].children.length<1){

        }else{
            // 2级评论区
            var child=result[i].children;
            for(var j=0;j<child.length;j++){
                var cli=$('<li data-sayEvaluationId="'+ child[j].sayEvaluationId +'" data-sayEvaluationLevel1Id="'+ child[j].sayEvaluationLevel1Id +'"></li>');
                var ctop=$('<div class="dyctop clearfix"><img src="'+ ROUTEFILE + child[j].iconPath +'" alt="">' +
                    '<h4 data-id="'+ child[j].memberId +'"><span>'+ child[j].nickName + '</span><b>回复</b> '+ child[j].byReplyNickName +'</h4>' +
                    '<s>'+ child[j].evaluationDate +'</s></div>');
                // var cp=$('<p>'+ child[j].evaluation +'</p>');
                var cbox=$('<div class="dycbox"><p>'+ child[j].evaluation +'</p><button>回复</button> <span class="dianzang">'+ child[j].thumbUpCount +'</span></div>');
                // 绑定回复方法
                cbox.on('click','button',function () {
                    $('.dycpinglunarea .dycliuyan').remove();
                    var toObj=$(this).parent().parent().find('.dyctop').find('h4').find('span').html();
                    var nick=localStorage.getItem('mNickName');
                    if(nick==toObj){//防止自己回复自己
                        layer.msg("不能回复自己");
                        return;
                    }
                    var liuyan=$('<div class="dycliuyan"><input type="text" placeholder="回复'+ toObj +':"><button>评论</button></div>');
                    // 绑定评论方法
                    liuyan.on('click','button',function () {
                        var _this=$(this);
                        var mid=localStorage.getItem('mid');
                        var img=localStorage.getItem('mUserIcon');
                        var nick=localStorage.getItem('mNickName');
                        var csayevaluationid=$(this).parent().parent().data('sayevaluationid');
                        var csayevaluationlevel1id=$(this).parent().parent().data('sayevaluationlevel1id');
                        if(mid==undefined||mid==null||mid=='undefined'){
                            layer.msg('请先登录!');
                        }else{
                            var cvalue=$(this).prev().val();
                            var reg = /\S+/;
                            $(this).prev().val('');
                            if(!reg.test(cvalue)){
                                layer.msg('评论不能为空!');
                            }else{
                                $.ajax({
                                    type: "post",
                                    url: ROUTE + "SayEvaluation.ashx?action=evaluation",
                                    dataType: 'text',
                                    data: {
                                        memberId:mid,
                                        saySomethingId: sayId,
                                        parentid:csayevaluationid,
                                        sayEvaluationLevel1Id:csayevaluationlevel1id,
                                        evaluation:cvalue
                                    },
                                    success: function(data) {
                                        if(data==200){
                                            layer.msg('评论成功');
                                            var html=$('<li><div class="dyctop clearfix"><img src="'+ ROUTEFILE + img+'" alt="">' +
                                                '<h4><span>'+nick+'</span><b>回复</b>'+ toObj +'</h4><s>'+ CurentTime() +'</s></div>' +
                                                '<div class="dycbox"><p>'+ cvalue +'</p><button>回复</button><span class="dianzang">0</span></div></li>');

                                            if(_this.parent().parent().parent().parent().find('.dycdiscuss-chirld').length<1){
                                                _this.parent().parent().parent().parent().append('<ul class="dycdiscuss-chirld"></ul>')
                                            }
                                            _this.parent().parent().parent().parent().find('.dycdiscuss-chirld').css({
                                                "padding":"10px",
                                                "margin-top":"10px",
                                                // "border":"1px solid #ccc",
                                                "background":"#f5f5f5",
                                                "border-radius":"5px",
                                                "display":"block"
                                            }).prepend(html);

                                            var n=_this.parent().parent().parent().parent().parent().parent().prev().find('.pinglun').data('count');
                                            _this.parent().parent().parent().parent().parent().parent().prev().find('.pinglun').data('count',++n);
                                        }

                                    },
                                    error: function(ex) {
                                        // alert('错误！');
                                        console.log(ex);
                                    }
                                });
                            }

                        }
                    });
                    $(this).parent().parent().append(liuyan);
                });
                // 绑定点赞方法
                cbox.on('click','.dianzang',function () {
                    var _this=$(this);
                    var count=parseInt($(this).html());
                    $.ajax({
                        type: "post",
                        url: ROUTE + "SayEvaluation.ashx?action=thumbUp",
                        dataType: 'text',
                        data: {
                            typeId:2,
                            objId:$(this).parent().parent().data('sayevaluationid')
                        },
                        success: function(data) {
                            if(data==200){
                                layer.msg('点赞成功');
                                _this.html(++count);
                                var dcount=_this.parent().parent().parent().parent().parent().parent().prev().find('.dianzang').html();
                                _this.parent().parent().parent().parent().parent().parent().prev().find('.dianzang').html(++dcount);
                            }
                        },
                        error: function(ex) {
                            // alert('错误！');
                            console.log(ex);
                        }
                    });
                });
                cli.append(ctop);
                // cli.append(cp);
                cli.append(cbox);
                Chirld.append(cli);
                Chirld.css({
                    "padding":"10px",
                    "margin-top":"10px",
                    // "border":"1px solid #ccc",
                    "background":"#f5f5f5",
                    "border-radius":"5px"
                })
            }
        }
        // 一级评论区
        var pli=$('<li data-sayEvaluationId="'+ result[i].sayEvaluationId +'" data-sayEvaluationLevel1Id="'+ result[i].sayEvaluationLevel1Id +'"></li>');
        var ptop=$('<div class="dyctop clearfix"><img src="'+ ROUTEFILE + result[i].iconPath +'" alt="">' +
            '<h4 data-id="'+ result[i].memberId +'"><span>'+ result[i].nickName + '</span></h4>' +
            '<s>'+ result[i].evaluationDate +'</s></div>');
        // var pp=$('<p>'+ result[i].evaluation +'</p>');
        var pbox=$('<div class="dycbox"><p>'+ result[i].evaluation +'</p><button>回复</button> <span class="dianzang">'+ result[i].thumbUpCount +'</span><span class="lookup" data-pcount="'+ result[i].children.length +'">查看('+ result[i].children.length +')</span></div>');
        //绑定回复方法
        pbox.on('click','button',function () {
            $('.dycpinglunarea .dycliuyan').remove();
            var duixiang=$(this).parent().parent().find('.dyctop').find('h4').find('span').html();
            var nick=localStorage.getItem('mNickName');
            if(nick==duixiang){//防止自己回复自己
                layer.msg("不能回复自己");
                return;
            }
            var pliuyan=$('<div class="dycliuyan"><input type="text" placeholder="回复'+ duixiang +':"><button>评论</button></div>');
            // 绑定评论方法
            pliuyan.on('click','button',function () {
                var _this=$(this);
                var mid=localStorage.getItem('mid');
                var img=localStorage.getItem('mUserIcon');
                var nick=localStorage.getItem('mNickName');
                var sayevaluationid=$(this).parent().parent().data('sayevaluationid');
                var sayevaluationlevel1id=$(this).parent().parent().data('sayevaluationlevel1id');
                if(mid==undefined||mid==null||mid=='undefined'){
                    layer.msg('请先登录!');
                }else{
                    var value=$(this).prev().val();
                    $(this).prev().val('');
                    var reg = /\S+/;
                    if(!reg.test(value)){
                        layer.msg('评论不能为空!');
                    }else{
                        $.ajax({
                            type: "post",
                            url: ROUTE + "SayEvaluation.ashx?action=evaluation",
                            dataType: 'text',
                            data: {
                                memberId:mid,
                                saySomethingId: sayId,
                                parentid:sayevaluationid,
                                sayEvaluationLevel1Id:sayevaluationlevel1id,
                                evaluation:value
                            },
                            success: function(data) {
                                layer.msg('评论成功');
                                if(data==200){
                                    var html=$('<li><div class="dyctop clearfix"><img src="'+ ROUTEFILE + img+'" alt="">' +
                                        '<h4><span>'+nick+'</span><b>回复</b>'+ duixiang +'</h4><s>'+ CurentTime() +'</s></div>' +
                                        '<div class="dycbox"><p>'+ value +'</p><button>回复</button><span class="dianzang">0</span></div></li>');

                                    if(_this.parent().parent().find('.dycdiscuss-chirld').length<1){
                                        _this.parent().parent().append('<ul class="dycdiscuss-chirld"></ul>');

                                    }
                                    _this.parent().parent().find('.dycdiscuss-chirld').css({
                                        "padding":"10px",
                                        "margin-top":"10px",
                                        // "border":"1px solid #ccc",
                                        "background":"#f5f5f5",
                                        "border-radius":"5px",
                                        "display":"block"
                                    }).prepend(html);

                                    _this.parent().prev().find('.lookup').html('收起');
                                    var plnum=_this.parent().prev().find('.lookup').data('pcount');
                                    _this.parent().prev().find('.lookup').data('pcount',++plnum);

                                    var n=_this.parent().parent().parent().parent().prev().find('.pinglun').data('count');
                                    _this.parent().parent().parent().parent().prev().find('.pinglun').data('count',++n);
                                }
                            },
                            error: function(ex) {
                                // alert('错误！');
                                console.log(ex);
                            }
                        });
                    }

                }
            });
            $(this).parent().after(pliuyan);
        });
        // 绑定点赞方法
        pbox.on('click','.dianzang',function () {
            var _this=$(this);
            var count=parseInt($(this).html());
            $.ajax({
                type: "post",
                url: ROUTE + "SayEvaluation.ashx?action=thumbUp",
                dataType: 'text',
                data: {
                    typeId:2,
                    objId:$(this).parent().parent().data('sayevaluationid')
                },
                success: function(data) {
                    if(data==200){
                        layer.msg('点赞成功');
                        _this.html(++count);
                        var dcount=_this.parent().parent().parent().parent().prev().find('.dianzang').html();
                        _this.parent().parent().parent().parent().prev().find('.dianzang').html(++dcount);
                    }
                },
                error: function(ex) {
                    // alert('错误！');
                    console.log(ex);
                }
            });
        });
        pbox.on('click','.lookup',function () {
            if($(this).html()=='收起'){
                $(this).parent().parent().find('.dycdiscuss-chirld').fadeOut();
                var count=$(this).data('pcount');
                $(this).html('查看('+ count +')');
            }else{
                if($(this).data('pcount')==0){return}
                $(this).parent().parent().find('.dycdiscuss-chirld').fadeIn();
                $(this).html('收起');
            }
        });
        pli.append(ptop);
        // pli.append(pp);
        pli.append(pbox);
        pli.append(Chirld);
        // parent.append(pli);
        $(obj).parent().next().find('.dycdiscuss').find('.dyclookmore').before(pli);
    }

}
// 嘉宾-视频/照片
function guestphoto(teacherId) {
    new Vue({
        el:"#guestphoto",
        data:{
            current:1,//当前页
            teacherId:teacherId,
            nodata:false,
            load:true,
            type:'',//类型
            expertopinion:[]//专家观点
        },
        filters: {
            addRoute: function(img) {
                return ROUTEFILE + img;
            },
            addExpertRoute: function addExpertRoute(id,tId) {
                return "strategydetail.html?newsTypeId=" +id + "&teacherId="+tId;
            },
            addindexRoute: function addindexRoute(id) {
                return "guestindex.html?teacherId=" +id;
            },
            addphotoRoute: function addphotoRoute(id) {
                return "guestphoto.html?teacherId=" +id;
            },
            addpersonRoute: function addpersonRoute(id) {
                return "guestperson.html?teacherId=" +id;
            },
            addcourseRoute: function addcourseRoute(id) {
                return "guestcourse.html?teacherId=" +id;
            }
        },
        mounted: function() { //1.0ready --> 2.0
            var _this = this;
            this.$nextTick(function() {
                _this.getResourseContent(_this.current,_this.type);
                _this.getResourseNav();
                _this.getExpertOpinion();
            })
        },
        methods: {
            getResourseNav: function() {//视频和图片切换栏
                var _this=this;
                $('.dycdistinguishedguest-photo-nav').on('click','span',function () {
                    $(this).siblings().removeClass('active');
                    $(this).addClass('active');
                    var type=$(this).data('id');
                    _this.current=1;
                    _this.type=type;
                    request=1;//设置为第一次请求响应
                    $('.dycdistinguishedguest-photo-content').html('');//清空列表
                    _this.getResourseContent(_this.current,_this.type);
                })
            },
            getResourseContent: function(pageIndex,type) {//视频和图片显示
                var _this = this;
                this.$http.post(ROUTE + "Teacher.ashx?action=getPhotoVideo", {
                    teacherId:teacherId,
                    pageIndex:pageIndex,
                    pageSize:10,
                    type:type
                }, {
                    emulateJSON: true
                }).then(function(res) {
                    if(res.body.rows.length < 1) {
                        _this.nodata=true;
                    } else {
                        var result = res.body.rows;
                        photomodal(result);
                        _this.nodata=false;
                    }
                    if(pageIndex >=res.body.totalPageCount){
                        _this.load=false;
                    }else{
                        _this.load=true;
                    }
                }).then(function () {
                    // $('.dycdistinguishedguest-photo-content').on('click','.dycvideo',function () {//添加视频播放功能
                    //     var vid = $(this).data('id');
                    //     layer.open({
                    //         type: 2,
                    //         // title: '播米往前公开课',
                    //         //closeBtn: 0, //不显示关闭按钮
                    //         shadeClose: true,
                    //         shade: [0.5, '#000'],
                    //         area: ['800px', '500px'],
                    //         //offset: 'rb', //右下角弹出
                    //         //time: 2000, //2秒后自动关闭
                    //         anim: 2,
                    //         content: 'backcourseplayer.html?courseId='+ '&videoId=' + vid
                    //     });
                    // })
                        // var vId=$(this).data('id');
                        // var $pop=$('<div class="dycpop"><b>×</b></div>');
                        // $pop.on('click','b',function () {
                        //     $pop.remove();
                        // });
                        // $playdiv=$('<div id="videoPlay" style="position: absolute"></div>');
                        // $pop.append($playdiv);
                        // $('body').append($pop);
                        // $.ajax({
                        //     type: "post",
                        //     url: ROUTE + "CourseCatalog.ashx?action=getPlayUrlByVideoId",
                        //     dataType: 'text',
                        //     data: {
                        //         videoid: vId
                        //     },
                        //     success: function(msg) {
                        //         var player = new prismplayer({
                        //             id: 'videoPlay',
                        //             width: '100%',
                        //             height:'600px',
                        //             autoplay: true,
                        //             controlBarVisibility:'always',
                        //             vid: vId,
                        //             playauth: msg,
                        //             cover: ROUTEFILE+'start.jpg',
                        //             waterMark:ROUTEROOT+"ycedu/images/liveWaterIcon.png|BL|0.08|0.8"
                        //         });
                        //     }, //操作成功后的操作！msg是后台传过来的值
                        //     error: function(ex) {
                        //         // $('.dycnovideo').css('display', 'block');
                        //         alert('错误！');
                        //     }
                        // });
                })
            },
            getExpertOpinion: function() {//策略解析
                var _this = this;
                this.$http.post(ROUTE + "Teacher.ashx?action=getGuestOpinion", {
                    teacherId:teacherId,
                    pageIndex:1,
                    pageSize:1
                }, {
                    emulateJSON: true
                }).then(function(res) {
                    _this.expertopinion = res.body.rows;
                })
            },
            loadmore:function () {//查看更多
                var _this=this;
                _this.getResourseContent(++_this.current,_this.type);
            }
        }
    })
}
// 嘉宾-个人百科
function guestperson(teacherId) {
    new Vue({
        el: "#guestperson",
        data: {
            experience:[],//个人百科
            teacherId:teacherId,
            // styleconcept:[],//风格理念
            // recordking:[],//战绩之王
            // cases:[],//经典案例
            expertopinion: []//专家观点
        },
        filters: {
            addRoute: function (img) {
                return ROUTEFILE + img;
            },
            addExpertRoute: function addExpertRoute(id,tId) {
                return "strategydetail.html?newsTypeId=" +id + "&teacherId="+tId;
            },
            addindexRoute: function addindexRoute(id) {
                return "guestindex.html?teacherId=" +id;
            },
            addphotoRoute: function addphotoRoute(id) {
                return "guestphoto.html?teacherId=" +id;
            },
            addpersonRoute: function addpersonRoute(id) {
                return "guestperson.html?teacherId=" +id;
            },
            addcourseRoute: function addcourseRoute(id) {
                return "guestcourse.html?teacherId=" +id;
            }
        },
        mounted: function () { //1.0ready --> 2.0
            var _this = this;
            this.$nextTick(function () {
                _this.getPerson();
                _this.getExpertOpinion();
            })
        },
        methods: {
            getPerson: function() {//个人百科
                var _this = this;
                this.$http.post(ROUTE + "Teacher.ashx?action=getTeacherEncyclopedia", {
                    teacherId:teacherId
                }, {
                    emulateJSON: true
                }).then(function(res) {
                    if(res.body.length<1){
                        return false
                    }else{
                        _this.experience = res.body[0];
                    }
                })
            },
            getExpertOpinion: function() {//策略解析
                var _this = this;
                this.$http.post(ROUTE + "Teacher.ashx?action=getGuestOpinion", {
                    teacherId:teacherId,
                    pageIndex:1,
                    pageSize:1
                }, {
                    emulateJSON: true
                }).then(function(res) {
                    _this.expertopinion = res.body.rows;
                })
            }
        }
    })
}
// 嘉宾-课程页
function guestcourse(teacherId) {
    new Vue({
        el: "#guestcourse",
        data: {
            course:[],//课程
            teacherId:teacherId,
            current:1,
            nodata:false,
            load:true,
            expertopinion: []//专家观点
        },
        filters: {
            addRoute: function (img) {
                return ROUTEFILE + img;
            },
            addCourseRoute: function addCourseRoute(id) {
                return "coursedetail.html?courseId=" +id;
            },
            addExpertRoute: function addExpertRoute(id,tId) {
                return "strategydetail.html?newsTypeId=" +id + "&teacherId="+tId;
            },
            addindexRoute: function addindexRoute(id) {
                return "guestindex.html?teacherId=" +id;
            },
            addphotoRoute: function addphotoRoute(id) {
                return "guestphoto.html?teacherId=" +id;
            },
            addpersonRoute: function addpersonRoute(id) {
                return "guestperson.html?teacherId=" +id;
            },
            addcourseRoute: function addcourseRoute(id) {
                return "guestcourse.html?teacherId=" +id;
            }
        },
        mounted: function () { //1.0ready --> 2.0
            var _this = this;
            this.$nextTick(function () {
                _this.getCourse(_this.current);
                _this.getExpertOpinion();
            })
        },
        methods: {
            getCourse: function(pageIndex) {//课程
                var _this = this;
                this.$http.post(ROUTE + "Course.ashx?action=getTeacherRelativeCourse", {
                    teacherId: teacherId,
                    pageIndex:pageIndex,
                    pageSize:4
                }, {
                    emulateJSON: true
                }).then(function (res) {
                    if(res.body.rows.length < 1) {
                        _this.nodata=true;
                    } else {
                        _this.course =_this.course.concat(res.body.rows);
                        _this.nodata=false;
                    }
                    if(pageIndex >=res.body.totalPageCount){
                        _this.load=false;
                    }else{
                        _this.load=true;
                    }
                })
            },
            getExpertOpinion: function() {//策略解析
                var _this = this;
                this.$http.post(ROUTE + "Teacher.ashx?action=getGuestOpinion", {
                    teacherId:teacherId,
                    pageIndex:1,
                    pageSize:1
                }, {
                    emulateJSON: true
                }).then(function(res) {
                    _this.expertopinion = res.body.rows;
                })
            },
            loadmore:function () {//查看更多
                var _this=this;
                _this.getCourse(++_this.current);
            }
        }
    })
}
// 会员规则页面
function memberrule() {
    var privilege=[3,7,10,15];
    $('.dycmemberrule-title').on('click','li>div',function () {
        $(this).parent().siblings().find('div').removeClass('active');
        $(this).addClass('active');
        var id=$(this).data('id');
        //console.log($(this).data('id'));
        $('.dycmembercard img').attr('src',ROUTEROOT +'/ycedu/images/card'+id+'.png');
        $('.dycprivilege img').attr('src','images/privilege-'+id+'.png');
        $('.dycmemberrule-content .asb h1').html('<span>特权'+ privilege[id-1]+'<b>/15</b></span>');
        var html="";
        var huiyuan="";
        switch (id){
            case 1:
                html="免费";
                huiyuan="普通";
                getUl(commontitle,commondetail);
                break;
            case 2:
                html="只需888元/年";
                huiyuan="白银";
                getUl(silvertitle,silverdetail);
                break;
            case 3:
                html="只需2888元/年";
                huiyuan="黄金";
                getUl(goldtitle,golddetail);  
                break;
            case 4:
                html="只需8888元/年";
                huiyuan="铂金";
                getUl(platinumtitle,platinumdetail);
                break;
            default:
                break;
        }
        $('.dycmemberrule-bottom s').html(huiyuan);
        $('.dycmemberrule-bottom b').html(html);
        $("#dycprivilege").mCustomScrollbar();
    });
    var commontitle=["课程预约","学习工具","课程试看"];
    var commondetail=["大讲堂每周课表一份","课程学习工具免费试用一天","课程免费试看一天"];
    var silvertitle=["课程预约","学习工具","大讲堂","非农技术分析","播米公开课","初级投资课程","EIA技术分析"];
    var silverdetail=["大讲堂每周课表一份","课程学习工具免费使用","大讲堂免费观看","每月非农技术分析一份","播米公开课免费观看"
        ,"赠送初级投资课程一份","每周EIA技术分析一份"];
    var goldtitle=["课程预约","学习工具","大讲堂","非农技术分析","播米公开课","初级课程","EIA技术分析","中级课程",
        "日内短线技术分析","股票、汇市策略解读（专家篇）2选1"];
    var golddetail=["大讲堂每周课表一份","课程学习工具免费使用","大讲堂免费观看","每月非农技术分析一份","播米公开课免费观看",
        "赠送初级投资课程一份","每周EIA技术分析一份","赠送中级晋升课程一份","每日短线技术分析一份","股票、汇市策略每天不断更新"];
    var platinumtitle=["课程预约","学习工具","大讲堂","非农技术分析","播米公开课","初级课程","EIA技术分析","中级课程",
        "日内短线技术分析","中长线技术分析","高级课程","商学院系列学习","股票策略解读（专家篇）",
        "产品策略","汇市策略解读（专家篇）"];
    var platinumdetail=["大讲堂每周课表一份","课程学习工具免费使用","大讲堂免费观看","每月非农技术分析一份","播米公开课免费观看",
        "赠送初级投资课程一份","每周EIA技术分析一份","赠送中级晋升课程一份","每日短线技术分析一份",
        "每周中长线技术分析一份","赠送高级投资课程一份","深度学习商学院系列技术课程","股票策略每天不断更新","定制产品策略解读","汇市策略每天不断更新"];
    function getUl(title,detail) {
        var $ul=$('<ul></ul>');
        for(var i=0;i<title.length;i++){
            var $li=$('<li><span></span><div class="dycbox"><h4>'+ title[i] +'</h4><h6>'+ detail[i] +'</h6></div></li>')
            $ul.append($li);
        }
        $('.dycprivilege').html($ul);
    }
    getUl(commontitle,commondetail);
   
}
// 助理专题页面
function assistant() {
    new Vue({
        el:"#dycnewbieguide",
        data: {
            newbieguide:[]//新手指南
        },
        filters: {
            addRoute: function (img) {
                return ROUTEFILE + img;
            },
            addVideoRoute: function addVideoRoute(id) {
                return "encyclopediadetail.html?ecId=" +id;
            }
        },
        mounted: function () { //1.0ready --> 2.0
            var _this = this;
            this.$nextTick(function () {
                _this.getNewbieGuide();
            })
        },
        methods: {
            getNewbieGuide:function () {
                var _this = this;
                this.$http.post(ROUTE + "Course.ashx?action=getFinancialKnowledge", {
                    type:'uptodate',
                    pageIndex:1,
                    pageSize:10,
                    courseTypeId:16
                }, {
                    emulateJSON: true
                }).then(function(res) {
                    _this.newbieguide = res.body.rows;
                    console.log(_this.newbieguide)
                }).then(function () {
                    var swiper2 = new Swiper('.bb', {
                        nextButton: '.bb1',
                        prevButton: '.bb2',
                        slidesPerView: 3,
                        spaceBetween: 10
                    });
                })
            }
        }

    })
    new Vue({
        el:"#dycbomiencyclopedias",
        data: {
            bomiencyclopedias:[]//金融小知识
        },
        filters: {
            addRoute: function (img) {
                return ROUTEFILE + img;
            },
            addVideoRoute: function addVideoRoute(id) {
                return "encyclopediadetail.html?ecId=" +id;
            }
        },
        mounted: function () { //1.0ready --> 2.0
            var _this = this;
            this.$nextTick(function () {
                _this.getbomiencyclopedias();
            })
        },
        methods: {
            getbomiencyclopedias:function () {
                var _this = this;
                this.$http.post(ROUTE + "Course.ashx?action=getFinancialKnowledge", {
                    type:'uptodate',
                    pageIndex:1,
                    pageSize:10,
                    courseTypeId:15
                }, {
                    emulateJSON: true
                }).then(function(res) {
                    _this.bomiencyclopedias = res.body.rows;
                    console.log(_this.bomiencyclopedias)
                }).then(function () {
                    var swiper3 = new Swiper('.cc', {
                        nextButton: '.cc1',
                        prevButton: '.cc2',
                        slidesPerView: 3,
                        spaceBetween: 20
                    });
                })
            }
        }

    })
}
// 图片放大 缩小功能
function showPhoto(obj){
    var $pop=$("<div class='dycpop'><b>×</b><i class='uk-icon-minus'></i><s class='uk-icon-plus'></s></div>");
    // var src=$(obj).find('img').attr("src");
    var src=$(obj).attr("src");
    var pheight=$(window).height()-80;
    var pwidth=$(window).width();
    var $img=$('<div style="width:'+ pwidth +'px;height:'+ pheight +'px;overflow: scroll;margin-top: 80px;position: relative"><img src="'+ src +'"/></div>');
    $pop.append($img);
    $('body').append($pop);
    $pop.on('click','b',function () {
        $pop.remove();
    });
    // 放大
    $pop.on('click','s',function () {
        var img=$(this).parent().find('img');
        if(img.width()<=pwidth-100){
            var owidth=img.width()+ 100;
            var oheight=img.height()+ 100/img.width()*img.height();
            img.width(owidth);
            img.height(oheight);
            $('.dycpop img').css({'marginLeft':-owidth/2,'marginTop':-oheight/2});
        }else{
            layer.msg('不能再放大了！');
        }
    });
    // 缩小
    $pop.on('click','i',function () {
        var img=$(this).parent().find('img');
        if(img.width()>=300){
            var owidth=img.width()- 100;
            var oheight=img.height()- 100/img.width()*img.height();
            img.width(owidth);
            img.height(oheight);
            $('.dycpop img').css({'marginLeft':-owidth/2,'marginTop':-oheight/2});
        }else{
            layer.msg('不能再缩小了！');
        }
    });
    var height=$('.dycpop img').height();
    var width=$('.dycpop img').width();
    $('.dycpop img').css({'marginLeft':-width/2,'marginTop':-height/2});
}