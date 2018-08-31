require("../../css/footer/footer.less");

Vue.component('footer-template', {
    template: '<div class="container">'+
    '<div class="footerInner">' +
    '<div class="footerTop clearfix">' +
    '<div class="span7">' +
    '<div class="span5">' +
    '	<a class="footerlogo" href="javacript:;">' +
    '<img src="../../images/static/logo.jpg" alt="" />' +
    '	</a>' +
    '</div>' +
    '<div class="span7">' +
    '	<div class="footerLinkInf">' +
    '		<p>地址：福州市闽侯县乌龙江北大道</p>' +
    '		<p>电话：022-23504845</p>' +
    '		<p>邮件：baoweichu@fudan.edu.cn</p>' +
    '	</div>' +
    '</div>' +
    '</div>' +
    '<div class="span5">' +
    '	<div class="footerRQBox clearfix">' +
    '		<div class="span4">' +
    '			<div class="footerRQLi">' +
    '				<img src="../../images/static/download1.jpg" />' +
    '				<p>移动客户端</p>' +
    '				<p>下载</p>' +
    '			</div>' +
    '		</div>' +
    '		<div class="span4">' +
    '<div class="footerRQLi">' +
    '				<img src="../../images/static/download2.jpg" />' +
    '				<p>福建一中</p>' +
    '				<p>微信公众号</p>' +
    '			</div>' +
    '		</div>' +
    '		<div class="span4">' +
    '			<div class="footerRQLi">' +
    '				<img src="../../images/static/download3.jpg" />' +
    '				<p>福州一中</p>' +
    '				<p>官方微博</p>' +
    '			</div>	' +
    '		</div>' +
    '	</div>' +
    '</div>' +
    '</div>' +
    '<div class="footerFriendLinkList">' +
    '	友情链接:' +
    '	<a href="javascript:;" target="_blank">人民网</a>' +
    '	<a href="javascript:;" target="_blank">东南网</a>' +
    '	<a href="javascript:;" target="_blank">福建教育网</a>' +
    '	<a href="javascript:;" target="_blank">金鹰网</a>' +
    '</div>' +
    '</div>' +
    '</div>',
    data: function() {
        return {

        }

    },
    mounted: function mounted() {
        //1.0ready --> 2.0 
        this.$nextTick(function() {

        });
    },
    filters: {},
    methods: {}
})

var footer = new Vue({
    el: '#footer'
});