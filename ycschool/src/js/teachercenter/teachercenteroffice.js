require("../../css/teachercenter/teachercenter.less");

if(!checkInIframe()){
    window.location.href ="./teachercenter.html";
}
new Vue({
    el: "#teacherCenterOffice",
    data: {
        officeArr:[],
        carArr:[],
        state:0, //0为会议室，1为车牌
        showItem: 4,//页码显示条数
        allpage: 0,//总页数
        current: 1,//当前页
        noOffice:false,
        noCar:false
    },
    filters: {
        addRootFile: function addRootFile(img) {
            return SERVERROOTFILE + img;
        },
        // getState:function getState(num) {
        //     switch (num){
        //         case '0':
        //             return "未审批";
        //             break;
        //         case '1':
        //             return "已安排";
        //             break;
        //         case '2':
        //             return "拒绝";
        //             break;
        //     }
        // },
        // getOfficeClass:function (num) {
        //     switch (num){
        //         case '0':
        //             return "audited";
        //             break;
        //         case '1':
        //             return "alreadyPassed";
        //             break;
        //         case '2':
        //             return "noThrough";
        //             break;
        //     }
        // },
        getCarClass:function (num) {
            switch (num){
                case '未审批':
                    return "audited";
                    break;
                case '已安排':
                    return "alreadyPassed";
                    break;
                case '拒绝':
                    return "noThrough";
                    break;
            }
        }
    },
    computed: {
        pages: function () {
            var pag = [];
            if (this.current < this.showItem) { //如果当前的激活的项 小于要显示的条数
                //总页数和要显示的条数那个大就显示多少条
                var i = Math.min(this.showItem, this.allpage);
                while (i) {
                    pag.unshift(i--);
                }
            } else { //当前页数大于显示页数了
                var middle = this.current - Math.floor(this.showItem / 2), //从哪里开始
                    i = this.showItem;
                if (middle > (this.allpage - this.showItem)) {
                    middle = (this.allpage - this.showItem) + 1
                }
                while (i--) {
                    pag.push(middle++);
                }
            }
            return pag
        }
    },
    mounted: function () {
        var _this = this;
        this.$nextTick(function () {
            _this.bindNav();
            _this.getOffice(1);
        })
    },
    methods: {
        bindNav:function () {
            var _this = this;
            $('.teacherCenterOffice .title').on('click','span',function () {
                if($(this).hasClass('active')){
                    return;
                }else{
                    $(this).addClass('active');
                    $(this).siblings().removeClass('active');
                    var id = $(this).data('id');
                    if(id==0){ //会议室
                        _this.state=0;
                        _this.current=1;
                        $('#apply').attr('href','addapply.html?type=0');
                        _this.getOffice(_this.current);
                    }else{ //车牌
                        _this.state=1;
                        _this.current=1;
                        $('#apply').attr('href','addapply.html?type=1');
                        _this.getCar(_this.current);
                    }
                }
            })
        },
        getOffice: function (pageIndex) {
            var _this = this;
            this.$http.post(SERVERROOTDATA + "api/teacher/site/office.ashx?action=boardroomApplyList",
                {
                    pageIndex: pageIndex,
                    pageSize: 4
                }
                , { emulateJSON: true })
                .then(function (res) {
                    if (res.body.code==200) {
                        if(res.body.rows.length<1){
                            _this.noOffice=true;
                        }else{
                            _this.noOffice=false;
                            _this.officeArr = res.body.rows.reverse();
                        }
                        _this.allpage = res.body.totalPageCount;
                    }
                }).then(function () {
                $(window.parent.document).find("#jTeacherIframe").css("height",$('.teacherCenterOffice').height()+135 +"px");
            })
        },
        getCar:function (pageIndex) {
            var _this = this;
            this.$http.post(SERVERROOTDATA + "api/teacher/site/office.ashx?action=carApplyList",
                {
                    pageIndex: pageIndex,
                    pageSize: 4
                }
                , { emulateJSON: true })
                .then(function (res) {
                    if (res.body.code==200) {
                        if(res.body.rows.length<1){
                            _this.noCar=true;
                        }else{
                            _this.noCar=false;
                            _this.carArr = res.body.rows.reverse();
                        }
                        _this.allpage = res.body.totalPageCount;
                    }
                }).then(function () {
                $(window.parent.document).find("#jTeacherIframe").css("height",$('.teacherCenterOffice').height()+135 +"px");
            })
        },
        goto: function (index) { //枫叶处理
            var _this = this;
            if (index == this.current) return;
            if (index > this.allpage) {
                this.current = this.current - 2;
                layer.msg("Sorry ╮(╯_╰)╭ 没有下一页喽！");
                return false;
            }
            this.current = index;
            if(_this.state==0){
                _this.getOffice(_this.current);
            }else{
                _this.getCar(_this.current);
            }

        }
    }
});