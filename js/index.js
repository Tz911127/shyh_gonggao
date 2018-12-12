$(document).ready(function () {
    var ip = 'http://192.168.1.174:9090';
    var speed_ = '40'
    var rowHeight_ = '26'
    var spe = '1000'
    var tim = '10000'
    var token = window.location.search.split('=')[1];
    $.ajax({
        url: ip + '/client/announcement/getAnnouncementList',
        methods: 'GET',
        data: {
            // token: 'ea1405a631794b2fba2e8ba23c654783'
            token: token
        },
        async: false,
        success: function (res) {
            if (res.code == 1) {
                allData = res.content;
                getData(res.content);
            }
        }
    });

    function getData(data) {
        var data = data;
        var finance_data //储蓄产品
        var money_data = [] //理财产品
        var announcement_data = []
        var finan_divs = [];
        var Hscreen = $(window).height() - 70 - 90 - 19;
        $('.main').height(Hscreen)
        for (var i = 0; i < data.length; i++) {
            if (data[i].type == 0) {
                finance_data = data[i].content;
                finance_data = JSON.parse(finance_data);
                var remark = (data[i].remark == undefined) ? '' : data[i].remark
                $('.title_right>ul').append('<li>' + '<span style="float: right;padding-right:10px;font-size:20px">' + remark + '</span>' + '<span style="font-size:24px;font-weight:bold">' + data[i].name + '</span>' + '</li > ');

                var finance_div = ''
                for (var j = 0; j < finance_data.length; j++) {
                    var fi_div =
                        // '<li>' +
                        '<div class="item">' +
                        ' <h5>' + finance_data[j].yearOfDeposit + '</h5>' +
                        ' <div class="ul">' +
                        '<div class="li"><span class="left">养老金利率(%)</span><span class="right">' + finance_data[j].pensionInterestRate + '</span></div>' +
                        '<div class="li"><span class="left">1万起利率(%)</span><span class="right">' + finance_data[j].interestRateTen + '</span></div>' +
                        '<div class="li"><span class="left">20万起利率(%)</span><span class="right">' + finance_data[j].interestRateTw + '</span></div>' +
                        ' <div class="li"><span class="left">50万起利率(%)</span><span class="right">' + finance_data[j].interestRateFifty + '</span></div>' +
                        '</div>' +
                        '</div>'
                    finance_div += fi_div;

                }
                finan_divs.push(finance_div)
            } else if (data[i].type == 1) {
                money_data.push(data[i]);
            } else if (data[i].type == 2) {
                announcement_data.push(data[i]);
            }

        }
        for (var k = 0; k < finan_divs.length; k++) {
            $('.menu_first>ul').append('<li>' + finan_divs[k] + '</li>')
        }

        for (var i = 0; i < announcement_data.length; i++) {
            var announcement_div = announcement_data[i].content + '\xa0\xa0\xa0\xa0\xa0\xa0\xa0'
            $('#affiche').append(announcement_div)
        };



        // 600万金融资产客户
        var newFin_data = [];
        var newFin_name = [];
        // 保证收益理财产品
        var newFina_data = []
        var newFina_name = [];
        // 开放型理财产品
        var conFin_data = []
        var conFin_name = []
        // 非保证收益性型产品
        var conFina_data = []
        var conFina_name = []
        for (var i = 0; i < money_data.length; i++) {
            var fin_div;
            if (money_data[i].financeType == 0) {

                var newMoney_data = JSON.parse(money_data[i].content)
                var newMoney_name = money_data[i].name
                newFina_data.push(newMoney_data[0]);
                newFina_name.push(newMoney_name)

            } else if (money_data[i].financeType == 1) {
                var newMoney_data = JSON.parse(money_data[i].content)
                var newMoney_name = money_data[i].name
                conFin_data.push(newMoney_data[0]);
                conFin_name.push(newMoney_name)

            } else if (money_data[i].financeType == 2) {
                var newMoney_data = JSON.parse(money_data[i].content)
                var newMoney_name = money_data[i].name
                conFina_data.push(newMoney_data[0]);
                conFina_name.push(newMoney_name)

            } else if (money_data[i].financeType == 3) {
                var newMoney_data = JSON.parse(money_data[i].content)
                var newMoney_name = money_data[i].name
                newFin_data.push(newMoney_data[0]);
                newFin_name.push(newMoney_name)
            }

            // $('.menu_sec').append(fin_div)
        }
        // 保证收益理财产品 滚动
        if (newFina_data.length != 0) {
            roll('保证收益理财产品', newFina_data, newFina_name, 'item_1', spe, tim)
        }
        // 非保证收益性型产品

        if (conFin_data.length != 0) {
            roll('非保证收益性型产品', conFin_data, conFin_name, 'item_2', spe, tim)
        }
        // roll('非保证收益性型产品', conFin_data, conFin_name, 'item_2', spe, tim)
        //开放型理财产品
        if (conFina_data.length != 0) {
            roll('开放型理财产品', conFina_data, conFina_name, 'item_3', spe, tim)
        }
        // 600万金融资产客户  滚动
        if (newFin_data.length != 0) {
            roll('600万金融资产客户', newFin_data, newFin_name, 'item_4', spe, tim)
        }
        var stra = $(".ul").find("li");
        var tit = $('.title_right>ul').find('li')
        fade(stra);
        fade(tit)



    }

    function roll(tit, data, data_name, class_, speed, rowHeight) {

        var fina_div =
            '<div class="item ' + class_ + '">' +
            '<h5>' + tit + '</h5>' +
            '<div class="old">' + ' <ul>' + '</ul>' + '</div>' +
            '<div class="ann">' + ' <ul>' +
            '</ul>' + '</div>' +
            '<div class="sail">' + ' <ul>' + '</ul>' +
            '</div>';
        $('.menu_sec>div').append(fina_div);
        for (var i = 0; i < data.length; i++) {
            var newFin_li = ' <li>' + '<a href="#">' + data[i].expectedProfits + '%' + '</a>' + '</li>';
            var newFinsale_li = ' <li>' + '<a href="#">' + '<span style="margin-right:30px">起售' + data[i].saleGold + '</span>' + '<span>' + data[i].term + '</span>' + '</a>' + '</li>'
            $('.' + class_ + '>.ann>ul').append(newFin_li);
            $('.' + class_ + '>.sail>ul').append(newFinsale_li)
        }
        for (var i = 0; i < data_name.length; i++) {
            var newFin_name_li = ' <li>' + '<a href="#">' + data_name[i] + '</a>' + '</li>'
            $('.' + class_ + '>.old>ul').append(newFin_name_li)
        }

        _roll($('.' + class_ + '>.ann'), {
            line: 1,
            speed: speed,
            timer: rowHeight
        })
        _roll($('.' + class_ + '>.sail'), {
            line: 1,
            speed: speed,
            timer: rowHeight
        })
        _roll($('.' + class_ + '>.old'), {
            line: 1,
            speed: speed,
            timer: rowHeight
        })
    };

    function _roll(dom, opt) {

        if (!opt) var opt = {};

        var setTimer;
        var _this = dom.eq(0).find("ul:first");

        var lineH = _this.find("li:first").height(), //23
            line = opt.line ? parseInt(opt.line, 10) : parseInt(this.height() / lineH, 10),
            speed = opt.speed ? parseInt(opt.speed, 10) : 7000, //卷动速度，数值越大，速度越慢（毫秒）
            timer = opt.timer ? parseInt(opt.timer, 10) : 7000; //滚动的时间间隔（毫秒）
        if (line == 0) line = 1;

        var upHeight = 0 - line * lineH; //-总高度
        var upHeight = 0 - line * lineH; //-总高度

        var scrollUp = function () {
            _this.animate({
                marginTop: upHeight // <li>的margin-top
            }, speed, function () {
                for (var i = 1; i <= line; i++) {
                    _this.find("li:first").appendTo(_this);
                }
                _this.css({
                    marginTop: 0
                });
            });

        };
        var timerID = function () {
            setTimer = setInterval(scrollUp, timer);
        };
        timerID();
    };

    function changeData(data) {
        var data = data;
        // alert(JSON.stringify(data))
        var finance_data //储蓄产品
        var money_data = [] //理财产品
        var announcement_data = []
        var finan_divs = [];
        var Hscreen = $(window).height() - 70 - 90 - 19;
        $('.main').height(Hscreen)
        $('.title_right>ul>li').remove();
        // alert(1)
        for (var i = 0; i < data.length; i++) {
            if (data[i].type == 0) {
                finance_data = data[i].content;
                finance_data = JSON.parse(finance_data);
                var remark = (data[i].remark == undefined) ? '' : data[i].remark
                $('.title_right>ul').append('<li>' + '<span style="float: right;padding-right:10px;font-size:20px">' + remark + '</span>' + '<span style="font-size:24px;font-weight:bold">' + data[i].name + '</span>' + '</li > ');

                var finance_div = ''
                for (var j = 0; j < finance_data.length; j++) {
                    var fi_div =
                        // '<li>' +
                        '<div class="item">' +
                        ' <h5>' + finance_data[j].yearOfDeposit + '</h5>' +
                        ' <div class="ul">' +
                        '<div class="li"><span class="left">养老金利率(%)</span><span class="right">' + finance_data[j].pensionInterestRate + '</span></div>' +
                        '<div class="li"><span class="left">1万起利率(%)</span><span class="right">' + finance_data[j].interestRateTen + '</span></div>' +
                        '<div class="li"><span class="left">20万起利率(%)</span><span class="right">' + finance_data[j].interestRateTw + '</span></div>' +
                        ' <div class="li"><span class="left">50万起利率(%)</span><span class="right">' + finance_data[j].interestRateFifty + '</span></div>' +
                        '</div>' +
                        '</div>'
                    finance_div += fi_div;

                }
                finan_divs.push(finance_div)

            } else if (data[i].type == 1) {
                money_data.push(data[i]);
            } else if (data[i].type == 2) {
                announcement_data.push(data[i]);

            }

        }
        // alert('title数据')



        $('.menu_first>ul>li').remove()
        // $('.menu_first>ul>li').empty()

        for (var k = 0; k < finan_divs.length; k++) {
            $('.menu_first>ul').append('<li>' + finan_divs[k] + '</li>')
        }

        $('#affiche').html('');
        var maqCont = '';
        for (var i = 0; i < announcement_data.length; i++) {
            var announcement_div = announcement_data[i].content + '\xa0\xa0\xa0\xa0\xa0\xa0\xa0'
            maqCont += announcement_div;
        };
        // alert(maqCont);
        $('#affiche').html(maqCont);

        // alert('公告数据')

        // 600万金融资产客户
        var newFin_data = [];
        var newFin_name = [];
        // 保证收益理财产品
        var newFina_data = []
        var newFina_name = [];
        // 开放型理财产品
        var conFin_data = []
        var conFin_name = []
        // 非保证收益性型产品
        var conFina_data = []
        var conFina_name = []
        $('.menu_sec>div>.item').remove()
        for (var i = 0; i < money_data.length; i++) {
            var fin_div;
            if (money_data[i].financeType == 0) {

                var newMoney_data = JSON.parse(money_data[i].content)
                var newMoney_name = money_data[i].name
                newFina_data.push(newMoney_data[0]);
                newFina_name.push(newMoney_name)

            } else if (money_data[i].financeType == 1) {
                var newMoney_data = JSON.parse(money_data[i].content)
                var newMoney_name = money_data[i].name
                conFin_data.push(newMoney_data[0]);
                conFin_name.push(newMoney_name)

            } else if (money_data[i].financeType == 2) {
                var newMoney_data = JSON.parse(money_data[i].content)
                var newMoney_name = money_data[i].name
                conFina_data.push(newMoney_data[0]);
                conFina_name.push(newMoney_name)

            } else if (money_data[i].financeType == 3) {
                var newMoney_data = JSON.parse(money_data[i].content)
                var newMoney_name = money_data[i].name
                newFin_data.push(newMoney_data[0]);
                newFin_name.push(newMoney_name)
            }

            $('.menu_sec>div').append(fin_div)
        }
        // alert('二级菜单')
        // 保证收益理财产品 滚动
        if (newFina_data.length != 0) {
            roll('保证收益理财产品', newFina_data, newFina_name, 'item_1', spe, tim)
        }
        // 非保证收益性型产品
        if (conFin_data.length != 0) {
            roll('非保证收益性型产品', conFin_data, conFin_name, 'item_2', spe, tim)
        }

        //开放型理财产品
        if (conFina_data.length != 0) {
            roll('开放型理财产品', conFina_data, conFina_name, 'item_3', spe, tim)
        }
        // 600万金融资产客户  滚动
        if (newFin_data.length != 0) {
            roll('600万金融资产客户', newFin_data, newFin_name, 'item_4', spe, tim)
        }

        var stra = $(".ul").find("li");
        var tit = $('.title_right>ul').find('li')
        fade(stra);
        fade(tit)
        // alert('title滚动')



    }

    function fade(dom) {
        var ii = 0;

        var len = dom.length;
        dom.eq(0).show();
        var orager = setInterval(timesar, 20000);

        function timesar() {
            ii++
            if (ii > len - 1) {
                ii = 0;
            }
            dig(ii)
        }

        function dig(ii) {
            dom.eq(ii).fadeIn().siblings().fadeOut();
        }
    };
    setInterval(function () {
        $.ajax({
            url: ip + '/client/announcement/getAnnouncementList?t=' + new Date().getTime(),
            methods: 'GET',
            data: {
                token: token
            },
            async: false,
            success: function (res) {

                if (res.code == 1 && res.content != []) {
                    allData = res.content
                    changeData(res.content)
                }
            }
        });
    }, 30 * 60 * 1000)
});