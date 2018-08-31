/**
 * Created by Administrator on 2018/5/16 0016.
 */
require("../../css/config.less");
require("../../css/educationteaching/digitalbooks.css");

function teachingList() {
    new Vue({
        el:"#digitalBooks",
        data:{
            current:1,
            allpage:0,
            showItem: 6,
            data:{},
            searchName:'',
            
        },
        filters: {
            addRootFile: function addRootFile(img) {
                return SERVERROOTFILE + img;
            },
            gotoDetail: function(bookId) {
				return 'bookdetails.html?bookId=' + bookId;
			},
			gotoMiddle: function(bookId) {
				return 'miframe.html?bookId=' + bookId;
			}
        },
        computed: {
            pages: function() {
                var pag = [];
                if(this.current < this.showItem) { //如果当前的激活的项 小于要显示的条数
                    //总页数和要显示的条数那个大就显示多少条
                    var i = Math.min(this.showItem, this.allpage);
                    while(i) {
                        pag.unshift(i--);
                    }
                } else { //当前页数大于显示页数了
                    var middle = this.current - Math.floor(this.showItem / 2), //从哪里开始
                        i = this.showItem;
                    if(middle > (this.allpage - this.showItem)) {
                        middle = (this.allpage - this.showItem) + 1
                    }
                    while(i--) {
                        pag.push(middle++);
                    }
                }
                return pag
            }
        },
        mounted:function () {
            this.$nextTick(function() {
                this.qreydigitalBooks();
            });
        },
        methods:{
            goto: function(index) { //枫叶处理
                var _this = this;
                if(index == this.current) return;
                if(index > this.allpage) {
                    this.current = this.current - 2;
                    layer.msg("Sorry ╮(╯_╰)╭ 没有下一页喽！");
                    return false;
                }
                _this.current = index;
                _this.qreydigitalBooks();
            },
            searchList(){
            	this.current = 1;
            	this.qreydigitalBooks();
            },
            qreydigitalBooks:function () {//在线图书
                var _this=this;
                this.$http.post( SERVERROOTDATA +"website/ashx/site/Book.ashx?action=getEBook", {
                    name:_this.searchName,
                	pageSize: 5,//一页个数
                    pageIndex:_this.current,//页码
                    // pageIndex: pageIndex,
                }, {
                    emulateJSON: true
                }).then(function(res) {
                    if(res.body.code==200){
                        _this.data = res.body.rows;
                        _this.allpage=res.body.totalPageCount;
                    }
                })
            },
        },



    })
}
teachingList()