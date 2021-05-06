import React, { useEffect,useState } from 'react'
import queryString from 'query-string'
import Newurl from './Newurl'
import { Header, Icon, Image, Menu, Segment, Sidebar} from 'semantic-ui-react'

const Apppage = (props) => {

    const [visible,setVisible] = useState(true);
    const [query, setQuery] = useState('');
    const parsed = queryString.parse(props.location.search);

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
                style={{position:"fixed",top:"0",left:"0",width:"20%",backgroundColor:"#f9f9f9",color:"#000"}}
                >
                <Menu.Item as='a' style={{display:"flex",justifyContent:"start",color:"#000",fontSize:"1.5em"}}>
                    <p>
                        <Icon name='linkify' />
                        Generate URL
                    </p>
                </Menu.Item>
                <Menu.Item as='a'style={{color:"#000",fontSize:"1.5em"}}>
                    <p>
                        <Icon name='folder'/>
                        My URLs
                    </p>
                </Menu.Item>
                <Menu.Item as='a' style={{color:"#000",fontSize:"1.5em"}}>
                    <p>
                        <Icon name='camera' />
                        Channels
                    </p>
                </Menu.Item>
            </Sidebar>

            <Sidebar.Pushable as={Segment} style={{margin:"0"}}>
                
                <Sidebar.Pusher>
                    <Segment size="massive" style={{height: "200vh",backgroundColor:"#f8f8f8",width:"80%",float:"right"}}>
                        <Header as='h1' onClick={()=> setVisible(!visible)}>Create tiny URLs</Header>

                        <Newurl query={parsed.q}/>
                    </Segment>
                </Sidebar.Pusher>
            </Sidebar.Pushable>
          
        </div>
    )
}

export default Apppage
