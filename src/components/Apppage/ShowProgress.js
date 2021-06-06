import React ,{ useEffect, useState } from 'react'
import { Header, Input, Icon, Image, Menu, Segment, Sidebar, Button, Loader, Step, Dimmer } from 'semantic-ui-react'
import axios from 'axios';
import lottie from 'lottie-web';
import redirectAnimation from '../../animation/paperplane2.json';


const ShowProgress = ({ setIsProgress, errmsg, setData, setUrldata, longurl}) => {


    const [ progressData, setProgressData] = useState({
        step1: false,
        step2: false,
        step3: false
    });
    //const [isProgress,setIsProgress] = useState()
    const validateUrl = (url) => {
        console.log("URL:",url);
        if(url?.includes("http") || url?.includes("https")){
            console.log("A");
            setTimeout(() =>{
                console.log("B");
                console.log('validatation passed');
                console.log(progressData);
                setProgressData({...progressData,step1: true});
                console.log(progressData);
                checkUrlStatus(url);
            },4000);
            console.log("C");
        }
        else {
            setIsProgress(false);
            errmsg.setmsg("Error in validating the url");
            console.log("Error in validation")
        }
    }

    const checkUrlStatus = (url) => {
        console.log("D");
        axios.get(url,{
            headers: { 
                'Access-Control-Allow-Origin' : '*',
                'Access-Control-Allow-Headers': '*'
            },
            responseType: 'text',
            timeout: 2000
        })
        .then((res) => {
                console.log("in main")
                console.log(res);
                console.log("E");
                setTimeout(()=>{
                    console.log("F");
                    console.log(progressData);
                    setProgressData({...progressData,step1:true,step2: true});
                    console.log(progressData);
                    getShortUrl(url);
                },4000);
                console.log("G");
        })
        .catch((err) => {
                console.log('error');
                console.log("E2");
                setTimeout(()=>{
                    console.log("F2");
                    console.log("heyyy");
                    console.log(progressData)
                    setProgressData({...progressData,step1:true,step2: true});
                    getShortUrl(url);
                },4000);
                console.log("G2");
        });
        console.log("man")
    }

    const getShortUrl = (url) => {
        console.log("H");
        console.log("fgetching tiny url");
        //http://localhost:5000
        axios.get("https://agile-ravine-23097.herokuapp.com/v1/newlink",{
            headers: { 
                'Access-Control-Allow-Origin' : '*',
                'Access-Control-Allow-Headers': '*'
            },
            params: {
                q: longurl
            },
            timeout: 5000
        })
            .then((res) => {
                console.log("I");
                console.log("shubham");
                console.log(res.data);
                //shorturlData = res.data;
                //console.log('shorturldata:',shorturlData);
                setTimeout(()=>{
                    setProgressData({...progressData,step1:true,step2:true,step3:true});
                },3000);                
                setTimeout(()=>{
                    console.log("J");
                    console.log(progressData);  
                    console.log(progressData);
                    setUrldata(true);
                    setData(res.data);
                    setIsProgress(false);
                },5000);
                console.log("K");
            })
            .catch((err) => {
                console.log("chaudhary");
                console.log(err);
                setIsProgress(false);
                errmsg.setmsg(err.toString());
            })
    }
    useEffect(()=>{
        console.log('inside use effect');
        setProgressData({
            step1: false,
            step2: false,
            step3: false
        });
        validateUrl(longurl);
    },[longurl]);
    
    return (
        <Step.Group stackable='tablet' style={{border:"none",boxShadow:"10px 10px 30px #bbb"}}>
                <Step completed={progressData.step1} active={!progressData.step1} style={{backgroundColor: progressData.step1?"#e8ffee":"#fff"}}>
                    {(progressData.step1)?<Icon name='checkmark' />:<Icon name='wait' />}
                    <Step.Content>
                        <Step.Title>{(progressData.step1)?"Validated":"Validating"}</Step.Title>
                        <Step.Description>Checks if the URL is valid</Step.Description>
                    </Step.Content>
                </Step>
                        
                <Step completed={progressData.step2} active={!progressData.step2} style={{backgroundColor: progressData.step2?"#e8ffee":"#fff"}}>
                    {(progressData.step2)?<Icon name='check circle' />:<Icon name='wait' />}
                    <Step.Content>
                        <Step.Title>URL Status</Step.Title>
                        <Step.Description>Verifies the status of used URL</Step.Description>
                    </Step.Content>
                </Step>
    
                <Step completed={progressData.step3} active={!progressData.step3} style={{backgroundColor: progressData.step3?"#e8ffee":"#fff"}}>
                    {(progressData.step3)?<Icon name='checkmark' />:<Icon name='wait' />}

                    <Step.Content>
                        <Step.Title>Generate Tiny URL</Step.Title>
                        <Step.Description>Creates a small URL</Step.Description>
                    </Step.Content>
                </Step>
        </Step.Group>
        
    )
}

export default ShowProgress;