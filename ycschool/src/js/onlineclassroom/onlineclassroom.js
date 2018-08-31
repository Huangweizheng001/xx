/**
 * Created by Administrator on 2018/5/18 0018.
 */

require("../../css/config.less");
require('../../css/index/index.less');
require("../../css/onlineclassroom/onlineclassroom.css");

// banner
new Vue({
    el: "#banner",
    data: {
        bannerArr:[]
    },
    filters: {
        addRootFile: function(img) {
            return SERVERROOTFILE + img;
        },
    },
    mounted: function mounted() {
        this.$nextTick(function() {
            this.init();
        });
    },
    methods: {
        init:function () {
            var _this = this;
            this.$http.post(SERVERROOTDATA + "/website/ashx/site/OnlineClass.ashx?action=getBanner", {

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
// 公开课
new Vue({
    el: "#courseArea",
    data: {
        newCourse:[],
        hotCourse:[],
        subjectArr:[],
        currentIndex:-1,
        subjectId:'',
        typeId:'',
    },
    filters: {
        addRootFile: function(img) {
            return SERVERROOTFILE + img;
        },
        addRootHref: function(sId,tId) {
            return 'onlineclassmore.html?subject=' + sId + '&type='+tId;
        },
        gotoPlayer:function(cid,vid){
        	return 'player.html?cid=' + cid + '&vid='+vid;
        },
        gotoTeacher(tId){
        	return 'teacherindex.html?teacherId='+tId;
        }
    },
    mounted: function mounted() {
        this.$nextTick(function() {
        	this.getSubject();
            this.getNewCourse("",-1);
            this.getHotCourse();
        });
    },
    methods: {
        getNewCourse:function (sId,cIndex) {//最新公开课
        	this.currentIndex = cIndex;
        	this.subjectId = sId;
            var _this = this;
            this.$http.post(SERVERROOTDATA + "/website/ashx/site/OnlineClass.ashx?action=getPublicCourse", {
                pageSize: 6,
                pageIndex: 1,
                subjectId:sId
            }, {
                emulateJSON: true
            }).then(function(res) {
                if(res.body.code==200){
                    _this.newCourse=res.body.rows;
                    _this.typeId = _this.newCourse[0].courseTypeId;
                }
            }).then(function () {
                _this.newCourse.forEach(function(item, index) {
                    Vue.set(item, "headIconPath", SERVERROOTFILE + item.teacherIconPath); //注册变量
                });
            })
        },
        getSubject(){
        	var _this = this;
            this.$http.post(SERVERROOTDATA + "/website/ashx/site/Subject.ashx?action=getSubject", {
                pageSize: 12,
                pageIndex: 1,
            }, {
                emulateJSON: true
            }).then(function(res) {
                if(res.body.code==200){
                    _this.subjectArr=res.body.rows;
                }
            })
        },
        getHotCourse:function () {//热门课程
        	
            var _this = this;
            this.$http.post(SERVERROOTDATA + "/website/ashx/site/OnlineClass.ashx?action=getHottestCourse", {
                pageSize: 4,
                pageIndex: 1,
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

// 微课
new Vue({
    el: "#microlectureWorld",
    data: {
        newCourse:[],
        hotCourse:[],
        subjectArr:[],
        currentIndex:-1,
        subjectId:'',
        typeId:'',
    },
    filters: {
        addRootFile: function(img) {
            return SERVERROOTFILE + img;
        },
        addRootHref: function(sId,tId) {
            return 'onlineclassmore.html?subject=' + sId + '&type='+tId;
        },
        gotoPlayer:function(cid,vid){
        	return 'player.html?cid=' + cid + '&vid='+vid;
        },
        gotoTeacher(tId){
        	return 'teacherindex.html?teacherId='+tId;
        }
    },
    mounted: function mounted() {
        this.$nextTick(function() {
            this.getNewCourse('',-1);
            this.getHotCourse();
            this.getSubject();
            
        });
    },
    methods: {
        getNewCourse:function (sId,cIndex) {//微课天地
        	this.currentIndex = cIndex;
        	this.subjectId = sId;
            var _this = this;
            this.$http.post(SERVERROOTDATA + "/website/ashx/site/OnlineClass.ashx?action=getMicroCourse", {
                pageSize: 6,
                pageIndex: 1,
                subjectId:sId
            }, {
                emulateJSON: true
            }).then(function(res) {
                if(res.body.code==200){
                    _this.newCourse=res.body.rows;
                    _this.typeId = _this.newCourse[0].courseTypeId;
                }
            }).then(function () {
                _this.newCourse.forEach(function(item, index) {
                    Vue.set(item, "headIconPath", SERVERROOTFILE + item.teacherIconPath); //注册变量
                });
            })
        },
        getSubject(){
        	var _this = this;
            this.$http.post(SERVERROOTDATA + "/website/ashx/site/Subject.ashx?action=getSubject", {
                pageSize: 12,
                pageIndex: 1,
            }, {
                emulateJSON: true
            }).then(function(res) {
                if(res.body.code==200){
                    _this.subjectArr=res.body.rows;
                }
            })
        },
        getHotCourse:function () {//热门微课榜
            var _this = this;
            this.$http.post(SERVERROOTDATA + "/website/ashx/site/OnlineClass.ashx?action=getHottestMicroCourse", {
                pageSize: 4,
                pageIndex: 1,
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
// 精品课堂
new Vue({
    el: "#onlineClassroom",
    data: {
        newCourse:[],
        subjectArr:[],
        currentIndex:-1,
        subjectId:'',
        typeId:'',
    },
    filters: {
        addRootFile: function(img) {
            return SERVERROOTFILE + img;
        },
        addRootHref: function(sId,tId) {
            return 'onlineclassmore.html?subject=' + sId + '&type='+tId;
        },
        gotoPlayer:function(cid,vid){
        	return 'player.html?cid=' + cid + '&vid='+vid;
        },
        gotoTeacher(tId){
        	return 'teacherindex.html?teacherId='+tId;
        }
    },
    mounted: function mounted() {
        this.$nextTick(function() {
            this.getSubject();
            this.getNewCourse('',-1);
        });
    },
    methods: {
        getNewCourse:function (sId,cIndex) {
            var _this = this;
            this.currentIndex = cIndex;
            this.subjectId = sId;
            this.$http.post(SERVERROOTDATA + "/website/ashx/site/OnlineClass.ashx?action=getQualityCourse", {
                pageSize: 4,
                pageIndex: 1,
                subjectId:sId
            }, {
                emulateJSON: true
            }).then(function(res) {
                if(res.body.code==200){
                    _this.newCourse=res.body.rows;
                    _this.typeId = _this.newCourse[0].courseTypeId;
                }
            }).then(function () {
                _this.newCourse.forEach(function(item, index) {
                    Vue.set(item, "headIconPath", SERVERROOTFILE + item.teacherIconPath); //注册变量
                });
            })
        },
        getSubject(){
        	var _this = this;
            this.$http.post(SERVERROOTDATA + "/website/ashx/site/Subject.ashx?action=getSubject", {
                pageSize: 12,
                pageIndex: 1,
            }, {
                emulateJSON: true
            }).then(function(res) {
                if(res.body.code==200){
                    _this.subjectArr=res.body.rows;
                }
            })
        },

    }
});
