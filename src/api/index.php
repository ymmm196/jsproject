<?php
    //连接数据库
    include 'conn.php';
    //接收数据
    //接口类型
    $type = isset($_REQUEST['type']) ? $_REQUEST['type'] : '';
    //用户名
    $user = isset($_REQUEST['user']) ? $_REQUEST['user'] : '';
    //密码
    $pwd = isset($_REQUEST['pwd']) ? $_REQUEST['pwd'] : '';
    //页数
    $page = isset($_REQUEST['page']) ? $_REQUEST['page'] : '';
    //每页多少条
    $num = isset($_REQUEST['num']) ? $_REQUEST['num'] : '';
    //排序的条件
    $term = isset($_REQUEST['term']) ? $_REQUEST['term'] : '';
    //升序或者降序
    $order = isset($_REQUEST['order']) ? $_REQUEST['order'] : '';
    //详情页传过来id；
    $id = isset($_REQUEST['id']) ? $_REQUEST['id'] : '';
    //价格区间
    $num1 = isset($_REQUEST['num1']) ? $_REQUEST['num1'] : '';
    $num2 = isset($_REQUEST['num2']) ? $_REQUEST['num2'] : '';
    //模糊查询
    $text = isset($_REQUEST['text']) ? $_REQUEST['text'] : '';
    //登陆，注册接口
    switch ($type)
    {
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
    //登录
    case "login":
        //先判断用户是否存在
        $sql = "SELECT * FROM users WHERE username = '$user';";
        $res = $conn->query($sql);
        //提取数据
        // $arr = $res->fetch_all(MYSQLI_ASSOC);   
        if($res->num_rows){
            //该用户存在，判断账号密码是否一致
            $sql = "SELECT password FROM users WHERE password = '$pwd' AND username = '$user'";
            $res = $conn->query($sql);
            if($res->num_rows==1){
                $data = array(
                    'code' => 1,
                    'msg' => '登陆成功'
                );
            }
            else{
                $data = array(
                    'code' => 0,
                    'msg' => '登陆失败'
                );
            };
        };
        break;
    //列表数据接口
    case "getlist":
        //写sql语句
        $index = ($page - 1)*$num;
        $sql = "SELECT * FROM lists LIMIT $index,$num";//当前
        $sql2 = "SELECT * FROM lists";//全部

        //执行语句
        $res = $conn->query($sql);
        $res2 = $conn->query($sql2);

        //提取数据
        $arr = $res->fetch_all(MYSQLI_ASSOC);

        $data = array(
            'total' => $res2->num_rows,
            'data' => $arr,
            'page' => $page,
            'num' => $num
        );
        break;
    //排序列表接口
    case "order_list":
        //sql语句
        $index = ($page - 1)*$num;
        $sql = "SELECT * FROM lists ORDER BY $term $order LIMIT $index,$num";//当前
        $sql2 = "SELECT * FROM lists";//全部
        //执行语句
        $res = $conn->query($sql);
        // var_dump($res->num_rows);
        $res2 = $conn->query($sql2);
        //提取数据
        $arr = $res->fetch_all(MYSQLI_ASSOC);
        $data = array(
            'total' => $res2->num_rows,
            'data' => $arr,
            'page' => $page,
            'num' => $num
        );
        break;
    // 详情页
    case "detailed_list":
        $sql = "SELECT * FROM lists WHERE gid = $id;";
        //执行语句
        $res = $conn->query($sql);
        //提取数据
        $arr = $res->fetch_all(MYSQLI_ASSOC);
        //返回数据
        $data = array(
            'data' => $arr,
        );
        break;
    //价格区间
    case "pricechoose":
        $sql = "SELECT * FROM lists  where price between $num1 and $num2;";
        $sql2 = "SELECT * FROM lists";//全部
        //执行语句
        $res = $conn->query($sql);
        $res2 = $conn->query($sql2);
        //提取数据
        $arr = $res->fetch_all(MYSQLI_ASSOC);
        //返回数据
        $data = array(
            'data' => $arr,
            'total' => $res->num_rows,
            'page' => $page,
            'num' => $num
        );
        break;
    case "search":
        $sql = "SELECT * FROM lists WHERE title LIKE '%$text%';";
        $sql2 = "SELECT * FROM lists";//全部
        //执行语句
        $res = $conn->query($sql);
        $res2 = $conn->query($sql2);
        //提取数据
        $arr = $res->fetch_all(MYSQLI_ASSOC);
        //返回数据
        $data = array(
            'data' => $arr,
            'total' => $res->num_rows,
            'page' => $page,
            'num' => $num
        );
        break;
    };
    //将对象转为字符串,传给前端
    echo json_encode($data,JSON_UNESCAPED_UNICODE);
    $conn->set_charset('utf-8');
    //关闭连接
    // $res->close();
    $conn->close();

?>