import React, { useEffect,useState } from 'react'
import queryString from 'query-string'
import Newurl from './Newurl'
import DefaultAppPage from './DefaultAppPage'
import Redirectpage from '../Redirectpage'
import ListUrls from './ListUrls'
import UrlStats from './UrlStats'
import StatsPage from './StatsPage'
import { Header, Icon, Image, Menu, Segment, Sidebar} from 'semantic-ui-react'
import { BrowserRouter as Router, Switch, Route, Link, withRouter } from 'react-router-dom';

const Apppage = (props) => {

    const [visible,setVisible] = useState(true);
    const [query, setQuery] = useState('');
    const parsed = queryString.parse(props.location.search);
    const [sidebarOption,setSidebarOption] = useState(0);
    const [Msidebar,setMSidebar] = useState(false);
    useEffect(() =>{
        console.log("apppage");
        console.log(parsed); 
        console.log("Query1:",query);
        setQuery(parsed.q)
        console.log("Query2:",query);
    },[visible]);

    const toggleSidebar = () => {
        
        setMSidebar(!Msidebar);
        
    }
    
    return (
        
        <div>
            
            <Sidebar
                id="appsidebar"
                as={Menu}
                animation='overlay'
                icon='labeled'
                inverted
                vertical
                visible
                width='thin'
                style={{position:"fixed",top:"0",left:"0",width:"20%",backgroundColor:"#002b59",color:"#fff",height:"100vh",boxShadow:"10px 10px 30px #bbb"}}
                >
                <Link to="/v1/newlink">
                    <Menu.Item style={{padding:"1.5em",color:"#fff",fontSize:"1.5em",fontWeight:"500",borderBottom:"0.01em solid #173C66"}} onClick={()=>{setSidebarOption(0)}}>
                        
                            <p style={{fontWeight:"350"}}>
                                <Icon name='linkify' style={{paddingRight:"1.5em",fontWeight:"200"}}/>
                                Generate URL
                            </p>
                       
                    </Menu.Item>
                </Link>       
                <Link to="/v1/list" >
                    <Menu.Item style={{padding:"1.5em",color:"#fff",fontSize:"1.5em",fontWeight:"500",borderBottom:"0.01em solid #173C66"}} onClick={()=>{setSidebarOption(1)}}>
                            <p style={{fontWeight:"350"}}>
                                <Icon name='folder' style={{paddingRight:"2em"}}/>
                                My Easy URLs
                            </p>
                    </Menu.Item>
                </Link>
                <Link to="/v1/stats" >
                    <Menu.Item  style={{padding:"1.5em",color:"#fff",fontSize:"1.5em",fontWeight:"500",borderBottom:"0.01em solid #173C66"}} onClick={()=>{setSidebarOption(2)}}> 
                            <p style={{fontWeight:"350"}}>
                                <Icon name='line graph' style={{paddingRight:"2em"}}/>
                                Statistics
                            </p>
                    </Menu.Item>
                </Link>
                
            </Sidebar>
            {Msidebar?<Sidebar
                id="mobilesidebar"
                as={Menu}
                animation='overlay'
                icon='labeled'
                inverted
                vertical
                visible
                width='thin'
                style={{zIndex:"100",position:"fixed",top:"0",backgroundColor:"#000",color:"#333",height:"100vh",boxShadow:"10px 10px 30px #bbb"}}
                >
                <Menu.Item style={{display:"flex",alignItems:"flex-end",padding:"1.5em",color:"#fff",fontSize:"1.5em",fontWeight:"500",borderBottom:"0.01em solid #173C66"}} onClick={toggleSidebar}>
                        
                            <p style={{fontWeight:"350"}}>
                                <Icon name='cancel' style={{paddingRight:"1.5em",fontWeight:"200"}}/>
                            </p>
                       
                </Menu.Item>
                <Link to="/v1/newlink" onClick={toggleSidebar}>
                    <Menu.Item style={{padding:"1.5em",color:"#fff",fontSize:"1.5em",fontWeight:"500",borderBottom:"0.01em solid #173C66"}} onClick={()=>{setSidebarOption(0)}}>
                        
                            <p style={{fontWeight:"350"}}>
                                <Icon name='linkify' style={{paddingRight:"1.5em",fontWeight:"200"}}/>
                                Generate URL
                            </p>
                       
                    </Menu.Item>
                </Link>       
                <Link to="/v1/list" onClick={toggleSidebar}>
                    <Menu.Item style={{padding:"1.5em",color:"#fff",fontSize:"1.5em",fontWeight:"500",borderBottom:"0.01em solid #173C66"}} onClick={()=>{setSidebarOption(1)}}>
                            <p style={{fontWeight:"350"}}>
                                <Icon name='folder' style={{paddingRight:"2em"}}/>
                                My Easy URLs
                            </p>
                    </Menu.Item>
                </Link>
                <Link to="/v1/stats" onClick={toggleSidebar}>
                    <Menu.Item  style={{padding:"1.5em",color:"#fff",fontSize:"1.5em",fontWeight:"500",borderBottom:"0.01em solid #173C66"}} onClick={()=>{setSidebarOption(2)}}> 
                            <p style={{fontWeight:"350"}}>
                                <Icon name='line graph' style={{paddingRight:"2em"}}/>
                                Statistics
                            </p>
                    </Menu.Item>
                </Link>
                
            </Sidebar>
            :""}
            <Sidebar.Pushable as={Segment} style={{margin:"0"}}>
                
                <Sidebar.Pusher>
                    <Segment id="pushablecontent" size="massive" style={{height: "100vh",backgroundColor:"#fff",float:"right",border:"none",padding:"0",overflow:"scroll"}} props>
                        <div id="show"></div>
                            <Switch>
                            <Route path="/v1/newlink" exact><Newurl query={parsed.q} toggleSidebar={toggleSidebar}/></Route>
                            <Route path="/v1/list" exact ><ListUrls toggleSidebar={toggleSidebar}/></Route>
                            <Route path="/v1/stats" exact><StatsPage toggleSidebar={toggleSidebar}/></Route>
                            <Route path="/v1/:tinyurl/stats" render={(props) => <UrlStats  toggleSidebar={toggleSidebar} {...props} /> }/>
                            <Route path="*"><DefaultAppPage toggleSidebar={toggleSidebar}/></Route>
                            </Switch>
                            

                    </Segment>
                </Sidebar.Pusher>
            </Sidebar.Pushable>
            
        </div>
       
    )
}

export default Apppage;
