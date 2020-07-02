import { defaultOptions, xAxisDefaults, formatNumber } from './chart-defaults.js';

import deepmerge from 'deepmerge';
import React from 'react';
import { Bar } from 'react-chartjs-2';

function AgeChart(props) {
    let ages = Array(7).fill(0);
    if (!props.data || props.data.length === 0) {
        return <div></div>;
    }

    const element = props.data.age_group.cases;

    for (let i = 0; i < 7; i++) {
        ages[i] = element[i].count;
    }
    const chartData = {
        labels: [
            '0-17',
            '18-29',

            '30-39',
            '40-49',
            '50-59',
            '60-70',
            '70+',
        ],
        datasets: [
            {
                data: ages,
                label: 'Cases',
                backgroundColor: '#bc79c9',
            },
        ],
    };

    const chartOptions = deepmerge(defaultOptions, {
        legend: {
            display: false,
        },
        scales: {
            xAxes: [
                deepmerge(xAxisDefaults, {
                    stacked: true,
                }),
            ],
            yAxes: [
                {
                    stacked: true,
                },
            ],
        },
        events: ['mousemove', 'mouseout', 'touchstart', 'touchmove', 'touchend'],
        responsive: true,
        maintainAspectRatio: false,
        tooltips: {
            mode: 'index',
        },
    });

    const sampleSize = ages.reduce((a, b) => a + b, 0);

    return (
        <div className="charts-header">
            <div className="chart-title">{props.title}</div>
            <div className="chart-content doughnut">
                <Bar data={chartData} options={chartOptions} />
            </div>
            <div className="chart-note">
                Sample Size: {formatNumber(sampleSize)} patients
        </div>
        </div>
    );
}

export default AgeChart;