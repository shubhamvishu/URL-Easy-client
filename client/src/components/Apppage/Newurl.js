import React, { useEffect, useState, useRef } from 'react'
import queryString from 'query-string'
import { Header, Input, Icon, Image, Menu, Segment, Sidebar, Button } from 'semantic-ui-react'
import axios from 'axios'
import ShowGeneratedURL from './ShowGeneratedURL'
import lottie from 'lottie-web';
import redirectAnimation from '../../animation/paperplane2.json';

const Newurl = ({query}) => {

    const [requrl,setRequrl] = useState(query); 

    let refurl = useRef();

    let shorturlData = null;

    useEffect(()=>{
        lottie.loadAnimation({
            container: document.querySelector("#redirect"),
            animationData: redirectAnimation,
            renderer: "svg", // "canvas", "html"
            loop: true, // boolean
            autoplay: true
        });
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
        console.log("whaaat");
        //console.log(refurl.current.props.value);
        axios.get("http://localhost:5000/v1/newlink",{
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
        <>
        <div style={{position:"absolute",zIndex:"100",width:"100%",height:"100vh",padding:"0"}}>
            <div style={{zIndex:"100"}}>
                <Header as='h1' onClick={()=> setVisible(!visible)}>Create Tiny URLs</Header>

                <input style={{width:"60%",padding: "0.5em",backgroundColor:"white",border: "none",boxShadow:"10px 10px 30px #f1f1f1",marginTop:"30px"}} ref={refurl}/>
                <Button size="big" primary onClick={func} style={{boxShadow:"10px 10px 30px #aaa"}}>Generate</Button>
                {(urldata)?<ShowGeneratedURL data={data}/> : "No data"}
            </div>
        </div>
        <div id="redirect" style={{position:"fixed",top:"0",left:"20%",zIndex:"0",width:"80%",height:"100vh",alignItems:"center"}}></div>
        </>
        

       
    )
}

export default Newurl
