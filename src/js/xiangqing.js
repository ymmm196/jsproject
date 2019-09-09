$(function () {
    //键入页面就存取当前页面的url
    let url = location.href;
    $.cookie('url', url, {
        path: '/'
    });
    //判断是否有登录的cookie
    // console.log($.cookie('username'));
    if ($.cookie('username')) {
        $('.userinfos').html(`<li><a href="###" >您好，${$.cookie('username')} |新消息 </a></li>
        <li><a href="###" id="btn-logout">退出</a></li>`);
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
    };

    let id = window.location.href.split("?")[1].split('&').join('')[0];
    // console.log(id);
    let num = window.location.href.split("?")[1].split('&').join('')[1];
    $("iframe").contents().find(".txt-cartcount").html(num);
    $('.ym-nBar-cart-num').children().html(num);
    //初始化数据
    let canshu = '';

    function init() {
        $.ajax({
            type: 'post',
            url: '../api/index.php',
            data: {
                type: 'detailed_list',
                id: id,
            },
            success: str => {
                canshu = str;
                let arr = JSON.parse(str);
                // console.log(arr);
                fillData(arr.data[0]);
            }
        })
    }
    init();
    //渲染数据
    function fillData(ele) {
        $('.content .crumb strong').html(ele.title);
        $('#MagnifierWrap2 .MagnifierMain .MagTargetImg').attr('src', ele.imgurl);
        $('#MagnifierWrap2 .MagnifierMain .MagTargetImg').attr('data-src', ele.imgurl);
        $('.spec-items ul>li').eq(0).attr('src', ele.imgurl)
        $('.spec-items ul>li').eq(0).attr('data-lsrc', ele.imgurl);
        // console.log($('.spec-items ul>li').eq(0).attr('src'));
        $('.spec-items ul>li').eq(0).attr('data-maxSrc', ele.imgurl)
        $('.pro-name h1').html(ele.title);
        $('.pro-data a').html(ele.pinlun);
        $('.pro-data span').eq(1).html(`近期售出数 ${ele.soldnum}`);
        $('.currentFont b em').html(ele.price);
    }
    //点击回到顶部
    $('.ym-nBar .ym-nBar-backtop-logo').click(function () {
        window.scrollTo(0, 0);
    });
    //鼠标滑过出现
    $('.ym-nBar-tab-asset').first().hover(function () {
        $('.ym-nBar-tab-asset').children().eq(1).css('display', 'block');
    }, function () {
        $('.ym-nBar-tab-asset').children().eq(1).css('display', 'none');
    })
    $('.ym-nBar-tab-charge').first().hover(function () {
        $('.ym-nBar-tab-charge').children().eq(1).css('display', 'block');
    }, function () {
        $('.ym-nBar-tab-charge').children().eq(1).css('display', 'none');
    });

    //点击数量加减 输入
    //1.减
    let count = 1;
    $('#online-getWineNum .left').click(function () {
        count--;
        if (count <= 1) {
            count = 1;
        }
        $(this).next().val(count);
    });
    //2.加
    $('#online-getWineNum .right').click(function () {
        count++;
        // console.log(111);
        if (count >= 500) {
            count = 500;
        }
        $(this).prev().val(count);
    });

    //点击购物车跳转购物车页面
    $('#add-to-cart-button').click(function () {
        location.href = 'gouwuche.html?' + id + '&' + count;
    });
    //吸顶菜单
    // console.log($('.proDetails h3').eq(0));
    var barTop = $('.proDetails h3').eq(0).offset().top;
    $(window).on('scroll', function () {
        if ($(document).scrollTop() >= barTop) {
            $('.proDetails h3').eq(0).css({
                'position': 'fixed',
                'top': 0,
                'z-index': 50
            })
        } else {
            $('.proDetails h3').eq(0).css('position', 'static');
        }
    });
    //选项卡
    $('.proDetails h3').eq(0).on('click', 'a', function () {
        $(this).addClass('hover').siblings().removeClass('hover');
        let index = $(this).index();
        // console.log(index);
        // console.log($('.proDetails h3').eq(index))
        $("html,body").animate({
            scrollTop: $('.proDetails h3').eq(index).offset().top
        }, 500 /*scroll实现定位滚动*/ ); /*让整个页面可以滚动*/
        return false;
    })
    //点击顶部登录按钮
    // console.log($('iframe').contents().find('#login1').eq(0).html());
});