// 根据响应数据绘制曲线图
// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById('main'));

var httpRequest = new XMLHttpRequest();

var dataSource = [];

// 根据配置项和数据显示图表
function drawLines(data) {
    myChart.setOption({
        title: {
            text: '现汇买入价/100€'
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data:['现汇买入', '现钞买入', '现汇卖出']
        },
        xAxis: {
            data: data.map(function (item) {
                return item[3];
            })
        },
        yAxis: {
            min: 680
        },
        series: [{
            name: '现汇买入',
            type: 'line',
            data: data.map(function (item) {
                return item[0];
            })
        },
        {
            name: '现钞买入',
            type: 'line',
            data: data.map(function (item) {
                return item[1];
            })
        },
        {
            name: '现汇卖出',
            type: 'line',
            data: data.map(function (item) {
                return item[2];
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

window.onresize = function(){
    drawLines(dataSource)
}
