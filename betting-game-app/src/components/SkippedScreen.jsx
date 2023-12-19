import React from 'react'
import '../assets/Spinner.css';
export const SkippedScreen = () => {
    //Don't let the art degree dumbass click on anything
    return (
        <div>
            <h1>Congratulations you've won this round and skipped the next round! Please wait for your turn</h1>
            <div className="spinner"></div>
        </div>
    )
}
