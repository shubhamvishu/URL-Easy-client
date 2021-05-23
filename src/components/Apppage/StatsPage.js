import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios';
import { Line } from 'react-chartjs-2';

const StatsPage = (props) => {

    const [labels,setLabels] = useState([]);
    const [urldata, setUrlData] = useState([]);

    const data = {
        labels: labels,
        datasets: [
          {
            label: '# of Redirects',
            data: urldata,
            fill: false,
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgba(255, 99, 132, 0.2)',
          },
        ],
      };
      
    const options = {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
    };

    useState(()=>{
        //https://agile-ravine-23097.herokuapp.com/v1/list
        axios.get("https://agile-ravine-23097.herokuapp.com/v1/list",{
            headers: { 
                'Access-Control-Allow-Origin' : '*',
                'Access-Control-Allow-Headers': '*'
            }
        })
            .then((res) => {
                console.log(res.data);
                const y = res.data.map(ele => ele.newurl);
                console.log("Y",y);
                const x = res.data.map(ele => ele.times);
                console.log("X",x);
                setLabels(res.data.map(ele => ele.newurl));
                setUrlData(res.data.map(ele => ele.times));
               
            })
            .catch((err) => {
                console.log("err");
            })
    },[]);

    
    return (
        <div style={{padding:"2em"}}>
            <div className='header'>
            <h1 className='title'>URL Usage Statistics</h1>
            </div>
            <Line data={data} options={options}  responsive={true}/>
        </div>
    )
}

export default StatsPage;
