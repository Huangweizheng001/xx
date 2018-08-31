/**
 * Created by Administrator on 2017/11/22 0022.
 */
// ROOT =ROOT.substring(0,ROOT.length-13);
Vue.component('parent-header-template', {
    template: '<div style="background: #f4f4f4">' +
    '<div class="fe-header-top-bar">' +
    '<div class="container">' +
    '<a class="fe-header-top-logo wow slideInLeft" v-bind:href="index | addRoot">' +
    '<img v-bind:src="smallLogo | addRoot" alt="福建教育网" />&nbsp;网站首页' +
    '</a>|&nbsp;&nbsp;' +
    '<a href="#this">App 下载</a>' +
    '<div class="fe-header-top-other" style="margin-right: 50px">' +
    '<a v-show="!isLogined" v-bind:href="login| addRoot" @click="setPrePage">登录</a>' +
    '<a v-show="!isLogined" v-bind:href="reg| addRoot" @click="setPrePage">&nbsp;/&nbsp;注册</a>' +
    '<a v-show="isLogined"  v-bind:href="member | addRoot" >{{nickName}}</a>' +
    '<a v-show="isLogined" @click="signOut">&nbsp;/&nbsp;退出</a>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '<div class="container">' +
    '<form action="" id="membercenter">'+
    '<div class="festudent-head feparent-head-bg">' +
    '<div class="feimage">' +
    '<img v-bind:src="headimg | addRootFile"/>' +
    '<input type="file" id="mytx" name="mphoto">'+
    '<b>上传头像</b>' +
    '</div>'+
    '<div class="febox">' +
    '<h2>{{nickName}}</h2>' +
    // '<h4><span>关注：88</span><span>粉丝：133</span></h4>' +
    '</div>'+
    '</div>' +
    '</form>'+
    '</div>'+
    '</div>',
    data: function data() {
        return {
            isLogined: false,
            nickName: 'xxx',
            index: 'index.html',
            login: 'login.html',
            reg: 'login.html?login=3',
            member: 'parentcenter/parentaccountinformation.html',
            smallLogo: 'images/public/logo-icon-small.png',
            headimg:"images/temp/mr-tx.png"
        };
    },
    mounted: function mounted() {
        //1.0ready --> 2.0
        this.$nextTick(function() {
            //初始化
            this.initData();
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
                this.headimg = $(window).storager({
                    key: 'feUIcon'
                }).readStorage();
            }
        },
        changeTx:function changeTx() {
            $('.festudent-head').on('change','#mytx',function () {
                var parentId=$(window).storager({key: 'feUid'}).readStorage();
                if(parentId==undefined||parentId==null||parentId=='undefined'){
                    layer.msg('请先登录');
                    return;
                }
                if($(this).val().match( /.jpg|.gif|.png|.bmp/i)) {
                    var data = new FormData($('#membercenter')[0]);
                    data.append('userId',parentId);
                    data.append('userType','parent');
                    $.ajax({
                        url: SERVERROOTDATA+"User.ashx?action=updateUserHeadPortrait",
                        type: "POST",
                        data: data,
                        processData: false,  // 告诉jQuery不要去处理发送的数据
                        contentType: false,   // 告诉jQuery不要去设置Content-Type请求头
                        success:function (res) {
                            var data = JSON.parse(res);
                            if(data.code==200){
                                layer.msg('更新头像成功！');
                                $.ajax({
                                    url: SERVERROOTDATA+"User.ashx?action=getUserHeadPortrait",
                                    type: "POST",
                                    data: {"userId":parentId,"userType":"parent"},
                                    // processData: false,  // 告诉jQuery不要去处理发送的数据
                                    // contentType: false,   // 告诉jQuery不要去设置Content-Type请求头
                                    success:function (res) {
                                        var data = JSON.parse(res);
                                        if(data.length<1){
                                            return false
                                        }else{
                                            window.localStorage.setItem("feUIcon",data.rows[0].iconPath);
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
//上传图像，并显示图像
//c:点击节点，即点击input type=fille 后内容存贮
//d:存贮图像的节点
var upload = function (c, d) {
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
Vue.component('parent-left-template', {
    template:   '<div class="feteacherpersonalcenter-left">' +
    '<h1>我的首页</h1>' +
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
            list:[
                {
                    icon:"uk-icon-book",
                    parent:"学习中心",
                    children:[
                        {
                            href:"parentmycourse.html",
                            name:"我的课程"
                        },
                        {
                            href:"parentlearningnote.html",
                            name:"学习笔记"
                        },
                        {
                            href:"parentdownload.html",
                            name:"下载管理"
                        }
                        // {
                        //     href:"studentmyhomework.html",
                        //     name:"我的作业"
                        // }
                    ]
                },
                {
                    icon:"uk-icon-user",
                    parent:"个人中心",
                    children:[
                        {
                            href:"parentaccountinformation.html",
                            name:"账号信息"
                        },
                        {
                            href:"parentsecuritysetting.html",
                            name:"安全设置"
                        },
                        {
                            href:"parentinvitefriend.html",
                            name:"邀请好友"
                        },
                        {
                            href:"parentmychild.html",
                            name:"我的孩子"
                        },
                        {
                            href:"parentmyteacher.html",
                            name:"我的老师"
                        },
                        {
                            href:"parentmeeting.html",
                            name:"家校互动"
                        }
                    ]
                },
                {
                    icon:"uk-icon-bell-o",
                    parent:"消息中心",
                    children:[
                        {
                            href:"parentorder.html",
                            name:"订单管理"
                        },
                        // {
                        //     href:"",
                        //     name:"提醒私信"
                        // },
                        // {
                        //     href:"",
                        //     name:"订阅关注"
                        // },
                        // {
                        //     href:"",
                        //     name:"评价回复"
                        // }
                        {
                            href:"parentansweringreply.html",
                            name:"我的消息"
                        }
                    ]
                },
                {
                    icon:"uk-icon-star-o",
                    parent:"收藏关注",
                    children:[
                        {
                            href:"parentcoursecollection.html",
                            name:"课程收藏"
                        },
                        {
                            href:"parentmyattention.html",
                            name:"老师关注"
                        }
                    ]
                }
                // {
                //     icon:"uk-icon-life-ring",
                //     parent:"社圈小组",
                //     children:[
                //         {
                //             href:"",
                //             name:"我的动态"
                //         },
                //         {
                //             href:"",
                //             name:"我的家长"
                //         },
                //         {
                //             href:"",
                //             name:"我的小组"
                //         },
                //         {
                //             href:"",
                //             name:"我的帖子"
                //         }
                //     ]
                // }
            ]
        };
    },
    mounted: function mounted() {
        //1.0ready --> 2.0
        this.$nextTick(function() {
            //初始化
            this.addActive();
        });
    },
    filters: {
        addRoot: function addRoot(obj) {
            return ROOT + obj;
        }
    },
    methods: {
        addActive: function addActive() {
            var url = window.location.pathname.split('/');
            // console.log(url[url.length - 1]);
            var currentUrl = url[url.length - 1];
            $('.feteacherpersonalcenter-left-content .fechild li a').removeClass('active');
            $('.feteacherpersonalcenter-left-content .fechild li a[href$="' + currentUrl + '"]').addClass('active');
        }
    }
});
var leftaside = new Vue({
    el: '#leftaside'
});
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
ECalendarisOpen($("#birth"));
// 账号信息
function accountinformation() {
    var parentId=$(window).storager({key: 'feUid'}).readStorage();
    var userType=$(window).storager({key: 'feUType'}).readStorage();
    if(parentId==null||parentId==undefined||parentId=='undefined'||userType!=2){
        layer.msg('请先登录');
        setTimeout(function () {
            window.location.href = ROOT+"login.html";
        },1000);
        return;
    }
    $.ajax({//基本信息
        url: SERVERROOTDATA+"User.ashx?action=getBasicInfo",
        type: "POST",
        data: {userId:parentId,userType:'parent'},
        success:function (res) {
            var data = JSON.parse(res);
            if(data.length<1){

            }else {// 初始化基本信息
                if(data.rows.length<1){

                }else{
                    $('#username').val(data.rows[0].userName);
                    $('#nickname').val(data.rows[0].nickName);
                    if (data.rows[0].sex == '0') {
                        $('#male').prop('checked', 'true');
                        $('#female').prop('checked', '');
                        $('#male').prev().html('男');
                    } else {
                        $('#male').prop('checked', '');
                        $('#female').prop('checked', 'true');
                        $('#male').prev().html('女');
                    }
                    $('#birth').val(data.rows[0].birthDay)
                    $('#address').val(data.rows[0].address)
                }
            }
        }
    });
    $.ajax({//联系方式
        url: SERVERROOTDATA+"User.ashx?action=getContact",
        type: "POST",
        data: {userId:parentId,userType:'parent'},
        success:function (res) {
            var data = JSON.parse(res);
            if(data.length<1){

            }else {// 初始化联系方式
                if (data.rows.length < 1) {

                } else {
                    $('#email').val(data.rows[0].email);
                    $('#phone').val(data.rows[0].mobile);
                    $('#qq').val(data.rows[0].qq);
                }
            }
        }
    });
    // 基本信息-编辑按钮事件
    $('#information').on('click','.fepersonaldata-title span',function () {
        if(!$(this).hasClass('active')){
            $(this).addClass('active');
            $('#information input[type="text"]:not("#nickname")').prop('disabled','');
            $('#information i').css('display','none');
            $('#information input[type="radio"]').removeClass('fehidden');
            $('#information label').removeClass('fehidden');
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
                if(!isEmpty($('#nickname').val())){
                    layer.msg('昵称不能为空！');
                    return;
                }else {
                    // 保存数据
                    var data = new FormData($('#information-form')[0]);
                    data.append('userId',parentId);
                    data.append("birthDay",$('#birth').val());
                    data.append("userType",'parent');
                    $.ajax({
                        url: SERVERROOTDATA+"User.ashx?action=updateBasicInfo",
                        type: "POST",
                        data: data,
                        processData: false,  // 告诉jQuery不要去处理发送的数据
                        contentType: false,   // 告诉jQuery不要去设置Content-Type请求头
                        success:function (res) {
                            var data = JSON.parse(res);
                            if(data.code==200){
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
                    data.append('userId',parentId);
                    data.append('userType','parent');
                    $.ajax({
                        url: SERVERROOTDATA+"User.ashx?action=updateContactInfo",
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
}
// 我的课程
function mycourse() {
    var parentId=$(window).storager({key: 'feUid'}).readStorage();
    var userType=$(window).storager({key: 'feUType'}).readStorage();
    if(parentId==null||parentId==undefined||parentId=='undefined'||userType!=2){
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
                $('#livecourse').css('display','block');
                $('#recordedcourse').css('display','none');
            }else{
                $('#livecourse').css('display','none');
                $('#recordedcourse').css('display','block');
            }
        }
    });
    new Vue({
        el:"#livecourse",
        data:{
            livecourse:[],
            showItem:4,//页码显示条数
            allpage:'',//总页数
            current:1,//当前页
            subjectName:'',
            courseName:'',
            playState:''
        },
        filters: {
            addRootFile: function addRootFile(img) {
                return SERVERROOTFILE + img;
            },
            addCourseRoot:function addCourseRoot(id) {
                return ROOT + 'cloundcoursedetail.html?courseId='+id;
            },
            goToLive:function goToLive(cid,pid) {
                return ROOT + "liveroom.html?channelId="+cid+"&channelProgramId="+pid;
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
                _this.getlivecourse(1,_this.subjectName,_this.courseName,_this.playState);
                _this.bindSearch();
                _this.emptySearch();
            })
        },
        methods: {
            getlivecourse:function (pageIndex,subjectName,courseName,playState) {
                var _this=this;
                var index = layer.load(1, {shade: false}); //0代表加载的风格，支持0-2
                this.$http.post(SERVERROOTDATA + "Course.ashx?action=getEnrollentLiveCourse",
                    {
                        userId:parentId,
                        userType:'parent',
                        subjectName:subjectName,
                        courseName:courseName,
                        playState:playState,
                        pageIndex:pageIndex,
                        pageSize:5
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        layer.closeAll();
                        if(res.body.code==200){
                            _this.livecourse = res.body.rows;
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
                _this.getlivecourse(_this.current,_this.subjectName,_this.courseName,_this.playState);
            },
            bindSearch:function bindSearch() {
                var _this=this;
                $('#livecourse .feselect .feoperation').on('click','button:first-child',function () {
                    _this.subjectName=$(this).parent().parent().find('#subject1').val();
                    _this.courseName=$(this).parent().parent().find('#courseName1').val();
                    _this.playState=$(this).parent().parent().find('#playState1').val();
                    _this.current=1;
                    _this.getlivecourse(_this.current,_this.subjectName,_this.courseName,_this.playState);
                });
            },
            emptySearch:function emptySearch() {
                var _this=this;
                $('#livecourse .feselect .feoperation').on('click','button:last-child',function () {
                    $(this).parent().parent().find('#subject1').val('');
                    $(this).parent().parent().find('#courseName1').val('');
                    $(this).parent().parent().find('#playState1').val('');
                    _this.current=1;
                    _this.subjectName='';
                    _this.courseName='';
                    _this.playState='';
                    _this.getlivecourse(_this.current,_this.subjectName,_this.courseName,_this.playState);
                });
            },
            //评价
            pingjia:function (id,kid) {
                layer.open({
                    type: 2,
                    title: '添加评价',
                    //closeBtn: 0, //不显示关闭按钮
                    shadeClose: false,
                    shade: [0.5, '#000'],
                    area: ['520px', '400px'],
                    //offset: 'rb', //右下角弹出
                    //time: 2000, //2秒后自动关闭
                    anim: 2,
                    resize:false,
                    content: '../addcoursecomment.html?courseId='+ id + "&courseKind=" + kid
                });
            }
        }
    });
    new Vue({
        el:"#recordedcourse",
        data:{
            recordedcourse:[],
            showItem:4,//页码显示条数
            allpage:'',//总页数
            current:1,//当前页
            subjectName:'',
            courseName:''
            // playState:''
        },
        filters: {
            addRootFile: function addRootFile(img) {
                return SERVERROOTFILE + img;
            },
            addCourseRoot:function addCourseRoot(id) {
                return ROOT + 'coursedetail.html?courseId='+id;
            },
            goToCourse:function goToCourse(cid,weike) {
                return ROOT+'courseplayer.html?cid='+cid+"&vid=" +"&courseType=0" +"&courseKind="+weike;
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
                _this.getrecordedcourse(1,_this.subjectName,_this.courseName);
                _this.bindSearch();
                _this.emptySearch();
            })
        },
        methods: {
            getrecordedcourse:function (pageIndex,subjectName,courseName) {
                var _this=this;
                var index = layer.load(1, {shade: false}); //0代表加载的风格，支持0-2
                this.$http.post(SERVERROOTDATA + "Course.ashx?action=getEnrollentRecordCourse",
                    {
                        userId:parentId,
                        userType:'parent',
                        subjectName:subjectName,
                        courseName:courseName,
                        // playState:playState,
                        pageIndex:pageIndex,
                        pageSize:5
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        layer.closeAll();
                        if(res.body.code==200){
                            _this.recordedcourse = res.body.rows;
                            _this.allpage=res.body.totalPageCount;
                        }
                    })
            },
            //评价
            pingjia:function (id,kid) {
                layer.open({
                    type: 2,
                    title: '添加评价',
                    //closeBtn: 0, //不显示关闭按钮
                    shadeClose: false,
                    shade: [0.5, '#000'],
                    area: ['520px', '400px'],
                    //offset: 'rb', //右下角弹出
                    //time: 2000, //2秒后自动关闭
                    anim: 2,
                    resize:false,
                    content: '../addcoursecomment.html?courseId='+ id + "&courseKind=" + kid
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
                _this.getrecordedcourse(_this.current,_this.subjectName,_this.courseName);
            },
            bindSearch:function bindSearch() {
                var _this=this;
                $('#recordedcourse .feselect .feoperation').on('click','button:first-child',function () {
                    _this.subjectName=$(this).parent().parent().find('#subject2').val();
                    _this.courseName=$(this).parent().parent().find('#courseName2').val();
                    // _this.playState=$(this).parent().parent().find('#playState2').val();
                    _this.current=1;
                    _this.getrecordedcourse(_this.current,_this.subjectName,_this.courseName);
                });
            },
            emptySearch:function emptySearch() {
                var _this=this;
                $('#recordedcourse .feselect .feoperation').on('click','button:last-child',function () {
                    $(this).parent().parent().find('#subject2').val('');
                    $(this).parent().parent().find('#courseName2').val('');
                    // $(this).parent().parent().find('#playState2').val('');
                    _this.current=1;
                    _this.subjectName='';
                    _this.courseName='';
                    // _this.playState='';
                    _this.getrecordedcourse(_this.current,_this.subjectName,_this.courseName);
                });
            }
        }
    });
}
// 学习笔记
function learningnote() {
    var parentId=$(window).storager({key: 'feUid'}).readStorage();
    var userType=$(window).storager({key: 'feUType'}).readStorage();
    if(parentId==null||parentId==undefined||parentId=='undefined'||userType!=2){
        layer.msg('请先登录');
        setTimeout(function () {
            window.location.href = ROOT+"login.html";
        },1000);
        return;
    }
    new Vue({
        el:"#learningnote",
        data:{
            learningnote:[],
            showItem:4,//页码显示条数
            allpage:'',//总页数
            current:1,//当前页
            subjectName:'',
            courseName:'',
            subjectArr:"",//下拉科目列表
            courseArr:"",//下拉课程列表
            currentNote:''
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
                _this.getlearningnote(1,_this.subjectName,_this.courseName);
                _this.bindSearch();
                // _this.bindAddNote();
                // _this.getselect();
            })
        },
        methods: {
            getselect:function () {
                var _this=this;
                this.$http.post(SERVERROOTDATA + "Subject.ashx?action=getUserSubject",
                    {
                        userId:parentId,
                        userType:'parent'
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        if(res.body.code==200){
                            _this.subjectArr = res.body.rows;
                        }
                    }).then(function () {
                    $('#subject').on('change',function () {
                        var subjectId=$(this).find('option:selected').val();
                        _this.$http.post(SERVERROOTDATA + "Course.ashx?action=getSubjectCourse",
                            {
                                subjectId:subjectId
                            }
                            ,{emulateJSON: true})
                            .then(function (res) {
                                if(res.body.code==200){
                                    _this.courseArr = res.body.rows;
                                }
                            })
                    });

                })
            },
            getlearningnote:function (pageIndex,subjectName,courseName) {
                var _this=this;
                var index = layer.load(1, {shade: false}); //0代表加载的风格，支持0-2
                this.$http.post(SERVERROOTDATA + "Note.ashx?action=getNoteList",
                    {
                        userId:parentId,
                        userType:'parent',
                        subjectName:subjectName,
                        courseName:courseName,
                        pageIndex:pageIndex,
                        pageSize:7
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        layer.closeAll();
                        if(res.body.code==200){
                            _this.learningnote = res.body.rows;
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
                _this.getlearningnote(_this.current,_this.subjectName,_this.courseName);
            },
            bindSearch:function bindSearch() {
                var _this=this;
                $('#learningnote').on('click','.feselect>button',function () {
                    _this.subjectName=$(this).parent().find('#subjectname').val();
                    _this.courseName=$(this).parent().find('#coursename').val();
                    _this.current=1;
                    _this.getlearningnote(_this.current,_this.subjectName,_this.courseName);
                });
            },
            bindAddNote:function bindAddNote() {
                var _this=this;
                $('#learningnote .feselect p').on('click','button',function () {
                    layer.open({
                        type: 1,
                        title:"添加笔记",
                        area:['600px','380px'],
                        content: $('#addlearningnote') //这里content是一个DOM
                    });
                });
            },
            // 新增笔记
            saveNote:function () {
                var _this=this;
                if ($("#clickCount").val() == "1")
                {
                    return;
                }
                $("#clickCount").val("1");

                var subjectId=$('#subject').val();
                var courseId=$('#course').val();
                var text=$('#content').val();
                // $('#content').val('');
                if(!isEmpty(subjectId)){
                    layer.msg('请选择学科!');
                    $("#clickCount").val("0");
                }else{
                    if(!isEmpty(courseId)){
                        layer.msg('请选择课程!');
                        $("#clickCount").val("0");
                    }else{
                        if(!isEmpty(text)){
                            layer.msg('笔记不能为空！');
                            $("#clickCount").val("0");
                        }else {
                            _this.$http.post(SERVERROOTDATA + "Note.ashx?action=noteSave",
                                {
                                    userId:parentId,
                                    userType:'parent',
                                    subjectId:subjectId,
                                    courseId:courseId,
                                    content:text,
                                    noteId:0,
                                    saveTag:'add'
                                }
                                ,{emulateJSON: true})
                                .then(function (res) {
                                    if(res.body.code==200){
                                        layer.msg(res.body.message);
                                        setTimeout(function () {
                                            $("#clickCount").val("0");
                                            _this.getlearningnote(_this.current,_this.subjectName,_this.courseName);
                                        },1000);

                                    }else {
                                        $("#clickCount").val("0");
                                        layer.msg('保存失败！');
                                    }
                                })
                        }
                    }
                }

            },
            //编辑笔记
            editNote:function (id) {
                var _this=this;
                layer.open({
                    type: 1,
                    title:"编辑笔记",
                    area:['600px','380px'],
                    content: $('#editlearningnote') //这里content是一个DOM
                });
                this.$http.post(SERVERROOTDATA + "Note.ashx?action=getNoteById",
                    {
                        noteId:id
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        if(res.body.length<1){
                            return false
                        }else {
                            _this.currentNote = res.body[0];
                        }
                    })
            },
            // 删除笔记
            deleteNote:function (id) {
                var _this=this;
                layer.confirm('你确定要删除吗？', {
                    btn: ['确定','取消'] //按钮
                }, function(){
                    _this.$http.post(SERVERROOTDATA + "Note.ashx?action=noteSave",
                        {
                            noteId:id,
                            saveTag:'delete'
                        }
                        ,{emulateJSON: true})
                        .then(function (res) {
                            if(res.body.code==200){
                                layer.msg(res.body.message);
                                setTimeout(function () {
                                    layer.closeAll();
                                    _this.getlearningnote(_this.current,_this.subjectName,_this.courseName);
                                },1000);

                            }else{
                                layer.msg('删除失败！');
                            }
                        })
                }, function(){
                });

            },
            // 更新笔记
            updateNote:function (id,subjectId,courseId) {
                var _this=this;
                if ($("#clickCount1").val() == "1")
                {
                    return;
                }
                $("#clickCount1").val("1");

                var text=$('#editcontent').val();
                // $('#editcontent').val('');
                if(!isEmpty(text)){
                    layer.msg('笔记不能为空！');
                    $("#clickCount1").val("0");
                }else{
                    this.$http.post(SERVERROOTDATA + "Note.ashx?action=noteSave",
                        {
                            userId:parentId,
                            userType:'parent',
                            subjectId:subjectId,
                            courseId:courseId,
                            content:text,
                            noteId:id,
                            saveTag:'update'
                        }
                        ,{emulateJSON: true})
                        .then(function (res) {
                            if(res.body.code==200){
                                layer.msg(res.body.message);
                                setTimeout(function () {
                                    $("#clickCount1").val("0");
                                    _this.getlearningnote(_this.current,_this.subjectName,_this.courseName);
                                },1000);

                            }else{
                                $("#clickCount1").val("0");
                                layer.msg('保存失败！');
                            }
                        })
                }

            }
        }
    });
}
// 下载管理
function download() {
    var parentId=$(window).storager({key: 'feUid'}).readStorage();
    var userType=$(window).storager({key: 'feUType'}).readStorage();
    if(parentId==null||parentId==undefined||parentId=='undefined'||userType!=2){
        layer.msg('请先登录');
        setTimeout(function () {
            window.location.href = ROOT+"login.html";
        },1000);
        return;
    }
    new Vue({
        el:"#download",
        data:{
            downloadArr:[],
            showItem:4,//页码显示条数
            allpage:'',//总页数
            current:1,//当前页
            title:'',
            source:''
        },
        filters: {
            addRootFile: function addRootFile(img) {
                return SERVERROOTFILE + img;
            },
            downRoot: function downRoot(url) {
                return SERVERROOTFILE  + url;
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
                _this.getdownload(1,_this.title,_this.source);
                _this.bindSearch();
            })
        },
        methods: {
            getdownload:function (pageIndex,title,source) {
                var _this=this;
                var index = layer.load(1, {shade: false}); //0代表加载的风格，支持0-2
                this.$http.post(SERVERROOTDATA + "ResourceDownload.ashx?action=getResourceDownload",
                    {
                        userId:parentId,
                        userType:'parent',
                        title:title,
                        source:source,
                        pageIndex:pageIndex,
                        pageSize:8
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        layer.closeAll();
                        if(res.body.code==200){
                            _this.downloadArr = res.body.rows;
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
                _this.getdownload(_this.current,_this.title,_this.source);
            },
            bindSearch:function () {
                var _this=this;
                $('#download').on('click','.feselect>button',function () {
                    _this.title=$(this).parent().find('#title').val();
                    _this.source=$(this).parent().find('#source').val();
                    _this.current=1;
                    _this.getdownload(_this.current,_this.title,_this.source);
                });
            },
            deleteDownload:function (id) {
                var _this=this;
                layer.confirm('你确定要删除吗？', {
                    btn: ['确定','取消'] //按钮
                }, function(){
                    _this.$http.post(SERVERROOTDATA + "ResourceDownload.ashx?action=resourceDownloadSave",
                        {
                            resourceDownloadId:id,
                            saveTag:'delete'
                        }
                        ,{emulateJSON: true})
                        .then(function (res) {
                            if(res.body.code==200){
                                layer.msg(res.body.message);
                                setTimeout(function () {
                                    layer.closeAll();
                                    _this.getdownload(_this.current,_this.title,_this.source);
                                },1000);

                            }else{
                                layer.msg('删除失败！');
                            }
                        })
                }, function(){
                });
            }
        }
    });
}
// 安全设置
function securitysetting() {
    var parentId=$(window).storager({key: 'feUid'}).readStorage();
    var userType=$(window).storager({key: 'feUType'}).readStorage();
    if(parentId==null||parentId==undefined||parentId=='undefined'||userType!=2){
        layer.msg('请先登录');
        setTimeout(function () {
            window.location.href = ROOT+"login.html";
        },1000);
        return;
    }
    new Vue({
        el:"#securitysetting",
        data:{
            alreadyBindPhone:'',
            currentPassword:'',//当前密码
            newPassword:'',//新密码
            confirmPassword:'',//确定新密码
            phone:"",//输入的手机号
            verificationCode:"",//输入的验证码
            checkCode:"",//输入的校验码
            VCTime:120,//倒计时
            VCTimeKey:true,
            VCLabel:"获取校验码",
            imageCode:"",//接口返回的验证码
            imageCodeImg:""
        },
        mounted: function mounted() {
            //1.0ready --> 2.0
            this.$nextTick(function() {
                this.init();
                this.getImageVC();
                this.editBtn();
            });
        },
        methods:{
            init:function init() {
                var _this = this;
                this.$http.post(SERVERROOTDATA + 'User.ashx?action=getContact',
                    {
                        userId:parentId,
                        userType:'parent'
                    }
                    , {
                        emulateJSON: true
                    }).then(function(res) {
                    _this.alreadyBindPhone = res.body.rows[0].mobile;
                });
            },
            editBtn:function editBtn() {
                //绑定修改按钮
                $('#securitysetting .fepanel .fepersonaldata-title').on('click','span',function () {
                    if($(this).hasClass('active')){
                        return;
                    }else{
                        $(this).addClass('active');
                        $(this).parent().next().css('display','none');
                        $(this).parent().next().next('ul').css('display','block');
                        $(this).parent().parent().find('.feoperation').css('display','block');
                    }
                });
                // 绑定取消按钮
                $('#securitysetting .fepanel').on('click','.feoperation a:last-child',function () {
                    $(this).parent().css('display','none');
                    $(this).parent().prev().css('display','none');
                    $(this).parent().prev().prev('p').css('display','block');
                    $(this).parent().parent().find('.fepersonaldata-title').find('span').removeClass('active');
                });
                // 找回密码按钮
                $('#callBackPassword').on('click',function () {
                    layer.open({
                        type: 2,
                        title: '找回密码',
                        //closeBtn: 0, //不显示关闭按钮
                        shadeClose: false,
                        shade: [0.5, '#000'],
                        area: ['800px', '500px'],
                        anim: 2,
                        content: '../studentcenter/forgetpassword.html'
                    })
                })
            },
            // 获取图文验证码
            getImageVC: function() {
                var _this = this;
                this.$http.post(SERVERROOTDATA + 'User.ashx?action=getImageVerifyCode', {}, {
                    emulateJSON: true
                }).then(function(res) {
                    _this.imageCode = res.body.imageCode;
                    _this.imageCodeImg = SERVERROOTFILE + res.body.imagePath;
                });
            },
            //短信验证码
            getVCCode: function getVCCode() {
                var _this=this;
                var imageCodeVal = "";
                var vc = "";
                vc = this.phone;
                imageCodeVal = this.verificationCode;
                this.$http.post(SERVERROOTDATA + "User.ashx?action=getMobAlterValidateCode", {
                    mobile: vc,
                    imageCode: this.imageCode,
                    imageValue: imageCodeVal
                }, {
                    emulateJSON: true
                }).then(function(res) {
                    var obj = res.body;
                    if(obj.code==200||obj.code=='200'){
                        layer.msg("验证码已发送注意查收短信");
                        var Interval = setInterval(function() {
                            _this.VCTimeKey = false;
                            _this.VCLabel = _this.VCTime-- + "s";
                            if(_this.VCTime < 1) {
                                _this.VCTimeKey = true;
                                _this.VCLabel = '获取短信验证码';
                                clearInterval(Interval);
                            }
                        }, 1000);
                    }else{
                        layer.msg(obj.message);
                    }
                    // if(811 == obj || "811" == obj) {
                    //     layer.msg("请求超时");
                    // } else if(808 == obj || "808" == obj) {
                    //     layer.msg("改手机号已注册");
                    // } else {
                    //     layer.msg("验证码已发送注意查收短信");
                    //     var Interval = setInterval(function() {
                    //         this.VCTimeKey = false;
                    //         this.VCLabel = _this.VCTime-- + "s";
                    //         if(this.VCTime < 1) {
                    //             this.VCTimeKey = true;
                    //             this.VCLabel = '获取短信验证码';
                    //             clearInterval(Interval);
                    //         }
                    //     }, 1000);
                    // }
                });
            },
            vcTimeCount: function vcTimeCount() {
                var _this = this;
                if(_this.VCTimeKey) {
                    if(!isPhone(this.phone)) {
                        layer.msg("请输入正确的手机号码!");
                        return false;
                    }
                    if(!isEmpty(this.verificationCode)){
                        layer.msg("请输入验证码");
                        return false;
                    }
                    _this.getVCCode();
                }
            },
            // 更新密码
            updatePassword:function updatePassword() {
                var _this = this;
                if ($("#clickCount").val() == "1")
                {
                    return;
                }
                $("#clickCount").val("1");
                if(!isEmpty(_this.currentPassword)) {
                    layer.msg('当前密码不能为空');
                    $("#clickCount").val("0");
                }else {
                    if(!isEmpty(_this.newPassword)) {
                        layer.msg("新密码不能为空!");
                        $("#clickCount").val("0");
                    }else{
                        if(_this.newPassword==_this.confirmPassword){
                            this.$http.post(SERVERROOTDATA + "User.ashx?action=updateUserPassword", {
                                userId: parentId,
                                userType:'parent',
                                oldPassword: _this.currentPassword,
                                newPassword: _this.newPassword
                            }, {
                                emulateJSON: true
                            }).then(function (res) {
                                layer.msg(res.body.message);
                                if(res.body.code==200){
                                    setTimeout(function () {
                                        location.reload()
                                    },1000)
                                }else {
                                    setTimeout(function () {
                                        $("#clickCount").val("0");
                                    },1000)
                                }
                            })
                        }else{
                            layer.msg('两次密码不一致！');
                            setTimeout(function () {
                                $("#clickCount").val("0");
                            },1000)
                        }
                    }
                }

            },
            // 绑定手机
            updatePhone:function updatePhone() {
                var _this = this;
                if ($("#clickCount1").val() == "1")
                {
                    return;
                }
                $("#clickCount1").val("1");
                if(!isPhone(_this.phone)) {
                    layer.msg('请输入正确的手机号！');
                    $("#clickCount1").val("0");
                }else {
                    if(!isEmpty(_this.verificationCode)) {
                        layer.msg("验证码不能为空!");
                        $("#clickCount1").val("0");
                    }else{
                        if(!isEmpty(_this.checkCode)){
                            layer.msg('校验码不能为空！');
                            $("#clickCount1").val("0");
                        }else{
                            this.$http.post(SERVERROOTDATA + "User.ashx?action=updateUserMobile", {
                                userId: parentId,
                                userType:'parent',
                                mobile: _this.phone,
                                validateCode: _this.checkCode
                            }, {
                                emulateJSON: true
                            }).then(function (res) {
                                layer.msg(res.body.message);
                                if(res.body.code==200){
                                    setTimeout(function () {
                                        location.reload()
                                    },1000)
                                }else{
                                    setTimeout(function () {
                                        $("#clickCount1").val("0");
                                    },1000)
                                }
                            })
                        }
                    }
                }

            }
        }
    })
}
// 邀请好友
function invitefriend() {
    $('#copy').zclip({
        path: '../js/ZeroClipboard.swf',
        copy: function(){//复制内容
            return $('#content').val();
        },
        afterCopy: function(){//复制成功
            var $copysuc = $("<div class='copy-tips'><div class='copy-tips-wrap'>☺ 复制成功</div></div>");
            $("body").find(".copy-tips").remove().end().append($copysuc);
            $(".copy-tips").fadeOut(3000);
        }
    });
}
// 我的孩子
function mychild() {
    var parentId=$(window).storager({key: 'feUid'}).readStorage();
    var userType=$(window).storager({key: 'feUType'}).readStorage();
    if(parentId==null||parentId==undefined||parentId=='undefined'||userType!=2){
        layer.msg('请先登录');
        setTimeout(function () {
            window.location.href = ROOT+"login.html";
        },1000);
        return;
    }
    $('.festudentmyparent .feedit').on('click','span',function () {
        if($('.fecontent .feitem').length>=5){
            layer.msg('你已经添加5位孩子了，不能再加了');
            return;
        }
        $('.fehead').addClass('fehidden');
        $('.feedit').addClass('fehidden');
        $('.fecontent').addClass('fehidden');
        $('.addparent').removeClass('fehidden');
        $('#goBack').removeClass('fehidden');
    });
    // 显示绑定孩子
    new Vue({
        el:"#showmychild",
        data:{
            mychild:[],
            nodata:false
        },
        mounted: function mounted() {
            //1.0ready --> 2.0
            this.$nextTick(function() {
                this.getmychild();
            });
        },
        methods:{
            // 获取孩子
            getmychild: function() {
                var _this = this;
                var index = layer.load(1, {shade: false}); //0代表加载的风格，支持0-2
                this.$http.post(SERVERROOTDATA + 'User.ashx?action=getUserKithList',
                    {
                        userId:parentId,
                        userType:'parent'
                    }, {
                        emulateJSON: true
                    }).then(function(res) {
                        layer.closeAll();
                        if(res.body.rows==undefined||res.body.rows.length<1){
                            _this.nodata=true;
                        }else{
                            _this.nodata=false;
                        }
                        if(res.body.code==200){
                            _this.mychild = res.body.rows;
                        }
                }).then(function () {
                    $('.festudentmyparent .fecontent .feitem').on('click','b',function () {
                        var id=$(this).data('id');
                        layer.confirm('你确定要删除吗？', {
                            btn: ['确定','取消'] //按钮
                        }, function(){
                            $.ajax({
                                url: SERVERROOTDATA+"User.ashx?action=unbindUserKith",
                                type: "POST",
                                data: {studentParentRsId:id},
                                success:function (res) {
                                    var data = JSON.parse(res);
                                    if(data.code==200){
                                        layer.msg('删除成功！', {icon: 1});
                                        setTimeout(function () {
                                            window.location.reload();
                                        },1000)
                                    }else{
                                        layer.msg(data.message, {icon: 1});
                                    }
                                }
                            });
                        }, function(){
                        });
                    })
                })
            }
        }
    });
    // 查询孩子
    new Vue({
        el:"#addChild",
        data:{
            result:[],
            nodata:true
        },
        filters: {
            addRootFile: function addRootFile(img) {
                return SERVERROOTFILE + img;
            },
            who: function who(name) {
                return name==''? '某某某' : name;
            }
        },
        mounted: function mounted() {
            //1.0ready --> 2.0
            this.$nextTick(function() {
                this.bindSearch();
            });
        },
        methods:{
            // 查询孩子
            bindSearch: function() {
                var _this = this;
                $('#search').on('click',function () {
                    if(!isEmpty($(this).prev().val())){
                        layer.msg('请输入查询手机号码');
                    } else {
                        var index = layer.load(1, {shade: false}); //0代表加载的风格，支持0-2
                        _this.$http.post(SERVERROOTDATA + 'User.ashx?action=queryUserKithList',
                            {
                                userId:parentId,
                                userType:'parent',
                                mobile:$(this).prev().val()
                            }, {
                                emulateJSON: true
                            }).then(function(res) {
                                layer.closeAll();
                                _this.nodata=true;
                                if(res.body.code==200){
                                    _this.result = res.body.rows;
                                    _this.nodata=false;
                                }
                        });
                    }
                });
            },
            bindChildPop:function bindChildPop(phone,childId) {
                $('#bindParent #phone').val(phone);
                $('#bindParent #childId').val(childId);
                layer.open({
                    type: 1,
                    area:['500px','400px'],
                    content: $('#bindParent') //这里content是一个DOM
                });
            }
        }
    });
    // 绑定孩子弹框
    new Vue({
        el:"#bindParent",
        data:{
            // userType:1,
            // phone:"",//输入的手机号
            verificationCode:"",//输入的验证码
            checkCode:"",//输入的校验码
            VCTime:120,//倒计时
            VCTimeKey:true,
            VCLabel:"获取校验码",
            imageCode:"",//接口返回的验证码
            imageCodeImg:""
        },
        mounted: function mounted() {
            //1.0ready --> 2.0
            this.$nextTick(function() {
                this.getImageVC();
            });
        },
        methods:{
            // 获取图文验证码
            getImageVC: function() {
                var _this = this;
                this.$http.post(SERVERROOTDATA + 'User.ashx?action=getImageVerifyCode', {}, {
                    emulateJSON: true
                }).then(function(res) {
                    _this.imageCode = res.body.imageCode;
                    _this.imageCodeImg = SERVERROOTFILE + res.body.imagePath;
                });
            },
            //短信验证码
            getVCCode: function getVCCode() {
                var imageCodeVal = "";
                var vc = "";
                vc =  $('#bindParent #phone').val();
                imageCodeVal = this.verificationCode;
                this.$http.post(SERVERROOTDATA + "User.ashx?action=getKithBindValidateCode", {
                    mobile: vc,
                    imageCode: this.imageCode,
                    imageValue: imageCodeVal
                }, {
                    emulateJSON: true
                }).then(function(res) {
                    var obj = res.body.code;
                    var _this=this;
                    // if(811 == obj || "811" == obj) {
                    //     layer.msg("请求超时");
                    // } else if(808 == obj || "808" == obj) {
                    //     layer.msg("改手机号已注册");
                    // } else {
                    //     layer.msg("验证码已发送注意查收短信");
                    //     var Interval = setInterval(function() {
                    //         _this.VCTimeKey = false;
                    //         _this.VCLabel = _this.VCTime-- + "s";
                    //         if(_this.VCTime < 1) {
                    //             _this.VCTimeKey = true;
                    //             _this.VCLabel = '获取短信验证码';
                    //             clearInterval(Interval);
                    //         }
                    //     }, 1000);
                    // }
                    if(obj==200||obj=='200'){
                        layer.msg("验证码已发送注意查收短信");
                        var Interval = setInterval(function() {
                            _this.VCTimeKey = false;
                            _this.VCLabel = _this.VCTime-- + "s";
                            if(_this.VCTime < 1) {
                                _this.VCTimeKey = true;
                                _this.VCLabel = '获取短信验证码';
                                clearInterval(Interval);
                            }
                        }, 1000);
                    }else{
                        layer.msg(res.body.message);
                    }

                });
            },
            // 通过手机获得验证码
            vcTimeCount: function vcTimeCount() {
                var _this = this;
                if(_this.VCTimeKey) {
                    if(!isPhone($('#phone').val())) {
                        layer.msg("请输入正确的手机号码!");
                        return false;
                    }
                    if(!isEmpty(this.verificationCode)){
                        layer.msg("请输入验证码");
                        return false;
                    }
                    _this.getVCCode();
                }
            },
            // 确定绑定按钮
            confirmBind:function () {
                if ($("#clickCount").val() == "1")
                {
                    return;
                }
                $("#clickCount").val("1");
                var relation=$('#relation').val();
                var phone=$('#phone').val();
                var checkCode=$('#checkCode').val();
                var childId=$('#childId').val();
                if(!isEmpty(checkCode)){
                    layer.msg('校验码不能为空！');
                    $("#clickCount").val("0");
                }else{
                    this.$http.post(SERVERROOTDATA + "User.ashx?action=bindUserKith", {
                        userId: parentId,
                        userType: 'parent',
                        childId: childId,
                        relationType:relation
                    }, {
                        emulateJSON: true
                    }).then(function (res) {
                        layer.msg(res.body.message);
                        setTimeout(function () {
                            $("#clickCount").val("0");
                            window.location.href = "../parentcenter/parentmychild.html";
                        },1000)
                    });
                    // $.ajax({
                    //     url: SERVERROOTDATA+"TeachingStudio.ashx?action=teachingStudioSave",
                    //     type: "POST",
                    //     data: data,
                    //     processData: false,  // 告诉jQuery不要去处理发送的数据
                    //     contentType: false,   // 告诉jQuery不要去设置Content-Type请求头
                    //     success:function (res) {
                    //         if(res==200){
                    //             layer.msg("保存成功！");
                    //             setTimeout(function () {
                    //                 window.location.href =ROOT+"teachercentermystudio.html";
                    //             },1000)
                    //         }
                    //     }
                    // });
                }
            },
            close:function () {
                layer.closeAll();
            }
        }
    })
}
// 订单管理
function ordermanage() {
    var parentId=$(window).storager({key: 'feUid'}).readStorage();
    var userType=$(window).storager({key: 'feUType'}).readStorage();
    if(parentId==null||parentId==undefined||parentId=='undefined'||userType!=2){
        layer.msg('请先登录');
        setTimeout(function () {
            window.location.href = ROOT+"login.html";
        },1000);
        return;
    }
    new Vue({
        el:"#ordermanage",
        data:{
            orderArr:[],
            showItem:4,//页码显示条数
            allpage:'',//总页数
            current:1,//当前页
            time:'',
            type:'',
            state:''
        },
        filters: {
            addRootFile: function addRootFile(img) {
                return SERVERROOTFILE + img;
            },
            payRoot: function payRoot(cid,oid) {
                return ROOT  + "paymentoptions.html?cid="+cid +"&oid=" +oid;
            },
            gotoCourseRoot:function (cid,recordType) {
                if(recordType=='直播'){
                    return ROOT  + "cloundcoursedetail.html?courseId="+cid;
                }else{
                    return ROOT  + "coursedetail.html?courseId="+cid;
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
                _this.getorder(1,_this.time,_this.type,_this.state);
                _this.bindSearch();
            })
        },
        methods: {
            getorder:function (pageIndex,time,type,state) {
                var _this=this;
                var index = layer.load(1, {shade: false}); //0代表加载的风格，支持0-2
                this.$http.post(SERVERROOTDATA + "Order.ashx?action=getOrderList",
                    {
                        userId:13,
                        userType:'parent',
                        period:time,
                        recordType:type,
                        payState:state,
                        pageIndex:pageIndex,
                        pageSize:6
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        layer.closeAll();
                        if(res.body.code==200){
                            // _this.orderArr=[{"orderNum":2513657646554,"coursetype":"直播课","name":"高三英语冲刺班","price":"¥188.00","time":"2017-10-30","state":"未支付"},
                            //     {"orderNum":13323232,"coursetype":"直播课","name":"高2英语冲刺班","price":"¥128.00","time":"2017-10-30","state":"未支付"}]
                            _this.orderArr = res.body.rows;
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
                _this.getorder(_this.current,_this.time,_this.type,_this.state);
            },
            bindSearch:function () {
                var _this=this;
                $('#time').on('change',function () {
                    _this.time=$(this).val();
                    _this.current=1;
                    _this.getorder(_this.current,_this.time,_this.type,_this.state);
                });
                $('#coursetype').on('change',function () {
                    _this.type=$(this).val();
                    _this.current=1;
                    _this.getorder(_this.current,_this.time,_this.type,_this.state);
                });
                $('#state').on('change',function () {
                    _this.state=$(this).val();
                    _this.current=1;
                    _this.getorder(_this.current,_this.time,_this.type,_this.state);
                });
            }
        }
    });
}
// 我的老师
function myteacher() {
    var parentId=$(window).storager({key: 'feUid'}).readStorage();
    var userType=$(window).storager({key: 'feUType'}).readStorage();
    if(parentId==null||parentId==undefined||parentId=='undefined'||userType!=2){
        layer.msg('请先登录');
        setTimeout(function () {
            window.location.href = ROOT+"login.html";
        },1000);
        return;
    }
    $('.feparentmyteacher').on('click','span',function () {
        if($(this).hasClass('active')){
            return
        }else{
            $(this).siblings().removeClass('active');
            $(this).addClass('active');
            var type=$(this).data('id');
            if(type==1||type=='1'){
                $('#myteacher').css('display','block');
                $('#childteacher').css('display','none');
            }else{
                $('#childteacher').css('display','block');
                $('#myteacher').css('display','none');
            }
        }
    });
    // 自己的老师
    new Vue({
        el:"#myteacher",
        data:{
            nodata:false,
            myteacher:[],
            showItem:4,//页码显示条数
            allpage:'',//总页数
            current:1,//当前页
            condition:''//关键字搜索
        },
        filters: {
            addRootFile: function addRootFile(img) {
                return SERVERROOTFILE + img;
            },
            addAnswerRoot:function addAnswerRoot(id,n) {
                return "Panswerquestion.html?teacherId=" + id +"&name=" + n;
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
                _this.getmyteacher(1,_this.condition);
                _this.bindSearch();
            })
        },
        methods: {
            getmyteacher:function (pageIndex,condition) {
                var _this=this;
                var index = layer.load(1, {shade: false}); //0代表加载的风格，支持0-2
                this.$http.post(SERVERROOTDATA + "StudentTrs.ashx?action=getParentTeacher",
                    {
                        parentId:parentId,
                        condition:condition,
                        pageIndex:pageIndex,
                        pageSize:2
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        layer.closeAll();
                        if(res.body.rows.length<1){
                            _this.nodata=true;
                        }else{
                            _this.nodata=false;
                        }
                        if(res.body.code==200){
                            _this.myteacher = res.body.rows;
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
                _this.getmyteacher(_this.current,_this.condition);
            },
            bindSearch:function bindSearch() {
                var _this=this;
                $('#myteacher .feselect').on('click','button',function () {
                    _this.condition=$(this).parent().find('#keyword').val();
                    // $(this).parent().find('#keyword').val('');
                    _this.current=1;
                    _this.getmyteacher(_this.current,_this.condition);
                });
            }
        }
    });
    // 孩子的老师
    new Vue({
        el:"#childteacher",
        data:{
            nodata:false,
            childteacher:[],
            showItem:4,//页码显示条数
            allpage:'',//总页数
            current:1,//当前页
            condition:''//关键字搜索
        },
        filters: {
            addRootFile: function addRootFile(img) {
                return SERVERROOTFILE + img;
            },
            addAnswerRoot:function addAnswerRoot(id,n) {
                return "Panswerquestion.html?teacherId=" + id +"&name=" + n;
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
                _this.getchildteacher(1,_this.condition);
                _this.bindSearch();
            })
        },
        methods: {
            getchildteacher:function (pageIndex,condition) {
                var _this=this;
                var index = layer.load(1, {shade: false}); //0代表加载的风格，支持0-2
                this.$http.post(SERVERROOTDATA + "StudentTrs.ashx?action=getMyChildTeacher",
                    {
                        parentId:parentId,
                        condition:condition,
                        pageIndex:pageIndex,
                        pageSize:2
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        layer.closeAll();
                        if(res.body.rows.length<1){
                            _this.nodata=true;
                        }else{
                            _this.nodata=false;
                        }
                        if(res.body.code==200){
                            _this.childteacher = res.body.rows;
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
                _this.getchildteacher(_this.current,_this.condition);
            },
            bindSearch:function bindSearch() {
                var _this=this;
                $('#childteacher .feselect').on('click','button',function () {
                    _this.condition=$(this).parent().find('#keyword1').val();
                    // $(this).parent().find('#keyword1').val('');
                    _this.current=1;
                    _this.getchildteacher(_this.current,_this.condition);
                });
            }
        }
    });
}
// 提问老师
function answerquestion() {
    var parentId=$(window).storager({key: 'feUid'}).readStorage();
    var userType=$(window).storager({key: 'feUType'}).readStorage();
    var teacherId=$(this).getUrlParam("teacherId");
    var teacherName=$(this).getUrlParam("name");
    if(parentId==null||parentId==undefined||parentId=='undefined'||userType!=2){
        layer.msg('请先登录');
        setTimeout(function () {
            window.location.href = ROOT+"login.html";
        },1000);
        return;
    }
    new Vue({
        el:"#answerquestion",
        data:{
            nodata:false,
            pastanswer:[],
            showItem:4,//页码显示条数
            allpage:'',//总页数
            current:1,//当前页
            teacherName:teacherName,
            courseArr:''
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
                _this.getpastanswer(1);
                _this.addQuestion();
            })
        },
        methods: {
            addQuestion:function addQuestion() {
                $('.addquestion').on('click','span',function () {
                    layer.open({
                        type: 1,
                        title:"提问",
                        area:['500px','400px'],
                        content: $('#answerview') //这里content是一个DOM
                    });
                });
                var _this=this;
                this.$http.post(SERVERROOTDATA + "StudentTrs.ashx?action=getTeacherCourse",
                    {
                        teacherId:teacherId
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        _this.courseArr = res.body;
                    }).then(function () {
                    $('#answerview').on('click','p>button',function () {
                        if ($("#clickCount").val() == "1")
                        {
                            return;
                        }
                        $("#clickCount").val("1");
                        var courseId=$(this).parent().parent().find('#answerview-course').val();
                        var text=$(this).parent().parent().find('#answerview-content').val();
                        $(this).parent().parent().find('#answerview-content').val('');
                        if(!isEmpty(text)){
                            layer.msg('提问不能为空');
                            $("#clickCount").val("0");
                        }else{
                            _this.$http.post(SERVERROOTDATA + "StudentTrs.ashx?action=studentQuestionSave",
                                {
                                    teacherId:teacherId,
                                    courseId:courseId,
                                    questionerId:parentId,
                                    questionerType:2,
                                    content:text
                                }
                                ,{emulateJSON: true})
                                .then(function (res) {
                                    if(res.body==200){
                                        layer.msg('提问成功');
                                        setTimeout(function () {
                                            $("#clickCount").val("0");
                                            _this.getpastanswer(_this.current);
                                        },1000);


                                    }else{
                                        layer.msg('提问失败');
                                        setTimeout(function () {
                                            $("#clickCount").val("0");
                                        },1000);
                                    }

                                })
                        }



                    })
                });
            },
            getpastanswer:function (pageIndex) {
                var _this=this;
                var index = layer.load(1, {shade: false}); //0代表加载的风格，支持0-2
                this.$http.post(SERVERROOTDATA + "StudentTrs.ashx?action=getMyQuestion",
                    {
                        teacherId:teacherId,
                        studentId:parentId,
                        questionerType:2,
                        pageIndex:pageIndex,
                        pageSize:3
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        layer.closeAll();
                        if(res.body.rows==undefined || res.body.rows.length<1){
                            _this.nodata=true;
                            return;
                        }else{
                            _this.nodata=false;
                        }
                        _this.pastanswer = res.body.rows;
                        // _this.teacherName = res.body.teachername;
                        _this.allpage=res.body.totalPageCount;
                    }).then(function () {
                })
            },
            lookdetail:function (id,title,coursename,time,teachername) {
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
                    content: 'Pansweringreplydetail.html?questionId='+ id + '&title=' + title + '&coursename='+coursename+'&time='+time + "&teachername="+ teachername
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
                _this.getpastanswer(_this.current);
            }
        }
    });
}
// 家长答疑回复详情
function answeringreplydetail() {
    var questionId=$(this).getUrlParam("questionId");
    var title=$(this).getUrlParam("title");
    var coursename=$(this).getUrlParam("coursename");
    var time=$(this).getUrlParam("time");
    var teachername=$(this).getUrlParam("teachername");
    var studentId=$(window).storager({key: 'feUid'}).readStorage();
    function draw(questionId,title,coursename,time,teachername) {
        new Vue({
            el:"#answeringreplydetail",
            data:{
                pastanswer:[],
                nodata:true,
                current:1,//当前页
                title:title,
                coursename:coursename,
                time:time,
                teachername:teachername
            },
            filters: {
                addRootFile: function addRootFile(img) {
                    return SERVERROOTFILE + img;
                },
                whosay:function whosay(type) {
                    return type==0 ? '回答 :' : '我 :';
                }
            },
            mounted:function () {
                var _this=this;
                this.$nextTick(function () {
                    _this.getpastanswer(1);
                    _this.bindFn();
                })
            },
            methods: {
                getpastanswer:function (pageSize) {
                    var _this=this;
                    this.$http.post(SERVERROOTDATA + "StudentTrs.ashx?action=getQuestionReply",
                        {
                            questionId:questionId,
                            pageIndex:1,
                            pageSize:pageSize*5
                        }
                        ,{emulateJSON: true})
                        .then(function (res) {
                            if(pageSize*5<res.body.totalCount){
                                _this.nodata=true;
                            }else {
                                _this.nodata=false;
                            }
                            if(res.body.code==200){
                                _this.pastanswer = res.body.rows;
                            }

                        }).then(function () {

                    })
                },
                lookmore:function () {
                    this.getpastanswer(++this.current);
                },
                bindFn:function () {
                    var _this=this;
                    $('#answeringreplydetail .feoperation').on('click','button:first-child',function () {
                        if ($("#clickCount").val() == "1")
                        {
                            return;
                        }
                        $("#clickCount").val("1");
                        var text=$(this).parent().prev().find('textarea').val();
                        $(this).parent().prev().find('textarea').val('');
                        if(!isEmpty(text)){
                            layer.msg('提问内容不能为空!');
                            $("#clickCount").val("0");
                        }else {
                            _this.$http.post(SERVERROOTDATA + "StudentTrs.ashx?action=studentQuestionReplySave",
                                {
                                    questionId:questionId,
                                    questionerId:studentId,
                                    questionerType:2,
                                    replyContent:text,
                                    replyOrQuestion:1
                                }
                                ,{emulateJSON: true})
                                .then(function (res) {
                                    if(res.body==200){
                                        layer.msg('提问成功!');
                                        setTimeout(function () {
                                            _this.getpastanswer(_this.current);
                                            $('#content').scrollTop( $('#content')[0].scrollHeight );
                                            $("#clickCount").val("0");
                                        },1000);

                                    }else {
                                        layer.msg('提问失败');
                                        setTimeout(function () {
                                            $("#clickCount").val("0");
                                        },1000);
                                    }
                                })
                        }
                    });
                    $('#answeringreplydetail .feoperation').on('click','button:last-child',function () {
                        if ($("#clickCount1").val() == "1")
                        {
                            return;
                        }
                        $("#clickCount1").val("1");
                        _this.$http.post(SERVERROOTDATA + "StudentTrs.ashx?action=studentQuestionSave",
                            {
                                questionId:questionId,
                                saveTag:'update',
                                replystates:1
                            }
                            ,{emulateJSON: true})
                            .then(function (res) {
                                if(res.body==200){
                                    layer.msg('已标记为解决!');
                                    setTimeout(function () {
                                        $("#clickCount1").val("0");
                                        parent.close();
                                        parent.reload();
                                    },1000)
                                }else {
                                    layer.msg('操作失败');
                                    setTimeout(function () {
                                        $("#clickCount1").val("0");
                                    },1000)
                                }
                            })
                    });
                    var dingshi=setInterval(function () {
                        _this.getpastanswer(_this.current);
                    },10000);
                }
            }
        });
    }
    draw(questionId,title,coursename,time,teachername);
}
function close() {
    layer.closeAll();
}
function reload() {
    location.reload();
}
// 家长答疑回复
function answeringreply() {
    var parentId=$(window).storager({key: 'feUid'}).readStorage();
    var userType=$(window).storager({key: 'feUType'}).readStorage();
    if(parentId==null||parentId==undefined||parentId=='undefined'||userType!=2){
        layer.msg('请先登录');
        setTimeout(function () {
            window.location.href = ROOT+"login.html";
        },1000);
        return;
    }
    new Vue({
        el:"#answeringreply",
        data:{
            result:[],
            type:0,
            showItem:4,//页码显示条数
            allpage:'1',//总页数
            current:1,//当前页
            replynum:0,
            discussnum:0,
            webnoticenum:0
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
                _this.changeRead();
                _this.noticeTimer();
                _this.bindSelect();
            })
        },
        methods: {
            noticeTimer:function () {
                var _this=this;
                var timer1=setTimeout(function () {
                    _this.$http.post(SERVERROOTDATA + "StudentTrs.ashx?action=getQuestionNum",
                        {
                            studentId:parentId,
                            userType:userType
                        }
                        ,{emulateJSON: true})
                        .then(function (res) {
                            _this.replynum = res.body.num1;
                            _this.discussnum=res.body.num2;
                            _this.webnoticenum=res.body.num3;
                        });
                    // _this.getresult(_this.current,_this.type);
                },0);
                var timer=setInterval(function () {
                    _this.$http.post(SERVERROOTDATA + "StudentTrs.ashx?action=getQuestionNum",
                        {
                            studentId:parentId,
                            userType:userType
                        }
                        ,{emulateJSON: true})
                        .then(function (res) {
                            _this.replynum = res.body.num1;
                            _this.discussnum=res.body.num2;
                            _this.webnoticenum=res.body.num3;
                        });
                    _this.getresult(_this.current,_this.type);
                },10000)
            },
            getresult:function (pageIndex,type) {
                var _this=this;
                this.$http.post(SERVERROOTDATA + "StudentTrs.ashx?action=getQuestionReplyList",
                    {
                        studentId:parentId,
                        questionerType:2,
                        readType:type,
                        pageIndex:pageIndex,
                        pageSize:6
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        _this.result = res.body.rows.reverse();
                        // _this.result=[{questionContent:'dada',courseName:'大大',questioner:"天天",time:"2017-10-30 12:00",questionId:1}]
                        _this.allpage=res.body.totalPageCount;
                    })
            },
            lookdetail:function (id,title,coursename,time,teachername) {
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
                    content: 'Pansweringreplydetail.html?questionId='+ id + '&title=' + title + '&coursename='+coursename+'&time='+time + "&teachername="+ teachername
                });
            },
            changeRead:function () {
                var _this=this;
                $('.femessage-head .feselect').on('click','span',function () {
                    var type=$(this).data('id');
                    $(this).siblings().removeClass('active');
                    $(this).addClass('active');
                    _this.type=type;
                    _this.current = 1;
                    _this.getresult(_this.current,_this.type);
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
                _this.getresult(_this.current,_this.type);
            },
            bindSelect:function () {
                var _this=this;
                $('#allSelect').on('click',function () {
                    if($(this).html()=='全选'){
                        if($('.felist').length<1){
                            return;
                        }
                        $('.felist').find('input[type=checkbox]').prop('checked',true);
                        $(this).html('取消全选');
                    }else{
                        $('.felist').find('input[type=checkbox]').prop('checked','');
                        $(this).html('全选');
                    }
                });
                $('#setRead').on('click',function () {
                    var list=$('.felist').find('input[type=checkbox]:checked');
                    for(var i=0;i<list.length;i++){
                        var id=$(list[i]).data('id');
                        $(list[i]).prop('checked','');
                        _this.$http.post(SERVERROOTDATA + "StudentTrs.ashx?action=updateQuestionState",
                            {
                                questionId:id,
                                saveTag:'update',
                                type:0
                            }
                            ,{emulateJSON: true})
                            .then(function (res) {

                            });
                    }
                    $('#allSelect').html('全选');
                    setTimeout(function () {
                        _this.getresult(_this.current,_this.type);
                    },100);

                });
                $('#delete').on('click',function () {
                    var list=$('.felist').find('input[type=checkbox]:checked');
                    layer.confirm('你确定要删除吗？', {
                        btn: ['确定','取消'] //按钮
                    }, function(){
                        if(list.length<1){
                            layer.msg('无任何选择项');
                            return;
                        }
                        for(var i=0;i<list.length;i++){
                            var id=$(list[i]).data('id');
                            $(list[i]).prop('checked','');
                            _this.$http.post(SERVERROOTDATA + "StudentTrs.ashx?action=updateQuestionState",
                                {
                                    type:2,
                                    questionId:id,
                                    saveTag:'delete'
                                }
                                ,{emulateJSON: true})
                                .then(function (res) {

                                });

                        }
                        $('#allSelect').html('全选');
                        setTimeout(function () {
                            _this.getresult(_this.current,_this.type);
                            _this.$http.post(SERVERROOTDATA + "StudentTrs.ashx?action=getQuestionNum",
                                {
                                    studentId:parentId,
                                    userType:userType
                                }
                                ,{emulateJSON: true})
                                .then(function (res) {
                                    _this.replynum = res.body.num1;
                                    _this.discussnum=res.body.num2;
                                    _this.webnoticenum=res.body.num3;
                                });
                        },100);

                        parent.close();
                    }, function(){
                    });

                    // setTimeout(function () {
                    //     location.reload();
                    //     layer.msg('删除成功！')
                    // },0);
                });
            }
        }
    });
}
// 家长评论回复
function discussreply() {
    var parentId=$(window).storager({key: 'feUid'}).readStorage();
    var userType=$(window).storager({key: 'feUType'}).readStorage();
    if(parentId==null||parentId==undefined||parentId=='undefined'||userType!=2){
        layer.msg('请先登录');
        setTimeout(function () {
            window.location.href = ROOT+"login.html";
        },1000);
        return;
    }
    new Vue({
        el:"#discussreply",
        data:{
            result:[],
            type:0,
            showItem:4,//页码显示条数
            allpage:'1',//总页数
            current:1,//当前页
            replynum:0,
            discussnum:0,
            webnoticenum:0
        },
        filters: {
            addRootFile: function addRootFile(img) {
                return SERVERROOTFILE + img;
            },
            addSource: function addSource(id,type) {
                if(type==1){
                    url='cloundcoursedetail.html?courseId='+id;
                }else{
                    url='coursedetail.html?courseId='+id;
                }
                return url;
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
                _this.changeRead();
                _this.noticeTimer();
                _this.bindSelect();
            })
        },
        methods: {
            noticeTimer:function () {
                var _this=this;
                var timer1=setTimeout(function () {
                    _this.$http.post(SERVERROOTDATA + "StudentTrs.ashx?action=getQuestionNum",
                        {
                            studentId:parentId,
                            userType:userType
                        }
                        ,{emulateJSON: true})
                        .then(function (res) {
                            _this.replynum = res.body.num1;
                            _this.discussnum=res.body.num2;
                            _this.webnoticenum=res.body.num3;
                        });
                    // _this.getresult(_this.current,_this.type);
                },0);
                var timer=setInterval(function () {
                    _this.$http.post(SERVERROOTDATA + "StudentTrs.ashx?action=getQuestionNum",
                        {
                            studentId:parentId,
                            userType:userType
                        }
                        ,{emulateJSON: true})
                        .then(function (res) {
                            _this.replynum = res.body.num1;
                            _this.discussnum=res.body.num2;
                            _this.webnoticenum=res.body.num3;
                        });
                    _this.getresult(_this.current,_this.type);
                },10000)
            },
            changeRead:function () {
                var _this=this;
                $('.femessage-head .feselect').on('click','span',function () {
                    var type=$(this).data('id');
                    $(this).siblings().removeClass('active');
                    $(this).addClass('active');
                    _this.type=type;
                    _this.current = 1;
                    _this.getresult(_this.current,_this.type);
                });
            },
            getresult:function (pageIndex,type) {
                var _this=this;
                this.$http.post(SERVERROOTDATA + "StudentTrs.ashx?action=getEvaluationToMe",
                    {
                        studentId:parentId,
                        valuatorType:userType,
                        states:type,
                        pageIndex:pageIndex,
                        pageSize:6
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        _this.result = res.body.rows.reverse();
                        if(res.body.totalPageCount==undefined||res.body.totalPageCount=='undefined'||res.body.totalPageCount==''){
                            _this.allpage=0;
                        }else {
                            _this.allpage = res.body.totalPageCount;
                        }
                    })
            },
            lookdetail:function (id,coursename,valuator,courseId,lid,pid) {
                var _this=this;
                var oneId='';
                if(lid==0){
                    oneId=id
                }else{
                    oneId=lid;
                }
                _this.$http.post(SERVERROOTDATA + "StudentTrs.ashx?action=updateEvaluationState",
                    {
                        courseEvaluationId:id,
                        saveTag:'update'
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {

                    });
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
                    cancel:function () {
                        _this.getresult(_this.current,_this.type);
                    },
                    content: '../studentcenter/discussdetail.html?courseEvaluationId='+ id + '&coursename='+coursename + "&valuator="+ valuator +"&courseId="+courseId + "&lid="+ oneId + "&pid="+ pid
                });
            },
            bindSelect:function () {
                var _this=this;
                $('#allSelect').on('click',function () {
                    if($(this).html()=='全选'){
                        if($('.felist').length<1){
                            return;
                        }
                        $('.felist').find('input[type=checkbox]').prop('checked',true);
                        $(this).html('取消全选');
                    }else{
                        $('.felist').find('input[type=checkbox]').prop('checked','');
                        $(this).html('全选');
                    }
                });
                $('#setRead').on('click',function () {
                    var list=$('.felist').find('input[type=checkbox]:checked');
                    for(var i=0;i<list.length;i++){
                        var id=$(list[i]).data('id');
                        $(list[i]).prop('checked','');
                        _this.$http.post(SERVERROOTDATA + "StudentTrs.ashx?action=updateEvaluationState",
                            {
                                courseEvaluationId:id,
                                saveTag:'update'
                            }
                            ,{emulateJSON: true})
                            .then(function (res) {

                            });
                    }
                    $('#allSelect').html('全选');
                    setTimeout(function () {
                        _this.getresult(_this.current,_this.type);
                    },100);

                });
                $('#delete').on('click',function () {
                    var list=$('.felist').find('input[type=checkbox]:checked');
                    layer.confirm('你确定要删除吗？', {
                        btn: ['确定','取消'] //按钮
                    }, function(){
                        if(list.length<1){
                            layer.msg('无任何选择项');
                            return;
                        }
                        for(var i=0;i<list.length;i++){
                            var id=$(list[i]).data('id');
                            $(list[i]).prop('checked','');
                            _this.$http.post(SERVERROOTDATA + "StudentTrs.ashx?action=updateEvaluationState",
                                {
                                    courseEvaluationId:id,
                                    saveTag:'delete'
                                }
                                ,{emulateJSON: true})
                                .then(function (res) {

                                });

                        }
                        $('#allSelect').html('全选');
                        setTimeout(function () {
                            _this.getresult(_this.current,_this.type);
                            _this.$http.post(SERVERROOTDATA + "StudentTrs.ashx?action=getQuestionNum",
                                {
                                    studentId:parentId,
                                    userType:userType
                                }
                                ,{emulateJSON: true})
                                .then(function (res) {
                                    _this.replynum = res.body.num1;
                                    _this.discussnum=res.body.num2;
                                    _this.webnoticenum=res.body.num3;
                                });
                        },100);

                        parent.close();
                    }, function(){
                    });

                    // setTimeout(function () {
                    //     location.reload();
                    //     layer.msg('删除成功！')
                    // },0);
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
                _this.getresult(_this.current,_this.type);
            }
        }
    });
}
// 家校互动
function parentmeeting() {
    var parentId=$(window).storager({key: 'feUid'}).readStorage();
    var userType=$(window).storager({key: 'feUType'}).readStorage();
    if(parentId==null||parentId==undefined||parentId=='undefined'||userType!=2){
        layer.msg('请先登录');
        setTimeout(function () {
            window.location.href = ROOT+"login.html";
        },1000);
        return;
    }
    new Vue({
        el:"#parentmeeting",
        data:{
            meeting:[],
            showItem:4,//页码显示条数
            allpage:'',//总页数
            current:1//当前页
        },
        filters: {
            addRootFile: function addRootFile(img) {
                return SERVERROOTFILE + img;
            },
            getState:function getState(type) {
                switch (type){
                    case "0":
                        return "未开始";
                        break;
                    case "1":
                        return "进入直播";
                        break;
                    case "2":
                        return "已结束";
                        break;
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
                _this.getmeeting(1);
            })
        },
        methods: {
            getmeeting:function (pageIndex) {
                var _this=this;
                var index = layer.load(1, {shade: false}); //0代表加载的风格，支持0-2
                this.$http.post(SERVERROOTDATA + "ChannelProgram.ashx?action=getLiveProgramListByUser",
                    {
                        userId:1,
                        userType:'parent',
                        pageIndex:pageIndex,
                        pageSize:9
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        layer.closeAll();
                        if(res.body.code==200){
                            _this.meeting = res.body.rows;
                            _this.allpage=res.body.totalPageCount;
                        }
                    }).then(function () {
                        var list=$('#parentmeeting .felist');
                        var _this=this;
                        if(list.length<1){return;}
                        var time1=setTimeout(function () {
                            for(var i=0;i<list.length;i++){
                                var currentTime=new Date();
                                var beginTime=new Date($(list[i]).find('.beginT').html());
                                var endTime=new Date($(list[i]).find('.endT').html());
                                if(currentTime<beginTime){
                                    $(list[i]).parent().find('.caozuo').html('<a class="gray">未开始</a>');
                                }else if(currentTime>=endTime){
                                    $(list[i]).parent().find('.caozuo').html('<a class="bulecolor">已结束</a>');
                                }else {
                                    console.log('哈哈')
                                    var id=$(list[i]).data('id');
                                    var cid=$(list[i]).data('cid');
                                    var tid=$(list[i]).data('tid');
                                    $(list[i]).parent().find('.caozuo').html('<a class="orange" target="_blank" href="'+ ROOT +'liveroom.html?channelId='+ id +'&channelProgramId='+ cid + '&teacherId='+ tid +'">进入直播</a>');
                                }
                            }
                        },0);
                        var time=setInterval(function () {
                            for(var i=0;i<list.length;i++){
                                var currentTime=new Date();
                                var beginTime=new Date($(list[i]).find('.beginT').html());
                                var endTime=new Date($(list[i]).find('.endT').html());
                                if(currentTime<beginTime){
                                    $(list[i]).parent().find('.caozuo').html('<a class="gray">未开始</a>');
                                }else if(currentTime>=endTime){
                                    $(list[i]).parent().find('.caozuo').html('<a class="bulecolor">已结束</a>');
                                }else {
                                    console.log('哈哈2')
                                    var id=$(list[i]).data('id');
                                    var cid=$(list[i]).data('cid');
                                    var tid=$(list[i]).data('tid');
                                    $(list[i]).parent().find('.caozuo').html('<a class="orange" target="_blank" href="'+ ROOT +'liveroom.html?channelId='+ id +'&channelProgramId='+ cid + '&teacherId='+ tid +'">进入直播</a>');
                                }
                            }
                        },60000)
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
                _this.getmeeting(_this.current);
            }
        }
    });
}
// 家长网站通知
function webnotice() {
    var parentId=$(window).storager({key: 'feUid'}).readStorage();
    var userType=$(window).storager({key: 'feUType'}).readStorage();
    if(parentId==null||parentId==undefined||parentId=='undefined'||userType!=2){
        layer.msg('请先登录');
        setTimeout(function () {
            window.location.href = ROOT+"login.html";
        },1000);
        return;
    }
    new Vue({
        el:"#webnotice",
        data:{
            result:[],
            type:'',
            showItem:4,//页码显示条数
            allpage:'1',//总页数
            current:1,//当前页
            replynum:0,
            discussnum:0,
            webnoticenum:0
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
                _this.changeRead();
                _this.noticeTimer();
                _this.bindSelect();
            })
        },
        methods: {
            getresult:function (pageIndex,type) {
                var _this=this;
                this.$http.post('http://192.168.101.195/website/ashx/' + "StudentTrs.ashx?action=getSystemNoticeListforP",
                    {
                        studentId:parentId,
                        type:type,
                        pageIndex:pageIndex,
                        pageSize:6
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        _this.result = res.body.rows;
                        // _this.result=[{title:'头条',publisher:"天天",time:"2017-10-30 12:00",discussId:1,content:"你很帅!"}];

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
            lookNotice:function  lookNotice(id,title,content) {
                var _this = this;
                _this.$http.post('http://192.168.101.195/website/ashx/' + "StudentTrs.ashx?action=updateSystemNoticeStateforP",
                    {
                        studentId:parentId,
                        systemNoticeId: id,
                        saveTag: 'update'
                    }
                    , { emulateJSON: true })
                    .then(function (res) {

                    });
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
                    content: '<div style="padding: 20px;text-indent: 2em">'+content +'</div>'
                });
            },
            noticeTimer:function () {
                var _this=this;
                var timer1=setTimeout(function () {
                    _this.$http.post('http://192.168.101.195/website/ashx/' + "StudentTrs.ashx?action=getQuestionNum",
                        {
                            studentId:parentId,
                            userType:userType
                        }
                        ,{emulateJSON: true})
                        .then(function (res) {
                            _this.replynum = res.body.num1;
                            _this.discussnum=res.body.num2;
                            _this.webnoticenum=res.body.num3;
                        });
                    // _this.getresult(_this.current,_this.type);
                },0);
                var timer=setInterval(function () {
                    _this.$http.post('http://192.168.101.195/website/ashx/' + "StudentTrs.ashx?action=getQuestionNum",
                        {
                            studentId:parentId,
                            userType:userType
                        }
                        ,{emulateJSON: true})
                        .then(function (res) {
                            _this.replynum = res.body.num1;
                            _this.discussnum=res.body.num2;
                            _this.webnoticenum=res.body.num3;
                        });
                    _this.getresult(_this.current,_this.type);
                },10000)
            },
            bindSelect:function () {
                var _this=this;
                $('#allSelect').on('click',function () {
                    if($(this).html()=='全选'){
                        if($('.felist').length<1){
                            return;
                        }
                        $('.felist').find('input[type=checkbox]').prop('checked',true);
                        $(this).html('取消全选');
                    }else{
                        $('.felist').find('input[type=checkbox]').prop('checked','');
                        $(this).html('全选');
                    }
                });
                $('#setRead').on('click',function () {
                    var list=$('.felist').find('input[type=checkbox]:checked');
                    for(var i=0;i<list.length;i++){
                        console.log($(list[i]).data('id'));
                        var id=$(list[i]).data('id');
                        $(list[i]).prop('checked','');
                        _this.$http.post('http://192.168.101.195/website/ashx/' + "StudentTrs.ashx?action=updateSystemNoticeStateforP",
                            {
                                studentId:parentId,
                                systemNoticeId:id,
                                saveTag:'update'
                            }
                            ,{emulateJSON: true})
                            .then(function (res) {

                            });
                    }
                    $('#allSelect').html('全选');
                    setTimeout(function () {
                        _this.getresult(_this.current,_this.type);
                    },100);

                });
                $('#delete').on('click',function () {
                    var list=$('.felist').find('input[type=checkbox]:checked');
                    layer.confirm('你确定要删除吗？', {
                        btn: ['确定','取消'] //按钮
                    }, function(){
                        if(list.length<1){
                            layer.msg('无任何选择项');
                            return;
                        }
                        for(var i=0;i<list.length;i++){
                            console.log($(list[i]).data('id'));
                            var id=$(list[i]).data('id');
                            $(list[i]).prop('checked','');
                            _this.$http.post('http://192.168.101.195/website/ashx/' + "StudentTrs.ashx?action=updateSystemNoticeStateforP",
                                {
                                    studentId:parentId,
                                    systemNoticeId:id,
                                    saveTag:'delete'
                                }
                                ,{emulateJSON: true})
                                .then(function (res) {

                                });

                        }
                        $('#allSelect').html('全选');
                        setTimeout(function () {
                            _this.getresult(_this.current,_this.type);
                            _this.$http.post('http://192.168.101.195/website/ashx/' + "StudentTrs.ashx?action=getQuestionNum",
                                {
                                    studentId:parentId,
                                    userType:userType
                                }
                                ,{emulateJSON: true})
                                .then(function (res) {
                                    _this.replynum = res.body.num1;
                                    _this.discussnum=res.body.num2;
                                    _this.webnoticenum=res.body.num3;
                                });
                        },100);

                        parent.close();
                    }, function(){
                    });

                    // setTimeout(function () {
                    //     location.reload();
                    //     layer.msg('删除成功！')
                    // },0);
                });
            },
            changeRead:function () {
                var _this=this;
                $('.femessage-head .feselect').on('click','span',function () {
                    var type=$(this).data('id');
                    $(this).siblings().removeClass('active');
                    $(this).addClass('active');
                    _this.type=type;
                    _this.current = 1;
                    _this.getresult(_this.current,_this.type);
                });
            }
        }
    });
}
// 课程收藏
function coursecollection() {
    var userId=$(window).storager({key: 'feUid'}).readStorage();
    var userType=$(window).storager({key: 'feUType'}).readStorage();
    if(userId==null||userId==undefined||userId=='undefined'||userType!=2){
        layer.msg('请先登录');
        setTimeout(function () {
            window.location.href = ROOT+"login.html";
        },1000);
        return;
    }
    new Vue({
        el:"#coursecollection",
        data:{
            current:1,
            showItem: 6,//显示条数
            allpage: '', //总页码
            courselist:[],
            recordType:'',
            nodata:false
        },
        filters: {
            addRoot: function addRoot(id,newsId,kid) {
                if(id== 1 || id=="1"){
                    return ROOT + "cloundcoursedetail.html?courseId=" + newsId;
                }else{
                    if(kid==1){
                        return ROOT + "coursedetail.html?courseId=" + newsId + "&courseKind=1";
                    }else{
                        return ROOT + "coursedetail.html?courseId=" + newsId + "&courseKind=0";
                    }
                }
            },
            addRootFile: function addRootFile(img) {
                return SERVERROOTFILE + img;
            },
            addSchoolRoot:function addSchoolRoot(newsId) {
                return ROOT + "schoolindex.html?organId=" + newsId;
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
                _this.getCourseList(_this.current,_this.recordType);
                _this.changeType();
            })
        },
        methods: {
            getCourseList: function (pageIndex,recordType) {
                var _this = this;
                this.$http.post(SERVERROOTDATA + "Course.ashx?action=getUserCollectCourse",
                    {
                        userId:userId,
                        userType:userType,
                        recordType:recordType,
                        pageIndex:pageIndex,
                        pageSize:4
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        if(res.body.rows.length<1){
                            _this.nodata=true;
                        }else {
                            _this.nodata=false;
                        }
                        _this.courselist = res.body.rows;
                        _this.allpage = res.body.totalPageCount;
                        if(res.body.totalPageCount==0){
                            _this.allpage=1;
                        }
                    }).then(function () {

                })
            },
            changeType:function () {
                var _this=this;
                $('.fehead-tabs').on('click','span',function () {
                    if($(this).hasClass('active')){
                        return
                    }else{
                        $(this).siblings().removeClass('active');
                        $(this).addClass('active');
                        _this.recordType=$(this).data('id');
                        _this.getCourseList(_this.current,_this.recordType);
                    }
                });
            },
            deleteBtn:function (courseId,courseKind) {
                var _this=this;
                layer.confirm('你确定要取消收藏吗？', {
                    title:'收藏',
                    btn: ['确定','取消'] //按钮
                }, function(){
                    _this.$http.post(SERVERROOTDATA + "Course.ashx?action=courseCollect",
                        {
                            userId:userId,
                            userType:userType,
                            courseId:courseId,
                            courseKind:courseKind,
                            cancel:1
                        }
                        ,{emulateJSON: true})
                        .then(function (res) {
                            if(res.body.code==200){
                                layer.msg('取消成功');
                                // setTimeout(function () {
                                _this.getCourseList(_this.current,_this.recordType);
                                // },1000)
                            }
                        }).then(function () {

                    })
                }, function(){
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
                _this.getCourseList(_this.current,_this.recordType);
            }
        }
    });
}
// 我的关注
function myattention() {
    var userId=$(window).storager({key: 'feUid'}).readStorage();
    var userType=$(window).storager({key: 'feUType'}).readStorage();
    if(userId==null||userId==undefined||userId=='undefined'||userType!=2){
        layer.msg('请先登录');
        setTimeout(function () {
            window.location.href = ROOT+"login.html";
        },1000);
        return;
    }
    new Vue({
        el: "#myattention",
        data: {
            // 筛选条件
            current: 1, //当前页
            gradeId: '',
            subjectId: '',
            teacherListArr: [], //老师列表
            nodata: false,
            showItem: 6,
            allpage: 0
        },
        filters: {
            addCourseRoot: function addCourseRoot(cid) {
                if(cid==undefined||cid==''){
                    return
                }
                return ROOT + "coursedetail.html?courseId=" + cid;
            },
            addCloundRoot: function addCloundRoot(newsId) {
                if(newsId==undefined||cid==''){
                    return
                }
                return ROOT + "cloundcoursedetail.html?courseId=" + newsId;
            },
            addRootFile: function addRootFile(img) {
                return SERVERROOTFILE + img;
            },
            addCourseNameEmpty:function addCourseNameEmpty(name) {
                return name==''? '无': name;
            }
        },
        mounted: function() {
            var _this = this;
            this.$nextTick(function() {
                _this.getLeftList(_this.current);
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
            getLeftList: function(pageIndex) {
                var _this = this;
                this.$http.post(SERVERROOTDATA + "Teacher.ashx?action=getUserFocusTeacherList", {
                    userId: userId,
                    userType: userType,
                    pageIndex: pageIndex,
                    pageSize: 4
                }, {
                    emulateJSON: true
                })
                    .then(function(res) {
                        if(res.body.rows.length < 1) {
                            _this.nodata = true;
                            console.log('没有数据')
                            //return false;
                        }else{
                            _this.nodata = false;
                        }
                        _this.allpage = res.body.totalPageCount;
                        _this.teacherListArr = res.body.rows;
                        if(res.body.totalPageCount==0){
                            _this.allpage=1;
                        }
                    }).then(function() {
                    _this.teacherListArr.forEach(function(item, index) {
                        Vue.set(item, "liveId", ROOT + 'teacherindex.html?teacherId=' + item.teacherId); //注册变量

                    })
                })
            },
            deleteBtn:function (id) {
                var _this=this;
                layer.confirm('你确定要取消关注吗？', {
                    title:'关注',
                    btn: ['确定','取消'] //按钮
                }, function(){
                    _this.$http.post(SERVERROOTDATA + "PayAttention.ashx?action=cancelPayAttention",
                        {
                            userId:userId,
                            userType:userType,
                            attentedId:id,
                            attentedType:1
                        }
                        ,{emulateJSON: true})
                        .then(function (res) {
                            if(res.body.code==200){
                                layer.msg('取消成功');
                                // setTimeout(function () {
                                _this.getLeftList(_this.current);
                                // },1000)
                            }
                        }).then(function () {

                    })
                }, function(){
                });
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
                _this.getLeftList(_this.current);
            }
        }
    })
}