import React from 'react'

export const WonGame = ({userWinnings}) => {
    //Add a button here to take him to Landing page or timeout by 10 secs and redirect
    return (
        <div>
            <h1>Congratulations you've won the game! Here's your price {userWinnings.reward}</h1>
        </div>
    )
}
