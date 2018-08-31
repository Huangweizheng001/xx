require('../../css/index/index.less');

// banner
new Vue({
    el: "#banner",
    data: {
        bannerArr:[]
    },
    filters: {
        addRootFile: function(img) {
            return SERVERROOTFILE + img;
        }
    },
    mounted: function mounted() {
        this.$nextTick(function() {
            this.init();
        });
    },
    methods: {
        init:function () {
            var _this = this;
            this.$http.post(SERVERROOTDATA + "/website/ashx/site/HomePage.ashx?action=getHomeBanner", {

            }, {
                emulateJSON: true
            }).then(function(res) {
                if(res.body.code==200){
                    _this.bannerArr=res.body.rows;
                }
            }).then(function() {
                _this.bannerArr.forEach(function(item, index) {
                    Vue.set(item, "iconPath", SERVERROOTFILE + item.IconPath); //注册变量
                });
            }).then(function () {
                var swiper = new Swiper('.banner-hook', {
                    pagination: {
                        el: '.swiper-pagination',
                        clickable:true
                    },
                    // slidesPerView: 'auto',
                    // centeredSlides: true,
                    autoplay: {
                        stopOnLastSlide:true,
                        disableOnInteraction: false
                    },
                    loop: true,
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    }
                    // spaceBetween: 30
                });
            });
        }

    }
});
// 课程区
new Vue({
    el: "#courseArea",
    data: {
        newCourse:[],
        hotCourse:[]
    },
    filters: {
        addRootFile: function(img) {
            return SERVERROOTFILE + img;
        },
        addRoot:function addRoot(cid,vid) {
            return "player.html?cid=" +cid + "&vid=" +vid;
        }
    },
    mounted: function mounted() {
        this.$nextTick(function() {
            this.getNewCourse();
            this.getHotCourse();
        });
    },
    methods: {
        getNewCourse:function () {
            var _this = this;
            this.$http.post(SERVERROOTDATA + "/website/ashx/site/HomePage.ashx?action=getLatestCourse", {
                pageIndex:1,
                pageSize:6
            }, {
                emulateJSON: true
            }).then(function(res) {
                if(res.body.code==200){
                    _this.newCourse=res.body.rows;
                }
            }).then(function () {
                _this.newCourse.forEach(function(item, index) {
                    Vue.set(item, "headIconPath", SERVERROOTFILE + item.teacherIconPath); //注册变量
                });
            })
        },
        getHotCourse:function () {
            var _this = this;
            this.$http.post(SERVERROOTDATA + "/website/ashx/site/HomePage.ashx?action=getHotestCourse", {
                pageIndex:1,
                pageSize:4
            }, {
                emulateJSON: true
            }).then(function(res) {
                if(res.body.code==200){
                    _this.hotCourse=res.body.rows;
                }
            }).then(function () {
                _this.hotCourse.forEach(function(item, index) {
                    Vue.set(item, "headIconPath", SERVERROOTFILE + item.teacherIconPath); //注册变量
                });
            })
        }

    }
});
// 老师区
new Vue({
    el: "#teachershow",
    data: {
        teacherList:[]
    },
    filters: {
        addRootFile: function(img) {
            return SERVERROOTFILE + img;
        },
        addTeacherRoot:function addTeacherRoot(id) {
            return "teacherindex.html?teacherId="+id;
        }
    },
    mounted: function mounted() {
        this.$nextTick(function() {
            this.init();
        });
    },
    methods: {
        init:function () {
            var _this = this;
            this.$http.post(SERVERROOTDATA + "/website/ashx/site/HomePage.ashx?action=getFamousTeacher", {

            }, {
                emulateJSON: true
            }).then(function(res) {
                if(res.body.code==200){
                    _this.teacherList = res.body.rows;
                }
            }).then(function () {
                var swiper = new Swiper('.teacher-content-hook',{
                    autoplay: {
                        stopOnLastSlide:true,
                        disableOnInteraction: false,
                    },
                    speed:1000,
                    autoplayDisableOnInteraction : false,
                    loop:true,
                    // centeredSlides : true,
                    slidesPerView:5,
                    // pagination : '.swiper-pagination',
                    // paginationClickable:true,
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    },
                    // onInit:function(swiper){
                    //     swiper.slides[2].className="swiper-slide swiper-slide-active";//第一次打开不要动画
                    // },
                    breakpoints: {
                        668: {
                            slidesPerView: 1,
                        }
                    }
                });
            });
        }

    }
});
// 学习区
new Vue({
    el: "#studyArea",
    data: {
        activityArr:[]
    },
    filters: {
        addRootFile: function(img) {
            return SERVERROOTFILE + img;
        },
        addActivity:function (id) {
            return "details.html?activityId=" +id;
        }
    },
    mounted: function mounted() {
        this.$nextTick(function() {
            this.getActivity();
        });
    },
    methods: {
        getActivity:function () {
            var _this = this;
            this.$http.post(SERVERROOTDATA + "/website/ashx/site/HomePage.ashx?action=getStudyActivity", {
                pageIndex:1,
                pageSize:2
            }, {
                emulateJSON: true
            }).then(function(res) {
                if(res.body.code==200){
                    _this.activityArr=res.body.rows;
                }
            })
        }
    }
});
// 教研活动
new Vue({
    el: "#teachingActivity",
    data: {
        activityArr:[]
    },
    filters: {
        addRootFile: function(img) {
            return SERVERROOTFILE + img;
        },
        addRoot:function (id) {
            return "tdetails.html?activityId=" +id;
        }
    },
    mounted: function mounted() {
        this.$nextTick(function() {
            this.getActivity();
        });
    },
    methods: {
        getActivity:function () {
            var _this = this;
            this.$http.post(SERVERROOTDATA + "/website/ashx/site/Activity.ashx?action=getTeachingResultList", {
                pageIndex:1,
                pageSize:4
            }, {
                emulateJSON: true
            }).then(function(res) {
                if(res.body.code==200){
                    _this.activityArr=res.body.rows;
                }
            })
        }
    }
});