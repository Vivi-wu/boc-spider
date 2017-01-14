var request = require('request'),
    cheerio = require('cheerio');

var options = {
    url: 'http://srh.bankofchina.com/search/whpj/search.jsp',
    method: 'POST',
    form: {
        pjname: 1326
    }
}

console.log('爬虫程序开始运行......');

// 第一步，发起getData请求
request(options, function(err, response, body) {
    if (!err && response.statusCode == 200) {
        // console.log(body);
        var $ = cheerio.load(body),
            $tr = $('.BOC_main tr'), $child = '',
            i = 1, len = $tr.length;

        console.log('现汇买入价' + '\t' + '现钞买入价' + '\t' + '现汇卖出价' + '\t' + '发布时间')

        for (i; i < len; i++) {
            $child = $tr.eq(i).children();
            console.log($child.eq(1).text() + '\t' + $child.eq(2).text() + '\t' + $child.eq(3).text() + '\t' + $child.eq(7).text())
        }
        console.log('爬虫程序结束......');
    }
})
