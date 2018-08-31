// var SERVERROOTFILE = "http://www.fetv.cn/fe/";
// 新闻头部
// 判断是否为空对象
function isEmptyObject(e) {
    var t;
    for (t in e)
        return !1;
    return !0
}
// 判断是否为空
function isEmpty(str){
    var reg = /\S+/;
    return reg.test(str);
}
function headNews() {
    new Vue({
        el:"#feheadnews",
        data:{
            headNewsBig:[],
            headNewsSmall:[]
        },
        filters: {
            addRoot: function addRoot(newsId) {
                return ROOT + "newsdetail.html?newsId=" + newsId;
            },
            addRootFile: function addRootFile(img) {
                return SERVERROOTFILE + img;
            }
        },
        mounted:function () {
            var _this=this;
            this.$nextTick(function () {
                _this.getHeadNewsList();
            })
        },
        methods: {
            getHeadNewsList: function () {
                var _this = this;
                this.$http.post(SERVERROOTDATA+"News.ashx?action=getHomeNewsBanner",
                    {
                        organId:TempOrgId,
                        pageSize:1
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        if(res.body.length < 1) {
                            return false;
                        } else {
                            _this.headNewsBig=res.body;
                                // _this.headNewsBig.push(res.body[0].banner[0]);
                                // _this.headNewsSmall=res.body[1].news;
                        }
                    }).then(function () {
                    _this.headNewsBig.forEach(function(item, index) {
                        Vue.set(item, "iconPath", SERVERROOTFILE + item.iconPath);
                    })
                    // _this.headNewsSmall.forEach(function(item, index) {
                    //     Vue.set(item, "iconPath", SERVERROOTFILE + item.iconPath);
                    // })
                })
            }
        }
    })
}
// 活动更多 头部banner
function activityHeadNews() {
    new Vue({
        el:"#feheadnews",
        data:{
            headNewsBig:[],
            headNewsSmall:[]
        },
        filters: {
            addNewsRoot:function addNewsRoot(id) {
                return ROOT + "newsdetail.html?newsId=" + id ;
            },
            addRoot: function addRoot(newsId) {
                return ROOT + "activedetail.html?activeId=" + newsId ;
            },
            addRootFile: function addRootFile(img) {
                return SERVERROOTFILE + img;
            }
        },
        mounted:function () {
            var _this=this;
            this.$nextTick(function () {
                _this.getHeadNewsList();
            })
        },
        methods: {
            getHeadNewsList: function () {
                var _this = this;
                this.$http.post(SERVERROOTDATA+"News.ashx?action=getHomeNewsBanner",
                    {
                        organId:TempOrgId,
                        pageSize:1
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        if(res.body.length < 1) {
                            return false;
                        } else {
                            _this.headNewsBig=res.body;
                            // _this.headNewsBig.push(res.body[0].banner[0]);
                            // _this.headNewsSmall=res.body[1].activitys;
                        }
                    }).then(function () {
                    _this.headNewsBig.forEach(function(item, index) {
                        Vue.set(item, "iconPath", SERVERROOTFILE + item.iconPath);
                    })
                    // _this.headNewsSmall.forEach(function(item, index) {
                    //     Vue.set(item, "iconPath", SERVERROOTFILE + item.iconPath);
                    // })
                })
            }
        }
    })
}
// 新闻页-左侧列表
function newslist() {
    new Vue({
        el:"#fenewslist",
        data:{
            newsArr:[],
            newsTypeArr:[],
            current:1,//当前页
            newsTypeId:$(this).getUrlParam("newsTypeId")==undefined ? '89':$(this).getUrlParam("newsTypeId"),
            nodata:false,
            load:true,
            allpage:"",
            showItem:10
        },
        filters: {
            addRoot: function addRoot(newsId) {
                return ROOT + "newsdetail.html?newsId=" + newsId;
            },
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
                _this.getNewsListType();
                _this.getNewsList(this.newsTypeId,this.current);
                _this.toggleNewsList();
            })
        },
        methods:{
            getNewsListType:function () {
                var _this = this;
                this.$http.post(SERVERROOTDATA+"NewsType.ashx?action=getNewsType",
                    {
                        organId:TempOrgId,
                        pageSize:6
                    }
                    ,{emulateJSON:true})
                    .then(function (res) {
                        if(res.body.length < 1) {
                            return false;
                        } else {
                                _this.newsTypeArr=res.body;
                        }
                    }).then(function () {
                        if($(this).getUrlParam("newsTypeId")==undefined){
                            $(".fenewslist-left-title a:first-child").addClass("active");
                            _this.newsTypeId=$(".fenewslist-left-title a:first-child").data('id');
                        }else{
                            var list=$(".fenewslist-left-title a");
                            for(var i=0;i<list.length;i++){
                                if($(list[i]).data('id')==$(this).getUrlParam("newsTypeId")){
                                    $(list[i]).addClass('active');
                                }
                            }
                            _this.newsTypeId=$(this).getUrlParam("newsTypeId");
                        }

                })
            },
            getNewsList:function (newsTypeId,pageIndex) {
                var _this=this;
                this.$http.post(SERVERROOTDATA+"News.ashx?action=getNewsByType",
                    {
                        organId:TempOrgId,
                        newsTypeId:newsTypeId,
                        pageIndex:pageIndex,
                        pageSize:5
                    }
                    ,{emulateJSON:true})
                    .then(function (res) {
                        if(res.body.rows.length < 1) {
                            _this.nodata=true;
                        } else {
                                _this.newsArr= res.body.rows;
                                _this.allpage=res.body.totalPageCount;
                                _this.nodata=false;
                        }
                        // if(pageIndex >=res.body.totalPageCount){
                        //     _this.load=false;
                        // }else{
                        //     _this.load=true;
                        // }
                })
            },
            newsloadMore:function () {
                this.getNewsList(this.newsTypeId,++this.current);
            },
            toggleNewsList: function() { //toggle 新闻列表
                var _this = this;
                $(".fenewslist-left-title").off("click", "a");
                $(".fenewslist-left-title").on("click", "a", function() {
                    //
                    _this.newsTypeId=$(this).data('id');
                    _this.current=1;
                    _this.newsArr=[];//清空数据
                    _this.getNewsList(_this.newsTypeId,_this.current);
                    newTypeFlagChange($(this));
                });
            },
            // bindReadCount:function (id) {
            //     var _this=this;
            //     this.$http.post(SERVERROOTDATA+"News.ashx?action=updateNewsClickCount",
            //         {
            //             newsId:id
            //         }
            //         ,{emulateJSON:true})
            // },
            goto: function(index) { //枫叶处理
                var _this=this;
                if(index == this.current) return;
                if(index > this.allpage) {
                    this.current = this.current - 2;
                    layer.msg("Sorry ╮(╯_╰)╭ 没有下一页喽！");
                    return false;
                }
                _this.current = index;
                _this.getNewsList(_this.newsTypeId,_this.current);
                $.scrollTo($('#newscontent').offset().top-98, 300);
            }
        }
    })
}
function newTypeFlag() { //新闻列表初始类型标志 active： 默认第一个
    $(".fenewslist-left-title a:first-child").addClass("active");

}
function newTypeFlagChange(obj) { //新闻列表初始类型标志 active： 默认第一个 :改变
    if(obj.hasClass("active")) {
        return false;
    } else {
        $(".fenewslist-left-title a.active").removeClass("active");
        obj.addClass("active");
    }
}
// 新闻页-右侧新鲜短讯
function freshSms() {
    new Vue({
        el:"#fefreshsms",
        data:{
            msList:[]
        },
        filters: {
            addRoot: function addRoot(newsId) {
                return ROOT + "newsdetail.html?newsId=" + newsId;
            }
        },
        mounted:function () {
            var _this=this;
            this.$nextTick(function () {
                _this.getFreshList();
            })
        },
        methods:{
            getFreshList:function () {
                var _this = this;
                this.$http.post(SERVERROOTDATA+"News.ashx?action=getFreshNews",
                    {
                        organId:TempOrgId,
                        pageIndex:1,
                        pageSize:5
                    }
                    ,{emulateJSON:true})
                    .then(function (res) {
                        if(res.body.length < 1) {
                            return false;
                        } else {
                                _this.msList=res.body.rows;
                        }
                    })
            }
        }
    })
}
// 新闻页-右侧热文推荐
function hotarticle() {
    new Vue({
        el:"#fehotarticle",
        data:{
            msList:[]
        },
        filters: {
            addRoot: function addRoot(newsId) {
                return ROOT + "newsdetail.html?newsId=" + newsId;
            },
            addRootFile: function addRootFile(img) {
                return SERVERROOTFILE + img;
            }
        },
        mounted:function () {
            var _this=this;
            this.$nextTick(function () {
                _this.getHotarticleList();
            })
        },
        methods:{
            getHotarticleList:function () {
                var _this = this;
                this.$http.post(SERVERROOTDATA+"News.ashx?action=getHotDocRecommend",
                    {
                        organId:TempOrgId,
                        pageIndex:1,
                        pageSize:10
                    }
                    ,{emulateJSON:true})
                    .then(function (res) {
                        if(res.body.length < 1) {
                            return false;
                        } else {
                            _this.msList=res.body.rows;
                        }
                    })
            }
        }
    })
}
// 活动详情更多-左侧列表
function activity() {
    new Vue({
        el:"#feactivitylist",
        data:{
            activityArr:[],
            activityTypeArr:[],
            current:1,//当前页
            activityTypeId:'5',
            nodata:false,
            load:true,
            allpage:"",
            showItem:10
        },
        filters: {
            addRoot: function addRoot(newsId,typeId) {
                return ROOT + "activedetail.html?activeId=" + newsId + "&activityTypeId=" + typeId;
            },
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
                _this.getActivityType();
                _this.getActivityList(this.activityTypeId,this.current);
                _this.toggleNewsList();
            })
        },
        methods:{
            getActivityType:function () {
                var _this = this;
                this.$http.post(SERVERROOTDATA+"ActivityType.ashx?action=getActivityType",
                    {
                        organId:TempOrgId,
                        // pageSize:6
                    }
                    ,{emulateJSON:true})
                    .then(function (res) {
                        if(res.body.length < 1) {
                            return false;
                        } else {
                            _this.activityTypeArr=res.body;
                        }
                    }).then(function () {
                    newTypeFlag();
                    _this.activityTypeId=$(".fenewslist-left-title a:first-child").data('id');
                })
            },
            getActivityList:function (activityTypeId,pageIndex) {
                var _this=this;
                this.$http.post(SERVERROOTDATA+"Activity.ashx?action=getPagingActivityByType",
                    {
                        organId:TempOrgId,
                        activityTypeId:activityTypeId,
                        pageIndex:pageIndex,
                        pageSize:5
                    }
                    ,{emulateJSON:true})
                    .then(function (res) {
                        if(res.body.rows.length < 1) {
                            _this.nodata=true;
                        } else {
                            _this.activityArr= res.body.rows;
                            _this.allpage=res.body.totalPageCount;
                            _this.nodata=false;
                        }
                        // if(pageIndex >=res.body.totalPageCount){
                        //     _this.load=false;
                        // }else{
                        //     _this.load=true;
                        // }
                    })
            },
            toggleNewsList: function() { //toggle 新闻列表
                var _this = this;
                $(".fenewslist-left-title").off("click", "a");
                $(".fenewslist-left-title").on("click", "a", function() {
                    //
                    _this.activityTypeId=$(this).data('id');
                    _this.current=1;
                    _this.activityArr=[];//清空数据
                    _this.getActivityList(_this.activityTypeId,_this.current);
                    newTypeFlagChange($(this));
                });
            },
            bindReadCount:function (id) {
                var _this=this;
                this.$http.post(SERVERROOTDATA+"News.ashx?action=updateNewsClickCount",
                    {
                        newsId:id
                    }
                    ,{emulateJSON:true})
            },
            goto: function(index) { //枫叶处理
                var _this=this;
                if(index == this.current) return;
                if(index > this.allpage) {
                    this.current = this.current - 2;
                    layer.msg("Sorry ╮(╯_╰)╭ 没有下一页喽！");
                    return false;
                }
                _this.current = index;
                _this.getActivityList(_this.activityTypeId,_this.current);
                $.scrollTo($('#activitycontent').offset().top-78, 300);
            }
        }
    })
}
// 影视圈-往期回顾
function pastreview() {
    new Vue({
        el:"#fepastreview",
        data:{
            movieArr:[]
        },
        filters: {
            addRootFile: function addRootFile(img) {
                return SERVERROOTFILE + img;
            },
            addDetailRoot: function addDetailRoot(mid,vid) {
                return ROOT + "programplayer.html?mid="+mid+"&vid=" + vid;
            }
        },
        mounted:function () {
            var _this=this;
            this.$nextTick(function () {
                _this.getMovieArr();
            })
        },
        methods:{
            getMovieArr:function () {
                var _this = this;
                this.$http.post(SERVERROOTDATA+"MicroVideo.ashx?action=getRelativeVideoById",
                    {
                        microVideoId:''
                    }
                    ,{emulateJSON:true})
                    .then(function (res) {
                        if(res.body.length < 1) {
                            return false;
                        } else {
                            _this.movieArr=res.body.rows;
                        }

                    }).then(function () {
                    var swiper = new Swiper('.swiper-container', {
                        nextButton: '.swiper-button-next',
                        prevButton: '.swiper-button-prev',
                        slidesPerView: 4,
                        spaceBetween: 20,
                        loop:true
                    });
                })
            }
        }
    })
}
// 影视圈-左侧新闻列表
function moviecircle() {
    var player = new Aliplayer({
        id: 'jnewsPlayer',// 容器id
        source:"http://www.fetv.cn/fe/uploads/video/fjjyw.mp4", // 视频地址src
        autoplay: false,
         isLive:false,
         playsinline:true,
         width:"100%",

        cover: 'images/static/playBg4.JPG',
        height: "600px" // 播放器高度630px
    });
    new Vue({
        el:"#femoviecirclelist",
        data:{
            movieTypeArr:[],//导航栏
            movieListArr:[],//电影列表
            position:[],
            current:1,
            currentType:'2',//当前选中类型
            nodata:false,
            // load:true
            allpage:"",
            showItem:10
        },
        filters: {
            addRoot: function addRoot(mid,vid) {
                return ROOT + "programplayer.html?mid=" + mid + "&vid=" + vid;
            },
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
                _this.getMovieListType();
                _this.getMovieList(_this.currentType,_this.current);
                _this.toggleMovieList();
                _this.toggleAllMovieList();
            })
        },
        methods:{
            getMovieListType:function () {
                var _this = this;
                this.$http.post(SERVERROOTDATA+"VideoType.ashx?action=getVideoType",
                    {
                        organId:TempOrgId
                    }
                    ,{emulateJSON:true})
                    .then(function (res) {
                        if(res.body.length < 1) {
                            return false;
                        } else {
                            _this.movieTypeArr=res.body;
                        }
                    }).then(function () {
                        $('.femoviecirclelist-left-title>div:first-child').addClass('active');
                })
            },
            getMovieList:function (videoTypeId,pageIndex) {
                var _this = this;
                this.$http.post(SERVERROOTDATA+"MicroVideo.ashx?action=getMicroVideoByType",
                {
                    organId:TempOrgId,
                    videoTypeId:videoTypeId,
                    pageIndex:pageIndex,
                    pageSize:4
                }
                ,{emulateJSON:true})
                    .then(function (res) {
                        if(res.body.rows.length < 1) {
                            _this.nodata=true;
                        } else {
                            _this.movieListArr=res.body.rows;
                            _this.allpage=res.body.totalPageCount;
                            _this.nodata=false;
                        }
                        // if(pageIndex >=res.body.totalPageCount){
                        //     _this.load=false;
                        // }else{
                        //     _this.load=true;
                        // }
                    }).then(function () {
                        // for(var i=0;i<this.movieListArr.length;i++){
                        //     var s=parseInt(this.movieListArr[i].score-10);
                        //     this.position.push(s*7)
                        // }
                })
            },
            // movieloadMore:function () {
            //     var _this=this;
            //     this.getMovieList(_this.currentType,++_this.current);
            // },
            toggleMovieList:function () {
                var _this = this;
                $(".femoviecirclelist-left-title").on("click", "a", function() {
                    // 按钮点击事件 暂写
                    _this.currentType=$(this).data('id');
                    _this.current=1;
                    _this.movieListArr=[];
                    _this.getMovieList(_this.currentType,_this.current);
                });
            },
            toggleAllMovieList:function () {
                var _this = this;
                $(".femoviecirclelist-left-title").on("click", "div", function() {
                    // 按钮点击事件 暂写
                    _this.currentType=$(this).find('b').data('id');
                    $(this).siblings().removeClass('active');
                    $(this).addClass('active');
                    _this.current=1;
                    _this.movieListArr=[];
                    _this.getMovieList(_this.currentType,_this.current);
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
                _this.current = index;
                _this.getMovieList(_this.currentType,_this.current);
                $.scrollTo($('#femoviecirclelist').offset().top-40, 300);
            }
        }
    })
}
// 影视圈-右侧热门推荐
function moviehotrecommend() {
    new Vue({
        el:"#fefreshsms",
        data:{
            msList:[]
        },
        filters: {
            addRoot: function addRoot(mid,vid) {
                return ROOT + "programplayer.html?mid="+mid+"&vid=" + vid;
            }
        },
        mounted:function () {
            var _this=this;
            this.$nextTick(function () {
                _this.getFreshList();
            })
        },
        methods:{
            getFreshList:function () {
                var _this = this;
                this.$http.post(SERVERROOTDATA+"MicroVideo.ashx?action=getHottestRecommendVideo",
                    {
                        organId:TempOrgId,
                        pageIndex:1,
                        pageSize:5
                    }
                    ,{emulateJSON:true})
                    .then(function (res) {
                        if(res.body.length < 1) {
                            return false;
                        } else {
                            _this.msList=res.body.rows;
                        }
                    })
            }
        }
    })
}
// 影视圈-右侧热门排行
function moviehotlist() {
    new Vue({
        el:"#fehotarticle",
        data:{
            msList:[]
        },
        filters: {
            addRoot: function addRoot(mid,vid) {
                return ROOT + "programplayer.html?mid="+mid+"&vid=" + vid;
            },
            addRootFile: function addRootFile(img) {
                return SERVERROOTFILE + img;
            }
        },
        mounted:function () {
            var _this=this;
            this.$nextTick(function () {
                _this.getHotarticleList();
            })
        },
        methods:{
            getHotarticleList:function () {
                var _this = this;
                this.$http.post(SERVERROOTDATA+"MicroVideo.ashx?action=getHotRankingVideo",
                    {
                        organId:TempOrgId,
                        pageIndex:1,
                        pageSize:4
                    }
                    ,{emulateJSON:true})
                    .then(function (res) {
                        if(res.body.length < 1) {
                            return false;
                        } else {
                            _this.msList=res.body.rows;
                        }
                    })
            }
        }
    })
}
// 影视详情页
function moviedetail(vId) {
    $.ajax({
        type: "post",
        url: SERVERROOTDATA + "CourseCatalog.ashx?action=getPlayUrlByVideoId",
        dataType: 'text',
        data: {
            videoid: vId
        },
        success: function(msg) {
            var player = new prismplayer({
                id: 'videoPlay',
                width: '100%',
                height:'600px',
                autoplay: true,
                // controlBarVisibility:'always',
                vid: vId,
                playauth: msg
                // cover: ROUTEFILE+'start.jpg',
                // waterMark:ROUTEROOT+"ycedu/images/liveWaterIcon.png|BL|0.08|0.8"
            });
            // setTimeout(function () {
                $('#videoPlay').find('video')[0].controls=true;
            // },100)

        }, //操作成功后的操作！msg是后台传过来的值
        error: function(ex) {
            // $('.dycnovideo').css('display', 'block');
            // alert('错误！');
        }
    });
    new Vue({
        el:"#ferelevant",
        data:{
            relevantArr:[]
        },
        filters: {
            addRootFile: function addRootFile(img) {
                return SERVERROOTFILE + img;
            },
            addCourseRoot: function addCourseRoot(newsId) {
                return ROOT + "coursedetail.html?courseId=" + newsId;
            }
        },
        mounted:function () {
            var _this=this;
            this.$nextTick(function () {
                _this.getrelevant();
            })
        },
        methods:{
            getrelevant:function () {
                var _this=this;
                this.$http.post(SERVERROOTDATA+"Course.ashx?action=getOrganRecommendCourse",
                    {
                        organId:TempOrgId,
                        pageIndex:1,
                        pageSize:10
                    }
                    ,{emulateJSON:true})
                    .then(function (res) {
                        // console.log(res);
                        _this.relevantArr=res.body.rows;
                    }).then(function () {
                    var swiper = new Swiper('.swiper-container', {
                        nextButton: '.swiper-button-next',
                        prevButton: '.swiper-button-prev',
                        slidesPerView: 4,
                        spaceBetween: 4
                    });
                })
            },
            getIntro: function getIntro() {
                var _this = this;
                this.$http.post(SERVERROOTDATA + "Course.ashx?action=getCourseIntroduce", {
                    courseId: _this.cid
                }, {
                    emulateJSON: true
                }).then(function(res) {
                    if(res.body == undefined) {
                        return false;
                    }
                    _this.intro = res.body[0];
                });
            }
        }
    })
}
// 影视详情页-留言模块方法
function moviedetail_liuyan() {
    $('#femoviedetail').on('click','a',function () {
        $('.fepersonsay-right .content').removeAttr('id');
        $('.fepersonsay-right a').removeAttr('id');
        $('.fereply a').removeAttr('id');
        $('.fereply>div').removeAttr('id');
        $('.emoji_container').remove();
        $(this).attr('id','pface');
        $(this).parent().prev().attr('id','pcontent');
        $("#pcontent").emoji({
            button: "#pface",
            showTab: false,
//        animation: 'slide',
            icons: [{
                name: "QQ表情",
                path: "images/temp/face/qq/",
                maxNum: 91,
                excludeNums: [41, 45, 54],
                file: ".gif"
            }]
        });
    })
    var timer=null;
    $('.content').focus(function () {
        timer=setInterval(function () {
            var l=$('.content img').length;
            var t =  $(this).text().length;
            if(600-5*l-t>=0){
                $('.fepersonsay-right .febox b').html(600-5*l-t);
            }else{

            }
        }.bind(this),1000)
    })
    $('.content').blur(function () {
        clearInterval(timer);
    })
//    $('.fereply').slideUp();
    $('.fediscuss .fediscuss-right').on('click','.febox b',function () {
//        console.log('哈哈')
        if($(this).parent().parent().next().css('display')!='none'){
            $('.fereply').slideUp(500);
        }else{
            $('.fereply').slideUp(500);
            $(this).parent().parent().next().slideDown(500);
        }
    })
    $('.fediscuss-right .febox').on('click','h3',function () {
        var num=$(this).text().replace(/[^0-9]/ig,"");
        console.log(num);
        var span=$(this).find('span');
        var str=span.text();
//        console.log(a);
        var dom=$(this).parent().parent().parent().next();
        if(num>0){
            if(str.indexOf("查看")>-1){

                if(dom!='undefined'){
                    dom.slideDown(500);
                    span.html('收起回复');
                }
            }else{
                dom.slideUp(500);
                span.html('查看回复');
            }
        }else{

        }
    })
}

// 名师风采在线
function teacherstyle() {
    new Vue({
        el:"#feteacherstyle",
        data:{
            selectNav:[],//查询列表
            rank:[],//教师等级
            teacherListArr:[],//左侧老师列表
            studioArr:[],//右侧工作室
            resourceRankingArr:[],//右侧资源排行数组
            position:[-96,-110,-124,-138,-152,-167,-182,-196,-212,-226],//排行图标偏移量
            crown:[-584,-610,-637], //皇冠图标偏移量
            current:1,
            showItem: 6,
            allpage: 0, //总页码
            nodata:false
        },
        filters: {
            addRoot: function addRoot(newsId) {
                return ROOT + "teacherstudio.html?teachingStudioId=" + newsId;
            },
            addTeacherRoot: function addTeacherRoot(newsId) {
                return ROOT + "teacherindex.html?teacherId=" + newsId;
            },
            addArticleRoot: function addArticleRoot(id) {
                return ROOT + "articledetail.html?articleId=" + id;
            },
            downloadRoot: function downloadRoot(url) {
                return SERVERROOTFILE + url;
            },
            addRootFile: function addRootFile(img) {
                return SERVERROOTFILE + img;
            },
            articletype:function articletype(type) {
                switch (type){
                    case "1":
                        return "发表";
                        break;
                    case "2":
                        return "转发";
                        break;
                    case "3":
                        return "转载";
                        break;
                }
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
                _this.getSelectNav();
                _this.getTeacherList('','','','',_this.current);
                _this.studioList();
                _this.resource();
            })
        },
        methods:{
            getSelectNav:function () {
                var _this=this;
                this.$http.post(SERVERROOTDATA+"TeacherGrade.ashx?action=getTeacherGrade",
                    {
                        organId:1
                    }
                    ,{emulateJSON:true})
                    .then(function (res) {
                        _this.rank=res.body.rows;
                    }).then(function () {

                });
                this.$http.post(SERVERROOTDATA+"TeachingStudio.ashx?action=getCityPeriodSubject",
                    {
                        provinceId:1
                    }
                    ,{emulateJSON:true})
                    .then(function (res) {
                        _this.selectNav=res.body[0];
                }).then(function () {
                    _this.navBindClick();
                });

            },
            getTeacherList:function (cityId,educationalLevelId,subjectId,teacherGradeId,pageIndex) {
                var _this=this;
                this.$http.post(SERVERROOTDATA+"TeachingStudio.ashx?action=getTeachingStudio",
                    {
                        cityId:cityId,
                        educationalLevelId:educationalLevelId,
                        subjectId:subjectId,
                        teacherGradeId:teacherGradeId,
                        pageIndex:pageIndex,
                        pageSize:15
                    }
                    ,{emulateJSON:true})
                    .then(function (res) {
                        if(res.body.rows.length<1){
                            _this.nodata=true;
                            _this.teacherListArr=res.body.rows;
                            _this.allpage=res.body.totalPageCount;
                        }else{
                            _this.teacherListArr=res.body.rows;
                            _this.allpage=res.body.totalPageCount;
                            _this.nodata=false;
                        }

                    })
            },
            studioList:function () {
                var _this=this;
                this.$http.post(SERVERROOTDATA+"TeachingStudio.ashx?action=getStudioDynamic",
                    {
                        teachingStudioId:'',
                        pageIndex:1,
                        pageSize:4
                    }
                    ,{emulateJSON:true})
                    .then(function (res) {
                        _this.studioArr=res.body.rows;
                        // console.log(_this.studioArr);
                    })
            },
            resource:function () {
                var _this=this;
                this.$http.post(SERVERROOTDATA+"TeachingStudio.ashx?action=getStudioResourceRanking",
                    {
                        pageIndex:1,
                        pageSize:5
                    }
                    ,{emulateJSON:true})
                    .then(function (res) {
                        if(res.body.rows==undefined){
                            return false
                        }else{
                            _this.resourceRankingArr=res.body.rows;
                            // console.log( _this.resourceRankingArr)
                        }
                    }).then(function () {
                        _this.resourceRankingArr.forEach(function(item, index) {
                            Vue.set(item, "iconPath", SERVERROOTFILE + item.iconPath);
                        })
                })
            },
            navBindClick:function () {
                var _this=this;
                $('.feselectnav').on('click','li',function () {
                    var val=$(this).html();
                    $(this).parent().next().val($(this).data('id'));
                    $(this).parent().prev().html(val);
                    var navArr=$('.feselectnav .febox>input');
                    var attr=navArr[0].value;//获取地区id
                    var period=navArr[1].value;//获取学段id
                    var subjeck=navArr[2].value;//获取学科id
                    var dengji=navArr[3].value;//获取教师id
                    _this.current=1;
                    _this.getTeacherList(attr,period,subjeck,dengji,_this.current);
                })
                $('.feselectnav').on('click','.febox',function () {
                    var $ul=$(this).find('ul');
                    if($ul.css('display')=='none'){
                        $(this).find('ul').slideDown(500);
                        $(this).parent().siblings().find('ul').slideUp(500);
                    }else{
                        $(this).find('ul').slideUp(500);
                    }
                })
            },
            addDownloadRecord:function (id,url) {//下载保存记录
                var _this = this;
                var studentId=$(window).storager({key: 'feUid'}).readStorage();
                var userType=$(window).storager({key: 'feUType'}).readStorage();
                if(studentId==null||studentId==undefined||studentId=='undefined'){
                    layer.msg('请先登录');
                    setTimeout(function () {
                        window.location.href = ROOT+"login.html";
                    },1000);
                    return;
                }
                var uType='';
                if(userType==1){
                    uType='student';
                }else if(userType==2){
                    uType='parent';
                }else if(userType==3){
                    uType='teacher';
                }
                this.$http.post(SERVERROOTDATA + "ResourceDownload.ashx?action=resourceDownloadSave",
                    {
                        userId:studentId,
                        userType:uType,
                        saveTag:'add',
                        studioResourceId:id
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {});
                var form=$("<form>");//定义一个form表单
                form.attr("style","display:none");
                form.attr("target","");
                form.attr("method","get");  //请求类型
                form.attr("action",SERVERROOTFILE + url);   //请求地址
                $("body").append(form);//将表单放置在web中
                form.submit();//表单提交
            },
            goto: function(index) { //枫叶处理
                if(index == this.current) return;
                if(index > this.allpage) {
                    this.current = this.current - 2;
                    layer.msg("Sorry ╮(╯_╰)╭ 没有下一页喽！");
                    return false;
                }
                this.current = index;
                var navArr=$('.feselectnav .febox>input');
                var attr=navArr[0].value;//获取地区id
                var period=navArr[1].value;//获取学段id
                var subjeck=navArr[2].value;//获取学科id
                var dengji=navArr[3].value;//获取教师id
                this.getTeacherList(attr,period,subjeck,dengji,index);
                $.scrollTo($('.feteacherlist').offset().top-78, 300);
            }
        }
    })
}

/*
 * autor：Jabo
 * brief：add side nav
 * Time：2017/08/11
 */
function addCourseAsideNav(){
	new Vue({
		el: '#jcourseNavApp',
		data: {
			leftNavArr: [],
			leftNavLoadOnce: true,
			isShowFlag: true,
			secondFlag: false,
			secondNavArr: [],
			inSecondBox: false,
			inLeftBox: false,
			parentNavId: '',
			gradeNavId: ''
		},
		filters: {
			addFirNavParent: function addFirNavParent(id) {
				return ROOT + "courselist.html?period=" + id + "&grade=&subject=";
			},
			addFirNav: function addFirNav(pid, id) {
				return ROOT + "courselist.html?period=" + pid + "&grade=&subject=" + id;
			},
			addSecNavGrade: function addSecNavGrade(id, pid) {
				return ROOT + "courselist.html?period=" + pid + "&grade=" + id + "&subject=";
			},
			addSecNav: function addSecNav(id, pid, gid) {
				return ROOT + "courselist.html?period=" + pid + "&grade=" + gid + "&subject=" + id;
			}
		},
		mounted: function mounted() {
			//1.0ready --> 2.0
			this.$nextTick(function () {
				this.getInitData();
			});
		},
		methods: {
			getInitData: function getInitData() {
				var _this = this;
				this.$http.post(SERVERROOTDATA + "Course.ashx?action=getPeriodSubject", {}, {
					emulateJSON: true
				}).then(function (res) {
					if (res.body.length < 1) {
						return false;
					} else {
						if (typeof res.body == "string") {
							_this.leftNavArr = JSON.parse(res.body);
						} else {
							_this.leftNavArr = res.body;
						}
					}
				});
			},
			mousechangeShow: function mousechangeShow(id) {
				//first left nav change show
				var _this = this;
				this.secondFlag = true;
				this.inLeftBox = true;
				this.parentNavId = id;
				this.showSecondNav(id);
			},
			closeShow: function closeShow() {
				//first leave close
				if (!this.inSecondBox) {
					this.secondFlag = false;
				}
			},
			openShow: function openShow() {
				//open second nav
				this.inLeftBox = false;
				this.secondFlag = true;
				this.inSecondBox = true;
			},
			secondCloseShow: function secondCloseShow() {
				//leave second box
				this.inSecondBox = false;
				if (!this.inLeftBox) {
					this.secondFlag = false;
				}
			},
			showSecondNav: function showSecondNav(id) {
				//get second nav data
				var _this = this;
				this.$http.post(SERVERROOTDATA + "Course.ashx?action=getGradeSubject", {
                    educationalLevelId: id
				},{
                    emulateJSON: true
                }).then(function (res) {
					if (res.body.length < 1) {
						return false;
					}
					_this.secondNavArr = res.body;
				});
			},
			getGrade: function getGrade(id) {
				this.gradeNavId = id;
			},
			toggleLeftShow: function toggleLeftShow() {
			
				if (this.isShowFlag) {
						
				
					this.isShowFlag = false;
					$(".fe-left-nav-inner").css("height", "40px");
				} else {
					this.isShowFlag = true;
					$(".fe-left-nav-inner").css("height", "430px");
				}
			}
		}
	});
}

