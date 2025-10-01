import { useState } from 'react'
import {useEffect} from 'react'
import './App.css'
import Dashboard from './components/Dashboard'
import SummaryStats from './components/SummaryStats';
import Charts from './components/Charts';
import Header from './routes/Header';


// const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;

function App() {
    const [gamesStats, setGamesStats] = useState([])
    // console.log(ACCESS_KEY);

  //   const getLast7Dates = () => {
  //     const dates = [];
  //     const today = new Date();

  //     for (let i = 0; i < 7; i++) {
  //       const d = new Date(today);
  //       d.setDate(today.getDate() - i);
  //       dates.push(d.toISOString().split('T')[0]); // we need to format the dates to be visually appealing
  //     }
  //     return dates.reverse(); // so it's chronological
  // };

  //   const makeQuery = () => {
  //     // make the data rendering dynamic based on date
  //     const week = getLast7Dates();

  //     // we now need to format our query string to include each date
  //     const datesString = week.map(date => `dates[]=${date}`).join("&"); // in accordance with docs
  //     console.log(datesString)

  //     const query = `https://api.balldontlie.io/nfl/v1/games?${datesString}`;
  //     return query;

  //   }
    
    const fetchGames = async () => {
        try {
          // call backend api
          const response = await fetch("http://localhost:8000/nfl/games");
          if (!response.ok) {
            throw new Error("Failed to fetch games data")
          }

          const gamesData = await response.json(); // double check since we already extract json
          // console.log(gamesData['data']) // for testing
          setGamesStats(gamesData['data']);
    
        } catch(error) {
          console.log("Error fetching games:", error);
        }

    };

    useEffect(() => {
      fetchGames();
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
