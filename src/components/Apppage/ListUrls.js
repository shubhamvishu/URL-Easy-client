import React, { useEffect, useState, useRef} from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { Header, Input, Icon, Image, Menu, Segment, Sidebar, Button,Pagination, Message, Search } from 'semantic-ui-react';
import axios from 'axios';
import ShowGeneratedURL from './ShowGeneratedURL';
import lottie from 'lottie-web';
import redirectAnimation from '../../animation/paperplane2.json';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import "../../css/App.css";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Loader from "react-loader-spinner";


const resultRenderer = ({title, description,price}) => {
    return <div style={{display:"flex",flexDirection:"column",padding:"0px"}}>
        <p>{title},{price}</p>
    </div>
}
resultRenderer.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
}
const ListUrls = ({toggleSidebar}) => {

    const [listData,setListData] = useState([]);
    const [searchData,setSearchData] = useState([]);
    const [allData,setAllData] = useState([]);
    const [listLoaded, setListLoaded] = useState(false);
    const [activePage, setActivePage] = useState(1);
    const [searchCount, setSearchCount] = useState(0);
    const [onlysearchCount, setOnlySearchCount] = useState(0);
    const [isSearch,setIsSearch] = useState(false);
    
    const [randomData,setRandomData] = useState([]);
    let a = [];

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
                setSearchCount(res.data.length);
                console.log("TOTAL:",searchCount);
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

        if(isSearch){
            setActivePage(activePage);
            setListData(searchData.slice((activePage-1)*10,activePage*10));
        }
        else{
            console.log("ACT ",activePage);
            setActivePage(activePage);
            setListData(allData.slice((activePage-1)*10,activePage*10));
        }
    }

    const handleSearchChange = ( e ) => {
        if(e.target.value!=''){
            console.log("Yoooo");
            setIsSearch(true);
            setActivePage(1);
            let count = 0;
            setSearchData([]);
            a = [];
            setSearchData(allData.filter((ele)=>{
                if(ele.originalurl.includes(e.target.value)){
                    console.log("ELE",ele.originalurl);
                    a.push({title:ele.newurl,description: ele.originalurl.substring(0,10),price:ele.date});
                    count++;
                    return true;
                }
                return false;
            }));
            setRandomData(a);
            console.log("RANDOM",randomData);          
            console.log(e.target.value);
            console.log("S ",searchData);
            console.log("fff",listData.length);
            console.log(count);
            setSearchCount(count);
            setOnlySearchCount(count);
            setListData(allData.filter((ele)=>{
                if(ele.originalurl.includes(e.target.value)){
                    console.log("ELE",ele.originalurl);
                    return true;
                }
                return false;
            }).slice((activePage-1)*10,activePage*10));
            
        }
        else{
            setIsSearch(false);
            setActivePage(1);
            setListData(allData.slice((activePage-1)*10,activePage*10));
            setSearchCount(allData.length);
            setOnlySearchCount(0);
        }
        console.log("shubh",e);
    }

    return (
        <>
            <div style={{position:"absolute",zIndex:"100",width:"100%",height:"100vh",padding:"0",backgroundColor:"#f9f9f9"}}>
                <div style={{zIndex:"0"}}>

                    <Header as='h1' style={{display:"flex",height:"12vh",backgroundColor:"#e3f5ff",color:"#0b568f",padding:"1em",boxShadow:"10px 10px 40px #ddd"}}><Link to="/"><Icon name="arrow left" size="small"/></Link><p style={{marginLeft:"auto",marginRight:"auto"}}>Your tiny URLs</p><Icon id="displayOnMobile" name="bars" size="small" onClick={toggleSidebar}/></Header>
                    <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} visible={!listLoaded}/>
                    <div id="listdata" style={{display:"flex"}}>
                        <div style={{flex:"2",borderRight:"2px solid #ddd"}}>
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
                                <Pagination defaultActivePage={activePage} totalPages={Math.ceil(searchCount/10)} onPageChange={handlePaginationChange}/>
                            </div> 
                        </div>
                        <div style={{flex:"1",padding:"1em",marginLeft:"auto",marginRight:"auto"}}>
                        
                            <h2>Search original URL</h2>
                            {onlysearchCount?<Message positive style={{width:"60%",fontSize:"0.5em",marginLeft:"auto",marginRight:"auto"}}>
                                                <Message.Header>{searchCount} results found</Message.Header>
                                            </Message>:""}
                                            <Search
                                             id="search"
                                             placeholder="Search here"
                                             loading={false}
                                             results={randomData}
                                             resultRenderer={resultRenderer}
                                             onSearchChange={handleSearchChange}
                                             style={{width:"50%"}}
                                             defaultValue=""
                                            />
                        </div>
                    </div>
                             
                </div>
            </div>
        </>
        

       
    )
}

export default ListUrls
