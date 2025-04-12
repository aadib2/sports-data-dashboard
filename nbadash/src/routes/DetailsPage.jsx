import React, { use } from 'react';
import { useParams } from "react-router-dom";
import {useLocation} from 'react-router-dom'
import {useState, useEffect} from 'react'
import * as NBAIcons from 'react-nba-logos'

// get API key
const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;

const DetailsPage = () => {

    const location = useLocation();
    const { game } = location.state || {}; // Access the passed game data
    const [status, setStatus] = useState("");
    const [winner, setWinner] = useState("");
    const [players, setPlayers] = useState({});

    const [homePlayers, setHomePlayers] = useState([]);
    const [awayPlayers, setAwayPlayers] = useState([]);

      const callAPI = async () => {
          try {
            const query = `https://api.balldontlie.io/v1/players?team_ids[]=${game.home_team.id}&team_ids[]=${game.visitor_team.id}&per_page=10`;
            const response = await fetch(query, {
                headers: {
                  Authorization: ACCESS_KEY, 
                },}
            );
  
            if(!response.ok) {
              throw new Error("Failed to fetch player data")
            }
  
            const playerData = await response.json();
            console.log(playerData.data) // for testing
            setPlayers(playerData.data);
      
          } catch(error) {
            console.log("Error fetching players:", error);
          }
  
      }

      useEffect(() => {
        callAPI();
    }, []);

    const getRandomPlayers = () => {
        const homePlayersFiltered = players.filter((player) => player.team.id === game.home_team.id);
        const awayPlayersFiltered = players.filter((player) => player.team.id === game.visitor_team.id);
    
        console.log("Home Players:", homePlayersFiltered);
        console.log("Away Players:", awayPlayersFiltered);
    
        setHomePlayers(homePlayersFiltered);
        setAwayPlayers(awayPlayersFiltered);
    }

    const findGameStatus = () => {
        if(game.status == "Final")
            setStatus("Final 🟢")
        else if(game.status =="1st Qtr" ) {
            setStatus("1st Quarter 🟡");
        } else if (game.status === "2nd Qtr") {
            setStatus("2nd Quarter 🟡");
        } else if(game.status == "Halftime") {
            setStatus("Halftime 🟡")
        }
        else if (game.status === "3rd Qtr") {
            setStatus("3rd Quarter 🟡");
        } else if (game.status === "4th Qtr") {
            setStatus("4th Quarter 🟡");
        } else {
            setStatus("Upcoming 🔴");
        }
    }

    const findWinner = () => {
        let homeTeamScore = game.home_team_score;
        let awayTeamScore = game.visitor_team_score;

        if(homeTeamScore > awayTeamScore) {
            setWinner(game.home_team.full_name);
        } else {
            setWinner(game.visitor_team.full_name)
        }
    }

    useEffect(()=> {
        if(game && players.length > 0) {
            findGameStatus();
            findWinner();
            getRandomPlayers();
        }

    }, [game, players]);

    if (!game) {
        return <h2>No game data available</h2>;
    }


    const HomeTeamLogo = NBAIcons[game.home_team.abbreviation];
    const AwayTeamLogo = NBAIcons[game.visitor_team.abbreviation];

    return (
        <>
            <h1>Game Details</h1>
            <div className="details-page">
                <div className="teams-data">
                <h3><strong>Date:</strong> {game.date} | Status: {status}</h3>
                <h3><strong>🏠 </strong> {game.home_team.full_name}  {game.home_team_score}</h3>
                {HomeTeamLogo && <HomeTeamLogo size={70}/>}
                <h3> vs. </h3>
                <h3><strong>🛫 </strong> {game.visitor_team.full_name}  {game.visitor_team_score}</h3>
                {AwayTeamLogo && <AwayTeamLogo size={70} />}
                <h3> 🏆 Winner: {winner}</h3>
                <h3><strong>Season:</strong> {game.season}</h3>
                <h3><strong>Period:</strong> {game.period}</h3>
            </div>

                <div className="player-info">
                    <h3> <strong>🎲 Random Players (Both present and historical!)</strong></h3>
                    <h3> {game.home_team.abbreviation}:</h3>
                    <ul>
                        {homePlayers.map((player) => (
                            <li key={player.id}> {player.first_name} {player.last_name} - {player.position || "N/A"} </li>
                        ))}
                    </ul>
                    <h3>{game.visitor_team.abbreviation}:</h3>
                    <ul>
                    {awayPlayers.map((player) => (
                    <li key={player.id}>
                        {player.first_name} {player.last_name} - {player.position || "N/A"}
                    </li>
                    ))}
                    </ul>
                </div>
            </div>
        </>
    );
  };
  
  export default DetailsPage;