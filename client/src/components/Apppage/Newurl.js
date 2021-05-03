import React, { useEffect, useState, useRef } from 'react'
import queryString from 'query-string'
import { Header, Input, Icon, Image, Menu, Segment, Sidebar, Button } from 'semantic-ui-react'

const Newurl = ({query}) => {

    const [requrl,setRequrl] = useState(query); 

    useEffect(()=>{
        console.log("Q:",query);
        setRequrl(query);
    },[]);

    const [visible,setVisible] = useState(true);

    return (
        <div>
             <Input size="mini" style={{width:"60%"}} value={requrl}/>
             <Button size="big" primary>Generate</Button>
        </div>
       
    )
}

export default Newurl
