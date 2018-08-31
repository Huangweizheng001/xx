require('../../css/teacherqzone/teacherqzone.less');

var teacherId = $(this).getUrlParam("teacherId");
new Vue({
    el: "#teacherIndex",
    data: {
        tId:teacherId,
        teacherInfo:{},
        rightNav:[],
        microCourse:[],
        researchArr:[],
        resource:[],
        current:1,
        allCount:0,
        load:false,
        nodata:false
    },
    filters: {
        addRootFile: function(img) {
            return SERVERROOTFILE + img;
        },
        goToplay:function (cid,vid) {
          return "player.html?cid=" +cid +"&vid=" +vid;
        },
        addActivity:function (id) {
            return "tdetails.html?activityId=" +id;
        },
        timeType: function timeType(time) {
            if(time!=''||time!=undefined||time!='undefined'){
                var date = time.split(":");
                return parseInt(date[0])+"小时" + parseInt(date[1]) + "分钟" + parseInt(date[2]) + "秒";
            }
        },
        addStatType:function (type) {
            switch (type){
                case 'activity':
                    return 'teacheractivity.html?teacherId='+ teacherId;
                    break;
                case 'course':
                    return 'teachermicroclass.html?teacherId='+ teacherId;
                    break;
                case 'resource':
                    return 'teacherresource.html?teacherId='+ teacherId;
                    break;
            }
        }
    },
    mounted: function mounted() {
        this.$nextTick(function() {
            this.info();
            this.getRightNav();
            this.getMicroCourse(this.current);
            this.getResearch();
            this.getResource();
        });
    },
    methods: {
        info:function () {
            var _this = this;
            this.$http.post(SERVERROOTDATA + "/website/ashx/site/Teacher.ashx?action=getTeacherIntroduceById", {
                teacherId:teacherId
            }, {
                emulateJSON: true
            }).then(function(res) {
                if(res.body.code==200){
                    if(res.body.rows.length>0){
                        _this.teacherInfo=res.body.rows[0];
                    }

                }
            })
        },
        getMicroCourse:function (pageIndex) {
            var _this = this;
            this.$http.post(SERVERROOTDATA + "/website/ashx/site/Teacher.ashx?action=getAllCourse", {
                teacherId:teacherId,
                pageIndex:pageIndex,
                pageSize:5
            }, {
                emulateJSON: true
            }).then(function(res) {
                if(res.body.code==200){
                    if(pageIndex < res.body.totalPageCount){
                        _this.load = true;
                    }else{
                        _this.load = false;
                    }
                    if(res.body.rows.length<1){
                        _this.nodata=true;
                    }else {
                        _this.nodata=false;
                    }
                    _this.allCount=res.body.totalCount;
                    _this.microCourse=_this.microCourse.concat(res.body.rows);
                }
            })
        },
        loadMore:function () {
            this.getMicroCourse(++this.current);
        },
        getRightNav:function () {
            var _this = this;
            this.$http.post(SERVERROOTDATA + "/website/ashx/site/Teacher.ashx?action=getTeacherStatData", {
                teacherId:teacherId
            }, {
                emulateJSON: true
            }).then(function(res) {
                if(res.body.code==200){
                    _this.rightNav=res.body.rows;
                }
            })
        },
        getResearch:function () {
            var _this = this;
            this.$http.post(SERVERROOTDATA + "/website/ashx/site/Activity.ashx?action=getTeachingResultList", {
                teacherId:teacherId,
                pageIndex:1,
                pageSize:2
            }, {
                emulateJSON: true
            }).then(function(res) {
                if(res.body.code==200){
                    _this.researchArr=res.body.rows;
                }
            })
        },
        getResource:function () {
            var _this = this;
            this.$http.post(SERVERROOTDATA + "/website/ashx/site/Teacher.ashx?action=getTeacherResourceById", {
                teacherId:teacherId,
                pageIndex:1,
                pageSize:2
            }, {
                emulateJSON: true
            }).then(function(res) {
                if(res.body.code==200){
                    _this.resource=res.body.rows;
                }
            })
        },
        addDownloadRecord:function (id,url) {//下载保存记录
            var _this = this;
            // this.$http.post(SERVERROOTDATA + "ResourceDownload.ashx?action=resourceDownloadSave",
            //     {
            //         saveTag:'add',
            //         studioResourceId:id
            //     }
            //     ,{emulateJSON: true})
            //     .then(function (res) {});
            var form=$("<form>");//定义一个form表单
            form.attr("style","display:none");
            form.attr("target","");
            form.attr("method","get");  //请求类型
            form.attr("action",SERVERROOTFILE + url);   //请求地址
            $("body").append(form);//将表单放置在web中
            form.submit();//表单提交
        }
    }
});