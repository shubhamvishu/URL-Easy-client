import React, {useEffect, useState, useRef} from 'react';
import queryString from 'query-string';
import axios from 'axios';
import lottie from 'lottie-web';
import redirectAnimation from '../animation/paperplane.json';
import {Header} from 'semantic-ui-react';

const Redirectpage = (props) => {

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
            }
        })
            .then((res) => {
                console.log(res.data);
                setTimeout(()=>{
                    window.location.replace(res.data.redirectto);
                },5000);
            })
            .catch((err) => {
                console.log(err);
            })
        //window.location.replace("http://stackoverflow.com");
    },[])
    return (
        <div>
            <Header as="h1">REDIRECTING</Header>
            <div id="redirectanimation" style={{width:"30%",height:"30%",justifyContent:"center",marginLeft:"auto",marginRight:"auto"}}>
            </div>
        </div>
    )
}

export default Redirectpage
