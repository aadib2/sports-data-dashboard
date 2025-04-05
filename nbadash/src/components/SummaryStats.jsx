import React from 'react'
import { useState } from 'react'
import {useEffect} from 'react'
import StatsCard from './StatsCard'

const SummaryStats = () => {
    return (
        <>
            <div className="summ-container">
                <h2> Summary Statistics: </h2>
                <StatsCard/>
                <StatsCard/>
                <StatsCard/>
            </div>
        </>
    )
}

export default SummaryStats