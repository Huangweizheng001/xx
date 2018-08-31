//loading
function loadingTips() {
	layer.open({
		type: 2,
		className: "loadingTips",
		shadeClose: false,
		content: '加载中',
	});

}

//close loading
function closeLoadingTips() {
	layer.closeAll();
}

//loading error tips and refresh
function loadingErrorTips() {
	layer.open({
		type: 2,
		className: "loadingTips loadErrorRefresh",
		shadeClose: false,
		content: '加载错误，点击刷新',
	});
}

//loading
function loadingTipsAuto() {
	layer.open({
		type: 2,
		className: "loadingTips",
		shadeClose: false,
		content: '加载中',
		time:2
	});

}

$("body").on("click", ".loadErrorRefresh", function() {
	window.location.reload();
})

//上啦加载和下拉刷新
var myScroll,
	pullDownEl, pullDownOffset,
	pullUpEl, pullUpOffset,
	generatedCount = 0;

function pullUploaded(){
	pullUpEl = document.getElementById('pullUp');
	pullUpOffset = pullUpEl.offsetHeight;
console.log(pullUpOffset)
	myScroll = new iScroll('wrapper', {
		useTransition: true,
		topOffset: pullDownOffset,
		 mouseWheel: true, //开启鼠标滚轮支持
         scrollbars: true, //开启滚动条
		//刷新的时候，加载初始化刷新更多的提示div
		onRefresh: function() {
			
			if(this.maxScrollY > -40) {
				pullUpEl.style.display = 'none';
			} else {
				pullUpEl.style.display = 'block';
				if(pullUpEl.className.match('loading')) {
					pullUpEl.className = '';
					pullUpEl.querySelector('.pullUpLabel').innerHTML = 'Pull up to load more...';
				}
			}
		},
		//拖动，滚动位置判断
		onScrollMove: function() {
			
			if(this.maxScrollY < 0 && this.y < (this.maxScrollY - 5) && !pullUpEl.className.match('flip')) {
				pullUpEl.style.display = 'block';
				pullUpEl.querySelector("span").className = 'pullUpIcon';
				pullUpEl.className = 'flip';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = 'Release to load more...';
				this.maxScrollY = this.maxScrollY;
			} else if(this.maxScrollY < 0 && this.y > (this.maxScrollY + 5) && pullUpEl.className.match('flip')) {
				pullUpEl.style.display = 'block';
				pullUpEl.querySelector("span").className = 'pullUpIcon';
				pullUpEl.className = '';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = 'Pull up to load more...';
				this.maxScrollY = pullUpOffset;
				
			}
		},
		onScrollEnd: function() {
			if(pullUpEl.className.match('flip')) {
				pullUpEl.className = 'loading';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = 'Loading...';
				$.pullUpAction(); // Execute custom function (ajax call?)
			}
		}
	});

	setTimeout(function() {
		document.getElementById('wrapper').style.left = '0';
	}, 800);
}

function loaded() {
	pullDownEl = document.getElementById('pullDown');
	pullDownOffset = pullDownEl.offsetHeight;
	pullUpEl = document.getElementById('pullUp');
	pullUpOffset = pullUpEl.offsetHeight;

	myScroll = new iScroll('wrapper', {
		useTransition: true,
		topOffset: pullDownOffset,
		 mouseWheel: true, //开启鼠标滚轮支持
         scrollbars: true, //开启滚动条
		//刷新的时候，加载初始化刷新更多的提示div
		onRefresh: function() {
			if(this.maxScrollY > -40) {
				pullUpEl.style.display = 'none';
			} else {
				pullUpEl.style.display = 'block';
				if(pullDownEl.className.match('loading')) {
					pullDownEl.className = '';
					pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Pull down to refresh...';
				} else if(pullUpEl.className.match('loading')) {
					pullUpEl.className = '';
					pullUpEl.querySelector('.pullUpLabel').innerHTML = 'Pull up to load more...';
				}
			}
		},
		//拖动，滚动位置判断
		onScrollMove: function() {
			if(this.y > 5 && !pullDownEl.className.match('flip')) { //判断是否向下拉超过5,问题：这个单位好像不是px
				pullDownEl.className = 'flip';
				pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Release to refresh...';
				this.minScrollY = 0;
			} else if(this.y < 5 && pullDownEl.className.match('flip')) {
				pullDownEl.className = '';
				pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Pull down to refresh...';
				this.minScrollY = -pullDownOffset;
			} else if(this.maxScrollY < 0 && this.y < (this.maxScrollY - 5) && !pullUpEl.className.match('flip')) {
				pullUpEl.style.display = 'block';
				pullUpEl.querySelector("span").className = 'pullUpIcon';
				pullUpEl.className = 'flip';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = 'Release to load more...';
				this.maxScrollY = this.maxScrollY;
			} else if(this.maxScrollY < 0 && this.y > (this.maxScrollY + 5) && pullUpEl.className.match('flip')) {
				pullUpEl.style.display = 'block';
				pullUpEl.querySelector("span").className = 'pullUpIcon';
				pullUpEl.className = '';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = 'Pull up to load more...';
				this.maxScrollY = pullUpOffset;
			}
		},
		onScrollEnd: function() {
			if(pullDownEl.className.match('flip')) {
				pullDownEl.className = 'loading';
				pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Loading...';
				$.pullDownAction(); // Execute custom function (ajax call?)
			} else if(pullUpEl.className.match('flip')) {
				pullUpEl.className = 'loading';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = 'Loading...';
				$.pullUpAction(); // Execute custom function (ajax call?)
			}
		}
	});

	setTimeout(function() {
		document.getElementById('wrapper').style.left = '0';
	}, 800);
}
