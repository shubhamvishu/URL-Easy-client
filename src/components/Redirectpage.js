import React, {useEffect, useState, useRef} from 'react';
import queryString from 'query-string';
import axios from 'axios';
import lottie from 'lottie-web';
import redirectAnimation from '../animation/paperplane.json';
import {Header} from 'semantic-ui-react';
import Apppage from './Apppage/Apppage';

const Redirectpage = (props) => {

    const [errMsg, setErrMsg] = useState('');

    useEffect(()=>{
        lottie.loadAnimation({
            container: document.querySelector("#redirectanimation"),
            animationData: redirectAnimation,
            renderer: "svg", // "canvas", "html"
            loop: true, // boolean
            autoplay: true
        });
        console.log("REDIRECT PAGE");
        let u = props?.location?.pathname
        console.log(u?.substring(1));
        //https://agile-ravine-23097.herokuapp.com
        axios.get(`https://agile-ravine-23097.herokuapp.com/${u?.substring(1)}`,{
            headers: { 
                'Access-Control-Allow-Origin' : '*',
                'Access-Control-Allow-Headers': '*'
            },
            timeout: 5000
        })
            .then((res) => {
                console.log(res.data);
                setTimeout(()=>{
                    window.location.replace(res.data.redirectto);
                },5000);
            })
            .catch((err) => {
                setErrMsg("No such URL Found. Please check your URL again");
                setTimeout(()=>{
                    window.location.replace("/v1/home");
                },2000);
                console.log(err);
            })
            .finally(()=>{
                console.log("END");
            })
        //window.location.replace("http://stackoverflow.com");
    },[])
    return (
        <div>
           
            <Header as="h1">REDIRECTING</Header>
            <div id="redirectanimation" style={{width:"30%",height:"30%",justifyContent:"center",marginLeft:"auto",marginRight:"auto"}}></div>
            <h3>{errMsg}</h3>
        
        </div>
    )
}

export default Redirectpage
