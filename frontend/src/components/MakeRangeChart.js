import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

function MakeRangeChart(props) {

    const options = {
        chart: {
          type: "spline"
        },
        title: {
          text: "Glucose Readings"
        },
        xAxis: {
          categories: 
            props.data.ret.map(dataItem => 
              dataItem.reading_date)
          
        },
        yAxis: {
          title: {
            text: "Glucose"
          }
        },
        plotOptions: {
          series: {
            color: 'purple'
        },
          line: {
            dataLabels: {
              enabled: true
            },
            enableMouseTracking: false
          },
        },
        series: [
          {
            name: "Daily Readings",
            data: props.data.ret.map(dataItem => 
              dataItem.day_avg)
          }
        ]
      };

    return (
        <React.Fragment>
            <HighchartsReact highcharts={Highcharts} options={options} />
        </React.Fragment>
    )
}




export default MakeRangeChart;