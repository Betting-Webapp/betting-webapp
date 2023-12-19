import { useState } from 'react';
import './App.css'
import { LandingPage } from './components/LandingPage'
import { Tournament } from './components/Tournament'
import { PlaceBet } from './components/PlaceBet';
import { ListGames } from './utils/ListGames';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { Login } from './components/Login';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { Register } from './components/Register';

const styles = {
  root: {
    flexGrow: 1
  },
  typography: {
    flexGrow: 1,
    align: "center"
  }
};

function App() {
  const [value, setValue] = useState(3);
  const [startBets, setStartBets] = useState(false);
  const [userData, setUserData] = useState({});
  const [gameRoomsData, setgameRoomsData] = useState([]);
  return (
    <div style={{flexGrow:1}}>
      <Router>
        <AppBar position='fixed'>
          <Toolbar>
            <Typography align='center' variant='h6' style={{textAlign:'center', flexGrow:1}}>TORNELUD</Typography>
          </Toolbar>
        </AppBar>
        <Routes>
          <Route path='/registerPlayer' element={<Register/>}/>
          <Route path='/home' element={<LandingPage setValue={setValue} value={value} userData={userData} gameRoomsData={gameRoomsData} setgameRoomsData={setgameRoomsData} />}/>
          <Route  path='/' element={<Login userData={userData} setUserData={setUserData} />}/>
          <Route path='/create' element={<p/>} /> Have to update this block
          <Route path='/join' element = {<ListGames listGames={gameRoomsData?.games_list } userData={userData} />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App