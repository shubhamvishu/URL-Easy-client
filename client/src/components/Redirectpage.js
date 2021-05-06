import React, {useEffect, useState, useRef} from 'react'
import queryString from 'query-string'
import axios from 'axios'

const Redirectpage = (props) => {

    useEffect(()=>{
        let u = props.location.pathname
        console.log(u.substring(1));
        axios.get(`http://localhost:5000/${u.substring(1)}`,{
            headers: { 
                'Access-Control-Allow-Origin' : '*',
                'Access-Control-Allow-Headers': '*'
            }
        })
            .then((res) => {
                console.log(res.data);
                window.location.replace(res.data.redirectto);
            })
            .catch((err) => {
                console.log(err);
            })
        //window.location.replace("http://stackoverflow.com");
    },[])
    return (
        <div>
            
        </div>
    )
}

export default Redirectpage
