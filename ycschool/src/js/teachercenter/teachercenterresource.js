require('../../css/teachercenter/teachercenter.less')
if(!checkInIframe()){
    window.location.href ="./teachercenter.html";
}
// 资源
new Vue({
    el: "#teacherCenterResource",
    data: {
        courseArr:[],
        showItem: 4,//页码显示条数
        allpage: 0,//总页数
        current: 1,//当前页
        nodata:false,
        state:0//0为课件，1为教案
    },
    filters: {
        addRootFile: function addRootFile(img) {
            return SERVERROOTFILE + img;
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
            _this.getResource(_this.current,2);
            _this.bindNav();
        })
    },
    methods: {
        bindNav:function () {
            var _this = this;
            $('.teacherCenterResource .title').on('click','span',function () {
                if($(this).hasClass('active')){
                    return;
                }else{
                    $(this).addClass('active');
                    $(this).siblings().removeClass('active');
                    var id = $(this).data('id');
                    if(id==0){ //课件
                        _this.state=0;
                        _this.current=1;
                        _this.getResource(_this.current,2);
                    }else{ //教案
                        _this.state=1;
                        _this.current=1;
                        _this.getResource(_this.current,1);
                    }
                }
            })
        },
        getResource: function (pageIndex,resourceType) {
            var _this = this;
            this.$http.post(SERVERROOTDATA + "api/teacher/site/courseware.ashx?action=resourceList",
                {
                    pageIndex: pageIndex,
                    pageSize: 8,
                    resourceType:resourceType
                }
                , { emulateJSON: true })
                .then(function (res) {
                    if (res.body.code==200) {
                        _this.courseArr = [];
                        if(res.body.rows.length<1){
                            _this.nodata=true;
                        }else{
                            _this.nodata=false;
                            _this.courseArr = res.body.rows.reverse();
                        }

                        _this.allpage = res.body.totalPageCount;
                    }
                }).then(function () {
                    $(window.parent.document).find("#jTeacherIframe").css("height",$('.teacherCenterResource').height()+135 +"px");
            })
        },
        edit:function (id) {
            window.location.href="uploadresource.html?tag=update&resourceId=" + id;
        },
        deleteResource:function (id) {
            var _this = this;
            this.$http.post(SERVERROOTDATA + "api/teacher/site/courseware.ashx?action=saveResource",
                {
                    tag: 'delete',
                    resourceId: id
                }
                , { emulateJSON: true })
                .then(function (res) {
                    if (res.body.code==200) {
                        layer.msg('删除成功');
                        setTimeout(function () {
                            if(_this.state==0){
                                _this.getResource(_this.current,2);
                            }else{
                                _this.getResource(_this.current,1);
                            }
                        },1000);
                    }
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
                _this.getResource(_this.current,2);
            }else{
                _this.getResource(_this.current,1);
            }
        }
    }
});