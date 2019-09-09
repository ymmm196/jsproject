<?php
    //数据库信息
    $severname = "localhost";
    $username = "root";
    $password = "";
    $dbname = "yemaijiu";
    //创建连接
    $conn = new mysqli($severname,$username,$password,$dbname);

    //判断连接是否成功
    if($conn->connect_error){
        die("链接错误：".$conn->connct_error);
    }

?>