import React from 'react'
import { Header, Input, Icon, Image, Menu, Segment, Sidebar, Button, Item, Divider} from 'semantic-ui-react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const ShowGeneratedURL = ({ data }) => {

    const copyTextToClipboard = () => {
        console.log("copyyyy");
        alert("yo");
        navigator.permissions.query({name: "clipboard-read"}).then(result => {
            console.log("Read: ",result);
          });
        navigator.permissions.query({name: "clipboard-write"}).then(result => {
            console.log("Write: ",result);
          });
          navigator.clipboard.writeText("jhgfds").then(function() {
            /* clipboard successfully set */
          }, function() {
            /* clipboard write failed */
          });
    }
    return (
        <Segment style={{padding:"0",margin:"0",border:"none",margin:"50px",boxShadow:"10px 10px 30px #ddd",borderLeft:"5px solid #1678C1"}}>
            <Item.Group style={{border:"none",width: "100%"}}>
                <Item style={{padding:"2em",width: "100%"}}>

                    <Item.Content style={{display: "flex", flexDirection: "row",alignItems: "center",width: "100%",justifyContent: "space-between"}}>
                        <div>
                            <Icon name='arrow right' size="big" style={{alignItems: "right"}}/>
                            <Link to={`/${data.newurl}`} style={{fontSize:"2em"}}>{`${window.location.origin}/${data.newurl}`}</Link>
                        </div>
                        <Item.Meta></Item.Meta>
                        <Item.Description style={{float: "right",display: "flex",justifyContent: "center",alignItems: "center"}}>
                            <CopyToClipboard text={`http://localhost:3000/${data.newurl}`}>
                                <Icon id="copylink" name="clone outline" size="big" onClick={copyTextToClipboard}/>
                            </CopyToClipboard>
                        </Item.Description>
                    </Item.Content>
                    <Divider />
                </Item>

               

            </Item.Group>
        </Segment>
    )
}

export default ShowGeneratedURL
