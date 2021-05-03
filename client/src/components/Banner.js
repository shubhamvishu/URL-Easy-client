import React from 'react'
import '../App.css';
import {Segment, Button, Icon, Header} from 'semantic-ui-react'

const Banner = () => {
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
                        <input className="ui input urltextbox" type="text" placeholder="Paste URL..."/>
                        <button id="urlbutton" className="ui button" onclick="adddata()" >
                            Get URL
                        </button>
                    </div>
                </div>
            </div>      
        </section>
    )
}

export default Banner;
