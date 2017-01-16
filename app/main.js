// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById('main'));

var httpRequest = new XMLHttpRequest();

var dataSource = [];

// 根据配置项和数据显示图表
function drawLines(data) {
    myChart.setOption({
        title: {
            text: '100€等值人民币汇率曲线图'
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            left: 'right',
            data:[ '现汇卖出', '现汇买入', '现钞买入']
        },
        xAxis: {
            data: data.map(function (item) {
                return item[3].replace(' ', '\n');
            })
        },
        yAxis: {
            name: '金额(元)',
            min: 680
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
        }]
    });
}


function ajaxCallback() {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
      if (httpRequest.status === 200) {
        dataSource = JSON.parse(httpRequest.responseText)
        drawLines(dataSource)
      } else {
        alert('There was a problem with the request.');
      }
    }
}

httpRequest.onreadystatechange = ajaxCallback;
httpRequest.open('GET', '/data.json');
httpRequest.send();

// window.onresize = function(){
//     drawLines(dataSource)
// }
