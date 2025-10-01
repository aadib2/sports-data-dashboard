import React from 'react'
import { useState } from 'react'
import {useEffect} from 'react'
import {Link} from 'react-router-dom'

import { nflTeamEmojis } from '../teamEmojis'
// import { format } from "date-fns"


const Dashboard = ({ gamesStats }) => {
    const [input, setInput] = useState("")
    const [category, setCategory] = useState("All");
    const [filteredGames, setFilteredGames] = useState([]);

    // Initialize filteredGames with all games when the component mounts
    // specifically this effect only runs when games stats changes so we can render those
    useEffect(() => {
        setFilteredGames(gamesStats);
    }, [gamesStats]);

    const handleInput = (e) => {
        setInput(e.target.value.toLowerCase());

        // after setting input, filter games based on the team input
        setFilteredGames(gamesStats.filter((game) => {
            const homeTeam = game.home_team.full_name.toLowerCase();
            const visitorTeam = game.visitor_team.full_name.toLowerCase();
            return homeTeam.includes(input) || visitorTeam.includes(input);
        }));
    }
    const handleCategory = (e) => setCategory(e.target.value);

    const filterByConference = () => {
            setFilteredGames(gamesStats.filter((game) => {
                const homeConf = game.home_team.conference;
                const awayConf = game.visitor_team.conference;
                // if category is all, just keep all original games in list
                if(category == "All") {
                    return true;
                // if category is interconference
                } else if(category == "Interconference") {
                    return (homeConf != awayConf);
                }
                // if category is AFC or NFC
                else {
                    return (category == homeConf) && (category == awayConf);
                }
            }));
    }


    return (
        <div className="dashboard-container">
            <h2> ⚡ Latest NFL Games </h2>
            <div className="search-filter-container">
                <h3> Filter by Team: </h3>
                <input type="text" value={input} placeholder="Enter team name" onChange={handleInput} />
                <h3> Filter by Conference: </h3>
                <select onChange={handleCategory}>
                    <option value = "All"> All</option>
                    <option value="AFC"> AFC</option>
                    <option value="NFC"> NFC </option>
                    <option value = "Interconference"> Interconference</option>
                </select>
                {/* still have to implement functionality*/}
                <button onClick={filterByConference}> Search </button>
            </div>
            
            <div className="stats-container">
                <table className="game-stats-table">
                    <thead>
                        <tr>
                            <th> Date </th>
                            <th> Home Team</th>
                            <th> Visitor Team</th>
                            <th> Final Score </th>
                            <th> Game Status</th>
                            <th> Season</th>
                            <th> Period</th>
                            <th> Details </th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredGames.map((game, index) => (
                            <tr key={index}>
                                <td> {new Date(game.date).toLocaleString("en-US", {
                                        year: "numeric",
                                        month: "short",
                                        day: "numeric",
                                        hour: "numeric",
                                        minute: "2-digit",
                                        timeZoneName: "short"
                                    })} 
                                </td>
                                <td> {game.home_team.full_name} {nflTeamEmojis[game.home_team.abbreviation]}</td>
                                <td> {game.visitor_team.full_name} {nflTeamEmojis[game.visitor_team.abbreviation]}</td>
                                <td> {game.home_team_score} - {game.visitor_team_score} </td>
                                <td> {game.status} </td>
                                <td> {game.season} </td>
                                <td> {game.period} </td>
                                <td> <Link to={`/gameDetails/${game.id}`} state={{ game }} key={game.id}> View 🔗 </Link> </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Dashboard
