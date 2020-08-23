import React from 'react'
import { Line } from 'react-chartjs-2'
import moment from 'moment'


function LineChart(props) {
    console.log(props.countryData)
    // array con fechas de Date

    // array con recuperados de Recovered
    const recovered = props.countryData.reduce((accum, current) => {
        return [...accum, current.Recovered]
    }, [])

    const confirmed = props.countryData.reduce((accum, current) => {
        return [...accum, current.Confirmed]
    }, [])

    const dates = props.countryData.reduce((accum, current) => {
        return [...accum, moment(current.Date).format("DD/MM/YY")]
    }, [])

    console.log(recovered)
    
    const data = {
        labels: dates,
        datasets: [
          {
            label: 'Recuperados',
            fill: true,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: recovered
          }, {

            label: 'Confirmados',
            fill: true,
            lineTension: 0.1,
            backgroundColor: 'rgba(140,30,192,0.4)',
            borderColor: 'rgba(140,30,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: confirmed

          }
        ]
    };

    return(
        <div>
            <Line data={data} />
        </div>
    )
}

export default LineChart