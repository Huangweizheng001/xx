<?php
	
	header("Content-type:text/html; charset=utf-8");
	
	function createHtmlTag($tag = "") {
		echo "<h1> $tag </h1> <br/>";
	}
	
	createHtmlTag("hello");
	
	createHtmlTag("JSON和serialize 对比");
	
	$member = array("username", "age");
	
	var_dump($member);
	
	
	$jsonObj = json_encode($member);
	$serializeObj = serialize($member);
	
	createHtmlTag($jsonObj);
	
	createHtmlTag($serializeObj);
	
	
	//关联数组
	$asocArray = array("username"=>"jabo");
	var_dump($asocArray);
	
	
	$array_1 = array(); //1维数组
	$array_2 = array(); //2维数组
	
	$array_1['username'] = "Jabo";
	$array_1["age"] = 23;
	
	$array_2['member']['name1']['username'] ="kk";
	$array_2['member']['name1']['age'] = 25;
	
	$array_2['member']['name2']['username'] ="cc";
	$array_2['member']['name2']['age'] = 21;
	
	var_dump($array_1);
	var_dump($array_2);
	
	$jsonObj_1 = json_encode($array_1);   //1维数组到JSON的转换
	$jsonObj_2 = json_encode($array_2);   //2维数组到JSON的转换
	
	echo $jsonObj_1 ."<br />";
	echo $jsonObj_2 ."<br /><br /><br />";
	
	
	
	class muke {
		public $name = "public Name";
		protected $ptName = "protected Name";
		private $pName = "private Name";
		
		
		public function getName(){
			return $this->name;
		}
		
	}
	
	$mukeObj = new muke();
	var_dump($mukeObj);
	
	echo  json_encode($mukeObj);
	
	
	$jsonStr = '{"key":"value","key1":"value1"}';
	echo "<br /><br />".$jsonStr;
	
	//反转 - 对象
	print_r(json_decode($jsonStr));
	
	//反转 - 数组
	print_r(json_decode($jsonStr, true));
?>