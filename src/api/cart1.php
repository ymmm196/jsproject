<?php
    include 'conn.php';

    $sql = "select * from ddlists;";

    $res = $conn->query($sql);

    //提取数据
    $arr = $res->fetch_all(MYSQLI_ASSOC);
    $data = array(
        'data' => $arr
    );
    //将对象转为字符串,传给前端
    echo json_encode($data,JSON_UNESCAPED_UNICODE);
?>