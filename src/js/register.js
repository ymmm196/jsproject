$(function () {
    /* 图形验证码 */
    let imgCodeText = "";
    /* 验证码处理 */
    (new Captcha({
        fontSize: 30
    })).draw(document.querySelector('#captcha'), r => {
        // console.log(r, '验证码1');
        imgCodeText = r;
        /* 自动触发标签失去焦点的事件 */
        $('#imgCode').trigger("blur");
    });

    /* 正则表达式 */
    let regPhone = /^1[3-9]\d{9}$/; /* 1开头 第二位3-9 后面全都是数字   11位 */
    let regPassword = /^[a-zA-Z0-9]{6,16}$/;

    /* 监听输入标签失去焦点事件 */
    //手机号
    $('#tel').blur(function (e) {
        let text = $.trim($(this).val());
        if (text.length == 0) {
            $(this).siblings(".error").removeClass('hidden');
            $(this).siblings(".error").children(".error").html("请输入手机号");
        } else if (!regPhone.test(text)) {
            $(this).siblings(".error").removeClass('hidden');
            $(this).siblings(".error").children(".error").html("请输入正确的手机号码！");
        } else {
            $(this).siblings(".error").addClass('hidden');
        }
    });
    //图片验证码
    $('#imgCode').blur(function (e) {
        let text = $.trim($(this).val());
        if (text.length == 0) {
            $(this).siblings(".error").removeClass('hidden');
            $(this).siblings(".error").children(".error").html("请输入验证码");
        } else if (imgCodeText.toLowerCase() != text.toLowerCase()) {
            $(this).siblings(".error").removeClass('hidden');
            $(this).siblings(".error").children(".error").html("请输入正确的验证码");
        } else {
            $(this).siblings(".error").addClass('hidden');
        }
    });
    //密码
    let passwordAText = '';
    $('#passwordA').blur(function (e) {
        let text = $.trim($(this).val());
        passwordAText = text;
        if (text.length == 0) {
            $(this).siblings(".error").removeClass('hidden');
            $(this).siblings(".error").children(".error").html("请输入密码");
        } else if (!regPassword.test(text)) {
            $(this).siblings(".error").removeClass('hidden');
            $(this).siblings(".error").children(".error").html("请输入正确的密码！");
        } else {
            $(this).siblings(".error").addClass('hidden');
        }
    });
    //再次输入密码确认
    $('#passwordB').blur(function (e) {
        let text = $.trim($(this).val());
        if (text.length == 0) {
            $(this).siblings(".error").removeClass('hidden');
            $(this).siblings(".error").children(".error").html("请输入密码");
        } else if (passwordAText != text) {
            $(this).siblings(".error").removeClass('hidden');
            $(this).siblings(".error").children(".error").html("您输入的密码不匹配！");
        } else {
            $(this).siblings(".error").addClass('hidden');
        }
    });
    //短信验证
    let msgText = '';
    $('#msgCode').blur(function (e) {
        let text = $.trim($(this).val());
        msgText = text;
        if (text.length == 0) {
            $(this).siblings(".error").removeClass('hidden');
            $(this).siblings(".error").children(".error").html("请输入短信验证码");
        } else if (msgText != text) {
            $(this).siblings(".error").removeClass('hidden');
            $(this).siblings(".error").children(".error").html("短信验证码不成功！");
        } else {
            $(this).siblings(".error").addClass('hidden');
        }
    });

    /** 
     * 1.点击注册时，先验证非空，符合要求 
     * 2.ajax请求数据库，验证是否已经注册
     */
    $('#btn-register').click(function () {
        if ($.trim($('#tel').val()).length != 0 &&
            $.trim($('#imgCode').val()).length != 0 &&
            $.trim($('#passwordA').val()).length != 0 &&
            $.trim($('#passwordB').val()).length != 0 &&
            $(".chk-clause").is(":checked")
        ) {
            $.ajax({
                type: 'post',
                url: '../api/index.php',
                data: {
                    type: 'reg_verify',
                    user: $.trim($('#tel').val())
                },
                success: str => {
                    // console.log(str);
                    let arr = JSON.parse(str);
                    if (arr.code == 1) {
                        $.ajax({
                            type: 'post',
                            url: '../api/index.php',
                            data: {
                                type: 'register',
                                user: $.trim($('#tel').val()),
                                pwd: $.trim($('#passwordA').val())
                            },
                            success: str1 => {
                                let arr1 = JSON.parse(str1);
                                if (arr1.code) {
                                    alert('注册成功');
                                    location.href = 'login.html';
                                }
                            }
                        })
                    } else {
                        alert('该账号已被注册');
                        $('#tel').focus();
                    };
                }
            })
        }
    });
});