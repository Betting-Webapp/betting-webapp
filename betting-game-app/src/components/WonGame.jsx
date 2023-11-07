import React from 'react'

export const WonGame = ({userWinnings}) => {
    return (
        <div>
            <h1>Congratulations you've won the game! Here's your price {userWinnings.reward}</h1>
        </div>
    )
}
