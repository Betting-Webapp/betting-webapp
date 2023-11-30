import { useState } from 'react';
import './App.css'
import { LandingPage } from './components/LandingPage'
import { Tournament } from './components/Tournament'
import { PlaceBet } from './components/PlaceBet';
import { Button } from '@mui/material';
import { Login } from './components/Login';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
function App() {
  const [value, setValue] = useState(3);
  const [startBets, setStartBets] = useState(false);
  const [userData, setUserData] = useState({});
  return (
    <Router>
      <Routes>
      {Object.keys(userData).length !==0  ?
        <Route path='/home' element={<LandingPage setValue={setValue} value={value} userData={userData} />}/>
        // {/* <Tournament B={100} N={value} />
        // <Button onClick={() => {
        //   setStartBets(!startBets)
        // }}>Click to Start</Button>
        // {startBets && <PlaceBet />} */}
      : <Route  path='/' element={<Login userData={userData} setUserData={setUserData} />}/>}
      </Routes>
    </Router>
  )
}

export default App