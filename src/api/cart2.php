<?php
    include 'conn.php';
    $gid = isset($_REQUEST['gid']) ? $_REQUEST['gid'] : '';

    $sql = "DELETE FROM ddlists WHERE gid = $gid;";

    $res = $conn->query($sql);
    if($res){
        $data = array(
            'code' => 1,
            'msg' => '成功删除'
        );
    }else{
        $data = array(
            'code' => 0,
            'msg' => '删除失败'
        );
    }
    //提取数据
    
    //将对象转为字符串,传给前端
    echo json_encode($data,JSON_UNESCAPED_UNICODE);
    
    $conn->set_charset('utf-8');
    //关闭连接
    // $res->close();
    $conn->close();
?>