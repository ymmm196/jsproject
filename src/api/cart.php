<?php
    include 'conn.php';

    $uid = isset($_REQUEST['uid']) ? $_REQUEST['uid'] : '';
    $gid = isset($_REQUEST['gid']) ? $_REQUEST['gid'] : '';
    $imgurl = isset($_REQUEST['imgurl']) ? $_REQUEST['imgurl'] : '';
    $title = isset($_REQUEST['title']) ? $_REQUEST['title'] : '';
    $price = isset($_REQUEST['price']) ? $_REQUEST['price'] : '';
    $count = isset($_REQUEST['count']) ? $_REQUEST['count'] : '1';
    $city = isset($_REQUEST['city']) ? $_REQUEST['city'] : '';
    $brand = isset($_REQUEST['brand']) ? $_REQUEST['brand'] : '';
    $commentcount1 = isset($_REQUEST['commentcount1']) ? $_REQUEST['commentcount1'] : '';
    $leixing = isset($_REQUEST['leixing']) ? $_REQUEST['leixing'] : '';
    $pinlun = isset($_REQUEST['pinlun']) ? $_REQUEST['pinlun'] : '';
    $ratecount = isset($_REQUEST['ratecount']) ? $_REQUEST['ratecount'] : '';
    $soldnum = isset($_REQUEST['soldnum']) ? $_REQUEST['soldnum'] : '';

    //1.先查询数据库是否已经添加了该商品
    $sql1 = "select * from ddlists where gid = $gid and uid = '$uid'";
    $res1 = $conn->query($sql1);
    // var_dump($res1);
    if($res1->num_rows == 0){//不存在
        //插入数据
        $sql2 = "insert into ddlists (uid,gid,imgurl,title,count,ratecount,price,soldnum,pinlun,commentcount1,city,brand,leixing) value ('$uid','$gid','$imgurl','$title','$count','$ratecount','$price','$soldnum','$pinlun','$commentcount1','$city','$brand','$leixing')";
    }else {//存在
        //修改数据
        $sql2 = "update ddlists set count = $count where gid = $gid and uid = '$uid'";
    };
    //执行语句
    $res2 = $conn->query($sql2);
    // var_dump($res2);
    if($res2) {
        //添加或修改成功
        echo 'yes';
    }else {
        echo 'no';
    }
   
?>