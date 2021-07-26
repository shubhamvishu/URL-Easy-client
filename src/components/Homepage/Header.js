import {React, useEffect} from 'react';
import lottie from 'lottie-web';
import linkLogo from '../../animation/link-animation.json';
import "../../css/App.css";
import { Button, Dropdown } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const Header = () => {

    useEffect(() => {
        lottie.loadAnimation({
            container: document.querySelector("#link-logo"),
            animationData: linkLogo,
            renderer: "svg", // "canvas", "html"
            loop: true, // boolean
            autoplay: true
        });
        window.addEventListener("scroll",() => {
            var header = document.querySelector("header");
            header?.classList?.toggle("sticky",window.scrollY > 50);
        });
    },[]);

    const options = [
        { key: 'edit', icon: 'edit', text: 'Edit Post', value: 'edit' },
        { key: 'delete', icon: 'delete', text: 'Remove Post</a>', value: '<a href="google.com">delete</a>' },
        { key: 'hide', icon: 'hide', text: 'Hide Post', value: 'hide' },
      ]

    const Appname = "{url}EASY"
    return (
        <div>

            <header style={{display:"flex"}}>
                <div id="defaultlink" style={{textDecoration:"none"}}>
                    <a href="#" className="logo" style={{display:"flex",justifyContent: "center",alignItems: "center",textDecoration:"none",color:"#000"}}>
                        {Appname}
                        <div id="link-logo" style={{width: "100px", height: "100px",display: "inline"}}></div>
                    </a>
                </div>
                
                <ul className="navlinks">
                    <li><a href="#">Home</a></li>
                    <li><a href="#">About</a></li>
                    <li><Link to="/v1/newlink">Shortener</Link></li>
                    {/* <li onclick="openlogin()"><a href="#">LOGIN</a></li>
                    <div className="ui divided"></div>
                    <li onclick="opensignup()"><a href="#">SIGN UP</a></li> */}
                </ul>
                <div className="mobilemenu">
                    <div className="mobilemenu ui compact menu" style={{backgroundColor:"transparent"}}>
                        <div className="ui simple dropdown item">
                            Menu
                            <i className="dropdown icon"></i>
                            <div className="menu">
                            <div className="item"><a href="#">Home</a></div>
                            <div className="item"><a href="#">About</a></div>
                            <div className="item"><Link to="/v1/newlink">Shortener</Link></div>
                            </div>
                        </div>
                    </div>
                </div>
                
            </header>
        </div>
    )
}

export default Header
