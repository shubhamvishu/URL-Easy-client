import React from 'react'
import bgImage from "../../images/link_shortner2.svg";
import { Header, Icon, Image, Menu, Segment, Sidebar} from 'semantic-ui-react'
import { BrowserRouter as Router, Switch, Route, Link, withRouter } from 'react-router-dom';


const DefaultAppPage = () => {
    return (
        <div style={{margin:"auto",backgroundColor:"#e8f7ff",height:"100vh"}}>
            <img src={bgImage} width="45%" height="45%" style={{marginTop:"5%"}}/>
            <h2>Create your tiny URLS today   <Link to="/v1/newlink"><Icon name="plus circle" size="big" style={{color:"green"}}></Icon></Link> </h2>
        </div>
    )
}

export default DefaultAppPage
