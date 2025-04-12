import { useState } from 'react'
import {useEffect} from 'react'
import './App.css'
import Dashboard from './components/Dashboard'
import SummaryStats from './components/SummaryStats';
import Charts from './components/Charts';
import Header from './routes/Header';


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
      <SummaryStats gamesStats={gamesStats}/>

      <div className = "app-container">
        <Dashboard gamesStats={gamesStats}/>
        <Charts gameStats={gamesStats}/>
      </div>
    </>
  )
}

export default App
