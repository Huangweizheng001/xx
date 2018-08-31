/**
 * Created by Administrator on 2017/11/1 0001.
 */
// 嘉宾-主页
var LoadEnd = false;
var current = 0;
var teacherId = $.getUrlParam("teacherId");
var dropload1 = $('#discussindex').dropload({
	scrollArea: window,
	loadDownFn: function(me) {
		//获取类型
		setTimeout(function() {
			current++;
			teachersay(me, teacherId, current); //默认首页
		}, 500);

	}
});

function teachersay(me, teacherId, pageIndex) {

	$.ajax({
		type: "GET",
		url: SERVEROOTDATA + 'Teacher.ashx?action=getGuestHomePage',
		dataType: "json",
		data: {
			"teacherId": teacherId,
			"pageIndex": pageIndex,
			"pageSize": 4
		},
		success: function(result) {
			console.log(result);
			if(result.rows.length < 1) {
				LoadEnd = true;
				// 锁定
				me.lock();
				// 无数据
				me.noData();

				// 为了测试，延迟1秒加载
				setTimeout(function() {
					// 每次数据加载完，必须重置
					me.resetload();
				}, 1000);

				return false;
			} else {
				var html = $("<div></div>");
				for(var i = 0; i < result.rows.length; i++) {
					var content = $('<div class="dycguestsay clearfix"></div>');
					var span2 = $('<div class="span2"><div class="dycdycguestsay-tx"><img src="' + SERVEROOTFILE + result.rows[i].iconPath + '" alt=""></div></div>');
					var span10 = $('<div class="span10">' +
						'<div class="dycguestsay-name">' + result.rows[i].teacherName + '</div>' +
						'<div class="dycguestsay-time">' + result.rows[i].publishDate + '</div>' +
						'<div class="dycguestsay-content">' + result.rows[i].context + '</div>' +
						'</div><div style="clear: both"></div>');
					var num = "添加评论";
					if(result.rows[i].recommendCount != 0) {
						num = result.rows[i].recommendCount;
					}
					var p = $('<p class="clearfix" data-id="' + result.rows[i].saySomethingId + '">' +
						'<span class="dianzang">' + result.rows[i].thumbUpCount + '</span><b>|</b>' +
						'<span class="pinglun" data-count="' + result.rows[i].recommendCount + '">' + num + '</span></p>');
					var pinglunarea = $('<div class="dycpinglunarea">' +
						'<div class="dycliuyan-parent"><input type="text" placeholder="回复' + result.rows[i].teacherName + ':"><button>评论</button></div>' +
						'<ul class="dycdiscuss"><div class="dyclookmore"><span>查看更多</span></div></ul></div>');
					content.append(span2).append(span10).append(p).append(pinglunarea);
					// 查看评论
					content.on('click', 'p .pinglun', function() {
						if($(this).html() == '收起') {
							$('.dycpinglunarea').hide(200);
                            var count=$(this).data('count');
							$(this).html(count==0 ? "添加评论":count);
							$(this).parent().next().find('.dycdiscuss').find('li').remove();
							$(this).parent().next().find('.dycdiscuss').find('.dyclookmore').css('display', 'block');
						} else {
							var _this = $(this);
							var id = $(this).parent().data('id');
							getresult(1, id, _this);
							$(this).parent().next().find('.dyclookmore').data('current', 1);
						}
					});
					// 发表评论
					pinglunarea.on('click', '.dycliuyan-parent button', function() {
						var _this = $(this);
						var mid = localStorage.getItem('$ycuid');
						var img = localStorage.getItem('$ycuheader');
						var nick = localStorage.getItem('$ycuname');
						if(mid == undefined || mid == null || mid == 'undefined') {
							/*layer.open({
								content: '请先登录!',
								skin: 'msg',
								time: 1 //2秒后自动关闭
							});*/
							layer.open({
							    content: '您还未登录，是否前往？'
							    ,btn: ['是', '不要']
							    ,yes: function(index){
							      window.location.href='login.html';
							    }
							  });
						} else {
							var saySomethingId = $(this).parent().parent().prev().data('id');
							var value = $(this).prev().val();
							var reg = /\S+/;
                            $(this).prev().val('');
							if(!reg.test(value)) {
								layer.open({
									content: '评论不能为空!',
									skin: 'msg',
									time: 1 //2秒后自动关闭
								});
							} else {
								$.ajax({
									type: "post",
									url: SERVEROOTDATA + "SayEvaluation.ashx?action=evaluation",
									dataType: 'text',
									data: {
										memberId: mid,
										saySomethingId: saySomethingId,
										parentid: 0,
										sayEvaluationLevel1Id: 0,
										evaluation: value
									},
									success: function(data) {
										console.log(data);
										if(data == 200) {

											layer.open({
												content: '评论成功!',
												skin: 'msg',
												time: 1 //2秒后自动关闭
											});
											var html = $('<li><div class="dyctop clearfix"><img src="' + img + '" alt="">' +
												'<h4>' + nick + '</h4><s>' + CurentTime() + '</s></div>' +
												'<div class="dycbox"><p>' + value + '</p><button>回复</button><span class="dianzang">0</span></div></li>');
											_this.parent().parent().find('.dycdiscuss').prepend(html);

											var n = _this.parent().parent().prev().find('.pinglun').data('count');
											_this.parent().parent().prev().find('.pinglun').data('count', ++n);
										}
									},
									error: function(err) {
                                        console.log(err);
									}
								});
							}

						}
					})
					// 说说点赞
					content.on('click', 'p .dianzang', function() {
						var _this = $(this);
						var count = parseInt($(this).html());
						$.ajax({
							type: "post",
							url: SERVEROOTDATA + "SayEvaluation.ashx?action=thumbUp",
							dataType: 'text',
							data: {
								typeId: 1,
								objId: $(this).parent().data('id')
							},
							success: function(data) {
								if(data == 200) {
									layer.open({
										content: '点赞成功!',
										skin: 'msg',
										time: 1 //2秒后自动关闭
									});
									_this.html(++count);
								}
							},
							error: function(err) {
                                console.log(err);
							}
						});
					});
					// 查看更多
					pinglunarea.on('click', '.dycdiscuss .dyclookmore span', function() {
						var current = $(this).parent().data('current');
						current++;
						var id = $(this).parent().parent().parent().prev().data('id');
						$(this).parent().data('current', current);
						getresult(current, id, $(this).parent().parent().parent().prev().find('.pinglun'));
					})

					html.append(content);
				}
				$('#discuss').append(html);
				window.kcxqSwiper.update();

				if(pageIndex >= result.totalPageCount) {
					console.log('到底啦')
					// 数据加载完
					//LoadEnd = true;
					LoadEnd = true;
					// 锁定
					me.lock();
					// 无数据
					me.noData();
					//break;
				}
				// 每次数据加载完，必须重置
				me.resetload();
			}
		},
		error: function(err) {
			console.log(err);
			// 加载出错，也得重置
			me.resetload();
		}
	});
}
function CurentTime()
{
    var now = new Date();

    var year = now.getFullYear();       //年
    var month = now.getMonth() + 1;     //月
    var day = now.getDate();            //日

    var hh = now.getHours();            //时
    var mm = now.getMinutes();          //分

    var clock = year + "-";

    if(month < 10)
        clock += "0";

    clock += month + "-";

    if(day < 10)
        clock += "0";

    clock += day + " ";

    if(hh < 10)
        clock += "0";

    clock += hh + ":";
    if (mm < 10) clock += '0';
    clock += mm;
    return(clock);
}
// 获取评论数组
function getresult(pcurrent, id, obj) {
	$.ajax({
		type: "post",
		url: SERVEROOTDATA + "SayEvaluation.ashx?action=getEvaluation",
		dataType: 'json',
		data: {
			saySomethingId: id,
			pageIndex: pcurrent,
			pageSize: 3
		},
		success: function(data) {
			obj.parent().next().css('display', 'block');
			discuss(data.rows, id, obj);
			obj.html('收起');
			if(pcurrent >= data.totalPageCount) {
				obj.parent().next().find('.dyclookmore').css('display', 'none');
			}
			window.kcxqSwiper.update();
		},
		error: function(err) {
            console.log(err);
		}
	});
}
// 获取评论方法
function discuss(result, sayId, obj) {
	// var parent=$('<ul class="dycdiscuss"></ul>');
	for(var i = 0; i < result.length; i++) {
		var Chirld = $('<ul class="dycdiscuss-chirld"></ul>');
		if(result[i].children.length < 1) {

		} else {
			// 2级评论区
			var child = result[i].children;
			for(var j = 0; j < child.length; j++) {
				var cli = $('<li data-sayEvaluationId="' + child[j].sayEvaluationId + '" data-sayEvaluationLevel1Id="' + child[j].sayEvaluationLevel1Id + '"></li>');
				var ctop = $('<div class="dyctop clearfix"><img src="' + SERVEROOTFILE + child[j].iconPath + '" alt="">' +
					'<h4 data-id="' + child[j].memberId + '"><span>' + child[j].nickName + '</span><b>回复</b> ' + child[j].byReplyNickName + '</h4>' +
					'<s>' + child[j].evaluationDate + '</s></div>');
				// var cp=$('<p>'+ child[j].evaluation +'</p>');
				var cbox = $('<div class="dycbox"><p>' + child[j].evaluation + '</p><button>回复</button> <span class="dianzang">' + child[j].thumbUpCount + '</span></div>');
				// 绑定回复方法
				cbox.on('click', 'button', function() {
					$('.dycpinglunarea .dycliuyan').remove();
					var toObj = $(this).parent().parent().find('.dyctop').find('h4').find('span').html();
                    var nick = localStorage.getItem('$ycuname');
					if(nick == toObj) { //防止自己回复自己
						layer.open({
							content: '不能回复自己',
							skin: 'msg',
							time: 1 //2秒后自动关闭
						});
						return;
					}
					var liuyan = $('<div class="dycliuyan"><input type="text" placeholder="回复' + toObj + ':"><button>评论</button></div>');
					// 绑定评论方法
					liuyan.on('click', 'button', function() {
						var _this = $(this);
                        var mid = localStorage.getItem('$ycuid');
                        var img = localStorage.getItem('$ycuheader');
                        var nick = localStorage.getItem('$ycuname');
						var csayevaluationid = $(this).parent().parent().data('sayevaluationid');
						var csayevaluationlevel1id = $(this).parent().parent().data('sayevaluationlevel1id');
						if(mid == undefined || mid == null || mid == 'undefined') {
							/*layer.open({
								content: '请先登录!',
								skin: 'msg',
								time: 1 //2秒后自动关闭
							});*/
							layer.open({
							    content: '您还未登录，是否前往？'
							    ,btn: ['是', '不要']
							    ,yes: function(index){
							      window.location.href='login.html';
							    }
							  });
						} else {
							var cvalue = $(this).prev().val();
                            $(this).prev().val('');
							var reg = /\S+/;
							if(!reg.test(cvalue)) {
								layer.open({
									content: '评论不能为空!',
									skin: 'msg',
									time: 1 //2秒后自动关闭
								});
							} else {
								$.ajax({
									type: "post",
									url: SERVEROOTDATA + "SayEvaluation.ashx?action=evaluation",
									dataType: 'text',
									data: {
										memberId: mid,
										saySomethingId: sayId,
										parentid: csayevaluationid,
										sayEvaluationLevel1Id: csayevaluationlevel1id,
										evaluation: cvalue
									},
									success: function(data) {
										if(data == 200) {
											layer.open({
												content: '评论成功!',
												skin: 'msg',
												time: 1 //2秒后自动关闭
											});
											var html = $('<li><div class="dyctop clearfix"><img src="' + img + '" alt="">' +
												'<h4><span>' + nick + '</span><b>回复</b>' + toObj + '</h4><s>' + CurentTime() + '</s></div>' +
												'<div class="dycbox"><p>' + cvalue + '</p><button>回复</button><span class="dianzang">0</span></div></li>');

											if(_this.parent().parent().parent().parent().find('.dycdiscuss-chirld').length < 1) {
												_this.parent().parent().parent().parent().append('<ul class="dycdiscuss-chirld"></ul>')
											}
											_this.parent().parent().parent().parent().find('.dycdiscuss-chirld').css({
												"padding": ".5rem",
												"margin-top": "10px",
												// "border": "1px solid #ccc",
                                                "background":"#f5f5f5",
												"border-radius": "5px",
                                                "display":"block"
											}).prepend(html);
											var n = _this.parent().parent().parent().parent().parent().parent().prev().find('.pinglun').data('count');
											_this.parent().parent().parent().parent().parent().parent().prev().find('.pinglun').data('count', ++n);
										}

									},
									error: function(err) {
                                        console.log(err);
									}
								});
							}

						}
					});
					$(this).parent().parent().append(liuyan);
				});
				// 绑定点赞方法
				cbox.on('click', '.dianzang', function() {
					var _this = $(this);
					var count = parseInt($(this).html());
					$.ajax({
						type: "post",
						url: SERVEROOTDATA + "SayEvaluation.ashx?action=thumbUp",
						dataType: 'text',
						data: {
							typeId: 2,
							objId: $(this).parent().parent().data('sayevaluationid')
						},
						success: function(data) {
							if(data == 200) {
								layer.open({
									content: '点赞成功!',
									skin: 'msg',
									time: 1 //2秒后自动关闭
								});
								_this.html(++count);
								var dcount = _this.parent().parent().parent().parent().parent().parent().prev().find('.dianzang').html();
								_this.parent().parent().parent().parent().parent().parent().prev().find('.dianzang').html(++dcount);
							}
						},
						error: function(err) {
                            console.log(err);
						}
					});
				});
				cli.append(ctop);
				// cli.append(cp);
				cli.append(cbox);
				Chirld.append(cli);
				Chirld.css({
					"padding": ".5rem",
					"margin-top": "10px",
					// "border": "1px solid #ccc",
                    "background":"#f5f5f5",
					"border-radius": "5px"
				})
			}
		}
		// 一级评论区
		var pli = $('<li data-sayEvaluationId="' + result[i].sayEvaluationId + '" data-sayEvaluationLevel1Id="' + result[i].sayEvaluationLevel1Id + '"></li>');
		var ptop = $('<div class="dyctop clearfix"><img src="' + SERVEROOTFILE + result[i].iconPath + '" alt="">' +
			'<h4 data-id="' + result[i].memberId + '"><span>' + result[i].nickName + '</span></h4>' +
			'<s>' + result[i].evaluationDate + '</s></div>');
		// var pp=$('<p>'+ result[i].evaluation +'</p>');
		var pbox = $('<div class="dycbox"><p>' + result[i].evaluation + '</p><button>回复</button> <span class="dianzang">' + result[i].thumbUpCount + '</span><span class="lookup" data-pcount="'+ result[i].children.length +'">查看('+ result[i].children.length +')</span></div>');
		//绑定回复方法
		pbox.on('click', 'button', function() {
			$('.dycpinglunarea .dycliuyan').remove();
			var duixiang = $(this).parent().parent().find('.dyctop').find('h4').find('span').html();
            var nick = localStorage.getItem('$ycuname');
			if(nick == duixiang) { //防止自己回复自己
				layer.open({
					content: '不能回复自己!',
					skin: 'msg',
					time: 1 //2秒后自动关闭
				});
				return;
			}
			var pliuyan = $('<div class="dycliuyan"><input type="text" placeholder="回复' + duixiang + ':"><button>评论</button></div>');
			// 绑定评论方法
			pliuyan.on('click', 'button', function() {
				var _this = $(this);
                var mid = localStorage.getItem('$ycuid');
                var img = localStorage.getItem('$ycuheader');
                var nick = localStorage.getItem('$ycuname');
				var sayevaluationid = $(this).parent().parent().data('sayevaluationid');
				var sayevaluationlevel1id = $(this).parent().parent().data('sayevaluationlevel1id');
				if(mid == undefined || mid == null || mid == 'undefined') {
					/*layer.open({
						content: '请先登录!',
						skin: 'msg',
						time: 1 //2秒后自动关闭
					});*/
					layer.open({
							    content: '您还未登录，是否前往？'
							    ,btn: ['是', '不要']
							    ,yes: function(index){
							      window.location.href='login.html';
							    }
							  });
				} else {
					var value = $(this).prev().val();
                    $(this).prev().val('');
					var reg = /\S+/;
					if(!reg.test(value)) {
						layer.open({
							content: '评论不能为空!',
							skin: 'msg',
							time: 1 //2秒后自动关闭
						});
					} else {
						$.ajax({
							type: "post",
							url: SERVEROOTDATA + "SayEvaluation.ashx?action=evaluation",
							dataType: 'text',
							data: {
								memberId: mid,
								saySomethingId: sayId,
								parentid: sayevaluationid,
								sayEvaluationLevel1Id: sayevaluationlevel1id,
								evaluation: value
							},
							success: function(data) {
								layer.open({
									content: '评论成功!',
									skin: 'msg',
									time: 1 //2秒后自动关闭
								});
								if(data == 200) {
									var html = $('<li><div class="dyctop clearfix"><img src="' + img + '" alt="">' +
										'<h4><span>' + nick + '</span><b>回复</b>' + duixiang + '</h4><s>' + CurentTime() + '</s></div>' +
										'<div class="dycbox"><p>' + value + '</p><button>回复</button><span class="dianzang">0</span></div></li>');

									if(_this.parent().parent().find('.dycdiscuss-chirld').length < 1) {
										_this.parent().parent().append('<ul class="dycdiscuss-chirld"></ul>');

									}
									_this.parent().parent().find('.dycdiscuss-chirld').css({
										"padding": ".5rem",
										"margin-top": "10px",
										// "border": "1px solid #ccc",
                                        "background":"#f5f5f5",
										"border-radius": "5px",
                                        "display":"block"
									}).prepend(html);
                                    _this.parent().prev().find('.lookup').html('收起');
                                    var plnum=_this.parent().prev().find('.lookup').data('pcount');
                                    _this.parent().prev().find('.lookup').data('pcount',++plnum);

									var n = _this.parent().parent().parent().parent().prev().find('.pinglun').data('count');
									_this.parent().parent().parent().parent().prev().find('.pinglun').data('count', ++n);
								}
							},
							error: function(err) {
                                console.log(err);
							}
						});
					}

				}
			});
			$(this).parent().after(pliuyan);
		});
		// 绑定点赞方法
		pbox.on('click', '.dianzang', function() {
			var _this = $(this);
			var count = parseInt($(this).html());
			$.ajax({
				type: "post",
				url: SERVEROOTDATA + "SayEvaluation.ashx?action=thumbUp",
				dataType: 'text',
				data: {
					typeId: 2,
					objId: $(this).parent().parent().data('sayevaluationid')
				},
				success: function(data) {
					if(data == 200) {
						layer.open({
							content: '点赞成功!',
							skin: 'msg',
							time: 1 //2秒后自动关闭
						});
						_this.html(++count);
						var dcount = _this.parent().parent().parent().parent().prev().find('.dianzang').html();
						_this.parent().parent().parent().parent().prev().find('.dianzang').html(++dcount);
					}
				},
				error: function(err) {
					console.log(err);
				}
			});
		});
		pbox.on('click', '.lookup', function() {
			if($(this).html() == '收起') {
				$(this).parent().parent().find('.dycdiscuss-chirld').hide();
                var count=$(this).data('pcount');
				$(this).html('查看('+ count +')');
			} else {
                if($(this).data('pcount')==0){return}
                $(this).parent().parent().find('.dycdiscuss-chirld').show();
				$(this).html('收起');
			}
		});
		pli.append(ptop);
		// pli.append(pp);
		pli.append(pbox);
		pli.append(Chirld);
		// parent.append(pli);
		$(obj).parent().next().find('.dycdiscuss').find('.dyclookmore').before(pli);
	}

}