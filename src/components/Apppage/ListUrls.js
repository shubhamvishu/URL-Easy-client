import React, { useEffect, useState, useRef } from 'react'
import queryString from 'query-string'
import { Header, Input, Icon, Image, Menu, Segment, Sidebar, Button,Pagination } from 'semantic-ui-react'
import axios from 'axios'
import ShowGeneratedURL from './ShowGeneratedURL'
import lottie from 'lottie-web';
import redirectAnimation from '../../animation/paperplane2.json';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import "../../css/App.css";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Loader from "react-loader-spinner";

const ListUrls = ({query}) => {

    const [listData,setListData] = useState([]);
    const [allData,setAllData] = useState([]);
    const [listLoaded, setListLoaded] = useState(false);
    const [activePage, setActivePage] = useState(1);

    useEffect(()=>{
        
        axios.get("https://agile-ravine-23097.herokuapp.com/v1/list",{
            headers: { 
                'Access-Control-Allow-Origin' : '*',
                'Access-Control-Allow-Headers': '*'
            }
        })
            .then((res) => {
                console.log(res.data);
                setAllData(res.data);
                console.log(activePage);
                setListData(res.data.slice((activePage-1)*10,activePage*10));
                setListLoaded(true);
                console.log('ANS ',listData);
               
            })
            .catch((err) => {
                console.log(err);
            })
        //setRequrl(query);
    },[]);

    const func = () => {
        console.log("whaaat");
        //console.log(refurl.current.props.value);
        
    }

    const handlePaginationChange = (e, {activePage}) => {

        console.log("ACT ",activePage);
        setActivePage(activePage);
        setListData(allData.slice((activePage-1)*10,activePage*10));
    }

    return (
        <>
            <div style={{position:"absolute",zIndex:"100",width:"100%",height:"100vh",padding:"0",backgroundColor:"#f9f9f9"}}>
                <div style={{zIndex:"0",overflow:"scroll"}}>

                    <Header as='h1' style={{backgroundColor:"#e3f5ff",color:"#0b568f",padding:"1em",boxShadow:"10px 10px 40px #ddd"}}>Your tiny URLs</Header>
                    <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} visible={!listLoaded}/>
                    <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",width:"100%"}}>
                    
                        {listData.map((listItem,index) => {
                            return(
                                <Segment id="listitem" key={index} style={{display:"flex",flexDirection:"row",margin:"1em"}}>
                                    <span style={{display:"inline",flex:"1",fontSize:"1.5em",fontWeight:"bold",paddingTop:"7px",backgroundColor:"#333",color:"#fff",width:"2em",height:"2em",borderRadius:"5px"}}>{(activePage-1)*10+(index+1)}</span>
                                    <div style={{display:"flex",flexDirection:"column",flex:"15",justifyContent:"start",padding:"1em"}}>
                                        <div style={{display:"flex"}}>
                                            <div style={{display:"flex",flex:"1",alignItems:"center",fontSize:"1.3em",fontWeight:"bold"}}><p>Tiny URL</p></div>
                                            <div style={{display:"flex",flex:"2",justifyContent:"start",wordWrap: "break-word",fontSize:"1.3em"}}>
                                                <p><input value={listItem.newurl} style={{minWidth:"100%",padding:"0.5em",border:"none",borderRadius:"5px",backgroundColor:"#eee"}} disabled></input></p>
                                                <div className="copyicon" style={{display:"flex",alignItems:"center",justifyContent:"center",marginLeft:"2em"}}>
                                                    <CopyToClipboard text={`${window.location.origin}/${listItem.newurl}`}>
                                                        <Icon name="clone outline"></Icon>
                                                    </CopyToClipboard>
                                                </div>
                                                <div className="copyicon" style={{display:"flex",alignItems:"center",justifyContent:"center",marginLeft:"2em"}}>
                                                    <a href={`/${listItem.newurl}`} target="_blank"><Icon name="external square alternate"/></a>
                                                </div>
                                            </div>
                                            
                                        </div>
                                        <div style={{display:"flex",wordWrap: "break-word",marginTop: "1em"}}>
                                            <div style={{display:"flex",flex:"1",alignItems:"center",fontSize:"1.3em",fontWeight:"bold"}}><p style={{display:"flex",alignItems:"center"}}>Original URL</p></div>
                                            <div style={{display:"flex",flex:"2",justifyContent:"start",wordWrap: "break-word",fontSize:"1.3em"}}><p style={{flex:"1",wordWrap: "break-word"}}><input value={listItem.originalurl} style={{minWidth:"100%",padding:"0.5em",border:"none",borderRadius:"5px",backgroundColor:"#eee"}} disabled></input></p></div>
                                        </div>
                                        <div style={{display:"flex",flexDirection:"row",alignItems:"end",justifyContent:"flex-end",padding:"1em"}}><Link to={`/v1/${listItem.newurl}/stats`}><p style={{textDecoration:"underline",color:"blue",fontWeight:"bold"}}>Show statistics<Icon name="external alternate" /></p></Link></div>
                                    </div> 
                                </Segment>
                            )
                        })}   
                    </div>
                    <div style={{margin:"3em"}}>
                        <Pagination defaultActivePage={5} totalPages={Math.ceil(allData.length/10)} onPageChange={handlePaginationChange}/>
                    </div>          
                </div>
            </div>
        </>
        

       
    )
}

export default ListUrls
