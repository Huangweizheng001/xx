function parentDealChild(gid, whoAdmin) {
	initData(gid, whoAdmin);
}

var gid = $(this).getUrlParam("gid");
var toName = $(this).getUrlParam("admin");
var noAddFlag = true;
checkTourist();

function initData(fgid, whoAdmin) {
	gid = fgid;
	toName = whoAdmin;
	noAddFlag = true;

	checkTourist();
	addChat();
}

function checkTourist() {
	gid = gid.toString();
	var uid = gid.substr(gid.length - 4);
	if(toName == "游客") {
		toName = "游客" + uid;
	}
}

function addChat() {
	for(var i = 0; i < parent.groupArr.length; i++) {
		if(gid == parent.groupArr[i]) {
			noAddFlag = false;
		}
	}

	if(noAddFlag) {
		$("#bmleft .bmchatli.active").removeClass("active");
		$("#bmmain .bmchatcontent.active").removeClass("active");

		$("#bmleft").append("<div class='bmchatli active' id='bmtouser" + gid + "' dataId=" + gid + "><span class='bmname'>" + toName + "</span><span class='bmcloseChat' dataId=" + gid + ">X</span></div>");
		$("#bmmain").append("<div class='bmchatcontent active' id='bmchatbox" + gid + "' dataId=" + gid + "></div>");

		parent.changeChatTitle("与" + toName + "交流");
		parent.groupArr.push(gid);
	} else {
		initActive();
	}
}
addChat();

function initActive() {
	$("#bmleft .bmchatli.active").removeClass("active");
	$("#bmmain .bmchatcontent.active").removeClass("active");

	$("#bmleft .bmchatli").each(function(index, item) {
		if($(item).attr("dataId") == gid) {
			$(item).removeClass("hide").addClass("active");
			parent.changeChatTitle("与" + $(item).find(".bmname").text() + "交流");
		}
	});

	$("#bmmain .bmchatcontent").each(function(index, item) {
		if($(item).attr("dataId") == gid) {
			$(item).removeClass("hide").addClass("active");
		}
	});
}
initActive();

$("#bmleft").on("click", ".bmchatli", function() {
	if($(this).hasClass("active")) {
		return false;
	}
	$("#bmleft .bmchatli.active").removeClass("active");
	$("#bmmain .bmchatcontent.active").removeClass("active");

	var datatId = $(this).attr("dataId");
	gid = datatId;

	$("#bmleft .bmchatli").each(function(index, item) {
		if($(item).attr("dataId") == datatId) {
			$(item).addClass("active");
		}
	});

	$("#bmmain .bmchatcontent").each(function(index, item) {
		if($(item).attr("dataId") == datatId) {
			$(item).addClass("active");
		}
	});

	parent.changeChatTitle("与" + $(this).find(".bmname").text() + "交流");
});

$("#bmleft").on("click", ".bmcloseChat", function(event) {
	var closeId = $(this).attr("dataId");
	$("#bmtouser" + closeId).removeClass("active").addClass("hide");
	$("#bmchatbox" + closeId).removeClass("active").addClass("hide");
	event.stopPropagation();
});

$("#bmotosend").on("click", function() {
	parent.otochatSend(gid,toName);
})

$("#bmtoolBox .bmicon").on("click", function(event) {
	if(!$('#sinaEmotion').is(':visible')) {
		$(this).sinaEmotion();
		event.stopPropagation();
	}
});
$("#jsendImgPanel").change(function(e) {
	var file = $(this).get(0).files[0];
	r = new FileReader(); //本地预览
	r.onload = function() {
		var img = document.createElement("img");
		img.src = r.result;
		//CHAT.submit(2, r.result);
		$("#content").append(img);
	}
	r.readAsDataURL(file); //Base64
});

document.getElementById("content").onkeydown = function(e) {
	e = e || event;
	if(e.keyCode === 13) {
		parent.otochatSend(gid);
	}

};