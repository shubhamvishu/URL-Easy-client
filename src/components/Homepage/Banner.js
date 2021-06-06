import React, { useRef } from 'react'
import {Segment, Button, Icon, Header, Input} from 'semantic-ui-react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';


const Banner = () => {

    const urltext = useRef();

    const yo = () => {
        console.log(urltext.current.value);
        window.location = `/newlink?q=${urltext.current?.value}`;
    }
    const returnLink = () => {
        if(urltext.current?.value)
            return `/v1/newlink?q=${urltext.current?.value}`;
        else return '/v1/newlink';
    }
    return (
        <section className="banner">
            <div className="backcover" style={{display:"flex",margin: "0 auto",justifyContent: "center",alignItems: "center"}}>
                
            </div>
    
            <div id="urlsearch" className="ui raised segment">
                <div className="box ui">
                    <div className="ui action massive labeled input">
                        <div className="ui label">
                            http://
                        </div>
                        <input className="urltextbox" type="text" placeholder="Paste URL..." ref={urltext}/>
                    </div>
                    <Link id="defaultlink" className="urlbutton" to={returnLink}>
                            <button>Get URL</button>
                    </Link>
                </div>
            </div>      
        </section>
    )
}

export default Banner;
