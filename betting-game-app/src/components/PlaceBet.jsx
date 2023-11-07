import { useEffect, useState } from "react";
import { TextField, Button } from "@mui/material";
import { socket } from "../socket";
import '../assets/Spinner.css';
import { LostGame } from "./LostGame";
import { WonGame } from "./WonGame";
import { SkippedScreen } from "./SkippedScreen";

export const PlaceBet = ({ userData, joinedRoom }) => {
    const [bet, setBet] = useState(-1);
    const [gameStats, setGameStats] = useState(null);
    const [continueGame, setContinueGame] = useState(false);
    const [skippedGame, setSkippedGame] = useState(false);
    const [lostGame, setLostGame] = useState(false);
    const [wonGame, setWonGame] = useState(false);
    const [userWinnings, setUserWinnings] = useState(null);
    const [loading, setLoading] = useState(false);

    //Handling the cosmetic stuff and displaying balnces, Also adding the complete balance for the final round
    const handleBetValue = (event) => {
        setBet(event.target.value);
        // setContinueGame(true);
    }
    const handlePlaceBet = () => {
        const maxBet = gameStats === null ? joinedRoom.balance : gameStats.balance;
        if(bet > maxBet || bet <= 0 || typeof bet !== 'number'){
            alert(`Your bets should be positive numbers, less than equal to your current balance ${maxBet}`);
            setBet(0);
        }
        else{
            const playerBetDeets = {
                'game_uuid': joinedRoom.game_uuid,
                'uuid': userData.uuid,
                'bet': parseInt(bet),
            }
            socket.emit('place_bets', playerBetDeets);
            setBet(0);
            setLoading(true);
        }
    }

    useEffect(() => {
        function onContinue(value) {
            console.log(`RoundContinued for ${userData.uuid}`);
            console.log(value);
            setLoading(false);
            setGameStats(value);
            setContinueGame(true);
            setLostGame(false);
            setWonGame(false);
            setSkippedGame(false);
        }
        function onWinner(value) {
            console.log(`Round won by ${userData.uuid}`);
            console.log(value);
            setLoading(false);
            setGameStats(value);
            setContinueGame(false);
            setLostGame(false);
            setWonGame(true);
            setSkippedGame(false);
            setUserWinnings(value);
        }
        function onLost(value) {
            console.log(`Round lost by ${userData.uuid}`);
            console.log(value);
            setLoading(false);
            setGameStats(value);
            setContinueGame(false);
            setLostGame(true);
            setWonGame(false);
            setSkippedGame(false);
        }
        function onSkipped(value) {
            console.log(`Round skipped by ${userData.uuid}`);
            console.log(value);
            setLoading(false);
            setGameStats(value);
            setContinueGame(false);
            setLostGame(false);
            setSkippedGame(true);
            setWonGame(false);
        }
        socket.on('continue-game', onContinue);
        socket.on('winner', onWinner);
        socket.on('lost', onLost);
        socket.on('skipping-round', onSkipped);
        return () => {
            socket.off('continue-game', onContinue);
            socket.off('winner', onWinner);
            socket.off('lost', onLost);
            socket.off('skipping-round', onSkipped);
        };
    }, [continueGame, lostGame, wonGame, skippedGame])
    return (<>
        {
            loading ? <div className="spinner"></div> :
                skippedGame ?
                    <SkippedScreen />
                    : continueGame ?
                        <div>
                            <h1>Continue: {joinedRoom.game_uuid}</h1>
                            {/* Restrict the input to number & maxbet should be less than the balance */}
                            <TextField
                            inputMode="numeric"
                                placeholder='Place Bet value'
                                value={bet}
                                name='betValue'
                                onChange={handleBetValue}
                                inputProps={{
                                    pattern: "[0-9]*",
                                }}
                            />
                            <Button type="submit" onClick={handlePlaceBet}>Submit</Button>
                        </div>
                        : lostGame ?
                            <LostGame />
                            : wonGame ?
                                <WonGame userWinnings={userWinnings} />
                                :
                                <div>
                                    <h1>You've joined Room: {joinedRoom.game_uuid}</h1>
                                    {/* Restrict the input to number & maxbet should be less than the balance */}
                                    <TextField
                                    inputMode="numeric"
                                        placeholder='Place Bet value'
                                        value={bet}
                                        name='betValue'
                                        onChange={handleBetValue}
                                        inputProps={{
                                            pattern: "[0-9]*",
                                        }}
                                    />
                                    <Button type="submit" onClick={handlePlaceBet}>Submit</Button>
                                </div>
        }
    </>);
}

