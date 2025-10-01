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
    const getScoresEachQuarter = () => {
    // Structure: { division: { quarter: { sum: 0, count: 0 } } }
        const divisionQuarterScores = {};

        filteredGames.forEach((game) => {
            // Home team
            const homeDiv = game.home_team.conference + game.home_team.division;
            if (!divisionQuarterScores[homeDiv]) {
                divisionQuarterScores[homeDiv] = {
                    '1st': { sum: 0, count: 0 },
                    '2nd': { sum: 0, count: 0 },
                    '3rd': { sum: 0, count: 0 },
                    '4th': { sum: 0, count: 0 }
                };
            }
            // add both score + increment count for each quarter
            divisionQuarterScores[homeDiv]['1st'].sum += game.home_team_q1;
            divisionQuarterScores[homeDiv]['1st'].count += 1;
            divisionQuarterScores[homeDiv]['2nd'].sum += game.home_team_q2;
            divisionQuarterScores[homeDiv]['2nd'].count += 1;
            divisionQuarterScores[homeDiv]['3rd'].sum += game.home_team_q3;
            divisionQuarterScores[homeDiv]['3rd'].count += 1;
            divisionQuarterScores[homeDiv]['4th'].sum += game.home_team_q4;
            divisionQuarterScores[homeDiv]['4th'].count += 1;

            // Away team
            const awayDiv = game.visitor_team.conference + game.visitor_team.division;
            if (!divisionQuarterScores[awayDiv]) {
                divisionQuarterScores[awayDiv] = {
                    '1st': { sum: 0, count: 0 },
                    '2nd': { sum: 0, count: 0 },
                    '3rd': { sum: 0, count: 0 },
                    '4th': { sum: 0, count: 0 }
                };
            }
            divisionQuarterScores[awayDiv]['1st'].sum += game.visitor_team_q1;
            divisionQuarterScores[awayDiv]['1st'].count += 1;
            divisionQuarterScores[awayDiv]['2nd'].sum += game.visitor_team_q2;
            divisionQuarterScores[awayDiv]['2nd'].count += 1;
            divisionQuarterScores[awayDiv]['3rd'].sum += game.visitor_team_q3;
            divisionQuarterScores[awayDiv]['3rd'].count += 1;
            divisionQuarterScores[awayDiv]['4th'].sum += game.visitor_team_q4;
            divisionQuarterScores[awayDiv]['4th'].count += 1;
        });

        // Now, build chart data: [{ division, q1, q2, q3, q4 }]
        const chartData = Object.entries(divisionQuarterScores).map(([division, quarters]) => ({
            'division': division,
            '1st': quarters['1st'].count ? (quarters['1st'].sum / quarters['1st'].count).toFixed(2) : 0, // if count exists then calculate average, otherwise put 0
            '2nd': quarters['2nd'].count ? (quarters['2nd'].sum / quarters['2nd'].count).toFixed(2) : 0,
            '3rd': quarters['3rd'].count ? (quarters['3rd'].sum / quarters['3rd'].count).toFixed(2) : 0,
            '4th': quarters['4th'].count ? (quarters['4th'].sum / quarters['4th'].count).toFixed(2) : 0,
        }));

        console.log(chartData);
        // You can set this to state for a BarChart or similar
        setScoreAvgs(chartData);
    };

    // const getWinsByDivision = () => {
        
    //     const winsByDiv = {
    //         "Atlantic": 0, // Atlantic Division
    //         "Central": 0,  // Central Division
    //         "Southeast": 0, // Southeast Division
    //         "Northwest": 0, // Northwest Division
    //         "Pacific": 0,  // Pacific Division
    //         "Southwest": 0 // Southwest Division
    //     }

    //     filteredGames.forEach((game) => {
    //         let winTeamDiv = "";
    //         if(game.home_team_score > game.visitor_team_score) {
    //             winTeamDiv = game.home_team.division;
    //          } else {
    //             winTeamDiv = game.visitor_team.division;
    //         }
    //         winsByDiv[winTeamDiv]++;
    //     })
        
    //     // convert to chart form
    //     const chartData = Object.keys(winsByDiv).map((divi) => ({
    //         division: divi,
    //         winCount: winsByDiv[divi],
    //     }))

    //     console.log(chartData)

    //     setWinsByDivision(chartData);

    // }

    useEffect(() => {
        getScoresEachQuarter();
    }, [gameStats]);
       

    return (
        <div className="charts-container">
            <h2> 📊 Data Visuals 📈</h2>
            <h3> NFL Division Team Scoring By Quarter</h3>
            <BarChart width={600} height={400} data={scoreAvgs}>
                <CartesianGrid stroke="#ccc"/>
                <XAxis dataKey="division" 
                    angle={-45} 
                    textAnchor="end" 
                    interval={0} 
                    height={80} 
                    dy={20}
                />
                <YAxis/>  
                <Bar dataKey="1st" stackId="a" fill="#0E4EF8"/>
                <Bar dataKey="2nd" stackId="a" fill="#72b670ff"/>
                <Bar dataKey="3rd" stackId="a" fill="#e5a824ff"/>
                <Bar dataKey="4th" stackId="a" fill="#d0495fff"/>
                <Tooltip/>
                <Legend wrapperStyle={{paddingTop: "10px"}}/>
            </BarChart>
            <h3> Home vs Visitor Scoring (To be implemented) </h3>
            {/* <BarChart width={550} height={400} data={winsByDivision}>
                <CartesianGrid stroke="#ccc"/>
                <XAxis dataKey="division"/>
                <YAxis />
                <Tooltip/>
                <Legend/>
                <Bar dataKey="winCount" fill="#286143" />
            </BarChart> */}

            
        </div>

    );

}

export default Charts;

