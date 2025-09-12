import React from 'react'
import {Link, Outlet} from 'react-router-dom'
// import images
import nflImage1 from '../assets/nflimage1.png';
import nflImage2 from '../assets/nflimage2.png';
import nflImage3 from '../assets/nflimage3.png';
import nflImage4 from '../assets/nflimage4.png';

const Header = () => {
    return (
        <div>
            <div className="app-header">
                    <h1> NFLDash 🏈</h1>
                    <h2> Welcome sports enthusiasts! Here you can find the latest NFL game information, statistics, and visualizations as the 2025-26 season. </h2>
            </div>
            
            <div className="image-panel"> 
                    <img src={nflImage1} alt="Kobe"/>
                    <img src ={nflImage2} alt="All-Stars"/>
                    <img src={nflImage3} alt='Cavs'/>
                    <img src={nflImage4} alt='MJ'/>
            </div>
            <Outlet/>
        </div>
    );
}

export default Header;