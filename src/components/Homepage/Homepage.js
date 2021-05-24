import React from 'react';
import Header from './Header';
import Banner from './Banner';
import Features from './Features';
import Footer from "./Footer";

const Homepage = () => {
    return (
        <div style={{height:"200vh"}}>
            <Header/>
            <Banner/>
            <Features/>
            <Footer/>
        </div>
    )
}

export default Homepage
