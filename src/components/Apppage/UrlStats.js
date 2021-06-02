import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Header, Icon, Image, Menu, Segment, Sidebar} from 'semantic-ui-react'

const UrlStats = (props) => {

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
            borderWidth: 5
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
        //console.log(props);
        if(props.match.params.tinyurl){
            axios.get(`https://agile-ravine-23097.herokuapp.com/v1/${props.match.params.tinyurl}/stats`,{
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
        }
        
    },[]);

    
    return (
        <div style={{padding:"2em"}}>
            <div className='header' style={{display:"flex"}}>
                <Icon id="displayOnMobile" name="bars" size="small" onClick={props.toggleSidebar}/>
                <h1 className='title' style={{display:"flex",marginLeft:"auto",marginRight:"auto"}}>URL Usage Statistics  </h1>
                <div className='links'>
                </div>
            </div>
            <Line data={data} options={options} />
        </div>
    )
}


export default UrlStats
