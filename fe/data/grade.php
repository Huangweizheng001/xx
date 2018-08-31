<?php
header('Content-Type: application/json');
@$n = $_POST['period'];
switch($n)
{
    case "1":
        $arr = array(
               array('typeid'=>0,'name'=>'不限'),
               array('typeid'=>1,'name'=>'一年级'),
               array('typeid'=>2,'name'=>'二年级'),
               array('typeid'=>3,'name'=>'三年级'),
               array('typeid'=>4,'name'=>'四年级'),
               array('typeid'=>5,'name'=>'五年级'),
               array('typeid'=>6,'name'=>'六年级')
        );
        break;
    case "2":
            $arr = array(
                   array('typeid'=>0,'name'=>'不限'),
                   array('typeid'=>1,'name'=>'升学1'),
                   array('typeid'=>2,'name'=>'升学2')
            );
            break;
    case "3":
                $arr = array(
                       array('typeid'=>0,'name'=>'不限'),
                       array('typeid'=>1,'name'=>'一年级'),
                       array('typeid'=>2,'name'=>'二年级'),
                       array('typeid'=>3,'name'=>'三年级')
                );
                break;
    case "4":
                    $arr = array(
                           array('typeid'=>0,'name'=>'不限'),
                           array('typeid'=>1,'name'=>'中考1'),
                           array('typeid'=>2,'name'=>'中考2')
                    );
                    break;
    case "5":
                        $arr = array(
                               array('typeid'=>0,'name'=>'不限'),
                               array('typeid'=>1,'name'=>'一年级'),
                               array('typeid'=>2,'name'=>'二年级'),
                               array('typeid'=>3,'name'=>'三年级')
                        );
                        break;
    case "6":
                            $arr = array(
                                   array('typeid'=>0,'name'=>'不限'),
                                   array('typeid'=>1,'name'=>'高考1'),
                                   array('typeid'=>2,'name'=>'高考2'),
                                   array('typeid'=>3,'name'=>'高考3')
                            );
                            break;
}
echo json_encode($arr);
