function bltpvideo() {
    new Vue({
        el: "#bltpVideo",
        data: {
            videoArr:[],
            current: 1,
            allpage: 0,
            showItem:6
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
        mounted: function () {
            var _this = this;
            this.$nextTick(function () {
                _this.getVideo(1)
            })
        },
        methods: {
            getVideo:function (pageIndex) {
                var _this = this;
                this.$http.post(SERVERROOTDATA + "Activity.ashx?action=getPagingActivityByType",
                    {
                        organId:TempOrgId,
                        activityTypeId:40,
                        pageIndex:pageIndex,
                        pageSize:10
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        if (res.body.code === 200) {
                            _this.videoArr = res.body.rows;
                        }
                        this.allpage = res.body.totalPageCount
                    }).then(function () {
                        _this.videoArr.forEach(function(item, index) {
                            Vue.set(item, "iconPath", SERVERROOTFILE + item.iconPath); //注册变量
                        });
                })
            },
            goToShow: function (vid,name) {
                layer.open({
                    type: 2,
                    title: name,
                    //closeBtn: 0, //不显示关闭按钮
                    shadeClose: true,
                    shade: [0.5, '#000'],
                    area: ['800px', '500px'],
                    //offset: 'rb', //右下角弹出
                    //time: 2000, //2秒后自动关闭
                    anim: 2,
                    content: '../windowvideo.html?videoId=' + vid
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
                _this.getVideo(this.current);
            }
        }
    })
}
function bltpdynamics() {
    new Vue({
        el: "#bltpDynamics",
        data: {
            dynamicsArr:[],
            current: 1,
            allpage: 0,
            showItem:6
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
        mounted: function () {
            var _this = this;
            this.$nextTick(function () {
                _this.getDynamics(1)
            })
        },
        methods: {
            getDynamics:function (pageIndex) {
                var _this = this;
                this.$http.post(SERVERROOTDATA + "Activity.ashx?action=getPagingActivityByType",
                    {
                        organId:TempOrgId,
                        activityTypeId:39,
                        pageIndex:pageIndex,
                        pageSize:10
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        if (res.body.code === 200) {
                            _this.dynamicsArr = res.body.rows;
                        }
                        this.allpage = res.body.totalPageCount
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
                _this.getDynamics(this.current);
            }
        }
    })
}
function bltpdynamicsdetail(id) {
    new Vue({
        el: "#bltpDynamicsDetail",
        data: {
            currentActivity:[]
        },
        filters: {
            addRootFile: function addRootFile(img) {
                return SERVERROOTFILE + img;
            }
        },
        mounted: function () {
            var _this = this;
            this.$nextTick(function () {
                _this.getDetail()
            })
        },
        methods: {
            getDetail:function () {
                var _this = this;
                this.$http.post(SERVERROOTDATA + "Activity.ashx?action=getCurrentActivity",
                    {
                        activityId:id
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        if(res.body.currentActivity !== undefined){
                            _this.currentActivity = res.body.currentActivity[0];
                        }
                        console.log(_this.currentActivity)
                    })
            }
        }
    })
}