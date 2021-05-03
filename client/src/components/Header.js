import React from 'react'

const Header = () => {
    return (
        <div>
            <header>
                <a href="#" className="logo" style={{display:"flex",justifyContent: "center",alignItems: "center"}}>urlEASY
                <lottie-player src="https://assets5.lottiefiles.com/private_files/lf30_fhynbgue.json"  background="transparent"  speed="1"  style={{width: "100px", height: "100px",display: "inline"}}  loop  autoplay></lottie-player>
                </a>
                <ul>
                    <li><a href="#">Home</a></li>
                    <li><a href="#">About</a></li>
                    <li><a href="#">Products</a></li>
                    <li onclick="openlogin()"><a href="#">LOGIN</a></li>
                    <div className="ui divided"></div>
                    <li onclick="opensignup()"><a href="#">SIGN UP</a></li>
                </ul>
            </header>
        </div>
    )
}

export default Header
