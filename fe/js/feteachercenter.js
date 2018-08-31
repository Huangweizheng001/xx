/**
 * Created by Administrator on 2017/9/7 0007.
 */
// 老师头部
Vue.component('teacher-header-template', {
    template: '<div><div class="fe-header-top-bar">' + '<div class="container">' + '<a class="fe-header-top-logo wow slideInLeft" v-bind:href="index | addRoot">' + '<img v-bind:src="smallLogo | addRoot" alt="福建教育网" />' + '</a>' + '<a href="#this">App 下载</a>' + '<div class="fe-header-top-other">' + '<a v-show="!isLogined" v-bind:href="login| addRoot" @click="setPrePage">登录</a>' + '<a v-show="!isLogined" v-bind:href="reg| addRoot" @click="setPrePage">&nbsp;/&nbsp;注册</a>' + '<a v-show="isLogined"  v-bind:href="member | addRoot" >{{nickName}}</a>' + '<a v-show="isLogined" @click="signOut">&nbsp;/&nbsp;退出</a>' + '</div>' + '</div>' + '</div>' + '<div class="container">' + '<div class="fe-header-content-bar">' + '<div class="fe-header-search-bar" style="padding-bottom: 30px">' + '<a class="fe-header-search-logo wow slideInLeft" v-bind:href="index | addRoot">' + '<img v-bind:src="logo | addRoot"  alt="福建教育网" /></a>'+'<h1 class="feteachercenterhead">老师个人中心</h1>' + '</div>' + '</div></div>',
    data: function data() {
        return {
            isLogined: false,
            searchType: 1, //1 课程 2：老师 3：机构
            searchValue: '',
            nickName: '',
            index: 'index.html',
            login: 'login.html',
            reg: 'login.html?login=3',
            member: 'teachercenter.html',
            message: 'messagecenter.html',
            shoppingcar: 'shoppingcar.html',
            smallLogo: 'images/public/logo-icon-small.png',
            logo: 'images/public/logo-front-icon.jpg'
        };
    },
    mounted: function mounted() {
        //1.0ready --> 2.0
        this.$nextTick(function() {
            //初始化
            this.initData();
        });
    },
    filters: {
        addRoot: function addRoot(obj) {
            return ROOT + obj;
        }
    },
    methods: {
        initData: function initData() {
            if($(window).storager({
                    key: 'feUid'
                }).readStorage() == undefined) {
                this.isLogined = false;
            } else {
                this.isLogined = true;
                this.nickName = $(window).storager({
                    key: 'feUNickName'
                }).readStorage();
            }
        },
        signOut: function signOut() {
            $(window).storager({
                key: 'feUid'
            }).removeStorage();
            $(window).storager({
                key: 'feUNickName'
            }).removeStorage();
            window.location.reload();
        },
        setPrePage: function setPrePage() {
            $(window).storager({ //fePrePage
                key: 'fePrePage',
                // value: $.getBasePath(1),
                value:'index.html',
                expires: 0
            }).addStorage();
        }
    }
});
var header = new Vue({
    el: '#header'
});
// 老师左侧栏
Vue.component('teacher-left-template', {
    template:   '<div class="feteacherpersonalcenter-left">' +
        '<div class="feteacherpersonalcenter-left-head">' +
            '<form action="" id="membercenter">' +
                '<div class="feimage">' +
                    '<img src="images/temp/teachercenter-1.jpg">'+
                '</div>'+
                '<div class="feteacher-picture">' +
                    '<img v-bind:src="headimg|addRootFile">'+
                    '<input type="file" id="mytx" name="mphoto">'+
                '</div>'+
                '<h1>{{teacherName}}</h1>'+
                '<h2>暂无身份认证,<a>马上去认证</a></h2>'+
            '</form>'+
        '</div>' +
        '<ul class="feteacherpersonalcenter-left-content">' +
            '<li v-cloak v-for="item in list">' +
                '<a>' +
                    '<i :class="item.icon"></i>'+
                     '<span>{{item.parent}}</span>' +
                '</a>' +
                '<ul class="fechild">' +
                    '<li v-cloak v-for="i in item.children">' +
                        '<a v-bind:href="i.href">{{i.name}}</a>' +
                    '</li>' +
                '</ul>'+
             '</li>'+
        '</ul>'+
    '</div>',
    data: function data() {
        return {
            headimg:'images/temp/mr-tx.png',
            teacherName:"XXX",
            list:[
                {
                    icon:"uk-icon-user",
                    parent:"个人设置",
                    children:[
                        {
                            href:"teachercenterpersonaldata.html",
                            name:"个人资料"
                        },
                        {
                            href:"teachercenterauthsetting.html",
                            name:"认证设置"
                        }
                    ]
                },
                {
                    icon:"uk-icon-book",
                    parent:"我的课程",
                    children:[
                        {
                            href:"teachercenterlivecourse.html",
                            name:"直播课"
                        },
                        {
                            href:"teachercenterrecordedcourse.html",
                            name:"录播课"
                        }
                    ]
                },
                {
                    icon:"uk-icon-institution",
                    parent:"主页管理",
                    children:[
                        {
                            href:"teachercenterupdatedata.html",
                            name:"资料上传"
                        },
                        {
                            href:"teachercentervideophoto.html",
                            name:"视频/照片"
                        }
                    ]
                },
                {
                    icon:"uk-icon-graduation-cap",
                    parent:"学生管理",
                    children:[
                        {
                            href:"teachercentercreateclass.html",
                            name:'班级管理'
                        },
                        {
                            href:"teachercenterfamily.html",
                            name:'家校互动'
                        },
                        {
                            href:"teachercenterarrangetask.html",
                            name:"布置作业"
                        }
                    ]
                },
                {
                    icon:"uk-icon-desktop",
                    parent:"名师工作室",
                    children:[
                        {
                            href:"teachercentermystudio.html",
                            name:"我的工作室"
                        },
                        {
                            href:"teachercenterjoinedstudio.html",
                            name:"已加入工作室"
                        }
                    ]
                },
                {
                    icon:"uk-icon-rmb",
                    parent:"交易中心",
                    children:[
                        {
                            href:"teachercenterorder.html",
                            name:"订单管理"
                        }
                    ]
                },
                {
                    icon:"uk-icon-envelope-o",
                    parent:"消息管理",
                    children:[
                        {
                            href:"teachercenteransweringreply.html",
                            name:"我的消息"
                        }
                    ]
                }
            ]
        };
    },
    mounted: function mounted() {
        //1.0ready --> 2.0
        this.$nextTick(function() {
            //初始化
            this.addActive();
            this.changeTx();
        });
    },
    filters: {
        addRoot: function addRoot(obj) {
            return ROOT + obj;
        },
        addRootFile: function addRootFile(obj) {
            return SERVERROOTFILE + obj;
        }
    },
    methods: {
        addActive: function addActive() {
            this.headimg = $(window).storager({
                key: 'feUIcon'
            }).readStorage();
            this.teacherName = $(window).storager({
                key: 'feUNickName'
            }).readStorage();
            var url = window.location.pathname.split('/');
            // console.log(url[url.length - 1]);
            var currentUrl = url[url.length - 1];
            $('.feteacherpersonalcenter-left-content .fechild li a').removeClass('active');
            $('.feteacherpersonalcenter-left-content .fechild li a[href$="' + currentUrl + '"]').addClass('active');
        },
        changeTx:function changeTx() {
            $('.feteacherpersonalcenter-left-head').on('change','#mytx',function () {
                var teacherId=$(window).storager({key: 'feUid'}).readStorage();
                if($(this).val().match( /.jpg|.gif|.png|.bmp/i)) {
                    var data = new FormData($('#membercenter')[0]);
                    data.append('teacherId',teacherId);
                    $.ajax({
                        url: SERVERROOTDATA+"Teacher.ashx?action=SaveTeacherHead",
                        type: "POST",
                        data: data,
                        processData: false,  // 告诉jQuery不要去处理发送的数据
                        contentType: false,   // 告诉jQuery不要去设置Content-Type请求头
                        success:function (res) {
                            var data = JSON.parse(res);
                            console.log(data);
                            if(data==200){
                                $.ajax({
                                    url: SERVERROOTDATA+"Teacher.ashx?action=getTeacherById",
                                    type: "POST",
                                    data: {"teacherId":teacherId},
                                    // processData: false,  // 告诉jQuery不要去处理发送的数据
                                    // contentType: false,   // 告诉jQuery不要去设置Content-Type请求头
                                    success:function (res) {
                                        var data = JSON.parse(res);
                                        if(data.length<1){
                                            return false
                                        }else{
                                            window.localStorage.setItem("feUIcon",data[0].iconPath);
                                        }
                                    }
                                });
                            }else{
                                layer.msg('保存数据失败！');
                                // setTimeout(function(){window.location.reload()},1000);
                            }
                        }
                    });
                    var dom = $(this).prev();
                    upload(this, dom);
                }else{
                    layer.msg("对不起，系统仅支持标准格式的照片，请您调整格式后重新上传，谢谢 !");
                }
            });
        }
    }
});
var leftTaside = new Vue({
    el: '#leftaside'
});


