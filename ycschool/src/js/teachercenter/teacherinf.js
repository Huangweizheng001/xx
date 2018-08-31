require('../../css/studentcenter/userinf.less');

var getUserInf = function() {
    new Vue({
        el: "#teacherInfo",
        data: {
            userData:[]
        },
        filters: {
            addRootFile: function(img) {
                return SERVERROOTFILE + img;
            }
        },
        mounted: function mounted() {
            this.$nextTick(function() {
                this.initData();
            });
        },
        methods: {
            initData: function(){
                var _this = this;
                this.$http.post(SERVERROOTDATA+"api/teacher/site/common.ashx?action=teacherInfo", {

                }, {
                    emulateJSON: true
                }).then(function(res) {
                    if(res.body.code == 200){
                        _this.userData = res.body.rows;
                    }
                });
            }
        }
    });
}

getUserInf();