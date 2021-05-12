import React from 'react'
import { Header, Input, Icon, Image, Menu, Segment, Sidebar, Button, Item, Divider} from 'semantic-ui-react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const ShowGeneratedURL = ({ data }) => {

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
        <Segment style={{display:"flex",flexDirection:"column",padding:"20px",margin:"0",border:"none",margin:"50px",boxShadow:"10px 10px 50px #333",borderLeft:"7px solid #12ff31",background:"linear-gradient(to right,#03142b,#0c366e)",color:"#fff",borderRadius:"15px"}}>
                <h2 style={{textAlign:"left",color:"#c2d7f2"}}>URL details</h2>
                <Divider style={{border:"0.1px solid #e3f4ff"}}/>
                <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"center",width:"100%",flexWrap:"wrap",padding:"2em"}}>
                    <div style={{flexDirection:"column",flex:"1",textAlign:"left"}}>
                        <div style={{padding:"1em"}}><h3 style={{textAlign:"start"}}>Generated URL</h3></div>
                        <div style={{display:"flex",flexDirection:"row",padding:"1em"}}>
                            <Icon name='arrow right' size="large" style={{alignItems: "right"}}/>
                            <Link to={`/${data.newurl}`} style={{fontSize:"1.5em",color:"#fff"}}>{`${window.location.origin}/${data.newurl}`}</Link>
                        </div>
                    </div>
                    <div style={{display:"flex",flexDirection:"row",flex:"1",textAlign:"left",padding:"2em",justifyContent:"space-around"}}>
                        <div style={{flex:"1"}}>
                            <div >
                                <CopyToClipboard text={`http://localhost:3000/${data.newurl}`}>
                                    <Icon id="copylink" name="clone outline" size="big" style={{alignItems: "right",color:"#fff"}} onClick={copyTextToClipboard}/>
                                </CopyToClipboard>
                            </div>
                        </div>
                        <div style={{flex:"1"}}>
                            <div>
                                <Icon name="external alternate" size="big" style={{alignItems: "right",color:"#fff"}} onClick={copyTextToClipboard}/>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"center",width:"100%",flexWrap:"wrap",padding:"2em"}}>
                    <div style={{flexDirection:"column",flex:"1",textAlign:"left"}}>
                        <div style={{padding:"1em"}}><h3 style={{textAlign:"start"}}>Original URL</h3></div>
                        <div style={{display:"flex",flexDirection:"row",padding:"1em"}}>
                            <Icon name='arrow right' size="large" style={{alignItems: "right"}}/>
                            <Link to={`/${data.originalurl}`} style={{fontSize:"1.5em",color:"#fff"}}>{`${data.originalurl}`}</Link>
                        </div>
                    </div>
                    <div id="redirectanim" style={{flex:"1",backgroundColor:"red",width:"20%",height:"20%"}}></div>
                </div>           
        </Segment>
    )
}

export default ShowGeneratedURL
