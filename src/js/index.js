$(function () {
    //1.选项卡
    $('.notice-lists h3 span').hover(function () {
        $(this).addClass('on').siblings().removeClass('on');
        var index = $(this).index();
        $(this).parent().siblings().children().eq(index).addClass('on').siblings().removeClass('on');
    });
    //2.banner轮播图
    var $bigbanner = $('.bigbanner');
    var $uLi = $('.bigbanner>ul>li');
    var $slideindex = $('.bigbanner .slide-index');
    var imgNum = $('.bigbanner>ul>li').length; // 图片的数量
    var index = 0; // 计数器
    // 小圆点
    var num = 0;
    // 根据图片的数量动态生成小圆点
    while (num < imgNum) {
        $slideindex.append(`<span>${num+1}</span>`);
        num++;
    }
    var $spans = $('.bigbanner .slide-index span');
    $spans.first().addClass('active'); // 默认给第一个小圆点添加now类
    // 鼠标经过小圆点时，显示出对应的图片
    $spans.mouseover(function () {
        $(this).addClass('active').siblings().removeClass('active');
        index = $(this).index();
        $uLi.eq(index).fadeIn().siblings().fadeOut();
    });
    // 自动轮播
    var timeId = setInterval(function () {
        index++;
        if (index > imgNum - 1) {
            index = 0; //到最后一张图的时候切换回第一张图
        }
        $spans.eq(index).addClass('active').siblings().removeClass('active');
        $uLi.eq(index).fadeIn().siblings().fadeOut();
    }, 2000); // 2秒自动切换


    //3.人气抢购，鼠标滑过向上运动一个ul
    // console.log($('.hottabs li'))
    $('.hottabs li').eq(0).addClass('on');
    $('.hottabs li').hover(function () {
        index = $(this).index();
        // console.log(index);
        let iTop = -310 * index;
        $(this).addClass('on').siblings().removeClass('on');
        // console.log(iTop);
        $('.goodslist').animate({
            top: iTop + 'px'
        }, 'fast');
    });
    //限时购
    //先设置一个截止时间
    var end = '2019-9-10 12:00:00';

    function setTime() {
        var nowtime = Date.now();
        var endtime = Date.parse(end);
        var dis = endtime - nowtime;
        var sec = parseInt(dis / 1000); //秒
        if (sec <= 0) {
            //到达临界点
            clearInterval(timeDelay);
            $('.goodslist .prod-countdown').css('text-decoration', 'line-through');
        } else {
            //将时间转换为指定格式
            var min = parseInt(sec / 60) % 60; //分
            var hour = parseInt(sec / 60 / 60) % 24; //小时
            var day = parseInt(sec / 60 / 60 / 24); //天数
            $('.goodslist .prod-countdown').html(`还剩<strong>${day}</strong>天<strong>${hour}</strong>时<strong>${min}</strong>分`);
        }
    }
    let timeDelay = setInterval(setTime, 1000);
    //4.右侧排行榜，鼠标滑过时改变样式
    $('.channel-topboard .item').hover(function () {
        // console.log($(this).siblings());
        $(this).addClass('on').siblings().not('.hot').removeClass('on');
    })
    //5.品牌汇中的图片滑动
    let $lis = $('#brand .accordion ul li');
    $lis.mouseenter(function () {
        clearInterval(timer);
        $lis.stop(true);
        let index = $(this).index();
        $lis.each(function (i) {
            if (i <= index) {
                //小于触碰的li左边的左移动
                $(this).animate({
                    "left": 150 * i
                }, 500);
            } else { //右边的右移动
                $(this).animate({
                    "left": 450 + 150 * (i - 1)
                }, 500);
            }
        })
    });
    $lis.mouseleave(function () {
        $lis.each(function (i) {
            $(this).animate({
                "left": 150 * i
            }, 500);
        })
    });
    //自动切换
    function move() {

    }
    let timer = setInterval(() => {
        $lis.each(function (i) {
            if (i <= index) {
                //小于触碰的li左边的左移动
                $(this).animate({
                    "left": 150 * i
                }, 500);
            } else { //右边的右移动
                $(this).animate({
                    "left": 450 + 150 * (i - 1)
                }, 500);
            }
        })
    }, 500);

    //6.酒友品鉴 点击切换左右
    let linum = $('#friend .main .bd>ul>li').length;
    // console.log(linum);
    let i = 1;
    // console.log(i);
    $('#friend .main .hd .txt-page').html(`${i}/${linum / 3}`);
    $('#friend .main .hd .btn-prev').click(function () {
        if (i >= linum / 3) {
            i = linum / 3
        }
        $('#friend .main .bd>ul').animate({
            "left": -950 * i + 'px'
        });
        $('#friend .main .hd .txt-page').html(`${i}/${linum / 3}`);
        i++;

    })
    $('#friend .main .hd .btn-next').click(function () {
        // if ()
        i--;
        $('#friend .main .bd>ul').animate({
            "left": 950 * i + 'px'
        });
        $('#friend .main .hd .txt-page').html(`${i}/${linum / 3}`);
    })

    //7.二维码放大
    $('.td-Code').mouseover(function () {
        $(this).addClass('b-code').css('top', '150px');
    })
    $('.td-Code').mouseout(function () {
        $(this).removeClass('b-code').css('top', '360px');
    });

    //判断是否有登录的cookie
    // console.log($.cookie('username'));
    if ($.cookie('username')) {
        $('.userinfos').html(`<li><a href="###" >您好，${$.cookie('username')}   |  新消息  |</a></li>
        <li><a href="###" id="btn-logout">退出</a></li>`);
        $('.lon_nav .nav1').html(`<li><a href="###" >${$.cookie('username')}</a></li>
        <li><a href="###" id="btn-logout">退出</a></li>`)
        $('#btn-logout').click(function () {
            $('.userinfos').html(`<li><em>10739962</em>位会员的选择</li>
            <li><a href="###" id="btn-login">登陆</a></li>
            <li><a href="###" id="btn-register">注册</a></li>`);
            $.cookie('username', null, {
                expires: -1,
                path: '/'
            });
            window.location.reload();
        })
    } else {
        //点击登录跳转到登录页并记录url的cookie
        $('#btn-login').click(function () {
            window.location.href = 'html/login.html';
        });
        $('#btn-register').click(function () {
            window.location.href = 'html/register.html';
        })
    }

});