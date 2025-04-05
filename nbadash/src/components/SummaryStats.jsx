import React from 'react'
import { useState } from 'react'
import {useEffect} from 'react'

const SummaryStats = ({ gamesStats }) => {

    const calcAvgPts = () => {
        let totalPts = 0;
        gamesStats.forEach((game) => {
            if(game.status == "Final") {
                const homeTeamScore = game.home_team_score;
                const awayTeamScore = game.visitor_team_score;
                totalPts+=homeTeamScore+awayTeamScore;
            }
        });

        return (totalPts / gamesStats.length).toFixed(2); // return average rounded to 2 dec places
    }

    const calcHighestScoringTeam = () => {
        let highestScore = 0;
        let highestScoreTeam = "";
        gamesStats.forEach((game) => {
            if(game.status == "Final") {
                const homeTeamScore = game.home_team_score;
                const awayTeamScore = game.visitor_team_score;
                
                if(homeTeamScore > highestScore) {
                    highestScore = homeTeamScore;
                    highestScoreTeam = game.home_team.full_name;
                }

                if(awayTeamScore > highestScore) {
                    highestScore = awayTeamScore;
                    highestScoreTeam = game.visitor_team.full_name;
                }
            }
        })

        return `${highestScoreTeam} (${highestScore} points)`;
    }

    const calcHomeVsAwayWins = () => {
        let homeTeamWins = 0;
        let awayTeamWins = 0;

        gamesStats.forEach((game) => {
            // only check for wins if the game is over
            if(game.status == "Final") {
                let homeTeamScore = game.home_team_score;
                let awayTeamScore = game.visitor_team_score;

                if(homeTeamScore > awayTeamScore) {
                    homeTeamWins++;
                }
                else {
                    awayTeamWins++;
                }
            }
        })

        return `${homeTeamWins} vs ${awayTeamWins}`;
    }
    
    const calcBiggestBlowout = () => {
        let maxPtDiff = 0;
        let team1 = "";
        let team2 = "";
        let team1score = 0;
        let team2score = 0;

        gamesStats.forEach((game) => {
            // only check for wins if the game is over
            if(game.status == "Final") {
                let homeTeamScore = game.home_team_score;
                let awayTeamScore = game.visitor_team_score;
                let currPtDiff = Math.abs(homeTeamScore - awayTeamScore);

                if(currPtDiff > maxPtDiff) {
                    maxPtDiff = currPtDiff;
                    team1 = game.home_team.abbreviation;
                    team2 = game.visitor_team.abbreviation;
                    team1score = homeTeamScore;
                    team2score = awayTeamScore;

                }
            }
        })

        return `Matchup: ${team1} ${team1score} to ${team2} ${team2score}, \n Pt Diff: ${maxPtDiff}`;

    }

    return (
        <>
            <div className="summ-container">
                <h2> Summary Statistics: </h2>
                <div className="stats-card-container">
                    <div className = "stats-card">
                        <h3> Average Total Pts / Game</h3>
                        <p> {calcAvgPts()}</p>
                    </div>
                    <div className="stats-card">
                        <h3> Highest Scoring Team in Game</h3>
                        <p> {calcHighestScoringTeam()}</p>
                    </div>
                    <div className = "stats-card">
                        <h3> Home Wins vs Away Team Wins</h3>
                        <p> {calcHomeVsAwayWins()}</p>
                    </div>
                    <div className = "stats-card">
                        <h3> Biggest Blowout</h3>
                        <p> {calcBiggestBlowout()}</p>
                    </div>
                </div>
                
            </div>
        </>
    )
}

export default SummaryStats