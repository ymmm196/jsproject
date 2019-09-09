$(function () {
    /* 正则表达式 */
    let regPhone = /^1[3-9]\d{9}$/; /* 1开头 第二位3-9 后面全都是数字   11位 */
    let regPassword = /^[a-zA-Z0-9]{6,16}$/;

    /* 监听输入标签失去焦点事件 */
    //手机号
    $('#user').blur(function (e) {
        let text = $.trim($(this).val());
        if (text.length == 0) {
            $(this).siblings(".error").css('display', 'block');
            $(this).siblings(".error").html("请输入手机号");
        } else if (!regPhone.test(text)) {
            $(this).siblings(".error").css('display', 'block');
            $(this).siblings(".error").html("请输入正确的手机号码！");
        } else {
            $(this).siblings(".error").css('display', 'none');
        }
    });
    //密码
    $('#pwd').blur(function (e) {
        let text = $.trim($(this).val());
        if (text.length == 0) {
            $(this).siblings(".error").css('display', 'block');
            $(this).siblings(".error").html("请输入密码");
        } else if (!regPassword.test(text)) {
            $(this).siblings(".error").css('display', 'block');
            $(this).siblings(".error").html("请输入正确的密码！");
        } else {
            $(this).siblings(".error").css('display', 'none');
        }
    });

    $('#btn-login').click(function () {
        if ($.trim($('#user').val()) && $.trim($('#pwd').val())) {
            console.log($.trim($('#user').val()));
            if ($('#check').is(":checked")) {
                //保存cookie,利用cookie插件
                // $.cookie('remember', 'true', {
                //     expires: 7,
                //     path: '/',
                // });
                $.cookie('username', $.trim($('#user').val()), {
                    expires: 7,
                    path: '/'
                });
            } else {
                $.cookie('username', $.trim($('#user').val()), {
                    path: '/'
                });
            };
            $.ajax({
                type: 'post',
                url: '../api/index.php',
                data: {
                    type: 'login',
                    user: $.trim($('#user').val()),
                    pwd: $.trim($('#pwd').val())
                },
                success: str => {
                    // console.log(str);
                    let arr = JSON.parse(str);
                    if (arr.code) {
                        alert('登录成功');
                        window.location.href = $.cookie('url');
                    } else {
                        $('#user').siblings(".error").css('display', 'block');
                        $('#user').siblings(".error").html("账号或密码错误");
                        alert('登录失败');
                    }
                }
            })
        }
    })
});