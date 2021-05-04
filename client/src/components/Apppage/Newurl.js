import React, { useEffect, useState, useRef } from 'react'
import queryString from 'query-string'
import { Header, Input, Icon, Image, Menu, Segment, Sidebar, Button } from 'semantic-ui-react'
import axios from 'axios'
import ShowGeneratedURL from './ShowGeneratedURL'

const Newurl = ({query}) => {

    const [requrl,setRequrl] = useState(query); 

    let refurl = useRef();

    let shorturlData = null;

    useEffect(()=>{
        console.log("Q:",query);
        console.log(refurl);
        if(query) 
        refurl.current.value = query;
        else refurl.current.value = 'shhh';
        //setRequrl(query);
    },[]);

    const [visible,setVisible] = useState(true);

    const [urldata, setUrldata] = useState(false);
    const [data, setData] = useState({});

    const func = () => {
        console.log("Shubham");
        //console.log(refurl.current.props.value);
        axios.get("http://localhost:5000/newlink",{
            headers: { 
                'Access-Control-Allow-Origin' : '*',
                'Access-Control-Allow-Headers': '*'
            },
            params: {
                q: refurl.current.value
            }
        })
            .then((res) => {
                console.log(res.data);
                shorturlData = res.data;
                console.log('shorturldata:',shorturlData);
                setUrldata(true);
                setData(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <div>
             <input style={{width:"60%",padding: "0.5em",backgroundColor:"white",border: "none",boxShadow:"10px 10px 30px #f1f1f1"}} ref={refurl}/>
             <Button size="big" primary onClick={func}>Generate</Button>
             {(urldata)?<ShowGeneratedURL data={data}/> : "No data"}
        </div>

       
    )
}

export default Newurl
