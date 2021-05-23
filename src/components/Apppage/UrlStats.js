import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios';
import { Line } from 'react-chartjs-2';

const UrlStats = (props) => {

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

    const array = ['day', 'night', 'afternoon', 'night', 'noon', 'night',
    'noon', 'day', 'afternoon', 'day', 'night'];
    const groupSimilar = arr => {
    return arr.reduce((acc, val) => {
        const { data, map } = acc;
        const ind = map.get(val);
        if(map.has(val)){
            data[ind][1]++;
        } else {
            map.set(val, data.push([val, 1])-1);
        }
        return { data, map };
    }, {
        data: [],
        map: new Map()
    }).data;
    };
    console.log("Yoooo");
    console.log(groupSimilar(urldata));
    const changeDateData = (list) => {
        return list.map( ele => ele.substring(0,10))
    };

    useState(()=>{
        //https://agile-ravine-23097.herokuapp.com/v1/list
        axios.get(`http://localhost:5000/v1/${props.match.params.tinyurl}/stats`,{
            headers: { 
                'Access-Control-Allow-Origin' : '*',
                'Access-Control-Allow-Headers': '*'
            }
        })
            .then((res) => {
                console.log("Stats data ");
                console.log(res.data);
                let newlist = changeDateData(res.data.redirects);
                newlist = groupSimilar(newlist);
                console.log("LISTyo");
                console.log(newlist);
                console.log("------------------");
                const y = newlist.map(ele => ele[1]);
                console.log("WDFGFDS",y);
                setLabels(newlist.map(ele => ele[0]));
                setUrlData(newlist.map(ele => ele[1]));
                
               
            })
            .catch((err) => {
                console.log(err);
            })
    },[]);

    
    return (
        <div style={{padding:"2em"}}>
            <div className='header'>
            <h1 className='title'>URL Usage Statistics</h1>
            <div className='links'>
            </div>
            </div>
            <Line data={data} options={options} />
        </div>
    )
}


export default UrlStats
