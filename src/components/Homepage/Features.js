import React from 'react'
import bgImage from "../../images/link_shortner2.svg";
import bgImage2 from "../../images/analytics.svg";


const Features = () => {
    return (
        <section style={{zIndex:"3"}}>
            <div className="ui vertical stripe segment">
                <div className="ui middle aligned stackable grid container">
                    <div className="row">
                        <div className="eight wide column">
                            <div className="ui segment" style={{padding: "2em",boxShadow: "-10px 10px 30px 30px #eee",border: "none"}}>
                                <h3 className="ui header">Easy short URLs</h3>
                                <p>Get your long URLs converted to easy to remember short URLs</p>
                            </div>
                        </div>
                        <div className="six wide right floated column">
                            <img src={bgImage}/>
                        </div>
                    </div>
            
                    <div className="row">       
                        <div className="six wide right floated column">
                            <img src={bgImage2}/>
                        </div>
                        <div className="eight wide column">
                            <div className="ui segment" style={{padding: "2em",boxShadow: "-10px 10px 20px 20px #eee",border: "none"}}>
                                <h3 className="ui header">Analysis of the traffic</h3>
                                <p>Realtime statistics showing the access to your website using easy URLs</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
        </section>
    
    )
}

export default Features
