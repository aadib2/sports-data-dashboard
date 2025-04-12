import { useState } from 'react'
import {useEffect} from 'react'
import './App.css'
import Dashboard from './components/Dashboard'
import SummaryStats from './components/SummaryStats';
import Charts from './components/Charts';

// import images
import nbaImage1 from './assets/nbaimage1.jpg';
import nbaImage2 from './assets/nbaimage2.jpg';
import nbaImage3 from './assets/nbaimage3.jpg';
import nbaImage4 from './assets/nbaimage4.png';

const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;

function App() {
    const [gamesStats, setGamesStats] = useState([])

    const makeQuery = () => {
      // make the data rendering dynamic based on date
      const today = new Date();
      const oneDayAgo = new Date(today);
      const twoDaysAgo = new Date(today);

      // set the dates
      oneDayAgo.setDate(today.getDate() - 1);
      twoDaysAgo.setDate(today.getDate()-2);

      const formatDate = (date) => date.toISOString().split('T')[0];

      const query = `https://api.balldontlie.io/v1/games?dates[]=${formatDate(oneDayAgo)}&dates[]=${formatDate(twoDaysAgo)}`;
      return query;

    }
    const callAPI = async () => {
        try {
          const query = makeQuery();

          const response = await fetch(query, {
            headers: {
              Authorization: ACCESS_KEY, 
            },
          });

          if(!response.ok) {
            throw new Error("Failed to fetch games data")
          }

          const gamesData = await response.json();
          console.log(gamesData.data) // for testing
          setGamesStats(gamesData.data);
    
        } catch(error) {
          console.log("Error fetching games:", error);
        }

    }

    useEffect(() => {
      callAPI();
  }, []);

  return (
    <>
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

      <SummaryStats gamesStats={gamesStats}/>

      <div className = "app-container">
        <Dashboard gamesStats={gamesStats}/>
        <Charts gameStats={gamesStats}/>
      </div>
    </>
  )
}

export default App
