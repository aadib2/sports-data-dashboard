import React from 'react'
import { useState } from 'react'
import {useEffect} from 'react'


const Dashboard = ({ gamesStats }) => {
    const [input, setInput] = useState("")

    const handleInput = (e) => setInput(e.target.value)


    return (
        <div className="dashboard-container">
            <h2> Latest NBA Games: </h2>
            <div className="search-filter-container">
                <input type="text" value={input} onChange={handleInput} />
                {/* filter 2 will go here still TBD*/}
                <button> Search </button>
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
                        </tr>
                    </thead>
                    <tbody>
                        {gamesStats.map((game, index) => (
                            <tr key={index}>
                                <td> {game.date} </td>
                                <td> {game.home_team.full_name} </td>
                                <td> {game.visitor_team.full_name} </td>
                                <td> {game.home_team_score} - {game.visitor_team_score} </td>
                                <td> {game.status} </td>
                                <td> {game.season} </td>
                                <td> {game.period} </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Dashboard
