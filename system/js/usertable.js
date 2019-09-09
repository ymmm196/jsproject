$(function () {
    //获取数据库的用户信息的数据
    $.ajax({
        type: 'post',
        url: 'api/main.php',
        data: {
            type: 'getuserlist',

        },
        success: str => {
            // console.log(str);
            let arr = JSON.parse(str).data;
            // console.log(arr);
            //渲染数据
            fillData(arr);
        }
    });

    //渲染数据
    function fillData(ele) {
        let html = ele.map(function (item) {
            return `<tr>
                        <td><input type="checkbox" /></td>
                        <td>${item.uid}</td>
                        <td>${item.username}</td>
                        <td contenteditable="true">${item.password}</td>
                        <td class="center">${item.regtime}</td>
                        <td>
                            <button type="submit" class="btn btn-success">修改并保存</button>
                            <button type="submit" class="btn btn-danger">删除</button>
                            <button type="submit" class="btn btn-info">Edit</button>
                        </td>
                    </tr>`;
        }).join('');
        $('.widget-content table tbody').html(html);
    };
    //直接修改账号密码之后并保存
    $('.widget-content tbody').on('click', 'tr .btn-success', function () {
        //获取当前修改后的密码
        let pwdChange = $(this).parent().prev().prev().html();
        let user = $(this).parent().prev().prev().prev().html();
        if (confirm('确定要修改密码？')) {
            $.ajax({
                type: 'post',
                url: 'api/main.php',
                data: {
                    type: 'changepwd',
                    user: user,
                    pwd: pwdChange
                },
                success: str => {
                    let arr = JSON.parse(str);
                    // console.log(arr);
                    if (arr.code) {
                        alert('已保存并修改');
                    }
                }
            })
        };
    });
    //点击删除当前行；
    $('.widget-content tbody').on('click', 'tr .btn-danger', function () {
        let user = $(this).parent().prev().prev().prev().html();
        if (confirm('确定要删除此用户?')) {
            $.ajax({
                type: 'post',
                url: 'api/main.php',
                data: {
                    type: 'deleteuser',
                    user: user
                },
                success: str => {
                    let arr = JSON.parse(str);
                    if (arr.code) {
                        // alert('已删除')
                        window.location.reload();
                    }
                }
            })
        }
    })
})