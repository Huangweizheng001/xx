<?php

	//1
	
	$member['username'] ="jabo";
	$member['password'] ='123456';
	
	$do = $_REQUEST['do'];
	
	
	//2
	$members['1']['username']="爱游";
	$members['1']['password']='123456';
	$members['2']['username']="爱游一族";
	$members['2']['password']='654321';
	
	
	//3
	class addressClass {
		public $addrss = array();
		
		public function setAddress($array){
			$this->address= $array;
		}
		
		public function getAddress(){
			return $this->address;
		}

	}
	
	$addrssObj = new addressClass();	
	$addrssObj->setAddress($members);
	
	switch($do){
		case "first":
			echo json_encode($member);
			break;
		
		case "second":
			echo json_encode($members);
			break;
			
		case "third":
			echo json_encode($addrssObj);
			break;
	}
	
?>