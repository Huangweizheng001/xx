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
				return 'tdetails.html?activityId=' + aId;
			}
        },
        computed: {

        },
        mounted:function () {

        },
        created:function () {
            this.$nextTick(function() {
                this.qreyetails();
            });
        },
        methods:{
            qreyetails:function(){//详情列表获取
                var _this = this;
                this.$http.post( SERVERROOTDATA +"/website/ashx/site/Activity.ashx?action=getTeachingResultDetail", {
                	resultId : activityId,
                }, {
                    emulateJSON: true
                }).then(function(res) {
                    _this.data = res.body;
                    _this.activityTypeName = res.body.currentResult[0].title;
                });
            },
        },
    })
}

teachingActivitiesetails()

