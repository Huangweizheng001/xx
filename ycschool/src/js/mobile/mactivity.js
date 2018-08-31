require("../../css/mobile/mactivity.less");

var activityId = $(this).getUrlParam("activityId");

var mactivity = function() {
	new Vue({
		el: "#jmactivityApp",
		data: {
			activityArr: []
		},
		mounted: function mounted() {
			this.$nextTick(function() {
				this.queryDetail();
				this.studyActivityFinish();
			});
		},
		methods: {
			queryDetail: function() {
				var _this = this;
				this.$http.post(SERVERROOTDATA + "website/ashx/site/Activity.ashx?action=getStudyActivityDetail", {
					activityId: activityId,
				}, {
					emulateJSON: true
				}).then(function(res) {
					_this.activityArr = res.body.currentActivity;
				});
			},
			studyActivityFinish: function() { //更新活动状态
				var _this = this;
				this.$http.post(SERVERROOTDATA + "/website/ashx/site/Activity.ashx?action=studyActivityFinish", {
					activityId: activityId,
				}, {
					emulateJSON: true
				});
			}
		},
	})
}

mactivity();