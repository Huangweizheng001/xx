/**
 * Created by Administrator on 2017/12/5 0005.
 */
Vue.component('community-header-template', {
    template: '<div style="background: #f4f4f4">' +
    '<div class="fe-header-top-bar">' +
        '<div class="container">' +
            '<a class="fe-header-top-logo wow slideInLeft" v-bind:href="index | addRoot">' +
                '<img v-bind:src="smallLogo | addRoot" alt="福建教育网" /> 官网首页' +
            '</a>| &nbsp;' +
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
            '<div class="festudent-head fecommunity-head-bg">' +
                '<div class="feimage">' +
                    '<img v-bind:src="headimg | addRootFile"/>' +
                    '<input type="file" id="mytx" name="mphoto">'+
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
            member: 'community/centeralreadygroup.html',
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
                var uId=$(window).storager({key: 'feUid'}).readStorage();
                if(uId==undefined||uId==null||uId=='undefined'){
                    layer.msg('请先登录');
                    return;
                }
                var type=$(window).storager({key: 'feUType'}).readStorage();
                switch (type){
                    case '1':
                        var userType='student';
                        break;
                    case '2':
                        var userType='parent';
                        break;
                    case '3':
                        var userType='teacher';
                        break;
                    default:
                        break;
                }
                if($(this).val().match( /.jpg|.gif|.png|.bmp/i)) {
                    var data = new FormData($('#membercenter')[0]);
                    data.append('userId',uId);
                    data.append('userType',userType);
                    $.ajax({
                        url: SERVERROOTDATA+"User.ashx?action=updateUserHeadPortrait",
                        type: "POST",
                        data: data,
                        processData: false,  // 告诉jQuery不要去处理发送的数据
                        contentType: false,   // 告诉jQuery不要去设置Content-Type请求头
                        success:function (res) {
                            var data = JSON.parse(res);
                            if(data.code==200){
                                $.ajax({
                                    url: SERVERROOTDATA+"User.ashx?action=getUserHeadPortrait",
                                    type: "POST",
                                    data: {"userId":uId,"userType":userType},
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
            $(window).storager({
                key: 'feUIcon'
            }).removeStorage();
            $(window).storager({
                key: 'feUName'
            }).removeStorage();
            $(window).storager({
                key: 'feUType'
            }).removeStorage();
            $(window).storager({
                key: 'feCommunityUid'
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
Vue.component('community-left-template', {
    template:   '<div class="feteacherpersonalcenter-left">' +
                    '<h1 style="font-weight: bold">社圈管理</h1>' +
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
                    icon:"uk-icon-group",
                    parent:"我的群组",
                    children:[
                        {
                            href:"centeralreadygroup.html",
                            name:"已创建"
                        },
                        {
                            href:"centerjoinedgroup.html",
                            name:"已加入"
                        }
                    ]
                },
                {
                    icon:"uk-icon-file-text-o",
                    parent:"帖子管理",
                    children:[
                        {
                            href:"centermypost.html",
                            name:"我的群贴"
                        },
                        {
                            href:"centermyreplies.html",
                            name:"我的回帖"
                        }
                    ]
                },
                {
                    icon:"uk-icon-bell-o",
                    parent:"我的消息",
                    children:[
                        {
                            href:"centergroupnotice.html",
                            name:"群组通知"
                        },
                        // {
                        //     href:"",
                        //     name:"好友私信"
                        // },
                        {
                            href:"centerdiscussreply.html",
                            name:"评论回复"
                        },
                        // {
                        //     href:"",
                        //     name:"收藏/点赞"
                        // }
                    ]
                },
                // {
                //     icon:"uk-icon-life-ring",
                //     parent:"我的关注",
                //     children:[
                //         {
                //             href:"",
                //             name:"关注好友"
                //         },
                //         {
                //             href:"",
                //             name:"收藏帖子"
                //         }
                //     ]
                // }
            ],
            notice:0,
            discuss:0
        };
    },
    mounted: function mounted() {
        //1.0ready --> 2.0
        this.$nextTick(function() {
            //初始化
            this.addActive();
            this.noticeTimer();
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
        },
        noticeTimer:function () {
            var _this=this;
            var notice1=setTimeout(function () {
                _this.$http.post(COMMUNITESERVERROOTDATA + "topic.ashx?action=getAnnouncementsNoReadCountByGroupId",
                    {
                        groupId:'',
                        uid:$(window).storager({key: 'feCommunityUid'}).readStorage()
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        _this.notice = res.body.noReadCount;
                    }).then(function () {
                        if($('#leftaside li a:contains("群组通知")').find('b').length<1){
                            $('#leftaside li a:contains("群组通知")').append('<b>'+ _this.notice +'</b>');
                        }else{
                            $('#leftaside li a:contains("群组通知")').find('b').html(_this.notice);
                        }
                        if(_this.notice<1){
                            $('#leftaside li a:contains("群组通知")').find('b').css('display','none');
                        }else{
                            $('#leftaside li a:contains("群组通知")').find('b').css('display','inline-block');
                        }
                })
            },0);
            var notice2=setInterval(function () {
                _this.$http.post(COMMUNITESERVERROOTDATA + "topic.ashx?action=getAnnouncementsNoReadCountByGroupId",
                    {
                        groupId:'',
                        uid:$(window).storager({key: 'feCommunityUid'}).readStorage()
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        _this.notice = res.body.noReadCount;
                    }).then(function () {
                        if($('#leftaside li a:contains("群组通知")').find('b').length<1){
                            $('#leftaside li a:contains("群组通知")').append('<b>'+ _this.notice +'</b>');
                        }else{
                            $('#leftaside li a:contains("群组通知")').find('b').html(_this.notice);
                        }
                        if(_this.notice<1){
                            $('#leftaside li a:contains("群组通知")').find('b').css('display','none');
                        }else{
                            $('#leftaside li a:contains("群组通知")').find('b').css('display','inline-block');
                        }
                });

            },60000);
            var discuss1=setTimeout(function () {
                _this.$http.post(COMMUNITESERVERROOTDATA + "topic.ashx?action=getPostsNoReadCountByGroupId",
                    {
                        groupId:'',
                        uid:$(window).storager({key: 'feCommunityUid'}).readStorage()
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        _this.discuss = res.body.noReadCount;
                    }).then(function () {
                    if($('#leftaside li a:contains("评论回复")').find('b').length<1){
                        $('#leftaside li a:contains("评论回复")').append('<b>'+ _this.discuss +'</b>');
                    }else{
                        $('#leftaside li a:contains("评论回复")').find('b').html(_this.discuss);
                    }
                    if(_this.discuss<1){
                        $('#leftaside li a:contains("评论回复")').find('b').css('display','none');
                    }else{
                        $('#leftaside li a:contains("评论回复")').find('b').css('display','inline-block');
                    }
                })
            },0);
            var discuss2=setInterval(function () {
                _this.$http.post(COMMUNITESERVERROOTDATA + "topic.ashx?action=getPostsNoReadCountByGroupId",
                    {
                        groupId:'',
                        uid:$(window).storager({key: 'feCommunityUid'}).readStorage()
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        _this.discuss = res.body.noReadCount;
                    }).then(function () {
                    if($('#leftaside li a:contains("评论回复")').find('b').length<1){
                        $('#leftaside li a:contains("评论回复")').append('<b>'+ _this.discuss +'</b>');
                    }else{
                        $('#leftaside li a:contains("评论回复")').find('b').html(_this.discuss);
                    }
                    if(_this.discuss<1){
                        $('#leftaside li a:contains("评论回复")').find('b').css('display','none');
                    }else{
                        $('#leftaside li a:contains("评论回复")').find('b').css('display','inline-block');
                    }
                });

            },60000);
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
// 我创建的群组
function mygroup() {
    var uId=$(window).storager({key: 'feCommunityUid'}).readStorage();
    var userType=$(window).storager({key: 'feUType'}).readStorage();
    if(uId==null||uId==undefined||uId=='undefined'){
        layer.msg('请先登录');
        setTimeout(function () {
            window.location.href = ROOT+"login.html";
        },1000);
        return;
    }
    new Vue({
        el:"#femygroup",
        data:{
            mystudio:[],
            showItem:4,//页码显示条数
            allpage:'',//总页数
            current:1//当前页
        },
        filters: {
            addRootFile: function addRootFile(img) {
                return COMMINITYROOTFILE + img;
            }
        },
        mounted:function () {
            var _this=this;
            this.$nextTick(function () {
                _this.getstudio(1);
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
            getstudio:function (pageIndex) {
                var _this=this;
                this.$http.post(COMMUNITESERVERROOTDATA + "topic.ashx?action=getGroupListByUid",
                    {
                        uid:uId,
                        pageIndex:pageIndex,
                        pageSize:6
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        // if(res.body.returnObj.length < 1) {
                        //     return false;
                        // } else {
                            _this.allpage = res.body.totalPageCount; //总页数
                            _this.mystudio = res.body.returnObj;
                        // }

                    }).then(function () {
                        $('.fevediodetail').on('click','.fepanel',function () {
                            var id=$(this).data('id');
                            window.location.href="centermygroupdetail.html?groupId="+ id ;
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
                _this.getstudio(_this.current);
            }
        }
    })
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
// 我的群组详细页面
function mygroupdetail(groupId,groupTypeId,type) {
    var uId=$(window).storager({key: 'feCommunityUid'}).readStorage();
    var userType=$(window).storager({key: 'feUType'}).readStorage();
    if(uId==null||uId==undefined||uId=='undefined'){
        layer.msg('请先登录');
        setTimeout(function () {
            window.location.href = ROOT+"login.html";
        },1000);
        return;
    }
    if(type==undefined||type==''||type=='undefined'){
        $('.femygroupdetail ul li:first-child').addClass('active');
        $('.femygroupdetail ul li:first-child').siblings().removeClass('active');
        var showdom=$('.femygroupdetail .fecontent>div:nth-child(1)');
        console.log(showdom);
        showdom.fadeIn(300);
        showdom.siblings().hide();
    }else if(type==2||type=='2'){
        $('.femygroupdetail ul li:nth-child(3)').addClass('active');
        $('.femygroupdetail ul li:nth-child(3)').siblings().removeClass('active');
        var showdom=$('.femygroupdetail .fecontent>div:nth-child(2)');
        console.log(showdom);
        showdom.css('display','block');
        showdom.siblings().hide();
    }else if(type==3){
        $('.femygroupdetail ul li:nth-child(4)').addClass('active');
        $('.femygroupdetail ul li:nth-child(4)').siblings().removeClass('active');
        var showdom=$('.femygroupdetail .fecontent>div:nth-child(3)');
        console.log(showdom);
        showdom.css('display','block');
        showdom.siblings().hide();
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
    var typeId='';
    // 获取下拉框
    $.ajax({
        async: false,
        url: COMMUNITESERVERROOTDATA+"topic.ashx?action=getGroupTypeList",
        type: "POST",
        data: {uid:uId},
        // processData: false,  // 告诉jQuery不要去处理发送的数据
        // contentType: false,   // 告诉jQuery不要去设置Content-Type请求头
        success:function (res) {
            var data = JSON.parse(res);
            if(data.returnObj.length<1){
                return false;
            }else{
                var options='';
                for(var i=0;i<data.returnObj.length;i++){
                    options+='<option value="'+ data.returnObj[i].groupTypeId +'">'+ data.returnObj[i].typeName +'</option>';
                }
                $('#groupTypeId').html(options);
            }
        }
    });
    // 获取基本信息
    $.ajax({
        async: false,
        url: COMMUNITESERVERROOTDATA+"topic.ashx?action=getGroupInfoById",
        type: "POST",
        data: {groupId:groupId},
        // processData: false,  // 告诉jQuery不要去处理发送的数据
        // contentType: false,   // 告诉jQuery不要去设置Content-Type请求头
        success:function (res) {
            var data = JSON.parse(res);
            // console.log(data);
            if(data.returnObj.length<1){
                return false;
            }else{
                $('#groupName').val(data.returnObj[0].groupName);
                $('#groupTypeId').prev().html(data.returnObj[0].typeName);
                $('#introduction').val(data.returnObj[0].Introduction);

                $('.feright').find('img').attr('src',COMMINITYROOTFILE + data.returnObj[0].icon);
                typeId=data.returnObj[0].groupTypeId;
                var arr=$('#groupTypeId option');
                for(var i=0;i<arr.length;i++){
                    if($(arr[i]).val()==typeId){
                        $(arr[i]).prop('selected',true);
                    }
                }
            }
        }
    });
    // 成员管理
    new Vue({
        el:"#menbermanage",
        data:{
            menber:[],
            showItem:4,//页码显示条数
            allpage:'',//总页数
            current:1,//当前页
            time:'',
            keyword:''
        },
        filters: {
            addRootFile: function addRootFile(img) {
                return COMMINITYROOTFILE + img;
            },
            zero:function zero(n) {
                return n==''? "0":n;
            },
            addFetvFile: function addFetvFile(obj) {
                return SERVERROOTFILE + obj;
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
                _this.getmenber(1,_this.time,_this.keyword);
                _this.bindFn();
            })
        },
        methods: {
            bindFn:function () {
                var _this=this;
                ECalendarisOpen($("#jointime"));
                $('.menbermanage').on('blur','#jointime',function () {
                    _this.time=$(this).val();
                    _this.current=1;
                    _this.getmenber(_this.current,_this.time,_this.keyword);
                });
                $('.menbermanage').on('blur','#keyword',function () {
                    _this.keyword=$(this).val();
                    _this.current=1;
                    _this.getmenber(_this.current,_this.time,_this.keyword);
                });
            },
            setManage:function (id) {
                var _this=this;
                this.$http.post(COMMUNITESERVERROOTDATA + "topic.ashx?action=updateGroupManagerByUid",
                    {
                        groupId:groupId,
                        uid :id
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        // if(res.body.code=='200'){
                            layer.msg(res.body.message);
                        // }
                    })
            },
            deleteU:function (id) {
                var _this=this;
                this.$http.post(COMMUNITESERVERROOTDATA + "topic.ashx?action=deleteGroupMeneger",
                    {
                        groupId:groupId,
                        uid :id
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        if(res.body.code=='200'){
                            layer.msg('删除成功', {icon: 1});
                            setTimeout(function () {
                                _this.getmenber(_this.current,_this.time,_this.keyword);
                            },1000);
                            // window.location.href='centermygroupdetail.html?groupId='+groupId + '&type=2';
                        }
                    })
            },
            getmenber:function (pageIndex,dayTime,conditions) {
                var _this=this;
                this.$http.post(COMMUNITESERVERROOTDATA + "topic.ashx?action=getGroupMemeberByGroupId",
                    {
                        groupId:groupId,
                        dayTime:dayTime,
                        conditions:conditions,
                        pageIndex:pageIndex,
                        pageSize:5
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        if(res.body.returnObj==undefined) {
                            return false;
                        } else {
                            _this.allpage = res.body.totalPageCount; //总页数
                            _this.menber = res.body.returnObj;
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
                _this.getmenber(_this.current,_this.time,_this.keyword);
            }
        }
    });
    // 通知管理
    new Vue({
        el:"#noticemanage",
        data:{
            notice:[],
            showItem:4,//页码显示条数
            allpage:'',//总页数
            current:1//当前页
        },
        filters: {
            addRootFile: function addRootFile(img) {
                return COMMINITYROOTFILE + img;
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
                _this.getnotice(1);
                _this.bindFn();
            })
        },
        methods: {
            getnotice:function (pageIndex) {
                var _this=this;
                this.$http.post(COMMUNITESERVERROOTDATA + "topic.ashx?action=getAnnouncementsByGroupId",
                    {
                        groupId:groupId,
                        pageIndex:pageIndex,
                        pageSize:10
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        // if(res.body.returnObj.length < 1) {
                        //     return false;
                        // } else {
                            _this.allpage = res.body.totalPageCount; //总页数
                            _this.notice = res.body.returnObj;
                        // }
                    })
            },
            bindFn:function () {
              $('.noticemanage').on('click','.feselect button',function () {
                  layer.open({
                      type: 2,
                      title: '发布通告',
                      shadeClose: true,
                      shade: false,
                      maxmin: true, //开启最大化最小化按钮
                      area: ['900px', '650px'],
                      content: 'centeraddnotice.html?groupId=' + groupId + "&groupTypeId=" + typeId
                  });
              })
            },
            bindEdit:function (id) {
                layer.open({
                    type: 2,
                    title: '通告详情',
                    shadeClose: true,
                    shade: false,
                    maxmin: true, //开启最大化最小化按钮
                    area: ['900px', '650px'],
                    content: 'centeraddnotice.html?nid='+ id +'&groupId='+groupId+'&groupTypeId='+ typeId
                });
            },
            bindDelete:function (id) {
                var _this=this;
                layer.confirm('你确定要删除吗？', {
                    btn: ['确定', '取消'] //按钮
                }, function () {
                    $.ajax({
                        url: COMMUNITESERVERROOTDATA + "topic.ashx?action=deleteAnnouncementsInfo",
                        type: "POST",
                        data: {announcementsId : id},
                        success: function (res) {
                            var data=JSON.parse(res);
                            if (data.code == 200) {
                                layer.msg('删除成功！', {icon: 1});
                                setTimeout(function () {
                                    layer.closeAll();
                                    _this.getnotice(_this.current);
                                    // window.location.href='centermygroupdetail.html?groupId='+groupId + '&type=3';
                                },1000);
                            }
                        }
                    });
                }, function () {
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
                _this.getnotice(_this.current);
            }
        }
    });

    // 基本信息-编辑按钮
    $('.communitybassic').on('click','.feright #edit',function () {
        if(!$(this).hasClass('active')){
            $('.communitybassic .fepanel s').addClass('fehidden');
            $('.communitybassic .fepanel select').removeClass('fehidden');
            $('.communitybassic .fepanel input').prop('disabled','');
            $('.communitybassic .fepanel textarea').prop('disabled','');
            $('.communitybassic .feoperation').removeClass('fehidden');
            $('.communitybassic p').removeClass('fehidden');
            $('#groupTypeId').prop('disabled','');
        }
    });
    // 基本信息-取消按钮
    $('.communitybassic').on('click','#btn>button:last-child',function () {
        window.location.reload();
    });
    // 基本信息-保存按钮
    $('.communitybassic').on('click','#btn>button:first-child',function () {
        var data = new FormData($('#communitybassic')[0]);
        data.append('groupId',groupId);
        $.ajax({
            url: COMMUNITESERVERROOTDATA +"topic.ashx?action=updateGroupInfo",
            type: "POST",
            data: data,
            processData: false,  // 告诉jQuery不要去处理发送的数据
            contentType: false,   // 告诉jQuery不要去设置Content-Type请求头
            success:function (res) {
                var data1 = JSON.parse(res);
                console.log('哈哈');
                if(data1.code==200){
                    layer.msg('修改成功');
                    setTimeout(function () {
                        window.location.reload();
                    },1000)
                }else{
                    layer.msg('保存失败');
                }
            }
        });
    });
    // 更换群组封面预览
    $('.communitybassic').on('change','#groupimg',function () {
        if($(this).val().match( /.jpg|.gif|.png|.bmp/i)) {
            var dom = $(this).parent().parent().prev();
            upload(this, dom);
            // $(this).val('');
        }else {
            layer.msg("对不起，系统仅支持标准格式的照片，请您调整格式后重新上传，谢谢 !");
        }
        console.log(777);
    })
}
// 添加通知
function addnotice(nid,groupId,groupTypeId) {
    var ue = UE.getEditor('editor');
    var uId=$(window).storager({key: 'feCommunityUid'}).readStorage();
    var userType=$(window).storager({key: 'feUType'}).readStorage();
    if(uId==null||uId==undefined||uId=='undefined'){
        layer.msg('请先登录');
        setTimeout(function () {
            window.location.href = ROOT+"login.html";
        },1000);
        return;
    }
    if(nid==undefined||nid=='undefined'||nid==''){
        // 创建
        $('.feaddstudioinformation').on('click','#btn',function () {
            var title=$('#title').val();
            var content=UE.getEditor('editor').getContent();
            $.ajax({
                url: COMMUNITESERVERROOTDATA +"topic.ashx?action=createAnnouncementsInfo",
                type: "POST",
                data: {uid:uId,title:title,message:content,userName:'a',groupId:groupId,groupTypeId:groupTypeId},
                // processData: false,  // 告诉jQuery不要去处理发送的数据
                // contentType: false,   // 告诉jQuery不要去设置Content-Type请求头
                success:function (res) {
                    var data1 = JSON.parse(res);
                    if(data1.code=='200'){
                        layer.msg('发布成功');
                        setTimeout(function () {
                            parent.close();
                            parent.refresh(groupId,groupTypeId);

                        },1000)

                    }
                }
            });
        })
    }else {
        // 编辑
        $.ajax({
            url: COMMUNITESERVERROOTDATA +"topic.ashx?action=getAnnouncementsInfo",
            type: "POST",
            data: {aid:nid},
            // processData: false,  // 告诉jQuery不要去处理发送的数据
            // contentType: false,   // 告诉jQuery不要去设置Content-Type请求头
            success:function (res) {
                // 保存
                var data = JSON.parse(res);
                $('#title').val(data.returnObj[0].Title);
                $('#content').val(data.returnObj[0].Message);
                setContent();
                // UE.getEditor('editor').setContent($('#content').val());
                $('.feaddstudioinformation').on('click','#btn',function () {
                    var title=$('#title').val();
                    var content=UE.getEditor('editor').getContent();
                    $.ajax({
                        url: COMMUNITESERVERROOTDATA +"topic.ashx?action=updateAnnouncementsInfo",
                        type: "POST",
                        data: {aid:nid,title:title,message:content},
                        // processData: false,  // 告诉jQuery不要去处理发送的数据
                        // contentType: false,   // 告诉jQuery不要去设置Content-Type请求头
                        success:function (res) {
                            var data = JSON.parse(res);
                            if(data.code=='200'){
                                layer.msg('保存成功');
                                setTimeout(function () {
                                    parent.close();
                                    parent.refresh(groupId,groupTypeId);
                                },1000)

                            }
                        }
                    });
                })
            }
        });
    }

}
function close() {
    layer.closeAll()
}
function reset() {
    window.location.reload();
}
function refresh(groupId,groupTypeId) {
    window.location.href='centermygroupdetail.html?groupId='+groupId+'&groupTypeId='+ groupTypeId + '&type=3';
}
function setContent() {
    var strv = $("#content").val();
    try {
        UE.getEditor('editor').setContent(strv);
    }
    catch (e) {
        var t = setTimeout("setContent()", 1000)
    }
}
// 我加入的群组
function myjoinedgroup() {
    var uId=$(window).storager({key: 'feCommunityUid'}).readStorage();
    var userType=$(window).storager({key: 'feUType'}).readStorage();
    if(uId==null||uId==undefined||uId=='undefined'){
        layer.msg('请先登录');
        setTimeout(function () {
            window.location.href = ROOT+"login.html";
        },1000);
        return;
    }
    new Vue({
        el:"#myjoinedgroup",
        data:{
            mystudio:[],
            showItem:4,//页码显示条数
            allpage:'',//总页数
            current:1//当前页
        },
        filters: {
            addRootFile: function addRootFile(img) {
                return COMMINITYROOTFILE + img;
            }
        },
        mounted:function () {
            var _this=this;
            this.$nextTick(function () {
                _this.getstudio(1);
                _this.bindFn();
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
            getstudio:function (pageIndex) {
                var _this=this;
                this.$http.post(COMMUNITESERVERROOTDATA + "topic.ashx?action=getUserAndGroupListByUid",
                    {
                        uid:uId,
                        pageIndex:pageIndex,
                        pageSize:6
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        // if(res.body.returnObj.length < 1) {
                        //     return false;
                        // } else {
                            _this.allpage = res.body.totalPageCount; //总页数
                            _this.mystudio = res.body.returnObj;
                        // }

                    })
            },
            bindFn:function () {
                var _this=this;
                $('.fevediodetail').on('click','.fepanel ul li:first-child',function () {
                    var id=$(this).parent().parent().data('id');
                    var typeid=$(this).parent().parent().data('gid');
                    window.open('communitygroupdetail.html?groupId='+id+'&groupTypeId='+typeid);
                });
                $('.fevediodetail').on('click','.fepanel ul li:last-child',function () {
                    var id=$(this).parent().parent().data('id');
                    layer.confirm('你确定要退出该群组吗？', {
                        btn: ['确定','取消'] //按钮
                    }, function(){
                        _this.$http.post(COMMUNITESERVERROOTDATA + "topic.ashx?action=outGroup",
                            {
                                uid:uId,
                                groupId:id
                            }
                            ,{emulateJSON: true})
                            .then(function (res) {
                                // if(res.body.returnObj.length < 1) {
                                //     return false;
                                // } else {
                                //     _this.allpage = res.body.totalPageCount; //总页数
                                //     _this.mystudio = res.body.returnObj;
                                // }
                                layer.msg(res.body.message);
                                setTimeout(function () {
                                    parent.close();
                                    _this.getstudio(_this.current);
                                },1000)
                            })
                    }, function(){
                    });
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
                _this.getstudio(_this.current);
            }
        }
    })
}
// 我的群贴
function mypost() {
    var uId=$(window).storager({key: 'feCommunityUid'}).readStorage();
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
    // 我创建的群组
    new Vue({
        el:"#mycreategrouppost",
        data:{
            post:[],
            groupId:'',
            showItem:4,//页码显示条数
            allpage:'',//总页数
            current:1,//当前页
            groupArr:[]
        },
        filters: {
            addRootFile: function addRootFile(img) {
                return SERVERROOTFILE + img;
            },
            lookTip:function (id) {
                return  "communitypostdetail.html?postId=" +id;
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
                _this.getpost(1,_this.groupId);
                _this.bingSelect();
            })
        },
        methods: {
            bingSelect:function () {
                var _this=this;
                this.$http.post(COMMUNITESERVERROOTDATA + "topic.ashx?action=getGroupListByUid",
                    {
                        uid:uId,
                        pageIndex:1,
                        pageSize:9999
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        // if(res.body.returnObj.length < 1) {
                        //     return false;
                        // } else {
                            // _this.allpage = res.body.totalPageCount; //总页数
                            _this.groupArr = res.body.returnObj;
                        // }
                    }).then(function () {
                        $('.mycreategrouppost').on('change','#group',function () {
                            _this.groupId=$(this).val();
                            _this.current=1;
                            _this.getpost(_this.current,_this.groupId);
                        })
                })
            },
            getpost:function (pageIndex,groupId) {
                var _this=this;
                this.$http.post(COMMUNITESERVERROOTDATA + "topic.ashx?action=getTopicGroupByUid",
                    {
                        groupId:groupId,
                        uid:uId,
                        pageIndex:pageIndex,
                        pageSize:10
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        // if(res.body.returnObj.length < 1) {
                        //     return false;
                        // } else {
                            _this.allpage = res.body.totalPageCount; //总页数
                            _this.post = res.body.returnObj;
                        // }
                    })
            },
            tuijian:function (id) {
                var _this=this;
                this.$http.post(COMMUNITESERVERROOTDATA + "topic.ashx?action=updateTopicSpecial",
                    {
                        tid:id
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        layer.msg(res.body.message, {icon: 1});
                        setTimeout(function () {
                            _this.getpost(_this.current,_this.groupId);
                        },1000);
                    })
            },
            suotie:function (id) {
                var _this=this;
                this.$http.post(COMMUNITESERVERROOTDATA + "topic.ashx?action=updateTopicClose",
                    {
                        tid:id
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        layer.msg(res.body.message, {icon: 1});
                        setTimeout(function () {
                            _this.getpost(_this.current,_this.groupId);
                        },1000);
                    })
            },
            jietie:function (id) {
                var _this=this;
                this.$http.post(COMMUNITESERVERROOTDATA + "topic.ashx?action=updateTopicOpen",
                    {
                        tid:id
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        layer.msg(res.body.message, {icon: 1});
                        setTimeout(function () {
                            _this.getpost(_this.current,_this.groupId);
                        },1000);
                    })
            },
            deleteT:function (id) {
                var _this=this;
                layer.confirm('你确定要删除吗？', {
                    btn: ['确定', '取消'] //按钮
                }, function () {
                    $.ajax({
                        url: COMMUNITESERVERROOTDATA + "topic.ashx?action=deleteTopicBytId",
                        type: "POST",
                        data: {tid : id},
                        success: function (res) {
                            var data=JSON.parse(res);
                            if (data.code == 200) {
                                layer.msg('删除成功！', {icon: 1});
                                setTimeout(function () {
                                    // layer.closeAll()
                                    _this.getpost(_this.current,_this.groupId);
                                },1000);

                            }
                        }
                    });
                }, function () {
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
                _this.getpost(_this.current,_this.groupId);
            }
        }
    });
    // 我加入的群组
    new Vue({
        el:"#myjoinedgrouppost",
        data:{
            post:[],
            groupId:'',
            groupArr:[],
            showItem:4,//页码显示条数
            allpage:'',//总页数
            current:1//当前页
        },
        filters: {
            addRootFile: function addRootFile(img) {
                return SERVERROOTFILE + img;
            },
            addStudioRoot: function addStudioRoot(id) {
                return ROOT + "teacherstudio.html?teachingStudioId=" + id;
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
                _this.getpost(1,_this.groupId);
                _this.bingSelect();
            })
        },
        methods: {
            bingSelect:function () {
                var _this=this;
                this.$http.post(COMMUNITESERVERROOTDATA + "topic.ashx?action=getUserAndGroupListByUid",
                    {
                        uid:uId,
                        pageIndex:1,
                        pageSize:9999
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        // if(res.body.returnObj.length < 1) {
                        //     return false;
                        // } else {
                            _this.allpage = res.body.totalPageCount; //总页数
                            _this.groupArr = res.body.returnObj;
                        // }
                    }).then(function () {
                    $('.mycreategrouppost').on('change','#group1',function () {
                        _this.groupId=$(this).val();
                        _this.current=1;
                        _this.getpost(_this.current,_this.groupId);
                    })
                })
            },
            getpost:function (pageIndex,groupId) {
                var _this=this;
                this.$http.post(COMMUNITESERVERROOTDATA  + "topic.ashx?action=getTopicNoGroupByUid",
                    {
                        groupId:groupId,
                        pageIndex:pageIndex,
                        pageSize:10,
                        uid:uId
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        // if(res.body.returnObj.length < 1) {
                        //     return false;
                        // } else {
                            _this.allpage = res.body.totalPageCount; //总页数
                            _this.post = res.body.returnObj;
                        // }
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
                _this.getpost(_this.current);
            }
        }
    });
}
// 我的回帖
function myreplies() {
    var uId=$(window).storager({key: 'feCommunityUid'}).readStorage();
    var userType=$(window).storager({key: 'feUType'}).readStorage();
    if(uId==null||uId==undefined||uId=='undefined'){
        layer.msg('请先登录');
        setTimeout(function () {
            window.location.href = ROOT+"login.html";
        },1000);
        return;
    }
    new Vue({
        el:"#myreplies",
        data:{
            post:[],
            groupId:'',
            conditions:'',
            groupArr:[],
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
                _this.getpost(1,_this.groupId,_this.conditions);
                _this.bingSelect();
            })
        },
        methods: {
            bingSelect:function () {
                var _this=this;
                this.$http.post(COMMUNITESERVERROOTDATA + "topic.ashx?action=getUserAndGroupListByUid",
                    {
                        uid:uId,
                        pageIndex:1,
                        pageSize:9999
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        // if(res.body.returnObj.length < 1) {
                        //     return false;
                        // } else {
                        //     _this.allpage = res.body.totalPageCount; //总页数
                            _this.groupArr = res.body.returnObj;
                        // }
                    }).then(function () {
                    $('.mycreategrouppost').on('change','#group',function () {
                        _this.groupId=$(this).val();
                        _this.current=1;
                        _this.getpost(_this.current,_this.groupId,_this.conditions);
                    })
                })
            },
            getpost:function (pageIndex,groupId,conditions) {
                var _this=this;
                this.$http.post(COMMUNITESERVERROOTDATA + "topic.ashx?action=getPostGroupByUid",
                    {
                        groupId:groupId,
                        conditions:conditions,
                        pageIndex:pageIndex,
                        pageSize:10
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        // if(res.body.returnObj.length < 1) {
                        //     return false;
                        // } else {
                            _this.allpage = res.body.totalPageCount; //总页数
                            _this.post = res.body.returnObj;
                        // }
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
                _this.getpost(_this.current,_this.groupId,_this.conditions);
            }
        }
    });
}
// 群组通知
function groupnotice() {
    var uId=$(window).storager({key: 'feCommunityUid'}).readStorage();
    var userType=$(window).storager({key: 'feUType'}).readStorage();
    if(uId==null||uId==undefined||uId=='undefined'){
        layer.msg('请先登录');
        setTimeout(function () {
            window.location.href = ROOT+"login.html";
        },1000);
        return;
    }
    new Vue({
        el:"#groupnotice",
        data:{
            result:[],
            groupArr:[],
            isRead:'',
            groupId:'',
            showItem:4,//页码显示条数
            allpage:'1',//总页数
            current:1//当前页
            // replynum:0,
            // discussnum:0,
            // webnoticenum:0
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
                _this.getresult(1,_this.groupId,_this.isRead);
                _this.changeRead();
                _this.noticeTimer();
                _this.bindSelect();
            })
        },
        methods: {
            lookDetail:function (content,id) {
                var _this=this;
                layer.open({
                    type: 1,
                    title: '通知',
                    //closeBtn: 0, //不显示关闭按钮
                    shadeClose: false,
                    shade: [0.5, '#000'],
                    area: ['500px', 'auto'],
                    //offset: 'rb', //右下角弹出
                    //time: 2000, //2秒后自动关闭
                    anim: 2,
                    content: '<div style="padding: 20px">'+content +'</div>'
                });
                this.$http.post(COMMUNITESERVERROOTDATA + "topic.ashx?action=updateAnnouncementsRead",
                    {
                        aid:id
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {

                    });
                setTimeout(function () {
                    _this.getresult(_this.current,_this.groupId,_this.isRead);
                },100);
            },
            getresult:function (pageIndex,groupId,isRead) {
                var _this=this;
                this.$http.post(COMMUNITESERVERROOTDATA + "topic.ashx?action=getAnnouncementsListByGroupId",
                    {
                        uid:uId,
                        groupId:groupId,
                        isRead:isRead,
                        pageIndex:pageIndex,
                        pageSize:6
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        // if(res.body.returnObj.length < 1) {
                        //     return false;
                        // } else {
                            _this.allpage = res.body.totalPageCount; //总页数
                            _this.result = res.body.returnObj;
                        // }
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
                _this.getresult(_this.current,_this.groupId,_this.isRead);
            },
            noticeTimer:function () {
                var _this=this;
                // var timer1=setTimeout(function () {
                //     _this.$http.post('http://192.168.101.195/website/ashx/' + "StudentTrs.ashx?action=getQuestionNum",
                //         {
                //             studentId:studentId
                //         }
                //         ,{emulateJSON: true})
                //         .then(function (res) {
                //             _this.replynum = res.body.num1;
                //             _this.discussnum=res.body.num2;
                //             _this.webnoticenum=res.body.num3;
                //         });
                //     // _this.getresult(_this.current,_this.type);
                // },0);
                var timer=setInterval(function () {
                    _this.getresult(_this.current,_this.groupId,_this.isRead);
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
                    if(list.length<1){
                        layer.msg('无任何选择项');
                        return;
                    }
                    var idArr='';
                    for(var i=0;i<list.length;i++){
                        // console.log($(list[i]).data('id'));
                        var id=$(list[i]).data('id');
                        $(list[i]).prop('checked','');
                        idArr += id +',';
                    }
                    idArr = idArr.substring(0,idArr.length-1);
                    // console.log(idArr);
                    _this.$http.post(COMMUNITESERVERROOTDATA + "topic.ashx?action=updateAnnouncementsRead",
                        {
                            aid:idArr
                        }
                        ,{emulateJSON: true})
                        .then(function (res) {

                        });
                    $('#allSelect').html('全选');
                    setTimeout(function () {
                        _this.getresult(_this.current,_this.groupId,_this.isRead);
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
                        var idArr='';
                        for(var i=0;i<list.length;i++){
                            console.log($(list[i]).data('id'));
                            var id=$(list[i]).data('id');
                            $(list[i]).prop('checked','');
                            idArr += id +',';
                        }
                        idArr = idArr.substring(0,idArr.length-1);
                        _this.$http.post(COMMUNITESERVERROOTDATA + "topic.ashx?action=deleteAnnouncementsRead",
                            {
                                aid:idArr
                            }
                            ,{emulateJSON: true})
                            .then(function (res) {

                            });
                        $('#allSelect').html('全选');
                        setTimeout(function () {
                            _this.getresult(_this.current,_this.groupId,_this.isRead);
                            // _this.$http.post('http://192.168.101.195/website/ashx/' + "StudentTrs.ashx?action=getQuestionNum",
                            //     {
                            //         studentId:studentId
                            //     }
                            //     ,{emulateJSON: true})
                            //     .then(function (res) {
                            //         _this.replynum = res.body.num1;
                            //         _this.discussnum=res.body.num2;
                            //         _this.webnoticenum=res.body.num3;
                            //     });
                        },100);

                        parent.close();
                    }, function(){
                    });

                    // setTimeout(function () {
                    //     location.reload();
                    //     layer.msg('删除成功！')
                    // },0);
                });
                // 获取群组列表
                this.$http.post(COMMUNITESERVERROOTDATA + "topic.ashx?action=getGroupByUid",
                    {
                        uid:uId
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        // if(res.body.returnObj.length < 1) {
                        //     return false;
                        // } else {
                        _this.groupArr = res.body.returnObj;
                        // }
                    }).then(function () {
                        $('#group').on('change',function () {
                            _this.groupId=$(this).val();
                            _this.current = 1;
                            _this.getresult(_this.current,_this.groupId,_this.isRead);
                        })
                })
            },
            changeRead:function () {
                var _this=this;
                $('.femessage-head .feselect').on('click','span',function () {
                    var isRead=$(this).data('id');
                    $(this).siblings().removeClass('active');
                    $(this).addClass('active');
                    _this.isRead=isRead;
                    _this.current = 1;
                    _this.getresult(_this.current,_this.groupId,_this.isRead);
                });
            }
        }
    });
}
// 评论回复
function groupdiscussreply() {
    var uId=$(window).storager({key: 'feCommunityUid'}).readStorage();
    var userType=$(window).storager({key: 'feUType'}).readStorage();
    if(uId==null||uId==undefined||uId=='undefined'){
        layer.msg('请先登录');
        setTimeout(function () {
            window.location.href = ROOT+"login.html";
        },1000);
        return;
    }
    new Vue({
        el:"#groupdiscussreply",
        data:{
            result:[],
            groupId:'',
            isRead:'',
            showItem:4,//页码显示条数
            allpage:'1',//总页数
            current:1//当前页
            // replynum:0,
            // discussnum:0,
            // webnoticenum:0
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
                _this.getresult(1,_this.groupId,_this.isRead);
                _this.changeRead();
                // _this.noticeTimer();
                _this.bindSelect();
            })
        },
        methods: {
            getresult:function (pageIndex,groupId,isRead) {
                var _this=this;
                this.$http.post(COMMUNITESERVERROOTDATA + "topic.ashx?action=getPostListAllByUid",
                    {
                        uid:uId,
                        isRead:isRead,
                        groupId:groupId,
                        pageIndex:pageIndex,
                        pageSize:6
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        _this.allpage = res.body.totalPageCount; //总页数
                        _this.result = res.body.returnObj;
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
                _this.getresult(_this.current,_this.groupId,_this.isRead);
            },
            lookdetail:function (groupId,tid,pid,topicTitle,rUserName) {
                var _this=this;
                _this.$http.post(COMMUNITESERVERROOTDATA + "topic.ashx?action=updatePostsRead",
                    {
                        pid:pid
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
                        _this.getresult(_this.current,_this.groupId,_this.isRead);
                    },
                    content: 'centerdiscussreplydetail.html?groupId='+ groupId + '&tid='+tid + "&pid="+ pid +"&topicTitle="+topicTitle + "&rUserName="+ rUserName
                });
            },
            noticeTimer:function () {
                var _this=this;
                var timer1=setTimeout(function () {
                    _this.$http.post(COMMUNITESERVERROOTDATA + "StudentTrs.ashx?action=getQuestionNum",
                        {
                            studentId:studentId
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
                    _this.$http.post(COMMUNITESERVERROOTDATA + "StudentTrs.ashx?action=getQuestionNum",
                        {
                            studentId:studentId
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
                    if(list.length<1){
                        layer.msg('无任何选择项');
                        return;
                    }
                    var idArr='';
                    for(var i=0;i<list.length;i++){
                        // console.log($(list[i]).data('id'));
                        var id=$(list[i]).data('id');
                        $(list[i]).prop('checked','');
                        idArr += id +',';
                    }
                    idArr = idArr.substring(0,idArr.length-1);
                    // console.log(idArr);
                    _this.$http.post(COMMUNITESERVERROOTDATA + "topic.ashx?action=updatePostsRead",
                        {
                            pid:idArr
                        }
                        ,{emulateJSON: true})
                        .then(function (res) {

                        });
                    $('#allSelect').html('全选');
                    setTimeout(function () {
                        _this.getresult(_this.current,_this.groupId,_this.isRead);
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
                        var idArr='';
                        for(var i=0;i<list.length;i++){
                            console.log($(list[i]).data('id'));
                            var id=$(list[i]).data('id');
                            $(list[i]).prop('checked','');
                            idArr += id +',';
                        }
                        idArr = idArr.substring(0,idArr.length-1);
                        _this.$http.post(COMMUNITESERVERROOTDATA + "topic.ashx?action=deleteAnnouncementsRead",
                            {
                                pid:idArr
                            }
                            ,{emulateJSON: true})
                            .then(function (res) {

                            });
                        $('#allSelect').html('全选');
                        setTimeout(function () {
                            _this.getresult(_this.current,_this.groupId,_this.isRead);
                            // _this.$http.post('http://192.168.101.195/website/ashx/' + "StudentTrs.ashx?action=getQuestionNum",
                            //     {
                            //         studentId:studentId
                            //     }
                            //     ,{emulateJSON: true})
                            //     .then(function (res) {
                            //         _this.replynum = res.body.num1;
                            //         _this.discussnum=res.body.num2;
                            //         _this.webnoticenum=res.body.num3;
                            //     });
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
                    var isRead=$(this).data('id');
                    $(this).siblings().removeClass('active');
                    $(this).addClass('active');
                    _this.isRead=isRead;
                    _this.current = 1;
                    _this.getresult(_this.current,_this.groupId,_this.isRead);
                });
            }
        }
    });
}
// 评论详情
function discussdetail() {
    var groupId=$(this).getUrlParam("groupId");
    var tid=$(this).getUrlParam("tid");
    var pid=$(this).getUrlParam("pid");
    var topicTitle=$(this).getUrlParam("topicTitle");
    var rUserName=$(this).getUrlParam("rUserName");
    var uid=$(window).storager({key: 'feCommunityUid'}).readStorage();
    var name=$(window).storager({key: 'feUNickName'}).readStorage();
    new Vue({
        el:"#discussdetail",
        data:{
            nodata:true,
            result:[],
            current:1,
            topicTitle:topicTitle,
            rUserName:rUserName
        },
        filters: {
            addRootFile: function addRootFile(img) {
                return SERVERROOTFILE + img;
            }
        },
        mounted:function () {
            var _this=this;
            this.$nextTick(function () {
                _this.getresult('1');
                _this.bindFn();
            })
        },
        methods: {
            bindFn:function () {
                var _this=this;
                var dingshi=setInterval(function () {
                    _this.getresult(_this.current);
                },10000);
                $('#discussdetail .feoperation').on('click','button:first-child',function () {
                    var text=$(this).parent().prev().find('textarea').val();
                    $(this).parent().prev().find('textarea').val('');
                    if(!isEmpty(text)){
                        layer.msg('回复内容不能为空!')
                    }else {
                        _this.$http.post(COMMUNITESERVERROOTDATA + "topic.ashx?action=createPost",
                            {
                                uid:uid,
                                userName:name,
                                layer:1,
                                groupId:groupId,
                                tid:tid,
                                pid:pid,
                                content:text
                            }
                            ,{emulateJSON: true})
                            .then(function (res) {
                                layer.msg('评论成功');
                                setTimeout(function () {
                                    _this.getresult(_this.current);
                                    $('#content').scrollTop( $('#content')[0].scrollHeight );
                                },1000)
                            })
                    }
                });

            },
            getresult:function (pageIndex) {
                var _this=this;
                _this.$http.post(COMMUNITESERVERROOTDATA + "topic.ashx?action=getPostListByUid",
                    {
                        pid:1,
                        pageIndex:pageIndex,
                        pageSize:5
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        if(pageIndex<=res.body.totalPageCount){
                            _this.nodata=true;
                        }else {
                            _this.nodata=false;
                        }
                        // if(res.body.code==200){
                            _this.result = res.body.returnObj;
                        // }
                    })
            },
            lookmore:function () {
                this.getresult(++this.current);
            }
        }
    });
}