import React,{useEffect, useState, useRef} from 'react'
import { Header, Input, Icon, Image, Menu, Segment, Sidebar, Button, Item, Divider} from 'semantic-ui-react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import lottie from 'lottie-web';
import redirectAnimation from '../../animation/paperplane2.json';

const ShowGeneratedURL = ({ data }) => {

    useEffect(() =>{
        lottie.loadAnimation({
            container: document.querySelector("#redirectanim"),
            animationData: redirectAnimation,
            renderer: "svg", // "canvas", "html"
            loop: true, // boolean
            autoplay: true
        });
    },[]);

    const copyTextToClipboard = () => {
        console.log("copyyyy");
        alert("yo");
        navigator.permissions.query({name: "clipboard-read"}).then(result => {
            console.log("Read: ",result);
          });
        navigator.permissions.query({name: "clipboard-write"}).then(result => {
            console.log("Write: ",result);
          });
          navigator.clipboard.writeText("jhgfds").then(function() {
            /* clipboard successfully set */
          }, function() {
            /* clipboard write failed */
          });
    }
    return (
        <Segment style={{display:"flex",flexDirection:"column",padding:"20px",margin:"0",border:"none",margin:"50px",boxShadow:"10px 10px 50px #333",borderLeft:"7px solid #12ff31",background:"linear-gradient(to right,#01070f,#0c366e)",color:"#fff",borderRadius:"15px"}}>
                <h2 style={{textAlign:"left",color:"#c2d7f2"}}>URL details</h2>
                <Divider style={{border:"0.1px solid #e3f4ff"}}/>
                <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"center",width:"100%",flexWrap:"wrap",padding:"1em"}}>
                    <div style={{display:"flex",flexDirection:"column",flex:"1",textAlign:"left"}}>
                        <div style={{padding:"1em"}}><h3 style={{textAlign:"start"}}>Generated URL</h3></div>
                        <div style={{display:"flex",flexDirection:"row",padding:"1em"}}>
                            <Icon name='arrow right' size="large" style={{alignItems: "right",flex:"1"}}/>
                            <Link to={`/${data.newurl}`} style={{fontSize:"1.5em",color:"#fff",flex:"1"}}></Link>
                            <input value={`${window.location.origin}/${data.newurl}`} style={{width:"100%",fontSize:"1.5em",backgroundColor:"transparent",border:"none",color:"#fff",wordWrap:"break-word"}}/>
                        </div>
                    </div>
                    <div style={{display:"flex",flexDirection:"row",flex:"1",textAlign:"center",alignItems:"center",justifyContent:"space-between"}}>
                        <div style={{flex:"1"}}>
                            <div >
                                <CopyToClipboard text={`http://localhost:3000/${data.newurl}`}>
                                    <Icon id="copylink" name="clone outline" size="big" style={{alignItems: "right",color:"#fff"}} onClick={copyTextToClipboard}/>
                                </CopyToClipboard>
                            </div>
                        </div>
                        <div style={{flex:"1"}}>
                            <div>
                                <a href={`/${data.newurl}`} target="_blank"><Icon name="external alternate" size="big" style={{alignItems: "right",color:"#fff"}}/></a>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",padding:"1em",wordWrap:"break-word"}}>
                    <div style={{display:"flex",flex:"1",flexDirection:"column",textAlign:"left",wordWrap:"break-word"}}>
                        <div style={{padding:"1em"}}><h3 style={{textAlign:"start"}}>Original URL</h3></div>
                        <div style={{display:"flex",flexDirection:"row",padding:"1em",wordWrap:"break-word"}}>
                            <Icon name='arrow right' size="large" style={{alignItems: "right"}}/>
                            <input value={`/${data.originalurl}`} style={{width:"100%",fontSize:"1.5em",backgroundColor:"transparent",border:"none",color:"#fff",wordWrap:"break-word"}}/>
                        </div>
                    </div>
                    <div id="redirectanim" style={{width:"20%",height:"20%"}}></div>
                </div>           
        </Segment>
    )
}

export default ShowGeneratedURL
