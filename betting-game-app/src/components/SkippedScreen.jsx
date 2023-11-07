import React from 'react'
import '../assets/Spinner.css';
export const SkippedScreen = () => {
    return (
        <div>
            <h1>Congratulations you've won this round and skipped the next round! Please wait for your turn</h1>
            <div className="spinner"></div>
        </div>
    )
}
