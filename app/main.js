// Ajax 同步获取数据函数
var xhr = function(url){
    var httpRequest = new XMLHttpRequest(),
        result = [];

    httpRequest.open('GET', url, false);
    // indicating whether or not to perform the operation asynchronously
    // If this value is false, the send() method does not return until the response is received.
    httpRequest.onreadystatechange = function(){
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {
                result = JSON.parse(httpRequest.responseText)
            } else {
                alert('There was a problem with the request, pls refresh the page and try again.');
            }
        }
    }
    httpRequest.send()
    return result
}

var dataSource = xhr('./data.json'), // 爬虫实时抓取的数据
    exchangeDataSource = xhr('./exchangeData.json'); // 手动录入换汇的数据


// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById('main')),
    myChart2 = echarts.init(document.getElementById('exchange'));

// 根据配置项和数据显示图表
function drawLines(data) {
    myChart.setOption({
        title: {
            text: '近期中国银行欧元-人民币汇率',
            x: 'center'
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            top: 25,
            left: 'right',
            data:[ '现汇卖出', '现汇买入', '现钞买入']
        },
        grid: {
            left: 50,
            right: 40
        },
        xAxis: {
            data: data.map(function (item) {
                return item[3].replace(' ', '\n');
            })
        },
        yAxis: {
            name: '金额(元)',
            min: 690
        },
        series: [
            {
                name: '现汇卖出',
                type: 'line',
                markPoint: {
                    data: [{type: 'min', name: '最小值', symbolSize: 70}]
                },
                data: data.map(function (item) {
                    return item[2];
                })
            },{
                name: '现汇买入',
                type: 'line',
                markPoint: {
                    data: [{type: 'max', name: '最大值', symbolSize: 70}]
                },
                data: data.map(function (item) {
                    return item[0];
                })
            },{
                name: '现钞买入',
                type: 'line',
                markPoint: {
                    data: [{type: 'max', name: '最大值', symbolSize: 70}]
                },
                data: data.map(function (item) {
                    return item[1];
                })
            }
        ]
    });
}


function drawScatters(data) {
    myChart2.setOption({
        title: {
            text: '欧元-人民币兑换记录',
            x: 'center'
        },
        tooltip: {},
        legend: {
            top: 25,
            left: 'right',
            data:[ '现汇结汇', '现钞结汇']
        },
        grid: {
            left: 50,
            right: 40
        },
        xAxis: {
            type : 'time'
        },
        yAxis: {
            name: '汇率(100€兑换)',
            min: 700,
            splitLine: {
                lineStyle: {
                    type: 'dashed'
                }
            }
        },
        series: [
            {
                name: '现汇结汇',
                type: 'scatter',
                data: data[0],
                symbolSize: function(data) {
                    return Math.round(data[1]/20)
                }
            },
            {
                name: '现钞结汇',
                type: 'scatter',
                data: data[1],
                symbolSize: function(data) {
                    return Math.round(data[1]/20)
                }
            }
        ]
    });
}

drawLines(dataSource)
drawScatters(exchangeDataSource)
