import {React, useEffect} from 'react';
import lottie from 'lottie-web';
import linkLogo from '../../animation/link-animation.json';
import "../../css/App.css";

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

    const Appname = "{url}EASY"
    return (
        <div>

            <header style={{display:"flex"}}>
                <div style={{textDecoration:"none"}}>
                    <a id="defaultlink" href="#" className="logo" style={{display:"flex",justifyContent: "center",alignItems: "center",textDecoration:"none",color:"#000"}}>
                        {Appname}
                        <div id="link-logo" style={{width: "100px", height: "100px",display: "inline"}}></div>
                    </a>
                </div>
                
                <ul>
                    <li><a href="#">Home</a></li>
                    <li><a href="#">About</a></li>
                    <li><a href="">Products</a></li>
                    <li onclick="openlogin()"><a href="#">LOGIN</a></li>
                    <div className="ui divided"></div>
                    <li onclick="opensignup()"><a href="#">SIGN UP</a></li>
                </ul>
            </header>
        </div>
    )
}

export default Header
