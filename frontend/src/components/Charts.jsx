import React from 'react'
import { useState } from 'react'
import {useEffect} from 'react'

import { BarChart, Bar, LineChart, Line, CartesianGrid, XAxis, YAxis, Legend, Tooltip, ResponsiveContainer} from 'recharts'

// CAN USE RESPONSIVE CONTAINER TO MAKE VISUALLY APPEALING

const Charts = ({gameStats}) => {

    const [scoreAvgs, setScoreAvgs] = useState([]);
    const [winsByDivision, setWinsByDivision] = useState([]);

    const filteredGames = gameStats.filter((game) => game.status === "Final");

    // get the data we need here from gameStats for the chart
    const getScoresAtTimes = () => {
        console.log(filteredGames);
            /* time slots will be:
                4-5 PM
                5-6 PM
                6-7 PM
                7-8 PM
            */
            const homeAvgScores = {
                "4-5 PM": 0,
                "5-6 PM": 0,
                "6-7 PM": 0,
                "7-8 PM": 0,
            };
        
            const awayAvgScores = {
                "4-5 PM": 0,
                "5-6 PM": 0,
                "6-7 PM": 0,
                "7-8 PM": 0,
            };
        
            const timeCounts = {
                "4-5 PM": 0,
                "5-6 PM": 0,
                "6-7 PM": 0,
                "7-8 PM": 0,
            };
        
        
            filteredGames.forEach((game) => {
                const currDatetime = new Date(game.datetime);
                const playHour = currDatetime.getHours();
                console.log(playHour);
        
                if (playHour >= 16 && playHour < 17) {
                    homeAvgScores["4-5 PM"] += game.home_team_score;
                    awayAvgScores["4-5 PM"] += game.visitor_team_score;
                    timeCounts["4-5 PM"] += 1;
                } else if (playHour >= 17 && playHour < 18) {
                    homeAvgScores["5-6 PM"] += game.home_team_score;
                    awayAvgScores["5-6 PM"] += game.visitor_team_score;
                    timeCounts["5-6 PM"] += 1;
                } else if (playHour >= 18 && playHour < 19) {
                    homeAvgScores["6-7 PM"] += game.home_team_score;
                    awayAvgScores["6-7 PM"] += game.visitor_team_score;
                    timeCounts["6-7 PM"] += 1;
                } else if (playHour >= 19 && playHour < 20) {
                    homeAvgScores["7-8 PM"] += game.home_team_score;
                    awayAvgScores["7-8 PM"] += game.visitor_team_score;
                    timeCounts["7-8 PM"] += 1;
                }
            });
        
            // Calculate averages
            Object.keys(homeAvgScores).forEach((slot) => {
                if (timeCounts[slot] > 0) {
                    homeAvgScores[slot] /= timeCounts[slot];
                    awayAvgScores[slot] /= timeCounts[slot];
                }
            });
        
            console.log("Home Average Scores: ", homeAvgScores)
            console.log("Away Average Scores: ", awayAvgScores)

            // convert the data into a format the line chart can take in
            /* structure of:
            [
             {
              time:
              homeAvg:
              awayAvg:
             }, ...
            ]*/

             const chartData = Object.keys(homeAvgScores).map((timeSlot) => ({
                time: timeSlot,
                homeAvgScore: homeAvgScores[timeSlot],
                awayAvgScore: awayAvgScores[timeSlot],
             }))

             console.log(chartData)

             setScoreAvgs(chartData);
    };

    const getWinsByDivision = () => {
        
        const winsByDiv = {
            "Atlantic": 0, // Atlantic Division
            "Central": 0,  // Central Division
            "Southeast": 0, // Southeast Division
            "Northwest": 0, // Northwest Division
            "Pacific": 0,  // Pacific Division
            "Southwest": 0 // Southwest Division
        }

        filteredGames.forEach((game) => {
            let winTeamDiv = "";
            if(game.home_team_score > game.visitor_team_score) {
                winTeamDiv = game.home_team.division;
             } else {
                winTeamDiv = game.visitor_team.division;
            }
            winsByDiv[winTeamDiv]++;
        })
        
        // convert to chart form
        const chartData = Object.keys(winsByDiv).map((divi) => ({
            division: divi,
            winCount: winsByDiv[divi],
        }))

        console.log(chartData)

        setWinsByDivision(chartData);

    }

    useEffect(() => {
        getWinsByDivision();
        getScoresAtTimes();
    }, [gameStats]);
       

    return (
        <div className="charts-container">
            <h2> 📊 Data Visuals 📈</h2>
            <h3> Home / Visitor Team Performance vs. Gametime</h3>
            <LineChart width={600} height={400} data={scoreAvgs}>
                <CartesianGrid stroke="#ccc"/>
                <XAxis dataKey="time" label={{value: "Gametime", position: "insideBottom", offset: -5}}/>
                <YAxis domain={[90, 140]} label={ {value: "Average Score", angle: -90, position: "insideLeft" }}/>
                <Line type="monotone" dataKey="homeAvgScore" stroke="#0E4EF8" strokeWidth={3}/>
                <Line type="monotone" dataKey="awayAvgScore" stroke="#F48D0A" strokeWidth={3}/>
                <Tooltip/>
                <Legend wrapperStyle={{paddingTop: "10px"}}/>
            </LineChart>
            <h3> Win Count by Division </h3>
            <BarChart width={550} height={400} data={winsByDivision}>
                <CartesianGrid stroke="#ccc"/>
                <XAxis dataKey="division"/>
                <YAxis />
                <Tooltip/>
                <Legend/>
                <Bar dataKey="winCount" fill="#286143" />
            </BarChart>

            
        </div>

    );

}

export default Charts;

