import React, { useEffect, useState, useRef } from 'react'
import queryString from 'query-string'
import { Header, Input, Icon, Image, Menu, Segment, Sidebar, Button } from 'semantic-ui-react'
import axios from 'axios'
import ShowGeneratedURL from './ShowGeneratedURL'
import lottie from 'lottie-web';
import redirectAnimation from '../../animation/paperplane2.json';

const ListUrls = ({query}) => {

    const [listData,setListData] = useState({});

    useEffect(()=>{
        axios.get("http://localhost:5000/v1/list",{
            headers: { 
                'Access-Control-Allow-Origin' : '*',
                'Access-Control-Allow-Headers': '*'
            }
        })
            .then((res) => {
                console.log(res.data);
                setListData(res.data);
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

    return (
        <>
            <div style={{position:"absolute",zIndex:"100",width:"100%",height:"100vh",padding:"0"}}>
                <div style={{zIndex:"100"}}>
                    <Header as='h1'>Your tiny URLs</Header>

                    <ul>    
                        <li>
                            {Object.keys(listData).map((listitem,index) => {
                                //console.log(listData[listitem].newurl);
                                    return <Header key={index} as="h4">{listData[listitem].newurl}</Header>
                                })}
                        </li>
                    </ul>

                </div>
            </div>
            <div id="redirect" style={{position:"fixed",top:"0",left:"20%",zIndex:"0",width:"80%",height:"100vh",alignItems:"center"}}></div>
        </>
        

       
    )
}

export default ListUrls
