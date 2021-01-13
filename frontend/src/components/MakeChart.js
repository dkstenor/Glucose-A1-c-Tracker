import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

function MakeChart(props) {

    function tConv24(time24) {
        var ts = time24;
        var H = +ts.substr(0, 2);
        var h = (H % 12) || 12;
        h = (h < 10)?("0"+h):h;  // leading 0 at the left for 1 digit hours
        var ampm = H < 12 ? " AM" : " PM";
        ts = h + ts.substr(2, 3) + ampm;
        return ts;
      };


    const options = {
        chart: {
          type: "spline"
        },
        title: {
          text: "Glucose Readings"
        },
        xAxis: {
          categories: 
            props.data.map(dataItem => 
              tConv24(dataItem.reading_time))
          
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
            data: props.data.map(dataItem => 
              dataItem.my_reading)
          }
        ]
      };

    return (
        <React.Fragment>
            <HighchartsReact highcharts={Highcharts} options={options} />
        </React.Fragment>
    )
}




export default MakeChart;