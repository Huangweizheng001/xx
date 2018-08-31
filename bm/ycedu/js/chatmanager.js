var newUserIp = "",
	newUserId ="";

function getUserList(obj) {
	if($(".isoutFlag").is(":checked")){    //离线模式
		var htmlStr ="";
		$("#bmonlineCount").text(obj.onlineCount);
		if(obj.newUserInf[0].currentState == "login"){  //登录
			newUserIp = obj.newUserInf[0].ip;  
			newUserIp = newUserIp.replace(/\./g,"_");
			newUserIp = newUserIp.replace(/\:/g,"_"); //外层ID
			 
			newUserId = obj.newUserInf[0].userid;    //内层ID
			
			if(obj.newUserInf[0].name == "游客") {
				uid = obj.newUserInf[0].userid.substr(obj.newUserInf[0].userid.length - 4);
				obj.newUserInf[0].name = "游客" + uid;
			}
			
			if(obj.newUserInf[0].keyWord == "") {
				obj.newUserInf[0].keyWord = null;
			}
			
			if(obj.newUserInf[0].noteInf == undefined){
				obj.newUserInf[0].noteInf = "";
			}
			
			if($("#bm"+newUserIp).length >0){
				htmlStr += '<p class="yc-user-li bm'+newUserId+'" id="bm'+newUserId+'">'+
				'<i class="bmloginTime" datatime='+obj.newUserInf[0].loginTime+'>0:0:0</i>&nbsp;&nbsp;|&nbsp;&nbsp;';
				if(obj.newUserInf[0].mid == -1 ||obj.newUserInf[0].mid == "-1"){
					htmlStr += '<a class="bmuser bmvisitor" onclick="openOto(' + obj.newUserInf[0].userid + ',\'' + obj.newUserInf[0].name + '\');">';
				} else{
					htmlStr += '<a class="bmuser" onclick="openOto(' + obj.newUserInf[0].userid + ',\'' + obj.newUserInf[0].name + '\');">';
				}
				htmlStr += obj.newUserInf[0].name + '</a>&nbsp;&nbsp;|&nbsp;<a class="bmnoteuserInf">'+
				obj.newUserInf[0].noteInf + '</a>&nbsp;&nbsp;|&nbsp;'+
				'<a class="bmformUrl" title="'+obj.newUserInf[0].fromUrl+'" href="' + obj.newUserInf[0].fromUrl + '" target="_blank">' +
				obj.newUserInf[0].fromUrl + '</a>&nbsp;&nbsp;|&nbsp;<span>' +
				obj.newUserInf[0].keyWord + '</span>&nbsp;&nbsp;|&nbsp;&nbsp;<span class="bmformSource">'+
				obj.newUserInf[0].formType + '</span>&nbsp;&nbsp;|&nbsp;&nbsp;'+
				'<a class="bmvisitLook" href="./chatuservisit.html?mid='+obj.newUserInf[0].mid+'" target="_blank">查询&nbsp;&nbsp;|&nbsp;</a>'+
				'<a class="bmvisitLook" href="./pullblackadd.html?mid='+obj.newUserInf[0].mid+'&ip='+obj.newUserInf[0].ip+'" target="_blank">拉黑&nbsp;&nbsp;|&nbsp;</a>'+
				'<a class="bmuserNote" onclick="noteUserName('+obj.newUserInf[0].mid+')"  target="_blank">备注&nbsp;&nbsp;|&nbsp;</a>'+
				'<a class="bmuserNote" onclick="oneReg('+obj.newUserInf[0].userid+')"  target="_blank">注册&nbsp;&nbsp;|&nbsp;</a>'+
				'<a class="bmuserNote" onclick="refreToOne('+obj.newUserInf[0].userid+')"  target="_blank">刷新</a></p>';
				
				$("#bm"+newUserIp).append(htmlStr);
			}else{
				var tId =obj.newUserInf[0].ip;
				tId = tId.replace(/\./g,"_");
				tId = tId.replace(/\:/g,"_");
				htmlStr += "<li id='bm"+tId+"'><p class='bmaddressTitle'>" + obj.newUserInf[0].ip + "&nbsp;&nbsp;" + obj.newUserInf[0].address + "</p>";
				htmlStr += '<p class="yc-user-li bm'+newUserId+'" id="bm'+newUserId+'">'+
				'<i class="bmloginTime" datatime='+obj.newUserInf[0].loginTime+'>0:0:0</i>&nbsp;&nbsp;|&nbsp;&nbsp;';
				if(obj.newUserInf[0].mid == -1 ||obj.newUserInf[0].mid == "-1"){
					htmlStr += '<a class="bmuser bmvisitor" onclick="openOto(' + obj.newUserInf[0].userid + ',\'' + obj.newUserInf[0].name + '\');">';
				} else{
					htmlStr += '<a class="bmuser" onclick="openOto(' + obj.newUserInf[0].userid + ',\'' + obj.newUserInf[0].name + '\');">';
				}
				htmlStr += obj.newUserInf[0].name + '</a>&nbsp;&nbsp;|&nbsp;<a class="bmnoteuserInf">'+
				obj.newUserInf[0].noteInf + '</a>&nbsp;&nbsp;|&nbsp;'+
				'<a class="bmformUrl" title="'+obj.newUserInf[0].fromUrl+'" href="' + obj.newUserInf[0].fromUrl + '" target="_blank">' +
				obj.newUserInf[0].fromUrl + '</a>&nbsp;&nbsp;|&nbsp;<span>' +
				obj.newUserInf[0].keyWord + '</span>&nbsp;&nbsp;|&nbsp;&nbsp;<span class="bmformSource">'+
				obj.newUserInf[0].formType + '</span>&nbsp;&nbsp;|&nbsp;&nbsp;'+
				'<a class="bmvisitLook" href="./chatuservisit.html?mid='+obj.newUserInf[0].mid+'" target="_blank">查询&nbsp;&nbsp;|&nbsp;</a>'+
				'<a class="bmvisitLook" href="./pullblackadd.html?mid='+obj.newUserInf[0].mid+'&ip='+obj.newUserInf[0].ip+'" target="_blank">拉黑&nbsp;&nbsp;|&nbsp;</a>'+
				'<a class="bmuserNote" onclick="noteUserName('+obj.newUserInf[0].mid+')"  target="_blank">备注&nbsp;&nbsp;|&nbsp;</a>'+
				'<a class="bmuserNote" onclick="oneReg('+obj.newUserInf[0].userid+')"  target="_blank">注册&nbsp;&nbsp;|&nbsp;</a>'+
				'<a class="bmuserNote" onclick="refreToOne('+obj.newUserInf[0].userid+')"  target="_blank">刷新</a></p>';
				htmlStr += "</li>";
				
				$("#jmanageBox").append(htmlStr);
			}
			
			
		}else{  //退出
			newUserId = obj.newUserInf[0].userid;    //内层ID  
			$(".bm"+newUserId).find(".bmloginTime").removeClass("bmloginTime");
			$(".bm"+newUserId).find(".bmuser").addClass("bmloginout");
		}
	 
	
	}else{
		var htmlStr = "";
		var uid = "";
		var liBoxId = "";
		var onlineAddArr = obj.onlineUsersAddr;
		htmlStr = "<div class='bmonlieuser'>当前在线人数:<span id='bmonlineCount'>" + obj.onlineCount + "</span><span class='bmoutmodel'>离线模式 &nbsp;<input class='isoutFlag' type='checkbox' /></span><a class='bmorderLi' onclick='orderTips()'>弹框提示</a><a class='bmorderLi' onclick='visitorRegOrder()'>游客注册</a><a class='bmorderLi' onclick='refreshTeacher()'>嘉宾刷新</a><a class='bmorderLi' onclick='refresh()'>指令刷新</a><a class='bmorderLi' href='pullblacklist.html' target='_blank'>拉黑列表</a></div>"
		for(var i in onlineAddArr) {
			liBoxId = i.replace(/\./g,"_");
			liBoxId = liBoxId.replace(/\:/g,"_");
			htmlStr += "<li id='bm"+liBoxId+"'><p class='bmaddressTitle'>" + i + "&nbsp;&nbsp;" + onlineAddArr[i][0].address + "</p>";
			for(var j in onlineAddArr[i]) {
				if(onlineAddArr[i][j].name == "游客") {
					uid = onlineAddArr[i][j].userid.substr(onlineAddArr[i][j].userid.length - 4);
					onlineAddArr[i][j].name = "游客" + uid;
				}
				
				if(onlineAddArr[i][j].keyWord == "") {
					onlineAddArr[i][j].keyWord = null;
				}
				
				if(onlineAddArr[i][j].noteInf == undefined){
					onlineAddArr[i][j].noteInf = "";
				}
				
				htmlStr += '<p class="yc-user-li bm'+onlineAddArr[i][j].userid+'" id="bm'+onlineAddArr[i][j].userid+'">'+
					'<i class="bmloginTime" datatime='+onlineAddArr[i][j].loginTime+'>0:0:0</i>&nbsp;&nbsp;|&nbsp;&nbsp;';
					if(onlineAddArr[i][j].mid == -1 ||onlineAddArr[i][j].mid == "-1"){
						htmlStr += '<a class="bmuser bmvisitor" onclick="openOto(' + onlineAddArr[i][j].userid + ',\'' + onlineAddArr[i][j].name + '\');">';
					} else{
						htmlStr += '<a class="bmuser" onclick="openOto(' + onlineAddArr[i][j].userid + ',\'' + onlineAddArr[i][j].name + '\');">';
					}
					htmlStr += onlineAddArr[i][j].name + '</a>&nbsp;&nbsp;|&nbsp;<a class="bmnoteuserInf">'+
					onlineAddArr[i][j].noteInf + '</a>&nbsp;&nbsp;|&nbsp;'+
					'<a class="bmformUrl" title="'+onlineAddArr[i][j].fromUrl+'" href="' + onlineAddArr[i][j].fromUrl + '" target="_blank">' +
					onlineAddArr[i][j].fromUrl + '</a>&nbsp;&nbsp;|&nbsp;<span>' +
					onlineAddArr[i][j].keyWord + '</span>&nbsp;&nbsp;|&nbsp;&nbsp;<span class="bmformSource">'+
					onlineAddArr[i][j].formType + '</span>&nbsp;&nbsp;|&nbsp;&nbsp;'+
					'<a class="bmvisitLook" href="./chatuservisit.html?mid='+onlineAddArr[i][j].mid+'" target="_blank">查询&nbsp;&nbsp;|&nbsp;</a>'+
					'<a class="bmvisitLook" href="./pullblackadd.html?mid='+onlineAddArr[i][j].mid+'&ip='+onlineAddArr[i][j].ip+'" target="_blank">拉黑&nbsp;&nbsp;|&nbsp;</a>'+
					'<a class="bmuserNote" onclick="noteUserName('+onlineAddArr[i][j].mid+')"  target="_blank">备注&nbsp;&nbsp;|&nbsp;</a>'+
					'<a class="bmuserNote" onclick="oneReg('+onlineAddArr[i][j].userid+')"  target="_blank">注册&nbsp;&nbsp;|&nbsp;</a>'+
					'<a class="bmuserNote" onclick="refreToOne('+onlineAddArr[i][j].userid+')"  target="_blank">刷新</a></p>';
			}
			htmlStr += "</li>";
		}
		$("#jmanageBox").html(htmlStr);
	}
	
	
}

