<?php
	//1、链接数据库 进行 数据读取
	
	//2、把数据库查询返回的对象，转成json格式，返回客户端
	
	$inAjax = $_GET['inAjax'];
	$do = $_GET['do'];
	
	
	$do = $do ? $do:"default";
		
	if(!$inAjax) return false;
	
	include_once "db.class.php";
	
	
	switch($do) {
		case "checkMember":
			$username = $_GET['username'];
			
			$sql = "SELECT * FROM check_member WHERE username = '$username' ";
			$result = $dbObj->getOne($sql);
			//print_r($result);
			
			echo (!empty($result)) ? json_encode($result):"null";
			
			
			break;
		
		case "default":
			die("nothing");
			break;
		
	}
?>