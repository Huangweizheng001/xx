require("../../css/mobile/mactivity.less");

var activityId = $(this).getUrlParam("activityId");

var mactivity = function() {
	new Vue({
		el: "#jmtactivityApp",
		data: {
			activityArr: []
		},
		mounted: function mounted() {
			this.$nextTick(function() {
				this.queryDetail();
			});
		},
		methods: {
			queryDetail: function() {
				var _this = this;
				this.$http.post(SERVERROOTDATA + "/website/ashx/site/Activity.ashx?action=getTeachingResultDetail", {
					resultId: activityId,
				}, {
					emulateJSON: true
				}).then(function(res) {
					_this.activityArr = res.body.currentResult;
				});
			},
		},
	})
}

mactivity();