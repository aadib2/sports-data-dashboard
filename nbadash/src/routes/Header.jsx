import React from 'react'
import {Link, Outlet} from 'react-router-dom'
// import images
import nbaImage1 from '../assets/nbaimage1.jpg';
import nbaImage2 from '../assets/nbaimage2.jpg';
import nbaImage3 from '../assets/nbaimage3.jpg';
import nbaImage4 from '../assets/nbaimage4.png';

const Header = () => {
    return (
        <div>
            <div className="app-header">
                    <h1> NBADash 🏀</h1>
                    <h2> Welcome sports enthusiasts! Here you can find the latest NBA game information, statistics, and visualizations for the 2024-25 season. </h2>
            </div>
            
            <div className="image-panel"> 
                    <img src={nbaImage1} alt="Kobe"/>
                    <img src ={nbaImage2} alt="All-Stars"/>
                    <img src={nbaImage3} alt='Cavs'/>
                    <img src={nbaImage4} alt='MJ'/>
            </div>
            <Outlet/>
        </div>
    );
}

export default Header;