require("../../css/config.less");
require("../../css/teachingactivities/details.css");
/**
 * Created by Administrator on 2018/5/14 0014.
 */

var activityId = $(this).getUrlParam("activityId");

function teachingActivitiesetails() {
    new Vue({
        el:"#teachingActivitiesetails",
        data:{
            beginTime:"",
            title:"",
            content:"",
            activityTypeName:"",
            data:{}
        },
        filters: {
            addRootFile: function addRootFile(img) {
                return SERVERROOTFILE + img;
            },
            gotoDetail: function(aId) {
				return 'details.html?activityId=' + aId;
			}
        },
        computed: {

        },
        mounted:function () {

        },
        created:function () {
            this.$nextTick(function() {
                this.qreyetails();
                this.studyActivityFinish();
            });
        },
        methods:{
        	qreyetails:function(){//详情列表获取
                var _this = this;
                this.$http.post( SERVERROOTDATA +"website/ashx/site/Activity.ashx?action=getStudyActivityDetail", {
                    activityId: activityId,
                }, {
                    emulateJSON: true
                }).then(function(res) {
                    _this.data = res.body;
                    _this.activityTypeName = res.body.currentActivity[0].activityTypeName;
                });
            },
            studyActivityFinish:function(){//更新活动状态
                var _this = this;
                this.$http.post( SERVERROOTDATA +"/website/ashx/site/Activity.ashx?action=studyActivityFinish", {
                    activityId: activityId,
                }, {
                    emulateJSON: true
                });
            },
            back:function(){
                this.$router.go(-1);//返回上一层
            },
        },
    })

}

teachingActivitiesetails()

