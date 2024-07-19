import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";

class BarGraph extends Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [
        {
          name: "sales",
          data: [
            { x: '2020-09-10', y: 25000 },
            { x: '2020-09-11', y: 43000 },
            { x: '2020-09-12', y: 44800 },
            { x: '2020-09-13', y: 47000 },
            { x: '2020-09-14', y: 54000 },
            { x: '2020-09-15', y: 58000 },
            { x: '2020-09-16', y: 69000 }
          ]
        }
      ],
      options: {
        chart: {
          type: 'bar',
          height: 380,
          toolbar: {
            show: false,
          },
        },
        plotOptions: {
          bar: {
            columnWidth: '15px',
            borderRadius: 5,
            barHeight: '100%',
            colors: {
              backgroundBarColors: [],
              backgroundBarOpacity: 1,
              colors: ['#5570F1']
            },
            dataLabels: {
              position: 'top',
            }
          }
        },
        dataLabels: {
          enabled: false
        },
        xaxis: {
          type: 'datetime',
          min: new Date('2020-09-10').getTime(),
          max: new Date('2020-09-16').getTime(),
          labels: {
            format: 'MMM dd',
            style: {
              colors: '#BEC0CA'
            }
          },
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false
          }
        },
        yaxis: {
          min: 0,
          max: 100000,
          tickAmount: 5,
          labels: {
            formatter: function(val) {
              return `${val / 1000}k`;
            },
            style: {
              colors: '#BEC0CA'
            }
          },
          axisBorder: {
            show: false 
          },
          axisTicks: {
            show: false
          }
        },
        grid: {
          yaxis: {
            lines: {
              show: false
            }
          },
          borderColor: 'transparent'
        },
        tooltip: {
          x: {
            formatter: function(val) {
              const date = new Date(val);
              const month = date.toLocaleString('default', { month: 'short' });
              const day = date.getDate();
              return `${month} ${day}`;
            }
          }
        }
      }
    };
  }

  render() {
    return (
      <>
        <div>
          <div id="chart">
            <ReactApexChart options={this.state.options} series={this.state.series} type="bar" height={380} />
          </div>
          <div id="html-dist"></div>
        </div>
      </>
    );
  }
}

export default BarGraph;
