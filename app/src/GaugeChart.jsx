import React, { useEffect, useRef } from "react";
import Gauge from 'chartjs-gauge'

function GaugeChart(props) {
    const chartContainer = useRef(null);

    useEffect(() => {
        const chartConfig = {
            type: 'gauge',
            data: {
              datasets: [{
                value: props.value,
                minValue: 0,
                data: [props.rStop, props.cStop, 100],
                backgroundColor: ['red', 'orange', 'green'],
              }]
            },
            options: {
              needle: {
                radiusPercentage: 2,
                widthPercentage: 3.2,
                lengthPercentage: 80,
                color: 'rgba(0, 0, 0, 1)'
              },
              valueLabel: {
                display: true,
                formatter: (value) => {
                  return Math.round(value) + '%';
                },
                color: 'rgba(255, 255, 255, 1)',
                backgroundColor: 'rgba(0, 0, 0, 1)',
                borderRadius: 5,
                padding: {
                  top: 10,
                  bottom: 10
                }
              }
            }
          }
          new Gauge(chartContainer.current, chartConfig);
    });

    return (
        <canvas ref={chartContainer} />
    );
}

export default GaugeChart;