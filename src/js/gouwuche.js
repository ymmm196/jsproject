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

    function gwFn() {
        /*
        需求：
            * 点击加减可以修改数量和小计
            * 删除当行
            * 全选不选
            * 全删
            
        接口：
            * 渲染数据接口：订单表(详情页点击购买的时候存的数据)
            * 数量加减
            * 删除当行、删除全部
            * 选做：保存总数量和总价格
    */
        //1.点击加减修改数量和小计
        function total(now, num) {
            let kucun = 500;
            if (num < 1) {
                num = 1;
            } else if (num > kucun) {
                num = kucun;
            }
            $(now).parent().find('.editAmount').val(num);
            let price = $(now).parent().parent().prev().children().html();
            // console.log(price);
            //小计 = 数量*单价
            let all = (num * price).toFixed(2);
            // console.log(all);
            $(now).parent().parent().next().children().html(all);
        }
        //点击加
        $('.addAmount').click(function () {
            let num = $(this).prev().val();
            num++;
            total($(this), num);
            allNum();
        });
        //点击减
        $('.subAmount').click(function () {
            let num = $(this).next().val();
            num--;
            total($(this), num);
            allNum();
        });
        //手动输入
        $('.editAmount').change(function () {
            let num = $(this).val();
            total($(this), num);
            allNum();
        });

        //2.删除当行
        $('#cartGoodsList').on('click', '.btn-remove', function () {
            let ok = confirm('您确定要删除这件商品吗？');
            if (ok) {
                $(this).parent().parent().remove();
                $.ajax({
                    type: 'post',
                    url: '../api/cart2.php',
                    data: {
                        gid: $(this).parent().parent().attr('data-id')
                    },
                    success: str => {
                        let arr = JSON.parse(str);
                        console.log(arr);
                    }
                })
            }
        });

        //3.复选框控制总量和总价
        function checkedArr() {
            let arr = []; //存放被勾选得复选框得下标
            // console.log($('.btn_fx input'));
            $('.btn_fx input').each(function (index, item) {
                // console.log($(item), index);
                if ($(item).prop('checked')) {
                    arr.push(index);
                }
            });
            return arr;
        };
        //4.控制总件数和总价
        function allNum() {
            let checkall = checkedArr(); //返回被勾选得下标数组
            let num = 0; //商品得总数量
            let total = 0; //商品总价
            checkall.forEach(function (item, index) {
                num += $('#cartGoodsList tr').eq(checkall[index]).children().eq(4).children().children('.editAmount').val() * 1;
                total += $('#cartGoodsList tr').eq(checkall[index]).children().eq(5).children().html() * 1;
            });
            $('.chooseResult .subtotal').eq(0).children().eq(0).children().html(num);
            $('.chooseResult .subtotal #buy_total').html(total.toFixed(2));
            //结算行
            $('#floatNav_buy .buy .total_price').children('.total_num_1-normal').html(num);
            $('#floatNav_buy .buy .total_price').children('.total').html(total.toFixed(2));

            // 控制全选按钮
            let len = $('.btn_fx input').length;
            let checkednum = $('.btn_fx input:checked').length;
            if (len == checkednum) {
                $('.trFooter ul>li input').prop('checked', true);
                $('.trTitle .selectAll').prop('checked', true);
            } else {
                $('.trFooter ul>li input').prop('checked', false);
                $('.trTitle .selectAll').prop('checked', false);
            }
        }
        $('#cartGoodsList').on('click', '.btn_fx input', function () {
            allNum();
        });
        //5.全选功能
        $('.trFooter .selectAll').click(function () {
            let isok = $('.trFooter .selectAll').prop('checked');
            $('.btn_fx input').prop('checked', isok);
            allNum();
        });
        $('.trTitle .selectAll').click(function () {
            let isok = $('.trTitle .selectAll').prop('checked');
            $('.btn_fx input').prop('checked', isok);
            $('.trFooter .selectAll').prop('checked', isok);
            allNum();
        })
        //6.全删：删除被选中行
        $('.removeSelectedGoods').click(function () {
            let checkall = checkedArr().reverse();
            let ok = confirm('您确定要删除我们吗？');
            if (ok) {
                checkall.forEach(function (item, index) {
                    // $('#cartGoodsList table tbody').children().eq(checkall[index]).remove();
                    console.log($('#cartGoodsList table tbody').children().eq(checkall[index]), index);
                    $.ajax({
                        type: 'post',
                        url: '../api/cart2.php',
                        data: {
                            gid: $('#cartGoodsList table tbody').children().eq(checkall[index]).attr('data-id')
                        },
                        success: str => {
                            let arr = JSON.parse(str);
                            console.log(arr);
                        }
                    })
                })
            }
            allNum();
        })
        //7.点击结算
        $('#floatNav_buy ul .buy').children().click(function () {
            alert('支付成功！');
        })
    }
    //获取传递过来的id，和count
    let id = window.location.href.split("?")[1].split('&').join('')[0];
    // console.log(id);
    let count = window.location.href.split("?")[1].split('&').join('')[1];
    // console.log(id, count);
    function fillData(ele) {
        let html = ele.map(function (item) {
            return `<tr class="border" data-id="${item.gid}">
                        <td width="8%" class="btn_fx">
                            <input type="checkbox">
                        </td>
                        <td width="8%" class="left">
                            <a href="###" class="prod-img"><img src="${item.imgurl}"
                                    alt=""></a>
                        </td>
                        <td class="left">
                            <a href="###" class="title">${item.title}</a>
                        </td>
                        <td width="13%" class="dj_price">￥<b>${item.price}</b></td>
                        <td width="13%">
                            <span class="jj_box">
                                <a href="###"
                                    class="left   left_jy  subAmount cartSubAmount">-</a>
                                <input type="text" value="${item.count}" class="editAmount cartEditAmount"
                                    maxvalue="500" maxlength="3">
                                <a href="###" class="right  addAmount cartAddAmount">+</a>
                            </span>
                        </td>
                        <td width="13%" class="xj_price">￥<b>${item.count*item.price}</b></td>
                        <td width="13%" class="btn_edit">
                            <a href="###" class="addFavorite">加入收藏夹</a><br>
                            <a href="###" class="btn-remove removeGoods">删除</a>
                        </td>
                    </tr>`;
        }).join('');
        $('.inTable tbody').html(html);
    }

    //Promise解决异步回调地狱
    var p1 = new Promise(function (resolved) {
        //从商品信息中获取这一条数据
        $.ajax({
            type: 'post',
            url: '../api/index.php',
            data: {
                type: 'detailed_list',
                id: id,
            },
            success: str => {
                let arr = JSON.parse(str).data[0];
                // console.log(arr, count);
                resolved(arr);
            }
        });
    });
    p1.then(function (arr) {
        var p2 = new Promise(function (resolved) {
            $.ajax({
                type: 'post',
                url: '../api/cart.php',
                data: {
                    gid: arr.gid,
                    uid: arr.uid,
                    price: arr.price,
                    soldnum: arr.soldnum,
                    brand: arr.brand,
                    city: arr.city,
                    commentcount1: arr.commentcount1,
                    imgurl: arr.imgurl,
                    leixing: arr.leixing,
                    pinlun: arr.pinlun,
                    ratecount: arr.ratecount,
                    title: arr.title,
                    count: count
                },
                success: str => {
                    resolved(str);
                }
            })
        })
        p2.then(function (str2) {
            if (str2 == 'yes') {
                $.ajax({
                    type: 'post',
                    url: '../api/cart1.php',
                    success: str1 => {
                        // console.log(str1);
                        let arr1 = JSON.parse(str1);
                        // console.log(arr1);
                        fillData(arr1.data);
                        gwFn();
                    }
                });
            }
        });
    });


});