function refresh(){
	parent.reOrder();
}

function refreshTeacher(){
	parent.reTeacherOrder();
}

function orderTips(){
	parent.orderTips();
}

function refreToOne(obj){
	parent.refreToOne(obj);
}

function visitorRegOrder(){
	parent.visitorRegOrder();
}

function oneReg(uid){
	parent.oneReg(uid);
}

function noteUserName(bmid){
	layer.prompt({title: '输入用户备注信息', formType: 2}, function(pass, index){
		$.ajax({
			type: "post",
			url: ROUTE + "Member.ashx?action=updateNoteByAdmin",
			dataType: "json",
			data: {
				memberId:bmid,
				adminid:$mid,
				note:pass
			},
			success: function(result) {
				if(result == 8402){
					layer.msg("备注失败:请确认您是否有备注权限!");
				}
				if(result == 200){
					layer.msg("备注成功!");
				}
				layer.close(index);
			},
			error: function(err) {
				layer.msg("备注失败!");
				layer.close(index);
			}
		});
	});

}

function timeset(){
	var currentTime = (new Date()).getTime();
	$(".bmloginTime").each(function(index,item){
		$(item).text(formatTime(currentTime - $(item).attr("datatime")));
	})
}

var hour, min, second, allTime;
function formatTime(time){
	second = parseInt(time / 1000) % 60;
	if(second < 0){
		second = 0;
	}
	min = parseInt(time / 1000 / 60) % 60;
	if(min < 0){
		min = 0;
	}
	hour = parseInt(time / 1000 / 60 / 60);
	if(hour < 0){
		hour = 0;
	}
	allTime = hour +":" + min + ":" + second;	
	return allTime;
}

setInterval(function(){
	timeset();
},1000);

function openOto(gid, name) {
	parent.otoAddGroup(gid, name);
}