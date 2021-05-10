import React, { useEffect,useState } from 'react'
import queryString from 'query-string'
import Newurl from './Newurl'
import Redirectpage from '../Redirectpage'
import ListUrls from './ListUrls'
import { Header, Icon, Image, Menu, Segment, Sidebar} from 'semantic-ui-react'

const Apppage = (props) => {

    const [visible,setVisible] = useState(true);
    const [query, setQuery] = useState('');
    const parsed = queryString.parse(props.location.search);
    const [sidebarOption,setSidebarOption] = useState(0);

    useEffect(() =>{
        
        console.log(parsed); 
        console.log("Query1:",query);
        setQuery(parsed.q)
        console.log("Query2:",query);
    },[]);

    
    return (
        <div>
            <Sidebar
                as={Menu}
                animation='overlay'
                icon='labeled'
                inverted
                vertical
                visible
                width='thin'
                style={{position:"fixed",top:"0",left:"0",width:"20%",backgroundColor:"#1678C1",color:"#fff",boxShadow:"10px 10px 30px #bbb"}}
                >
                <Menu.Item as='a' style={{padding:"1.5em",color:"#fff",fontSize:"1.5em",fontWeight:"500"}} onClick={()=>{setSidebarOption(0)}}>
                    <p>
                        <Icon name='linkify' style={{paddingRight:"1.5em",fontWeight:"200"}}/>
                        Generate URL
                    </p>
                </Menu.Item>
                <Menu.Item as='a'style={{padding:"1.5em",color:"#fff",fontSize:"1.5em",fontWeight:"500"}} onClick={()=>{setSidebarOption(1)}}>
                    <p>
                        <Icon name='folder' style={{paddingRight:"2em"}}/>
                        My URLs
                    </p>
                </Menu.Item>
                <Menu.Item as='a' style={{padding:"1.5em",color:"#fff",fontSize:"1.5em",fontWeight:"500"}} onClick={()=>{setSidebarOption(2)}}>
                    <p>
                        <Icon name='line graph' style={{paddingRight:"2em"}}/>
                        Statistics
                    </p>
                </Menu.Item>
            </Sidebar>

            <Sidebar.Pushable as={Segment} style={{margin:"0"}}>
                
                <Sidebar.Pusher>
                    <Segment size="massive" style={{height: "100vh",backgroundColor:"#f8f8f8",width:"80%",float:"right",border:"none",padding:"0",overflow:"scroll"}}>
                        
                        {(sidebarOption==0)?<Newurl query={parsed.q}/>:""}
                        {(sidebarOption==1)?<ListUrls/>:""}
                        {(sidebarOption==2)?<Redirectpage/>:""}

                    </Segment>
                </Sidebar.Pusher>
            </Sidebar.Pushable>
          
        </div>
    )
}

export default Apppage
