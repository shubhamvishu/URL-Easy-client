import React, { useEffect, useState, useRef} from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { Header, Input, Icon, Image, Menu, Segment, Label, Sidebar, Button,Pagination, Message, Search, Dropdown } from 'semantic-ui-react';
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
        
        getDataAsList();
        //setRequrl(query);
    },[]);

    const getDataAsList = () => {
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
    }

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

    const handleItemClick = (newurl,id) =>{
        console.log("heyyy");
        axios.get(`https://agile-ravine-23097.herokuapp.com/v1/delete/${id}`,{
            headers: { 
                'Access-Control-Allow-Origin' : '*',
                'Access-Control-Allow-Headers': '*'
            }
        })
            .then((res) => {
                console.log(res.data);
                getDataAsList();
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const options = [
        { key: 'edit', icon: 'edit', text: 'Edit Post', value: 'edit' },
        { key: 'delete', icon: 'delete', text: 'Remove Post', value: 'delete' },
        { key: 'hide', icon: 'hide', text: 'Hide Post', value: 'hide' },
      ]
      
    return (
        <>
            <div style={{position:"absolute",width:"100%",height:"100vh",padding:"0",backgroundColor:"#f9f9f9"}}>
                <div style={{zIndex:"0"}}>

                    <Header as='h1' id="listhead" style={{display:"flex",zIndex:"10",position:"fixed",top:"0",backgroundColor:"#e3f5ff",color:"#0b568f",padding:"1em",boxShadow:"10px 10px 40px #ddd"}}><Link to="/"><Icon name="arrow left" size="small"/></Link><p style={{marginBottom:"0",marginLeft:"auto",marginRight:"auto"}}>Your tiny URLs</p><Icon id="displayOnMobile" style={{fontSize:"1em"}} name="bars" size="tiny" onClick={toggleSidebar}/></Header>
                    <div id="listdata" style={{display:"flex",height:"100vh",marginTop:"5em"}}>
                        <div className="listleft" style={{flex:"2",borderRight:"2px solid #ddd"}}>
                            <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",width:"100%"}}>

                                <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} visible={!listLoaded}/>
                                {listData.map((listItem,index) => {
                                    return(
                                        <Segment id="listitem" key={index} style={{display:"flex",flexDirection:"row",margin:"1em"}}>
                                            <div style={{position:"absolute",fontSize:"1.5em",fontWeight:"bold",backgroundColor:"#333",color:"#fff",borderRadius:"5px"}}>
                                                <span style={{top:"0",left:"20px",padding:"5px"}}>{(activePage-1)*10+(index+1)}</span>
                                            </div>        
                                            <div style={{display:"flex",flexDirection:"column",flex:"15",justifyContent:"start",padding:"1em"}}>
                                                <div className="listpart1" style={{display:"flex"}}>
                                                    <div style={{display:"flex",flex:"1",alignItems:"center",fontSize:"1.3em",fontWeight:"bold"}}><p>Tiny URL</p></div>
                                                    <div className="listpart2" style={{display:"flex",flex:"2",justifyContent:"start",wordWrap: "break-word",fontSize:"1.3em"}}>
                                                        <p><input value={listItem.newurl} style={{display:"flex",padding:"0.5em",border:"none",borderRadius:"5px",backgroundColor:"#eee"}} disabled></input></p>
                                                        <div style={{display:"flex"}}>
                                                            <div className="copyicon" style={{display:"flex",flex:"1",alignItems:"center",justifyContent:"center"}}>
                                                                <CopyToClipboard text={`${window.location.origin}/${listItem.newurl}`}>
                                                                    <Icon name="clone outline"></Icon>
                                                                </CopyToClipboard>
                                                            </div>
                                                            <div className="copyicon" style={{display:"flex",flex:"1",alignItems:"center",justifyContent:"center"}}>
                                                                <a href={`/${listItem.newurl}`} target="_blank"><Icon name="external square alternate"/></a>
                                                            </div>
                                                
                                                                <Dropdown item icon='ellipsis vertical'>
                                                                <Dropdown.Menu>
                                                                    <Dropdown.Item onClick={() => handleItemClick(listItem.newurl,listItem._id)}><Icon name="trash"/>Delete Item</Dropdown.Item>
                                                                    <Dropdown.Item><Link to={`/v1/${listItem.newurl}/stats`}><p><Icon name="line graph"/>Open statistics</p></Link></Dropdown.Item>
                                                                </Dropdown.Menu>
                                                                </Dropdown>
                                                        </div>
                                                    </div>
                                                    
                                                </div>
                                                
                                                <div className="listpart2" style={{display:"flex",wordWrap: "break-word",marginTop: "1em"}}>
                                                    <div style={{display:"flex",alignItems:"center",fontWeight:"bold",fontSize:"1.3em"}}><p style={{display:"flex",alignItems:"center"}}>Original URL</p></div>
                                                    <div className="listpart2" style={{display:"flex",flex:"2",justifyContent:"center",wordWrap: "break-word",fontSize:"1.3em"}}><p style={{wordWrap: "break-word"}}><input value={listItem.originalurl} style={{display:"flex",padding:"0.5em",border:"none",borderRadius:"5px",backgroundColor:"#eee"}} disabled></input></p></div>
                                                </div>
                                                <div style={{display:"flex",flexDirection:"row",alignItems:"end",justifyContent:"flex-end",padding:"1em"}}><Link to={`/v1/${listItem.newurl}/stats`}><p style={{textDecoration:"underline",color:"blue",fontWeight:"bold"}}>Show statistics<Icon name="external alternate" /></p></Link></div>
                                            </div> 
                                        </Segment>
                                    )
                                })}   
                            </div>
                            <div style={{margin:"3em",display: "flex",justifyContent:"center"}}>
                                <Pagination defaultActivePage={activePage} totalPages={Math.ceil(searchCount/10)} onPageChange={handlePaginationChange}/>
                            </div> 
                        </div>
                        <div className="listright"  style={{flex:"1",marginLeft:"auto",marginRight:"auto"}}>
                        
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
                                style={{marginLeft:"auto",marginRight:"auto",marginBottom:"2em"}}
                                defaultValue=""
                                fluid={true}
                            />
                        </div>
                    </div>
                             
                </div>
            </div>
        </>
        

       
    )
}

export default ListUrls
