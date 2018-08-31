<?php
header('Content-Type: application/json');
@$p = $_POST['grade'];
//@$g = $_POST['grade'];
switch($p)
{
    case "1":
        $arr = array(
               array('typeid'=>0,'name'=>'不限'),
               array('typeid'=>1,'name'=>'语文'),
               array('typeid'=>2,'name'=>'数学'),
               array('typeid'=>3,'name'=>'英语')
        );
        break;
        case "2":
                $arr = array(
                       array('typeid'=>0,'name'=>'不限'),
                       array('typeid'=>1,'name'=>'语文1'),
                       array('typeid'=>2,'name'=>'数学1'),
                       array('typeid'=>3,'name'=>'英语1')
                );
                break;
        case "3":
                $arr = array(
                       array('typeid'=>0,'name'=>'不限'),
                       array('typeid'=>1,'name'=>'语文'),
                       array('typeid'=>2,'name'=>'数学'),
                       array('typeid'=>3,'name'=>'英语'),
                      array('typeid'=>4,'name'=>'历史'),
                     array('typeid'=>5,'name'=>'政治'),
                     array('typeid'=>6,'name'=>'地理')
                );
                break;
        case "4":
                        $arr = array(
                               array('typeid'=>0,'name'=>'不限'),
                               array('typeid'=>1,'name'=>'语文2'),
                               array('typeid'=>2,'name'=>'数学2'),
                               array('typeid'=>3,'name'=>'英语2'),
                              array('typeid'=>4,'name'=>'历史2'),
                             array('typeid'=>5,'name'=>'政治2'),
                             array('typeid'=>6,'name'=>'地理2')
                        );
                        break;
         case "5":
                         $arr = array(
                                array('typeid'=>0,'name'=>'不限'),
                                array('typeid'=>1,'name'=>'语文'),
                                array('typeid'=>2,'name'=>'数学'),
                                array('typeid'=>3,'name'=>'英语'),
                               array('typeid'=>4,'name'=>'物理化学'),
                              array('typeid'=>5,'name'=>'史地生')
                         );
                         break;
}
echo json_encode($arr);