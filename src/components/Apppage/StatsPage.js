import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Header, Input, Icon, Image, Menu, Segment, Sidebar, Button, Loader, Step, Dimmer } from 'semantic-ui-react';
import {Link} from 'react-router-dom';


const StatsPage = (props) => {

    const [labels,setLabels] = useState([]);
    const [urldata, setUrlData] = useState([]);

    const data = {
        labels: labels,
        datasets: [
          {
            label: '# of Redirects',
            data: urldata,
            fill: true,
            backgroundColor: 'rgba(48, 220, 242, 0.5)',
            borderColor: 'rgb(48, 220, 242)',
            borderWidth: 4
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
            <h1 className='title' style={{display:"flex"}}><Link to="/v1/list"><Icon name="arrow left" size="small"/></Link><p style={{marginLeft:"auto",marginRight:"auto"}}>URL Usage Statistics</p></h1>
            </div>
            <Line data={data} options={options}  responsive={true}/>
        </div>
    )
}

export default StatsPage;