// 课程中心1级
function coursecenter() {
    new Vue({
        el:"#fecoursecenter",
        data:{
            courselist:[],//左侧课程列表
            hotcourse:[],//热门课程
            hotminicourse:[],//微课程
            rankingPosition:[-106,-139,-173,-208,-244,-280]//排行图标偏移量
        },
        filters: {
            addRoot: function addRoot(newsId) {
                return ROOT + "coursedetail.html?courseId=" + newsId;
            },
            addKindRoot:function addKindRoot(newsId,courseKind) {
                return ROOT + "coursedetail.html?courseId=" + newsId + "&courseKind="+courseKind;
            },
            addRootMore: function addRootMore(newsId) {
                return ROOT + "courselist.html?newsId=" + newsId;
            },
            addSchoolRoot: function addSchoolRoot(newsId) {
                return ROOT + "schoolindex.html?organId=" + newsId;
            },
            addRootFile: function addRootFile(img) {
                return SERVERROOTFILE + img;
            },
            addMoneySign:function addMoneySign(obj) {
                return obj=="0.00"? "免费":"¥"+obj;
                // return "¥"+obj;
            }
        },
        mounted:function () {
            var _this=this;
            this.$nextTick(function () {
                _this.getCourseList();
                _this.getHotCourse('1');//默认为免费
                _this.getHotMiniCourse();
                _this.toggleRankingList();
            })
        },
        methods: {
            getCourseList: function () {
                var _this = this;
                this.$http.post(SERVERROOTDATA + "Course.ashx?action=getPeriodSubjectCourse",
                    {
                        pageIndex:1,
                        pageSize:6
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        _this.courselist = res.body;
                    }).then(function () {
                    addFirstChildClass();
                    _this.toggleCourse();
                }).then(function () {
                   $('.fecoursemodule .fetitle').on('click','a',function () {
                       var educationalLevelId=$(this).parent().data('id');
                       var subjectId=$(this).parent().next().find('.active').data('type');
                       console.log(educationalLevelId);
                       console.log(subjectId);
                       window.open(ROOT + "courselist.html?period=" + educationalLevelId+"&subject="+subjectId);
                   })
                })
            },
            getHotMiniCourse:function () {
                var _this = this;
                this.$http.post(SERVERROOTDATA + "Course.ashx?action=getCoursePurchaseRanking",
                    {
                        organId:TempOrgId,
                        periodType:'week',
                        courseKind:1,
                        pageIndex:1,
                        pageSize:6
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        _this.hotminicourse = res.body.rows;
                        // console.log(_this.hotcourse);
                    }).then(function () {
                    // _this.toggleMiniRankingList();
                })
            },
            getHotCourse:function (isfree) {
                var _this = this;
                this.$http.post(SERVERROOTDATA + "Course.ashx?action=getCoursePurchaseRanking",
                    {
                        organId:TempOrgId,
                        periodType:'week',
                        pageIndex:1,
                        isFree:isfree,
                        pageSize:6
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        _this.hotcourse = res.body.rows;
                        // console.log(_this.hotcourse);
                    }).then(function () {

                })
            },
            toggleCourse:function () {
                var _this = this;
                $('.fecoursenav').on('click','li a',function () {
                    $(this).parent().siblings().find('a').removeClass('active');
                    $(this).addClass('active');
                    //获取学段
                    var period=$(this).parent().parent().parent().prev().data('id');
                    //获取科目
                    var subject=$(this).data('type');
                    //获取内容节点
                    var dom=$(this).parent().parent().parent().next();
                    _this.$http.post(SERVERROOTDATA + "Course.ashx?action=getCourseByPhaseAndSubject",
                        {
                            educationalLevelId:period,
                            subjectId:subject,
                            pageIndex:1,
                            pageSize:6
                        }
                        ,{emulateJSON: true})
                        .then(function (res) {
                            var obj = res.body.rows;
                            _this.drawDate(obj,dom);
                        })
                })
            },
            // 绘制模板
            drawDate:function (obj,dom) {
                dom.html('');
                if(obj.length<1){
                    dom.html('<div class="fenodata" style="width:100%;height: 300px"></div>');
                    return;
                }
                for(var i=0;i<obj.length;i++){
                    var $container=$('<div class="span4"></div>');
                    var $panel=$('<div class="fepanel"></div>');
                    var $img=$('<img src="'+ SERVERROOTFILE + obj[i].iconPath +'">');
                    var $feimage=$('<a class="feimage"></a>').attr('href',ROOT + "coursedetail.html?courseId="+obj[i].courseId).append($img);
                    var $febox=$('<div class="febox"></div>');
                    var price='免费';
                    var $div=$('<div></div>');
                    if(obj[i].price !='0.00'){
                        price='¥'+obj[i].price;
                    }
                    if(obj[i].isFree=='收费'){
                        $div.append('<span class="femoney">'+ price +'</span>');
                    }else{
                        $div.append('<span>'+ price +'</span>');
                    }
                    $div.append('<b>'+obj[i].teacherName +'</b>');
                    $div.append('<a href="'+ ROOT +'schoolindex.html?organId='+obj[i].organId+'">'+ obj[i].organName+'</a>');
                    $febox.append('<h2>'+ obj[i].courseName +'</h2>').append($div);
                    $panel.append($feimage).append($febox);
                    $container.append($panel);
                    dom.append($container);
                }
            },
            clickMore:function () {
                console.log(22)
                var educationalLevelId=$(this).parent().data('id');
                var subjectId=$(this).parent().next().find('a.active').data('id');
                console.log(educationalLevelId);
                console.log(subjectId);
            },
            toggleRankingList:function () {
                var _this=this;
                $('.fehotcourse').on('click','.fetabs a',function () {
                    $(this).siblings().removeClass('active');
                    $(this).addClass('active');
                    var isfree=$(this).data('id');
                    _this.getHotCourse(isfree);
                })
            },
            // toggleMiniRankingList:function () {
            //     $('.fehotminicourse').on('click','.fetabs a',function () {
            //         $(this).siblings().removeClass('active');
            //         $(this).addClass('active');
            //         console.log(22);
            //         // console.log(111);
            //     })
            // }
        }
    })
}
function addFirstChildClass() {
    $('.fecoursenav li:first-child a').addClass('active');
}
// 课程2级界面
function coursedetail(obj, recordType) {
    if(recordType==1){
        $(document).attr("title","云课堂详情—福建教育网");
    }else{
        $(document).attr("title","选课中心详情—福建教育网");
    }
    new Vue({
        el:"#fecoursedetail",
        data:{
            isCloud:recordType,// 用来区分是否是云课堂
            current: 1, //当前页
            showItem: 6,//显示条数
            allpage: '', //总页码
            cityArr:[],//市
            districtArr:[],//区
            courselist:[],
            allnav:[],//全部课程选择栏
            periodArr:[],//学段
            gradeArr:[],//年级
            subjectArr:[],//学科
            hotcourseArr:[],//右侧热门教程
            recommendedcourses:[],//推荐课程
            rankingPosition:[-106,-139,-173,-208,-244,-280],//排名图标坐标
            //筛选条件初始化
            educationalLevelId:obj.period,
            gradeId:obj.grade,
            subjectId:obj.subject,
            cityId:'',
            orderName:'colligate',
            ascType:'asc',
            courseKind:0 //判断是否是微课，1为true
        },
        filters: {
            addRoot: function addRoot(newsId,kid) {
                if(recordType== 1 || recordType=="1"){
                	return ROOT + "cloundcoursedetail.html?courseId=" + newsId;
                }else{
                    if(kid==1){
                        return ROOT + "coursedetail.html?courseId=" + newsId + "&courseKind=1";
                    }else{
                        return ROOT + "coursedetail.html?courseId=" + newsId + "&courseKind=0";
                    }
                }
            },
            addRootOld: function addRoot(newsId) {
            	return ROOT + "coursedetail.html?courseId=" + newsId;
            },
            addSchoolRoot:function addSchoolRoot(newsId) {
                return ROOT + "schoolindex.html?organId=" + newsId;
            },
            addRootFile: function addRootFile(img) {
                    return SERVERROOTFILE + img;
            },
            addMoneySign:function addMoneySign(obj) {
                return "¥"+obj;
            },
            goToVideo:function goToVideo(cid,vid,type) {
                return ROOT + "courseplayer.html?cid=" + cid + "&vid=" +vid + '&courseType='+type;
            }
        },
        mounted:function () {
            var _this=this;
            this.$nextTick(function () {
                _this.adclick();
                _this.getAreaList();
                _this.getSelectlist();
                _this.bindAreaClick();//绑定区域函数
                _this.getCourseList(obj.period,obj.grade,obj.subject,_this.current,_this.orderName,_this.ascType,_this.courseKind);
                _this.getHotCourse('1');//默认为免费
                _this.getRecommendedCourses();
                _this.addBindSort();
                _this.getCourseByName();
                _this.toggleRankingList();
                _this.isWeike();
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
            isWeike:function () {
                var _this=this;
                $('.fecoursedetailnav').on('change','#isWeike',function () {
                    // console.log("dad");
                    // console.log($(this).prop('checked'))
                    if($(this).prop('checked')==true){
                        _this.courseKind=1;
                    }else{
                        _this.courseKind=0;
                    }
                    _this.current=1;
                    _this.getCourseList(_this.educationalLevelId,_this.gradeId,_this.subjectId,_this.current,_this.orderName,_this.ascType,_this.courseKind);
                })
            },
            // 广告关闭
            adclick:function () {
                $('.fecourselistad').on('click','span',function () {
                    $('.fecourselistad').slideUp(300);
                })
            },
            getAreaList:function () {
                var _this = this;
                // 获取市
                this.$http.post(SERVERROOTDATA+"City.ashx?action=getCity",
                    {
                        provinceId:1
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        _this.cityArr=res.body;
                    }).then(function () {
                        // 获取区
                    $('#city').on('change',function () {
                        var city=$('#city option:selected').data('id');
                        // console.log(city);
                        $('#district option:first-child').prop('selected',true);
                        if(city==''){
                            _this.districtArr=[];
                        }else{
                            _this.$http.post(SERVERROOTDATA+"District.ashx?action=getDistrict",
                                {
                                    cityId:city
                                }
                                ,{emulateJSON: true})
                                .then(function (res) {
                                    _this.districtArr=res.body;
                                })
                        }

                    })
                    $('#district').on('change',function () {
                        var city=$('#city option:selected').data('id');
                        // console.log(city);
                        var district=$('#district option:selected').data('id');
                        // console.log(district);
                    })
                })

            },
            getgrade:function (p) {//绑定年级 点击按钮
                var _this=this;
                _this.gradeId=p;
                _this.subjectId='';
                _this.current=1;
                _this.getCourseList(_this.educationalLevelId,_this.gradeId,_this.subjectId,_this.current,_this.orderName,_this.ascType,_this.courseKind);
            },
            getsubject:function (p) {//绑定学科 点击按钮
                var _this=this;
                _this.subjectId=p;
                _this.current=1;
                _this.getCourseList(_this.educationalLevelId,_this.gradeId,_this.subjectId,_this.current,_this.orderName,_this.ascType,_this.courseKind);
            },
            getSelectlist:function () {
                var _this = this;
                // 学段
                this.$http.post(SERVERROOTDATA + "EducationalLevel.ashx?action=getEducationalLevel",
                    {
                        organId:TempOrgId
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        _this.periodArr = res.body;
                    }).then(function () {
                            var doms=$('.feperio li');
                            for(var i=0;i<doms.length;i++){
                                if($(doms[i]).data('id')==obj.period){
                                    $(doms[i]).addClass('active');
                                    $('.fetitle .d1').html($(doms[i]).html());
                                }
                            }
                         }).then(function () {
                            $('.feperio').on('click','li',function () {
                                _this.educationalLevelId=$(this).data('id');
                                _this.gradeId='';
                                _this.subjectId='';
                                $('.femodule li').removeClass('active');
                                $(this).addClass('active');
                                // 已选项显示栏操作
                                $('.fetitle .d1').html($(this).html());
                                $('.fetitle .d2').html('');
                                $('.fetitle .d3').html('');
                                _this.$http.post(SERVERROOTDATA + "Grade.ashx?action=getGrade",
                                    {
                                        organId:TempOrgId,
                                        educationalLevelId:$(this).data('id')
                                    }
                                    ,{emulateJSON: true})
                                    .then(function (res) {
                                        _this.gradeArr = res.body;
                                    });
                                _this.$http.post(SERVERROOTDATA + "Subject.ashx?action=getSubject",
                                    {
                                        organId:TempOrgId,
                                        educationalLevelId:$(this).data('id'),
                                        gradeId:''
                                    }
                                    ,{emulateJSON: true})
                                    .then(function (res) {
                                        _this.subjectArr = res.body;
                                    })
                                // 调用列表函数
                                _this.current=1;
                                _this.getCourseList(_this.educationalLevelId,_this.gradeId,_this.subjectId,_this.current,_this.orderName,_this.ascType,_this.courseKind);
                            })
                })
                // 年级
                this.$http.post(SERVERROOTDATA + "Grade.ashx?action=getGrade",
                    {
                        organId:TempOrgId,
                        educationalLevelId:obj.period
                    },
                    {emulateJSON: true})
                    .then(function (res) {
                        _this.gradeArr = res.body;
                    }).then(function () {
                            var doms=$('.fegrade li');
                            for(var i=0;i<doms.length;i++){
                                if($(doms[i]).data('id')==obj.grade){
                                    $(doms[i]).addClass('active');
                                    $('.fetitle .d2').html($(doms[i]).html());
                                }
                            }
                        }).then(function () {
                            $('.fegrade').on('click','li',function () {
                                // _this.gradeId=$(this).data('id');
                                // _this.subjectId='';
                                $('.fesubject li').removeClass('active');
                                $(this).siblings().removeClass('active');
                                $(this).addClass('active');
                                // 已选项显示栏操作
                                $('.fetitle .d2').html($(this).html());
                                $('.fetitle .d3').html('');
                                // _this.$http.post(SERVERROOTDATA + "Subject.ashx?action=getSubject",
                                //     {
                                //         organId:TempOrgId,
                                //         educationalLevelId:_this.educationalLevelId,
                                //         gradeId:$(this).data('id')
                                //     }
                                //     ,{emulateJSON: true})
                                //     .then(function (res) {
                                //         console.log('哈哈');
                                //         _this.subjectArr = res.body;
                                //     })
                                // _this.current=1;
                                // _this.getCourseList(_this.educationalLevelId,_this.gradeId,_this.subjectId,_this.current,_this.orderName,_this.ascType);
                            })
                })
                // 学科
                this.$http.post(SERVERROOTDATA + "Subject.ashx?action=getSubject",
                    {
                        organId:TempOrgId,
                        educationalLevelId:obj.period,
                        gradeId:obj.grade
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        _this.subjectArr = res.body;
                    }).then(function () {
                        var doms=$('.fesubject li');
                        // console.log(obj.grade);
                        for(var i=0;i<doms.length;i++){
                            if($(doms[i]).data('id')==obj.subject){
                                $(doms[i]).addClass('active');
                                $('.fetitle .d3').html($(doms[i]).html());
                            }
                        }
                    }).then(function () {
                    $('.fesubject').on('click','li',function () {
                        // _this.subjectId=$(this).data('id');
                        $(this).siblings().removeClass('active');
                        $(this).addClass('active');
                        $('.fetitle .d3').html($(this).html());
                        // _this.current=1;
                        // _this.getCourseList(_this.educationalLevelId,_this.gradeId,_this.subjectId,_this.current,_this.orderName,_this.ascType);
                    })
                })
            },
            // 获取列表
            getCourseList: function (educationalLevelId,gradeId,subjectId,pageIndex,orderName,ascType,courseKind) {
                var _this = this;
                this.$http.post(SERVERROOTDATA + "Course.ashx?action=getCourseListByQuery",
                    {
                        organId:TempOrgId,
                        educationalLevelId:educationalLevelId,
                        gradeId:gradeId,
                        subjectId:subjectId,
                        pageIndex:pageIndex,
                        orderName:orderName,
                        ascType:ascType,
                        pageSize:12,
                        recordType:recordType,
                        courseKind:courseKind
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        _this.courselist = res.body.rows;
                        _this.allpage = res.body.totalPageCount;
                        if(res.body.totalPageCount==0){
                            _this.allpage=1;
                        }
                    }).then(function () {

                })
            },
            // 区域按钮
            bindAreaClick:function () {
              $('.femodule').on('click','b',function () {
                  $(this).addClass('active');
                  $('.fetitle .d4').html('');
                  $('.fetitle .d5').html('不限');
                  $('#city option:first-child').prop('selected',true);
                  $('#district option:first-child').prop('selected',true);
              });
                $('#city').on('change',function () {
                    $('.femodule b').removeClass('active');
                    var city=$(this).val();
                    $('.fetitle .d5').html('');
                    $('.fetitle .d4').html(city);
                });
                $('#district').on('change',function () {
                    $('.femodule b').removeClass('active');
                    var district=$(this).val();
                    $('.fetitle .d5').html(district);
                });
            },
            // 分类按钮绑定
            addBindSort:function () {
                var _this=this;
                $('.fecoursedetailnav .fesortall').addClass('active');
                $('.fecoursedetailnav .fesortlist').addClass('active');
                // 列表排序
                $('.fecoursedetailnav').on('click','.fesortlist',function () {
                    $(this).addClass('active');
                    $('.fesortgrid').removeClass('active');
                    var dom=$(this).parent().parent().next();
                    if(dom.hasClass('fecoursedetailcontent-list')){

                    }else{
                        dom.removeClass('fecoursedetailcontent-grid');
                        dom.addClass('fecoursedetailcontent-list')
                    }
                })
                // 网格排序
                $('.fecoursedetailnav').on('click','.fesortgrid',function () {
                    $(this).addClass('active');
                    $('.fesortlist').removeClass('active');
                    var dom=$(this).parent().parent().next();
                    if(dom.hasClass('fecoursedetailcontent-grid')){

                    }else{
                        dom.removeClass('fecoursedetailcontent-list');
                        dom.addClass('fecoursedetailcontent-grid')
                    }
                })
                // 综合排序
                $('.fecoursedetailnav').on('click','.fesortall',function () {
                    $('.fecoursedetailnav .fesortprice').removeClass('active');
                    $('.fecoursedetailnav .fesortrenqi').removeClass('active');
                    $(this).addClass('active');
                    _this.current=1;
                    _this.orderName='colligate';
                    _this.getCourseList(_this.educationalLevelId,_this.gradeId,_this.subjectId,_this.current,_this.orderName,_this.ascType,_this.courseKind);
                })
                // 价格排序
                $('.fecoursedetailnav').on('click','.fesortprice',function () {
                    $('.fecoursedetailnav .fesortall').removeClass('active');
                    $('.fecoursedetailnav .fesortrenqi').removeClass('active');
                    $(this).addClass('active');
                    var dom=$(this).children('i');
                    if(dom.hasClass('uk-icon-long-arrow-down')){
                        dom.removeClass();
                        dom.addClass('uk-icon-long-arrow-up');
                        //按价格升序
                        _this.current=1;
                        _this.orderName='price';
                        _this.ascType='asc';
                        _this.getCourseList(_this.educationalLevelId,_this.gradeId,_this.subjectId,_this.current,_this.orderName,_this.ascType,_this.courseKind);
                    }else{
                        dom.removeClass();
                        dom.addClass('uk-icon-long-arrow-down');
                        //按价格降序
                        _this.current=1;
                        _this.orderName='price';
                        _this.ascType='desc';
                        _this.getCourseList(_this.educationalLevelId,_this.gradeId,_this.subjectId,_this.current,_this.orderName,_this.ascType,_this.courseKind);
                    }
                })
                // 按人气排序
                $('.fecoursedetailnav').on('click','.fesortrenqi',function () {
                    $('.fecoursedetailnav .fesortall').removeClass('active');
                    $('.fecoursedetailnav .fesortprice').removeClass('active');
                    $(this).addClass('active');
                    var dom=$(this).children('i');
                    if(dom.hasClass('uk-icon-long-arrow-down')){
                        dom.removeClass();
                        dom.addClass('uk-icon-long-arrow-up');
                        //按人气升序
                        _this.current=1;
                        _this.orderName='clickCount';
                        _this.ascType='asc';
                        _this.getCourseList(_this.educationalLevelId,_this.gradeId,_this.subjectId,_this.current,_this.orderName,_this.ascType,_this.courseKind);
                    }else{
                        dom.removeClass();
                        dom.addClass('uk-icon-long-arrow-down');
                        //按人气降序
                        _this.current=1;
                        _this.orderName='clickCount';
                        _this.ascType='desc';
                        _this.getCourseList(_this.educationalLevelId,_this.gradeId,_this.subjectId,_this.current,_this.orderName,_this.ascType,_this.courseKind);
                    }
                })
            },
            // 清除全部
            clearAll:function () {
                $('.fetitle .d1').html('');
                $('.fetitle .d2').html('');
                $('.fetitle .d3').html('');
                $('.fetitle .d4').html('');
                $('.fetitle .d5').html('');
                $('.femodule li').removeClass('active');
                $('.femodule b').removeClass('active');
                $('#city option:first-child').prop('selected',true);
                $('#district option:first-child').prop('selected',true);
            },
            // 热门教程榜
            getHotCourse:function (isFree) {
                var _this = this;
                this.$http.post(SERVERROOTDATA + "Course.ashx?action=getCoursePurchaseRanking",
                    {
                        organId:TempOrgId,
                        periodType:'week',
                        pageIndex:1,
                        pageSize:6,
                        isFree:isFree,
                        recordType:recordType
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        _this.hotcourseArr = res.body.rows;
                    }).then(function () {
                    $('.fehotcoursemodule ul li:first-child h1').addClass('active');
                    $('.fehotcoursemodule ul li:first-child .fepanel').slideDown();
                    $('.fehotcoursemodule ul li').on('click','h1',function () {
                        if($(this).hasClass('active')){
                            // $(this).parent().siblings().find('.fepanel').slideUp(300);
                        }else{
                            $(this).parent().siblings().find('h1').removeClass('active');
                            $(this).parent().siblings().find('.fepanel').slideUp(300);
                            $(this).next().slideDown(300);
                            $(this).addClass('active');
                        }
                    })
                })
            },
            // 热门教程榜 tabs切换
            toggleRankingList:function () {
                var _this=this;
                $('.fehotcoursemodule').on('click','.fetabs a',function () {
                    $(this).siblings().removeClass('active');
                    $(this).addClass('active');
                    var isfree=$(this).data('id');
                    _this.getHotCourse(isfree);
                })
            },
            // 推荐课程
            getRecommendedCourses:function () {
                var _this = this;
                this.$http.post(SERVERROOTDATA + "Course.ashx?action=getHotRecommendCourse",
                    {
                        organId:TempOrgId,
                        pageIndex:1,
                        pageSize:2,
                        recordType:recordType
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        _this.recommendedcourses = res.body.rows;
                    })
            },
            // 按名字搜索
            getCourseByName:function () {
                var _this=this;
                $('.fecoursedetailnav .fesousuo').on('click','button',function () {
                    var val=$(this).prev().val();
                    _this.$http.post(SERVERROOTDATA + "Course.ashx?action=getCourseByName",
                        {
                            organId:TempOrgId,
                            pageIndex:1,
                            pageSize:10,
                            name:val
                        }
                        ,{emulateJSON: true})
                        .then(function (res) {
                            _this.courselist = res.body.rows;
                            _this.allpage = res.body.totalPageCount;
                        })
                })


            },
            goto: function(index) { //枫叶处理
                var _this=this;
                if(index == this.current) return;
                if(index<1){
                    this.current = this.current + 2;
                    layer.msg("Sorry ╮(╯_╰)╭ 没有上一页喽！");
                    return false;
                }
                if(index > this.allpage) {
                    this.current = this.current - 2;
                    layer.msg("Sorry ╮(╯_╰)╭ 没有下一页喽！");
                    return false;
                }
                this.current = index;
                _this.getCourseList(_this.educationalLevelId,_this.gradeId,_this.subjectId,_this.current,_this.orderName,_this.ascType,_this.courseKind);
                $.scrollTo($('#coursecontent').offset().top-100, 300);
            }
        }
    })
}
// 名师工作室
function teacherstudio(teachingStudioId) {
    new Vue({
        el:"#feteacherstudio",
        data:{
            studio:[],//工作室,
            isShow:false,
            studioinformation:[],//工作室资讯
            notice:[],//公告
            teacherclassroomnav:[],//名师课堂导航
            teacherclassroom:[],//，名师课堂
            news:[],//最新动态
            studiomember:[],//工作室成员
            courseresourcenav:[],//课件资源导航
            courseresource:[],//课件资源
            message:[],//留言
            courseTypeId:"4",//名师课堂类型
            membercurrent:1,
            studiomemberPage:'',//名师页数
            courseWareTypeId:"",//课程资源类型
            memberRankingArr:'',//成员排行
            position:[-96,-110,-124,-138,-152,-167,-182,-196,-212,-226],//排行图标偏移量
            crown:[-584,-610,-637], //皇冠图标偏移量
            studioinformationnodata:false,
            noticenodata:false,
            teacherclassroomnodata:false,
            newsnodata:false,
            memberranknodata:false,
            studiomembernodate:false,
            courseresourcenodata:false
        },
        filters: {
            addRoot: function addRoot(newsId) {
                return ROOT + "teacherindex.html?teacherId=" + newsId;
            },
            addTeacherRoot: function addTeacherRoot(newsId) {
                return ROOT + "teacherindex.html?teacherId=" + newsId;
            },
            addArticleRoot: function addArticleRoot(id) {
                return ROOT + "articledetail.html?articleId=" + id+"&teachingStudioId="+teachingStudioId;
            },
            addRootSchool: function addRootSchool(newsId) {
                return ROOT + "schoolindex.html?organId=" + newsId;
            },
            addRootNews: function addRootNews(newsId) {
                return ROOT + "newsdetail.html?newsId=" + newsId;
            },
            addRootCourse: function addRootCourse(newsId,rid,kid) {
                if(rid==0){
                    if(kid==0){
                        return ROOT + "coursedetail.html?courseId=" + newsId;
                    }else{
                        return ROOT + "coursedetail.html?courseId=" + newsId + "&courseKind=" +kid;
                    }
                }else{
                    return ROOT + "cloundcoursedetail.html?courseId=" + newsId;
                }
            },
            addRootFile: function addRootFile(img) {
                return SERVERROOTFILE + img;
            },
            download: function download(url) {
                return SERVERROOTFILE + url;
            },
            getResourceType:function getResourceType(type) {
                switch (type){
                    case "courseware":
                        return "课件";
                        break;
                    case "ppt":
                        return "PPT";
                        break;
                    case "excel":
                        return "Excel";
                        break;
                    case "pdf":
                        return "PDF";
                        break;
                    case "txt":
                        return "文本";
                        break;
                    case "article":
                        return "文章";
                        break;
                    default:
                        break;
                }
            },
            getResourceTypeClass:function getResourceTypeClass(type) {
                switch (type){
                    case "courseware":
                        return "doc";
                        break;
                    case "article":
                        return "article";
                        break;
                    default:
                        break;
                }
            },
            getMoney:function getMoney(num) {
                return num==''||num=='0.00'? '免费': '¥'+ num;
            }
        },
        mounted:function () {
            var _this=this;
            this.$nextTick(function () {
                _this.getStudio();
                // _this.bindFollow();
                _this.getStudioInformation();
                _this.getNotice();
                _this.getTeacherClassroomNav();
                _this.getTeacherClassroom(_this.courseTypeId);
                _this.getNews();
                _this.getMemberRank();
                _this.getStudioMember();
                _this.getCourseResourceNav();
                _this.getCourseResource(_this.courseWareTypeId);
                // _this.getMessage();
            })
        },
        methods: {
            // 工作室
            getStudio:function () {
                var _this = this;
                this.$http.post(SERVERROOTDATA + "TeachingStudio.ashx?action=getTeachingStudioById",
                    {
                        organId:TempOrgId,
                        teachingStudioId:teachingStudioId
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        if(res.body.rows.length<1){
                            return false;
                        }else{
                            _this.studio = res.body.rows[0];
                        }
                    }).then(function () {
                    	$(document).attr("title",_this.studio.name+"—福建教育网 ");
                        if($(window).storager({ key: 'feUType' }).readStorage()==3){
                            this.isShow=true;
                        }
                        $('.feteacherdetail .feteacherdetailhead').on('click','#applyStudio',function () {
                            if($(window).storager({ key: 'feUid' }).readStorage()==undefined){
                                layer.msg('您还未登录,请先登录');
                            }else{
                                var uid= $(window).storager({ key: 'feUid' }).readStorage();
                                _this.$http.post(SERVERROOTDATA + "StudentTrs.ashx?action=saveStudioTeacherRs",
                                    {
                                        teacherId:uid,
                                        teachingStudioId:teachingStudioId,
                                        saveTag:'add'
                                    }
                                    ,{emulateJSON: true})
                                    .then(function (res) {
                                        if(res.body==200){
                                            layer.msg('申请已发送，请耐心等候 O(∩_∩)O');
                                        }else if(res.body=='901'){
                                           layer.msg('您已加入该工作室');
                                        }else if(res.body=='900'){
                                            layer.msg('您已属于该工作室');
                                        }else if(res.body=='902'){
                                            layer.msg('申请等待审核，请耐心等候');
                                        }else if(res.body=='903'){
                                            layer.msg('您还未认证，不能申请加入工作室');
                                        }else {
                                            layer.msg('申请失败！');
                                        }
                                    });

                            }
                        })
                })
            },
            bindFollow:function () {
                $('.feteacherdetailhead').on('click','.fefollow button:first-child',function () {
                    if($(this).parent().hasClass('active')){
                        return
                    }
                    console.log('关注成功');
                    // $(this).find('i').removeClass().addClass('uk-icon-check');
                    $(this).html('<i class="uk-icon-check"></i>已关注');
                    $(this).parent().addClass('active');
                });
                $('.feteacherdetailhead').on('click','.fefollow button.cancel',function () {
                    // var my=$(this);
                    layer.confirm('你确定要取消关注吗？', {
                        btn: ['确定','取消'] //按钮
                    }, function(){
                        $('.fefollow button:first-child').html('<i class="uk-icon-plus"></i>关注');
                        $('.fefollow').removeClass('active');
                        layer.closeAll()
                    }, function(){
                    });
                });
            },
            // 工作室资讯
            getStudioInformation: function () {
                var _this = this;
                this.$http.post(SERVERROOTDATA + "News.ashx?action=getTeachingStudioNews",
                    {
                        organId:TempOrgId,
                        teachingStudioId:teachingStudioId,
                        pageIndex:1,
                        pageSize:7
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        if(res.body.rows.length<1){
                            _this.studioinformationnodata=true;
                            _this.studioinformation = res.body.rows;
                        }else{
                            _this.studioinformation = res.body.rows;
                            _this.studioinformationnodata=false;
                        }
                        $('.festudioinformation>h1>a').attr('href','teacherstudioinfomore.html?teachingStudioId='+teachingStudioId);
                    })
            },
            // 公告
            getNotice: function () {
                var _this = this;
                this.$http.post(SERVERROOTDATA + "Activity.ashx?action=getTeachingStudioNotice",
                    {
                        organId:TempOrgId,
                        teachingStudioId:teachingStudioId,
                        pageIndex:1,
                        pageSize: 8
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        if(res.body.rows.length<1){
                            _this.noticenodata=true;
                            _this.notice = res.body.rows;
                        }else{
                            _this.notice = res.body.rows;
                            _this.noticenodata=false;
                        }
                        $('.fenotice>h1>a').attr('href','teacherstudioinfomore.html?teachingStudioId='+teachingStudioId);
                    }).then(function () {
                        var _this = this;
                        $('.fenotice ul').on('click','li',function () {
                            var id=$(this).find('a').data('id');
                            _this.$http.post(SERVERROOTDATA + "Activity.ashx?action=getActivityDetailById",
                                {
                                    activityId:id
                                }
                                ,{emulateJSON: true})
                                .then(function (res) {
                                    var data=res.body[0];
                                    var html='<div class="fenoticepop"><h1><span>'+ data.publishName +'</span>' +
                                        '<span>'+ data.publishDate +'</span></h1>' +
                                        '<p>'+ data.content +'</p></div>'
                                    layer.open({
                                        type: 1,
                                        title:data.title,
                                        skin: 'layui-layer-rim', //加上边框
                                        area: ['600px', '400px'], //宽高
                                        content: html
                                    });
                                });

                        })
                })
            },
            // 名师课堂导航栏
            getTeacherClassroomNav:function () {
                var _this = this;
                this.$http.post(SERVERROOTDATA + "CourseType.ashx?action=getStudioCourseType",
                    {
                        organId:TempOrgId,
                        // teachingStudioId:teachingStudioId,
                        pageIndex:1,
                        pageSize:10
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        _this.teacherclassroomnav=res.body.rows;
                    }).then(function () {
                    _this.courseTypeId=$('.feteacherclassroom .fenav li:first-child').data('id');
                    $('.feteacherclassroom .fenav li:first-child').addClass('active');
                    _this.teacherClassroomNavClick('.feteacherclassroom');
                    $('.feteacherclassroom .fenav a').attr('href','teacherstudiocoursemore.html?teachingStudioId='+teachingStudioId);
                })
            },
            // 名师课堂
            getTeacherClassroom: function (courseTypeId) {
                var _this = this;
                this.$http.post(SERVERROOTDATA + "Course.ashx?action=getStudioCourseByType",
                    {
                        organId:TempOrgId,
                        teachingStudioId:teachingStudioId,
                        courseTypeId:courseTypeId,
                        pageIndex:1,
                        pageSize:6
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        if(res.body.rows.length<1){
                            _this.teacherclassroomnodata=true;
                        }else {
                            _this.teacherclassroom = res.body.rows;
                            _this.teacherclassroomnodata=false;
                        }
                    })
            },
            // 最新动态
            getNews: function () {
                var _this = this;
                this.$http.post(SERVERROOTDATA + "TeachingStudio.ashx?action=getSpecifiedStudioDynamic",
                    {
                        teachingStudioId:teachingStudioId,
                        pageIndex:1,
                        pageSize:4
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        if(res.body.rows.length<1){
                            _this.newsnodata=true;
                            _this.news = res.body.rows;
                        }else {
                            _this.newsnodata=false;
                            _this.news = res.body.rows;
                        }

                    })
            },
            selectRank:function(obj,index){
            	var _this = this;
            	$(obj.target).addClass('active');
            	$(obj.target).siblings('span').removeClass('active');
            	_this.getMemberRank(obj);
            },
            // 成员动态
            getMemberRank: function (obj) {
                var _this = this;
                this.$http.post(SERVERROOTDATA + "TeachingStudio.ashx?action=getSpecifiedStudioDynamic",
                    {
                        teachingStudioId:teachingStudioId,
                        pageIndex:1,
                        pageSize:4
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        if(res.body.rows.length<1){
                            _this.memberranknodata=true;
                            _this.memberRankingArr = res.body.rows;
                        }else {
                            _this.memberranknodata=false;
                            _this.memberRankingArr = res.body.rows;
                        }

                    }).then(function(){
                    	 _this.memberRankingArr.forEach(function(item,index){
                    	 	item.iconPath = SERVERROOTFILE +item.iconPath;
                    	 })
                    })
            },
            addDownloadRecord:function (id,url) {//下载保存记录
                var _this = this;
                var studentId=$(window).storager({key: 'feUid'}).readStorage();
                var userType=$(window).storager({key: 'feUType'}).readStorage();
                if(studentId==null||studentId==undefined||studentId=='undefined'){
                    layer.msg('请先登录');
                    setTimeout(function () {
                        window.location.href = ROOT+"login.html";
                    },1000);
                    return;
                }
                var uType='';
                if(userType==1){
                    uType='student';
                }else if(userType==2){
                    uType='parent';
                }else if(userType==3){
                    uType='teacher';
                }
                this.$http.post(SERVERROOTDATA + "ResourceDownload.ashx?action=resourceDownloadSave",
                    {
                        userId:studentId,
                        userType:uType,
                        saveTag:'add',
                        studioResourceId:id
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {});
                var form=$("<form>");//定义一个form表单
                form.attr("style","display:none");
                form.attr("target","");
                form.attr("method","get");  //请求类型
                form.attr("action",SERVERROOTFILE + url);   //请求地址
                $("body").append(form);//将表单放置在web中
                form.submit();//表单提交
            },
            // 工作室成员
            getStudioMember: function () {
                var _this = this;
                this.$http.post(SERVERROOTDATA + "TeachingStudio.ashx?action=getStudioMember",
                    {
                        teachingStudioId:teachingStudioId,
                        pageIndex:_this.membercurrent,
                        pageSize:5
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        if(res.body.rows.length<1){
                            _this.studiomembernodate=true;
                        }else {
                            _this.studiomembernodate=false;
                            _this.studiomember = res.body.rows;
                            _this.studiomemberPage = res.body.totalPageCount;
                        }
                    }).then(function () {
                        // 换一批
                        var _this=this;
                    $('.festudiomember .fenav').on('click','span',function () {
                        if(++_this.membercurrent <=_this.studiomemberPage){

                        }else{
                            _this.membercurrent=1;
                        }
                        _this.$http.post(SERVERROOTDATA + "TeachingStudio.ashx?action=getStudioMember",
                            {
                                teachingStudioId:teachingStudioId,
                                pageIndex:_this.membercurrent,
                                pageSize:5
                            }
                            ,{emulateJSON: true})
                            .then(function (res) {
                                if(res.body.rows.length<1){
                                    // layer.msg('没有下一批老师了');
                                    // _this.membercurrent--;
                                }else {
                                    _this.studiomembernodate=false;
                                    _this.studiomember = res.body.rows;
                                }
                            })
                    })
                })
            },
            // 课件资源导航栏
            getCourseResourceNav: function () {
                var _this = this;
                this.$http.post(SERVERROOTDATA + "TeachingStudio.ashx?action=getCourseWareType",
                    {
                        // teachingStudioId:teachingStudioId
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        _this.courseresourcenav = res.body;
                    }).then(function () {
                    _this.courseWareTypeId=$('.fecourseresource .fenav li:first-child').data('id');
                    $('.fecourseresource .fenav li:first-child').addClass('active');
                    _this.courseResourceavClick('.fecourseresource');
                    $('.fecourseresource .fenav a').attr('href','teacherstudioresourcemore.html?teachingStudioId='+teachingStudioId);
                })
            },
            // 课件资源
            getCourseResource: function (courseWareTypeId) {
                var _this = this;
                this.$http.post(SERVERROOTDATA + "TeachingStudio.ashx?action=getCourseWareResources",
                    {
                        teachingStudioId:teachingStudioId,
                        courseWareTypeId:courseWareTypeId,
                        pageIndex:1,
                        pageSize:6
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        if(res.body.rows.length<1){
                            _this.courseresourcenodata=true;
                        }else {
                            _this.courseresource = res.body.rows;
                            _this.courseresourcenodata=false;
                        }
                    })
            },
            // // 留言
            // getMessage: function () {
            //     var _this = this;
            //     this.$http.get(ROOTDATA + "teacherstudio-7.json", {emulateJSON: true})
            //         .then(function (res) {
            //             _this.message = res.body;
            //         })
            // },
            // 名师课堂导航栏切换
            teacherClassroomNavClick:function (dom) {
                var _this=this;
                $(dom).on('click','.fenav li',function () {
                    $(this).siblings().removeClass('active');
                    $(this).addClass('active');
                    var courseTypeId=$(this).data('id');
                    _this.teacherclassroom=[];
                    _this.getTeacherClassroom(courseTypeId);
                })
            },
            // 课件资源导航栏切换
            courseResourceavClick:function (dom) {
                var _this=this;
                $(dom).on('click','.fenav li',function () {
                    $(this).siblings().removeClass('active');
                    $(this).addClass('active');
                    var courseWareTypeId=$(this).data('id');
                    _this.courseresource=[];
                    _this.getCourseResource(courseWareTypeId);
                })
            }
        }
    })
}
// 名师工作室资讯、公告更多界面
function teacherstudioinfomore(teachingStudioId) {
    new Vue({
        el: "#feteacherstudioinfomore",
        data: {
            isShow:false,
            studio:[],
            rightCount: [],//右侧数量
            studioinformation:[],//工作室资讯
            notice:[],//公告
            studioinformationnodata:false,
            noticenodata:false,
            noticecurrent:1,
            informationcurrent:1,
            noticeload:true,
            studioinformationload:true
        },
        filters: {
            addRootCourse: function addRootCourse(newsId) {
                return ROOT + "coursedetail.html?courseId=" + newsId;
            },
            addRootFile: function addRootFile(img) {
                return SERVERROOTFILE + img;
            },
            addMoneySign:function addMoneySign(obj) {
                return obj=="0.00"? "免费":"¥"+obj;
                // return "¥"+obj;
            },
            addRootNews: function addRootNews(newsId) {
                return ROOT + "newsdetail.html?newsId=" + newsId;
            }
        },
        mounted: function () {
            var _this = this;
            this.$nextTick(function () {
                _this.getStudio();
                // _this.bindFollow();
                _this.getRightCount();
                _this.getNotice(_this.noticecurrent);
                _this.getStudioInformation(_this.informationcurrent);
            })
        },
        methods: {
            // 工作室
            getStudio:function () {
                var _this = this;
                this.$http.post(SERVERROOTDATA + "TeachingStudio.ashx?action=getTeachingStudioById",
                    {
                        organId:TempOrgId,
                        teachingStudioId:teachingStudioId
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        if(res.body.rows.length<1){
                            return false;
                        }else{
                            _this.studio = res.body.rows[0];
                        }
                    }).then(function () {
                    if($(window).storager({ key: 'feUType' }).readStorage()==3){
                        this.isShow=true;
                    }
                    $('.feteacherdetailhead').on('click','#applyStudio',function () {
                        if($(window).storager({ key: 'feUid' }).readStorage()==undefined){
                            layer.msg('您还未登录,请先登录');
                        }else{
                            var uid= $(window).storager({ key: 'feUid' }).readStorage();
                            _this.$http.post(SERVERROOTDATA + "StudentTrs.ashx?action=saveStudioTeacherRs",
                                {
                                    teacherId:uid,
                                    teachingStudioId:teachingStudioId,
                                    saveTag:'add'
                                }
                                ,{emulateJSON: true})
                                .then(function (res) {
                                    if(res.body==200){
                                        layer.msg('申请已发送，请耐心等候 O(∩_∩)O');
                                    }else if(res.body=='901'){
                                        layer.msg('您已加入该工作室');
                                    }else if(res.body=='900'){
                                        layer.msg('您已属于该工作室');
                                    }else if(res.body=='902'){
                                        layer.msg('申请等待审核，请耐心等候');
                                    }else if(res.body=='903'){
                                        layer.msg('您还未认证，不能申请加入工作室');
                                    }else {
                                        layer.msg('申请失败！');
                                    }
                                });

                        }
                    })
                }).then(function () {
                    $(document).attr("title",$('.feteacherdetailhead>h1').text()+"—福建教育网");
                })
            },
            bindFollow:function () {
                $('.feteacherdetailhead').on('click','.fefollow button:first-child',function () {
                    if($(this).parent().hasClass('active')){
                        return
                    }
                    console.log('关注成功');
                    // $(this).find('i').removeClass().addClass('uk-icon-check');
                    $(this).html('<i class="uk-icon-check"></i>已关注');
                    $(this).parent().addClass('active');
                });
                $('.feteacherdetailhead').on('click','.fefollow button.cancel',function () {
                    // var my=$(this);
                    layer.confirm('你确定要取消关注吗？', {
                        btn: ['确定','取消'] //按钮
                    }, function(){
                        $('.fefollow button:first-child').html('<i class="uk-icon-plus"></i>关注');
                        $('.fefollow').removeClass('active');
                        layer.closeAll()
                    }, function(){
                    });
                });
            },
            getRightCount:function () {
                var _this = this;
                this.$http.post(SERVERROOTDATA + "TeachingStudio.ashx?action=statStudioNewsActivityCount",
                    {
                        teachingStudioId:teachingStudioId
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        _this.rightCount=res.body[0];
                    })
            },
            // 公告
            getNotice: function (pageIndex) {
                var _this = this;
                this.$http.post(SERVERROOTDATA + "Activity.ashx?action=getTeachingStudioNotice",
                    {
                        organId:TempOrgId,
                        teachingStudioId:teachingStudioId,
                        pageIndex:pageIndex,
                        pageSize: 4
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        if(res.body.rows.length < 1) {
                            _this.noticenodata=true;
                        } else {
                            _this.notice=_this.notice.concat(res.body.rows);
                            _this.noticenodata=false;
                        }
                        if(pageIndex >=res.body.totalPageCount){
                            _this.noticeload=false;
                        }else{
                            _this.noticeload=true;
                        }
                    })
            },
            bindPopNotice:function (id) {
                    this.$http.post(SERVERROOTDATA + "Activity.ashx?action=getActivityDetailById",
                        {
                            activityId:id
                        }
                        ,{emulateJSON: true})
                        .then(function (res) {
                            var data=res.body[0];
                            var html='<div class="fenoticepop"><h1><span>'+ data.publishName +'</span>' +
                                '<span>'+ data.publishDate +'</span></h1>' +
                                '<p>'+ data.content +'</p></div>'
                            layer.open({
                                type: 1,
                                title:data.title,
                                skin: 'layui-layer-rim', //加上边框
                                area: ['600px', '400px'], //宽高
                                content: html
                            });
                        });
            },
            // 工作室资讯
            getStudioInformation: function (pageIndex) {
                var _this = this;
                this.$http.post(SERVERROOTDATA + "News.ashx?action=getTeachingStudioNews",
                    {
                        // organId:TempOrgId,
                        teachingStudioId:teachingStudioId,
                        pageIndex:pageIndex,
                        pageSize:4
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        if(res.body.rows.length < 1) {
                            _this.studioinformationnodata=true;
                        } else {
                            _this.studioinformation=_this.studioinformation.concat(res.body.rows);
                            _this.studioinformationnodata=false;
                        }
                        if(pageIndex >=res.body.totalPageCount){
                            _this.studioinformationload=false;
                        }else{
                            _this.studioinformationload=true;
                        }
                    })
            },
            noticeClickMore:function () {
                var _this=this;
                this.getNotice(++_this.noticecurrent);
            },
            studioInformationClickMore:function () {
                var _this=this;
                this.getStudioInformation(++_this.informationcurrent);
            }
        }
    })
}
// 名师工作室课程更多界面
function teacherstudiocoursemore(teachingStudioId) {
    new Vue({
        el: "#feteacherstudiocoursemore",
        data: {
            isShow:false,
            studio:[],
            teacherclassroomnav: [],//名师课堂导航
            teacherclassroom: [],//，名师课堂
            courseresource: [],//课件资源
            courseTypeId: "22",//名师课堂类型
            current: 1,
            allpage:'',
            showItem:6,
            teacherclassroomnodata: false
        },
        filters: {
            addRootCourse: function addRootCourse(newsId,rid,kid) {
                if(rid==0){
                    if(kid==0){
                        return ROOT + "coursedetail.html?courseId=" + newsId;
                    }else{
                        return ROOT + "coursedetail.html?courseId=" + newsId + "&courseKind=" +kid;
                    }
                }else{
                    return ROOT + "cloundcoursedetail.html?courseId=" + newsId;
                }
            },
            addRootFile: function addRootFile(img) {
                return SERVERROOTFILE + img;
            },
            addMoneySign:function addMoneySign(obj) {
                return obj=="0.00"? "免费":"¥"+obj;
                // return "¥"+obj;
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
        mounted: function () {
            var _this = this;
            this.$nextTick(function () {
                _this.getStudio();
                // _this.bindFollow();
                _this.getTeacherClassroomNav();
                _this.getTeacherClassroom(_this.courseTypeId,_this.current);
            })
        },
        methods: {
            // 工作室
            getStudio:function () {
                var _this = this;
                this.$http.post(SERVERROOTDATA + "TeachingStudio.ashx?action=getTeachingStudioById",
                    {
                        organId:TempOrgId,
                        teachingStudioId:teachingStudioId
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        if(res.body.rows.length<1){
                            return false;
                        }else{
                            _this.studio = res.body.rows[0];
                        }
                    }).then(function () {
                    if($(window).storager({ key: 'feUType' }).readStorage()==3){
                        this.isShow=true;
                    }
                    $('.feteacherdetailhead').on('click','#applyStudio',function () {
                        if($(window).storager({ key: 'feUid' }).readStorage()==undefined){
                            layer.msg('您还未登录,请先登录');
                        }else{
                            var uid= $(window).storager({ key: 'feUid' }).readStorage();
                            _this.$http.post(SERVERROOTDATA + "StudentTrs.ashx?action=saveStudioTeacherRs",
                                {
                                    teacherId:uid,
                                    teachingStudioId:teachingStudioId,
                                    saveTag:'add'
                                }
                                ,{emulateJSON: true})
                                .then(function (res) {
                                    if(res.body==200){
                                        layer.msg('申请已发送，请耐心等候 O(∩_∩)O');
                                    }else if(res.body=='901'){
                                        layer.msg('您已加入该工作室');
                                    }else if(res.body=='900'){
                                        layer.msg('您已属于该工作室');
                                    }else if(res.body=='902'){
                                        layer.msg('申请等待审核，请耐心等候');
                                    }else if(res.body=='903'){
                                        layer.msg('您还未认证，不能申请加入工作室');
                                    }else {
                                        layer.msg('申请失败！');
                                    }
                                });

                        }
                    })
                }).then(function () {
                    $(document).attr("title",$('.feteacherdetailhead>h1').text()+"—福建教育网");
                })
            },
            bindFollow:function () {
                $('.feteacherdetailhead').on('click','.fefollow button:first-child',function () {
                    if($(this).parent().hasClass('active')){
                        return
                    }
                    console.log('关注成功');
                    // $(this).find('i').removeClass().addClass('uk-icon-check');
                    $(this).html('<i class="uk-icon-check"></i>已关注');
                    $(this).parent().addClass('active');
                });
                $('.feteacherdetailhead').on('click','.fefollow button.cancel',function () {
                    // var my=$(this);
                    layer.confirm('你确定要取消关注吗？', {
                        btn: ['确定','取消'] //按钮
                    }, function(){
                        $('.fefollow button:first-child').html('<i class="uk-icon-plus"></i>关注');
                        $('.fefollow').removeClass('active');
                        layer.closeAll()
                    }, function(){
                    });
                });
            },
            // 名师课堂导航栏
            getTeacherClassroomNav:function () {
                var _this = this;
                this.$http.post(SERVERROOTDATA + "CourseType.ashx?action=getStudioCourseType",
                    {
                        organId:TempOrgId,
                        // teachingStudioId:teachingStudioId,
                        pageIndex:1,
                        pageSize:10
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        _this.teacherclassroomnav=res.body.rows;
                    }).then(function () {
                    _this.courseTypeId=$('.festudiocoursemoreselect ul li:first-child').data('id');
                    $('.festudiocoursemoreselect ul li:first-child').addClass('active');
                    _this.teacherClassroomNavClick('.festudiocoursemoreselect');
                })
            },
            // 名师课堂
            getTeacherClassroom: function (courseTypeId,pageIndex) {
                var _this = this;
                this.$http.post(SERVERROOTDATA + "Course.ashx?action=getStudioCourseByType",
                    {
                        organId:TempOrgId,
                        teachingStudioId:teachingStudioId,
                        courseTypeId:courseTypeId,
                        pageIndex:pageIndex,
                        pageSize:12
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        if(res.body.rows.length<1){
                            _this.teacherclassroomnodata=true;
                        }else {
                            _this.teacherclassroom = res.body.rows;
                            _this.allpage=res.body.totalPageCount;
                            console.log(_this.teacherclassroom)
                            _this.teacherclassroomnodata=false;
                        }
                    })
            },
            // 名师课堂导航栏切换
            teacherClassroomNavClick:function (dom) {
                var _this=this;
                $(dom).on('click','ul li',function () {
                    $(this).siblings().removeClass('active');
                    $(this).addClass('active');
                    var courseTypeId=$(this).data('id');
                    _this.teacherclassroom=[];
                    _this.courseTypeId=courseTypeId;
                    _this.current=1;
                    _this.getTeacherClassroom(_this.courseTypeId,_this.current);
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
                _this.getTeacherClassroom(_this.courseTypeId,_this.current);
            }
        }
    })
}
// 名师工作室资源更多
function teacherstudioresourcemore(teachingStudioId) {
    new Vue({
        el:"#teacherstudioresourcemore",
        data:{
            isShow:false,
            studio:[],
            leftresource:[],//资源显示
            rightnav:[],//右侧导航栏
            resourceType:"all",//默认文章
            current:1,
            resourcecount:'',//资源数量
            nodata:false,
            load:true
        },
        filters: {
            addRoot: function addRoot(newsId) {
                return ROOT + "articledetail.html?articleId=" + newsId;
            },
            downRoot: function downRoot(url) {
                return SERVERROOTFILE  + url;
            },
            addRootFile: function addRootFile(img) {
                return SERVERROOTFILE + img;
            },
            getName:function getName(name) {
                switch (name){
                    case 'all':
                        return "全部资源";
                        break;
                    case 'article':
                        return "文章";
                        break;
                    case 'courseware':
                        return "课件";
                        break;
                    default:
                        break;
                }
            }
        },
        mounted:function () {
            var _this=this;
            this.$nextTick(function () {
                _this.getStudio();
                // _this.bindFollow();
                _this.getLeftResource(_this.resourceType,_this.current);
                _this.getRightNav();
            })
        },
        methods: {
            // 工作室
            getStudio:function () {
                var _this = this;
                this.$http.post(SERVERROOTDATA + "TeachingStudio.ashx?action=getTeachingStudioById",
                    {
                        organId:TempOrgId,
                        teachingStudioId:teachingStudioId
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        if(res.body.rows.length<1){
                            return false;
                        }else{
                            _this.studio = res.body.rows[0];
                        }
                    }).then(function () {
                    if($(window).storager({ key: 'feUType' }).readStorage()==3){
                        this.isShow=true;
                    }
                    $('.feteacherdetailhead').on('click','#applyStudio',function () {
                        if($(window).storager({ key: 'feUid' }).readStorage()==undefined){
                            layer.msg('您还未登录,请先登录');
                        }else{
                            var uid= $(window).storager({ key: 'feUid' }).readStorage();
                            _this.$http.post(SERVERROOTDATA + "StudentTrs.ashx?action=saveStudioTeacherRs",
                                {
                                    teacherId:uid,
                                    teachingStudioId:teachingStudioId,
                                    saveTag:'add'
                                }
                                ,{emulateJSON: true})
                                .then(function (res) {
                                    if(res.body==200){
                                        layer.msg('申请已发送，请耐心等候 O(∩_∩)O');
                                    }else if(res.body=='901'){
                                        layer.msg('您已加入该工作室');
                                    }else if(res.body=='900'){
                                        layer.msg('您已属于该工作室');
                                    }else if(res.body=='902'){
                                        layer.msg('申请等待审核，请耐心等候');
                                    }else if(res.body=='903'){
                                        layer.msg('您还未认证，不能申请加入工作室');
                                    }else {
                                        layer.msg('申请失败！');
                                    }
                                });

                        }
                    })
                }).then(function () {
                    $(document).attr("title",$('.feteacherdetailhead>h1').text()+"—福建教育网");
                })
            },
            bindFollow:function () {
                $('.feteacherdetailhead').on('click','.fefollow button:first-child',function () {
                    if($(this).parent().hasClass('active')){
                        return
                    }
                    console.log('关注成功');
                    // $(this).find('i').removeClass().addClass('uk-icon-check');
                    $(this).html('<i class="uk-icon-check"></i>已关注');
                    $(this).parent().addClass('active');
                });
                $('.feteacherdetailhead').on('click','.fefollow button.cancel',function () {
                    // var my=$(this);
                    layer.confirm('你确定要取消关注吗？', {
                        btn: ['确定','取消'] //按钮
                    }, function(){
                        $('.fefollow button:first-child').html('<i class="uk-icon-plus"></i>关注');
                        $('.fefollow').removeClass('active');
                        layer.closeAll()
                    }, function(){
                    });
                });
            },
            getLeftResource: function (resourceType,pageIndex) {
                var _this = this;
                this.$http.post(SERVERROOTDATA + "TeachingStudio.ashx?action=getStudioResources",
                    {
                        teachingStudioId:teachingStudioId,
                        resourceType:resourceType,
                        pageIndex:pageIndex,
                        pageSize:4
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        if(res.body.rows.length < 1) {
                            _this.nodata=true;
                        } else {
                            _this.leftresource =_this.leftresource.concat(res.body.rows);
                            _this.resourcecount=res.body.totalCount;
                            _this.nodata=false;
                        }
                        if(pageIndex >=res.body.totalPageCount){
                            _this.load=false;
                        }else{
                            _this.load=true;
                        }
                    })
            },
            getRightNav: function () {
                var _this = this;
                this.$http.post(SERVERROOTDATA + "TeachingStudio.ashx?action=statStudioResourcesCount",
                    {
                        teachingStudioId:teachingStudioId
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        _this.rightnav = res.body;
                        console.log(_this.rightnav);
                    }).then(function () {
                    $('.festudioresourcemore-right').on('click','li',function () {
                        var id=$(this).data('id');
                        $(this).siblings().removeClass('active');
                        $(this).addClass('active');
                        _this.current=1;
                        _this.resourceType=id;
                        _this.leftresource=[];
                        _this.getLeftResource(_this.resourceType,_this.current);
                    })
                    $('.femasterdetail-allresource li:first-child').addClass('active');
                })
            },
            resourceLoadMore:function () {
                var _this=this;
                this.getLeftResource(_this.resourceType,++_this.current);
            }
        }
    })
}
// 名师3级页面-主页
function teacherindex(teacherId) {
    new Vue({
        el:"#femasterdetail",
        data:{
            teacher:[],//老师
            current: 1, //留言当前页
            showItem: 4,//显示条数
            allpage: '', //总页码
            masterdetailnav:[],//导航栏
            recommendedcourses:[],//推荐课程
            teacherintroduction:[],//老师介绍
            pastnav:[],//过往选项栏
            pastexperience:[],//过往经历
            courseevaluation:[],//课程评价
            rightnav:[],//右侧选择栏
            rightresource:[],//右侧资源
            rightphotovideo:[],//右侧视频/照片
            allcourse:"",//总推荐课程数量
            allevaluation:"",//总留言数量
            coursecurrent:1,//课程当前页
            experiencecurrent:1,//过往经历当前页
            recommendedcoursesnodate:false,//推荐课程没数据
            pastexperiencenodate:false,//过往经历没数据
            recommendedcoursesload:true,//推荐课程加载更多
            pastexperienceload:true,//过往经历加载更多
            noresource:true,//右侧资源没数据显示
            nophoto:true//右侧图片没数据显示
        },
        filters: {
            addRootNav:function addRootNav(newsId) {
                var url;
                switch (newsId){
                    case "1":
                        url="teacherindex.html?teacherId="+teacherId;
                        break;
                    case "2":
                        url="teachercourse.html?teacherId="+teacherId;
                        break;
                    case "3":
                        url="teacherresource.html?teacherId="+teacherId;
                        break;
                    case "4":
                        url="teacherphoto.html?teacherId="+teacherId;
                        break;
                    case "5":
                        url="teacherrecord.html?teacherId="+teacherId;
                        break;
                    default:
                        break;
                }
                return ROOT+url;
            },
            addRoot: function addRoot(newsId,rType,kType,courseType) {
                if(courseType=='under'){
                    return ROOT + 'undercoursedetail.html?courseId=' + newsId;
                }
                if(rType==0){
                    if(kType==0){
                        return ROOT + "coursedetail.html?courseId=" + newsId;
                    }else{
                        return ROOT + "coursedetail.html?courseId=" + newsId +"&courseKind=1";
                    }
                }else{
                    if(kType==0){
                        return ROOT + "cloundcoursedetail.html?courseId=" + newsId;
                    }else{
                        return ROOT + "cloundcoursedetail.html?courseId=" + newsId +"&courseKind=1";
                    }
                }
            },
            addArticleRoot: function addArticleRoot(newsId) {
                return ROOT + "articledetail.html?articleId=" + newsId +"&teacherId="+teacherId;
            },
            downRoot: function downRoot(url) {
                return SERVERROOTFILE + url;
            },
            addRootFile: function addRootFile(img) {
                return SERVERROOTFILE + img;
            },
            addMoneySign:function addMoneySign(obj) {
                return obj=="0.00"? "免费":"¥"+obj;
            },
            getSex:function getSex(obj) {
                return obj=="0"? "男":"女";
            },
            goCourse:function goCourse(id) {
              return ROOT+"coursedetail.html?courseId="+id;
            },
            addCourseType:function addCourseType(type) {
                switch (type){
                    case 'video':
                        return "视频课";
                        break;
                    case 'live':
                        return "直播课";
                        break;
                    case 'oneToOne':
                        return "1对1";
                        break;
                    case 'public':
                        return "公开课";
                        break;
                    case 'under':
                        return "线下课";
                        break;
                }
            },
            goToSchool:function goToSchool(id) {
                return ROOT + "schoolindex.html?organId=" + id;
            }
        },
        mounted:function () {
            var _this=this;
            this.$nextTick(function () {
                _this.getTeacher(teacherId);
                _this.bindFollow();
                _this.getMasterDetailNav();
                _this.getRecommendedCourses(_this.coursecurrent);
                _this.getTeacherIntroduction();
                // _this.getPastNav();
                _this.getPastExperience(_this.experiencecurrent);
                _this.getCourseEvaluation(_this.current);
                _this.getRightNav();
                _this.getRightResource();
                _this.getRightPhotoVideo();
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
            getTeacher:function (teacherId) {
                var uId=$(window).storager({key: 'feUid'}).readStorage();
                var userType=$(window).storager({key: 'feUType'}).readStorage();
                var _this = this;
                this.$http.post(SERVERROOTDATA + "Teacher.ashx?action=getTeacherById",
                    {
                        teacherId:teacherId,
                        userId:uId,
                        userType:userType
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        _this.teacher = res.body;
                    }).then(function () {
                        if(_this.teacher[0].hasFocused==1){
                            $('.fefollow').addClass('active');
                            $('.fefollow button:first-child').html('<i class="uk-icon-check"></i>已关注');
                        }
                        $(document).attr("title",$('.femasterdetail-head h1').text()+"老师主页—福建教育网");
                })
            },
            bindFollow:function () {
                var _this=this;
                $('.femasterdetail').on('click','.fefollow button:first-child',function () {
                    if($(this).parent().hasClass('active')){
                        return
                    }
                    var uId=$(window).storager({key: 'feUid'}).readStorage();
                    var userType=$(window).storager({key: 'feUType'}).readStorage();
                    if(uId==undefined||uId==''||uId=='undefined'){
                        layer.msg('请先登录')
                        return
                    }
                    _this.$http.post(SERVERROOTDATA + "PayAttention.ashx?action=payAttention",
                        {
                            attentedId:teacherId,
                            userId:uId,
                            userType:userType,
                            attentedType:1
                        }
                        ,{emulateJSON: true})
                        .then(function (res) {
                            if(res.body.code==200){
                                $('.fefollow').addClass('active');
                                $('.fefollow button:first-child').html('<i class="uk-icon-check"></i>已关注');
                            }
                        })
                    // $(this).find('i').removeClass().addClass('uk-icon-check');

                });
                $('.femasterdetail').on('click','.fefollow button.cancel',function () {
                    // var my=$(this);
                    layer.confirm('你确定要取消关注吗？', {
                        title:'关注',
                        btn: ['确定','取消'] //按钮
                    }, function(){
                        var uId=$(window).storager({key: 'feUid'}).readStorage();
                        var userType=$(window).storager({key: 'feUType'}).readStorage();
                        _this.$http.post(SERVERROOTDATA + "PayAttention.ashx?action=cancelPayAttention",
                            {
                                attentedId:teacherId,
                                userId:uId,
                                userType:userType,
                                attentedType:1
                            }
                            ,{emulateJSON: true})
                            .then(function (res) {
                                if(res.body.code==200){
                                    $('.fefollow button:first-child').html('<i class="uk-icon-plus"></i>关注');
                                    $('.fefollow').removeClass('active');
                                }
                            });

                        layer.closeAll()
                    }, function(){
                    });
                });
            },
            getMasterDetailNav: function () {
                var _this = this;
                this.$http.post(SERVERROOTDATA + "Teacher.ashx?action=getTeacherInfoType",
                    {
                        teacherId:teacherId
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        _this.masterdetailnav = res.body;
                    }).then(function () {
                    $('.femasterdetail-nav a:first-child').addClass('active');
                    _this.toggleNavClick();
                })
            },
            getRecommendedCourses: function (pageIndex) {
                var _this = this;
                this.$http.post(SERVERROOTDATA + "Teacher.ashx?action=getTeacherRecommendCourse",
                    {
                        teacherId:teacherId,
                        teacherInfoTypeId:2,
                        pageIndex:pageIndex,
                        pageSize:4
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        if(res.body.rows.length < 1) {
                            _this.recommendedcoursesnodate=true;
                        } else {
                            _this.recommendedcourses =_this.recommendedcourses.concat(res.body.rows);
                            _this.recommendedcoursesnodate=false;
                        }
                        if(pageIndex >=res.body.totalPageCount){
                            _this.recommendedcoursesload=false;
                        }else{
                            _this.recommendedcoursesload=true;
                        }
                        _this.allcourse=res.body.totalCount;
                    })
            },
            getTeacherIntroduction: function () {
                var _this = this;
                this.$http.post(SERVERROOTDATA + "Teacher.ashx?action=getTeacherIntroduce",
                    {
                        teacherId:teacherId,
                        teacherInfoTypeId:1
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        _this.teacherintroduction =res.body;
                    })
            },
            // getPastNav:function () {
            //     var _this = this;
            //     this.$http.get(ROOTDATA + "masterdetail-passnav.json", {emulateJSON: true})
            //         .then(function (res) {
            //             _this.pastnav =res.body;
            //         }).then(function () {
            //         $('.fepastexperience>h1 span:first-child').addClass('active');
            //         $('.fepastexperience>h1').on('click','span',function () {
            //             $(this).siblings().removeClass('active');
            //             $(this).addClass('active');
            //         })
            //     })
            // },
            getPastExperience: function (experiencecurrent) {
                var _this = this;
                this.$http.post(SERVERROOTDATA + "Teacher.ashx?action=getTeacherExperience",
                    {
                        teacherId:teacherId,
                        teacherInfoTypeId:5,
                        pageIndex:experiencecurrent,
                        pageSize:2
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        if(res.body.rows.length < 1) {
                            _this.pastexperiencenodate=true;
                        } else {
                            _this.pastexperience.push(res.body.rows);
                            _this.pastexperiencenodate=false;
                        }
                        if(experiencecurrent >=res.body.totalPageCount){
                            _this.pastexperienceload=false;
                        }else{
                            _this.pastexperienceload=true;
                        }
                        // if(res.body.rows.length<1){
                        //     return false;
                        // }else{
                        //     _this.pastexperience.push(res.body.rows);
                        // }
                })
            },
            getCourseEvaluation: function (current) {
                var _this = this;
                this.$http.post(SERVERROOTDATA + "CourseEvaluation.ashx?action=getEvaluationByTeacherId",
                    {
                        teacherId:teacherId,
                        pageIndex:current,
                        pageSize:4
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        _this.courseevaluation =res.body.rows;
                        _this.allevaluation=res.body.totalCount;
                        _this.allpage=res.body.totalPageCount;
                    })
            },
            getRightNav: function () {
                var _this = this;
                this.$http.post(SERVERROOTDATA + "Teacher.ashx?action=getTeacherResourceStat",
                    {
                        teacherId:teacherId
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        _this.rightnav =res.body;
                    })
            },
            getRightResource: function () {
                var _this = this;
                this.$http.post(SERVERROOTDATA + "TeacherResource.ashx?action=getTeacherResource",
                    {
                        teacherId:teacherId,
                        resourceType:'all',
                        pageIndex:1,
                        pageSize:2
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        _this.rightresource =res.body.rows;
                        if( _this.rightresource.length<1){
                            _this.noresource=false;
                        }
                    }).then(function () {
                    $('.femasterdetail-right-resource h1>a').attr('href',ROOT+"teacherresource.html?teacherId="+teacherId)
                })
            },
            getRightPhotoVideo: function () {
                var _this = this;
                this.$http.post(SERVERROOTDATA + "TeacherResource.ashx?action=getTeacherVideoPhoto",
                    {
                        teacherId:teacherId,
                        teacherVideoPhotoType:'all',
                        pageIndex:1,
                        pageSize:6
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        _this.rightphotovideo =res.body.rows;
                        if( _this.rightphotovideo.length<1){
                            _this.nophoto=false;
                        }
                    }).then(function () {
                        $('.femasterdetail-right-photo h1>a').attr('href',ROOT+"teacherphoto.html?teacherId="+teacherId);
                        $('.femasterdetail-right-photo .fephoto').on('click','img',function () {
                            showPhoto($(this));
                        });
                        $('.femasterdetail-right-photo').on('click','.fevideo',function () {
                            var vid = $(this).data('id');
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
            toggleNavClick:function () {
                $('.femasterdetail-nav').on('click','a',function () {
                    $(this).siblings().removeClass('active');
                    $(this).addClass('active');
                })
            },
            recommendedCoursesLoadMore:function () {
                var _this=this;
                this.getRecommendedCourses(++_this.coursecurrent);
            },
            pastExperienceLoadMore:function () {
                var _this=this;
                this.getPastExperience(++_this.experiencecurrent);
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
                _this.getCourseEvaluation(_this.current);
            }
        }
    })
}
// 图片放大 缩小功能
function showPhoto(obj){
    var $pop=$("<div class='dycpop'><b>×</b><i class='uk-icon-minus'></i><s class='uk-icon-plus'></s></div>");
    // var src=$(obj).find('img').attr("src");
    var src=$(obj).attr("src");
    var pheight=$(window).height();
    var pwidth=$(window).width();
    var $img=$('<div style="width:'+ pwidth +'px;height:'+ pheight +'px;overflow: scroll;position: relative"><img src="'+ src +'"/></div>');
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
// 名师3级页面-课程页
function teacherindex_course(teacherId) {
    new Vue({
        el:"#femasterdetail-course",
        data:{
            teacher:[],//老师
            masterdetailnav:[],//导航栏
            recommendedcourses:[],//推荐课程
            rightnav:[],//右侧导航栏
            current:1,
            allcourse:'',//总课程数
            courseType:'all',//右侧导航栏切换id
            nodata:false,
            load:true
        },
        filters: {
            addRootNav:function addRootNav(newsId) {
                var url;
                switch (newsId){
                    case "1":
                        url="teacherindex.html?teacherId="+teacherId;
                        break;
                    case "2":
                        url="teachercourse.html?teacherId="+teacherId;
                        break;
                    case "3":
                        url="teacherresource.html?teacherId="+teacherId;
                        break;
                    case "4":
                        url="teacherphoto.html?teacherId="+teacherId;
                        break;
                    case "5":
                        url="teacherrecord.html?teacherId="+teacherId;
                        break;
                    default:
                        break;
                }
                return ROOT+url;
            },
            addRoot: function addRoot(newsId,rType,kType,liveType) {
                if(liveType=='under'){
                    return ROOT + "undercoursedetail.html?courseId=" + newsId;
                }
                if(rType==0){
                    if(kType==0){
                        return ROOT + "coursedetail.html?courseId=" + newsId;
                    }else{
                        return ROOT + "coursedetail.html?courseId=" + newsId +"&courseKind=1";
                    }
                }else{
                    if(kType==0){
                        return ROOT + "cloundcoursedetail.html?courseId=" + newsId;
                    }else{
                        return ROOT + "cloundcoursedetail.html?courseId=" + newsId +"&courseKind=1";
                    }
                }
            },
            addCloundRoot: function addCloundRoot(newsId) {
                return ROOT + "cloundcoursedetail.html?courseId=" + newsId;
            },
            addRootFile: function addRootFile(img) {
                return SERVERROOTFILE + img;
            },
            addMoneySign:function addMoneySign(obj) {
                return obj=="0.00"? "免费":"¥"+obj;
            },
            addCourseType:function addCourseType(type) {
                switch (type){
                    case 'record':
                        return "视频课";
                        break;
                    case 'live':
                        return "直播课";
                        break;
                    case 'oneToOne':
                        return "1对1";
                        break;
                    case 'public':
                        return "公开课";
                        break;
                    case 'under':
                        return "线下课";
                        break;
                }
            },
            goToSchool:function goToSchool(id) {
                return ROOT + "schoolindex.html?organId=" + id;
            }
        },
        mounted:function () {
            var _this=this;
            this.$nextTick(function () {
                _this.getTeacher(teacherId);
                _this.bindFollow();
                _this.getMasterDetailNav();
                _this.getRecommendedCourses(_this.current,_this.courseType);
                _this.getRightNav();
            })
        },
        methods: {
            getTeacher:function (teacherId) {
                var uId=$(window).storager({key: 'feUid'}).readStorage();
                var userType=$(window).storager({key: 'feUType'}).readStorage();
                var _this = this;
                this.$http.post(SERVERROOTDATA + "Teacher.ashx?action=getTeacherById",
                    {
                        teacherId:teacherId,
                        userId:uId,
                        userType:userType
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        _this.teacher = res.body;
                    }).then(function () {
                    if(_this.teacher[0].hasFocused==1){
                        $('.fefollow').addClass('active');
                        $('.fefollow button:first-child').html('<i class="uk-icon-check"></i>已关注');
                    }
                    $(document).attr("title",$('.femasterdetail-head h1').text()+"老师主页—福建教育网");
                })
            },
            bindFollow:function () {
                var _this=this;
                $('.femasterdetail').on('click','.fefollow button:first-child',function () {
                    if($(this).parent().hasClass('active')){
                        return
                    }
                    var uId=$(window).storager({key: 'feUid'}).readStorage();
                    var userType=$(window).storager({key: 'feUType'}).readStorage();
                    if(uId==undefined||uId==''||uId=='undefined'){
                        layer.msg('请先登录')
                        return
                    }
                    _this.$http.post(SERVERROOTDATA + "PayAttention.ashx?action=payAttention",
                        {
                            attentedId:teacherId,
                            userId:uId,
                            userType:userType,
                            attentedType:1
                        }
                        ,{emulateJSON: true})
                        .then(function (res) {
                            if(res.body.code==200){
                                $('.fefollow').addClass('active');
                                $('.fefollow button:first-child').html('<i class="uk-icon-check"></i>已关注');
                            }
                        })
                    // $(this).find('i').removeClass().addClass('uk-icon-check');

                });
                $('.femasterdetail').on('click','.fefollow button.cancel',function () {
                    // var my=$(this);
                    layer.confirm('你确定要取消关注吗？', {
                        title:'关注',
                        btn: ['确定','取消'] //按钮
                    }, function(){
                        var uId=$(window).storager({key: 'feUid'}).readStorage();
                        var userType=$(window).storager({key: 'feUType'}).readStorage();
                        _this.$http.post(SERVERROOTDATA + "PayAttention.ashx?action=cancelPayAttention",
                            {
                                attentedId:teacherId,
                                userId:uId,
                                userType:userType,
                                attentedType:1
                            }
                            ,{emulateJSON: true})
                            .then(function (res) {
                                if(res.body.code==200){
                                    $('.fefollow button:first-child').html('<i class="uk-icon-plus"></i>关注');
                                    $('.fefollow').removeClass('active');
                                }
                            });

                        layer.closeAll()
                    }, function(){
                    });
                });
            },
            getMasterDetailNav: function () {
                var _this = this;
                this.$http.post(SERVERROOTDATA + "Teacher.ashx?action=getTeacherInfoType",
                    {
                        teacherId:teacherId
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        _this.masterdetailnav = res.body;
                    }).then(function () {
                    $('.femasterdetail-nav a:nth-child(2)').addClass('active');
                    _this.toggleNavClick();
                })
            },
            getRecommendedCourses: function (pageIndex,courseType) {
                var _this = this;
                this.$http.post(SERVERROOTDATA + "Course.ashx?action=getTeacherCourse",
                    {
                        teacherId:teacherId,
                        courseType:courseType,
                        pageIndex:pageIndex,
                        pageSize:4
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        if(res.body.rows.length < 1) {
                            _this.nodata=true;
                        } else {
                            _this.recommendedcourses =_this.recommendedcourses.concat(res.body.rows);
                            _this.nodata=false;
                        }
                        if(pageIndex >=res.body.totalPageCount){
                            _this.load=false;
                        }else{
                            _this.load=true;
                        }
                        _this.allcourse=res.body.totalCount;
                    })
            },
            getRightNav: function () {
                var _this = this;
                this.$http.post(SERVERROOTDATA + "Teacher.ashx?action=getTeacherCourseType",
                    {
                        teacherId:teacherId
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        _this.rightnav = res.body;
                    }).then(function () {
                        $('.femasterdetail-allcourse li:first-child').addClass('active');
                        $('.femasterdetail-allcourse').on('click','li',function () {
                            if($(this).hasClass('active')){
                                return
                            }
                            $(this).siblings().removeClass('active');
                            $(this).addClass('active');
                            var title=$(this).text().split(' ')[0];
                            console.log(title)
                            $('.ferecommendedcourses h1>b').html(title);

                            _this.courseType=$(this).data('id');
                            _this.current=1;
                            _this.recommendedcourses=[];
                            _this.getRecommendedCourses(_this.current,_this.courseType);
                        })
                })
            },
            toggleNavClick:function () {
                $('.femasterdetail-nav').on('click','a',function () {
                    $(this).siblings().removeClass('active');
                    $(this).addClass('active');
                })
            },
            recommendedCoursesLoadMore:function () {
                var _this=this;
                this.getRecommendedCourses(++_this.current,_this.courseType);
            }
        }
    })
}
// 名师3级页面-资源页
function teacherindex_resource(teacherId) {
    new Vue({
        el:"#femasterdetail_resource",
        data:{
            teacher:[],//老师
            masterdetailnav:[],//导航栏
            leftresource:[],//资源显示
            rightnav:[],//右侧导航栏
            resourceType:"article",//默认文章
            current:1,
            nodata:false,
            load:true
        },
        filters: {
            addRootNav:function addRootNav(newsId) {
                var url;
                switch (newsId){
                    case "1":
                        url="teacherindex.html?teacherId="+teacherId;
                        break;
                    case "2":
                        url="teachercourse.html?teacherId="+teacherId;
                        break;
                    case "3":
                        url="teacherresource.html?teacherId="+teacherId;
                        break;
                    case "4":
                        url="teacherphoto.html?teacherId="+teacherId;
                        break;
                    case "5":
                        url="teacherrecord.html?teacherId="+teacherId;
                        break;
                    default:
                        break;
                }
                return ROOT+url;
            },
            addRoot: function addRoot(newsId) {
                return ROOT + "articledetail.html?articleId=" + newsId+"&teacherId="+teacherId;
            },
            downRoot: function downRoot(url) {
                return SERVERROOTFILE  + url;
            },
            addRootFile: function addRootFile(img) {
                return SERVERROOTFILE + img;
            },
            goToSchool:function goToSchool(id) {
                return ROOT + "schoolindex.html?organId=" + id;
            }
        },
        mounted:function () {
            var _this=this;
            this.$nextTick(function () {
                _this.getTeacher(teacherId);
                _this.bindFollow();
                _this.getMasterDetailNav();
                _this.getLeftResource(_this.resourceType,_this.current);
                _this.getRightNav();
            })
        },
        methods: {
            getTeacher:function (teacherId) {
                var uId=$(window).storager({key: 'feUid'}).readStorage();
                var userType=$(window).storager({key: 'feUType'}).readStorage();
                var _this = this;
                this.$http.post(SERVERROOTDATA + "Teacher.ashx?action=getTeacherById",
                    {
                        teacherId:teacherId,
                        userId:uId,
                        userType:userType
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        _this.teacher = res.body;
                    }).then(function () {
                    if(_this.teacher[0].hasFocused==1){
                        $('.fefollow').addClass('active');
                        $('.fefollow button:first-child').html('<i class="uk-icon-check"></i>已关注');
                    }
                    $(document).attr("title",$('.femasterdetail-head h1').text()+"老师主页—福建教育网");
                })
            },
            bindFollow:function () {
                var _this=this;
                $('.femasterdetail').on('click','.fefollow button:first-child',function () {
                    if($(this).parent().hasClass('active')){
                        return
                    }
                    var uId=$(window).storager({key: 'feUid'}).readStorage();
                    var userType=$(window).storager({key: 'feUType'}).readStorage();
                    if(uId==undefined||uId==''||uId=='undefined'){
                        layer.msg('请先登录')
                        return
                    }
                    _this.$http.post(SERVERROOTDATA + "PayAttention.ashx?action=payAttention",
                        {
                            attentedId:teacherId,
                            userId:uId,
                            userType:userType,
                            attentedType:1
                        }
                        ,{emulateJSON: true})
                        .then(function (res) {
                            if(res.body.code==200){
                                $('.fefollow').addClass('active');
                                $('.fefollow button:first-child').html('<i class="uk-icon-check"></i>已关注');
                            }
                        })
                    // $(this).find('i').removeClass().addClass('uk-icon-check');

                });
                $('.femasterdetail').on('click','.fefollow button.cancel',function () {
                    // var my=$(this);
                    layer.confirm('你确定要取消关注吗？', {
                        title:'关注',
                        btn: ['确定','取消'] //按钮
                    }, function(){
                        var uId=$(window).storager({key: 'feUid'}).readStorage();
                        var userType=$(window).storager({key: 'feUType'}).readStorage();
                        _this.$http.post(SERVERROOTDATA + "PayAttention.ashx?action=cancelPayAttention",
                            {
                                attentedId:teacherId,
                                userId:uId,
                                userType:userType,
                                attentedType:1
                            }
                            ,{emulateJSON: true})
                            .then(function (res) {
                                if(res.body.code==200){
                                    $('.fefollow button:first-child').html('<i class="uk-icon-plus"></i>关注');
                                    $('.fefollow').removeClass('active');
                                }
                            });

                        layer.closeAll()
                    }, function(){
                    });
                });
            },
            getMasterDetailNav: function () {
                var _this = this;
                this.$http.post(SERVERROOTDATA + "Teacher.ashx?action=getTeacherInfoType",
                    {
                        teacherId:teacherId
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        _this.masterdetailnav = res.body;
                    }).then(function () {
                    $('.femasterdetail-nav a:nth-child(3)').addClass('active');
                    _this.toggleNavClick();
                })
            },
            getLeftResource: function (resourceType,pageIndex) {
                var _this = this;
                this.$http.post(SERVERROOTDATA + "TeacherResource.ashx?action=getTeacherResource",
                    {
                        teacherId:teacherId,
                        resourceType:resourceType,
                        pageIndex:pageIndex,
                        pageSize:5
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        if(res.body.rows.length < 1) {
                            _this.nodata=true;
                        } else {
                            _this.leftresource =_this.leftresource.concat(res.body.rows);
                            _this.nodata=false;
                        }
                        if(pageIndex >=res.body.totalPageCount){
                            _this.load=false;
                        }else{
                            _this.load=true;
                        }
                    })
            },
            getRightNav: function () {
                var _this = this;
                this.$http.post(SERVERROOTDATA + "Teacher.ashx?action=getTeacherResourceType",
                    {
                        teacherId:teacherId
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        _this.rightnav = res.body;
                        console.log(_this.rightnav);
                    }).then(function () {
                    $('.femasterdetail-allresource').on('click','li',function () {
                        var id=$(this).data('id');
                        $(this).siblings().removeClass('active');
                        $(this).addClass('active');
                        _this.current=1;
                        _this.resourceType=id;
                        _this.leftresource=[];
                        _this.getLeftResource(_this.resourceType,_this.current);
                    })
                    $('.femasterdetail-allresource li:first-child').addClass('active');
                })
            },
            toggleNavClick:function () {
                $('.femasterdetail-nav').on('click','a',function () {
                    $(this).siblings().removeClass('active');
                    $(this).addClass('active');
                })
            },
            resourceLoadMore:function () {
                var _this=this;
                this.getLeftResource(_this.resourceType,++_this.current);
            },
            addReadCount:function (articleId) {
                var _this = this;
                this.$http.post(SERVERROOTDATA + "Article.ashx?action=updateClickCount",
                    {
                        articleId:articleId
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        console.log(111);
                    })
            },
            addDownloadRecord:function (id,url) {//下载保存记录
                var _this = this;
                var studentId=$(window).storager({key: 'feUid'}).readStorage();
                var userType=$(window).storager({key: 'feUType'}).readStorage();
                if(studentId==null||studentId==undefined||studentId=='undefined'){
                    layer.msg('请先登录');
                    setTimeout(function () {
                        window.location.href = ROOT+"login.html";
                    },1000);
                    return;
                }
                var uType='';
                if(userType==1){
                    uType='student';
                }else if(userType==2){
                    uType='parent';
                }else if(userType==3){
                    uType='teacher';
                }
                this.$http.post(SERVERROOTDATA + "ResourceDownload.ashx?action=resourceDownloadSave",
                    {
                        userId:studentId,
                        userType:uType,
                        saveTag:'add',
                        studioResourceId:id
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {});
                var form=$("<form>");//定义一个form表单
                form.attr("style","display:none");
                form.attr("target","");
                form.attr("method","get");  //请求类型
                form.attr("action",SERVERROOTFILE + url);   //请求地址
                $("body").append(form);//将表单放置在web中
                form.submit();//表单提交
            }
        }
    })
}
// 名师3级页面-视频/照片
function teacherindex_photo(teacherId) {
    new Vue({
        el:"#femasterdetail_photo",
        data:{
            teacher:[],//老师
            masterdetailnav:[],//导航栏
            vedioArr:[],//视频
            photoArr:[],//图片
            vediocurrent:1,
            photocurrent:1,
            allvedionum:0,
            allphotonum:0,
            vedionodata:false,
            vedioload:true,
            photonodata:false,
            photoload:true
        },
        filters: {
            addRootNav:function addRootNav(newsId) {
                var url;
                switch (newsId){
                    case "1":
                        url="teacherindex.html?teacherId="+teacherId;
                        break;
                    case "2":
                        url="teachercourse.html?teacherId="+teacherId;
                        break;
                    case "3":
                        url="teacherresource.html?teacherId="+teacherId;
                        break;
                    case "4":
                        url="teacherphoto.html?teacherId="+teacherId;
                        break;
                    case "5":
                        url="teacherrecord.html?teacherId="+teacherId;
                        break;
                    default:
                        break;
                }
                return ROOT+url;
            },
            addRoot: function addRoot(newsId) {
                return ROOT + "coursedetail.html?courseId=" + newsId;
            },
            addRootFile: function addRootFile(img) {
                return SERVERROOTFILE + img;
            },
            goToSchool:function goToSchool(id) {
                return ROOT + "schoolindex.html?organId=" + id;
            }
        },
        mounted:function () {
            var _this=this;
            this.$nextTick(function () {
                _this.getTeacher(teacherId);
                _this.bindFollow();
                _this.getMasterDetailNav();
                _this.getVedioList(_this.vediocurrent);
                _this.getPhotoList(_this.photocurrent);
            })
        },
        methods: {
            getTeacher:function (teacherId) {
                var uId=$(window).storager({key: 'feUid'}).readStorage();
                var userType=$(window).storager({key: 'feUType'}).readStorage();
                var _this = this;
                this.$http.post(SERVERROOTDATA + "Teacher.ashx?action=getTeacherById",
                    {
                        teacherId:teacherId,
                        userId:uId,
                        userType:userType
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        _this.teacher = res.body;
                    }).then(function () {
                    if(_this.teacher[0].hasFocused==1){
                        $('.fefollow').addClass('active');
                        $('.fefollow button:first-child').html('<i class="uk-icon-check"></i>已关注');
                    }
                    $(document).attr("title",$('.femasterdetail-head h1').text()+"老师主页—福建教育网");
                })
            },
            bindFollow:function () {
                var _this=this;
                $('.femasterdetail').on('click','.fefollow button:first-child',function () {
                    if($(this).parent().hasClass('active')){
                        return
                    }
                    var uId=$(window).storager({key: 'feUid'}).readStorage();
                    var userType=$(window).storager({key: 'feUType'}).readStorage();
                    if(uId==undefined||uId==''||uId=='undefined'){
                        layer.msg('请先登录')
                        return
                    }
                    _this.$http.post(SERVERROOTDATA + "PayAttention.ashx?action=payAttention",
                        {
                            attentedId:teacherId,
                            userId:uId,
                            userType:userType,
                            attentedType:1
                        }
                        ,{emulateJSON: true})
                        .then(function (res) {
                            if(res.body.code==200){
                                $('.fefollow').addClass('active');
                                $('.fefollow button:first-child').html('<i class="uk-icon-check"></i>已关注');
                            }
                        })
                    // $(this).find('i').removeClass().addClass('uk-icon-check');

                });
                $('.femasterdetail').on('click','.fefollow button.cancel',function () {
                    // var my=$(this);
                    layer.confirm('你确定要取消关注吗？', {
                        title:'关注',
                        btn: ['确定','取消'] //按钮
                    }, function(){
                        var uId=$(window).storager({key: 'feUid'}).readStorage();
                        var userType=$(window).storager({key: 'feUType'}).readStorage();
                        _this.$http.post(SERVERROOTDATA + "PayAttention.ashx?action=cancelPayAttention",
                            {
                                attentedId:teacherId,
                                userId:uId,
                                userType:userType,
                                attentedType:1
                            }
                            ,{emulateJSON: true})
                            .then(function (res) {
                                if(res.body.code==200){
                                    $('.fefollow button:first-child').html('<i class="uk-icon-plus"></i>关注');
                                    $('.fefollow').removeClass('active');
                                }
                            });

                        layer.closeAll()
                    }, function(){
                    });
                });
            },
            getMasterDetailNav: function () {
                var _this = this;
                this.$http.post(SERVERROOTDATA + "Teacher.ashx?action=getTeacherInfoType",
                    {
                        teacherId:teacherId
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        _this.masterdetailnav = res.body;
                    }).then(function () {
                    $('.femasterdetail-nav a:nth-child(4)').addClass('active');
                    _this.toggleNavClick();
                })
            },
            getVedioList:function (pageIndex) {
                var _this = this;
                this.$http.post(SERVERROOTDATA + "TeacherResource.ashx?action=getTeacherVideoPhoto",
                    {
                        teacherId:teacherId,
                        teacherVideoPhotoType:'video',
                        pageIndex:pageIndex,
                        pageSize:8
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        if(res.body.rows.length < 1) {
                            _this.vedionodata=true;
                        } else {
                            _this.vedioArr = _this.vedioArr.concat(res.body.rows);
                            _this.vedionodata=false;
                        }
                        if(pageIndex >=res.body.totalPageCount){
                            _this.vedioload=false;
                        }else{
                            _this.vedioload=true;
                        }
                        _this.allvedionum=res.body.totalCount;
                    }).then(function () {
                        $('.fevediodetail .feimage').on('click','a',function () {
                            var vid = $(this).data('id');
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
            getPhotoList:function (pageIndex) {
                var _this = this;
                this.$http.post(SERVERROOTDATA + "TeacherResource.ashx?action=getTeacherVideoPhoto",
                    {
                        teacherId:teacherId,
                        teacherVideoPhotoType:'photo',
                        pageIndex:pageIndex,
                        pageSize:8
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        if(res.body.rows.length < 1) {
                            _this.photonodata=true;
                        } else {
                            _this.photoArr = _this.photoArr.concat(res.body.rows);
                            console.log(_this.photoArr);
                            _this.photonodata=false;
                        }
                        if(pageIndex >=res.body.totalPageCount){
                            _this.photoload=false;
                        }else{
                            _this.photoload=true;
                        }
                        _this.allphotonum=res.body.totalCount;
                    }).then(function () {
                        $('.fephotodetail .fepanel ').on('click','.feimage',function () {
                            showPhoto($(this).find('img'));
                        })
                })
            },
            toggleNavClick:function () {
                $('.femasterdetail-nav').on('click','a',function () {
                    $(this).siblings().removeClass('active');
                    $(this).addClass('active');
                })
            },
            vedioLoadMore:function () {
                var _this=this;
                this.getVedioList(++_this.vediocurrent);
            },
            photoLoadMore:function () {
                var _this=this;
                this.getPhotoList(++_this.photocurrent);
            }
        }
    })
}
// 名师3级页面-履历
function teacherindex_record(teacherId) {
    new Vue({
        el:"#femasterdetail_record",
        data:{
            nodata:false,
            load:true,
            current:1,
            teacher:[],//老师
            masterdetailnav:[],//导航栏
            relevantcase:[],//相关案例
            teacherintroduction:[],//老师介绍
            pastthings:[]//过往案例
        },
        filters: {
            addRootNav:function addRootNav(newsId) {
                var url;
                switch (newsId){
                    case "1":
                        url="teacherindex.html?teacherId="+teacherId;
                        break;
                    case "2":
                        url="teachercourse.html?teacherId="+teacherId;
                        break;
                    case "3":
                        url="teacherresource.html?teacherId="+teacherId;
                        break;
                    case "4":
                        url="teacherphoto.html?teacherId="+teacherId;
                        break;
                    case "5":
                        url="teacherrecord.html?teacherId="+teacherId;
                        break;
                    default:
                        break;
                }
                return ROOT+url;
            },
            addRoot: function addRoot(newsId) {
                return ROOT + "teacherindex.html?newsId=" + newsId;
            },
            addRootFile: function addRootFile(img) {
                return SERVERROOTFILE + img;
            },
            goToSchool:function goToSchool(id) {
                return ROOT + "schoolindex.html?organId=" + id;
            }
        },
        mounted:function () {
            var _this=this;
            this.$nextTick(function () {
                _this.getTeacher(teacherId);
                _this.bindFollow();
                _this.getMasterDetailNav();
                _this.getTeacherIntroduction();
                _this.getPastThings(_this.current);
                _this.getRelevantCase();
            })
        },
        methods: {
            getTeacher:function (teacherId) {
                var uId=$(window).storager({key: 'feUid'}).readStorage();
                var userType=$(window).storager({key: 'feUType'}).readStorage();
                var _this = this;
                this.$http.post(SERVERROOTDATA + "Teacher.ashx?action=getTeacherById",
                    {
                        teacherId:teacherId,
                        userId:uId,
                        userType:userType
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        _this.teacher = res.body;
                    }).then(function () {
                    if(_this.teacher[0].hasFocused==1){
                        $('.fefollow').addClass('active');
                        $('.fefollow button:first-child').html('<i class="uk-icon-check"></i>已关注');
                    }
                    $(document).attr("title",$('.femasterdetail-head h1').text()+"老师主页—福建教育网");
                })
            },
            bindFollow:function () {
                var _this=this;
                $('.femasterdetail').on('click','.fefollow button:first-child',function () {
                    if($(this).parent().hasClass('active')){
                        return
                    }
                    var uId=$(window).storager({key: 'feUid'}).readStorage();
                    var userType=$(window).storager({key: 'feUType'}).readStorage();
                    if(uId==undefined||uId==''||uId=='undefined'){
                        layer.msg('请先登录')
                        return
                    }
                    _this.$http.post(SERVERROOTDATA + "PayAttention.ashx?action=payAttention",
                        {
                            attentedId:teacherId,
                            userId:uId,
                            userType:userType,
                            attentedType:1
                        }
                        ,{emulateJSON: true})
                        .then(function (res) {
                            if(res.body.code==200){
                                $('.fefollow').addClass('active');
                                $('.fefollow button:first-child').html('<i class="uk-icon-check"></i>已关注');
                            }
                        })
                    // $(this).find('i').removeClass().addClass('uk-icon-check');

                });
                $('.femasterdetail').on('click','.fefollow button.cancel',function () {
                    // var my=$(this);
                    layer.confirm('你确定要取消关注吗？', {
                        title:'关注',
                        btn: ['确定','取消'] //按钮
                    }, function(){
                        var uId=$(window).storager({key: 'feUid'}).readStorage();
                        var userType=$(window).storager({key: 'feUType'}).readStorage();
                        _this.$http.post(SERVERROOTDATA + "PayAttention.ashx?action=cancelPayAttention",
                            {
                                attentedId:teacherId,
                                userId:uId,
                                userType:userType,
                                attentedType:1
                            }
                            ,{emulateJSON: true})
                            .then(function (res) {
                                if(res.body.code==200){
                                    $('.fefollow button:first-child').html('<i class="uk-icon-plus"></i>关注');
                                    $('.fefollow').removeClass('active');
                                }
                            });

                        layer.closeAll()
                    }, function(){
                    });
                });
            },
            getMasterDetailNav: function () {
                var _this = this;
                this.$http.post(SERVERROOTDATA + "Teacher.ashx?action=getTeacherInfoType",
                    {
                        teacherId:teacherId
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        _this.masterdetailnav = res.body;
                    }).then(function () {
                    $('.femasterdetail-nav a:nth-child(5)').addClass('active');
                    _this.toggleNavClick();
                })
            },
            //老师介绍
            getTeacherIntroduction: function () {
                var _this = this;
                this.$http.post(SERVERROOTDATA + "Teacher.ashx?action=getTeacherIntroduceById",
                    {
                        teacherId:teacherId
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        _this.teacherintroduction = res.body;
                    })
            },
            // 过往案例
            getPastThings: function (current) {
                var _this = this;
               // this.$http.post(SERVERROOTDATA + "TeachingProcess.ashx?action=getTeachingProcessByTeacherId",
                this.$http.post(SERVERROOTDATA + "Teacher.ashx?action=getTeacherExperience",
                    {
                        teacherId:teacherId,
                        pageIndex:current,
                        pageSize:5,
                        teacherInfoTypeId:5
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        if(res.body.rows.length < 1) {
                            _this.nodata=true;
                        } else {
                            _this.pastthings =_this.pastthings.concat(res.body.rows);
                            _this.nodata=false;
                        }
                        if(current >=res.body.totalPageCount){
                            _this.load=false;
                        }else{
                            _this.load=true;
                        }
                    })
            },
            pastThingLoadMore:function () {
                this.getPastThings(++this.current);
            },
            // 相关案例
            getRelevantCase: function () {
                var _this = this;
                this.$http.get(ROOTDATA + "teacherindex-record-2.json", {emulateJSON: true})
                    .then(function (res) {
                        _this.relevantcase = res.body;
                        // console.log(_this.relevantcase);
                    }).then(function () {
                        //瀑布流排版
                        for(var i=0;i<_this.relevantcase.length;i++){
                            var $div=$('<div class="item"></div>');
                            $div.append('<h3>'+_this.relevantcase[i].title+'</h3>');
                            $div.append('<h4>'+_this.relevantcase[i].time+'</h4>');
                            $div.append('<p>'+_this.relevantcase[i].text+'</p>');
                            $('#masonry').append($div);
                        }
                        var $container = $('#masonry');
                        $container.imagesLoaded(function() {
                            $container.masonry({
                                itemSelector: '.item',
                                gutter: 0,
                                isAnimated: true,
                            });
                        });
                })
            },
            toggleNavClick:function () {
                $('.femasterdetail-nav').on('click','a',function () {
                    $(this).siblings().removeClass('active');
                    $(this).addClass('active');
                })
            }
        }
    })
}
// 学校课程
function schoolcourse(organId,type) {
    new Vue({
        el:"#fecoursedetail",
        data:{
            current: 1, //当前页
            showItem: 6,//显示条数
            allpage: '', //总页码
            courselist:[],
            allnav:[],//全部课程选择栏
            gradeArr:[],//年级
            subjectArr:[],//学科
            hotcourseArr:[],//右侧热门教程
            recommendedcourses:[],//推荐课程
            rankingPosition:[-106,-139,-173,-208,-244,-280],//排名图标坐标
            //筛选条件初始化
            gradeId:'',
            subjectId:'',
            orderName:'colligate',
            ascType:'asc',
            recordType:-1,
            courseKind:0,
            shape:type// 形式
        },
        filters: {
            addRoot: function addRoot(newsId,kid) {
                if(kid==1){
                    return ROOT + "coursedetail.html?courseId=" + newsId + "&courseKind=" +kid;
                }else{
                    return ROOT + "coursedetail.html?courseId=" + newsId;
                }
            },
            addCloundRoot:function addCloundRoot(cid){
            	return ROOT + "cloundcoursedetail.html?courseId=" + cid;
            },
            addSchoolRoot:function addSchoolRoot(newsId) {
                return ROOT + "schoolindex.html?organId=" + newsId;
            },
            addUnderCourse:function addUnderCourse(id) {
                return ROOT + "undercoursedetail.html?courseId=" + id;
            },
            addRootFile: function addRootFile(img) {
                return SERVERROOTFILE + img;
            },
            addMoneySign:function addMoneySign(obj) {
                return "¥"+obj;
            },
            goToVideo:function goToVideo(cid,vid,type) {
                return ROOT + "courseplayer.html?cid=" + cid + "&vid=" +vid + '&courseType='+type;
            }
        },
        mounted:function () {
            var _this=this;
            this.$nextTick(function () {
                _this.adclick();
                _this.getSelectlist();
                _this.getCourseList(_this.gradeId,_this.subjectId,_this.current,_this.orderName,_this.ascType,_this.recordType,_this.courseKind,_this.shape);
                _this.getHotCourse('1');//默认为免费
                _this.getRecommendedCourses();
                _this.addBindSort();
                _this.toggleRankingList();
                _this.changeRecordType();
                _this.isWeike();
                _this.shapeSelect();
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
            shapeSelect:function () {
                var _this=this;
                if(type==0){
                    $('.feshape li:first-child').addClass('active');
                }else{
                    $('.feshape li:last-child').addClass('active');
                }
                $('.feshape').on('click','li',function () {
                    _this.shape=$(this).data('id');
                    $(this).siblings().removeClass('active');
                    $(this).addClass('active');
                    _this.current=1;
                    _this.getCourseList(_this.gradeId,_this.subjectId,_this.current,_this.orderName,_this.ascType,_this.recordType,_this.courseKind,_this.shape);
                })
            },
            isWeike:function () {
                var _this=this;
                $('.fecoursedetailnav').on('change','#isWeike',function () {
                    // console.log("dad");
                    // console.log($(this).prop('checked'))
                    if($(this).prop('checked')==true){
                        _this.courseKind=1;
                    }else{
                        _this.courseKind=0;
                    }
                    _this.current=1;
                    _this.getCourseList(_this.gradeId,_this.subjectId,_this.current,_this.orderName,_this.ascType,_this.recordType,_this.courseKind,_this.shape);
                })
            },
            changeRecordType:function () {
                var _this=this;
                $('.fecoursedetailselect').on('click','.ferecord li',function () {
                    if($(this).hasClass('active')){
                        return;
                    }
                    $(this).siblings().removeClass('active');
                    $(this).addClass('active');
                    _this.recordType=$(this).data('id');
                    _this.current=1;
                    _this.getCourseList(_this.gradeId,_this.subjectId,_this.current,_this.orderName,_this.ascType,_this.recordType,_this.courseKind,_this.shape);
                })
            },
            // 广告关闭
            adclick:function () {
                $('.fecourselistad').on('click','span',function () {
                    $('.fecourselistad').slideUp(300);
                })
            },
            getSelectlist:function () {
                var _this = this;
                // 年级
                this.$http.post(SERVERROOTDATA + "Grade.ashx?action=getGrade",{organId:organId},{emulateJSON: true})
                    .then(function (res) {
                        _this.gradeArr = res.body;
                    }).then(function () {
                        $('.fegrade').on('click','li',function () {
                            _this.gradeId=$(this).data('id');
                            _this.subjectId='';
                            $('.fesubject li').removeClass('active');
                            $(this).siblings().removeClass('active');
                            $(this).addClass('active');
                            // 已选项显示栏操作
                            $('.fetitle .d1').html($(this).html());
                            $('.fetitle .d2').html('');
                            _this.$http.post(SERVERROOTDATA + "Subject.ashx?action=getSubject",
                                {
                                    gradeId:$(this).data('id'),
                                    organId:organId
                                },
                                {emulateJSON: true})
                                .then(function (res) {
                                    _this.subjectArr = res.body;
                                })
                            _this.current=1;
                            _this.getCourseList(_this.gradeId,_this.subjectId,_this.current,_this.orderName,_this.ascType,_this.recordType,_this.courseKind,_this.shape);
                        })
                })
                // 学科
                this.$http.post(SERVERROOTDATA + "Subject.ashx?action=getSubject",
                    {
                        gradeId:$(this).data('id')==undefined ? '':$(this).data('id'),
                        organId:organId
                    },
                    {emulateJSON: true})
                    .then(function (res) {
                        _this.subjectArr = res.body;
                    }).then(function () {
                        $('.fesubject').on('click','li',function () {
                            $(this).siblings().removeClass('active');
                            $(this).addClass('active');
                            $('.fetitle .d2').html($(this).html());
                        })
                })
            },
            getsubject:function (p) {//绑定学科 点击按钮
                var _this=this;
                _this.subjectId=p;
                _this.current=1;
                _this.getCourseList(_this.gradeId,_this.subjectId,_this.current,_this.orderName,_this.ascType,_this.recordType,_this.courseKind,_this.shape);
            },
            // 获取列表
            getCourseList: function (gradeId,subjectId,pageIndex,orderName,ascType,recordType,courseKind,type) {
                var _this = this;
                if(type==''||type==undefined||type=='undefined'||type==0){
                    this.$http.post(SERVERROOTDATA + "Course.ashx?action=getCourseListByQuery",
                        {
                            organId:organId,
                            gradeId:gradeId,
                            subjectId:subjectId,
                            pageIndex:pageIndex,
                            orderName:orderName,
                            ascType:ascType,
                            pageSize:12,
                            recordType:recordType,
                            courseKind:courseKind
                        }
                        ,{emulateJSON: true})
                        .then(function (res) {
                            _this.courselist = res.body.rows;
                            _this.allpage = res.body.totalPageCount;
                            if(res.body.totalPageCount==0){
                                _this.allpage=1;
                            }
                            // console.log(_this.courselist);
                        })
                }else{
                    this.$http.post(SERVERROOTDATA + "Course.ashx?action=getOrganUnderCourseListByQuery",
                        {
                            organId:organId,
                            gradeId:gradeId,
                            subjectId:subjectId,
                            pageIndex:pageIndex,
                            orderName:orderName,
                            ascType:ascType,
                            pageSize:12,
                            recordType:recordType,
                            courseKind:courseKind
                        }
                        ,{emulateJSON: true})
                        .then(function (res) {
                            _this.courselist = res.body.rows;
                            _this.allpage = res.body.totalPageCount;
                            if(res.body.totalPageCount==0){
                                _this.allpage=1;
                            }
                            // console.log(_this.courselist);
                        })
                }

            },
            // 分类按钮绑定
            addBindSort:function () {
                var _this=this;
                $('.fecoursedetailnav .fesortall').addClass('active');
                // 综合排序
                $('.fecoursedetailnav').on('click','.fesortall',function () {
                    $('.fecoursedetailnav .fesortprice').removeClass('active');
                    $('.fecoursedetailnav .fesortrenqi').removeClass('active');
                    $(this).addClass('active');
                    _this.current=1;
                    _this.orderName='colligate';
                    _this.getCourseList(_this.gradeId,_this.subjectId,_this.current,_this.orderName,_this.ascType,_this.recordType,_this.courseKind,_this.shape);
                })
                // 价格排序
                $('.fecoursedetailnav').on('click','.fesortprice',function () {
                    $('.fecoursedetailnav .fesortall').removeClass('active');
                    $('.fecoursedetailnav .fesortrenqi').removeClass('active');
                    $(this).addClass('active');
                    var dom=$(this).children('i');
                    if(dom.hasClass('uk-icon-long-arrow-down')){
                        dom.removeClass();
                        dom.addClass('uk-icon-long-arrow-up');
                        //按价格升序
                        _this.current=1;
                        _this.orderName='price';
                        _this.ascType='asc';
                        _this.getCourseList(_this.gradeId,_this.subjectId,_this.current,_this.orderName,_this.ascType,_this.recordType,_this.courseKind,_this.shape);
                    }else{
                        dom.removeClass();
                        dom.addClass('uk-icon-long-arrow-down');
                        //按价格降序
                        _this.current=1;
                        _this.orderName='price';
                        _this.ascType='desc';
                        _this.getCourseList(_this.gradeId,_this.subjectId,_this.current,_this.orderName,_this.ascType,_this.recordType,_this.courseKind,_this.shape);
                    }
                })
                // 按人气排序
                $('.fecoursedetailnav').on('click','.fesortrenqi',function () {
                    $('.fecoursedetailnav .fesortall').removeClass('active');
                    $('.fecoursedetailnav .fesortprice').removeClass('active');
                    $(this).addClass('active');
                    var dom=$(this).children('i');
                    if(dom.hasClass('uk-icon-long-arrow-down')){
                        dom.removeClass();
                        dom.addClass('uk-icon-long-arrow-up');
                        //按人气升序
                        _this.current=1;
                        _this.orderName='clickCount';
                        _this.ascType='asc';
                        _this.getCourseList(_this.gradeId,_this.subjectId,_this.current,_this.orderName,_this.ascType,_this.recordType,_this.courseKind,_this.shape);
                    }else{
                        dom.removeClass();
                        dom.addClass('uk-icon-long-arrow-down');
                        //按人气降序
                        _this.current=1;
                        _this.orderName='clickCount';
                        _this.ascType='desc';
                        _this.getCourseList(_this.gradeId,_this.subjectId,_this.current,_this.orderName,_this.ascType,_this.recordType,_this.courseKind,_this.shape);
                    }
                })
            },
            // 清除全部
            clearAll:function () {
                $('.fetitle .d1').html('');
                $('.fetitle .d2').html('');
                $('.femodule li').removeClass('active');
                $('.femodule b').removeClass('active');
            },
            getHotCourse:function (isFree) {
                var _this = this;
                this.$http.post(SERVERROOTDATA + "Course.ashx?action=getCoursePurchaseRanking",
                    {
                        organId:organId,
                        periodType:'week',
                        pageIndex:1,
                        pageSize:6,
                        isFree:isFree
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        _this.hotcourseArr = res.body.rows;
                    }).then(function () {
                    $('.fehotcoursemodule ul li:first-child h1').addClass('active');
                    $('.fehotcoursemodule ul li:first-child .fepanel').slideDown();
                    $('.fehotcoursemodule ul li').on('click','h1',function () {
                        if($(this).hasClass('active')){
                            // $(this).parent().siblings().find('.fepanel').slideUp(300);
                        }else{
                            $(this).parent().siblings().find('h1').removeClass('active');
                            $(this).parent().siblings().find('.fepanel').slideUp(300);
                            $(this).next().slideDown(300);
                            $(this).addClass('active');
                        }
                    })
                })
            },
            // 热门教程榜 tabs切换
            toggleRankingList:function () {
                var _this=this;
                $('.fehotcoursemodule').on('click','.fetabs a',function () {
                    $(this).siblings().removeClass('active');
                    $(this).addClass('active');
                    var isfree=$(this).data('id');
                    _this.getHotCourse(isfree);
                })
            },
            // 推荐课程
            getRecommendedCourses:function () {
                var _this = this;
                this.$http.post(SERVERROOTDATA + "Course.ashx?action=getHotRecommendCourse",
                    {
                        organId:organId,
                        pageIndex:1,
                        pageSize:2,
                        recordType:0
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        _this.recommendedcourses = res.body.rows;
                    })
            },
            goto: function(index) { //枫叶处理
                var _this=this;
                if(index == this.current) return;
                if(index<1){
                    this.current = this.current + 2;
                    layer.msg("Sorry ╮(╯_╰)╭ 没有上一页喽！");
                    return false;
                }
                if(index > this.allpage) {
                    this.current = this.current - 2;
                    layer.msg("Sorry ╮(╯_╰)╭ 没有下一页喽！");
                    return false;
                }
                this.current = index;
                _this.getCourseList(_this.gradeId,_this.subjectId,_this.current,_this.orderName,_this.ascType,_this.recordType,_this.courseKind,_this.shape);
            }
        }
    })
}
// 文章详情
function articleDetail(articleId,teacherId,teachingStudioId) {
    new Vue({
        el: "#articleDetail",
        data: {
            articleId: "",
            currentArticleArr: [],
            preArticleArr: [],
            nextArticleArr: []
        },
        filters: {
            addRootFile: function addRootFile(img) {
                return SERVERROOTFILE + img;
            }
        },
        mounted: function mounted() {
            //1.0ready --> 2.0
            this.$nextTick(function () {
                this.articleId = articleId;
                this.getArticleDetail();
            });
        },
        methods: {
            //get news detail
            getArticleDetail: function getNewsDetail() {
                var _this = this;
                if( _this.articleId == false){
                    layer.msg("该条目暂无详情！");
                    return false;
                }
                this.$http.post(SERVERROOTDATA + "Article.ashx?action=getCurrentArticle", {
                    articleId: _this.articleId,
                    teacherId:teacherId,
                    teachingStudioId: teachingStudioId
                }, {
                    emulateJSON: true
                }).then(function (res) {
                    if (res.body.length < 1) {
                        return false;
                    }

                    _this.currentArticleArr = res.body.currentArticle[0];
                    _this.preArticleArr = res.body.priorArticle[0];
                    _this.nextArticleArr = res.body.nextArticle[0];
                    if(_this.preArticleArr.articleId== undefined || _this.preArticleArr.articleId =="undefined"){
                        _this.preArticleArr = {'title':"无","articleId":undefined};
                    }
                    if(_this.nextArticleArr.articleId == undefined || _this.nextArticleArr.articleId == "undefined"){
                        _this.nextArticleArr = {'title':"无","articleId":undefined};
                    }
                    $.scrollTo(0);
                }).then(function () {
                    $(document).attr("title",$('.fe-news-title').text()+"—福建教育网");
                });
            },
            //select news
            openArticle: function openNews(id) {
                if(id == undefined|| id == 'undefined'|| id == null){
                    return false
                }else{
                    this.articleId = id;
                    this.getArticleDetail();
                }
            }
        }
    });
}
// 单个窗口播放
function windowVideoPlayer(vId) {
    new Vue({
        el: '#jbackPlayerApp',
        data: {

        },
        mounted: function() { //1.0ready --> 2.0
            this.$nextTick(function() {
                this.getPlayAuth(vId);
            })
        },
        methods: {
            getPlayAuth: function(vid) {
                var _this = this;
                this.$http.post(SERVERROOTDATA + "CourseCatalog.ashx?action=getPlayUrlByVideoId", {
                    videoid: vid
                }, {
                    emulateJSON: true
                }).then(function(res) {
                    _this.createBackPlayerEnDetail(vid, res.body);
                });
            },
            createBackPlayerEnDetail: function(vid, auto) {
                new prismplayer({
                    id: "backcoursePlayer", // 容器id
                    //source: "http://live.bmizx.net/yicelive/streamyice.flv", // 视频地址
                    // source: 'http://devimages.apple.com/iphone/samples/bipbop/bipbopall.m3u8',
                    //source: URL,
                    vid: vid,
                    playauth: auto,
                    autoplay: true, //自动播放：否
                    width: "100%", // 播放器宽度
                    height: "452px", // 播放器高度
                    playsinline: true,
                    preload: false,
                    //isLive: true,
                    skinLayout: [{
                        "name": "bigPlayButton",
                        "align": "cc",
                        "x": 30,
                        "y": 80
                    }, {
                        "name": "controlBar",
                        "align": "blabs",
                        "x": 0,
                        "y": 0,
                        "children": [{
                            "name": "playButton",
                            "align": "tlabs",
                            "x": 10,
                            "y": 25
                        }, {
                            "name": "fullScreenButton",
                            "align": "trabs",
                            "x": 10,
                            "y": 25
                        }, {
                            "name": "volume",
                            "align": "trabs",
                            "x": 50,
                            "y": 25
                        },{"name":"progress","align":"tlabs","x":0,"y":0}]
                    }],
                    cover: './images/public/playBgIcon.jpg'
                    //cover: 'http://liveroom-img.oss-cn-qingdao.aliyuncs.com/logo.png'
                });
            }
        }
    });
}
// 评论区
function leaveword(cId,courseKind) {
    new Vue({
        el:"#feleaveword",
        data:{
            leavewordList:[],
            current:1,
            allCount:0,
            avgScore:0,
            starScoreList:[],
            showItem:4,
            allpage:""
        },
        filters: {
            addRootFile: function addRootFile(img) {
                return SERVERROOTFILE + img;
            }
        },
        computed: {
            pages: function pages() {
                var pag = [];
                if(this.current < this.showItem) {
                    //如果当前的激活的项 小于要显示的条数
                    //总页数和要显示的条数那个大就显示多少条
                    var i = Math.min(this.showItem, this.allpage);
                    while(i) {
                        pag.unshift(i--);
                    }
                } else {
                    //当前页数大于显示页数了
                    var middle = this.current - Math.floor(this.showItem / 2),
                        //从哪里开始
                        i = this.showItem;
                    if(middle > this.allpage - this.showItem) {
                        middle = this.allpage - this.showItem + 1;
                    }
                    while(i--) {
                        pag.push(middle++);
                    }
                }
                return pag;
            }
        },
        mounted: function() { //1.0ready --> 2.0
            this.$nextTick(function() {
                this.getLeaveWord(cId,1);
                this.bindClick(cId);
                this.getScore(cId);
            })
        },
        methods: {
            getScore:function (cid) {
                var _this = this;
                this.$http.post(SERVERROOTDATA + "CourseEvaluation.ashx?action=getCourseEvaluationDistribution", {
                    courseId: cid,
                    courseKind:courseKind
                }, {
                    emulateJSON: true
                }).then(function (res) {
                    _this.allCount=res.body.evaluationCount;
                    _this.avgScore=(res.body.avgScore)/2;
                    if(!isEmptyObject(res.body.distributionChart[0])){
                        _this.starScoreList=res.body.distributionChart;
                    }
                }).then(function () {
                    var integer=(_this.avgScore+'').split('.')[0];
                    var decimal=(_this.avgScore+'').split('.')[1];
                    var html='';
                    for(var i=0;i<integer;i++){
                        html+='<li class="fullstar"></li>';
                    }
                    if(decimal>0){
                        html+='<li class="stard' +decimal+'"></li>';
                        for(var j=0;j<4-integer;j++){
                            html+='<li></li>';
                        }
                    }else{
                        for(var j=0;j<5-integer;j++){
                            html+='<li></li>';
                        }
                    }
                    $('.courseScore .feleft ul').html(html);
                })
            },
            getLeaveWord: function (cid,pageIndex) {
                var _this = this;
                this.$http.post(SERVERROOTDATA + "CourseEvaluation.ashx?action=getEvaluation", {
                    courseId: cid,
                    courseKind:courseKind,
                    pageIndex:pageIndex,
                    pageSize:3
                }, {
                    emulateJSON: true
                }).then(function (res) {
                    _this.leavewordList=res.body.rows;
                    _this.allpage=res.body.totalPageCount;
                }).then(function () {
                    // 回复添加评论模块
                    $('.feleaveword .febox').on('click','button',function () {
                        $('.fepinglunarea .feliuyan').remove();
                        var duixiang=$(this).parent().parent().find('.fetop').find('h4').find('span').html();
                        var nick=$(window).storager({
					key: 'feUNickName'
				}).readStorage();
                        if(nick==duixiang){//防止自己回复自己
                            layer.msg("不能回复自己");
                            return;
                        }
                        var pliuyan=$('<div class="feliuyan"><input type="text" placeholder="回复'+ duixiang +':"><button>评论</button></div>');
                        $(this).parent().after(pliuyan);
                    });

                })
            },
            bindClick:function (cid) {
                // 最外层评论课程按钮方法
                var _this=this;
                $('.feliuyan-parent').on('click','button',function () {
                    var uid=$(window).storager({
					key: 'feUid'
				}).readStorage();
                    var utype=$(window).storager({
					key: 'feUType'
				}).readStorage();
                    if(uid==undefined||uid==null||uid=='undefined'){
                        layer.msg('请先登录!');
                    }else{
                        var value=$(this).prev().val();
                        $(this).prev().val('');
                        var reg = /\S+/;
                        if(!reg.test(value)){
                            layer.msg('评论不能为空!');
                        }else{
                            _this.$http.post(SERVERROOTDATA + "CourseEvaluation.ashx?action=evaluation", {
                                valuatorId: uid,
                                userType:utype,
                                courseId:cid,
                                courseKind:courseKind,
                                levelOneEvaluationId:0,
                                parentId:0,
                                evaluation:value
                            }, {
                                emulateJSON: true
                            }).then(function (res) {
                                if(res.body.code==200){
                                    layer.msg('评论成功')
                                    _this.getLeaveWord(cid,_this.current);
                                }else{
                                    layer.msg("评论失败");
                                }
                            })
                        }

                    }
                });
                // 绑定评论方法
                $('.feleaveword ').on('click','.feliuyan button',function () {
                    var my=this;
                    var uid= $(window).storager({
					key: 'feUid'
				}).readStorage();
                    var mid=$(this).parent().parent().find('.fetop').find('h4').find('span').data('id');
                    // console.log(uid);
                    // console.log(mid)
                    if(mid==uid){
                        layer.msg('不能回复自己');
                        return;
                    }
                    var utype=$(window).storager({
					key: 'feUType'
				}).readStorage();
                    var img=$(window).storager({
					key: 'feUIcon'
				}).readStorage();
                    var nick=$(window).storager({
					key: 'feUNickName'
				}).readStorage();

                    var courseEvaluationId=$(this).parent().parent().data('courseevaluationid');
                    var levelOneEvaluationId=$(this).parent().parent().data('leveloneevaluationid');
                    if (levelOneEvaluationId==0||levelOneEvaluationId==''){
                        levelOneEvaluationId=courseEvaluationId;
                    }
                    if(uid==undefined||uid==null||uid=='undefined'){
                        layer.msg('请先登录!');
                    }else{
                        var value=$(this).prev().val();
                        $(this).prev().val('');
                        var reg = /\S+/;
                        if(!reg.test(value)){
                            layer.msg('评论不能为空!');
                        }else{
                            _this.$http.post(SERVERROOTDATA + "CourseEvaluation.ashx?action=evaluation", {
                                valuatorId: uid,
                                userType:utype,
                                courseId:cid,
                                courseKind:courseKind,
                                levelOneEvaluationId:levelOneEvaluationId,
                                parentId:courseEvaluationId,
                                evaluation:value
                            }, {
                                emulateJSON: true
                            }).then(function (res) {
                                if(res.body.code==200){
                                    layer.msg('评论成功')
                                    _this.getLeaveWord(cid,_this.current);
                                    $(my).parent().next('ul.feleaveword-chirld').css('display','block');
                                    setTimeout(function(){
                                        if($(my).parent().prev('div.febox').find('span.lookup').length<1){
                                            $(my).parent().parent().parent().prev('div.febox').find('span.lookup').html('收起');
                                        }else{
                                            $(my).parent().prev('div.febox').find('span.lookup').html('收起');
                                        }


                                    },300)
                                }else{
                                    layer.msg("评论失败");
                                }
                            })
                        }
                    }
                });
                // 绑定点赞方法
                $('.feleaveword').on('click','.dianzang',function () {
                    var courseEvaluationId=$(this).parent().parent().data('courseevaluationid');
                    _this.$http.post(SERVERROOTDATA + "CourseEvaluation.ashx?action=evaluationThumbUp", {
                        courseEvaluationId: courseEvaluationId
                    }, {
                        emulateJSON: true
                    }).then(function (res) {
                        // if(res.body.code==200){
                            layer.msg('点赞成功')
                            _this.getLeaveWord(cid,_this.current);
                        // }else{
                        //     layer.msg("评论失败");
                        // }
                    })

                });
                // 查看收起
                // $('.feleaveword ').on('click','.lookup',function () {
                //     if($(this).html()=='收起'){
                //         $(this).parent().parent().find('.feleaveword-chirld').fadeOut();
                //         $(this).html('查看('+ $(this).data('count') +')');
                //     }else{
                //         if($(this).data('count')==0){
                //             return;
                //         }
                //         $(this).parent().parent().find('.feleaveword-chirld').fadeIn();
                //         $(this).html('收起');
                //     }
                // });
            },
            getCount:function(num,obj){ // 查看收起
                var _this = $(obj.target);
                if(_this.html()=='收起'){
                    _this.parent().parent().find('.feleaveword-chirld').fadeOut();
                    _this.html('查看('+ num +')');
                }else{
                    if(num==0){
                        return;
                    }
                    _this.parent().parent().find('.feleaveword-chirld').fadeIn();
                    _this.html('收起');
                }
            },
            goto: function goto(index) {
                //枫叶处理
                if(index == this.current) return;
                if(index > this.allpage) {
                    this.current = this.current - 2;
                    layer.msg("Sorry ╮(╯_╰)╭ 没有下一页喽！");
                    return false;
                }
                this.current = index;
                this.getLeaveWord(cId,this.current);
            }

        }
    })
}
/*
 * 电视台栏目播放器
 */
function programPlayBox(mid,vid) {
    new Vue({
        el: "#jplayerboxApp",
        data: {
            inputValue:"",
            courseArr:[],
            courseScheduleArr:[],
            cid:'',
            vid:'',
            current:1,
            currentIndex:'',
            intro:[],
            loadmore:false,
            first:true
        },
        filters: {
            addRootFile: function addRootFile(img) {
                return SERVERROOTFILE + img;
            },
            gotoCoursePlayer: function gotoCoursePlayer(mid, vid) {
                return ROOT + "programplayer.html?mid=" + mid + "&vid=" + vid;
            }
        },
        mounted: function mounted() {
            //1.0ready --> 2.0
            var that = this;
            this.$nextTick(function() {
                this.initFunc();
                this.addEventFunc();
                this.getOtherPlayer(that.current);
                this.getIntro();
            });
        },
        methods: {
            initFunc:function(){
                this.vid = vid;
                this.mid = mid;
                this.getPlayerAuth();
            },
            addEventFunc: function() {
                var isclick = true;

                $('#jbtn').click(function() {
                    if(isclick) {
                        $(this).siblings('.fe-prism-player').css('width', '100%');
                        $(this).siblings('.fe-courseplayer-right').css('width', '0%');
                        $(this).css('right', '0%');
                        $(this).html('<');
                    } else {
                        $(this).siblings('.fe-prism-player').css('width', '70%');
                        $(this).siblings('.fe-courseplayer-right').css('width', '30%');
                        $(this).css('right', '30%');
                        $(this).html('>');
                    }
                    isclick = !isclick;
                });
                /*$('.fe-courseplayer-right-head a').click(function() {
                    $(this).parent('.span4').siblings().children('a').removeClass('active');
                    $(this).addClass('active');
                    var num = $(this).attr('data-id');
                    $('.fe-courseplayer-right-con').css('display', 'none');
                    $($('.fe-courseplayer-right-con')[num]).css('display', 'block');
                })
                $('.fe-courseplayer-course-con a').click(function() {
                    $(this).siblings().removeClass('active');
                    $(this).addClass('active');
                });
                $('.fe-courseplayer-tab a').click(function() {
                    $(this).siblings().removeClass('active');
                    $(this).addClass('active');
                    var num = $(this).attr('data-id');
                    $('.fe-courseplayer-questionlist').css('display', 'none');
                    $($('.fe-courseplayer-questionlist')[num]).css('display', 'block');
                });*/
                this.createPlayer();
            },
            createPlayer: function(auth) {
                var _this = this;
                $.courseDetailPlayer = new Aliplayer({
					id: 'jcoursePlayer', // 容器id
					//source: "http://live.fetv.cn/felive/festream.m3u8?auth_key=1503027257-0-0-70dbae53de166a87b5d163a0e4d57398", // 视频地址src
					vid: _this.vid,
					playauth: auth,
					autoplay: true, //自动播放：否
					width: "70%", // 播放器宽度
					height: "570px" // 播放器高度630px
				 },function(player){
                console.log('播放器创建好了。')
           	 });
            },
            getPlayerAuth:function(){
                var _this = this;
                this.$http.post(SERVERROOTDATA + "CourseCatalog.ashx?action=getPlayUrlByVideoId", {
                    videoid: this.vid
                }, {
                    emulateJSON: true
                }).then(function(res) {
                    _this.createPlayer(res.body);
                })
            },
            getOtherPlayer: function getOtherPlayer(pageIndex) {
                var _this = this;
            	if(!_this.first){
            		 //var tempTop = $(".mCSB_dragger").offset().top;
            		 var tempTop = $('.mCSB_container').height()-520;//500是页面显示条数的高度  8*60 + 40
            	}
                this.$http.post(SERVERROOTDATA + "MicroVideo.ashx?action=getRelativeVideoById", {
                    microVideoId:_this.mid,
                    pageIndex:pageIndex,
                    pageSize:10
                }, {
                    emulateJSON: true
                }).then(function(res) {
                    if(res.body.rows == undefined) {
                        return false;
                    }
                     $("#past-list").mCustomScrollbar('destroy');
                    if(pageIndex<res.body.totalPageCount){
                        _this.loadmore=true;
                    }else{
                        _this.loadmore=false;
                    }
                    _this.courseScheduleArr =_this.courseScheduleArr.concat(res.body.rows);
                    _this.courseScheduleArr.forEach(function(item, index) {
                        //if(item.playState == 2 || item.playState == "2") {}
                        if(item.microVideoId == _this.mid){
                        
                            /*_this.currentIndex = true;*/
                            Vue.set(item, "currentIndex", true); //注册变量
                        }else{
                        	 Vue.set(item, "currentIndex", false); //注册变量
                        }
                      
                    });
                }).then(function () {
                	 $("#past-list").mCustomScrollbar();
               
                	 $("#past-list").mCustomScrollbar("scrollTo",tempTop,{
                	 	scrollInertia:0,
                	 });
                	/* console.log( _this.courseScheduleArr);
                     if(_this.first==true){
                     	 console.log(_this.first);
                         $("#past-list").mCustomScrollbar();
                        
                     }else{
                     	console.log(111111111)
                        // $("#past-list").mCustomScrollbar('update');
                     }*/
                    $(document).attr("title",$('.fe-courseplayer-right-con').find('a.active').text()+"—福建教育网");
                })
            },
            loadMore:function () {
                this.first=false;
                this.getOtherPlayer(++this.current);
            },
            getIntro: function getIntro() {
                var _this = this;
                this.$http.post(SERVERROOTDATA + "MicroVideo.ashx?action=getMicroVideoInfo", {
                    microVideoId: _this.mid
                }, {
                    emulateJSON: true
                }).then(function(res) {
                    if(res.body == undefined) {
                        return false;
                    }
                    _this.intro = res.body.rows;
                });
            }
        }

    })
}

// 家长课程详情列表
function parentcoursedetail(educationalLevelId) {
    new Vue({
        el:"#fecoursedetail",
        data:{
            current: 1, //当前页
            showItem: 6,//显示条数
            allpage: '', //总页码
            courselist:[],
            specialArr:[],//专题
            recommendedcourses:[],//推荐课程
            //筛选条件初始化
            recordType:'-1',
            starteacher:[],
            subjectId:'',//专题
            orderName:'colligate',
            ascType:'asc',
            courseKind:0 //判断是否是微课，1为true
        },
        filters: {
            addRoot: function addRoot(newsId,recordType,kid) {
                if(recordType== 1 || recordType=="1"){
                    return ROOT + "cloundcoursedetail.html?courseId=" + newsId;
                }else{
                    if(kid==1){
                        return ROOT + "coursedetail.html?courseId=" + newsId + "&courseKind=" + kid;
                    }else{
                        return ROOT + "coursedetail.html?courseId=" + newsId;
                    }

                }
            },
            addRootOld: function addRoot(newsId) {
                return ROOT + "coursedetail.html?courseId=" + newsId;
            },
            addSchoolRoot:function addSchoolRoot(newsId) {
                return ROOT + "schoolindex.html?organId=" + newsId;
            },
            addRootFile: function addRootFile(img) {
                return SERVERROOTFILE + img;
            },
            addMoneySign:function addMoneySign(obj) {
                return "¥"+obj;
            },
            goToVideo:function goToVideo(cid,vid,type) {
                return ROOT + "courseplayer.html?cid=" + cid + "&vid=" +vid + '&courseType='+type;
            },
            gotoTeacher:function gotoTeacher(id) {
                return ROOT + "teacherindex.html?teacherId=" + id;
            }
        },
        mounted:function () {
            var _this=this;
            this.$nextTick(function () {
                _this.adclick();
                _this.getSelectlist();
                _this.getCourseList(_this.subjectId,_this.recordType,_this.current,_this.orderName,_this.ascType,_this.courseKind);
                _this.getRecommendedCourses();
                _this.getStarTeacher();
                _this.addBindSort();
                _this.getCourseByName();
                _this.isWeike();
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
            isWeike:function () {
                var _this=this;
                $('.fecoursedetailnav').on('change','#isWeike',function () {
                    // console.log("dad");
                    // console.log($(this).prop('checked'))
                    if($(this).prop('checked')==true){
                        _this.courseKind=1;
                    }else{
                        _this.courseKind=0;
                    }
                    _this.current=1;
                    _this.getCourseList(_this.subjectId,_this.recordType,_this.current,_this.orderName,_this.ascType,_this.courseKind);
                })
            },
            // 广告关闭
            adclick:function () {
                $('.fecourselistad').on('click','span',function () {
                    $('.fecourselistad').slideUp(300);
                })
            },
            getSelectlist:function () {
                var _this = this;
                // 专题
                this.$http.post(SERVERROOTDATA + "Subject.ashx?action=getSubject",
                    {
                        educationalLevelId:educationalLevelId
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        _this.specialArr = res.body;
                    }).then(function () {
                        $('.feperio li:first-child').addClass('active');
                        $('.feperio').on('click','li',function () {
                            _this.subjectId=$(this).data('id');
                            $(this).siblings().removeClass('active');
                            $(this).addClass('active');
                            _this.current=1;
                            _this.getCourseList(_this.subjectId,_this.recordType,_this.current,_this.orderName,_this.ascType,_this.courseKind);
                        })
                });
                $('.fegrade').on('click','li',function () {
                    _this.recordType=$(this).data('id');
                    $(this).siblings().removeClass('active');
                    $(this).addClass('active');
                    _this.current=1;
                    _this.getCourseList(_this.subjectId,_this.recordType,_this.current,_this.orderName,_this.ascType,_this.courseKind);
                });
            },
            // 获取列表
            getCourseList: function (subjectId,recordType,pageIndex,orderName,ascType,courseKind) {
                var _this = this;
                this.$http.post(SERVERROOTDATA + "Course.ashx?action=getCourseListByQuery",
                    {
                        educationalLevelId:educationalLevelId,
                        subjectId:subjectId,
                        pageIndex:pageIndex,
                        orderName:orderName,
                        ascType:ascType,
                        pageSize:12,
                        recordType:recordType,
                        courseKind:courseKind
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        _this.courselist = res.body.rows;
                        _this.allpage = res.body.totalPageCount;
                        if(res.body.totalPageCount==0){
                            _this.allpage=1;
                        }
                    }).then(function () {

                })
            },
            // 分类按钮绑定
            addBindSort:function () {
                var _this=this;
                $('.fecoursedetailnav .fesortall').addClass('active');
                $('.fecoursedetailnav .fesortlist').addClass('active');
                // 列表排序
                $('.fecoursedetailnav').on('click','.fesortlist',function () {
                    $(this).addClass('active');
                    $('.fesortgrid').removeClass('active');
                    var dom=$(this).parent().parent().next();
                    if(dom.hasClass('fecoursedetailcontent-list')){

                    }else{
                        dom.removeClass('fecoursedetailcontent-grid');
                        dom.addClass('fecoursedetailcontent-list')
                    }
                })
                // 网格排序
                $('.fecoursedetailnav').on('click','.fesortgrid',function () {
                    $(this).addClass('active');
                    $('.fesortlist').removeClass('active');
                    var dom=$(this).parent().parent().next();
                    if(dom.hasClass('fecoursedetailcontent-grid')){

                    }else{
                        dom.removeClass('fecoursedetailcontent-list');
                        dom.addClass('fecoursedetailcontent-grid')
                    }
                })
                // 综合排序
                $('.fecoursedetailnav').on('click','.fesortall',function () {
                    $('.fecoursedetailnav .fesortprice').removeClass('active');
                    $('.fecoursedetailnav .fesortrenqi').removeClass('active');
                    $(this).addClass('active');
                    _this.current=1;
                    _this.orderName='colligate';
                    _this.getCourseList(_this.subjectId,_this.recordType,_this.current,_this.orderName,_this.ascType,_this.courseKind);
                })
                // 价格排序
                $('.fecoursedetailnav').on('click','.fesortprice',function () {
                    $('.fecoursedetailnav .fesortall').removeClass('active');
                    $('.fecoursedetailnav .fesortrenqi').removeClass('active');
                    $(this).addClass('active');
                    var dom=$(this).children('i');
                    if(dom.hasClass('uk-icon-long-arrow-down')){
                        dom.removeClass();
                        dom.addClass('uk-icon-long-arrow-up');
                        //按价格升序
                        _this.current=1;
                        _this.orderName='price';
                        _this.ascType='asc';
                        _this.getCourseList(_this.subjectId,_this.recordType,_this.current,_this.orderName,_this.ascType,_this.courseKind);
                    }else{
                        dom.removeClass();
                        dom.addClass('uk-icon-long-arrow-down');
                        //按价格降序
                        _this.current=1;
                        _this.orderName='price';
                        _this.ascType='desc';
                        _this.getCourseList(_this.subjectId,_this.recordType,_this.current,_this.orderName,_this.ascType,_this.courseKind);
                    }
                })
                // 按人气排序
                $('.fecoursedetailnav').on('click','.fesortrenqi',function () {
                    $('.fecoursedetailnav .fesortall').removeClass('active');
                    $('.fecoursedetailnav .fesortprice').removeClass('active');
                    $(this).addClass('active');
                    var dom=$(this).children('i');
                    if(dom.hasClass('uk-icon-long-arrow-down')){
                        dom.removeClass();
                        dom.addClass('uk-icon-long-arrow-up');
                        //按人气升序
                        _this.current=1;
                        _this.orderName='clickCount';
                        _this.ascType='asc';
                        _this.getCourseList(_this.subjectId,_this.recordType,_this.current,_this.orderName,_this.ascType,_this.courseKind);
                    }else{
                        dom.removeClass();
                        dom.addClass('uk-icon-long-arrow-down');
                        //按人气降序
                        _this.current=1;
                        _this.orderName='clickCount';
                        _this.ascType='desc';
                        _this.getCourseList(_this.subjectId,_this.recordType,_this.current,_this.orderName,_this.ascType,_this.courseKind);
                    }
                })
            },
            getStarTeacher:function () {
                var _this = this;
                this.$http.post(SERVERROOTDATA + "Teacher.ashx?action=getParentStarTeacher",
                    {
                        educationalLevelId:educationalLevelId
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        _this.starteacher = res.body.rows;
                    })
            },
            // 推荐课程
            getRecommendedCourses:function () {
                var _this = this;
                this.$http.post(SERVERROOTDATA + "Course.ashx?action=getHotRecommendCourse",
                    {
                        educationalLevelId:educationalLevelId,
                        pageIndex:1,
                        pageSize:2
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        _this.recommendedcourses = res.body.rows;
                    })
            },
            // 按名字搜索
            getCourseByName:function () {
                var _this=this;
                $('.fecoursedetailnav .fesousuo').on('click','button',function () {
                    var val=$(this).prev().val();
                    _this.$http.post(SERVERROOTDATA + "Course.ashx?action=getCourseByName",
                        {
                            organId:TempOrgId,
                            pageIndex:1,
                            pageSize:10,
                            name:val
                        }
                        ,{emulateJSON: true})
                        .then(function (res) {
                            _this.courselist = res.body.rows;
                            _this.allpage = res.body.totalPageCount;
                        })
                })


            },
            goto: function(index) { //枫叶处理
                var _this=this;
                if(index == this.current) return;
                if(index<1){
                    this.current = this.current + 2;
                    layer.msg("Sorry ╮(╯_╰)╭ 没有上一页喽！");
                    return false;
                }
                if(index > this.allpage) {
                    this.current = this.current - 2;
                    layer.msg("Sorry ╮(╯_╰)╭ 没有下一页喽！");
                    return false;
                }
                this.current = index;
                _this.getCourseList(_this.subjectId,_this.recordType,_this.current,_this.orderName,_this.ascType,_this.courseKind);
                $.scrollTo($('#coursecontent').offset().top-100, 300);
            }
        }
    })
}

// 视频播放页附加功能
function courseOtherFn(recordType) {
    // 课程推荐
    new Vue({
        el:"#courseRecommend",
        data:{
            current:1,
            allPage:'',
            recommendedcourses:[]//推荐课程
        },
        filters: {
            addRootFile: function addRootFile(img) {
                return SERVERROOTFILE + img;
            },
            addRootCourse: function addRootCourse(newsId) {
                return ROOT + "coursedetail.html?courseId=" + newsId;
            },
            addRootSchool: function addRootSchool(newsId) {
                return ROOT + "schoolindex.html?organId=" + newsId;
            }
        },
        mounted:function () {
            var _this=this;
            this.$nextTick(function () {
                _this.getRecommendedCourses(_this.current);
                _this.bindFn();
            })
        },
        methods: {
            getRecommendedCourses:function (pageIndex) {
                var _this = this;
                this.$http.post(SERVERROOTDATA + "Course.ashx?action=getHotRecommendCourse",
                    {
                        organId:TempOrgId,
                        pageIndex:pageIndex,
                        pageSize:6,
                        recordType:recordType
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        _this.recommendedcourses = res.body.rows;
                        _this.allPage = res.body.totalPageCount;
                    })
            },
            // 换一批
            bindFn:function () {
                var _this=this;
                $('#courseRecommend .fetitle h1').on('click','span',function () {
                    if(++_this.current<=_this.allPage){

                    }else{
                        layer.msg('没有下一批了');
                        return;
                    }
                    _this.getRecommendedCourses(_this.current);
                })
            }
        }
    });
    // 右侧排行榜
    new Vue({
        el:"#rankingList",
        data:{
            hotcourse:[]//热门课程
        },
        filters: {
            addRoot: function addRoot(newsId) {
                return ROOT + "coursedetail.html?courseId=" + newsId;
            },
            addRootFile: function addRootFile(img) {
                return SERVERROOTFILE + img;
            }
        },
        mounted:function () {
            var _this=this;
            this.$nextTick(function () {
                _this.getHotCourse('1');//默认为免费
                _this.toggleRankingList();
            })
        },
        methods: {
            getHotCourse:function (isfree) {
                var _this = this;
                this.$http.post(SERVERROOTDATA + "Course.ashx?action=getCoursePurchaseRanking",
                    {
                        organId:TempOrgId,
                        periodType:'week',
                        pageIndex:1,
                        isFree:isfree,
                        pageSize:6
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        _this.hotcourse = res.body.rows;
                        // console.log(_this.hotcourse);
                    }).then(function () {

                })
            },
            toggleRankingList:function () {
                var _this=this;
                $('.fehotcourse').on('click','.fetabs a',function () {
                    $(this).siblings().removeClass('active');
                    $(this).addClass('active');
                    var isfree=$(this).data('id');
                    _this.getHotCourse(isfree);
                })
            }
        }
    })
}
// 添加课程评价
function addcoursecomment(cid,kid) {
    var uId=$(window).storager({key: 'feUid'}).readStorage();
    var userType=$(window).storager({key: 'feUType'}).readStorage();
    if(uId==null||uId==undefined||uId=='undefined'){
        layer.msg('请先登录');
        setTimeout(function () {
            window.location.href = ROOT+"login.html";
        },1000);
        return;
    }
    $('.addcoursecomment .fescore').on('click','li',function () {
        if($(this).hasClass('active')){
            return;
        }else{
            $(this).siblings().removeClass('active');
            $(this).addClass('active');
            var count=$(this).data('id');
            $('.addcoursecomment .fescore li').removeClass('fullstar');
            for(var i=1;i<=count;i++){
                $('.addcoursecomment .fescore li:nth-child('+ i +')').addClass('fullstar');
            }
            var text='';
            switch (count){
                case 1:
                    text="非常差";
                    break;
                case 2:
                    text="差";
                    break;
                case 3:
                    text="一般";
                    break;
                case 4:
                    text="满意";
                    break;
                case 5:
                    text="非常满意";
                    break;
            }
            $('.addcoursecomment .fepanel b').html(text);
        }
    });
    $('.addcoursecomment .feoperation').on('click','button:last-child',function () {
        parent.close();
    });
    $('.addcoursecomment .feoperation').on('click','button:first-child',function () {
        if ($("#clickCount").val() == "1")
        {
            return;
        }
        $("#clickCount").val("1");
        var dom=$('.addcoursecomment .fescore').find('.active');
        if(dom.length<1){
            layer.msg('请进行评分!');
            $("#clickCount").val("0");
        }else{
            // console.log(dom.data('id')*2);
            if(!isEmpty($('#discuss').val())){
                layer.msg('评论不能为空');
                $("#clickCount").val("0");
            }else {
                $.ajax({
                    type: "post",
                    url: SERVERROOTDATA + "CourseEvaluation.ashx?action=evaluation",
                    dataType: 'text',
                    data: {
                        valuatorId: uId,
                        userType:userType,
                        courseId:cid,
                        courseKind:kid,
                        score:dom.data('id')*2,
                        levelOneEvaluationId:0,
                        parentId:0,
                        evaluation:$('#discuss').val()
                    },
                    success: function(res) {
                        var data = JSON.parse(res);
                        if(data.code==200){
                            layer.msg('评论成功');
                            setTimeout(function () {
                                // $("#clickCount").val("0");
                                parent.close();
                            },1000);
                        }else{
                            layer.msg('提问失败');
                            setTimeout(function () {
                                $("#clickCount").val("0");
                            },1000);
                        }
                    },
                    error: function(ex) {

                    }
                });
            }
        }

    })
}
// 题库新版
function questionBank(period) {
    var tName='';
    switch (period){
        case '2':
            tName='小学试题';
            break;
        case '3':
            tName='初中试题';
            break;
        case '4':
            tName='高中试题';
            break;
    }
    $(document).attr("title",tName +"—福建教育网");
    new Vue({
        el: "#questionBank",
        data: {
            gradeArr:[],
            subjectArr:[],//学科数组
            konwledge:[],//知识点
            questionList:[],//题库列表
            questionTypeArr:[],//题型下拉框
            subjectId:'',//学科
            konwledgeName:'',
            subjectKnowledgeId:0,//1级知识点
            knowledgeNodeId:0,//2级知识点
            smallKnowledgeId:0,//3级知识点
            questionTypeId:0,//题目类型
            degree:0,//难易度
            current:1,//当前页码
            questionCount:0,//题目总数
            showItem:10,//页码显示条数
            allpage:'',//总页数
            nodata:false,
            isTeacherLogin:false
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
        mounted: function mounted() {
            //1.0ready --> 2.0
            var _this = this;
            this.$nextTick(function() {
                _this.init();
                _this.knowledgePointSelect();
                _this.bindSubjectClick();
                _this.bindKnowdegeBtn();
                _this.lookAnswer();
                _this.bindOtherSelect();
            });
        },
        methods: {
            knowledgePointSelect:function () {
                $('.feknowledgePoint').on('click','i',function () {
                    if($(this).hasClass('uk-icon-plus-circle')){
                        $(this).removeClass();
                        $(this).addClass('uk-icon-minus-circle');
                        $(this).parent().find('.fethree-level').slideDown(500);
                    }else{
                        $(this).removeClass();
                        $(this).addClass('uk-icon-plus-circle');
                        $(this).parent().find('.fethree-level').slideUp(500);
                    }
                })
            },
            init:function () {//初始化
                var _this=this;
                Promise.all([
                    // new Promise(function(resolve, reject) {
                    //     // 年级
                    //     _this.$http.post(SERVERROOTDATA + "Grade.ashx?action=getGrade",
                    //         {
                    //             organId:TempOrgId,
                    //             educationalLevelId:period
                    //         }
                    //         ,{emulateJSON: true})
                    //         .then(function (res) {
                    //             _this.gradeArr = res.body;
                    //             resolve();
                    //         }).then(function () {
                    //         $('.fegrade').on('click','li',function () {
                    //             _this.gradeId=$(this).data('id');
                    //             _this.subjectId='';
                    //             $('.femodule li').removeClass('active');
                    //             $(this).addClass('active');
                    //             // 调用列表函数
                    //         })
                    //     });
                    // }),
                    new Promise(function(resolve, reject) {
                        // 学科
                        _this.$http.post(SERVERROOTDATA + "Subject.ashx?action=getSubject",
                            {
                                organId:TempOrgId,
                                educationalLevelId:period
                            }
                            ,{emulateJSON: true})
                            .then(function (res) {
                                _this.subjectArr = res.body;
                                resolve();
                            }).then(function () {
                            $('.fesubject').on('click','li',function () {
                                // _this.subjectId=$(this).data('id');
                                $(this).siblings().removeClass('active');
                                $(this).addClass('active');
                            })
                        })
                    })
                ]).then(function () {
                    // $('.fegrade li:first-child').addClass('active');
                    $('.fesubject li:first-child').addClass('active');
                    // console.log($('.fegrade li:first-child').data('id'));
                    _this.subjectId=$('.fesubject li:first-child').data('id');

                    _this.getKnowledgeList( _this.subjectId);
                    _this.getQuestionType(_this.subjectId);
                    // 第一次获取题目列表
                    _this.getQuestionBank(0,0,0,0,0,_this.current);
                    var uId=$(window).storager({key: 'feUid'}).readStorage();
                    var userType=$(window).storager({key: 'feUType'}).readStorage();
                    if(uId!=null&&uId!=undefined&&uId!='undefined'&&userType==3){
                       _this.isTeacherLogin=true;
                    }else{
                        _this.isTeacherLogin=false;
                    }
                    $('.fequestionList-content').on('click','.fepanel .feanswer button',function () {
                        console.log($(this).data('id'));
                        _this.$http.post(SERVERROOTDATA + "questionWeb.ashx?action=saveTeacherQuestionBank",
                            {
                                tag:'add',
                                teacherId:uId,
                                questionBankSketchId:$(this).data('id')
                            }
                            ,{emulateJSON: true})
                            .then(function (res) {
                                // console.log(res.body);
                                layer.msg(res.body);
                                // console.log(_this.konwledge);
                            });
                    })
                })
            },
            getKnowledgeList:function (s) {// 获取知识点
                var _this=this;
                _this.konwledgeName=tName.slice(0,2)+$('.fesubject li.active').html()+'知识点';

                _this.$http.post(SERVERROOTDATA + "questionWeb.ashx?action=getKnowledge",
                    {
                        subjectId:s,
                        educationalLevelId:period
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        _this.konwledge = res.body.rows;
                        // console.log(_this.konwledge);
                    });
            },
            getQuestionType:function (t) {// 获取题型下拉列表
                var _this=this;
                _this.$http.post(SERVERROOTDATA + "questionWeb.ashx?action=getQuestionType",
                    {
                        subjectId:t
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        _this.questionTypeArr = res.body;
                        // console.log(_this.konwledge);
                    });
            },
            bindSubjectClick:function () {//学科筛选方法
                var _this=this;
                $('.fesubject').on('click','li',function () {
                    _this.subjectId=$(this).data('id')
                    $(this).siblings().removeClass('active');
                    $(this).addClass('active');
                    $('#questionType option:first-child').prop('selected',true);
                    $('#difficultyType option:first-child').prop('selected',true);
                    _this.getKnowledgeList( _this.subjectId);
                    _this.getQuestionType(_this.subjectId);
                    _this.subjectKnowledgeId=0;
                    _this.knowledgeNodeId=0;
                    _this.smallKnowledgeId=0;
                    _this.questionTypeId=0;
                    _this.degree=0;
                    _this.current=1;
                    _this.getQuestionBank(_this.subjectKnowledgeId,_this.knowledgeNodeId,_this.smallKnowledgeId,_this.questionTypeId,_this.degree,_this.current);
                });
            },
            getQuestionBank:function (subjectKnowledgeId,knowledgeNodeId,smallKnowledgeId,questionTypeId,degree,pageIndex) {
                var _this=this;
                _this.$http.post(SERVERROOTDATA + "questionWeb.ashx?action=getQuestionBankSketch",
                    {
                        subjectId:_this.subjectId,
                        educationalLevelId:period,
                        subjectKnowledgeId:subjectKnowledgeId,
                        knowledgeNodeId:knowledgeNodeId,
                        smallKnowledgeId:smallKnowledgeId,
                        questionTypeId:questionTypeId,
                        degree:degree,
                        pageIndex:pageIndex,
                        pageSize:10
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        if(res.body.rows.length<1){
                            _this.nodata=true;
                        }else{
                            _this.nodata=false;
                        }
                        _this.questionList = res.body.rows;
                        _this.questionCount = res.body.totalCount;
                        _this.allpage=res.body.totalPageCount;
                        // console.log(_this.konwledge);
                    }).then(function () {
                        $('.fequestionList-content .feanswer a').removeClass('active');
                        $('.fequestionList-content .ferightanswer').css('display','none');
                })
            },
            bindKnowdegeBtn:function () {
                var _this=this;
                // 一级知识点
                $('.feknowledgePoint').on('click','.feone-level>h3',function () {
                    // console.log($(this).parent().data('subjectknowledgeid'));
                    $(this).parent().siblings('.feone-level').find('h3').removeClass('active');
                    $('.fetwo-level').find('h4').removeClass('active');
                    $(this).addClass('active');
                    _this.subjectKnowledgeId=$(this).parent().data('subjectknowledgeid');
                    _this.knowledgeNodeId=0;
                    _this.smallKnowledgeId=0;
                    _this.current=1;
                    _this.getQuestionBank(_this.subjectKnowledgeId,_this.knowledgeNodeId,_this.smallKnowledgeId,_this.questionTypeId,_this.degree,_this.current);
                });
                // 二级知识点
                $('.feknowledgePoint').on('click','.fetwo-level>li>h4',function () {
                    // console.log($(this).parent().data('knowledgenodeid'));
                    _this.subjectKnowledgeId=$(this).parent().parent().parent().data('subjectknowledgeid');
                    _this.knowledgeNodeId=$(this).parent().data('knowledgenodeid');
                    _this.smallKnowledgeId=0;
                    _this.current=1;
                    $(this).parent().parent().prev('h3').addClass('active');
                    $(this).parent().parent().parent().siblings().find('h3').removeClass('active');
                    $(this).parent().siblings('li').find('.fethree-level').prev().removeClass('active');
                    $('.fethree-level').find('h4').removeClass('active');
                    $(this).addClass('active');
                    _this.getQuestionBank(_this.subjectKnowledgeId,_this.knowledgeNodeId,_this.smallKnowledgeId,_this.questionTypeId,_this.degree,_this.current);
                });
                // 三级知识点
                $('.feknowledgePoint').on('click','.fethree-level>li>h4',function () {
                    // console.log($(this).parent().data('smallknowledgeid'));
                    _this.subjectKnowledgeId=$(this).parent().parent().parent().parent().parent().data('subjectknowledgeid');
                    _this.knowledgeNodeId=$(this).parent().parent().parent().data('knowledgenodeid');
                    _this.smallKnowledgeId=$(this).parent().data('smallknowledgeid');
                    _this.current=1;
                    $('.feone-level').find('h3').removeClass('active');
                    $('.fetwo-level').find('h4').removeClass('active');
                    $(this).parent().parent().parent().parent().prev('h3').addClass('active');
                    $(this).parent().parent().prev('h4').addClass('active');
                    $('.fethree-level').find('h4').removeClass('active');
                    $(this).addClass('active');
                    _this.getQuestionBank(_this.subjectKnowledgeId,_this.knowledgeNodeId,_this.smallKnowledgeId,_this.questionTypeId,_this.degree,_this.current);
                });
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
            bindOtherSelect:function () {
                var _this=this;
                $('.fequestionList-nav').on('change','#questionType',function () {
                    _this.current=1;
                    _this.questionTypeId=$(this).val();
                    _this.getQuestionBank(_this.subjectKnowledgeId,_this.knowledgeNodeId,_this.smallKnowledgeId,_this.questionTypeId,_this.degree,_this.current);
                });
                $('.fequestionList-nav').on('change','#difficultyType',function () {
                    _this.current=1;
                    // console.log('hh');
                    _this.degree=$(this).val();
                    _this.getQuestionBank(_this.subjectKnowledgeId,_this.knowledgeNodeId,_this.smallKnowledgeId,_this.questionTypeId,_this.degree,_this.current);
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
                _this.getQuestionBank(_this.subjectKnowledgeId,_this.knowledgeNodeId,_this.smallKnowledgeId,_this.questionTypeId,_this.degree,_this.current);
                $.scrollTo($('.fequestionList').offset().top-188, 300);
            },
            // getgrade:function (p) {//绑定年级 点击按钮
            //     var _this=this;
            //     _this.gradeId=p;
            //     _this.subjectId='';
            //     _this.current=1;
            //     // _this.getCourseList(_this.educationalLevelId,_this.gradeId,_this.subjectId,_this.current,_this.orderName,_this.ascType,_this.courseKind);
            // },
            getsubject:function (p) {//绑定学科 点击按钮
                var _this=this;
                _this.subjectId=p;
                _this.current=1;
                // _this.getCourseList(_this.educationalLevelId,_this.gradeId,_this.subjectId,_this.current,_this.orderName,_this.ascType,_this.courseKind);
            }
        }
    })
}
// 直播
function live() {
    var screenH=$(window).height()-20;
    $('.fe-live-body').css('height',screenH);
    $('.fe-live-left-panel-video').css('height',screenH-90);
    $('.fe-live-right-panel-nav').on('click','a',function () {
        if($(this).hasClass('active')){
            return
        }else{
            $(this).parent().siblings().find('a').removeClass('active');
            $(this).addClass('active');
            var id=$(this).data('id');
            switch (id){
                case 0:
                    $('.fe-live-right-panel-course').show();
                    $('.fe-live-right-panel-note').hide();
                    $('.fe-live-right-panel-chat').hide();
                    break;
                case 1:
                    $('.fe-live-right-panel-course').hide();
                    $('.fe-live-right-panel-note').show();
                    $('.fe-live-right-panel-chat').hide();
                    break;
                case 2:
                    $('.fe-live-right-panel-course').hide();
                    $('.fe-live-right-panel-note').hide();
                    $('.fe-live-right-panel-chat').show();
                    break;
            }
        }
    })
}
// 问卷调查
function survey(paperid) {
    var uId=$(window).storager({key: 'feUid'}).readStorage();
    var userType=$(window).storager({key: 'feUType'}).readStorage();
    if(uId==null||uId==undefined||uId=='undefined'){
        layer.msg('请先登录');
        setTimeout(function () {
            window.location.href = ROOT+"login.html";
        },1000);
        return;
    }
    new Vue({
        el:"#survey",
        data:{
            questionList:[],
            taskName:'',
            showScore:''
        },
        filters: {
            addRootFile: function addRootFile(img) {
                return SERVERROOTFILE + 'uploads/image/' + img;
            },
            getStyle:function getStyle(type) {
                switch (type){
                    case 1:
                        return 'single-choice';
                        break;
                    case 2:
                        return 'multiple-choice';
                        break;
                    case 3:
                        return 'judge';
                        break;
                    case 4:
                        return 'question-answer';
                        break;
                    case 5:
                        return 'completion';
                        break;
                }
            },
            tostring:function tostring(i) {
                switch (i){
                    case 1:
                        return 'A';
                        break;
                    case 2:
                        return 'B';
                        break;
                    case 3:
                        return 'C';
                        break;
                    case 4:
                        return 'D';
                        break;
                }
            },
            toChinese:function toChinese(i) {
                switch (i){
                    case 1:
                        return '一';
                        break;
                    case 2:
                        return '二';
                        break;
                    case 3:
                        return '三';
                        break;
                    case 4:
                        return '四';
                        break;
                    case 5:
                        return '五';
                        break;
                    case 6:
                        return '六';
                        break;
                    case 7:
                        return '七';
                        break;
                }
            }
        },
        mounted:function () {
            var _this=this;
            this.$nextTick(function () {
                _this.getQuestionList();
                _this.bindChoice();
            })
        },
        methods: {
            getQuestionList:function () {
                var _this=this;
                var index = layer.load(1, {
                    shade: [0.1,'#fff'] //0.1透明度的白色背景
                });
                this.$http.post('http://www.fetv.cn/fe/QuestionsForTeacher/' + "QuestionsInput.ashx?action=GetPaper",
                    {
                        paperid:paperid
                    }
                    , {emulateJSON: true})
                    .then(function (res) {
                        layer.close(index);
                        if(res.body.code==200){
                            _this.questionList = res.body.returnJson.typeQuestions;
                            _this.taskName=res.body.returnJson.paperTitle;
                            _this.showScore=res.body.returnJson.showScore;
                        }
                    }).then(function () {
                    var p=$('.feanswer-card').height();
                    $('.fetaskTemplate').css('marginBottom',p);
                    var w=$('.fetaskTemplate').width();
                    $('.feanswer-card').css('width',w);
                })
            },
            bindChoice:function () {
                // 选择题
                $('.fetaskTemplate').on('click','.single-choice .febox .fe-items .i-select',function () {
                    $(this).siblings().removeClass('active');
                    $(this).addClass('active');
                    var text=$(this).find('b').html();
                    // console.log(text);
                    $(this).parent().parent().find('input.studentAnswer').val(text);
                    var id=$(this).parent().parent().data('id');
                    var source=$(this).parent().parent().data('source');
                    if(isEmpty(text)){
                        $('.w'+ id +'-'+ source).addClass('active');
                    }else{
                        $('.w'+ id +'-'+ source).removeClass('active');
                    }
                });
                // 多选题
                $('.fetaskTemplate').on('click','.multiple-choice .febox .fe-items .i-select',function () {
                    if($(this).hasClass('active')){
                        $(this).removeClass('active');
                    }else{
                        $(this).addClass('active');
                    }
                    var list=$(this).parent().find('.active');
                    var text='';
                    for(var i=0;i<list.length;i++){
                        text += $(list[i]).find('b').html();
                        if(i<list.length-1){
                            text += '、';
                        }
                    }
                    // console.log(text);
                    $(this).parent().parent().find('input.studentAnswer').val(text);
                    var id=$(this).parent().parent().data('id');
                    var source=$(this).parent().parent().data('source');
                    if(isEmpty(text)){
                        $('.w'+ id +'-'+ source).addClass('active');
                    }else{
                        $('.w'+ id +'-'+ source).removeClass('active');
                    }
                });
                // 判断题
                $('.fetaskTemplate').on('click','.judge .febox .fe-items .i-select',function () {
                    $(this).siblings().removeClass('active');
                    $(this).addClass('active');
                    var text=$(this).find('b').html();
                    // console.log(text);
                    $(this).parent().parent().find('input.studentAnswer').val(text);
                    var id=$(this).parent().parent().data('id');
                    var source=$(this).parent().parent().data('source');
                    if(isEmpty(text)){
                        $('.w'+ id +'-'+ source).addClass('active');
                    }else{
                        $('.w'+ id +'-'+ source).removeClass('active');
                    }
                });
                // 问答题
                $('.fetaskTemplate').on('keyup','.question-answer .febox .fe-items textarea',function () {
                    var text=$(this).val();
                    // console.log(text);
                    $(this).parent().parent().parent().find('input.studentAnswer').val(text);
                    var id=$(this).parent().parent().parent().data('id');
                    var source=$(this).parent().parent().parent().data('source');
                    if(isEmpty(text)){
                        $('.w'+ id +'-'+ source).addClass('active');
                    }else{
                        $('.w'+ id +'-'+ source).removeClass('active');
                    }
                });
                // 填空题
                $('.fetaskTemplate').on('keyup','.completion .febox .fe-stems input',function () {
                    var inputs=$(this).parent().parent().find('input');
                    var text='';
                    var n=0;
                    for(var i=0;i<inputs.length;i++){
                        text += $(inputs[i]).val();
                        if(i<inputs.length-1){
                            text += '_';
                        }
                        if(!isEmpty($(inputs[i]).val())){
                            n++;
                        }
                    }
                    // console.log(text);
                    $(this).parent().parent().parent().find('input.studentAnswer').val(text);
                    var id=$(this).parent().parent().parent().data('id');
                    var source=$(this).parent().parent().parent().data('source');
                    console.log(n);
                    if(n>0){
                        $('.w'+ id +'-'+ source).removeClass('active');
                    }else{
                        $('.w'+ id +'-'+ source).addClass('active');
                    }
                });
                // 答题卡-定位题目
                $('.feanswer-card').on('click','span',function () {
                    var id=$(this).data('id');
                    var source=$(this).data('source');
                    $('body').animate({scrollTop:$('.q'+id+'-'+source).offset().top-200},1000)
                });
                // 答题卡-提交
                $('.feanswer-card').on('click','.feoperation button',function () {
                    var spans=$('.feanswer-card span');
                    var isAnswer=true;
                    for(var i=0;i<spans.length;i++){
                        // console.log('aa');
                        if(!$(spans[i]).hasClass('active')){
                            isAnswer=false;
                            break;
                        }
                    }
                    if(isAnswer){
                        var inputs=$('.febox .studentAnswer');
                        var answerArr=[];
                        for(var i=0;i<inputs.length;i++){
                            var val=$(inputs[i]).val();
                            var id=$(inputs[i]).parent().data('id');
                            var source=$(inputs[i]).parent().data('source');
                            answerArr.push(new answerObj(id,source,val))
                        }
                        answerArr = JSON.stringify(answerArr);
                        layer.confirm('确定提交？', {
                            btn: ['提交','取消'] //按钮
                        }, function(){
                            var index = layer.load(1, {
                                shade: [0.1,'#fff'] //0.1透明度的白色背景
                            });
                            $.ajax({
                                url: 'http://www.fetv.cn/fe/QuestionsForTeacher/' + "QuestionsInput.ashx?action=SubmitSurvey",
                                type: "POST",
                                data: {userId:uId,paperid:paperid,userType:userType,questions:answerArr},
                                success:function (res) {
                                    var data = JSON.parse(res);
                                    if(data.code==200){
                                        layer.closeAll();
                                        layer.msg('问卷已提交，谢谢你的参与');
                                        setTimeout(function () {
                                            parent.layer.closeAll();
                                        },1000)
                                    }else{
                                        layer.close(index);
                                        layer.msg(data.message);
                                    }
                                }
                            });
                        }, function(){

                        });
                    }else{
                        var inputs=$('.febox .studentAnswer');
                        var answerArr=[];
                        for(var i=0;i<inputs.length;i++){
                            var val=$(inputs[i]).val();
                            var id=$(inputs[i]).parent().data('id');
                            var source=$(inputs[i]).parent().data('source');
                            answerArr.push(new answerObj(id,source,val))
                        }
                        answerArr = JSON.stringify(answerArr);
                        layer.confirm('你还有题未答！', {
                            btn: ['继续答题','提交'] //按钮
                        }, function(){
                            layer.closeAll();
                        }, function(){
                            var index = layer.load(1, {
                                shade: [0.1,'#fff'] //0.1透明度的白色背景
                            });
                            $.ajax({
                                url: 'http://www.fetv.cn/fe/QuestionsForTeacher/' + "QuestionsInput.ashx?action=SubmitSurvey",
                                type: "POST",
                                data: {userId:uId,paperid:paperid,userType:userType,questions:answerArr},
                                success:function (res) {
                                    var data = JSON.parse(res);
                                    if(data.code==200){
                                        layer.closeAll();
                                        layer.msg('问卷已提交，谢谢你的参与');
                                        setTimeout(function () {
                                            parent.layer.closeAll();
                                        },1000)
                                    }else{
                                        layer.close(index);
                                        layer.msg(data.message);
                                    }
                                }
                            });
                        });
                    }
                });
                // 控制答题卡显示
                $(window).scroll(function () {
                    console.log($(window).scrollTop())
                    if ($(window).scrollTop() >= ($(".fetaskTemplate").height() - $(window).height())|| $(window).scrollTop() >= $(window).height()) {
                        $('.feanswer-card').fadeIn(300);
                    }else{
                        $('.feanswer-card').fadeOut(300);
                    }
                });
            }
        }
    });
}
function answerObj(id,type,answer) {
    this.questionid=id;
    this.source=type;
    this.answer=answer;
}
// 调查问卷解析
function surveyResult(paperid) {
    var uId=$(window).storager({key: 'feUid'}).readStorage();
    var userType=$(window).storager({key: 'feUType'}).readStorage();
    if(uId==null||uId==undefined||uId=='undefined'){
        layer.msg('请先登录');
        setTimeout(function () {
            window.location.href = ROOT+"login.html";
        },1000);
        return;
    }
    new Vue({
        el:"#surveyresult",
        data:{
            questionList:[],
            taskName:'',
            showScore:'',
            sumValue:''
        },
        filters: {
            addRootFile: function addRootFile(img) {
                return SERVERROOTFILE + 'uploads/image/' + img;
            },
            isActive:function isActive(m,answer) {
                if(answer.indexOf(m)!=-1){
                    return 'active';
                }
            },
            getColor:function getColor(result,type,showScore) {
                if(showScore!=1){
                    return;
                }
                if(type>3){
                    return 'subjectiveColor'
                }else{
                    if(result==1){
                        return 'rightColor';
                    }else{
                        return 'errorColor';
                    }
                }
            },
            getStyle:function getStyle(type) {
                switch (type){
                    case 1:
                        return 'single-choice';
                        break;
                    case 2:
                        return 'multiple-choice';
                        break;
                    case 3:
                        return 'judge';
                        break;
                    case 4:
                        return 'question-answer';
                        break;
                    case 5:
                        return 'completion';
                        break;
                }
            },
            tostring:function tostring(i) {
                switch (i){
                    case 1:
                        return 'A';
                        break;
                    case 2:
                        return 'B';
                        break;
                    case 3:
                        return 'C';
                        break;
                    case 4:
                        return 'D';
                        break;
                }
            },
            toChinese:function toChinese(i) {
                switch (i){
                    case 1:
                        return '一';
                        break;
                    case 2:
                        return '二';
                        break;
                    case 3:
                        return '三';
                        break;
                    case 4:
                        return '四';
                        break;
                    case 5:
                        return '五';
                        break;
                    case 6:
                        return '六';
                        break;
                    case 7:
                        return '七';
                        break;
                }
            }
        },
        mounted:function () {
            var _this=this;
            this.$nextTick(function () {
                _this.getQuestionList();
                _this.bindChoice();
            })
        },
        methods: {
            getQuestionList:function () {
                var _this=this;
                var index = layer.load(1, {
                    shade: [0.1,'#fff'] //0.1透明度的白色背景
                });
                this.$http.post('http://www.fetv.cn/fe/QuestionsForTeacher/' + "QuestionsInput.ashx?action=GetSurveyResultDetail",
                    {
                        userId:uId,
                        paperid:paperid,
                        userType:userType
                    }
                    , {emulateJSON: true})
                    .then(function (res) {
                        layer.close(index);
                        if(res.body.code==200){
                            _this.questionList = res.body.returnJson.typeQuestionResultDetail;
                            _this.taskName=res.body.returnJson.paperTitle;
                            _this.showScore=res.body.returnJson.showScore;
                            _this.sumValue=res.body.returnJson.sumValue;
                        }
                    }).then(function () {
                    var p=$('.feanswer-card').height();
                    $('.fetaskTemplate').css('marginBottom',p);
                    var w=$('.fetaskTemplate').width();
                    $('.feanswer-card').css('width',w);
                })
            },
            bindChoice:function () {
                // 答题卡-定位题目
                $('.feanswer-card').on('click','span',function () {
                    var id=$(this).data('id');
                    var source=$(this).data('source');
                    $('body').animate({scrollTop:$('.q'+id+'-'+source).offset().top-200},1000)
                });
                // 控制答题卡显示
                $(window).scroll(function () {
                    if ($(window).scrollTop() >= ($(".fetaskTemplate").height() - $(window).height())|| $(window).scrollTop() >= $(window).height()) {
                        $('.feanswer-card').fadeIn(300);
                    }else{
                        $('.feanswer-card').fadeOut(300);
                    }
                });
            }
        }
    });
}

// 机构入驻
Vue.component('organ-header-template', {
    template: '<div>' +
    '<div class="feschool-header-top-bar">' +
    '<div class="container">' +
    '<a href="index.html" @click="storageIndex()">网站首页</a> |' +
    '<a href="#this"> APP下载</a>' +
    '<div class="fe-header-top-other" style="height: 42px;line-height: 42px;margin-right: 120px;float: right">' +
    '<a v-show="!isLogined" v-bind:href="login| addRoot" @click="setPrePage">登录</a>' +
    '<a v-show="!isLogined" v-bind:href="reg| addRoot" @click="setPrePage">&nbsp;/&nbsp;注册</a>' +
    '<div v-show="isLogined" class="centerperson">您&nbsp;好&nbsp;,&nbsp;{{nickName}}&nbsp;&nbsp;</div>' +
    '<div v-show="isLogined"  class="mycenter"><a v-bind:href="member | addRoot">个人中心</a>' +
    '<ul>' +
    '<li><a v-bind:href="mycourse | addRoot">我的课程</a></li>' +
    '<li><a v-bind:href="mynotice | addRoot">我的消息</a></li>' +
    '<li><a v-bind:href="myorder | addRoot">我的订单</a></li>' +
    '<li><a @click="signOut">退&nbsp;&nbsp;出</a></li>' +
    '</ul>' +
    '</div>' +
    // '<a v-show="isLogined" @click="signOut">&nbsp;/&nbsp;退出</a>' +
    // '<a class="fe-header-shopping-car" v-bind:href="shoppingcar | addRoot" style="float: right;margin-top: 7px;margin-left: 50px"><span></span></a>' +
    // '<a class="fe-header-message" v-bind:href="message | addRoot" style="float: right;margin-top: 7px"><span></span></a>' +
    '</div>' +
    '</div>' +
    '</div>' + '<div class="container">' + '<div class="feorgan-head">' +
    '<a v-bind:href="index | addSchoolRoot(organId)" class="feorgan-head-logo">' +
    '<img v-bind:src="logo | addRootFile" />{{organName}}' + '</a>' + '<ul class="feorgan-head-nav">' + '<li v-for="(item, index) in list">' +
    '<a v-bind:href="item.href,organId | addSchoolRoot"  ><span>{{item.name}}</span></a>' +
    '</li>' + '</ul>' + '</div>' + '</div>' + '</div>',
    data: function data() {
        return {
            list: [{
                "name": "首页",
                "href": "mechanismindex.html"
            }, {
                "name": "课程",
                "href": "mechanismcourse.html"
            }, {
                "name": "名师",
                "href": "mechanismteacher.html"
            }, {
                "name": "环境",
                "href": "mechanismstyle.html"
            }, {
                "name": "动态",
                "href": "mechanismnews.html"
            }],
            isLogined: false,
            nickName: '',
            schoolid: '',
            index: 'mechanismindex.html',
            login: 'login.html',
            reg: 'login.html?login=3',
            member: '',
            mycourse: '',
            myorder: '',
            mynotice: '',
            logo: '',
            organId: '',
            organName:''
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
            if(obj == 'fe/login.html') {
                return "http://www.fetv.cn/fe/TeacherLogin/main.html";
            }else if(obj=='fe/course.html'){
                return "http://www.fetv.cn/fe/TeacherLogin/mainMycourse.html";
            }else if(obj=='fe/notice.html'){
                return "http://www.fetv.cn/fe/TeacherLogin/mainMynotice.html";
            }else if(obj=='fe/order.html'){
                return "http://www.fetv.cn/fe/TeacherLogin/mainMyorder.html";
            }
            return ROOT + obj;
        },
        addRootFile: function addRootFile(obj) {
            return SERVERROOTFILE + obj;
        },
        addSchoolRoot: function addSchoolRoot(obj, id) {
            return ROOT + obj + "?organId=" + id;
        }
    },
    methods: {
        storageIndex: function storageIndex() { //点击到首页
            $(window).storager({ //Uid
                key: 'navkey',
                value: 0,
                expires: 0
            }).addStorage();
        },
        initData: function initData() {
            var _this = this;
            this.organId = $(this).getUrlParam("organId");

            if($(window).storager({
                    key: 'feUid'
                }).readStorage() == undefined) {
                this.isLogined = false;
            } else {
                this.isLogined = true;
                this.nickName = $(window).storager({
                    key: 'feUNickName'
                }).readStorage();

                if($(window).storager({
                        key: 'feUType'
                    }).readStorage() == 1) {
                    this.member = "studentcenter/studentaccountinformation.html";
                    this.mycourse = "studentcenter/studentmycourse.html";
                    this.mynotice = "studentcenter/studentansweringreply.html";
                    this.myorder = "studentcenter/studentorder.html";
                }
                if($(window).storager({
                        key: 'feUType'
                    }).readStorage() == 2) {
                    this.member = "parentcenter/parentaccountinformation.html";
                    this.mycourse = "parentcenter/parentmycourse.html";
                    this.mynotice = "parentcenter/parentansweringreply.html";
                    this.myorder = "parentcenter/parentorder.html";
                }
                if($(window).storager({
                        key: 'feUType'
                    }).readStorage() == 3) {
                    this.member = "fe/login.html";
                    this.mycourse = "fe/course.html";
                    this.mynotice = "fe/notice.html";
                    this.myorder = "fe/order.html";
                    //$('.mycenter a').attr('target', '_blank');
                }
            }
            this.addActive();

            this.$http.post(SERVERROOTDATA + "Organ.ashx?action=getOrgan", {
                organId: _this.organId
            }, {
                emulateJSON: true
            }).then(function(res) {
                _this.logo = res.body[0].iconPath;
                _this.organName=res.body[0].name;
            });
        },
        addActive: function addActive() {
            var url = window.location.pathname.split('/');
            // console.log(url[url.length - 1]);
            var currentUrl = url[url.length - 1];
            // console.log(currentUrl);
            $('.feorgan-head-nav li a').removeClass('active');
            var doms=$('.feorgan-head-nav li a');
            for(var i=0;i<doms.length;i++){
                if($(doms[i]).attr('href').indexOf(currentUrl)!=-1){
                    $(doms[i]).addClass('active')
                }
            }
            // $('.fe-school-nav-wrap li a[href$="' + currentUrl + '"]').addClass('active');
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
                value: $.getBasePath(1),
                expires: 0
            }).addStorage();
        }
    }
});
var header = new Vue({
    el: '#organheader'
});
// 机构首页
function mechanismindex(organId) {
    // banner
    new Vue({
        el: '#organBanner',
        data: {
            dataArr: '',
            currentNewsId: '',
            currentImg: "./images/temp/indexBigNewBg.jpg",
            indexActive: 0
        },
        mounted: function mounted() {
            //1.0ready --> 2.0
            this.$nextTick(function() {
                this.getNewsData();
            });
        },
        methods: {
            getNewsData: function getNewsData() {
                var _this = this;
                this.$http.post(SERVERROOTDATA + "News.ashx?action=getOrganHomeNewsBanner", {
                    organId: organId,
                    pageSize: 5
                }, {
                    emulateJSON: true
                }).then(function(res) {
                    this.dataArr = res.body;
                    if(this.dataArr.length < 1) {
                        return false;
                    }
                }).then(function() {
                    _this.dataArr.forEach(function(item, index) {
                        Vue.set(item, "iconPath", SERVERROOTFILE + item.iconPath); //注册变量
                    });
                    _this.dataArr.forEach(function(item, index) {
                        Vue.set(item, "newsId", ROOT + "newsdetail.html?newsId=" + item.newsId); //注册变量
                    });
                }).then(function() {
                    var swiper = new Swiper('.gg', {
                        observer: true,//修改swiper自己或子元素时，自动初始化swiper
                        observeParents: true,
                        pagination: '.swiper-pagination',
                        paginationClickable: true,
                        // slidesPerView: 'auto',
                        // centeredSlides: true,
                        // autoplayDisableOnInteraction: false,
                        autoplay: 4000,
                        loop: true
                        // nextButton: '.dd1',
                        // prevButton: '.dd2',
                        // spaceBetween: 30
                    });
                })

            }
        }
    });
    // 在线课堂
    new Vue({
        el: '#onlineCourse',
        data: {
            organId:organId,
            onlineCourseArr: []
        },
        filters: {
            addRoot: function addRoot(courseId,rid,kid) {
                if(rid==1){
                    return ROOT + "cloundcoursedetail.html?courseId=" + courseId;
                }else {
                    if(kid==1){
                        return  ROOT + "coursedetail.html?courseId=" + courseId + "&courseKind=" + kid;
                    }else{
                        return ROOT + "coursedetail.html?courseId=" + courseId;
                    }
                }
            },
            addRootFile: function addRootFile(img) {
                return SERVERROOTFILE + img;
            },
            changePrice: function changePrice(n) {
                return n == '0.00' ? "免费" : "¥" + n;
            }
        },
        mounted: function mounted() {
            //1.0ready --> 2.0
            var that = this;
            this.$nextTick(function() {
                this.getOnlineCourse();
            });

        },
        methods: {
            getOnlineCourse: function getOnlineCourse() {
                var _this = this;
                this.$http.post(SERVERROOTDATA + "course.ashx?action=getOrganOnlineCourse", {
                    organId: organId,
                    pageIndex: 1,
                    pageSize: 10
                }, {
                    emulateJSON: true
                }).then(function(res) {
                    _this.onlineCourseArr = res.body.rows;
                })
            }
        }
    });
    // 线下辅导
    new Vue({
        el: '#underlineCourse',
        data: {
            organId:organId,
            underlineCourse: []
        },
        filters: {
            addRoot: function addRoot(courseId) {
                return ROOT + "undercoursedetail.html?courseId=" + courseId ;
            },
            addRootFile: function addRootFile(img) {
                return SERVERROOTFILE + img;
            },
            changePrice: function changePrice(n) {
                return n == '0.00' ? "免费" : "¥" + n;
            }
        },
        mounted: function mounted() {
            //1.0ready --> 2.0
            var that = this;
            this.$nextTick(function() {
                this.getUnderlineCourse();
            });

        },
        methods: {
            getUnderlineCourse: function getUnderlineCourse() {
                var _this = this;
                this.$http.post(SERVERROOTDATA + "course.ashx?action=getOrganUnderlineCourse", {
                    organId: organId,
                    pageIndex: 1,
                    pageSize: 8
                }, {
                    emulateJSON: true
                }).then(function(res) {
                    _this.underlineCourse = res.body.rows;
                })
            }
        }
    });
    // 名师推荐
    new Vue({
        el: '#organTeacher',
        data: {
            organId:organId,
            teacherList:[]
        },
        filters: {
            addTeacherRoot: function addTeacherRoot(tid) {
                return ROOT+ "teacherindex.html?teacherId="+tid;
            },
            addRootFile: function addRootFile(img) {
                return SERVERROOTFILE + img;
            }
        },
        mounted: function mounted() {
            //1.0ready --> 2.0
            this.$nextTick(function() {
                this.getTeacher();
            });
        },
        methods: {
            getTeacher: function getNewsData() {
                var _this = this;
                this.$http.post(SERVERROOTDATA + "Teacher.ashx?action=getOrgan2Teacher", {
                    organId: organId,
                    pageSize: 5
                }, {
                    emulateJSON: true
                }).then(function(res) {
                    _this.teacherList=res.body.rows;
                }).then(function() {
                    var swiper = new Swiper('.hh', {
                        observer: true,//修改swiper自己或子元素时，自动初始化swiper
                        observeParents: true,
                        paginationClickable: true,
                        // slidesPerView: 'auto',
                        // centeredSlides: true,
                        // autoplayDisableOnInteraction: false,
                        autoplay: 4000,
                        loop: true,
                        nextButton: '.dd1',
                        prevButton: '.dd2'
                        // spaceBetween: 30
                    });
                })
            }
        }
    });
    // 最新动态
    new Vue({
        el: '#organNews',
        data: {
            organId:organId,
            newsList: []
        },
        filters: {
            addNewsRoot: function addNewsRoot(oid,nid) {
                return ROOT+ "mechanismnewsdetail.html?newsId="+nid+"&organId="+oid;
            },
            addRootFile: function addRootFile(img) {
                return SERVERROOTFILE + img;
            }
        },
        mounted: function mounted() {
            //1.0ready --> 2.0
            var that = this;
            this.$nextTick(function() {
                this.getNewsList();
            });

        },
        methods: {
            getNewsList: function getNewsList() {
                var _this = this;
                this.$http.post(SERVERROOTDATA + "news.ashx?action=getTopOrganDynamicNews", {
                    organId: organId,
                    pageIndex: 1,
                    pageSize: 12
                }, {
                    emulateJSON: true
                }).then(function(res) {
                    _this.newsList = res.body.rows;
                })
            }
        }
    });
    // 机构环境
    new Vue({
        el: '#organEnvironment',
        data: {
            organId:organId,
            leftCon:[],
            rightCon: []
        },
        filters: {
            addRoot: function addRoot() {

            },
            addRootFile: function addRootFile(img) {
                return SERVERROOTFILE + img;
            }
        },
        mounted: function mounted() {
            //1.0ready --> 2.0
            var that = this;
            this.$nextTick(function() {
                this.getLeftImg();
                this.getRightCon();
            });

        },
        methods: {
            getLeftImg:function getLeftImg() {
                var _this = this;
                this.$http.post(SERVERROOTDATA + "news.ashx?action=getTopOrganEnvironmentNews", {
                    organId: organId,
                    pageIndex:1,
                    pageSize:8
                }, {
                    emulateJSON: true
                }).then(function(res) {
                    _this.leftCon = res.body.rows;
                }).then(function () {
                    var swiper = new Swiper('.pp', {
                        observer: true,//修改swiper自己或子元素时，自动初始化swiper
                        observeParents: true,
                        paginationClickable: true,
                        // slidesPerView: 'auto',
                        // centeredSlides: true,
                        // autoplayDisableOnInteraction: false,
                        autoplay: 4000,
                        loop: true,
                        nextButton: '.dd1',
                        prevButton: '.dd2'
                        // spaceBetween: 30
                    });
                })
            },
            getRightCon: function getRightCon() {
                var _this = this;
                this.$http.post(SERVERROOTDATA + "Organ.ashx?action=getOrgan", {
                    organId: organId
                }, {
                    emulateJSON: true
                }).then(function(res) {
                    _this.rightCon = res.body[0];
                })
            }
        }
    });
}
// 机构环境
function organStyle(organId) {
    new Vue({
        el: '#feorganStyle',
        data: {
            imgArr:[],
            current:1,
            totalCount:0,
            load:false
        },
        filters: {
            addRootFile: function addRootFile(img) {
                return SERVERROOTFILE + img;
            }
        },
        mounted: function mounted() {
            //1.0ready --> 2.0
            var that = this;
            this.$nextTick(function() {
                this.getImg(1);
            });

        },
        methods: {
            getImg: function getImg(current) {
                var _this = this;
                this.$http.post(SERVERROOTDATA + "news.ashx?action=getTopOrganEnvironmentNews", {
                    organId: organId,
                    pageIndex: current,
                    pageSize: 12
                }, {
                    emulateJSON: true
                }).then(function(res) {
                    _this.imgArr=_this.imgArr.concat(res.body.rows);
                    _this.totalCount=res.body.totalCount;
                    if(_this.current<res.body.totalPageCount){
                        _this.load=true;
                    }else{
                        _this.load=false;
                    }
                })
            },
            loadMore:function loadMore() {
                this.getImg(++this.current);
            }

        }
    });
}
// 机构注册
function organRegister() {
    new Vue({
        el:"#organRegister",
        data:{
            username:'',//用户名
            usernamePrompt:'用户名只能由中文、字母、数字和下划线组成',//用户名提示
            UerrStyle:'',
            PerrStyle:'',
            OerrStyle:'',
            password:'',//密码
            confirmpassword:'',//确认密码
            passwordPrompt:'请输入8-20位字母和数字组合',//密码提示
            contact:'',//联系人
            phone:"",//输入的手机号
            email:'',//邮箱
            verificationCode:"",//输入的校验码
            checkCode:"",//输入的验证码
            VCTime:120,//倒计时
            VCTimeKey:true,
            VCLabel:"获取验证码",
            imageCode:"",//接口返回的验证码
            imageCodeImg:"",

            mechanismname:'',//机构全称
            mechanismnamePrompt:"",//机构全称提示
            mechanismshort:'',//机构简称
            city:'',//市
            district:'',//区/县
            address:'',//详细地址
            pcLogo:'',
            mobileLogo:'',
            cityArr:[],
            districtArr:[]
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
                _this.getImageVC();
                _this.submitForm();
                _this.getAreaList();
            })
        },
        methods: {
            init:function () {
                //配置需要引入jq 1.7.2版本以上
                //服务器端成功返回 {state:1,path:文件保存路径}
                //服务器端失败返回 {state:0,errmsg:错误原因}
                //默认做了文件名不能含有中文,后端接收文件的变量名为file
                $("#zwb_upload").bindUpload({
                    url:"http://www.fetv.cn/fe/TeacherLogin/ashx/teacherCenter.ashx",//上传服务器地址
                    callbackPath:"",//绑定上传成功后 图片地址的保存容器的id或者class 必须为input或者textarea等可以使用$(..).val()设置之的表单元素
                    // ps:值返回上传成功的 默认id为#callbackPath  保存容器为位置不限制,id需要加上#号,class需要加上.
                    // 返回格式为:
                    // 原来的文件名,服务端保存的路径|原来的文件名,服务端保存的路径|原来的文件名,服务端保存的路径|原来的文件名,服务端保存的路径....
                    num:8,//上传数量的限制 默认为空 无限制
                    type:"jpg|png|gif|svg",//上传文件类型 默认为空 无限制
                    size:3//上传文件大小的限制,默认为5单位默认为mb
                });
                $('.feorgan-logo').on('change','#pcLogo',function () {
                    if($(this).val().match( /.jpg|.gif|.png|.bmp/i)) {
                        var dom = $(this).prev();
                        upload(this, dom);
                    }else{
                        layer.msg("对不起，系统仅支持标准格式的照片，请您调整格式后重新上传，谢谢 !");
                    }
                });
                $('.feorgan-logo').on('change','#mobileLogo',function () {
                    if($(this).val().match( /.jpg|.gif|.png|.bmp/i)) {
                        var dom = $(this).prev();
                        upload(this, dom);
                    }else{
                        layer.msg("对不起，系统仅支持标准格式的照片，请您调整格式后重新上传，谢谢 !");
                    }
                });
            },
            getAreaList:function () {
                var _this = this;
                // 获取市
                this.$http.post(SERVERROOTDATA+"City.ashx?action=getCity",
                    {
                        provinceId:1
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        _this.cityArr=res.body;
                    }).then(function () {
                    // 获取区
                    $('#city').on('change',function () {
                        var cityid=$('#city option:selected').data('id');
                        // console.log(city);
                        $('#district option:first-child').prop('selected',true);
                        if(cityid==''){
                            _this.districtArr=[];
                        }else{
                            _this.$http.post(SERVERROOTDATA+"District.ashx?action=getDistrict",
                                {
                                    cityId:cityid
                                }
                                ,{emulateJSON: true})
                                .then(function (res) {
                                    _this.districtArr=res.body;
                                })
                        }

                    })
                })

            },
            // 用户名查重
            checkUname:function () {
                console.log('哈哈查重');
                var _this = this;
                this.$http.post(SERVERROOTDATA + 'Organ.ashx?action=validUserName', {
                    userName: _this.username
                }, {
                    emulateJSON: true
                }).then(function(res) {
                    if(res.body.code==803){
                        _this.usernamePrompt=res.body.message;
                        _this.UerrStyle='err-red';
                    }else if(res.body.code==200){
                        _this.usernamePrompt='用户名可以使用';
                        _this.UerrStyle='err-green';
                    }else{
                        _this.usernamePrompt='用户名只能由中文、字母、数字和下划线组成';
                        _this.UerrStyle='err-gray';
                    }
                });
            },
            // 密码查格式
            passwordCheck:function () {
                if(!/^\w{6,20}$/.test(this.password)) {
                    this.passwordPrompt='密码格式错误,请输入8-20位字母和数字组合';
                    this.PerrStyle='err-red';
                }else{
                    this.passwordPrompt='密码可以使用';
                    this.PerrStyle='err-green';
                }
            },
            // 机构名称查重
            checkOrganUname:function () {
                console.log('哈哈查重');
                var _this = this;
                this.$http.post(SERVERROOTDATA + 'Organ.ashx?action=validOrganName', {
                    orgName: _this.mechanismname
                }, {
                    emulateJSON: true
                }).then(function(res) {
                    if(res.body.code==803){
                        _this.mechanismnamePrompt=res.body.message;
                        _this.OerrStyle='err-red';
                    }else if(res.body.code==200){
                        _this.mechanismnamePrompt='机构名称可以使用';
                        _this.OerrStyle='err-green';
                    }else{
                        _this.mechanismnamePrompt='';
                        _this.OerrStyle='err-gray';
                    }
                });
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
                                _this.VCTime=120;
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
                    console.log(this.verificationCode);
                    if(!isEmpty(this.verificationCode)){
                        layer.msg("请输入校验码");
                        return false;
                    }
                    _this.getVCCode();
                }
            },
            submitForm:function () {
                var _this = this;
                $('.feorgan-register .feoperation').on('click','a',function () {
                    // console.log('我要的'+photoArray);
                    var data = new FormData($('#registerForm')[0]);
                    data.append('certificateList',photoArray);
                    console.log(_this.UerrStyle=='err-red')
                    if(!isEmpty(_this.username)||_this.UerrStyle=='err-red'){
                        layer.msg('请正确填写用户名');
                        return;
                    }
                    if(!isEmpty(_this.password)||_this.PerrStyle=='err-red'){
                        layer.msg('请正确填写密码');
                        return;
                    }
                    if(_this.password!=_this.confirmpassword){
                        layer.msg('2次密码不一致');
                        return;
                    }
                    if(!isEmpty(_this.contact)){
                        layer.msg('联系人不能为空');
                        return;
                    }
                    if(!isPhone(_this.phone)){
                        layer.msg('请输入正确的手机号');
                        return;
                    }
                    if(!isEmpty(_this.checkCode)){
                        layer.msg('短信验证码不能为空');
                        return;
                    }
                    if(!isEmail(_this.email)){
                        layer.msg('邮箱格式不对');
                        return;
                    }
                    if(!isEmpty(_this.mechanismname)||_this.OerrStyle=='err-red'){
                        layer.msg('请正确填写机构全称');
                        return;
                    }
                    if(!isEmpty(_this.mechanismshort)){
                        layer.msg('机构简称不能为空');
                        return;
                    }
                    if(!isEmpty(_this.city)){
                        layer.msg('请选择市');
                        return;
                    }
                    if(!isEmpty(_this.district)){
                        layer.msg('请选择区/县');
                        return;
                    }
                    if(!isEmpty(_this.address)){
                        layer.msg('详细地址不能为空');
                        return;
                    }
                    if(!isEmpty($('#pcLogo').val())||!isEmpty($('#mobileLogo').val())){
                        layer.msg('请上传Logo');
                        return;
                    }
                    if(!isEmpty(photoArray)){
                        layer.msg('请上传机构证书图片');
                        return;
                    }
                    $.ajax({
                        url: SERVERROOTDATA+"Organ.ashx?action=saveOrgan",
                        type: "POST",
                        data: data,
                        processData: false,  // 告诉jQuery不要去处理发送的数据
                        contentType: false,   // 告诉jQuery不要去设置Content-Type请求头
                        success:function (res) {
                            var data = JSON.parse(res);
                            if(data.code==200){
                                layer.msg(data.message);
                                setTimeout(function () {
                                    window.location.href='mechanismLogin.html';
                                },1000)
                            }else{
                                layer.msg(data.message);
                            }
                        }
                    });
                })
            }
        }
    });
}
// 机构登录
function organLogin() {
    new Vue({
        el: '#organLogin',
        data: {
            username:'',
            password:''
        },
        filters: {
            addRootFile: function addRootFile(img) {
                return SERVERROOTFILE + img;
            }
        },
        mounted: function mounted() {
            //1.0ready --> 2.0
            var that = this;
            this.$nextTick(function() {
                
            });
        },
        methods: {
            loginData:function () {
                var _this = this;
                this.$http.post(SERVERROOTDATA + "Organ.ashx?action=userLogin", {
                    username: _this.username,
                    password: _this.password
                }, {
                    emulateJSON: true
                }).then(function(res) {
                    if(res.body.code==200){
                        layer.msg(res.body.message);
                        setTimeout(function () {
                            window.location.href ="http://www.fetv.cn/fe/index.html"
                        },1000)
                    }else{
                        layer.msg(res.body.message);
                    }
                })
            }
        }
    });
}
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
// 判断是否符合手机号码规则
function isPhone(str){
    var reg = /^1[34578]\d{9}$/;
    return reg.test(str);
}
// 判断是否符合邮箱规则
function isEmail(str){
    var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
    return reg.test(str);
}
// 机构线下课程详情页
function underCourseDetail(courseId, courseKind) {
    new Vue({
        el: "#jcourseDetailApp",
        data: {
            courseIcon: "",
            courseHeaderArr: [],
            courseContentArr: [],
            courseIntruArr: [],
            courseDetailArr: [],
            courseTeacherArr: [],
            courseId: "",
            courseScheduleArr: [],
            courseCommentArr: [],
            courseReInf: [],
            //820: 课程免费【游客或者未购买(未报名)】
            //821: 课程免费/收费【已购买（已报名）】
            //822: 课程收费【未购买（未报名）】：有试听
            //825: 直播课程即将开课暂无回放【已购买（已报名）】
            //826: 直播课程即将开课有回放【已购买（已报名）】
            //827: 直播课程进入课堂暂无回放【已购买（已报名）】
            //828: 直播课程进入课堂有回放【已购买（已报名）】
            courseStatusCode: 820,
            hasCollected:false,//判断是否已收藏
            isEnrolled:false,//判断是否已报名
            isPurchased: false,
            isFreeFlag: false,
            hasFreeListen: false, //判断是否有免费试听地址
            enrollFlag: true,
            // freeAuditionFlag: false,
            // liveBeforeFlag: false,
            // liveBeforeNextFlag: false,
            // livePlayFlag: false,
            // livePlayNextFlag: false,
            hasCourseReInfFlag:false,//是否有课程详情
            activeStatus: 1, // 1：课程介绍， 2：详情， 3：课表 4 名师简介  5 评价
            bgRootFile: "",
            showItem: 5,
            current: 1,
            allpage: 0,
            // commentCount: 0,
            reviewId: "",
            liveId: "",
            freeId: "",
            uId: "",
            uType: "",
            allowId: "", //试听iD 第一个
            allowCourseCatalogId: "", //试听大纲ID 第一个
            firstId: "", //第一个vId
            firstCourseCatalogId: "", // 第一个大纲Id
            orderType: 0, //默认课程类型 订单类型： 0 订课程 1 订微课 2 订微视频(电影) 3 订直播(专家观点(如：填报志愿))
            orderId: "",
            vid: ''
        },
        filters: {
            addRootFile: function addRootFile(img) {
                return SERVERROOTFILE + img;
            },
            gotoSchool: function gotoSchool(id) {
                return ROOT + "schoolindex.html?organId=" + id;
            },
            gotoTeacher: function gotoTeacher(id) {
                return ROOT + "teacherindex.html?teacherId=" + id;
            },
            gotoCloundPlayer: function gotoCloundPlayer(id) {
                return ROOT + "cloundplayer.html?cid=" + id;
            },
            gotoCoursePlayer: function gotoCoursePlayer(cid, vid) {
                return ROOT + "courseplayer.html?cid=" + cid + "&vid=" + vid + "&courseType=0"+"&courseKind="+courseKind;
            },
            //gotoPayment: function gotoPayment(id, orderId) {
            //	return ROOT + "paymentoptions.html?cid=" + id + "&orderId=" + orderId;
            //}
            gotoPayment: function gotoPayment(id) {
                return ROOT + "paymentoptions.html?cid=" + id + "&orderType=0";
            }
        },
        mounted: function mounted() {
            //1.0ready --> 2.0
            this.$nextTick(function() {
                this.getInitData();
                this.getCourseDetail();
            });
        },
        methods: {
            getInitData: function getInitData() {
                //get init data
                var _this = this;
                this.courseId = courseId;
                this.bgRootFile = ROOTFILE;
                this.uId = $(window).storager({
                    key: 'feUid'
                }).readStorage();
                if(this.uId == undefined || this.uId == "undefined") {
                    this.uId = "";
                }
                this.uType = $(window).storager({
                    key: 'feUType'
                }).readStorage();
                if(this.uType == undefined || this.uType == "undefined") {
                    this.uType = "";
                }
                this.$http.post(SERVERROOTDATA + "Course.ashx?action=getUnderCourseDetailHeaderById", {
                    userId: _this.uId,
                    courseId: _this.courseId,
                    recordType: 0,
                    courseKind:courseKind,
                    userType: _this.uType
                }, {
                    emulateJSON: true
                }).then(function(res) {
                    if(res.body.rows.length > 0) {

                        _this.courseHeaderArr = res.body.rows[0];
                        _this.courseIcon = SERVERROOTFILE + _this.courseHeaderArr.iconPath;
                        // _this.courseStatusCode = _this.courseHeaderArr.statusCode;

                        if(_this.courseHeaderArr.isPurchased == 1 || _this.courseHeaderArr.isPurchased == "1") {
                            _this.isPurchased = true;
                        } else if(_this.courseHeaderArr.isFree == 1 || _this.courseHeaderArr.isFree == "1") {

                            _this.isFreeFlag = true;
                        }

                        if(_this.courseHeaderArr.hasEnrolled==1|| _this.courseHeaderArr.hasEnrolled == "1"){//如果已经报名过
                            _this.isEnrolled = true;
                        }

                        if(_this.courseHeaderArr.hasCollected==1|| _this.courseHeaderArr.hasCollected == "1"){//是否已收藏
                            _this.hasCollected = true;
                        }
                    }
                }).then(function() {
                    $(document).attr("title",$('.fecourse-detail-header h5').text()+'—福建教育网');
                    //_this.initStatus();
                    // _this.getSchedule();
                });
            },
            getCourseDetail: function getCourseDetail() {
                var _this = this;
                this.$http.post(SERVERROOTDATA + "Course.ashx?action=getUnderCourseDetailById", {
                    courseId: _this.courseId,
                    recordType: 0,
                    courseKind:courseKind,
                    userType: _this.uType,
                    userId: _this.uId
                }, {
                    emulateJSON: true
                }).then(function(res) {
                    if(res.body.rows.length > 0) {
                        _this.courseReInf = res.body.rows[0];
                    }
                }).then(function(){
                    if(_this.courseReInf.detail != undefined && _this.courseReInf.detail != '' && _this.courseReInf.detail != 'undefined' && _this.courseReInf.detail != null ){

                        _this.hasCourseReInfFlag = true;
                    }
                });
            },
            // getSchedule: function getSchedule() {
            //     var _this = this;
            //     this.$http.post(SERVERROOTDATA + "CourseCatalog.ashx?action=getCourseCatalogByCourseId", {
            //         courseId: _this.courseId,
            //         userType: _this.uType,
            //         userId: _this.uId,
            //         courseKind:courseKind,//是否是微课
            //         pageIndex: 1,
            //         pageSize: 100
            //     }, {
            //         emulateJSON: true
            //     }).then(function(res) {
            //         if(res.body.rows != undefined) {
            //             _this.courseScheduleArr = res.body.rows.reverse();
            //             if(res.body.rows.length >= 1) {
            //                 _this.courseScheduleArr.forEach(function(item, index) {
            //                     /*if(item.isPurchased == 1 || item.isFree == 1) {*/
            //                     if(_this.isEnrolled) {//如果已经报名过，默认获取第一个
            //
            //                         /*	_this.hasFreeListen = true;
            //                             console.log(_this.hasFreeListen)*/
            //                         if(index == 0) {
            //                             _this.firstId = item.videoId; //第一个vId
            //                             _this.firstCourseCatalogId = item.courseCatalogId;
            //                         }
            //                     } else {
            //                         if(item.allowListen == 1 || item.allowListen == "1") {
            //                             _this.hasFreeListen = true;
            //                             _this.allowId = item.videoId; //试听iD 第一个
            //                             _this.allowCourseCatalogId = item.courseCatalogId; //试听大纲ID 第一个
            //                             return false;
            //                         }
            //                     }
            //                 });
            //             }
            //         }
            //     })
            // },
            changeActiveStatus: function changeActiveStatus(index, ele) {
                //change Tab status
                this.activeStatus = index;
                $.scrollTo($(ele).offset().top, 300);
            },
            correctCourse:function(){//收藏课程
                var _this = this;
                var utype =$(window).storager({
                    key: 'feUType'
                }).readStorage();
                var uid = $(window).storager({
                    key: 'feUid'
                }).readStorage();
                if(uid==undefined || uid =='undefined'|| uid==null || uid=='null' || uid=='' ){
                    layer.msg('请先登录');
                    setTimeout(function() {
                        window.location.href = ROOT + "login.html";
                    }, 1000);
                }else{
                    this.$http.post(SERVERROOTDATA + "Course.ashx?action=courseCollect", {
                        courseCollectionId:'',
                        courseId: _this.courseId,
                        userId: uid,
                        userType:utype,
                        courseKind:courseKind,
                        cancel:''
                    }, {
                        emulateJSON: true
                    }).then(function(res) {

                        _this.hasCollected = true;
                        layer.msg("收藏课程成功");
                        _this.getInitData();
                    });
                }
            },
            cancelCorrect:function(){//取消收藏课程
                var _this = this;
                var utype =$(window).storager({
                    key: 'feUType'
                }).readStorage();
                var uid = $(window).storager({
                    key: 'feUid'
                }).readStorage();
                if(uid==undefined || uid =='undefined'|| uid==null || uid=='null' || uid=='' ){
                    layer.msg('请先登录');
                    setTimeout(function() {
                        window.location.href = ROOT + "login.html";
                    }, 1000);
                }else{
                    layer.confirm('确认要取消收藏课程？', {
                        btn: ['是', '否'] //按钮
                    }, function(){
                        _this.$http.post(SERVERROOTDATA + "Course.ashx?action=courseCollect", {
                            courseCollectionId:'',
                            courseId: _this.courseId,
                            userId: uid,
                            userType:utype,
                            courseKind:courseKind,
                            cancel:1
                        }, {
                            emulateJSON: true
                        }).then(function(res) {

                            _this.hasCollected = false;
                            layer.msg("取消收藏成功");
                            _this.getInitData();
                        });
                    });
                }
            },
            enroll: function enroll() {
                //报名购买free
                var _this = this;
                var utype =$(window).storager({
                    key: 'feUType'
                }).readStorage();
                var uid = $(window).storager({
                    key: 'feUid'
                }).readStorage()
                if(uid==undefined || uid =='undefined'|| uid==null || uid=='null' || uid=='' ){
                    layer.msg('请先登录');
                    setTimeout(function() {
                        window.location.href = ROOT + "login.html";
                    }, 1000);
                }else{

                    this.$http.post(SERVERROOTDATA + "Course.ashx?action=courseEnrollment", {
                        courseId: _this.courseId,
                        userId: uid,
                        userType:utype,
                        courseKind:courseKind
                    }, {
                        emulateJSON: true
                    }).then(function(res) {
                        _this.isEnrolled = true;
                        layer.msg("报名课程成功！欢迎收看");
                        //_this.courseStatusCode = 821;
                        //_this.initStatus();
                        _this.getSchedule();
                        _this.getInitData();
                    });

                }
            },
            gotoPay:function(obj){//支付

                var _this = this;
                var utype =$(window).storager({
                    key: 'feUType'
                }).readStorage();
                var uid = $(window).storager({
                    key: 'feUid'
                }).readStorage()
                if(uid==undefined || uid =='undefined'|| uid==null || uid=='null' || uid=='' ){
                    layer.msg('请先登录');
                    setTimeout(function() {
                        window.location.href = ROOT + "login.html";
                    }, 1000);
                }else{
                    $(obj.target).attr('href',ROOT + "paymentoptions.html?cid=" + courseId + "&orderType="+courseKind);
                }
            },
            consult:function () {
                layer.msg('请拨打0000-660-8888')
            }
        }
    });
}
// 机构新闻详情页
function organNewsDetail(organId, newsId) {
    new Vue({
        el: "#jorganNewsDetailApp",
        data: {
            newsId: "",
            currentNewsArr: [],
            preNewsArr: [],
            nextNewsArr: []
        },
        filters: {
            addRootFile: function addRootFile(img) {
                return SERVERROOTFILE + img;
            }
        },
        mounted: function mounted() {
            //1.0ready --> 2.0
            this.$nextTick(function() {
                this.newsId = newsId;
                this.getNewsDetail();
                this.addReadCount();
            });
        },
        methods: {
            //get news detail
            getNewsDetail: function getNewsDetail() {
                var _this = this;
                this.$http.post(SERVERROOTDATA + "News.ashx?action=getCurrentNews", {
                    newsId: _this.newsId,
                    organId: organId
                }, {
                    emulateJSON: true
                }).then(function(res) {
                    if(res.body.length < 1) {
                        return false;
                    }

                    _this.currentNewsArr = res.body.currentNews;
                    _this.preNewsArr = res.body.priorNews;
                    _this.nextNewsArr = res.body.nextNews;

                    if(_this.preNewsArr[0] == undefined || _this.preNewsArr[0] == "undefined") {
                        _this.preNewsArr[0] = {
                            'title': "无",
                            "newsId": undefined
                        };
                    }

                    if(_this.nextNewsArr[0].newsId == undefined || _this.nextNewsArr[0].newsId == "undefined") {
                        _this.nextNewsArr[0] = {
                            'title': "无",
                            "newsId": undefined
                        };
                    }
                    $.scrollTo(0);
                }).then(function () {
                    $(document).attr("title",$('.fe-news-title').text()+"—福建教育网");
                }).then(function () {
                    window._bd_share_config = {
                        common: {
                            bdText: _this.currentNewsArr[0].title,
                            bdDesc: _this.currentNewsArr[0].introduce,
                            bdUrl: window.location.href,
                            bdPic: '分享图片'

                        },
                        share: [{
                            "bdSize": 30
                        }]
                    }
                });
            },

            //select news
            openNews: function openNews(id) {
                if(id == '' || id == undefined || id == null) {
                    layer.msg("该条目暂无详情！");
                    return false;
                };
                window.location.href = "schoolnewsdetail.html?newsId="+id + "&organId=" + organId;
            },
            // 阅读量加1
            addReadCount:function () {
                var _this=this;
                this.$http.post(SERVERROOTDATA+"News.ashx?action=updateNewsClickCount",
                    {
                        newsId:_this.newsId
                    }
                    ,{emulateJSON:true})
            }
        }
    });
}
//机构新闻
function organInformation(organId) {
    new Vue({
        el: "#jshoolInformation",
        data: {
            current: 1, //当前页
            leftListArr: [], //左边资讯
            rightHotArr: [], //右边资讯
            nodata: false,
            rightHotArrNodata:false,
            load: true,
            showItem: 6,
            allpage: 0,
        },
        filters: {
            addRootFile: function addRootFile(img) {
                return SERVERROOTFILE + img;
            }
        },
        mounted: function() {
            var _this = this;
            this.$nextTick(function() {
                _this.getLeftList(_this.current);
                _this.rightHotList();
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
                this.$http.post(SERVERROOTDATA + "news.ashx?action=getTopOrganDynamicNews", {
                    organId: organId,
                    pageIndex: pageIndex,
                    pageSize: _this.showItem
                }, {
                    emulateJSON: true
                })
                    .then(function(res) {
                        if(res.body.rows.length < 1) {
                            _this.nodata = true;
                        } else {

                            _this.allpage = res.body.totalPageCount;
                            _this.leftListArr = res.body.rows;
                            _this.nodata = false;
                        }

                    }).then(function() {
                    _this.leftListArr.forEach(function(item, index) {

                        Vue.set(item, "liveId", 'mechanismnewsdetail.html?newsId=' + item.newsId + "&organId=" + organId); //注册变量
                    })
                })
            },
            informationloadMore: function() {
                this.getLeftList(++this.current);

            },
            rightHotList: function() {
                var _this = this;
                this.$http.post(SERVERROOTDATA + "News.ashx?action=getHottestNews", {
                    organId: organId,
                    pageIndex: 1,
                    pageSize: 10
                }, {
                    emulateJSON: true
                })
                    .then(function(res) {
                        if(res.body.rows.length<1){
                            _this.rightHotArrNodata=true;
                        }else{
                            _this.rightHotArrNodata=false;
                        }

                        _this.rightHotArr = res.body.rows;

                    }).then(function() {
                    _this.rightHotArr.forEach(function(item, index) {
                        Vue.set(item, "liveId", 'mechanismnewsdetail.html?newsId=' + item.newsId + "&organId=" + organId); //注册变量
                    })
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
                _this.getLeftList( _this.current);
            }
        }
    })
}
// 知识付费首页
function knowledgepay(){
    new Vue({
        el: "#knowledgepay",
        data: {
            login:false,
            nickName:'',
            mypoint:0,
            myQnum:0,
            myAnum:0,
            questionList:[],
            headIcon:'',
            teacherQAList:[],
            ranking:[],
            teacherQAList_first:{},
            ranking_first:{},
            shareArr:[]
        },
        filters: {
            addRootFile: function addRootFile(img) {
                return SERVERROOTFILE + img;
            },
            addimg: function addimg(img) {
                return SERVERROOTFILE + "uploads/images/" + img;
            },
            addQuestionRoot: function addQuestionRoot(id){
                return ROOT + 'knowledgereplydetail.html?questionId='+id;
            },
            addTeacherRoot:function addTeacherRoot(id) {
                return ROOT + 'knowledgeAskTeacherQuestion.html?teacherId='+id;
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
        mounted: function() {
            var _this = this;
            this.$nextTick(function() {
                _this.init();
                _this.waitForU();
                _this.teacherAnswerList();
                _this.getRanking();
                _this.getShareList();
            })
        },
        methods: {
            init:function (){
                var _this=this;
                var uId=$(window).storager({key: 'feUid'}).readStorage();
                var userType=$(window).storager({key: 'feUType'}).readStorage();
                _this.headIcon=$(window).storager({key: 'feUIcon'}).readStorage();
                if(uId==null||uId==undefined||uId=='undefined'){
                    this.login=false;
                }else{
                    this.login=true;
                    this.nickName = $(window).storager({key: 'feUNickName'}).readStorage();
                    this.$http.post(SERVERROOTDATA + "KnowledgePay.ashx?action=getUserKPInfo", {
                        userId: uId,
                        userType: userType
                    }, {
                        emulateJSON: true
                    }).then(function(res) {
                        _this.mypoint = res.body[0].myPoint;
                        _this.myQnum = res.body[0].myQuestionNum;
                        _this.myAnum = res.body[0].myResponseNum;
                    })
                }
            },
            waitForU:function (){
                var _this=this;
                this.$http.post(SERVERROOTDATA + "KnowledgePay.ashx?action=getWaitResponseList", {
                    pageIndex: 1,
                    pageSize: 5
                }, {
                    emulateJSON: true
                }).then(function(res) {
                    if(res.body.code==200){
                        if(res.body.rows!=undefined){
                            _this.questionList=res.body.rows;
                        }
                    }
                })
            },
            teacherAnswerList:function () {
                var _this=this;
                this.$http.post(SERVERROOTDATA + "KnowledgePay.ashx?action=getTeacherQAList", {
                    pageIndex: 1,
                    pageSize: 5
                }, {
                    emulateJSON: true
                }).then(function(res) {
                    if(res.body.code==200){
                        if(res.body.rows!=undefined){
                            _this.teacherQAList=res.body.rows;
                            _this.teacherQAList_first=_this.teacherQAList[0];
                        }
                    }
                })
            },
            getRanking:function () {
                var _this=this;
                this.$http.post(SERVERROOTDATA + "KnowledgePay.ashx?action=getTopQAList", {

                }, {
                    emulateJSON: true
                }).then(function(res) {
                    // if(res.body.code==200){
                    //     if(res.body.rows!=undefined){
                            _this.ranking=res.body;
                            _this.ranking_first=_this.ranking[0];
                        // }
                    // }
                }).then(function () {
                    _this.ranking.forEach(function(item, index) {
                        Vue.set(item, "iconPath", SERVERROOTFILE  + item.iconPath); //注册变量
                    });
                })
            },
            getShareList:function () {
                var _this=this;
                this.$http.post(SERVERROOTDATA + "KnowledgePay.ashx?action=getQARankingList", {
                    key:'',
                    pageIndex:1,
                    pageSize:5
                }, {
                    emulateJSON: true
                }).then(function(res) {
                    if(res.body.code==200){
                        if(res.body.rows!=undefined){
                            _this.shareArr=res.body.rows;
                         }
                    }
                }).then(function () {
                    _this.shareArr.forEach(function(item, index) {
                        Vue.set(item, "headIconPath", SERVERROOTFILE  + item.headIconPath); //注册变量
                    });
                    $('.feknowledgePay-share .fecontent').on('click','h1 img',function () {
                        showPhoto($(this));
                    })
                })
            },
            gotoMyquestion:function(){
                var userType=$(window).storager({key: 'feUType'}).readStorage();
                if(userType==3){
                    window.location.href="http://www.fetv.cn/fe/TeacherLogin/teachercenterQAmyquiz.html";
                }else{
                    window.location.href=ROOT+"studentcenter/studentQAmyquiz.html";
                }
            },
            gotoMyreply:function(){
                var userType=$(window).storager({key: 'feUType'}).readStorage();
                if(userType==3){
                    window.location.href="http://www.fetv.cn/fe/TeacherLogin/teachercenterQAmyreply.html";
                }else{
                    window.location.href=ROOT+"studentcenter/studentQAmyreply.html";
                }
            }
        }
    })
}
// 分享更多
function knowledgesharelist() {
    new Vue({
        el: "#knowledgesharelist",
        data: {
            keyword:'',
            shareArr:[],
            current:1,
            showItem: 6,
            allpage: 0,
            nodata:false
        },
        filters: {
            addRootFile: function addRootFile(img) {
                return SERVERROOTFILE + img;
            },
            addimg: function addimg(img) {
                return SERVERROOTFILE + "uploads/images/" + img;
            },
            addQuestionRoot: function addQuestionRoot(id){
                return ROOT + 'knowledgereplydetail.html?questionId='+id;
            },
            addTeacherRoot:function addTeacherRoot(id) {
                return ROOT + 'knowledgeAskTeacherQuestion.html?teacherId='+id;
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
                _this.getShareList(_this.keyword,_this.current);
            })
        },
        methods: {
            getShareList:function (keyword,pageIndex) {
                var _this=this;
                this.$http.post(SERVERROOTDATA + "KnowledgePay.ashx?action=getQARankingList", {
                    key:keyword,
                    pageIndex:pageIndex,
                    pageSize:10
                }, {
                    emulateJSON: true
                }).then(function(res) {
                    if(res.body.code==200){
                        if(res.body.rows.length<1){
                            _this.nodata=true;
                        }else {
                            _this.nodata=false;
                        }
                        _this.shareArr=res.body.rows;
                        _this.allpage=res.body.totalPageCount;
                    }
                }).then(function () {
                    _this.shareArr.forEach(function(item, index) {
                        Vue.set(item, "headIconPath", SERVERROOTFILE  + item.headIconPath); //注册变量
                    });
                    $('.feknowledgePay-share .fecontent').on('click','h1 img',function () {
                        showPhoto($(this));
                    })
                })
            },
            keySearch:function () {
                this.current=1;
                this.getShareList(this.keyword,this.current);
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
                _this.getShareList(_this.keyword,_this.current);
            }
        }
    })
}
// 积分提问
function knowledgeAskQuestion(){
    var uId=$(window).storager({key: 'feUid'}).readStorage();
    var userType=$(window).storager({key: 'feUType'}).readStorage();
    if(uId==null||uId==undefined||uId=='undefined'){
        layer.msg('请先登录');
        setTimeout(function () {
            window.location.href = ROOT+"login.html";
        },1000);
        return;
    }
    new Vue({
        el: "#knowledgeAskQuestion",
        data: {
            problemDescription:'',
            limitsize:400,
            point:0,
            currentPoint:0
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
                    url:"http://www.fetv.cn/fe/TeacherLogin/ashx/teacherCenter.ashx",//上传服务器地址
                    callbackPath:"",//绑定上传成功后 图片地址的保存容器的id或者class 必须为input或者textarea等可以使用$(..).val()设置之的表单元素
                    // ps:值返回上传成功的 默认id为#callbackPath  保存容器为位置不限制,id需要加上#号,class需要加上.
                    // 返回格式为:
                    // 原来的文件名,服务端保存的路径|原来的文件名,服务端保存的路径|原来的文件名,服务端保存的路径|原来的文件名,服务端保存的路径....
                    num:8,//上传数量的限制 默认为空 无限制
                    type:"jpg|png|gif|svg",//上传文件类型 默认为空 无限制
                    size:3,//上传文件大小的限制,默认为5单位默认为mb
                });
                this.$http.post(SERVERROOTDATA + "KnowledgePay.ashx?action=getUserKPInfo", {
                    userId: uId,
                    userType: userType
                }, {
                    emulateJSON: true
                }).then(function(res) {
                    _this.currentPoint = res.body[0].myPoint;
                })
            },
            putQuestion:function(){
                var _this=this;
                if(!isEmpty(_this.problemDescription)){
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
                this.$http.post(SERVERROOTDATA + "KnowledgePay.ashx?action=saveKPQuestion", {
                    qType: 0,
                    content: _this.problemDescription,
                    iconPath: photoArray,
                    userId:uId,
                    userKind:userType,
                    point:_this.point,
                    state:0,
                    saveTag:'add'
                }, {
                    emulateJSON: true
                }).then(function(res) {
                        layer.close(index);
                        if(res.body.code==200){
                            layer.msg("提交成功");
                            setTimeout(function () {
                                window.location.href = ROOT+"knowledgepay.html";
                            },1000);
                        }else{
                            layer.msg("提交失败")
                        }
                    })
            },
            limitSize:function(){
                this.limitsize=400-this.problemDescription.length;
            }
        }
    })
}
// 收费提问
function AskTeacherQuestion(teacherId) {
    new Vue({
        el: "#AskTeacherQuestion",
        data: {
            problemDescription:'',
            limitsize:400,
            teacherInfo:{},
            historyAnswer:[],
            nodata:false
        },
        filters: {
            addRootFile: function addRootFile(img) {
                return SERVERROOTFILE + img;
            },
            addRoot:function addRoot(id) {
                return ROOT + "knowledgereplydetail.html?questionId="+id +"&r=1" + "&c=1" ;
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
        mounted: function() {
            var _this = this;
            this.$nextTick(function() {
                _this.init();
                _this.getHistoryAnswer();
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
                    url:"http://www.fetv.cn/fe/TeacherLogin/ashx/teacherCenter.ashx",//上传服务器地址
                    callbackPath:"",//绑定上传成功后 图片地址的保存容器的id或者class 必须为input或者textarea等可以使用$(..).val()设置之的表单元素
                    // ps:值返回上传成功的 默认id为#callbackPath  保存容器为位置不限制,id需要加上#号,class需要加上.
                    // 返回格式为:
                    // 原来的文件名,服务端保存的路径|原来的文件名,服务端保存的路径|原来的文件名,服务端保存的路径|原来的文件名,服务端保存的路径....
                    num:8,//上传数量的限制 默认为空 无限制
                    type:"jpg|png|gif|svg",//上传文件类型 默认为空 无限制
                    size:3,//上传文件大小的限制,默认为5单位默认为mb
                });
                this.$http.post(SERVERROOTDATA + "KnowledgePay.ashx?action=getTeacherKPInfo", {
                    teacherId: teacherId
                }, {
                    emulateJSON: true
                }).then(function(res) {
                    _this.teacherInfo = res.body[0];
                })
            },
            putQuestion:function(price){
                var uId=$(window).storager({key: 'feUid'}).readStorage();
                var userType=$(window).storager({key: 'feUType'}).readStorage();
                if(uId==null||uId==undefined||uId=='undefined'){
                    layer.msg('请先登录');
                    return;
                }
                var _this=this;
                if(!isEmpty(_this.problemDescription)){
                    layer.msg("问题描述不能为空");
                    return;
                }
                var index = layer.load(1, {
                    shade: [0.1,'#fff'] //0.1透明度的白色背景
                });
                this.$http.post(SERVERROOTDATA + "KnowledgePay.ashx?action=saveKPQuestion", {
                    qType: 1,
                    content: _this.problemDescription,
                    iconPath: photoArray,
                    teacherId:teacherId,
                    userId:uId,
                    userKind:userType,
                    money:price,
                    state:0,
                    saveTag:'add'
                }, {
                    emulateJSON: true
                }).then(function(res) {
                    layer.close(index);
                    if(res.body.code==200){
                        layer.msg("提交成功");
                        setTimeout(function () {
                            window.location.href = ROOT+"knowledgepay.html";
                        },1000);
                    }else{
                        layer.msg("提交失败")
                    }
                })
            },
            limitSize:function(){
                this.limitsize=400-this.problemDescription.length;
            },
            getHistoryAnswer:function (pageIndex) {
                var _this=this;
                this.$http.post(SERVERROOTDATA + "KnowledgePay.ashx?action=getQuestionAListById", {
                    teacherId: teacherId,
                    pageIndex: pageIndex,
                    pageSize:5
                }, {
                    emulateJSON: true
                }).then(function(res) {
                    if(res.body.rows.length<1){
                        _this.nodata=true
                    }else{
                        _this.nodata=false
                    }
                    _this.historyAnswer=res.body.rows;
                })
            }
        }
    })
}
// 回答问题详情
function knowledgereplydetail(questionId,result,charge){
    var uId=$(window).storager({key: 'feUid'}).readStorage();
    var userType=$(window).storager({key: 'feUType'}).readStorage();
    if(uId==null||uId==undefined||uId=='undefined'){
        layer.msg('请先登录');
        setTimeout(function () {
            window.location.href = ROOT+"login.html";
        },1000);
        return;
    }
    new Vue({
        el: "#knowledgereplydetail",
        data: {
            problemDescription:'',
            login:false,
            isResult:result,
            chargeMode:charge,
            nickName:'',
            mypoint:0,
            myQnum:0,
            myAnum:0,
            headIcon:'',
            questionCon:'',
            current:1,
            totalCount:0,
            replylist:[],
            loadmore:false
        },
        filters: {
            addImgile: function addRootFile(img) {
                return SERVERROOTFILE + "uploads/images/" + img;
            },
            addRootFile: function addRootFile(img) {
                return SERVERROOTFILE + img;
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
            hasBest: function() {
                for(var i=0;i<this.replylist.length;i++){
                    if(this.replylist[i].isBest==1||this.replylist[i].isBest=='1'){
                        return true;
                    }
                }
                return false;
            }
        },
        mounted: function() {
            var _this = this;
            this.$nextTick(function() {
                _this.init();
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
                    url:"http://www.fetv.cn/fe/TeacherLogin/ashx/teacherCenter.ashx",//上传服务器地址
                    callbackPath:"",//绑定上传成功后 图片地址的保存容器的id或者class 必须为input或者textarea等可以使用$(..).val()设置之的表单元素
                    // ps:值返回上传成功的 默认id为#callbackPath  保存容器为位置不限制,id需要加上#号,class需要加上.
                    // 返回格式为:
                    // 原来的文件名,服务端保存的路径|原来的文件名,服务端保存的路径|原来的文件名,服务端保存的路径|原来的文件名,服务端保存的路径....
                    num:8,//上传数量的限制 默认为空 无限制
                    type:"jpg|png|gif|svg",//上传文件类型 默认为空 无限制
                    size:3,//上传文件大小的限制,默认为5单位默认为mb
                });
                var uId=$(window).storager({key: 'feUid'}).readStorage();
                var userType=$(window).storager({key: 'feUType'}).readStorage();
                _this.headIcon=$(window).storager({key: 'feUIcon'}).readStorage();
                if(uId==null||uId==undefined||uId=='undefined'){
                    this.login=false;
                }else{
                    this.login=true;
                    this.nickName = $(window).storager({key: 'feUNickName'}).readStorage();
                    this.$http.post(SERVERROOTDATA + "KnowledgePay.ashx?action=getUserKPInfo", {
                        userId: uId,
                        userType: userType
                    }, {
                        emulateJSON: true
                    }).then(function(res) {
                        _this.mypoint = res.body[0].myPoint;
                        _this.myQnum = res.body[0].myQuestionNum;
                        _this.myAnum = res.body[0].myResponseNum;
                    })
                }
                this.getQuestionDetail();
                this.getReplylist(this.current);
            },
            getQuestionDetail:function(){
                var _this=this;
                this.$http.post(SERVERROOTDATA + "KnowledgePay.ashx?action=getKPQuestionById", {
                    KPQuestionId: questionId
                }, {
                    emulateJSON: true
                }).then(function(res) {
                    if(res.body.code==200){
                        _this.questionCon = res.body.rows[0];
                    }

                }).then(function () {
                    $('.feaskquestion-left').on('click','.fepictureArr img',function () {
                        showPhoto($(this));
                    })
                })
            },
            getReplylist:function (pageIndex) {
                var _this=this;
                this.$http.post(SERVERROOTDATA + "KnowledgePay.ashx?action=getKPResponseById", {
                    KPQuestionId: questionId,
                    pageIndex:pageIndex,
                    pageSize:5
                }, {
                    emulateJSON: true
                }).then(function(res) {
                    if(res.body.code==200){
                        _this.replylist = _this.replylist.concat(res.body.rows);
                        _this.totalCount =res.body.totalCount;
                        if(pageIndex<res.body.totalPageCount){
                            _this.loadmore=true;
                        }else{
                            _this.loadmore=false;
                        }
                    }

                }).then(function () {
                    $('.felastanswer').on('click','.fepictureArr img',function () {
                        showPhoto($(this));
                    })
                })
            },
            setGood:function(Qid){
                var _this=this;
                layer.confirm('你确定要采纳这个答案吗？', {
                    btn: ['确定','取消'] //按钮
                }, function(){
                    $.ajax({
                        url: SERVERROOTDATA + "KnowledgePay.ashx?action=saveKPResponse",
                        type: "POST",
                        data: {KPResponseId:Qid,isBest:1,saveTag:'update'},
                        success:function (res) {
                            var data = JSON.parse(res);
                            if(data.code==200){
                                layer.msg('采纳成功！', {icon: 1});
                                setTimeout(function () {
                                    _this.replylist=[];
                                    _this.current=1;
                                    _this.getReplylist(_this.current);
                                },1000)
                            }else{
                                layer.msg('采纳失败', {icon: 1});
                                setTimeout(function () {
                                    layer.closeAll();
                                },1000)
                            }
                        }
                    });
                }, function(){

                });
            },
            loadMore:function () {
                this.getReplylist(++this.current);
            },
            putQuestion:function(){
                var _this=this;
                var uId=$(window).storager({key: 'feUid'}).readStorage();
                if(uId==null||uId==undefined||uId=='undefined'){
                    layer.msg("只有登录,才能回答");
                    return;
                }
                if(!isEmpty(_this.problemDescription)){
                    layer.msg("问题回复不能为空");
                    return;
                }
                var userType=$(window).storager({key: 'feUType'}).readStorage();
                var index = layer.load(1, {
                    shade: [0.1,'#fff'] //0.1透明度的白色背景
                });
                this.$http.post(SERVERROOTDATA + "KnowledgePay.ashx?action=saveKPResponse", {
                    KPQuestionId: questionId,
                    content: _this.problemDescription,
                    filePath: photoArray,
                    responseId:uId,
                    responseType:userType,
                    isBest:0,
                    saveTag:'add'
                }, {
                    emulateJSON: true
                }).then(function(res) {
                    layer.close(index);
                    if(res.body.code==200){
                        layer.msg("提交成功");
                        setTimeout(function () {
                            window.location.href= ROOT + "knowledgepay.html";
                        },1000);

                    }else{
                        layer.msg("提交失败")
                    }
                })
            },
            gotoMyquestion:function(){
                var userType=$(window).storager({key: 'feUType'}).readStorage();
                if(userType==3){
                    window.location.href="http://www.fetv.cn/fe/TeacherLogin/teachercenterQAmyquiz.html";
                }else{
                    window.location.href=ROOT+"studentcenter/studentQAmyquiz.html";
                }
            },
            gotoMyreply:function(){
                var userType=$(window).storager({key: 'feUType'}).readStorage();
                if(userType==3){
                    window.location.href="http://www.fetv.cn/fe/TeacherLogin/teachercenterQAmyreply.html";
                }else{
                    window.location.href=ROOT+"studentcenter/studentQAmyreply.html";
                }
            }
        }
    })
}
//名师问答列表页
function teacherQuestionList() {
    new Vue({
        el: "#teacherQuestionList",
        data: {
            // 筛选条件
            current: 1, //当前页
            gradeId: '',
            subjectId: '',
            teacherList:[],
            ranking:[],

            gradeArr: [], //年级
            subjectArr: [], //学科
            showItem: 6,
            allpage: 0,
            nodata:false
        },
        filters: {
            addRootFile: function addRootFile(img) {
                return SERVERROOTFILE + img;
            },
            addRoot:function addRoot(id) {
                return ROOT + "knowledgeAskTeacherQuestion.html?teacherId=" +id;
            }
        },
        mounted: function() {
            var _this = this;
            this.$nextTick(function() {
                _this.getTeacherlist(_this.gradeId, _this.subjectId, _this.current);
                _this.getSelectlist();
                _this.getRanking();
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
            getSelectlist: function() {
                var _this = this;
                // 学段
                this.$http.post(SERVERROOTDATA + "EducationalLevel.ashx?action=getEducationalLevel", {

                }, {
                    emulateJSON: true
                })
                    .then(function(res) {
                        _this.gradeArr = res.body;
                    }).then(function() {
                    $('#grade').on('click', 'a', function() {
                        _this.gradeId = $(this).data('id');
                        _this.subjectId = '';
                        $('#subject a').removeClass('active');
                        $(this).siblings('a').removeClass('active');
                        $(this).addClass('active');
                        // 已选项显示栏操作
                        $('.fe-schoolteacher-head-title a:nth-child(3)').html($(this).html());
                        $('.fe-schoolteacher-head-title a:nth-child(4)').html('');
                        _this.$http.post(SERVERROOTDATA + "Subject.ashx?action=getSubject", {
                            educationalLevelId: $(this).data('id'),
                            organId: 1
                        }, {
                            emulateJSON: true
                        })
                            .then(function(res) {
                                _this.subjectArr = res.body;
                            })
                        _this.current = 1;
                        _this.teacherList = []; //清空数据
                        _this.getTeacherlist(_this.gradeId, _this.subjectId, _this.current);
                    })
                });
                // 学科
                this.$http.post(SERVERROOTDATA + "Subject.ashx?action=getSubject", {
                    educationalLevelId: $(this).data('id') == undefined ? '' : $(this).data('id'),
                    organId: 1
                }, {
                    emulateJSON: true
                })
                    .then(function(res) {
                        _this.subjectArr = res.body;
                    }).then(function() {
                    $('#subject').on('click', 'a', function() {
                        $(this).siblings('a').removeClass('active');
                        $(this).addClass('active');
                        // $('.fe-schoolteacher-head-title a:nth-child(4)').html($(this).html());
                    })
                })
            },
            getTeacherlist:function (educationalLevel,subjectId,pageIndex) {
                var _this=this;
                this.$http.post(SERVERROOTDATA + "KnowledgePay.ashx?action=getTeacherQAList", {
                    educationalLevel: educationalLevel,
                    subjectId:subjectId,
                    pageIndex: pageIndex,
                    pageSize:5
                }, {
                    emulateJSON: true
                }).then(function(res) {
                    if(res.body.rows.length<1){
                        _this.nodata = true;
                    }else{
                        _this.nodata = false;
                    }
                    _this.teacherList = res.body.rows;
                    _this.allpage=res.body.totalPageCount;
                })
            },
            putQuestion:function (id) {
                window.open(ROOT + "knowledgeAskTeacherQuestion.html?teacherId=" + id);
            },
            getRanking:function () {
                var _this=this;
                this.$http.post(SERVERROOTDATA + "KnowledgePay.ashx?action=getTeacherQAList", {
                    pageIndex: 1,
                    pageSize:5
                }, {
                    emulateJSON: true
                }).then(function(res) {
                    _this.ranking = res.body.rows;
                }).then(function () {
                    _this.ranking.forEach(function(item, index) {
                        Vue.set(item, "iconPath", SERVERROOTFILE  + item.headIconPath); //注册变量
                    });
                })
            },
            getsubject: function(p) { //绑定学科 点击按钮
                var _this = this;
                _this.subjectId = p;
                _this.current = 1;
                _this.teacherList = []; //清空数据
                _this.getTeacherlist(_this.gradeId, _this.subjectId, _this.current);
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
                _this.getTeacherlist(_this.gradeId, _this.subjectId, _this.current);
            }
        }
    })
}
// 问答列表页
function knowledgeQuestionList() {
    new Vue({
        el: "#knowledgeQuestionList",
        data: {
            // 筛选条件
            current: 1, //当前页
            questionList:[],
            ranking:[],
            hotQuestion:[],

            keyword:'',
            showItem: 6,
            allpage: 0,
            nodata:false
        },
        filters: {
            addRootFile: function addRootFile(img) {
                return SERVERROOTFILE + img;
            },
            addRoot:function addRoot(id,c) {
                return ROOT + "knowledgereplydetail.html?questionId="+id +"&r=0" + "&c=" + c ;
            },
            addTeacherRoot:function addTeacherRoot(id) {
                return ROOT + "knowledgeAskTeacherQuestion.html?teacherId=" +id;
            }
        },
        mounted: function() {
            var _this = this;
            this.$nextTick(function() {
                _this.getQuestionlist(_this.keyword,_this.current);
                _this.getRanking();
                _this.getHotQuestion();
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
            getQuestionlist:function (key,pageIndex) {
                var _this=this;
                this.$http.post(SERVERROOTDATA + "KnowledgePay.ashx?action=getWaitResponseList", {
                    key: key,
                    pageIndex: pageIndex,
                    pageSize:5
                }, {
                    emulateJSON: true
                }).then(function(res) {
                    if(res.body.rows.length<1){
                        _this.nodata = true;
                    }else{
                        _this.nodata = false;
                    }
                    _this.questionList = res.body.rows;
                    _this.allpage=res.body.totalPageCount;
                })
            },
            keySearch:function () {
                this.current=1;
                this.getQuestionlist(this.keyword,this.current);
            },
            putQuestion:function (id) {
                window.open(ROOT + "knowledgeAskTeacherQuestion.html?teacherId=" + id);
            },
            getRanking:function () {
                var _this=this;
                this.$http.post(SERVERROOTDATA + "KnowledgePay.ashx?action=getTeacherQAList", {
                    pageIndex: 1,
                    pageSize:5
                }, {
                    emulateJSON: true
                }).then(function(res) {
                    _this.ranking = res.body.rows;
                }).then(function () {
                    _this.ranking.forEach(function(item, index) {
                        Vue.set(item, "iconPath", SERVERROOTFILE  + item.headIconPath); //注册变量
                    });
                })
            },
            getHotQuestion:function () {
                var _this=this;
                this.$http.post(SERVERROOTDATA + "KnowledgePay.ashx?action=getHotResponseList", {
                    count: 3
                }, {
                    emulateJSON: true
                }).then(function(res) {
                    _this.hotQuestion = res.body;
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
                _this.getQuestionlist(_this.keyword,_this.current);
            }
        }
    })
}