if($(window).storager({ key: 'feUid' }).readStorage()=='undefined'){
    window.location.href = "http://www.fetv.cn/feweb/login.html";
}else{
    var teacherId=$(window).storager({key: 'feUid'}).readStorage();
    // $('.feteacherpersonalcenter-left-head h1').html($(window).storager({key: 'feUNickName'}).readStorage());
    // $.ajax({
    //     url: SERVERROOTDATA+"Teacher.ashx?action=getTeacherById",
    //     type: "POST",
    //     data: {"teacherId":teacherId},
    //     // processData: false,  // 告诉jQuery不要去处理发送的数据
    //     // contentType: false,   // 告诉jQuery不要去设置Content-Type请求头
    //     success:function (res) {
    //         var data = JSON.parse(res);
    //         console.log(data);
    //         if(data.length<1){
    //             return false
    //         }else{
    //             $('.feteacherpersonalcenter-left-head .feteacher-picture img').attr('src',SERVERROOTFILE + data[0].iconPath);
    //         }
    //     }
    // });
}
// 老师个人中心-左边跳转
// $('.feteacherpersonalcenter-left-content .fechild').on('click','li a',function () {
//     $('.feteacherpersonalcenter-left-content').find('.fechild a').removeClass('active');
//     $(this).addClass('active');
// });
// 更换头像
// $('.feteacherpersonalcenter-left-head').on('change','#mytx',function () {
//     if($(this).val().match( /.jpg|.gif|.png|.bmp/i)) {
//         var data = new FormData($('#membercenter')[0]);
//         data.append('teacherId',teacherId);
//         console.log(22)
//         $.ajax({
//             url: SERVERROOTDATA+"Teacher.ashx?action=SaveTeacherHead",
//             type: "POST",
//             data: data,
//             processData: false,  // 告诉jQuery不要去处理发送的数据
//             contentType: false,   // 告诉jQuery不要去设置Content-Type请求头
//             success:function (res) {
//                 console.log(res);
//                 if(res==200){
//
//                 }else{
//                     layer.msg('保存数据失败！');
//                     // setTimeout(function(){window.location.reload()},1000);
//                 }
//             }
//         });
//         var dom = $(this).prev();
//         upload(this, dom);
//     }else{
//         layer.msg("对不起，系统仅支持标准格式的照片，请您调整格式后重新上传，谢谢 !");
//     }
// });
// 判断是否为空
function isEmpty(str){
    var reg = /\S+/;
    return reg.test(str);
}
// 判断是否符合邮箱规则
function isEmail(str){
    var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
    return reg.test(str);
}
// 判断是否符合手机号码规则
function isPhone(str){
    var reg = /^1[34578]\d{9}$/;
    return reg.test(str);
}
// 判断是否符合QQ规则
function isQQ(str){
    var reg = /^[1-9][0-9]{4,14}$/;
    return reg.test(str);
}
// 验证身份证
function validateIdCard(idCard){
    //15位和18位身份证号码的正则表达式
    var regIdCard=/^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;

    //如果通过该验证，说明身份证格式正确，但准确性还需计算
    if(regIdCard.test(idCard)){
        if(idCard.length==18){
            var idCardWi=new Array( 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ); //将前17位加权因子保存在数组里
            var idCardY=new Array( 1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2 ); //这是除以11后，可能产生的11位余数、验证码，也保存成数组
            var idCardWiSum=0; //用来保存前17位各自乖以加权因子后的总和
            for(var i=0;i<17;i++){
                idCardWiSum+=idCard.substring(i,i+1)*idCardWi[i];
            }

            var idCardMod=idCardWiSum%11;//计算出校验码所在数组的位置
            var idCardLast=idCard.substring(17);//得到最后一位身份证号码

            //如果等于2，则说明校验码是10，身份证号码最后一位应该是X
            if(idCardMod==2){
                if(idCardLast=="X"||idCardLast=="x"){
                    return true;
                }else{
                    return false;
                }
            }else{
                //用计算出的验证码与最后一位身份证号码匹配，如果一致，说明通过，否则是无效的身份证号码
                if(idCardLast==idCardY[idCardMod]){
                    return true;
                }else{
                    return false;
                }
            }
        }
    }else{
        return false;
    }
}
// 判断是否为空对象
function isEmptyObject(e) {
    var t;
    for (t in e)
        return !1;
    return !0
}
//上传图像，并显示图像
//c:点击节点，即点击input type=fille 后内容存贮
//d:存贮图像的节点
var upload = function (c, d) {
    console.log(555);
    var $file = $(c);
    var fileObj = $file[0];
    var windowURL = window.URL || window.webkitURL;
    var dataURL;
    var $img = $(d);

    if(fileObj && fileObj.files && fileObj.files[0]){
        dataURL = windowURL.createObjectURL(fileObj.files[0]);
        $img.attr('src',dataURL);
        // console.log(dataURL);
    }else{
        dataURL = $file.val();
        var imgObj = document.querySelector(d);
        // 两个坑:
        // 1、在设置filter属性时，元素必须已经存在在DOM树中，动态创建的Node，也需要在设置属性前加入到DOM中，先设置属性在加入，无效；
        // 2、src属性需要像下面的方式添加，上面的两种方式添加，无效；
        imgObj.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)";
        imgObj.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = dataURL;
        // console.log(dataURL);
    }
};
// 老师个人中心-个人资料
function personalsetting(teacherId) {
    // 预览主页
    $('.feteacherpersonalcenter-right-head a:contains("预览主页")').attr('href',ROOT+"teacherindex.html?teacherId="+teacherId);
    var opts='';
    for(var i=1;i<=30;i++){
        opts+='<option value="'+i+'">'+i+'年</option>';
    }
    $('#seniority').html(opts);//追加教龄option
    // 获取初始值
    $.ajax({//基本信息
        url: SERVERROOTDATA+"Teacher.ashx?action=getTeacherBasicInfoById",
        type: "POST",
        data: {teacherId:teacherId},
        success:function (res) {
            var data = JSON.parse(res);
            if(data.length<1){

            }else {// 初始化基本信息
                $('#username').val(data[0].name);
                $('#nickname').val(data[0].nickName);
                if (data[0].sex == '0') {
                    $('#male').prop('checked', 'true');
                    $('#female').prop('checked', '');
                    $('#male').prev().html('男');
                } else {
                    $('#male').prop('checked', '');
                    $('#female').prop('checked', 'true');
                    $('#male').prev().html('女');
                }
                $('#information .fetextarea').html(data[0].introduce);
            }
        }
    });
    $.ajax({//联系方式
        url: SERVERROOTDATA+"Teacher.ashx?action=getTeacherContactInfoById&teacherId",
        type: "POST",
        data: {teacherId:teacherId},
        success:function (res) {
            var data = JSON.parse(res);
            if(data.length<1){

            }else {// 初始化联系方式
                $('#email').val(data[0].email);
                $('#phone').val(data[0].mobile);
                $('#qq').val(data[0].qq);
            }
        }
    });
    $.ajax({//背景资料
        url: SERVERROOTDATA+"Teacher.ashx?action=getTeacherBackgroundInfoById",
        type: "POST",
        data: {teacherId:teacherId},
        success:function (res) {
            var data = JSON.parse(res);
            if(data.length<1){

            }else{
                // 初始化背景资料
                if(data[0].ofSchoolAge==undefined||data[0].ofSchoolAge=='undefined'){
                    $('#seniority').prev().html();
                }else{
                    $('#seniority').prev().html(data[0].ofSchoolAge+'年');
                }
                $.each($('#seniority option'),function (i,j) {
                    if($(j).val()==data[0].ofSchoolAge){
                        $(j).prop('selected','true');
                    }else {
                        $(j).prop('selected','');
                    }
                });
                if(data[0].educationalLevelName==undefined||data[0].ofSchoolAge=='undefined'){
                    $('#Teachingsubject i').html();
                }else{
                    $('#Teachingsubject i').html(data[0].educationalLevelName+'/'+data[0].gradeName+'/'+data[0].subjectName);
                }
                var period=$('#period option');
                for(var i=0;i<period.length;i++){//学段
                    if($(period[i]).val()==data[0].educationalLevelId){
                        $(period[i]).prop('selected','true');
                    }else{
                        $(period[i]).prop('selected','');
                    }
                }
                var grade=$('#grade option');
                for(var i=0;i<grade.length;i++){//年级
                    if($(grade[i]).val()==data[0].gradeId){
                        $(grade[i]).prop('selected','true');
                    }else{
                        $(grade[i]).prop('selected','');
                    }
                }
                var subject=$('#subject option');
                for(var i=0;i<subject.length;i++){//学科
                    if($(subject[i]).val()==data[0].subjectId){
                        $(subject[i]).prop('selected','true');
                    }else{
                        $(subject[i]).prop('selected','');
                    }
                }
            }
            teachingsubject();//动态加载教学课程下拉框
        }
    });
    $.ajax({//过往经历
        url: SERVERROOTDATA+"Teacher.ashx?action=getTeachingProcessByTeacherId",
        type: "POST",
        data: {teacherId:teacherId},
        success:function (res) {
            var data = JSON.parse(res);
            if(data.length<1||isEmptyObject(data[0])){

            }else{//初始化过往经历
                for(var i=0;i<data.length;i++){
                    var beginDate=parseInt(data[i].beginYear)+'年'+parseInt(data[i].beginMonth)+'月';
                    var endDate=parseInt(data[i].endYear)+'年'+parseInt(data[i].endMonth)+'月';
                    addPastthingData(beginDate,endDate,data[i].experience,data[i].teachingProcessId);
                }
            }
        }
    });
    // 获取教学科目选择下拉
    function teachingsubject() {
        new Vue({
            el: "#Teachingsubject",
            data: {
                educationalLevel:[],
                grade:[],
                subject:[],
                educationalLevelId:'',
                gradeId:'',
                subjectId:''
            },
            mounted:function () {
                var _this=this;
                this.$nextTick(function () {
                    _this.getselect();
                })
            },
            methods: {
                getselect:function () {
                    var _this = this;
                    // 学段
                    this.$http.post(SERVERROOTDATA + "EducationalLevel.ashx?action=getEducationalLevel",
                        {
                            organId:''
                        }
                        ,{emulateJSON: true})
                        .then(function (res) {
                            _this.educationalLevel = res.body;
                        }).then(function () {
                        // var doms=$('#period option');
                        // for(var i=0;i<doms.length;i++){
                        //     if($(doms[i]).val()==obj.educationalLevelId){
                        //         $(doms[i]).prop('selected','true');
                        //     }else{
                        //         $(doms[i]).prop('selected','');
                        //     }
                        // }
                    }).then(function () {
                        $('#period').on('change',function () {
                            _this.educationalLevelId=$('#period').val();
                            _this.gradeId='';
                            _this.subjectId='';
                            _this.$http.post(SERVERROOTDATA + "Grade.ashx?action=getGrade",
                                {
                                    educationalLevelId:$('#period').val()
                                }
                                ,{emulateJSON: true})
                                .then(function (res) {
                                    _this.grade = res.body;
                                })
                        })
                    })
                    // 年级
                    this.$http.post(SERVERROOTDATA + "Grade.ashx?action=getGrade",
                        {
                            educationalLevelId:$('#period').val()
                        },
                        {emulateJSON: true})
                        .then(function (res) {
                            _this.grade = res.body;
                        }).then(function () {
                        // var doms=$('#grade option');
                        // for(var i=0;i<doms.length;i++){
                        //     if($(doms[i]).val()==obj.gradeId){
                        //         $(doms[i]).prop('selected','true');
                        //     }else{
                        //         $(doms[i]).prop('selected','');
                        //     }
                        // }
                    }).then(function () {
                        $('#grade').on('change',function () {
                            _this.gradeId=$('#grade').val();
                            _this.subjectId='';
                            _this.$http.post(SERVERROOTDATA + "Subject.ashx?action=getSubject",
                                {
                                    educationalLevelId:$('#period').val(),
                                    gradeId:$('#grade').val()
                                }
                                ,{emulateJSON: true})
                                .then(function (res) {
                                    console.log('哈哈');
                                    _this.subject = res.body;
                                })
                        })
                    })
                    // 学科
                    this.$http.post(SERVERROOTDATA + "Subject.ashx?action=getSubject",
                        {
                            educationalLevelId:$('#period').val(),
                            gradeId:$('#grade').val()
                        }
                        ,{emulateJSON: true})
                        .then(function (res) {
                            _this.subject = res.body;
                        }).then(function () {
                        // var doms=$('#subject option');
                        // // console.log(obj.grade);
                        // for(var i=0;i<doms.length;i++){
                        //     if($(doms[i]).val()==obj.subjectId){
                        //         $(doms[i]).prop('selected','true');
                        //     }else{
                        //         $(doms[i]).prop('selected','');
                        //     }
                        // }
                    }).then(function () {
                        $('#subject').on('change',function () {
                            _this.subjectId=$('#subject').val();
                        })
                    })
                }
            }
        });
    }
    // 基本信息-编辑按钮事件
    $('#information').on('click','.fepersonaldata-title span',function () {
        if(!$(this).hasClass('active')){
            $(this).addClass('active');
            $('#information input[type="text"]').prop('disabled','');
            $('#information i').css('display','none');
            $('#information input[type="radio"]').removeClass('fehidden');
            $('#information label').removeClass('fehidden');
            $('#information .fetextarea').attr('contentEditable','true').addClass('feedit');
            $('#information .feoperation').removeClass('fehidden');
        }else{
        }
    });
    // 基本信息-取消按钮事件
    $('#information .feoperation').on('click','a:last-child',function () {
        window.location.reload();
    });
    // 基本信息-保存按钮事件
    $('#information .feoperation').on('click','a:first-child',function () {
        if(!isEmpty($('#username').val())){
            layer.msg('姓名不能为空！');
            return;
        }else{
            if($('#information input[type="radio"]:checked').length<1){
                layer.msg('请选择你的性别');
                return;
            }else {
                if(!isEmpty($('#information .fetextarea').text())){
                    layer.msg('自我介绍不能为空！');
                    return;
                }else {
                    // 保存数据
                    var intro=$('#information .fetextarea').text();
                    // $('#information i').html(sexvalue);
                    var data = new FormData($('#information-form')[0]);
                    data.append('teacherId',teacherId);
                    data.append("introduce",intro);
                    data.append('saveTag','update');
                    $.ajax({
                        url: SERVERROOTDATA+"Teacher.ashx?action=teacherBasicInfoSave",
                        type: "POST",
                        data: data,
                        processData: false,  // 告诉jQuery不要去处理发送的数据
                        contentType: false,   // 告诉jQuery不要去设置Content-Type请求头
                        success:function (res) {
                            console.log(res);
                            if(res==200){
                                var sex=$('#information input[type=radio]:checked').val();
                                console.log(sex);
                                if(sex=='0'){
                                    $('#information #male').prev().html('男');
                                }else{
                                    $('#information #male').prev().html('女');
                                }
                            }else{
                                layer.msg('保存数据失败！');
                                setTimeout(function(){window.location.reload()},1000);
                            }
                        }
                    });
                }
            }
        }
        // 改变样式
        $('#information .fepersonaldata-title>span').removeClass('active');
        $('#information input[type="text"]').prop('disabled','true');
        $('#information i').css('display','inline-black');
        $('#information input[type="radio"]').addClass('fehidden');
        $('#information label').addClass('fehidden');
        $('#information .fetextarea').attr('contentEditable','false').removeClass('feedit');
        $('#information .feoperation').addClass('fehidden');
    });
    // 联系方式-编辑按钮事件
    $('#contact').on('click','.fepersonaldata-title span',function () {
        if(!$(this).hasClass('active')){
            $(this).addClass('active');
            $('#contact input[type="text"]').prop('disabled','');
            $('#contact .feoperation').removeClass('fehidden');
        }else{
        }
    });
    // 联系方式-取消按钮事件
    $('#contact .feoperation').on('click','a:last-child',function () {
        window.location.reload();
    });
    // 联系方式-保存按钮事件
    $('#contact .feoperation').on('click','a:first-child',function () {
        if(!isEmail($('#email').val())){
            layer.msg('请输入正确的邮箱格式！');
            return;
        }else {
            if(!isPhone($('#phone').val())){
                layer.msg('请输入正确的手机号！');
                return;
            }else{
                if(!isQQ($('#qq').val())){
                    layer.msg('请输入正确的QQ号！');
                    return;
                }else {
                    // 保存数据
                    var data = new FormData($('#contact-form')[0]);
                    data.append('teacherId',teacherId);
                    data.append('saveTag','update');
                    $.ajax({
                        url: SERVERROOTDATA+"Teacher.ashx?action=teacherContactInfoSave",
                        type: "POST",
                        data: data,
                        processData: false,  // 告诉jQuery不要去处理发送的数据
                        contentType: false   // 告诉jQuery不要去设置Content-Type请求头
                    });
                }
            }
        }
        // 改变样式
        $('#contact .fepersonaldata-title>span').removeClass('active');
        $('#contact input[type="text"]').prop('disabled','true');
        $('#contact .feoperation').addClass('fehidden');
    });
    // 背景资料-编辑按钮事件
    $('#background').on('click','.fepersonaldata-title span',function () {
        if(!$(this).hasClass('active')){
            $(this).addClass('active');
            $('#background i').css('display','none');
            $('#background .fecompany').prop('disabled','');
            $('#background select').removeClass('fehidden');
            $('#background .feoperation').removeClass('fehidden');
        }else{
        }
    });
    // 背景资料-取消按钮事件
    $('#background .feoperation').on('click','a:last-child',function () {
        window.location.reload();
    });
    // 背景资料-保存按钮事件
    $('#background .feoperation').on('click','a:first-child',function () {
        if(!isEmpty($('#company').val())){
            layer.msg('单位/机构/学校 不能为空！');
            return;
        }else{
            // 保存数据
            var data = new FormData($('#background-form')[0]);
            data.append('teacherId',teacherId);
            data.append('saveTag','update');
            $.ajax({
                url: SERVERROOTDATA+"Teacher.ashx?action=teacherBackgroundInfoSave",
                type: "POST",
                data: data,
                processData: false,  // 告诉jQuery不要去处理发送的数据
                contentType: false,   // 告诉jQuery不要去设置Content-Type请求头
                success:function (res) {
                    if(res==200){
                        $('#background li:first-child i').html($('#background .feseniority option:selected').text());//教龄
                        var subject=[];
                        $.each($('#background .fesubject'),function (i,j) {
                            subject.push($(j).find('option:selected').html());
                        });
                        console.log(subject)
                        // 教学科目
                        $('#Teachingsubject i').html(subject.join('/'));
                    }else{
                        layer.msg('保存失败！');
                        setTimeout(function(){window.location.reload()},1000);
                    }
                }
            });
        }
        // 改变样式
        $('#background .fepersonaldata-title>span').removeClass('active');
        $('#background i').css('display','inline-block');
        $('#background .fecompany').prop('disabled','true');
        $('#background select').addClass('fehidden');
        $('#background .feoperation').addClass('fehidden');
    });
    var pastcontent='';//过往经历默认提示语句
    // 过往经历-添加按钮事件
    $('#pastthing').on('click','.fepersonaldata-title span',function () {
        $(this).parent().next().removeClass('fehidden');
        pastcontent=$('#pastthing .fetext').html();
    })
    // 过往经历-取消按钮事件
    $('#pastthing').on('click','.feoperation a:last-child',function () {
        window.location.reload();
    });
    // 日期比较
    function  compareDate(b_year,b_month,e_year,e_month) {
        var beginyear=parseInt($(b_year).val());
        var beginmonth=parseInt($(b_month).val());
        var endyear=parseInt($(e_year).val());
        var endmonth=parseInt($(e_month).val());
        if(beginyear<endyear){
            return true;
        }else if(beginyear==endyear){
            if(beginmonth<=endmonth){
                return true;
            }else {
                return false;
            }
        }else{
            return false;
        }
    }
    // 过往经历-保存按钮事件
    $('#pastthing').on('click','.feoperation a:first-child',function () {
        if(!compareDate('#beginyear','#beginmonth','#endyear','#endmonth')){
            layer.msg('开始时间不能大于结束时间！');
            return;
        }else {
            if(!isEmpty($('#pastthing .fetext').text())){
                layer.msg('过往经历不能为空！');
                return;
            }else{
                var beginDate=$('#beginyear').val()+'-'+$('#beginmonth').val()+'-01';
                var endDate=$('#endyear').val()+'-'+$('#endmonth').val()+'-01';
                console.log(beginDate);
                console.log(endDate);
                var experience=$('#pastthing .fetext').text();
                $.ajax({
                    url: SERVERROOTDATA+"Teacher.ashx?action=teachingProcessInfoSave",
                    type: "POST",
                    data: {teacherId:teacherId,beginDate:beginDate,endDate:endDate,saveTag:'add',experience:experience},
                    success:function (res) {
                        if(res==200){
                            layer.msg('保存成功！');
                            setTimeout(function(){window.location.reload()},1000);
                        }else{
                            layer.msg('保存失败！');
                        }
                    }
                });
            }
        }
        $(this).parent().parent().addClass('fehidden');
        $('#pastthing .fetext').html(pastcontent);
    })
    // 经历-删除按钮事件
    $('.fepastthing-content').on('click','li span',function () {
        var _this=this;
        layer.confirm('你确定要删除吗？', {
            btn: ['确定','取消'] //按钮
        }, function(){
            $.ajax({
                url: SERVERROOTDATA+"Teacher.ashx?action=teachingProcessInfoSave",
                type: "POST",
                data: {teachingProcessId:$(_this).data('id'),teacherId:teacherId,saveTag:'delete'},
                success:function (res) {
                    if(res==200){
                        $(_this).parent().parent().remove();
                        layer.msg('删除成功！', {icon: 1});
                    }
                }
            });
        }, function(){

        });
    });
    var relevantcasecontent='';//相关案例
    // 相关案例-添加按钮事件
    $('#relevantcase').on('click','.fepersonaldata-title span',function () {
        $(this).parent().next().removeClass('fehidden');
        relevantcasecontent=$('#relevantcase .fehistory .fetext').html();
    })
    // 相关案例-取消按钮事件
    $('#relevantcase').on('click','.feoperation a:last-child',function () {
        // $(this).parent().parent().addClass('fehidden');
        window.location.reload();
    })
    // 相关案例-保存按钮事件
    $('#relevantcase').on('click','.feoperation a:first-child',function () {
        if(!isEmpty($('#casename').val())){
            layer.msg('案例名称不能为空！');
            return;
        }else{
            if(!isEmpty($('#relevantcase .fetext').text())){
                layer.msg('相关案例不能为空!');
                return;
            }else{
                var data = new FormData($('#relevantcase-form')[0]);
                var experience=$('#relevantcase .fetext').text();
                data.append('experience',experience);
                $.ajax({
                    url: "data/grade.php",
                    type: "POST",
                    data: data,
                    processData: false,  // 告诉jQuery不要去处理发送的数据
                    contentType: false   // 告诉jQuery不要去设置Content-Type请求头
                });
            }
        }
        $(this).parent().parent().addClass('fehidden');
        addRelevantcaseData();
        $('#relevantcase .fehistory .fetext').html(relevantcasecontent);
    });
    // 添加过往经历事件
    function addPastthingData(beginDate,endDate,experience,teachingProcessId) {
        // var pastthing_begin=$('#pastthing #beginyear option:selected').text()+$('#pastthing #beginmonth option:selected').text();
        // var pastthing_end=$('#pastthing #endyear option:selected').text()+$('#pastthing #endmonth option:selected').text();
        // var html=$('#pastthing .fetext').html();
        var $li=$('<li></li>');
        var $h1=$('<h1>'+beginDate+'  --  '+endDate+'<span data-id="'+teachingProcessId+'">删除</span></h1>');
        var $p=$('<p>'+experience+'</p>');
        $li.append($h1).append($p);
        $('#pastthing .fepastthing-content').append($li);
    }
    // 添加相关案例事件
    function addRelevantcaseData() {
        var title=$('#relevantcase .fehistory .febox input').val();
        var relevantcasedate=$('#relevantcase #dateyear option:selected').text()+$('#relevantcase #datemonth option:selected').text();
        var html=$('#relevantcase .fehistory .fetext').html();
        var $li=$('<li></li>');
        var $h1=$('<h1>'+relevantcasedate+'<s>'+title+'</s><span>删除</span></h1>');
        var $p=$('<p>'+html+'</p>');
        $li.append($h1).append($p);
        $('#relevantcase .fepastthing-content').append($li);
    }
}
// 视频/照片
function videophoto(teacherId) {
    // 预览主页
    $('.feteacherpersonalcenter-right-head a:contains("预览主页")').attr('href',ROOT+"teacherindex.html?teacherId="+teacherId);
    // 切换 照片/视频列表
    $('.fevideophoto .febox h1').on('click','span',function () {
        if(!$(this).hasClass('active')){
            $(this).addClass('active');
            $(this).siblings().removeClass('active');
            var val='添加'+$(this).html();
            $('.fevideophoto .febox p button').html('<i class="uk-icon-plus-circle"></i>'+val);
            if($(this).html()=='视频'){
                $('.fephotodetail').addClass('fehidden');
                $('.fevediodetail').removeClass('fehidden');
                // $('.fevideophoto>.febox>p>span').html('请将视频控制在1G之内，视频必须为你的原创作品。');
            }else{
                $('.fevediodetail').addClass('fehidden');
                $('.fephotodetail').removeClass('fehidden');
                // $('.fevideophoto>.febox>p>span').html('建议上传本人形象照、上课照片、与学生的合照以及教学环境，有助于让大家更好的了解你！');
            }
        }else{
        }
    });
    //显示视频
    function showvideo() {
        new Vue({
            el: "#showvideo",
            data: {
                videoArr:[],//视频
                showItem:4,//页码显示条数
                allpage:'',//总页数
                current:1//当前页
            },
            filters: {
                addRootFile: function addRootFile(img) {
                    return SERVERROOTFILE + img;
                }
            },
            mounted:function () {
                var _this=this;
                this.$nextTick(function () {
                    _this.getVideo(1);
                })
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
            methods: {
                getVideo:function (pageIndex) {
                    var _this=this;
                    this.$http.post(SERVERROOTDATA + "TeacherResource.ashx?action=getTeacherVideo",
                        {
                            teacherId:teacherId,
                            pageIndex:pageIndex,
                            pageSize:1
                        }
                        ,{emulateJSON: true})
                        .then(function (res) {
                            _this.videoArr = res.body.rows;
                            _this.allpage=res.body.totalPageCount;
                        }).then(function () {
                        $('.fevediodetail').on('click','.fepanel',function () {
                            var vid = $(this).data('vid');
                            layer.open({
                                type: 2,
                                //title: '播米往前公开课',
                                //closeBtn: 0, //不显示关闭按钮
                                shadeClose: true,
                                shade: [0.5, '#000'],
                                area: ['800px', '500px'],
                                //offset: 'rb', //右下角弹出
                                //time: 2000, //2秒后自动关闭
                                anim: 2,
                                content: 'windowvideo.html?videoId=' + vid
                            });
                        });
                    })
                },
                goto: function(index) { //枫叶处理
                    var _this=this;
                    if(index == this.current) return;
                    if(index > this.allpage) {
                        this.current = this.current - 2;
                        layer.msg("Sorry ╮(╯_╰)╭ 没有下一页喽！");
                        return false;
                    }
                    this.current = index;
                    _this.getVideo(_this.current);
                }
            }
        });
    }
    //显示照片
    function showphoto() {
        new Vue({
            el: "#showphoto",
            data: {
                photoArr:[],//照片
                showItem:4,//页码显示条数
                allpage:'',//总页数
                current:1//当前页
            },
            filters: {
                addRootFile: function addRootFile(img) {
                    return SERVERROOTFILE + img;
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
            mounted:function () {
                var _this=this;
                this.$nextTick(function () {
                    _this.getPhoto(1);
                })
            },
            methods: {
                getPhoto:function (pageIndex) {
                    var _this=this;
                    this.$http.post(SERVERROOTDATA + "TeacherResource.ashx?action=getTeacherPhoto",
                        {
                            teacherId:teacherId,
                            pageIndex:pageIndex,
                            pageSize:2
                        }
                        ,{emulateJSON: true})
                        .then(function (res) {
                            _this.photoArr = res.body.rows;
                            _this.allpage=res.body.totalPageCount;
                        }).then(function () {
                        $('.fephotodetail ').on('click','.fepanel',function () {
                            showPhoto($(this).find('img'));
                        })
                    })
                },
                goto: function(index) { //枫叶处理
                    var _this=this;
                    if(index == this.current) return;
                    if(index > this.allpage) {
                        this.current = this.current - 2;
                        layer.msg("Sorry ╮(╯_╰)╭ 没有下一页喽！");
                        return false;
                    }
                    this.current = index;
                    _this.getPhoto(_this.current);
                }
            }
        });
    }
    showvideo();
    showphoto();
    // 添加视频/照片
    // $('.fevideophoto .febox p').on('click','button',function () {
    //     var text=$('.fevideophoto .febox p button').text();
    //     if(text=='添加视频'){
    //         $('.fevideophoto .febox').addClass('fehidden');
    //         $('.fevideophoto .feteacherindex-photo').addClass('fehidden');
    //         $('.fevideophoto .feaddvideo').removeClass('fehidden');
    //         $('.feteacherpersonalcenter-right-head span:nth-child(3)').html('<i class="uk-icon-angle-right"></i>视频');
    //     }else{
    //         console.log('哈哈')
    //         $('.fevideophoto .febox').addClass('fehidden');
    //         $('.fevideophoto .feteacherindex-photo').addClass('fehidden');
    //         $('.fevideophoto .feaddphoto').removeClass('fehidden');
    //         $('.feteacherpersonalcenter-right-head span:nth-child(3)').html('<i class="uk-icon-angle-right"></i>照片');
    //     }
    // });
    // 上传图片
    // $('.feaddphoto>p>b').on('change','input',function () {
    //     if($(this).val()!=''){//防止ie下内容为空也触发事件
    //         if($(this).val().match( /.jpg|.gif|.png|.bmp/i)){
    //             var $panel=$('<div class="pop"></div>');
    //             var $content = $('<div class="pop-content"></div>');
    //             var title = $('<h2 class="title">上传照片</h2>');
    //             var close = $('<s>×</s>');
    //             close.on('click', function () {
    //                 $panel.remove();
    //             });
    //             title.append(close);
    //             $content.append(title);//添加标题
    //             var material=$('<div class="detail clearfix"><div class="continueadd"><div></div><h3>继续添加</h3>'+
    //                 '<input type="file"  id="btn-file" accept="image/png, image/jpeg, image/gif, image/jpg"/>'+'</div>' +
    //                 '<ul><li><form action="">' +
    //                 '<div><input type="file" value="'+$(this).val()+'" class="fehidden" name="photo"><img src="" alt="" height="170px" width="200px"><input type="text" name="title"></div>' +
    //                 '</form></li></ul></div>');
    //             material.on('change','input[type=file]',function () {
    //                 if($(this).val()!=''){//防止ie下内容为空也触发事件
    //                     if($(this).val().match( /.jpg|.gif|.png|.bmp/i)){
    //                         var file=$(this).val();
    //                         material.find('ul').prepend('<li><form action="">' +
    //                             '<div><input type="file" value="'+file+'" class="fehidden" name="photo"><img src="" alt="" height="170px" width="200px"><input type="text" name="title"></div>' +
    //                             '</form></li>');
    //                         upload(this,'.detail>ul>li:first-child div img');
    //                         $(this).val('');//添加完图片 清空input中value值，防止添加重复的图片，事件不触发
    //                     }else {
    //                         layer.msg("对不起，系统仅支持标准格式的照片，请您调整格式后重新上传，谢谢 !");
    //                     }
    //                 }else{}
    //             });
    //             var bottom=$('<div class="bottom-btn"><button>清空并退出</button><button>确定</button></div>');
    //             bottom.on('click','button:first-child',function () {
    //                 $('.detail ul li').remove();
    //                 $panel.remove();
    //             });
    //             bottom.on('click','button:last-child',function () {
    //                 for(var i=0;i<$('.detail ul li').length;i++){
    //                     var data = new FormData($('.detail ul li form')[i]);
    //                     $.ajax({
    //                         url: "data/grade.php",
    //                         type: "POST",
    //                         data: data,
    //                         processData: false,  // 告诉jQuery不要去处理发送的数据
    //                         contentType: false   // 告诉jQuery不要去设置Content-Type请求头
    //                     });
    //                 }
    //
    //                 $panel.remove();
    //             });
    //             $content.append(material);
    //             $content.append(bottom);
    //             $panel.append($content);
    //             $('body').append($panel);
    //             upload(this,'.detail>ul>li:last-child div img');
    //             $(this).val('');//添加完图片 清空input中value值，防止添加重复的图片，事件不触发
    //         }else {
    //             layer.msg("对不起，系统仅支持标准格式的照片，请您调整格式后重新上传，谢谢 !");
    //         }
    //     }else{}
    // });
    // 上传课程封面图片
    // $('.feaddphoto').on('change','#picture',function () {
    //     if($(this).val().match( /.jpg|.gif|.png|.bmp/i)) {
    //         var dom = $(this).prev();
    //         upload(this, dom);
    //     }else{
    //         layer.msg("对不起，系统仅支持标准格式的照片，请您调整格式后重新上传，谢谢 !");
    //     }
    //     // $(this).val('');
    // });
}
// 资料上传
function updatedata(teacherId) {
    // 预览主页
    $('.feteacherpersonalcenter-right-head a:contains("预览主页")').attr('href',ROOT+"teacherindex.html?teacherId="+teacherId);
    var type=$(this).getUrlParam("type");
    console.log(type);
    if(type=='文章'){
        $('.feupdatedata .febox h1 span:last-child').addClass('active');
        $('.feupdatedata .febox h1 span:nth-child(2)').removeClass('active');
        var val = '添加文章';
        $('.feupdatedata .febox p button').html('<i class="uk-icon-plus-circle"></i>' + val);
        $('#courseware').addClass('fehidden');
        $('#article').removeClass('fehidden');
    }else{
        console.log(22)
        $('.feupdatedata .febox h1 span:nth-child(2)').addClass('active');
        $('.feupdatedata .febox h1 span:last-child').removeClass('active');
        var val = '添加课件';
        $('.feupdatedata .febox p button').html('<i class="uk-icon-plus-circle"></i>' + val);
        $('#article').addClass('fehidden');
        $('#courseware').removeClass('fehidden');
    }
    // 切换 课件/文章列表
    $('.feupdatedata .febox h1').on('click', 'span', function () {
        if (!$(this).hasClass('active')) {
            window.location.href =ROOT+"teachercenterupdatedata.html?type="+$(this).html();
            // $(this).addClass('active');
            // $(this).siblings().removeClass('active');
            // var val = '添加' + $(this).html();
            // $('.feupdatedata .febox p button').html('<i class="uk-icon-plus-circle"></i>' + val);
            // if ($(this).html() == '课件') {
            //     $('#article').addClass('fehidden');
            //     $('#courseware').removeClass('fehidden');
            // } else {
            //     $('#courseware').addClass('fehidden');
            //     $('#article').removeClass('fehidden');
            // }
        } else {
        }
    });
    //显示课件列表
    function showcourseware() {
        new Vue({
            el: "#courseware",
            data: {
                coursewareArr:[]//课件
            },
            filters: {
                addRootFile: function addRootFile(img) {
                    return SERVERROOTFILE + img;
                }
            },
            mounted:function () {
                var _this=this;
                this.$nextTick(function () {
                    _this.getCourseware();
                })
            },
            methods: {
                getCourseware:function () {
                    var _this=this;
                    this.$http.post(SERVERROOTDATA + "TeacherResource.ashx?action=getTeacherResource",
                        {
                            teacherId:teacherId,
                            resourceType:'courseware',
                            pageIndex:1,
                            pageSize:10
                        }
                        ,{emulateJSON: true})
                        .then(function (res) {
                            console.log(res);

                            _this.coursewareArr = res.body.rows;
                        }).then(function () {
                            var _this=this;
                            $('#courseware .fepanel ul').on('click','li:first-child',function () {
                                window.location.href =ROOT+"updatecourseware.html?studioResourceId="+$(this).parent().data('id');
                            });
                            $('#courseware .fepanel ul').on('click','li:last-child',function () {
                                var _this=this;
                                var studioResourceId=$(_this).parent().data('id');
                                layer.confirm('你确定要删除吗？', {
                                    btn: ['确定','取消'] //按钮
                                }, function(){
                                    $.ajax({
                                        url: SERVERROOTDATA+"TeacherResource.ashx?action=teacherResourceSave",
                                        type: "POST",
                                        data: {saveTag:'delete',studioResourceId:studioResourceId},
                                        success:function (res) {
                                            if(res==200){
                                                layer.msg('删除成功！', {icon: 1});
                                                setTimeout(function () {
                                                    window.location.href =ROOT+"teachercenterupdatedata.html?type=课件";
                                                },1000)
                                            }
                                        }
                                    });
                                }, function(){
                                });
                            });
                    })
                }
            }
        });
    }
    //显示文章列表
    function showarticle() {
        new Vue({
            el: "#article",
            data: {
                articleArr:[]//课件
            },
            filters: {
                addRootFile: function addRootFile(img) {
                    return SERVERROOTFILE + img;
                }
            },
            mounted:function () {
                var _this=this;
                this.$nextTick(function () {
                    _this.getArticle();
                })
            },
            methods: {
                getArticle:function () {
                    var _this=this;
                    this.$http.post(SERVERROOTDATA + "TeacherResource.ashx?action=getTeacherResource",
                        {
                            teacherId:teacherId,
                            resourceType:'article',
                            pageIndex:1,
                            pageSize:10
                        }
                        ,{emulateJSON: true})
                        .then(function (res) {
                            _this.articleArr = res.body.rows;
                        }).then(function () {
                            var _this=this;
                            $('#article .fepanel ul').on('click','li:first-child',function () {
                                window.location.href =ROOT+"updatearticle.html?articleId="+$(this).parent().data('id');
                            });
                            $('#article .fepanel ul').on('click','li:last-child',function () {
                                var _this=this;
                                var articleId=$(_this).parent().data('id');
                                layer.confirm('你确定要删除吗？', {
                                    btn: ['确定','取消'] //按钮
                                }, function(){
                                    $.ajax({
                                        url: SERVERROOTDATA+"Article.ashx?action=articleSave",
                                        type: "POST",
                                        data: {saveTag:'delete',articleId:articleId},
                                        success:function (res) {
                                            if(res==200){
                                                layer.msg('删除成功！', {icon: 1});
                                                setTimeout(function () {
                                                    window.location.href =ROOT+"teachercenterupdatedata.html?type=文章";
                                                },1000)
                                            }
                                        }
                                    });
                                }, function(){
                                });
                            });
                    })
                }
            }
        });
    }
    showcourseware();
    showarticle();
    // 添加课件/文章详情页面显示
    $('.feupdatedata .febox p').on('click','button',function () {
        var text=$('.feupdatedata .febox p button').text();
        if(text=='添加课件'){
            window.location.href =ROOT+"updatecourseware.html";
        }else{
            window.location.href =ROOT+"updatearticle.html";
        }
    });
}
// 添加课件详情
function updatecourseware(teacherId) {
    // 预览主页
    $('.feteacherpersonalcenter-right-head a:contains("预览主页")').attr('href',ROOT+"teacherindex.html?teacherId="+teacherId);
    var studioResourceId=$(this).getUrlParam("studioResourceId");
    console.log(studioResourceId);
    var isEidtCourseWare=false;    //全局变量 判断是否是编辑还是新增
    if(studioResourceId==undefined||studioResourceId=='undefined'||studioResourceId==''){
        console.log('好好');
    }else{
        isEidtCourseWare=true;
        $.ajax({//获取内容
            url: SERVERROOTDATA+"TeacherResource.ashx?action=getTeacherResourceById",
            type: "POST",
            data: {teacherId:teacherId,studioResourceId:studioResourceId},
            success:function (res) {
                var data = JSON.parse(res);
                if(data.length<1){

                }else {
                    console.log(data[0]);
                    $('#updatefile').parent().prev().val(data[0].resourcePath);
                    $('#coursecarename').val(data[0].title);
                    $('#addcoursebg').prev().attr('src',SERVERROOTFILE+data[0].iconPath);
                    $('.feaddcourseware textarea').val(data[0].note);
                }
            }
        });
    }
    // 上传课程封面图片
    $('.feupdatedata').on('change','#addcoursebg',function () {
        if($(this).val().match( /.jpg|.gif|.png|.bmp/i)) {
            var dom = $(this).prev();
            upload(this, dom);
        }else{
            layer.msg("对不起，系统仅支持标准格式的照片，请您调整格式后重新上传，谢谢 !");
        }
        // $(this).val('');
    });
    // 课件上传文件地址
    $('.feaddcourseware').on('change','#updatefile',function () {
        var href=$(this).val();
        $(this).parent().prev().val(href);
    });
    // 添加课件详情
    $('.feaddcourseware').on('click','.febox>h2 a',function () {
        if(!isEmpty($('#updatefile').val())&&!isEidtCourseWare){
            layer.msg('请上传课件文件！');
            return;
        }else{
            if(!isEmpty($('#coursecarename').val())){
                layer.msg('标题不能为空！');
                return;
            }else{
                if(!isEmpty($('#addcoursebg').val())&&!isEidtCourseWare){
                    layer.msg('请上传课件封面图片！');
                    return;
                }else{
                    if(!isEmpty($('#addcourseware textarea').val())){
                        layer.msg('课件简介不能为空！');
                        return;
                    }else{
                        var data = new FormData($('#addcourseware')[0]);
                        var text=$('.feaddcourseware .febox textarea').val();
                        data.append('note',text);
                        data.append('teacherId',teacherId);
                        if(isEidtCourseWare){
                            data.append('saveTag','update');
                            data.append('studioResourceId',studioResourceId);
                        }else{
                            data.append('saveTag','add');
                            data.append('studioResourceId','');
                        }
                        $.ajax({
                            url: SERVERROOTDATA+"TeacherResource.ashx?action=teacherResourceSave",
                            type: "POST",
                            data: data,
                            processData: false,  // 告诉jQuery不要去处理发送的数据
                            contentType: false,   // 告诉jQuery不要去设置Content-Type请求头
                            success:function (res) {
                                if(res==200){
                                    layer.msg('保存成功!');
                                    setTimeout(function () {
                                        window.location.href =ROOT+"teachercenterupdatedata.html?type=课件";
                                    },1000);
                                }else{
                                    layer.msg('保存失败!');
                                }
                            }
                        });
                    }
                }
            }
        }
    });
}
// 添加文章详情
function updatearticle(teacherId) {
    // 预览主页
    $('.feteacherpersonalcenter-right-head a:contains("预览主页")').attr('href',ROOT+"teacherindex.html?teacherId="+teacherId);
    var articleId=$(this).getUrlParam("articleId");
    console.log(articleId);
    var isEidtArticle=false;    //全局变量 判断是否是编辑还是新增
    if(articleId==undefined||articleId=='undefined'||articleId==''){
        console.log('好好');
    }else{
        isEidtArticle=true;
        $.ajax({//获取内容
            url: SERVERROOTDATA+"Article.ashx?action=getArticleById",
            type: "POST",
            data: {teacherId:teacherId,articleId:articleId},
            success:function (res) {
                var data = JSON.parse(res);
                if(data.length<1){

                }else {
                    console.log(data[0]);
                    $('#title').val(data[0].title);
                    $('#addarticlebg').prev().attr('src',SERVERROOTFILE+data[0].iconPath);
                    $('#addarticle textarea').val(data[0].introduce);
                    UE.getEditor('editor').setContent(data[0].content);
                }
            }
        });
    }
    // 上传文章封面图片
    $('.feupdatedata').on('change','#addarticlebg',function () {
        if($(this).val().match( /.jpg|.gif|.png|.bmp/i)) {
            var dom = $(this).prev();
            upload(this, dom);
        }else{
            layer.msg("对不起，系统仅支持标准格式的照片，请您调整格式后重新上传，谢谢 !");
        }
        // $(this).val('');
    });
    // 添加文章详情
    $('.feaddarticle').on('click','.febox>h2 a',function () {
        console.log(!isEidtArticle);
        console.log(!isEmpty($('#addarticlebg').val()));
        if(!isEmpty($('#title').val())){
            layer.msg('标题不能为空！');
            return;
        }else{
            if(!isEmpty($('#addarticlebg').val())&&!isEidtArticle){
                layer.msg('请上传文章封面图片！');
                return;
            }else{
                if(!isEmpty($('#addarticle textarea').val())){
                    layer.msg('文章简介不能为空！');
                    return;
                }else{
                    var data = new FormData($('#addarticle')[0]);
                    var text=$('.feaddarticle .febox textarea').val();
                    data.append('introduce',text);
                    var content=UE.getEditor('editor').getContent();
                    data.append('content',content);
                    data.append('teacherId',teacherId);
                    if(isEidtArticle){
                        data.append('saveTag','update');
                        data.append('articleId',articleId);
                    }else{
                        data.append('saveTag','add');
                        data.append('articleId','');
                    }
                    $.ajax({
                        url: SERVERROOTDATA+"Article.ashx?action=articleSave",
                        type: "POST",
                        data: data,
                        processData: false,  // 告诉jQuery不要去处理发送的数据
                        contentType: false,   // 告诉jQuery不要去设置Content-Type请求头
                        success:function (res) {
                            if(res==200){
                                layer.msg('保存成功!');
                                setTimeout(function () {
                                    window.location.href =ROOT+"teachercenterupdatedata.html?type=文章";
                                },1000)
                            }else{
                                layer.msg('保存失败!');
                            }
                        }
                    });
                }
            }
        }
    });
}
// 认证设置
function authsetting(teacherId) {
    // 预览主页
    $('.feteacherpersonalcenter-right-head a:contains("预览主页")').attr('href',ROOT+"teacherindex.html?teacherId="+teacherId);
    // 认证按钮
    $('.feauthsetting .fetitle').on('click','button',function () {
        if(!$(this).parent().hasClass('active')){
            $(this).parent().addClass('active');
            // $(this).parent().next().removeClass('fehidden');
            $(this).parent().next().slideDown(500);
        }else{
            console.log(2222)
        }
    });
    // 身份认证保存按钮
    $('#identity-auth').on('click','a:first-child',function () {
        if(!isEmpty($('#username').val())){
            layer.msg('姓名不能为空！');
            return;
        }else {
            if(!validateIdCard($('#idcard').val())){
                layer.msg('身份证格式不正确！');
                return;
            }else{
                if(!isEmpty($('#handheldphoto').val())){
                    layer.msg('您还未上传图片！');
                    return;
                }else {
                    if(!isEmpty($('#idface').val())){
                        layer.msg('您还未上传图片！');
                        return;
                    }else{
                        var data = new FormData($('#identity-auth')[0]);
                        $.ajax({
                            url: "data/grade.php",
                            type: "POST",
                            data: data,
                            processData: false,  // 告诉jQuery不要去处理发送的数据
                            contentType: false   // 告诉jQuery不要去设置Content-Type请求头
                        });
                    }
                }
            }
        }
    });
    // 教师认证保存按钮
    $('#teacher-auth').on('click','a:first-child',function () {
        if(!isEmpty($('#teachercard').val())){
            layer.msg('您还未上传图片！');
            return;
        }else{
            var data = new FormData($('#teacher-auth')[0]);
            $.ajax({
                url: "data/grade.php",
                type: "POST",
                data: data,
                processData: false,  // 告诉jQuery不要去处理发送的数据
                contentType: false   // 告诉jQuery不要去设置Content-Type请求头
            });
        }
    });
    // 学历认证保存按钮
    $('#education-auth').on('click','a:first-child',function () {
        if(!isEmpty($('#educationcard').val())){
            layer.msg('您还未上传图片!');
            return;
        }else{
            var data = new FormData($('#education-auth')[0]);
            $.ajax({
                url: "data/grade.php",
                type: "POST",
                data: data,
                processData: false,  // 告诉jQuery不要去处理发送的数据
                contentType: false   // 告诉jQuery不要去设置Content-Type请求头
            });
        }
    });
    //专业资质认证保存按钮
    $('#aptitude-auth').on('click','a:first-child',function () {
        if(!isEmpty($('#aptitudecard').val())){
            layer.msg('您还未上传图片！');
            return;
        }else{
            var data = new FormData($('#aptitude-auth')[0]);
            $.ajax({
                url: "data/grade.php",
                type: "POST",
                data: data,
                processData: false,  // 告诉jQuery不要去处理发送的数据
                contentType: false   // 告诉jQuery不要去设置Content-Type请求头
            });
        }
    });
    // 取消按钮
    $('.feauthsetting .feauth h2').on('click','a:last-child',function () {
        $(this).parent().parent().parent().prev().removeClass('active');
        $(this).parent().parent().parent().slideUp(500);
        window.location.reload();
    });
    $('.feupdatephoto').on('change','input',function () {
        if($(this).val().match( /.jpg|.gif|.png|.bmp/i)) {
            var dom=$(this).prev();
            upload(this,dom);
        }else{
            layer.msg("对不起，系统仅支持标准格式的照片，请您调整格式后重新上传，谢谢 !");
        }
        // $(this).val('');
    })
}
// 我的工作室显示页面
function mystudio(teacherId) {
    new Vue({
        el:"#femystudio",
        data:{
            mystudio:[]
        },
        filters: {
            addRootFile: function addRootFile(img) {
                return SERVERROOTFILE + img;
            },
            addStudioDetailRoot: function addStudioDetailRoot(id) {
                return ROOT + "teachercentermystudiodetail.html?teachingStudioId=" + id;
            }
        },
        mounted:function () {
            var _this=this;
            this.$nextTick(function () {
                _this.getstudio();
            })
        },
        methods: {
            getstudio:function () {
                var _this=this;
                this.$http.post(SERVERROOTDATA + "TeachingStudio.ashx?action=showTeachingStudioByTeacherId",
                    {
                        teacherId:teacherId
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        if(isEmptyObject(res.body[0])){
                            return false;
                        }else{
                            _this.mystudio = res.body;
                        }

                    })
            }
        }
    })
}
// 创建工作室
function createstudio(teacherId) {
    new Vue({
        el:"#fecreatestudio",
        data:{
            city:[],
            educationalLevel:[],
            grade:[]
        },
        filters: {
            addRootFile: function addRootFile(img) {
                return SERVERROOTFILE + img;
            },
            addStudioRoot: function addStudioRoot(id) {
                return ROOT + "teacherstudio.html?teachingStudioId=" + id;
            },
        },
        mounted:function () {
            var _this=this;
            this.$nextTick(function () {
                _this.getcity();
                _this.geteducationalLevel();
                _this.getgrade();
            })
        },
        methods: {
            getcity:function () {
                var _this=this;
                this.$http.post(SERVERROOTDATA + "City.ashx?action=getCity",
                    {
                        provinceId:1
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        _this.city = res.body;
                    })
            },
            geteducationalLevel:function () {
                var _this=this;
                this.$http.post(SERVERROOTDATA + "EducationalLevel.ashx?action=getEducationalLevel",
                    {
                        organId:0
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        _this.educationalLevel = res.body;
                    }).then(function () {
                        var _this=this;
                        $('#period').on('change',function () {
                            _this.$http.post(SERVERROOTDATA + "Subject.ashx?action=getSubject",
                                {
                                    educationalLevelId:$('#period').val(),
                                    gradeId:''
                                }
                                ,{emulateJSON: true})
                                .then(function (res) {
                                    _this.grade = res.body;
                                })
                        })


                })
            },
            getgrade:function () {
                var _this=this;
                this.$http.post(SERVERROOTDATA + "Subject.ashx?action=getSubject",
                    {
                        educationalLevelId:$('#period').val(),
                        gradeId:''
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        _this.grade = res.body;
                    })
            }
        }
    })
    // 更换工作室头像预览
    $('.fecreatestudio').on('change','#addphoto',function () {
        if($(this).val().match( /.jpg|.gif|.png|.bmp/i)) {
            var dom=$(this).prev();
            upload(this,dom);
        }else {
            layer.msg("对不起，系统仅支持标准格式的照片，请您调整格式后重新上传，谢谢 !");
        }
        // $(this).val('');
        console.log(777);
    });
    $('.fecreatestudio>p').on('click', 'a',function () {
        if(!isEmpty($('#addphoto').val())){
            layer.msg('请添加工作室封面！');
            return;
        }else{
            if(!isEmpty($('#studioname').val())){
                layer.msg('工作室名称不能为空！');
                return;
            }else {
                var data = new FormData($('#createstudio-form')[0]);
                data.append('saveTag','add');
                data.append('teacherId',teacherId);
                $.ajax({
                    url: SERVERROOTDATA+"TeachingStudio.ashx?action=teachingStudioSave",
                    type: "POST",
                    data: data,
                    processData: false,  // 告诉jQuery不要去处理发送的数据
                    contentType: false,   // 告诉jQuery不要去设置Content-Type请求头
                    success:function (res) {
                        if(res==200){
                            layer.msg("保存成功！");
                            setTimeout(function () {
                                window.location.href =ROOT+"teachercentermystudio.html";
                            },1000)
                        }
                    }
                });
            }
        }

    })
}
// 我的工作室详细页面
function mystudiodetail(teacherId,teachingStudioId) {
    $('.femystudiodetail ul li').on('click','span',function () {
        $(this).parent().siblings().find('span').removeClass('active');
        $(this).addClass('active');
        var id=$(this).data('id');
        var showdom=$('.femystudiodetail .fecontent>div:nth-child('+id+')');
        // console.log(showdom);
        showdom.fadeIn(1000);
        showdom.siblings().hide();
    });
    // 资讯显示
    new Vue({
        el:"#feinformation",
        data:{
            information:[]
        },
        filters: {
            addRootFile: function addRootFile(img) {
                return SERVERROOTFILE + img;
            },
            addStudioRoot: function addStudioRoot(id) {
                return ROOT + "teacherstudio.html?teachingStudioId=" + id;
            }
        },
        mounted:function () {
            var _this=this;
            this.$nextTick(function () {
                _this.getinformation();
            })
        },
        methods: {
            getinformation:function () {
                var _this=this;
                this.$http.post(SERVERROOTDATA + "News.ashx?action=getTeachingStudioNews",
                    {
                        teachingStudioId:teachingStudioId,
                        pageIndex:1,
                        pageSize:10
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        _this.information = res.body.rows;
                    })
            }
        }
    });
    // 公告显示
    new Vue({
        el:"#feannouncement",
        data:{
            notice:[]
        },
        filters: {
            addRootFile: function addRootFile(img) {
                return SERVERROOTFILE + img;
            }
            // addStudioRoot: function addStudioRoot(id) {
            //     return ROOT + "teacherstudio.html?teachingStudioId=" + id;
            // }
        },
        mounted:function () {
            var _this=this;
            this.$nextTick(function () {
                _this.getnotice();
            })
        },
        methods: {
            getnotice:function () {
                var _this=this;
                this.$http.post(SERVERROOTDATA + "Activity.ashx?action=getStudioActivity",
                    {
                        teachingStudioId:teachingStudioId,
                        pageIndex:1,
                        pageSize:10
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        _this.notice = res.body.rows;
                    })
            }
        }
    });
    // 成员显示
    new Vue({
        el:"#femymenber",
        data:{
            menber:[]
        },
        filters: {
            addRootFile: function addRootFile(img) {
                return SERVERROOTFILE + img;
            },
            addStudioRoot: function addStudioRoot(id) {
                return ROOT + "teacherstudio.html?teachingStudioId=" + id;
            }
        },
        mounted:function () {
            var _this=this;
            this.$nextTick(function () {
                _this.getmenber();
            })
        },
        methods: {
            getmenber:function () {
                var _this=this;
                this.$http.post(SERVERROOTDATA + "TeachingStudio.ashx?action=getStudioMember",
                    {
                        teachingStudioId:teachingStudioId,
                        pageIndex:1,
                        pageSize:10
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        _this.menber = res.body.rows;
                    })
            }
        }
    });
    // 基本信息-编辑按钮
    $('.femystudiodetail').on('click','.febasicinformation>button',function () {
        if(!$(this).hasClass('fehidden')){
            $('.febasicinformation .fepanel s').addClass('fehidden');
            // $('.febasicinformation .fepanel>img').addClass('fehidden');
            $('.febasicinformation>button').addClass('fehidden');
            $('.febasicinformation .fepanel select').removeClass('fehidden');
            $('.febasicinformation .fepanel .feimage input').prop('disabled','');
            // $('.febasicinformation .fepanel .feimage').removeClass('fehidden');
            $('.febasicinformation .fepanel b').removeClass('fehidden');
            $('.febasicinformation .fepanel>input').prop('disabled','');
            $('.febasicinformation p').removeClass('fehidden');
        }
    })
    // 基本信息-保存按钮
    $('.femystudiodetail .febasicinformation>p').on('click','button',function () {
        var data = new FormData($('#basicinformation')[0]);
        $.ajax({
            url: "data/grade.php",
            type: "POST",
            data: data,
            processData: false,  // 告诉jQuery不要去处理发送的数据
            contentType: false   // 告诉jQuery不要去设置Content-Type请求头
        });
        var address=$('.febasicinformation #address option:selected').text();
        $('.febasicinformation #address').prev().html(address);
        var period=$('.febasicinformation #period option:selected').text();
        $('.febasicinformation #period').prev().html(period);
        var subject=$('.febasicinformation #subject option:selected').text();
        $('.febasicinformation #subject').prev().html(subject);
        $('.febasicinformation .fepanel s').removeClass('fehidden');
        // $('.febasicinformation .fepanel>img').removeClass('fehidden');
        $('.febasicinformation>button').removeClass('fehidden');
        $('.febasicinformation .fepanel select').addClass('fehidden');
        // $('.febasicinformation .fepanel .feimage').addClass('fehidden');
        $('.febasicinformation .fepanel .feimage input').prop('disabled','true');
        $('.febasicinformation .fepanel b').addClass('fehidden');
        $('.febasicinformation .fepanel>input').prop('disabled','true');
        $('.febasicinformation p').addClass('fehidden');
    });
    // 更换工作室头像预览
    $('.febasicinformation').on('change','.feimage input',function () {
        if($(this).val().match( /.jpg|.gif|.png|.bmp/i)) {
            var dom = $(this).prev();
            upload(this, dom);
            // $(this).val('');
        }else {
            layer.msg("对不起，系统仅支持标准格式的照片，请您调整格式后重新上传，谢谢 !");
        }
        console.log(777);
    })
    // 公告
    $('.feannouncement-content').on('click','.fetitle',function () {
        var text=$(this).html();
        var p='公告正文公告正文公告正文公告正文公告正文公告正文公告正文公告文公告正文公告正文公告正文公告正文公告正文公告正文公告正文公告正文公告正文公告正文公告正文公告正文公告正文公告正文公告正文公告正文公告正文公告正文公告正文公告正文' +
            '公告正文公告正文公告正文公告正文公告正文公告正文公告正文公告正文公告正文公告正正文公告正文公告正文公告正文公告正文公告正文公告正文';
        var teacher=$(this).parent().find('.fepublisher').html();
        var time=$(this).parent().find('.fetime').html();
        popbox(text,p,teacher,time);
    })
    // 添加资讯
    $('.feconsultation').on('click','.feaddconsultation',function () {
        layer.open({
            type: 2,
            title: '添加工作室资讯',
            shadeClose: true,
            shade: false,
            maxmin: true, //开启最大化最小化按钮
            area: ['1100px', '700px'],
            content: 'addstudioinformation.html'
        });
    });
    // 添加公告
    $('.feannouncement>p').on('click','button',function () {
        layer.open({
            type: 2,
            title: '添加工作室公告',
            shadeClose: true,
            shade: false,
            maxmin: true, //开启最大化最小化按钮
            area: ['1100px', '700px'],
            content: 'addnotice.html'
        });
    })
}

// 公告弹框   clock-o user file-text-o
function popbox(text,p,teacher,time) {//text 标题 p为内容
    var pop=$('<div class="pop"></div>');
    var panel=$('<div class="pop-panel"></div>');
    var title = $('<h2 class="title"><i class="uk-icon-file-text-o"></i>公告标题 : '+ text +'</h2>');
    var close = $('<s>×</s>');
    close.on('click', function () {
        pop.remove();
    });
    var content=$('<div class="content"><h3>公告内容 :</h3><p>'+ p +'</p></div>');
    var publisher=$('<div class="publisher"><span><i class="uk-icon-user"></i>发布人 : '+ teacher +'</span>'+
        '<span><i class="uk-icon-clock-o"></i>发表时间 : '+ time +'</span></div>')
    title.append(close);
    panel.append(title);
    panel.append(content);
    panel.append(publisher);
    pop.append(panel);
    $('body').append(pop);
}
// 添加工作室资讯弹窗
function addstudioinformation() {
    // 更换资讯预览
    $('.feaddstudioinformation').on('change','#information-photo',function () {
        if($(this).val().match( /.jpg|.gif|.png|.bmp/i)) {
            var dom = $(this).prev();
            upload(this, dom);
            // $(this).val('');
        }else {
            layer.msg("对不起，系统仅支持标准格式的照片，请您调整格式后重新上传，谢谢 !");
        }
        console.log(777);
    })
}
// 班级管理
function createclass(teacherId) {
    // 预览主页
    var type=$(this).getUrlParam("type");
    if(type=='2'){
        $('.feupdatedata .febox h1 span:last-child').addClass('active');
        $('.feupdatedata .febox h1 span:nth-child(2)').removeClass('active');
        $('#allschool').addClass('fehidden');
        $('#trainschool').removeClass('fehidden');
    }else{
        $('.feupdatedata .febox h1 span:nth-child(2)').addClass('active');
        $('.feupdatedata .febox h1 span:last-child').removeClass('active');
        $('#trainschool').addClass('fehidden');
        $('#allschool').removeClass('fehidden');
    }
    // 切换 课件/文章列表
    $('.feupdatedata .febox h1').on('click', 'span', function () {
        if (!$(this).hasClass('active')) {
            window.location.href =ROOT+"teachercentercreateclass.html?type="+$(this).data('id');
        } else {
        }
    });
    //显示全日制班级列表
    function showallschool() {
        new Vue({
            el: "#allschool",
            data: {
                allschoolArr:[],//课件
                showItem:4,//页码显示条数
                allpage:'',//总页数
                current:1//当前页
            },
            filters: {
                addRootFile: function addRootFile(img) {
                    return SERVERROOTFILE + img;
                },
                addRoot:function addRoot(id) {
                    return 'showclass.html?classId='+id;
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
            mounted:function () {
                var _this=this;
                this.$nextTick(function () {
                    _this.getallschool(1);
                })
            },
            methods: {
                getallschool:function (pageIndex) {
                    var _this = this;
                    this.$http.post(SERVERROOTDATA + "TeacherResource.ashx?action=getTeacherResource",
                        {
                            teacherId: teacherId,
                            resourceType: 'courseware',
                            pageIndex: pageIndex,
                            pageSize: 6
                        }
                        , {emulateJSON: true})
                        .then(function (res) {
                            _this.allpage = res.body.totalPageCount;
                            _this.allschoolArr = res.body.rows;
                        }).then(function () {
                        var _this = this;
                        $('#allschool .fepanel ul').on('click', 'li:first-child', function () {
                            window.location.href = ROOT + "showclass.html?classId=" + $(this).parent().data('id');
                        });
                        $('#allschool .fepanel ul').on('click', 'li:last-child', function () {
                            var _this = this;
                            var studioResourceId = $(_this).parent().data('id');
                            layer.confirm('你确定要删除吗？', {
                                btn: ['确定', '取消'] //按钮
                            }, function () {
                                $.ajax({
                                    url: SERVERROOTDATA + "TeacherResource.ashx?action=teacherResourceSave",
                                    type: "POST",
                                    data: {saveTag: 'delete', studioResourceId: studioResourceId},
                                    success: function (res) {
                                        if (res == 200) {
                                            layer.msg('删除成功！', {icon: 1});
                                            setTimeout(function () {
                                                window.location.href = ROOT + "teachercentercreateclass.html?type=1";
                                            }, 1000)
                                        }
                                    }
                                });
                            }, function () {
                            });
                        });
                    })
                },
                goto: function(index) { //枫叶处理
                    var _this=this;
                    if(index == this.current) return;
                    if(index > this.allpage) {
                        this.current = this.current - 2;
                        layer.msg("Sorry ╮(╯_╰)╭ 没有下一页喽！");
                        return false;
                    }
                    this.current = index;
                    _this.getallschool(_this.current);
                }
            }
        });
    }
    //显示培训机构班级列表
    function showtrainschool() {
        new Vue({
            el: "#trainschool",
            data: {
                trainschoolArr:[],//课件
                showItem:4,//页码显示条数
                allpage:'',//总页数
                current:1//当前页
            },
            filters: {
                addRootFile: function addRootFile(img) {
                    return SERVERROOTFILE + img;
                },
                addRoot:function addRoot(id) {
                    return 'showclass.html?classId='+id;
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
            mounted:function () {
                var _this=this;
                this.$nextTick(function () {
                    _this.gettrainschool(1);
                })
            },
            methods: {
                gettrainschool:function (pageIndex) {
                    var _this=this;
                    this.$http.post(SERVERROOTDATA + "TeacherResource.ashx?action=getTeacherResource",
                        {
                            teacherId:teacherId,
                            resourceType:'article',
                            pageIndex:pageIndex,
                            pageSize:6
                        }
                        ,{emulateJSON: true})
                        .then(function (res) {
                            _this.allpage = res.body.totalPageCount;
                            _this.trainschoolArr = res.body.rows;
                        }).then(function () {
                        var _this=this;
                        $('#trainschool .fepanel ul').on('click','li:first-child',function () {
                            window.location.href =ROOT+"showclass.html?classId="+$(this).parent().data('id');
                        });
                        $('#trainschool .fepanel ul').on('click','li:last-child',function () {
                            var _this=this;
                            var articleId=$(_this).parent().data('id');
                            layer.confirm('你确定要删除吗？', {
                                btn: ['确定','取消'] //按钮
                            }, function(){
                                $.ajax({
                                    url: SERVERROOTDATA+"Article.ashx?action=articleSave",
                                    type: "POST",
                                    data: {saveTag:'delete',articleId:articleId},
                                    success:function (res) {
                                        if(res==200){
                                            layer.msg('删除成功！', {icon: 1});
                                            setTimeout(function () {
                                                window.location.href =ROOT+"teachercentercreateclass.html?type=2";
                                            },1000)
                                        }
                                    }
                                });
                            }, function(){
                            });
                        });
                    })
                },
                goto: function(index) { //枫叶处理
                    var _this=this;
                    if(index == this.current) return;
                    if(index > this.allpage) {
                        this.current = this.current - 2;
                        layer.msg("Sorry ╮(╯_╰)╭ 没有下一页喽！");
                        return false;
                    }
                    this.current = index;
                    _this.gettrainschool(_this.current);
                }
            }
        });
    }
    showallschool();
    showtrainschool();
    // 添加班级界面
    $('.feupdatedata .febox p').on('click','button',function () {
        var id=$('.feupdatedata .febox h1').find('.active').data('id');
        if(id=='1'||id==1){
            layer.open({
                type: 1,
                title:"创建全日制班级",
                area:['400px','320px'],
                content: $('#addallschool') //这里content是一个DOM
            });
        }else{
            layer.open({
                type: 1,
                title:"创建培训机构班级",
                area:['400px','320px'],
                content: $('#addtrainschool') //这里content是一个DOM
            });
        }
    });
    // 添加全日制班级取消按钮
    $('#addallschool .feoperation').on('click','button:last-child',function () {
        layer.closeAll();
    });
    // 添加培训机构班级取消按钮
    $('#addtrainschool .feoperation').on('click','button:last-child',function () {
        layer.closeAll();
    })
}
// 班级信息
function classdetail(teacherId) {
    $('.feclassdetail').on('click','span',function () {
        if(!$(this).hasClass('active')){
            var id=$(this).data('id');
            $(this).siblings().removeClass('active');
            $(this).addClass('active');
            if(id==1||id=='1'){
                $('.feschoolmsg').removeClass('fehidden');
                $('.festudentmsg').addClass('fehidden');
            }else{
                $('.festudentmsg').removeClass('fehidden');
                $('.feschoolmsg').addClass('fehidden');
            }
        }else{
        }
    })
}
// 订单管理
function ordermanage() {
    $('.feordermanage .feorder-nav').on('click','span',function () {
       if($(this).hasClass('active')){
           return;
       } else{
           $(this).siblings().removeClass('active');
           $(this).addClass('active');
           if($(this).data('id')==1){
               $('#sold').css('display','block');
               $('#buy').css('display','none');
           }else {
               $('#buy').css('display','block');
               $('#sold').css('display','none');
           }
       }
    });
    // 已售课程
    new Vue({
        el:"#sold",
        data:{
            soldorder:[],
            showItem:4,//页码显示条数
            allpage:'',//总页数
            current:1//当前页
        },
        filters: {
            addRootFile: function addRootFile(img) {
                return SERVERROOTFILE + img;
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
        mounted:function () {
            var _this=this;
            this.$nextTick(function () {
                _this.getorder(1);
            })
        },
        methods: {
            getorder:function (pageIndex) {
                var _this=this;
                this.$http.post(SERVERROOTDATA + "",
                    {
                        pageIndex:pageIndex,
                        pageSize:2
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        _this.soldorder = res.body.rows;
                        _this.allpage=res.body.totalPageCount;
                    })
            },
            goto: function(index) { //枫叶处理
                var _this=this;
                if(index == this.current) return;
                if(index > this.allpage) {
                    this.current = this.current - 2;
                    layer.msg("Sorry ╮(╯_╰)╭ 没有下一页喽！");
                    return false;
                }
                this.current = index;
                _this.getorder(_this.current);
            }
        }
    });
    // 已买课程
    new Vue({
        el:"#buy",
        data:{
            buyorder:[],
            showItem:4,//页码显示条数
            allpage:'',//总页数
            current:1//当前页
        },
        filters: {
            addRootFile: function addRootFile(img) {
                return SERVERROOTFILE + img;
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
        mounted:function () {
            var _this=this;
            this.$nextTick(function () {
                _this.getorder(1);
            })
        },
        methods: {
            getorder:function (pageIndex) {
                var _this=this;
                this.$http.post(SERVERROOTDATA + "",
                    {
                        pageIndex:pageIndex,
                        pageSize:2
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        _this.buyorder = res.body.rows;
                        _this.allpage=res.body.totalPageCount;
                    })
            },
            goto: function(index) { //枫叶处理
                var _this=this;
                if(index == this.current) return;
                if(index > this.allpage) {
                    this.current = this.current - 2;
                    layer.msg("Sorry ╮(╯_╰)╭ 没有下一页喽！");
                    return false;
                }
                this.current = index;
                _this.getorder(_this.current);
            }
        }
    });
}
// 老师答疑回复
function answeringreply() {
    new Vue({
        el:"#answeringreply",
        data:{
            result:[],
            type:'',
            showItem:4,//页码显示条数
            allpage:'1',//总页数
            current:1//当前页
        },
        filters: {
            addRootFile: function addRootFile(img) {
                return SERVERROOTFILE + img;
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
        mounted:function () {
            var _this=this;
            this.$nextTick(function () {
                _this.getresult(1,_this.type);
                _this.bindfn();
            })
        },
        methods: {
            bindfn:function bindfn() {
                var _this=this;
                $('.femessage-head .feselect').on('click','span',function () {
                   if(!$(this).hasClass('active')){
                        $(this).siblings('span').removeClass('active');
                       $(this).addClass('active');
                       var type=$(this).data('type');
                       _this.current = 1;
                       _this.getresult(_this.current,_this.type);
                   }
                });
            },
            getresult:function (pageIndex,type) {
                var _this=this;
                this.$http.post(SERVERROOTDATA + "TeacherResource.ashx?action=getTeacherResource",
                    {
                        type:type,
                        pageIndex:pageIndex,
                        pageSize:2
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        // _this.result = res.body.rows;
                        _this.result=[{questionContent:'dada',courseName:'大大',questioner:"天天",time:"2017-10-30 12:00",questionId:1}]
                        _this.allpage=res.body.totalPageCount;
                    }).then(function () {
                        // 查看详情
                        $('.feansweringreply').on('click','.felist .lookdetail',function () {
                            var id = $(this).data('id');
                            layer.open({
                                type: 2,
                                title: '详情',
                                //closeBtn: 0, //不显示关闭按钮
                                shadeClose: false,
                                shade: [0.5, '#000'],
                                area: ['800px', '550px'],
                                //offset: 'rb', //右下角弹出
                                //time: 2000, //2秒后自动关闭
                                anim: 2,
                                content: 'answeringreplydetail.html?questionId=' + id
                            });
                        });
                })
            },
            goto: function(index) { //枫叶处理
                var _this=this;
                if(index == this.current) return;
                if(index > this.allpage) {
                    this.current = this.current - 2;
                    layer.msg("Sorry ╮(╯_╰)╭ 没有下一页喽！");
                    return false;
                }
                this.current = index;
                _this.getresult(_this.current,_this.type);
            }
        }
    });
}
// 老师评论回复
function discussreply() {
    new Vue({
        el:"#discussreply",
        data:{
            result:[],
            type:'',
            showItem:4,//页码显示条数
            allpage:'1',//总页数
            current:1//当前页
        },
        filters: {
            addRootFile: function addRootFile(img) {
                return SERVERROOTFILE + img;
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
        mounted:function () {
            var _this=this;
            this.$nextTick(function () {
                _this.getresult(1,_this.type);
                _this.bindfn();
            })
        },
        methods: {
            bindfn:function bindfn() {
                var _this=this;
                $('.femessage-head .feselect').on('click','span',function () {
                    if(!$(this).hasClass('active')){
                        $(this).siblings('span').removeClass('active');
                        $(this).addClass('active');
                        var type=$(this).data('type');
                        _this.current = 1;
                        _this.getresult(_this.current,_this.type);
                    }
                });
            },
            getresult:function (pageIndex,type) {
                var _this=this;
                this.$http.post(SERVERROOTDATA + "TeacherResource.ashx?action=getTeacherResource",
                    {
                        type:type,
                        pageIndex:pageIndex,
                        pageSize:2
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        // _this.result = res.body.rows;
                        _this.result=[{disucssContent:'dada',courseName:'大大',disucsser:"天天",time:"2017-10-30 12:00",discussId:1}];
                        _this.allpage=res.body.totalPageCount;
                    }).then(function () {
                    // 查看详情
                    $('.feansweringreply').on('click','.felist .lookdetail',function () {
                        var id = $(this).data('id');
                        layer.open({
                            type: 2,
                            title: '详情',
                            //closeBtn: 0, //不显示关闭按钮
                            shadeClose: false,
                            shade: [0.5, '#000'],
                            area: ['600px', '420px'],
                            //offset: 'rb', //右下角弹出
                            //time: 2000, //2秒后自动关闭
                            anim: 2,
                            content: 'discussdetail.html?discussId=' + id
                        });
                    });
                })
            },
            goto: function(index) { //枫叶处理
                var _this=this;
                if(index == this.current) return;
                if(index > this.allpage) {
                    this.current = this.current - 2;
                    layer.msg("Sorry ╮(╯_╰)╭ 没有下一页喽！");
                    return false;
                }
                this.current = index;
                _this.getresult(_this.current,_this.type);
            }
        }
    });
}
// 老师网站通知
function webnotice() {
    new Vue({
        el:"#webnotice",
        data:{
            result:[],
            type:'',
            showItem:4,//页码显示条数
            allpage:'1',//总页数
            current:1//当前页
        },
        filters: {
            addRootFile: function addRootFile(img) {
                return SERVERROOTFILE + img;
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
        mounted:function () {
            var _this=this;
            this.$nextTick(function () {
                _this.getresult(1,_this.type);
                _this.bindfn();
            })
        },
        methods: {
            bindfn:function bindfn() {
                var _this=this;
                $('.femessage-head .feselect').on('click','span',function () {
                    if(!$(this).hasClass('active')){
                        $(this).siblings('span').removeClass('active');
                        $(this).addClass('active');
                        var type=$(this).data('type');
                        _this.current = 1;
                        _this.getresult(_this.current,_this.type);
                    }
                });
            },
            getresult:function (pageIndex,type) {
                var _this=this;
                this.$http.post(SERVERROOTDATA + "TeacherResource.ashx?action=getTeacherResource",
                    {
                        type:type,
                        pageIndex:pageIndex,
                        pageSize:2
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        // _this.result = res.body.rows;
                        _this.result=[{title:'头条',publisher:"天天",time:"2017-10-30 12:00",discussId:1,content:"你很帅!"}];
                        _this.allpage=res.body.totalPageCount;
                    })
            },
            goto: function(index) { //枫叶处理
                var _this=this;
                if(index == this.current) return;
                if(index > this.allpage) {
                    this.current = this.current - 2;
                    layer.msg("Sorry ╮(╯_╰)╭ 没有下一页喽！");
                    return false;
                }
                this.current = index;
                _this.getresult(_this.current,_this.type);
            },
            lookNotice:function  lookNotice(title,content) {
                layer.open({
                    type: 1,
                    title: title,
                    //closeBtn: 0, //不显示关闭按钮
                    shadeClose: false,
                    shade: [0.5, '#000'],
                    area: ['500px', 'auto'],
                    //offset: 'rb', //右下角弹出
                    //time: 2000, //2秒后自动关闭
                    anim: 2,
                    content: '<p style="padding: 20px">'+content +'</p>'
                });
            }
        }
    });
}
// 布置作业
function arrangework() {
    var teacherId=$(window).storager({key: 'feUid'}).readStorage();
    var userType=$(window).storager({key: 'feUType'}).readStorage();
    if(teacherId==null||teacherId==undefined||teacherId=='undefined'||userType!=3){
        layer.msg('请先登录');
        setTimeout(function () {
            window.location.href = ROOT+"login.html";
        },1000);
        return;
    }
    $('.festudentmycourse .fehead').on('click','span',function () {
        if($(this).hasClass('active')){
            return;
        }else {
            $(this).siblings().removeClass('active');
            $(this).addClass('active');
            if($(this).data('id')==1){
                $('#homework').css('display','block');
                $('#onlineexam').css('display','none');
            }else{
                $('#homework').css('display','none');
                $('#onlineexam').css('display','block');
            }
        }
    });
     // 在线作业
    new Vue({
        el:"#homework",
        data:{
            homework:[],
            showItem:4,//页码显示条数
            allpage:'',//总页数
            current:1,//当前页
            subjectName:'',
            arrangeTime:''
        },
        filters: {
            addRootFile: function addRootFile(img) {
                return SERVERROOTFILE + img;
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
        mounted:function () {
            var _this=this;
            this.$nextTick(function () {
                _this.gethomework(1,_this.subjectName,_this.arrangeTime);
                _this.bindSearch();
            })
        },
        methods: {
            gethomework:function (pageIndex,subjectName,arrangeTime) {
                var _this=this;
                this.$http.post(SERVERROOTDATA + "Course.ashx?action=getOrderLiveCourse",
                    {
                        userId:teacherId,
                        userType:userType,
                        subjectName:subjectName,
                        playState:arrangeTime,
                        pageIndex:pageIndex,
                        pageSize:2
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        if(res.body.code==200){
                            _this.homework = res.body.rows;
                            _this.allpage=res.body.totalPageCount;
                        }
                    })
            },
            goto: function(index) { //枫叶处理
                var _this=this;
                if(index == this.current) return;
                if(index > this.allpage) {
                    this.current = this.current - 2;
                    layer.msg("Sorry ╮(╯_╰)╭ 没有下一页喽！");
                    return false;
                }
                this.current = index;
                _this.gethomework(_this.current,_this.subjectName,_this.arrangeTime);
            },
            bindSearch:function bindSearch() {
                var _this=this;
                $('#homework .feselect').on('change','select:first-child',function () {
                    _this.subjectName=$(this).val();
                    _this.arrangeTime=$(this).next().val();
                    _this.current=1;
                    _this.gethomework(_this.current,_this.subjectName,_this.arrangeTime);
                });
                $('#homework .feselect').on('change','select:last-child',function () {
                    _this.subjectName=$(this).prev().val();
                    _this.arrangeTime=$(this).val();
                    _this.current=1;
                    _this.gethomework(_this.current,_this.subjectName,_this.arrangeTime);
                });
                $('#homework .feselect>p').on('click','#paperWork',function () {
                    // layer.open({
                    //     type: 2,
                    //     // title: '',
                    //     //closeBtn: 0, //不显示关闭按钮
                    //     shadeClose: false,
                    //     shade: [0.5, '#000'],
                    //     area: ['800px', '550px'],
                    //     //offset: 'rb', //右下角弹出
                    //     //time: 2000, //2秒后自动关闭
                    //     anim: 2,
                    //     content: 'createtestpaper.html?type=1'
                    // });
                    layer.open({
                        type: 2,
                        title: '布置作业',
                        //closeBtn: 0, //不显示关闭按钮
                        shadeClose: false,
                        shade: [0.5, '#000'],
                        area: ['880px', '510px'],
                        //offset: 'rb', //右下角弹出
                        //time: 2000, //2秒后自动关闭
                        anim: 2,
                        content: 'arrangetaskPop.html'
                    });
                })
                $('#homework .feselect>p').on('click','#batchQuestion',function () {
                    window.open(ROOT+'teachercenter/batchimportquestion.html');
                });
                $('#homework .feselect>p').on('click','#photoWork',function () {
                    layer.open({
                        type: 2,
                        title: '图片作业',
                        //closeBtn: 0, //不显示关闭按钮
                        shadeClose: false,
                        shade: [0.5, '#000'],
                        area: ['880px', '510px'],
                        //offset: 'rb', //右下角弹出
                        //time: 2000, //2秒后自动关闭
                        anim: 2,
                        content: 'phototaskPop.html'
                    });
                })
            },
            bindCompleteease:function (id) {
                layer.open({
                    type: 2,
                    // title: '',
                    //closeBtn: 0, //不显示关闭按钮
                    shadeClose: false,
                    shade: [0.5, '#000'],
                    area: ['800px', '550px'],
                    //offset: 'rb', //右下角弹出
                    //time: 2000, //2秒后自动关闭
                    anim: 2,
                    content: 'completesituation.html?id='+id
                });
            }
        }
    });
    // 在线考试
    new Vue({
        el:"#onlineexam",
        data:{
            onlinetest:[],
            showItem:4,//页码显示条数
            allpage:'',//总页数
            current:1,//当前页
            subjectName:'',
            arrangeTime:''
        },
        filters: {
            addRootFile: function addRootFile(img) {
                return SERVERROOTFILE + img;
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
        mounted:function () {
            var _this=this;
            this.$nextTick(function () {
                _this.getonlinetest(1,_this.subjectName,_this.arrangeTime);
                _this.bindSearch();
            })
        },
        methods: {
            getonlinetest:function (pageIndex,subjectName,arrangeTime) {
                var _this=this;
                this.$http.post(SERVERROOTDATA + "Course.ashx?action=getOrderLiveCourse",
                    {
                        userId:teacherId,
                        userType:userType,
                        subjectName:subjectName,
                        playState:arrangeTime,
                        pageIndex:pageIndex,
                        pageSize:2
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        if(res.body.code==200){
                            _this.onlinetest = res.body.rows;
                            _this.allpage=res.body.totalPageCount;
                        }
                    })
            },
            goto: function(index) { //枫叶处理
                var _this=this;
                if(index == this.current) return;
                if(index > this.allpage) {
                    this.current = this.current - 2;
                    layer.msg("Sorry ╮(╯_╰)╭ 没有下一页喽！");
                    return false;
                }
                this.current = index;
                _this.getonlinetest(_this.current,_this.subjectName,_this.arrangeTime);
            },
            bindSearch:function bindSearch() {
                var _this=this;
                $('#onlineexam .feselect').on('change','select:first-child',function () {
                    _this.subjectName=$(this).val();
                    _this.arrangeTime=$(this).next().val();
                    _this.current=1;
                    _this.getonlinetest(_this.current,_this.subjectName,_this.arrangeTime);
                });
                $('#onlineexam .feselect').on('change','select:last-child',function () {
                    _this.subjectName=$(this).prev().val();
                    _this.arrangeTime=$(this).val();
                    _this.current=1;
                    _this.getonlinetest(_this.current,_this.subjectName,_this.arrangeTime);
                });
                $('#onlineexam .feselect>p').on('click','button',function () {
                    layer.open({
                        type: 2,
                        // title: '',
                        //closeBtn: 0, //不显示关闭按钮
                        shadeClose: false,
                        shade: [0.5, '#000'],
                        area: ['800px', '550px'],
                        //offset: 'rb', //右下角弹出
                        //time: 2000, //2秒后自动关闭
                        anim: 2,
                        content: 'createtestpaper.html?type=2'
                    });
                })
            }
        }
    });
}
// 完成作业情况
function completesituation(id) {
    var teacherId=$(window).storager({key: 'feUid'}).readStorage();
    var userType=$(window).storager({key: 'feUType'}).readStorage();
    if(teacherId==null||teacherId==undefined||teacherId=='undefined'||userType!=3){
        layer.msg('请先登录');
        setTimeout(function () {
            window.location.href = ROOT+"login.html";
        },1000);
        return;
    }
    new Vue({
        el:"#completesituation",
        data:{
            paper:[],
            studentname:'',
            situation:''
        },
        filters: {
            addRootFile: function addRootFile(img) {
                return SERVERROOTFILE + img;
            },
            getState:function getState(state) {
                return state==0 ? "未完成":"已完成";
            }
        },
        mounted:function () {
            var _this=this;
            this.$nextTick(function () {
                _this.getpaper(_this.studentname,_this.situation);
            })
        },
        methods: {
            getpaper:function (studentname,situation) {
                var _this=this;
                this.$http.post(SERVERROOTDATA + "Course.ashx?action=getOrderLiveCourse",
                    {
                        userId:teacherId,
                        userType:'student',
                        studentname:studentname,
                        situation:situation
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        if(res.body.code==200){
                            _this.paper=[{
                                "title":"测试1","studentname":"艾斯比","state":"0","time":"2017-11-08"
                            }];
                            // _this.paper = res.body.rows;
                        }
                    })
            },
            bindFn:function () {
                var _this=this;
                $('.completesituation').on('click','#studentName',function () {
                    _this.getpaper();
                });
                $('.completesituation').on('click','#state',function () {
                    _this.getpaper();
                })
            }
        }
    });
}
function ECalendarisOpen(obj) {
    if(obj.length > 0) {
        obj.ECalendar({
            type: "date", //模式，time: 带时间选择; date: 不带时间选择;
            stamp: false, //是否转成时间戳，默认true;
            offset: [0, 2], //弹框手动偏移量;
            format: "yyyy-mm-dd", //时间格式 默认 yyyy-mm-dd hh:ii;
            //skin: 3, //皮肤颜色，默认随机，可选值：0-8,或者直接标注颜色值;
            step: 10, //选择时间分钟的精确度;
            callback: function(v, e) {} //回调函数
        });
    }
}
// 创建试卷
function createtestpaper(){
    var type=$(this).getUrlParam("type");
    ECalendarisOpen($("#publishtime"));
    ECalendarisOpen($("#endtime"));
    if(type==1){
        $('.examtype1').css('display','inline-block');
        $('.examtype2').css('display','none');
        $('.createtestpaper-content .fetitle>div:last-child').css('display','none');
        $('.createtestpaper-content p').on('click','button',function () {
            var list=$('<div class="felist clearfix"></div>');
            var xuhao=$('<div class="span2"><input type="checkbox"></div>');
            var examtype=$('<div class="span4"><select><option value="1">选择题</option></select></div>');
            var number=$('<div class="span3"><input type="text"></div>');
            list.append(xuhao);
            list.append(examtype);
            list.append(number);
            $('.feoperation').before(list);
        });
    }else{
        $('.examtype1').css('display','none');
        $('.examtype2').css('display','inline-block');
        $('.createtestpaper-content .fetitle>div:last-child').css('display','inline-block');
        $('.createtestpaper-content p').on('click','button',function () {
            var list=$('<div class="felist clearfix"></div>');
            var xuhao=$('<div class="span2"><input type="checkbox"></div>');
            var examtype=$('<div class="span4"><select><option value="1">选择题</option></select></div>');
            var number=$('<div class="span3"><input type="text"></div>');
            var score=$('<div class="span3"><input type="text"></div>');
            list.append(xuhao);
            list.append(examtype);
            list.append(number);
            list.append(score);
            $('.feoperation').before(list);
        });
    }
    $('.createtestpaper-content p').on('click','span',function () {
        var list=$('.felist input[type=checkbox]:checked');
        for(var i=0;i<list.length;i++){
            $(list[i]).parent().parent().remove();
        }
        if(list.length>0){
            layer.msg('已删除选择项');
        }
    });
    $('.feoperation').on('click','button:last-child',function () {
        parent.close();
    })
}
// 成员申请
function memberapply() {
    var uId=$(window).storager({key: 'feUid'}).readStorage();
    var userType=$(window).storager({key: 'feUType'}).readStorage();
    if(uId==null||uId==undefined||uId=='undefined'){
        layer.msg('请先登录');
        setTimeout(function () {
            window.location.href = ROOT+"login.html";
        },1000);
        return;
    }
    $('.femygroupdetail ul').on('click','li',function () {
        $(this).siblings().removeClass('active');
        $(this).addClass('active');
        var id=$(this).data('id');
        var showdom=$('.femygroupdetail .fecontent>div:nth-child('+id+')');
        // console.log(showdom);
        showdom.fadeIn(300);
        showdom.siblings().hide();
    });
    // 我发出的申请
    new Vue({
        el:"#send",
        data:{
            post:[],
            state:'',
            keyword:'',
            showItem:4,//页码显示条数
            allpage:'',//总页数
            current:1,//当前页
            groupArr:[]
        },
        filters: {
            addRootFile: function addRootFile(img) {
                return SERVERROOTFILE + img;
            },
            addTeacherRoot: function addTeacherRoot(id) {
                return ROOT + "teacherindex.html?teacherId=" + id;
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
        mounted:function () {
            var _this=this;
            this.$nextTick(function () {
                _this.getpost(1,_this.state,_this.keyword);
                _this.bingSelect();
            })
        },
        methods: {
            bingSelect:function () {
                var _this=this;
                //绑定状态搜索
                $('.mycreategrouppost').on('change','#group',function () {
                    _this.state = $(this).val();
                    _this.current = 1;
                    _this.getpost(_this.current, _this.state, _this.keyword);
                });
                // 绑定关键字搜索
                $('#keyword').on('blur',function () {
                    _this.keyword=$(this).val();
                    _this.current=1;
                    _this.getpost(_this.current,_this.state,_this.keyword);
                })
            },
            getpost:function (pageIndex,state,keyword) {
                var _this=this;
                this.$http.post('http://192.168.101.153:8033/ashx/' + "topic.ashx?action=getTopicGroupByUid",
                    {
                        state:state,
                        keyword:keyword,
                        uid:uId,
                        pageIndex:pageIndex,
                        pageSize:10
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        if(res.body.returnObj.length < 1) {
                            return false;
                        } else {
                            _this.allpage = res.body.totalPageCount; //总页数
                            _this.post = res.body.returnObj;
                        }
                    })
            },
            goto: function(index) { //枫叶处理
                var _this=this;
                if(index == this.current) return;
                if(index > this.allpage) {
                    this.current = this.current - 2;
                    layer.msg("Sorry ╮(╯_╰)╭ 没有下一页喽！");
                    return false;
                }
                this.current = index;
                _this.getpost(_this.current,_this.state,_this.keyword);
            }
        }
    });
    // 我收到的申请
    new Vue({
        el:"#receive",
        data:{
            post:[],
            time:'',
            state:'',
            showItem:4,//页码显示条数
            allpage:'',//总页数
            current:1//当前页
        },
        filters: {
            addRootFile: function addRootFile(img) {
                return SERVERROOTFILE + img;
            },
            addTeacherRoot: function addTeacherRoot(id) {
                return ROOT + "teacherindex.html?teacherId=" + id;
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
        mounted:function () {
            var _this=this;
            this.$nextTick(function () {
                _this.getpost(1,_this.time,_this.state);
                _this.bingSelect();
            })
        },
        methods: {
            bingSelect:function () {
                var _this=this;
                $('.mycreategrouppost').on('change','#time',function () {
                    _this.time=$(this).val();
                    _this.current=1;
                    _this.getpost(_this.current,_this.time,_this.state);
                });
                $('.mycreategrouppost').on('change','#state',function () {
                    _this.state=$(this).val();
                    _this.current=1;
                    _this.getpost(_this.current,_this.time,_this.state);
                });
            },
            getpost:function (pageIndex,time,state) {
                var _this=this;
                this.$http.post('http://192.168.101.153:8033/ashx/' + "topic.ashx?action=getTopicNoGroupByUid",
                    {
                        time:time,
                        state:state,
                        pageIndex:pageIndex,
                        pageSize:10,
                        uid:uId
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        if(res.body.returnObj.length < 1) {
                            return false;
                        } else {
                            _this.allpage = res.body.totalPageCount; //总页数
                            _this.post = res.body.returnObj;
                        }
                    })
            },
            goto: function(index) { //枫叶处理
                var _this=this;
                if(index == this.current) return;
                if(index > this.allpage) {
                    this.current = this.current - 2;
                    layer.msg("Sorry ╮(╯_╰)╭ 没有下一页喽！");
                    return false;
                }
                this.current = index;
                _this.getpost(_this.current,_this.time,_this.state);
            }
        }
    });
}
// 布置作业-遗弃版
function arrangeworkdetail(){
    new Vue({
        el:"#homeworkdetail",
        data:{
            homework:[],
            showItem:4,//页码显示条数
            allpage:'',//总页数
            current:1,//当前页
            subjectName:'',
            arrangeTime:'',
            myTiku:[],
            nodata:false
        },
        filters: {
            addRootFile: function addRootFile(img) {
                return SERVERROOTFILE + img;
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
        mounted:function () {
            var _this=this;
            this.$nextTick(function () {
                _this.bindTikuSelect();
                _this.bindDeleteTimu();
                _this.bindAddTimu();
                _this.lookAnswer();
                // _this.bindOdio();
            })
        },
        methods: {
            // 获取我的题库
            getMyTiku:function (pageIndex) {
                var _this=this;
                this.$http.post(SERVERROOTDATA + "questionWeb.ashx?action=getTeacherQuestionBankSketch",
                    {
                        teacherId:$(window).storager({key: 'feUid'}).readStorage(),
                        pageIndex:pageIndex,
                        pageSize:4
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        // if(res.body.code==200){
                            if(res.body.rows.length<1){
                                _this.nodata=true;
                            }else{
                                _this.nodata=false;
                            }
                            _this.myTiku = res.body.rows;
                            _this.allpage=res.body.totalPageCount;
                        // }
                    }).then(function () {
                        $('.fequestionList-content .feanswer a').removeClass('active');
                        $('.fequestionList-content .ferightanswer').css('display','none');
                })
            },
            lookAnswer:function () {
                $('.fequestionList-content').on('click','.fepanel .feanswer a',function () {
                    if($(this).hasClass('active')){
                        $(this).parent().parent().find('.ferightanswer').hide(300);
                        $(this).removeClass('active');
                    }else{
                        $(this).parent().parent().find('.ferightanswer').show(300);
                        $(this).addClass('active');
                    }
                })
            },
            // 题目预览
            preview:function (html) {
                layer.open({
                    type: 1,
                    // title:,
                    skin: 'layui-layer-rim', //加上边框
                    area: ['720px', 'auto'], //宽高
                    content: html
                });
            },
            goto: function(index) { //枫叶处理
                var _this=this;
                if(index == this.current) return;
                if(index > this.allpage) {
                    this.current = this.current - 2;
                    layer.msg("Sorry ╮(╯_╰)╭ 没有下一页喽！");
                    return false;
                }
                this.current = index;
                _this.getMyTiku(_this.current);
            },
            // 绑定题库选择按钮
            bindTikuSelect:function () {
                ECalendarisOpen($("#publishtime"));
                ECalendarisOpen($("#endtime"));
                var _this=this;
                $('.feteacherfamily').on('click','#selectTimuBtn',function () {
                    layer.open({
                        type: 1,
                        title:"题库选择",
                        area:['880px','600px'],
                        resize:false,
                        content: $('#mytiku') //这里content是一个DOM
                    });
                    _this.getMyTiku(1);
                });
            },
            // bindOdio:function () {
            //     $('.fecontent').on('click','.felist .odio',function () {
            //         if($(this).hasClass('active')){
            //             $(this).removeClass('active')
            //         }else{
            //             $(this).addClass('active');
            //         }
            //     })
            // },
            // 题库选择中添加到作业按钮
            addHomework:function (id,title,type) {
                // var newObj={
                //     tid:id,
                //     title:title
                // };
                function obj(name,value,type) {
                    this.tid=name;
                    this.title=value;
                    this.type=type;
                }
                this.homework.push(new obj(id,title,type));
                console.log(this.homework)
                // console.log(this.homework);
            },
            // 绑定1级作业页面 题目删除按钮
            bindDeleteTimu:function () {
                var _this=this;
                $('.feteacherfamily .feselect').on('click','p>span',function () {
                    layer.confirm('你确定要删除吗？', {
                        btn: ['确定','取消'] //按钮
                    }, function(){
                        var list=$('.felist').find('input[type=checkbox]:checked');
                        if(list.length<1){
                            layer.msg('无任何选择项');
                            return;
                        }
                        for(var i=0;i<list.length;i++){
                            // var id=$(list[i]).data('id');
                            var id=list[i].dataset.id;
                            console.log(id);
                            // $(list[i]).prop('checked','');
                            // _this.homework.remove(id,'tid');
                            _this.homework=remove1(_this.homework,id,'tid');
                            // console.log(_this.homework.remove(id,'tid'))
                        }
                        $('.felist').find('input[type=checkbox]').prop('checked','');
                        // console.log(_this.homework);
                        layer.closeAll()
                    }, function(){
                    });
                })
            },
            // 绑定新增试题按钮
            bindAddTimu:function () {
                var _this=this;
                $('.feteacherfamily').on('click','#addTimuBtn',function () {
                    layer.open({
                        type: 1,
                        title:"新增题目",
                        area:['880px','600px'],
                        resize:false,
                        content: $('#addnewtimu') //这里content是一个DOM
                    });
                });
            }
        }
    });
}
// Array.prototype.indexOf = function(val,id) {
//     for (var i = 0; i < this.length; i++) {
//         if (this[i][id] == val) return i;
//     }
//     return -1;
// };
// Array.prototype.remove = function(val,id) {
//     var index = this.indexOf(val,id);
//     if (index > -1) {
//         this.splice(index, 1);
//     }
// };
function remove1(obj,val,id) {
    var index=-1;
    for(var i = 0; i < obj.length; i++){
        if(obj[i][id]==val) index=i;
    }
    if(index>-1){
        obj.splice(index,1);
    }
    return obj;
}
// 布置作业1级弹框
function arrangeTaskPop() {
    new Vue({
        el:"#basicTask",
        data:{
            teacherClass:[],
            teacherCourse:[],
            teacherOutline:[]
        },
        filters: {
            addRootFile: function addRootFile(img) {
                return SERVERROOTFILE + img;
            }
        },
        mounted:function () {
            var _this=this;
            this.$nextTick(function () {
                _this.init();
                _this.getClass();
                _this.getCourse();
            })
        },
        methods: {
            init:function () {
                parent.ECalendarisOpen($("#endTime"));
                $('.fe-arrangetask-pop').on('click','#random',function () {
                    $('.fe-random').show()
                });
                $('.fe-arrangetask-pop').on('click','#static',function () {
                    $('.fe-random').hide()
                });
                $('.fe-arrangetask-pop').on('click','.fe-random button',function () {
                    parent.layer.open({
                        type: 2,
                        title: '知识点大纲',
                        //closeBtn: 0, //不显示关闭按钮
                        shadeClose: false,
                        shade: [0.5, '#000'],
                        area: ['600px', '400px'],
                        //offset: 'rb', //右下角弹出
                        //time: 2000, //2秒后自动关闭
                        anim: 2,
                        content: 'knowledgepointPop.html?type=1'
                    })

                });
                // 添加题型
                $('.fe-arrangetask-pop').on('click','#hidden-btn',function () {
                    var kn=$('#knowledgeName').val();
                    var content=$('<div class="fe-add-new-timu"></div>');
                    var span=$('<span>'+ kn +'</span>');
                    var selectQuestion=$('<select></select>');
                    var selectNandu=$('<select><option value="1">简单</option><option value="2">一般</option><option value="3">困难</option></select>');
                    var other=$('<div style="display: inline-block">&nbsp;&nbsp;题数: <input type="text" style="width: 80px"> /0 &nbsp;&nbsp;单题分数: <input type="text" style="width: 80px"><b class="uk-icon-trash"></b></div>');
                    content.append(span);
                    content.append(selectQuestion);
                    content.append(selectNandu);
                    content.append(other);
                    $(this).before(content);
                });
                $('.fe-arrangetask-pop').on('click','.fe-save button',function () {
                    parent.layer.closeAll();
                    parent.layer.open({
                        type: 2,
                        title: '题库选题',
                        //closeBtn: 0, //不显示关闭按钮
                        shadeClose: false,
                        shade: [0.5, '#000'],
                        area: ['880px', '593px'],
                        //offset: 'rb', //右下角弹出
                        //time: 2000, //2秒后自动关闭
                        anim: 2,
                        content: 'selectquestionPop.html'
                    })
                });
                $('.fe-arrangetask-pop').on('click','.fe-add-new-timu b',function () {
                    $(this).parent().parent().remove();
                })
            },
            getClass:function () {
                var _this = this;
                this.$http.post("ashx/teacherCenter.ashx?action=getTeacherClass",
                    {
                        pageIndex: 1,
                        pageSize: 9999
                    }
                    , { emulateJSON: true }).then(function (res) {
                    if (res.body != "go_login") {
                        _this.teacherClass = res.body.rows;
                    }
                    else {
                        top.location.href = "../login.html";
                    }
                })

            },
            getCourse:function () {
                var _this = this;
                this.$http.post("ashx/teacherCenter.ashx?action=getTeacherCourse",
                    {

                    }
                    , { emulateJSON: true }).then(function (res) {
                    if (res.body != "go_login") {
                        _this.teacherCourse = res.body.rows;
                    }
                    else {
                        top.location.href = "../login.html";
                    }
                })

            },
            getOutline:function () {
                
            }
        }
    });
}
// 选择题目弹框
function selectQuestionPop() {
    new Vue({
        el:"#selectQuestion",
        data:{

        },
        filters: {
            addRootFile: function addRootFile(img) {
                return SERVERROOTFILE + img;
            }
        },
        mounted:function () {
            var _this=this;
            this.$nextTick(function () {
                _this.init();
            })
        },
        methods: {
            init:function () {
                // var index = parent.layer.getFrameIndex(window.name);
                $('.fe-select-question-pop').on('click','.feoperation button',function () {
                    // parent[0].$('#hh').click();
                    // parent[0].$('#hh').text('哈哈');
                    // parent.layer.close(index);
                });
                // 分类按钮
                $('.fe-select-question-pop').on('click','.fe-classify button',function () {
                    parent.layer.open({
                        type: 2,
                        title: '知识点大纲',
                        //closeBtn: 0, //不显示关闭按钮
                        shadeClose: false,
                        shade: [0.5, '#000'],
                        area: ['600px', '400px'],
                        //offset: 'rb', //右下角弹出
                        //time: 2000, //2秒后自动关闭
                        anim: 2,
                        content: 'knowledgepointPop.html?type=2'
                    })
                });
                // 子类触发分类筛选方法
                $('.fe-select-question-pop').on('click','#hidden-btn1',function () {
                    var kn=$('#knowledgeName1').val();
                    // console.log(kn);
                    $('.fe-classify button').css('display','none');
                    $('.fe-already-mes a').html(kn);
                    $('.fe-already-mes a').attr('title',kn);
                    $('.fe-already-mes').css('display','inline-block');
                });
                $('.fe-select-question-pop').on('click','.fe-already-mes b',function () {
                    $('.fe-classify button').css('display','inline-block');
                    $('.fe-already-mes').css('display','none');
                });
                // 难度按钮
                $('.fe-select-question-pop').on('click','.fe-difficulty button',function () {
                    if($(this).hasClass('active')){
                        $(this).parent().find('ul').css('display','none');
                        $(this).removeClass('active');
                    }else{
                        $(this).addClass('active');
                        $(this).parent().find('ul').css('display','block')
                    }
                });
                $('.fe-select-question-pop .fe-difficulty').on('click','ul li',function () {
                    var text=$(this).html();
                    var id=$(this).data('id');
                    $(this).parent().hide();
                    $('.fe-already-difficulty').show();
                    $('.fe-already-difficulty a').html(text);
                    $('.fe-difficulty button').hide();
                });
                $('.fe-select-question-pop .fe-difficulty').on('click','.fe-already-difficulty b',function () {
                    $('.fe-already-difficulty').hide();
                    $('.fe-difficulty button').show();
                    $('.fe-difficulty button').removeClass('active');
                });
                // 类型按钮
                $('.fe-select-question-pop').on('click','.fe-type button',function () {
                    if($(this).hasClass('active')){
                        $(this).parent().find('ul').css('display','none');
                        $(this).removeClass('active');
                    }else{
                        $(this).addClass('active');
                        $(this).parent().find('ul').css('display','block')
                    }
                });
                $('.fe-select-question-pop .fe-type').on('click','ul li',function () {
                    var text=$(this).html();
                    var id=$(this).data('id');
                    $(this).parent().hide();
                    $('.fe-already-type').show();
                    $('.fe-already-type a').html(text);
                    $('.fe-type button').hide();
                });
                $('.fe-select-question-pop .fe-type').on('click','.fe-already-type b',function () {
                    $('.fe-already-type').hide();
                    $('.fe-type button').show();
                    $('.fe-type button').removeClass('active');
                });
                // 重新选择按钮
                $('.fe-select-question-right').on('click','.fe-select-question-right-top button',function () {
                    
                });
                // 生成作业按钮
                $('.fe-select-question-pop').on('click','.feoperation button',function () {
                    alert('哈哈');
                })
            }
        }
    });
}
// 知识点弹框
function knowledgepointPop(type) {
    new Vue({
        el:"#knowledgePoint",
        data:{

        },
        filters: {
            addRootFile: function addRootFile(img) {
                return SERVERROOTFILE + img;
            }
        },
        mounted:function () {
            var _this=this;
            this.$nextTick(function () {
                _this.init();
            })
        },
        methods: {
            init:function () {
                // 绑定头部切换分类
                $('.fe-knowledgepoint-pop').on('click','.fe-nav span',function () {
                    if($(this).hasClass('active')){
                        return;
                    }else{
                        $(this).siblings().removeClass('active');
                        $(this).addClass('active');
                        var id=$(this).data('id');
                        if(id==0){
                            $('.fe-person').show();
                            $('.fe-system').hide();
                        }else{
                            $('.fe-person').hide();
                            $('.fe-system').show();
                        }
                    }
                });
                // 知识点层叠开关
                $('.fe-knowledgepoint-pop').on('click','i',function () {
                    if($(this).hasClass('uk-icon-plus-square-o')){
                        $(this).next().next().show();
                        $(this).removeClass();
                        $(this).addClass('uk-icon-minus-square-o');
                    }else{
                        $(this).next().next().hide();
                        $(this).removeClass();
                        $(this).addClass('uk-icon-plus-square-o');
                    }
                });
                $('.fe-knowledgepoint-pop').on('click','h4',function () {
                    // 组卷规则
                    var index = parent.layer.getFrameIndex(window.name);
                    if(type==1){
                        var h=$(this).text();
                        // console.log(h);
                        parent[0].$('#knowledgeName').val(h);
                        parent[0].$('#hidden-btn').click();
                        parent.layer.close(index);
                    }else if(type==2){
                        console.log('我来了')
                        var h1=$(this).text();
                        // console.log(h);
                        parent[0].$('#knowledgeName1').val(h1);
                        parent[0].$('#hidden-btn1').click();
                        parent.layer.close(index);
                    }

                });
            }
        }
    });
}
// 批量导入试题
function batchImportQuestion() {
    new Vue({
        el:"#batchImportQuestion",
        data:{
            checkFlag:false,
            checkContent:'',
            questions:[],
            leftCon:''
        },
        filters: {
            addRootFile: function addRootFile(img) {
                return SERVERROOTFILE + img;
            },
            getType:function (type) {
                switch (type){
                    case 1:
                        return '选择题';
                        break;
                    case 2:
                        return '多选题';
                        break;
                    case 3:
                        return '判断题';
                        break;
                    case 4:
                        return '问答题';
                        break;
                    case 5:
                        return '填空题';
                        break;
                }
            }
        },
        mounted:function () {
            var _this=this;
            this.$nextTick(function () {
                _this.init();
            })
        },
        methods: {
            init:function () {
                var screenH=$(window).height()-71;
                var _this=this;
                $('.fe-batchimport-question-left .fe-left-con').css('height',screenH);
                $('.fe-batchimport-question-right .fe-right-con').css('height',screenH);

                // 导入文档按钮
                $('.fe-batchimport-question-left').on('click','.fe-left-nav #word',function () {
                    console.log('hh')
                    if($('.fe-word-type').hasClass('active')){
                        $('.fe-word-type').slideUp(300);
                        $('.fe-word-type').removeClass('active');
                    }else{
                        $('.fe-word-type').slideDown(300);
                        $('.fe-word-type').addClass('active');
                    }
                });
                $('.fe-batchimport-question-left').on('click','.fe-word-type  .fe-bottom button',function () {
                    $('.fe-word-type').slideUp(300);
                    $('.fe-word-type').removeClass('active');
                });
                // 识别
                $('.fe-batchimport-question').on('click','.feoperation button:first-child',function () {
                    var index = layer.load(1, {
                        shade: [0.1,'#fff'] //0.1透明度的白色背景
                    });
                    _this.$http.post( 'http://www.fetv.cn/fe/QuestionsForTeacher/'+"QuestionsInput.ashx?action=CheckWord",
                        {

                        }
                        ,{emulateJSON: true})
                        .then(function (res) {
                            // console.log(res.body);
                            layer.closeAll();
                            if(res.body.code==200){
                                _this.checkFlag=res.body.returnJson.checkFlag;
                                _this.checkContent=res.body.returnJson.checkContent;
                                _this.questions=res.body.returnJson.questions;
                            }else{
                                layer.msg('识别错误，请按格式更改')
                                _this.checkFlag=false;
                                _this.checkContent=res.body.returnJson;
                                _this.questions=[];
                            }
                        }).then(function () {
                            // var imgs=$('.fe-batchimport-question-right .fe-right-con .fe-items span img');
                            // console.log(imgs);
                            // for(var i=0;i<imgs.length;i++){
                            //     var url=$(imgs[i])[0].src;
                            //     console.log('------');
                            //     console.log(url);
                            //     $(imgs[i]).attr('src',url.splice('/%22')[1]);
                            // }
                    })
                });
                // 保存
                $('.fe-batchimport-question').on('click','.feoperation button:last-child',function () {
                    var index = layer.load(1, {
                        shade: [0.1,'#fff'] //0.1透明度的白色背景
                    });
                    var uid=$(window).storager({key: 'feUid'}).readStorage();
                    var userType=$(window).storager({key: 'feUType'}).readStorage();
                    if(uid==undefined||uid==null||uid=='undefined'||userType!=3){
                        layer.msg('请先登录');
                        setTimeout(function () {
                            layer.closeAll();
                        },1000);
                        return;
                    }
                    _this.$http.post( 'http://www.fetv.cn/fe/QuestionsForTeacher/'+"QuestionsInput.ashx?action=SaveWord",
                        {
                            teacherId:uid
                        }
                        ,{emulateJSON: true})
                        .then(function (res) {
                            // console.log(res.body);
                            layer.closeAll();
                            if(res.body.code==200){
                                layer.msg('导入成功！');
                                $('.fe-batchimport-question-left').css('display','none');
                                $('.fe-batchimport-question-right').css('display','none');
                                $('.feoperation').css('display','none');
                                $('.fe-goback').css('display','block');
                            }

                        })
                });
                // 右边筛选
                $('.fe-batchimport-question-right').on('click','.fe-right-nav span',function () {
                    if($(this).hasClass('active')){
                        return
                    }else{
                        $(this).siblings().removeClass('active');
                        $(this).addClass('active');
                        var id=$(this).data('id');
                        _this.$http.post('http://www.fetv.cn/fe/QuestionsForTeacher/'+'QuestionsInput.ashx?action=FilterCheckResult',
                            {
                                type:id
                            }
                            ,{emulateJSON: true})
                            .then(function (res) {
                                // console.log(res.body)
                                if(res.body.code==200){
                                _this.checkFlag=res.body.returnJson.checkFlag;
                                _this.checkContent=res.body.returnJson.checkContent;
                                _this.questions=res.body.returnJson.questions;
                                }
                            })
                    }
                })
                // 上传word
                $('.fe-batchimport-question .fe-word-type').on('change','#upload',function () {
                    $('.fe-word-type').removeClass('active');
                    $('.fe-word-type').slideUp(300);
                    var data = new FormData($('#upload-form')[0]);
                    // var uid=$(window).storager({key: 'feUid'}).readStorage();
                    // data.append('teacherId',uid);
                    var index = layer.load(1, {
                        shade: [0.1,'#fff'] //0.1透明度的白色背景
                    });
                    $.ajax({
                        url: 'http://www.fetv.cn/fe/QuestionsForTeacher/'+"QuestionsInput.ashx?action=UploadWord",
                        type: "POST",
                        data: data,
                        processData: false,  // 告诉jQuery不要去处理发送的数据
                        contentType: false,   // 告诉jQuery不要去设置Content-Type请求头
                        success:function (res) {
                            layer.closeAll();
                            var result = JSON.parse(res);
                            // console.log(result);
                            if(result.code==200){
                                _this.leftCon=result.returnJson;
                            }
                            // console.log(res);
                        }
                    });
                })
            }
        }
    });
}
// 图片作业
function photoTask() {
    new Vue({
        el:"#photoTask",
        data:{
            teacherClass:[],
            teacherCourse:[],
            teacherOutline:[]
        },
        filters: {
            addRootFile: function addRootFile(img) {
                return SERVERROOTFILE + img;
            }
        },
        mounted:function () {
            var _this=this;
            this.$nextTick(function () {
                _this.init();
                _this.getClass();
                _this.getCourse();
            })
        },
        methods: {
            init:function () {
                //配置需要引入jq 1.7.2版本以上
                //服务器端成功返回 {state:1,path:文件保存路径}
                //服务器端失败返回 {state:0,errmsg:错误原因}
                //默认做了文件名不能含有中文,后端接收文件的变量名为file
                $("#zwb_upload").bindUpload({
                    url:"/home/index/upload",//上传服务器地址
                    callbackPath:"#callbackPath2",//绑定上传成功后 图片地址的保存容器的id或者class 必须为input或者textarea等可以使用$(..).val()设置之的表单元素
                    // ps:值返回上传成功的 默认id为#callbackPath  保存容器为位置不限制,id需要加上#号,class需要加上.
                    // 返回格式为:
                    // 原来的文件名,服务端保存的路径|原来的文件名,服务端保存的路径|原来的文件名,服务端保存的路径|原来的文件名,服务端保存的路径....
                    num:8,//上传数量的限制 默认为空 无限制
                    type:"jpg|png|gif|svg",//上传文件类型 默认为空 无限制
                    size:3,//上传文件大小的限制,默认为5单位默认为mb
                });
                parent.ECalendarisOpen($("#endTime"));
                $('.fe-arrangetask-pop').on('click','.fe-save button',function () {
                    alert('哈哈');
                });
            },
            getClass:function () {
                var _this = this;
                this.$http.post("ashx/teacherCenter.ashx?action=getTeacherClass",
                    {
                        pageIndex: 1,
                        pageSize: 9999
                    }
                    , { emulateJSON: true }).then(function (res) {
                    if (res.body != "go_login") {
                        _this.teacherClass = res.body.rows;
                    }
                    else {
                        top.location.href = "../login.html";
                    }
                })

            },
            getCourse:function () {
                var _this = this;
                this.$http.post("ashx/teacherCenter.ashx?action=getTeacherCourse",
                    {

                    }
                    , { emulateJSON: true }).then(function (res) {
                    if (res.body != "go_login") {
                        _this.teacherCourse = res.body.rows;
                    }
                    else {
                        top.location.href = "../login.html";
                    }
                })

            },
            getOutline:function () {

            }
        }
    });
}
// 问答社区-我的回答
function teacherQAmyreply() {
    var uId=$(window).storager({key: 'feUid'}).readStorage();
    var userType=$(window).storager({key: 'feUType'}).readStorage();
    if(uId==null||uId==undefined||uId=='undefined'||userType!=3){
        layer.msg('请先登录');
        setTimeout(function () {
            window.location.href = ROOT+"login.html";
        },1000);
        return;
    }
    new Vue({
        el:"#QAmyreply",
        data:{
            replyList:[],
            Qtype:0,
            showItem:4,//页码显示条数
            allpage:'0',//总页数
            current:1,
            nodata:false,
            isFree:true
        },
        filters: {
            addRootFile: function addRootFile(img) {
                return SERVERROOTFILE + 'uploads/images/' + img;
            },
            addRoot:function addRoot(id,c) {
                return ROOT + "knowledgereplydetail.html?questionId="+id +"&r=0" + "&c=" + c ;
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
        mounted:function () {
            var _this=this;
            this.$nextTick(function () {
                this.getList(_this.current,_this.Qtype);
            })
        },
        methods: {
            bindSelect:function (event,Qtype,isfree) {
                $(event.target).addClass('active');
                $(event.target).parent().siblings().find('span').removeClass('active');
                this.current=1;
                this.Qtype=Qtype;
                this.isFree = isfree;
                this.replyList=[];
                this.getList(this.current,this.Qtype);
            },
            getList:function(pageIndex,Qtype){
                var _this=this;
                var index = layer.load(1, {
                    shade: [0.1,'#fff'] //0.1透明度的白色背景
                });
                this.$http.post(SERVERROOTDATA + "KnowledgePay.ashx?action=getMyKPResponseList",
                    {
                        userId:uId,
                        userType:userType,
                        Qtype:Qtype,
                        pageIndex:pageIndex,
                        pageSize:10
                    }
                    , {emulateJSON: true})
                    .then(function (res) {
                        layer.close(index);
                        if(res.body.code==200){
                            if(res.body.rows.length<1){
                                _this.nodata=true;
                            }else{
                                _this.nodata=false;
                            }
                            _this.replyList = res.body.rows;
                            _this.allpage = res.body.totalPageCount;
                        }
                    })
            },
            answer:function (id) {
                window.open(ROOT + "knowledgereplydetail.html?questionId="+id +"&r=0" + "&c=1");
            },
            goto: function(index) { //枫叶处理
                var _this=this;
                if(index == this.current) return;
                if(index > this.allpage) {
                    this.current = this.current - 2;
                    layer.msg("Sorry ╮(╯_╰)╭ 没有下一页喽！");
                    return false;
                }
                this.current = index;
                _this.getList(_this.current,_this.Qtype);
                // $.scrollTo($('#problemcollection').offset().top, 300);
            }
        }
    });
}