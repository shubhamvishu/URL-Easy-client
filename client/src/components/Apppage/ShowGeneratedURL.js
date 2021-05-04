import React from 'react'
import { Header, Input, Icon, Image, Menu, Segment, Sidebar, Button, Item, Divider} from 'semantic-ui-react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

const ShowGeneratedURL = ({ data }) => {
    return (
        <Segment style={{padding:"0"}}>
            <Item.Group style={{backgroundColor:"#fff"}}>
                <Item style={{padding:"2em"}}>

                    <Item.Content style={{display: "flex", flexDirection: "row",alignItems: "center"}}>
                        <Icon name='arrow right' size="big" style={{alignItems: "center"}}/>
                        <Link to={`/${data.newurl}`} style={{fontSize:"2em"}}>{`${window.location.origin}/${data.newurl}`}</Link>
                        <Item.Meta>Description</Item.Meta>
                        <Item.Description>
                        <Image src='/images/wireframe/short-paragraph.png' />
                        </Item.Description>
                        <Item.Extra>Additional Details</Item.Extra>
                    </Item.Content>
                </Item>

                <Divider />

            </Item.Group>
        </Segment>
    )
}

export default ShowGeneratedURL
