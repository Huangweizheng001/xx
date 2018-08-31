/**
 * Created by Administrator on 2018/5/16 0016.
 */
require("../../css/config.less");
require("../../css/educationteaching/bookdetails.css");


var bookId = $(this).getUrlParam("bookId");

function teachingActivitiesetails() {
    new Vue({
        el:"#bookDetils",
        data:{
            beginTime:"",
            title:"",
            content:"",
            activityTypeName:"",
            data:{},
            bookId:0,
        },
        filters: {
            addRootFile: function addRootFile(img) {
                return SERVERROOTFILE + img;
            },
            gotoMiddle: function(bookId) {
				return 'miframe.html?bookId=' + bookId;
			},
			gotoDetail: function(bookId) {
				return 'bookdetails.html?bookId=' + bookId;
			},
        },
        computed: {

        },
        mounted:function () {

        },
        created:function () {
            this.$nextTick(function() {
                this.qreyetails();
                this.bookId = bookId;
            });
        },
        methods:{

            qreyetails:function(){//详情数据
                var _this = this;
                this.$http.post( SERVERROOTDATA +"website/ashx/site/Book.ashx?action=getBookDetailById", {
                	bookId: bookId,
                }, {
                    emulateJSON: true
                }).then(function(res) {
                    _this.data = res.body.rows;
                    // _this.activityTypeName = res.body.rows[0].activityTypeName;
                });
            },
            back:function(){
                this.$router.go(-1);//返回上一层
            },
        },
    })

}

teachingActivitiesetails()
