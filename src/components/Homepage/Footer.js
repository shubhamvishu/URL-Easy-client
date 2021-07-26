import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <div className="ui inverted vertical footer segment" style={{marginTop:"5%",paddingTop: "2%",paddingBottom: "2%"}}>
            <div className="ui container">
                <div className="ui stackable inverted divided equal height stackable grid">
                    <div className="three wide column">
                    <h4 className="ui inverted header">About</h4>
                    <div className="ui inverted link list">
                        <a href="#" className="item">About Us</a>
                        <a href="#" className="item">Contact Us</a>
                    </div>
                    </div>
                    <div className="three wide column">
                    <h4 className="ui inverted header">Services</h4>
                    <div className="ui inverted link list">
                        <Link to="/v1/home" className="item">Easy URL</Link>
                        <Link to="/v1/stats" className="item">Analysis</Link>
                    </div>
                    </div>
                    <div className="seven wide column">
                    <h4 className="ui inverted header">URLEasy</h4>
                    <p>&copy;{new Date().getFullYear()}</p>
                    </div>
                </div>
            </div>
        </div>
        
    )
}

export default Footer
