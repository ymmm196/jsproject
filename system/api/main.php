<?php
    //连接数据库
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
    };

    //获取前端传过来的数据
    //接口类型
    $type = isset($_REQUEST['type']) ? $_REQUEST['type'] : '';
    //用户名
    $user = isset($_REQUEST['user']) ? $_REQUEST['user'] : '';
    //密码
    $pwd = isset($_REQUEST['pwd']) ? $_REQUEST['pwd'] : '';
    switch ($type){
        //获取所有用户信息
        case 'getuserlist':
            //1.sql语句
            $sql ="select * from users;";
            //2.查询
            $res = $conn->query($sql);
            //提取数据
            $arr = $res->fetch_all(MYSQLI_ASSOC);
            $data = array(
                'data' => $arr,
            );
            break;
        //注册验证
        case "reg_verify":
            //1.写sql语句
            $sql = "SELECT * FROM users WHERE username = '$user'";
            //2.查询
            $res = $conn->query($sql);
            //提取数据
            // $arr = $res->fetch_all(MYSQLI_ASSOC);
            // var_dump($res);
            if($res->num_rows){
                $data = array(
                    'code' => 0,
                    'msg' => '该账号已被注册'
                );
            }
            else{
                $data = array(
                    'code' => 1,
                    'msg' => '该账号可以注册'
                );
            };
            break;
        //注册
        case "register":
            $sql = "insert into users (username, password) values('$user', '$pwd')";
            $res = $conn->query($sql);
            // var_dump($res);
            //提取数据
            // $arr = $res->fetch_all(MYSQLI_ASSOC);
            if($res){
                $data = array(
                    'code' => 1,
                    'msg' => '注册成功'
                );
            }
            else{
                $data = array(
                    'code' => 0,
                    'msg' => '注册失败'
                );
            };
            break;
        //修改密码
        case "changepwd":
            $sql="UPDATE users SET password = '$pwd' WHERE username = $user;";
            $res = $conn->query($sql);
            // var_dump($res);
            if($res){
                $data = array(
                    'code' => 1,
                    'msg' => '密码修改成功'
                );
            }else{
                $data = array(
                    'code' => 0,
                    'msg' => '密码修改失败'
                );
            };
            break;
        case "deleteuser":
            $sql = "DELETE FROM users WHERE username = $user;";

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
            };
            break;
    };
    //将对象转为字符串,传给前端
    echo json_encode($data,JSON_UNESCAPED_UNICODE);
    // echo json_encode($data,JSON_UNESCAPED_UNICODE);
    $conn->set_charset('utf-8');
    //关闭连接
    // $res->close();
    $conn->close();
    
?>