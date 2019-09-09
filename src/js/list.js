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

    let ipage = 1;
    //渲染页面
    function init() {
        $.ajax({
            type: 'get',
            url: '../api/index.php',
            data: {
                type: 'getlist',
                page: ipage,
                num: 30,
            },
            success: str => {
                let arr = JSON.parse(str);
                // console.log(arr);
                fillData(arr.data);
                page(arr);
            }
        })
    }
    init();
    //渲染数据列表页函数
    function fillData(ele) {
        let html = ele.map(function (item) {
            return `<li data-id="${item.gid}">
                        <dl>
                            <dt><a href="###" class="pimg"><img src="${item.imgurl}" alt=""></a></dt>
                            <dd class="base">
                                <a href="###" class="pname">
                                    <span class="cn">${item.title}</span>
                                    <span class="en"></span>
                                    <span class="promo"></span>
                                </a>
                                <p class="price">
                                    <span class="lijian"></span>
                                    <span class="minprice">￥<strong
                                            style="font-family: inherit">${item.price}</strong></span>
                                </p>
                            </dd>
                            <dd class="action">
                                <p><a href="###" class="btn-style btn-add2cart">加入购物车</a></p>
                            </dd>
                            <dd class="sum">
                                <span class="ratecount"><strong style="color: #cc0000">${item.ratecount}</strong>好评度</span>
                                <span class="commentcount"><a href="###"><strong>${item.pinlun}</strong></a>评论</span>
                                <span class="soldnum">
                                    <strong>${item.soldnum}</strong>售出
                                </span>
                            </dd>
                        </dl>
                    </li>`;
        }).join('');
        $('.piclist').html(html);
    }

    function page(ele) {
        let total = Math.ceil(ele.total / ele.num);
        let pagestr = '';
        for (let i = 0; i < total; i++) {
            pagestr += `<a href="###">${i+1}</a>`;
        }
        $('#pages').html(pagestr);
        $('#pages').children().eq(ipage - 1).addClass('on');
        //渲染标题栏中得上下一页
        let goodpages = '';
        goodpages = `<span>共有<strong>${ele.total}</strong>件商品</span>
        <label>${ipage}/${total}</label>
        <a href="###" class="prev disabled">上页</a>
        <a href="###" class="next">下页</a>`;
        $('.goods-page-min').html(goodpages);
        //点击标题栏中得上一页
        $('.goods-page-min .prev').click(function () {
            ipage--;
            if (ipage <= 1) {
                ipage = 1;
            }
            init();

        })
        //点击标题栏中得下一页
        $('.goods-page-min .next').click(function () {
            ipage++;
            if (ipage >= total) {
                ipage = total
            }
            init();

        })
    }
    //点击页码切换数据
    $('.page').on('click', 'a', function () {
        ipage = $(this).html();
        init();
        $(this).addClass('on').siblings().removeClass('on');
    })
    //价格排序
    let ok = true;
    $('.goods-nav .first .up').click(function () {
        console.log(111);
        if (ok) {
            $.ajax({
                type: 'get',
                url: '../api/index.php',
                data: {
                    type: 'order_list',
                    page: ipage,
                    num: 30,
                    term: 'price',
                    order: 'desc' //降序
                },
                success: str => {
                    let arr = JSON.parse(str);
                    // console.log(arr);
                    fillData(arr.data);
                    page(arr);
                }
            })
            ok = false;
        } else {
            $.ajax({
                type: 'get',
                url: '../api/index.php',
                data: {
                    type: 'order_list',
                    page: ipage,
                    num: 30,
                    term: 'price',
                    order: 'asc' //升序
                },
                success: str => {
                    let arr = JSON.parse(str);
                    // console.log(arr);
                    fillData(arr.data);
                }
            })
            ok = true;
        }
    });
    //pinlun排序
    let ok1 = true;
    $('.goods-nav .first').children().eq(3).children().click(function () {
        if (ok1) {
            $.ajax({
                type: 'get',
                url: '../api/index.php',
                data: {
                    type: 'order_list',
                    page: ipage,
                    num: 30,
                    term: 'pinlun',
                    order: 'desc' //降序
                },
                success: str => {
                    let arr = JSON.parse(str);
                    // console.log(arr);
                    fillData(arr.data);
                }
            })
            ok1 = false;
        } else {
            $.ajax({
                type: 'get',
                url: '../api/index.php',
                data: {
                    type: 'order_list',
                    page: ipage,
                    num: 30,
                    term: 'pinlun',
                    order: 'asc' //升序
                },
                success: str => {
                    let arr = JSON.parse(str);
                    // console.log(arr);
                    fillData(arr.data);
                }
            })
            ok1 = true;
        }
    });
    //销量排序
    let ok2 = true;
    $('.goods-nav .first').children().eq(1).children().click(function () {
        if (ok2) {
            $.ajax({
                type: 'get',
                url: '../api/index.php',
                data: {
                    type: 'order_list',
                    page: ipage,
                    num: 30,
                    term: 'soldnum',
                    order: 'desc' //降序
                },
                success: str => {
                    let arr = JSON.parse(str);
                    // console.log(arr);
                    fillData(arr.data);
                }
            })
            ok2 = false;
        } else {
            $.ajax({
                type: 'get',
                url: '../api/index.php',
                data: {
                    type: 'order_list',
                    page: ipage,
                    num: 30,
                    term: 'soldnum',
                    order: 'asc' //升序
                },
                success: str => {
                    let arr = JSON.parse(str);
                    // console.log(arr);
                    fillData(arr.data);
                }
            })
            ok2 = true;
        }
    });
    //价格区间
    $('.btn-common').click(function () {
        let num1 = $('.price-begin').val();
        let num2 = $('.price-end').val();
        // console.log(num1, num2);
        $.ajax({
            type: 'post',
            url: '../api/index.php',
            data: {
                type: 'pricechoose',
                num1: num1,
                num2: num2,
                num: 30,
                page: ipage
            },
            success: str => {
                let arr = JSON.parse(str);
                // console.log(arr);
                fillData(arr.data);
                page(arr);
            }
        })
    });
    //模糊查询
    $('.btn-search').click(function () {
        let txt = $.trim($('.txt-keyword').val());
        // console.log(txt);
        $.ajax({
            type: 'post',
            url: '../api/index.php',
            data: {
                type: 'search',
                text: txt,
                num: 30,
                page: ipage
            },
            success: str => {
                let arr = JSON.parse(str);
                // console.log(arr);
                fillData(arr.data);
                page(arr);
            }
        })
    })
    //点击跳转详情页
    $('.piclist').on('click', 'dt', function () {
        location.href = 'xiangqing.html?' + $(this).parent().parent().attr('data-id') + '&' + num;
    })
    //点击回到顶部
    $('.ym-nBar .ym-nBar-backtop-logo').click(function () {
        window.scrollTo(0, 0);
    });

    //手风琴效果 左侧侧边栏
    let isok = true;
    $('.channel-type').on('click', 'span', function () {
        // console.log(111);
        if (isok) {
            $(this).parent().next().removeClass('hidden');
            isok = false;
        } else {
            $(this).parent().next().addClass('hidden');
            isok = true;
        }
    });

    /**点击加入购物车
     *      1. 第一次点击将gid和数量存入订单信息表
     *      2. 点击第二次时候判断是否含有gid，有则数量加1
     *      
     *  */
    //给所有得加入购物车绑定点击事件
    let num = 0;
    $('.piclist').on('click', '.btn-add2cart', function () {
        num++;
        // console.log(num);
        $("iframe").contents().find(".txt-cartcount").html(num);
        $('.ym-nBar-cart-num').children().html(num);
    });

});