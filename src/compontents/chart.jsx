import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsReact from 'highcharts-react-official'
HighchartsMore(Highcharts);
require('highcharts/modules/accessibility')(Highcharts)


const Chart = ({ data, height, name }) => {
    const [chartOptions, setChartOptions] = useState({
        chart: { polar: true, height: height, },
        credits: { enabled: false }, title: { text: null },
        pane: {
            size: "60%",
            startAngle: 0,
            endAngle: 360
        },
        xAxis: {
            tickmarkPlacement: "on",
            min: 0,
            max: 6,
            categories: ['Aroma', 'Balance', 'Body', 'Acidity', 'Aftertaste', 'Flavor'],
        },

        yAxis: {
            min: 0,
            max: 10,
            labels: {
                enabled: true,
                formatter: function () { return this.value === 0 ? '' : this.value; } // 0 라벨을 숨김
            }
        },
        legend: { enabled: false },
        plotOptions: {
            area: {
                color: '#404040'  // 색상을 파란색이 아닌 다른 색으로 설정
            },
            series: {
                pointStart: 0,

            },
        }
    })


    useEffect(() => {

        setChartOptions({
            series: data,
        })
        console.log(data);
    }, [data]);
    return (
        <>
            <HighchartsReact
                highcharts={Highcharts}
                options={chartOptions}
            // constructorType={'stockChart'}
            />

        </>
    );
};

export default Chart;