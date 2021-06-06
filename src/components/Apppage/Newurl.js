import React, { useEffect, useState, useRef } from 'react'
import queryString from 'query-string'
import { Header, Input, Icon, Image, Menu, Message, Segment, Sidebar, Button, Loader, Step, Dimmer } from 'semantic-ui-react'
import axios from 'axios'
import ShowGeneratedURL from './ShowGeneratedURL'
import ShowProgress from './ShowProgress'
import lottie from 'lottie-web';
import redirectAnimation from '../../animation/paperplane2.json';
import {Link,withRouter} from 'react-router-dom';

const Newurl = ({query, toggleSidebar}) => {

    const [requrl,setRequrl] = useState(query);

    const [isProgress, setIsProgress] = useState(false);
    let refurl = useRef();

    let shorturlData = null;

    useEffect(()=>{
        lottie.loadAnimation({
            container: document.querySelector("#redirect"),
            animationData: redirectAnimation,
            renderer: "svg", // "canvas", "html"
            loop: false, // boolean
            autoplay: true
        });
        setIsProgress(false);
        console.log("Q:",query);
        console.log(refurl);
        if(query) 
        refurl.current.value = query;
        else refurl.current.value = '';
        //setRequrl(query);
    },[]);

    const [visible,setVisible] = useState(true);

    const [data, setData] = useState({});
    const [urldata, setUrldata] = useState(false);
    const [errmsg, setErrmsg] = useState("");
    const [longurl, setLongurl] = useState("");

    const func = async (e) => {
        console.log("whaaat");
        setUrldata(false);
        setErrmsg("");
        console.log("LU1:",longurl);
        setLongurl(refurl.current.value);
        console.log("LU2:",longurl);
        setIsProgress(true);
        setTimeout(()=>{
            
            console.log("Hereeeee");
        },2000);

        //console.log(refurl.current.props.value);
        /*axios.get("http://localhost:5000/v1/newlink",{
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
                setTimeout(()=>{
                    setUrldata(true);
                    setData(res.data);
                },2000);
            })
            .catch((err) => {
                console.log(err);
            })*/

    }

    return (
        <>
            <div style={{position:"absolute",zIndex:"100",width:"100%",height:"100vh",padding:"0"}}>
                <div style={{zIndex:"100"}}>
                    <Header as='h1' style={{display:"flex",margin:"0%",backgroundColor:"#e3f5ff",color:"#0b568f",padding:"1em",boxShadow:"10px 10px 40px #ddd"}} onClick={()=> setVisible(!visible)}><Link to="/"><Icon name="arrow left" size="small"/></Link><p style={{marginBottom:"0",marginLeft:"auto",marginRight:"auto"}}>Create Tiny URLs</p><Icon id="displayOnMobile" style={{fontSize:"1em"}} name="bars" size="small" onClick={toggleSidebar}/></Header>
                    <input style={{width:"60%",padding: "0.7em",backgroundColor:"white",borderRadius:"5px",border: "none",boxShadow:"20px 20px 50px #ddd",marginTop:"30px"}} ref={refurl} placeholder="Enter URL"/>
                    <Button size="big" primary onClick={func} style={{boxShadow:"10px 10px 30px #aaa",marginLeft:"1em",padding: "1em"}}>Generate</Button>
                    
                    {(errmsg!="")?
                        <Message negative style={{width:"60%",fontSize:"0.8em",marginLeft:"auto",marginRight:"auto"}}>
                            <Message.Header>An error occurred while generating the tiny url</Message.Header>
                            <p>{errmsg}</p>
                        </Message>:""}
                    
                    {(isProgress && !urldata)?<ShowProgress setIsProgress={setIsProgress} errmsg={{msg:errmsg,setmsg: setErrmsg}} setData={setData} setUrldata={setUrldata} longurl={longurl}/>:""}        
                    
                    {(isProgress && !urldata)?
                        <Segment style={{width:"70%",justifyContent:"center",alignItems:"center",textAlign:"center",marginLeft:"auto",marginRight:"auto",boxShadow:"10px 10px 30px #bbb"}}>
                            <Dimmer active inverted>
                                <Loader size='large'>Loading</Loader>
                            </Dimmer>

                            <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />                   
                        </Segment>:""}
                    {(urldata)?<ShowGeneratedURL data={data}/> : ""}
                </div>
            </div>
            <div id="redirect" style={{position:"fixed",top:"0",left:"20%",zIndex:"0",width:"80%",height:"100vh",alignItems:"center"}}></div>
        </>
        

       
    )
}

export default Newurl
